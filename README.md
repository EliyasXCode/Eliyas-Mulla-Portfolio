# Eliyas Mulla — Developer Portfolio

A cinematic, monochrome developer portfolio built with **Next.js 16**, **TypeScript**, **Tailwind CSS v4**, **GSAP**, **Three.js**, and **Framer Motion**.

Inspired by the reference design of [arif-hasan.vercel.app](https://arif-hasan.vercel.app/) — adapted with original identity and content.

---

 
```
src/
├── app/
│   ├── page.tsx                  # Homepage (/)
│   ├── about/page.tsx            # About, Skills, Education, Career, Contact
│   ├── projects/
│   │   ├── page.tsx              # Projects list with interactive preview
│   │   └── [slug]/page.tsx       # Individual project detail
│   ├── certificates/page.tsx     # Certificates / achievements gallery
│   └── achievements/page.tsx     # Legacy achievements route (keep or redirect)
├── components/
│   ├── Navbar.tsx                # Fixed top nav with mobile drawer
│   ├── Centerpiece3D.tsx         # Three.js animated hero visual (gyroscope)
│   ├── ScrambleText.tsx          # GSAP text scramble on intersection/hover
│   ├── LiquidButton.tsx          # Animated "liquid fill" CTA button (reference style)
│   ├── Hud.tsx                   # Live clock, status cycler, system telemetry
│   ├── CursorDot.tsx             # Custom cursor dot that follows pointer
│   ├── ContactModal.tsx          # Contact modal with form + direct links
│   ├── ClientChrome.tsx          # Client-side layout wrapper
│   └── SmoothScroll.tsx          # Lenis smooth scroll provider
├── data/
│   └── portfolioData.ts          # ← ALL CONTENT LIVES HERE
├── lib/
│   ├── animations.ts             # Reusable GSAP animation helpers
│   ├── gsap.ts                   # GSAP singleton
│   ├── motion.ts                 # Motion design tokens (durations, easings)
│   └── uiScale.ts                # UI scale helpers
└── utils/
    └── sound.ts                  # Optional sound utilities
```

---
 
 

## 🏗️ Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS v4 |
| Animations | GSAP 3, Framer Motion 13 |
| 3D Graphics | Three.js |
| Smooth Scroll | Lenis |
| Icons | Lucide React |
| Deployment | Vercel |
