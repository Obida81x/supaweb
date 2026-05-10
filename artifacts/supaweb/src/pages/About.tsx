import { useRef } from "react";
import { Link } from "wouter";
import { motion, useInView } from "framer-motion";
import { ArrowRight, CheckCircle2, Code2, Database, Globe, Rocket } from "lucide-react";
import { useLanguage } from "@/lib/i18n";

function FadeIn({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay, ease: "easeOut" }} className={className}>
      {children}
    </motion.div>
  );
}

const techStack = [
  { name: "React", category: "Frontend" }, { name: "Next.js", category: "Frontend" },
  { name: "TypeScript", category: "Language" }, { name: "Tailwind CSS", category: "Styling" },
  { name: "Framer Motion", category: "Animation" }, { name: "Node.js", category: "Backend" },
  { name: "Express", category: "Backend" }, { name: "PostgreSQL", category: "Database" },
  { name: "Drizzle ORM", category: "Database" }, { name: "Stripe", category: "Payments" },
  { name: "Docker", category: "DevOps" }, { name: "AWS", category: "Cloud" },
  { name: "Vercel", category: "Deployment" }, { name: "Figma", category: "Design" },
];

const stepIcons = [Globe, Code2, Database, Rocket];

export default function About() {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen pt-20">
      {/* Header */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/3 left-1/3 w-[500px] h-[500px] bg-violet-600/6 rounded-full blur-3xl" />
        </div>
        <div className="relative max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass text-xs font-medium text-violet-300 mb-6">
                ✦ {t.about.badge}
              </motion.div>
              <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="text-5xl sm:text-6xl font-serif font-bold mb-6">
                {t.about.h1a}<br /><span className="gradient-text">{t.about.h1b}</span>
              </motion.h1>
              <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="text-zinc-400 text-lg leading-relaxed">
                {t.about.intro}
              </motion.p>
            </div>
            <motion.div initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }} className="glass rounded-3xl p-8">
              <h3 className="font-semibold text-zinc-100 mb-4 text-lg">{t.about.missionTitle}</h3>
              <p className="text-zinc-400 text-sm leading-relaxed mb-6">{t.about.missionText}</p>
              <h3 className="font-semibold text-zinc-100 mb-4 text-lg">{t.about.approachTitle}</h3>
              <p className="text-zinc-400 text-sm leading-relaxed">{t.about.approachText}</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-24 bg-black/20">
        <div className="max-w-7xl mx-auto px-6">
          <FadeIn className="text-center mb-16">
            <div className="text-xs font-semibold text-violet-400 tracking-widest uppercase mb-3">{t.about.processTag}</div>
            <h2 className="text-4xl sm:text-5xl font-serif font-bold mb-4">{t.about.processTitle}</h2>
            <p className="text-zinc-400 max-w-xl mx-auto">{t.about.processSubtitle}</p>
          </FadeIn>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {t.about.steps.map((step, i) => {
              const Icon = stepIcons[i];
              return (
                <FadeIn key={step.step} delay={i * 0.1}>
                  <div className="glass rounded-2xl p-6 h-full">
                    <div className="flex items-start gap-3 mb-4">
                      <span className="text-4xl font-serif font-bold text-violet-500/30">{step.step}</span>
                    </div>
                    <div className="w-10 h-10 rounded-xl bg-violet-500/10 border border-violet-500/20 flex items-center justify-center mb-4">
                      <Icon className="w-5 h-5 text-violet-400" />
                    </div>
                    <h3 className="font-semibold text-zinc-100 mb-2">{step.title}</h3>
                    <p className="text-sm text-zinc-500 leading-relaxed">{step.description}</p>
                  </div>
                </FadeIn>
              );
            })}
          </div>
        </div>
      </section>

      {/* Tech Stack */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6">
          <FadeIn className="text-center mb-16">
            <div className="text-xs font-semibold text-violet-400 tracking-widest uppercase mb-3">{t.about.techTag}</div>
            <h2 className="text-4xl sm:text-5xl font-serif font-bold mb-4">{t.about.techTitle}</h2>
            <p className="text-zinc-400 max-w-xl mx-auto">{t.about.techSubtitle}</p>
          </FadeIn>
          <div className="flex flex-wrap justify-center gap-3">
            {techStack.map((tech, i) => (
              <FadeIn key={tech.name} delay={i * 0.03}>
                <div className="glass rounded-xl px-4 py-2.5 hover:border-violet-500/30 hover:bg-violet-500/5 transition-all duration-200 cursor-default">
                  <span className="text-sm font-medium text-zinc-300">{tech.name}</span>
                  <span className="ml-2 text-xs text-zinc-600">{tech.category}</span>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-24 bg-black/20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <FadeIn>
              <div className="text-xs font-semibold text-violet-400 tracking-widest uppercase mb-3">{t.about.whyTag}</div>
              <h2 className="text-4xl sm:text-5xl font-serif font-bold mb-6">{t.about.whyTitle}</h2>
              <p className="text-zinc-400 leading-relaxed mb-8">{t.about.whyText}</p>
              <Link href="/contact" className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-violet-600 hover:bg-violet-500 text-white font-semibold transition-all duration-200 glow-sm">
                {t.about.whyButton} <ArrowRight className="w-4 h-4 rtl:rotate-180" />
              </Link>
            </FadeIn>
            <div className="space-y-4">
              {t.about.whyList.map((item, i) => (
                <FadeIn key={i} delay={i * 0.08}>
                  <div className="glass rounded-xl px-5 py-4 flex items-center gap-3 hover:border-violet-500/20 transition-colors">
                    <CheckCircle2 className="w-5 h-5 text-violet-400 shrink-0" />
                    <span className="text-sm text-zinc-300">{item}</span>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
