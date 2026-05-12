"use client";

import { useState, useEffect } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export function CustomCursor() {
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [cursorVariant, setCursorVariant] = useState<"default" | "light" | "dark">("default");
  const [isVisible, setIsVisible] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const springConfig = { damping: 25, stiffness: 300 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  const outerSpringConfig = { damping: 30, stiffness: 200 };
  const outerXSpring = useSpring(cursorX, outerSpringConfig);
  const outerYSpring = useSpring(cursorY, outerSpringConfig);

  // Check for touch device on mount
  useEffect(() => {
    const checkTouch = () => {
      const isTouch =
        "ontouchstart" in window ||
        navigator.maxTouchPoints > 0 ||
        window.matchMedia("(pointer: coarse)").matches;
      setIsTouchDevice(isTouch);
    };

    checkTouch();
    window.addEventListener("resize", checkTouch);
    return () => window.removeEventListener("resize", checkTouch);
  }, []);

  useEffect(() => {
    // Don't run cursor code on touch devices
    if (isTouchDevice) return;

    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      setIsVisible(true);

      // Detect background brightness
      detectBackgroundBrightness(e.clientX, e.clientY);
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);
    const handleMouseEnter = () => setIsVisible(true);
    const handleMouseLeave = () => setIsVisible(false);

    const detectBackgroundBrightness = (x: number, y: number) => {
      const element = document.elementFromPoint(x, y);
      if (!element) return;

      const computedStyle = window.getComputedStyle(element);
      const bgColor = computedStyle.backgroundColor;

      const rgbMatch = bgColor.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/);
      if (rgbMatch) {
        const r = parseInt(rgbMatch[1]);
        const g = parseInt(rgbMatch[2]);
        const b = parseInt(rgbMatch[3]);
        const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;

        if (luminance > 0.5) {
          setCursorVariant("dark");
        } else {
          setCursorVariant("light");
        }
      }
    };

    // Track hoverable elements
    const trackElements = () => {
      const hoverables = document.querySelectorAll(
        'a, button, [role="button"], input, textarea, select, .cursor-pointer, [data-cursor="hover"]'
      );

      hoverables.forEach((el) => {
        el.addEventListener("mouseenter", () => setIsHovering(true));
        el.addEventListener("mouseleave", () => setIsHovering(false));
      });
    };

    window.addEventListener("mousemove", moveCursor);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);
    document.body.addEventListener("mouseenter", handleMouseEnter);
    document.body.addEventListener("mouseleave", handleMouseLeave);

    trackElements();
    const interval = setInterval(trackElements, 1000);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      document.body.removeEventListener("mouseenter", handleMouseEnter);
      document.body.removeEventListener("mouseleave", handleMouseLeave);
      clearInterval(interval);
    };
  }, [cursorX, cursorY, isTouchDevice]);

  // Don't render cursor on touch devices
  if (isTouchDevice) return null;

  const cursorColors = {
    default: {
      inner: "bg-accent",
      outer: "border-accent",
      trail: "bg-accent/20",
    },
    light: {
      inner: "bg-text-primary",
      outer: "border-text-primary",
      trail: "bg-text-primary/20",
    },
    dark: {
      inner: "bg-background",
      outer: "border-background",
      trail: "bg-background/20",
    },
  };

  const colors = cursorColors[cursorVariant];

  return (
    <>
      <motion.div
        className={`fixed top-0 left-0 w-10 h-10 rounded-full border-2 ${colors.outer} pointer-events-none z-[9998] mix-blend-difference hidden lg:block`}
        style={{
          x: outerXSpring,
          y: outerYSpring,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          scale: isHovering ? 1.5 : isClicking ? 0.8 : 1,
          opacity: isVisible ? 1 : 0,
        }}
        transition={{ duration: 0.15 }}
      />

      <motion.div
        className={`fixed top-0 left-0 w-3 h-3 rounded-full ${colors.inner} pointer-events-none z-[9999] mix-blend-difference hidden lg:block`}
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          scale: isHovering ? 0.5 : isClicking ? 0.3 : 1,
          opacity: isVisible ? 1 : 0,
        }}
        transition={{ duration: 0.1 }}
      />

      <motion.div
        className={`fixed top-0 left-0 w-20 h-20 rounded-full ${colors.trail} blur-xl pointer-events-none z-[9997] mix-blend-screen hidden lg:block`}
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          scale: isHovering ? 2 : 1,
          opacity: isVisible ? (isHovering ? 0.5 : 0.3) : 0,
        }}
        transition={{ duration: 0.3 }}
      />

      <style jsx global>{`
        @media (pointer: fine) and (min-width: 1024px) {
          * {
            cursor: none !important;
          }
        }
        @media (pointer: coarse), (max-width: 1023px) {
          * {
            cursor: auto !important;
          }
        }
      `}</style>
    </>
  );
}
