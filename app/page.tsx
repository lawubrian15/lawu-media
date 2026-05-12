"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  BarChart3,
  CheckCircle2,
  Clock,
  Play,
  Radar,
  Signal,
  Smartphone,
  Users,
} from "lucide-react";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Section, SectionHeading, SectionSubtitle } from "@/components/section";
import { Button } from "@/components/button";
import { VideoHero } from "@/components/video-hero";
import { Logo3DBanner } from "@/components/logo-3d-banner";
import { TagMarquee } from "@/components/tag-marquee";
import { ServiceRow } from "@/components/service-row";
import { TestimonialCard } from "@/components/testimonial-card";
import { FAQItem } from "@/components/faq-item";
import { StatsCounter } from "@/components/stats-counter";
import { ClientWrapper } from "@/components/client-wrapper";
import {
  heroContent,
  services,
  testimonials,
  differentiators,
  faq,
  southAfricaAdvantages,
  growthEngine,
  creatorTiers,
  campaignTimeline,
  auditScorecard,
} from "@/lib/data";

export default function HomePage() {
  const advantageIcons = [Smartphone, Signal, Users, Clock];
  const scoreIcons = [Radar, BarChart3, Users, CheckCircle2];

  return (
    <ClientWrapper>
      <main className="min-h-screen bg-background overflow-x-hidden">
        <Navbar />

        {/* Section 1: Hero with Video Background - Mobile Optimized */}
        <section className="relative min-h-[100svh] flex items-center justify-center overflow-hidden">
          {/* Video Background */}
          <VideoHero />

          {/* Content - Responsive sizing and spacing */}
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
            >
              <h1 
                className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-white leading-[1.1] tracking-tight mb-4 sm:mb-6"
                style={{ 
                  textShadow: "0 4px 30px rgba(0,0,0,0.5), 0 2px 10px rgba(0,0,0,0.3)"
                }}
              >
                {heroContent.headline}
              </h1>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
              className="text-base sm:text-lg md:text-xl lg:text-2xl text-white/90 max-w-3xl mx-auto mb-6 sm:mb-8 px-2 sm:px-0"
              style={{ 
                textShadow: "0 2px 20px rgba(0,0,0,0.4)"
              }}
            >
              {heroContent.subtitle}
            </motion.p>

            {/* Mobile CTA Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="sm:hidden"
            >
              <Button href="/contact" variant="primary" size="md">
                Get Started
              </Button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="hidden sm:block text-sm text-white/70"
              style={{ 
                textShadow: "0 2px 10px rgba(0,0,0,0.3)"
              }}
            >
              Scroll to explore
            </motion.div>
          </div>

          {/* BASIC-inspired reel control */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="absolute bottom-8 left-4 z-30 hidden items-center gap-3 rounded-full border border-white/15 bg-black/25 px-4 py-3 text-white shadow-2xl backdrop-blur-md sm:left-6 md:flex lg:left-8"
          >
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-accent text-background">
              <Play className="ml-0.5 h-4 w-4 fill-current" />
            </span>
            <div className="text-left">
              <p className="text-xs uppercase tracking-[0.2em] text-white/50">
                Watch Reel
              </p>
              <p className="text-sm font-medium text-white">00:00 / 00:30</p>
            </div>
          </motion.div>

          {/* Scroll indicator - Mobile optimized */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 1 }}
            className="absolute bottom-24 sm:bottom-8 left-1/2 -translate-x-1/2 z-10"
          >
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="w-6 h-10 rounded-full border-2 border-white/50 flex items-start justify-center p-2 backdrop-blur-sm bg-black/10"
            >
              <motion.div className="w-1.5 h-1.5 rounded-full bg-accent" />
            </motion.div>
          </motion.div>
        </section>

        {/* Section 2: 3D Logo Banner */}
        <Logo3DBanner />

        {/* Section 3: Expertise Marquee + CTA */}
        <Section className="py-16 sm:py-24 md:py-32">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-8 lg:gap-20 items-center mb-8 sm:mb-12">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                <SectionHeading size="3xl" className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl">
                  Your full-funnel digital growth partner
                </SectionHeading>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <SectionSubtitle className="text-base sm:text-lg md:text-xl">
                  We engineer digital experiences that bridge brands and their
                  ideal audiences through creativity, transparency, and a
                  relentless focus on ROI.
                </SectionSubtitle>
                <div className="mt-6 sm:mt-8">
                  <Button href="/portfolio" variant="primary" size="lg">
                    See Our Results
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                </div>
              </motion.div>
            </div>
          </div>
        </Section>

        {/* Tag Marquee */}
        <TagMarquee />

        {/* South Africa Advantage */}
        <Section className="overflow-hidden bg-background py-16 sm:py-24 md:py-32">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="lg:sticky lg:top-28"
              >
                <span className="text-xs font-medium uppercase tracking-[0.25em] text-accent">
                  Local Advantage
                </span>
                <SectionHeading
                  size="2xl"
                  className="mt-4 text-3xl sm:text-4xl md:text-5xl"
                >
                  Built for the South African scroll.
                </SectionHeading>
                <SectionSubtitle className="mt-4 text-base sm:text-lg">
                  The best campaigns understand the realities of local attention:
                  data costs, mobile-first behavior, cultural nuance, and timing.
                </SectionSubtitle>
              </motion.div>

              <div className="grid gap-4 sm:grid-cols-2">
                {southAfricaAdvantages.map((item, index) => {
                  const Icon = advantageIcons[index];

                  return (
                    <motion.div
                      key={item.title}
                      initial={{ opacity: 0, y: 24 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: index * 0.08 }}
                      className="group rounded-3xl border border-border bg-surface/70 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-accent/40 hover:bg-surface-hover"
                    >
                      <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl border border-accent/20 bg-accent/10 text-accent transition-transform duration-300 group-hover:scale-110">
                        <Icon className="h-5 w-5" />
                      </div>
                      <h3 className="mb-3 text-xl font-semibold text-text-primary">
                        {item.title}
                      </h3>
                      <p className="text-sm leading-relaxed text-text-secondary sm:text-base">
                        {item.description}
                      </p>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </div>
        </Section>

        {/* Growth Engine */}
        <Section className="bg-surface py-16 sm:py-24 md:py-32">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-10 flex flex-col gap-4 sm:mb-14 md:flex-row md:items-end md:justify-between">
              <div>
                <span className="text-xs font-medium uppercase tracking-[0.25em] text-accent">
                  The System
                </span>
                <SectionHeading
                  size="2xl"
                  className="mt-4 text-3xl sm:text-4xl md:text-5xl"
                >
                  The Growth Engine.
                </SectionHeading>
              </div>
              <p className="max-w-xl text-base leading-relaxed text-text-secondary sm:text-lg">
                A repeatable operating system for turning strategy, creators,
                and media into measurable momentum.
              </p>
            </div>

            <div className="relative">
              <div className="absolute left-6 top-6 hidden h-px w-[calc(100%-3rem)] bg-gradient-to-r from-accent/40 via-border to-transparent lg:block" />
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
                {growthEngine.map((item, index) => (
                  <motion.div
                    key={item.step}
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.08 }}
                    className="relative rounded-3xl border border-border bg-background p-5 transition-all duration-300 hover:border-accent/40 hover:shadow-[0_20px_60px_-35px_rgba(0,229,255,0.45)] sm:p-6"
                  >
                    <span className="mb-5 flex h-12 w-12 items-center justify-center rounded-full border border-accent/30 bg-accent text-sm font-bold text-background">
                      {item.step}
                    </span>
                    <h3 className="mb-3 text-xl font-semibold text-text-primary">
                      {item.title}
                    </h3>
                    <p className="text-sm leading-relaxed text-text-secondary">
                      {item.description}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </Section>

        {/* Section 4: Services List */}
        <Section className="py-16 sm:py-24 md:py-32">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="mb-8 sm:mb-12"
            >
              <SectionHeading size="2xl" className="text-2xl sm:text-3xl md:text-4xl">
                Data-driven. Authentic.
                <br className="hidden sm:block" />
                Results that matter.
              </SectionHeading>
            </motion.div>

            <div className="border-t border-border">
              {services.map((service, index) => (
                <ServiceRow
                  key={service.id}
                  name={service.name}
                  shortDescription={service.shortDescription}
                  href={`/services#${service.id}`}
                  index={index}
                />
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="mt-6 sm:mt-8"
            >
              <Link
                href="/services"
                className="inline-flex items-center gap-2 text-sm font-medium text-text-secondary hover:text-accent transition-colors"
              >
                VIEW ALL SERVICES
                <ArrowUpRight className="w-4 h-4" />
              </Link>
            </motion.div>
          </div>
        </Section>

        {/* Creator Network */}
        <Section className="bg-background py-16 sm:py-24 md:py-32">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-10 grid gap-6 lg:grid-cols-[1fr_0.8fr] lg:items-end">
              <div>
                <span className="text-xs font-medium uppercase tracking-[0.25em] text-accent">
                  Creator Strategy
                </span>
                <SectionHeading
                  size="2xl"
                  className="mt-4 text-3xl sm:text-4xl md:text-5xl"
                >
                  The right creator for the right job.
                </SectionHeading>
              </div>
              <p className="text-base leading-relaxed text-text-secondary sm:text-lg">
                Influence is not one-size-fits-all. We choose creator tiers by
                the job they need to do: trust, reach, conversion, or cultural
                heat.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {creatorTiers.map((tier, index) => (
                <motion.div
                  key={tier.tier}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.08 }}
                  className="group relative overflow-hidden rounded-3xl border border-border bg-surface p-6"
                >
                  <div className="absolute -right-10 -top-10 h-28 w-28 rounded-full bg-accent/10 blur-2xl transition-opacity duration-300 group-hover:opacity-100" />
                  <p className="mb-4 text-xs font-medium uppercase tracking-[0.25em] text-text-muted">
                    {tier.range}
                  </p>
                  <h3 className="mb-4 text-3xl font-bold text-text-primary">
                    {tier.tier}
                  </h3>
                  <p className="text-sm leading-relaxed text-text-secondary">
                    {tier.useCase}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </Section>

        {/* Stats Section */}
        <Section className="bg-surface py-16 sm:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <StatsCounter />
          </div>
        </Section>

        {/* Section 5: Case Studies / Testimonials */}
        <Section className="py-16 sm:py-24 md:py-32">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="mb-8 sm:mb-12"
            >
              <SectionHeading size="2xl" className="text-2xl sm:text-3xl md:text-4xl">
                Proven results. Real impact.
              </SectionHeading>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {testimonials.map((testimonial, index) => (
                <TestimonialCard
                  key={testimonial.id}
                  client={testimonial.client}
                  quote={testimonial.quote}
                  stat={testimonial.stat}
                  statLabel={testimonial.statLabel}
                  category={testimonial.category}
                  index={index}
                />
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="mt-8 sm:mt-12 text-center"
            >
              <Link
                href="/portfolio"
                className="inline-flex items-center gap-2 text-sm font-medium text-text-secondary hover:text-accent transition-colors"
              >
                See our case studies
                <ArrowUpRight className="w-4 h-4" />
              </Link>
            </motion.div>
          </div>
        </Section>

        {/* Section 6: Differentiators */}
        <Section className="bg-surface py-16 sm:py-24 md:py-32">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="mb-8 sm:mb-12"
            >
              <SectionHeading size="2xl" className="text-2xl sm:text-3xl md:text-4xl">
                Why We Win.
              </SectionHeading>
              <SectionSubtitle className="mt-3 sm:mt-4 text-base sm:text-lg">
                We don&apos;t just deliver engagement. We deliver measurable impact on your
                bottom line.
              </SectionSubtitle>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {differentiators.map((item, index) => (
                <motion.div
                  key={item.number}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="group"
                >
                  <div className="flex items-start gap-3 sm:gap-4">
                    <span className="text-3xl sm:text-4xl md:text-5xl font-bold text-text-muted/30 group-hover:text-accent/30 transition-colors">
                      {item.number}
                    </span>
                    <div>
                      <h3 className="text-lg sm:text-xl font-semibold text-text-primary mb-2">
                        {item.title}
                      </h3>
                      <p className="text-sm sm:text-base text-text-secondary leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </Section>

        {/* Campaign Timeline + Audit CTA */}
        <Section className="bg-background py-16 sm:py-24 md:py-32">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                <span className="text-xs font-medium uppercase tracking-[0.25em] text-accent">
                  Launch Rhythm
                </span>
                <SectionHeading
                  size="2xl"
                  className="mt-4 text-3xl sm:text-4xl md:text-5xl"
                >
                  From idea to optimized campaign in four weeks.
                </SectionHeading>

                <div className="mt-10 space-y-4">
                  {campaignTimeline.map((item, index) => (
                    <motion.div
                      key={item.week}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: index * 0.08 }}
                      className="grid gap-4 rounded-3xl border border-border bg-surface/70 p-5 sm:grid-cols-[110px_1fr] sm:p-6"
                    >
                      <div className="text-sm font-semibold text-accent">
                        {item.week}
                      </div>
                      <div>
                        <h3 className="mb-2 text-lg font-semibold text-text-primary">
                          {item.title}
                        </h3>
                        <p className="text-sm leading-relaxed text-text-secondary">
                          {item.description}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.15 }}
                className="rounded-[2rem] border border-accent/30 bg-accent p-1 shadow-[0_25px_80px_-45px_rgba(0,229,255,0.65)] lg:sticky lg:top-28"
              >
                <div className="rounded-[1.75rem] bg-background p-6 sm:p-8">
                  <span className="text-xs font-medium uppercase tracking-[0.25em] text-accent">
                    Free Audit
                  </span>
                  <h3 className="mt-4 text-3xl font-bold leading-tight text-text-primary sm:text-4xl">
                    Digital Disconnect Scorecard
                  </h3>
                  <p className="mt-4 text-sm leading-relaxed text-text-secondary sm:text-base">
                    Get a quick read on where your brand is leaking attention,
                    trust, or conversion.
                  </p>

                  <div className="mt-7 grid gap-3">
                    {auditScorecard.map((item, index) => {
                      const Icon = scoreIcons[index];

                      return (
                        <div
                          key={item}
                          className="flex items-center gap-3 rounded-2xl border border-border bg-surface px-4 py-3"
                        >
                          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-accent/10 text-accent">
                            <Icon className="h-4 w-4" />
                          </span>
                          <span className="text-sm font-medium text-text-primary">
                            {item}
                          </span>
                        </div>
                      );
                    })}
                  </div>

                  <Button
                    href="/contact"
                    variant="primary"
                    size="lg"
                    fullWidth
                    className="mt-8"
                  >
                    Book My Audit
                  </Button>
                </div>
              </motion.div>
            </div>
          </div>
        </Section>

        {/* Section 7: FAQ Accordion */}
        <Section className="py-16 sm:py-24 md:py-32">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="mb-8 sm:mb-12"
            >
              <SectionHeading size="2xl" className="text-2xl sm:text-3xl md:text-4xl">
                You&apos;ve got the questions,
                <br className="hidden sm:block" />
                we&apos;ve got the answers.
              </SectionHeading>
            </motion.div>

            <div className="max-w-3xl">
              {faq.map((item, index) => (
                <FAQItem
                  key={index}
                  question={item.question}
                  answer={item.answer}
                />
              ))}
            </div>
          </div>
        </Section>

        {/* Section 8: CTA Section */}
        <Section className="bg-surface py-16 sm:py-24 md:py-32">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <SectionHeading size="3xl" className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl mb-6 sm:mb-8">
                Ready to dominate
                <br className="hidden sm:block" />
                your digital niche?
              </SectionHeading>
              <Button href="/contact" variant="primary" size="lg">
                Drop Us a Line
              </Button>
            </motion.div>
          </div>
        </Section>

        {/* Mobile sticky conversion bar */}
        <motion.div
          initial={{ y: 120, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 1.2 }}
          className="fixed inset-x-3 bottom-3 z-40 rounded-2xl border border-white/10 bg-background/90 p-2 shadow-2xl backdrop-blur-xl md:hidden"
        >
          <div className="flex items-center gap-2">
            <div className="min-w-0 flex-1 px-2">
              <p className="truncate text-xs font-medium text-text-primary">
                Ready to grow?
              </p>
              <p className="truncate text-[11px] text-text-muted">
                Get a campaign audit
              </p>
            </div>
            <Button href="/contact" variant="primary" size="sm">
              Start
            </Button>
          </div>
        </motion.div>

        <Footer />
      </main>
    </ClientWrapper>
  );
}
