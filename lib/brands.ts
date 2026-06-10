// Centralized brand logo paths — single source for all UI components
export const brandLogoMap: Record<string, string> = {
  Garnier: "/logos/garnier.png",
  CeraVe: "/logos/cerave.png",
  "Disney Plus": "/logos/disney3d.webp",
  "Ocean Basket": "/logos/ocean-basket.webp",
  "Clover Tropika": "/logos/clover-tropika.png",
  Zaio: "/logos/zaio.png",
  "Campus Central": "/logos/campus-central.svg",
  Thooto: "/logos/thooto.png",
  Emeris: "/logos/emeris.jpg",
  "Kena Health": "/logos/kena-health.png",
  "Let's Stop": "/logos/lets-stop.png",
  Milo: "/logos/milo.jpeg",
  "Mr Price": "/logos/mr-price.png",
  Naked: "/logos/naked.jpeg",
  PayShap: "/logos/payshap.png",
  "Universal Music Group": "/logos/universal-music-group.svg",
  WesBank: "/logos/wesbank.webp",
  "Checkers Sixty60": "/logos/checkers-sixty60.png",
};

export function getBrandLogo(client: string): string {
  return brandLogoMap[client] ?? "/logos/garnier.png";
}
