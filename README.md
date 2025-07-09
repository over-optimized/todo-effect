# todo-effect

A starter project using the TypeScript Effect framework, Bun for the server, and Vite for the React client.

## Getting Started

1. Install dependencies:
   ```zsh
   bun install
   ```
2. Build the React client for production:
   ```zsh
   bun run build:client
   ```
3. Start the Bun server (serves both API and built React client):
   ```zsh
   bun run start:server
   ```
4. For React client development (hot reload):
   ```zsh
   bun run dev:client
   ```
   Open http://localhost:5173 for the Vite dev server.

## Scripts

- `bun run start:server` — Start the Bun server (http://localhost:3001, serves static files from `dist/client`)
- `bun run dev:client` — Start the React client in development mode with Vite (http://localhost:5173)
- `bun run build:client` — Build the React client for production (output in `dist/client`)

## Project Structure

- `src/server.ts`: Bun server entry point (serves static files and API)
- `src/serverUtils.ts`: Server utility functions
- `src/client/index.tsx`: React client entry point
- `src/client/index.html`: React client HTML file
- `src/types/index.ts`: Type definitions
- `src/main.ts`: (Legacy/unused, safe to remove if not needed)

## Notes

- The server runs on port 3001 by default and serves the built React app from `dist/client`.
- For production, always run `bun run build:client` before starting the server.
- The client entry point is `src/client/index.tsx` and the HTML file is `src/client/index.html`.
- You may need to serve the built client files with a static file server for production if not using the Bun server.
