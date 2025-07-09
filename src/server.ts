import { serve } from "bun";

const port = 3001;

serve({
  fetch() {
    return new Response("Hello from Bun server!");
  },
  port,
});

console.log(`🚀 Bun server running at http://localhost:${port}`);
