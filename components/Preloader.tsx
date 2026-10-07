"use client";

import { useEffect, useRef, useState } from "react";
import {
  animate,
  motion,
  AnimatePresence,
  useReducedMotion,
} from "framer-motion";

/**
 * THE SENSEI MATERIALIZES FROM DARKNESS — cinematic page-load overlay.
 *
 * Isolated feature: mounted once in the root layout, covers the page during
 * a real page load / refresh (never re-triggers on re-renders — a full page
 * load is the only thing that mounts it fresh). No storage, no routing
 * interference, no changes to any existing component.
 *
 * Emergence: smoke dissolve — his form coalesces out of turbulent
 * distortion (SVG displacement filter), like smoke solidifying into a body.
 * The filter interpolates in sRGB so the figure's colors stay untouched.
 *
 * Timing: choreography ~2.2s; the overlay lifts when BOTH the animation has
 * finished AND the document is ready — capped at 5s so a slow asset can
 * never trap the visitor. Honors prefers-reduced-motion with a calm fade.
 */

const CHOREOGRAPHY_MS = 2200; // full-motion version
const REDUCED_MS = 1300; // reduced-motion version
const MAX_WAIT_MS = 5000; // absolute cap — never hold the user hostage

const EASE_EMERGE = [0.22, 1, 0.36, 1] as const; // slow, commanding settle

export default function Preloader() {
  const reduced = useReducedMotion();
  const [show, setShow] = useState(true);
  const startRef = useRef<number>(0);
  const imgRef = useRef<HTMLImageElement>(null);
  const dispRef = useRef<SVGFEDisplacementMapElement>(null);

  useEffect(() => {
    startRef.current = performance.now();

    // Lock scroll while the curtain is up (restored on exit/cleanup)
    const prevOverflow = document.documentElement.style.overflow;
    document.documentElement.style.overflow = "hidden";

    const minMs = reduced ? REDUCED_MS : CHOREOGRAPHY_MS;
    let timer: number;

    const finish = () => {
      const elapsed = performance.now() - startRef.current;
      timer = window.setTimeout(
        () => setShow(false),
        Math.max(0, minMs - elapsed)
      );
    };

    // Leave when the page is genuinely ready (or at the hard cap)
    const cap = window.setTimeout(() => setShow(false), MAX_WAIT_MS);
    if (document.readyState === "complete") {
      finish();
    } else {
      window.addEventListener("load", finish, { once: true });
    }

    return () => {
      window.clearTimeout(timer);
      window.clearTimeout(cap);
      window.removeEventListener("load", finish);
      document.documentElement.style.overflow = prevOverflow;
    };
  }, [reduced]);

  // Restore scroll the moment the exit begins so the site is instantly usable
  useEffect(() => {
    if (!show) document.documentElement.style.overflow = "";
  }, [show]);

  // Smoke dissolve: collapse the displacement field so the scattered form
  // condenses into the solid figure. framer-motion can't reach SVG filter
  // attributes declaratively, so drive them with the library's animate().
  useEffect(() => {
    if (reduced) return;
    const controls = animate(1, 0, {
      delay: 0.2,
      duration: 1.6,
      ease: EASE_EMERGE,
      onUpdate: (v) => {
        dispRef.current?.setAttribute("scale", String(Math.round(220 * v)));
        const el = imgRef.current;
        if (el) el.style.opacity = String(Math.min(1, (1 - v) * 2.4));
      },
    });
    return () => controls.stop();
  }, [reduced]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key="trishulam-preloader"
          exit={{ opacity: 0, y: -24 }}
          transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
          className="fixed inset-0 z-[55] overflow-hidden"
          style={{ background: "var(--bg)" }}
          aria-hidden
        >
          {/* Displacement field for the dissolve. sRGB interpolation keeps
              the figure's colors/contrast identical to the source image. */}
          {!reduced && (
            <svg className="absolute h-0 w-0" aria-hidden>
              <filter
                id="preloader-smoke"
                x="-40%"
                y="-40%"
                width="180%"
                height="180%"
                colorInterpolationFilters="sRGB"
              >
                <feTurbulence
                  type="fractalNoise"
                  baseFrequency="0.011 0.017"
                  numOctaves="3"
                  seed="7"
                  result="noise"
                />
                <feDisplacementMap
                  ref={dispRef}
                  in="SourceGraphic"
                  in2="noise"
                  scale="220"
                  xChannelSelector="R"
                  yChannelSelector="G"
                />
              </filter>
            </svg>
          )}

          {/* Dark void with faint atmospheric depth */}
          <motion.div
            initial={{ opacity: 0.25 }}
            animate={{ opacity: 0.55 }}
            transition={{ duration: 1.8, ease: "easeOut" }}
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(ellipse 80% 60% at 50% 44%, rgba(255,122,69,0.05), transparent 70%)",
            }}
          />

          {/* Rim-light aura — warm glow rising behind the figure */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: reduced ? 0.35 : 0.5 }}
            transition={{
              delay: reduced ? 0.1 : 0.5,
              duration: 1.2,
              ease: "easeOut",
            }}
            className="absolute left-1/2 top-[42%] h-[78vmin] w-[62vmin] -translate-x-1/2 -translate-y-1/2 rounded-full"
            style={{
              background:
                "radial-gradient(ellipse 50% 60% at center, rgba(255,122,69,0.13), rgba(225,29,46,0.05) 50%, transparent 72%)",
            }}
          />

          {/* The Sensei coalesces out of the darkness */}
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.div
              initial={reduced ? { opacity: 0 } : { opacity: 1, scale: 1.02 }}
              animate={reduced ? { opacity: 1 } : { opacity: 1, scale: 1 }}
              transition={
                reduced
                  ? { duration: 0.5, ease: "easeOut" }
                  : { duration: 2.0, ease: "easeOut" }
              }
              className="-mt-[4vh] will-change-transform"
              style={{
                filter: "drop-shadow(0 0 46px rgba(255,122,69,0.22))",
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                ref={imgRef}
                src="/media/preloader-sensei-pose.webp"
                alt=""
                fetchPriority="high"
                decoding="async"
                draggable={false}
                style={
                  reduced
                    ? undefined
                    : { filter: "url(#preloader-smoke)", opacity: 0 }
                }
                className="w-[min(80vw,620px)] max-h-[52vh] select-none object-contain"
              />
            </motion.div>
          </div>

          {/* Grounding — the darkness he stands in, swallowing his feet */}
          <div
            className="absolute inset-x-0 bottom-0 h-[30vh]"
            style={{
              background: "linear-gradient(to top, var(--bg) 18%, transparent)",
            }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
