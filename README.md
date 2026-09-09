# Eliyas Mulla — Developer Portfolio

A cinematic, monochrome developer portfolio built with **Next.js 16**, **TypeScript**, **Tailwind CSS v4**, **GSAP**, **Three.js**, and **Framer Motion**.

Inspired by the reference design of [arif-hasan.vercel.app](https://arif-hasan.vercel.app/) — adapted with original identity and content.

---

## 🚀 Quick Start (Local Development)

```bash
# 1. Install dependencies
npm install

# 2. Run dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

```bash
# Production build (type-check + bundle)
npm run build
npm run start
```

---

## 📁 Project Structure

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

## ✏️ Updating Content

**All portfolio content is typed and centralized in:**  
**`src/data/portfolioData.ts`**

### Update Profile Info

```ts
owner: {
  name: "Eliyas Mulla",
  email: "eliyasmulla79@gmail.com",
  github: "https://github.com/EliyasXCode",
  linkedin: "https://linkedin.com/in/eliyas-mulla-4a8449257/",
  // ...
}
```

### Add a New Project

Add a new entry to the `projects` array:

```ts
{
  id: "my-new-project",          // used as URL slug: /projects/my-new-project
  number: "05",
  title: "My New Project",
  subtitle: "A short subtitle",
  category: "Next.js + TypeScript",
  technologies: ["Next.js", "TypeScript", "PostgreSQL"],
  description: "What the project does...",
  highlights: [
    "Key feature one",
    "Key feature two",
  ],
  githubUrl: "https://github.com/EliyasXCode/my-repo",
  liveDemoUrl: "https://my-project.vercel.app",
  accentColor: "#8b5cf6",       // any CSS color for the glow/accent
  date: "2026",
}
```

> **That's it.** The project list, hover previews, and detail pages update automatically.

### Hide Unavailable Links

Set `githubUrl` or `liveDemoUrl` to `""` or `null` — the buttons won't render.

### Add a Certificate

Add to the `achievements` array in `portfolioData.ts`:

```ts
{
  id: "my-cert",
  number: "06",
  title: "My Certificate Title",
  issuer: "Issuing Organization",
  date: "Month Year",
  category: "Certifications",   // "Certifications" | "Academic" | "AI & Development"
  description: "What this certifies...",
}
```

---

## 🖼️ Adding Assets

### Project Screenshots

Place images in `public/projects/` and reference them in `portfolioData.ts`:

```ts
screenshot: "/projects/my-project.png",
```

*(Add `screenshot?: string | null` to the `ProjectItem` interface if needed.)*

### Certificate Images / PDFs

Place in `public/certificates/` and add a `file` field to the achievement entry.

### Resume PDF

1. Place your resume at `public/resume.pdf`
2. The download link in the About page contact section will automatically serve it

### Replacing the Hero 3D Visual

Edit `src/components/Centerpiece3D.tsx`. The visual is a Three.js scene — you can:
- Adjust geometry shapes (`IcosahedronGeometry`, `OctahedronGeometry`)
- Change colors in `lineMatOuter.color` / `lineMatInner.color`
- Add new meshes or particles

---

## 🚀 Deploying to Vercel

### One-Click Deploy

1. Push your project to a GitHub repository
2. Go to [vercel.com/new](https://vercel.com/new)
3. Import your repository
4. Framework: **Next.js** (auto-detected)
5. Click **Deploy**

### Manual CLI Deploy

```bash
npm install -g vercel
vercel login
vercel --prod
```

### Environment Variables

No environment variables are required for the default setup. If you add a contact form backend (e.g., Resend, EmailJS), add your API keys in the Vercel dashboard under **Settings → Environment Variables**.

---

## 📐 Design System

| Token | Value |
|---|---|
| Background | `#000000` |
| Text primary | `#ffffff` |
| Text secondary | `#a1a1aa` (zinc-400) |
| Accent blue | `#3b82f6` |
| Accent emerald | `#10b981` |
| Button cream | `#ece7df` |
| Font (display) | Geist Sans (bold/black) |
| Font (mono) | Geist Mono |

---

## 🛡️ Accessibility

- Semantic HTML headings (`h1` → `h2` → `h3`)
- ARIA labels on icon-only controls
- Keyboard navigation: Tab, Enter, Escape, Arrow keys in lightbox
- `prefers-reduced-motion` respected — all GSAP/Three.js animations disabled
- Visible focus rings on interactive elements
- Color contrast meets WCAG AA for primary text

---

## 📋 Missing Content (Add When Ready)

- [ ] **Live Demo URLs** for each project — add to `liveDemoUrl` in `portfolioData.ts`
- [ ] **GitHub repo URLs** for each project — add to `githubUrl`
- [ ] **Project screenshots** — drop PNGs in `public/projects/` and add `screenshot` field
- [ ] **Certificate images/PDFs** — drop files in `public/certificates/`
- [ ] **Certificate verification links** — add a `verifyUrl` field to achievement entries
- [ ] **Resume PDF** — place at `public/resume.pdf`
- [ ] **Profile photo** (optional) — add to About page for personal branding
- [ ] **Final domain URL** — update `metadataBase` in `app/layout.tsx` for OG tags

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
