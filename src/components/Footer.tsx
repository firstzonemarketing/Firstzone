"use client";

import React from "react";
import { Heart, Code, ShieldCheck } from "lucide-react";

export default function Footer() {
  return (
    <footer className="relative z-10 border-t border-primary-blue/15 glassmorphism-card py-12 px-6 text-center text-xs font-bold text-foreground/80 select-none shadow-2xl">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        
        {/* Left: Copyright Notice */}
        <div className="flex flex-col items-center md:items-start gap-1">
          <span className="tracking-wide text-foreground/75 font-bold">
            © 2026 First Zone Digital Marketing. All rights reserved.
          </span>
          <span className="text-[11px] text-primary-blue dark:text-accent-blue font-extrabold tracking-wider uppercase flex items-center gap-1">
            <ShieldCheck size={13} className="text-amber-500" />
            Registered MSME Enterprise • Govt. of India
          </span>
        </div>

        {/* Center: Official MSME Logo Badge */}
        <div className="flex items-center gap-3 bg-slate-950/90 dark:bg-slate-900/90 px-4 py-2.5 rounded-2xl border border-amber-500/30 shadow-xl hover:border-amber-400/60 transition-all duration-300 group">
          <img
            src="/msme_logo.jpg"
            alt="Ministry of MSME, Govt. of India"
            className="h-10 sm:h-12 w-auto object-contain rounded-lg group-hover:scale-105 transition-transform duration-300"
          />
        </div>

        {/* Right: Developer Credit */}
        <div className="flex items-center gap-2 bg-primary-blue/10 dark:bg-slate-800/80 px-4 py-2 rounded-full border border-primary-blue/20 shadow-md">
          <span className="text-foreground font-black flex items-center gap-1.5 text-xs sm:text-sm">
            Made with <Heart size={15} className="text-red-500 fill-red-500 animate-pulse" /> by the{" "}
            <a
              href="/admin-leads"
              className="text-primary-blue dark:text-accent-blue hover:underline font-black flex items-center gap-1 tracking-tight"
              data-cursor="pointer"
            >
              <Code size={14} className="text-primary-blue" />
              First Zone Developing Team
            </a>
          </span>
        </div>

      </div>
    </footer>
  );
}
