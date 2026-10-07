"use client";

import { useEffect, useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useMotionValueEvent,
  MotionValue,
} from "framer-motion";
import { site } from "@/lib/site";

type Clip = { file: string; title: string; quote: string };

/** One full-screen video layer with its own title/quote, fading in/out
 *  over its scroll window. */
function VideoLayer({
  clip,
  i,
  n,
  progress,
  register,
}: {
  clip: Clip;
  i: number;
  n: number;
  progress: MotionValue<number>;
  register: (i: number, el: HTMLVideoElement | null) => void;
}) {
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
  const scale = useTransform(
    progress,
    [left, right],
    isFirst ? [1.06, 1.16] : [1.16, 1.06]
  );
  // Text drifts up a touch as its clip passes through
  const textY = useTransform(
    progress,
    isFirst ? [0, right] : isLast ? [left, 1] : [left, right],
    isFirst ? ["0%", "-24%"] : isLast ? ["24%", "0%"] : ["24%", "-24%"]
  );

  return (
    <motion.div style={{ opacity }} className="absolute inset-0">
      <motion.video
        ref={(el) => register(i, el)}
        style={{ scale }}
        muted
        loop
        playsInline
        preload="auto"
        poster={`/media/videos/${clip.file}.jpg`}
        className="h-full w-full object-cover object-center will-change-transform [transform:translateZ(0)]"
      >
        <source src={`/media/videos/${clip.file}.mp4`} type="video/mp4" />
      </motion.video>

      {/* Legibility scrim + centered title/quote */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-black/45" />
      <motion.div
        style={{ y: textY }}
        className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center"
      >
        <h3 className="font-display display-lg uppercase leading-none text-fg [text-shadow:0_2px_50px_rgba(0,0,0,0.75)]">
          {clip.title}
        </h3>
        <p className="mt-6 max-w-md text-balance text-base italic text-fg/80 md:text-lg">
          “{clip.quote}”
        </p>
      </motion.div>
    </motion.div>
  );
}

export default function Motion() {
  const { clips } = site.motion;
  const n = clips.length;

  const sectionRef = useRef<HTMLElement>(null);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const inView = useRef(false);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  const register = (i: number, el: HTMLVideoElement | null) => {
    videoRefs.current[i] = el;
  };

  // Play only the clip(s) currently visible; pause the rest. Imperative so
  // it never triggers React re-renders on scroll.
  const sync = () => {
    const p = scrollYProgress.get();
    videoRefs.current.forEach((v, idx) => {
      if (!v) return;
      const center = n > 1 ? idx / (n - 1) : 0.5;
      const half = n > 1 ? 1 / (n - 1) : 1;
      const visible = 1 - Math.abs(p - center) / half;
      const shouldPlay = inView.current && visible > 0.1;
      if (shouldPlay) {
        if (v.paused) v.play().catch(() => {});
      } else if (!v.paused) {
        v.pause();
      }
    });
  };

  useMotionValueEvent(scrollYProgress, "change", sync);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        inView.current = entry.isIntersecting;
        sync();
      },
      { threshold: 0.02 }
    );
    io.observe(el);
    return () => io.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section
      id="motion"
      ref={sectionRef}
      className="relative"
      style={{ height: `${n * 100}vh` }}
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-black">
        {clips.map((clip, i) => (
          <VideoLayer
            key={clip.file}
            clip={clip as Clip}
            i={i}
            n={n}
            progress={scrollYProgress}
            register={register}
          />
        ))}
      </div>
    </section>
  );
}
