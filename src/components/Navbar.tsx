"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sun, Moon, Menu, X, Rocket, Sparkles } from "lucide-react";
import confetti from "canvas-confetti";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    // Check initial dark mode preference
    if (
      localStorage.theme === "dark" ||
      (!("theme" in localStorage) &&
        window.matchMedia("(prefers-color-scheme: dark)").matches)
    ) {
      setDarkMode(true);
      document.documentElement.classList.add("dark");
    } else {
      setDarkMode(false);
      document.documentElement.classList.remove("dark");
    }
  }, []);

  const toggleDarkMode = () => {
    if (darkMode) {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
      setDarkMode(false);
    } else {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
      setDarkMode(true);
    }
  };

  const handleLogoClick = () => {
    confetti({
      particleCount: 150,
      spread: 80,
      origin: { y: 0.1, x: 0.15 },
      colors: ["#2E4ED8", "#5A6EF5", "#FFE52B", "#FFFFFF"],
    });

    if (window.location.pathname !== "/") {
      window.location.href = "/";
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const menuItems = [
    { name: "Services", href: "/#services" },
    { name: "Why Us", href: "/#why-us" },
    { name: "Portfolio", href: "/#portfolio" },
    { name: "Process", href: "/#process" },
    { name: "Gallery", href: "/blogs#gallery" },
    { name: "Blog", href: "/blogs" },
    { name: "FAQ", href: "/#faq" },
    { name: "Contact", href: "/#contact" },
  ];

  return (
    <>
      <motion.nav
        className={`fixed top-0 inset-x-0 z-40 transition-all duration-300 ${
          isScrolled
            ? "glassmorphism py-3 shadow-lg border-b border-primary-blue/10"
            : "bg-transparent py-5"
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 100, damping: 20 }}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          {/* Logo with Easter Egg */}
          <button
            onClick={handleLogoClick}
            className="flex items-center gap-2 group select-none"
            data-cursor="pointer"
          >
            <div className="w-10 h-10 rounded-2xl overflow-hidden border-2 border-primary-blue shadow-md group-hover:scale-105 transition-transform bg-primary-blue flex items-center justify-center text-bg-yellow font-black text-xl">
              <img src="/logo.jpg" alt="First Zone Logo" className="w-full h-full object-cover" />
            </div>
            <div className="flex flex-col text-left">
              <span className="font-extrabold text-foreground text-lg leading-none tracking-tight group-hover:text-primary-blue transition-colors">
                FIRST<span className="text-primary-blue dark:text-accent-blue">ZONE</span>
              </span>
              <span className="text-[10px] font-bold text-foreground/60 tracking-widest uppercase mt-0.5">
                Digital Marketing
              </span>
            </div>
          </button>

          {/* Desktop Nav Items */}
          <div className="hidden md:flex items-center gap-7">
            {menuItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="text-xs font-black uppercase tracking-wider text-foreground/80 hover:text-primary-blue dark:hover:text-accent-blue transition-colors relative py-1 group"
                data-cursor="pointer"
              >
                {item.name}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary-blue dark:bg-accent-blue transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </div>

          {/* Right Action Controls */}
          <div className="hidden md:flex items-center gap-4">
            {/* Dark Mode Toggle */}
            <button
              onClick={toggleDarkMode}
              className="p-2.5 rounded-full glassmorphism text-foreground hover:text-primary-blue transition-all duration-300 border border-primary-blue/20 hover:scale-110"
              aria-label="Toggle Theme"
              data-cursor="pointer"
            >
              {darkMode ? <Sun size={18} className="text-bg-yellow" /> : <Moon size={18} className="text-primary-blue" />}
            </button>

            {/* Launch CTA Button */}
            <a
              href="/#contact"
              className="relative group overflow-hidden px-5 py-2.5 rounded-full bg-primary-blue text-bg-yellow font-black text-xs uppercase tracking-wider shadow-lg hover:shadow-xl hover:shadow-primary-blue/30 transition-all duration-300 flex items-center gap-2 border border-bg-yellow/40"
              data-cursor="rocket"
            >
              <Rocket size={14} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              <span>Launch Project</span>
            </a>
          </div>

          {/* Mobile Hamburger Button */}
          <div className="flex md:hidden items-center gap-3">
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-full glassmorphism text-foreground border border-primary-blue/20"
              aria-label="Toggle Theme"
            >
              {darkMode ? <Sun size={18} className="text-bg-yellow" /> : <Moon size={18} className="text-primary-blue" />}
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2.5 rounded-2xl glassmorphism text-foreground border border-primary-blue/20"
              aria-label="Toggle Mobile Menu"
            >
              {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Drawer Navigation */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            className="fixed inset-0 z-30 bg-slate-950/80 backdrop-blur-lg pt-28 px-6 flex flex-col justify-between pb-10 md:hidden"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <div className="flex flex-col gap-6 text-center">
              {menuItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-lg font-black text-white hover:text-bg-yellow uppercase tracking-wider transition-colors"
                >
                  {item.name}
                </a>
              ))}
            </div>

            <div className="w-full">
              <a
                href="/#contact"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full py-4 rounded-2xl bg-primary-blue text-bg-yellow font-black text-sm uppercase tracking-wider flex items-center justify-center gap-2 shadow-xl border border-bg-yellow/40"
              >
                <Rocket size={18} />
                <span>Launch Project</span>
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
