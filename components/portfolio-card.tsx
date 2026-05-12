"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface PortfolioCardProps {
  client: string;
  category: string;
  description: string;
  results: string[];
  index: number;
}

export function PortfolioCard({
  client,
  category,
  description,
  results,
  index,
}: PortfolioCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group bg-surface border border-border rounded-2xl overflow-hidden hover:border-accent/30 transition-all duration-300"
    >
      {/* Header */}
      <div className="p-6 md:p-8 border-b border-border">
        <div className="flex items-start justify-between mb-4">
          <div>
            <span className="text-xs font-medium text-accent uppercase tracking-wider">
              {category}
            </span>
            <h3 className="text-2xl font-bold text-text-primary mt-1">
              {client}
            </h3>
          </div>
          <div className="w-10 h-10 rounded-full bg-surface-hover flex items-center justify-center group-hover:bg-accent/10 transition-colors">
            <ArrowUpRight className="w-5 h-5 text-text-secondary group-hover:text-accent transition-colors" />
          </div>
        </div>
        <p className="text-text-secondary leading-relaxed">{description}</p>
      </div>

      {/* Results */}
      <div className="p-6 md:p-8">
        <h4 className="text-sm font-semibold text-text-primary uppercase tracking-wider mb-4">
          Results
        </h4>
        <ul className="space-y-2">
          {results.map((result, i) => (
            <li key={i} className="flex items-center gap-2 text-sm text-text-secondary">
              <span className="w-1.5 h-1.5 rounded-full bg-accent flex-shrink-0" />
              {result}
            </li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
}
