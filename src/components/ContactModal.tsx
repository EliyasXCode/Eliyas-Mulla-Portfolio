"use client";

import React, { useState, useEffect } from "react";
import { PORTFOLIO_DATA } from "@/data/portfolioData";
import { ScrambleText } from "./ScrambleText";

export function ContactModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose]);

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(label);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const mailto = `mailto:${PORTFOLIO_DATA.owner.contact.email}?subject=Inquiry from ${encodeURIComponent(
      formData.name
    )}&body=${encodeURIComponent(formData.message)}%0A%0AReply to: ${encodeURIComponent(formData.email)}`;
    window.location.href = mailto;
    setSent(true);
    setTimeout(() => {
      setSent(false);
      onClose();
    }, 2000);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-xl overflow-hidden rounded-2xl border border-white/15 bg-zinc-950 p-6 sm:p-8 text-white shadow-[0_25px_70px_-15px_rgba(0,0,0,0.9)]">
        {/* Top HUD Line */}
        <div className="flex items-center justify-between border-b border-white/10 pb-4">
          <div className="flex items-center gap-3 font-mono text-[0.6875rem] uppercase tracking-[0.2em] text-zinc-400">
            <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
            <ScrambleText>/ Contact & Dispatch</ScrambleText>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close modal"
            className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/10 text-zinc-400 hover:border-white/30 hover:text-white transition-colors"
          >
            ✕
          </button>
        </div>

        {/* Content */}
        <div className="mt-6 flex flex-col gap-6">
          <div>
            <h2 className="text-2xl font-bold uppercase tracking-tight text-white sm:text-3xl font-mono">
              Initiate Transmission
            </h2>
            <p className="mt-1 text-sm text-zinc-400">
              Open for full-stack engineering roles, AI projects, and technical collaborations.
            </p>
          </div>

          {/* Quick Contact Links Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 font-mono text-xs">
            <button
              type="button"
              onClick={() => copyToClipboard(PORTFOLIO_DATA.owner.contact.email, "email")}
              className="flex items-center justify-between p-3 rounded-xl border border-white/10 bg-white/[0.03] hover:border-blue-400/50 hover:bg-white/[0.06] transition-all text-left group"
            >
              <div className="truncate">
                <span className="block text-[0.625rem] text-zinc-500 uppercase tracking-widest">Email</span>
                <span className="text-zinc-200 group-hover:text-blue-400 truncate block">
                  {PORTFOLIO_DATA.owner.contact.email}
                </span>
              </div>
              <span className="text-[0.625rem] text-zinc-400 uppercase tracking-wider ml-2 shrink-0">
                {copiedField === "email" ? "COPIED" : "COPY"}
              </span>
            </button>

            <button
              type="button"
              onClick={() => copyToClipboard(PORTFOLIO_DATA.owner.contact.phone, "phone")}
              className="flex items-center justify-between p-3 rounded-xl border border-white/10 bg-white/[0.03] hover:border-blue-400/50 hover:bg-white/[0.06] transition-all text-left group"
            >
              <div>
                <span className="block text-[0.625rem] text-zinc-500 uppercase tracking-widest">Phone / WhatsApp</span>
                <span className="text-zinc-200 group-hover:text-blue-400 block">
                  {PORTFOLIO_DATA.owner.contact.phone}
                </span>
              </div>
              <span className="text-[0.625rem] text-zinc-400 uppercase tracking-wider ml-2 shrink-0">
                {copiedField === "phone" ? "COPIED" : "COPY"}
              </span>
            </button>
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-3">
            <a
              href={PORTFOLIO_DATA.owner.contact.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 py-2.5 px-4 rounded-xl border border-white/10 bg-white/[0.02] hover:border-white/30 text-center font-mono text-xs uppercase tracking-wider text-zinc-300 hover:text-white transition-colors"
            >
              GitHub ↗
            </a>
            <a
              href={PORTFOLIO_DATA.owner.contact.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 py-2.5 px-4 rounded-xl border border-white/10 bg-white/[0.02] hover:border-white/30 text-center font-mono text-xs uppercase tracking-wider text-zinc-300 hover:text-white transition-colors"
            >
              LinkedIn ↗
            </a>
          </div>

          {/* Direct Message Form */}
          <form onSubmit={handleSubmit} className="flex flex-col gap-3 pt-2">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <input
                type="text"
                required
                placeholder="Your Name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full rounded-xl border border-white/10 bg-zinc-900/80 px-4 py-2.5 text-sm text-white placeholder-zinc-500 focus:border-blue-500 focus:outline-none"
              />
              <input
                type="email"
                required
                placeholder="Your Email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full rounded-xl border border-white/10 bg-zinc-900/80 px-4 py-2.5 text-sm text-white placeholder-zinc-500 focus:border-blue-500 focus:outline-none"
              />
            </div>
            <textarea
              required
              rows={3}
              placeholder="Your Message..."
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              className="w-full rounded-xl border border-white/10 bg-zinc-900/80 px-4 py-2.5 text-sm text-white placeholder-zinc-500 focus:border-blue-500 focus:outline-none resize-none"
            />
            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-blue-600 font-mono text-xs font-semibold uppercase tracking-[0.2em] text-white hover:bg-blue-500 transition-colors shadow-[0_0_20px_rgba(59,130,246,0.5)]"
            >
              {sent ? "Message Prepared ✓" : "Send Dispatch →"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
