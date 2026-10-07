/**
 * ============================================================
 *  SITE CONFIG  —  EDIT THIS ONE FILE TO CHANGE ALL CONTENT
 * ============================================================
 *  Everything the visitor reads (name, taglines, section copy,
 *  gallery captions, stats, contact links) lives here.
 *  Media files (photos/videos) go in /public/media  —  see the
 *  README in that folder for the exact filenames to use.
 *
 *  >>> The values below are PLACEHOLDERS. Replace them. <<<
 */

export const site = {
  /** Dojo / brand name. Shown huge in the hero. */
  name: "TRISHULAM",
  /** Small word mark shown in the navbar. */
  wordmark: "TRISHULAM",
  /** The founder / head instructor — introduced in the hero + intro section. */
  sensei: "Sensei Abhijeet Sharma",
  /** One-line discipline label (kept for SEO; not shown in the hero). */
  discipline: "Traditional Karate & Kobudō",
  /** The hero tagline — the single most important line on the site. */
  heroTagline: "Strike first. Strike hard. No mercy.",
  /** Short location / affiliation shown under the hero. */
  base: "India",

  /** Brand logo (the trishul emblem) — compressed WebP. */
  logo: "/media/logo.webp",
  /** Full-screen hero background photo. */
  heroImage: "/media/photos/p02.jpg",
  /** Faint graded photos behind text sections. */
  manifestoBg: "/media/photos/p12.jpg",
  philosophyBg: "/media/photos/p06.jpg",

  /** MOTION — the stunt-video section. Clips are graded dark and their
   *  edges feathered into black, then ignite to full colour on hover.
   *  Files live in /public/media/videos (see that folder). */
  motion: {
    kicker: "Stunts",
    /** Each clip carries an elemental title + traditional line, revealed
     *  as it scrolls into view. */
    clips: [
      {
        file: "v1",
        title: "Sun's Energy",
        quote: "Draw your power from the rising sun.",
      },
      {
        file: "v4",
        title: "Water's Flow",
        quote: "Be like water — formless, ceaseless, unbroken.",
      },
    ],
  },

  /** INTRODUCTION — the sword round-swing clip runs full-screen while the
   *  Sensei's name blends in on scroll. The cinematic reveal. */
  intro: {
    kicker: "The Sensei",
    name: "Sensei Abhijeet Sharma",
    line: "Where others see limits, he trains past them — the mind, the blade, and the will, mastered as one.",
    clip: "v5",
  },

  /** THE SHOWCASE — the signature scroll section. Three action photos
   *  cross-fade as you scroll, each carrying one line of the motto. */
  showcase: [
    { word: "Strike First", img: "/media/photos/p09.jpg", note: "The first blow decides the fight." },
    { word: "Strike Hard", img: "/media/photos/p10.jpg", note: "Commit everything. Hold nothing back." },
    { word: "No Mercy", img: "/media/photos/p11.jpg", note: "Finish what you begin." },
  ],

  /** Canonical production URL (the custom domain). */
  url: "https://trishulammartialarts.in",

  /** Browser tab title + SEO description. */
  meta: {
    title: "TRISHULAM — Martial Arts Dojo | Sensei Abhijeet Sharma",
    description:
      "TRISHULAM Martial Arts — traditional karate and kobudō dojo led by Sensei Abhijeet Sharma, 1st Dan Black Belt and 2× National Gold Medalist. Strike first. Strike hard. No mercy. Training, coaching and collaborations across India.",
    keywords: [
      "Trishulam",
      "Trishulam Martial Arts",
      "martial arts dojo India",
      "karate training India",
      "kobudō",
      "Abhijeet Sharma karate",
      "Sensei Abhijeet Sharma",
      "karate classes",
      "martial arts coaching",
      "self defence training India",
    ],
  },

  /** Navbar links (they smooth-scroll to section ids on the page). */
  nav: [
    { label: "The Art", href: "#art" },
    { label: "Motto", href: "#showcase" },
    { label: "Gallery", href: "#gallery" },
    { label: "Sensei", href: "#intro" },
    { label: "Journey", href: "#journey" },
    { label: "Contact", href: "#contact" },
  ],

  /** MANIFESTO — the big cinematic statement after the hero.
   *  Each string is revealed word-by-word on scroll. */
  manifesto:
    "Every strike is a decision. Every scar, a lesson. This is not a sport — it is a way of moving through the world.",

  /** THE ART — 3 pillars describing your practice. */
  art: {
    heading: "The Art",
    intro:
      "Three disciplines, one pursuit. Precision of the body, stillness of the mind, and the will to endure.",
    pillars: [
      {
        no: "01",
        title: "Precision",
        body: "Years refining a single movement until it becomes instinct. Nothing wasted, nothing forced.",
      },
      {
        no: "02",
        title: "Power",
        body: "Force is not violence. It is control — the ability to unleash everything, and to hold it back.",
      },
      {
        no: "03",
        title: "Presence",
        body: "The fight is won before it begins. Calm under pressure is the sharpest weapon of all.",
      },
    ],
  },

  /** GALLERY — captions for each photo. The images themselves are
   *  /public/media/gallery/01.jpg ... 06.jpg (any 16:9-ish crop).
   *  Add or remove entries here and drop matching files. */
  gallery: {
    heading: "In Motion",
    items: [
      { file: "p01", caption: "The guard" },
      { file: "p03", caption: "Yoko-geri — the side kick" },
      { file: "p04", caption: "Nunchaku" },
      { file: "p08", caption: "The turn" },
      { file: "p13", caption: "Drawing the blade" },
      { file: "p05", caption: "Focus" },
      { file: "p06", caption: "Stillness" },
      { file: "p12", caption: "Bokken, overhead" },
    ],
  },

  /** REEL — the fullscreen highlight video section.
   *  Video: /public/media/reel/reel.mp4  (poster falls back to gallery). */
  reel: {
    kicker: "Highlight Reel",
    heading: "Watch the work.",
    sub: "Two minutes of everything the words can't say.",
  },

  /** JOURNEY — your timeline / achievements. Add as many as you like. */
  journey: {
    heading: "The Journey",
    milestones: [
      { year: "2018", title: "First dojo", body: "Where the obsession began." },
      { year: "2021", title: "Brown belt", body: "Years of forms, sweat, and repetition." },
      { year: "2025", title: "1st Dan Black Belt", body: "Certified. Still a student." },
      { year: "2026", title: "TRISHULAM", body: "Carrying the way forward." },
    ],
    /** Big numbers strip. */
    stats: [
      { value: "2018", label: "Training since" },
      { value: "8+", label: "Years of practice" },
      { value: "1st", label: "Dan black belt" },
      { value: "20+", label: "Championships won" },
      { value: "CSE", label: "Engineering graduate" },
      { value: "SUO", label: "Senior Under Officer · NCC" },
      { value: "2×", label: "National gold medalist" },
      { value: "11+", label: "Super gold medals" },
    ],
  },

  /** PHILOSOPHY — full-bleed quote near the end. */
  philosophy: {
    quote:
      "The ultimate aim of the art is not victory, but the perfection of the character of its participant.",
    author: "— Gichin Funakoshi",
  },

  /** CONTACT / CTA + footer links. */
  contact: {
    heading: "Choose a life less ordinary.",
    sub: "Train with the best.",
    phone: "+91 89499 24203",
    phoneLink: "https://wa.me/918949924203",
    instagram: "@trishulam.martialarts",
    instagramLink: "https://instagram.com/trishulam.martialarts",
    email: "contact@trishulammartialarts.in",
    emailLink: "mailto:contact@trishulammartialarts.in",
    socials: [
      { label: "Instagram", href: "https://instagram.com/trishulam.martialarts" },
      { label: "WhatsApp", href: "https://wa.me/918949924203" },
      { label: "Email", href: "mailto:contact@trishulammartialarts.in" },
    ],
  },
} as const;

export type Site = typeof site;
