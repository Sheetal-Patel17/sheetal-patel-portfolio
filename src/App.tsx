import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import ExperienceSection from "./components/Experience";
import Certifications from "./components/Certifications";
import Contact from "./components/Contact";
import VisualEffects from "./components/VisualEffects";
import { Github, Linkedin, ChevronUp, Code2 } from "lucide-react";

// HackerRank icon as SVG component
const HackerRankIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0c1.285 0 9.75 4.886 10.392 6 .645 1.115.645 10.885 0 12S13.287 24 12 24C10.714 24 2.25 19.114 1.608 18 .963 16.886.963 7.116 1.608 6 2.25 4.886 10.715 0 12 0zm-1.797 6.586c-.104.045-.104.045-.104 2.717v2.67l-1.32-1.32c-.99-.99-1.373-1.32-1.54-1.32-.286 0-.51.226-.51.52 0 .165.27.463 1.27 1.47l1.27 1.267-1.27 1.267c-1 1.006-1.27 1.305-1.27 1.47 0 .294.224.52.51.52.167 0 .55-.33 1.54-1.32l1.32-1.32v2.67c0 2.672 0 2.672.104 2.717a.457.457 0 00.394 0c.104-.045.104-.045.104-2.718v-2.67l1.32 1.32c.99.99 1.372 1.32 1.54 1.32.286 0 .51-.226.51-.52 0-.165-.27-.463-1.27-1.47L11.334 12l1.27-1.267c1-1.007 1.27-1.305 1.27-1.47 0-.294-.224-.52-.51-.52-.168 0-.55.33-1.54 1.32l-1.32 1.32v-2.67c0-2.672 0-2.672-.104-2.717a.457.457 0 00-.197-.11z"/>
  </svg>
);

export default function App() {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [loading, setLoading] = useState(true);
  const [loadPct, setLoadPct] = useState(0);
  const [loadText, setLoadText] = useState("Initializing...");
  const [showTop, setShowTop] = useState(false);

  // Loading sequence
  useEffect(() => {
    const phases = [
      "Initializing...",
      "Loading Design System...",
      "Compiling Components...",
      "Building Portfolio...",
      "Ready.",
    ];
    const timer = setInterval(() => {
      setLoadPct(prev => {
        const next = Math.min(100, prev + Math.random() * 14 + 4);
        setLoadText(phases[Math.min(phases.length - 1, Math.floor((next / 100) * phases.length))]);
        if (next >= 100) {
          clearInterval(timer);
          setTimeout(() => setLoading(false), 500);
          return 100;
        }
        return next;
      });
    }, 60);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 600);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const socialLinks = [
    { icon: Linkedin, href: "https://www.linkedin.com/in/sheetal-patel17", label: "LinkedIn" },
    { icon: Github, href: "https://github.com/Sheetal-Patel17", label: "GitHub" },
    { icon: HackerRankIcon, href: "https://www.hackerrank.com/profile/Sheetal_Patel", label: "HackerRank" },
  ];

  return (
    <div className={`${isDarkMode ? "bg-[#0A0A14] text-[#F5F0E8]" : "bg-[#FFFDF7] text-[#1A1A2E]"} min-h-screen transition-colors duration-500`}>
      {/* Noise texture */}
      <div className="noise-overlay" aria-hidden="true" />

      {/* Loading Screen */}
      <AnimatePresence>
        {loading && (
          <motion.div
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 z-[9000] bg-[#0A0A14] flex flex-col items-center justify-center p-8"
          >
            {/* Ambient glows */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[500px] h-[500px] rounded-full" style={{ background: "radial-gradient(circle, rgba(201,168,76,0.06) 0%, transparent 70%)" }} />
            </div>

            <div className="relative flex flex-col items-center gap-10 max-w-xs w-full">
              {/* Logo ring */}
              <div className="relative w-28 h-28 flex items-center justify-center">
                <div className="absolute inset-0 rounded-full border border-[#C9A84C]/20" style={{ animation: "orbit-cw 6s linear infinite" }} />
                <div className="absolute inset-3 rounded-full border border-dashed border-[#C9A84C]/15" style={{ animation: "orbit-ccw 9s linear infinite" }} />
                <div className="absolute inset-6 rounded-full border border-[#C9A84C]/10" style={{ animation: "orbit-cw 12s linear infinite" }} />
                <div className="w-12 h-12 rounded-full bg-[#0A0A14] border border-[#C9A84C]/30 flex items-center justify-center">
                  <span className="font-display font-black text-sm gold-text tracking-widest">SP</span>
                </div>
                {/* Dot on ring */}
                <div className="absolute inset-0 rounded-full" style={{ animation: "orbit-cw 4s linear infinite" }}>
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-[#C9A84C] shadow-[0_0_8px_rgba(201,168,76,0.8)]" />
                </div>
              </div>

              {/* Name */}
              <div className="text-center">
                <h1 className="font-display font-black text-4xl tracking-[0.15em] gold-text uppercase">Sheetal</h1>
                <p className="font-mono text-[10px] text-[#C9A84C]/60 tracking-[0.4em] mt-1 uppercase">Portfolio · 2025</p>
              </div>

              {/* Progress */}
              <div className="w-full space-y-2">
                <div className="flex justify-between font-mono text-[10px]">
                  <span className="text-[#C9A84C]/60 uppercase tracking-wider truncate mr-2">{loadText}</span>
                  <span className="text-[#C9A84C] font-semibold tabular-nums">{Math.round(loadPct)}%</span>
                </div>
                <div className="h-[1.5px] bg-white/5 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full scroll-progress rounded-full"
                    style={{ width: `${loadPct}%` }}
                    transition={{ duration: 0.1 }}
                  />
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main App */}
      {!loading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7 }}
          className="relative"
        >
          <VisualEffects isDarkMode={isDarkMode} />
          <Navbar isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />

          {/* Floating Social Sidebar */}
          <div className="fixed left-5 bottom-10 z-[800] hidden xl:flex flex-col items-center gap-4">
            {socialLinks.map((s, i) => {
              const Icon = s.icon;
              return (
                <motion.a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noreferrer"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.8 + i * 0.1 }}
                  whileHover={{ scale: 1.15, x: 2 }}
                  className={`p-2.5 rounded-xl border transition-all duration-300 ${
                    isDarkMode
                      ? "border-[#C9A84C]/15 bg-[#0D0D1F]/60 text-[#C9A84C]/50 hover:text-[#C9A84C] hover:border-[#C9A84C]/40 hover:bg-[#C9A84C]/5"
                      : "border-[#C9A84C]/25 bg-white/70 text-[#C9A84C]/60 hover:text-[#C9A84C] hover:border-[#C9A84C]/50"
                  }`}
                  style={{ backdropFilter: "blur(12px)" }}
                  title={s.label}
                >
                  <Icon className="w-4 h-4" />
                </motion.a>
              );
            })}
            <div className={`w-[1px] h-14 mt-1 ${isDarkMode ? "bg-gradient-to-b from-[#C9A84C]/30 to-transparent" : "bg-gradient-to-b from-[#C9A84C]/40 to-transparent"}`} />
          </div>

          {/* Main Content */}
          <main id="main-content">
            <Hero isDarkMode={isDarkMode} />
            <About isDarkMode={isDarkMode} />
            <Skills isDarkMode={isDarkMode} />
            <Projects isDarkMode={isDarkMode} />
            <ExperienceSection isDarkMode={isDarkMode} />
            <Certifications isDarkMode={isDarkMode} />
            <Contact isDarkMode={isDarkMode} />
          </main>

          {/* Footer */}
          <footer className={`py-12 px-6 border-t ${isDarkMode ? "border-[#C9A84C]/10 bg-[#0A0A14]" : "border-[#C9A84C]/15 bg-[#FFFDF7]"}`}>
            <div className="max-w-7xl mx-auto">
              <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                {/* Brand */}
                <div className="text-center md:text-left">
                  <span className="font-display font-black text-xl gold-text">Sheetal Patel</span>
                  <p className={`font-mono text-[10px] tracking-[0.3em] uppercase mt-0.5 ${isDarkMode ? "text-[#C9A84C]/40" : "text-[#C9A84C]/60"}`}>
                    IT Student · AI/ML Developer
                  </p>
                </div>

                {/* Social */}
                <div className="flex gap-3">
                  {[...socialLinks, { icon: Code2, href: "mailto:patelsheetal670@gmail.com", label: "Email" }].map((s) => {
                    const Icon = s.icon;
                    return (
                      <a key={s.label} href={s.href} target="_blank" rel="noreferrer"
                        className={`p-2.5 rounded-lg border transition-all duration-300 ${isDarkMode ? "border-[#C9A84C]/15 text-[#C9A84C]/40 hover:text-[#C9A84C] hover:border-[#C9A84C]/40" : "border-[#C9A84C]/20 text-[#C9A84C]/50 hover:text-[#C9A84C]"}`}
                        title={s.label}
                      >
                        <Icon className="w-3.5 h-3.5" />
                      </a>
                    );
                  })}
                </div>

                {/* Credit */}
                <p className={`font-mono text-[10px] text-center ${isDarkMode ? "text-white/20" : "text-[#1A1A2E]/30"}`}>
                  Designed & Developed by{" "}
                  <span className="gold-text font-semibold">Sheetal Patel</span>
                  {" "}· {new Date().getFullYear()}
                </p>
              </div>

              {/* Bottom gold line */}
              <div className="gold-line mt-8 opacity-30" />
            </div>
          </footer>

          {/* Scroll to Top */}
          <AnimatePresence>
            {showTop && (
              <motion.button
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className={`fixed bottom-8 right-6 z-[900] p-3.5 rounded-xl border cursor-pointer transition-all duration-300 ${
                  isDarkMode
                    ? "bg-[#0D0D1F]/90 border-[#C9A84C]/30 text-[#C9A84C] hover:border-[#C9A84C]/60 hover:shadow-[0_0_20px_rgba(201,168,76,0.2)]"
                    : "bg-white/95 border-[#C9A84C]/30 text-[#C9A84C] hover:border-[#C9A84C]/60"
                }`}
                style={{ backdropFilter: "blur(12px)" }}
                aria-label="Back to top"
              >
                <ChevronUp className="w-4 h-4" />
              </motion.button>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </div>
  );
}