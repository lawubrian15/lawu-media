"use client";

import { clientLogos } from "@/lib/data";

export function LogoMarquee() {
  // Double the logos for seamless infinite scroll
  const doubledLogos = [...clientLogos, ...clientLogos];

  return (
    <div className="relative overflow-hidden py-8">
      {/* Gradient fade on edges */}
      <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

      <div className="flex animate-marquee">
        {doubledLogos.map((logo, index) => (
          <div
            key={`${logo.name}-${index}`}
            className="flex-shrink-0 mx-8 md:mx-12"
          >
            <div className="flex items-center justify-center w-24 h-16 md:w-32 md:h-20 bg-surface/50 rounded-lg border border-border/50">
              <span className="text-lg md:text-xl font-bold text-text-secondary">
                {logo.initials}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
