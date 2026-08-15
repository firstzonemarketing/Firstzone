"use client";

import React from "react";
import { Heart, Code, ShieldCheck } from "lucide-react";

export default function Footer() {
  return (
    <footer className="relative z-10 border-t border-primary-blue/15 glassmorphism-card py-12 px-6 text-center text-xs font-bold text-foreground/80 select-none shadow-2xl">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        
        {/* Left: Copyright & MSME Tag */}
        <div className="flex flex-col items-center md:items-start gap-1">
          <span className="tracking-wide text-foreground/75 font-bold">
            © 2026 First Zone Digital Marketing. All rights reserved.
          </span>
          <span className="text-[11px] text-primary-blue dark:text-accent-blue font-extrabold tracking-wider uppercase flex items-center gap-1">
            <ShieldCheck size={13} className="text-amber-500" />
            Registered MSME Enterprise • Govt. of India
          </span>
        </div>

        {/* Center: Distinct White Box Container for MSME Logo with Black Text */}
        <div className="bg-white text-slate-950 px-5 py-2.5 rounded-2xl border-2 border-slate-200 shadow-xl flex items-center gap-3.5 hover:shadow-2xl hover:scale-[1.03] transition-all duration-300 select-none cursor-default">
          {/* MSME Emblem Image */}
          <div className="flex-shrink-0 flex items-center justify-center">
            <img
              src="/msme_logo.svg"
              alt="Ministry of MSME, Govt. of India"
              className="h-10 sm:h-11 w-auto object-contain"
            />
          </div>

          {/* Black Text Container */}
          <div className="flex flex-col text-left border-l-2 border-slate-300 pl-3.5">
            <div className="flex items-center gap-1.5">
              <span className="text-sm font-black text-black tracking-tight uppercase leading-none">
                MSME
              </span>
              <span className="text-[9px] font-black bg-slate-900 text-white px-1.5 py-0.5 rounded uppercase tracking-wider">
                Govt. Registered
              </span>
            </div>
            <span className="text-[10px] font-extrabold text-black uppercase tracking-tight leading-tight mt-1">
              Micro, Small & Medium Enterprises
            </span>
            <span className="text-[9px] font-bold text-slate-700 tracking-wide mt-0.5">
              Ministry of MSME • Govt. of India
            </span>
          </div>
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
