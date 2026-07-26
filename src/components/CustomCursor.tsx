"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

interface Sparkle {
  id: number;
  x: number;
  y: number;
  color: string;
  size: number;
}

export default function CustomCursor() {
  const [visible, setVisible] = useState(false);
  const [cursorType, setCursorType] = useState<string>("default");
  const [sparkles, setSparkles] = useState<Sparkle[]>([]);
  const sparkleIdCounter = useRef(0);

  // Position of mouse
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Springs for smooth movement
  const springConfig = { damping: 25, stiffness: 200, mass: 0.5 };
  const cursorRingX = useSpring(mouseX, springConfig);
  const cursorRingY = useSpring(mouseY, springConfig);

  useEffect(() => {
    // Check if device supports hover/fine pointer
    const mediaQuery = window.matchMedia("(pointer: fine)");
    if (!mediaQuery.matches) return;

    setVisible(true);
    document.body.classList.add("custom-cursor-active");

    const onMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);

      // Create a particle sparkle trail sometimes
      if (Math.random() < 0.3) {
        const colors = ["#2E4ED8", "#5A6EF5", "#FFE52B", "#FFFFFF"];
        const randomColor = colors[Math.floor(Math.random() * colors.length)];
        const randomSize = Math.random() * 8 + 4;
        
        const newSparkle: Sparkle = {
          id: sparkleIdCounter.current++,
          x: e.clientX,
          y: e.clientY,
          color: randomColor,
          size: randomSize,
        };

        setSparkles((prev) => [...prev.slice(-20), newSparkle]); // Limit array length
      }
    };

    const onMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      
      // Look for data-cursor attributes on the hovered element or its closest parent
      const clickableElement = target.closest('[data-cursor]');
      
      if (clickableElement) {
        const type = clickableElement.getAttribute("data-cursor") || "default";
        setCursorType(type);
      } else {
        // Fallback for standard buttons/links if not explicitly configured
        const standardLink = target.tagName === "BUTTON" || target.tagName === "A" || target.closest("button") || target.closest("a");
        setCursorType(standardLink ? "pointer" : "default");
      }
    };

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseover", onMouseOver);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseover", onMouseOver);
      document.body.classList.remove("custom-cursor-active");
    };
  }, [mouseX, mouseY]);

  // Clean up finished particles
  useEffect(() => {
    if (sparkles.length === 0) return;
    const timeout = setTimeout(() => {
      setSparkles((prev) => prev.slice(1));
    }, 600);
    return () => clearTimeout(timeout);
  }, [sparkles]);

  if (!visible) return null;

  // Custom cursor graphics based on active hover type
  const renderCursorIcon = () => {
    switch (cursorType) {
      case "rocket":
        return (
          <svg viewBox="0 0 24 24" className="w-8 h-8 fill-yellow-400 stroke-slate-900 stroke-2 drop-shadow-md">
            <path d="M12 2C8 6 7 11 7 15l2 3h6l2-3c0-4-1-9-5-13z" />
            <path d="M9 18l-2 3c0 0 5 1 5-1V18" />
            <path d="M15 18l2 3c0 0-5 1-5-1V18" />
            <circle cx="12" cy="11" r="2" fill="white" />
          </svg>
        );
      case "crosshair":
        return (
          <svg viewBox="0 0 24 24" className="w-8 h-8 stroke-red-500 stroke-2 fill-none drop-shadow-md">
            <circle cx="12" cy="12" r="8" />
            <line x1="12" y1="2" x2="12" y2="22" />
            <line x1="2" y1="12" x2="22" y2="12" />
            <circle cx="12" cy="12" r="2" fill="red" />
          </svg>
        );
      case "wand":
        return (
          <svg viewBox="0 0 24 24" className="w-8 h-8 fill-cyan-400 stroke-slate-900 stroke-2 drop-shadow-md rotate-45">
            <rect x="10" y="2" width="4" height="20" rx="2" fill="#78350F" />
            <rect x="10" y="2" width="4" height="6" rx="1" fill="white" />
            <polygon points="12,0 14,4 10,4" fill="yellow" />
            <circle cx="12" cy="2" r="1.5" fill="cyan" />
          </svg>
        );
      case "sword":
        return (
          <svg viewBox="0 0 24 24" className="w-9 h-9 fill-slate-300 stroke-slate-900 stroke-2 drop-shadow-md -rotate-45">
            <path d="M18 2 L22 6 L9 19 L5 15 Z" />
            <rect x="3" y="17" width="4" height="4" fill="yellow" />
            <line x1="4" y1="16" x2="8" y2="20" stroke="black" strokeWidth="3" />
          </svg>
        );
      case "brush":
        return (
          <svg viewBox="0 0 24 24" className="w-8 h-8 fill-purple-400 stroke-slate-900 stroke-2 drop-shadow-md">
            <path d="M18 3 C17 3 15 4 14 5 L6 13 C5 14 4 16 4 17 L4 20 L7 20 C8 20 10 19 11 18 L19 10 C20 9 21 7 21 6 C21 4 20 3 18 3 Z" />
            <path d="M4 20 L6 18" stroke="black" />
            <path d="M14 5 L19 10" stroke="black" />
          </svg>
        );
      case "pointer":
      default:
        return null;
    }
  };

  const isDefaultOrPointer = cursorType === "default" || cursorType === "pointer";

  return (
    <>
      {/* Sparkles Particle Trail */}
      {sparkles.map((sparkle) => (
        <motion.div
          key={sparkle.id}
          className="fixed top-0 left-0 rounded-full pointer-events-none z-50 mix-blend-difference"
          style={{
            x: sparkle.x,
            y: sparkle.y,
            width: sparkle.size,
            height: sparkle.size,
            backgroundColor: sparkle.color,
            transform: "translate(-50%, -50%)",
          }}
          initial={{ opacity: 1, scale: 1 }}
          animate={{ opacity: 0, scale: 0.1, y: sparkle.y + 15 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        />
      ))}

      {/* Main Cursor Core (Dot or Custom Icon) */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-50 select-none flex items-center justify-center"
        style={{
          x: mouseX,
          y: mouseY,
          translateX: "-50%",
          translateY: "-50%",
        }}
      >
        {isDefaultOrPointer ? (
          <motion.div
            className="w-3.5 h-3.5 bg-primary-blue rounded-full mix-blend-difference"
            animate={{
              scale: cursorType === "pointer" ? 1.5 : 1,
              backgroundColor: cursorType === "pointer" ? "#FFE52B" : "#2E4ED8",
            }}
          />
        ) : (
          <motion.div
            initial={{ scale: 0.5, rotate: -20 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 15 }}
          >
            {renderCursorIcon()}
          </motion.div>
        )}
      </motion.div>

      {/* Outer Spring Ring (Only visible on default/pointers or as a supporting glow) */}
      <motion.div
        className="fixed top-0 left-0 rounded-full pointer-events-none z-50 select-none"
        style={{
          x: cursorRingX,
          y: cursorRingY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          width: isDefaultOrPointer ? (cursorType === "pointer" ? 44 : 32) : 52,
          height: isDefaultOrPointer ? (cursorType === "pointer" ? 44 : 32) : 52,
          borderColor: isDefaultOrPointer ? (cursorType === "pointer" ? "#FFE52B" : "#2E4ED8") : "rgba(90, 110, 245, 0.3)",
          borderWidth: isDefaultOrPointer ? 2 : 1,
          backgroundColor: cursorType === "pointer" ? "rgba(46, 78, 216, 0.15)" : "rgba(46, 78, 216, 0)",
          boxShadow: !isDefaultOrPointer ? "0 0 15px rgba(90, 110, 245, 0.4)" : "none",
        }}
      />
    </>
  );
}
