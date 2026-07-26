"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Check, Sparkles } from "lucide-react";

interface PricingPlan {
  name: string;
  price: string;
  period: string;
  description: string;
  features: string[];
  isPopular: boolean;
  buttonText: string;
  badge?: string;
}

export default function Pricing() {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  const plans: PricingPlan[] = [
    {
      name: "Starter Pilot",
      price: "$1,499",
      period: "month",
      description: "Perfect for local businesses wanting to jumpstart their digital ranking.",
      features: [
        "SEO Kickstart Audit & Setup",
        "Google Ads Campaign Launch",
        "Basic Social Media Branding",
        "Custom 3-Page Website",
        "Monthly Growth Reports",
      ],
      isPopular: false,
      buttonText: "Launch Campaign",
    },
    {
      name: "Professional Crew",
      price: "$3,499",
      period: "month",
      description: "Our core scaling suite for aggressive startups wanting rapid ROI growth.",
      features: [
        "Full SEO Domination Strategy",
        "Google, FB & Insta Ads Suite",
        "Premium Visual Branding & Logo",
        "Custom Next.js Web Application",
        "Conversion Funnel Optimization",
        "Dedicated Marketing Manager",
        "24/7 Slack Support Channel",
      ],
      isPopular: true,
      buttonText: "Dominate Market",
      badge: "⭐ MOST POPULAR",
    },
    {
      name: "Enterprise Fleet",
      price: "$7,999",
      period: "month",
      description: "Complete performance takeover, custom software dev, and omnichannel branding.",
      features: [
        "Omnichannel Paid Ads Strategy",
        "Custom API & Mobile Web Dev",
        "Complete Brand Re-design & Assets",
        "Viral Content Creation Suite",
        "Unlimited Analytics Funnels",
        "Weekly Strategy Reviews",
        "Dedicated Development Squad",
      ],
      isPopular: false,
      buttonText: "Enlist Squad",
    },
  ];

  return (
    <section id="pricing" className="relative py-24 px-6 overflow-hidden">
      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-block bg-primary-blue text-bg-yellow dark:bg-accent-blue dark:text-slate-900 font-black text-xs px-4 py-1.5 rounded-full uppercase tracking-wider mb-4">
            Investment Plans
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-foreground mb-4">
            Transparent Pricing. Epic Value.
          </h2>
          <p className="text-base text-foreground/75 font-medium max-w-xl mx-auto">
            Choose the growth framework that matches your budget. No hidden fees, cancel anytime.
          </p>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          {plans.map((plan, idx) => {
            const isHovered = hoveredIdx === idx;
            const isPopular = plan.isPopular;

            return (
              <motion.div
                key={plan.name}
                className="relative"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                onMouseEnter={() => setHoveredIdx(idx)}
                onMouseLeave={() => setHoveredIdx(null)}
              >
                {/* Popular continuous glowing border */}
                {isPopular && (
                  <div className="absolute inset-0 rounded-[32px] bg-gradient-to-r from-primary-blue via-accent-blue to-primary-blue opacity-50 blur-lg animate-pulse z-0 pointer-events-none" />
                )}

                {/* Plan Card */}
                <motion.div
                  className={`relative h-full p-8 rounded-[32px] glassmorphism-card border-2 flex flex-col justify-between overflow-hidden z-10 transition-all duration-300 ${
                    isPopular
                      ? "border-primary-blue shadow-2xl scale-[1.03]"
                      : isHovered
                      ? "border-primary-blue shadow-lg scale-[1.01]"
                      : "border-primary-blue/10"
                  }`}
                  animate={isPopular ? { y: [-2, 2] } : {}}
                  transition={{ duration: 4, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
                >
                  {/* Card Shine Reflection (on hover) */}
                  {isHovered && (
                    <motion.div
                      className="absolute inset-0 w-[200%] h-full bg-gradient-to-tr from-transparent via-white/10 to-transparent pointer-events-none z-20"
                      initial={{ x: "-100%" }}
                      animate={{ x: "100%" }}
                      transition={{ duration: 1.2, ease: "easeInOut" }}
                    />
                  )}

                  {/* Top Segment */}
                  <div>
                    {/* Header */}
                    <div className="flex justify-between items-center mb-6">
                      <h3 className="text-xl font-black text-foreground">{plan.name}</h3>
                      {plan.badge && (
                        <span className="text-[10px] font-black uppercase tracking-wider bg-primary-blue text-bg-yellow dark:bg-accent-blue dark:text-slate-900 px-3 py-1 rounded-full flex items-center gap-1">
                          <Sparkles size={10} />
                          {plan.badge}
                        </span>
                      )}
                    </div>

                    {/* Pricing */}
                    <div className="flex items-baseline mb-4">
                      <span className="text-4xl sm:text-5xl font-black text-primary-blue dark:text-accent-blue tracking-tight">
                        {plan.price}
                      </span>
                      <span className="text-sm font-bold text-foreground/60 ml-2">
                        /{plan.period}
                      </span>
                    </div>

                    <p className="text-xs text-foreground/80 leading-relaxed font-medium mb-8">
                      {plan.description}
                    </p>

                    {/* Features Divider */}
                    <div className="h-px bg-primary-blue/10 dark:bg-slate-700/50 mb-8" />

                    {/* Features List */}
                    <ul className="flex flex-col gap-4 mb-8">
                      {plan.features.map((feature) => (
                        <li key={feature} className="flex items-start gap-3">
                          <span className="w-5 h-5 rounded-full bg-primary-blue/10 dark:bg-accent-blue/15 text-primary-blue dark:text-accent-blue flex items-center justify-center flex-shrink-0 mt-0.5">
                            <Check size={12} strokeWidth={3} />
                          </span>
                          <span className="text-xs text-foreground/80 font-bold leading-tight">
                            {feature}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Action button */}
                  <motion.button
                    className={`w-full py-4 rounded-2xl font-black text-sm text-center shadow border-2 transition-all duration-300 ${
                      isPopular
                        ? "bg-primary-blue text-bg-yellow border-primary-blue"
                        : "bg-white-custom/80 dark:bg-slate-800/80 text-primary-blue dark:text-accent-blue border-primary-blue/10 hover:border-primary-blue"
                    }`}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                  >
                    {plan.buttonText}
                  </motion.button>

                </motion.div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
