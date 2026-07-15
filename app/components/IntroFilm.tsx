"use client";

import { motion } from "framer-motion";
import { useEffect, useRef } from "react";

type Props = { onComplete: () => void };

/** A failure to load or autoplay the film always reveals the site. */
export default function IntroFilm({ onComplete }: Props) {
  const video = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const node = video.current;
    if (!node) return;
    const failSafe = window.setTimeout(() => {
      if (node.paused) onComplete();
    }, 2200);
    const attemptPlayback = async () => {
      try { await node.play(); } catch { onComplete(); }
    };
    node.addEventListener("canplay", attemptPlayback, { once: true });
    return () => window.clearTimeout(failSafe);
  }, [onComplete]);

  return (
    <motion.div className="film" initial={{ opacity: 1 }} exit={{ opacity: 0, scale: 1.025 }} transition={{ duration: 1.15, ease: [0.76, 0, 0.24, 1] }}>
      <video ref={video} className="film__video" autoPlay muted playsInline preload="auto" onEnded={onComplete} onError={onComplete} aria-label="Brahmastra Gym introduction film">
        <source src="/intro.MOV" type="video/quicktime" />
      </video>
      <div className="film__grade" />
    </motion.div>
  );
}
