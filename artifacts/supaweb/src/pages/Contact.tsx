import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Mail, MessageSquare, Send, ChevronDown, ChevronUp, Zap, Twitter, Linkedin, Github } from "lucide-react";
import { useSubmitContact } from "@workspace/api-client-react";
import { useQueryClient } from "@tanstack/react-query";

function FadeIn({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay, ease: "easeOut" }} className={className}>
      {children}
    </motion.div>
  );
}

const faqs = [
  { q: "How long does a typical project take?", a: "Project timelines vary by scope. A business website typically takes 2-4 weeks, while a full-stack application can take 6-12 weeks. We always provide a detailed timeline before starting." },
  { q: "What's your pricing structure?", a: "We offer project-based and retainer pricing. Prices depend on complexity, timeline, and scope. Contact us with your requirements and we'll provide a detailed proposal." },
  { q: "Do you offer post-launch support?", a: "Yes — we offer maintenance and support packages for all projects. We don't just build and disappear; we're here for the long run." },
  { q: "What information do you need to get started?", a: "A brief about your business, what you want to build, your target audience, timeline, and budget range. The more detail, the better we can scope the project." },
  { q: "Can you work with our existing codebase?", a: "Absolutely. We regularly take over existing projects, do audits, refactors, and feature additions. Send us the details and we'll assess it." },
];

function FAQItem({ faq }: { faq: { q: string; a: string } }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="glass rounded-xl overflow-hidden">
      <button onClick={() => setOpen(!open)} className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-white/3 transition-colors">
        <span className="text-sm font-medium text-zinc-200">{faq.q}</span>
        {open ? <ChevronUp className="w-4 h-4 text-violet-400 shrink-0" /> : <ChevronDown className="w-4 h-4 text-zinc-500 shrink-0" />}
      </button>
      {open && (
        <div className="px-6 pb-4 border-t border-white/5">
          <p className="text-sm text-zinc-400 leading-relaxed pt-3">{faq.a}</p>
        </div>
      )}
    </div>
  );
}

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [success, setSuccess] = useState(false);
  const mutation = useSubmitContact();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutation.mutate(
      { data: { name: form.name, email: form.email, subject: form.subject || null, message: form.message } },
      {
        onSuccess: () => {
          setSuccess(true);
          setForm({ name: "", email: "", subject: "", message: "" });
        },
      }
    );
  };

  const updateForm = (field: string, value: string) => setForm((f) => ({ ...f, [field]: value }));

  return (
    <div className="min-h-screen pt-20">
      {/* Header */}
      <section className="py-24 text-center relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-violet-600/6 rounded-full blur-3xl" />
        </div>
        <div className="relative max-w-3xl mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass text-xs font-medium text-violet-300 mb-6">
            <Zap className="w-3 h-3" /> Get in Touch
          </motion.div>
          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="text-5xl sm:text-6xl font-serif font-bold mb-6">
            Let's Build Something <span className="gradient-text">Together</span>
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="text-zinc-400 text-lg">
            Tell us about your project. We'll get back to you within 24 hours.
          </motion.p>
        </div>
      </section>

      <section className="pb-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
            {/* Contact Info */}
            <div className="lg:col-span-2 space-y-6">
              <FadeIn>
                <div className="glass rounded-2xl p-6">
                  <h3 className="font-semibold text-zinc-100 mb-4">Contact Info</h3>
                  <div className="space-y-4">
                    <a href="mailto:hello@supaweb.dev" className="flex items-center gap-3 text-sm text-zinc-400 hover:text-violet-400 transition-colors">
                      <div className="w-9 h-9 rounded-lg bg-violet-500/10 border border-violet-500/20 flex items-center justify-center">
                        <Mail className="w-4 h-4 text-violet-400" />
                      </div>
                      hello@supaweb.dev
                    </a>
                    <a href="https://wa.me/1234567890" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-sm text-zinc-400 hover:text-violet-400 transition-colors">
                      <div className="w-9 h-9 rounded-lg bg-green-500/10 border border-green-500/20 flex items-center justify-center">
                        <MessageSquare className="w-4 h-4 text-green-400" />
                      </div>
                      WhatsApp us
                    </a>
                  </div>
                  <div className="mt-6 pt-6 border-t border-white/5">
                    <p className="text-xs text-zinc-500 mb-3">Follow us</p>
                    <div className="flex items-center gap-3">
                      {[{ icon: Twitter, href: "#" }, { icon: Linkedin, href: "#" }, { icon: Github, href: "#" }].map(({ icon: Icon, href }, i) => (
                        <a key={i} href={href} className="w-9 h-9 rounded-lg glass flex items-center justify-center text-zinc-400 hover:text-violet-400 hover:border-violet-500/30 transition-colors">
                          <Icon className="w-4 h-4" />
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
              </FadeIn>

              <FadeIn delay={0.1}>
                <div className="glass rounded-2xl p-6">
                  <h3 className="font-semibold text-zinc-100 mb-2">Response Time</h3>
                  <p className="text-sm text-zinc-400">We respond to all inquiries within <span className="text-violet-400 font-medium">24 hours</span> on business days.</p>
                </div>
              </FadeIn>
            </div>

            {/* Contact Form */}
            <FadeIn delay={0.1} className="lg:col-span-3">
              <div className="glass rounded-2xl p-8">
                {success ? (
                  <div className="text-center py-8">
                    <div className="w-16 h-16 rounded-full bg-violet-500/20 border border-violet-500/30 flex items-center justify-center mx-auto mb-4">
                      <Send className="w-8 h-8 text-violet-400" />
                    </div>
                    <h3 className="text-xl font-semibold text-zinc-100 mb-2">Message Sent!</h3>
                    <p className="text-zinc-400 text-sm">Thanks for reaching out. We'll be in touch within 24 hours.</p>
                    <button onClick={() => setSuccess(false)} className="mt-6 text-sm text-violet-400 hover:text-violet-300 transition-colors">Send another message</button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-xs font-medium text-zinc-400 mb-2">Name *</label>
                        <input
                          required
                          value={form.name}
                          onChange={(e) => updateForm("name", e.target.value)}
                          placeholder="Your name"
                          className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-zinc-100 text-sm placeholder-zinc-600 focus:outline-none focus:border-violet-500/50 focus:bg-violet-500/5 transition-all"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-zinc-400 mb-2">Email *</label>
                        <input
                          required
                          type="email"
                          value={form.email}
                          onChange={(e) => updateForm("email", e.target.value)}
                          placeholder="your@email.com"
                          className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-zinc-100 text-sm placeholder-zinc-600 focus:outline-none focus:border-violet-500/50 focus:bg-violet-500/5 transition-all"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-zinc-400 mb-2">Subject</label>
                      <input
                        value={form.subject}
                        onChange={(e) => updateForm("subject", e.target.value)}
                        placeholder="What's this about?"
                        className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-zinc-100 text-sm placeholder-zinc-600 focus:outline-none focus:border-violet-500/50 focus:bg-violet-500/5 transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-zinc-400 mb-2">Message *</label>
                      <textarea
                        required
                        rows={5}
                        value={form.message}
                        onChange={(e) => updateForm("message", e.target.value)}
                        placeholder="Tell us about your project..."
                        className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-zinc-100 text-sm placeholder-zinc-600 focus:outline-none focus:border-violet-500/50 focus:bg-violet-500/5 transition-all resize-none"
                      />
                    </div>
                    <button
                      type="submit"
                      disabled={mutation.isPending}
                      className="w-full flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-violet-600 hover:bg-violet-500 disabled:opacity-60 disabled:cursor-not-allowed text-white font-semibold transition-all duration-200 glow-sm"
                    >
                      {mutation.isPending ? "Sending..." : "Send Message"}
                      <Send className="w-4 h-4" />
                    </button>
                    {mutation.isError && (
                      <p className="text-sm text-red-400 text-center">Something went wrong. Please try again.</p>
                    )}
                  </form>
                )}
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="pb-24 bg-black/20 py-24">
        <div className="max-w-3xl mx-auto px-6">
          <FadeIn className="text-center mb-12">
            <div className="text-xs font-semibold text-violet-400 tracking-widest uppercase mb-3">FAQ</div>
            <h2 className="text-4xl font-serif font-bold">Common Questions</h2>
          </FadeIn>
          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <FadeIn key={i} delay={i * 0.06}>
                <FAQItem faq={faq} />
              </FadeIn>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
