"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, HelpCircle, Sparkles } from "lucide-react";

interface FAQItem {
  question: string;
  answer: string;
}

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs: FAQItem[] = [
    {
      question: "What digital marketing services does First Zone offer?",
      answer: "We offer end-to-end web engineering, digital marketing, SEO optimization, PPC paid ad campaigns, video production, and social media branding engineered by the First Zone Development Team.",
    },
    {
      question: "Can you guarantee rank #1 on Google?",
      answer: "Only search engine algorithms can guarantee top placements. However, our advanced SEO team aligns strategies directly with Google guidelines to maximize ranking trajectories!",
    },
    {
      question: "Do you work with technical or niche B2B companies?",
      answer: "Absolutely! Our First Zone Development Team builds high-performance, dynamic brand identities that turn even the most complex technical fields into exciting, high-converting digital experiences.",
    },
    {
      question: "How long until we see digital marketing results?",
      answer: "Paid Ads generate traffic immediately. Search SEO trajectories take 3-6 months. We deploy continuous A/B optimization checkpoints throughout the journey.",
    },
    {
      question: "How do we get started on a project with First Zone?",
      answer: "Simply fill out our Launchpad Contact form below or request a consultation. Our team will review your requirements and reach out within 24 hours with an actionable roadmap!",
    },
  ];

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="relative py-24 px-6 overflow-hidden select-none">
      <div className="max-w-4xl mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-block bg-primary-blue text-bg-yellow dark:bg-accent-blue dark:text-slate-900 font-black text-xs px-4 py-1.5 rounded-full uppercase tracking-wider mb-4 border border-primary-blue/20 shadow">
            Frequently Asked Questions
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-foreground mb-4">
            Got Questions? We Have Answers
          </h2>
          <p className="text-base text-foreground/75 font-medium max-w-xl mx-auto">
            Everything you need to know about partnering with the First Zone Development Team.
          </p>
        </div>

        {/* FAQ Accordion List */}
        <div className="space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;

            return (
              <motion.div
                key={index}
                className="rounded-[24px] glassmorphism-card border-2 border-primary-blue/10 overflow-hidden shadow-lg transition-all duration-300"
                initial={false}
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full p-6 text-left flex items-center justify-between gap-4 cursor-pointer focus:outline-none"
                  data-cursor="pointer"
                >
                  <span className="font-extrabold text-foreground text-base sm:text-lg flex items-center gap-3">
                    <HelpCircle size={20} className="text-primary-blue dark:text-accent-blue flex-shrink-0" />
                    {faq.question}
                  </span>

                  <motion.div
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="w-8 h-8 rounded-full bg-primary-blue/10 text-primary-blue flex items-center justify-center flex-shrink-0"
                  >
                    <ChevronDown size={18} />
                  </motion.div>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: "easeInOut" }}
                    >
                      <div className="px-6 pb-6 pt-2 text-sm text-foreground/80 font-medium leading-relaxed border-t border-primary-blue/10">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
