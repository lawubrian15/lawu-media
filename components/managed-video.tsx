"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import { useInView } from "framer-motion";
import { Play } from "lucide-react";
import { cn } from "@/lib/utils";
import { requestPlay, pauseVideo } from "@/lib/video-playback";

interface ManagedVideoProps {
  src: string;
  shouldPlay?: boolean;
  muted?: boolean;
  loop?: boolean;
  className?: string;
  videoClassName?: string;
  preload?: "none" | "metadata" | "auto";
  resetOnPause?: boolean;
  tapToPlayOnMobile?: boolean;
  onReady?: () => void;
}

export function ManagedVideo({
  src,
  shouldPlay = false,
  muted = true,
  loop = true,
  className,
  videoClassName,
  preload = "metadata",
  resetOnPause = false,
  tapToPlayOnMobile = true,
  onReady,
}: ManagedVideoProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const isInView = useInView(containerRef, { margin: "80px", amount: 0.35 });
  const [isReady, setIsReady] = useState(false);
  const [needsTap, setNeedsTap] = useState(false);
  const [userEngaged, setUserEngaged] = useState(false);
  const [isCoarse, setIsCoarse] = useState(false);

  useEffect(() => {
    setIsCoarse(window.matchMedia("(pointer: coarse)").matches);
  }, []);

  const wantsPlay =
    shouldPlay &&
    isInView &&
    (!tapToPlayOnMobile || !isCoarse || userEngaged);

  const syncPlayback = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;

    if (wantsPlay) {
      requestPlay(video).catch(() => {
        if (tapToPlayOnMobile && isCoarse) setNeedsTap(true);
      });
    } else {
      pauseVideo(video);
      if (resetOnPause) video.currentTime = 0;
      setNeedsTap(false);
    }
  }, [wantsPlay, resetOnPause, tapToPlayOnMobile, isCoarse]);

  useEffect(() => {
    syncPlayback();
  }, [syncPlayback]);

  useEffect(() => {
    const video = videoRef.current;
    if (video) video.muted = muted;
  }, [muted]);

  const handleTap = () => {
    setUserEngaged(true);
    setNeedsTap(false);
    const video = videoRef.current;
    if (video) requestPlay(video).catch(() => {});
  };

  const handleReady = () => {
    if (!isReady) {
      setIsReady(true);
      onReady?.();
    }
  };

  return (
    <div ref={containerRef} className={cn("relative h-full w-full", className)}>
      <video
        ref={videoRef}
        src={src}
        muted={muted}
        loop={loop}
        playsInline
        preload={isInView ? preload : "none"}
        onLoadedData={handleReady}
        onCanPlay={handleReady}
        className={cn("h-full w-full object-contain bg-background", videoClassName)}
      />

      {!isReady && (
        <div className="absolute inset-0 flex items-center justify-center bg-background">
          <div className="h-8 w-8 animate-pulse rounded-full border-2 border-accent/30 border-t-accent" />
        </div>
      )}

      {needsTap && (
        <button
          type="button"
          onClick={handleTap}
          className="absolute inset-0 flex items-center justify-center bg-background/30 backdrop-blur-[2px] transition-opacity"
          aria-label="Tap to play video"
        >
          <span className="flex h-14 w-14 items-center justify-center rounded-full border border-accent/40 bg-background/80 text-accent shadow-lg">
            <Play className="h-6 w-6 fill-current" />
          </span>
        </button>
      )}
    </div>
  );
}
