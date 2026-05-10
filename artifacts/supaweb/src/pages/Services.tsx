import { useRef } from "react";
import { Link } from "wouter";
import { motion, useInView } from "framer-motion";
import { ArrowRight, Check, Globe, Code2, LayoutDashboard, ShoppingCart, Palette, Plug, Database, Rocket, Zap } from "lucide-react";
import { useListServices } from "@workspace/api-client-react";

const iconMap: Record<string, React.ElementType> = {
  Globe, Code2, LayoutDashboard, ShoppingCart, Palette, Plug, Database, Rocket, Zap,
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

export default function Services() {
  const { data: services, isLoading } = useListServices();

  return (
    <div className="min-h-screen pt-20">
      {/* Header */}
      <section className="py-24 text-center relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-violet-600/6 rounded-full blur-3xl" />
        </div>
        <div className="relative max-w-3xl mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass text-xs font-medium text-violet-300 mb-6">
            <Zap className="w-3 h-3" /> What We Offer
          </motion.div>
          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.1 }} className="text-5xl sm:text-6xl font-serif font-bold mb-6">
            Our <span className="gradient-text">Services</span>
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }} className="text-zinc-400 text-lg leading-relaxed">
            From sleek business websites to complex full-stack applications — we have the expertise to bring your digital vision to life.
          </motion.p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="pb-24">
        <div className="max-w-7xl mx-auto px-6">
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="glass rounded-2xl p-8 animate-pulse">
                  <div className="w-12 h-12 rounded-xl bg-white/5 mb-5" />
                  <div className="h-5 bg-white/5 rounded mb-3 w-2/3" />
                  <div className="h-16 bg-white/5 rounded mb-5" />
                  <div className="space-y-2">
                    {[1, 2, 3].map((j) => <div key={j} className="h-4 bg-white/5 rounded w-3/4" />)}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {services?.map((service, i) => {
                const Icon = iconMap[service.icon] ?? Zap;
                return (
                  <FadeIn key={service.id} delay={i * 0.07}>
                    <div className="glass rounded-2xl p-8 h-full hover:border-violet-500/30 hover:bg-violet-500/5 transition-all duration-300 group">
                      <div className="w-12 h-12 rounded-xl bg-violet-500/10 border border-violet-500/20 flex items-center justify-center mb-5 group-hover:bg-violet-500/20 group-hover:border-violet-500/40 transition-all">
                        <Icon className="w-6 h-6 text-violet-400" />
                      </div>
                      <h3 className="text-xl font-semibold text-zinc-100 mb-3">{service.title}</h3>
                      <p className="text-zinc-500 text-sm leading-relaxed mb-6">{service.description}</p>
                      {service.features && service.features.length > 0 && (
                        <ul className="space-y-2">
                          {service.features.map((feature) => (
                            <li key={feature} className="flex items-center gap-2 text-sm text-zinc-400">
                              <Check className="w-4 h-4 text-violet-400 shrink-0" />
                              {feature}
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </FadeIn>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="pb-24">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <FadeIn>
            <div className="glass rounded-3xl p-12 glow">
              <h2 className="text-3xl sm:text-4xl font-serif font-bold mb-4">
                Ready to get started?
              </h2>
              <p className="text-zinc-400 mb-8">Let's discuss your project and find the perfect service for your needs.</p>
              <Link href="/contact" className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-violet-600 hover:bg-violet-500 text-white font-semibold transition-all duration-200 glow-sm">
                Start a Conversation <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>
    </div>
  );
}
