"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ExternalLink } from "lucide-react";
import Image from "next/image";
import { portfolioItems } from "@/lib/data";
import { cn } from "@/lib/utils";

// Logo data with 3D styling configurations
const logo3DConfigs: Record<string, { bg: string; border: string; glow: string; shape: string }> = {
  Garnier: {
    bg: "from-cyan-400/25 to-blue-700/15",
    border: "border-cyan-300/45",
    glow: "shadow-[0_0_30px_rgba(0,229,255,0.35)]",
    shape: "rounded-2xl",
  },
  CeraVe: {
    bg: "from-sky-500/20 to-blue-700/10",
    border: "border-sky-300/50",
    glow: "shadow-[0_0_30px_rgba(125,211,252,0.35)]",
    shape: "rounded-2xl",
  },
  "Disney Plus": {
    bg: "from-blue-600/20 to-indigo-600/10",
    border: "border-blue-400/50",
    glow: "shadow-[0_0_30px_rgba(96,165,250,0.4)]",
    shape: "rounded-2xl",
  },
  "Ocean Basket": {
    bg: "from-blue-500/20 to-cyan-600/10",
    border: "border-blue-300/50",
    glow: "shadow-[0_0_30px_rgba(125,211,252,0.4)]",
    shape: "rounded-2xl",
  },
  Zaio: {
    bg: "from-zinc-500/20 to-zinc-600/10",
    border: "border-zinc-400/50",
    glow: "shadow-[0_0_30px_rgba(161,161,170,0.4)]",
    shape: "rounded-2xl",
  },
  "Campus Central": {
    bg: "from-purple-500/20 to-violet-600/10",
    border: "border-purple-400/50",
    glow: "shadow-[0_0_30px_rgba(192,132,252,0.4)]",
    shape: "rounded-2xl",
  },
};

interface Logo3DProps {
  src: string;
  alt: string;
  index: number;
  brandStory: {
    client: string;
    description: string;
    results: string[];
    category: string;
  };
}

function Logo3D({ src, alt, index, brandStory }: Logo3DProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isTouched, setIsTouched] = useState(false);

  const config = logo3DConfigs[brandStory.client] || {
    bg: "from-accent/20 to-accent/10",
    border: "border-accent/50",
    glow: "shadow-[0_0_30px_rgba(0,229,255,0.35)]",
    shape: "rounded-2xl",
  };

  const delay = index * 0.08;

  // Touch handlers for mobile
  const handleTouchStart = () => {
    setIsTouched(true);
    setIsHovered(true);
  };

  const handleTouchEnd = () => {
    setTimeout(() => {
      setIsTouched(false);
      setIsHovered(false);
    }, 150);
  };

  return (
    <>
      {/* 3D Logo - Responsive sizing */}
      <motion.div
        initial={{ opacity: 0, y: 60, rotateX: 45, scale: 0.8 }}
        animate={{ opacity: 1, y: 0, rotateX: 0, scale: 1 }}
        transition={{ duration: 0.8, delay, ease: [0.25, 0.1, 0.25, 1] }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={() => setIsModalOpen(true)}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        className="relative cursor-pointer touch-manipulation"
        style={{ perspective: "1200px" }}
      >
        <motion.div
          animate={{
            y: isHovered ? -20 : 0,
            scale: isHovered ? 1.05 : 1,
            rotateY: isHovered ? 8 : 0,
            rotateX: isHovered ? -8 : 0,
            z: isHovered ? 80 : 0,
          }}
          transition={{
            type: "spring",
            stiffness: 200,
            damping: 15,
          }}
          className={cn(
            "relative w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32 lg:w-36 lg:h-36 overflow-hidden",
            "bg-gradient-to-br",
            config.bg,
            config.border,
            "border-2",
            config.shape,
            "transition-all duration-300",
            isHovered && config.glow
          )}
          style={{
            transformStyle: "preserve-3d",
            boxShadow: isHovered
              ? "0 25px 50px -12px rgba(0,0,0,0.5), 0 0 40px rgba(0,229,255,0.22)"
              : "0 10px 30px -10px rgba(0,0,0,0.3)",
          }}
        >
          {/* Inner gradient for depth */}
          <div className={cn(
            "absolute inset-0 bg-gradient-to-br opacity-50",
            config.bg
          )} />

          {/* Logo Image */}
          <div className="absolute inset-0 flex items-center justify-center p-2 sm:p-3">
            <motion.div
              animate={{
                scale: isHovered ? 1.05 : 1,
                rotateZ: isHovered ? 2 : 0,
              }}
              transition={{ duration: 0.3 }}
              className="relative w-full h-full drop-shadow-lg"
            >
              <Image
                src={src}
                alt={alt}
                fill
                className="object-contain filter brightness-110"
                sizes="(max-width: 640px) 80px, (max-width: 768px) 96px, 144px"
              />
            </motion.div>
          </div>

          {/* Shine effect on hover */}
          <motion.div
            initial={{ x: "-100%", opacity: 0 }}
            animate={{
              x: isHovered ? "100%" : "-100%",
              opacity: isHovered ? 0.3 : 0,
            }}
            transition={{ duration: 0.6 }}
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent skew-x-12"
          />

          {/* 3D edge highlight */}
          <div
            className={cn(
              "absolute inset-0 pointer-events-none",
              "bg-gradient-to-br from-white/20 via-transparent to-black/20"
            )}
            style={{ borderRadius: "inherit" }}
          />
        </motion.div>

        {/* 3D Shadow */}
        <motion.div
          animate={{
            opacity: isHovered ? 0.6 : 0.25,
            y: isHovered ? 40 : 20,
            scale: isHovered ? 0.85 : 0.9,
          }}
          transition={{ duration: 0.3 }}
          className={cn(
            "absolute inset-0 -z-10",
            "bg-black",
            "pointer-events-none"
          )}
          style={{
            filter: "blur(25px)",
            borderRadius: "inherit",
          }}
        />

        {/* Floating particles - Desktop only */}
        <AnimatePresence>
          {isHovered && !isTouched && (
            <>
              {[...Array(3)].map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{
                    opacity: [0, 1, 0],
                    scale: [0, 1, 0],
                    y: [-20, -60],
                    x: (i - 1) * 30,
                  }}
                  exit={{ opacity: 0 }}
                  transition={{
                    duration: 1.5,
                    delay: i * 0.2,
                    repeat: Infinity,
                  }}
                  className="absolute top-0 left-1/2 w-2 h-2 rounded-full bg-accent hidden md:block"
                />
              ))}
            </>
          )}
        </AnimatePresence>

        {/* Tap hint for mobile */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: isTouched ? 1 : 0 }}
          className="absolute -bottom-6 left-1/2 -translate-x-1/2 md:hidden"
        >
          <span className="text-[10px] text-accent whitespace-nowrap">
            Tap to view
          </span>
        </motion.div>

        {/* Ambient Float Animation */}
        <motion.div
          animate={{
            y: [0, -8, 0],
          }}
          transition={{
            duration: 3 + index * 0.3,
            repeat: Infinity,
            ease: "easeInOut",
            delay: index * 0.15,
          }}
          className="absolute inset-0 pointer-events-none"
        />
      </motion.div>

      {/* Brand Story Modal - Mobile Optimized */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-background/95 backdrop-blur-md"
            onClick={() => setIsModalOpen(false)}
          >
            <motion.div
              initial={{ opacity: 0, y: 100, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 100, scale: 0.9 }}
              transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
              onClick={(e) => e.stopPropagation()}
              className={cn(
                "relative w-full sm:max-w-lg overflow-hidden",
                "bg-surface border-2 p-6 sm:p-8",
                config.shape,
                config.border,
                config.glow,
                "sm:mx-4"
              )}
              style={{ perspective: "1000px" }}
            >
              {/* Close Button - Larger touch target for mobile */}
              <button
                onClick={() => setIsModalOpen(false)}
                className="absolute top-3 right-3 sm:top-4 sm:right-4 z-10 w-12 h-12 sm:w-10 sm:h-10 rounded-full bg-background/80 hover:bg-accent/20 flex items-center justify-center transition-colors border border-border"
              >
                <X className="w-6 h-6 sm:w-5 sm:h-5 text-text-primary" />
              </button>

              {/* Logo in Modal */}
              <div className={cn(
                "relative w-20 h-20 sm:w-24 sm:h-24 mx-auto mb-4 sm:mb-6 overflow-hidden",
                "bg-gradient-to-br",
                config.bg,
                config.shape,
                config.border,
                "border-2"
              )}>
                <div className="absolute inset-0 flex items-center justify-center p-2">
                  <Image
                    src={src}
                    alt={alt}
                    fill
                    className="object-contain"
                    sizes="96px"
                  />
                </div>
              </div>

              {/* Content */}
              <span className="text-xs font-medium text-accent uppercase tracking-wider">
                {brandStory.category}
              </span>
              <h3 className="text-xl sm:text-2xl font-bold text-text-primary mt-2 mb-3 sm:mb-4">
                {brandStory.client}
              </h3>
              <p className="text-sm sm:text-base text-text-secondary leading-relaxed mb-4 sm:mb-6">
                {brandStory.description}
              </p>

              {/* Results */}
              <div className="flex flex-wrap gap-2">
                {brandStory.results.slice(0, 3).map((result, i) => (
                  <span
                    key={i}
                    className="px-2 sm:px-3 py-1 sm:py-1.5 bg-accent/10 text-accent text-xs sm:text-sm font-medium rounded-full border border-accent/20"
                  >
                    {result}
                  </span>
                ))}
              </div>

              {/* CTA */}
              <button
                onClick={() => setIsModalOpen(false)}
                className="mt-6 pt-4 border-t border-border w-full text-center inline-flex items-center justify-center gap-2 text-sm font-medium text-text-secondary hover:text-accent transition-colors"
              >
                <ExternalLink className="w-4 h-4" />
                View Full Case Study
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

// Map portfolio items to logo paths
const logoMap: Record<string, string> = {
  Garnier: "/logos/garnierlogo.png",
  CeraVe: "/logos/CERAVE.webp",
  "Disney Plus": "/logos/disney3d.webp",
  "Ocean Basket": "/logos/oceanbasket.png",
  Zaio: "/logos/zaio.png",
  "Campus Central": "/logos/CampusCentral.avif",
};

export function Logo3DBanner() {
  return (
    <section className="relative py-16 sm:py-20 md:py-28 overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] sm:w-[800px] lg:w-[1000px] h-[300px] sm:h-[400px] lg:h-[500px] bg-accent/5 rounded-full blur-3xl pointer-events-none" />

      {/* Section Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8 sm:mb-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <span className="text-xs sm:text-sm font-medium text-accent uppercase tracking-wider">
            Trusted Partners
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-text-primary mt-3 sm:mt-4">
            Brands We&apos;ve Helped Grow
          </h2>
          <p className="text-sm sm:text-base text-text-secondary mt-3 sm:mt-4 max-w-2xl mx-auto">
            Tap or hover to explore their stories
          </p>
        </motion.div>
      </div>

      {/* 3D Logo Grid - Responsive */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap justify-center gap-4 sm:gap-6 md:gap-8 lg:gap-10">
          {portfolioItems.map((item, index) => (
            <Logo3D
              key={item.id}
              src={logoMap[item.client] || "/logos/default.png"}
              alt={item.client}
              index={index}
              brandStory={{
                client: item.client,
                description: item.description,
                results: item.results,
                category: item.category,
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
