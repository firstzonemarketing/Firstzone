"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";

export default function CreativeFox({ className = "w-48 h-48" }: { className?: string }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      className={`${className} relative select-none`}
      animate={{
        y: isHovered ? [-3, 3, -3] : [-8, 8, -8],
      }}
      transition={{
        duration: isHovered ? 1.5 : 4,
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
        className="w-full h-full drop-shadow-[0_10px_20px_rgba(46,78,216,0.15)]"
      >
        {/* Shadow */}
        <ellipse
          cx="100"
          cy="185"
          rx="50"
          ry="6"
          fill="rgba(30, 41, 59, 0.15)"
          className="dark:fill-slate-900/40"
        />

        {/* Fox tail */}
        <motion.path
          d="M 125 155 C 160 170, 180 140, 155 110 C 145 125, 135 145, 125 155 Z"
          fill="#2E4ED8"
          stroke="#1F2937"
          strokeWidth="4"
          animate={{
            rotate: isHovered ? [0, 12, -8, 12, 0] : [0, -5, 5, -5, 0],
          }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
          className="origin-[125px_155px]"
        />
        {/* Fox tail white tip */}
        <path d="M 155 110 C 162 118, 168 128, 155 135 C 150 128, 148 118, 155 110 Z" fill="#FFFFFF" />

        {/* Fox Body */}
        <rect x="70" y="110" width="60" height="55" rx="18" fill="#5A6EF5" stroke="#1F2937" strokeWidth="4" />
        {/* White chest fluff */}
        <path d="M 85 110 C 95 130, 105 130, 115 110 C 105 120, 95 120, 85 110 Z" fill="#FFFFFF" />

        {/* Left Leg */}
        <path d="M 85 160 L 80 185" stroke="#1F2937" strokeWidth="6" strokeLinecap="round" />
        <rect x="73" y="180" width="12" height="7" rx="2" fill="#2E4ED8" stroke="#1F2937" strokeWidth="3" />

        {/* Right Leg */}
        <path d="M 115 160 L 120 185" stroke="#1F2937" strokeWidth="6" strokeLinecap="round" />
        <rect x="115" y="180" width="12" height="7" rx="2" fill="#2E4ED8" stroke="#1F2937" strokeWidth="3" />

        {/* Left Arm holding sketch pencil */}
        <motion.g
          animate={{
            rotate: isHovered ? [0, -25, 5, -25, 0] : [0, 5, -5, 5, 0],
          }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          className="origin-[75px_120px]"
        >
          {/* Arm */}
          <path d="M 70 122 C 50 125, 45 140, 58 145" stroke="#5A6EF5" strokeWidth="12" strokeLinecap="round" />
          <path d="M 70 122 C 50 125, 45 140, 58 145" stroke="#1F2937" strokeWidth="4" strokeLinecap="round" />
          
          {/* Big yellow designer pencil */}
          <g transform="translate(42, 138) rotate(-40)">
            <rect x="0" y="0" width="10" height="30" fill="#FFE52B" stroke="#1F2937" strokeWidth="3" />
            <polygon points="0,0 5,-8 10,0" fill="#E2E8F0" stroke="#1F2937" strokeWidth="2" />
            {/* Lead tip */}
            <polygon points="3,-5 5,-8 7,-5" fill="#2E4ED8" />
            {/* Eraser */}
            <rect x="0" y="27" width="10" height="5" fill="#EF4444" />
          </g>
        </motion.g>

        {/* Right Arm */}
        <motion.g
          animate={{
            rotate: isHovered ? [0, 15, 0] : [0, 0, 0],
          }}
          transition={{ duration: 1 }}
          className="origin-[125px_120px]"
        >
          <path d="M 128 122 C 145 125, 150 138, 142 145" stroke="#5A6EF5" strokeWidth="12" strokeLinecap="round" />
          <path d="M 128 122 C 145 125, 150 138, 142 145" stroke="#1F2937" strokeWidth="4" strokeLinecap="round" />
          <circle cx="142" cy="145" r="5" fill="#FFFFFF" stroke="#1F2937" strokeWidth="3" />
        </motion.g>

        {/* Fox Head */}
        <g>
          {/* Left Ear */}
          <motion.polygon
            points="65,65 40,30 75,45"
            fill="#2E4ED8"
            stroke="#1F2937"
            strokeWidth="4"
            strokeLinejoin="round"
            animate={{ rotate: isHovered ? [0, -10, 0] : 0 }}
            className="origin-[65px_65px]"
          />
          <polygon points="62,60 48,38 68,48" fill="#FFFFFF" />

          {/* Right Ear */}
          <motion.polygon
            points="135,65 160,30 125,45"
            fill="#2E4ED8"
            stroke="#1F2937"
            strokeWidth="4"
            strokeLinejoin="round"
            animate={{ rotate: isHovered ? [0, 10, 0] : 0 }}
            className="origin-[135px_65px]"
          />
          <polygon points="138,60 152,38 132,48" fill="#FFFFFF" />

          {/* Main Head Base */}
          <path
            d="M 60 75 C 60 45, 140 45, 140 75 C 140 98, 120 115, 100 115 C 80 115, 60 98, 60 75 Z"
            fill="#2E4ED8"
            stroke="#1F2937"
            strokeWidth="4"
            strokeLinejoin="round"
          />

          {/* White Cheeks */}
          <path d="M 62 82 C 72 98, 85 108, 100 108 C 115 108, 128 98, 138 82 C 125 98, 75 98, 62 82 Z" fill="#FFFFFF" stroke="#1F2937" strokeWidth="4" />

          {/* Nose */}
          <circle cx="100" cy="106" r="6" fill="#1F2937" />

          {/* Hipster Glasses */}
          <g>
            {/* Left Rim */}
            <rect x="68" y="65" width="26" height="20" rx="6" stroke="#FFE52B" strokeWidth="5" fill="none" />
            {/* Right Rim */}
            <rect x="106" y="65" width="26" height="20" rx="6" stroke="#FFE52B" strokeWidth="5" fill="none" />
            {/* Bridge */}
            <line x1="94" y1="73" x2="106" y2="73" stroke="#FFE52B" strokeWidth="5" />
          </g>

          {/* Eyes (inside glasses) */}
          <g>
            {/* Left Eye */}
            <motion.circle
              cx="81"
              cy="75"
              r="4.5"
              fill="#1F2937"
              animate={isHovered ? { scaleY: 0.1 } : { scaleY: 1 }}
              transition={{ duration: 0.1 }}
            />
            {/* Right Eye */}
            <motion.path
              d="M 114 78 Q 119 72, 124 78"
              stroke="#1F2937"
              strokeWidth="3.5"
              strokeLinecap="round"
              fill="none"
              animate={{ opacity: isHovered ? 1 : 0 }}
            />
            <motion.circle
              cx="119"
              cy="75"
              r="4.5"
              fill="#1F2937"
              animate={{ opacity: isHovered ? 0 : 1 }}
            />
          </g>

          {/* Rosy Cheek Spots */}
          <circle cx="68" cy="88" r="4.5" fill="#EF4444" opacity="0.5" />
          <circle cx="132" cy="88" r="4.5" fill="#EF4444" opacity="0.5" />
        </g>

        {/* Drawn spark trails from pencil tip */}
        {isHovered && (
          <g>
            <motion.circle
              cx="30"
              cy="100"
              r="3"
              fill="#FFE52B"
              animate={{ scale: [0, 1.5, 0], y: [0, -20, -40] }}
              transition={{ repeat: Infinity, duration: 1 }}
            />
            <motion.circle
              cx="15"
              cy="110"
              r="2"
              fill="#FFFFFF"
              animate={{ scale: [0, 1.2, 0], y: [0, -10, -25], x: [0, -10, -20] }}
              transition={{ repeat: Infinity, duration: 0.8, delay: 0.2 }}
            />
            <motion.path
              d="M 20 85 L 25 90 L 30 85 L 25 80 Z"
              fill="#5A6EF5"
              animate={{ scale: [0.5, 1, 0.5], rotate: [0, 180], y: [0, -15] }}
              transition={{ repeat: Infinity, duration: 1.2 }}
            />
          </g>
        )}
      </svg>
    </motion.div>
  );
}
