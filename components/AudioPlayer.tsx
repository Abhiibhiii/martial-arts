"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

const TARGET = 0.28; // playback volume
const EDGE = 5; // seconds of fade at the loop start/end (seamless loop)
const EASE = 0.05; // volume smoothing per frame

/**
 * Cinematic background score.
 * Browsers forbid audio-with-sound autoplay, so we AUTOPLAY MUTED on load and
 * then unmute + fade in on the visitor's first interaction (mouse move, scroll,
 * tap, key — not just the toggle). A rAF loop keeps the volume smoothly fading
 * in/out at the loop seams and when muted/unmuted.
 */
export default function AudioPlayer() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const soundOn = useRef(true); // user intent
  const unmuted = useRef(false); // has audio been unmuted at least once
  const [on, setOn] = useState(true);
  const [audible, setAudible] = useState(false);

  useEffect(() => {
    const a = audioRef.current;
    if (!a) return;
    a.muted = true;
    a.volume = 0;
    a.play().catch(() => {}); // muted autoplay is allowed everywhere

    let raf = 0;
    const loop = () => {
      const el = audioRef.current;
      if (el && !el.paused) {
        let desired = 0;
        if (soundOn.current && unmuted.current) {
          const ct = el.currentTime;
          const d = el.duration || 600;
          const edge = Math.max(0, Math.min(1, Math.min(ct, d - ct) / EDGE));
          desired = TARGET * edge;
        }
        if (el.muted && desired > 0) el.muted = false;
        const next = el.volume + (desired - el.volume) * EASE;
        el.volume = Math.max(0, Math.min(1, next));
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    const events = [
      "pointerdown",
      "touchstart",
      "keydown",
      "click",
      "wheel",
      "scroll",
      "mousemove",
    ];
    const onGesture = () => {
      if (!soundOn.current) return;
      unmuted.current = true;
      setAudible(true);
      const el = audioRef.current;
      if (el) {
        el.muted = false;
        if (el.paused) el.play().catch(() => {});
      }
      remove();
    };
    const remove = () =>
      events.forEach((e) => window.removeEventListener(e, onGesture));
    events.forEach((e) =>
      window.addEventListener(e, onGesture, { passive: true })
    );

    return () => {
      cancelAnimationFrame(raf);
      remove();
    };
  }, []);

  const toggle = () => {
    const next = !soundOn.current;
    soundOn.current = next;
    setOn(next);
    const el = audioRef.current;
    if (!el) return;
    if (next) {
      unmuted.current = true;
      setAudible(true);
      el.muted = false;
      if (el.paused) el.play().catch(() => {});
    } else {
      // Hard stop: volume fades are ignored on iOS (volume is read-only
      // there), so mute + pause — reliable on every device.
      el.muted = true;
      el.pause();
      setAudible(false);
    }
  };

  const active = on && audible;

  return (
    <>
      <audio ref={audioRef} src="/media/audio/bgm.mp3" loop preload="auto" />
      <button
        onClick={toggle}
        aria-label={on ? "Mute music" : "Play music"}
        title={on ? "Mute music" : "Play music"}
        className="fixed bottom-6 right-6 z-50 flex h-12 w-12 items-center justify-center rounded-full border border-line bg-black/50 backdrop-blur-md transition-colors hover:border-accent"
      >
        <span className="flex h-4 items-end gap-[3px]">
          {[0, 1, 2].map((i) => (
            <motion.span
              key={i}
              className={`w-[3px] rounded-full ${active ? "bg-accent" : "bg-muted"}`}
              animate={
                active
                  ? { height: [4, 15, 7, 16, 4] }
                  : { height: 5, opacity: 0.5 }
              }
              transition={
                active
                  ? {
                      duration: 1.1,
                      repeat: Infinity,
                      delay: i * 0.15,
                      ease: "easeInOut",
                    }
                  : { duration: 0.2 }
              }
            />
          ))}
        </span>
      </button>
    </>
  );
}
