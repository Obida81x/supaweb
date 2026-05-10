import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Mail, MessageSquare, Send, ChevronDown, ChevronUp, Twitter, Linkedin, Github, Instagram, Facebook } from "lucide-react";
import { useSubmitContact } from "@workspace/api-client-react";
import { useLanguage } from "@/lib/i18n";

function TikTokIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.78 1.52V6.76a4.85 4.85 0 0 1-1.01-.07z"/>
    </svg>
  );
}

const socialLinks = [
  { icon: Twitter, href: "https://x.com/supaweb81x", label: "X / Twitter" },
  { icon: Linkedin, href: "https://www.linkedin.com/in/supa-web-14107040a/", label: "LinkedIn" },
  { icon: Github, href: "https://github.com/dashboard", label: "GitHub" },
  { icon: Instagram, href: "https://www.instagram.com/supaweb81x/", label: "Instagram" },
  { icon: TikTokIcon, href: "https://www.tiktok.com/@supaweb81x", label: "TikTok" },
  { icon: Facebook, href: "https://facebook.com/supaweb81x", label: "Facebook" },
];

function FadeIn({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay, ease: "easeOut" }} className={className}>
      {children}
    </motion.div>
  );
}

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
  const { t } = useLanguage();
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [success, setSuccess] = useState(false);
  const mutation = useSubmitContact();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutation.mutate(
      { data: { name: form.name, email: form.email, subject: form.subject || null, message: form.message } },
      { onSuccess: () => { setSuccess(true); setForm({ name: "", email: "", subject: "", message: "" }); } }
    );
  };

  return (
    <div className="min-h-screen pt-20">
      <section className="py-24 text-center relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-violet-600/6 rounded-full blur-3xl" />
        </div>
        <div className="relative max-w-3xl mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass text-xs font-medium text-violet-300 mb-6">
            ✦ {t.contact.badge}
          </motion.div>
          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="text-5xl sm:text-6xl font-serif font-bold mb-6">
            {t.contact.h1a} <span className="gradient-text">{t.contact.h1b}</span>
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="text-zinc-400 text-lg">
            {t.contact.subtitle}
          </motion.p>
        </div>
      </section>

      <section className="pb-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
            <div className="lg:col-span-2 space-y-6">
              <FadeIn>
                <div className="glass rounded-2xl p-6">
                  <h3 className="font-semibold text-zinc-100 mb-4">{t.contact.contactInfoTitle}</h3>
                  <div className="space-y-4">
                    <a href="mailto:supaweb81x@gmail.com" className="flex items-center gap-3 text-sm text-zinc-400 hover:text-violet-400 transition-colors">
                      <div className="w-9 h-9 rounded-lg bg-violet-500/10 border border-violet-500/20 flex items-center justify-center shrink-0">
                        <Mail className="w-4 h-4 text-violet-400" />
                      </div>
                      supaweb81x@gmail.com
                    </a>
                    <a href="https://wa.me/972592184656" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-sm text-zinc-400 hover:text-violet-400 transition-colors">
                      <div className="w-9 h-9 rounded-lg bg-green-500/10 border border-green-500/20 flex items-center justify-center shrink-0">
                        <MessageSquare className="w-4 h-4 text-green-400" />
                      </div>
                      {t.contact.whatsapp} (+972 59 218 4656)
                    </a>
                  </div>
                  <div className="mt-6 pt-6 border-t border-white/5">
                    <p className="text-xs text-zinc-500 mb-3">{t.contact.followUs}</p>
                    <div className="flex flex-wrap items-center gap-2">
                      {socialLinks.map(({ icon: Icon, href, label }) => (
                        <a key={label} href={href} target="_blank" rel="noopener noreferrer" title={label} className="w-9 h-9 rounded-lg glass flex items-center justify-center text-zinc-400 hover:text-violet-400 hover:border-violet-500/30 transition-colors">
                          <Icon className="w-4 h-4" />
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
              </FadeIn>
              <FadeIn delay={0.1}>
                <div className="glass rounded-2xl p-6">
                  <h3 className="font-semibold text-zinc-100 mb-2">{t.contact.responseTitle}</h3>
                  <p className="text-sm text-zinc-400">
                    {t.contact.responseText.replace("24 hours", "").replace("٢٤ ساعة", "").trim()}{" "}
                    <span className="text-violet-400 font-medium">{t.contact.within24}</span>
                    {" "}{t.contact.responseText.includes("business days") ? "on business days." : "في أيام العمل."}
                  </p>
                </div>
              </FadeIn>
            </div>

            <FadeIn delay={0.1} className="lg:col-span-3">
              <div className="glass rounded-2xl p-8">
                {success ? (
                  <div className="text-center py-8">
                    <div className="w-16 h-16 rounded-full bg-violet-500/20 border border-violet-500/30 flex items-center justify-center mx-auto mb-4">
                      <Send className="w-8 h-8 text-violet-400" />
                    </div>
                    <h3 className="text-xl font-semibold text-zinc-100 mb-2">{t.contact.successTitle}</h3>
                    <p className="text-zinc-400 text-sm">{t.contact.successText}</p>
                    <button onClick={() => setSuccess(false)} className="mt-6 text-sm text-violet-400 hover:text-violet-300 transition-colors">{t.contact.sendAnother}</button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      {[
                        { label: t.contact.name, field: "name", placeholder: t.contact.namePlaceholder, type: "text", required: true },
                        { label: t.contact.email, field: "email", placeholder: t.contact.emailPlaceholder, type: "email", required: true },
                      ].map(({ label, field, placeholder, type, required }) => (
                        <div key={field}>
                          <label className="block text-xs font-medium text-zinc-400 mb-2">{label}</label>
                          <input
                            required={required}
                            type={type}
                            value={(form as any)[field]}
                            onChange={(e) => setForm((f) => ({ ...f, [field]: e.target.value }))}
                            placeholder={placeholder}
                            className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-zinc-100 text-sm placeholder-zinc-600 focus:outline-none focus:border-violet-500/50 focus:bg-violet-500/5 transition-all"
                          />
                        </div>
                      ))}
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-zinc-400 mb-2">{t.contact.subject}</label>
                      <input
                        value={form.subject}
                        onChange={(e) => setForm((f) => ({ ...f, subject: e.target.value }))}
                        placeholder={t.contact.subjectPlaceholder}
                        className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-zinc-100 text-sm placeholder-zinc-600 focus:outline-none focus:border-violet-500/50 focus:bg-violet-500/5 transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-zinc-400 mb-2">{t.contact.message}</label>
                      <textarea
                        required
                        rows={5}
                        value={form.message}
                        onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
                        placeholder={t.contact.messagePlaceholder}
                        className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-zinc-100 text-sm placeholder-zinc-600 focus:outline-none focus:border-violet-500/50 focus:bg-violet-500/5 transition-all resize-none"
                      />
                    </div>
                    <button
                      type="submit"
                      disabled={mutation.isPending}
                      className="w-full flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-violet-600 hover:bg-violet-500 disabled:opacity-60 disabled:cursor-not-allowed text-white font-semibold transition-all duration-200 glow-sm"
                    >
                      {mutation.isPending ? t.contact.sending : t.contact.send}
                      <Send className="w-4 h-4" />
                    </button>
                    {mutation.isError && <p className="text-sm text-red-400 text-center">{t.contact.errorText}</p>}
                  </form>
                )}
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      <section className="pb-24 bg-black/20 py-24">
        <div className="max-w-3xl mx-auto px-6">
          <FadeIn className="text-center mb-12">
            <div className="text-xs font-semibold text-violet-400 tracking-widest uppercase mb-3">{t.contact.faqTag}</div>
            <h2 className="text-4xl font-serif font-bold">{t.contact.faqTitle}</h2>
          </FadeIn>
          <div className="space-y-3">
            {t.contact.faqs.map((faq, i) => (
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
