"use client";

import { motion } from "framer-motion";
import { site } from "@/lib/site";
import { Reveal, Kicker } from "./Reveal";
import Frame from "./Frame";

export default function Gallery() {
  const { heading, items } = site.gallery;

  return (
    <section id="gallery" className="relative border-t border-line py-28 md:py-40">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex items-end justify-between gap-6">
          <div>
            <Reveal>
              <Kicker>Gallery</Kicker>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="font-display display-md mt-6 uppercase text-fg">
                {heading}
              </h2>
            </Reveal>
          </div>
          <Reveal delay={0.1}>
            <span className="hidden text-sm text-muted md:block">
              {items.length} frames
            </span>
          </Reveal>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-4 sm:grid-cols-2 md:mt-20 md:grid-cols-6 md:gap-5">
          {items.map((item, i) => {
            // Editorial layout: some tiles span wider/taller for rhythm
            const layout = [
              "md:col-span-4 md:row-span-2 aspect-[16/10]",
              "md:col-span-2 aspect-[4/5]",
              "md:col-span-2 aspect-[4/5]",
              "md:col-span-3 aspect-[16/11]",
              "md:col-span-3 aspect-[16/11]",
              "md:col-span-6 aspect-[21/9]",
            ];
            return (
              <motion.figure
                key={item.file}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-8%" }}
                transition={{
                  duration: 0.8,
                  delay: (i % 3) * 0.08,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className={`group relative overflow-hidden rounded-xl border border-line bg-bg-2 ${layout[i % layout.length]}`}
              >
                <div className="absolute inset-0 transition-transform duration-[1.2s] ease-out group-hover:scale-105">
                  <Frame
                    src={`/media/photos/${item.file}.jpg`}
                    alt={item.caption}
                    label={String(i + 1).padStart(2, "0")}
                    tint={i % 2 === 0}
                  />
                </div>
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-70 transition-opacity duration-500 group-hover:opacity-90" />
                <figcaption className="absolute bottom-0 left-0 flex items-center gap-3 p-5 md:p-6">
                  <span className="h-px w-6 bg-accent transition-all duration-500 group-hover:w-10" />
                  <span className="translate-y-1 text-sm text-fg/90 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                    {item.caption}
                  </span>
                </figcaption>
              </motion.figure>
            );
          })}
        </div>
      </div>
    </section>
  );
}
