"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";

interface FAQItemProps {
  question: string;
  answer: string;
  isOpen?: boolean;
  onToggle?: () => void;
}

export function FAQItem({
  question,
  answer,
  isOpen: controlledIsOpen,
  onToggle,
}: FAQItemProps) {
  const [internalIsOpen, setInternalIsOpen] = useState(false);
  const isOpen = controlledIsOpen ?? internalIsOpen;
  const toggle = onToggle ?? (() => setInternalIsOpen(!internalIsOpen));

  return (
    <div className="border-b border-border">
      <button
        onClick={toggle}
        className="group flex w-full items-center justify-between py-5 text-left sm:py-6"
      >
        <span className="pr-6 text-base font-medium text-text-primary transition-colors group-hover:text-accent sm:pr-8 sm:text-lg">
          {question}
        </span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          className="flex-shrink-0"
        >
          {isOpen ? (
            <Minus className="w-5 h-5 text-accent" />
          ) : (
            <Plus className="w-5 h-5 text-text-secondary" />
          )}
        </motion.div>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <p className="max-w-3xl pb-5 text-sm leading-relaxed text-text-secondary sm:pb-6 sm:text-base">
              {answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
