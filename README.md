# todo-effect

A starter project using the TypeScript Effect framework.

## Getting Started

1. Install dependencies:
   ```zsh
   npm install
   ```
2. Run the Bun server:
   ```zsh
   npm run start:server
   ```
3. Run the React client (development):
   ```zsh
   npm run dev:client
   ```

## Scripts

- `npm run start:server` — Start the Bun server (http://localhost:3001)
- `npm run dev:client` — Start the React client in development mode with Vite (http://localhost:5173)
- `npm run build:client` — Build the React client for production (output in `dist/client`)

## Building the React Client

To build the React client for production:

```zsh
npm run build:client
```

The output will be in `dist/client`.

## Project Structure

- `src/main.ts`: Entry point of the application.
- `src/types/index.ts`: Type definitions.
- `src/server.ts`: Bun server entry point.
- `src/client/index.tsx`: React client entry point.
- `src/client/index.html`: React client HTML file.

## Notes

- The server runs on port 3001 by default.
- The client entry point is `src/client/index.tsx` and the HTML file is `src/client/index.html`.
- You may need to serve the built client files with a static file server for production.
