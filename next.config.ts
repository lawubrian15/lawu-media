import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // The company profile is a standalone static page (public/profile/index.html)
  // with its own nav and styling, so it deliberately bypasses the app layout.
  // This rewrite just gives it a clean /profile URL instead of /profile/index.html.
  async rewrites() {
    return [{ source: "/profile", destination: "/profile/index.html" }];
  },

  // Files in public/ default to `Cache-Control: public, max-age=0`, which would make
  // every visitor re-download ~35MB of showreel video. The reels never change once
  // uploaded, so cache them hard; the HTML itself stays uncached so edits go live.
  async headers() {
    return [
      {
        source: "/profile/media/:file*",
        headers: [
          { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
        ],
      },
      {
        source:
          "/profile/:file(og-cover\\.jpg|favicon\\.ico|favicon\\.png|apple-touch-icon\\.png)",
        headers: [{ key: "Cache-Control", value: "public, max-age=604800" }],
      },
    ];
  },
};

export default nextConfig;
