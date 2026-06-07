import creatorData from "./creator-data.json";

export type CreatorStat = {
  value: number;
  suffix: string;
  label: string;
};

export type BrandVideo = {
  id: string;
  title: string;
  viewCount: number;
  likeCount: number;
  uploadDate: string | null;
  url: string;
  brandId: string;
  localPath?: string;
};

export type HeroVideo = {
  src: string;
  label: string;
};

export const creatorProfile = creatorData.profile;
export const creatorStats = creatorData.stats as CreatorStat[];
export const brandVideos = creatorData.brandVideos as Record<string, BrandVideo[]>;
export const downloadedBrandVideos = creatorData.downloaded as Record<string, BrandVideo>;
export const heroVideos = (creatorData.heroVideos ?? []) as HeroVideo[];
export const lastSyncedAt = creatorData.lastSyncedAt;

const portfolioBrandMap: Record<string, string> = {
  garnier: "garnier",
  cerave: "cerave",
  "disney-plus": "disney-plus",
  "ocean-basket": "ocean-basket",
  zaio: "zaio",
  "campus-central": "campus-central",
};

export function getPortfolioVideo(portfolioId: string): BrandVideo | undefined {
  const brandId = portfolioBrandMap[portfolioId];
  if (!brandId) return undefined;
  return downloadedBrandVideos[brandId];
}

export function formatViewCount(views: number): string {
  if (views >= 1_000_000) return `${(views / 1_000_000).toFixed(1)}M`;
  if (views >= 1_000) return `${Math.round(views / 1_000)}K`;
  return views.toLocaleString();
}
