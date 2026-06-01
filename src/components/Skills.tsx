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

// ── Professional SVG Tech Icons ──────────────────────────────────────────────
const TechIcon = ({ name }: { name: string }) => {
  const icons: Record<string, JSX.Element> = {
    react: (
      <svg viewBox="0 0 24 24" fill="none" className="w-7 h-7">
        <circle cx="12" cy="12" r="2.1" fill="#61DAFB"/>
        <ellipse cx="12" cy="12" rx="10" ry="3.8" stroke="#61DAFB" strokeWidth="1.2" fill="none"/>
        <ellipse cx="12" cy="12" rx="10" ry="3.8" stroke="#61DAFB" strokeWidth="1.2" fill="none" transform="rotate(60 12 12)"/>
        <ellipse cx="12" cy="12" rx="10" ry="3.8" stroke="#61DAFB" strokeWidth="1.2" fill="none" transform="rotate(120 12 12)"/>
      </svg>
    ),
    html5: (
      <svg viewBox="0 0 24 24" className="w-7 h-7">
        <path d="M4 2l1.5 17L12 21l6.5-2L20 2H4z" fill="#E44D26"/>
        <path d="M12 3.5v15.7l5.3-1.5 1.2-13.7H12z" fill="#F16529"/>
        <path d="M12 10h-2.5l-.2-2H12V6H7l.5 6H12v-2zm0 4.5l-2.5-.7-.1-1.3H7.2l.3 3L12 17v-2.5z" fill="#fff"/>
      </svg>
    ),
    css3: (
      <svg viewBox="0 0 24 24" className="w-7 h-7">
        <path d="M4 2l1.5 17L12 21l6.5-2L20 2H4z" fill="#264DE4"/>
        <path d="M12 3.5v15.7l5.3-1.5 1.2-13.7H12z" fill="#2965F1"/>
        <path d="M12 10H9.7l-.1-1.5H12V7H7.3l.4 4.5H12V10zm0 4l-2.3-.6-.1-1.4H7.8l.3 3.1L12 16.5V14z" fill="#fff"/>
      </svg>
    ),
    javascript: (
      <svg viewBox="0 0 24 24" className="w-7 h-7">
        <rect width="24" height="24" rx="3" fill="#F7DF1E"/>
        <path d="M7 17.5c.4.7 1 1.2 2 1.2 1.1 0 1.8-.6 1.8-1.4 0-1-.7-1.3-1.8-1.8l-.6-.3C7 14.7 6 13.8 6 12.2c0-1.5 1.1-2.6 2.9-2.6 1.3 0 2.2.4 2.8 1.5l-1.5 1c-.3-.5-.7-.8-1.3-.8-.6 0-1 .4-1 .9 0 .6.4.9 1.3 1.3l.6.3c1.6.7 2.6 1.5 2.6 3.2 0 1.9-1.5 2.8-3.4 2.8-1.9 0-3.1-.9-3.7-2.1L7 17.5zm7.4.3c.5.8 1.1 1.4 2.3 1.4 1 0 1.6-.5 1.6-1.2 0-.8-.6-1.1-1.7-1.6l-.6-.3c-1.7-.7-2.8-1.6-2.8-3.5 0-1.8 1.3-3.1 3.4-3.1 1.5 0 2.5.5 3.2 1.8l-1.7 1.1c-.4-.7-.8-1-1.5-1-.7 0-1.1.4-1.1.9 0 .6.4.9 1.2 1.3l.6.2c2 .8 3.1 1.7 3.1 3.6 0 2.1-1.6 3.1-3.8 3.1-2.1 0-3.5-1-4.2-2.4l1.8-.9z" fill="#000"/>
      </svg>
    ),
    typescript: (
      <svg viewBox="0 0 24 24" className="w-7 h-7">
        <rect width="24" height="24" rx="3" fill="#3178C6"/>
        <path d="M13.5 12.5H16v1.4h-2.5V17H12V9h5v1.4h-3.5v2.1zM7.5 10.4H5V9h7v1.4H9.5V17H7.5v-6.6z" fill="#fff"/>
      </svg>
    ),
    tailwind: (
      <svg viewBox="0 0 24 24" className="w-7 h-7">
        <path d="M12 6c-2.67 0-4.33 1.33-5 4 1-1.33 2.17-1.83 3.5-1.5.76.19 1.31.74 1.91 1.35C13.37 10.8 14.38 12 16.5 12c2.67 0 4.33-1.33 5-4-1 1.33-2.17 1.83-3.5 1.5-.76-.19-1.31-.74-1.91-1.35C15.13 7.2 14.12 6 12 6zM7 12c-2.67 0-4.33 1.33-5 4 1-1.33 2.17-1.83 3.5-1.5.76.19 1.31.74 1.91 1.35C8.37 16.8 9.38 18 11.5 18c2.67 0 4.33-1.33 5-4-1 1.33-2.17 1.83-3.5 1.5-.76-.19-1.31-.74-1.91-1.35C10.13 13.2 9.12 12 7 12z" fill="#38BDF8"/>
      </svg>
    ),
    nodejs: (
      <svg viewBox="0 0 24 24" className="w-7 h-7">
        <path d="M12 2L3 7v10l9 5 9-5V7L12 2z" fill="#539E43"/>
        <path d="M12 4.5L5 8.5v7l7 3.9 7-3.9v-7L12 4.5z" fill="#3E7B34"/>
        <path d="M12 6.5L6.5 9.7v6.6L12 19l5.5-2.7V9.7L12 6.5z" fill="#60B547"/>
        <text x="8.5" y="15" fontSize="5.5" fill="#fff" fontWeight="bold" fontFamily="monospace">JS</text>
      </svg>
    ),
    express: (
      <svg viewBox="0 0 24 24" className="w-7 h-7">
        <rect width="24" height="24" rx="3" fill="#fff" fillOpacity="0.08"/>
        <text x="2" y="15.5" fontSize="6.5" fill="#888" fontWeight="bold" fontFamily="monospace">exp</text>
        <text x="2" y="21" fontSize="5" fill="#555" fontFamily="monospace">ress</text>
      </svg>
    ),
    php: (
      <svg viewBox="0 0 24 24" className="w-7 h-7">
        <ellipse cx="12" cy="12" rx="11" ry="7" fill="#8892BF"/>
        <path d="M5 10h2l.5 2H9l.5-2h2l-1.5 4H8.5L8 12.5h-.5L7 14H5.5L5 10zm8 0h3c.8 0 1.5.7 1.5 1.5S16.8 13 16 13h-1.5l-.5 1H12.5L13 10zm1.5 1.5v.5H15c.3 0 .5-.2.5-.5s-.2-.5-.5-.5h-.5z" fill="#fff"/>
      </svg>
    ),
    java: (
      <svg viewBox="0 0 24 24" className="w-7 h-7">
        <path d="M9 17s-.5 1 1.5 1.3c2.3.4 3.5.3 5.5-.4 0 0 .6.4 1.5.7-5.3 2.3-12-.1-8.5-1.6zm-.7-2s-.5.9 1.5 1.1c2 .3 3.5.3 4.9-.1 0 0 .4.4 1.1.6-4.3 1.3-9.1.1-7.5-1.6z" fill="#E76F00"/>
        <path d="M13 3.5s2 2-1.9 5.1C8.1 11 10.7 12.5 11 14c-1.1-1-1.9-1.9-1.4-2.7.8-1.2 2.9-1.8 2.4-4.8zM10 20s.5.4-.5.7c-1.9.5-7.8.7-9.5.1-.6-.3.5-.7 1-.7.5-.1.8 0 .8 0C.3 19.4-2 18.5 3 17.5c-.2.8-2 1.5 0 2.2 2 .7 6 .5 7-.3z" fill="#E76F00"/>
        <path d="M15.5 19s.4.3-.4.6c-1.5.4-6.2.6-7.5.1-.5-.2.4-.5.8-.6.4 0 .6 0 .6 0-1.4-.5-3.6-1.1.4-1.8-.2.6-1.6 1.2 0 1.7 1.6.5 4.7.4 5.6-.2z" fill="#E76F00"/>
        <path d="M14 0s1.2 1.3-.9 3.2c-1.7 1.6-.4 2.5 0 3.5-1.1-.9-2-1.8-1.4-2.6C12.8 2.7 14.7 2.1 14 0z" fill="#5382A1"/>
        <path d="M10.2 22.8c4.8.3 12.1-.2 12.3-2.3 0 0-.3.8-3.9 1.5-4.1.7-9.1.6-12-.2 0 0 .6.5 3.6 1z" fill="#E76F00"/>
      </svg>
    ),
    python: (
      <svg viewBox="0 0 24 24" className="w-7 h-7">
        <path d="M12 2C8.5 2 9 4 9 4v2h6V7H7S4 6.5 4 10v3c0 0-.5 3 3 3h1v-2s-.5-2 2-2h4s2 .5 2-2V6s.5-4-4-4zm-1 2c.6 0 1 .4 1 1s-.4 1-1 1-1-.4-1-1 .4-1 1-1z" fill="#3776AB"/>
        <path d="M12 22c3.5 0 3-2 3-2v-2H9v-1h8s3 .5 3-3v-3s.5-3-3-3h-1v2s.5 2-2 2H10s-2-.5-2 2v4s-.5 4 4 4zm1-2c-.6 0-1-.4-1-1s.4-1 1-1 1 .4 1 1-.4 1-1 1z" fill="#FFD43B"/>
      </svg>
    ),
    c: (
      <svg viewBox="0 0 24 24" className="w-7 h-7">
        <circle cx="12" cy="12" r="10" fill="#5C6BC0"/>
        <path d="M15.5 8.5C14.5 7.5 13.3 7 12 7c-2.8 0-5 2.2-5 5s2.2 5 5 5c1.3 0 2.5-.5 3.5-1.5L14 14c-.6.6-1.2 1-2 1-1.7 0-3-1.3-3-3s1.3-3 3-3c.8 0 1.4.3 2 1l1.5-1.5z" fill="#fff"/>
      </svg>
    ),
    cpp: (
      <svg viewBox="0 0 24 24" className="w-7 h-7">
        <circle cx="12" cy="12" r="10" fill="#00599C"/>
        <path d="M14.5 8.5C13.5 7.5 12.3 7 11 7c-2.8 0-5 2.2-5 5s2.2 5 5 5c1.3 0 2.5-.5 3.5-1.5L13 14c-.6.6-1.2 1-2 1-1.7 0-3-1.3-3-3s1.3-3 3-3c.8 0 1.4.3 2 1l1.5-1.5z" fill="#fff"/>
        <path d="M17 10h-1v-.8h-1V10h-1v1h1v.8h1V11h1v-1zm3.5 0h-1v-.8h-1V10h-1v1h1v.8h1V11h1v-1z" fill="#fff"/>
      </svg>
    ),
    dsa: (
      <svg viewBox="0 0 24 24" className="w-7 h-7" fill="none">
        <circle cx="12" cy="4" r="2" fill="#8B5CF6"/>
        <circle cx="6"  cy="14" r="2" fill="#8B5CF6"/>
        <circle cx="18" cy="14" r="2" fill="#8B5CF6"/>
        <circle cx="12" cy="20" r="2" fill="#8B5CF6"/>
        <line x1="12" y1="6" x2="6"  y2="12" stroke="#8B5CF6" strokeWidth="1.5"/>
        <line x1="12" y1="6" x2="18" y2="12" stroke="#8B5CF6" strokeWidth="1.5"/>
        <line x1="6"  y1="16" x2="12" y2="18" stroke="#8B5CF6" strokeWidth="1.5"/>
        <line x1="18" y1="16" x2="12" y2="18" stroke="#8B5CF6" strokeWidth="1.5"/>
      </svg>
    ),
    sql: (
      <svg viewBox="0 0 24 24" className="w-7 h-7" fill="none">
        <ellipse cx="12" cy="7" rx="8" ry="3" fill="#F59E0B" fillOpacity="0.2" stroke="#F59E0B" strokeWidth="1.2"/>
        <path d="M4 7v5c0 1.7 3.6 3 8 3s8-1.3 8-3V7" stroke="#F59E0B" strokeWidth="1.2" fill="none"/>
        <path d="M4 12v5c0 1.7 3.6 3 8 3s8-1.3 8-3v-5" stroke="#F59E0B" strokeWidth="1.2" fill="none"/>
      </svg>
    ),
    mongodb: (
      <svg viewBox="0 0 24 24" className="w-7 h-7">
        <path d="M12 2C10 8 7 9 7 14c0 3.3 2.2 5.9 5 5.9s5-2.6 5-5.9C17 9 14 8 12 2z" fill="#4DB33D"/>
        <path d="M12 19.9v2.1" stroke="#4DB33D" strokeWidth="1.5"/>
        <path d="M12 2C13 8 14 9 14 14" stroke="#3A9032" strokeWidth="0.8" fill="none"/>
      </svg>
    ),
    ml: (
      <svg viewBox="0 0 24 24" className="w-7 h-7" fill="none">
        <circle cx="4"  cy="12" r="2" fill="#F43F5E"/>
        <circle cx="12" cy="6"  r="2" fill="#F43F5E"/>
        <circle cx="12" cy="18" r="2" fill="#F43F5E"/>
        <circle cx="20" cy="12" r="2" fill="#F43F5E"/>
        <circle cx="12" cy="12" r="2.5" fill="#F43F5E" fillOpacity="0.6"/>
        <line x1="6"  y1="12" x2="9.5"  y2="12"  stroke="#F43F5E" strokeWidth="1.2"/>
        <line x1="14.5" y1="12" x2="18" y2="12"  stroke="#F43F5E" strokeWidth="1.2"/>
        <line x1="12"  y1="8"  x2="12"  y2="9.5" stroke="#F43F5E" strokeWidth="1.2"/>
        <line x1="12"  y1="14.5" x2="12" y2="16" stroke="#F43F5E" strokeWidth="1.2"/>
      </svg>
    ),
    data: (
      <svg viewBox="0 0 24 24" className="w-7 h-7" fill="none">
        <rect x="3" y="14" width="4" height="7" rx="1" fill="#F43F5E"/>
        <rect x="10" y="9"  width="4" height="12" rx="1" fill="#F43F5E" fillOpacity="0.8"/>
        <rect x="17" y="4"  width="4" height="17" rx="1" fill="#F43F5E" fillOpacity="0.6"/>
        <polyline points="5,12 12,7 19,3" stroke="#F43F5E" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
    pandas: (
      <svg viewBox="0 0 24 24" className="w-7 h-7">
        <rect x="9" y="2"  width="2.5" height="9"  rx="1.2" fill="#150458"/>
        <rect x="9" y="13" width="2.5" height="9"  rx="1.2" fill="#E70488"/>
        <rect x="12.5" y="2"  width="2.5" height="9"  rx="1.2" fill="#E70488"/>
        <rect x="12.5" y="13" width="2.5" height="9"  rx="1.2" fill="#150458"/>
        <rect x="9" y="9.5"  width="6" height="5" rx="1" fill="#fff" fillOpacity="0.15"/>
      </svg>
    ),
    numpy: (
      <svg viewBox="0 0 24 24" className="w-7 h-7" fill="none">
        <path d="M12 3L3 8v8l9 5 9-5V8L12 3z" fill="#4DABCF" fillOpacity="0.2" stroke="#4DABCF" strokeWidth="1.2"/>
        <path d="M3 8l9 5 9-5" stroke="#4DABCF" strokeWidth="1.2"/>
        <line x1="12" y1="13" x2="12" y2="21" stroke="#4DABCF" strokeWidth="1.2"/>
        <text x="8" y="13" fontSize="5.5" fill="#4DABCF" fontWeight="bold" fontFamily="monospace">np</text>
      </svg>
    ),
    git: (
      <svg viewBox="0 0 24 24" className="w-7 h-7">
        <path d="M21.7 11.3L12.7 2.3a1 1 0 00-1.4 0L9 4.6l2.5 2.5A1.5 1.5 0 0113.5 9a1.5 1.5 0 01-1.5 1.5 1.5 1.5 0 01-.4 0l-2.4-2.4v6.3A1.5 1.5 0 0110.5 16a1.5 1.5 0 01-1.5 1.5 1.5 1.5 0 01-1.5-1.5 1.5 1.5 0 011-1.4V8.4A1.5 1.5 0 018 7 1.5 1.5 0 019.5 5.5a1.5 1.5 0 01.5.1l2.3 2.3L14.5 5.6l-2.2-2.2c-.4-.4-.4-1 0-1.4l1.4-1.4c.4-.4 1-.4 1.4 0l9 9c.4.4.4 1 0 1.4L21.7 13c-.4.4-1 .4-1.4 0a1 1 0 010-1.7z" fill="#F05032"/>
        <path d="M15 17.5A1.5 1.5 0 0113.5 16a1.5 1.5 0 011-1.4v-2.1l-2.3-2.3a1.5 1.5 0 01-.2.3A1.5 1.5 0 0110.5 12a1.5 1.5 0 01-.2-3H10l2.8 2.8V14a1.5 1.5 0 011.2 1.5A1.5 1.5 0 0115 17.5z" fill="#F05032" fillOpacity="0.6"/>
      </svg>
    ),
    github: (
      <svg viewBox="0 0 24 24" className="w-7 h-7">
        <path d="M12 2A10 10 0 002 12c0 4.4 2.9 8.2 6.8 9.5.5.1.7-.2.7-.5v-1.7c-2.8.6-3.4-1.3-3.4-1.3-.5-1.2-1.1-1.5-1.1-1.5-.9-.6.1-.6.1-.6 1 .1 1.5 1 1.5 1 .9 1.5 2.3 1.1 2.8.8.1-.6.3-1.1.6-1.3-2.2-.3-4.6-1.1-4.6-4.9 0-1.1.4-2 1-2.7-.1-.3-.4-1.3.1-2.7 0 0 .8-.3 2.7 1a9.4 9.4 0 015 0c1.9-1.3 2.7-1 2.7-1 .5 1.4.2 2.4.1 2.7.6.7 1 1.6 1 2.7 0 3.8-2.3 4.6-4.6 4.9.4.3.7 1 .7 2v2.9c0 .3.2.6.7.5A10 10 0 0022 12 10 10 0 0012 2z" fill="#aaa"/>
      </svg>
    ),
    vscode: (
      <svg viewBox="0 0 24 24" className="w-7 h-7">
        <path d="M17 1.5L8.9 9.8 4 6 1.5 7.5l4.1 4.5L1.5 16.5 4 18l4.9-3.8L17 22.5l5.5-2.5v-16L17 1.5z" fill="#007ACC"/>
        <path d="M17 6.8L11.3 12 17 17.2V6.8z" fill="#fff" fillOpacity="0.3"/>
        <path d="M17 1.5v5.3L8.9 9.8 4 6 1.5 7.5l4.1 4.5L1.5 16.5 4 18l4.9-3.8L17 17.2v5.3l5.5-2.5v-16L17 1.5z" fill="#fff" fillOpacity="0.1"/>
      </svg>
    ),
  };

  return icons[name] ?? (
    <div className="w-7 h-7 rounded-lg bg-[#C9A84C]/20 flex items-center justify-center">
      <span className="font-mono text-[9px] font-bold text-[#C9A84C] uppercase">{name.slice(0,2)}</span>
    </div>
  );
};

// ── Skill Bar ─────────────────────────────────────────────────────────────────
function SkillBar({ level, inView, isDarkMode }: { level: number; inView: boolean; isDarkMode: boolean }) {
  const [w, setW] = useState(0);
  useEffect(() => { if (inView) setTimeout(() => setW(level), 200); }, [inView, level]);
  return (
    <div className={`h-[3px] rounded-full overflow-hidden mt-2 ${isDarkMode ? "bg-white/8" : "bg-[#1A1A2E]/8"}`}>
      <div className="h-full skill-fill rounded-full transition-all duration-1000 ease-out" style={{ width: `${w}%` }} />
    </div>
  );
}

// ── Main Component ────────────────────────────────────────────────────────────
export default function Skills({ isDarkMode }: Props) {
  const [filter, setFilter] = useState<Category>("All");
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  const filtered = filter === "All" ? skillsData : skillsData.filter(s => s.category === filter);

  const cardBase = `rounded-xl border p-3 sm:p-4 transition-all duration-300 card-lift group ${
    isDarkMode ? "bg-[#0D0D1F]/60 border-[#C9A84C]/10 hover:border-[#C9A84C]/28" : "bg-white/70 border-[#C9A84C]/15 hover:border-[#C9A84C]/38"
  }`;

  return (
    <section id="skills" className="py-20 sm:py-24 px-5 sm:px-8 md:px-10 lg:px-20 relative" aria-label="Skills">
      <div className="max-w-7xl mx-auto" ref={ref}>

        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }} className="mb-8 sm:mb-12">
          <span className="section-tag block mb-3">02 · Skills</span>
          <h2 className={`font-display font-black text-3xl sm:text-4xl md:text-5xl leading-tight ${isDarkMode ? "text-[#F5F0E8]" : "text-[#1A1A2E]"}`}>
            Tech <span className="gold-text">Arsenal</span>
          </h2>
          <div className="gold-line mt-4 w-24" />
        </motion.div>

        {/* Filter Pills — scrollable on mobile */}
        <motion.div initial={{ opacity: 0, y: 12 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.15, duration: 0.5 }}
          className="flex gap-2 mb-7 sm:mb-10 overflow-x-auto pb-2 -mx-1 px-1"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}>
          {FILTERS.map(f => (
            <button key={f} onClick={() => setFilter(f)}
              className={`font-mono text-[9px] sm:text-[10px] uppercase tracking-[0.15em] px-3 sm:px-4 py-1.5 sm:py-2 rounded-full border cursor-pointer transition-all duration-300 whitespace-nowrap shrink-0 ${
                filter === f
                  ? "bg-[#C9A84C] text-[#0A0A14] border-[#C9A84C] font-bold shadow-[0_0_15px_rgba(201,168,76,0.3)]"
                  : isDarkMode ? "border-[#C9A84C]/20 text-[#F5F0E8]/50 hover:text-[#C9A84C] hover:border-[#C9A84C]/45"
                    : "border-[#C9A84C]/25 text-[#1A1A2E]/50 hover:text-[#C9A84C] hover:border-[#C9A84C]/50"
              }`}>{f}
            </button>
          ))}
        </motion.div>

        {/* Skills Grid */}
        <motion.div layout className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 sm:gap-3">
          <AnimatePresence mode="popLayout">
            {filtered.map((skill, i) => (
              <motion.div key={skill.name} layout
                initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.85 }} transition={{ duration: 0.28, delay: i * 0.03 }}
                className={cardBase}>

                {/* SVG Icon */}
                <div className="mb-2 group-hover:scale-110 transition-transform duration-300">
                  <TechIcon name={skill.iconName} />
                </div>

                <h3 className={`font-display text-[11px] sm:text-xs font-semibold mb-1 leading-tight ${isDarkMode ? "text-[#F5F0E8]/90" : "text-[#1A1A2E]/90"}`}>
                  {skill.name}
                </h3>

                <span className={`inline-block font-mono text-[7px] sm:text-[8px] uppercase tracking-wider px-1.5 py-0.5 rounded border ${CATEGORY_COLORS[skill.category]}`}>
                  {skill.category}
                </span>

                <SkillBar level={skill.level} inView={inView} isDarkMode={isDarkMode} />

                <p className={`font-mono text-[8px] sm:text-[9px] mt-1 text-right ${isDarkMode ? "text-[#C9A84C]/50" : "text-[#C9A84C]/70"}`}>
                  {skill.level}%
                </p>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Footer note */}
        <motion.div initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ delay: 0.6, duration: 0.6 }}
          className={`mt-7 sm:mt-10 p-4 sm:p-5 rounded-2xl border text-center ${isDarkMode ? "border-[#C9A84C]/12 bg-[#C9A84C]/3" : "border-[#C9A84C]/18 bg-[#C9A84C]/4"}`}>
          <p className={`font-serif italic text-xs sm:text-sm ${isDarkMode ? "text-[#F5F0E8]/55" : "text-[#1A1A2E]/55"}`}>
            Actively expanding expertise in <span className="text-[#C9A84C] not-italic font-semibold">AI, Machine Learning, DevOps, and Cloud Computing</span> — always learning, always building.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
