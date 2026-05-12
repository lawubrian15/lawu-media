"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface VideoHeroProps {
  videoSrc1?: string;
  videoSrc2?: string;
}

export function VideoHero({
  videoSrc1 = "/videos/5275266-uhd_4096_2160_25fps.mp4",
  videoSrc2 = "/videos/17647959-uhd_3840_2160_30fps.mp4",
}: VideoHeroProps) {
  const [activeVideo, setActiveVideo] = useState(0);
  const [videosLoaded, setVideosLoaded] = useState([false, false]);
  const [canPlay, setCanPlay] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const video1Ref = useRef<HTMLVideoElement>(null);
  const video2Ref = useRef<HTMLVideoElement>(null);

  // Check if mobile device
  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.matchMedia("(max-width: 768px)").matches ||
        window.matchMedia("(pointer: coarse)").matches;
      setIsMobile(mobile);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Check if videos can be played
  useEffect(() => {
    const checkVideos = async () => {
      try {
        const v1 = video1Ref.current;
        const v2 = video2Ref.current;

        if (v1 && v2) {
          await Promise.all([
            new Promise<void>((resolve) => {
              if (v1.readyState >= 3) resolve();
              else v1.addEventListener("canplay", () => resolve(), { once: true });
            }),
            new Promise<void>((resolve) => {
              if (v2.readyState >= 3) resolve();
              else v2.addEventListener("canplay", () => resolve(), { once: true });
            }),
          ]);
          setCanPlay(true);
        }
      } catch (err) {
        console.log("Video load check:", err);
      }
    };

    checkVideos();
  }, []);

  // Auto-switch videos every 30 seconds
  useEffect(() => {
    if (!canPlay) return;

    const interval = setInterval(() => {
      setActiveVideo((prev) => (prev === 0 ? 1 : 0));
    }, 30000);

    return () => clearInterval(interval);
  }, [canPlay]);

  const handleVideoLoaded = (index: number) => {
    setVideosLoaded((prev) => {
      const newState = [...prev];
      newState[index] = true;
      return newState;
    });
  };

  const allLoaded = videosLoaded.every(Boolean);

  // Simplified mobile controls
  if (isMobile) {
    return (
      <div className="absolute inset-0 overflow-hidden">
        {/* Loading State */}
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

        {/* Mobile-optimized videos - show first one primarily */}
        <video
          ref={video1Ref}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          onLoadedData={() => handleVideoLoaded(0)}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
            activeVideo === 0 ? "opacity-100" : "opacity-0"
          }`}
          style={{ willChange: "opacity", objectPosition: "center" }}
        >
          <source src={videoSrc1} type="video/mp4" />
        </video>

        <video
          ref={video2Ref}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          onLoadedData={() => handleVideoLoaded(1)}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
            activeVideo === 1 ? "opacity-100" : "opacity-0"
          }`}
          style={{ willChange: "opacity", objectPosition: "center" }}
        >
          <source src={videoSrc2} type="video/mp4" />
        </video>

        {/* Mobile overlay - lighter for better visibility */}
        <div className="absolute inset-0 bg-background/40 z-20" />
        <div className="absolute inset-0 bg-gradient-to-b from-background/30 via-transparent to-background/70 z-20" />

        {/* Mobile video switcher - simpler, larger touch targets */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-3 z-30">
          {[0, 1].map((index) => (
            <button
              key={index}
              onClick={() => setActiveVideo(index)}
              className={`w-14 h-10 sm:w-16 sm:h-12 rounded-xl flex items-center justify-center transition-all duration-300 ${
                activeVideo === index
                  ? "bg-accent text-background font-semibold"
                  : "bg-background/70 text-text-secondary backdrop-blur-sm"
              }`}
              aria-label={`Switch to video ${index + 1}`}
            >
              <span className="text-xs sm:text-sm">
                {index === 0 ? "Reel 1" : "Reel 2"}
              </span>
            </button>
          ))}
        </div>

        {/* Swipe hint for mobile */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
          className="absolute top-24 left-1/2 -translate-x-1/2 z-30 md:hidden"
        >
          <span className="text-xs text-white/50 bg-black/30 px-3 py-1 rounded-full backdrop-blur-sm">
            Tap buttons to switch reels
          </span>
        </motion.div>
      </div>
    );
  }

  // Desktop version
  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Loading State */}
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
                    radial-gradient(at 80% 0%, rgba(0, 229, 255, 0.15) 0px, transparent 50%),
                    radial-gradient(at 0% 50%, rgba(0, 229, 255, 0.1) 0px, transparent 50%),
                    radial-gradient(at 80% 50%, rgba(0, 229, 255, 0.15) 0px, transparent 50%),
                    radial-gradient(at 0% 100%, rgba(0, 229, 255, 0.2) 0px, transparent 50%)
                  `,
                }}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Video 1 */}
      <video
        ref={video1Ref}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        onLoadedData={() => handleVideoLoaded(0)}
        onCanPlay={() => handleVideoLoaded(0)}
        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
          activeVideo === 0 ? "opacity-100" : "opacity-0"
        }`}
        style={{ willChange: "opacity" }}
      >
        <source src={videoSrc1} type="video/mp4" />
      </video>

      {/* Video 2 */}
      <video
        ref={video2Ref}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        onLoadedData={() => handleVideoLoaded(1)}
        onCanPlay={() => handleVideoLoaded(1)}
        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
          activeVideo === 1 ? "opacity-100" : "opacity-0"
        }`}
        style={{ willChange: "opacity" }}
      >
        <source src={videoSrc2} type="video/mp4" />
      </video>

      {/* Light Overlay */}
      <div className="absolute inset-0 bg-background/30 z-20" />
      <div className="absolute inset-0 bg-gradient-to-b from-background/20 via-transparent to-background/60 z-20" />

      {/* Video Switcher Controls */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3 z-30">
        {[0, 1].map((index) => (
          <button
            key={index}
            onClick={() => setActiveVideo(index)}
            className={`group relative flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-300 ${
              activeVideo === index
                ? "bg-accent text-background"
                : "bg-background/50 text-text-secondary hover:bg-background/80"
            }`}
            aria-label={`Switch to video ${index + 1}`}
          >
            <span className={`w-2 h-2 rounded-full ${activeVideo === index ? "bg-background" : "bg-text-secondary"}`} />
            <span className="text-xs font-medium">
              {index === 0 ? "Reel 1" : "Reel 2"}
            </span>
          </button>
        ))}
      </div>

      {/* Video Label */}
      <motion.div
        key={activeVideo}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="absolute bottom-20 left-1/2 -translate-x-1/2 z-30 hidden md:block"
      >
        <span className="text-xs text-text-muted uppercase tracking-wider">
          Now Playing: {activeVideo === 0 ? "Brand Stories" : "Campaign Highlights"}
        </span>
      </motion.div>
    </div>
  );
}
