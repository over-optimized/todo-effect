# todo-effect

A starter project using the TypeScript Effect framework.

## Getting Started

1. Install dependencies:
   ```zsh
   npm install
   ```
2. Run the project:
   ```zsh
   npm run start
   ```

## Running the Bun Server

To start the Bun server:

```zsh
bun run src/server.ts
```

Or use the script:

```zsh
npm run start:server
```

## Running the React Client (Development)

To start the React client in development mode with hot reload:

```zsh
bun --hot src/client/index.tsx
```

Or use the script:

```zsh
npm run dev:client
```

## Building the React Client

To build the React client for production:

```zsh
bun build src/client/index.tsx --outdir dist/client
```

Or use the script:

```zsh
npm run build:client
```

## Building the Bun Server

To build the server TypeScript to JavaScript:

```zsh
tsc src/server.ts --outDir dist/server
```

Or use the script:

```zsh
npm run build:server
```

## Project Structure

- `src/main.ts`: Entry point of the application.
- `src/types/index.ts`: Type definitions.

## Notes

- The server runs on port 3001 by default.
- The client entry point is `src/client/index.tsx` and the HTML file is `src/client/index.html`.
- You may need to serve the built client files with a static file server for production.
