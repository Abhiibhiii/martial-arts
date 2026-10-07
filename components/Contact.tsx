"use client";

import { motion } from "framer-motion";
import { site } from "@/lib/site";
import { Reveal } from "./Reveal";
import QueryForm from "./QueryForm";

export default function Contact() {
  const {
    heading,
    sub,
    phone,
    phoneLink,
    instagram,
    instagramLink,
    email,
    emailLink,
    socials,
  } = site.contact;

  const chip =
    "group inline-flex items-center gap-2.5 rounded-full border border-line bg-black/30 px-5 py-2.5 text-sm text-fg/85 backdrop-blur-sm transition-all duration-300 hover:border-accent hover:bg-accent/10 hover:text-fg";
  const glyph =
    "h-[18px] w-[18px] shrink-0 fill-muted transition-colors duration-300 group-hover:fill-accent";

  return (
    <footer
      id="contact"
      className="relative overflow-hidden border-t border-line bg-bg-2"
    >
      {/* Accent glow */}
      <div className="pointer-events-none absolute left-1/2 top-0 h-80 w-[60rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/20 blur-[120px]" />

      <div className="relative mx-auto max-w-7xl px-6 py-28 md:py-40">
        <div className="text-center">
          <Reveal>
            <h2 className="font-display display-lg mx-auto max-w-4xl uppercase text-fg">
              {heading}
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mx-auto mt-6 max-w-md text-lg text-muted">{sub}</p>
          </Reveal>
          <Reveal delay={0.15}>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
              {/* Email — the trident mark */}
              <motion.a
                href={emailLink}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                className={chip}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/media/trident.png"
                  alt=""
                  aria-hidden
                  className="h-5 w-5 shrink-0 object-contain transition-transform duration-300 group-hover:scale-110"
                  draggable={false}
                />
                {email}
              </motion.a>

              {/* Instagram */}
              <motion.a
                href={instagramLink}
                target="_blank"
                rel="noreferrer"
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                className={chip}
              >
                <svg viewBox="0 0 24 24" className={glyph} aria-hidden>
                  <path d="M12 2.2c3.2 0 3.58.01 4.85.07 1.17.05 1.8.25 2.23.41.56.22.96.48 1.38.9.42.42.68.82.9 1.38.16.42.36 1.06.41 2.23.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.05 1.17-.25 1.8-.41 2.23-.22.56-.48.96-.9 1.38-.42.42-.82.68-1.38.9-.42.16-1.06.36-2.23.41-1.27.06-1.65.07-4.85.07s-3.58-.01-4.85-.07c-1.17-.05-1.8-.25-2.23-.41a3.72 3.72 0 0 1-1.38-.9 3.72 3.72 0 0 1-.9-1.38c-.16-.42-.36-1.06-.41-2.23C2.21 15.58 2.2 15.2 2.2 12s.01-3.58.07-4.85c.05-1.17.25-1.8.41-2.23.22-.56.48-.96.9-1.38.42-.42.82-.68 1.38-.9.42-.16 1.06-.36 2.23-.41C8.42 2.21 8.8 2.2 12 2.2Zm0 1.8c-3.15 0-3.52.01-4.77.07-1.08.05-1.66.23-2.05.38-.52.2-.88.44-1.27.83-.39.39-.63.75-.83 1.27-.15.39-.33.97-.38 2.05-.06 1.25-.07 1.62-.07 4.77s.01 3.52.07 4.77c.05 1.08.23 1.66.38 2.05.2.52.44.88.83 1.27.39.39.75.63 1.27.83.39.15.97.33 2.05.38 1.25.06 1.62.07 4.77.07s3.52-.01 4.77-.07c1.08-.05 1.66-.23 2.05-.38.52-.2.88-.44 1.27-.83.39-.39.63-.75.83-1.27.15-.39.33-.97.38-2.05.06-1.25.07-1.62.07-4.77s-.01-3.52-.07-4.77c-.05-1.08-.23-1.66-.38-2.05-.2-.52-.44-.88-.83-1.27a3.4 3.4 0 0 0-1.27-.83c-.39-.15-.97-.33-2.05-.38-1.25-.06-1.62-.07-4.77-.07Zm0 3.06a4.94 4.94 0 1 1 0 9.88 4.94 4.94 0 0 1 0-9.88Zm0 1.8a3.14 3.14 0 1 0 0 6.28 3.14 3.14 0 0 0 0-6.28Zm5.15-3.11a1.15 1.15 0 1 1 0 2.3 1.15 1.15 0 0 1 0-2.3Z" />
                </svg>
                {instagram}
              </motion.a>

              {/* WhatsApp */}
              <motion.a
                href={phoneLink}
                target="_blank"
                rel="noreferrer"
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                className={chip}
              >
                <svg viewBox="0 0 24 24" className={glyph} aria-hidden>
                  <path d="M12.04 2a9.9 9.9 0 0 0-8.53 14.9L2 22l5.25-1.47A9.9 9.9 0 1 0 12.04 2Zm0 1.67a8.23 8.23 0 1 1-4.2 15.3l-.3-.18-3.12.87.84-3.04-.2-.31a8.23 8.23 0 0 1 6.98-12.64Zm-3.3 3.83c-.2 0-.52.07-.79.37-.27.3-1.04 1.01-1.04 2.46 0 1.45 1.06 2.85 1.21 3.05.15.2 2.09 3.18 5.06 4.46.7.3 1.25.48 1.68.62.7.22 1.35.19 1.85.11.57-.08 1.74-.71 1.99-1.4.24-.68.24-1.27.17-1.4-.07-.12-.27-.2-.57-.34-.3-.15-1.74-.86-2.01-.96-.27-.1-.47-.15-.66.15-.2.3-.76.95-.93 1.15-.17.2-.34.22-.64.07a8.1 8.1 0 0 1-2.39-1.47 8.9 8.9 0 0 1-1.65-2.05c-.17-.3-.02-.46.13-.6.13-.14.3-.35.44-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.65-1.6-.92-2.19-.24-.51-.48-.53-.66-.54l-.55-.01Z" />
                </svg>
                {phone}
              </motion.a>
            </div>
          </Reveal>

          {/* Query panel — reaches the Sensei on WhatsApp */}
          <QueryForm />
        </div>

        {/* Bottom bar */}
        <div className="mt-24 flex flex-col items-center justify-between gap-8 border-t border-line pt-10 md:flex-row">
          <a href="#top" className="font-display text-3xl text-fg">
            {site.wordmark}
            <span className="text-accent">.</span>
          </a>

          <ul className="flex flex-wrap items-center gap-8">
            {socials.map((s) => (
              <li key={s.label}>
                <a
                  href={s.href}
                  target="_blank"
                  rel="noreferrer"
                  className="group relative text-sm text-muted transition-colors hover:text-fg"
                >
                  {s.label}
                  <span className="absolute -bottom-1 left-0 h-px w-0 bg-accent transition-all duration-300 group-hover:w-full" />
                </a>
              </li>
            ))}
          </ul>

          <p className="text-xs text-muted">
            © {site.name}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
