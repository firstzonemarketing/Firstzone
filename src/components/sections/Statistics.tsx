"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import confetti from "canvas-confetti";

interface StatItemProps {
  target: number;
  suffix: string;
  label: string;
  delay?: number;
}

function CounterStat({ target, suffix, label, delay = 0 }: StatItemProps) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const confettiFired = useRef(false);

  useEffect(() => {
    if (!isInView) return;

    // Delayed start
    const startTimeout = setTimeout(() => {
      let start = 0;
      const duration = 2000; // 2 seconds
      const increment = target / (duration / 16); // ~60fps
      
      const timer = setInterval(() => {
        start += increment;
        if (start >= target) {
          setCount(target);
          clearInterval(timer);
          
          // Trigger confetti!
          if (!confettiFired.current) {
            confettiFired.current = true;
            confetti({
              particleCount: 50,
              spread: 40,
              origin: { y: 0.7 },
              colors: ["#2E4ED8", "#5A6EF5", "#FFE52B", "#FFFFFF"],
            });
          }
        } else {
          setCount(Math.floor(start));
        }
      }, 16);

      return () => clearInterval(timer);
    }, delay);

    return () => clearTimeout(startTimeout);
  }, [isInView, target, delay]);

  return (
    <div ref={ref} className="flex flex-col items-center justify-center p-8 rounded-3xl glassmorphism border border-primary-blue/10 shadow-lg text-center cursor-pointer select-none">
      <motion.div
        className="text-5xl sm:text-6xl font-black text-primary-blue dark:text-accent-blue tracking-tight mb-2"
        whileHover={{ scale: 1.1, rotate: [0, 2, -2, 0] }}
      >
        {count}
        {suffix}
      </motion.div>
      <div className="text-xs sm:text-sm font-black text-foreground/80 uppercase tracking-widest">
        {label}
      </div>
    </div>
  );
}

export default function Statistics() {
  return (
    <section className="relative py-20 px-6 overflow-hidden select-none">
      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Statistics Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          <CounterStat target={30} suffix="+" label="Projects Completed" delay={0} />
          <CounterStat target={20} suffix="+" label="Happy Clients" delay={200} />
          <CounterStat target={95} suffix="%" label="Success Rate" delay={400} />
          <CounterStat target={3} suffix="+" label="Years of Experience" delay={600} />
        </div>

      </div>
    </section>
  );
}
