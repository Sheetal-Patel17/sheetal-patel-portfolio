import { useRef } from "react";
import { motion } from "motion/react";
import { useInView } from "motion/react";
import { certificationsData } from "../data";
import { Award } from "lucide-react";

interface Props { isDarkMode: boolean; }

export default function Certifications({ isDarkMode }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section id="certifications" className="py-20 sm:py-24 px-5 sm:px-8 md:px-10 lg:px-20 relative" aria-label="Certifications">
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[400px] sm:w-[600px] h-[200px] sm:h-[300px] rounded-full opacity-30"
          style={{ background: "radial-gradient(ellipse, rgba(201,168,76,0.07) 0%, transparent 70%)" }} />
      </div>

      <div className="max-w-7xl mx-auto" ref={ref}>
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }} className="mb-10 sm:mb-14">
          <span className="section-tag block mb-3">05 · Certifications</span>
          <h2 className={`font-display font-black text-3xl sm:text-4xl md:text-5xl leading-tight ${isDarkMode ? "text-[#F5F0E8]" : "text-[#1A1A2E]"}`}>
            Achievements & <span className="gold-text">Credentials</span>
          </h2>
          <div className="gold-line mt-4 w-24" />
        </motion.div>

        {/* Cert Cards — 1 col mobile, 2 sm, 4 lg */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {certificationsData.map((cert, i) => (
            <motion.div key={cert.id}
              initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.1, duration: 0.55 }}
              className={`relative rounded-2xl border p-5 sm:p-6 overflow-hidden card-lift group transition-all duration-300 ${
                isDarkMode ? "bg-[#0D0D1F]/60 border-[#C9A84C]/12 hover:border-[#C9A84C]/30" : "bg-white/70 border-[#C9A84C]/18 hover:border-[#C9A84C]/42"
              }`}>
              <div className={`absolute inset-0 bg-gradient-to-br opacity-60 ${cert.color} pointer-events-none`} />
              <div className="absolute top-0 right-0 w-16 h-16 overflow-hidden pointer-events-none">
                <div className="absolute top-0 right-0 w-24 h-24 -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#C9A84C]/20 bg-[#C9A84C]/5" />
              </div>

              <div className="relative z-10">
                <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-xl border flex items-center justify-center mb-3 sm:mb-4 text-xl sm:text-2xl transition-transform duration-300 group-hover:scale-110 ${
                  isDarkMode ? "border-[#C9A84C]/20 bg-[#C9A84C]/8" : "border-[#C9A84C]/25 bg-[#C9A84C]/8"
                }`}>{cert.badge}</div>
                <Award className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#C9A84C]/40 mb-2 sm:mb-3" />
                <h3 className={`font-display font-bold text-sm leading-snug mb-1.5 sm:mb-2 ${isDarkMode ? "text-[#F5F0E8]" : "text-[#1A1A2E]"}`}>{cert.title}</h3>
                <p className={`font-mono text-[8px] sm:text-[9px] uppercase tracking-wider mb-2 sm:mb-3 ${isDarkMode ? "text-[#C9A84C]/60" : "text-[#C9A84C]/70"}`}>{cert.issuer}</p>
                <div className={`inline-flex items-center gap-1.5 font-mono text-[8px] sm:text-[9px] uppercase tracking-wider px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-full border ${
                  isDarkMode ? "border-[#C9A84C]/20 text-[#C9A84C]/60 bg-[#C9A84C]/5" : "border-[#C9A84C]/25 text-[#C9A84C]/75"
                }`}>
                  <div className="w-1 h-1 rounded-full bg-[#C9A84C]" />{cert.year}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ delay: 0.55, duration: 0.6 }} className="mt-8 sm:mt-10 text-center">
          <p className={`font-serif italic text-xs sm:text-sm ${isDarkMode ? "text-[#F5F0E8]/40" : "text-[#1A1A2E]/40"}`}>
            Continuously learning · Constantly growing · Never stopping
          </p>
        </motion.div>
      </div>
    </section>
  );
}
