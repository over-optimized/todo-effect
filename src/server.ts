import { serve } from "bun";
import { resolve } from "path";
import { getFilePath, readFileOr404 } from "./serverUtils";

const port = 3001;
const clientDist = resolve(process.cwd(), "dist/client");

serve({
  async fetch(req) {
    const url = new URL(req.url);
    const filePath = getFilePath(clientDist, url.pathname);
    return readFileOr404(filePath);
  },
  port,
});

console.log(`🚀 Bun server running at http://localhost:${port}`);
