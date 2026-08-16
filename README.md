# Karpanai Foundation — Website

A static, playful "sketchbook" themed website for Karpanai Foundation, built with plain HTML, CSS and jQuery. No build tools or frameworks required — ready to deploy straight to GitHub Pages.

## What's inside

```
karpanai/
├── index.html          Home
├── our-story.html       Our Story / About
├── what-we-do.html      Programmes
├── impact.html          Impact & stats
├── stories.html         Stories from the Studio (+ drawing canvas)
├── get-involved.html    Partner / Volunteer / Facilitate / Support
├── donate.html          Donate
├── contact.html         Contact form
├── css/style.css        Full design system (colours, type, components)
├── js/main.js           All jQuery interactions
└── assets/logo.jpg      Karpanai logo
```

## Design notes

- **Palette:** Deep Ink Blue `#172B4D`, Karpanai Yellow `#F4C542`, Warm Paper `#FFFDF5`, Charcoal `#171717`, with a muted coral `#E8734A` used sparingly for artwork and interactive accents — drawn from the existing Karpanai logo and brand.
- **Type:** *Fredoka* for headings, *Caveat* (handwritten) for playful annotations/eyebrows, *Inter* for body copy.
- **Signature elements:** hand-drawn doodle underlines that draw themselves in on scroll, tilted "sketchbook" cards, a hand-drawn subject picker on the homepage, a flip-card "Method" explainer, and a freehand drawing canvas on the Stories page ("What would you create if you could change one thing?").
- All interactivity (mobile nav, scroll reveals, animated counters, subject picker, flip cards, story filters, copy-to-clipboard, canvas drawing, contact form) is written in `js/main.js` using jQuery — no build step needed.

## Deploying to GitHub Pages

1. Create a new GitHub repository (e.g. `karpanai-website`).
2. Push the contents of this folder to the `main` branch:
   ```bash
   git init
   git add .
   git commit -m "Karpanai Foundation website"
   git branch -M main
   git remote add origin https://github.com/<your-username>/<repo-name>.git
   git push -u origin main
   ```
3. In the repo, go to **Settings → Pages**.
4. Under **Build and deployment → Source**, choose **Deploy from a branch**.
5. Under **Branch**, choose `main` and folder `/ (root)`, then **Save**.
6. Your site will be live at `https://<your-username>.github.io/<repo-name>/` within a minute or two.

No further configuration is needed — every link in the site is a relative path (`index.html`, `css/style.css`, etc.), so it works the same locally, on Pages, or on any static host.

## Things to fill in before launch

- `donate.html` — real UPI ID, bank account details, IFSC, and a donation QR code image (currently placeholders).
- `contact.html` — the form currently shows a friendly success message on submit but does not send anywhere. Wire it to Google Forms, Formspree, Netlify Forms, or your backend of choice by updating the `<form>` action in `partials` logic / `contact.html` and the submit handler in `js/main.js`.
- Swap in real photography/artwork where the SVG doodles are used as placeholders, if you'd like a more photographic feel.
- `assets/logo.jpg` — replace with a transparent PNG/SVG version of the logo if available, for cleaner rendering on colored backgrounds.

## Local preview

Because the interactions use `fetch`-free, plain relative paths, you can just double-click `index.html` — or, for the best experience (and to avoid any browser file:// quirks), serve it locally:

```bash
python3 -m http.server 8000
```

Then visit `http://localhost:8000`.
