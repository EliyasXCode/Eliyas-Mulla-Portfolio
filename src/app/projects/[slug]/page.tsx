"use client";

import React, { useState } from "react";
import Link from "next/link";
import { PORTFOLIO_DATA } from "@/data/portfolioData";
import { LiquidButton } from "@/components/LiquidButton";
import { ContactModal } from "@/components/ContactModal";

export default function ProjectDetailPage({ params }: { params: { slug: string } }) {
  const project = PORTFOLIO_DATA.projects.find((p) => p.id === params.slug);

  if (!project) {
    return (
      <main className="bg-black text-white min-h-screen pt-28 pb-24 px-6 sm:px-10 flex items-center justify-center">
        <div className="text-center">
          <p className="font-mono text-xs uppercase tracking-widest text-blue-400 mb-4">404</p>
          <h1 className="text-4xl font-black uppercase text-white mb-4">Project Not Found</h1>
          <Link href="/projects" className="text-zinc-400 hover:text-white font-mono text-sm transition-colors">
            ← Back to Projects
          </Link>
        </div>
      </main>
    );
  }


  const [contactOpen, setContactOpen] = useState(false);

  const accentStyle = { color: project.accentColor };
  const accentBg = { backgroundColor: project.accentColor };

  return (
    <main className="bg-black text-white min-h-screen pt-28 pb-24 px-6 sm:px-10">
      <div className="mx-auto max-w-5xl">
        {/* Breadcrumb */}
        <div className="mb-8 flex items-center gap-2 font-mono text-xs uppercase tracking-[0.2em] text-zinc-500">
          <Link href="/" className="hover:text-white transition-colors">
            Home
          </Link>
          <span>/</span>
          <Link href="/projects" className="hover:text-white transition-colors">
            Projects
          </Link>
          <span>/</span>
          <span style={accentStyle}>{project.title}</span>
        </div>

        {/* Hero */}
        <div className="relative rounded-2xl border border-white/15 bg-zinc-950 p-8 sm:p-12 overflow-hidden mb-12">
          {/* Accent glow */}
          <div
            className="pointer-events-none absolute inset-0 opacity-15"
            style={{
              background: `radial-gradient(ellipse at 80% 20%, ${project.accentColor} 0%, transparent 65%)`,
            }}
          />

          {/* Circuit lines */}
          <div className="pointer-events-none absolute inset-0 opacity-20 overflow-hidden">
            <svg
              viewBox="0 0 600 300"
              preserveAspectRatio="none"
              className="w-full h-full"
              style={{ color: project.accentColor }}
            >
              <path
                d="M0 40 H100 l20 20 H280 l20-20 H600"
                fill="none"
                stroke="currentColor"
                strokeWidth="1"
                opacity="0.4"
              />
              <path
                d="M0 140 H160 l20 20 H380 l20-20 H600"
                fill="none"
                stroke="currentColor"
                strokeWidth="1"
                opacity="0.4"
              />
              <path
                d="M0 240 H80 l20-20 H280 l20 20 H600"
                fill="none"
                stroke="currentColor"
                strokeWidth="1"
                opacity="0.4"
              />
            </svg>
          </div>

          <div className="relative z-10">
            {/* Meta */}
            <div className="flex items-center gap-3 font-mono text-xs uppercase tracking-widest mb-4">
              <span className="text-zinc-500">{project.number} //</span>
              <span style={accentStyle}>{project.category}</span>
              <span className="ml-auto text-zinc-500 bg-white/5 px-2.5 py-1 rounded-md">
                {project.date}
              </span>
            </div>

            <h1 className="text-4xl sm:text-6xl font-black uppercase leading-tight tracking-tight text-white">
              {project.title}
            </h1>
            <p className="text-zinc-400 font-mono text-sm uppercase tracking-wider mt-3">
              {project.subtitle}
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center gap-3 mt-8">
              {project.liveDemoUrl && project.liveDemoUrl !== "#" && (
                <a
                  href={project.liveDemoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3 rounded-xl font-mono text-xs font-semibold uppercase tracking-wider text-white transition-all shadow-[0_0_20px_rgba(59,130,246,0.4)] hover:opacity-90 flex items-center gap-2"
                  style={accentBg}
                >
                  <span>Live Demo</span>
                  <span>→</span>
                </a>
              )}
              {project.githubUrl && project.githubUrl !== "#" && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3 rounded-xl border border-white/15 bg-white/5 hover:border-white/40 hover:bg-white/10 font-mono text-xs uppercase tracking-wider text-white transition-all flex items-center gap-2"
                >
                  <span>GitHub Repository</span>
                  <span>↗</span>
                </a>
              )}
              <Link
                href="/projects"
                className="px-6 py-3 rounded-xl border border-white/10 font-mono text-xs uppercase tracking-wider text-zinc-400 hover:text-white transition-colors"
              >
                ← All Projects
              </Link>
            </div>
          </div>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 flex flex-col gap-8">
            {/* Description */}
            <section>
              <h2 className="font-mono text-xs uppercase tracking-[0.3em] text-blue-400 mb-4">
                — Overview
              </h2>
              <p className="text-zinc-300 leading-relaxed text-base">{project.description}</p>
            </section>

            {/* Key Features */}
            <section>
              <h2 className="font-mono text-xs uppercase tracking-[0.3em] text-blue-400 mb-4">
                — Key Features & Engineering Highlights
              </h2>
              <ul className="space-y-3">
                {project.highlights.map((h, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-zinc-300">
                    <span
                      className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full"
                      style={accentBg}
                    />
                    <span>{h}</span>
                  </li>
                ))}
              </ul>
            </section>

            {/* Tech Stack */}
            <section>
              <h2 className="font-mono text-xs uppercase tracking-[0.3em] text-blue-400 mb-4">
                — Technology Stack
              </h2>
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((t) => (
                  <span
                    key={t}
                    className="px-3 py-1.5 rounded-xl border border-white/10 bg-white/5 font-mono text-xs text-zinc-300 hover:border-blue-400/40 hover:text-white transition-colors"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <div className="flex flex-col gap-6">
            {/* Project Info Card */}
            <div className="rounded-2xl border border-white/10 bg-zinc-950 p-6 font-mono text-xs">
              <span className="text-zinc-500 uppercase tracking-widest block mb-4">
                Project Info
              </span>
              <div className="space-y-3">
                <div className="flex justify-between border-b border-white/5 pb-2">
                  <span className="text-zinc-400">DATE</span>
                  <span className="text-white">{project.date}</span>
                </div>
                <div className="flex justify-between border-b border-white/5 pb-2">
                  <span className="text-zinc-400">TYPE</span>
                  <span className="text-white">{project.category}</span>
                </div>
                <div className="flex justify-between border-b border-white/5 pb-2">
                  <span className="text-zinc-400">STACK SIZE</span>
                  <span className="text-white">{project.technologies.length} technologies</span>
                </div>
                <div className="flex justify-between pb-2">
                  <span className="text-zinc-400">STATUS</span>
                  <span className="text-emerald-400">DEPLOYED</span>
                </div>
              </div>
            </div>

            {/* Contact CTA */}
            <div className="rounded-2xl border border-white/10 bg-gradient-to-b from-blue-950/20 to-zinc-950 p-6">
              <h3 className="font-mono text-xs uppercase tracking-widest text-zinc-400 mb-2">
                Interested in this project?
              </h3>
              <p className="text-sm text-zinc-400 mb-4">
                Want to discuss this work or explore collaboration opportunities?
              </p>
              <LiquidButton onClick={() => setContactOpen(true)}>Get in touch</LiquidButton>
            </div>
          </div>
        </div>

        {/* Navigation between projects */}
        <div className="mt-16 pt-8 border-t border-white/10 flex items-center justify-between gap-4">
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-zinc-400 hover:text-white transition-colors"
          >
            ← Back to all projects
          </Link>
          <div className="flex gap-2">
            {PORTFOLIO_DATA.projects.map((p, i) => (
              <Link
                key={p.id}
                href={`/projects/${p.id}`}
                className={`h-2 w-2 rounded-full transition-colors ${
                  p.id === project.id ? "bg-blue-400" : "bg-white/20 hover:bg-white/50"
                }`}
                aria-label={p.title}
              />
            ))}
          </div>
        </div>
      </div>

      <ContactModal isOpen={contactOpen} onClose={() => setContactOpen(false)} />
    </main>
  );
}
