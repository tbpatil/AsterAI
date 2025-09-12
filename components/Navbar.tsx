"use client";
import { useState, useEffect } from "react";
import { Github, ArrowUpRight, Zap, Brain } from "lucide-react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

const menuItems = [
  { href: "#home", label: "Home" },
  { href: "#features-section", label: "Features" },
  { href: "#how-it-works-section", label: "How It Works" },
  { href: "/demo", label: "Demo" },
  { href: "#about", label: "Team" },
];

const socialLinks = [
  { href: "https://github.com/ManojBaasha/AsterAI", label: "GITHUB" },
];

export default function Navbar() {
  const [scrollY, setScrollY] = useState(0);

  // Force dark mode
  useEffect(() => {
    document.documentElement.classList.add("dark");
    localStorage.setItem("theme", "dark");
  }, []);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const glassOpacity = Math.min(0.8, 0.4 + scrollY * 0.002);
  const blurIntensity = Math.min(20, 12 + scrollY * 0.05);

  const baseBg = "0,0,0"; // Always dark mode

  const scrollToSection = (href: string) => {
    if (href.startsWith('#')) {
      const elementId = href.substring(1);
      const element = document.getElementById(elementId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      } else if (href === '#home') {
        // Scroll to top for home
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }
  };

  return (
    <>
      {/* Main Navbar */}
      <header className="fixed top-4 left-1/2 -translate-x-1/2 z-[200] pointer-events-none">
        <motion.nav
          className="relative flex items-center justify-between gap-8 pointer-events-auto max-w-[1200px] px-6"
          style={{
            backgroundColor: `rgba(${baseBg}, ${glassOpacity})`,
            backdropFilter: `blur(${blurIntensity}px)`,
            WebkitBackdropFilter: `blur(${blurIntensity}px)`,
            borderRadius: 9999,
            border: `1px solid rgba(139,92,246,0.3)`,
            padding: scrollY > 40 ? "8px 24px" : "14px 28px",
            boxShadow: "0 4px 16px rgba(139,92,246,0.2), 0 0 32px rgba(139,92,246,0.1)",
            transform: scrollY > 40 ? "scale(0.95)" : "scale(1)",
            transition: "all 0.3s ease"
          }}
        >
          {/* Logo */}

          {/* Navigation Menu */}
          <div className="hidden md:flex items-center gap-8">
            {menuItems.map((item) => (
              <motion.div
                key={item.href}
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
              >
                {item.href === '/demo' ? (
                  <Link
                    href={item.href}
                    className="text-sm font-medium text-white/80 hover:text-white transition-colors"
                  >
                    {item.label}
                  </Link>
                ) : (
                  <button
                    onClick={() => scrollToSection(item.href)}
                    className="text-sm font-medium text-white/80 hover:text-white transition-colors"
                  >
                    {item.label}
                  </button>
                )}
              </motion.div>
            ))}
          </div>

          {/* Right side buttons */}
          <div className="flex items-center gap-4">
            {/* GitHub Link */}
            <div className="hidden sm:flex items-center gap-2">
              <motion.a
                href="https://github.com/ManojBaasha/AsterAI"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 hover:bg-purple-500/20 backdrop-blur-sm rounded-full transition-all shadow-sm border border-transparent hover:border-purple-400/30 w-10 h-10 flex items-center justify-center"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.2 }}
              >
                <Github size={18} className="text-white/80 hover:text-white" />
              </motion.a>
            </div>
            

            {/* Mobile Menu Button - Only show on mobile */}
            <motion.button
              onClick={() => {/* Mobile menu logic if needed */}}
              className="md:hidden p-3 hover:bg-purple-500/20 backdrop-blur-sm rounded-full transition-all shadow-sm border border-transparent hover:border-purple-400/30 w-12 h-12 flex items-center justify-center"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.2 }}
            >
              <div className="w-5 h-5 flex flex-col justify-center items-center">
                <span className="block w-5 h-0.5 bg-white/80 mb-1" />
                <span className="block w-5 h-0.5 bg-white/80 mb-1" />
                <span className="block w-5 h-0.5 bg-white/80" />
              </div>
            </motion.button>
          </div>
        </motion.nav>
      </header>

      {/* AI Badge - Fixed Left Side */}
      <motion.div
        className="fixed left-4 top-4 z-[150] pointer-events-auto hidden lg:block"
        initial={{ opacity: 0, x: -20, scale: 0.8 }}
        animate={{ opacity: 1, x: 0, scale: 1 }}
        transition={{ duration: 0.8, delay: 1.2 }}
      >
        <motion.div
          className="flex items-center gap-2 px-3 py-2 rounded-2xl backdrop-blur-md border shadow-lg"
          style={{
            backgroundColor: `rgba(${baseBg}, ${Math.min(0.8, 0.6 + scrollY * 0.002)})`,
            backdropFilter: `blur(${Math.min(16, 8 + scrollY * 0.03)}px)`,
            WebkitBackdropFilter: `blur(${Math.min(16, 8 + scrollY * 0.03)}px)`,
            border: `1px solid rgba(139,92,246,0.3)`,
            boxShadow: "0 4px 20px rgba(139,92,246,0.2)",
          }}
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.3 }}
        >
          <Zap size={16} className="text-purple-400" />
          <span className="text-xs text-white/80 font-medium">
            AI Powered
          </span>
        </motion.div>
      </motion.div>

    </>
  );
}
