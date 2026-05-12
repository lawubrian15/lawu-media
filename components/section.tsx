"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface SectionProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
  fullHeight?: boolean;
  noPadding?: boolean;
}

export function Section({
  children,
  className,
  id,
  fullHeight = false,
  noPadding = false,
}: SectionProps) {
  return (
    <motion.section
      id={id}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{
        duration: 0.8,
        ease: [0.25, 0.1, 0.25, 1], // Smooth cinematic easing
      }}
      className={cn(
        "relative",
        fullHeight && "min-h-screen",
        !noPadding && "py-24 md:py-32 lg:py-40",
        className
      )}
    >
      {children}
    </motion.section>
  );
}

interface SectionHeadingProps {
  children: React.ReactNode;
  className?: string;
  as?: "h1" | "h2" | "h3";
  size?: "xl" | "2xl" | "3xl" | "4xl";
}

export function SectionHeading({
  children,
  className,
  as: Component = "h2",
  size = "3xl",
}: SectionHeadingProps) {
  const sizes = {
    xl: "text-3xl md:text-4xl lg:text-5xl",
    "2xl": "text-4xl md:text-5xl lg:text-6xl",
    "3xl": "text-4xl md:text-6xl lg:text-7xl",
    "4xl": "text-5xl md:text-7xl lg:text-8xl xl:text-9xl",
  };

  return (
    <Component
      className={cn(
        "font-bold tracking-tight leading-[1.1] text-text-primary",
        sizes[size],
        className
      )}
    >
      {children}
    </Component>
  );
}

interface SectionSubtitleProps {
  children: React.ReactNode;
  className?: string;
}

export function SectionSubtitle({ children, className }: SectionSubtitleProps) {
  return (
    <p
      className={cn(
        "text-lg md:text-xl text-text-secondary max-w-2xl leading-relaxed",
        className
      )}
    >
      {children}
    </p>
  );
}
