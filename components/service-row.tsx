"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface ServiceRowProps {
  name: string;
  shortDescription: string;
  href: string;
  index: number;
}

export function ServiceRow({
  name,
  shortDescription,
  href,
  index,
}: ServiceRowProps) {
  const [isHovered, setIsHovered] = useState(false);
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="border-b border-border group"
    >
      <Link
        href={href}
        className="-mx-3 block rounded-2xl px-3 py-6 transition-colors duration-300 hover:bg-surface/70 sm:-mx-4 sm:px-4 sm:py-8 md:py-10"
      >
        <div className="grid gap-4 md:grid-cols-[minmax(0,1fr)_minmax(280px,0.9fr)_auto] md:items-center">
          <div className="min-w-0">
            <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-text-primary group-hover:text-accent transition-colors">
              {name}
            </h3>
          </div>

          <p className="text-sm sm:text-base text-text-secondary leading-relaxed md:opacity-75 md:group-hover:opacity-100 transition-opacity duration-300">
            {shortDescription}
          </p>

          <div className="flex items-center gap-2 text-sm font-medium justify-start md:justify-end">
            <span
              className={cn(
                "transition-colors",
                isHovered ? "text-accent" : "text-text-secondary"
              )}
            >
              Read More
            </span>
            <motion.div
              animate={{ x: isHovered ? 4 : 0 }}
              transition={{ duration: 0.2 }}
              className="flex items-center"
            >
              <ChevronRight
                className={cn(
                  "w-5 h-5 transition-colors",
                  isHovered ? "text-accent" : "text-text-secondary"
                )}
              />
            </motion.div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
