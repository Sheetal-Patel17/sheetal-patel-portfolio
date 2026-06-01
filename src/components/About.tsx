import { motion } from "motion/react";
import { useInView } from "motion/react";
import { useRef } from "react";
import { MapPin, GraduationCap, BookOpen, Zap } from "lucide-react";

interface Props { isDarkMode: boolean; }

const INFO_CARDS = [
  { icon: MapPin,        label: "Location",   value: "Jetpur, Gujarat", color: "text-rose-400" },
  { icon: GraduationCap, label: "University", value: "Marwadi University", color: "text-blue-400" },
  { icon: BookOpen,      label: "Semester",   value: "7th Sem · 2023–27", color: "text-emerald-400" },
  { icon: Zap,           label: "Focus Areas",value: "AI · ML · DevOps", color: "text-[#C9A84C]" },
];

const PHILOSOPHY = [
  { title: "Learn by Building", desc: "Every concept I study gets turned into a working project that solves a real problem." },
  { title: "Clean Code Matters", desc: "Readable, maintainable code is a sign of professional craftsmanship." },
  { title: "Design + Engineering", desc: "The best products combine elegant design with rock-solid engineering." },
];

export default function About({ isDarkMode }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  const card = `rounded-2xl border p-4 sm:p-5 transition-all duration-300 card-lift ${
    isDarkMode ? "bg-[#0D0D1F]/60 border-[#C9A84C]/12 hover:border-[#C9A84C]/28" : "bg-white/70 border-[#C9A84C]/18 hover:border-[#C9A84C]/40"
  }`;

  return (
    <section id="about" className="py-20 sm:py-24 px-5 sm:px-8 md:px-10 lg:px-20 relative" aria-label="About">
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/2 left-0 w-[300px] sm:w-[400px] h-[300px] sm:h-[400px] rounded-full opacity-50"
          style={{ background: "radial-gradient(circle, rgba(201,168,76,0.04) 0%, transparent 70%)" }} />
      </div>

      <div className="max-w-7xl mx-auto" ref={ref}>
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }} className="mb-10 sm:mb-16">
          <span className="section-tag block mb-3">01 · About Me</span>
          <h2 className={`font-display font-black text-3xl sm:text-4xl md:text-5xl leading-tight ${isDarkMode ? "text-[#F5F0E8]" : "text-[#1A1A2E]"}`}>
            Who I <span className="gold-text">Am</span>
          </h2>
          <div className="gold-line mt-4 w-24" />
        </motion.div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16">

          {/* ── Profile Image (center on mobile, left on desktop) ── */}
          <motion.div initial={{ opacity: 0, x: -30 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.7, delay: 0.15 }}
            className="lg:col-span-4 flex flex-col items-center gap-4 sm:gap-5">

            <div className={`relative w-full max-w-[240px] sm:max-w-[280px] rounded-3xl overflow-hidden border-2 shadow-2xl mx-auto ${
              isDarkMode ? "border-[#C9A84C]/25" : "border-[#C9A84C]/35"
            }`}>
              <img src="/assets/sheetal.png" alt="Sheetal Patel"
                className="w-full h-[260px] sm:h-[320px] object-cover object-top" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A14]/70 via-transparent to-transparent" />
              <div className="absolute bottom-3 sm:bottom-4 left-3 sm:left-4 right-3 sm:right-4">
                <div className={`px-3 sm:px-4 py-2 sm:py-3 rounded-xl border ${isDarkMode ? "bg-[#0A0A14]/90 border-[#C9A84C]/20" : "bg-white/90 border-[#C9A84C]/25"}`}
                  style={{ backdropFilter: "blur(12px)" }}>
                  <p className={`font-display font-bold text-sm ${isDarkMode ? "text-[#F5F0E8]" : "text-[#1A1A2E]"}`}>Sheetal Patel</p>
                  <p className="font-mono text-[8px] text-[#C9A84C] tracking-wider uppercase mt-0.5">IT Student · Marwadi University</p>
                </div>
              </div>
              <div className="absolute top-2.5 right-2.5 w-7 h-7 sm:w-8 sm:h-8 rounded-full border border-[#C9A84C]/40 flex items-center justify-center bg-[#0A0A14]/50" style={{ backdropFilter: "blur(8px)" }}>
                <span className="font-display font-black text-[9px] gold-text">SP</span>
              </div>
            </div>

            {/* Info cards — 2x2 grid */}
            <div className="grid grid-cols-2 gap-2 sm:gap-3 w-full max-w-[240px] sm:max-w-[280px] mx-auto">
              {INFO_CARDS.map((c, i) => {
                const Icon = c.icon;
                return (
                  <motion.div key={i} initial={{ opacity: 0, y: 12 }} animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.3 + i * 0.07, duration: 0.5 }}
                    className={`p-2.5 sm:p-3 rounded-xl border ${isDarkMode ? "bg-[#0D0D1F]/60 border-[#C9A84C]/12" : "bg-white/70 border-[#C9A84C]/18"}`}>
                    <Icon className={`w-3.5 h-3.5 mb-1 ${c.color}`} />
                    <p className={`font-mono text-[7px] uppercase tracking-wider mb-0.5 ${isDarkMode ? "text-[#F5F0E8]/40" : "text-[#1A1A2E]/40"}`}>{c.label}</p>
                    <p className={`font-display text-[9px] sm:text-[10px] font-semibold leading-tight ${isDarkMode ? "text-[#F5F0E8]/85" : "text-[#1A1A2E]/85"}`}>{c.value}</p>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

          {/* ── Content ── */}
          <motion.div initial={{ opacity: 0, x: 30 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.7, delay: 0.2 }}
            className="lg:col-span-8 flex flex-col gap-5 sm:gap-7">

            {/* Bio */}
            <div className={card}>
              <h3 className={`font-display font-bold text-base sm:text-lg mb-3 sm:mb-4 ${isDarkMode ? "text-[#F5F0E8]" : "text-[#1A1A2E]"}`}>Professional Summary</h3>
              <p className={`text-sm leading-relaxed font-light ${isDarkMode ? "text-[#F5F0E8]/65" : "text-[#1A1A2E]/65"}`}>
                I am a <span className="text-[#C9A84C] font-semibold">B.Tech Information Technology</span> student at Marwadi University with a strong foundation in programming, web development, and core IT concepts.
              </p>
              <p className={`text-sm leading-relaxed font-light mt-3 ${isDarkMode ? "text-[#F5F0E8]/65" : "text-[#1A1A2E]/65"}`}>
                I have experience in <span className="text-[#C9A84C] font-medium">Python, Java, SQL, C/C++, JavaScript, HTML/CSS, PHP, and DSA</span>. Currently exploring <span className="text-[#C9A84C] font-medium">DevOps, Cloud Computing, AI, and Data Science</span>.
              </p>
            </div>

            {/* Philosophy Cards — stack on mobile, 3-col on sm+ */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
              {PHILOSOPHY.map((p, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.4 + i * 0.09, duration: 0.5 }}
                  className={`${card} flex flex-col gap-2`}>
                  <div className="w-5 h-[2px] bg-gradient-to-r from-[#C9A84C] to-[#E8C878] rounded-full" />
                  <h4 className={`font-display font-semibold text-sm ${isDarkMode ? "text-[#F5F0E8]/90" : "text-[#1A1A2E]/90"}`}>{p.title}</h4>
                  <p className={`font-light text-xs leading-relaxed ${isDarkMode ? "text-[#F5F0E8]/50" : "text-[#1A1A2E]/50"}`}>{p.desc}</p>
                </motion.div>
              ))}
            </div>

            {/* Quote */}
            <motion.div initial={{ opacity: 0, y: 12 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.6, duration: 0.6 }}
              className={`p-4 sm:p-6 rounded-2xl border relative overflow-hidden ${isDarkMode ? "bg-[#C9A84C]/4 border-[#C9A84C]/18" : "bg-[#C9A84C]/4 border-[#C9A84C]/22"}`}>
              <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-[#C9A84C] to-[#E8C878] rounded-l-2xl" />
              <p className={`font-serif italic text-sm leading-relaxed pl-3 ${isDarkMode ? "text-[#F5F0E8]/75" : "text-[#1A1A2E]/70"}`}>
                "The best programmers are not marginally better than mediocre ones — they are orders of magnitude better. Every day I strive to close that gap."
              </p>
              <p className="font-mono text-[9px] text-[#C9A84C]/60 uppercase tracking-wider mt-3 pl-3">— Sheetal's Development Creed</p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
