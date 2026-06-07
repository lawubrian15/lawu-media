"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { Button } from "./button";
import { cn } from "@/lib/utils";

interface PricingCardProps {
  name: string;
  description: string;
  features: string[];
  highlighted?: boolean;
  index: number;
}

export function PricingCard({
  name,
  description,
  features,
  highlighted = false,
  index,
}: PricingCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.15 }}
      className={cn(
        "relative rounded-2xl p-6 md:p-8 transition-all duration-300",
        highlighted
          ? "bg-surface border-2 border-accent"
          : "bg-surface border border-border hover:border-text-muted"
      )}
    >
      {highlighted && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2">
          <span className="bg-accent text-background text-xs font-semibold px-3 py-1 rounded-full">
            Recommended
          </span>
        </div>
      )}

      <h3 className="text-lg font-semibold text-text-primary mb-2">{name}</h3>

      <p className="text-sm font-medium text-text-muted mb-4">Price on request</p>

      <p className="text-sm text-text-secondary mb-6">{description}</p>

      <ul className="space-y-3 mb-8">
        {features.map((feature, i) => (
          <li key={i} className="flex items-start gap-3">
            <div
              className={cn(
                "flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center mt-0.5",
                highlighted ? "bg-accent/20" : "bg-surface-hover"
              )}
            >
              <Check
                className={cn(
                  "w-3 h-3",
                  highlighted ? "text-accent" : "text-text-secondary"
                )}
              />
            </div>
            <span className="text-sm text-text-secondary">{feature}</span>
          </li>
        ))}
      </ul>

      <Button
        href="/contact"
        variant={highlighted ? "primary" : "secondary"}
        size="md"
        className="w-full"
      >
        Get Started
      </Button>
    </motion.div>
  );
}
