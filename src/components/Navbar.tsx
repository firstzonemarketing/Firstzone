"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sun, Moon, Menu, X } from "lucide-react";
import confetti from "canvas-confetti";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Monitor scroll for glass effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Sync theme
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    if (savedTheme === "dark" || (!savedTheme && prefersDark)) {
      setIsDarkMode(true);
      document.documentElement.classList.add("dark");
    } else {
      setIsDarkMode(false);
      document.documentElement.classList.remove("dark");
    }
  }, []);

  const toggleTheme = () => {
    if (isDarkMode) {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
      setIsDarkMode(false);
    } else {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
      setIsDarkMode(true);
    }
  };

  const handleLogoClick = () => {
    // Blast confetti!
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
    { name: "Gallery", href: "/#gallery" },
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
          >
            <motion.img
              src="/logo.jpg"
              alt="First Zone Logo"
              className="h-10 w-auto rounded-xl shadow-md border-2 border-primary-blue/20"
              whileHover={{ scale: 1.08, rotate: 2 }}
              transition={{ type: "spring", stiffness: 300, damping: 15 }}
            />
          </button>

          {/* Desktop Nav Items */}
          <div className="hidden md:flex items-center gap-8">
            {menuItems.map((item) => (
              <motion.a
                key={item.name}
                href={item.href}
                className="relative font-bold text-sm text-foreground/80 hover:text-primary-blue dark:hover:text-accent-blue transition-colors px-1 py-1"
                whileHover={{ scale: 1.05 }}
              >
                {item.name}
                {/* Custom animated underline */}
                <motion.div
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary-blue dark:bg-accent-blue origin-left"
                  initial={{ scaleX: 0 }}
                  whileHover={{ scaleX: 1 }}
                  transition={{ duration: 0.2 }}
                />
              </motion.a>
            ))}
          </div>

          {/* Right Action Items */}
          <div className="hidden md:flex items-center gap-4">
            {/* Theme Toggle Button */}
            <motion.button
              onClick={toggleTheme}
              className="p-2.5 rounded-xl glassmorphism border border-primary-blue/15 text-foreground hover:bg-primary-blue/10 transition-colors"
              whileHover={{ scale: 1.1, rotate: 15 }}
              whileTap={{ scale: 0.9 }}
              aria-label="Toggle Theme"
            >
              {isDarkMode ? (
                <Sun className="w-5 h-5 text-bg-yellow" />
              ) : (
                <Moon className="w-5 h-5 text-primary-blue" />
              )}
            </motion.button>

            {/* CTA Button */}
            <motion.a
              href="/#contact"
              className="px-5 py-2.5 rounded-xl bg-primary-blue text-bg-yellow font-black text-xs uppercase tracking-wider shadow-md hover:shadow-primary-blue/30 transition-all border border-primary-blue"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              Get Started
            </motion.a>
          </div>

          {/* Mobile Hamburger Button */}
          <div className="flex md:hidden items-center gap-3">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-xl glassmorphism text-foreground"
            >
              {isDarkMode ? (
                <Sun className="w-5 h-5 text-bg-yellow" />
              ) : (
                <Moon className="w-5 h-5 text-primary-blue" />
              )}
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl glassmorphism text-foreground"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            className="fixed inset-0 z-50 bg-bg-yellow dark:bg-slate-900 flex flex-col justify-between p-6 md:hidden"
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
          >
            <div className="flex items-center justify-between">
              <img src="/logo.jpg" alt="First Zone Logo" className="h-10 w-auto rounded-xl" />
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="p-2 rounded-full bg-primary-blue text-bg-yellow font-bold"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="flex flex-col gap-6 text-center my-auto">
              {menuItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-2xl font-black text-slate-900 dark:text-slate-100 hover:text-primary-blue transition-colors"
                >
                  {item.name}
                </a>
              ))}
            </div>

            <a
              href="/#contact"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full py-4 text-center rounded-2xl bg-primary-blue text-bg-yellow font-black text-sm uppercase tracking-wider shadow-lg"
            >
              Get Started Now
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
