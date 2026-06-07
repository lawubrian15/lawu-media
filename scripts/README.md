# TikTok Sync Scripts

Automates fetching Paki Lawu's TikTok profile stats and downloading brand-matched campaign videos for the Lawu Media site.

## Prerequisites

- **Node.js** 18+ (ships with the repo's Next.js toolchain)
- **yt-dlp** — place a working `yt-dlp.exe` in this folder (`scripts/yt-dlp-new.exe` is used if present)

Download yt-dlp for Windows:

```powershell
Invoke-WebRequest -Uri "https://github.com/yt-dlp/yt-dlp/releases/latest/download/yt-dlp.exe" -OutFile "scripts/yt-dlp-new.exe"
```

> The bundled `yt-dlp.exe` may be corrupted. Use `yt-dlp-new.exe` or reinstall.

## Usage

From the repo root:

```bash
# Fetch stats + scan videos (no downloads)
node scripts/sync-tiktok.mjs

# Fetch stats, scan 500 videos, download top video per matched brand
node scripts/sync-tiktok.mjs --download

# Scan more videos
node scripts/sync-tiktok.mjs --download --limit=1000

# Re-download using existing creator-data.json brand matches
node scripts/sync-tiktok.mjs --download-only
```

## What it does

1. Scrapes `@pakilawu_` profile stats (followers, total likes, video count) from TikTok page HTML
2. Lists recent videos via `yt-dlp --flat-playlist`
3. Matches videos to site brands using keyword rules in `sync-tiktok.mjs`
4. Downloads the highest-view video per matched brand to `public/videos/brands/{brand-id}/`
5. Writes `lib/creator-data.json` consumed by the site

## Brand keyword mapping

| Brand ID        | Keywords                                      |
|-----------------|-----------------------------------------------|
| `garnier`       | garnier                                       |
| `cerave`        | cerave, cera ve                               |
| `disney-plus`   | disney, disney+, disneyplus, disney plus      |
| `ocean-basket`  | ocean basket, oceanbasket                     |
| `zaio`          | zaio                                          |
| `campus-central`| campus central, campuscentral                 |

## Output

- `lib/creator-data.json` — profile stats, brand video index, hero video paths
- `public/videos/brands/` — downloaded MP4s organized by brand

## Notes

- TikTok rate-limits aggressive scraping; use reasonable `--limit` values
- Downloaded videos are for portfolio/demo use; respect TikTok ToS and brand usage rights
- Re-run periodically to refresh stats and pick up new brand content
