"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ScrambleText } from "./ScrambleText";
import { PORTFOLIO_DATA } from "@/data/portfolioData";

export function Navbar({ onOpenContact }: { onOpenContact?: () => void }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  const leftLinks = PORTFOLIO_DATA.nav.links.filter((l) => l.side === "left");
  const rightLinks = PORTFOLIO_DATA.nav.links.filter((l) => l.side === "right");

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 flex items-center justify-between px-6 pb-5 pt-[calc(1.25rem+env(safe-area-inset-top))] sm:px-10 bg-gradient-to-b from-black/80 via-black/40 to-transparent backdrop-blur-[2px]">
        {/* Left Nav */}
        <nav className="hidden items-center gap-6 sm:flex sm:gap-8">
          {leftLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`text-xs font-medium uppercase tracking-[0.18em] transition-colors ${
                  isActive ? "text-blue-400" : "text-zinc-300 hover:text-white"
                }`}
              >
                <ScrambleText>{link.label}</ScrambleText>
              </Link>
            );
          })}
        </nav>

        {/* Center Monogram Logo */}
        <Link
          href="/"
          aria-label={PORTFOLIO_DATA.nav.wordmark.homeAriaLabel}
          className="absolute left-1/2 -translate-x-1/2 group flex items-center justify-center"
        >
          <div className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-zinc-900/90 border border-white/15 shadow-[0_0_20px_rgba(59,130,246,0.15)] transition-all duration-300 group-hover:border-blue-400/50 group-hover:shadow-[0_0_25px_rgba(59,130,246,0.35)] group-hover:scale-105">
            <span className="font-mono text-sm font-black tracking-tighter text-white group-hover:text-blue-400 transition-colors">
              EM
            </span>
            <span className="absolute -bottom-1 h-0.5 w-3 bg-blue-500 rounded-full opacity-60 group-hover:w-5 group-hover:opacity-100 transition-all duration-300" />
          </div>
        </Link>

        {/* Right Nav */}
        <nav className="hidden items-center gap-6 sm:flex sm:gap-8">
          {rightLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`text-xs font-medium uppercase tracking-[0.18em] transition-colors ${
                  isActive ? "text-blue-400" : "text-zinc-300 hover:text-white"
                }`}
              >
                <ScrambleText>{link.label}</ScrambleText>
              </Link>
            );
          })}
          {onOpenContact && (
            <button
              onClick={onOpenContact}
              type="button"
              className="ml-2 px-3 py-1 rounded-full text-[0.65rem] font-mono uppercase tracking-[0.15em] bg-white/5 border border-white/10 text-zinc-300 hover:text-white hover:border-blue-400/50 transition-all"
            >
              Contact
            </button>
          )}
          <a
            href={PORTFOLIO_DATA.owner.contact.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn Profile"
            className="flex items-center gap-1.5 px-3 py-1 rounded-full text-[0.65rem] font-mono uppercase tracking-[0.15em] bg-blue-600/15 border border-blue-500/40 text-blue-300 hover:text-white hover:bg-blue-600/25 hover:border-blue-400 transition-all shadow-[0_0_12px_rgba(59,130,246,0.2)]"
          >
            <svg className="h-3 w-3 fill-current" viewBox="0 0 24 24">
              <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.2V10.9H6.46M7.83 6.45a1.63 1.63 0 0 0-1.63 1.63c0 .9.73 1.63 1.63 1.63.9 0 1.63-.73 1.63-1.63 0-.9-.73-1.63-1.63-1.63Z" />
            </svg>
            <span>LinkedIn</span>
          </a>
        </nav>

        {/* Mobile Hamburger Button */}
        <button
          type="button"
          aria-label="Toggle menu"
          onClick={() => setMobileOpen(!mobileOpen)}
          className="ml-auto flex h-10 w-10 items-center justify-center text-zinc-300 hover:text-white sm:hidden relative z-50"
        >
          <span className="relative block h-3.5 w-5">
            <span
              className={`absolute left-0 block h-0.5 w-5 bg-current transition-transform duration-300 ${
                mobileOpen ? "top-1.5 rotate-45" : "top-0"
              }`}
            />
            <span
              className={`absolute left-0 block h-0.5 w-5 bg-current transition-transform duration-300 ${
                mobileOpen ? "top-1.5 -rotate-45" : "bottom-0"
              }`}
            />
          </span>
        </button>
      </header>

      {/* Mobile Drawer Menu */}
      <div
        className={`fixed inset-0 z-40 flex flex-col items-center justify-center gap-8 bg-black/95 backdrop-blur-xl transition-all duration-300 sm:hidden ${
          mobileOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        <nav className="flex flex-col items-center gap-7">
          <Link
            href="/"
            onClick={() => setMobileOpen(false)}
            className="text-2xl font-medium uppercase tracking-[0.2em] text-zinc-300 hover:text-white"
          >
            Home
          </Link>
          <Link
            href="/about"
            onClick={() => setMobileOpen(false)}
            className="text-2xl font-medium uppercase tracking-[0.2em] text-zinc-300 hover:text-white"
          >
            About
          </Link>
          <Link
            href="/about#career"
            onClick={() => setMobileOpen(false)}
            className="text-2xl font-medium uppercase tracking-[0.2em] text-zinc-300 hover:text-white"
          >
            Career
          </Link>
          <Link
            href="/projects"
            onClick={() => setMobileOpen(false)}
            className="text-2xl font-medium uppercase tracking-[0.2em] text-zinc-300 hover:text-white"
          >
            Projects
          </Link>
          <Link
            href="/certificates"
            onClick={() => setMobileOpen(false)}
            className="text-2xl font-medium uppercase tracking-[0.2em] text-zinc-300 transition-colors hover:text-white"
          >
            Certificates
          </Link>
          {onOpenContact && (
            <button
              onClick={() => {
                setMobileOpen(false);
                onOpenContact();
              }}
              className="mt-4 px-6 py-2 rounded-full font-mono text-xs uppercase tracking-[0.2em] bg-blue-600 text-white font-semibold shadow-[0_0_15px_rgba(59,130,246,0.5)]"
            >
              Get in Touch
            </button>
          )}
          <a
            href={PORTFOLIO_DATA.owner.contact.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 font-mono text-xs uppercase tracking-[0.2em] text-blue-400 hover:text-white transition-colors"
          >
            <span>LinkedIn Profile ↗</span>
          </a>
        </nav>
      </div>
    </>
  );
}
