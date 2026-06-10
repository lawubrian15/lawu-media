"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import {
  getBrandColors,
  brandBorderStyle,
  brandTextStyle,
  brandBgStyle,
  brandGradientStyle,
} from "@/lib/brand-colors";
import { ManagedVideo } from "@/components/managed-video";

interface PortfolioCardProps {
  client: string;
  category: string;
  description: string;
  results: string[];
  index: number;
  videoSrc?: string;
  tiktokUrl?: string;
}

export function PortfolioCard({
  client,
  category,
  description,
  results,
  index,
  videoSrc,
  tiktokUrl,
}: PortfolioCardProps) {
  const colors = getBrandColors(client);
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="group overflow-hidden rounded-2xl border border-border bg-surface transition-all duration-300 hover:shadow-lg"
      style={{
        ...brandGradientStyle(colors),
        ...(hovered ? brandBorderStyle(colors, 0.3) : {}),
      }}
    >
      {videoSrc && (
        <div className="relative aspect-[9/16] max-h-72 overflow-hidden border-b border-border bg-background">
          <ManagedVideo
            src={videoSrc}
            shouldPlay
            preload="metadata"
            tapToPlayOnMobile
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
          {tiktokUrl && (
            <a
              href={tiktokUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="absolute right-3 top-3 rounded-full bg-background/80 p-2 text-text-secondary backdrop-blur-sm transition-colors"
              style={brandTextStyle(colors)}
              aria-label={`Watch ${client} campaign on TikTok`}
            >
              <ArrowUpRight className="h-4 w-4" />
            </a>
          )}
        </div>
      )}

      {/* Header */}
      <div className="border-b border-border p-6 md:p-8">
        <div className="mb-4 flex items-start justify-between">
          <div>
            <span
              className="text-xs font-medium uppercase tracking-wider"
              style={brandTextStyle(colors)}
            >
              {category}
            </span>
            <h3 className="mt-1 text-2xl font-bold text-text-primary">
              {client}
            </h3>
          </div>
          <div
            className="flex h-10 w-10 items-center justify-center rounded-full bg-surface-hover transition-colors group-hover:opacity-100"
            style={brandBgStyle(colors, 0.1)}
          >
            <ArrowUpRight
              className="h-5 w-5 text-text-secondary transition-colors group-hover:opacity-100"
              style={brandTextStyle(colors)}
            />
          </div>
        </div>
        <p className="leading-relaxed text-text-secondary">{description}</p>
      </div>

      {/* Results */}
      <div className="p-6 md:p-8">
        <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-text-primary">
          Results
        </h4>
        <ul className="space-y-2">
          {results.map((result, i) => (
            <li
              key={i}
              className="flex items-center gap-2 text-sm text-text-secondary"
            >
              <span
                className="h-1.5 w-1.5 flex-shrink-0 rounded-full"
                style={{ backgroundColor: colors.primary }}
              />
              {result}
            </li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
}
