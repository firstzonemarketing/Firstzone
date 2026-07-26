"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function RobotAI({ className = "w-48 h-48" }: { className?: string }) {
  const [isHovered, setIsHovered] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Mouse tracking relative to the component
  const headX = useMotionValue(0);
  const headY = useMotionValue(0);

  const springConfig = { damping: 20, stiffness: 150 };
  const headXSpring = useSpring(headX, springConfig);
  const headYSpring = useSpring(headY, springConfig);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      // Calculate delta and clamp it
      const deltaX = (e.clientX - centerX) / 10;
      const deltaY = (e.clientY - centerY) / 10;
      
      // Clamp to maximum 12px translation
      const clampedX = Math.max(-12, Math.min(12, deltaX));
      const clampedY = Math.max(-12, Math.min(12, deltaY));

      headX.set(clampedX);
      headY.set(clampedY);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [headX, headY]);

  // Reset face position when mouse leaves the viewport
  const handleMouseLeave = () => {
    setIsHovered(false);
    headX.set(0);
    headY.set(0);
  };

  return (
    <div
      ref={containerRef}
      className={`${className} relative select-none`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
    >
      <svg
        viewBox="0 0 200 200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full drop-shadow-[0_10px_20px_rgba(46,78,216,0.15)] dark:drop-shadow-[0_10px_20px_rgba(59,130,246,0.3)]"
      >
        {/* Base Shadow */}
        <ellipse
          cx="100"
          cy="185"
          rx="50"
          ry="6"
          fill="rgba(30, 41, 59, 0.15)"
          className="dark:fill-slate-900/40"
        />

        {/* Robot Body */}
        <rect x="60" y="105" width="80" height="70" rx="16" fill="#2E4ED8" stroke="#1F2937" strokeWidth="4" />
        <rect x="70" y="115" width="60" height="50" rx="10" fill="#5A6EF5" />
        
        {/* Heart / Power Indicator on Chest */}
        <motion.path
          d="M 100 145 C 100 145, 92 135, 100 128 C 108 135, 100 145, 100 145 Z"
          fill="#FFE52B"
          animate={{ scale: isHovered ? [1, 1.25, 1] : [1, 1.1, 1] }}
          transition={{ duration: isHovered ? 0.6 : 1.2, repeat: Infinity }}
          className="origin-center"
        />

        {/* Neck */}
        <rect x="90" y="90" width="20" height="20" rx="4" fill="#E2E8F0" stroke="#1F2937" strokeWidth="4" />

        {/* Track Wheels / Tread Base */}
        <rect x="50" y="170" width="100" height="15" rx="7" fill="#1F2937" />
        <circle cx="65" cy="177" r="5" fill="#E2E8F0" className="animate-spin" style={{ animationDuration: '3s' }} />
        <circle cx="100" cy="177" r="5" fill="#E2E8F0" className="animate-spin" style={{ animationDuration: '3s' }} />
        <circle cx="135" cy="177" r="5" fill="#E2E8F0" className="animate-spin" style={{ animationDuration: '3s' }} />

        {/* Arms */}
        {/* Left Arm with clamp hand */}
        <motion.g
          animate={{ rotate: isHovered ? [0, -15, 0] : [0, 0, 0] }}
          transition={{ duration: 1 }}
          className="origin-[58px_120px]"
        >
          <path d="M 60 125 L 35 135" stroke="#1F2937" strokeWidth="6" strokeLinecap="round" />
          <path d="M 35 135 C 28 135, 25 125, 25 130 C 25 140, 35 145, 35 145" stroke="#1F2937" strokeWidth="4" fill="none" strokeLinecap="round" />
        </motion.g>

        {/* Right Arm with pointing finger */}
        <motion.g
          animate={{ rotate: isHovered ? [0, 20, 0] : [0, 0, 0] }}
          transition={{ duration: 1 }}
          className="origin-[142px_120px]"
        >
          <path d="M 140 125 L 165 135" stroke="#1F2937" strokeWidth="6" strokeLinecap="round" />
          {/* Hand waving / pointing */}
          <circle cx="165" cy="135" r="6" fill="#FFE52B" stroke="#1F2937" strokeWidth="3" />
        </motion.g>

        {/* Animated Head (Tilted & translated towards cursor) */}
        <motion.g
          style={{ x: headXSpring, y: headYSpring }}
          className="origin-[100px_90px]"
        >
          {/* Antenna */}
          <line x1="100" y1="40" x2="100" y2="20" stroke="#1F2937" strokeWidth="4" />
          <motion.circle
            cx="100"
            cy="15"
            r="8"
            fill="#FFE52B"
            stroke="#1F2937"
            strokeWidth="3"
            animate={{
              fill: isHovered ? ["#FFE52B", "#FFFFFF", "#FFE52B"] : "#FFE52B",
              scale: isHovered ? [1, 1.2, 1] : 1,
            }}
            transition={{ duration: 0.5, repeat: Infinity }}
          />

          {/* Head Box */}
          <rect x="50" y="40" width="100" height="55" rx="18" fill="#FFFFFF" stroke="#1F2937" strokeWidth="4" />
          
          {/* Glass Visor / Screen */}
          <rect x="60" y="48" width="80" height="38" rx="10" fill="#1F2937" />

          {/* Screen Content - Matrix grid pattern if hovered, or cute eyes */}
          <g>
            {/* Left Eye */}
            <motion.ellipse
              cx="80"
              cy="65"
              rx={isHovered ? "10" : "8"}
              ry={isHovered ? "6" : "8"}
              fill="#5A6EF5"
              className="origin-center"
              animate={isHovered ? { scaleY: [1, 0.1, 1] } : {}}
              transition={{ repeat: Infinity, duration: 3, delay: 0.5 }}
            />
            {/* Right Eye */}
            <motion.ellipse
              cx="120"
              cy="65"
              rx={isHovered ? "10" : "8"}
              ry={isHovered ? "6" : "8"}
              fill="#5A6EF5"
              className="origin-center"
              animate={isHovered ? { scaleY: [1, 0.1, 1] } : {}}
              transition={{ repeat: Infinity, duration: 3, delay: 0.5 }}
            />
            
            {/* Rosy Cheek Circles */}
            <circle cx="70" cy="76" r="4" fill="#EF4444" opacity="0.6" />
            <circle cx="130" cy="76" r="4" fill="#EF4444" opacity="0.6" />
            
            {/* Digital Mouth */}
            <motion.path
              d={isHovered ? "M 90 74 Q 100 82, 110 74" : "M 92 75 L 108 75"}
              stroke="#5A6EF5"
              strokeWidth="3"
              strokeLinecap="round"
              fill="none"
            />
          </g>
          
          {/* Side Ears / Bolts */}
          <rect x="42" y="58" width="8" height="18" rx="2" fill="#E2E8F0" stroke="#1F2937" strokeWidth="3" />
          <rect x="150" y="58" width="8" height="18" rx="2" fill="#E2E8F0" stroke="#1F2937" strokeWidth="3" />
        </motion.g>
      </svg>
    </div>
  );
}
