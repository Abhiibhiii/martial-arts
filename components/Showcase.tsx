"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, MotionValue } from "framer-motion";
import { site } from "@/lib/site";

type Slide = { word: string; img: string; note: string };

function ShowcaseSlide({
  slide,
  i,
  n,
  progress,
}: {
  slide: Slide;
  i: number;
  n: number;
  progress: MotionValue<number>;
}) {
  // Slides sit at progress 0, 0.5, 1 (for n=3). Triangle windows, CLAMPED to
  // [0,1] — framer's scroll→WAAPI mapping rejects offsets outside that range.
  const center = n > 1 ? i / (n - 1) : 0.5;
  const half = n > 1 ? 1 / (n - 1) : 1;
  const left = Math.max(0, center - half);
  const right = Math.min(1, center + half);

  const isFirst = i === 0;
  const isLast = i === n - 1;

  const opacity = useTransform(
    progress,
    isFirst ? [0, right] : isLast ? [left, 1] : [left, center, right],
    isFirst ? [1, 0] : isLast ? [0, 1] : [0, 1, 0]
  );
  const scale = useTransform(progress, [0, 1], [1.22, 1.05]);
  const textY = useTransform(
    progress,
    isFirst ? [0, right] : isLast ? [left, 1] : [left, right],
    isFirst ? ["0%", "-12%"] : isLast ? ["12%", "0%"] : ["12%", "-12%"]
  );

  return (
    <>
      {/* Image layer */}
      <motion.div style={{ opacity }} className="absolute inset-0">
        <motion.img
          style={{ scale }}
          src={slide.img}
          alt={slide.word}
          className="h-full w-full object-cover object-center [filter:brightness(0.55)_contrast(1.1)_saturate(0.8)]"
          draggable={false}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-black/60" />
      </motion.div>

      {/* Text layer */}
      <motion.div
        style={{ opacity, y: textY }}
        className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center px-6 text-center"
      >
        <span className="font-display display-lg uppercase leading-none text-fg [text-shadow:0_2px_40px_rgba(0,0,0,0.7)]">
          {slide.word}
        </span>
        <span className="mt-6 max-w-md text-balance text-base text-fg/75 md:text-lg">
          {slide.note}
        </span>
      </motion.div>
    </>
  );
}

export default function Showcase() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });
  const slides = site.showcase as unknown as Slide[];
  const n = slides.length;

  return (
    <section
      id="showcase"
      ref={ref}
      className="relative"
      style={{ height: `${n * 115}vh` }}
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-black">
        {slides.map((slide, i) => (
          <ShowcaseSlide
            key={slide.word}
            slide={slide}
            i={i}
            n={n}
            progress={scrollYProgress}
          />
        ))}
      </div>
    </section>
  );
}
