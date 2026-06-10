"use client";

import { motion, useInView, type Variants } from "framer-motion";
import { useRef, type ReactNode } from "react";
import { cn } from "@/lib/utils";

const wordVariants: Variants = {
  hidden: { opacity: 0, y: "1.1em", rotateX: 12 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    rotateX: 0,
    transition: {
      duration: 0.75,
      delay: i * 0.04,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
};

const lineVariants: Variants = {
  hidden: { scaleX: 0 },
  visible: (i: number) => ({
    scaleX: 1,
    transition: {
      duration: 1,
      delay: 0.15 + i * 0.08,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
};

interface RevealTextProps {
  children: string;
  className?: string;
  as?: "h1" | "h2" | "h3" | "p" | "span";
  delay?: number;
  splitBy?: "word" | "line";
  /** Trigger animation immediately (for above-fold hero content) */
  immediate?: boolean;
}

export function RevealText({
  children,
  className,
  as: Tag = "h2",
  delay = 0,
  splitBy = "word",
  immediate = false,
}: RevealTextProps) {
  const ref = useRef<HTMLElement>(null);
  const isInViewScroll = useInView(ref, { once: true, margin: "-80px" });
  const isInView = immediate || isInViewScroll;

  if (splitBy === "line") {
    const lines = children.split("\n");
    return (
      <Tag ref={ref as never} className={cn("overflow-hidden", className)}>
        {lines.map((line, lineIndex) => (
          <span key={lineIndex} className="block overflow-hidden">
            <motion.span
              custom={lineIndex + delay}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              variants={wordVariants}
              className="inline-block"
              style={{ transformOrigin: "left bottom" }}
            >
              {line}
            </motion.span>
          </span>
        ))}
      </Tag>
    );
  }

  const words = children.split(" ");

  return (
    <Tag
      ref={ref as never}
      className={cn("flex flex-wrap gap-x-[0.28em]", className)}
      aria-label={children}
    >
      {words.map((word, i) => (
        <span key={`${word}-${i}`} className="overflow-hidden inline-block">
          <motion.span
            custom={i + delay}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={wordVariants}
            className="inline-block"
            style={{ transformOrigin: "left bottom", perspective: 800 }}
            aria-hidden
          >
            {word}
          </motion.span>
        </span>
      ))}
    </Tag>
  );
}

interface RevealBlockProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

export function RevealBlock({ children, className, delay = 0 }: RevealBlockProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 32 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 32 }}
      transition={{
        duration: 0.9,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

interface RevealLineProps {
  className?: string;
  delay?: number;
}

export function RevealLine({ className, delay = 0 }: RevealLineProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <motion.div
      ref={ref}
      custom={delay}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={lineVariants}
      className={cn("h-px origin-left bg-gradient-to-r from-accent/60 via-border to-transparent", className)}
    />
  );
}
