"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, MotionValue } from "framer-motion";
import { site } from "@/lib/site";

function Word({
  children,
  range,
  progress,
}: {
  children: string;
  range: [number, number];
  progress: MotionValue<number>;
}) {
  const opacity = useTransform(progress, range, [0.12, 1]);
  const y = useTransform(progress, range, [8, 0]);
  return (
    <motion.span style={{ opacity, y }} className="mr-[0.28em] inline-block">
      {children}
    </motion.span>
  );
}

export default function Manifesto() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.85", "end 0.55"],
  });

  const words = site.manifesto.split(" ");

  return (
    <section className="relative isolate overflow-hidden py-32 md:py-48">
      {/* Graded photo backdrop */}
      <div className="absolute inset-0 z-0">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={site.manifestoBg}
          alt=""
          aria-hidden
          className="h-full w-full object-cover object-center opacity-25 [filter:grayscale(0.35)_brightness(0.45)_contrast(1.1)]"
          draggable={false}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-bg via-bg/70 to-bg/90" />
      </div>

      <div className="relative z-10 mx-auto max-w-5xl px-6">
        <p
          ref={ref}
          className="font-display text-3xl uppercase leading-[1.15] text-fg sm:text-4xl md:text-6xl"
        >
          {words.map((word, i) => {
            const start = i / words.length;
            const end = start + 1 / words.length;
            return (
              <Word key={i} range={[start, end]} progress={scrollYProgress}>
                {word}
              </Word>
            );
          })}
        </p>
      </div>
    </section>
  );
}
