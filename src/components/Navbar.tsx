import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Sun, Moon, Menu, X, ArrowUpRight } from "lucide-react";

interface Props { isDarkMode: boolean; setIsDarkMode: (v: boolean) => void; }

const NAV = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Journey", href: "#experience" },
  { label: "Certs", href: "#certifications" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar({ isDarkMode, setIsDarkMode }: Props) {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("home");
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 24);
      for (const n of NAV) {
        const el = document.getElementById(n.href.slice(1));
        if (el) {
          const r = el.getBoundingClientRect();
          if (r.top <= 100 && r.bottom >= 100) { setActive(n.href.slice(1)); break; }
        }
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault(); setMenuOpen(false);
    const el = document.getElementById(href.slice(1));
    if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.pageYOffset - 78, behavior: "smooth" });
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 w-full z-[1000] transition-all duration-500 ${scrolled ? "py-3" : "py-5"}`}
        role="banner"
      >
        {/* Blur background */}
        <div
          className={`absolute inset-0 transition-all duration-500 ${scrolled
            ? isDarkMode
              ? "bg-[#0A0A14]/80 border-b border-[#C9A84C]/10"
              : "bg-[#FFFDF7]/85 border-b border-[#C9A84C]/15"
            : "bg-transparent"}`}
          style={scrolled ? { backdropFilter: "blur(24px) saturate(180%)" } : {}}
        />

        <div className="relative max-w-7xl mx-auto px-5 flex items-center justify-between">
          {/* Logo */}
          <a
            href="#home"
            onClick={(e) => scrollTo(e, "#home")}
            className="flex items-center gap-2.5 group"
            aria-label="Sheetal Patel — Home"
          >
            <div className={`w-8 h-8 rounded-lg border flex items-center justify-center transition-all duration-300 ${
              isDarkMode ? "border-[#C9A84C]/30 bg-[#C9A84C]/5 group-hover:border-[#C9A84C]/60" : "border-[#C9A84C]/40 bg-[#C9A84C]/8 group-hover:border-[#C9A84C]/70"
            }`}>
              <span className="font-display font-black text-xs gold-text">SP</span>
            </div>
            <div className="hidden sm:block">
              <span className={`font-display font-bold text-sm tracking-wide transition-colors duration-300 ${isDarkMode ? "text-[#F5F0E8] group-hover:text-[#E8C878]" : "text-[#1A1A2E] group-hover:text-[#C9A84C]"}`}>
                Sheetal Patel
              </span>
              <p className={`font-mono text-[8px] tracking-[0.25em] uppercase ${isDarkMode ? "text-[#C9A84C]/40" : "text-[#C9A84C]/60"}`}>
                IT Student · Developer
              </p>
            </div>
          </a>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-6" role="navigation">
            {NAV.map(n => {
              const isActive = active === n.href.slice(1);
              return (
                <a
                  key={n.href}
                  href={n.href}
                  onClick={(e) => scrollTo(e, n.href)}
                  className={`relative font-mono text-[10px] uppercase tracking-[0.2em] font-medium py-1.5 transition-all duration-300 ${
                    isActive
                      ? "text-[#C9A84C]"
                      : isDarkMode ? "text-[#F5F0E8]/50 hover:text-[#C9A84C]" : "text-[#1A1A2E]/50 hover:text-[#C9A84C]"
                  }`}
                  aria-current={isActive ? "page" : undefined}
                >
                  {n.label}
                  {isActive && (
                    <motion.div
                      layoutId="nav-indicator"
                      className="absolute bottom-0 left-0 w-full h-[1.5px] nav-gold-indicator rounded-full"
                      transition={{ type: "spring", stiffness: 450, damping: 32 }}
                    />
                  )}
                </a>
              );
            })}
          </nav>

          {/* Right actions */}
          <div className="flex items-center gap-2.5">
            {/* Mini profile avatar */}
            <div className="hidden lg:block">
              <img
                src="/assets/sheetal.png"
                alt="Sheetal Patel"
                className={`w-8 h-8 rounded-full object-cover border-2 transition-all duration-300 ${isDarkMode ? "border-[#C9A84C]/30" : "border-[#C9A84C]/40"}`}
              />
            </div>

            {/* Theme toggle */}
            <motion.button
              onClick={() => setIsDarkMode(!isDarkMode)}
              whileTap={{ scale: 0.9 }}
              className={`p-2.5 rounded-xl border cursor-pointer transition-all duration-300 ${
                isDarkMode
                  ? "border-[#C9A84C]/15 bg-[#C9A84C]/5 text-[#C9A84C]/60 hover:text-[#C9A84C] hover:border-[#C9A84C]/40"
                  : "border-[#C9A84C]/25 bg-[#C9A84C]/5 text-[#C9A84C]/70 hover:text-[#C9A84C] hover:border-[#C9A84C]/50"
              }`}
              aria-label={isDarkMode ? "Light mode" : "Dark mode"}
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={isDarkMode ? "sun" : "moon"}
                  initial={{ rotate: -30, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 30, opacity: 0 }}
                  transition={{ duration: 0.18 }}
                >
                  {isDarkMode ? <Sun className="w-3.5 h-3.5" /> : <Moon className="w-3.5 h-3.5" />}
                </motion.div>
              </AnimatePresence>
            </motion.button>

            {/* Hire me — desktop */}
            <motion.a
              href="#contact"
              onClick={(e) => scrollTo(e, "#contact")}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="hidden lg:flex items-center gap-1.5 btn-gold text-[10px] uppercase tracking-[0.15em] px-5 py-2.5 rounded-xl font-bold"
            >
              Hire Me <ArrowUpRight className="w-3 h-3" />
            </motion.a>

            {/* Mobile hamburger */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className={`lg:hidden p-2.5 rounded-xl border cursor-pointer transition-all duration-300 ${
                isDarkMode ? "border-[#C9A84C]/15 text-[#C9A84C]/60" : "border-[#C9A84C]/25 text-[#C9A84C]/70"
              }`}
              aria-label={menuOpen ? "Close menu" : "Open menu"}
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.div key={menuOpen ? "x" : "menu"} initial={{ rotate: -30, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 30, opacity: 0 }} transition={{ duration: 0.15 }}>
                  {menuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
                </motion.div>
              </AnimatePresence>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/70 z-[998] lg:hidden"
              style={{ backdropFilter: "blur(4px)" }}
              onClick={() => setMenuOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, y: -16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
              className={`fixed inset-x-0 top-0 z-[999] lg:hidden pt-20 pb-8 px-5 border-b ${
                isDarkMode ? "bg-[#0A0A14]/98 border-[#C9A84C]/10" : "bg-[#FFFDF7]/98 border-[#C9A84C]/15"
              }`}
              style={{ backdropFilter: "blur(24px)" }}
            >
              {/* Profile card in mobile menu */}
              <div className={`flex items-center gap-3 p-4 rounded-2xl border mb-5 ${isDarkMode ? "border-[#C9A84C]/10 bg-[#C9A84C]/3" : "border-[#C9A84C]/15 bg-[#C9A84C]/4"}`}>
                <img src="/assets/sheetal.png" alt="Sheetal Patel" className="w-12 h-12 rounded-full object-cover border-2 border-[#C9A84C]/30" />
                <div>
                  <p className={`font-display font-bold text-sm ${isDarkMode ? "text-[#F5F0E8]" : "text-[#1A1A2E]"}`}>Sheetal Patel</p>
                  <p className="font-mono text-[9px] text-[#C9A84C] tracking-wider uppercase">IT Student · AI/ML Developer</p>
                </div>
              </div>

              <div className="flex flex-col gap-1">
                {NAV.map((n, i) => (
                  <motion.a
                    key={n.href}
                    href={n.href}
                    onClick={(e) => scrollTo(e, n.href)}
                    initial={{ opacity: 0, x: -16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.045 + 0.05 }}
                    className={`flex items-center justify-between px-4 py-3.5 rounded-xl font-mono text-xs uppercase tracking-[0.15em] transition-all duration-300 ${
                      active === n.href.slice(1)
                        ? "bg-[#C9A84C]/10 text-[#C9A84C] border border-[#C9A84C]/25"
                        : isDarkMode ? "text-[#F5F0E8]/60 hover:text-[#C9A84C] hover:bg-[#C9A84C]/5" : "text-[#1A1A2E]/60 hover:text-[#C9A84C] hover:bg-[#C9A84C]/5"
                    }`}
                  >
                    {n.label}
                    {active === n.href.slice(1) && <div className="w-1.5 h-1.5 rounded-full bg-[#C9A84C]" />}
                  </motion.a>
                ))}
              </div>

              <motion.a
                href="#contact"
                onClick={(e) => scrollTo(e, "#contact")}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.45 }}
                className="mt-5 flex items-center justify-center gap-2 btn-gold text-[10px] uppercase tracking-[0.15em] py-4 px-6 rounded-xl w-full font-bold"
              >
                Hire Me <ArrowUpRight className="w-4 h-4" />
              </motion.a>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}