import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";

interface Props { isDarkMode: boolean; }

// ─── Magnetic Gold Cursor ──────────────────────────────────────────────────────
const GoldCursor = () => {
  const mx = useMotionValue(-200);
  const my = useMotionValue(-200);
  const cx = useSpring(mx, { stiffness: 700, damping: 38, mass: 0.5 });
  const cy = useSpring(my, { stiffness: 700, damping: 38, mass: 0.5 });
  const rx = useSpring(mx, { stiffness: 220, damping: 28, mass: 0.8 });
  const ry = useSpring(my, { stiffness: 220, damping: 28, mass: 0.8 });
  const [hovered, setHovered] = useState(false);
  const [clicked, setClicked] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const move = (e: MouseEvent) => { mx.set(e.clientX); my.set(e.clientY); if (!visible) setVisible(true); };
    const over = (e: MouseEvent) => {
      const t = e.target as HTMLElement;
      setHovered(!!(t.tagName === "A" || t.tagName === "BUTTON" || t.closest("a") || t.closest("button")));
    };
    const down = () => setClicked(true);
    const up = () => setClicked(false);
    const leave = () => setVisible(false);
    const enter = () => setVisible(true);
    window.addEventListener("mousemove", move, { passive: true });
    window.addEventListener("mouseover", over, { passive: true });
    window.addEventListener("mousedown", down);
    window.addEventListener("mouseup", up);
    document.addEventListener("mouseleave", leave);
    document.addEventListener("mouseenter", enter);
    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseover", over);
      window.removeEventListener("mousedown", down);
      window.removeEventListener("mouseup", up);
      document.removeEventListener("mouseleave", leave);
      document.removeEventListener("mouseenter", enter);
    };
  }, [mx, my, visible]);

  return (
    <>
      {/* Trailing ring */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999]"
        style={{
          x: rx, y: ry,
          translateX: "-50%", translateY: "-50%",
          width: hovered ? 48 : 34, height: hovered ? 48 : 34,
          borderRadius: "50%",
          border: "1.5px solid rgba(201,168,76,0.55)",
          opacity: visible ? (clicked ? 0.5 : 0.7) : 0,
          scale: clicked ? 0.75 : 1,
          transition: "width 0.25s ease, height 0.25s ease, opacity 0.2s ease, scale 0.15s ease",
        }}
      />
      {/* Center dot */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999]"
        style={{
          x: cx, y: cy,
          translateX: "-50%", translateY: "-50%",
          width: clicked ? 5 : hovered ? 7 : 9,
          height: clicked ? 5 : hovered ? 7 : 9,
          borderRadius: "50%",
          background: "radial-gradient(circle, #E8C878 0%, #C9A84C 100%)",
          boxShadow: "0 0 8px rgba(201,168,76,0.8)",
          opacity: visible ? 1 : 0,
          transition: "width 0.2s ease, height 0.2s ease, opacity 0.2s ease",
        }}
      />
    </>
  );
};

// ─── Animated Background Canvas ───────────────────────────────────────────────
const BackgroundCanvas = ({ isDarkMode }: Props) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let W = (canvas.width = window.innerWidth);
    let H = (canvas.height = window.innerHeight);
    const mouse = { x: W / 2, y: H / 2 };

    interface Particle {
      x: number; y: number;
      vx: number; vy: number;
      size: number;
      alpha: number; baseAlpha: number;
      gold: boolean;
    }

    const onMouseMove = (e: MouseEvent) => { mouse.x = e.clientX; mouse.y = e.clientY; };
    window.addEventListener("mousemove", onMouseMove, { passive: true });

    const createParticles = (): Particle[] => {
      const count = Math.min(80, Math.floor((W * H) / 20000));
      return Array.from({ length: count }, () => ({
        x: Math.random() * W,
        y: Math.random() * H,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        size: Math.random() * 1.5 + 0.4,
        alpha: 0,
        baseAlpha: Math.random() * 0.3 + 0.05,
        gold: Math.random() < 0.3,
      }));
    };

    let particles = createParticles();

    const onResize = () => {
      W = canvas.width = window.innerWidth;
      H = canvas.height = window.innerHeight;
      particles = createParticles();
    };
    window.addEventListener("resize", onResize);

    const render = () => {
      ctx.clearRect(0, 0, W, H);

      // Base fill
      ctx.fillStyle = isDarkMode ? "#0A0A14" : "#FFFDF7";
      ctx.fillRect(0, 0, W, H);

      // Ambient glow — center spotlight
      const cx2 = W * 0.5, cy2 = H * 0.35;
      const g1 = ctx.createRadialGradient(cx2, cy2, 0, cx2, cy2, W * 0.55);
      if (isDarkMode) {
        g1.addColorStop(0, "rgba(201,168,76,0.04)");
        g1.addColorStop(0.5, "rgba(13,13,31,0)");
      } else {
        g1.addColorStop(0, "rgba(201,168,76,0.06)");
        g1.addColorStop(1, "rgba(255,253,247,0)");
      }
      ctx.fillStyle = g1;
      ctx.fillRect(0, 0, W, H);

      // Mouse spotlight
      const gm = ctx.createRadialGradient(mouse.x, mouse.y, 0, mouse.x, mouse.y, 200);
      gm.addColorStop(0, isDarkMode ? "rgba(201,168,76,0.035)" : "rgba(201,168,76,0.04)");
      gm.addColorStop(1, "rgba(0,0,0,0)");
      ctx.fillStyle = gm;
      ctx.fillRect(0, 0, W, H);

      // Dot grid
      const step = 40;
      const dotAlpha = isDarkMode ? 0.018 : 0.03;
      for (let x = step / 2; x < W; x += step) {
        for (let y = step / 2; y < H; y += step) {
          const dist = Math.hypot(x - mouse.x, y - mouse.y);
          const extra = Math.max(0, (1 - dist / 180) * 0.06);
          ctx.beginPath();
          ctx.arc(x, y, 0.6, 0, Math.PI * 2);
          ctx.fillStyle = isDarkMode
            ? `rgba(201,168,76,${dotAlpha + extra})`
            : `rgba(26,26,46,${dotAlpha + extra})`;
          ctx.fill();
        }
      }

      // Particles
      particles.forEach(p => {
        const dist = Math.hypot(p.x - mouse.x, p.y - mouse.y);
        if (dist < 130 && dist > 0) {
          const push = ((130 - dist) / 130) * 16;
          p.alpha = Math.min(1, p.baseAlpha + 0.4);
          p.x += (p.x - mouse.x) / dist * push * 0.05;
          p.y += (p.y - mouse.y) / dist * push * 0.05;
        } else {
          p.alpha += (p.baseAlpha - p.alpha) * 0.04;
        }

        p.x += p.vx; p.y += p.vy;
        if (p.x < 0) p.x = W;
        if (p.x > W) p.x = 0;
        if (p.y < 0) p.y = H;
        if (p.y > H) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        if (p.gold) {
          ctx.fillStyle = `rgba(201,168,76,${p.alpha})`;
        } else {
          ctx.fillStyle = isDarkMode
            ? `rgba(245,240,232,${p.alpha * 0.5})`
            : `rgba(26,26,46,${p.alpha * 0.4})`;
        }
        ctx.fill();
      });

      animId = requestAnimationFrame(render);
    };

    render();
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("resize", onResize);
    };
  }, [isDarkMode]);

  return (
    <div className="fixed inset-0 -z-10 pointer-events-none">
      <canvas ref={canvasRef} className="w-full h-full" aria-hidden="true" />
    </div>
  );
};

// ─── Scroll Progress Bar ──────────────────────────────────────────────────────
const ScrollProgressBar = () => {
  const [pct, setPct] = useState(0);
  useEffect(() => {
    const onScroll = () => {
      const total = document.documentElement.scrollHeight - window.innerHeight;
      if (total > 0) setPct((window.scrollY / total) * 100);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <div className="fixed top-0 left-0 w-full h-[2px] z-[9000] pointer-events-none">
      <div className="h-full scroll-progress transition-[width] duration-100" style={{ width: `${pct}%` }} />
    </div>
  );
};

// ─── Default export (combines all effects) ────────────────────────────────────
export default function VisualEffects({ isDarkMode }: Props) {
  return (
    <>
      <GoldCursor />
      <BackgroundCanvas isDarkMode={isDarkMode} />
      <ScrollProgressBar />
    </>
  );
}