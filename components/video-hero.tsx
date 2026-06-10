"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { requestPlay, pauseVideo } from "@/lib/video-playback";
import {
  getBrandColorsForHero,
  brandHeroActiveStyle,
} from "@/lib/brand-colors";

type HeroVideoSource = {
  src: string;
  label: string;
};

interface VideoHeroProps {
  videos?: HeroVideoSource[];
  videoSrc1?: string;
  videoSrc2?: string;
}

const DEFAULT_VIDEOS: HeroVideoSource[] = [
  {
    src: "/videos/brands/disney-plus/campaign.mp4",
    label: "Disney Plus Campaign",
  },
  {
    src: "/videos/brands/ocean-basket/campaign.mp4",
    label: "Ocean Basket Campaign",
  },
  {
    src: "/videos/brands/tropika-clover/campaign.mp4",
    label: "Clover Tropika Campaign",
  },
];

export function VideoHero({
  videos,
  videoSrc1,
  videoSrc2,
}: VideoHeroProps) {
  const sources: HeroVideoSource[] =
    videos && videos.length > 0
      ? videos
      : [
          { src: videoSrc1 ?? DEFAULT_VIDEOS[0].src, label: DEFAULT_VIDEOS[0].label },
          { src: videoSrc2 ?? DEFAULT_VIDEOS[1].src, label: DEFAULT_VIDEOS[1].label },
          ...DEFAULT_VIDEOS.slice(2),
        ];

  const [activeVideo, setActiveVideo] = useState(0);
  const [activeLoaded, setActiveLoaded] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { amount: 0.15 });
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);

  useEffect(() => {
    const checkMobile = () => {
      const mobile =
        window.matchMedia("(max-width: 768px)").matches ||
        window.matchMedia("(pointer: coarse)").matches;
      setIsMobile(mobile);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    setActiveVideo(0);
    setActiveLoaded(false);
  }, [sources.length]);

  useEffect(() => {
    const video = videoRefs.current[activeVideo];
    if (!video) return;

    if (video.readyState >= 3) {
      setActiveLoaded(true);
      return;
    }

    const onReady = () => setActiveLoaded(true);
    video.addEventListener("canplay", onReady, { once: true });
    return () => video.removeEventListener("canplay", onReady);
  }, [activeVideo, sources.length]);

  useEffect(() => {
    videoRefs.current.forEach((video, index) => {
      if (!video) return;
      if (index === activeVideo && activeLoaded && isInView) {
        requestPlay(video).catch(() => {});
      } else {
        pauseVideo(video);
      }
    });
  }, [activeVideo, activeLoaded, isInView]);

  useEffect(() => {
    if (!activeLoaded || sources.length <= 1) return;

    const interval = setInterval(() => {
      setActiveVideo((prev) => (prev + 1) % sources.length);
    }, 30000);

    return () => clearInterval(interval);
  }, [activeLoaded, sources.length]);

  const getPreload = (index: number): "none" | "metadata" | "auto" => {
    if (index === activeVideo) return isMobile ? "metadata" : "auto";
    const nextIndex = (activeVideo + 1) % sources.length;
    if (index === nextIndex) return "metadata";
    return "none";
  };

  const videoStage = (
    <div className="absolute inset-0 flex items-center justify-center bg-background">
      {sources.map((source, index) => (
        <video
          key={source.src}
          ref={(el) => {
            videoRefs.current[index] = el;
          }}
          muted
          loop
          playsInline
          preload={getPreload(index)}
          onCanPlay={() => {
            if (index === activeVideo) setActiveLoaded(true);
          }}
          className={`absolute inset-0 h-full w-full object-contain transition-opacity duration-1000 ${
            activeVideo === index ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
          style={{ willChange: "opacity" }}
        >
          <source src={source.src} type="video/mp4" />
        </video>
      ))}
    </div>
  );

  const switcher = (
    <div
      className={`absolute left-1/2 z-30 flex max-w-[calc(100%-1.5rem)] -translate-x-1/2 items-center justify-center gap-1.5 overflow-x-auto ${
        isMobile ? "bottom-5 snap-carousel px-1" : "bottom-8 flex-wrap gap-2"
      }`}
    >
      {sources.map((source, index) => {
        const brandColors = getBrandColorsForHero(source);
        const isActive = activeVideo === index;

        return (
        <button
          key={source.src}
          type="button"
          onClick={() => setActiveVideo(index)}
          className={`tap-target shrink-0 rounded-full px-2.5 py-2 transition-all duration-300 sm:px-4 ${
            isActive
              ? ""
              : isMobile
                ? "bg-background/70 text-text-secondary backdrop-blur-sm"
                : "bg-background/50 text-text-secondary hover:bg-background/80"
          }`}
          style={
            isActive
              ? brandHeroActiveStyle(brandColors)
              : undefined
          }
          aria-label={`Switch to ${source.label}`}
        >
          <span className="flex items-center gap-2">
            {!isMobile && (
              <span
                className="h-2 w-2 rounded-full"
                style={
                  isActive
                    ? { backgroundColor: "#0A0A0A" }
                    : { backgroundColor: "var(--text-secondary)" }
                }
              />
            )}
            <span className="max-w-[9rem] truncate text-xs font-medium sm:max-w-none">
              {source.label}
            </span>
          </span>
        </button>
        );
      })}
    </div>
  );

  const loadingState = (
    <AnimatePresence>
      {!activeLoaded && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6 }}
          className="absolute inset-0 z-10"
        >
          <div className="absolute inset-0 bg-background">
            <div
              className="absolute inset-0 opacity-40"
              style={{
                background: `
                  radial-gradient(at 40% 20%, rgba(0, 229, 255, 0.2) 0px, transparent 50%),
                  radial-gradient(at 80% 0%, rgba(0, 229, 255, 0.15) 0px, transparent 50%)
                `,
              }}
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="h-10 w-10 animate-spin rounded-full border-2 border-accent/30 border-t-accent" />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  if (isMobile) {
    return (
      <div ref={containerRef} className="absolute inset-0 overflow-hidden">
        {loadingState}
        {videoStage}
        <div className="absolute inset-0 z-20 bg-background/40" />
        <div className="absolute inset-0 z-20 bg-gradient-to-b from-background/30 via-transparent to-background/70" />
        {switcher}
      </div>
    );
  }

  return (
    <div ref={containerRef} className="absolute inset-0 overflow-hidden">
      {loadingState}
      {videoStage}
      <div className="absolute inset-0 z-20 bg-background/30" />
      <div className="absolute inset-0 z-20 bg-gradient-to-b from-background/20 via-transparent to-background/60" />

      <motion.div
        key={activeVideo}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="absolute bottom-24 left-1/2 z-30 hidden -translate-x-1/2 md:block"
      >
        <span className="text-xs uppercase tracking-wider text-text-muted">
          Now Playing: {sources[activeVideo].label}
        </span>
      </motion.div>

      {switcher}
    </div>
  );
}
