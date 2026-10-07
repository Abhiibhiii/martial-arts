"use client";

import { useEffect, useRef } from "react";
import { motion, useScroll, useTransform, useMotionTemplate } from "framer-motion";
import { site } from "@/lib/site";

export default function Introduction() {
  const { kicker, name, line, clip } = site.intro;
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  // Play only while the section is on screen
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) v.play().catch(() => {});
        else v.pause();
      },
      { threshold: 0.15 }
    );
    io.observe(v);
    return () => io.disconnect();
  }, []);

  // The name materialises out of the footage, holds, then dissolves
  const nameOpacity = useTransform(
    scrollYProgress,
    [0.05, 0.32, 0.72, 0.95],
    [0, 1, 1, 0]
  );
  const blurPx = useTransform(scrollYProgress, [0.05, 0.34], [18, 0]);
  const blur = useMotionTemplate`blur(${blurPx}px)`;
  const nameY = useTransform(scrollYProgress, [0.05, 0.34], [40, 0]);
  const nameScale = useTransform(scrollYProgress, [0.05, 0.34], [1.08, 1]);
  const videoScale = useTransform(scrollYProgress, [0, 1], [1.15, 1.02]);

  return (
    <section
      id="intro"
      ref={sectionRef}
      className="relative"
      style={{ height: "220vh" }}
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-black">
        {/* Sword round-swing footage */}
        <motion.video
          ref={videoRef}
          style={{ scale: videoScale }}
          muted
          loop
          playsInline
          preload="auto"
          poster={`/media/videos/${clip}.jpg`}
          className="absolute inset-0 h-full w-full object-cover object-center will-change-transform [transform:translateZ(0)]"
        >
          <source src={`/media/videos/${clip}.mp4`} type="video/mp4" />
        </motion.video>
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-black/55" />

        {/* Name materialising from the footage */}
        <motion.div
          style={{ opacity: nameOpacity }}
          className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center"
        >
          <span className="tracking-kicker mb-5 flex items-center gap-3 text-xs uppercase text-accent md:text-sm">
            <span className="h-px w-8 bg-accent" />
            {kicker}
          </span>
          <motion.h2
            style={{ filter: blur, y: nameY, scale: nameScale }}
            className="font-display display-lg uppercase leading-[0.95] text-fg [text-shadow:0_2px_60px_rgba(0,0,0,0.8)]"
          >
            {name}
          </motion.h2>
          <p className="mt-8 max-w-xl text-balance text-base text-fg/80 md:text-lg">
            {line}
          </p>
        </motion.div>
      </div>
    </section>
  );
}
