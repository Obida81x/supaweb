import { Link } from "wouter";
import { Github, Twitter, Linkedin, Mail, Instagram, Facebook, Youtube, Globe, ExternalLink } from "lucide-react";
import { LogoMark } from "@/components/LogoIcon";
import { useLanguage } from "@/lib/i18n";
import { useGetSocialLinks } from "@workspace/api-client-react";

function TikTokIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.78 1.52V6.76a4.85 4.85 0 0 1-1.01-.07z"/>
    </svg>
  );
}

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
      <path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.554 4.118 1.528 5.852L0 24l6.352-1.508A11.934 11.934 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.953 0-3.78-.538-5.34-1.469l-.382-.228-3.77.894.952-3.67-.249-.395A9.932 9.932 0 0 1 2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/>
    </svg>
  );
}

function TelegramIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.447 1.394c-.16.16-.295.295-.605.295l.213-3.053 5.56-5.023c.242-.213-.054-.333-.373-.12L7.16 13.67l-2.965-.924c-.643-.204-.657-.643.136-.953l11.57-4.461c.537-.194 1.006.131.993.889z"/>
    </svg>
  );
}

const ICON_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
  Twitter, Linkedin, Github, Instagram, Facebook, Mail, Youtube, Globe,
  TikTok: TikTokIcon,
  WhatsApp: WhatsAppIcon,
  Telegram: TelegramIcon,
  Link: ExternalLink,
};

export default function Footer() {
  const { t, isRTL } = useLanguage();
  const { data: socialLinks } = useGetSocialLinks();

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
              {Array.isArray(socialLinks) && socialLinks.map((link) => {
                const Icon = ICON_MAP[link.icon] ?? ExternalLink;
                return (
                  <a
                    key={link.id}
                    href={link.url}
                    target={link.url.startsWith("mailto:") ? undefined : "_blank"}
                    rel="noopener noreferrer"
                    title={link.label}
                    className="w-9 h-9 rounded-lg glass flex items-center justify-center text-zinc-400 hover:text-violet-400 hover:border-violet-500/30 transition-colors"
                  >
                    <Icon className="w-4 h-4" />
                  </a>
                );
              })}
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
