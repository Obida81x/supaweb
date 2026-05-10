import { Link } from "wouter";
import { Zap, Github, Twitter, Linkedin, Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-white/5 bg-black/20">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="md:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-violet-500/20 border border-violet-500/30 flex items-center justify-center">
                <Zap className="w-4 h-4 text-violet-400" />
              </div>
              <span className="font-serif font-bold text-xl tracking-tight">
                Supa<span className="gradient-text">Web</span>
              </span>
            </Link>
            <p className="text-zinc-400 text-sm leading-relaxed max-w-xs">
              A premium web development agency building exceptional digital products for ambitious businesses.
            </p>
            <div className="flex items-center gap-3 mt-6">
              {[
                { icon: Github, href: "#" },
                { icon: Twitter, href: "#" },
                { icon: Linkedin, href: "#" },
                { icon: Mail, href: "mailto:hello@supaweb.dev" },
              ].map(({ icon: Icon, href }, i) => (
                <a
                  key={i}
                  href={href}
                  className="w-9 h-9 rounded-lg glass flex items-center justify-center text-zinc-400 hover:text-violet-400 hover:border-violet-500/30 transition-colors"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-zinc-100 mb-4">Navigation</h4>
            <ul className="space-y-2">
              {["Home", "Services", "Portfolio", "About", "Contact"].map((item) => (
                <li key={item}>
                  <Link
                    href={`/${item === "Home" ? "" : item.toLowerCase()}`}
                    className="text-sm text-zinc-400 hover:text-violet-400 transition-colors"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-zinc-100 mb-4">Services</h4>
            <ul className="space-y-2">
              {["Business Websites", "E-commerce Stores", "Admin Dashboards", "Full Stack Apps", "UI/UX Design", "API Integration"].map((item) => (
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
            &copy; {new Date().getFullYear()} SupaWeb. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <a href="#" className="text-xs text-zinc-500 hover:text-zinc-400 transition-colors">Privacy Policy</a>
            <a href="#" className="text-xs text-zinc-500 hover:text-zinc-400 transition-colors">Terms of Service</a>
            <Link href="/admin" className="text-xs text-zinc-600 hover:text-zinc-500 transition-colors">Admin</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
