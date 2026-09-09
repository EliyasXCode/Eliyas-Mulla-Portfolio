"use client";

import React, { useState } from "react";
import Link from "next/link";
import { PORTFOLIO_DATA } from "@/data/portfolioData";
import { ScrambleText } from "@/components/ScrambleText";
import { LiquidButton } from "@/components/LiquidButton";
import { ContactModal } from "@/components/ContactModal";
import { TechGraph } from "@/components/TechGraph";
import { ContactSection } from "@/components/ContactSection";

export default function AboutPage() {
  const [contactOpen, setContactOpen] = useState(false);

  return (
    <main className="bg-black text-white min-h-screen pt-28 pb-24 px-6 sm:px-10 overflow-hidden">
      {/* ---------------- INTRO HEADER ---------------- */}
      <section className="relative mx-auto max-w-6xl pb-20 border-b border-white/10">
        <div className="flex flex-col gap-6">
          <div className="flex items-center justify-between">
            <p className="font-mono text-xs uppercase tracking-[0.3em] text-blue-400">
              <ScrambleText>// About — Eliyas Mulla</ScrambleText>
            </p>
            <div className="flex items-center gap-2 font-mono text-[0.625rem] uppercase tracking-[0.2em] text-zinc-400">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
              <span>Pune, India · GMT+5:30</span>
            </div>
          </div>

          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black uppercase tracking-tight leading-[0.95] max-w-4xl font-mono">
            A full-stack dev fueled by{" "}
            <span className="text-blue-500">code</span>,{" "}
            <span className="text-blue-400">craft</span> &amp;{" "}
            <span className="text-white">AI integration</span>
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pt-4 items-start">
            <div className="md:col-span-8 text-zinc-300 text-base sm:text-lg leading-relaxed font-light space-y-4">
              <p>
                Full Stack Developer with a B. Tech in Computer Engineering (CGPA 9.0) and hands-on
                experience building and deploying production-grade web applications across the MERN
                stack, Next.js, and Python/Django.
              </p>
              <p>
                Delivered end-to-end projects integrating REST APIs, JWT authentication, relational
                and NoSQL databases, and Generative AI (Google Gemini API) capabilities, alongside a full
                stack development internship at Labmentix Private Limited that contributed to 100%
                on-time sprint delivery.
              </p>
              <p className="text-zinc-400 text-sm">
                Comfortable across the stack — from responsive frontend interfaces to backend services
                and databases — with deployment experience on Docker, GitHub Actions (CI/CD), Vercel,
                and Render. Seeking a Full Stack Developer / SDE role to apply proven project-delivery
                and AI-integration skills at scale.
              </p>
            </div>

            <div className="md:col-span-4 p-6 rounded-2xl border border-white/10 bg-white/[0.02] flex flex-col gap-4 font-mono text-xs">
              <span className="text-zinc-500 uppercase tracking-widest text-[0.625rem]">
                Quick Telemetry
              </span>
              <div className="flex justify-between border-b border-white/5 pb-2">
                <span className="text-zinc-400">DEGREE</span>
                <span className="text-white font-medium">B.Tech Comp Eng</span>
              </div>
              <div className="flex justify-between border-b border-white/5 pb-2">
                <span className="text-zinc-400">CGPA</span>
                <span className="text-emerald-400 font-semibold">9.0 / 10.0</span>
              </div>
              <div className="flex justify-between border-b border-white/5 pb-2">
                <span className="text-zinc-400">LOCATION</span>
                <span className="text-white">Pune, India</span>
              </div>
              <div className="flex justify-between border-b border-white/5 pb-2">
                <span className="text-zinc-400">STATUS</span>
                <span className="text-blue-400">Open to SDE Roles</span>
              </div>
              <div className="flex justify-between border-b border-white/5 pb-2">
                <span className="text-zinc-400">LINKEDIN</span>
                <a
                  href={PORTFOLIO_DATA.owner.contact.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-400 hover:text-white transition-colors flex items-center gap-1"
                >
                  <span>Connect ↗</span>
                </a>
              </div>
              <div className="pt-2 flex flex-col gap-2">
                <LiquidButton onClick={() => setContactOpen(true)} className="w-full justify-center">
                  Get in touch
                </LiquidButton>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ---------------- EDUCATION SECTION ---------------- */}
      <section id="education" className="relative mx-auto max-w-6xl py-20 border-b border-white/10">
        <p className="mb-8 font-mono text-xs uppercase tracking-[0.3em] text-blue-400">
          <ScrambleText>— Education</ScrambleText>
        </p>

        <div className="grid gap-6 sm:grid-cols-1 lg:grid-cols-2">
          {PORTFOLIO_DATA.education.map((edu) => (
            <article
              key={edu.institution}
              className="group relative flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] p-7 transition-all duration-300 hover:border-blue-400/40 hover:-translate-y-1 hover:shadow-[0_20px_50px_-20px_rgba(59,130,246,0.4)]"
            >
              <span
                aria-hidden="true"
                className="pointer-events-none absolute -right-2 -top-4 font-mono text-8xl font-black text-white/[0.04]"
              >
                {edu.number}
              </span>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.8)]" />
                  <span className="font-mono text-xs uppercase tracking-[0.2em] text-zinc-400">
                    {edu.period}
                  </span>
                </div>
                <span className="px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-mono text-xs font-semibold">
                  {edu.score}
                </span>
              </div>

              <h2 className="mt-4 text-2xl font-bold text-white leading-snug">
                <ScrambleText>{edu.degree}</ScrambleText>
              </h2>
              <p className="mt-1 text-sm font-medium text-blue-400">{edu.institution}</p>

              <p className="mt-5 border-t border-white/10 pt-4 font-mono text-xs uppercase leading-relaxed tracking-wider text-zinc-400">
                {edu.description}
              </p>
            </article>
          ))}

          {/* Academic Honors Card */}
          <article className="group relative flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] p-7 transition-all duration-300 hover:border-blue-400/40 hover:-translate-y-1 hover:shadow-[0_20px_50px_-20px_rgba(59,130,246,0.4)]">
            <span
              aria-hidden="true"
              className="pointer-events-none absolute -right-2 -top-4 font-mono text-8xl font-black text-white/[0.04]"
            >
              02
            </span>

            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.8)]" />
              <span className="font-mono text-xs uppercase tracking-[0.2em] text-zinc-400">
                Core Competencies &amp; Rigor
              </span>
            </div>

            <h2 className="mt-4 text-2xl font-bold text-white leading-snug">
              <ScrambleText>Computer Science &amp; System Architecture</ScrambleText>
            </h2>
            <p className="mt-1 text-sm font-medium text-blue-400">
              Department of Computer Engineering
            </p>

            <p className="mt-5 border-t border-white/10 pt-4 font-mono text-xs uppercase leading-relaxed tracking-wider text-zinc-400">
              In-depth specialization in Object-Oriented Programming (OOP), Database Management
              Systems (DBMS), Computer Networks, System Design fundamentals, and AI API integrations.
            </p>
          </article>
        </div>
      </section>

      {/* ---------------- TECHNICAL SKILLS MATRIX & INTERACTIVE GRAPH ---------------- */}
      <section className="relative mx-auto max-w-6xl py-20 border-b border-white/10 space-y-12">
        <div>
          <p className="mb-2 font-mono text-xs uppercase tracking-[0.3em] text-blue-400">
            <ScrambleText>— Technical Architecture &amp; Skills</ScrambleText>
          </p>
          <h2 className="text-3xl sm:text-4xl font-black uppercase font-mono text-white">
            Competency Graph
          </h2>
          <p className="text-xs text-zinc-400 mt-2 font-mono uppercase tracking-wider">
            — Interactive neural network of frameworks, languages, and AI tooling
          </p>
        </div>

        {/* ── Interactive Neural Skill Tree (Image 2) ── */}
        <TechGraph />

        {/* ── Structured Categorical Grid ── */}
        <div>
          <span className="font-mono text-xs uppercase tracking-widest text-zinc-500 block mb-6">
            // Full Domain Inventory
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-5 rounded-2xl border border-white/10 bg-white/[0.02]">
            <span className="font-mono text-xs text-blue-400 uppercase tracking-widest block mb-3">
              Languages
            </span>
            <div className="flex flex-wrap gap-1.5">
              {PORTFOLIO_DATA.skills.languages.map((item) => (
                <span
                  key={item}
                  className="px-2.5 py-1 rounded-md bg-white/5 text-zinc-300 font-mono text-[0.6875rem]"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>

          <div className="p-5 rounded-2xl border border-white/10 bg-white/[0.02]">
            <span className="font-mono text-xs text-blue-400 uppercase tracking-widest block mb-3">
              Frontend
            </span>
            <div className="flex flex-wrap gap-1.5">
              {PORTFOLIO_DATA.skills.frontend.map((item) => (
                <span
                  key={item}
                  className="px-2.5 py-1 rounded-md bg-white/5 text-zinc-300 font-mono text-[0.6875rem]"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>

          <div className="p-5 rounded-2xl border border-white/10 bg-white/[0.02]">
            <span className="font-mono text-xs text-blue-400 uppercase tracking-widest block mb-3">
              Backend &amp; APIs
            </span>
            <div className="flex flex-wrap gap-1.5">
              {PORTFOLIO_DATA.skills.backend.map((item) => (
                <span
                  key={item}
                  className="px-2.5 py-1 rounded-md bg-white/5 text-zinc-300 font-mono text-[0.6875rem]"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>

          <div className="p-5 rounded-2xl border border-white/10 bg-white/[0.02]">
            <span className="font-mono text-xs text-emerald-400 uppercase tracking-widest block mb-3">
              AI / GenAI
            </span>
            <div className="flex flex-wrap gap-1.5">
              {PORTFOLIO_DATA.skills.aiGenAi.map((item) => (
                <span
                  key={item}
                  className="px-2.5 py-1 rounded-md bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 font-mono text-[0.6875rem]"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>

          <div className="p-5 rounded-2xl border border-white/10 bg-white/[0.02]">
            <span className="font-mono text-xs text-blue-400 uppercase tracking-widest block mb-3">
              Databases
            </span>
            <div className="flex flex-wrap gap-1.5">
              {PORTFOLIO_DATA.skills.databases.map((item) => (
                <span
                  key={item}
                  className="px-2.5 py-1 rounded-md bg-white/5 text-zinc-300 font-mono text-[0.6875rem]"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>

          <div className="p-5 rounded-2xl border border-white/10 bg-white/[0.02]">
            <span className="font-mono text-xs text-blue-400 uppercase tracking-widest block mb-3">
              Deployment &amp; DevOps
            </span>
            <div className="flex flex-wrap gap-1.5">
              {PORTFOLIO_DATA.skills.deployment.map((item) => (
                <span
                  key={item}
                  className="px-2.5 py-1 rounded-md bg-white/5 text-zinc-300 font-mono text-[0.6875rem]"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>

          <div className="p-5 rounded-2xl border border-white/10 bg-white/[0.02]">
            <span className="font-mono text-xs text-blue-400 uppercase tracking-widest block mb-3">
              Tools &amp; Platforms
            </span>
            <div className="flex flex-wrap gap-1.5">
              {PORTFOLIO_DATA.skills.tools.map((item) => (
                <span
                  key={item}
                  className="px-2.5 py-1 rounded-md bg-white/5 text-zinc-300 font-mono text-[0.6875rem]"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>

          <div className="p-5 rounded-2xl border border-white/10 bg-white/[0.02]">
            <span className="font-mono text-xs text-blue-400 uppercase tracking-widest block mb-3">
              Core Concepts
            </span>
            <div className="flex flex-wrap gap-1.5">
              {PORTFOLIO_DATA.skills.coreConcepts.map((item) => (
                <span
                  key={item}
                  className="px-2.5 py-1 rounded-md bg-white/5 text-zinc-300 font-mono text-[0.6875rem]"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>

      {/* ---------------- SERPENTINE CIRCUIT CAREER TIMELINE ---------------- */}
      <section id="career" className="relative mx-auto max-w-6xl py-24 scroll-mt-20">
        <p className="mb-14 font-mono text-xs uppercase tracking-[0.3em] text-blue-400">
          <ScrambleText>— Career Timeline</ScrambleText>
        </p>

        <div className="relative">
          {/* Vertical / Serpentine Circuit Guide Line */}
          <div className="absolute left-4 sm:left-1/2 top-0 bottom-0 w-px -translate-x-1/2 bg-gradient-to-b from-blue-500 via-blue-400/40 to-transparent">
            <div className="sticky top-1/2 h-6 w-1 -translate-x-[1.5px] bg-white shadow-[0_0_12px_#3b82f6] rounded-full node-pulsing" />
          </div>

          <div className="flex flex-col gap-12">
            {PORTFOLIO_DATA.career.map((item, idx) => {
              const isEven = idx % 2 === 0;
              return (
                <div
                  key={item.id}
                  className={`relative flex flex-col sm:flex-row items-start ${
                    isEven ? "sm:flex-row-reverse" : ""
                  }`}
                >
                  {/* Central Node Indicator */}
                  <div className="absolute left-4 sm:left-1/2 top-7 -translate-x-1/2 z-20 flex h-6 w-6 items-center justify-center rounded-full bg-zinc-950 border-2 border-blue-400 shadow-[0_0_15px_rgba(59,130,246,0.8)]">
                    <span className="h-2 w-2 rounded-full bg-white" />
                  </div>

                  {/* Card Body */}
                  <div
                    className={`ml-12 sm:ml-0 sm:w-1/2 ${
                      isEven ? "sm:pr-14" : "sm:pl-14"
                    } w-full`}
                  >
                    <article className="rounded-2xl border border-white/10 bg-zinc-950/80 p-6 sm:p-7 backdrop-blur-md transition-all duration-300 hover:border-blue-400/40 hover:shadow-[0_15px_40px_-15px_rgba(59,130,246,0.3)]">
                      <div className="flex items-start justify-between gap-4 border-b border-white/10 pb-4">
                        <div>
                          <span className="font-mono text-[0.625rem] uppercase tracking-[0.2em] text-blue-400 block mb-1">
                            {item.type}
                          </span>
                          <h3 className="text-xl sm:text-2xl font-bold text-white">
                            <ScrambleText>{item.company}</ScrambleText>
                          </h3>
                          <p className="text-sm font-medium text-blue-300 mt-0.5">{item.role}</p>
                        </div>
                        <span className="shrink-0 whitespace-nowrap font-mono text-[0.625rem] uppercase tracking-[0.15em] text-zinc-500 bg-white/5 px-2.5 py-1 rounded-md">
                          {item.period}
                        </span>
                      </div>

                      <p className="mt-4 text-xs font-mono uppercase text-zinc-400 tracking-wider">
                        {item.description}
                      </p>

                      <ul className="mt-4 space-y-2.5">
                        {item.points.map((pt, pIdx) => (
                          <li key={pIdx} className="flex items-start gap-2.5 text-xs text-zinc-300">
                            <span className="text-blue-400 mt-0.5 font-bold">›</span>
                            <span>{pt}</span>
                          </li>
                        ))}
                      </ul>
                    </article>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ---------------- GRAND CONTACT SECTION (Image 1) ---------------- */}
      <ContactSection />

      <ContactModal isOpen={contactOpen} onClose={() => setContactOpen(false)} />
    </main>
  );
}
