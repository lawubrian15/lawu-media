"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { stats as bookletStats } from "@/lib/data";
import { creatorStats, creatorProfile, lastSyncedAt } from "@/lib/creator";
import { RevealText, RevealLine } from "./reveal-text";

function AnimatedMetric({
  value,
  suffix,
  label,
  source,
  index,
}: {
  value: number;
  suffix: string;
  label: string;
  source: "booklet" | "live";
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    const duration = 2200;
    const steps = 50;
    const increment = value / steps;
    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= value) {
        setDisplay(value);
        clearInterval(timer);
      } else {
        setDisplay(value % 1 !== 0 ? Math.floor(current * 10) / 10 : Math.floor(current));
      }
    }, duration / steps);
    return () => clearInterval(timer);
  }, [isInView, value]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 28 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
      className="group relative overflow-hidden rounded-2xl border border-border bg-surface/60 p-6 backdrop-blur-sm transition-all duration-500 hover:border-accent/30 hover:bg-surface"
    >
      <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-accent/5 transition-all duration-500 group-hover:bg-accent/10" />
      <span
        className={`text-[10px] font-semibold uppercase tracking-[0.2em] ${
          source === "live" ? "text-accent" : "text-text-muted"
        }`}
      >
        {source === "live" ? "Live TikTok" : "Agency Record"}
      </span>
      <div className="mt-3 text-4xl font-bold tabular-nums text-text-primary sm:text-5xl">
        {display}
        <span className="text-accent">{suffix}</span>
      </div>
      <p className="mt-2 text-sm text-text-secondary">{label}</p>
      <motion.div
        className="mt-4 h-0.5 origin-left bg-accent/60"
        initial={{ scaleX: 0 }}
        animate={isInView ? { scaleX: 1 } : {}}
        transition={{ duration: 1.2, delay: 0.3 + index * 0.08, ease: [0.22, 1, 0.36, 1] }}
      />
    </motion.div>
  );
}

export function ImpactMetrics() {
  const syncedDate = new Date(lastSyncedAt).toLocaleDateString("en-ZA", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  const liveMetrics = creatorStats.map((s) => ({
    ...s,
    source: "live" as const,
  }));

  const agencyMetrics = bookletStats.map((s) => ({
    ...s,
    source: "booklet" as const,
  }));

  return (
    <section className="relative overflow-hidden py-16 sm:py-24">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,229,255,0.04)_0%,transparent_70%)]" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 grid gap-6 lg:grid-cols-[1fr_0.7fr] lg:items-end">
          <div>
            <span className="text-xs font-medium uppercase tracking-[0.3em] text-accent">
              Measurable Impact
            </span>
            <RevealText
              as="h2"
              className="mt-4 text-3xl font-bold tracking-tight text-text-primary sm:text-4xl md:text-5xl"
            >
              Numbers that build trust.
            </RevealText>
          </div>
          <p className="text-base leading-relaxed text-text-secondary">
            Verified agency results from the Lawu Media booklet, combined with
            live TikTok data from founder{" "}
            <span className="text-text-primary">@{creatorProfile.handle}</span>.
          </p>
        </div>

        <RevealLine className="mb-10" />

        {/* Agency stats from booklet */}
        <div className="mb-6">
          <p className="mb-4 text-xs font-medium uppercase tracking-[0.25em] text-text-muted">
            Agency Performance
          </p>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {agencyMetrics.map((metric, index) => (
              <AnimatedMetric
                key={metric.label}
                value={metric.value}
                suffix={metric.suffix}
                label={metric.label}
                source={metric.source}
                index={index}
              />
            ))}
          </div>
        </div>

        {/* Live TikTok stats */}
        <div>
          <p className="mb-4 text-xs font-medium uppercase tracking-[0.25em] text-text-muted">
            Creator Channel — Live
          </p>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {liveMetrics.map((metric, index) => (
              <AnimatedMetric
                key={metric.label}
                value={metric.value}
                suffix={metric.suffix}
                label={metric.label}
                source={metric.source}
                index={index + 4}
              />
            ))}
          </div>
          <p className="mt-6 text-xs text-text-muted">
            TikTok stats last synced {syncedDate} ·{" "}
            {creatorProfile.followers.toLocaleString()} followers ·{" "}
            {(creatorProfile.totalLikes / 1_000_000).toFixed(1)}M total likes
          </p>
        </div>
      </div>
    </section>
  );
}
