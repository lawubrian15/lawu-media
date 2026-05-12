"use client";

import { motion } from "framer-motion";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Section, SectionHeading, SectionSubtitle } from "@/components/section";
import { Button } from "@/components/button";
import { PortfolioCard } from "@/components/portfolio-card";
import { TestimonialCard } from "@/components/testimonial-card";
import { portfolioItems, testimonials } from "@/lib/data";

export default function PortfolioPage() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-32 pb-24 md:pt-40 md:pb-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-surface to-background" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl"
          >
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-text-primary leading-[1.1] tracking-tight mb-8">
              Trusted by Industry Leaders
            </h1>
            <p className="text-xl md:text-2xl text-text-secondary leading-relaxed">
              We have a proven track record of delivering results for global
              household names and high-growth local innovators.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Testimonials / Case Studies */}
      <Section>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-12"
          >
            <SectionHeading size="2xl">Proven Results</SectionHeading>
            <SectionSubtitle className="mt-4">
              Real impact for real brands across South Africa.
            </SectionSubtitle>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
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

      {/* Portfolio Grid */}
      <Section className="bg-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-12"
          >
            <SectionHeading size="2xl">Our Portfolio</SectionHeading>
            <SectionSubtitle className="mt-4">
              A selection of brands we&apos;ve helped grow.
            </SectionSubtitle>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {portfolioItems.map((item, index) => (
              <PortfolioCard
                key={item.id}
                client={item.client}
                category={item.category}
                description={item.description}
                results={item.results}
                index={index}
              />
            ))}
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
              Ready to join our portfolio of success stories?
            </SectionHeading>
            <Button href="/contact" variant="primary" size="lg">
              Start Your Project
            </Button>
          </motion.div>
        </div>
      </Section>

      <Footer />
    </main>
  );
}
