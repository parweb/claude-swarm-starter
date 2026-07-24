# bus/ — the file message bus

- `broadcast/` — messages for everyone: `<from>-<topic>.md`. Agents scan it on start and at each pulse.
- `to-main/` — messages targeted at the orchestrator: `<from>-<topic>.md`.
- Need to target another agent? Create `to-<name>/` on demand — the convention is the protocol.

Messages are plain markdown: what happened, what you need, where the details live (file paths).
Never delete a message; the bus is also the org's paper trail.
