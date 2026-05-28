import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useInView } from "motion/react";
import { skillsData } from "../data";

interface Props { isDarkMode: boolean; }

type Category = "All" | "Frontend" | "Backend" | "Programming" | "Database" | "AI & Data" | "Tools";

const FILTERS: Category[] = ["All", "Frontend", "Backend", "Programming", "Database", "AI & Data", "Tools"];

const CATEGORY_COLORS: Record<string, string> = {
  "Frontend":    "text-sky-400 bg-sky-500/10 border-sky-500/20",
  "Backend":     "text-emerald-400 bg-emerald-500/10 border-emerald-500/20",
  "Programming": "text-violet-400 bg-violet-500/10 border-violet-500/20",
  "Database":    "text-amber-400 bg-amber-500/10 border-amber-500/20",
  "AI & Data":   "text-rose-400 bg-rose-500/10 border-rose-500/20",
  "Tools":       "text-cyan-400 bg-cyan-500/10 border-cyan-500/20",
};

function SkillBar({ level, inView, isDarkMode }: { level: number; inView: boolean; isDarkMode: boolean }) {
  const [w, setW] = useState(0);
  useEffect(() => {
    if (inView) setTimeout(() => setW(level), 200);
  }, [inView, level]);
  return (
    <div className={`h-[3px] rounded-full overflow-hidden mt-2 ${isDarkMode ? "bg-white/8" : "bg-[#1A1A2E]/8"}`}>
      <div
        className="h-full skill-fill rounded-full transition-all duration-1000 ease-out"
        style={{ width: `${w}%` }}
      />
    </div>
  );
}

export default function Skills({ isDarkMode }: Props) {
  const [filter, setFilter] = useState<Category>("All");
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  const filtered = filter === "All" ? skillsData : skillsData.filter(s => s.category === filter);

  const cardBase = `rounded-xl border p-4 transition-all duration-300 card-lift group ${
    isDarkMode ? "bg-[#0D0D1F]/60 border-[#C9A84C]/10 hover:border-[#C9A84C]/28" : "bg-white/70 border-[#C9A84C]/15 hover:border-[#C9A84C]/38"
  }`;

  return (
    <section id="skills" className="py-24 px-5 md:px-10 lg:px-20 relative" aria-label="Skills">
      <div className="max-w-7xl mx-auto" ref={ref}>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <span className="section-tag block mb-3">02 · Skills</span>
          <h2 className={`font-display font-black text-4xl sm:text-5xl leading-tight ${isDarkMode ? "text-[#F5F0E8]" : "text-[#1A1A2E]"}`}>
            Tech <span className="gold-text">Arsenal</span>
          </h2>
          <div className="gold-line mt-4 w-24" />
        </motion.div>

        {/* Filter Pills */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.15, duration: 0.5 }}
          className="flex flex-wrap gap-2 mb-10"
        >
          {FILTERS.map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`font-mono text-[10px] uppercase tracking-[0.18em] px-4 py-2 rounded-full border cursor-pointer transition-all duration-300 ${
                filter === f
                  ? "bg-[#C9A84C] text-[#0A0A14] border-[#C9A84C] font-bold shadow-[0_0_15px_rgba(201,168,76,0.3)]"
                  : isDarkMode
                    ? "border-[#C9A84C]/20 text-[#F5F0E8]/50 hover:text-[#C9A84C] hover:border-[#C9A84C]/45"
                    : "border-[#C9A84C]/25 text-[#1A1A2E]/50 hover:text-[#C9A84C] hover:border-[#C9A84C]/50"
              }`}
            >
              {f}
            </button>
          ))}
        </motion.div>

        {/* Skills Grid */}
        <motion.div
          layout
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3"
        >
          <AnimatePresence mode="popLayout">
            {filtered.map((skill, i) => (
              <motion.div
                key={skill.name}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.85 }}
                transition={{ duration: 0.28, delay: i * 0.03 }}
                className={cardBase}
              >
                {/* Icon */}
                <div className="text-2xl mb-2 group-hover:scale-110 transition-transform duration-300 leading-none">
                  {skill.iconName}
                </div>

                {/* Name */}
                <h3 className={`font-display text-xs font-semibold mb-1 leading-tight ${isDarkMode ? "text-[#F5F0E8]/90" : "text-[#1A1A2E]/90"}`}>
                  {skill.name}
                </h3>

                {/* Category badge */}
                <span className={`inline-block font-mono text-[8px] uppercase tracking-wider px-1.5 py-0.5 rounded border ${CATEGORY_COLORS[skill.category]}`}>
                  {skill.category}
                </span>

                {/* Level bar */}
                <SkillBar level={skill.level} inView={inView} isDarkMode={isDarkMode} />

                {/* Level text */}
                <p className={`font-mono text-[9px] mt-1 text-right ${isDarkMode ? "text-[#C9A84C]/50" : "text-[#C9A84C]/70"}`}>
                  {skill.level}%
                </p>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Summary line */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.6, duration: 0.6 }}
          className={`mt-10 p-5 rounded-2xl border text-center ${
            isDarkMode ? "border-[#C9A84C]/12 bg-[#C9A84C]/3" : "border-[#C9A84C]/18 bg-[#C9A84C]/4"
          }`}
        >
          <p className={`font-serif italic text-sm ${isDarkMode ? "text-[#F5F0E8]/55" : "text-[#1A1A2E]/55"}`}>
            Actively expanding expertise in <span className="text-[#C9A84C] not-italic font-semibold">AI, Machine Learning, DevOps, and Cloud Computing</span> — always learning, always building.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
