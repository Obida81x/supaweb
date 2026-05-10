import { useRef } from "react";
import { Link } from "wouter";
import { motion, useInView } from "framer-motion";
import { ArrowRight, ChevronRight, Star, Zap, Globe, Code2, LayoutDashboard, ShoppingCart, Palette, Plug } from "lucide-react";
import { useGetPublicStats, useListServices, useListProjects, useListTestimonials } from "@workspace/api-client-react";
import { useLanguage } from "@/lib/i18n";

const iconMap: Record<string, React.ElementType> = {
  Globe, Code2, LayoutDashboard, ShoppingCart, Palette, Plug, Database: Code2, Rocket: Zap,
};

function FadeIn({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay, ease: "easeOut" }} className={className}>
      {children}
    </motion.div>
  );
}

export default function Home() {
  const { t } = useLanguage();
  const { data: stats } = useGetPublicStats();
  const { data: services } = useListServices();
  const { data: projects } = useListProjects({ category: undefined }, { query: { select: (data) => data.filter((p) => p.featured).slice(0, 3) } });
  const { data: testimonials } = useListTestimonials();

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-violet-600/10 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-indigo-600/8 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1s" }} />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-violet-500/4 rounded-full blur-3xl" />
        </div>
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: "linear-gradient(rgba(167,139,250,.5) 1px, transparent 1px), linear-gradient(90deg, rgba(167,139,250,.5) 1px, transparent 1px)", backgroundSize: "60px 60px" }} />

        <div className="relative max-w-7xl mx-auto px-6 py-32 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass text-xs font-medium text-violet-300 mb-8">
            <Zap className="w-3 h-3" />
            {t.home.badge}
          </motion.div>

          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.1 }} className="text-5xl sm:text-7xl lg:text-8xl font-serif font-bold tracking-tight leading-none mb-6">
            {t.home.h1a}{" "}
            <span className="gradient-text">{t.home.h1b}</span>
            <br />
            {t.home.h1c}
          </motion.h1>

          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }} className="text-lg sm:text-xl text-zinc-400 max-w-2xl mx-auto mb-10 leading-relaxed">
            {t.home.subtitle}
          </motion.p>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.3 }} className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/portfolio" className="group flex items-center gap-2 px-6 py-3.5 rounded-xl bg-white/5 border border-white/10 text-white font-semibold hover:bg-white/10 hover:border-white/20 transition-all duration-200">
              {t.home.viewPortfolio}
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform rtl:rotate-180" />
            </Link>
            <Link href="/contact" className="flex items-center gap-2 px-6 py-3.5 rounded-xl bg-violet-600 hover:bg-violet-500 text-white font-semibold transition-all duration-200 glow-sm">
              {t.home.startProject}
              <ChevronRight className="w-4 h-4 rtl:rotate-180" />
            </Link>
          </motion.div>
        </div>

        <motion.div className="absolute bottom-8 left-1/2 -translate-x-1/2" animate={{ y: [0, 8, 0] }} transition={{ duration: 2, repeat: Infinity }}>
          <div className="w-5 h-8 rounded-full border border-white/20 flex items-start justify-center pt-1.5">
            <div className="w-1 h-2 rounded-full bg-violet-400" />
          </div>
        </motion.div>
      </section>

      {/* Stats */}
      {stats && (
        <section className="py-20 border-y border-white/5">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                { value: `${stats.projectsCount}+`, label: t.home.statsProjects },
                { value: `${stats.servicesCount}+`, label: t.home.statsServices },
                { value: `${stats.testimonialsCount}+`, label: t.home.statsClients },
                { value: `${stats.yearsActive}+`, label: t.home.statsYears },
              ].map((stat, i) => (
                <FadeIn key={stat.label} delay={i * 0.1} className="text-center">
                  <div className="text-4xl font-serif font-bold gradient-text mb-2">{stat.value}</div>
                  <div className="text-sm text-zinc-500">{stat.label}</div>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Services Preview */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6">
          <FadeIn className="text-center mb-16">
            <div className="text-xs font-semibold text-violet-400 tracking-widest uppercase mb-3">{t.home.servicesTag}</div>
            <h2 className="text-4xl sm:text-5xl font-serif font-bold mb-4">{t.home.servicesTitle}</h2>
            <p className="text-zinc-400 max-w-xl mx-auto">{t.home.servicesSubtitle}</p>
          </FadeIn>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {services?.slice(0, 4).map((service, i) => {
              const Icon = iconMap[service.icon] ?? Zap;
              return (
                <FadeIn key={service.id} delay={i * 0.08}>
                  <div className="glass rounded-2xl p-6 h-full hover:border-violet-500/30 hover:bg-violet-500/5 transition-all duration-300 group">
                    <div className="w-10 h-10 rounded-xl bg-violet-500/10 border border-violet-500/20 flex items-center justify-center mb-4 group-hover:bg-violet-500/20 transition-colors">
                      <Icon className="w-5 h-5 text-violet-400" />
                    </div>
                    <h3 className="font-semibold text-zinc-100 mb-2">{service.title}</h3>
                    <p className="text-sm text-zinc-500 leading-relaxed">{service.description}</p>
                  </div>
                </FadeIn>
              );
            })}
          </div>
          <FadeIn className="text-center mt-10">
            <Link href="/services" className="inline-flex items-center gap-2 text-violet-400 hover:text-violet-300 font-medium transition-colors">
              {t.home.viewAllServices} <ArrowRight className="w-4 h-4 rtl:rotate-180" />
            </Link>
          </FadeIn>
        </div>
      </section>

      {/* Featured Projects */}
      {projects && projects.length > 0 && (
        <section className="py-24 bg-black/20">
          <div className="max-w-7xl mx-auto px-6">
            <FadeIn className="text-center mb-16">
              <div className="text-xs font-semibold text-violet-400 tracking-widest uppercase mb-3">{t.home.projectsTag}</div>
              <h2 className="text-4xl sm:text-5xl font-serif font-bold mb-4">{t.home.projectsTitle}</h2>
              <p className="text-zinc-400 max-w-xl mx-auto">{t.home.projectsSubtitle}</p>
            </FadeIn>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {projects.map((project, i) => (
                <FadeIn key={project.id} delay={i * 0.1}>
                  <div className="glass rounded-2xl overflow-hidden group hover:border-violet-500/30 transition-all duration-300">
                    <div className="aspect-video bg-gradient-to-br from-violet-900/30 to-indigo-900/20 flex items-center justify-center border-b border-white/5">
                      <div className="text-center px-6">
                        <div className="w-12 h-12 rounded-xl bg-violet-500/20 flex items-center justify-center mx-auto mb-3">
                          <Zap className="w-6 h-6 text-violet-400" />
                        </div>
                        <span className="text-xs text-zinc-500 font-medium">{project.category}</span>
                      </div>
                    </div>
                    <div className="p-6">
                      <h3 className="font-semibold text-zinc-100 mb-2">{project.title}</h3>
                      <p className="text-sm text-zinc-500 leading-relaxed mb-4 line-clamp-2">{project.description}</p>
                      <div className="flex flex-wrap gap-1.5 mb-4">
                        {project.technologies.slice(0, 3).map((tech) => (
                          <span key={tech} className="px-2 py-0.5 rounded-md bg-violet-500/10 text-violet-300 text-xs font-medium border border-violet-500/20">{tech}</span>
                        ))}
                      </div>
                      <div className="flex items-center gap-3">
                        {project.liveUrl && (
                          <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="text-xs text-violet-400 hover:text-violet-300 font-medium flex items-center gap-1 transition-colors">
                            {t.home.liveDemo} <ArrowRight className="w-3 h-3 rtl:rotate-180" />
                          </a>
                        )}
                        {project.githubUrl && (
                          <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="text-xs text-zinc-500 hover:text-zinc-400 transition-colors">{t.home.github}</a>
                        )}
                      </div>
                    </div>
                  </div>
                </FadeIn>
              ))}
            </div>
            <FadeIn className="text-center mt-10">
              <Link href="/portfolio" className="inline-flex items-center gap-2 text-violet-400 hover:text-violet-300 font-medium transition-colors">
                {t.home.seeAllProjects} <ArrowRight className="w-4 h-4 rtl:rotate-180" />
              </Link>
            </FadeIn>
          </div>
        </section>
      )}

      {/* Testimonials */}
      {testimonials && testimonials.length > 0 && (
        <section className="py-24">
          <div className="max-w-7xl mx-auto px-6">
            <FadeIn className="text-center mb-16">
              <div className="text-xs font-semibold text-violet-400 tracking-widest uppercase mb-3">{t.home.testimonialsTag}</div>
              <h2 className="text-4xl sm:text-5xl font-serif font-bold mb-4">{t.home.testimonialsTitle}</h2>
            </FadeIn>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {testimonials.slice(0, 4).map((testimonial, i) => (
                <FadeIn key={testimonial.id} delay={i * 0.1}>
                  <div className="glass rounded-2xl p-6 hover:border-violet-500/20 transition-all duration-300">
                    <div className="flex items-center gap-1 mb-4">
                      {Array.from({ length: testimonial.rating }).map((_, j) => (
                        <Star key={j} className="w-4 h-4 fill-violet-400 text-violet-400" />
                      ))}
                    </div>
                    <p className="text-zinc-300 text-sm leading-relaxed mb-6 italic">"{testimonial.content}"</p>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-violet-600 to-indigo-600 flex items-center justify-center text-white text-sm font-bold">
                        {testimonial.name.charAt(0)}
                      </div>
                      <div>
                        <div className="text-sm font-semibold text-zinc-100">{testimonial.name}</div>
                        <div className="text-xs text-zinc-500">{testimonial.role}, {testimonial.company}</div>
                      </div>
                    </div>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="py-24">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <FadeIn>
            <div className="glass rounded-3xl p-12 glow">
              <div className="text-xs font-semibold text-violet-400 tracking-widest uppercase mb-4">{t.home.ctaTag}</div>
              <h2 className="text-4xl sm:text-5xl font-serif font-bold mb-4">
                {t.home.ctaTitle}
                <span className="gradient-text"> {t.home.ctaHighlight}</span>
              </h2>
              <p className="text-zinc-400 mb-8 max-w-xl mx-auto">{t.home.ctaSubtitle}</p>
              <Link href="/contact" className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-violet-600 hover:bg-violet-500 text-white font-semibold transition-all duration-200 glow-sm">
                {t.home.ctaButton}
                <ArrowRight className="w-5 h-5 rtl:rotate-180" />
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>
    </div>
  );
}
