# Deploying TRISHULAM (free hosting)

The site is a **fully static** export — no server needed. Every time you change
something, rebuild first:

```bash
cd martial-arts
npm run build        # regenerates the ./out folder
```

Then deploy with any option below. All three are free.

---

## Option A — Vercel (easiest, recommended for Next.js)

```bash
npm i -g vercel
cd martial-arts
vercel               # first run: log in + answer the prompts, it auto-detects Next.js
vercel --prod        # publish to your live URL
```

You get a URL like `https://trishulam.vercel.app`. Custom domains are free to add
in the Vercel dashboard.

---

## Option B — Firebase Hosting

`firebase.json` is already set up (it serves the `out/` folder).

```bash
npm i -g firebase-tools
firebase login                       # opens your browser to sign in
firebase projects:create trishulam   # or create one at console.firebase.google.com
firebase use trishulam               # select your project
cd martial-arts
npm run build
firebase deploy                      # publishes ./out
```

You get a URL like `https://trishulam.web.app`.

---

## Option C — Netlify

```bash
npm i -g netlify-cli
cd martial-arts
npm run build
netlify deploy --dir=out --prod      # first run: log in + create a site
```

---

## Notes
- Re-run `npm run build` before every deploy so the latest changes ship.
- To add your own domain (e.g. `trishulam.in`), do it in the host's dashboard —
  all three offer free HTTPS custom domains.
- Total site size is ~8 MB (mostly the videos + emblem), which loads fast.
