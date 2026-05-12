"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { stats } from "@/lib/data";

function AnimatedNumber({ value, suffix }: { value: number; suffix: string }) {
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
          // Handle decimal values
          if (value % 1 !== 0) {
            setDisplayValue(Math.floor(current * 10) / 10);
          } else {
            setDisplayValue(Math.floor(current));
          }
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

export function StatsCounter() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
      {stats.map((stat, index) => (
        <motion.div
          key={stat.label}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: index * 0.1 }}
          className="text-center md:text-left"
        >
          <div className="text-4xl md:text-5xl lg:text-6xl font-bold text-accent mb-2">
            <AnimatedNumber value={stat.value} suffix={stat.suffix} />
          </div>
          <p className="text-sm md:text-base text-text-secondary">{stat.label}</p>
        </motion.div>
      ))}
    </div>
  );
}
