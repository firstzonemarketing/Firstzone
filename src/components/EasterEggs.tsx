"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Award, Sparkles, X } from "lucide-react";
import confetti from "canvas-confetti";

interface Achievement {
  id: string;
  title: string;
  description: string;
  emoji: string;
}

export default function EasterEggs() {
  const [activeNotification, setActiveNotification] = useState<Achievement | null>(null);
  const [unlockedIds, setUnlockedIds] = useState<string[]>([]);
  const [showIdleMascot, setShowIdleMascot] = useState(false);

  // Inactivity wave setup (10s)
  useEffect(() => {
    let idleTimer: NodeJS.Timeout;

    const resetIdleTimer = () => {
      setShowIdleMascot(false);
      clearTimeout(idleTimer);
      idleTimer = setTimeout(() => {
        setShowIdleMascot(true);
        // Unlock Inactivity Waver achievement!
        triggerAchievement("idle-waver");
      }, 10000); // 10 seconds of absolute mouse/keyboard inactivity
    };

    window.addEventListener("mousemove", resetIdleTimer);
    window.addEventListener("keydown", resetIdleTimer);
    window.addEventListener("click", resetIdleTimer);
    window.addEventListener("scroll", resetIdleTimer);

    // Initial trigger
    resetIdleTimer();

    return () => {
      window.removeEventListener("mousemove", resetIdleTimer);
      window.removeEventListener("keydown", resetIdleTimer);
      window.removeEventListener("click", resetIdleTimer);
      window.removeEventListener("scroll", resetIdleTimer);
      clearTimeout(idleTimer);
    };
  }, []);

  // Listen for custom achievement event triggers
  useEffect(() => {
    const handleAchievementUnlock = (e: Event) => {
      const customEvent = e as CustomEvent<{ id: string }>;
      const id = customEvent.detail?.id;
      if (id) triggerAchievement(id);
    };

    window.addEventListener("unlock-achievement", handleAchievementUnlock);
    return () => window.removeEventListener("unlock-achievement", handleAchievementUnlock);
  }, []);

  const triggerAchievement = (id: string) => {
    // Avoid double unlock
    if (unlockedIds.includes(id)) return;

    const achievementsMap: Record<string, Achievement> = {
      "confetti-connoisseur": {
        id: "confetti-connoisseur",
        title: "Confetti Blast Master",
        description: "You clicked the First Zone logo and deployed a full color burst!",
        emoji: "🎉",
      },
      "rocket-scientist": {
        id: "rocket-scientist",
        title: "Rocket Command Officer",
        description: "You launched the Google ranking rocket into space orbits!",
        emoji: "🚀",
      },
      "idle-waver": {
        id: "idle-waver",
        title: "Patience Explorer",
        description: "You took a breather and noticed our friendly astronaut waving!",
        emoji: "👋",
      },
    };

    const achievement = achievementsMap[id];
    if (achievement) {
      setUnlockedIds((prev) => [...prev, id]);
      setActiveNotification(achievement);
      
      // Blast light victory confetti!
      confetti({
        particleCount: 40,
        spread: 30,
        origin: { x: 0.1, y: 0.8 },
        colors: ["#2E4ED8", "#5A6EF5", "#FFE52B", "#FFFFFF"],
      });

      // Clear after 5 seconds
      setTimeout(() => {
        setActiveNotification(null);
      }, 5000);
    }
  };

  return (
    <>
      {/* Achievement Unlocked Pop-up notification (Bottom-Left) */}
      <AnimatePresence>
        {activeNotification && (
          <motion.div
            className="fixed bottom-6 left-6 z-50 p-5 rounded-2xl glassmorphism border-2 border-primary-blue shadow-2xl flex items-center gap-4 max-w-sm select-none"
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ type: "spring", stiffness: 150, damping: 15 }}
          >
            <div className="w-12 h-12 rounded-xl bg-primary-blue text-bg-yellow flex items-center justify-center text-2xl flex-shrink-0 shadow">
              {activeNotification.emoji}
            </div>
            <div className="flex-1 pr-6">
              <span className="text-[10px] font-black text-primary-blue dark:text-accent-blue tracking-wider uppercase flex items-center gap-1">
                <Award size={10} /> ACHIEVEMENT UNLOCKED!
              </span>
              <h4 className="font-extrabold text-foreground text-sm leading-tight mt-0.5">
                {activeNotification.title}
              </h4>
              <p className="text-[11px] text-foreground/80 leading-relaxed font-semibold mt-1">
                {activeNotification.description}
              </p>
            </div>
            <button
              onClick={() => setActiveNotification(null)}
              className="absolute top-2.5 right-2.5 w-6 h-6 rounded-full bg-foreground/5 hover:bg-foreground/10 text-foreground flex items-center justify-center"
            >
              <X size={12} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Idle waving Mascot Overlay (Center Right peeking out) */}
      <AnimatePresence>
        {showIdleMascot && (
          <motion.div
            className="fixed bottom-24 right-0 z-30 select-none pointer-events-none translate-x-12 flex flex-col items-center"
            initial={{ x: 100 }}
            animate={{ x: 0 }}
            exit={{ x: 100 }}
            transition={{ type: "spring", damping: 15 }}
          >
            <div className="bg-white-custom dark:bg-slate-800 text-[10px] font-black border border-primary-blue/20 shadow-md py-1.5 px-3 rounded-full mb-1 animate-bounce pointer-events-auto">
              Psst... Still there? 👋
            </div>
            
            {/* Simple Waving Astronaut SVG peeking */}
            <svg
              viewBox="0 0 100 100"
              className="w-24 h-24 drop-shadow-md pointer-events-auto cursor-pointer"
              onClick={() => setShowIdleMascot(false)}
            >
              <circle cx="50" cy="50" r="30" fill="#FFFFFF" stroke="#1F2937" strokeWidth="3" />
              <ellipse cx="50" cy="48" rx="22" ry="16" fill="#1F2937" />
              <ellipse cx="50" cy="48" rx="18" ry="12" fill="#2E4ED8" />
              {/* Cute Waving Arm */}
              <motion.path
                d="M 24 50 C 14 45, 10 30, 20 20"
                stroke="#FFFFFF"
                strokeWidth="8"
                strokeLinecap="round"
                animate={{ rotate: [0, 20, -10, 20, 0] }}
                transition={{ duration: 1.2, repeat: Infinity }}
                className="origin-[24px_50px]"
              />
              <path d="M 24 50 C 14 45, 10 30, 20 20" stroke="#1F2937" strokeWidth="2.5" fill="none" strokeLinecap="round" />
            </svg>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

// Global window dispatcher helper to trigger easter eggs
export function unlockAchievement(id: string) {
  if (typeof window !== "undefined") {
    const event = new CustomEvent("unlock-achievement", { detail: { id } });
    window.dispatchEvent(event);
  }
}
