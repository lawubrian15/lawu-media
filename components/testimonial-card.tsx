"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { ArrowUpRight } from "lucide-react";

interface TestimonialCardProps {
  client: string;
  quote: string;
  stat: string;
  statLabel: string;
  category: string;
  index: number;
}

function AnimatedCounter({ value, suffix }: { value: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    if (isInView) {
      const duration = 2000;
      const steps = 60;
      const increment = value / steps;
      let current = 0;

      const timer = setInterval(() => {
        current += increment;
        if (current >= value) {
          setDisplayValue(value);
          clearInterval(timer);
        } else {
          setDisplayValue(Math.floor(current * 10) / 10);
        }
      }, duration / steps);

      return () => clearInterval(timer);
    }
  }, [isInView, value]);

  return (
    <span ref={ref}>
      {displayValue}
      {suffix}
    </span>
  );
}

export function TestimonialCard({
  client,
  quote,
  stat,
  statLabel,
  category,
  index,
}: TestimonialCardProps) {
  // Parse the stat value
  const numericValue = parseFloat(stat.replace(/[^0-9.]/g, ""));
  const suffix = stat.replace(/[0-9.]/g, "");

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.15 }}
      className="group rounded-2xl border border-border bg-surface p-6 transition-all duration-300 hover:-translate-y-1 hover:border-accent/50 sm:p-8"
    >
      {/* Category Tag */}
      <div className="mb-4 sm:mb-6">
        <span className="text-xs font-medium text-text-muted uppercase tracking-wider">
          {category}
        </span>
      </div>

      {/* Quote */}
      <p className="mb-6 text-sm leading-relaxed text-text-secondary sm:mb-8 sm:text-base">{quote}</p>

      {/* Stat */}
      <div className="mb-6">
        <div className="text-4xl font-bold text-accent sm:text-5xl md:text-6xl">
          <AnimatedCounter value={numericValue} suffix={suffix} />
        </div>
        <p className="text-sm text-text-muted mt-1">{statLabel}</p>
      </div>

      {/* Client Name */}
      <div className="flex items-center justify-between">
        <div>
          <p className="font-semibold text-text-primary">{client}</p>
        </div>
        <div className="w-10 h-10 rounded-full bg-surface-hover flex items-center justify-center group-hover:bg-accent/10 transition-colors">
          <ArrowUpRight className="w-5 h-5 text-text-secondary group-hover:text-accent transition-colors" />
        </div>
      </div>
    </motion.div>
  );
}
