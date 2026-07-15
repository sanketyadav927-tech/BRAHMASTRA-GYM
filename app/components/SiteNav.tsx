"use client";

import Link from "next/link";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { useState } from "react";

const navItems = [["Home", "/"], ["About", "/about"], ["Gallery", "/gallery"], ["Contact", "/contact"]] as const;

export default function SiteNav() {
  const { scrollY } = useScroll();
  const [raised, setRaised] = useState(false);
  const [open, setOpen] = useState(false);
  useMotionValueEvent(scrollY, "change", value => setRaised(value > 24));
  return <motion.header className={`site-nav ${raised ? "site-nav--raised" : ""}`} initial={{ y: -22, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: .12, duration: .65 }}>
    <Link className="monogram" href="/" aria-label="Brahmastra Gym home">B<span>✦</span>G</Link>
    <nav className="site-nav__links" aria-label="Primary navigation">{navItems.map(([label, href]) => <Link key={href} href={href}>{label}</Link>)}<Link className="nav-cta" href="/contact">Book a visit <span>↗</span></Link></nav>
    <button className="nav-toggle" aria-label="Open navigation" aria-expanded={open} onClick={() => setOpen(!open)}><i /><i /></button>
    {open && <motion.nav className="mobile-menu" initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>{navItems.map(([label, href]) => <Link key={href} href={href} onClick={() => setOpen(false)}>{label}</Link>)}<Link href="/contact">Book a visit ↗</Link></motion.nav>}
  </motion.header>;
}
