"use client";

import React, { useState } from "react";
import { PORTFOLIO_DATA } from "@/data/portfolioData";
import { ScrambleText } from "@/components/ScrambleText";
import { LiquidButton } from "@/components/LiquidButton";
import { ContactModal } from "@/components/ContactModal";

export default function AchievementsPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [contactOpen, setContactOpen] = useState(false);
  const achievements = PORTFOLIO_DATA.achievements;

  const categories = ["All", "Certifications", "AI & Development", "Academic"];

  const filtered =
    selectedCategory === "All"
      ? achievements
      : achievements.filter((a) => a.category === selectedCategory);

  return (
    <main className="bg-black text-white min-h-screen pt-28 pb-24 px-6 sm:px-10 overflow-hidden">
      <div className="mx-auto max-w-7xl">
        {/* Header Telemetry */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 border-b border-white/10 pb-8">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.3em] text-blue-400">
              <ScrambleText>// Credentials &amp; Certifications</ScrambleText>
            </p>
            <h1 className="text-4xl sm:text-6xl font-black uppercase tracking-tight mt-1 font-mono">
              Achievements
            </h1>
            <p className="text-sm text-zinc-400 mt-2 font-mono uppercase tracking-wider">
              — Verified certifications, honors, and technical accreditations
            </p>
          </div>

          {/* Telemetry Counter Block */}
          <div className="flex items-center gap-6 font-mono text-xs uppercase tracking-widest text-zinc-400 border border-white/10 bg-white/[0.02] p-4 rounded-xl">
            <div>
              <span className="block text-[0.625rem] text-zinc-500">Total Records</span>
              <span className="text-white font-bold text-base tabular-nums">00{achievements.length}</span>
            </div>
            <div className="h-6 w-px bg-white/10" />
            <div>
              <span className="block text-[0.625rem] text-zinc-500">CGPA Status</span>
              <span className="text-emerald-400 font-bold text-base tabular-nums">9.0 / 10.0</span>
            </div>
            <div className="h-6 w-px bg-white/10" />
            <div>
              <span className="block text-[0.625rem] text-zinc-500">Accreditation</span>
              <span className="text-blue-400 font-bold text-base">VERIFIED</span>
            </div>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap items-center gap-2 py-8">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-xl font-mono text-xs uppercase tracking-wider transition-all ${
                selectedCategory === cat
                  ? "bg-white text-black font-semibold shadow-[0_0_15px_rgba(255,255,255,0.4)]"
                  : "bg-white/5 text-zinc-400 hover:text-white hover:bg-white/10 border border-white/5"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Credentials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((item) => (
            <article
              key={item.id}
              className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-white/10 bg-zinc-950/80 p-7 backdrop-blur-md transition-all duration-300 hover:border-blue-400/50 hover:-translate-y-1 hover:shadow-[0_20px_50px_-20px_rgba(59,130,246,0.3)]"
            >
              {/* Background Index Number */}
              <span
                aria-hidden="true"
                className="pointer-events-none absolute -right-1 -top-3 font-mono text-7xl font-black text-white/[0.04]"
              >
                {item.number}
              </span>

              {/* Card Header */}
              <div>
                <div className="flex items-center justify-between border-b border-white/5 pb-3">
                  <div className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(16,185,129,0.8)]" />
                    <span className="font-mono text-[0.625rem] uppercase tracking-[0.2em] text-zinc-400">
                      {item.category}
                    </span>
                  </div>
                  <span className="font-mono text-[0.625rem] uppercase tracking-[0.15em] text-zinc-500">
                    {item.date}
                  </span>
                </div>

                <h2 className="text-xl font-bold text-white mt-4 leading-snug">
                  <ScrambleText>{item.title}</ScrambleText>
                </h2>
                <p className="text-xs font-mono text-blue-400 uppercase tracking-wider mt-1">
                  {item.issuer}
                </p>

                <p className="mt-4 text-xs text-zinc-400 leading-relaxed font-light">
                  {item.description}
                </p>
              </div>

              {/* Card Footer Badge */}
              <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between font-mono text-[0.625rem] text-zinc-500 uppercase tracking-widest">
                <span>STATUS: AUTHENTIC</span>
                <span className="text-blue-400 group-hover:translate-x-1 transition-transform">
                  CREDENTIAL ›
                </span>
              </div>
            </article>
          ))}
        </div>

        {/* Academic Feature Spotlight */}
        <div className="mt-16 p-8 rounded-2xl border border-white/15 bg-gradient-to-r from-blue-950/20 via-zinc-950 to-black relative overflow-hidden">
          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <span className="font-mono text-xs uppercase tracking-widest text-emerald-400 block mb-1">
                // Academic Distinction
              </span>
              <h3 className="text-2xl font-bold uppercase font-mono text-white">
                B.Tech in Computer Engineering — CGPA: 9.0 / 10.0
              </h3>
              <p className="text-xs text-zinc-400 mt-1 max-w-2xl font-light">
                Bharati Vidyapeeth (Deemed to be) University, Pune. Demonstrated excellence in software development, data structures, algorithms, databases, and AI system design.
              </p>
            </div>
            <LiquidButton onClick={() => setContactOpen(true)}>
              Inquire Transcript
            </LiquidButton>
          </div>
        </div>
      </div>

      <ContactModal isOpen={contactOpen} onClose={() => setContactOpen(false)} />
    </main>
  );
}
