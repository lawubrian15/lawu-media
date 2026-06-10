import creatorData from "./creator-data.json";

export type CreatorStat = {
  value: number;
  suffix: string;
  label: string;
};

export type BrandVideo = {
  id?: string;
  title: string;
  viewCount?: number;
  likeCount?: number;
  uploadDate?: string | null;
  url?: string;
  brandId: string;
  localPath?: string;
  source?: "campaign" | "tiktok";
};

export type HeroVideo = {
  src: string;
  label: string;
};

export const creatorProfile = creatorData.profile;
export const creatorStats = creatorData.stats as CreatorStat[];
export const brandVideos = creatorData.brandVideos as Record<string, BrandVideo[]>;
export const downloadedBrandVideos = creatorData.downloaded as Record<string, BrandVideo>;
export const campaignVideos = (creatorData.campaignVideos ?? {}) as Record<string, BrandVideo>;
export const heroVideos = (creatorData.heroVideos ?? []) as HeroVideo[];
export const lastSyncedAt = creatorData.lastSyncedAt;

const portfolioBrandMap: Record<string, string> = {
  garnier: "garnier",
  cerave: "cerave",
  "disney-plus": "disney-plus",
  "ocean-basket": "ocean-basket",
  "tropika-clover": "tropika-clover",
  zaio: "zaio",
  "campus-central": "campus-central",
  thooto: "thooto",
  "psang-feelz": "psang-feelz",
  emeris: "emeris",
  "kena-health": "kena-health",
  "lets-stop": "lets-stop",
  milo: "milo",
  "mr-price": "mr-price",
  naked: "naked",
  payshap: "payshap",
  sarafina: "sarafina",
  "universal-music-group": "universal-music-group",
  wesbank: "wesbank",
  "checkers-sixty60": "checkers-sixty60",
};

export function getBrandVideo(brandId: string): BrandVideo | undefined {
  return campaignVideos[brandId] ?? downloadedBrandVideos[brandId];
}

export function getPortfolioVideo(portfolioId: string): BrandVideo | undefined {
  const brandId = portfolioBrandMap[portfolioId];
  if (!brandId) return undefined;
  return getBrandVideo(brandId);
}

export function formatViewCount(views: number): string {
  if (views >= 1_000_000) return `${(views / 1_000_000).toFixed(1)}M`;
  if (views >= 1_000) return `${Math.round(views / 1_000)}K`;
  return views.toLocaleString();
}
