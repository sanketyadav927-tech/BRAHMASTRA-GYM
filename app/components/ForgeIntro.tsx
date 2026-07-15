"use client";

import { motion } from "framer-motion";
import { useEffect, useRef } from "react";

type Props = {
  onComplete: () => void;
  onSkip: () => void;
};

export default function ForgeIntro({
  onComplete,
  onSkip,
}: Props) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const startVideo = async () => {
      try {
        video.currentTime = 0;
        video.volume = 1;
        video.muted = false;

        await video.play();
      } catch (err) {
        console.error("Playback blocked:", err);

        // Don't leave a black screen forever if playback fails.
        // Let the user click the video to start it.
      }
    };

    startVideo();

    const handleEnded = () => {
      onComplete();
    };

    const handleClick = async () => {
      try {
        await video.play();
      } catch {}
    };

    video.addEventListener("ended", handleEnded);
    video.addEventListener("click", handleClick);

    return () => {
      video.removeEventListener("ended", handleEnded);
      video.removeEventListener("click", handleClick);
      video.pause();
    };
  }, [onComplete]);

  return (
    <motion.div
      className="fixed inset-0 z-[9999] bg-black"
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
    >
      <video
        ref={videoRef}
        className="absolute inset-0 w-full h-full object-cover"
        autoPlay
        playsInline
        preload="auto"
        controls={false}
      >
        <source src="/intro.mp4" type="video/mp4" />
        <source src="/intro.MOV" type="video/quicktime" />
      </video>

      <div className="absolute inset-0 bg-black/10" />
      <button
  onClick={onSkip}
  className="absolute top-6 right-6 z-[99999] rounded-full border border-white/30 bg-black/40 px-5 py-2 text-white backdrop-blur-md hover:bg-white hover:text-black transition"
>
  Skip →
</button><button
  onClick={onSkip}
  className="absolute top-6 right-6 z-[99999] rounded-full border border-white/30 bg-black/40 px-5 py-2 text-white backdrop-blur-md hover:bg-white hover:text-black transition"
>
  Skip →
</button>
    </motion.div>
  );
}