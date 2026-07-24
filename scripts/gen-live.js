#!/usr/bin/env node
/**
 * gen-live.js — generates public/live.html, a public "/live control room" for your org.
 * Zero dependencies. Run: node scripts/gen-live.js
 *
 * Design principle — LEAK-PROOF BY CONSTRUCTION:
 *  - live-data.json (same dir) = an explicit PUBLIC allowlist. Only these fields reach the page.
 *  - ../STATE.md is read ONLY to count dated log lines (a number). No text from STATE.md
 *    is ever copied into the page. Secrets can't leak through a channel that doesn't exist.
 *
 * Adapt: edit live-data.json (name, url, stats, decisions, human_gestures), restyle at will.
 * Regenerate at every deploy, or wire a CI cron.
 */
'use strict';
const fs = require('fs');
const path = require('path');

const DATA = JSON.parse(fs.readFileSync(path.join(__dirname, 'live-data.json'), 'utf8'));
const OUT_DIR = path.join(__dirname, '..', 'public');
const OUT = path.join(OUT_DIR, 'live.html');

// Derived-only read of STATE.md: count dated log lines. Never quote content.
let rawLogCount = 0;
try {
  const state = fs.readFileSync(path.join(__dirname, '..', 'STATE.md'), 'utf8');
  rawLogCount = (state.match(/^- 20\d\d-/gm) || []).length;
} catch (e) { /* STATE.md absent — page still builds */ }

const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const now = new Date();
const updated = now.toISOString().slice(0, 16).replace('T', ' ') + ' UTC';
const dayN = Math.max(1, Math.floor((now - new Date(DATA.org_born + 'T00:00:00Z')) / 86400000) + 1);

const statHtml = DATA.stats.map((s, i) => `
    <div class="stat" style="animation-delay:${i * 90}ms">
      <span class="mono lbl">${esc(s.label)}</span>
      <span class="num">${esc(s.value)}</span>
      <span class="mono sub">${esc(s.note)}</span>
    </div>`).join('');

const logHtml = DATA.decisions.map(d => `
    <li>
      <span class="mono date">${esc(d.date)}</span>
      <div class="body"><p>${esc(d.action)}.</p><span class="chip mono">${esc(d.result)}</span></div>
    </li>`).join('');

const gestureHtml = DATA.human_gestures.map(g => `
    <li><span class="mono date">${esc(g.date)}</span><p>${esc(g.what)}.</p></li>`).join('');

const html = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Live control room — ${esc(DATA.org_name)}</title>
<meta name="description" content="Radical transparency: the real numbers and decision log of ${esc(DATA.org_name)}. Regenerated at every build. Nothing invented.">
<style>
:root{--bg:#0d0b08;--ink:#f4efe6;--muted:#9a917f;--line:#2a271f;--accent:#e8622c;--accent2:#d9b44a;--paper:#141109;--serif:Georgia,serif;--mono:ui-monospace,Menlo,monospace}
*{margin:0;padding:0;box-sizing:border-box}
body{background:var(--bg);color:var(--ink);font-family:var(--serif);font-weight:300;line-height:1.5;-webkit-font-smoothing:antialiased;overflow-x:hidden}
.mono{font-family:var(--mono);text-transform:uppercase;letter-spacing:.2em;font-size:.68rem}
.wrap{max-width:900px;margin:0 auto;padding:0 28px}
header{padding:64px 0 34px;position:relative}
.brand{font-weight:600;font-size:1.05rem}.brand a{color:inherit;text-decoration:none}
.livechip{display:inline-flex;align-items:center;gap:9px;border:1px solid var(--line);border-radius:100px;padding:7px 16px;margin-top:36px;color:var(--muted)}
.dot{width:8px;height:8px;border-radius:50%;background:#e0402a;box-shadow:0 0 0 0 rgba(224,64,42,.55);animation:pulse 1.8s infinite}
@keyframes pulse{70%{box-shadow:0 0 0 9px rgba(224,64,42,0)}100%{box-shadow:0 0 0 0 rgba(224,64,42,0)}}
h1{font-size:clamp(2.3rem,6vw,4.2rem);line-height:1;font-weight:500;letter-spacing:-.03em;margin:18px 0 0;max-width:18ch}
h1 em{font-style:italic;color:var(--accent2);font-weight:300}
header .sub{color:var(--muted);font-size:1.08rem;max-width:52ch;margin-top:20px}
header .sub b{color:var(--ink);font-weight:500}
.statgrid{display:grid;grid-template-columns:repeat(4,1fr);gap:18px;margin-top:52px}
.stat{border:1px solid var(--line);border-radius:12px;padding:22px 20px 18px;background:linear-gradient(160deg,var(--paper),var(--bg));display:flex;flex-direction:column;gap:6px;opacity:0;animation:rise .6s ease forwards}
@keyframes rise{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:none}}
.stat .lbl{color:var(--accent)}
.stat .num{font-size:clamp(2.4rem,5vw,3.4rem);font-weight:500;letter-spacing:-.03em;line-height:1;font-variant-numeric:tabular-nums}
.stat .sub{color:var(--muted);letter-spacing:.12em;font-size:.58rem}
section{padding:56px 0 0}
h2{font-size:1.7rem;font-weight:500;letter-spacing:-.01em}
.kicker{color:var(--accent);display:block;margin-bottom:12px}
.lede{color:var(--muted);margin-top:10px;max-width:56ch}
ol.log{list-style:none;margin-top:30px;border-left:1px solid var(--line)}
ol.log li{display:flex;gap:22px;padding:16px 0 16px 22px;position:relative}
ol.log li::before{content:"";position:absolute;left:-4px;top:26px;width:7px;height:7px;border-radius:50%;background:var(--accent)}
ol.log .date{color:var(--muted);white-space:nowrap;padding-top:5px;letter-spacing:.1em}
ol.log .body p{font-size:1.02rem;max-width:58ch}
.chip{display:inline-block;margin-top:8px;color:var(--accent2);border:1px solid rgba(217,180,74,.45);border-radius:100px;padding:3px 12px;font-size:.58rem;letter-spacing:.14em}
ul.gestures{list-style:none;margin-top:26px}
ul.gestures li{display:flex;gap:22px;padding:14px 0;border-top:1px solid var(--line)}
ul.gestures li:last-child{border-bottom:1px solid var(--line)}
ul.gestures .date{color:var(--muted);white-space:nowrap;padding-top:5px;letter-spacing:.1em}
ul.gestures p{color:var(--ink);font-size:1rem;max-width:60ch}
.method{border:1px solid var(--line);border-radius:12px;background:linear-gradient(160deg,var(--paper),var(--bg));padding:28px 30px;margin-top:56px;color:var(--muted);font-size:.95rem}
.method b{color:var(--ink);font-weight:500}
.method p+p{margin-top:10px}
a.tx{color:var(--accent2);text-decoration:none;border-bottom:1px solid rgba(217,180,74,.4)}
footer{border-top:1px solid var(--line);margin-top:70px;padding:36px 0 44px;color:var(--muted);display:flex;justify-content:space-between;flex-wrap:wrap;gap:14px}
@media(max-width:760px){.statgrid{grid-template-columns:repeat(2,1fr)}ol.log li,ul.gestures li{flex-direction:column;gap:4px}}
</style>
</head>
<body>
<header class="wrap">
  <div class="brand"><a href="${esc(DATA.org_url)}">${esc(DATA.org_name)}</a></div>
  <div class="livechip mono"><span class="dot"></span>Live · day ${dayN} · control room</div>
  <h1>Every number here is <em>real.</em></h1>
  <p class="sub">${esc(DATA.tagline)} This page is the org's public instrument panel: real numbers, real decisions. <b>Nothing is invented</b>, including the zeros.</p>
  <div class="statgrid">${statHtml}
  </div>
</header>

<section class="wrap">
  <span class="mono kicker">Decision log</span>
  <h2>What the org decided, <em style="font-style:italic;color:var(--accent2);font-weight:300">in order</em></h2>
  <p class="lede">Latest first. Condensed from the org's internal state file through an explicit allowlist — dates, actions, public outcomes only. Failures included.</p>
  <ol class="log">${logHtml}
  </ol>
</section>

<section class="wrap">
  <span class="mono kicker">Human interventions</span>
  <h2>Gestures consumed: ${DATA.human_gestures.length}</h2>
  <p class="lede">The complete list of times a human had to act. Everything else was done by agents.</p>
  <ul class="gestures">${gestureHtml}
  </ul>
</section>

<section class="wrap">
  <div class="method">
    <p><b>How this page is made.</b> A zero-dependency Node script regenerates it from a public allowlist file${rawLogCount ? ` (the internal log currently holds <b>${rawLogCount}</b> raw entries; only whitelisted fields survive the cut)` : ''}. No secrets, keys, emails or account details can reach this page by construction.</p>
    <p>Built with <a class="tx" href="https://github.com/parweb/claude-swarm-starter">claude-swarm-starter</a>.</p>
  </div>
</section>

<footer class="wrap">
  <span class="mono">Last updated ${updated} — regenerated at build time</span>
  <span class="mono">${esc(DATA.org_name)}</span>
</footer>
</body>
</html>
`;

fs.mkdirSync(OUT_DIR, { recursive: true });
fs.writeFileSync(OUT, html);
console.log('Wrote', OUT, '·', html.length, 'bytes ·', DATA.decisions.length, 'decisions ·', rawLogCount, 'raw log entries counted');
