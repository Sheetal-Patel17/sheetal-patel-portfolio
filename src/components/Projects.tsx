import { useRef } from "react";
import { motion } from "motion/react";
import { useInView } from "motion/react";
import { Github, ExternalLink } from "lucide-react";
import { projectsData } from "../data";

interface Props { isDarkMode: boolean; }

const CATEGORY_COLORS: Record<string, string> = {
  "Data Science":    "text-amber-400 bg-amber-400/10 border-amber-400/20",
  "Machine Learning":"text-violet-400 bg-violet-400/10 border-violet-400/20",
  "Full Stack":      "text-sky-400 bg-sky-400/10 border-sky-400/20",
};

export default function Projects({ isDarkMode }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section id="projects" className="py-24 px-5 md:px-10 lg:px-20 relative" aria-label="Projects">
      {/* Ambient */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/3 right-0 w-[450px] h-[450px] rounded-full opacity-40"
          style={{ background: "radial-gradient(circle, rgba(201,168,76,0.05) 0%, transparent 70%)" }} />
      </div>

      <div className="max-w-7xl mx-auto" ref={ref}>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-14"
        >
          <span className="section-tag block mb-3">03 · Projects</span>
          <h2 className={`font-display font-black text-4xl sm:text-5xl leading-tight ${isDarkMode ? "text-[#F5F0E8]" : "text-[#1A1A2E]"}`}>
            Selected <span className="gold-text">Work</span>
          </h2>
          <div className="gold-line mt-4 w-24" />
          <p className={`mt-4 text-sm max-w-xl font-light ${isDarkMode ? "text-[#F5F0E8]/50" : "text-[#1A1A2E]/50"}`}>
            Real-world projects built to solve genuine problems — each one crafted with attention to detail and engineering discipline.
          </p>
        </motion.div>

        {/* Project Cards */}
        <div className="flex flex-col gap-8">
          {projectsData.map((project, i) => (
            <motion.article
              key={project.id}
              initial={{ opacity: 0, y: 28 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.12, duration: 0.6 }}
              className={`rounded-2xl border overflow-hidden transition-all duration-300 ${
                isDarkMode
                  ? "bg-[#0D0D1F]/60 border-[#C9A84C]/12 hover:border-[#C9A84C]/28"
                  : "bg-white/70 border-[#C9A84C]/18 hover:border-[#C9A84C]/38"
              }`}
              aria-label={project.title}
            >
              <div className={`grid grid-cols-1 ${i % 2 === 0 ? "lg:grid-cols-[1.1fr_1fr]" : "lg:grid-cols-[1fr_1.1fr]"}`}>

                {/* Image side */}
                <div className={`relative overflow-hidden h-52 lg:h-auto min-h-[220px] ${i % 2 !== 0 ? "lg:order-2" : ""}`}>
                  <img
                    src={project.img}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                  />
                  {/* Overlay */}
                  <div className={`absolute inset-0 ${
                    isDarkMode
                      ? i % 2 === 0 ? "bg-gradient-to-r from-transparent to-[#0D0D1F]/80" : "bg-gradient-to-l from-transparent to-[#0D0D1F]/80"
                      : i % 2 === 0 ? "bg-gradient-to-r from-transparent to-white/60" : "bg-gradient-to-l from-transparent to-white/60"
                  }`} />
                  {/* Category badge on image */}
                  <div className="absolute top-4 left-4">
                    <span className={`font-mono text-[9px] uppercase tracking-wider px-3 py-1.5 rounded-full border ${CATEGORY_COLORS[project.category]}`}
                      style={{ backdropFilter: "blur(8px)", background: isDarkMode ? "rgba(10,10,20,0.6)" : "rgba(255,253,247,0.7)" }}>
                      {project.category}
                    </span>
                  </div>
                </div>

                {/* Content side */}
                <div className={`p-7 flex flex-col justify-between gap-5 ${i % 2 !== 0 ? "lg:order-1" : ""}`}>
                  <div>
                    {/* Index */}
                    <span className="font-mono text-[9px] text-[#C9A84C]/50 tracking-[0.3em] uppercase block mb-2">
                      Project {String(i + 1).padStart(2, "0")}
                    </span>

                    {/* Title */}
                    <h3 className={`font-display font-black text-xl sm:text-2xl mb-1 ${isDarkMode ? "text-[#F5F0E8]" : "text-[#1A1A2E]"}`}>
                      {project.title}
                    </h3>
                    <p className={`font-mono text-[10px] uppercase tracking-wider mb-4 ${isDarkMode ? "text-[#C9A84C]/60" : "text-[#C9A84C]/70"}`}>
                      {project.subtitle}
                    </p>

                    {/* Description */}
                    <p className={`text-sm leading-relaxed font-light mb-5 ${isDarkMode ? "text-[#F5F0E8]/60" : "text-[#1A1A2E]/60"}`}>
                      {project.description}
                    </p>

                    {/* Features */}
                    <ul className="space-y-1.5 mb-5">
                      {project.features.slice(0, 3).map((f, fi) => (
                        <li key={fi} className={`flex items-start gap-2 text-xs font-light ${isDarkMode ? "text-[#F5F0E8]/55" : "text-[#1A1A2E]/55"}`}>
                          <span className="w-1 h-1 rounded-full bg-[#C9A84C] mt-1.5 shrink-0" />
                          {f}
                        </li>
                      ))}
                    </ul>

                    {/* Tech Stack */}
                    <div className="flex flex-wrap gap-1.5">
                      {project.tech.map(t => (
                        <span key={t} className={`font-mono text-[9px] uppercase tracking-wider px-2.5 py-1 rounded-lg border ${
                          isDarkMode ? "border-[#C9A84C]/18 text-[#C9A84C]/70 bg-[#C9A84C]/5" : "border-[#C9A84C]/22 text-[#C9A84C] bg-[#C9A84C]/6"
                        }`}>
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Action buttons */}
                  <div className="flex gap-3 pt-2 border-t border-[#C9A84C]/10">
                    {project.github && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noreferrer"
                        className={`flex items-center gap-2 text-[10px] uppercase tracking-[0.15em] font-bold px-5 py-2.5 rounded-xl border transition-all duration-300 ${
                          isDarkMode
                            ? "border-[#C9A84C]/25 text-[#C9A84C]/80 hover:text-[#C9A84C] hover:border-[#C9A84C]/55 hover:bg-[#C9A84C]/5"
                            : "border-[#C9A84C]/30 text-[#C9A84C]/80 hover:text-[#C9A84C] hover:border-[#C9A84C]/60"
                        }`}
                      >
                        <Github className="w-3.5 h-3.5" /> GitHub
                      </a>
                    )}
                    {project.demo && project.demo !== "#" && (
                      <a
                        href={project.demo}
                        target="_blank"
                        rel="noreferrer"
                        className="btn-gold flex items-center gap-2 text-[10px] uppercase tracking-[0.15em] font-bold px-5 py-2.5 rounded-xl"
                      >
                        <ExternalLink className="w-3.5 h-3.5" /> Live Demo
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
