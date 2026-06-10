"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { ArrowUpRight, ChevronLeft, ChevronRight, Play, Volume2, VolumeX } from "lucide-react";
import { portfolioItems } from "@/lib/data";
import {
  downloadedBrandVideos,
  formatViewCount,
  type BrandVideo,
} from "@/lib/creator";
import { cn } from "@/lib/utils";
import { RevealText, RevealLine } from "./reveal-text";

const logoMap: Record<string, string> = {
  Garnier: "/logos/garnierlogo.png",
  CeraVe: "/logos/CERAVE.webp",
  "Disney Plus": "/logos/disney3d.webp",
  "Ocean Basket": "/logos/oceanbasket.png",
  Zaio: "/logos/zaio.png",
  "Campus Central": "/logos/param.png",
};

type ReelItem = {
  id: string;
  client: string;
  category: string;
  description: string;
  results: string[];
  video?: BrandVideo;
  logo: string;
};

function buildReelItems(): ReelItem[] {
  return portfolioItems
    .map((item) => {
      const video = downloadedBrandVideos[item.id];
      return {
        id: item.id,
        client: item.client,
        category: item.category,
        description: item.description,
        results: item.results,
        video,
        logo: logoMap[item.client] ?? "/logos/garnierlogo.png",
      };
    })
    .filter((item) => item.video);
}

const reelItems = buildReelItems();

function ReelVideo({
  src,
  isActive,
  isHovered,
}: {
  src: string;
  isActive: boolean;
  isHovered: boolean;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    if (isActive || isHovered) {
      video.play().catch(() => {});
    } else {
      video.pause();
      video.currentTime = 0;
    }
  }, [isActive, isHovered]);

  return (
    <video
      ref={videoRef}
      src={src}
      muted
      loop
      playsInline
      preload="metadata"
      className="h-full w-full object-cover"
    />
  );
}

function DesktopReelShowcase() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [isMuted, setIsMuted] = useState(true);
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  const active = reelItems[activeIndex];

  const goTo = useCallback(
    (index: number) => {
      setActiveIndex((index + reelItems.length) % reelItems.length);
    },
    []
  );

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") goTo(activeIndex + 1);
      if (e.key === "ArrowLeft") goTo(activeIndex - 1);
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [activeIndex, goTo]);

  if (reelItems.length === 0) return null;

  return (
    <div ref={sectionRef} className="relative">
      <div className="mb-14 grid gap-6 lg:grid-cols-[1fr_0.55fr] lg:items-end">
        <div>
          <span className="text-xs font-medium uppercase tracking-[0.3em] text-accent">
            Campaign Reels
          </span>
          <RevealText
            as="h2"
            className="mt-4 text-4xl font-bold tracking-tight text-text-primary md:text-5xl lg:text-6xl"
          >
            Stories that move audiences.
          </RevealText>
        </div>
        <p className="text-base leading-relaxed text-text-secondary md:text-lg">
          Curated brand activations — hover to preview, click to immerse. Live
          TikTok campaign footage synced from @pakilawu_.
        </p>
      </div>

      <RevealLine className="mb-10" />

      <div className="relative grid gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:gap-10">
        {/* Featured reel stage */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="relative"
        >
          <div className="absolute -inset-4 rounded-[2.5rem] bg-accent/5 blur-3xl" />
          <div className="relative overflow-hidden rounded-[2rem] border border-border/80 bg-surface shadow-[0_40px_120px_-60px_rgba(0,229,255,0.35)]">
            <AnimatePresence mode="wait">
              <motion.div
                key={active.id}
                initial={{ opacity: 0, scale: 1.04, filter: "blur(8px)" }}
                animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                exit={{ opacity: 0, scale: 0.98, filter: "blur(4px)" }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                className="relative aspect-[9/14] max-h-[72vh] w-full overflow-hidden"
              >
                {active.video?.localPath && (
                  <ReelVideo
                    src={active.video.localPath}
                    isActive
                    isHovered={false}
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-r from-background/40 via-transparent to-transparent" />

                {/* Brand overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-8">
                  <div className="flex items-end justify-between gap-4">
                    <div>
                      <motion.span
                        key={`cat-${active.id}`}
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-xs font-medium uppercase tracking-[0.25em] text-accent"
                      >
                        {active.category}
                      </motion.span>
                      <motion.h3
                        key={`title-${active.id}`}
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.08 }}
                        className="mt-2 text-3xl font-bold text-text-primary md:text-4xl"
                      >
                        {active.client}
                      </motion.h3>
                      {active.video && (
                        <motion.p
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 0.15 }}
                          className="mt-2 text-sm text-text-secondary"
                        >
                          {formatViewCount(active.video.viewCount)} TikTok views
                        </motion.p>
                      )}
                    </div>
                    <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-2 backdrop-blur-md">
                      <Image
                        src={active.logo}
                        alt={active.client}
                        fill
                        className="object-contain"
                        sizes="64px"
                      />
                    </div>
                  </div>
                </div>

                {/* Controls */}
                <div className="absolute right-6 top-6 flex gap-2">
                  <button
                    type="button"
                    onClick={() => setIsMuted((m) => !m)}
                    className="rounded-full border border-white/10 bg-background/60 p-2.5 text-text-secondary backdrop-blur-md transition-colors hover:text-accent"
                    aria-label={isMuted ? "Unmute" : "Mute"}
                  >
                    {isMuted ? (
                      <VolumeX className="h-4 w-4" />
                    ) : (
                      <Volume2 className="h-4 w-4" />
                    )}
                  </button>
                  {active.video?.url && (
                    <a
                      href={active.video.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      data-cursor="hover"
                      className="rounded-full border border-white/10 bg-background/60 p-2.5 text-text-secondary backdrop-blur-md transition-colors hover:text-accent"
                      aria-label={`Watch ${active.client} on TikTok`}
                    >
                      <ArrowUpRight className="h-4 w-4" />
                    </a>
                  )}
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Navigation */}
            <div className="absolute -right-4 top-1/2 z-20 hidden -translate-y-1/2 flex-col gap-2 lg:flex">
              <button
                type="button"
                onClick={() => goTo(activeIndex - 1)}
                data-cursor="hover"
                className="rounded-full border border-border bg-surface p-3 text-text-secondary transition-all hover:border-accent/40 hover:text-accent"
                aria-label="Previous reel"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button
                type="button"
                onClick={() => goTo(activeIndex + 1)}
                data-cursor="hover"
                className="rounded-full border border-border bg-surface p-3 text-text-secondary transition-all hover:border-accent/40 hover:text-accent"
                aria-label="Next reel"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          </div>

          {/* Progress indicator */}
          <div className="mt-6 flex items-center gap-3">
            <span className="text-xs font-medium tabular-nums text-text-muted">
              {String(activeIndex + 1).padStart(2, "0")}
            </span>
            <div className="h-px flex-1 bg-border">
              <motion.div
                className="h-full bg-accent"
                animate={{ width: `${((activeIndex + 1) / reelItems.length) * 100}%` }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              />
            </div>
            <span className="text-xs font-medium tabular-nums text-text-muted">
              {String(reelItems.length).padStart(2, "0")}
            </span>
          </div>
        </motion.div>

        {/* Curated rail + details */}
        <div className="flex flex-col gap-6">
          <div className="space-y-3">
            {reelItems.map((item, index) => {
              const isActive = index === activeIndex;
              const isHovered = hoveredIndex === index;

              return (
                <motion.button
                  key={item.id}
                  type="button"
                  data-cursor="hover"
                  onClick={() => setActiveIndex(index)}
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                  animate={{
                    x: isHovered ? 8 : 0,
                    scale: isActive ? 1.02 : isHovered ? 1.01 : 1,
                  }}
                  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                  className={cn(
                    "group relative w-full overflow-hidden rounded-2xl border text-left transition-colors duration-300",
                    isActive
                      ? "border-accent/50 bg-accent/5"
                      : "border-border bg-surface/50 hover:border-accent/30 hover:bg-surface"
                  )}
                >
                  <div className="flex items-center gap-4 p-4">
                    <div className="relative h-20 w-14 shrink-0 overflow-hidden rounded-xl border border-border bg-background">
                      {item.video?.localPath && (
                        <ReelVideo
                          src={item.video.localPath}
                          isActive={isActive}
                          isHovered={isHovered}
                        />
                      )}
                      <div className="absolute inset-0 flex items-center justify-center bg-background/40 opacity-0 transition-opacity group-hover:opacity-100">
                        <Play className="h-4 w-4 text-accent" />
                      </div>
                    </div>

                    <div className="min-w-0 flex-1">
                      <span className="text-[10px] font-medium uppercase tracking-[0.2em] text-text-muted">
                        {item.category}
                      </span>
                      <p className="truncate text-base font-semibold text-text-primary">
                        {item.client}
                      </p>
                      {item.video && (
                        <p className="text-xs text-accent">
                          {formatViewCount(item.video.viewCount)} views
                        </p>
                      )}
                    </div>

                    <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-lg bg-white/5 p-1">
                      <Image
                        src={item.logo}
                        alt=""
                        fill
                        className="object-contain opacity-70 transition-opacity group-hover:opacity-100"
                        sizes="40px"
                      />
                    </div>
                  </div>

                  {isActive && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      className="overflow-hidden border-t border-border/50 px-4 pb-4"
                    >
                      <p className="pt-3 text-sm leading-relaxed text-text-secondary">
                        {item.description}
                      </p>
                      <div className="mt-3 flex flex-wrap gap-2">
                        {item.results.slice(0, 2).map((result) => (
                          <span
                            key={result}
                            className="rounded-full border border-accent/20 bg-accent/5 px-2.5 py-1 text-[11px] font-medium text-accent"
                          >
                            {result}
                          </span>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </motion.button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

function MobileReelStack() {
  if (reelItems.length === 0) return null;

  return (
    <div className="space-y-6">
      <div>
        <span className="text-xs font-medium uppercase tracking-[0.3em] text-accent">
          Campaign Reels
        </span>
        <h2 className="mt-4 text-3xl font-bold tracking-tight text-text-primary">
          Stories that move audiences.
        </h2>
      </div>
      {reelItems.map((item, index) => (
        <motion.div
          key={item.id}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: index * 0.08 }}
          className="overflow-hidden rounded-2xl border border-border bg-surface"
        >
          {item.video?.localPath && (
            <div className="relative aspect-[9/16] max-h-80 overflow-hidden">
              <video
                src={item.video.localPath}
                muted
                loop
                playsInline
                autoPlay
                preload="metadata"
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
              {item.video && (
                <span className="absolute bottom-3 left-3 rounded-full bg-background/80 px-3 py-1 text-xs font-medium text-accent backdrop-blur-sm">
                  {formatViewCount(item.video.viewCount)} views
                </span>
              )}
            </div>
          )}
          <div className="p-5">
            <span className="text-xs font-medium uppercase tracking-wider text-accent">
              {item.category}
            </span>
            <h3 className="mt-1 text-xl font-bold text-text-primary">
              {item.client}
            </h3>
            <p className="mt-2 text-sm text-text-secondary">{item.description}</p>
          </div>
        </motion.div>
      ))}
    </div>
  );
}

export function ReelShowcase() {
  return (
    <section className="relative overflow-hidden py-16 sm:py-24 md:py-32">
      <div className="pointer-events-none absolute -left-32 top-1/4 h-96 w-96 rounded-full bg-accent/5 blur-3xl" />
      <div className="pointer-events-none absolute -right-32 bottom-1/4 h-80 w-80 rounded-full bg-accent/5 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="hidden lg:block">
          <DesktopReelShowcase />
        </div>
        <div className="lg:hidden">
          <MobileReelStack />
        </div>
      </div>
    </section>
  );
}
