# 📸 YOUR MEDIA GOES HERE

The site works right now with built-in placeholders. To make it *yours*,
drop your files into the folders below using these **exact filenames**.
No code changes needed — the site picks them up automatically.

```
public/media/
├── hero/
│   ├── hero.mp4          ← Fullscreen background video for the opening screen
│   └── hero-poster.jpg   ← A still frame shown before the video loads / on mobile
│
├── reel/
│   ├── reel.mp4          ← Your highlight reel (plays in the "Reel" section)
│   └── reel-poster.jpg   ← Thumbnail for the reel
│
└── gallery/
    ├── 01.jpg            ← Gallery photos (captions are set in /lib/site.ts)
    ├── 02.jpg
    ├── 03.jpg
    ├── 04.jpg
    ├── 05.jpg
    └── 06.jpg
```

## Tips for "Apple-level" quality
- **Hero video:** 1920×1080 (or 4K), 10–20s loop, muted, H.264 .mp4. Keep it
  under ~10 MB if you can (compress at handbrake.fr or with `ffmpeg`).
- **Photos:** landscape, high-res JPGs. Dark / dramatic lighting suits the theme.
- **Reel:** any length. It's click-to-play so file size matters less.
- Want more/fewer gallery photos? Edit the `gallery.items` list in
  `/lib/site.ts` and add matching `07.jpg`, `08.jpg`, … files here.

You can also just hand the files to me and I'll place + optimize them for you.
