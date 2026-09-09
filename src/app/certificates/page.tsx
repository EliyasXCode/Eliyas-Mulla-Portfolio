"use client";

import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { PORTFOLIO_DATA } from "@/data/portfolioData";
import { ScrambleText } from "@/components/ScrambleText";
import { LiquidButton } from "@/components/LiquidButton";
import { ContactModal } from "@/components/ContactModal";

const categoryColors: Record<string, { pill: string; dot: string }> = {
  Certifications: {
    pill: "text-blue-400 border-blue-400/30 bg-blue-400/10",
    dot: "bg-blue-400 shadow-[0_0_8px_rgba(59,130,246,0.8)]",
  },
  "AI & Development": {
    pill: "text-emerald-400 border-emerald-400/30 bg-emerald-400/10",
    dot: "bg-emerald-400 shadow-[0_0_8px_rgba(16,185,129,0.8)]",
  },
  Academic: {
    pill: "text-amber-400 border-amber-400/30 bg-amber-400/10",
    dot: "bg-amber-400 shadow-[0_0_8px_rgba(251,191,36,0.8)]",
  },
};

export default function CertificatesPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [contactOpen, setContactOpen] = useState(false);
  const [lightboxIdx, setLightboxIdx] = useState<number | null>(null);
  const [viewPdfMode, setViewPdfMode] = useState<boolean>(false);

  const achievements = PORTFOLIO_DATA.achievements;
  const categories = ["All", "Certifications", "AI & Development", "Academic"];

  const filtered =
    selectedCategory === "All"
      ? achievements
      : achievements.filter((a) => a.category === selectedCategory);

  const closeLightbox = useCallback(() => {
    setLightboxIdx(null);
    setViewPdfMode(false);
  }, []);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (lightboxIdx === null) return;
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowRight") {
        setViewPdfMode(false);
        setLightboxIdx((i) => (i !== null ? Math.min(i + 1, filtered.length - 1) : 0));
      }
      if (e.key === "ArrowLeft") {
        setViewPdfMode(false);
        setLightboxIdx((i) => (i !== null ? Math.max(i - 1, 0) : 0));
      }
    },
    [lightboxIdx, filtered.length, closeLightbox]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = lightboxIdx !== null ? "hidden" : "";
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [handleKeyDown, lightboxIdx]);

  const activeCert = lightboxIdx !== null ? filtered[lightboxIdx] : null;

  return (
    <main className="bg-black text-white min-h-screen pt-28 pb-24 px-6 sm:px-10 overflow-x-hidden">
      <div className="mx-auto max-w-7xl">

        {/* ── HEADER ── */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 border-b border-white/10 pb-8">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.3em] text-blue-400">
              <ScrambleText>// Credentials & Certifications</ScrambleText>
            </p>
            <h1 className="text-4xl sm:text-6xl font-black uppercase tracking-tight mt-1 font-mono">
              Certificates
            </h1>
            <p className="text-sm text-zinc-400 mt-2 font-mono uppercase tracking-wider">
              — Verified certifications, honors &amp; technical accreditations
            </p>
          </div>

          {/* Stats */}
          <div className="flex flex-wrap items-center gap-4 sm:gap-6 font-mono text-xs uppercase tracking-widest border border-white/10 bg-white/[0.02] p-4 rounded-xl">
            <div>
              <span className="block text-[0.6rem] text-zinc-500 mb-0.5">Total Records</span>
              <span className="text-white font-bold text-lg tabular-nums">
                0{achievements.length}
              </span>
            </div>
            <div className="h-8 w-px bg-white/10 hidden sm:block" />
            <div>
              <span className="block text-[0.6rem] text-zinc-500 mb-0.5">CGPA Status</span>
              <span className="text-emerald-400 font-bold text-lg tabular-nums">9.0 / 10</span>
            </div>
            <div className="h-8 w-px bg-white/10 hidden sm:block" />
            <div>
              <span className="block text-[0.6rem] text-zinc-500 mb-0.5">Accreditation</span>
              <span className="text-blue-400 font-bold text-lg">VERIFIED</span>
            </div>
          </div>
        </div>

        {/* ── FILTER TABS ── */}
        <div className="flex flex-wrap items-center gap-2 py-8">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-xl font-mono text-xs uppercase tracking-wider transition-all duration-200 ${
                selectedCategory === cat
                  ? "bg-white text-black font-semibold shadow-[0_0_20px_rgba(255,255,255,0.3)]"
                  : "bg-white/5 text-zinc-400 hover:text-white hover:bg-white/10 border border-white/5"
              }`}
            >
              {cat}
            </button>
          ))}
          <span className="ml-auto font-mono text-[0.625rem] uppercase tracking-widest text-zinc-600">
            {filtered.length} record{filtered.length !== 1 ? "s" : ""}
          </span>
        </div>

        {/* ── CERTIFICATE GRID ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {filtered.map((item, idx) => {
            const colors = categoryColors[item.category] ?? {
              pill: "text-zinc-400 border-white/10",
              dot: "bg-zinc-400",
            };

            return (
              <article
                key={item.id}
                className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-white/10 bg-zinc-950 transition-all duration-300 hover:border-blue-400/50 hover:-translate-y-1 hover:shadow-[0_20px_50px_-15px_rgba(59,130,246,0.25)] cursor-pointer"
                onClick={() => {
                  setViewPdfMode(false);
                  setLightboxIdx(idx);
                }}
                tabIndex={0}
                role="button"
                aria-label={`View certificate: ${item.title}`}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    setViewPdfMode(false);
                    setLightboxIdx(idx);
                  }
                }}
              >
                {/* ── Certificate Preview Image Banner ── */}
                <div className="relative w-full aspect-[4/3] overflow-hidden bg-zinc-900 border-b border-white/10">
                  <Image
                    src={item.previewImage}
                    alt={item.title}
                    fill
                    className="object-cover object-top opacity-85 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/90 via-zinc-950/15 to-transparent pointer-events-none" />
                  
                  {/* Floating Action Badge */}
                  <div className="absolute top-3 right-3 flex items-center gap-1.5 font-mono text-[0.55rem] uppercase tracking-widest bg-black/75 backdrop-blur-md px-2.5 py-1 rounded-md text-zinc-300 border border-white/10 group-hover:border-blue-400/50 group-hover:text-white transition-colors">
                    <span>Preview</span>
                    <span className="text-blue-400">↗</span>
                  </div>
                </div>

                {/* ── Card body ── */}
                <div className="p-5 flex flex-col gap-3 flex-1">
                  {/* Header row */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className={`h-1.5 w-1.5 rounded-full ${colors.dot}`} />
                      <span
                        className={`font-mono text-[0.6rem] uppercase tracking-[0.2em] px-2 py-0.5 rounded-md border ${colors.pill}`}
                      >
                        {item.category}
                      </span>
                    </div>
                    <span className="font-mono text-[0.6rem] uppercase tracking-[0.15em] text-zinc-500">
                      {item.date}
                    </span>
                  </div>

                  {/* Title */}
                  <div>
                    <h2 className="text-base font-bold text-white leading-snug">
                      <ScrambleText>{item.title}</ScrambleText>
                    </h2>
                    <p className="text-[0.7rem] font-mono text-blue-400 uppercase tracking-wider mt-0.5">
                      {item.issuer}
                    </p>
                  </div>

                  {/* Description */}
                  <p className="text-[0.75rem] text-zinc-400 leading-relaxed font-light line-clamp-3">
                    {item.description}
                  </p>

                  {/* Footer */}
                  <div className="mt-auto pt-3 border-t border-white/5 flex items-center justify-between font-mono text-[0.6rem] text-zinc-600 uppercase tracking-widest">
                    {item.credentialId ? (
                      <span className="text-zinc-500 truncate max-w-[170px]">ID: {item.credentialId}</span>
                    ) : (
                      <span>Status: Verified</span>
                    )}
                    <span className="text-blue-400 group-hover:translate-x-1 transition-transform shrink-0 ml-2">
                      VIEW ›
                    </span>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        {/* ── ACADEMIC BANNER ── */}
        <div className="mt-16 p-8 rounded-2xl border border-white/15 bg-gradient-to-r from-blue-950/20 via-zinc-950 to-black relative overflow-hidden">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 opacity-10"
            style={{
              background:
                "radial-gradient(ellipse at 20% 50%, #3b82f6 0%, transparent 60%)",
            }}
          />
          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <span className="font-mono text-xs uppercase tracking-widest text-emerald-400 block mb-1">
                // Academic Distinction
              </span>
              <h3 className="text-2xl font-bold uppercase font-mono text-white">
                B.Tech Computer Engineering — CGPA: 9.0 / 10.0
              </h3>
              <p className="text-xs text-zinc-400 mt-1 max-w-2xl font-light">
                Bharati Vidyapeeth (Deemed to be) University, Pune · 2022 – 2026 · Specialization
                in AI Systems, Full-Stack Development, and Database Engineering.
              </p>
            </div>
            <LiquidButton onClick={() => setContactOpen(true)}>Inquire Transcript</LiquidButton>
          </div>
        </div>
      </div>

      {/* ── LIGHTBOX VIEWER ── */}
      {activeCert && (
        <div
          className="fixed inset-0 z-[120] flex items-center justify-center p-3 sm:p-6 bg-black/95 backdrop-blur-md"
          onClick={closeLightbox}
          role="dialog"
          aria-modal="true"
          aria-label={`Certificate: ${activeCert.title}`}
        >
          <div
            className="relative flex flex-col w-full max-w-4xl max-h-[94vh] rounded-2xl border border-white/15 bg-zinc-950 overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Lightbox header */}
            <div className="flex items-center justify-between px-5 sm:px-6 py-4 border-b border-white/10 shrink-0 gap-3">
              <div className="flex items-center gap-3 sm:gap-4 min-w-0">
                <span className="font-mono text-[0.6rem] uppercase tracking-widest text-zinc-500 shrink-0">
                  {String((lightboxIdx ?? 0) + 1).padStart(2, "0")} / {String(filtered.length).padStart(2, "0")}
                </span>
                <div className="min-w-0">
                  <h2 className="text-sm sm:text-base font-bold text-white truncate">{activeCert.title}</h2>
                  <p className="text-[0.65rem] font-mono text-blue-400 uppercase tracking-wider">
                    {activeCert.issuer} · {activeCert.date}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                {/* Verify Online Link */}
                {activeCert.verifyUrl && (
                  <a
                    href={activeCert.verifyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-emerald-500/30 bg-emerald-500/10 font-mono text-[0.6rem] uppercase tracking-wider text-emerald-300 hover:bg-emerald-500/20 transition-colors"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <span>Verify</span>
                    <span>↗</span>
                  </a>
                )}

                {/* Toggle PDF/Image if file is PDF */}
                {activeCert.file && activeCert.file.endsWith(".pdf") && (
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setViewPdfMode(!viewPdfMode);
                    }}
                    className="hidden sm:inline-flex px-3 py-1.5 rounded-lg border border-white/10 font-mono text-[0.6rem] uppercase tracking-wider text-zinc-300 hover:text-white hover:border-white/30 transition-colors"
                  >
                    {viewPdfMode ? "Show Image" : "Show PDF Viewer"}
                  </button>
                )}

                {/* Download button */}
                <a
                  href={activeCert.file || activeCert.previewImage}
                  download
                  className="px-3 py-1.5 rounded-lg border border-white/10 font-mono text-[0.6rem] uppercase tracking-wider text-zinc-300 hover:text-white hover:border-white/30 transition-colors"
                  onClick={(e) => e.stopPropagation()}
                >
                  Download ↓
                </a>

                {/* Close */}
                <button
                  type="button"
                  onClick={closeLightbox}
                  aria-label="Close"
                  className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/10 text-zinc-400 hover:border-white/30 hover:text-white transition-colors"
                >
                  ✕
                </button>
              </div>
            </div>

            {/* Certificate viewer */}
            <div className="flex-1 overflow-auto bg-zinc-950 flex items-center justify-center min-h-[50vh] p-2 sm:p-4">
              {viewPdfMode && activeCert.file ? (
                <iframe
                  src={`${activeCert.file}#toolbar=1&view=FitH`}
                  title={activeCert.title}
                  className="w-full h-[68vh] border-none rounded-lg"
                />
              ) : (
                <div className="relative w-full h-[65vh] flex items-center justify-center">
                  <Image
                    src={activeCert.previewImage}
                    alt={activeCert.title}
                    fill
                    className="object-contain rounded-lg drop-shadow-[0_15px_30px_rgba(0,0,0,0.8)]"
                    priority
                  />
                </div>
              )}
            </div>

            {/* Lightbox footer */}
            <div className="flex items-center justify-between px-5 sm:px-6 py-3 border-t border-white/10 shrink-0 bg-zinc-950">
              <button
                type="button"
                disabled={(lightboxIdx ?? 0) === 0}
                onClick={() => {
                  setViewPdfMode(false);
                  setLightboxIdx((i) => Math.max((i ?? 0) - 1, 0));
                }}
                className="px-3.5 py-1.5 rounded-xl border border-white/10 font-mono text-[0.65rem] uppercase tracking-wider text-zinc-400 hover:text-white hover:border-white/30 disabled:opacity-25 disabled:cursor-not-allowed transition-all"
              >
                ← Prev
              </button>

              <div className="flex items-center gap-1.5">
                {filtered.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => {
                      setViewPdfMode(false);
                      setLightboxIdx(i);
                    }}
                    className={`h-1.5 rounded-full transition-all duration-200 ${
                      i === lightboxIdx ? "w-6 bg-blue-400" : "w-1.5 bg-white/20 hover:bg-white/50"
                    }`}
                    aria-label={`Certificate ${i + 1}`}
                  />
                ))}
              </div>

              <button
                type="button"
                disabled={(lightboxIdx ?? 0) === filtered.length - 1}
                onClick={() => {
                  setViewPdfMode(false);
                  setLightboxIdx((i) => Math.min((i ?? 0) + 1, filtered.length - 1));
                }}
                className="px-3.5 py-1.5 rounded-xl border border-white/10 font-mono text-[0.65rem] uppercase tracking-wider text-zinc-400 hover:text-white hover:border-white/30 disabled:opacity-25 disabled:cursor-not-allowed transition-all"
              >
                Next →
              </button>
            </div>
          </div>
        </div>
      )}

      <ContactModal isOpen={contactOpen} onClose={() => setContactOpen(false)} />
    </main>
  );
}
