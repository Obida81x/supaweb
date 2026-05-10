import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { ArrowRight, Github, ExternalLink, Zap } from "lucide-react";
import { useListProjects } from "@workspace/api-client-react";
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

export default function Portfolio() {
  const { t } = useLanguage();
  const [activeCategory, setActiveCategory] = useState("All");
  const { data: projects, isLoading } = useListProjects();

  const categories = [
    { key: "All", label: t.portfolio.all },
    { key: "Business Website", label: t.portfolio.businessWebsite },
    { key: "E-commerce", label: t.portfolio.ecommerce },
    { key: "Dashboard", label: t.portfolio.dashboard },
    { key: "Full Stack App", label: t.portfolio.fullStack },
  ];

  const filtered = activeCategory === "All"
    ? projects ?? []
    : (projects ?? []).filter((p) => p.category === activeCategory);

  return (
    <div className="min-h-screen pt-20">
      <section className="py-24 text-center relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-violet-600/6 rounded-full blur-3xl" />
        </div>
        <div className="relative max-w-3xl mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass text-xs font-medium text-violet-300 mb-6">
            <Zap className="w-3 h-3" /> {t.portfolio.badge}
          </motion.div>
          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="text-5xl sm:text-6xl font-serif font-bold mb-6">
            {t.portfolio.title.split(' ').slice(0, -1).join(' ')}{' '}
            <span className="gradient-text">{t.portfolio.title.split(' ').slice(-1)}</span>
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="text-zinc-400 text-lg">
            {t.portfolio.subtitle}
          </motion.p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-6 mb-12">
        <div className="flex flex-wrap items-center justify-center gap-2">
          {categories.map(({ key, label }) => (
            <button
              key={key}
              onClick={() => setActiveCategory(key)}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                activeCategory === key
                  ? "bg-violet-600 text-white glow-sm"
                  : "glass text-zinc-400 hover:text-zinc-100 hover:border-violet-500/20"
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      <section className="pb-24">
        <div className="max-w-7xl mx-auto px-6">
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="glass rounded-2xl overflow-hidden animate-pulse">
                  <div className="aspect-video bg-white/5" />
                  <div className="p-6 space-y-3">
                    <div className="h-5 bg-white/5 rounded w-2/3" />
                    <div className="h-12 bg-white/5 rounded" />
                  </div>
                </div>
              ))}
            </div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-20 text-zinc-500">{t.portfolio.noProjects}</div>
          ) : (
            <AnimatePresence mode="popLayout">
              <motion.div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" layout>
                {filtered.map((project, i) => (
                  <motion.div
                    key={project.id}
                    layout
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.3, delay: i * 0.05 }}
                    className="glass rounded-2xl overflow-hidden group hover:border-violet-500/30 transition-all duration-300"
                  >
                    <div className="aspect-video bg-gradient-to-br from-violet-900/30 via-indigo-900/20 to-black/40 flex items-center justify-center border-b border-white/5 relative overflow-hidden">
                      <div className="absolute inset-0 opacity-20" style={{ backgroundImage: "radial-gradient(circle at 30% 50%, rgba(167,139,250,0.3), transparent 60%)" }} />
                      <div className="text-center relative">
                        <div className="w-14 h-14 rounded-2xl bg-violet-500/20 border border-violet-500/30 flex items-center justify-center mx-auto mb-3 group-hover:bg-violet-500/30 transition-colors">
                          <Zap className="w-7 h-7 text-violet-400" />
                        </div>
                        <span className="text-xs text-violet-300/60 font-medium uppercase tracking-widest">{project.category}</span>
                      </div>
                    </div>
                    <div className="p-6">
                      <h3 className="text-lg font-semibold text-zinc-100 mb-2">{project.title}</h3>
                      <p className="text-sm text-zinc-500 leading-relaxed mb-4 line-clamp-3">{project.description}</p>
                      <div className="flex flex-wrap gap-1.5 mb-5">
                        {project.technologies.map((tech) => (
                          <span key={tech} className="px-2.5 py-1 rounded-lg bg-violet-500/8 text-violet-300 text-xs font-medium border border-violet-500/15">{tech}</span>
                        ))}
                      </div>
                      <div className="flex items-center gap-4 pt-4 border-t border-white/5">
                        {project.liveUrl && (
                          <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-xs font-medium text-violet-400 hover:text-violet-300 transition-colors">
                            <ExternalLink className="w-3.5 h-3.5" /> {t.portfolio.liveDemo}
                          </a>
                        )}
                        {project.githubUrl && (
                          <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-xs font-medium text-zinc-500 hover:text-zinc-400 transition-colors">
                            <Github className="w-3.5 h-3.5" /> GitHub
                          </a>
                        )}
                        {!project.liveUrl && !project.githubUrl && (
                          <span className="text-xs text-zinc-600">{t.portfolio.noProjects}</span>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </AnimatePresence>
          )}
        </div>
      </section>
    </div>
  );
}
