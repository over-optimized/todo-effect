import { existsSync, readFileSync } from "fs";
import { join } from "path";

export function getFilePath(clientDist: string, urlPath: string): string {
  let filePath = join(clientDist, urlPath === "/" ? "/index.html" : urlPath);
  if (!existsSync(filePath)) {
    // fallback to index.html for SPA routing
    filePath = join(clientDist, "/index.html");
  }
  return filePath;
}

export function getContentType(filePath: string): string {
  const ext = filePath.split(".").pop();
  return ext === "js"
    ? "application/javascript"
    : ext === "css"
    ? "text/css"
    : ext === "html"
    ? "text/html"
    : ext === "json"
    ? "application/json"
    : ext === "ico"
    ? "image/x-icon"
    : ext === "png"
    ? "image/png"
    : ext === "svg"
    ? "image/svg+xml"
    : "text/plain";
}

export function readFileOr404(filePath: string): Response {
  try {
    const data = readFileSync(filePath);
    return new Response(data, {
      headers: { "Content-Type": getContentType(filePath) },
    });
  } catch (e) {
    return new Response("Not found", { status: 404 });
  }
}
