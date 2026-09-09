"use client";

import React, { useState } from "react";
import Link from "next/link";
import { PORTFOLIO_DATA } from "@/data/portfolioData";
import { ScrambleText } from "@/components/ScrambleText";
import { LiquidButton } from "@/components/LiquidButton";
import { ContactModal } from "@/components/ContactModal";

export default function ProjectsPage() {
  const [activeIdx, setActiveIdx] = useState(0);
  const [contactOpen, setContactOpen] = useState(false);
  const projects = PORTFOLIO_DATA.projects;
  const activeProject = projects[activeIdx] || projects[0];

  return (
    <main className="flex flex-1 flex-col bg-black min-h-screen pt-28 pb-20 px-6 sm:px-10 text-white overflow-hidden">
      {/* Header telemetry */}
      <div className="mx-auto w-full max-w-7xl mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-6">
        <div>
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-blue-400">
            <ScrambleText>// Featured Deployments &amp; Production Systems</ScrambleText>
          </p>
          <h1 className="text-3xl sm:text-5xl font-black uppercase tracking-tight mt-1 font-mono">
            Engineered Works
          </h1>
        </div>
        <div className="flex items-center gap-4 font-mono text-xs uppercase tracking-[0.2em] text-zinc-500">
          <span className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-zinc-300">
              {projects.filter((p) => p.liveDemoUrl && p.liveDemoUrl.includes("vercel.app")).length} LIVE ON VERCEL
            </span>
          </span>
          <span className="text-zinc-600">|</span>
          <span>INDEX: {projects.length < 10 ? `0${projects.length}` : projects.length} SYSTEMS</span>
        </div>
      </div>

      {/* ---------------- DESKTOP MARQUEE + CIRCUIT STAGE ---------------- */}
      <div className="mx-auto w-full max-w-7xl hidden lg:grid lg:grid-cols-[1.1fr_1.5fr] gap-12 items-start min-h-[72vh]">
        {/* Left Column: Marquee Index */}
        <div className="flex flex-col gap-4 py-4 pr-4">
          {projects.map((proj, idx) => {
            const isActive = idx === activeIdx;
            const isLive = proj.liveDemoUrl && proj.liveDemoUrl.includes("vercel.app");
            return (
              <button
                key={proj.id}
                type="button"
                onClick={() => setActiveIdx(idx)}
                onMouseEnter={() => setActiveIdx(idx)}
                className={`group flex items-center justify-between p-4 rounded-xl border transition-all duration-300 outline-none text-left ${
                  isActive
                    ? "bg-white/[0.05] border-white/20 text-white translate-x-2"
                    : "bg-transparent border-transparent text-zinc-500 hover:text-zinc-300 hover:bg-white/[0.02]"
                }`}
              >
                <div className="flex items-baseline gap-4 min-w-0">
                  <span className="font-mono text-xs text-blue-400">{proj.number}</span>
                  <div className="truncate">
                    <h2 className="text-xl xl:text-2xl font-bold tracking-tight truncate">
                      <ScrambleText>{proj.title}</ScrambleText>
                    </h2>
                    <span className="text-[0.65rem] font-mono text-zinc-500 uppercase tracking-wider block mt-0.5">
                      {proj.category}
                    </span>
                  </div>
                </div>

                {isLive && (
                  <span className="ml-3 shrink-0 flex items-center gap-1.5 font-mono text-[0.6rem] uppercase tracking-widest px-2 py-0.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 text-emerald-400">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    Live
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Right Column: Interactive Circuit Preview Stage */}
        <div className="relative w-full sticky top-28">
          <div className="relative rounded-2xl border border-white/15 bg-zinc-950 p-8 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.8)] overflow-hidden">
            {/* Animated Circuit Background Accent */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 opacity-20 overflow-hidden"
            >
              <svg viewBox="0 0 400 200" preserveAspectRatio="none" className="w-full h-full" style={{ color: activeProject.accentColor }}>
                <path d="M0 20 H80 l20 20 H180 l20 -20 H320 l20 20 H400" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.4" />
                <path d="M0 70 H120 l20 20 H240 l20 -20 H400" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.4" />
                <path d="M0 130 H60 l20 -20 H180 l20 20 H300 l20 -20 H400" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.4" />
                <path d="M0 180 H140 l20 -20 H280 l20 20 H400" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.4" />
                
                {/* Circuit Flow line */}
                <path d="M0 70 H120 l20 20 H240 l20 -20 H400" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="circuit-flow" />
                <path d="M0 130 H60 l20 -20 H180 l20 20 H300 l20 -20 H400" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="circuit-flow" style={{ animationDelay: "1s" }} />
              </svg>
            </div>

            {/* Glowing Backdrop */}
            <div
              className="pointer-events-none absolute inset-0 opacity-20"
              style={{
                background: `radial-gradient(circle at 70% 30%, ${activeProject.accentColor} 0%, transparent 65%)`,
              }}
            />

            {/* Content Top */}
            <div className="relative z-10 flex items-start justify-between gap-4 border-b border-white/10 pb-5">
              <div>
                <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-zinc-400">
                  <span className="text-zinc-500">{activeProject.number} //</span>
                  <span style={{ color: activeProject.accentColor }}>{activeProject.category}</span>
                </div>
                <h3 className="text-2xl xl:text-3xl font-bold text-white mt-1">
                  {activeProject.title}
                </h3>
                <p className="text-xs text-zinc-400 mt-1 font-mono uppercase tracking-wide">
                  {activeProject.subtitle}
                </p>
              </div>

              <div className="flex flex-col items-end gap-1.5 shrink-0">
                <span className="font-mono text-xs text-zinc-500 bg-white/5 px-2.5 py-1 rounded-md">
                  {activeProject.date}
                </span>
                {activeProject.liveDemoUrl && activeProject.liveDemoUrl.includes("vercel.app") && (
                  <span className="font-mono text-[0.6rem] uppercase tracking-wider text-emerald-400 flex items-center gap-1">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    Vercel Deployed
                  </span>
                )}
              </div>
            </div>

            {/* Description & Points */}
            <div className="relative z-10 mt-6 space-y-4">
              <p className="text-sm text-zinc-300 leading-relaxed font-light">
                {activeProject.description}
              </p>

              <div className="space-y-2 pt-2">
                {activeProject.highlights.map((h, hIdx) => (
                  <div key={hIdx} className="flex items-start gap-2.5 text-xs text-zinc-400 font-mono">
                    <span style={{ color: activeProject.accentColor }}>›</span>
                    <span>{h}</span>
                  </div>
                ))}
              </div>

              {/* Technologies */}
              <div className="flex flex-wrap gap-1.5 pt-4">
                {activeProject.technologies.map((t) => (
                  <span
                    key={t}
                    className="px-2.5 py-1 rounded-lg border border-white/10 bg-white/5 font-mono text-[0.6875rem] text-zinc-300"
                  >
                    {t}
                  </span>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3 pt-6 border-t border-white/10">
                {activeProject.liveDemoUrl && activeProject.liveDemoUrl !== "#" && (
                  <a
                    href={activeProject.liveDemoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 font-mono text-xs font-semibold uppercase tracking-wider text-white transition-all shadow-[0_0_20px_rgba(59,130,246,0.5)] flex items-center gap-2"
                  >
                    <span>Launch Live Demo</span>
                    <span>→</span>
                  </a>
                )}

                <a
                  href={activeProject.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2.5 rounded-xl border border-white/15 bg-white/5 hover:border-white/40 hover:bg-white/10 font-mono text-xs uppercase tracking-wider text-white transition-all flex items-center gap-2"
                >
                  <span>GitHub Repository</span>
                  <span>↗</span>
                </a>

                <Link
                  href={`/projects/${activeProject.id}`}
                  className="px-4 py-2.5 rounded-xl border border-white/10 hover:border-blue-400/40 font-mono text-xs uppercase tracking-wider text-zinc-400 hover:text-white transition-all ml-auto"
                >
                  Architecture &amp; Details ›
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ---------------- MOBILE STACKED LIST ---------------- */}
      <div className="lg:hidden flex flex-col gap-8">
        {projects.map((proj) => {
          const isLive = proj.liveDemoUrl && proj.liveDemoUrl.includes("vercel.app");
          return (
            <article
              key={proj.id}
              className="rounded-2xl border border-white/15 bg-zinc-950 p-6 shadow-xl relative overflow-hidden"
            >
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <span className="font-mono text-xs text-blue-400">{proj.number} // {proj.category}</span>
                <div className="flex items-center gap-2">
                  {isLive && (
                    <span className="font-mono text-[0.6rem] text-emerald-400 uppercase tracking-wider flex items-center gap-1 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      Live
                    </span>
                  )}
                  <span className="font-mono text-[0.625rem] text-zinc-500">{proj.date}</span>
                </div>
              </div>

              <h2 className="text-2xl font-bold text-white mt-3">
                <ScrambleText>{proj.title}</ScrambleText>
              </h2>
              <p className="text-xs text-zinc-400 mt-1 font-mono uppercase">{proj.subtitle}</p>

              <p className="text-sm text-zinc-300 mt-4 leading-relaxed">{proj.description}</p>

              <div className="space-y-1.5 mt-4">
                {proj.highlights.slice(0, 3).map((h, i) => (
                  <div key={i} className="flex items-start gap-2 text-xs text-zinc-400 font-mono">
                    <span className="text-blue-400">›</span>
                    <span>{h}</span>
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap gap-1 mt-4">
                {proj.technologies.map((t) => (
                  <span
                    key={t}
                    className="px-2 py-0.5 rounded bg-white/5 font-mono text-[0.625rem] text-zinc-300"
                  >
                    {t}
                  </span>
                ))}
              </div>

              <div className="flex flex-wrap items-center gap-3 mt-6 pt-4 border-t border-white/10">
                {proj.liveDemoUrl && proj.liveDemoUrl !== "#" && (
                  <a
                    href={proj.liveDemoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 py-2 rounded-xl bg-blue-600 text-center font-mono text-xs font-semibold uppercase text-white shadow-[0_0_15px_rgba(59,130,246,0.4)]"
                  >
                    Live Demo →
                  </a>
                )}
                <a
                  href={proj.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 py-2 rounded-xl border border-white/15 bg-white/5 text-center font-mono text-xs uppercase text-white"
                >
                  GitHub ↗
                </a>
              </div>
            </article>
          );
        })}
      </div>

      {/* GitHub Callout Banner */}
      <div className="mx-auto w-full max-w-7xl mt-16 p-8 rounded-2xl border border-white/15 bg-gradient-to-r from-zinc-950 via-blue-950/20 to-zinc-950 flex flex-col sm:flex-row items-center justify-between gap-6">
        <div>
          <span className="font-mono text-xs text-blue-400 uppercase tracking-widest block mb-1">
            // Open Source &amp; Code Repositories
          </span>
          <h3 className="text-xl font-bold uppercase font-mono text-white">
            Explore All Repositories on GitHub
          </h3>
          <p className="text-xs text-zinc-400 mt-1 max-w-xl">
            All codebases, commit histories, system architectures, and AI prompt pipelines are open for inspection on GitHub at <span className="text-blue-300 font-mono">@EliyasXCode</span>.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <a
            href={PORTFOLIO_DATA.owner.contact.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-3 rounded-xl border border-blue-500/40 bg-blue-600/15 hover:bg-blue-600/25 hover:border-blue-400 font-mono text-xs uppercase tracking-widest text-blue-300 hover:text-white transition-all flex items-center gap-2 shadow-[0_0_15px_rgba(59,130,246,0.25)]"
          >
            <span>LinkedIn Profile</span>
            <span>↗</span>
          </a>
          <a
            href={PORTFOLIO_DATA.owner.contact.github}
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-3 rounded-xl border border-white/20 bg-white/5 hover:border-white/40 hover:bg-white/10 font-mono text-xs uppercase tracking-widest text-white transition-all flex items-center gap-2"
          >
            <span>GitHub Profile</span>
            <span>↗</span>
          </a>
          <LiquidButton onClick={() => setContactOpen(true)}>
            Collaborate
          </LiquidButton>
        </div>
      </div>

      <ContactModal isOpen={contactOpen} onClose={() => setContactOpen(false)} />
    </main>
  );
}
