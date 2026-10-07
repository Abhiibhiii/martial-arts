"use client";

import { motion } from "framer-motion";
import { site } from "@/lib/site";
import { Reveal, Kicker } from "./Reveal";

export default function Art() {
  const { heading, intro, pillars } = site.art;

  return (
    <section id="art" className="relative border-t border-line py-28 md:py-40">
      <div className="mx-auto max-w-7xl px-6">
        <div className="max-w-3xl">
          <Reveal>
            <Kicker>The Discipline</Kicker>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="font-display display-md mt-6 uppercase text-fg">
              {heading}
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-6 text-lg text-muted">{intro}</p>
          </Reveal>
        </div>

        <div className="mt-16 grid gap-px overflow-hidden rounded-2xl border border-line bg-line md:mt-24 md:grid-cols-3">
          {pillars.map((p, i) => (
            <motion.div
              key={p.no}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{
                duration: 0.8,
                delay: i * 0.12,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="group relative bg-bg p-10 transition-colors duration-500 hover:bg-bg-2 md:p-12"
            >
              <span className="font-display text-6xl text-outline transition-all duration-500 group-hover:[-webkit-text-stroke:1px_var(--accent)]">
                {p.no}
              </span>
              <h3 className="mt-8 font-display text-3xl uppercase text-fg">
                {p.title}
              </h3>
              <p className="mt-4 text-muted">{p.body}</p>
              <span className="mt-8 block h-px w-0 bg-accent transition-all duration-500 group-hover:w-16" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
