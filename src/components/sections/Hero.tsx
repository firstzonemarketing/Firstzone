"use client";

import React from "react";
import { motion, Variants } from "framer-motion";
import AstronautSEO from "../mascot/AstronautSEO";
import RobotAI from "../mascot/RobotAI";
import RankingRocket from "../mascot/RankingRocket";

export default function Hero() {
  // Title letter container variants
  const containerVariants: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.05,
      },
    },
  };

  // Letter animations
  const letterVariants: Variants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        damping: 10,
        stiffness: 100,
      },
    },
  };

  const titleWords = "Grow Faster With Creative Digital Marketing".split(" ");

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center pt-24 pb-16 px-6 overflow-hidden">
      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
        
        {/* Left: Text Content */}
        <div className="lg:col-span-6 flex flex-col justify-center text-center lg:text-left">
          {/* Animated Headline */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="flex flex-wrap justify-center lg:justify-start gap-x-3 text-4xl sm:text-5xl lg:text-6xl font-black text-foreground tracking-tight leading-[1.1] mb-6"
          >
            {titleWords.map((word, idx) => (
              <motion.span
                key={idx}
                variants={letterVariants}
                className={idx >= 3 ? "text-primary-blue dark:text-accent-blue" : ""}
              >
                {word}
              </motion.span>
            ))}
          </motion.div>

          {/* Subheading */}
          <motion.p
            className="text-lg text-foreground/80 leading-relaxed mb-8 max-w-xl mx-auto lg:mx-0 font-medium"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            We help businesses dominate online through SEO, Branding, Social Media, Paid Advertising, Website Development, and Creative Content.
          </motion.p>

          {/* Action Buttons */}
          <motion.div
            className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
          >
            <motion.a
              href="#contact"
              className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-primary-blue text-bg-yellow font-black text-center shadow-lg hover:shadow-primary-blue/30 dark:hover:shadow-accent-blue/30 border-2 border-primary-blue transition-all duration-300 select-none text-base"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              Get Started
            </motion.a>
            <motion.a
              href="#portfolio"
              className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-white-custom/80 dark:bg-slate-800/80 text-primary-blue dark:text-accent-blue font-black text-center shadow-md border-2 border-primary-blue/10 dark:border-slate-700 hover:border-primary-blue dark:hover:border-accent-blue transition-all duration-300 select-none text-base"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              View Portfolio
            </motion.a>
          </motion.div>
        </div>

        {/* Right: Cartoon Command Center visual */}
        <div className="lg:col-span-6 relative flex justify-center items-center h-[450px] sm:h-[500px]">
          {/* Main Visual Board Panel / Console Table */}
          <motion.div
            className="absolute bottom-6 w-[90%] h-[160px] glassmorphism border-2 border-primary-blue/20 rounded-3xl shadow-xl flex items-center justify-around px-8 py-4 pointer-events-none"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, type: "spring" }}
          >
            {/* Hologram Screens on Table */}
            <div className="w-16 h-10 bg-primary-blue/20 rounded-lg border border-primary-blue/30 animate-pulse flex flex-col justify-between p-1.5">
              <div className="w-full h-1 bg-primary-blue/40 rounded" />
              <div className="w-3/4 h-1 bg-primary-blue/40 rounded" />
              <div className="w-1/2 h-1 bg-primary-blue/40 rounded" />
            </div>
            <div className="w-20 h-14 bg-bg-yellow/20 rounded-lg border border-bg-yellow/40 animate-bounce flex flex-col justify-between p-2" style={{ animationDuration: "4s" }}>
              <div className="flex justify-between items-center">
                <div className="w-2 h-2 rounded-full bg-yellow-400" />
                <div className="w-8 h-1.5 bg-yellow-400/40 rounded" />
              </div>
              <div className="w-full h-4 bg-yellow-400/10 rounded flex items-end">
                <div className="w-[30%] h-[40%] bg-yellow-400 rounded-t" />
                <div className="w-[30%] h-[70%] bg-yellow-400 rounded-t ml-1" />
                <div className="w-[30%] h-[100%] bg-yellow-400 rounded-t ml-1" />
              </div>
            </div>
            <div className="w-16 h-10 bg-emerald-400/20 rounded-lg border border-emerald-400/30 animate-pulse flex flex-col justify-between p-1.5">
              <div className="w-3 h-3 rounded-full bg-emerald-400 self-center" />
              <div className="w-full h-1 bg-emerald-400/40 rounded" />
            </div>
          </motion.div>

          {/* Interactive Floating SEO Astronaut */}
          <div className="absolute top-0 left-4 z-20">
            <AstronautSEO className="w-36 h-36 sm:w-44 sm:h-44" />
          </div>

          {/* Interactive Floating AI Robot */}
          <div className="absolute top-12 right-4 z-20">
            <RobotAI className="w-36 h-36 sm:w-44 sm:h-44" />
          </div>

          {/* Floating Google Ranking Rocket on console */}
          <div className="absolute bottom-16 left-[35%] z-30">
            <RankingRocket className="w-32 h-32 sm:w-40 sm:h-40" />
          </div>

          {/* Background visuals (Dashboard, Speech bubbles, Clouds) */}
          <motion.div
            className="absolute top-[-10px] left-[35%] bg-white-custom dark:bg-slate-800 text-xs px-3 py-2 rounded-2xl shadow-md border border-primary-blue/10 dark:border-slate-700 font-extrabold flex items-center gap-1.5 z-10"
            animate={{ y: [0, -6, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          >
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
            <span>Campaigns Active: 100%</span>
          </motion.div>

          <motion.div
            className="absolute bottom-28 right-[10%] bg-white-custom dark:bg-slate-800 text-xs px-3 py-2 rounded-2xl shadow-md border border-primary-blue/10 dark:border-slate-700 font-extrabold z-10"
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          >
            📈 ROI: +350%
          </motion.div>
        </div>
        
      </div>
    </section>
  );
}
