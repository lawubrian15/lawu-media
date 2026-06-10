"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { getPartners } from "@/lib/data";
import { getBrandVideo } from "@/lib/creator";
import { getBrandLogo } from "@/lib/brands";
import {
  getBrandColors,
  brandGradientStyle,
  brandGlowStyle,
  brandBorderStyle,
  brandTextStyle,
  brandBgStyle,
} from "@/lib/brand-colors";
import { cn } from "@/lib/utils";
import { RevealText, RevealBlock, RevealLine } from "./reveal-text";
import { Button } from "./button";

type PartnershipEcosystemProps = {
  featuredOnly?: boolean;
  limit?: number;
  showPortfolioCta?: boolean;
};

export function PartnershipEcosystem({
  featuredOnly = false,
  limit,
  showPortfolioCta = false,
}: PartnershipEcosystemProps = {}) {
  const partners = useMemo(
    () => getPartners({ featuredOnly, limit }),
    [featuredOnly, limit]
  );
  const [activePartner, setActivePartner] = useState(0);

  useEffect(() => {
    setActivePartner(0);
  }, [partners.length, featuredOnly, limit]);

  const active = partners[activePartner];
  if (!active || partners.length === 0) return null;

  const activeVideo = getBrandVideo(active.id);
  const activeColors = getBrandColors(active.client);

  return (
    <section className="relative overflow-hidden py-section">
      <div className="noise-overlay absolute inset-0" />
      <div className="pointer-events-none absolute left-1/2 top-0 h-px w-2/3 -translate-x-1/2 bg-gradient-to-r from-transparent via-accent/30 to-transparent" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 grid gap-6 sm:mb-14 sm:gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
          <div>
            <span className="text-xs font-medium uppercase tracking-[0.3em] text-accent">
              Partnership Ecosystem
            </span>
            <RevealText
              as="h2"
              className="mt-3 text-2xl font-bold tracking-tight text-text-primary sm:mt-4 sm:text-4xl md:text-5xl lg:text-6xl"
            >
              Trusted by industry leaders.
            </RevealText>
          </div>
          <RevealBlock delay={0.2}>
            <p className="text-sm leading-relaxed text-text-secondary sm:text-base md:text-lg">
              {featuredOnly
                ? "A curated selection of flagship partnerships — each built on measurable impact, not vanity metrics."
                : "From global beauty giants to entertainment platforms and local innovators — each partnership built on measurable impact, not vanity metrics."}
            </p>
            {!showPortfolioCta && (
              <Link
                href="/portfolio"
                data-cursor="hover"
                className="tap-target mt-5 inline-flex items-center gap-2 text-sm font-medium text-text-secondary transition-colors hover:text-accent sm:mt-6"
              >
                Explore full portfolio
                <ArrowUpRight className="h-4 w-4" />
              </Link>
            )}
          </RevealBlock>
        </div>

        <RevealLine className="mb-8 sm:mb-12" />

        <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          {/* Logo constellation */}
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4">
            {partners.map((partner, index) => {
              const isActive = index === activePartner;
              const colors = getBrandColors(partner.client);
              const video = getBrandVideo(partner.id);

              return (
                <motion.button
                  key={partner.id}
                  type="button"
                  data-cursor="hover"
                  onClick={() => setActivePartner(index)}
                  onMouseEnter={() => setActivePartner(index)}
                  animate={{
                    scale: isActive ? 1.05 : 1,
                    y: isActive ? -4 : 0,
                  }}
                  transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  className={cn(
                    "tap-target group relative flex min-h-[5.5rem] flex-col items-center justify-center overflow-hidden rounded-2xl border p-4 transition-all duration-500 sm:aspect-square sm:min-h-0",
                    isActive
                      ? "bg-surface"
                      : "border-border/60 bg-surface/40"
                  )}
                  style={{
                    ...brandGradientStyle(colors),
                    ...(isActive
                      ? { ...brandBorderStyle(colors, 0.45), ...brandGlowStyle(colors, 0.18) }
                      : {}),
                  }}
                >
                  <div className="relative h-10 w-full sm:h-14">
                    <Image
                      src={getBrandLogo(partner.client)}
                      alt={partner.client}
                      fill
                      className={cn(
                        "object-contain transition-all duration-500",
                        isActive ? "brightness-110" : "brightness-90 opacity-70"
                      )}
                      sizes="120px"
                    />
                  </div>
                  {video?.source === "campaign" ? (
                    <span
                      className="mt-2 text-[10px] font-medium opacity-80"
                      style={brandTextStyle(colors)}
                    >
                      Campaign reel
                    </span>
                  ) : null}
                  {isActive && (
                    <motion.div
                      layoutId="partner-ring"
                      className="absolute inset-0 rounded-2xl border-2"
                      style={brandBorderStyle(colors, 0.38)}
                      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                    />
                  )}
                </motion.button>
              );
            })}
          </div>

          {/* Active partner detail panel */}
          <AnimatePresence mode="wait">
            <motion.div
              key={active.id}
              initial={{ opacity: 0, x: 24, filter: "blur(4px)" }}
              animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, x: -16, filter: "blur(4px)" }}
              transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              className="relative overflow-hidden rounded-2xl border border-border bg-surface p-5 sm:rounded-[2rem] sm:p-8 md:p-10"
              style={brandGradientStyle(activeColors)}
            >
              <div
                className="absolute -right-20 -top-20 h-48 w-48 rounded-full blur-3xl"
                style={brandBgStyle(activeColors, 0.1)}
              />

              <div className="relative">
                <span
                  className="text-xs font-medium uppercase tracking-[0.25em]"
                  style={brandTextStyle(activeColors)}
                >
                  {active.category}
                </span>
                <h3 className="mt-2 text-2xl font-bold text-text-primary sm:mt-3 sm:text-3xl md:text-4xl">
                  {active.client}
                </h3>
                <p className="mt-3 max-w-lg text-sm leading-relaxed text-text-secondary sm:mt-4 sm:text-base">
                  {active.description}
                </p>

                <div className="mt-6 grid gap-2.5 sm:mt-8 sm:grid-cols-3 sm:gap-3">
                  {active.results.map((result, i) => (
                    <motion.div
                      key={result}
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 + i * 0.06 }}
                      className="rounded-xl border border-border/60 bg-background/50 px-3 py-2.5 backdrop-blur-sm sm:px-4 sm:py-3"
                    >
                      <p className="text-xs font-semibold text-text-primary sm:text-sm">
                        {result}
                      </p>
                    </motion.div>
                  ))}
                </div>

                {activeVideo?.localPath && (
                  <div
                    className="mt-6 flex items-center gap-3 rounded-xl border px-4 py-3 sm:mt-8 sm:gap-4 sm:px-5 sm:py-4"
                    style={{
                      ...brandBorderStyle(activeColors, 0.2),
                      ...brandBgStyle(activeColors, 0.05),
                    }}
                  >
                    <div
                      className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-background sm:h-10 sm:w-10"
                      style={{ backgroundColor: activeColors.primary }}
                    >
                      <ArrowUpRight className="h-4 w-4" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-[10px] uppercase tracking-wider text-text-muted sm:text-xs">
                        {activeVideo.source === "campaign"
                          ? "Campaign reel"
                          : "Live campaign reel"}
                      </p>
                      <p
                        className="truncate text-xs font-medium sm:text-sm"
                        style={brandTextStyle(activeColors)}
                      >
                        {activeVideo.source === "campaign"
                          ? "Provided campaign footage"
                          : "Synced from TikTok"}
                      </p>
                    </div>
                    {activeVideo.url && (
                      <a
                        href={activeVideo.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        data-cursor="hover"
                        className="tap-target ml-auto shrink-0 text-xs font-medium text-text-secondary transition-colors hover:opacity-80"
                        style={brandTextStyle(activeColors)}
                      >
                        Watch →
                      </a>
                    )}
                  </div>
                )}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {showPortfolioCta && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mt-10 flex flex-col items-center gap-4 text-center sm:mt-14"
          >
            <p className="max-w-md text-sm text-text-secondary sm:text-base">
              {partners.length} flagship partners shown — explore the full roster
              of brand collaborations.
            </p>
            <Button href="/portfolio" variant="secondary" size="md">
              View all partners
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </motion.div>
        )}
      </div>
    </section>
  );
}
