"use client";
import { useEffect, useRef } from "react";
import "./Lightning.css";

type Props = { hue?: number; speed?: number; intensity?: number; size?: number };
export default function Lightning({ hue = 38, speed = .45, intensity = 1.8, size = 1.2 }: Props) {
  const canvas = useRef<HTMLCanvasElement>(null);
  useEffect(() => { const el = canvas.current; if (!el) return; const ctx = el.getContext("2d"); if (!ctx) return; let frame = 0; let raf = 0; const draw = () => { const { width, height } = el.getBoundingClientRect(); const dpr = Math.min(devicePixelRatio, 2); if (el.width !== width * dpr || el.height !== height * dpr) { el.width = width * dpr; el.height = height * dpr; ctx.scale(dpr, dpr); } ctx.clearRect(0, 0, width, height); const time = frame * .014 * speed; for (let b = 0; b < 3; b++) { ctx.beginPath(); const start = width * (.12 + b * .26); ctx.moveTo(start, -20); for (let y = -20; y < height * .94; y += 18) { const x = start + Math.sin(y * .017 + time * 3 + b) * 76 * size + Math.sin(y * .05 - time) * 25; ctx.lineTo(x, y); } ctx.strokeStyle = `hsla(${hue}, 88%, 62%, ${.08 * intensity})`; ctx.lineWidth = 1.2; ctx.shadowColor = `hsla(${hue}, 100%, 60%, .6)`; ctx.shadowBlur = 22; ctx.stroke(); } ctx.shadowBlur = 0; frame++; raf = requestAnimationFrame(draw); }; draw(); return () => cancelAnimationFrame(raf); }, [hue, speed, intensity, size]);
  return <canvas ref={canvas} className="lightning" aria-hidden="true" />;
}
