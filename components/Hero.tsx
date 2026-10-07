"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { site } from "@/lib/site";

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  // Parallax: media drifts up + darkens, text rises as you scroll away
  const mediaY = useTransform(scrollYProgress, [0, 1], ["0%", "22%"]);
  const mediaScale = useTransform(scrollYProgress, [0, 1], [1, 1.12]);
  const overlay = useTransform(scrollYProgress, [0, 1], [0.5, 0.9]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "-40%"]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  return (
    <section
      id="top"
      ref={ref}
      className="vignette relative isolate h-[100svh] w-full overflow-hidden"
    >
      {/* Background media */}
      <motion.div
        style={{ y: mediaY, scale: mediaScale }}
        className="absolute inset-0 z-0"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-[#191013] via-[#0a0a0c] to-black" />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={site.heroImage}
          alt={`${site.name} — ${site.discipline}`}
          className="h-full w-full object-cover object-center [filter:brightness(0.7)_contrast(1.05)_saturate(0.85)]"
          draggable={false}
        />
      </motion.div>

      {/* Darkening overlays for legibility (bright desert → dark UI) */}
      <motion.div
        style={{ opacity: overlay }}
        className="absolute inset-0 z-0 bg-black"
      />
      <div className="pointer-events-none absolute inset-0 z-0 bg-gradient-to-t from-bg via-bg/25 to-bg/70" />
      <div className="pointer-events-none absolute inset-0 z-0 bg-gradient-to-r from-bg/60 via-transparent to-bg/30" />

      {/* Foreground content */}
      <motion.div
        style={{ y: textY, opacity: textOpacity }}
        className="relative z-10 mx-auto flex h-full max-w-7xl flex-col justify-end px-6 pb-24 md:pb-28"
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="tracking-kicker mb-6 flex items-center gap-3 text-xs uppercase text-muted"
        >
          <span className="h-px w-10 bg-accent" />
          {site.sensei}
        </motion.div>

        <h1 className="font-display display-xl uppercase text-fg">
          {site.name}
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="mt-6 max-w-xl text-balance font-display text-2xl uppercase tracking-wide text-fg/90 md:text-3xl"
        >
          {site.heroTagline}
        </motion.p>
      </motion.div>

      {/* Scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 1 }}
        className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2"
      >
        <div className="flex flex-col items-center gap-2 text-muted">
          <span className="tracking-kicker text-[10px] uppercase">Scroll</span>
          <span className="relative flex h-10 w-6 justify-center rounded-full border border-line">
            <motion.span
              animate={{ y: [4, 14, 4], opacity: [1, 0.2, 1] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
              className="mt-1.5 h-1.5 w-1.5 rounded-full bg-accent"
            />
          </span>
        </div>
      </motion.div>
    </section>
  );
}
