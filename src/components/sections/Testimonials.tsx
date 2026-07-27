"use client";

import React from "react";
import { motion } from "framer-motion";
import { Star, Quote, CheckCircle } from "lucide-react";

export default function Testimonials() {
  return (
    <section className="relative py-24 px-6 overflow-hidden select-none">
      <div className="max-w-4xl mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="text-center mb-14">
          <div className="inline-block bg-primary-blue text-bg-yellow dark:bg-accent-blue dark:text-slate-900 font-black text-xs px-4 py-1.5 rounded-full uppercase tracking-wider mb-4 border border-primary-blue/20 shadow">
            Client Review
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-foreground mb-4">
            What Our Clients Say
          </h2>
          <p className="text-base text-foreground/75 font-medium max-w-xl mx-auto">
            Real feedback from partners who trust First Zone Marketing with their web development and digital marketing growth.
          </p>
        </div>

        {/* Featured Client Review Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative p-8 sm:p-12 rounded-[36px] glassmorphism-card border-2 border-primary-blue/20 shadow-2xl overflow-hidden"
        >
          {/* Subtle Background Accent */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary-blue/5 dark:bg-accent-blue/10 rounded-full blur-3xl pointer-events-none" />

          {/* Quote Icon Badge */}
          <div className="flex items-center justify-between gap-4 mb-8">
            <div className="flex items-center gap-1 text-amber-400">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={22} fill="currentColor" className="text-amber-400" />
              ))}
            </div>

            <div className="inline-flex items-center gap-1.5 text-xs font-black uppercase tracking-wider bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 px-3.5 py-1.5 rounded-full border border-emerald-500/20">
              <CheckCircle size={14} />
              <span>Verified Client Review</span>
            </div>
          </div>

          {/* Review Text */}
          <div className="space-y-4 text-base sm:text-lg text-foreground/90 font-semibold leading-relaxed mb-10 italic">
            <p>
              &ldquo;We are extremely happy with the services provided by FirstZone Marketing. They designed a beautiful, professional website for our brand and have been managing our social media marketing with great creativity and dedication.&rdquo;
            </p>
            <p>
              &ldquo;Since working with their team, our online presence has improved significantly, helping us reach more customers and strengthen our brand identity. Their support, timely communication, and innovative ideas have been truly valuable for our business.&rdquo;
            </p>
            <p>
              &ldquo;A big thank you to the entire FirstZone Marketing team for your hard work and commitment. We highly recommend your services to anyone looking to grow their business online. Wishing you continued success and all the very best!&rdquo;
            </p>
          </div>

          {/* Reviewer Details & Official Logo */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6 border-t border-primary-blue/15 pt-8">
            <div className="flex items-center gap-5">
              {/* Brand Logo Container */}
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-white p-2 border-2 border-primary-blue/20 shadow-md flex items-center justify-center overflow-hidden flex-shrink-0">
                <img
                  src="/testimonials/lunali.png"
                  alt="Lunali Soothing Centre Logo"
                  className="w-full h-full object-contain"
                />
              </div>

              <div className="text-left">
                <h3 className="font-extrabold text-foreground text-lg sm:text-xl">
                  Lunali Soothing Centre
                </h3>
                <p className="text-xs font-bold text-primary-blue dark:text-accent-blue uppercase tracking-wider mt-0.5">
                  Healing & Renewal &bull; Web & Social Media Client
                </p>
              </div>
            </div>

            <div className="text-right hidden sm:block">
              <Quote size={48} className="text-primary-blue/20 dark:text-accent-blue/30 ml-auto" />
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
