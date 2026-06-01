import { useState, useRef } from "react";
import { motion } from "motion/react";
import { useInView } from "motion/react";
import { Linkedin, Github, Mail, MapPin, Send, CheckCircle2 } from "lucide-react";

interface Props { isDarkMode: boolean; }

const HRIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0c1.285 0 9.75 4.886 10.392 6 .645 1.115.645 10.885 0 12S13.287 24 12 24C10.714 24 2.25 19.114 1.608 18 .963 16.886.963 7.116 1.608 6 2.25 4.886 10.715 0 12 0zm-1.797 6.586c-.104.045-.104.045-.104 2.717v2.67l-1.32-1.32c-.99-.99-1.373-1.32-1.54-1.32-.286 0-.51.226-.51.52 0 .165.27.463 1.27 1.47l1.27 1.267-1.27 1.267c-1 1.006-1.27 1.305-1.27 1.47 0 .294.224.52.51.52.167 0 .55-.33 1.54-1.32l1.32-1.32v2.67c0 2.672 0 2.672.104 2.717a.457.457 0 00.394 0c.104-.045.104-.045.104-2.718v-2.67l1.32 1.32c.99.99 1.372 1.32 1.54 1.32.286 0 .51-.226.51-.52 0-.165-.27-.463-1.27-1.47L11.334 12l1.27-1.267c1-1.007 1.27-1.305 1.27-1.47 0-.294-.224-.52-.51-.52-.168 0-.55.33-1.54 1.32l-1.32 1.32v-2.67c0-2.672 0-2.672-.104-2.717a.457.457 0 00-.197-.11z"/>
  </svg>
);

const SOCIALS = [
  { icon: Linkedin, label: "LinkedIn",   handle: "sheetal-patel17",   href: "https://www.linkedin.com/in/sheetal-patel17",            color: "text-blue-400",    bg: "bg-blue-400/10 border-blue-400/20 hover:border-blue-400/45" },
  { icon: Github,   label: "GitHub",     handle: "Sheetal-Patel17",   href: "https://github.com/Sheetal-Patel17",                     color: "text-[#F5F0E8]",   bg: "bg-white/5 border-white/12 hover:border-white/28" },
  { icon: HRIcon,   label: "HackerRank", handle: "Sheetal_Patel",     href: "https://www.hackerrank.com/profile/Sheetal_Patel",       color: "text-emerald-400", bg: "bg-emerald-400/10 border-emerald-400/20 hover:border-emerald-400/45" },
  { icon: Mail,     label: "Email",      handle: "patelsheetal670@gmail.com", href: "mailto:patelsheetal670@gmail.com",               color: "text-[#C9A84C]",   bg: "bg-[#C9A84C]/8 border-[#C9A84C]/20 hover:border-[#C9A84C]/50" },
];

export default function Contact({ isDarkMode }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [focused, setFocused] = useState<string | null>(null);

  const inputBase = `w-full px-3.5 sm:px-4 py-3 sm:py-3.5 rounded-xl border font-sans text-sm gold-input transition-all duration-300 ${
    isDarkMode ? "bg-[#0D0D1F]/60 border-[#C9A84C]/15 text-[#F5F0E8] placeholder-[#F5F0E8]/25 focus:bg-[#0D0D1F]/90"
    : "bg-white/80 border-[#C9A84C]/22 text-[#1A1A2E] placeholder-[#1A1A2E]/30 focus:bg-white"
  }`;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    await new Promise(r => setTimeout(r, 1500));
    setSending(false); setSent(true);
    setForm({ name: "", email: "", subject: "", message: "" });
    setTimeout(() => setSent(false), 4000);
  };

  return (
    <section id="contact" className="py-20 sm:py-24 px-5 sm:px-8 md:px-10 lg:px-20 relative" aria-label="Contact">
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[400px] sm:w-[700px] h-[200px] sm:h-[350px] rounded-full opacity-40"
          style={{ background: "radial-gradient(ellipse, rgba(201,168,76,0.07) 0%, transparent 70%)" }} />
      </div>

      <div className="max-w-7xl mx-auto" ref={ref}>
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }} className="mb-10 sm:mb-14">
          <span className="section-tag block mb-3">07 · Contact</span>
          <h2 className={`font-display font-black text-3xl sm:text-4xl md:text-5xl leading-tight ${isDarkMode ? "text-[#F5F0E8]" : "text-[#1A1A2E]"}`}>
            Let's <span className="gold-text">Connect</span>
          </h2>
          <div className="gold-line mt-4 w-24" />
          <p className={`mt-3 sm:mt-4 text-sm max-w-md font-light ${isDarkMode ? "text-[#F5F0E8]/50" : "text-[#1A1A2E]/50"}`}>
            Open to internship opportunities, collaborations, and conversations about tech, AI, and design.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-7 sm:gap-10 lg:gap-14">

          {/* ── Socials ── */}
          <motion.div initial={{ opacity: 0, x: -24 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ delay: 0.15, duration: 0.6 }}
            className="lg:col-span-5 flex flex-col gap-3 sm:gap-4">

            {SOCIALS.map((s, i) => {
              const Icon = s.icon;
              return (
                <motion.a key={s.label} href={s.href}
                  target={s.href.startsWith("mailto") ? undefined : "_blank"} rel="noreferrer"
                  initial={{ opacity: 0, y: 12 }} animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.2 + i * 0.07, duration: 0.5 }}
                  whileHover={{ x: 3 }}
                  className={`flex items-center gap-3 sm:gap-4 p-3 sm:p-4 rounded-2xl border transition-all duration-300 group ${s.bg}`}
                  style={{ backdropFilter: "blur(12px)" }}>
                  <div className={`w-9 h-9 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center shrink-0 ${isDarkMode ? "bg-white/5" : "bg-[#1A1A2E]/4"}`}>
                    <Icon className={`w-4 h-4 sm:w-5 sm:h-5 ${s.color}`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className={`font-display font-semibold text-sm ${isDarkMode ? "text-[#F5F0E8]" : "text-[#1A1A2E]"}`}>{s.label}</p>
                    <p className={`font-mono text-[9px] sm:text-[10px] truncate ${isDarkMode ? "text-[#F5F0E8]/45" : "text-[#1A1A2E]/45"}`}>{s.handle}</p>
                  </div>
                  <div className={`w-5 h-5 sm:w-6 sm:h-6 rounded-full border flex items-center justify-center shrink-0 transition-all duration-300 ${
                    isDarkMode ? "border-[#C9A84C]/20 text-[#C9A84C]/40 group-hover:text-[#C9A84C] group-hover:border-[#C9A84C]/60"
                      : "border-[#C9A84C]/25 text-[#C9A84C]/50 group-hover:text-[#C9A84C]"
                  }`}>
                    <svg className="w-2.5 h-2.5 sm:w-3 sm:h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path d="M7 17L17 7M17 7H7M17 7v10" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                </motion.a>
              );
            })}

            {/* Location */}
            <motion.div initial={{ opacity: 0, y: 12 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.5, duration: 0.5 }}
              className={`flex items-center gap-3 sm:gap-4 p-3 sm:p-4 rounded-2xl border ${isDarkMode ? "border-[#C9A84C]/12 bg-[#0D0D1F]/50" : "border-[#C9A84C]/18 bg-white/60"}`}>
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-rose-500/10 border border-rose-500/20 flex items-center justify-center shrink-0">
                <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-rose-400" />
              </div>
              <div>
                <p className={`font-display font-semibold text-sm ${isDarkMode ? "text-[#F5F0E8]" : "text-[#1A1A2E]"}`}>Location</p>
                <p className={`font-mono text-[9px] sm:text-[10px] ${isDarkMode ? "text-[#F5F0E8]/45" : "text-[#1A1A2E]/45"}`}>Gujarat, India · IST (UTC+5:30)</p>
              </div>
            </motion.div>
          </motion.div>

          {/* ── Form ── */}
          <motion.div initial={{ opacity: 0, x: 24 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ delay: 0.25, duration: 0.6 }}
            className="lg:col-span-7">
            <div className={`p-5 sm:p-7 md:p-8 rounded-3xl border ${isDarkMode ? "bg-[#0D0D1F]/60 border-[#C9A84C]/15" : "bg-white/75 border-[#C9A84C]/20"}`}
              style={{ backdropFilter: "blur(20px)" }}>
              <div className="h-[1.5px] bg-gradient-to-r from-[#C9A84C] via-[#E8C878] to-transparent rounded-full mb-5 sm:mb-7" />

              {sent ? (
                <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center py-10 sm:py-12 gap-4">
                  <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", stiffness: 300, damping: 20, delay: 0.1 }}>
                    <CheckCircle2 className="w-14 h-14 sm:w-16 sm:h-16 text-[#C9A84C]" />
                  </motion.div>
                  <h3 className={`font-display font-bold text-lg sm:text-xl ${isDarkMode ? "text-[#F5F0E8]" : "text-[#1A1A2E]"}`}>Message Sent!</h3>
                  <p className={`text-sm text-center font-light ${isDarkMode ? "text-[#F5F0E8]/55" : "text-[#1A1A2E]/55"}`}>
                    Thank you! I'll get back to you within 24 hours.
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-3 sm:gap-4">
                  {/* Name + Email row — stack on mobile */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                    <div>
                      <label className={`block font-mono text-[8px] sm:text-[9px] uppercase tracking-wider mb-1 sm:mb-1.5 ${focused === "name" ? "text-[#C9A84C]" : isDarkMode ? "text-[#F5F0E8]/40" : "text-[#1A1A2E]/40"}`}>Name</label>
                      <input type="text" required placeholder="Your name" value={form.name}
                        onFocus={() => setFocused("name")} onBlur={() => setFocused(null)}
                        onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                        className={inputBase} />
                    </div>
                    <div>
                      <label className={`block font-mono text-[8px] sm:text-[9px] uppercase tracking-wider mb-1 sm:mb-1.5 ${focused === "email" ? "text-[#C9A84C]" : isDarkMode ? "text-[#F5F0E8]/40" : "text-[#1A1A2E]/40"}`}>Email</label>
                      <input type="email" required placeholder="your@email.com" value={form.email}
                        onFocus={() => setFocused("email")} onBlur={() => setFocused(null)}
                        onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                        className={inputBase} />
                    </div>
                  </div>

                  <div>
                    <label className={`block font-mono text-[8px] sm:text-[9px] uppercase tracking-wider mb-1 sm:mb-1.5 ${focused === "subject" ? "text-[#C9A84C]" : isDarkMode ? "text-[#F5F0E8]/40" : "text-[#1A1A2E]/40"}`}>Subject</label>
                    <input type="text" required placeholder="What's this about?" value={form.subject}
                      onFocus={() => setFocused("subject")} onBlur={() => setFocused(null)}
                      onChange={e => setForm(f => ({ ...f, subject: e.target.value }))}
                      className={inputBase} />
                  </div>

                  <div>
                    <label className={`block font-mono text-[8px] sm:text-[9px] uppercase tracking-wider mb-1 sm:mb-1.5 ${focused === "message" ? "text-[#C9A84C]" : isDarkMode ? "text-[#F5F0E8]/40" : "text-[#1A1A2E]/40"}`}>Message</label>
                    <textarea required rows={4} placeholder="Tell me about your opportunity or project..." value={form.message}
                      onFocus={() => setFocused("message")} onBlur={() => setFocused(null)}
                      onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                      className={`${inputBase} resize-none`} />
                  </div>

                  <motion.button type="submit" disabled={sending}
                    whileHover={!sending ? { scale: 1.02 } : {}} whileTap={!sending ? { scale: 0.98 } : {}}
                    className="btn-gold flex items-center justify-center gap-2 w-full py-3.5 sm:py-4 rounded-xl font-bold text-[10px] sm:text-[11px] uppercase tracking-[0.15em] sm:tracking-[0.18em] cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed">
                    {sending ? (
                      <><div className="w-4 h-4 rounded-full border-2 border-[#0A0A14]/30 border-t-[#0A0A14] animate-spin" />Sending...</>
                    ) : (
                      <>Send Message <Send className="w-3.5 h-3.5 sm:w-4 sm:h-4" /></>
                    )}
                  </motion.button>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
