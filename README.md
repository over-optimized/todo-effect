# todo-effect

A robust starter project using the TypeScript Effect framework, Bun for the server, and Vite for the React client.

## Features

- Add, toggle, and remove todos
- View todos by All, Active, or Completed status
- Clear all completed todos with one click
- Input validation and error messages
- Todos persist in localStorage (using Effect for side effects)
- All state and side effects managed with the Effect framework
- Fully tested core logic (add, toggle, remove, filter, clear, persistence)

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
- `bun run test` — Run the Vitest test suite

## Project Structure

- `src/server.ts`: Bun server entry point (serves static files and API)
- `src/serverUtils.ts`: Server utility functions
- `src/client/index.tsx`: React client entry point
- `src/client/todoEffects.ts`: Effect-powered business logic
- `src/client/todoEffects.test.ts`: Unit tests for todo logic
- `src/client/todoTypes.ts`: Type definitions
- `src/client/index.html`: React client HTML file
- `src/types/index.ts`: (Legacy/unused, safe to remove if not needed)
- `src/main.ts`: (Legacy/unused, safe to remove if not needed)

## Coming Soon

- Simulated async API calls for todos using Effect
- Further code organization into reusable components and hooks
- More advanced error handling and UI polish
- (Optional) Integration with a backend API

---

This project demonstrates best practices for using the Effect framework in a modern TypeScript/React/Bun stack. Contributions and suggestions are welcome!
