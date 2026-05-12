"use client";

import { motion } from "framer-motion";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Section, SectionHeading, SectionSubtitle } from "@/components/section";
import { Button } from "@/components/button";
import { FAQItem } from "@/components/faq-item";
import { companyInfo, challenges, differentiators } from "@/lib/data";
import { Target, Eye, Zap, Shield, Users } from "lucide-react";

export default function AboutPage() {
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
              About Lawu Media
            </h1>
            <p className="text-xl md:text-2xl text-text-secondary leading-relaxed">
              {companyInfo.description}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Vision & Mission Section */}
      <Section>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
            {/* Vision Card */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-surface border border-border rounded-2xl p-8 lg:p-12"
            >
              <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center mb-6">
                <Eye className="w-6 h-6 text-accent" />
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-text-primary mb-4">
                Vision
              </h2>
              <p className="text-text-secondary leading-relaxed">
                {companyInfo.vision}
              </p>
            </motion.div>

            {/* Mission Card */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="bg-surface border border-border rounded-2xl p-8 lg:p-12"
            >
              <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center mb-6">
                <Target className="w-6 h-6 text-accent" />
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-text-primary mb-4">
                Mission
              </h2>
              <p className="text-text-secondary leading-relaxed">
                {companyInfo.mission}
              </p>
            </motion.div>
          </div>
        </div>
      </Section>

      {/* The Challenge Section */}
      <Section className="bg-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-12"
          >
            <SectionHeading size="2xl">The Challenge</SectionHeading>
            <SectionSubtitle className="mt-4">
              Marketing today is no longer just about &quot;getting seen&quot;; it is
              about surviving and thriving amidst external pressures that dictate
              how consumers behave. At Lawu Media, we solve the core problem of
              Digital Disconnect.
            </SectionSubtitle>
          </motion.div>

          <div className="max-w-3xl">
            {challenges.map((challenge, index) => (
              <motion.div
                key={challenge.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <FAQItem
                  question={challenge.title}
                  answer={challenge.description}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </Section>

      {/* Why Choose Us Section */}
      <Section>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <SectionHeading size="2xl">Why Choose Us</SectionHeading>
            <SectionSubtitle className="mt-4 mx-auto">
              We don&apos;t just deliver engagement. We deliver measurable impact on
              your bottom line by combining the precision of performance
              marketing with the authenticity of human voices.
            </SectionSubtitle>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {differentiators.slice(0, 3).map((item, index) => (
              <motion.div
                key={item.number}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                className="bg-surface border border-border rounded-2xl p-8 text-center hover:border-accent/30 transition-all duration-300"
              >
                <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-6">
                  {index === 0 && <Zap className="w-8 h-8 text-accent" />}
                  {index === 1 && <Shield className="w-8 h-8 text-accent" />}
                  {index === 2 && <Users className="w-8 h-8 text-accent" />}
                </div>
                <h3 className="text-xl font-bold text-text-primary mb-4">
                  {item.title}
                </h3>
                <p className="text-text-secondary leading-relaxed">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </Section>

      {/* CTA Section */}
      <Section className="bg-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <SectionHeading size="3xl" className="mb-8">
              Let&apos;s build something great together
            </SectionHeading>
            <Button href="/contact" variant="primary" size="lg">
              Get in Touch
            </Button>
          </motion.div>
        </div>
      </Section>

      <Footer />
    </main>
  );
}
