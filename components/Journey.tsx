"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { site } from "@/lib/site";
import { Reveal, Kicker } from "./Reveal";

export default function Journey() {
  const { heading, milestones, stats } = site.journey;
  const trackRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ["start 0.6", "end 0.7"],
  });
  const lineScale = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section id="journey" className="relative border-t border-line py-28 md:py-40">
      <div className="mx-auto max-w-7xl px-6">
        <Reveal>
          <Kicker>Timeline</Kicker>
        </Reveal>
        <Reveal delay={0.05}>
          <h2 className="font-display display-md mt-6 uppercase text-fg">
            {heading}
          </h2>
        </Reveal>

        {/* Timeline */}
        <div ref={trackRef} className="relative mt-16 md:mt-24">
          {/* Vertical progress rail */}
          <div className="absolute left-[7px] top-2 bottom-2 w-px bg-line md:left-1/2">
            <motion.div
              style={{ scaleY: lineScale }}
              className="absolute inset-0 origin-top bg-accent"
            />
          </div>

          <div className="space-y-14 md:space-y-24">
            {milestones.map((m, i) => (
              <motion.div
                key={m.year}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-15%" }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                className={`relative pl-10 md:grid md:grid-cols-2 md:gap-16 md:pl-0 ${
                  i % 2 === 0 ? "" : "md:[direction:rtl]"
                }`}
              >
                <span className="absolute left-0 top-1.5 h-4 w-4 -translate-x-1/2 rounded-full border-2 border-accent bg-bg md:left-1/2" />
                <div
                  className={`[direction:ltr] ${
                    i % 2 === 0 ? "md:pr-16 md:text-right" : "md:col-start-2 md:pl-16"
                  }`}
                >
                  <span className="font-display text-5xl text-outline md:text-6xl">
                    {m.year}
                  </span>
                  <h3 className="mt-3 font-display text-2xl uppercase text-fg">
                    {m.title}
                  </h3>
                  <p className="mt-2 text-muted">{m.body}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Stats strip */}
        <div className="mt-24 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-line bg-line md:mt-32 md:grid-cols-4">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 0.7, delay: i * 0.1 }}
              className="bg-bg p-8 text-center md:p-10"
            >
              <div className="font-display text-5xl text-accent md:text-6xl">
                {s.value}
              </div>
              <div className="tracking-kicker mt-3 text-xs uppercase text-muted">
                {s.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
