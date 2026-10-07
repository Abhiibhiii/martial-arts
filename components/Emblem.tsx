"use client";

import { motion } from "framer-motion";
import { site } from "@/lib/site";
import { Reveal, Kicker } from "./Reveal";

// Feather the logo's edges so its parchment dissolves into the black page.
// The kanji/wordmark sit at the edge-centers, so only the empty corners fade.
const FEATHER = {
  WebkitMaskImage:
    "radial-gradient(circle at 50% 47%, #000 55%, rgba(0,0,0,0.5) 73%, transparent 92%)",
  maskImage:
    "radial-gradient(circle at 50% 47%, #000 55%, rgba(0,0,0,0.5) 73%, transparent 92%)",
} as const;

export default function Emblem() {
  return (
    <section
      id="emblem"
      className="relative isolate overflow-hidden py-24 md:py-36"
    >
      {/* The red circle it emerges from */}
      <div className="pointer-events-none absolute left-1/2 top-[46%] -z-0 h-[40rem] w-[40rem] max-w-[92vw] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/22 blur-[120px]" />
      <div className="pointer-events-none absolute left-1/2 top-[46%] -z-0 h-[24rem] w-[24rem] max-w-[78vw] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/18 blur-[70px]" />

      <div className="relative z-10 mx-auto flex max-w-4xl flex-col items-center px-6 text-center">
        <Reveal>
          <Kicker>The Emblem</Kicker>
        </Reveal>

        {/* Original logo — feathered so it blends into the background, no frame */}
        <motion.img
          src={site.logo}
          alt={`${site.name} emblem`}
          style={FEATHER}
          initial={{ opacity: 0, scale: 0.92 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-12%" }}
          transition={{ duration: 1.3, ease: [0.22, 1, 0.36, 1] }}
          className="mt-6 w-full max-w-2xl"
          draggable={false}
        />

        <Reveal>
          <p className="-mt-2 max-w-xl text-lg text-muted md:-mt-6">
            Three prongs, one weapon —{" "}
            <span className="text-fg">body, mind, and spirit</span> sharpened as
            one. Forged in the spirit of{" "}
            <span className="text-fg">少林武道</span>, the warrior&apos;s way.
          </p>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="mt-8 font-display text-xl uppercase tracking-wide text-accent">
            One heart · One technique · One lifetime
          </p>
        </Reveal>
      </div>
    </section>
  );
}
