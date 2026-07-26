"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import { 
  Search, Target, Users, Code, Layers, Palette, Award, 
  BookOpen, Film, Mail, TrendingUp, Sparkles 
} from "lucide-react";

// ==========================================
// 1. INDIVIDUAL WORLD SUB-COMPONENTS (SVGs)
// ==========================================

// SEO WORLD: Astronaut launches ranking rocket
function SeoWorld() {
  const [rank, setRank] = useState(100);
  const [isLaunching, setIsLaunching] = useState(false);

  useEffect(() => {
    if (isLaunching) {
      let current = 100;
      const interval = setInterval(() => {
        if (current > 1) {
          current -= 3;
          setRank(Math.max(1, current));
        } else {
          clearInterval(interval);
          // Confetti on reaching #1
          confetti({
            particleCount: 50,
            spread: 40,
            origin: { y: 0.6 },
            colors: ["#FFE52B", "#2E4ED8", "#FFFFFF"]
          });
        }
      }, 30);
      return () => clearInterval(interval);
    } else {
      setRank(100);
    }
  }, [isLaunching]);

  return (
    <div className="w-full h-full flex flex-col justify-between items-center p-6 text-center select-none">
      <div className="text-sm font-black text-primary-blue dark:text-accent-blue bg-white/50 px-4 py-1.5 rounded-full shadow border border-primary-blue/10">
        🛰️ Google Satellite Stream: <span className="text-emerald-400 font-extrabold">Rank #{rank}</span>
      </div>

      <div className="relative w-44 h-44 flex items-center justify-center">
        {/* Google style ranking tower */}
        <div className="absolute bottom-2 w-8 bg-slate-200 dark:bg-slate-700 h-28 rounded-t border-r border-slate-300 dark:border-slate-800" />
        <div className="absolute bottom-2 w-12 bg-slate-300 dark:bg-slate-800 h-8 rounded border-b border-slate-400" />

        {/* Launching Rocket */}
        <motion.div
          animate={isLaunching ? {
            y: [-10, -180],
            scaleY: [1, 1.2, 0.7],
            opacity: [1, 1, 0]
          } : {
            y: [-5, 5, -5]
          }}
          transition={{
            y: isLaunching ? { duration: 1.5, ease: "easeIn" } : { duration: 4, repeat: Infinity, ease: "easeInOut" }
          }}
          className="absolute bottom-4 z-20 cursor-pointer"
          onClick={() => setIsLaunching(true)}
          data-cursor="rocket"
        >
          <svg viewBox="0 0 100 100" className="w-16 h-16">
            <path d="M50 15 C35 45 35 65 35 85 L65 85 C65 65 65 45 50 15 Z" fill="white" stroke="#1F2937" strokeWidth="4" />
            <path d="M50 15 L50 85" stroke="#1F2937" strokeWidth="3" />
            <circle cx="50" cy="45" r="8" fill="#2E4ED8" stroke="#1F2937" strokeWidth="3" />
            {/* Fins */}
            <path d="M35 65 L20 85 L35 80 Z" fill="#2E4ED8" stroke="#1F2937" strokeWidth="3" />
            <path d="M65 65 L80 85 L65 80 Z" fill="#2E4ED8" stroke="#1F2937" strokeWidth="3" />
            {/* Flame */}
            <motion.path
              d="M42 85 C38 100 50 110 50 110 C 50 110 62 100 58 85 Z"
              fill="#FFE52B"
              animate={{ scaleY: [1, 1.4, 0.8, 1] }}
              transition={{ repeat: Infinity, duration: 0.2 }}
            />
          </svg>
        </motion.div>
      </div>

      <button
        onClick={() => setIsLaunching(!isLaunching)}
        className="px-6 py-3 rounded-2xl bg-primary-blue text-bg-yellow font-black text-xs uppercase tracking-wider shadow border border-primary-blue"
      >
        {isLaunching ? "Reset Orbit" : "Launch Ranking Rocket"}
      </button>
    </div>
  );
}

// GOOGLE ADS WORLD: Cyber archer shoots target
function GoogleAdsWorld() {
  const [arrowsCount, setArrowsCount] = useState(0);
  const [isShooting, setIsShooting] = useState(false);
  const [ctr, setCtr] = useState(1.8);

  const handleShoot = () => {
    if (isShooting) return;
    setIsShooting(true);
    setTimeout(() => {
      setArrowsCount(prev => prev + 1);
      setCtr(prev => parseFloat((prev + 0.6).toFixed(1)));
      setIsShooting(false);
      // Confetti burst
      confetti({
        particleCount: 20,
        spread: 30,
        colors: ["#EF4444", "#FFE52B"]
      });
    }, 600);
  };

  return (
    <div className="w-full h-full flex flex-col justify-between items-center p-6 text-center select-none">
      <div className="text-sm font-black text-primary-blue dark:text-accent-blue bg-white/50 px-4 py-1.5 rounded-full shadow border border-primary-blue/10">
        🎯 Cyber Campaign CTR: <span className="text-rose-500 font-extrabold">{ctr}%</span>
      </div>

      <div className="relative w-full h-36 flex items-center justify-between px-10">
        {/* Archer Bow */}
        <motion.div
          animate={isShooting ? { x: [0, -10, 10, 0] } : {}}
          className="relative w-16 h-24"
        >
          <svg viewBox="0 0 40 80" className="w-full h-full stroke-primary-blue stroke-[3] fill-none">
            <path d="M30 10 C10 25 10 55 30 70" />
            <line x1="30" y1="10" x2="30" y2="70" stroke="#1F2937" strokeWidth="1" />
            {/* Draw string */}
            <motion.path
              d={isShooting ? "M30 10 L 10 40 L30 70" : "M30 10 L30 40 L30 70"}
              stroke="#5A6EF5"
              strokeWidth="2"
            />
          </svg>
        </motion.div>

        {/* Flying Arrow */}
        {isShooting && (
          <motion.div
            initial={{ x: -150, opacity: 1 }}
            animate={{ x: 120, opacity: [1, 1, 0] }}
            transition={{ duration: 0.5, ease: "easeIn" }}
            className="absolute left-1/3"
          >
            <div className="w-12 h-1 bg-yellow-400 relative">
              <div className="absolute right-0 top-[-3px] w-2 h-2 bg-yellow-400 rotate-45" />
            </div>
          </motion.div>
        )}

        {/* Target */}
        <motion.div
          animate={isShooting ? { scale: [1, 1.15, 0.95, 1], rotate: [0, 5, -5, 0] } : {}}
          className="w-20 h-20 rounded-full border-4 border-slate-900 bg-white flex items-center justify-center relative shadow-lg"
        >
          <div className="w-14 h-14 rounded-full border-4 border-slate-900 bg-rose-500 flex items-center justify-center">
            <div className="w-8 h-8 rounded-full border-4 border-slate-900 bg-yellow-400 flex items-center justify-center">
              <div className="w-2 h-2 rounded-full bg-slate-900" />
            </div>
          </div>
          {arrowsCount > 0 && (
            <span className="absolute -top-3 -right-3 bg-rose-500 text-white text-[10px] font-black w-6 h-6 rounded-full flex items-center justify-center border-2 border-slate-900">
              {arrowsCount}
            </span>
          )}
        </motion.div>
      </div>

      <button
        onClick={handleShoot}
        className="px-6 py-3 rounded-2xl bg-primary-blue text-bg-yellow font-black text-xs uppercase tracking-wider shadow border border-primary-blue"
        data-cursor="crosshair"
      >
        Shoot Cyber Arrow
      </button>
    </div>
  );
}

// SOCIAL MEDIA WORLD: Influencer heart/follower burst
function SocialMediaWorld() {
  const [followers, setFollowers] = useState(1200);
  const [likes, setLikes] = useState<number[]>([]);

  const handleLike = (e: React.MouseEvent) => {
    setFollowers(prev => prev + Math.floor(Math.random() * 150 + 50));
    setLikes(prev => [...prev, Date.now()]);
    // Small confetti
    confetti({
      particleCount: 15,
      spread: 20,
      colors: ["#EC4899", "#FFFFFF"]
    });
  };

  return (
    <div className="w-full h-full flex flex-col justify-between items-center p-6 text-center select-none" onClick={handleLike}>
      <div className="text-sm font-black text-primary-blue dark:text-accent-blue bg-white/50 px-4 py-1.5 rounded-full shadow border border-primary-blue/10">
        📢 Follower Grid: <span className="text-pink-500 font-extrabold">{followers.toLocaleString()} Crew</span>
      </div>

      <div className="relative w-44 h-40 flex items-center justify-center bg-pink-100 dark:bg-pink-900/10 border-2 border-pink-200 dark:border-pink-900/30 rounded-3xl cursor-pointer">
        {/* Floating Likes */}
        <AnimatePresence>
          {likes.map((likeId) => (
            <motion.span
              key={likeId}
              initial={{ y: 20, opacity: 0, scale: 0.5 }}
              animate={{ y: -70, opacity: [0, 1, 1, 0], scale: [0.5, 1.4, 0.8] }}
              exit={{ opacity: 0 }}
              className="absolute text-pink-500 text-2xl"
            >
              ❤️
            </motion.span>
          ))}
        </AnimatePresence>

        {/* Influencer Mascot representation */}
        <motion.div
          animate={{ y: [-4, 4, -4] }}
          transition={{ duration: 3, repeat: Infinity }}
          className="text-6xl"
        >
          🦊
        </motion.div>
        
        {/* Star Sparkles */}
        <span className="absolute top-4 left-4 text-yellow-400 animate-ping">✨</span>
        <span className="absolute bottom-4 right-4 text-blue-400 animate-bounce">⚡</span>
      </div>

      <span className="text-[10px] font-black text-foreground/50 uppercase tracking-widest">
        Click Visualizer to post hearts & raise followers
      </span>
    </div>
  );
}

// WEBSITE DEVELOPMENT WORLD: Holographic code lab
function WebDevWorld() {
  const [lines, setLines] = useState<string[]>([]);
  const codeLines = [
    "import { motion } from 'framer-motion';",
    "const Universe = () => {",
    "  return <Canvas render='3D' />;",
    "};",
    "export default Universe;",
    "// Compiling components...",
    "// First Zone Engine online!",
    "// Ready to dominate Google #1"
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setLines(prev => {
        if (prev.length >= codeLines.length) return [];
        return [...prev, codeLines[prev.length]];
      });
    }, 1500);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="w-full h-full flex flex-col justify-between items-center p-6 text-center select-none">
      <div className="text-sm font-black text-primary-blue dark:text-accent-blue bg-white/50 px-4 py-1.5 rounded-full shadow border border-primary-blue/10">
        💻 Code Laboratory Terminal
      </div>

      {/* Code Console Screen */}
      <div className="w-full h-36 bg-slate-900 text-left p-4 rounded-2xl border-2 border-primary-blue/20 font-mono text-[10px] text-emerald-400 overflow-hidden shadow-inner relative">
        <div className="absolute top-2 right-2 w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse" />
        <AnimatePresence>
          {lines.map((line, idx) => (
            <motion.div
              key={line}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className="leading-relaxed"
            >
              <span className="text-slate-600 mr-2">0{idx + 1}</span>
              {line}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      <span className="text-[10px] font-black text-foreground/50 uppercase tracking-widest flex items-center gap-1.5">
        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
        Auto compiling Next.js v16 engine
      </span>
    </div>
  );
}

// UI/UX WORLD: Wireframe morphs to UI
function UiUxWorld() {
  const [isUIMode, setIsUIMode] = useState(false);

  return (
    <div className="w-full h-full flex flex-col justify-between items-center p-6 text-center select-none">
      <div className="text-sm font-black text-primary-blue dark:text-accent-blue bg-white/50 px-4 py-1.5 rounded-full shadow border border-primary-blue/10">
        ✨ UI Interface: <span className="text-indigo-500 font-extrabold">{isUIMode ? "Finished mockup" : "Wireframe"}</span>
      </div>

      <div className="relative w-44 h-36 border-2 border-dashed border-primary-blue/20 rounded-2xl flex items-center justify-center p-4">
        
        {/* Interface block */}
        <motion.div
          layout
          className={`w-full h-full rounded-xl p-3 border-2 flex flex-col justify-between transition-colors duration-500 ${
            isUIMode 
              ? "bg-primary-blue border-primary-blue text-white shadow-lg" 
              : "bg-white/80 dark:bg-slate-800/80 border-slate-300 dark:border-slate-700 text-foreground"
          }`}
        >
          <motion.div layout className="flex justify-between items-center">
            <motion.div layout className="w-8 h-8 rounded-full bg-bg-yellow" />
            <motion.div layout className="w-16 h-2 rounded bg-current opacity-30" />
          </motion.div>
          
          <motion.div layout className="w-full h-12 rounded bg-current opacity-10 flex items-center justify-center text-[10px] font-bold">
            {isUIMode ? "LAUNCH PROJECT 🚀" : "WIREBLOCK"}
          </motion.div>
        </motion.div>

        {/* Floating cursor wand */}
        <span className="absolute top-2 right-4 text-lg animate-bounce">🪄</span>
      </div>

      <button
        onClick={() => setIsUIMode(!isUIMode)}
        className="px-6 py-3 rounded-2xl bg-primary-blue text-bg-yellow font-black text-xs uppercase tracking-wider shadow border border-primary-blue"
        data-cursor="wand"
      >
        {isUIMode ? "View Wireframe" : "Apply Magic Polish"}
      </button>
    </div>
  );
}

// OTHER SERVICES STUBS FOR THE EXPLORER Viewport
function ServiceStub({ title, emoji, desc }: { title: string, emoji: string, desc: string }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div 
      className="w-full h-full flex flex-col justify-between items-center p-6 text-center select-none"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="text-sm font-black text-primary-blue dark:text-accent-blue bg-white/50 px-4 py-1.5 rounded-full shadow border border-primary-blue/10">
        🎨 Creative Cosmos Environment
      </div>

      <div className="relative w-44 h-36 flex flex-col items-center justify-center gap-3">
        <motion.span 
          className="text-7xl"
          animate={hovered ? { scale: [1, 1.25, 1], rotate: [0, 15, -15, 0] } : {}}
          transition={{ duration: 0.8, repeat: hovered ? Infinity : 0 }}
        >
          {emoji}
        </motion.span>
        <span className="text-[10px] font-black text-primary-blue dark:text-accent-blue tracking-widest uppercase">
          {title}
        </span>
      </div>

      <p className="text-xs text-foreground/75 leading-relaxed font-semibold max-w-xs">
        {desc}
      </p>
    </div>
  );
}

// ==========================================
// 2. MAIN SERVICES SCREEN MODULE
// ==========================================

export default function Services() {
  const [activeWorld, setActiveWorld] = useState<string>("seo");
  const [isWarping, setIsWarping] = useState(false);

  const worldsList = [
    { id: "seo", title: "SEO Orbit", icon: Search, cursor: "rocket", emoji: "🚀" },
    { id: "ads", title: "Google Ads", icon: Target, cursor: "crosshair", emoji: "🎯" },
    { id: "social", title: "Social Media", icon: Users, cursor: "pointer", emoji: "👥" },
    { id: "dev", title: "Web Dev Lab", icon: Code, cursor: "pointer", emoji: "💻" },
    { id: "uiux", title: "UI/UX Magic", icon: Layers, cursor: "wand", emoji: "🪄" },
    { id: "branding", title: "Branding", icon: Palette, cursor: "brush", emoji: "🎨" },
    { id: "logo", title: "Logo Forge", icon: Award, cursor: "pointer", emoji: "👑" },
    { id: "content", title: "Copywriting", icon: BookOpen, cursor: "pointer", emoji: "✍️" },
    { id: "video", title: "Video Studio", icon: Film, cursor: "pointer", emoji: "🎬" },
    { id: "email", title: "Email Birds", icon: Mail, cursor: "pointer", emoji: "✉️" },
    { id: "performance", title: "Growth Center", icon: TrendingUp, cursor: "pointer", emoji: "📈" },
  ];

  const handleWorldChange = (worldId: string) => {
    if (worldId === activeWorld) return;
    setIsWarping(true);
    setTimeout(() => {
      setActiveWorld(worldId);
      setIsWarping(false);
    }, 550); // Warp speed transition
  };

  const renderActiveWorld = () => {
    switch (activeWorld) {
      case "seo":
        return <SeoWorld />;
      case "ads":
        return <GoogleAdsWorld />;
      case "social":
        return <SocialMediaWorld />;
      case "dev":
        return <WebDevWorld />;
      case "uiux":
        return <UiUxWorld />;
      case "branding":
        return <ServiceStub title="Branding World" emoji="🎨" desc="A creative cosmos of color splatters, mood boards, and aesthetic styling parameters generating your visual corporate signature." />;
      case "logo":
        return <ServiceStub title="Logo Forge" emoji="👑" desc="Master metal smiths striking vector nodes on a fantasy anvil. Shines with sparks and fire to forge brand crowns." />;
      case "content":
        return <ServiceStub title="Content Station" emoji="✍️" desc="Anime novelists sketching stories that float off the keyboard as ink sparks and speech bubbles." />;
      case "video":
        return <ServiceStub title="Video Studio" emoji="🎬" desc="A film clapper director set with spinning tape reels, track sliders, and bright spotlights." />;
      case "email":
        return <ServiceStub title="Email Mail Birds" emoji="✉️" desc="Carrier birds flying between communication lines, bringing golden letters directly to user inboxes." />;
      case "performance":
        return <ServiceStub title="Performance Control" emoji="📈" desc="High-tech dashboard telemetry measuring profit gains, counting statistics, and growing ROI bars." />;
      default:
        return null;
    }
  };

  return (
    <section id="services" className="relative py-24 px-6 overflow-hidden">
      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-block bg-primary-blue text-bg-yellow dark:bg-accent-blue dark:text-slate-900 font-black text-xs px-4 py-1.5 rounded-full uppercase tracking-wider mb-4">
            Interactive Universe
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-foreground mb-4">
            Explore Digital Worlds
          </h2>
          <p className="text-base text-foreground/75 font-medium max-w-xl mx-auto">
            Click a planetary coordinates node on the console control deck to travel to different digital agency marketing environments.
          </p>
        </div>

        {/* Visual Game Dashboard Structure */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left Panel: Planetary Selector Console Deck */}
          <div className="lg:col-span-4 flex flex-col gap-3 max-h-[500px] overflow-y-auto pr-2 custom-scrollbar">
            {worldsList.map((world) => {
              const Icon = world.icon;
              const isActive = activeWorld === world.id;

              return (
                <motion.button
                  key={world.id}
                  onClick={() => handleWorldChange(world.id)}
                  data-cursor={world.cursor}
                  className={`p-4 rounded-2xl border-2 flex items-center justify-between font-black text-sm select-none text-left transition-all duration-300 ${
                    isActive
                      ? "bg-primary-blue text-bg-yellow border-primary-blue shadow-lg scale-[1.02]"
                      : "glassmorphism text-foreground border-primary-blue/10 hover:border-primary-blue/30"
                  }`}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-xl flex items-center justify-center text-white ${
                      isActive ? "bg-accent-blue" : "bg-primary-blue/15 text-primary-blue dark:text-accent-blue"
                    }`}>
                      <Icon size={16} />
                    </div>
                    <span>{world.title}</span>
                  </div>
                  <span className="text-xl animate-float">{world.emoji}</span>
                </motion.button>
              );
            })}
          </div>

          {/* Right Panel: Immersive Universe Visualizer Screen */}
          <div className="lg:col-span-8 relative rounded-[32px] glassmorphism border-2 border-primary-blue/15 shadow-2xl p-4 flex items-center justify-center min-h-[400px] overflow-hidden">
            
            {/* Warp Speed Anime Lines Transition Overlay */}
            <AnimatePresence>
              {isWarping && (
                <motion.div
                  className="absolute inset-0 bg-slate-950 z-30 flex items-center justify-center overflow-hidden"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {/* Anime Speed Line Vector */}
                  <div className="absolute inset-0 opacity-[0.25] pointer-events-none flex items-center justify-center">
                    <div 
                      className="w-[200%] h-[200%] rotate-45"
                      style={{
                        backgroundImage: `repeating-linear-gradient(90deg, transparent, transparent 15px, var(--accent-blue) 15px, var(--accent-blue) 16px)`,
                      }}
                    />
                  </div>
                  <span className="text-white font-black text-sm uppercase tracking-widest flex items-center gap-3 animate-pulse">
                    🚀 TRAVELING AT WARP SPEED...
                  </span>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Immersive Viewport Renders */}
            <div className="w-full h-full flex items-center justify-center">
              {renderActiveWorld()}
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
