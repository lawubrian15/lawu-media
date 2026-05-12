"use client";

import { motion } from "framer-motion";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Section, SectionHeading, SectionSubtitle } from "@/components/section";
import { Button } from "@/components/button";
import { services } from "@/lib/data";
import { Check } from "lucide-react";

export default function ServicesPage() {
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
              We don&apos;t just post content.
              <br />
              <span className="text-accent">We engineer digital experiences.</span>
            </h1>
            <p className="text-xl md:text-2xl text-text-secondary leading-relaxed">
              Our services are designed to address the specific challenges of the
              South African landscape—from high data costs to the need for deep
              cultural resonance.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services Detail Sections */}
      {services.map((service, index) => (
        <section
          key={service.id}
          id={service.id}
          className={`py-24 md:py-32 ${
            index % 2 === 0 ? "bg-background" : "bg-surface"
          }`}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div
              className={`grid lg:grid-cols-2 gap-12 lg:gap-20 items-center ${
                index % 2 === 1 ? "lg:flex-row-reverse" : ""
              }`}
            >
              {/* Content */}
              <motion.div
                initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className={index % 2 === 1 ? "lg:order-2" : ""}
              >
                <span className="text-sm font-medium text-accent uppercase tracking-wider">
                  0{index + 1}
                </span>
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-text-primary mt-4 mb-6">
                  {service.name}
                </h2>
                <p className="text-lg text-text-secondary leading-relaxed mb-8">
                  {service.fullDescription}
                </p>

                {/* Features List */}
                <ul className="space-y-4">
                  {service.features.map((feature, i) => (
                    <motion.li
                      key={i}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: i * 0.1 }}
                      className="flex items-start gap-3"
                    >
                      <div className="flex-shrink-0 w-6 h-6 rounded-full bg-accent/10 flex items-center justify-center mt-0.5">
                        <Check className="w-4 h-4 text-accent" />
                      </div>
                      <span className="text-text-secondary">{feature}</span>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>

              {/* Visual/Placeholder */}
              <motion.div
                initial={{ opacity: 0, x: index % 2 === 0 ? 30 : -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className={index % 2 === 1 ? "lg:order-1" : ""}
              >
                <div className="aspect-square bg-surface border border-border rounded-2xl flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-24 h-24 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-4">
                      <span className="text-4xl font-bold text-accent">
                        0{index + 1}
                      </span>
                    </div>
                    <p className="text-text-muted text-sm">{service.name}</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      ))}

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
              Ready to get started?
            </SectionHeading>
            <SectionSubtitle className="mb-8 mx-auto">
              Let&apos;s discuss how we can help your brand dominate the digital
              landscape.
            </SectionSubtitle>
            <Button href="/contact" variant="primary" size="lg">
              Book a Consultation
            </Button>
          </motion.div>
        </div>
      </Section>

      <Footer />
    </main>
  );
}
