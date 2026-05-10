import { Link } from "wouter";
import { Github, Twitter, Linkedin, Mail, Instagram, Facebook } from "lucide-react";
import { LogoMark } from "@/components/LogoIcon";
import { useLanguage } from "@/lib/i18n";

function TikTokIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.78 1.52V6.76a4.85 4.85 0 0 1-1.01-.07z"/>
    </svg>
  );
}

function KhamsatIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="12" r="10"/><text x="12" y="16" textAnchor="middle" fontSize="10" fill="white" fontWeight="bold">خ</text>
    </svg>
  );
}

const socialLinks = [
  { icon: Github, href: "https://github.com/dashboard", label: "GitHub" },
  { icon: Twitter, href: "https://x.com/supaweb81x", label: "X" },
  { icon: Linkedin, href: "https://www.linkedin.com/in/supa-web-14107040a/", label: "LinkedIn" },
  { icon: Instagram, href: "https://www.instagram.com/supaweb81x/", label: "Instagram" },
  { icon: TikTokIcon, href: "https://www.tiktok.com/@supaweb81x", label: "TikTok" },
  { icon: Facebook, href: "https://facebook.com/supaweb81x", label: "Facebook" },
  { icon: Mail, href: "mailto:supaweb81x@gmail.com", label: "Email" },
];

export default function Footer() {
  const { t, isRTL } = useLanguage();

  const navLinks = [
    { href: "/", label: t.nav.home },
    { href: "/services", label: t.nav.services },
    { href: "/portfolio", label: t.nav.portfolio },
    { href: "/about", label: t.nav.about },
    { href: "/contact", label: t.nav.contact },
  ];

  const serviceLinks = [
    isRTL ? "مواقع الأعمال" : "Business Websites",
    isRTL ? "متاجر إلكترونية" : "E-commerce Stores",
    isRTL ? "لوحات تحكم" : "Admin Dashboards",
    isRTL ? "تطبيقات متكاملة" : "Full Stack Apps",
    isRTL ? "تصميم UI/UX" : "UI/UX Design",
    isRTL ? "تكامل API" : "API Integration",
  ];

  return (
    <footer className="border-t border-white/5 bg-black/20">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="md:col-span-2">
            <Link href="/" className="flex items-center gap-2.5 mb-4">
              <LogoMark size={34} />
              <span className="font-serif font-bold text-xl tracking-tight">
                Supa<span className="gradient-text">Web</span>
              </span>
            </Link>
            <p className="text-zinc-400 text-sm leading-relaxed max-w-xs">
              {t.footer.description}
            </p>
            <div className="flex flex-wrap items-center gap-2 mt-6">
              {socialLinks.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  title={label}
                  className="w-9 h-9 rounded-lg glass flex items-center justify-center text-zinc-400 hover:text-violet-400 hover:border-violet-500/30 transition-colors"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-zinc-100 mb-4">{t.footer.navigation}</h4>
            <ul className="space-y-2">
              {navLinks.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="text-sm text-zinc-400 hover:text-violet-400 transition-colors">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-zinc-100 mb-4">{t.footer.services}</h4>
            <ul className="space-y-2">
              {serviceLinks.map((item) => (
                <li key={item}>
                  <Link href="/services" className="text-sm text-zinc-400 hover:text-violet-400 transition-colors">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-zinc-500">
            &copy; {new Date().getFullYear()} SupaWeb. {t.footer.copyright}
          </p>
          <div className="flex items-center gap-4">
            <a href="#" className="text-xs text-zinc-500 hover:text-zinc-400 transition-colors">{t.footer.privacyPolicy}</a>
            <a href="#" className="text-xs text-zinc-500 hover:text-zinc-400 transition-colors">{t.footer.termsOfService}</a>
            <Link href="/admin" className="text-xs text-zinc-600 hover:text-zinc-500 transition-colors">{t.footer.admin}</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
