"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, MessageSquare, Mail, Phone, MapPin } from "lucide-react";
import confetti from "canvas-confetti";
import MegaphoneDance from "../mascot/MegaphoneDance";

export default function Contact() {
  const [formState, setFormState] = useState({ name: "", email: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formState.name || !formState.email || !formState.message) return;

    setIsSubmitting(true);
    
    // Save lead to localStorage
    try {
      const existingLeads = JSON.parse(localStorage.getItem("leads") || "[]");
      const newLead = {
        ...formState,
        id: Date.now(),
        timestamp: new Date().toLocaleString(),
      };
      localStorage.setItem("leads", JSON.stringify([newLead, ...existingLeads]));
    } catch (err) {
      console.error("Failed to save lead:", err);
    }

    // Simulate submission delay
    await new Promise((resolve) => setTimeout(resolve, 1500));
    
    setIsSubmitting(false);
    setSubmitted(true);
    
    // Confetti blast!
    confetti({
      particleCount: 100,
      spread: 60,
      origin: { y: 0.6 },
      colors: ["#2E4ED8", "#5A6EF5", "#FFE52B", "#FFFFFF"],
    });

    // Reset form after a few seconds
    setTimeout(() => {
      setSubmitted(false);
      setFormState({ name: "", email: "", message: "" });
    }, 4000);
  };

  return (
    <section id="contact" className="relative py-24 px-6 overflow-hidden">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 relative z-10">
        
        {/* Left: Contact Form Card */}
        <div className="lg:col-span-6">
          <div className="mb-8 text-center lg:text-left">
            <div className="inline-block bg-primary-blue text-bg-yellow dark:bg-accent-blue dark:text-slate-900 font-black text-xs px-4 py-1.5 rounded-full uppercase tracking-wider mb-4">
              Get in Touch
            </div>
            <h2 className="text-3xl sm:text-5xl font-black text-foreground mb-4">
              Launch Your Project Today
            </h2>
            <p className="text-base text-foreground/75 font-medium">
              Fill out the launchpad checklist below. Our team responds within one business day!
            </p>
          </div>

          <div className="p-8 rounded-[32px] glassmorphism-card border border-primary-blue/15 shadow-xl relative overflow-hidden">
            
            {/* Paper Airplane flight overlay on success */}
            <AnimatePresence>
              {submitted && (
                <motion.div
                  className="absolute inset-0 bg-primary-blue text-bg-yellow flex flex-col items-center justify-center gap-4 z-20"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  {/* Paper airplane vector flying */}
                  <motion.svg
                    viewBox="0 0 24 24"
                    className="w-20 h-20 fill-current"
                    animate={{
                      x: [0, 40, -100, 300],
                      y: [0, -30, -50, -200],
                      scale: [1, 1.2, 0.8, 0],
                      rotate: [0, -10, 45, 45],
                    }}
                    transition={{ duration: 1.8, ease: "easeInOut" }}
                  >
                    <path d="M2 21L23 12L2 3V10L17 12L2 14V21Z" />
                  </motion.svg>
                  <h3 className="text-2xl font-black">Message Sent!</h3>
                  <p className="text-sm font-semibold max-w-xs text-center opacity-90">
                    Thank you! The paper airplane landed on our developer desk. Confetti deployed!
                  </p>
                </motion.div>
              )}
            </AnimatePresence>

            <form onSubmit={handleSubmit} className="flex flex-col gap-6">
              {/* Name Input */}
              <div className="flex flex-col gap-2">
                <label className="text-xs font-black uppercase tracking-wider text-foreground/80">
                  Your Crew Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Captain Carter"
                  value={formState.name}
                  onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                  className="w-full px-5 py-4 rounded-2xl glassmorphism border border-primary-blue/15 text-foreground text-sm font-bold placeholder-foreground/30 focus:outline-none focus:border-primary-blue focus:ring-2 focus:ring-primary-blue/10 transition-all duration-300"
                />
              </div>

              {/* Email Input */}
              <div className="flex flex-col gap-2">
                <label className="text-xs font-black uppercase tracking-wider text-foreground/80">
                  Transmission Email
                </label>
                <input
                  type="email"
                  required
                  placeholder="e.g. captain@agency.com"
                  value={formState.email}
                  onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                  className="w-full px-5 py-4 rounded-2xl glassmorphism border border-primary-blue/15 text-foreground text-sm font-bold placeholder-foreground/30 focus:outline-none focus:border-primary-blue focus:ring-2 focus:ring-primary-blue/10 transition-all duration-300"
                />
              </div>

              {/* Message Input */}
              <div className="flex flex-col gap-2">
                <label className="text-xs font-black uppercase tracking-wider text-foreground/80">
                  Project Launch Coordinates (Message)
                </label>
                <textarea
                  required
                  rows={4}
                  placeholder="Tell us about your SEO goals, web development needs, or budget scope..."
                  value={formState.message}
                  onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                  className="w-full px-5 py-4 rounded-2xl glassmorphism border border-primary-blue/15 text-foreground text-sm font-bold placeholder-foreground/30 focus:outline-none focus:border-primary-blue focus:ring-2 focus:ring-primary-blue/10 transition-all duration-300 resize-none"
                />
              </div>

              {/* Submit Button */}
              <motion.button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 rounded-2xl bg-primary-blue text-bg-yellow font-black text-sm text-center shadow border-2 border-primary-blue hover:shadow-primary-blue/30 flex items-center justify-center gap-2 select-none"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {isSubmitting ? (
                  <span className="w-5 h-5 rounded-full border-2 border-bg-yellow border-t-transparent animate-spin" />
                ) : (
                  <>
                    <span>Launch Transmission</span>
                    <Send size={16} />
                  </>
                )}
              </motion.button>
            </form>
          </div>
        </div>

        {/* Right: Cartoon Map & Contacts */}
        <div className="lg:col-span-6 flex flex-col justify-between">
          {/* Cartoon Map Representation */}
          <div className="p-8 rounded-[32px] glassmorphism border-2 border-primary-blue/10 shadow-lg relative overflow-hidden flex flex-col justify-center items-center h-80 mb-8">
            <div className="absolute inset-0 bg-primary-blue/5 pointer-events-none" />
            
            {/* Mascot peeking inside map */}
            <MegaphoneDance className="w-32 h-32 absolute top-4 z-10" />

            {/* Simulated Map Coordinates Grid */}
            <div className="absolute inset-0 grid grid-cols-6 grid-rows-6 opacity-[0.1] pointer-events-none">
              {[...Array(36)].map((_, i) => (
                <div key={i} className="border border-primary-blue" />
              ))}
            </div>

            <div className="relative z-10 text-center mt-28">
              <span className="inline-block bg-primary-blue/15 text-primary-blue dark:text-accent-blue font-black text-[10px] px-3 py-1 rounded-full mb-3">
                📍 FIRST ZONE MARKETING COMMAND
              </span>
              <h4 className="font-extrabold text-foreground text-sm">First Zone Executive Command</h4>
              <p className="text-xs text-foreground/75 font-semibold mt-1">
                Zone 1, Digital City Suite 101
              </p>
            </div>
          </div>

          {/* Quick contact text cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 rounded-2xl glassmorphism border border-primary-blue/10 flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-primary-blue/15 text-primary-blue flex items-center justify-center flex-shrink-0">
                <Mail size={18} />
              </div>
              <div>
                <div className="text-[10px] font-black text-foreground/50 uppercase">Email</div>
                <div className="text-xs font-black text-foreground">firstzonemarketing@gmail.com</div>
              </div>
            </div>
            <div className="p-4 rounded-2xl glassmorphism border border-primary-blue/10 flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-accent-blue/15 text-accent-blue flex items-center justify-center flex-shrink-0">
                <Phone size={18} />
              </div>
              <div>
                <div className="text-[10px] font-black text-foreground/50 uppercase">Phone</div>
                <div className="text-xs font-black text-foreground">+91 94861 20781</div>
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* Floating WhatsApp Button (Bottom Right) */}
      <motion.a
        href="https://wa.me/919486120781"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 w-14 h-14 rounded-full bg-emerald-500 hover:bg-emerald-600 text-white flex items-center justify-center shadow-lg hover:shadow-emerald-500/30 z-30 border-2 border-white"
        animate={{
          scale: [1, 1.1, 1],
          boxShadow: [
            "0 4px 10px rgba(16, 185, 129, 0.2)",
            "0 4px 20px rgba(16, 185, 129, 0.4)",
            "0 4px 10px rgba(16, 185, 129, 0.2)",
          ],
        }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        whileHover={{ scale: 1.15 }}
        whileTap={{ scale: 0.9 }}
        title="Chat on WhatsApp"
      >
        <MessageSquare size={24} fill="currentColor" />
      </motion.a>
    </section>
  );
}
