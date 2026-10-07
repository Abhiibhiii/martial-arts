"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { site } from "@/lib/site";

export default function Philosophy() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);

  return (
    <section
      ref={ref}
      className="relative isolate overflow-hidden border-t border-line py-40 md:py-56"
    >
      {/* Graded photo backdrop */}
      <div className="absolute inset-0 z-0">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={site.philosophyBg}
          alt=""
          aria-hidden
          className="h-full w-full object-cover object-center opacity-20 [filter:grayscale(0.4)_brightness(0.4)_contrast(1.1)]"
          draggable={false}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-bg via-bg/80 to-bg" />
      </div>

      {/* Ghost word drifting in the background */}
      <motion.span
        style={{ y }}
        className="pointer-events-none absolute inset-x-0 top-1/2 -translate-y-1/2 select-none text-center font-display text-[26vw] uppercase leading-none text-outline"
        aria-hidden
      >
        Mastery
      </motion.span>

      <div className="relative z-10 mx-auto max-w-4xl px-6 text-center">
        <motion.blockquote
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-20%" }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="font-display text-3xl uppercase leading-[1.2] text-fg sm:text-4xl md:text-5xl"
        >
          <span className="text-accent">“</span>
          {site.philosophy.quote}
          <span className="text-accent">”</span>
        </motion.blockquote>
        <motion.cite
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.3 }}
          className="mt-8 block text-sm not-italic tracking-kicker text-muted uppercase"
        >
          {site.philosophy.author}
        </motion.cite>
      </div>
    </section>
  );
}
