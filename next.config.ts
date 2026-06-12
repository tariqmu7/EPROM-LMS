import type { NextConfig } from "next";

// On GitHub Pages a project site is served from https://<user>.github.io/<repo>/,
// so assets and routes must be prefixed with the repo name. The deploy workflow
// passes this in as PAGES_BASE_PATH (e.g. "/EPROM-LMS"). Locally it stays empty.
const basePath = process.env.PAGES_BASE_PATH || "";

const nextConfig: NextConfig = {
  // Emit a fully static site into ./out for GitHub Pages.
  output: "export",
  // GitHub Pages has no Next.js image optimization server.
  images: { unoptimized: true },
  // Serve under the repo subpath; next/link and next/image apply this automatically.
  basePath,
  // Expose the prefix to client code that builds non-Link URLs (e.g. fetch, <img src>).
  env: { NEXT_PUBLIC_BASE_PATH: basePath },
  // Emit /route/index.html so refreshes on nested routes resolve on a static host.
  trailingSlash: true,
};

export default nextConfig;
