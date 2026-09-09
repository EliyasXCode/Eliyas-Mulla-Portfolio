"use client";

import React, { useState, useEffect, useRef } from "react";
import { PORTFOLIO_DATA } from "@/data/portfolioData";
import { ScrambleText } from "./ScrambleText";
import { prefersReducedMotion } from "@/lib/animations";

export function ContactSection() {
  const [copied, setCopied] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const email = PORTFOLIO_DATA.owner.contact.email; // eliyasmulla79@gmail.com

  // Ambient 3D Rotating Particle Cloud behind email (matching Image 1)
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = (canvas.width = canvas.parentElement?.clientWidth || 900);
    let height = (canvas.height = canvas.parentElement?.clientHeight || 480);

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    ctx.scale(dpr, dpr);

    // 4D Hypercube / 3D Dots Box Swarm matching arif-hasan.vercel.app/about#contact
    const SWARM_COUNT = 1536; // Dense high-definition points along box edges (48 per edge)

    let animId: number;
    let time = 0;

    const render = () => {
      animId = requestAnimationFrame(render);
      if (!prefersReducedMotion()) {
        time += 0.016;
      }

      ctx.clearRect(0, 0, width, height);
      const cx = width / 2;
      const cy = height / 2;
      const baseScale = Math.min(width, height) / 220;

      // Draw each dot in the rotating 4D hypercube box
      const r = Math.max(1, Math.floor(SWARM_COUNT / 32));

      for (let a = 0; a < SWARM_COUNT; a++) {
        const l = Math.floor(a / r) % 32;
        const n = ((a % r) / r) * 2 - 1;
        const i = l % 4;
        const s = Math.floor(l / 4);
        const o = 1 & s ? 1 : -1;
        const c = 2 & s ? 1 : -1;
        const d = 4 & s ? 1 : -1;

        let m = 0, x = 0, u = 0, f = 0;
        if (0 === i) { m = n; x = o; u = c; f = d; }
        else if (1 === i) { m = o; x = n; u = c; f = d; }
        else if (2 === i) { m = o; x = c; u = n; f = d; }
        else { m = o; x = c; u = d; f = n; }

        // Breathing box expansion
        const p = 1 + 0.28 * Math.sin(1.2 * time + 1e-4 * a);
        m *= p; x *= p; u *= p; f *= p;

        // 4D Rotations
        const g = 0.8 * time;
        const b = Math.cos(g);
        const w = Math.sin(g);
        const y = m * b - f * w;
        const v = m * w + f * b;

        const E = 0.8 * time * 0.618;
        const k = Math.cos(E);
        const S = Math.sin(E);
        const C = x * k - u * S;

        const z = 0.8 * time * 0.382;
        const T = Math.cos(z);
        const L = Math.sin(z);
        const P = 0.18 * time;

        const rotX = y * T - C * L + 0.15 * Math.sin(1.3 * a + P);
        const rotY = y * L + C * T + 0.15 * Math.cos(1.7 * a - P);
        const rotZ = x * S + u * k + 0.15 * Math.sin(2.1 * a + P);

        // Perspective projection from 4D to 3D (grand cinematic scale)
        const B = 1 / (3.8 - v + 1e-4);
        const x3d = rotX * B * 260 * baseScale;
        const y3d = rotY * B * 260 * baseScale;
        const z3d = rotZ * B * 260 * baseScale;

        // 3D Perspective projection to 2D
        const fov = 600;
        const proj = fov / (fov + z3d);
        const screenX = cx + x3d * proj;
        const screenY = cy + y3d * proj;

        const alpha = Math.min(Math.max(0.22, (0.55 + 0.55 * B)), 0.95);
        const dotSize = Math.max(1.2, Math.min(3.6, (1.8 * proj)));

        ctx.beginPath();
        ctx.arc(screenX, screenY, dotSize, 0, Math.PI * 2);

        // Highlight corner nodes and edges with subtle luminous glow
        if (a % 24 === 0) {
          ctx.fillStyle = `rgba(147, 197, 253, ${alpha})`;
          ctx.shadowColor = "#60a5fa";
          ctx.shadowBlur = 8;
        } else {
          ctx.fillStyle = `rgba(255, 255, 255, ${alpha * 0.85})`;
          ctx.shadowBlur = 0;
        }
        ctx.fill();
        ctx.shadowBlur = 0;
      }
    };

    render();

    const handleResize = () => {
      if (!canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.scale(dpr, dpr);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleCopy = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2400);
  };

  // Split email into username and domain for styling the @ symbol
  const emailParts = email.split("@");
  const username = emailParts[0];
  const domain = emailParts[1] || "gmail.com";

  return (
    <section id="contact-grand" className="relative w-full overflow-hidden bg-black text-white pt-24 pb-20">
      <div className="mx-auto max-w-7xl px-6 sm:px-10">

        {/* ── TOP EYEBROW ROW (Image 1) ── */}
        <div className="flex items-center justify-between font-mono text-[0.6875rem] uppercase tracking-[0.25em] text-blue-400 mb-12 sm:mb-16">
          <div className="flex items-center gap-2">
            <span>—</span>
            <ScrambleText>GET IN TOUCH</ScrambleText>
          </div>
          <div className="flex items-center gap-2 text-blue-400/90">
            <span className="h-1.5 w-1.5 rounded-full bg-blue-400 animate-pulse" />
            <ScrambleText>NOW ACCEPTING INQUIRIES</ScrambleText>
          </div>
        </div>

        {/* ── GIANT EMAIL HEADLINE WITH 3D PARTICLE CLOUD (Image 1) ── */}
        <div className="relative flex items-center justify-center py-12 sm:py-20 group">
          {/* Ambient 3D Rotating Particle Cloud */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-70"
          >
            <canvas ref={canvasRef} className="w-full h-full max-w-3xl" />
          </div>

          {/* Email Clickable / Copy Trigger */}
          <button
            type="button"
            onClick={handleCopy}
            title="Click to copy email address"
            className="relative z-10 text-center transition-transform duration-300 group-hover:scale-[1.02] outline-none"
          >
            <h2 className="text-3xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight leading-none text-white select-all">
              <span>{username}</span>
              <span className="text-blue-500 drop-shadow-[0_0_25px_rgba(59,130,246,0.8)]">@</span>
              <span>{domain}</span>
            </h2>

            {/* Hover / Copied Tooltip Badge */}
            <div className="mt-4 inline-flex items-center gap-2 font-mono text-[0.65rem] uppercase tracking-[0.2em] px-3.5 py-1.5 rounded-full border border-white/10 bg-zinc-950/80 text-zinc-400 group-hover:border-blue-400/50 group-hover:text-blue-300 transition-all backdrop-blur-md">
              {copied ? (
                <>
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-ping" />
                  <span className="text-emerald-300 font-semibold">COPIED TO CLIPBOARD ✓</span>
                </>
              ) : (
                <>
                  <span className="h-1.5 w-1.5 rounded-full bg-blue-400" />
                  <span>CLICK TO COPY OR TRANSMIT</span>
                </>
              )}
            </div>
          </button>
        </div>

        {/* ── MARQUEE TICKER (Image 1) ── */}
        <div className="relative w-full overflow-hidden border-y border-white/10 py-3.5 my-8">
          <div className="flex whitespace-nowrap font-mono text-[0.6875rem] uppercase tracking-[0.25em] text-zinc-400 animate-ticker">
            <span className="inline-block px-4">
              FRIENDLY · REPLIES WITHIN 24 HOURS · TIMEZONE (UTC+5:30) · OPEN TO COLLABORATIONS · TELL ME WHAT YOU&apos;RE BUILDING · FULL-STACK &amp; AI SYSTEMS
            </span>
            <span className="inline-block px-4" aria-hidden="true">
              · FRIENDLY · REPLIES WITHIN 24 HOURS · TIMEZONE (UTC+5:30) · OPEN TO COLLABORATIONS · TELL ME WHAT YOU&apos;RE BUILDING · FULL-STACK &amp; AI SYSTEMS
            </span>
            <span className="inline-block px-4" aria-hidden="true">
              · FRIENDLY · REPLIES WITHIN 24 HOURS · TIMEZONE (UTC+5:30) · OPEN TO COLLABORATIONS · TELL ME WHAT YOU&apos;RE BUILDING · FULL-STACK &amp; AI SYSTEMS
            </span>
          </div>
        </div>

        {/* ── 4 LARGE GLASS SOCIAL CARDS (Image 1) ── */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 mt-12">
          {/* Card 1: GITHUB */}
          <a
            href={PORTFOLIO_DATA.owner.contact.github}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex flex-col items-center justify-center p-8 rounded-2xl border border-white/10 bg-white/[0.02] hover:border-blue-400/50 hover:bg-white/[0.05] hover:shadow-[0_15px_35px_-10px_rgba(59,130,246,0.3)] transition-all duration-300"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/5 text-zinc-300 group-hover:text-white group-hover:scale-110 group-hover:bg-white/10 transition-all duration-300">
              <svg className="h-6 w-6 fill-current" viewBox="0 0 24 24">
                <path d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.1-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2Z" />
              </svg>
            </div>
            <span className="mt-4 font-mono text-xs uppercase tracking-[0.25em] text-zinc-400 group-hover:text-white transition-colors">
              GITHUB
            </span>
          </a>

          {/* Card 2: LINKEDIN */}
          <a
            href={PORTFOLIO_DATA.owner.contact.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex flex-col items-center justify-center p-8 rounded-2xl border border-white/10 bg-white/[0.02] hover:border-blue-400/50 hover:bg-white/[0.05] hover:shadow-[0_15px_35px_-10px_rgba(59,130,246,0.3)] transition-all duration-300"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/5 text-blue-400 group-hover:text-white group-hover:scale-110 group-hover:bg-blue-600/30 transition-all duration-300">
              <svg className="h-6 w-6 fill-current" viewBox="0 0 24 24">
                <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.2V10.9H6.46M7.83 6.45a1.63 1.63 0 0 0-1.63 1.63c0 .9.73 1.63 1.63 1.63.9 0 1.63-.73 1.63-1.63 0-.9-.73-1.63-1.63-1.63Z" />
              </svg>
            </div>
            <span className="mt-4 font-mono text-xs uppercase tracking-[0.25em] text-zinc-400 group-hover:text-white transition-colors">
              LINKEDIN
            </span>
          </a>

          {/* Card 3: WHATSAPP / DIRECT */}
          <a
            href={`https://wa.me/919022318711?text=${encodeURIComponent("Hi Eliyas, I saw your portfolio and would like to connect.")}`}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex flex-col items-center justify-center p-8 rounded-2xl border border-white/10 bg-white/[0.02] hover:border-emerald-500/50 hover:bg-white/[0.05] hover:shadow-[0_15px_35px_-10px_rgba(16,185,129,0.3)] transition-all duration-300"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/5 text-emerald-400 group-hover:text-white group-hover:scale-110 group-hover:bg-emerald-600/30 transition-all duration-300">
              <svg className="h-6 w-6 fill-current" viewBox="0 0 24 24">
                <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91C2.13 13.66 2.59 15.36 3.45 16.86L2.05 22L7.3 20.62C8.75 21.41 10.38 21.83 12.04 21.83C17.5 21.83 21.95 17.38 21.95 11.92C21.95 9.27 20.92 6.78 19.05 4.91C17.18 3.03 14.69 2 12.04 2M12.05 3.67C14.25 3.67 16.31 4.53 17.87 6.09C19.42 7.65 20.28 9.72 20.28 11.92C20.28 16.46 16.58 20.15 12.04 20.15C10.56 20.15 9.11 19.76 7.85 19L7.55 18.83L4.43 19.65L5.26 16.61L5.06 16.29C4.24 15 3.8 13.47 3.8 11.91C3.81 7.37 7.5 3.67 12.05 3.67M9.13 7.08C8.95 7.08 8.66 7.15 8.41 7.42C8.16 7.69 7.46 8.35 7.46 9.7C7.46 11.05 8.44 12.35 8.58 12.53C8.72 12.71 10.5 15.47 13.23 16.65C13.88 16.93 14.38 17.1 14.78 17.22C15.43 17.43 16.03 17.4 16.5 17.33C17.03 17.25 18.12 16.67 18.35 16.03C18.58 15.39 18.58 14.84 18.51 14.73C18.44 14.62 18.26 14.55 17.98 14.41C17.71 14.28 16.38 13.62 16.13 13.53C15.88 13.44 15.7 13.39 15.52 13.67C15.34 13.94 14.82 14.55 14.66 14.73C14.5 14.92 14.34 14.94 14.07 14.81C13.8 14.67 12.92 14.38 11.88 13.45C11.07 12.73 10.52 11.84 10.36 11.57C10.2 11.3 10.34 11.15 10.48 11.01C10.6 10.89 10.75 10.7 10.89 10.54C11.03 10.38 11.07 10.27 11.16 10.09C11.25 9.9 11.21 9.75 11.14 9.61C11.07 9.47 10.55 8.21 10.34 7.69C10.13 7.18 9.92 7.25 9.77 7.24C9.62 7.24 9.44 7.08 9.13 7.08Z" />
              </svg>
            </div>
            <span className="mt-4 font-mono text-xs uppercase tracking-[0.25em] text-zinc-400 group-hover:text-white transition-colors">
              WHATSAPP
            </span>
          </a>

          {/* Card 4: RESUME / TRANSMIT */}
          <a
            href={`mailto:${email}?subject=Collaboration%20Inquiry%20from%20Portfolio`}
            className="group flex flex-col items-center justify-center p-8 rounded-2xl border border-white/10 bg-white/[0.02] hover:border-blue-400/50 hover:bg-white/[0.05] hover:shadow-[0_15px_35px_-10px_rgba(59,130,246,0.3)] transition-all duration-300"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/5 text-amber-400 group-hover:text-white group-hover:scale-110 group-hover:bg-amber-600/30 transition-all duration-300">
              <svg className="h-6 w-6 fill-none stroke-current" strokeWidth={1.8} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
              </svg>
            </div>
            <span className="mt-4 font-mono text-xs uppercase tracking-[0.25em] text-zinc-400 group-hover:text-white transition-colors">
              EMAIL DISPATCH
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}
