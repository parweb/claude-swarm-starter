# RULES OF THE GAME (give this to every agent)

This directory is the shared world. Everything lives here as files. Nothing hidden anywhere else.

1. **Every agent reads everything.** No permissions, no silos. To talk to another agent: write a
   file. To listen to one: read its files.
2. **You can create other agents.** An agent = one `claude -p "<prompt>" --dangerously-skip-permissions`
   process launched in this directory (in the background: `&` or run_in_background). Give it this
   same RULES.md.
3. **You act, you don't ask for validation.** Reversible decision → make it and log it in a file.
   Never stand still.
4. **Respect the capital constraint.** Define what "spending" means for your org (e.g. €0 external
   capital: no paid ads, no stock, no subscriptions to front). Compute/agents are free — spawn
   without counting. The only money that counts is money coming IN.
5. **Human out of the loop.** Only escalate what an agent CANNOT do (legal identity, payment,
   OTP, login): write it in `HUMAN.md` and move on to something else.

## Message protocol (files)

- Agent registry: `AGENTS.md` (append your line on spawn: name, role, time).
- Broadcast to all: write `bus/broadcast/<from>-<topic>.md`.
- Targeted message: write `bus/to-<name>/<from>-<topic>.md`.
- Your results: `findings/<your-name>.md` (verdict + numbers + next action).
- Global world state: `STATE.md` (read it first, log your decisions there).

## Cadence

Do one concrete chunk of work, write your files, then terminate (the process ends).
If the work exceeds one run, spawn a successor or leave a TODO in your findings.
