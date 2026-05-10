import { useRef } from "react";
import { Link } from "wouter";
import { motion, useInView } from "framer-motion";
import { ArrowRight, CheckCircle2, Zap, Code2, Database, Globe, Rocket } from "lucide-react";

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

const processSteps = [
  { step: "01", title: "Discovery", description: "We dive deep into your business goals, target audience, and technical requirements to build the right foundation.", icon: Globe },
  { step: "02", title: "Design", description: "Our design team creates high-fidelity mockups that balance aesthetics with user experience and conversion goals.", icon: Code2 },
  { step: "03", title: "Development", description: "We build with clean, maintainable code using modern frameworks and best practices for performance and scalability.", icon: Database },
  { step: "04", title: "Launch", description: "Rigorous testing, deployment setup, and post-launch monitoring to ensure everything runs smoothly from day one.", icon: Rocket },
];

const whyUs = [
  "End-to-end delivery — design, code, deploy, support",
  "Modern tech stack with proven frameworks",
  "Performance-first approach with Core Web Vitals focus",
  "Clean, documented code you can maintain and extend",
  "Direct communication with senior developers",
  "On-time delivery with transparent project tracking",
];

export default function About() {
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
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass text-xs font-medium text-violet-300 mb-6">
                <Zap className="w-3 h-3" /> About SupaWeb
              </motion.div>
              <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.1 }} className="text-5xl sm:text-6xl font-serif font-bold mb-6">
                Built for<br /><span className="gradient-text">Results</span>
              </motion.h1>
              <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }} className="text-zinc-400 text-lg leading-relaxed">
                SupaWeb is a premium web development agency founded on a simple belief: great digital products change businesses. We combine deep technical expertise with a relentless focus on outcomes — not just deliverables.
              </motion.p>
            </div>

            <motion.div initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7, delay: 0.2 }} className="glass rounded-3xl p-8">
              <h3 className="font-semibold text-zinc-100 mb-4 text-lg">Our Mission</h3>
              <p className="text-zinc-400 text-sm leading-relaxed mb-6">
                To build digital products that don't just look good — they perform. Every pixel, every line of code, every API call is in service of one goal: making our clients' businesses stronger.
              </p>
              <h3 className="font-semibold text-zinc-100 mb-4 text-lg">Our Approach</h3>
              <p className="text-zinc-400 text-sm leading-relaxed">
                We work as an extension of your team. No handoff chaos, no black boxes. You get direct access to the people building your product, with clear communication at every step.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-24 bg-black/20">
        <div className="max-w-7xl mx-auto px-6">
          <FadeIn className="text-center mb-16">
            <div className="text-xs font-semibold text-violet-400 tracking-widest uppercase mb-3">How We Work</div>
            <h2 className="text-4xl sm:text-5xl font-serif font-bold mb-4">Our Process</h2>
            <p className="text-zinc-400 max-w-xl mx-auto">From first conversation to live product — a clear, collaborative process.</p>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {processSteps.map((step, i) => {
              const Icon = step.icon;
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
            <div className="text-xs font-semibold text-violet-400 tracking-widest uppercase mb-3">Tools & Technologies</div>
            <h2 className="text-4xl sm:text-5xl font-serif font-bold mb-4">Our Tech Stack</h2>
            <p className="text-zinc-400 max-w-xl mx-auto">We use battle-tested, modern technologies to deliver fast, maintainable products.</p>
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
              <div className="text-xs font-semibold text-violet-400 tracking-widest uppercase mb-3">Why SupaWeb</div>
              <h2 className="text-4xl sm:text-5xl font-serif font-bold mb-6">Why Choose Us?</h2>
              <p className="text-zinc-400 leading-relaxed mb-8">
                There are a lot of dev shops out there. Here's what makes SupaWeb different: we care about outcomes, not just outputs. We won't build you something that looks good in a demo and breaks in production.
              </p>
              <Link href="/contact" className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-violet-600 hover:bg-violet-500 text-white font-semibold transition-all duration-200 glow-sm">
                Let's Talk <ArrowRight className="w-4 h-4" />
              </Link>
            </FadeIn>

            <div className="space-y-4">
              {whyUs.map((item, i) => (
                <FadeIn key={item} delay={i * 0.08}>
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
