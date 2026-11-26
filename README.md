# MEPZ Run — website redesign

Redesign of [mepzrun.in](https://mepzrun.in/) (Home + Terms & Conditions) as a static React site.
All copy, prize figures, images, links, the registration link, the Google Map and the Zoho contact form are carried over unchanged from the live WordPress site; only presentation, layout and motion are new.

## Stack

- Vite 8 + React 19 + TypeScript + Tailwind CSS 4
- Fonts: Archivo (variable width, display) and Inter (body), self-hosted via Fontsource
- Motion components from React Bits, Magic UI, Aceternity UI, Motion, Animate UI and Motion Primitives, installed with the Motion Studio MCP workflow (plan and report in [.motion-studio/](.motion-studio/))

## Develop

```bash
npm install
npm run dev       # http://localhost:5173
npm run build     # outputs dist/
npm run preview   # serve the production build
```

`dist/` is a plain static site with two entry pages, so it can be deployed to any static host with no rewrites:

- `dist/index.html` → `/`
- `dist/terms-conditions/index.html` → `/terms-conditions/`
- `dist/home2/index.html` → `/home2/` — the same home page in the all-dark tone (marked `noindex`)

## Where things live

| What | Where |
| --- | --- |
| All site copy, prize table, links, image lists | [src/content/site.ts](src/content/site.ts) |
| Terms & Conditions text (sanitised from the live page) | [src/content/terms.html](src/content/terms.html) |
| Home sections | [src/components/sections/](src/components/sections/) |
| Brand tokens (colours, fonts, utilities) | [src/index.css](src/index.css) |
| Library components (owned copies, some locally extended) | [src/components/ui/](src/components/ui/), [src/components/SplitText.tsx](src/components/SplitText.tsx), [src/components/GradientText.tsx](src/components/GradientText.tsx) |
| Images (copied from the live site) | [public/images/](public/images/) |
| Hero runner + scroll film (AI-generated with Higgsfield, encoded for scrubbing) | [public/media/](public/media/) |
| Hero / scroll film / statement sections | [Hero.tsx](src/components/sections/Hero.tsx), [RunFilm.tsx](src/components/sections/RunFilm.tsx), [Statement.tsx](src/components/sections/Statement.tsx) |

## Notes

- Two home tones share one set of components: `/` alternates dark and white chapters, `/home2/` keeps every chapter dark. Sections read the tone from [src/theme.tsx](src/theme.tsx) (`useTone().t(light, dark)`).

- Motion respects the OS "reduce motion" setting (`MotionConfig reducedMotion="user"`, paused CSS loops, static sponsor grid).
- The running film after the hero is scrubbed by scroll. `run-film.mp4` (1280×720, 15.6 s, 7.2 MB) and `run-film-mobile.mp4` (960×540, 3.4 MB) — solo runner (0–7.5 s) stitched to a marathon-crowd clip that starts from the exact 7.5 s frame — are H.264 with a keyframe every 8 / 4 frames so seeking stays cheap; re-encode any replacement the same way (`-g 8 -keyint_min 8 -sc_threshold 0 -movflags +faststart`, no audio). The film is only attached when the section is near the viewport and never loads under reduced motion.
- The Register Now buttons still point to `https://reg.myraceindia.com/MRTS/mepzrun2024`, exactly as on the live site.
