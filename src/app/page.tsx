"use client";

import React, { useState } from "react";
import Link from "next/link";
import { PORTFOLIO_DATA } from "@/data/portfolioData";
import { Centerpiece3D } from "@/components/Centerpiece3D";
import { ScrambleText } from "@/components/ScrambleText";
import { LiquidButton } from "@/components/LiquidButton";
import { LiveStatus, CodingSince, SystemTelemetry } from "@/components/Hud";
import { ContactModal } from "@/components/ContactModal";
import { ContactSection } from "@/components/ContactSection";

export default function HomePage() {
  const [contactOpen, setContactOpen] = useState(false);

  return (
    <main className="flex flex-1 flex-col bg-black overflow-hidden relative">
      {/* ---------------- HERO SECTION ---------------- */}
      <section className="relative flex min-h-screen items-center justify-center overflow-hidden px-6 sm:px-10">
        {/* Ambient 3D Centerpiece */}
        <div
          aria-hidden="true"
          className="pointer-events-auto absolute inset-0 z-0 flex items-center justify-center"
        >
          <div className="relative aspect-square w-[90vmin] max-w-[650px] opacity-90 transition-opacity duration-700">
            <Centerpiece3D />
          </div>
        </div>

        {/* Ambient Grid Background */}
        <div className="pointer-events-none absolute inset-0 bg-hud-grid opacity-30 z-0" />
        <div className="pointer-events-none absolute inset-0 bg-radial from-transparent via-black/40 to-black z-0" />

        {/* HUD Top Left: Timezone + Status Cycler */}
        <div className="absolute left-6 top-[calc(env(safe-area-inset-top)+5.5rem)] z-10 max-w-[calc(100%-3rem)] sm:left-10 sm:top-28">
          <LiveStatus
            statusWords={PORTFOLIO_DATA.owner.hud.statusWords}
            timeZone={PORTFOLIO_DATA.owner.hud.timeZone}
            locationLabel={PORTFOLIO_DATA.owner.hud.locationLabel}
            statusBadge={PORTFOLIO_DATA.owner.hud.statusBadge}
          />
        </div>

        {/* HUD Top Right: Location & Coordinates */}
        <div className="absolute right-6 top-[calc(env(safe-area-inset-top)+5.5rem)] z-10 hidden text-right sm:right-10 sm:top-28 sm:block">
          <div className="font-mono text-[0.625rem] uppercase leading-relaxed tracking-[0.2em] text-zinc-500">
            <span className="block text-zinc-300 font-medium">
              {PORTFOLIO_DATA.owner.tagline.primary}
            </span>
            <span className="block">{PORTFOLIO_DATA.owner.tagline.secondary}</span>
          </div>
          <div className="mt-2">
            <SystemTelemetry />
          </div>
        </div>

        {/* Hero Title Left Bottom */}
        <div className="absolute bottom-28 left-6 z-10 text-left sm:bottom-12 sm:left-10 max-w-xl">
          <p className="font-mono text-xs uppercase tracking-[0.25em] text-blue-400">
            <ScrambleText>{PORTFOLIO_DATA.owner.eyebrow}</ScrambleText>
          </p>
          <h1 className="mt-3 text-5xl uppercase leading-[0.92] tracking-[0.02em] text-white sm:text-7xl lg:text-8xl font-black">
            <ScrambleText as="span" className="block">
              {PORTFOLIO_DATA.owner.firstName}
            </ScrambleText>
            <ScrambleText as="span" className="block text-zinc-300">
              {PORTFOLIO_DATA.owner.lastName}
            </ScrambleText>
          </h1>
        </div>

        {/* Hero CTA Right Bottom */}
        <div className="absolute bottom-12 left-6 z-10 sm:left-auto sm:right-10 flex flex-col sm:items-end gap-3">
          <div className="flex items-center gap-3">
            <a
              href={PORTFOLIO_DATA.owner.contact.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn Profile"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-zinc-950/80 text-blue-400 hover:text-white hover:border-blue-400 hover:bg-blue-600/20 hover:shadow-[0_0_20px_rgba(59,130,246,0.5)] transition-all"
            >
              <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
                <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.2V10.9H6.46M7.83 6.45a1.63 1.63 0 0 0-1.63 1.63c0 .9.73 1.63 1.63 1.63.9 0 1.63-.73 1.63-1.63 0-.9-.73-1.63-1.63-1.63Z" />
              </svg>
            </a>
            <a
              href={PORTFOLIO_DATA.owner.contact.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub Profile"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-zinc-950/80 text-zinc-300 hover:text-white hover:border-white/40 hover:bg-white/10 transition-all"
            >
              <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
                <path d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.1-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2Z" />
              </svg>
            </a>
            <LiquidButton onClick={() => setContactOpen(true)}>
              {PORTFOLIO_DATA.owner.ctaLabel}
            </LiquidButton>
          </div>
          <div className="hidden sm:block">
            <CodingSince year={PORTFOLIO_DATA.owner.hud.codingSinceYear} />
          </div>
        </div>

        {/* Scroll Cue Indicator */}
        <div className="pointer-events-none absolute bottom-4 left-1/2 -translate-x-1/2 z-10 hidden sm:flex flex-col items-center gap-1 opacity-60">
          <span className="font-mono text-[0.55rem] uppercase tracking-[0.25em] text-zinc-500">
            SCROLL
          </span>
          <div className="h-6 w-px bg-gradient-to-b from-blue-400 to-transparent animate-pulse" />
        </div>
      </section>

      {/* ---------------- SECTION 2: INTRO BRIEF ---------------- */}
      <section className="relative z-10 border-t border-white/10 bg-black/90 px-6 py-24 sm:px-10">
        <div className="mx-auto max-w-6xl">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 items-start">
            {/* Left Column: Number & Eyebrow */}
            <div className="lg:col-span-4">
              <span className="font-mono text-xs uppercase tracking-[0.3em] text-blue-400 block mb-2">
                // 01 — Mission & Profile
              </span>
              <h2 className="text-3xl sm:text-4xl uppercase font-bold tracking-tight text-white font-mono">
                Full-Stack & AI Systems
              </h2>
              <div className="mt-4 flex items-center gap-3">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                <span className="font-mono text-xs uppercase tracking-[0.15em] text-zinc-400">
                  Bharati Vidyapeeth University · CGPA 9.0
                </span>
              </div>
            </div>

            {/* Right Column: Narrative & Fast Links */}
            <div className="lg:col-span-8 flex flex-col gap-8">
              <p className="text-lg sm:text-xl text-zinc-300 font-light leading-relaxed">
                {PORTFOLIO_DATA.owner.summary}
              </p>

              {/* Skills Quick Matrix */}
              <div className="flex flex-wrap gap-2 pt-2">
                {PORTFOLIO_DATA.skills.languages
                  .concat(PORTFOLIO_DATA.skills.frontend.slice(0, 3))
                  .concat(PORTFOLIO_DATA.skills.aiGenAi.slice(0, 2))
                  .map((skill) => (
                    <span
                      key={skill}
                      className="px-3 py-1.5 rounded-lg border border-white/10 bg-white/[0.03] font-mono text-[0.6875rem] uppercase tracking-[0.15em] text-zinc-300 hover:border-blue-400/40 hover:text-white transition-colors"
                    >
                      {skill}
                    </span>
                  ))}
              </div>

              {/* Action Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
                <Link
                  href="/projects"
                  className="group p-5 rounded-2xl border border-white/10 bg-white/[0.02] hover:border-blue-500/40 hover:bg-white/[0.05] transition-all"
                >
                  <span className="font-mono text-xs text-zinc-500 block">01 / WORK</span>
                  <h3 className="text-lg font-semibold text-white mt-1 group-hover:text-blue-400 transition-colors">
                    Explore Projects →
                  </h3>
                  <p className="text-xs text-zinc-400 mt-2">
                    MERN, Gemini AI, Next.js & Python apps.
                  </p>
                </Link>

                <Link
                  href="/about#career"
                  className="group p-5 rounded-2xl border border-white/10 bg-white/[0.02] hover:border-blue-500/40 hover:bg-white/[0.05] transition-all"
                >
                  <span className="font-mono text-xs text-zinc-500 block">02 / CAREER</span>
                  <h3 className="text-lg font-semibold text-white mt-1 group-hover:text-blue-400 transition-colors">
                    View Career Timeline →
                  </h3>
                  <p className="text-xs text-zinc-400 mt-2">
                    Labmentix internship & development journey.
                  </p>
                </Link>

                <Link
                  href="/certificates"
                  className="group p-5 rounded-2xl border border-white/10 bg-white/[0.02] hover:border-blue-500/40 hover:bg-white/[0.05] transition-all"
                >
                  <span className="font-mono text-xs text-zinc-500 block">03 / CREDENTIALS</span>
                  <h3 className="text-lg font-semibold text-white mt-1 group-hover:text-blue-400 transition-colors">
                    Achievements & Certs →
                  </h3>
                  <p className="text-xs text-zinc-400 mt-2">
                    Anthropic, IBM, and UX/UI credentials.
                  </p>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ---------------- GRAND CONTACT SECTION (Image 1) ---------------- */}
      <ContactSection />

      {/* Contact Modal Trigger */}
      <ContactModal isOpen={contactOpen} onClose={() => setContactOpen(false)} />
    </main>
  );
}
