import { useRef } from "react";
import { motion } from "motion/react";
import { useInView } from "motion/react";
import { experienceData } from "../data";
import { GraduationCap, Folder, Trophy, BookOpen, ChevronRight } from "lucide-react";

interface Props { isDarkMode: boolean; }

const TYPE_CONFIG = {
  education:   { icon: GraduationCap, color: "text-sky-400",    bg: "bg-sky-400/10 border-sky-400/25",    dot: "bg-sky-400" },
  project:     { icon: Folder,        color: "text-emerald-400", bg: "bg-emerald-400/10 border-emerald-400/25", dot: "bg-emerald-400" },
  achievement: { icon: Trophy,        color: "text-[#C9A84C]",   bg: "bg-[#C9A84C]/10 border-[#C9A84C]/25",   dot: "bg-[#C9A84C]" },
  learning:    { icon: BookOpen,      color: "text-violet-400",  bg: "bg-violet-400/10 border-violet-400/25",  dot: "bg-violet-400" },
};

export default function ExperienceSection({ isDarkMode }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section id="experience" className="py-20 sm:py-24 px-5 sm:px-8 md:px-10 lg:px-20 relative" aria-label="Experience & Journey">
      <div className="max-w-4xl mx-auto" ref={ref}>

        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }} className="mb-10 sm:mb-14">
          <span className="section-tag block mb-3">04 · Journey</span>
          <h2 className={`font-display font-black text-3xl sm:text-4xl md:text-5xl leading-tight ${isDarkMode ? "text-[#F5F0E8]" : "text-[#1A1A2E]"}`}>
            My <span className="gold-text">Story</span>
          </h2>
          <div className="gold-line mt-4 w-24" />
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          <div className={`absolute left-4 sm:left-5 top-0 bottom-0 w-[1px] ${isDarkMode ? "bg-[#C9A84C]/15" : "bg-[#C9A84C]/22"}`} />

          <div className="flex flex-col gap-0">
            {experienceData.map((entry, i) => {
              const cfg = TYPE_CONFIG[entry.type];
              const Icon = cfg.icon;
              return (
                <motion.div key={entry.id}
                  initial={{ opacity: 0, x: -24 }} animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: i * 0.1, duration: 0.55 }}
                  className="relative pl-10 sm:pl-14 pb-7 sm:pb-10 group">

                  {/* Dot */}
                  <div className={`absolute left-[10px] sm:left-[14px] top-1 w-2.5 h-2.5 rounded-full -translate-x-1/2 border-2 timeline-dot z-10 ${cfg.dot} ${isDarkMode ? "border-[#0A0A14]" : "border-[#FFFDF7]"}`} />

                  {/* Card */}
                  <div className={`rounded-2xl border p-4 sm:p-5 transition-all duration-300 ${
                    isDarkMode ? "bg-[#0D0D1F]/60 border-[#C9A84C]/10 group-hover:border-[#C9A84C]/25" : "bg-white/70 border-[#C9A84C]/15 group-hover:border-[#C9A84C]/35"
                  }`}>
                    {/* Top row */}
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-2 sm:mb-3">
                      <div className="flex-1 min-w-0">
                        <span className={`inline-flex items-center gap-1.5 font-mono text-[8px] sm:text-[9px] uppercase tracking-wider px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-full border mb-1.5 sm:mb-2 ${cfg.bg} ${cfg.color}`}>
                          <Icon className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
                          {entry.type}
                        </span>
                        <h3 className={`font-display font-bold text-sm sm:text-base leading-tight ${isDarkMode ? "text-[#F5F0E8]" : "text-[#1A1A2E]"}`}>{entry.title}</h3>
                        <p className={`font-medium text-xs mt-0.5 ${isDarkMode ? "text-[#C9A84C]/70" : "text-[#C9A84C]/80"}`}>{entry.organization}</p>
                      </div>
                      <span className={`font-mono text-[9px] sm:text-[10px] uppercase tracking-wider shrink-0 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-lg border self-start ${
                        isDarkMode ? "border-[#C9A84C]/15 text-[#C9A84C]/50 bg-[#C9A84C]/4" : "border-[#C9A84C]/20 text-[#C9A84C]/65 bg-[#C9A84C]/5"
                      }`}>
                        {entry.period}
                      </span>
                    </div>

                    {/* Bullets */}
                    <ul className="space-y-1 sm:space-y-1.5 mb-3 sm:mb-4">
                      {entry.description.map((d, di) => (
                        <li key={di} className={`flex items-start gap-2 text-xs font-light leading-relaxed ${isDarkMode ? "text-[#F5F0E8]/60" : "text-[#1A1A2E]/60"}`}>
                          <ChevronRight className="w-3 h-3 text-[#C9A84C]/50 mt-0.5 shrink-0" />
                          {d}
                        </li>
                      ))}
                    </ul>

                    {/* Tags — wrap on mobile */}
                    <div className="flex flex-wrap gap-1 sm:gap-1.5">
                      {entry.tags.map(tag => (
                        <span key={tag} className={`font-mono text-[7px] sm:text-[8px] uppercase tracking-wider px-1.5 sm:px-2 py-0.5 rounded-md border ${
                          isDarkMode ? "border-[#C9A84C]/15 text-[#C9A84C]/60 bg-[#C9A84C]/5" : "border-[#C9A84C]/20 text-[#C9A84C]/70"
                        }`}>{tag}</span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
