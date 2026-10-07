"use client";

import { useEffect, useRef, useState } from "react";

/**
 * An image "frame" that gracefully shows a styled cinematic placeholder
 * until the real file exists in /public/media. As soon as you drop the
 * real .jpg in, it appears — no code change needed.
 *
 * The fallback is a pure CSS element (no second image load), so a missing
 * file can never cause a re-load loop.
 */
export default function Frame({
  src,
  alt,
  label = "01",
  tint = false,
  className = "",
  priority = false,
}: {
  src: string;
  alt: string;
  label?: string;
  tint?: boolean;
  className?: string;
  priority?: boolean;
}) {
  const [failed, setFailed] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  // If the image already failed before React hydrated (SSR), the onError
  // event was missed — detect it on mount via complete + naturalWidth === 0.
  useEffect(() => {
    const img = imgRef.current;
    if (img && img.complete && img.naturalWidth === 0) setFailed(true);
  }, []);

  if (failed) {
    return (
      <div
        role="img"
        aria-label={alt}
        className={`relative flex h-full w-full items-center justify-center overflow-hidden ${
          tint
            ? "bg-gradient-to-br from-[#191013] to-[#070708]"
            : "bg-gradient-to-br from-[#121216] to-[#070708]"
        } ${className}`}
      >
        <div className="pointer-events-none absolute right-[-10%] top-[-30%] h-2/3 w-2/3 rounded-full bg-accent/5 blur-3xl" />
        <span className="font-display text-7xl text-white/[0.05] md:text-8xl">
          {label}
        </span>
        <span className="tracking-kicker absolute bottom-5 left-5 text-[10px] uppercase text-white/25">
          Add your photo
        </span>
      </div>
    );
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      ref={imgRef}
      src={src}
      alt={alt}
      onError={() => setFailed(true)}
      loading={priority ? "eager" : "lazy"}
      decoding="async"
      className={`h-full w-full object-cover ${className}`}
      draggable={false}
    />
  );
}
