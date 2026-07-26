"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";

export default function AstronautSEO({ className = "w-48 h-48" }: { className?: string }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      className={`${className} relative select-none`}
      animate={{
        y: isHovered ? [-5, 5, -5] : [-12, 12, -12],
        rotate: isHovered ? [-1, 1, -1] : [-3, 3, -3],
      }}
      transition={{
        duration: isHovered ? 2 : 5,
        repeat: Infinity,
        ease: "easeInOut",
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <svg
        viewBox="0 0 200 200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full drop-shadow-[0_10px_20px_rgba(46,78,216,0.15)] dark:drop-shadow-[0_10px_20px_rgba(59,130,246,0.3)]"
      >
        {/* Shadow under Astronaut */}
        <ellipse
          cx="100"
          cy="185"
          rx={isHovered ? "45" : "55"}
          ry="6"
          fill="rgba(30, 41, 59, 0.15)"
          className="dark:fill-slate-900/40 transition-all duration-300"
        />

        {/* Space Pack (Backpack) */}
        <rect x="55" y="65" width="90" height="90" rx="15" fill="#2E4ED8" />
        <rect x="65" y="75" width="70" height="70" rx="10" fill="#5A6EF5" />
        <circle cx="75" cy="85" r="5" fill="#FFE52B" />
        <circle cx="90" cy="85" r="5" fill="#FFFFFF" />

        {/* Connection Tube */}
        <path
          d="M 60 110 C 35 120, 25 150, 60 160"
          stroke="#FFE52B"
          strokeWidth="6"
          strokeLinecap="round"
          fill="none"
        />

        {/* Body Suit */}
        <rect x="70" y="90" width="60" height="75" rx="20" fill="#FFFFFF" stroke="#1F2937" strokeWidth="4" />
        {/* Chest Panel */}
        <rect x="80" y="105" width="40" height="30" rx="6" fill="#F5F7FA" stroke="#2E4ED8" strokeWidth="3" />
        {/* Chest controls */}
        <rect x="86" y="112" width="10" height="6" rx="1" fill="#FFE52B" />
        <circle cx="108" cy="115" r="3" fill="#2E4ED8" />
        <circle cx="108" cy="125" r="3" fill="#10B981" />

        {/* Left Arm holding SEO Telescope */}
        <motion.g
          animate={{ rotate: isHovered ? [0, -10, 0] : [0, 0, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="origin-[80px_105px]"
        >
          {/* Arm */}
          <path
            d="M 75 105 C 50 110, 45 130, 65 135"
            stroke="#FFFFFF"
            strokeWidth="10"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M 75 105 C 50 110, 45 130, 65 135"
            stroke="#1F2937"
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {/* Telescope */}
          <rect x="35" y="125" width="45" height="15" rx="3" fill="#FFE52B" stroke="#1F2937" strokeWidth="3" transform="rotate(-20 35 125)" />
          <polygon points="35,115 30,123 30,140 35,148" fill="#2E4ED8" stroke="#1F2937" strokeWidth="3" />
        </motion.g>

        {/* Right Arm waving */}
        <motion.g
          animate={{
            rotate: isHovered ? [0, 25, -10, 25, 0] : [0, 10, 0],
          }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="origin-[120px_105px]"
        >
          {/* Arm */}
          <path
            d="M 125 105 C 150 110, 155 125, 145 138"
            stroke="#FFFFFF"
            strokeWidth="10"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M 125 105 C 150 110, 155 125, 145 138"
            stroke="#1F2937"
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {/* Glove */}
          <circle cx="145" cy="138" r="8" fill="#5A6EF5" stroke="#1F2937" strokeWidth="3" />
        </motion.g>

        {/* Left Leg */}
        <path
          d="M 85 160 C 80 180, 75 185, 75 190"
          stroke="#FFFFFF"
          strokeWidth="12"
          strokeLinecap="round"
        />
        <path
          d="M 85 160 C 80 180, 75 185, 75 190"
          stroke="#1F2937"
          strokeWidth="4"
          strokeLinecap="round"
        />
        <rect x="68" y="184" width="16" height="8" rx="3" fill="#2E4ED8" stroke="#1F2937" strokeWidth="3" />

        {/* Right Leg */}
        <path
          d="M 115 160 C 120 180, 125 185, 125 190"
          stroke="#FFFFFF"
          strokeWidth="12"
          strokeLinecap="round"
        />
        <path
          d="M 115 160 C 120 180, 125 185, 125 190"
          stroke="#1F2937"
          strokeWidth="4"
          strokeLinecap="round"
        />
        <rect x="116" y="184" width="16" height="8" rx="3" fill="#2E4ED8" stroke="#1F2937" strokeWidth="3" />

        {/* Helmet */}
        <circle cx="100" cy="65" r="40" fill="#FFFFFF" stroke="#1F2937" strokeWidth="4" />
        
        {/* Helmet Visor */}
        <motion.ellipse
          cx="100"
          cy="62"
          rx="30"
          ry="22"
          fill="#1F2937"
          animate={{
            fill: isHovered ? "#2E4ED8" : "#1F2937",
          }}
          transition={{ duration: 0.3 }}
        />
        
        {/* Gloss Overlay on Visor */}
        <path
          d="M 75 58 Q 100 48, 125 58 C 115 50, 85 50, 75 58"
          fill="#FFFFFF"
          opacity="0.6"
        />

        {/* Cute Blinking Eyes inside Visor */}
        <g className="animate-blink">
          {/* Left Eye */}
          <circle cx="90" cy="62" r="4" fill="#FFE52B" />
          {/* Right Eye */}
          <circle cx="110" cy="62" r="4" fill="#FFE52B" />
        </g>
        
        {/* Helmet Antenna */}
        <line x1="100" y1="25" x2="100" y2="12" stroke="#1F2937" strokeWidth="4" strokeLinecap="round" />
        <circle cx="100" cy="10" r="6" fill="#FFE52B" stroke="#1F2937" strokeWidth="3" />

        {/* Sparkles / Stars floating near mascot */}
        <motion.path
          d="M 155 35 L 158 42 L 165 42 L 160 46 L 162 53 L 155 49 L 148 53 L 150 46 L 145 42 L 152 42 Z"
          fill="#FFE52B"
          animate={{ scale: isHovered ? [1, 1.3, 1] : [1, 0.8, 1], rotate: [0, 90, 0] }}
          transition={{ duration: 3, repeat: Infinity }}
        />
        <motion.path
          d="M 35 75 L 37 80 L 42 80 L 38 83 L 39 88 L 35 85 L 31 88 L 32 83 L 28 80 L 33 80 Z"
          fill="#5A6EF5"
          animate={{ scale: isHovered ? [1, 1.2, 1] : [0.7, 1, 0.7], rotate: [0, -90, 0] }}
          transition={{ duration: 4, repeat: Infinity, delay: 1 }}
        />
      </svg>
    </motion.div>
  );
}
