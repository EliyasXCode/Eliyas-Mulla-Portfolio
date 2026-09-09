"use client";

import React, { useState } from "react";
import { Navbar } from "./Navbar";
import { ContactModal } from "./ContactModal";
import { CursorDot } from "./CursorDot";
import { SmoothScroll } from "./SmoothScroll";

export function ClientChrome({ children }: { children: React.ReactNode }) {
  const [contactOpen, setContactOpen] = useState(false);

  return (
    <SmoothScroll>
      <CursorDot />
      <Navbar onOpenContact={() => setContactOpen(true)} />
      {children}
      <ContactModal isOpen={contactOpen} onClose={() => setContactOpen(false)} />
    </SmoothScroll>
  );
}
