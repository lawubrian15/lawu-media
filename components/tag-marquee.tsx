"use client";

import { expertiseTags } from "@/lib/data";

export function TagMarquee() {
  // Double the tags for seamless infinite scroll
  const doubledTags = [...expertiseTags, ...expertiseTags];

  return (
    <div className="relative overflow-hidden py-6 bg-surface border-y border-border">
      <div className="flex animate-marquee-reverse whitespace-nowrap">
        {doubledTags.map((tag, index) => (
          <div
            key={`${tag}-${index}`}
            className="flex-shrink-0 mx-6 md:mx-10"
          >
            <span className="text-lg md:text-2xl font-medium text-text-muted">
              {tag}
            </span>
            <span className="mx-4 md:mx-6 text-accent">●</span>
          </div>
        ))}
      </div>
    </div>
  );
}
