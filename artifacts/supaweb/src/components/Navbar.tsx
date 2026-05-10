import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { LogoMark } from "@/components/LogoIcon";
import { useLanguage } from "@/lib/i18n";

export default function Navbar() {
  const [location] = useLocation();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { t, lang, toggleLang, isRTL } = useLanguage();

  const navLinks = [
    { href: "/", label: t.nav.home },
    { href: "/services", label: t.nav.services },
    { href: "/portfolio", label: t.nav.portfolio },
    { href: "/about", label: t.nav.about },
    { href: "/contact", label: t.nav.contact },
  ];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [location]);

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "glass border-b border-white/5 shadow-lg shadow-black/20" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2.5 group shrink-0">
          <LogoMark size={34} />
          <span className="font-serif font-bold text-xl tracking-tight">
            Supa<span className="gradient-text">Web</span>
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                location === link.href
                  ? "text-violet-400 bg-violet-500/10"
                  : "text-zinc-400 hover:text-zinc-100 hover:bg-white/5"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-3">
          {/* Language toggle */}
          <button
            onClick={toggleLang}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg glass text-sm font-semibold text-zinc-300 hover:text-violet-400 hover:border-violet-500/30 transition-all duration-200"
            title={lang === "en" ? "Switch to Arabic" : "التحويل إلى الإنجليزية"}
          >
            <span className="text-base leading-none">{lang === "en" ? "🇸🇦" : "🇬🇧"}</span>
            <span className="text-xs">{lang === "en" ? "AR" : "EN"}</span>
          </button>
          <Link
            href="/contact"
            className="px-4 py-2 rounded-lg bg-violet-600 hover:bg-violet-500 text-white text-sm font-semibold transition-all duration-200 glow-sm"
          >
            {t.nav.startProject}
          </Link>
        </div>

        <div className="md:hidden flex items-center gap-2">
          <button
            onClick={toggleLang}
            className="p-2 rounded-lg glass text-sm font-semibold text-zinc-300 hover:text-violet-400 transition-all"
          >
            {lang === "en" ? "AR" : "EN"}
          </button>
          <button
            className="p-2 rounded-lg text-zinc-400 hover:text-zinc-100 hover:bg-white/5 transition-colors"
            onClick={() => setOpen(!open)}
          >
            {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden glass border-t border-white/5"
          >
            <div className="px-6 py-4 flex flex-col gap-2">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                    location === link.href
                      ? "text-violet-400 bg-violet-500/10"
                      : "text-zinc-400 hover:text-zinc-100 hover:bg-white/5"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <Link
                href="/contact"
                className="mt-2 px-4 py-3 rounded-lg bg-violet-600 hover:bg-violet-500 text-white text-sm font-semibold text-center transition-colors"
              >
                {t.nav.startProject}
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
