import type { CSSProperties } from "react";

/** Logo-derived brand accent palette — refined for dark luxury UI */

export type BrandColorConfig = {
  /** Primary brand hex (logo-matched) */
  primary: string;
  /** RGB tuple for rgba() usage */
  rgb: readonly [number, number, number];
};

function brandColor(
  primary: string,
  rgb: readonly [number, number, number]
): BrandColorConfig {
  return { primary, rgb };
}

/** Logo-matched hues per brand */
export const brandColorMap: Record<string, BrandColorConfig> = {
  Garnier: brandColor("#00A651", [0, 166, 81]),
  CeraVe: brandColor("#0072CE", [0, 114, 206]),
  "Disney Plus": brandColor("#0063E5", [0, 99, 229]),
  "Ocean Basket": brandColor("#004B87", [0, 75, 135]),
  "Clover Tropika": brandColor("#FF7900", [255, 121, 0]),
  Zaio: brandColor("#6366F1", [99, 102, 241]),
  "Campus Central": brandColor("#7C3AED", [124, 58, 237]),
  Naked: brandColor("#E84393", [232, 67, 147]),
  "Universal Music Group": brandColor("#E10600", [225, 6, 0]),
  Milo: brandColor("#006A44", [0, 106, 68]),
  "Checkers Sixty60": brandColor("#E4002B", [228, 0, 43]),
  "Mr Price": brandColor("#ED1C24", [237, 28, 36]),
  WesBank: brandColor("#003DA5", [0, 61, 165]),
  PayShap: brandColor("#00A651", [0, 166, 81]),
  "Kena Health": brandColor("#00B894", [0, 184, 148]),
  Emeris: brandColor("#C9A962", [201, 169, 98]),
  Thooto: brandColor("#2563EB", [37, 99, 235]),
  "Let's Stop": brandColor("#EF4444", [239, 68, 68]),
};

const siteAccent = brandColor("#00E5FF", [0, 229, 255]);

export function getBrandColors(client: string): BrandColorConfig {
  return brandColorMap[client] ?? siteAccent;
}

const heroBrandIdMap: Record<string, string> = {
  "disney-plus": "Disney Plus",
  "ocean-basket": "Ocean Basket",
  "tropika-clover": "Clover Tropika",
  garnier: "Garnier",
  "campus-central": "Campus Central",
  zaio: "Zaio",
};

export function getBrandColorsFromVideoSrc(src: string): BrandColorConfig {
  const match = src.match(/\/videos\/brands\/([^/]+)\//);
  if (match) {
    const client = heroBrandIdMap[match[1]];
    if (client) return getBrandColors(client);
  }
  return siteAccent;
}

export function getBrandColorsFromHeroLabel(label: string): BrandColorConfig {
  for (const client of Object.keys(brandColorMap)) {
    if (label.startsWith(client)) return getBrandColors(client);
  }
  return siteAccent;
}

export function getBrandColorsForHero(source: {
  src: string;
  label: string;
}): BrandColorConfig {
  const fromPath = getBrandColorsFromVideoSrc(source.src);
  if (fromPath !== siteAccent) return fromPath;
  return getBrandColorsFromHeroLabel(source.label);
}

function rgba(config: BrandColorConfig, alpha: number): string {
  const [r, g, b] = config.rgb;
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

/** Card / panel gradient tint */
export function brandGradientStyle(config: BrandColorConfig): CSSProperties {
  return {
    backgroundImage: `linear-gradient(to bottom right, ${rgba(config, 0.16)}, ${rgba(config, 0.05)})`,
  };
}

/** Hover / active glow */
export function brandGlowStyle(
  config: BrandColorConfig,
  intensity = 0.22
): CSSProperties {
  return { boxShadow: `0 0 40px ${rgba(config, intensity)}` };
}

/** Featured reel stage shadow */
export function brandFeaturedShadowStyle(
  config: BrandColorConfig
): CSSProperties {
  const [r, g, b] = config.rgb;
  return {
    boxShadow: `0 40px 120px -60px rgba(${r}, ${g}, ${b}, 0.32)`,
  };
}

export function brandBorderStyle(
  config: BrandColorConfig,
  alpha: number
): CSSProperties {
  return { borderColor: rgba(config, alpha) };
}

export function brandTextStyle(config: BrandColorConfig): CSSProperties {
  return { color: config.primary };
}

export function brandBgStyle(
  config: BrandColorConfig,
  alpha: number
): CSSProperties {
  return { backgroundColor: rgba(config, alpha) };
}

/** Hero switcher active pill */
export function brandHeroActiveStyle(config: BrandColorConfig): CSSProperties {
  return {
    backgroundColor: config.primary,
    color: "#0A0A0A",
  };
}

/** Progress bar fill */
export function brandProgressStyle(config: BrandColorConfig): CSSProperties {
  return { backgroundColor: config.primary };
}
