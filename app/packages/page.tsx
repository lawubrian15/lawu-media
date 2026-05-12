"use client";

import { motion } from "framer-motion";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Section, SectionHeading, SectionSubtitle } from "@/components/section";
import { Button } from "@/components/button";
import { PricingCard } from "@/components/pricing-card";
import { packages } from "@/lib/data";

export default function PackagesPage() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-32 pb-24 md:pt-40 md:pb-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-surface to-background" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-text-primary leading-[1.1] tracking-tight mb-8">
              Our Packages
            </h1>
            <p className="text-xl md:text-2xl text-text-secondary max-w-3xl mx-auto leading-relaxed">
              Three tiers designed to scale with your business needs, whether you
              are just starting or looking to dominate your industry.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Pricing Cards */}
      <Section>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
            {packages.map((pkg, index) => (
              <PricingCard
                key={pkg.id}
                name={pkg.name}
                price={pkg.price}
                period={pkg.period}
                description={pkg.description}
                features={pkg.features}
                highlighted={pkg.highlighted}
                index={index}
              />
            ))}
          </div>

          {/* Disclaimer */}
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="text-center text-sm text-text-muted mt-8"
          >
            Disclaimer: The pricing is not inclusive of ad budget
          </motion.p>
        </div>
      </Section>

      {/* Why These Packages Work */}
      <Section className="bg-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-12"
          >
            <SectionHeading size="2xl">Why These Packages Work</SectionHeading>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0 }}
              className="space-y-4"
            >
              <h3 className="text-xl font-semibold text-text-primary">
                Basic: Foundation First
              </h3>
              <p className="text-text-secondary leading-relaxed">
                Perfect for brands that need a professional &quot;digital storefront&quot;
                without a massive investment. It keeps you relevant and active in
                the social space.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="space-y-4"
            >
              <h3 className="text-xl font-semibold text-text-primary">
                Business: Scale Up
              </h3>
              <p className="text-text-secondary leading-relaxed">
                Designed for businesses ready to scale. By adding dedicated Ad
                Management and more frequent posting, we actively hunt for new
                customers while building your organic presence.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="space-y-4"
            >
              <h3 className="text-xl font-semibold text-text-primary">
                Professional: Full Digital Takeover
              </h3>
              <p className="text-text-secondary leading-relaxed">
                A comprehensive digital takeover. This package utilizes every tool
                in our arsenal—from high-volume video content to aggressive ad
                targeting across multiple platforms.
              </p>
            </motion.div>
          </div>
        </div>
      </Section>

      {/* CTA Section */}
      <Section>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <SectionHeading size="3xl" className="mb-8">
              Not sure which package?
            </SectionHeading>
            <SectionSubtitle className="mb-8 mx-auto">
              Let&apos;s talk about your goals and we&apos;ll recommend the right fit.
            </SectionSubtitle>
            <Button href="/contact" variant="primary" size="lg">
              Let&apos;s Talk
            </Button>
          </motion.div>
        </div>
      </Section>

      <Footer />
    </main>
  );
}
