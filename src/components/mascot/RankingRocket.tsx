"use client";

import React, { useState } from "react";
import { motion, useAnimation } from "framer-motion";
import confetti from "canvas-confetti";

export default function RankingRocket({ className = "w-48 h-48" }: { className?: string }) {
  const [isHovered, setIsHovered] = useState(false);
  const [isLaunching, setIsLaunching] = useState(false);
  const controls = useAnimation();

  const handleLaunch = async () => {
    setIsLaunching(true);
    // Confetti burst from bottom of rocket!
    confetti({
      particleCount: 80,
      spread: 60,
      origin: { y: 0.8, x: 0.5 },
      colors: ["#2E4ED8", "#5A6EF5", "#FFE52B", "#FFFFFF"],
    });

    // Trigger easter egg
    import("../EasterEggs").then((mod) => {
      mod.unlockAchievement("rocket-scientist");
    });

    // Launch animation sequence
    await controls.start({
      y: [0, -15, -25, -600],
      scaleY: [1, 1.1, 1.2, 0.8],
      scaleX: [1, 0.9, 0.8, 0.5],
      opacity: [1, 1, 1, 0],
      transition: { duration: 0.9, ease: "easeIn" },
    });

    // Return sequence
    await controls.start({
      y: 600,
      scaleY: 0.5,
      scaleX: 1.5,
      opacity: 0,
      transition: { duration: 0 },
    });

    await controls.start({
      y: [600, -20, 0],
      scaleY: [0.5, 1.2, 1],
      scaleX: [1.5, 0.8, 1],
      opacity: [0, 1, 1],
      transition: { duration: 0.8, ease: "easeOut" },
    });
    setIsLaunching(false);
  };

  return (
    <div className={`${className} relative select-none cursor-pointer`}>
      <motion.div
        animate={controls}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={handleLaunch}
        className="w-full h-full"
      >
        <motion.svg
          viewBox="0 0 200 200"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full"
          animate={
            isHovered
              ? {
                  x: [0, -1, 1, -1, 1, 0],
                  y: [0, 1, -1, 1, -1, 0],
                }
              : {}
          }
          transition={{ duration: 0.15, repeat: Infinity }}
        >
          {/* Shadow */}
          <ellipse
            cx="100"
            cy="185"
            rx={isHovered ? "20" : "30"}
            ry="4"
            fill="rgba(30, 41, 59, 0.15)"
            className="dark:fill-slate-900/40"
          />

          {/* Flames (Visible on hover or launching) */}
          {(isHovered || isLaunching) && (
            <g>
              {/* Outer Flame */}
              <motion.path
                d="M 90 145 C 80 175, 100 195, 100 195 C 100 195, 120 175, 110 145 Z"
                fill="#FFE52B"
                animate={{ scaleY: [1, 1.4, 0.8, 1.2, 1] }}
                transition={{ duration: 0.3, repeat: Infinity }}
                className="origin-top"
              />
              {/* Inner Flame */}
              <motion.path
                d="M 94 145 C 88 165, 100 180, 100 180 C 100 180, 112 165, 106 145 Z"
                fill="#FFFFFF"
                animate={{ scaleY: [1, 1.2, 0.9, 1.3, 1] }}
                transition={{ duration: 0.25, repeat: Infinity }}
                className="origin-top"
              />
              {/* Left Thruster Flame */}
              <motion.path
                d="M 68 140 C 62 160, 72 170, 72 170 C 72 170, 82 160, 76 140 Z"
                fill="#5A6EF5"
                animate={{ scaleY: [1, 1.3, 0.8, 1.1, 1] }}
                transition={{ duration: 0.35, repeat: Infinity }}
                className="origin-top"
              />
              {/* Right Thruster Flame */}
              <motion.path
                d="M 124 140 C 118 160, 128 170, 128 170 C 128 170, 138 160, 132 140 Z"
                fill="#5A6EF5"
                animate={{ scaleY: [1, 1.3, 0.8, 1.1, 1] }}
                transition={{ duration: 0.35, repeat: Infinity }}
                className="origin-top"
              />
            </g>
          )}

          {/* Rocket Body */}
          {/* Fins / Boosters */}
          <path d="M 65 110 L 45 145 L 75 140 Z" fill="#2E4ED8" stroke="#1F2937" strokeWidth="4" strokeLinejoin="round" />
          <path d="M 135 110 L 155 145 L 125 140 Z" fill="#2E4ED8" stroke="#1F2937" strokeWidth="4" strokeLinejoin="round" />

          {/* Center Fin */}
          <path d="M 100 110 L 100 148" stroke="#1F2937" strokeWidth="5" strokeLinecap="round" />

          {/* Main Hull */}
          <path
            d="M 100 20 C 70 70, 65 110, 65 145 L 135 145 C 135 110, 130 70, 100 20 Z"
            fill="#FFFFFF"
            stroke="#1F2937"
            strokeWidth="4"
            strokeLinejoin="round"
          />

          {/* Accent stripes */}
          <path d="M 70 95 C 80 100, 120 100, 130 95" stroke="#2E4ED8" strokeWidth="4" fill="none" />
          <path d="M 67 115 C 80 120, 120 120, 133 115" stroke="#2E4ED8" strokeWidth="4" fill="none" />

          {/* Porthole Window */}
          <circle cx="100" cy="75" r="22" fill="#2E4ED8" stroke="#1F2937" strokeWidth="4" />
          <circle cx="100" cy="75" r="16" fill="#FFE52B" />
          
          {/* Glass glare in porthole */}
          <path d="M 88 70 Q 100 60, 112 70" fill="#FFFFFF" opacity="0.6" />

          {/* Cute face inside window */}
          <g>
            {/* Left Eye */}
            <circle cx="95" cy="75" r="2.5" fill="#1F2937" />
            {/* Right Eye */}
            <circle cx="105" cy="75" r="2.5" fill="#1F2937" />
            {/* Smile */}
            <path d="M 97 79 Q 100 82, 103 79" stroke="#1F2937" strokeWidth="1.5" fill="none" />
          </g>

          {/* Nose cone tip */}
          <path
            d="M 100 20 C 85 45, 115 45, 100 20 Z"
            fill="#2E4ED8"
            stroke="#1F2937"
            strokeWidth="4"
            strokeLinejoin="round"
          />
          <circle cx="100" cy="35" r="4" fill="#FFE52B" />
        </motion.svg>
      </motion.div>
      {/* Sparkles around rocket when hovered */}
      {isHovered && (
        <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
          <div className="w-full h-full relative">
            <span className="absolute top-2 left-6 text-yellow-400 text-lg animate-bounce">★</span>
            <span className="absolute top-10 right-6 text-blue-500 text-sm animate-pulse">✦</span>
            <span className="absolute bottom-8 left-4 text-amber-500 text-md animate-ping">✨</span>
          </div>
        </div>
      )}
    </div>
  );
}
