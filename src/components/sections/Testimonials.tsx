"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, Quote, CheckCircle, ArrowLeft, ArrowRight } from "lucide-react";

interface RealTestimonial {
  id: number;
  company: string;
  subtitle: string;
  logo: string;
  logoBg?: string;
  paragraphs: string[];
}

const TESTIMONIALS: RealTestimonial[] = [
  {
    id: 1,
    company: "Lunali Soothing Centre",
    subtitle: "Healing & Renewal • Web & Social Media Partner",
    logo: "/testimonials/lunali.png",
    paragraphs: [
      "We are extremely happy with the services provided by FirstZone Marketing. They designed a beautiful, professional website for our brand and have been managing our social media marketing with great creativity and dedication.",
      "Since working with their team, our online presence has improved significantly, helping us reach more customers and strengthen our brand identity. Their support, timely communication, and innovative ideas have been truly valuable for our business.",
      "A big thank you to the entire FirstZone Marketing team for your hard work and commitment. We highly recommend your services to anyone looking to grow their business online. Wishing you continued success and all the very best!",
    ],
  },
  {
    id: 2,
    company: "RC Unisex Salon",
    subtitle: "Reena's Creation • Social Media & Branding Partner",
    logo: "/testimonials/rc_salon.png",
    paragraphs: [
      "Working with FirstZone Marketing has been a great experience for RC Unisex Salon. Their team has helped us build a strong online presence through creative social media marketing, engaging content, and professional branding.",
      "The posters, reels, and promotional campaigns they create have helped us attract more customers and increase our visibility on social media. Their dedication, quick response, and understanding of our business needs make them a reliable marketing partner.",
      "Thank you, FirstZone Marketing, for your continuous support and excellent service. We truly appreciate your efforts and highly recommend your services to businesses looking to grow their brand. Wishing the entire FirstZone Marketing team continued success. Keep up the great work!",
    ],
  },
  {
    id: 3,
    company: "Sanskriti Collection",
    subtitle: "Shopify E-Commerce & Product Media Partner",
    logo: "/testimonials/sanskriti.png",
    paragraphs: [
      "We are delighted to work with FirstZone Marketing. Their team has done an outstanding job in developing our Shopify website, making it modern, user-friendly, and perfectly suited to our brand.",
      "Apart from the website, they have been handling our social media marketing, professional product video shoots, creative poster designs, and AI-generated promotional videos. Their innovative ideas and high-quality work have helped us showcase our collections in a more attractive and engaging way, resulting in better customer reach and brand awareness.",
      "The team is professional, creative, and always delivers on time. We truly appreciate their dedication and support in growing our business. Thank you, FirstZone Marketing, for being a trusted marketing partner. We highly recommend your services to any business looking to build a strong digital presence. Wishing the entire FirstZone Marketing team continued success and all the very best!",
    ],
  },
  {
    id: 4,
    company: "Chikankari Closet",
    subtitle: "Video Production & SEO Strategy Partner",
    logo: "/testimonials/chikankari.png",
    paragraphs: [
      "We are extremely happy with the services provided by FirstZone Marketing. Their team has been instrumental in strengthening our online presence through professional product video shoots and SEO services.",
      "The video content they created beautifully showcased our Chikankari collections, helping us engage more customers across social media. Their SEO strategies have also improved our website's visibility, making it easier for potential customers to discover our brand online.",
      "The team is creative, dedicated, and always delivers quality work on time. Their expertise and commitment have added real value to our business, and we have seen a noticeable improvement in our digital reach. Thank you, FirstZone Marketing, for your outstanding support and professionalism. We highly recommend your services to any business looking to grow online. Wishing the entire FirstZone Marketing team continued success and all the very best!",
    ],
  },
  {
    id: 5,
    company: "Bethany Pre School",
    subtitle: "Pre-School & Day Care • Photo/Video & Social Media Partner",
    logo: "/testimonials/bethany.png",
    paragraphs: [
      "We had a wonderful experience working with FirstZone Marketing. Their team has been creating engaging social media content and conducting professional photo and video shoots that beautifully capture our preschool activities, events, and joyful moments.",
      "The creative reels, posters, and videos have helped us connect with parents and showcase the warm, nurturing environment at our preschool. Their dedication, creativity, and attention to detail have significantly enhanced our online presence and strengthened our brand.",
      "The team is professional, punctual, and always understands our requirements perfectly. We truly appreciate their continuous support and innovative ideas. Thank you, FirstZone Marketing, for helping us share our journey with so many families. We highly recommend your services to anyone looking for creative and effective digital marketing solutions. Wishing the entire FirstZone Marketing team continued success and all the very best!",
    ],
  },
  {
    id: 6,
    company: "Symphony Music School",
    subtitle: "Music Academy • Video Production & Social Media Partner",
    logo: "/testimonials/symphony.png",
    logoBg: "bg-slate-950",
    paragraphs: [
      "We are delighted to work with FirstZone Marketing. Their team has done an exceptional job with professional video shoots and social media marketing for Symphony Music School.",
      "The videos they created beautifully captured our music classes, student performances, and the vibrant atmosphere of our academy. Their creative content and consistent social media management have helped us reach more students, increase engagement, and build a stronger online presence.",
      "The team is highly professional, creative, and always delivers quality work on time. Their dedication and innovative marketing strategies have made a real difference in promoting our music school. Thank you, FirstZone Marketing, for your outstanding support and commitment. We highly recommend your services to anyone looking to grow their brand through creative digital marketing. Wishing the entire FirstZone Marketing team continued success and all the very best!",
    ],
  },
  {
    id: 7,
    company: "Lakshya Group",
    subtitle: "Your Goal Our Mission • Video Production & Media Partner",
    logo: "/testimonials/lakshya.png",
    paragraphs: [
      "We had an excellent experience working with FirstZone Marketing. Their team delivered high-quality professional video shoots and engaging social media content that perfectly represented the vision and values of Lakshya Group.",
      "The videos were creative, well-produced, and effectively showcased our projects and services. Their content strategy, posters, and social media creatives helped us improve our online presence, increase audience engagement, and strengthen our brand identity.",
      "The FirstZone Marketing team is professional, creative, and always committed to delivering quality work on time. Their support and innovative ideas have been valuable to our business growth. Thank you, FirstZone Marketing, for your dedication and outstanding service. We highly recommend your digital marketing and creative services to any business looking to enhance its brand. Wishing the entire FirstZone Marketing team continued success and all the very best!",
    ],
  },
];

export default function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % TESTIMONIALS.length);
    }, 10000);
    return () => clearInterval(timer);
  }, []);

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % TESTIMONIALS.length);
  };

  const activeReview = TESTIMONIALS[activeIndex];

  return (
    <section className="relative py-24 px-6 overflow-hidden select-none">
      <div className="max-w-4xl mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="text-center mb-14">
          <div className="inline-block bg-primary-blue text-bg-yellow dark:bg-accent-blue dark:text-slate-900 font-black text-xs px-4 py-1.5 rounded-full uppercase tracking-wider mb-4 border border-primary-blue/20 shadow">
            Client Success Reviews
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-foreground mb-4">
            What Our Clients Say
          </h2>
          <p className="text-base text-foreground/75 font-medium max-w-xl mx-auto">
            Real feedback from businesses and brands that rely on First Zone Marketing for digital growth.
          </p>

          {/* Review Switcher Tabs */}
          <div className="flex flex-wrap justify-center items-center gap-2 mt-8">
            {TESTIMONIALS.map((t, idx) => (
              <button
                key={t.id}
                onClick={() => setActiveIndex(idx)}
                className={`px-3 py-1 rounded-2xl font-black text-[11px] sm:text-xs uppercase tracking-wider transition-all duration-300 border-2 ${
                  activeIndex === idx
                    ? "bg-primary-blue text-bg-yellow border-primary-blue shadow-lg scale-105"
                    : "glassmorphism text-foreground border-primary-blue/10 hover:border-primary-blue/30"
                }`}
              >
                {t.company}
              </button>
            ))}
          </div>
        </div>

        {/* Featured Client Review Card Carousel */}
        <div className="relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeReview.id}
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              transition={{ type: "spring", stiffness: 120, damping: 18 }}
              className="relative p-8 sm:p-12 rounded-[36px] glassmorphism-card border-2 border-primary-blue/20 shadow-2xl overflow-hidden"
            >
              {/* Subtle Background Accent */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-primary-blue/5 dark:bg-accent-blue/10 rounded-full blur-3xl pointer-events-none" />

              {/* Top Bar: Stars + Verified Badge */}
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

              {/* Review Text Paragraphs */}
              <div className="space-y-4 text-base sm:text-lg text-foreground/90 font-semibold leading-relaxed mb-10 italic">
                {activeReview.paragraphs.map((para, i) => (
                  <p key={i}>&ldquo;{para}&rdquo;</p>
                ))}
              </div>

              {/* Reviewer Details & Official Logo */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-6 border-t border-primary-blue/15 pt-8">
                <div className="flex items-center gap-5">
                  {/* Brand Logo Container */}
                  <div className={`w-16 h-16 sm:w-20 sm:h-20 rounded-2xl ${activeReview.logoBg || "bg-white"} p-2 border-2 border-primary-blue/20 shadow-md flex items-center justify-center overflow-hidden flex-shrink-0`}>
                    <img
                      src={activeReview.logo}
                      alt={`${activeReview.company} Logo`}
                      className="w-full h-full object-contain"
                    />
                  </div>

                  <div className="text-left">
                    <h3 className="font-extrabold text-foreground text-lg sm:text-xl">
                      {activeReview.company}
                    </h3>
                    <p className="text-xs font-bold text-primary-blue dark:text-accent-blue uppercase tracking-wider mt-0.5">
                      {activeReview.subtitle}
                    </p>
                  </div>
                </div>

                {/* Carousel Navigation Controls */}
                <div className="flex items-center gap-3">
                  <motion.button
                    onClick={handlePrev}
                    className="w-11 h-11 rounded-full glassmorphism flex items-center justify-center border-2 border-primary-blue/20 text-foreground shadow-md hover:bg-primary-blue/10 transition-colors"
                    whileHover={{ scale: 1.08 }}
                    whileTap={{ scale: 0.92 }}
                    aria-label="Previous Review"
                  >
                    <ArrowLeft size={18} />
                  </motion.button>
                  <motion.button
                    onClick={handleNext}
                    className="w-11 h-11 rounded-full glassmorphism flex items-center justify-center border-2 border-primary-blue/20 text-foreground shadow-md hover:bg-primary-blue/10 transition-colors"
                    whileHover={{ scale: 1.08 }}
                    whileTap={{ scale: 0.92 }}
                    aria-label="Next Review"
                  >
                    <ArrowRight size={18} />
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
}
