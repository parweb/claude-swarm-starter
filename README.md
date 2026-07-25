# claude-swarm-starter

**Run your own org of Claude agents — coordinated through plain files in one shared directory.**

No framework. No message queue. No database. Agents are `claude -p` processes that read and write markdown files in a shared world. That's the whole trick, and it works in production.

> **Extracted from a real autonomous org running a real store.** This isn't a thought experiment: the system these templates generalize runs an actual online store with real Stripe revenue, publishes its own decision log, and consumed a countable number of human interventions. Real numbers, live: [/live control room](https://1h-money-store.vercel.app/live?utm_source=github&utm_medium=starter) · [flight recorder (raw internal files)](https://github.com/parweb/god-flight-recorder) · [leaderboard](https://1h-money-store.vercel.app/leaderboard?utm_source=github&utm_medium=starter)

## What's in the box

| File | What it is |
|---|---|
| [`RULES.md`](RULES.md) | The shared-world protocol every agent receives. The constitution. |
| [`STATE.md`](STATE.md) | Global world state skeleton + dated-log conventions. |
| [`HUMAN.md`](HUMAN.md) | The "only true human walls" doctrine — the human is an escalation target of last resort, not a manager. |
| [`AGENTS.md`](AGENTS.md) | Agent registry template (who exists, what they own, what they shipped). |
| [`bus/`](bus/) | File-based message bus: `broadcast/` for everyone, `to-main/` for the orchestrator. |
| [`critique/CHARTER.md`](critique/CHARTER.md) | Adversarial self-critique charter: CRITIQUE, QUALITY, and META passes. |
| [`rnd/EXPERIMENTS.md`](rnd/EXPERIMENTS.md) | Bets table with kill/scale thresholds + the low-N signal regime. |
| [`scripts/gen-live.js`](scripts/gen-live.js) | Zero-dependency generator for a public `/live` control room page, fed by an explicit allowlist (leak-proof by construction). |
| [`QUICKSTART.md`](QUICKSTART.md) | How to actually launch the swarm, keep it honest, and not get banned. |

## Why files?

- **Total observability.** Every message, decision and result is a file you can `cat`. Debugging a swarm = `ls -lt`.
- **Zero infrastructure.** Works on a laptop. Survives crashes — the world state IS the disk.
- **Any agent can read everything.** No permissions, no silos. Coordination emerges from a registry, a bus and a state file.
- **Auditable by outsiders.** Our own org publishes its internal files publicly. Try doing that with a Redis queue.

## Quick start

```bash
git clone https://github.com/parweb/claude-swarm-starter my-org && cd my-org
rm -rf .git && git init   # your world, your history
# edit STATE.md: set your objective and constraints
claude   # start your orchestrator interactively, paste it RULES.md, go
```

Full walkthrough, including background spawning, the periodic pulse and the anti-theater discipline: [QUICKSTART.md](QUICKSTART.md).

## License

MIT. Take it, fork it, run your own org.

---

*An Operator's Manual with the annotated decision log (what we tried, what died, the critique verdicts) is coming if there's interest — [open an issue](../../issues) if you'd want that.*

---

## Related

- [landing-copy-grader](https://github.com/parweb/landing-copy-grader) — Deterministic 0-100 grader: does your landing page hero copy read as AI-generated? Single HTML file, no LLM, no backend.
- [god-flight-recorder](https://github.com/parweb/god-flight-recorder) — Flight recorder of an autonomous AI org running a real business. All decisions on file.
- [leverage-dev-rules](https://github.com/parweb/leverage-dev-rules) — Cursor rules for solo founders shipping their own product.
- [studio-starter](https://github.com/parweb/studio-starter) — Free single-file HTML landing page starter — editorial serif, no build step, MIT.

- **Open dataset:** [239 landing pages scored for AI-slop copy](https://gist.github.com/parweb/5ed569ba76c365f7b789a979ad6090e7) — CSV + method, deterministic, no LLM.
