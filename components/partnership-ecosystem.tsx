"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { portfolioItems } from "@/lib/data";
import { formatViewCount, getBrandVideo } from "@/lib/creator";
import { getBrandLogo } from "@/lib/brands";
import { cn } from "@/lib/utils";
import { RevealText, RevealBlock, RevealLine } from "./reveal-text";

const partnerConfigs: Record<
  string,
  { accent: string; glow: string }
> = {
  Garnier: {
    accent: "from-emerald-500/20 to-cyan-600/10",
    glow: "group-hover:shadow-[0_0_40px_rgba(52,211,153,0.2)]",
  },
  CeraVe: {
    accent: "from-sky-500/20 to-blue-700/10",
    glow: "group-hover:shadow-[0_0_40px_rgba(56,189,248,0.25)]",
  },
  "Disney Plus": {
    accent: "from-indigo-500/20 to-blue-600/10",
    glow: "group-hover:shadow-[0_0_40px_rgba(99,102,241,0.3)]",
  },
  "Ocean Basket": {
    accent: "from-blue-500/20 to-cyan-500/10",
    glow: "group-hover:shadow-[0_0_40px_rgba(59,130,246,0.25)]",
  },
  Zaio: {
    accent: "from-zinc-500/20 to-zinc-600/10",
    glow: "group-hover:shadow-[0_0_40px_rgba(161,161,170,0.2)]",
  },
  "Campus Central": {
    accent: "from-purple-500/20 to-violet-600/10",
    glow: "group-hover:shadow-[0_0_40px_rgba(168,85,247,0.2)]",
  },
  "Clover Tropika": {
    accent: "from-sky-500/20 to-blue-600/10",
    glow: "group-hover:shadow-[0_0_40px_rgba(56,189,248,0.25)]",
  },
};

export function PartnershipEcosystem() {
  const [activePartner, setActivePartner] = useState(0);
  const partners = portfolioItems;
  const active = partners[activePartner];
  const activeVideo = getBrandVideo(active.id);
  const config = partnerConfigs[active.client] ?? {
    accent: "from-accent/20 to-accent/5",
    glow: "group-hover:shadow-[0_0_40px_rgba(0,229,255,0.2)]",
  };

  return (
    <section className="relative overflow-hidden py-20 sm:py-28 md:py-36">
      <div className="noise-overlay absolute inset-0" />
      <div className="pointer-events-none absolute left-1/2 top-0 h-px w-2/3 -translate-x-1/2 bg-gradient-to-r from-transparent via-accent/30 to-transparent" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-16 grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
          <div>
            <span className="text-xs font-medium uppercase tracking-[0.3em] text-accent">
              Partnership Ecosystem
            </span>
            <RevealText
              as="h2"
              className="mt-4 text-3xl font-bold tracking-tight text-text-primary sm:text-4xl md:text-5xl lg:text-6xl"
            >
              Trusted by industry leaders.
            </RevealText>
          </div>
          <RevealBlock delay={0.2}>
            <p className="text-base leading-relaxed text-text-secondary sm:text-lg">
              From global beauty giants to entertainment platforms and local
              innovators — each partnership built on measurable impact, not
              vanity metrics.
            </p>
            <Link
              href="/portfolio"
              data-cursor="hover"
              className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-text-secondary transition-colors hover:text-accent"
            >
              Explore full portfolio
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </RevealBlock>
        </div>

        <RevealLine className="mb-12" />

        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          {/* Logo constellation */}
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4 sm:gap-4">
            {partners.map((partner, index) => {
              const isActive = index === activePartner;
              const cfg = partnerConfigs[partner.client] ?? partnerConfigs.Garnier;
              const video = getBrandVideo(partner.id);

              return (
                <motion.button
                  key={partner.id}
                  type="button"
                  data-cursor="hover"
                  onClick={() => setActivePartner(index)}
                  onMouseEnter={() => setActivePartner(index)}
                  animate={{
                    scale: isActive ? 1.05 : 1,
                    y: isActive ? -4 : 0,
                  }}
                  transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  className={cn(
                    "group relative flex aspect-square flex-col items-center justify-center overflow-hidden rounded-2xl border p-4 transition-all duration-500",
                    "bg-gradient-to-br",
                    cfg.accent,
                    cfg.glow,
                    isActive
                      ? "border-accent/50 bg-surface"
                      : "border-border/60 bg-surface/40 hover:border-accent/30"
                  )}
                >
                  <div className="relative h-12 w-full sm:h-14">
                    <Image
                      src={getBrandLogo(partner.client)}
                      alt={partner.client}
                      fill
                      className={cn(
                        "object-contain transition-all duration-500",
                        isActive ? "brightness-110" : "brightness-90 opacity-70"
                      )}
                      sizes="120px"
                    />
                  </div>
                  {video?.viewCount ? (
                    <span className="mt-2 text-[10px] font-medium text-accent/80">
                      {formatViewCount(video.viewCount)}
                    </span>
                  ) : video?.source === "campaign" ? (
                    <span className="mt-2 text-[10px] font-medium text-accent/80">
                      Campaign reel
                    </span>
                  ) : null}
                  {isActive && (
                    <motion.div
                      layoutId="partner-ring"
                      className="absolute inset-0 rounded-2xl border-2 border-accent/40"
                      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                    />
                  )}
                </motion.button>
              );
            })}
          </div>

          {/* Active partner detail panel */}
          <AnimatePresence mode="wait">
            <motion.div
              key={active.id}
              initial={{ opacity: 0, x: 24, filter: "blur(4px)" }}
              animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, x: -16, filter: "blur(4px)" }}
              transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              className={cn(
                "relative overflow-hidden rounded-[2rem] border border-border bg-surface p-8 sm:p-10",
                "bg-gradient-to-br",
                config.accent
              )}
            >
              <div className="absolute -right-20 -top-20 h-48 w-48 rounded-full bg-accent/10 blur-3xl" />

              <div className="relative">
                <span className="text-xs font-medium uppercase tracking-[0.25em] text-accent">
                  {active.category}
                </span>
                <h3 className="mt-3 text-3xl font-bold text-text-primary sm:text-4xl">
                  {active.client}
                </h3>
                <p className="mt-4 max-w-lg text-base leading-relaxed text-text-secondary">
                  {active.description}
                </p>

                <div className="mt-8 grid gap-3 sm:grid-cols-3">
                  {active.results.map((result, i) => (
                    <motion.div
                      key={result}
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 + i * 0.06 }}
                      className="rounded-xl border border-border/60 bg-background/50 px-4 py-3 backdrop-blur-sm"
                    >
                      <p className="text-sm font-semibold text-text-primary">
                        {result}
                      </p>
                    </motion.div>
                  ))}
                </div>

                {activeVideo?.localPath && (
                  <div className="mt-8 flex items-center gap-4 rounded-xl border border-accent/20 bg-accent/5 px-5 py-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-accent text-background">
                      <ArrowUpRight className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="text-xs uppercase tracking-wider text-text-muted">
                        {activeVideo.source === "campaign"
                          ? "Campaign reel"
                          : "Live campaign reel"}
                      </p>
                      <p className="text-sm font-medium text-accent">
                        {activeVideo.viewCount
                          ? `${formatViewCount(activeVideo.viewCount)} TikTok views`
                          : "Provided campaign footage"}
                      </p>
                    </div>
                    {activeVideo.url && (
                      <a
                        href={activeVideo.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        data-cursor="hover"
                        className="ml-auto text-xs font-medium text-text-secondary transition-colors hover:text-accent"
                      >
                        Watch →
                      </a>
                    )}
                  </div>
                )}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
