"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface ButtonProps {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  className?: string;
  external?: boolean;
  fullWidth?: boolean;
}

export function Button({
  children,
  href,
  onClick,
  variant = "primary",
  size = "md",
  className,
  external = false,
  fullWidth = false,
}: ButtonProps) {
  const baseStyles =
    "inline-flex items-center justify-center font-medium transition-all duration-300 rounded-full active:scale-95 touch-manipulation";

  const variants = {
    primary:
      "bg-accent text-background hover:bg-accent-hover hover:shadow-[0_0_30px_rgba(0,229,255,0.35)]",
    secondary:
      "bg-surface text-text-primary hover:bg-surface-hover border border-border",
    outline:
      "border-2 border-text-primary text-text-primary hover:bg-text-primary hover:text-background",
    ghost: "text-text-primary hover:text-accent",
  };

  const sizes = {
    sm: "px-4 py-2 text-sm min-h-[36px]",
    md: "px-5 sm:px-6 py-2.5 sm:py-3 text-sm sm:text-base min-h-[44px] sm:min-h-[48px]",
    lg: "px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg min-h-[48px] sm:min-h-[56px]",
  };

  const classes = cn(
    baseStyles,
    variants[variant],
    sizes[size],
    fullWidth && "w-full",
    className
  );

  const MotionComponent = href ? (external ? motion.a : motion(Link)) : motion.button;

  return (
    <MotionComponent
      href={href}
      onClick={onClick}
      className={classes}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      {...(external && { target: "_blank", rel: "noopener noreferrer" })}
    >
      {children}
    </MotionComponent>
  );
}
