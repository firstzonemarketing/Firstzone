"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";

export default function AnalyticsWizard({ className = "w-48 h-48" }: { className?: string }) {
  const [isHovered, setIsHovered] = useState(false);

  // Floating analytics bubbles
  const bubbleVariants = [
    { text: "95%", delay: 0, x: -20 },
    { text: "ROI", delay: 1, x: 25 },
    { text: "500+", delay: 0.5, x: 5 },
    { text: "$$$", delay: 1.5, x: -15 },
    { text: "SEO", delay: 0.8, x: 18 },
  ];

  return (
    <motion.div
      className={`${className} relative select-none`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      animate={{
        y: isHovered ? [-2, 2] : [-5, 5],
      }}
      transition={{
        duration: 3,
        repeat: Infinity,
        repeatType: "reverse",
        ease: "easeInOut",
      }}
    >
      {/* Cauldron Bubbles (Rise up from the cauldron) */}
      <div className="absolute inset-x-0 top-0 h-1/2 pointer-events-none">
        {bubbleVariants.map((bubble, i) => (
          <motion.div
            key={i}
            className="absolute left-1/2 bg-white/90 dark:bg-slate-800/90 text-primary-blue dark:text-accent-blue text-[10px] font-bold py-1 px-2 rounded-full border border-primary-blue/20 shadow-md flex items-center justify-center whitespace-nowrap"
            initial={{ y: 80, x: bubble.x, opacity: 0, scale: 0.4 }}
            animate={
              isHovered
                ? {
                    y: [-10, -80],
                    x: [bubble.x, bubble.x + (i % 2 === 0 ? 15 : -15), bubble.x],
                    opacity: [0, 1, 1, 0],
                    scale: [0.5, 1.1, 1, 0.7],
                  }
                : {
                    y: [10, -50],
                    opacity: [0, 0.8, 0],
                    scale: [0.6, 0.9, 0.6],
                  }
            }
            transition={{
              duration: isHovered ? 2.5 : 4,
              repeat: Infinity,
              delay: bubble.delay,
              ease: "easeOut",
            }}
          >
            {bubble.text}
          </motion.div>
        ))}
      </div>

      <svg
        viewBox="0 0 200 200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
      >
        {/* Shadow */}
        <ellipse
          cx="100"
          cy="185"
          rx="55"
          ry="6"
          fill="rgba(30, 41, 59, 0.15)"
          className="dark:fill-slate-900/40"
        />

        {/* Wizard Cauldron (Bottom) */}
        <rect x="55" y="130" width="90" height="50" rx="20" fill="#1F2937" stroke="#FFFFFF" strokeWidth="4" />
        <ellipse cx="100" cy="130" rx="45" ry="12" fill="#2E4ED8" stroke="#1F2937" strokeWidth="4" />
        {/* Glowing soup in cauldron */}
        <ellipse cx="100" cy="130" rx="38" ry="8" fill="#FFE52B" />
        
        {/* Stirring Stick */}
        <motion.line
          x1="100"
          y1="130"
          x2="70"
          y2="90"
          stroke="#78350F"
          strokeWidth="6"
          strokeLinecap="round"
          animate={{
            x2: isHovered ? [70, 78, 62, 70] : 70,
            y2: isHovered ? [90, 88, 92, 90] : 90,
          }}
          transition={{ duration: 1.5, repeat: Infinity }}
        />

        {/* Wizard Body (Robes) */}
        <path
          d="M 65 95 L 135 95 L 145 145 L 55 145 Z"
          fill="#5A6EF5"
          stroke="#1F2937"
          strokeWidth="4"
          strokeLinejoin="round"
        />
        {/* Robe Stars */}
        <polygon points="80,105 82,109 86,109 83,111 84,115 80,113 76,115 77,111 74,109 78,109" fill="#FFE52B" />
        <polygon points="120,115 122,119 126,119 123,121 124,125 120,123 116,125 117,121 114,119 118,119" fill="#FFE52B" />

        {/* Wizard Beard */}
        <path
          d="M 75 75 C 75 115, 125 115, 125 75 C 125 75, 100 120, 75 75 Z"
          fill="#F5F7FA"
          stroke="#1F2937"
          strokeWidth="4"
        />

        {/* Left Arm stirring */}
        <motion.path
          d="M 60 95 C 45 100, 50 115, 68 112"
          stroke="#5A6EF5"
          strokeWidth="10"
          strokeLinecap="round"
          strokeLinejoin="round"
          animate={{
            d: isHovered
              ? [
                  "M 60 95 C 45 100, 50 115, 68 112",
                  "M 60 95 C 43 97, 48 112, 65 114",
                  "M 60 95 C 45 100, 50 115, 68 112",
                ]
              : "M 60 95 C 45 100, 50 115, 68 112",
          }}
          transition={{ duration: 1.5, repeat: Infinity }}
        />
        <path d="M 60 95 C 45 100, 50 115, 68 112" stroke="#1F2937" strokeWidth="3" fill="none" strokeLinecap="round" />

        {/* Right Arm holding magic wand */}
        <motion.g
          animate={{
            rotate: isHovered ? [0, 25, -15, 0] : [0, 5, -5, 0],
          }}
          transition={{ duration: 2, repeat: Infinity }}
          className="origin-[135px_95px]"
        >
          {/* Arm */}
          <path d="M 135 95 C 150 100, 155 112, 148 120" stroke="#5A6EF5" strokeWidth="10" strokeLinecap="round" />
          <path d="M 135 95 C 150 100, 155 112, 148 120" stroke="#1F2937" strokeWidth="3" fill="none" strokeLinecap="round" />
          
          {/* Magic Wand */}
          <rect x="145" y="115" width="4" height="22" rx="1" fill="#78350F" stroke="#1F2937" strokeWidth="2" transform="rotate(-30 145 115)" />
          {/* Wand Star Tip */}
          <polygon
            points="156,104 158,107 161,107 159,109 160,112 157,110 154,112 155,109 153,107 155,107"
            fill="#FFE52B"
            stroke="#1F2937"
            strokeWidth="1"
          />
        </motion.g>

        {/* Wizard Face */}
        <circle cx="100" cy="65" r="28" fill="#FFE52B" stroke="#1F2937" strokeWidth="4" />
        
        {/* Wizard Eyes */}
        <g>
          {/* Left Eye */}
          <motion.circle
            cx="90"
            cy="62"
            r="3.5"
            fill="#1F2937"
            animate={isHovered ? { scaleY: 0.1 } : { scaleY: 1 }}
            transition={{ duration: 0.1 }}
          />
          {/* Right Eye */}
          <motion.circle
            cx="110"
            cy="62"
            r="3.5"
            fill="#1F2937"
            animate={isHovered ? { scaleY: 0.1 } : { scaleY: 1 }}
            transition={{ duration: 0.1 }}
          />
        </g>
        
        {/* Wizard Smile */}
        <path d="M 95 72 Q 100 76, 105 72" stroke="#1F2937" strokeWidth="3" strokeLinecap="round" fill="none" />

        {/* Rosy Cheeks */}
        <circle cx="83" cy="70" r="3.5" fill="#EF4444" opacity="0.4" />
        <circle cx="117" cy="70" r="3.5" fill="#EF4444" opacity="0.4" />

        {/* Wizard Hat */}
        <g>
          {/* Brim */}
          <ellipse cx="100" cy="45" rx="38" ry="8" fill="#2E4ED8" stroke="#1F2937" strokeWidth="4" />
          
          {/* Main Cone */}
          <path
            d="M 68 42 C 68 42, 95 -10, 115 10 C 120 15, 125 30, 132 42 Z"
            fill="#2E4ED8"
            stroke="#1F2937"
            strokeWidth="4"
            strokeLinejoin="round"
          />
          
          {/* Gold Hat Star */}
          <polygon
            points="95,15 97,19 101,19 98,21 99,25 95,23 91,25 92,21 89,19 93,19"
            fill="#FFE52B"
            stroke="#1F2937"
            strokeWidth="1.5"
          />
        </g>
      </svg>
    </motion.div>
  );
}
