"use client";

import React from "react";
import { motion, useScroll, useVelocity, useTransform } from "framer-motion";

export default function AnimeSpeedLines() {
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);

  // Transform velocity to opacity: fades in speed lines during fast scrolling
  const opacity = useTransform(
    scrollVelocity,
    [-3000, -800, 0, 800, 3000],
    [0.35, 0.05, 0, 0.05, 0.35]
  );

  return (
    <motion.div
      style={{ opacity }}
      className="fixed inset-0 w-full h-full pointer-events-none z-45 overflow-hidden"
    >
      {/* Top Border Speed Lines */}
      <div 
        className="absolute top-0 inset-x-0 h-24 opacity-60"
        style={{
          backgroundImage: "linear-gradient(to bottom, var(--accent-blue) 2px, transparent 2px)",
          backgroundSize: "8px 100%",
        }}
      />

      {/* Bottom Border Speed Lines */}
      <div 
        className="absolute bottom-0 inset-x-0 h-24 opacity-60"
        style={{
          backgroundImage: "linear-gradient(to top, var(--accent-blue) 2px, transparent 2px)",
          backgroundSize: "8px 100%",
        }}
      />

      {/* Left Border Speed Lines */}
      <div 
        className="absolute left-0 inset-y-0 w-24 opacity-60"
        style={{
          backgroundImage: "linear-gradient(to right, var(--accent-blue) 2px, transparent 2px)",
          backgroundSize: "100% 8px",
        }}
      />

      {/* Right Border Speed Lines */}
      <div 
        className="absolute right-0 inset-y-0 w-24 opacity-60"
        style={{
          backgroundImage: "linear-gradient(to left, var(--accent-blue) 2px, transparent 2px)",
          backgroundSize: "100% 8px",
        }}
      />

      {/* Warp Center Glow */}
      <div className="absolute inset-0 bg-radial-gradient from-transparent via-transparent to-primary-blue/5 pointer-events-none" />
    </motion.div>
  );
}
