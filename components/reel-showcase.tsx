"use client";

import { useState, useRef, useEffect, useCallback, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence, useInView } from "framer-motion";
import {
  ArrowRight,
  ArrowUpRight,
  ChevronLeft,
  ChevronRight,
  Play,
  Volume2,
  VolumeX,
} from "lucide-react";
import { getPartners } from "@/lib/data";
import { getPortfolioVideo, type BrandVideo } from "@/lib/creator";
import { getBrandLogo } from "@/lib/brands";
import {
  getBrandColors,
  brandBorderStyle,
  brandTextStyle,
  brandBgStyle,
  brandFeaturedShadowStyle,
  brandProgressStyle,
} from "@/lib/brand-colors";
import { cn } from "@/lib/utils";
import { RevealText, RevealLine } from "./reveal-text";
import { Button } from "./button";
import { ManagedVideo } from "./managed-video";
import { requestPlay, pauseVideo } from "@/lib/video-playback";

type ReelItem = {
  id: string;
  client: string;
  category: string;
  description: string;
  results: string[];
  video?: BrandVideo;
  logo: string;
};

function buildReelItems(partnerIds: string[]): ReelItem[] {
  const partners = getPartners().filter((item) => partnerIds.includes(item.id));

  return partners
    .map((item) => {
      const video = getPortfolioVideo(item.id);
      return {
        id: item.id,
        client: item.client,
        category: item.category,
        description: item.description,
        results: item.results,
        video,
        logo: getBrandLogo(item.client),
      };
    })
    .filter((item) => item.video?.localPath);
}

function ReelThumbnail({
  src,
  isActive,
  isHovered,
  sectionInView,
}: {
  src: string;
  isActive: boolean;
  isHovered: boolean;
  sectionInView: boolean;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const shouldPlay = sectionInView && isHovered && !isActive;

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (shouldPlay) {
      requestPlay(video).catch(() => {});
    } else {
      pauseVideo(video);
      if (!isActive) video.currentTime = 0;
    }
  }, [shouldPlay, isActive]);

  return (
    <video
      ref={videoRef}
      src={src}
      muted
      loop
      playsInline
      preload="none"
      className="h-full w-full object-contain bg-background"
    />
  );
}

function FeaturedReelVideo({
  src,
  muted,
  shouldPlay,
}: {
  src: string;
  muted: boolean;
  shouldPlay: boolean;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = muted;
  }, [muted]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (shouldPlay) {
      requestPlay(video).catch(() => {});
    } else {
      pauseVideo(video);
    }
  }, [shouldPlay]);

  return (
    <video
      ref={videoRef}
      src={src}
      muted={muted}
      loop
      playsInline
      preload="metadata"
      className="h-full w-full object-contain bg-background"
    />
  );
}

interface ReelShowcaseProps {
  featuredOnly?: boolean;
  limit?: number;
}

function DesktopReelShowcase({ reelItems }: { reelItems: ReelItem[] }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [isMuted, setIsMuted] = useState(true);
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { margin: "-80px", amount: 0.2 });

  const active = reelItems[activeIndex];
  const activeColors = getBrandColors(active.client);

  const goTo = useCallback(
    (index: number) => {
      setActiveIndex((index + reelItems.length) % reelItems.length);
    },
    [reelItems.length]
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
          <div
            className="absolute -inset-4 rounded-[2.5rem] blur-3xl"
            style={brandBgStyle(activeColors, 0.05)}
          />
          <div
            className="relative overflow-hidden rounded-[2rem] border border-border/80 bg-surface"
            style={brandFeaturedShadowStyle(activeColors)}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={active.id}
                initial={{ opacity: 0, scale: 1.02 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.99 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="relative aspect-[9/14] max-h-[72vh] w-full overflow-hidden"
              >
                {active.video?.localPath && (
                  <FeaturedReelVideo
                    src={active.video.localPath}
                    muted={isMuted}
                    shouldPlay={isInView}
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
                        className="text-xs font-medium uppercase tracking-[0.25em]"
                        style={brandTextStyle(activeColors)}
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
                      {active.video?.source === "campaign" ? (
                        <motion.p
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 0.15 }}
                          className="mt-2 text-sm text-text-secondary"
                        >
                          Campaign footage
                        </motion.p>
                      ) : null}
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
                animate={{
                  width: `${((activeIndex + 1) / reelItems.length) * 100}%`,
                }}
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
              const itemColors = getBrandColors(item.client);

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
                      ? ""
                      : "border-border bg-surface/50 hover:bg-surface"
                  )}
                  style={
                    isActive
                      ? {
                          ...brandBorderStyle(itemColors, 0.45),
                          ...brandBgStyle(itemColors, 0.07),
                        }
                      : isHovered
                        ? brandBorderStyle(itemColors, 0.28)
                        : undefined
                  }
                >
                  <div className="flex items-center gap-4 p-4">
                    <div className="relative h-20 w-14 shrink-0 overflow-hidden rounded-xl border border-border bg-background">
                      {item.video?.localPath && (
                        <ReelThumbnail
                          src={item.video.localPath}
                          isActive={isActive}
                          isHovered={isHovered}
                          sectionInView={isInView}
                        />
                      )}
                      <div
                        className={cn(
                          "absolute inset-0 flex items-center justify-center bg-background/40 transition-opacity",
                          isHovered && !isActive ? "opacity-0" : "opacity-100"
                        )}
                      >
                        <Play className="h-4 w-4" style={brandTextStyle(itemColors)} />
                      </div>
                    </div>

                    <div className="min-w-0 flex-1">
                      <span className="text-[10px] font-medium uppercase tracking-[0.2em] text-text-muted">
                        {item.category}
                      </span>
                      <p className="truncate text-base font-semibold text-text-primary">
                        {item.client}
                      </p>
                      {item.video?.source === "campaign" ? (
                        <p className="text-xs" style={brandTextStyle(itemColors)}>
                          Campaign reel
                        </p>
                      ) : null}
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
                            className="rounded-full border px-2.5 py-1 text-[11px] font-medium"
                            style={{
                              ...brandBorderStyle(itemColors, 0.2),
                              ...brandBgStyle(itemColors, 0.05),
                              ...brandTextStyle(itemColors),
                            }}
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

function MobileReelCarousel({
  reelItems,
  showPortfolioCta,
}: {
  reelItems: ReelItem[];
  showPortfolioCta?: boolean;
}) {
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  if (reelItems.length === 0) return null;

  const active = reelItems[activeIndex];

  const scrollToIndex = (index: number) => {
    const container = scrollRef.current;
    if (!container) return;
    const child = container.children[index] as HTMLElement | undefined;
    child?.scrollIntoView({ behavior: "smooth", inline: "start", block: "nearest" });
    setActiveIndex(index);
  };

  return (
    <div className="space-y-6">
      <div>
        <span className="text-xs font-medium uppercase tracking-[0.3em] text-accent">
          Campaign Reels
        </span>
        <h2 className="mt-3 text-2xl font-bold tracking-tight text-text-primary sm:text-3xl">
          Stories that move audiences.
        </h2>
        <p className="mt-3 text-sm leading-relaxed text-text-secondary">
          Swipe through featured campaign footage from our flagship brand
          partnerships.
        </p>
      </div>

      <div
        ref={scrollRef}
        className="snap-carousel -mx-4 flex gap-4 overflow-x-auto px-4 pb-2"
        onScroll={() => {
          const container = scrollRef.current;
          if (!container || container.children.length === 0) return;
          const cardWidth = (container.children[0] as HTMLElement).offsetWidth + 16;
          const index = Math.round(container.scrollLeft / cardWidth);
          setActiveIndex(Math.min(index, reelItems.length - 1));
        }}
      >
        {reelItems.map((item) => {
          const itemColors = getBrandColors(item.client);
          return (
          <div
            key={item.id}
            className="w-[85vw] max-w-sm shrink-0 overflow-hidden rounded-2xl border border-border bg-surface"
            style={brandBorderStyle(itemColors, 0.15)}
          >
            {item.video?.localPath && (
              <div className="relative aspect-[9/16] max-h-72 overflow-hidden">
                <ManagedVideo
                  src={item.video.localPath}
                  shouldPlay
                  preload="metadata"
                  tapToPlayOnMobile
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
                {item.video?.source === "campaign" ? (
                  <span
                    className="pointer-events-none absolute bottom-3 left-3 rounded-full bg-background/80 px-3 py-1 text-xs font-medium backdrop-blur-sm"
                    style={brandTextStyle(itemColors)}
                  >
                    Campaign reel
                  </span>
                ) : null}
              </div>
            )}
            <div className="p-4">
              <span
                className="text-[10px] font-medium uppercase tracking-wider"
                style={brandTextStyle(itemColors)}
              >
                {item.category}
              </span>
              <h3 className="mt-1 text-lg font-bold text-text-primary">
                {item.client}
              </h3>
              <p className="mt-2 line-clamp-2 text-sm text-text-secondary">
                {item.description}
              </p>
            </div>
          </div>
          );
        })}
      </div>

      {/* Dot indicators + nav */}
      <div className="flex items-center justify-between gap-4">
        <div className="flex gap-1.5">
          {reelItems.map((item, index) => (
            <button
              key={item.id}
              type="button"
              onClick={() => scrollToIndex(index)}
              className={cn(
                "tap-target h-2 rounded-full transition-all duration-300",
                index === activeIndex
                  ? "w-6 bg-accent"
                  : "w-2 bg-border hover:bg-text-muted"
              )}
              aria-label={`Go to ${item.client} reel`}
            />
          ))}
        </div>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => scrollToIndex(Math.max(0, activeIndex - 1))}
            className="tap-target rounded-full border border-border bg-surface p-2.5 text-text-secondary"
            aria-label="Previous reel"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={() =>
              scrollToIndex(Math.min(reelItems.length - 1, activeIndex + 1))
            }
            className="tap-target rounded-full border border-border bg-surface p-2.5 text-text-secondary"
            aria-label="Next reel"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Compact active reel summary */}
      <div className="rounded-2xl border border-border/80 bg-surface/60 p-4">
        <p className="text-xs uppercase tracking-wider text-text-muted">
          Now viewing
        </p>
        <p className="mt-1 text-base font-semibold text-text-primary">
          {active.client}
        </p>
        {active.video?.url && (
          <a
            href={active.video.url}
            target="_blank"
            rel="noopener noreferrer"
            className="tap-target mt-3 inline-flex items-center gap-1.5 text-sm font-medium text-accent"
          >
            Watch on TikTok
            <ArrowUpRight className="h-3.5 w-3.5" />
          </a>
        )}
      </div>

      {showPortfolioCta && (
        <div className="text-center">
          <Button href="/portfolio" variant="secondary" size="md">
            Explore portfolio
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      )}
    </div>
  );
}

export function ReelShowcase({
  featuredOnly = false,
  limit,
}: ReelShowcaseProps) {
  const reelItems = useMemo(() => {
    const partnerIds = getPartners({ featuredOnly, limit }).map((p) => p.id);
    const scopeIds =
      featuredOnly || limit ? partnerIds : getPartners().map((p) => p.id);
    const items = buildReelItems(scopeIds);
    if (limit && limit > 0) return items.slice(0, limit);
    return items;
  }, [featuredOnly, limit]);

  const showPortfolioCta = featuredOnly;

  if (reelItems.length === 0) return null;

  return (
    <section className="relative overflow-hidden py-section">
      <div className="pointer-events-none absolute -left-32 top-1/4 h-96 w-96 rounded-full bg-accent/5 blur-3xl" />
      <div className="pointer-events-none absolute -right-32 bottom-1/4 h-80 w-80 rounded-full bg-accent/5 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="hidden lg:block">
          <DesktopReelShowcase reelItems={reelItems} />
        </div>
        <div className="lg:hidden">
          <MobileReelCarousel
            reelItems={reelItems}
            showPortfolioCta={showPortfolioCta}
          />
        </div>
      </div>
    </section>
  );
}
