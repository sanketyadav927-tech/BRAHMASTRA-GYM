"use client";

import { AnimatePresence, motion, useScroll, useTransform } from "framer-motion";
import { gsap } from "gsap";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import ForgeIntro from "./ForgeIntro";
import Lightning from "./Lightning";
import SideRays from "./SideRays";
import SiteNav from "./SiteNav";

const shots = [
  [
    "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=1600&q=85",
    "A high-end gym floor",
    "The floor",
  ],
  [
    "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?auto=format&fit=crop&w=1000&q=85",
    "Athlete preparing to train",
    "The ritual",
  ],
  [
    "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=1000&q=85",
    "Strength training equipment",
    "The discipline",
  ],
] as const;

const enter = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0 },
};

export default function HomeExperience() {
  const [entered, setEntered] = useState(false);
  const [introComplete, setIntroComplete] = useState(false);

  const wrap = useRef<HTMLDivElement>(null);

  const { scrollY } = useScroll();
  const backdropY = useTransform(scrollY, [0, 800], [0, 100]);

  useEffect(() => {
    if (!introComplete) return;

    const context = gsap.context(() => {
      gsap.fromTo(
        ".hero-reveal",
        { yPercent: 110, rotate: 2 },
        {
          yPercent: 0,
          rotate: 0,
          stagger: 0.1,
          duration: 1.25,
          ease: "power4.out",
          delay: 0.12,
        }
      );
    }, wrap);

    return () => context.revert();
  }, [introComplete]);

  return (
    <div ref={wrap} className="experience">
      <AnimatePresence>
        {!entered ? (
          <motion.div
            key="enter"
            className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-black"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <h1 className="text-6xl md:text-8xl font-black tracking-[0.35em] text-white">
              BRAHMASTRA
            </h1>

            <p className="mt-6 text-gray-400">
              Premium Fitness • Dehradun
            </p>

            <button
              onClick={() => setEntered(true)}
              className="mt-10 rounded-full bg-amber-500 px-10 py-4 text-lg font-bold text-black transition-all hover:scale-105"
            >
              ENTER EXPERIENCE
            </button>
          </motion.div>
        ) : (
          !introComplete && (
            <ForgeIntro onComplete={() => setIntroComplete(true)} />
          )
        )}
      </AnimatePresence>

      <motion.div
        className="site-content"
        initial={{ opacity: 0 }}
        animate={{ opacity: introComplete ? 1 : 0 }}
        transition={{ duration: 0.65 }}
        aria-hidden={!introComplete}
      >
        <SiteNav />

        <main>
          <section className="hero-home">
            <motion.div
              className="hero-home__image"
              style={{ y: backdropY }}
            />

            <Lightning
              hue={39}
              speed={0.38}
              intensity={1.25}
              size={1.1}
            />

            <SideRays />

            <div className="hero-home__shade" />

            <div className="hero-home__content">
              <p className="kicker">Brahmastra Gym · Dehradun</p>

              <h1>
                <span>
                  <b className="hero-reveal">BUILT FOR</b>
                </span>

                <span>
                  <b className="hero-reveal hero-reveal--gold">
                    THE RELENTLESS.
                  </b>
                </span>
              </h1>

              <div className="hero-home__lower">
                <p>
                  Not a room full of equipment.
                  <br />
                  A place for the work that changes you.
                </p>

                <div className="actions">
                  <Link
                    className="button button--gold"
                    href="/about"
                  >
                    Discover Brahmastra ↗
                  </Link>

                  <Link
                    className="text-link"
                    href="/contact"
                  >
                    Start your ritual →
                  </Link>
                </div>
              </div>
            </div>

            <div className="hero-home__meta">
              <span>30°19'N / 78°02'E</span>
              <span>
                Scroll to enter <i />
              </span>
            </div>
          </section>

          <section className="manifesto">
            <motion.p
              className="kicker"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={enter}
            >
              A higher standard
            </motion.p>

            <motion.h2
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ delay: 0.1, duration: 0.8 }}
              variants={enter}
            >
              A sanctuary for <em>ambition.</em>
              <br />
              Made in the foothills.
            </motion.h2>
          </section>
        </main>
      </motion.div>
    </div>
  );
}