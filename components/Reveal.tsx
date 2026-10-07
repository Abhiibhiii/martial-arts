"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

/**
 * Reusable scroll-reveal wrapper: fades + rises into view once.
 * Used across sections to keep motion consistent.
 */
export function Reveal({
  children,
  delay = 0,
  y = 28,
  className = "",
  once = true,
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
  once?: boolean;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, margin: "-12% 0px -12% 0px" }}
      transition={{ duration: 0.9, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

/**
 * Section kicker — the small uppercase label above headings.
 */
export function Kicker({ children }: { children: ReactNode }) {
  return (
    <span className="tracking-kicker inline-flex items-center gap-3 text-xs font-medium uppercase text-muted">
      <span className="h-px w-8 bg-accent" />
      {children}
    </span>
  );
}
