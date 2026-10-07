"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { site } from "@/lib/site";
import { Reveal } from "./Reveal";

const WA_NUMBER = "918949924203";

const field =
  "w-full rounded-xl border border-line bg-black/40 px-4 py-3 text-sm text-fg placeholder:text-muted/70 outline-none backdrop-blur-sm transition-colors duration-300 focus:border-accent/70 focus:bg-black/60";

/**
 * Premium query panel. No backend: the query is formatted into a WhatsApp
 * message to the dojo's business number — the visitor sends it from their
 * own WhatsApp, so their number is verified and the conversation (plus the
 * dojo's auto-greeting) happens where the Sensei already works.
 */
export default function QueryForm() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [query, setQuery] = useState("");

  const ready = name.trim().length > 0 && query.trim().length > 0;

  const href = useMemo(() => {
    const lines = [
      `Namaste ${site.wordmark} 🙏`,
      "",
      `Name: ${name.trim() || "—"}`,
      `Phone: ${phone.trim() || "—"}`,
      "",
      `Query: ${query.trim()}`,
    ];
    return `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(
      lines.join("\n")
    )}`;
  }, [name, phone, query]);

  return (
    <Reveal delay={0.2}>
      <div className="mx-auto mt-16 max-w-xl rounded-2xl border border-line bg-black/30 p-6 text-left backdrop-blur-sm md:p-8">
        <div className="tracking-kicker flex items-center gap-3 text-xs uppercase text-muted">
          <span className="h-px w-8 bg-accent" />
          Have a question?
        </div>
        <p className="mt-3 text-sm text-muted">
          Drop your query — it reaches the Sensei directly on WhatsApp.
        </p>

        <form
          className="mt-6 space-y-3"
          onSubmit={(e) => {
            e.preventDefault();
            if (ready) window.open(href, "_blank", "noopener");
          }}
        >
          <div className="grid gap-3 sm:grid-cols-2">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your name"
              aria-label="Your name"
              className={field}
              maxLength={60}
            />
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Phone (optional)"
              aria-label="Phone number"
              className={field}
              maxLength={20}
            />
          </div>
          <textarea
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Your query — classes, timings, private coaching…"
            aria-label="Your query"
            rows={4}
            className={`${field} resize-none`}
            maxLength={600}
          />

          <motion.button
            type="submit"
            disabled={!ready}
            whileHover={ready ? { scale: 1.02 } : undefined}
            whileTap={ready ? { scale: 0.98 } : undefined}
            className={`group flex w-full items-center justify-center gap-2.5 rounded-xl px-6 py-3.5 text-sm font-medium transition-all duration-300 ${
              ready
                ? "glow-accent bg-accent text-white hover:bg-[#c2172a]"
                : "cursor-not-allowed border border-line bg-black/30 text-muted"
            }`}
          >
            <svg
              viewBox="0 0 24 24"
              className={`h-[18px] w-[18px] shrink-0 ${ready ? "fill-white" : "fill-muted"}`}
              aria-hidden
            >
              <path d="M12.04 2a9.9 9.9 0 0 0-8.53 14.9L2 22l5.25-1.47A9.9 9.9 0 1 0 12.04 2Zm0 1.67a8.23 8.23 0 1 1-4.2 15.3l-.3-.18-3.12.87.84-3.04-.2-.31a8.23 8.23 0 0 1 6.98-12.64Zm-3.3 3.83c-.2 0-.52.07-.79.37-.27.3-1.04 1.01-1.04 2.46 0 1.45 1.06 2.85 1.21 3.05.15.2 2.09 3.18 5.06 4.46.7.3 1.25.48 1.68.62.7.22 1.35.19 1.85.11.57-.08 1.74-.71 1.99-1.4.24-.68.24-1.27.17-1.4-.07-.12-.27-.2-.57-.34-.3-.15-1.74-.86-2.01-.96-.27-.1-.47-.15-.66.15-.2.3-.76.95-.93 1.15-.17.2-.34.22-.64.07a8.1 8.1 0 0 1-2.39-1.47 8.9 8.9 0 0 1-1.65-2.05c-.17-.3-.02-.46.13-.6.13-.14.3-.35.44-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.65-1.6-.92-2.19-.24-.51-.48-.53-.66-.54l-.55-.01Z" />
            </svg>
            Send via WhatsApp
          </motion.button>
        </form>

        <p className="mt-4 text-center text-[11px] leading-relaxed text-muted/80">
          Opens WhatsApp with your query pre-filled — hit send and you&apos;ll
          get an instant reply from {site.wordmark}.
        </p>
      </div>
    </Reveal>
  );
}
