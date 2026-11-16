# make.fun frontend

A read-only static frontend for public make.fun bounties, leaderboards, and builder profiles. It uses hash routes and loads data from the public API.

Run the local server with `node serve.ts` (or `node serve.ts --port 9000`). Open `http://localhost:8080`.

Run `node main.ts` to copy the deliverable into `/output`. Set `MAKEFUN_OUTPUT_DIR` to choose another destination.
