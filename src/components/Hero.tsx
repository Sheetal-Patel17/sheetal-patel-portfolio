import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ArrowDown, FileText, Mail, Sparkles } from "lucide-react";

interface Props { isDarkMode: boolean; }

const ROLES = ["IT Student","AI/ML Developer","Data Science Explorer","Modern Designer","Full-Stack Builder"];

const STATS = [
  { value: 5,  suffix: "+",  label: "Projects Built" },
  { value: 7,  suffix: "th", label: "Semester B.Tech" },
  { value: 15, suffix: "+",  label: "Technologies" },
  { value: 7,  suffix: "+",  label: "Certifications" },
];

function Counter({ target, suffix }: { target: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);
  useEffect(() => {
    const observer = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !started.current) {
        started.current = true;
        let c = 0;
        const step = target / 50;
        const t = setInterval(() => {
          c += step;
          if (c >= target) { setCount(target); clearInterval(t); }
          else setCount(Math.floor(c));
        }, 36);
      }
    }, { threshold: 0.5 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target]);
  return <span ref={ref} className="tabular-nums">{count}{suffix}</span>;
}

export default function Hero({ isDarkMode }: Props) {
  const [typed, setTyped] = useState("");
  const [wordIdx, setWordIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const word = ROLES[wordIdx];
    const speed = deleting ? 30 : 70;
    const t = setTimeout(() => {
      if (!deleting) {
        setTyped(word.slice(0, typed.length + 1));
        if (typed === word) setTimeout(() => setDeleting(true), 2000);
      } else {
        setTyped(word.slice(0, typed.length - 1));
        if (typed === "") { setDeleting(false); setWordIdx(i => (i + 1) % ROLES.length); }
      }
    }, speed);
    return () => clearTimeout(t);
  }, [typed, deleting, wordIdx]);

  const scrollTo = (id: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <section id="home" className="min-h-screen relative flex flex-col justify-center pt-24 pb-12 px-5 sm:px-8 md:px-10 lg:px-20 overflow-hidden" aria-label="Hero">
      {/* Spotlights */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-[280px] sm:w-[500px] lg:w-[700px] h-[280px] sm:h-[500px] lg:h-[700px] rounded-full"
          style={{ background: "radial-gradient(circle, rgba(201,168,76,0.07) 0%, transparent 65%)" }} />
        <div className="absolute bottom-0 right-[-5%] w-[200px] sm:w-[350px] h-[200px] sm:h-[350px] rounded-full"
          style={{ background: "radial-gradient(circle, rgba(201,168,76,0.04) 0%, transparent 60%)" }} />
      </div>

      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center relative z-10">

        {/* ── Text ── */}
        <div className="lg:col-span-7 flex flex-col text-left">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <span className={`inline-flex items-center gap-2 font-mono text-[9px] sm:text-[10px] uppercase tracking-[0.25em] sm:tracking-[0.35em] px-3 sm:px-4 py-1.5 sm:py-2 rounded-full border mb-5 sm:mb-8 max-w-fit ${
              isDarkMode ? "border-[#C9A84C]/20 bg-[#C9A84C]/5 text-[#C9A84C]/80" : "border-[#C9A84C]/30 bg-[#C9A84C]/6 text-[#C9A84C]"
            }`}>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse shrink-0" />
              Open to Opportunities
              <Sparkles className="w-3 h-3 shrink-0" />
            </span>
          </motion.div>

          <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1, duration: 0.6 }}
            className={`font-serif italic text-base sm:text-lg mb-1 ${isDarkMode ? "text-[#F5F0E8]/50" : "text-[#1A1A2E]/40"}`}>
            Hello, I'm
          </motion.p>

          <motion.h1 initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15, duration: 0.7 }}
            className="font-display font-black leading-[0.88] mb-2 sm:mb-3"
            style={{ fontSize: "clamp(2.8rem, 10vw, 7.5rem)", letterSpacing: "-0.02em" }}>
            <span className="gold-shimmer">Sheetal</span>
            <br />
            <span className={isDarkMode ? "text-[#F5F0E8]" : "text-[#1A1A2E]"}>Patel</span>
          </motion.h1>

          <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.6 }}
            className={`font-display text-base sm:text-xl font-semibold mb-2 ${isDarkMode ? "text-[#F5F0E8]/70" : "text-[#1A1A2E]/60"}`}>
            Future Tech Professional
          </motion.p>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}
            className="h-7 sm:h-8 flex items-center mb-5 sm:mb-8">
            <span className="font-mono text-sm sm:text-base text-[#C9A84C] font-semibold">{typed}</span>
            <span className="typing-cursor" />
          </motion.div>

          <motion.p initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35, duration: 0.6 }}
            className={`text-sm sm:text-base leading-relaxed max-w-lg font-light mb-7 sm:mb-10 ${isDarkMode ? "text-[#F5F0E8]/55" : "text-[#1A1A2E]/55"}`}>
            "I build intelligent digital experiences by combining modern web technologies, problem-solving, and creative innovation."
          </motion.p>

          {/* CTA Buttons */}
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.45, duration: 0.5 }}
            className="flex flex-wrap gap-2 sm:gap-3">
            <motion.a href="#projects" onClick={scrollTo("projects")} whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
              className="btn-gold flex items-center gap-1.5 text-[10px] sm:text-[11px] uppercase tracking-[0.12em] sm:tracking-[0.18em] px-5 sm:px-7 py-3 sm:py-3.5 rounded-xl font-bold">
              View Projects <ArrowDown className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
            </motion.a>
            <motion.a href="#contact" onClick={scrollTo("contact")} whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
              className="btn-outline-gold flex items-center gap-1.5 text-[10px] sm:text-[11px] uppercase tracking-[0.12em] sm:tracking-[0.18em] px-5 sm:px-7 py-3 sm:py-3.5 rounded-xl font-bold">
              <Mail className="w-3 h-3 sm:w-3.5 sm:h-3.5" /> Contact Me
            </motion.a>
            <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
              onClick={() => { const a = document.createElement("a"); a.href = "/assets/Sheetal_Patel_Resume.pdf"; a.download = "Sheetal_Patel_Resume.pdf"; a.click(); }}
              className={`flex items-center gap-1.5 text-[10px] sm:text-[11px] uppercase tracking-[0.12em] sm:tracking-[0.18em] px-5 sm:px-7 py-3 sm:py-3.5 rounded-xl font-bold border cursor-pointer transition-all duration-300 ${
                isDarkMode ? "border-white/10 text-[#F5F0E8]/60 hover:text-[#F5F0E8] hover:border-white/25" : "border-[#1A1A2E]/15 text-[#1A1A2E]/50 hover:text-[#1A1A2E] hover:border-[#1A1A2E]/35"
              }`}>
              <FileText className="w-3 h-3 sm:w-3.5 sm:h-3.5" /> Resume
            </motion.button>
          </motion.div>
        </div>

        {/* ── Profile Image ── */}
        <div className="lg:col-span-5 flex items-center justify-center relative mt-6 lg:mt-0">
          <motion.div initial={{ opacity: 0, scale: 0.85 }} animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 1.1, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="relative w-48 h-48 sm:w-64 sm:h-64 lg:w-[320px] lg:h-[320px]">

            <div className={`absolute inset-0 rounded-full border ${isDarkMode ? "border-[#C9A84C]/15" : "border-[#C9A84C]/25"}`}
              style={{ animation: "orbit-cw 20s linear infinite" }} />
            <div className={`absolute inset-4 sm:inset-5 rounded-full border border-dashed ${isDarkMode ? "border-[#C9A84C]/10" : "border-[#C9A84C]/18"}`}
              style={{ animation: "orbit-ccw 30s linear infinite" }} />
            <div className="absolute inset-0 rounded-full" style={{ animation: "orbit-cw 16s linear infinite" }}>
              <div className="absolute top-1.5 left-1/2 -translate-x-1/2 w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-[#C9A84C] shadow-[0_0_10px_rgba(201,168,76,0.8)]" />
            </div>

            <div className="absolute inset-8 sm:inset-10 rounded-full blur-[40px] sm:blur-[60px] opacity-20 bg-[#C9A84C]" />

            <div className={`absolute inset-6 sm:inset-7 lg:inset-8 rounded-full overflow-hidden border-2 shadow-2xl ${
              isDarkMode ? "border-[#C9A84C]/30" : "border-[#C9A84C]/40"
            }`}>
              <img src="/assets/sheetal.png" alt="Sheetal Patel"
                className="w-full h-full object-cover" style={{ objectPosition: "center 10%" }} loading="eager" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A14]/50 via-transparent to-transparent" />
            </div>

            {/* Badges — scaled for mobile */}
            <motion.div animate={{ y: [0, -5, 0] }} transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
              className={`absolute -bottom-2 -right-2 sm:-bottom-3 sm:-right-3 px-2.5 py-1.5 rounded-xl border shadow-xl z-10 ${
                isDarkMode ? "bg-[#0D0D1F]/90 border-[#C9A84C]/25" : "bg-white/95 border-[#C9A84C]/30"
              }`} style={{ backdropFilter: "blur(16px)" }}>
              <p className="font-mono text-[7px] text-[#C9A84C]/60 uppercase tracking-wider">Status</p>
              <p className={`font-display text-[10px] font-bold ${isDarkMode ? "text-[#F5F0E8]" : "text-[#1A1A2E]"}`}>7th Sem · IT</p>
            </motion.div>

            <motion.div animate={{ y: [0, 5, 0] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0.8 }}
              className={`absolute -top-2 -left-2 sm:-top-3 sm:-left-3 px-2.5 py-1.5 rounded-xl border shadow-xl z-10 ${
                isDarkMode ? "bg-[#0D0D1F]/90 border-[#C9A84C]/25" : "bg-white/95 border-[#C9A84C]/30"
              }`} style={{ backdropFilter: "blur(16px)" }}>
              <p className="font-mono text-[7px] text-[#C9A84C]/60 uppercase tracking-wider">Focus</p>
              <p className={`font-display text-[10px] font-bold ${isDarkMode ? "text-[#F5F0E8]" : "text-[#1A1A2E]"}`}>AI · ML</p>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* ── Stats Bar ── */}
      <div className="max-w-7xl mx-auto w-full mt-10 sm:mt-16 relative z-10">
        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7, duration: 0.7 }}
          className={`grid grid-cols-2 md:grid-cols-4 rounded-2xl overflow-hidden border ${
            isDarkMode ? "border-[#C9A84C]/12 bg-[#0D0D1F]/50" : "border-[#C9A84C]/18 bg-white/60"
          }`} style={{ backdropFilter: "blur(20px)" }}>
          {STATS.map((s, i) => (
            <div key={i} className={`p-4 sm:p-5 md:p-6 text-left ${
              [0,2].includes(i) ? `border-r ${isDarkMode ? "border-[#C9A84C]/10" : "border-[#C9A84C]/12"}` : ""
            } ${
              [0,1].includes(i) ? `border-b md:border-b-0 ${isDarkMode ? "border-[#C9A84C]/10" : "border-[#C9A84C]/12"}` : ""
            }`}>
              <div className="font-display text-2xl sm:text-3xl md:text-4xl font-black gold-text mb-0.5 sm:mb-1">
                <Counter target={s.value} suffix={s.suffix} />
              </div>
              <p className={`font-mono text-[8px] sm:text-[9px] uppercase tracking-[0.12em] sm:tracking-[0.2em] leading-tight ${isDarkMode ? "text-[#F5F0E8]/50" : "text-[#1A1A2E]/50"}`}>
                {s.label}
              </p>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll hint — desktop only */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 hidden lg:flex flex-col items-center gap-2 z-10">
        <span className={`font-mono text-[9px] uppercase tracking-[0.3em] ${isDarkMode ? "text-[#C9A84C]/40" : "text-[#C9A84C]/60"}`}>Scroll</span>
        <motion.div animate={{ y: [0, 6, 0] }} transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          className={`p-1.5 rounded-full border ${isDarkMode ? "border-[#C9A84C]/20" : "border-[#C9A84C]/30"}`}>
          <ArrowDown className="w-3 h-3 text-[#C9A84C]/60" />
        </motion.div>
      </div>
    </section>
  );
}
