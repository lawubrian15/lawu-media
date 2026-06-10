"use client";

import { motion } from "framer-motion";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Section, SectionHeading, SectionSubtitle } from "@/components/section";
import { Button } from "@/components/button";
import { ReelShowcase } from "@/components/reel-showcase";
import { PartnershipEcosystem } from "@/components/partnership-ecosystem";
import { ImpactMetrics } from "@/components/impact-metrics";
import { PortfolioCard } from "@/components/portfolio-card";
import { TestimonialCard } from "@/components/testimonial-card";
import { RevealText, RevealBlock, RevealLine } from "@/components/reveal-text";
import { portfolioItems, testimonials } from "@/lib/data";
import { formatViewCount, getPortfolioVideo } from "@/lib/creator";
import { ClientWrapper } from "@/components/client-wrapper";

export default function PortfolioPage() {
  return (
    <ClientWrapper>
    <main className="min-h-screen bg-background film-grain">
      <Navbar />

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-32 pb-20 md:pt-44 md:pb-28">
        <div className="absolute inset-0 bg-gradient-to-b from-surface via-background to-background" />
        <div className="pointer-events-none absolute -right-40 top-20 h-96 w-96 rounded-full bg-accent/5 blur-3xl" />

        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <RevealBlock>
            <span className="text-xs font-medium uppercase tracking-[0.3em] text-accent">
              Our Portfolio
            </span>
            <RevealText
              as="h1"
              immediate
              className="mt-4 max-w-4xl text-4xl font-bold tracking-tight text-text-primary md:text-6xl lg:text-7xl"
            >
              Trusted by industry leaders.
            </RevealText>
            <p className="mt-8 max-w-2xl text-lg leading-relaxed text-text-secondary md:text-xl">
              A proven track record of delivering measurable results for global
              household names and high-growth local innovators across South
              Africa.
            </p>
          </RevealBlock>
          <RevealLine className="mt-12 max-w-xl" delay={0.3} />
        </div>
      </section>

      {/* Premium Reel Showcase — Desktop priority */}
      <ReelShowcase />

      {/* Partnership Ecosystem */}
      <PartnershipEcosystem />

      {/* Impact Metrics */}
      <Section className="bg-surface py-16 sm:py-24">
        <ImpactMetrics />
      </Section>

      {/* Testimonials / Case Studies */}
      <Section>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-12"
          >
            <RevealText
              as="h2"
              className="text-3xl font-bold tracking-tight text-text-primary md:text-4xl"
            >
              Proven results.
            </RevealText>
            <SectionSubtitle className="mt-4">
              Real impact for real brands — verified from the Lawu Media booklet.
            </SectionSubtitle>
          </motion.div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
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
        </div>
      </Section>

      {/* Portfolio Grid — brands without synced reels */}
      <Section className="bg-surface">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-12"
          >
            <SectionHeading size="2xl">All Brand Partners</SectionHeading>
            <SectionSubtitle className="mt-4">
              Every partnership backed by strategy, creative, and reporting.
            </SectionSubtitle>
          </motion.div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {portfolioItems.map((item, index) => {
              const campaignVideo = getPortfolioVideo(item.id);
              return (
                <PortfolioCard
                  key={item.id}
                  client={item.client}
                  category={item.category}
                  description={item.description}
                  results={item.results}
                  index={index}
                  videoSrc={campaignVideo?.localPath}
                  videoViews={
                    campaignVideo?.viewCount
                      ? formatViewCount(campaignVideo.viewCount)
                      : campaignVideo?.source === "campaign"
                        ? "Campaign reel"
                        : undefined
                  }
                  tiktokUrl={campaignVideo?.url}
                />
              );
            })}
          </div>
        </div>
      </Section>

      {/* CTA Section */}
      <Section>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <RevealText
              as="h2"
              className="mb-8 justify-center text-3xl font-bold tracking-tight text-text-primary md:text-5xl"
            >
              Ready to join our portfolio of success stories?
            </RevealText>
            <Button href="/contact" variant="primary" size="lg">
              Start Your Project
            </Button>
          </motion.div>
        </div>
      </Section>

      <Footer />
    </main>
    </ClientWrapper>
  );
}
