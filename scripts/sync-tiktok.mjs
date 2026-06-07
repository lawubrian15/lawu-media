#!/usr/bin/env node
/**
 * Sync Paki Lawu's TikTok profile stats and brand-matched videos.
 *
 * Usage:
 *   node scripts/sync-tiktok.mjs
 *   node scripts/sync-tiktok.mjs --download --limit 500
 *   node scripts/sync-tiktok.mjs --download-only
 */

import { spawnSync } from "node:child_process";
import { mkdirSync, writeFileSync, existsSync, readdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");
const PROFILE_URL = "https://www.tiktok.com/@pakilawu_";
const OUTPUT_JSON = join(ROOT, "lib", "creator-data.json");
const VIDEOS_DIR = join(ROOT, "public", "videos", "brands");

const BRAND_KEYWORDS = {
  garnier: ["garnier"],
  cerave: ["cerave", "cera ve"],
  "disney-plus": ["disney", "disney+", "disneyplus", "disney plus"],
  "ocean-basket": ["ocean basket", "oceanbasket"],
  zaio: ["zaio"],
  "campus-central": ["campus central", "campuscentral"],
};

const args = process.argv.slice(2);
const shouldDownload = args.includes("--download") || args.includes("--download-only");
const downloadOnly = args.includes("--download-only");
const limitArg = args.find((a) => a.startsWith("--limit="));
const scanLimit = limitArg ? parseInt(limitArg.split("=")[1], 10) : 500;

function resolveYtDlp() {
  const candidates = [
    join(__dirname, "yt-dlp-new.exe"),
    join(__dirname, "yt-dlp.exe"),
    "yt-dlp",
  ];
  for (const bin of candidates) {
    const probe = spawnSync(bin, ["--version"], { encoding: "utf8" });
    if (probe.status === 0) return bin;
  }
  throw new Error(
    "yt-dlp not found. Download yt-dlp.exe to scripts/ or install yt-dlp globally."
  );
}

function formatCount(n) {
  if (n >= 1_000_000) return { value: Math.round((n / 1_000_000) * 10) / 10, suffix: "M+" };
  if (n >= 1_000) return { value: Math.round((n / 1_000) * 10) / 10, suffix: "K+" };
  return { value: n, suffix: "+" };
}

async function fetchProfileStats() {
  const res = await fetch(PROFILE_URL, {
    headers: {
      "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/142.0.0.0 Safari/537.36",
    },
  });
  if (!res.ok) throw new Error(`Failed to fetch TikTok profile: ${res.status}`);
  const html = await res.text();

  const followerMatch = html.match(/"followerCount":(\d+)/);
  const heartMatch = html.match(/"heartCount":(\d+)/);
  const videoMatch = html.match(/"videoCount":(\d+)/);
  const nickMatch = html.match(/"nickname":"([^"]+)"/);

  if (!followerMatch || !heartMatch || !videoMatch) {
    throw new Error("Could not parse profile stats from TikTok page HTML");
  }

  return {
    handle: "pakilawu_",
    displayName: nickMatch?.[1] ?? "Paki Lawu",
    profileUrl: PROFILE_URL,
    followers: parseInt(followerMatch[1], 10),
    totalLikes: parseInt(heartMatch[1], 10),
    videoCount: parseInt(videoMatch[1], 10),
    fetchedAt: new Date().toISOString(),
  };
}

function listVideos(ytDlp, limit) {
  const result = spawnSync(
    ytDlp,
    [
      "--flat-playlist",
      "--print",
      "%(id)s|%(title)s|%(view_count)s|%(like_count)s|%(upload_date)s",
      "--playlist-end",
      String(limit),
      PROFILE_URL,
    ],
    { encoding: "utf8", maxBuffer: 50 * 1024 * 1024 }
  );

  if (result.status !== 0) {
    throw new Error(`yt-dlp failed: ${result.stderr || result.stdout}`);
  }

  return result.stdout
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => {
      const [id, title, views, likes, uploadDate] = line.split("|");
      return {
        id,
        title: title ?? "",
        viewCount: views === "NA" ? 0 : parseInt(views, 10) || 0,
        likeCount: likes === "NA" ? 0 : parseInt(likes, 10) || 0,
        uploadDate: uploadDate === "NA" ? null : uploadDate,
        url: `${PROFILE_URL}/video/${id}`,
      };
    });
}

function matchBrand(title) {
  const lower = title.toLowerCase();
  for (const [brandId, keywords] of Object.entries(BRAND_KEYWORDS)) {
    if (keywords.some((kw) => lower.includes(kw))) return brandId;
  }
  return null;
}

function groupByBrand(videos) {
  const grouped = {};
  for (const video of videos) {
    const brandId = matchBrand(video.title);
    if (!brandId) continue;
    if (!grouped[brandId]) grouped[brandId] = [];
    grouped[brandId].push({ ...video, brandId });
  }
  for (const brandId of Object.keys(grouped)) {
    grouped[brandId].sort((a, b) => b.viewCount - a.viewCount);
  }
  return grouped;
}

function downloadBrandVideos(ytDlp, brandVideos) {
  const downloaded = {};

  for (const [brandId, videos] of Object.entries(brandVideos)) {
    const top = videos[0];
    if (!top) continue;

    const brandDir = join(VIDEOS_DIR, brandId);
    mkdirSync(brandDir, { recursive: true });

    const outputTemplate = join(brandDir, `${top.id}.%(ext)s`);
    console.log(`Downloading ${brandId}: ${top.title.slice(0, 60)}...`);

    const result = spawnSync(
      ytDlp,
      [
        "-f",
        "best[ext=mp4]/best",
        "--no-playlist",
        "-o",
        outputTemplate,
        top.url,
      ],
      { encoding: "utf8", stdio: "pipe" }
    );

    if (result.status !== 0) {
      console.warn(`  Failed: ${result.stderr?.slice(0, 200)}`);
      continue;
    }

    const files = readdirSync(brandDir).filter((f) => f.startsWith(top.id));
    const file = files[0];
    if (file) {
      downloaded[brandId] = {
        ...top,
        localPath: `/videos/brands/${brandId}/${file}`,
      };
      console.log(`  Saved: ${downloaded[brandId].localPath}`);
    }
  }

  return downloaded;
}

function buildSiteStats(profile) {
  const followers = formatCount(profile.followers);
  const likes = formatCount(profile.totalLikes);
  const videos = formatCount(profile.videoCount);

  return [
    { value: followers.value, suffix: followers.suffix, label: "TikTok Followers" },
    { value: likes.value, suffix: likes.suffix, label: "Total Likes" },
    { value: videos.value, suffix: videos.suffix, label: "Videos Created" },
    { value: 6, suffix: "", label: "Brand Partners" },
  ];
}

function pickHeroVideos(downloaded, brandVideos) {
  const candidates = Object.values(downloaded).sort(
    (a, b) => b.viewCount - a.viewCount
  );
  if (candidates.length >= 2) {
    return [
      { src: candidates[0].localPath, label: `${brandLabel(candidates[0].brandId)} Campaign` },
      { src: candidates[1].localPath, label: `${brandLabel(candidates[1].brandId)} Campaign` },
    ];
  }
  if (candidates.length === 1) {
    return [
      { src: candidates[0].localPath, label: `${brandLabel(candidates[0].brandId)} Campaign` },
    ];
  }
  return [];
}

function brandLabel(brandId) {
  const labels = {
    garnier: "Garnier",
    cerave: "CeraVe",
    "disney-plus": "Disney Plus",
    "ocean-basket": "Ocean Basket",
    zaio: "Zaio",
    "campus-central": "Campus Central",
  };
  return labels[brandId] ?? brandId;
}

async function main() {
  const ytDlp = resolveYtDlp();
  console.log(`Using yt-dlp: ${ytDlp}`);

  let profile;
  let videos = [];
  let brandVideos = {};
  let downloaded = {};

  if (!downloadOnly) {
    console.log("Fetching profile stats...");
    profile = await fetchProfileStats();
    console.log(
      `  ${profile.displayName}: ${profile.followers.toLocaleString()} followers, ${profile.totalLikes.toLocaleString()} likes, ${profile.videoCount.toLocaleString()} videos`
    );

    console.log(`Scanning up to ${scanLimit} videos for brand matches...`);
    videos = listVideos(ytDlp, scanLimit);
    brandVideos = groupByBrand(videos);
    console.log(
      `  Found brand matches: ${Object.entries(brandVideos)
        .map(([k, v]) => `${brandLabel(k)} (${v.length})`)
        .join(", ") || "none"}`
    );
  } else {
    const existing = JSON.parse(
      await import("node:fs").then((fs) =>
        fs.readFileSync(OUTPUT_JSON, "utf8")
      )
    );
    profile = existing.profile;
    brandVideos = existing.brandVideos ?? {};
  }

  if (shouldDownload && Object.keys(brandVideos).length > 0) {
    console.log("Downloading top video per matched brand...");
    downloaded = downloadBrandVideos(ytDlp, brandVideos);
  }

  const heroVideos =
    Object.keys(downloaded).length > 0
      ? pickHeroVideos(downloaded, brandVideos)
      : [];

  const payload = {
    profile,
    stats: buildSiteStats(profile),
    brandVideos,
    downloaded,
    heroVideos,
    scannedVideoCount: videos.length,
    lastSyncedAt: new Date().toISOString(),
  };

  writeFileSync(OUTPUT_JSON, JSON.stringify(payload, null, 2) + "\n");
  console.log(`\nWrote ${OUTPUT_JSON}`);
  if (heroVideos.length) {
    console.log("Hero videos:", heroVideos.map((v) => v.src).join(", "));
  }
}

main().catch((err) => {
  console.error(err.message || err);
  process.exit(1);
});
