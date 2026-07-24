# EXPERIMENTS — the R&D ↔ execution loop

Every line = 1 testable bet. R&D proposes (hypothesis + metric + kill/scale threshold).
Execution runs it + pastes the result. North-star metric: **define yours** — and beware:
views/followers are vanity; count qualified clicks, signups, revenue.

## Format
`ID | hypothesis | channel/format | metric | kill/scale threshold | status | result`

## Active
- EXP-01 | <hypothesis> | <channel> | <metric> | kill if <X> ; scale if <Y> | LIVE | (to collect)

## Backlog (prioritized by impact/effort)
- EXP-10 | <hypothesis> | <channel> | <metric> | kill/scale | BACKLOG | effort S/M/L

## Results / learnings
(Execution writes here after collection; R&D derives kill/scale from it. Dated lines.)

---

## ⚙️ LOW-N REGIME (standing directive — replaces "wait for N=30 everywhere")

Early on, you will not have statistical volume. Don't pretend you do — and don't freeze either.

- Signals that are VALID at low N:
  - (a) first reply/reaction from a STRANGER on a post (qualitative, decisive)
  - (b) first attributed click from a channel (proof of throughput existing at all)
  - (c) first citation by an AI engine (Perplexity/ChatGPT cites your domain)
  - (d) first unknown email signup / first checkout-start (intent)
  - Each one = a loggable, dated event in this file.
- N≥30 per branch remains REQUIRED for RATIO decisions (conversion rates, pricing).
  Channel kill/scale: allowed on the qualitative signals above + shortened windows.
- Every review pass: collect new signals → kill/scale/continue decision per EXP → 1 dated line.
- Every review pass: at least 1 new or refined bet enters the table. R&D is a permanent function.
- Hard rule: never circumvent or deceive anti-AI detectors. Play where AI is tolerated.

## Discipline
- No kill/scale verdict below the gate — "inconclusive" is a legitimate, honest status.
- An experiment without a pre-registered kill threshold is not an experiment, it's hope.
- Failures stay in the table. The table IS the org's memory of what doesn't work.
