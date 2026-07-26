"use client";

import React from "react";
import { motion } from "framer-motion";

interface MegaphoneDanceProps {
  className?: string;
}

export default function MegaphoneDance({ className = "relative w-32 h-32 flex items-center justify-center select-none" }: MegaphoneDanceProps) {
  return (
    <div className={className}>
      <motion.div
        animate={{
          rotate: [0, -10, 10, -5, 5, 0],
          scale: [1, 1.08, 0.95, 1.05, 1],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="w-24 h-24 bg-primary-blue text-bg-yellow rounded-3xl flex items-center justify-center shadow-2xl border-4 border-bg-yellow"
      >
        <span className="text-5xl">📣</span>
      </motion.div>
    </div>
  );
}
