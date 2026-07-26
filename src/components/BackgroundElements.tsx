"use client";

import React, { useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export default function BackgroundElements() {
  const { scrollY } = useScroll();
  const [windowHeight, setWindowHeight] = useState(1000);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setWindowHeight(window.innerHeight);
      const handleResize = () => setWindowHeight(window.innerHeight);
      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }
  }, []);

  // Parallax offsets for different layers
  const ySatellites = useTransform(scrollY, [0, 4000], [0, -300]);
  const yDrones = useTransform(scrollY, [0, 4000], [0, -450]);
  const yPlanes = useTransform(scrollY, [0, 4000], [0, -150]);
  const yClouds = useTransform(scrollY, [0, 4000], [0, -100]);

  return (
    <div className="fixed inset-0 w-full h-full overflow-hidden pointer-events-none z-0">
      
      {/* Dynamic Animated Gradients / Blob Mesh */}
      <motion.div
        className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] rounded-full bg-accent-blue/20 blur-[120px] dark:bg-primary-blue/15"
        animate={{
          x: [0, 40, -20, 0],
          y: [0, -30, 40, 0],
          scale: [1, 1.1, 0.9, 1],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute bottom-[-10%] right-[-10%] w-[60vw] h-[60vw] rounded-full bg-primary-blue/10 blur-[150px] dark:bg-accent-blue/10"
        animate={{
          x: [0, -50, 30, 0],
          y: [0, 40, -30, 0],
          scale: [1, 0.9, 1.1, 1],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Grid Pattern Mesh */}
      <div 
        className="absolute inset-0 opacity-[0.06] dark:opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(var(--primary-blue) 1px, transparent 1px)`,
          backgroundSize: '24px 24px'
        }}
      />

      {/* Layer 1: Parallax Clouds (Slowest) */}
      <motion.div style={{ y: yClouds }} className="absolute inset-0">
        {/* Floating Cartoon Cloud 1 */}
        <motion.svg
          className="absolute top-[35%] right-[5%] w-24 h-12 fill-white-custom/25 dark:fill-slate-800/10 stroke-primary-blue/5 dark:stroke-slate-700/10 stroke-2"
          viewBox="0 0 100 50"
          animate={{ x: [0, -40, 0], y: [0, -10, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        >
          <path d="M10,40 Q10,25 25,25 Q30,10 50,10 Q70,10 75,25 Q90,25 90,40 Z" />
        </motion.svg>
        {/* Floating Cartoon Cloud 2 */}
        <motion.svg
          className="absolute top-[75%] left-[6%] w-28 h-14 fill-white-custom/20 dark:fill-slate-800/10 stroke-primary-blue/5 dark:stroke-slate-700/10 stroke-2"
          viewBox="0 0 100 50"
          animate={{ x: [0, 50, 0], y: [0, 8, 0] }}
          transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
        >
          <path d="M10,40 Q10,25 25,25 Q30,10 50,10 Q70,10 75,25 Q90,25 90,40 Z" />
        </motion.svg>
      </motion.div>

      {/* Layer 2: Parallax Satellites & Space Objects (Medium) */}
      <motion.div style={{ y: ySatellites }} className="absolute inset-0">
        {/* Floating Marketing Satellite */}
        <motion.svg
          className="absolute top-[15%] right-[12%] w-16 h-16"
          viewBox="0 0 100 100"
          animate={{
            y: [0, -15, 0],
            rotate: [0, 5, -5, 0],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        >
          {/* Satellite Dish Body */}
          <ellipse cx="50" cy="50" rx="20" ry="12" fill="#5A6EF5" stroke="#1F2937" strokeWidth="3" />
          <path d="M50 50 L50 25" stroke="#1F2937" strokeWidth="3" />
          <circle cx="50" cy="25" r="4" fill="#FFE52B" stroke="#1F2937" strokeWidth="2" />
          {/* Solar Panels */}
          <rect x="15" y="44" width="16" height="12" rx="2" fill="#2E4ED8" stroke="#1F2937" strokeWidth="2" />
          <rect x="69" y="44" width="16" height="12" rx="2" fill="#2E4ED8" stroke="#1F2937" strokeWidth="2" />
          <line x1="31" y1="50" x2="69" y2="50" stroke="#1F2937" strokeWidth="3" />
        </motion.svg>

        {/* Orbiting Energy Portal Ring */}
        <motion.svg
          className="absolute top-[55%] right-[8%] w-24 h-24 stroke-primary-blue/10 dark:stroke-accent-blue/15 stroke-2 fill-none"
          viewBox="0 0 100 100"
          animate={{ rotate: 360 }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        >
          <circle cx="50" cy="50" r="40" strokeDasharray="10 15" />
        </motion.svg>
      </motion.div>

      {/* Layer 3: Parallax Drones & Paper Airplanes (Fastest / Closest) */}
      <motion.div style={{ y: yDrones }} className="absolute inset-0">
        {/* Floating Cartoon Drone */}
        <motion.svg
          className="absolute top-[48%] left-[8%] w-14 h-14"
          viewBox="0 0 80 80"
          animate={{
            y: [0, 20, -10, 0],
            x: [0, -10, 10, 0],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        >
          {/* Drone Body */}
          <circle cx="40" cy="40" r="12" fill="#FFFFFF" stroke="#1F2937" strokeWidth="3" />
          <circle cx="40" cy="40" r="6" fill="#2E4ED8" />
          {/* Quad Blades */}
          <line x1="20" y1="20" x2="60" y2="60" stroke="#1F2937" strokeWidth="3" />
          <line x1="20" y1="60" x2="60" y2="20" stroke="#1F2937" strokeWidth="3" />
          
          <motion.ellipse cx="20" cy="20" rx="8" ry="2" fill="#5A6EF5" stroke="#1F2937" strokeWidth="1.5" animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 0.1, ease: "linear" }} className="origin-[20px_20px]" />
          <motion.ellipse cx="60" cy="60" rx="8" ry="2" fill="#5A6EF5" stroke="#1F2937" strokeWidth="1.5" animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 0.1, ease: "linear" }} className="origin-[60px_60px]" />
          <motion.ellipse cx="20" cy="60" rx="8" ry="2" fill="#5A6EF5" stroke="#1F2937" strokeWidth="1.5" animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 0.1, ease: "linear" }} className="origin-[20px_60px]" />
          <motion.ellipse cx="60" cy="20" rx="8" ry="2" fill="#5A6EF5" stroke="#1F2937" strokeWidth="1.5" animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 0.1, ease: "linear" }} className="origin-[60px_20px]" />
        </motion.svg>

        {/* Flying Paper Airplane */}
        <motion.svg
          className="absolute top-[82%] right-[10%] w-10 h-10 fill-primary-blue/20 dark:fill-accent-blue/30"
          viewBox="0 0 24 24"
          style={{ transform: "rotate(-15deg)" }}
          animate={{
            x: [0, 45, 0],
            y: [0, -25, 0],
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        >
          <path d="M2 21L23 12L2 3V10L17 12L2 14V21Z" />
        </motion.svg>
      </motion.div>

      {/* Drifting Sparkles & Stars (Ambient) */}
      <div className="absolute inset-0">
        <motion.svg
          className="absolute top-[8%] left-[20%] w-6 h-6 fill-primary-blue/30 dark:fill-accent-blue/40"
          viewBox="0 0 24 24"
          animate={{
            scale: [1, 1.4, 1],
            opacity: [0.5, 1, 0.5],
          }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        >
          <path d="M12 0L14.6 9.4L24 12L14.6 14.6L12 24L9.4 14.6L0 12L9.4 9.4Z" />
        </motion.svg>
        <motion.svg
          className="absolute top-[68%] right-[22%] w-5 h-5 fill-white-custom/40 dark:fill-slate-700/50"
          viewBox="0 0 24 24"
          animate={{
            scale: [0.8, 1.2, 0.8],
            opacity: [0.3, 0.8, 0.3],
          }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        >
          <path d="M12 0L14.6 9.4L24 12L14.6 14.6L12 24L9.4 14.6L0 12L9.4 9.4Z" />
        </motion.svg>
      </div>

    </div>
  );
}
