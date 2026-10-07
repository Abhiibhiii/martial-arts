"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { site } from "@/lib/site";
import { Reveal, Kicker } from "./Reveal";

export default function Reel() {
  const { kicker, heading, sub } = site.reel;
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);

  const toggle = () => {
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) {
      v.play();
      setPlaying(true);
    } else {
      v.pause();
      setPlaying(false);
    }
  };

  return (
    <section id="reel" className="relative border-t border-line py-28 md:py-40">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-12 text-center md:mb-16">
          <Reveal>
            <div className="flex justify-center">
              <Kicker>{kicker}</Kicker>
            </div>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="font-display display-md mt-6 uppercase text-fg">
              {heading}
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mx-auto mt-5 max-w-md text-muted">{sub}</p>
          </Reveal>
        </div>

        <Reveal delay={0.1}>
          <div
            onClick={toggle}
            className="vignette group relative aspect-video w-full cursor-pointer overflow-hidden rounded-2xl border border-line bg-bg-2"
          >
            {/* Fallback gradient behind the video */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#191013] via-[#0a0a0c] to-black" />
            <video
              ref={videoRef}
              className="relative h-full w-full object-cover"
              playsInline
              loop
              poster="/media/reel/reel-poster.jpg"
              onPlay={() => setPlaying(true)}
              onPause={() => setPlaying(false)}
            >
              <source src="/media/reel/reel.mp4" type="video/mp4" />
            </video>

            {/* Play / pause overlay */}
            <motion.div
              animate={{ opacity: playing ? 0 : 1 }}
              transition={{ duration: 0.4 }}
              className="absolute inset-0 flex items-center justify-center bg-black/30"
            >
              <span className="relative flex h-20 w-20 items-center justify-center rounded-full border border-white/30 backdrop-blur-sm transition-all duration-500 group-hover:scale-110 group-hover:border-accent md:h-24 md:w-24">
                <span className="absolute inset-0 animate-ping rounded-full border border-accent/40" />
                <svg
                  viewBox="0 0 24 24"
                  className="ml-1 h-7 w-7 fill-fg"
                  aria-hidden
                >
                  <path d="M8 5v14l11-7z" />
                </svg>
              </span>
            </motion.div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
