import { useEffect, useRef } from 'react';

type BackgroundMode = 'stars' | 'snow';

type AnimatedBackgroundProps = {
  mode?: BackgroundMode;
  density?: number; // particles per 10,000 px^2
  className?: string;
  colors?: string[]; // for snow mode: optional color palette
};

const AnimatedBackground = ({ mode = 'stars', density = 0.12, className = '', colors }: AnimatedBackgroundProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number | null>(null);
  const particlesRef = useRef<Array<any>>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = 0;
    let height = 0;

    const resize = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      const rect = parent.getBoundingClientRect();
      width = Math.ceil(rect.width);
      height = Math.ceil(rect.height);
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.max(1, Math.floor(width * dpr));
      canvas.height = Math.max(1, Math.floor(height * dpr));
      canvas.style.width = width + 'px';
      canvas.style.height = height + 'px';
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      initParticles();
    };

    const random = (min: number, max: number) => Math.random() * (max - min) + min;

    const initParticles = () => {
      const area = width * height;
      const count = Math.max(10, Math.floor((area / 10000) * density));
      particlesRef.current = new Array(count).fill(0).map(() => {
        if (mode === 'snow') {
          const palette = colors && colors.length > 0 ? colors : ['#ffffff'];
          const color = palette[Math.floor(Math.random() * palette.length)];
          return {
            x: random(0, width),
            y: random(-height, height),
            r: random(0.8, 2.2),
            vy: random(0.3, 1.2),
            vx: random(-0.3, 0.3),
            opacity: random(0.4, 0.9),
            color
          };
        }
        // stars
        return {
          x: random(0, width),
          y: random(0, height),
          r: random(0.5, 1.8),
          twinkle: random(0.005, 0.02),
          phase: random(0, Math.PI * 2)
        };
      });
    };

    const renderStars = () => {
      ctx.clearRect(0, 0, width, height);
      ctx.fillStyle = '#fff';
      for (const p of particlesRef.current) {
        p.phase += p.twinkle;
        const alpha = 0.4 + 0.6 * (0.5 + 0.5 * Math.sin(p.phase));
        ctx.globalAlpha = alpha;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;
    };

    const renderSnow = () => {
      ctx.clearRect(0, 0, width, height);
      for (const p of particlesRef.current) {
        p.y += p.vy;
        p.x += p.vx;
        if (p.y - p.r > height) {
          p.y = -p.r;
          p.x = Math.random() * width;
        }
        if (p.x < -5) p.x = width + 5;
        if (p.x > width + 5) p.x = -5;
        ctx.globalAlpha = p.opacity;
        ctx.fillStyle = p.color || '#ffffff';
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;
    };

    const loop = () => {
      if (mode === 'snow') {
        renderSnow();
      } else {
        renderStars();
      }
      rafRef.current = requestAnimationFrame(loop);
    };

    const obs = new ResizeObserver(resize);
    obs.observe(canvas.parentElement as Element);
    resize();
    loop();

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      obs.disconnect();
    };
  }, [mode, density]);

  return (
    <canvas
      ref={canvasRef}
      className={
        `absolute inset-0 -z-10 pointer-events-none ${className}`
      }
      aria-hidden="true"
    />
  );
};

export default AnimatedBackground;


