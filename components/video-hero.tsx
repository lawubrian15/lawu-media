"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

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
  const [videosLoaded, setVideosLoaded] = useState<boolean[]>(
    () => new Array(sources.length).fill(false)
  );
  const [canPlay, setCanPlay] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
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
    setVideosLoaded(new Array(sources.length).fill(false));
    setActiveVideo(0);
    setCanPlay(false);
  }, [sources.length]);

  useEffect(() => {
    const checkVideos = async () => {
      try {
        const refs = videoRefs.current.filter(Boolean) as HTMLVideoElement[];
        if (refs.length === 0) return;

        await Promise.all(
          refs.map(
            (video) =>
              new Promise<void>((resolve) => {
                if (video.readyState >= 3) resolve();
                else video.addEventListener("canplay", () => resolve(), { once: true });
              })
          )
        );
        setCanPlay(true);
      } catch (err) {
        console.log("Video load check:", err);
      }
    };

    checkVideos();
  }, [sources.length]);

  useEffect(() => {
    if (!canPlay || sources.length <= 1) return;

    const interval = setInterval(() => {
      setActiveVideo((prev) => (prev + 1) % sources.length);
    }, 30000);

    return () => clearInterval(interval);
  }, [canPlay, sources.length]);

  const handleVideoLoaded = (index: number) => {
    setVideosLoaded((prev) => {
      const next = [...prev];
      next[index] = true;
      return next;
    });
  };

  const allLoaded = videosLoaded.every(Boolean);

  const videoStage = (
    <div className="absolute inset-0 flex items-center justify-center bg-background">
      {sources.map((source, index) => (
        <video
          key={source.src}
          ref={(el) => {
            videoRefs.current[index] = el;
          }}
          autoPlay
          muted
          loop
          playsInline
          preload={isMobile ? "metadata" : "auto"}
          onLoadedData={() => handleVideoLoaded(index)}
          onCanPlay={() => handleVideoLoaded(index)}
          className={`absolute inset-0 h-full w-full object-contain transition-opacity duration-1000 ${
            activeVideo === index ? "opacity-100" : "opacity-0"
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
      className={`absolute left-1/2 z-30 flex max-w-[calc(100%-2rem)] -translate-x-1/2 flex-wrap items-center justify-center gap-2 ${
        isMobile ? "bottom-6" : "bottom-8"
      }`}
    >
      {sources.map((source, index) => (
        <button
          key={source.src}
          type="button"
          onClick={() => setActiveVideo(index)}
          className={`rounded-full px-3 py-2 transition-all duration-300 sm:px-4 ${
            activeVideo === index
              ? "bg-accent text-background"
              : isMobile
                ? "bg-background/70 text-text-secondary backdrop-blur-sm"
                : "bg-background/50 text-text-secondary hover:bg-background/80"
          }`}
          aria-label={`Switch to ${source.label}`}
        >
          <span className="flex items-center gap-2">
            {!isMobile && (
              <span
                className={`h-2 w-2 rounded-full ${
                  activeVideo === index ? "bg-background" : "bg-text-secondary"
                }`}
              />
            )}
            <span className="max-w-[9rem] truncate text-xs font-medium sm:max-w-none">
              {source.label}
            </span>
          </span>
        </button>
      ))}
    </div>
  );

  const loadingState = (
    <AnimatePresence>
      {!allLoaded && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
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
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  if (isMobile) {
    return (
      <div className="absolute inset-0 overflow-hidden">
        {loadingState}
        {videoStage}
        <div className="absolute inset-0 z-20 bg-background/40" />
        <div className="absolute inset-0 z-20 bg-gradient-to-b from-background/30 via-transparent to-background/70" />
        {switcher}
      </div>
    );
  }

  return (
    <div className="absolute inset-0 overflow-hidden">
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
