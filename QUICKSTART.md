# QUICKSTART — launching the swarm

Prereq: [Claude Code](https://docs.anthropic.com/en/docs/claude-code) installed and authenticated. That's it. No other dependency.

## 1. Set up the world

```bash
git clone https://github.com/parweb/claude-swarm-starter my-org && cd my-org
rm -rf .git && git init
```

Edit `STATE.md`: write your objective (one measurable line) and your real constraints.
Everything else can stay as-is on day 1.

## 2. Start the orchestrator

Run `claude` interactively in the directory. First message:

> Read RULES.md, STATE.md, HUMAN.md and AGENTS.md. You are MAIN, the orchestrator.
> Register yourself in AGENTS.md, then pursue the objective in STATE.md.

The orchestrator session is your window into the org. You steer by editing files
(drop a directive in `bus/broadcast/`), not by micromanaging the prompt.

## 3. Spawn worker agents

Agents are just background `claude -p` processes launched in the same directory:

```bash
claude -p "Read RULES.md and STATE.md first. You are SCOUT. Your mandate: <one concrete
chunk of work>. Register in AGENTS.md. Write your results to findings/SCOUT.md and a
summary to bus/broadcast/SCOUT-<topic>.md, then terminate." \
  --dangerously-skip-permissions &
```

Notes that matter:
- `--dangerously-skip-permissions` is what makes autonomy real. Understand what it does;
  run the org in a directory (or machine/container) whose blast radius you accept.
- One agent = one mandate = one run. Agents that need more time spawn a successor or leave
  a TODO in their findings. This keeps every process short-lived and every result on disk.
- Spawn in parallel freely — file-based comms means no coordination infrastructure needed.
  Collisions are rare and cheap (worst case: two agents append to the same registry table).

## 4. The pulse

The swarm doesn't run itself forever — the orchestrator gives it a heartbeat. Periodically
(every N minutes, or each time you come back), have MAIN do a pulse:

> Pulse: read AGENTS.md, bus/, findings/ for anything new since last pulse. Update STATE.md
> (dated log lines). Kill stalled work, spawn what the objective needs next, escalate true
> human walls to HUMAN.md.

You can automate the pulse (cron a `claude -p` pulse prompt) or keep it manual. Manual is
fine early: the pulse is where judgment lives.

## 5. The disciplines (learned in production, the hard way)

**Anti-theater: a fix only exists once it's VERIFIED LIVE.**
An agent saying "done" is a claim, not a fact. Files change ≠ outcome changed. Every fix,
deploy or publish gets verified against the live surface (HTTP 200, rendered page, real
API response) — ideally by a *different* agent (see `critique/CHARTER.md`, META pass).
The failure mode this prevents is real: swarms happily generate mountains of confident,
unverified "completed work".

**Log failures like wins.**
STATE.md is append-only, dated, and includes what didn't work. A log with no failures is
fiction, and the org loses its memory of what to stop doing.

**Kill criteria before launch, not after.**
Every bet enters `rnd/EXPERIMENTS.md` with a pre-registered kill/scale threshold. See the
low-N regime in that file for how to decide honestly before you have volume.

**Play where AI is tolerated.**
Hard-learned lesson: platforms with GenAI-content classifiers and anti-AI moderation will
flag, bury, or ban you — and trying to evade detection is both against the rules of this
kit and a losing arms race. Don't fight it. Route effort to surfaces where being an agent
is accepted or even the point (your own site, GitHub, agent-native communities, transparent
build-in-public accounts). Disclosure beats disguise.

**Humans are walls, not managers.**
Only true human walls go in `HUMAN.md` (identity, payment, OTP, login). Everything else the
org handles. An agent that hits a wall writes the entry and moves on — never blocks.

## 6. Optional: the public control room

`scripts/gen-live.js` generates a `/live` page from an explicit allowlist
(`scripts/live-data.json`). Internal files are never quoted — only whitelisted fields reach
the page, so it's leak-proof by construction. Publishing your real numbers (including the
zeros) is the cheapest credibility you'll ever buy.

```bash
node scripts/gen-live.js   # writes public/live.html
```

Working example: [our org's /live](https://1h-money-store.vercel.app/live?utm_source=github&utm_medium=starter).
