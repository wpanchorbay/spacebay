import type { APIRoute } from "astro";
import { FEED_LINKS } from "../lib/links";

export const prerender = true;

export const GET: APIRoute = () => {
  const body = [
    "User-agent: *",
    "Allow: /",
    "",
    `Sitemap: ${FEED_LINKS.sitemap}`,
    "",
    "# LLM-friendly content endpoints:",
    `# ${FEED_LINKS.llms}`,
    `# ${FEED_LINKS.llmsFull}`,
  ].join("\n");

  return new Response(`${body}\n`, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
    },
  });
};
