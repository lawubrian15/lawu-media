"use client";

import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import {
  creatorProfile,
  lastSyncedAt,
  campaignVideos,
  downloadedBrandVideos,
} from "@/lib/creator";

export function CreatorSpotlight() {
  const syncedDate = new Date(lastSyncedAt).toLocaleDateString("en-ZA", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
  const campaignCount =
    Object.keys(campaignVideos).length + Object.keys(downloadedBrandVideos).length;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="relative overflow-hidden rounded-2xl border border-border bg-surface p-6 sm:p-8"
    >
      <div
        className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full opacity-30"
        style={{
          background:
            "radial-gradient(circle, rgba(0,229,255,0.35) 0%, transparent 70%)",
        }}
      />

      <div className="relative flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <div className="max-w-2xl">
          <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-accent">
            Founder & Lead Creator
          </p>
          <h3 className="text-2xl font-bold text-text-primary sm:text-3xl">
            Paki Lawu
          </h3>
          <p className="mt-3 text-sm leading-relaxed text-text-secondary sm:text-base">
            The voice behind Lawu Media&apos;s creator-led campaigns — from
            public interviews to brand activations across South Africa.
          </p>
          <div className="mt-4 flex flex-wrap gap-3 text-xs text-text-muted">
            <span>
              {creatorProfile.followers.toLocaleString()} followers
            </span>
            <span>·</span>
            <span>
              {(creatorProfile.totalLikes / 1_000_000).toFixed(1)}M total likes
            </span>
            <span>·</span>
            <span>{campaignCount} brand reels synced</span>
          </div>
        </div>

        <a
          href={creatorProfile.profileUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-2 rounded-full border border-accent/40 bg-accent/10 px-5 py-3 text-sm font-medium text-accent transition-colors hover:bg-accent hover:text-background"
        >
          @{creatorProfile.handle}
          <ExternalLink className="h-4 w-4" />
        </a>
      </div>

      <p className="relative mt-4 text-xs text-text-muted">
        TikTok stats last synced {syncedDate}
      </p>
    </motion.div>
  );
}
