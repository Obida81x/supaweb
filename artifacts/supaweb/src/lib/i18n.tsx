import { createContext, useContext, useState, useEffect, type ReactNode } from "react";

export type Lang = "en" | "ar";

const translations = {
  en: {
    nav: {
      home: "Home", services: "Services", portfolio: "Portfolio",
      about: "About", contact: "Contact", startProject: "Start a Project",
    },
    home: {
      badge: "Premium Web Development Agency",
      h1a: "We Build", h1b: "Digital", h1c: "Experiences",
      subtitle: "From stunning business websites to complex full-stack applications — we craft digital products that perform, convert, and leave a lasting impression.",
      viewPortfolio: "View Portfolio", startProject: "Start Your Project",
      statsProjects: "Projects Delivered", statsServices: "Services Offered",
      statsClients: "Happy Clients", statsYears: "Years of Experience",
      servicesTag: "What We Do", servicesTitle: "Our Services",
      servicesSubtitle: "End-to-end web development services tailored to your business needs.",
      viewAllServices: "View all services",
      projectsTag: "Our Work", projectsTitle: "Featured Projects",
      projectsSubtitle: "A selection of projects we are proud of.",
      seeAllProjects: "See all projects",
      liveDemo: "Live Demo", github: "GitHub", privateProject: "Private project",
      testimonialsTag: "Client Stories", testimonialsTitle: "What Clients Say",
      ctaTag: "Ready to Build?", ctaTitle: "Let's Create Something",
      ctaHighlight: "Extraordinary",
      ctaSubtitle: "Tell us about your project and let's discuss how we can bring your vision to life.",
      ctaButton: "Start Your Project",
    },
    services: {
      badge: "What We Offer", title: "Our Services",
      subtitle: "From sleek business websites to complex full-stack applications — we have the expertise to bring your digital vision to life.",
      ctaTitle: "Ready to get started?",
      ctaSubtitle: "Let's discuss your project and find the perfect service for your needs.",
      ctaButton: "Start a Conversation",
    },
    portfolio: {
      badge: "Our Work", title: "Our Portfolio",
      subtitle: "A showcase of projects we have built for clients across industries.",
      all: "All", businessWebsite: "Business Website",
      ecommerce: "E-commerce", dashboard: "Dashboard", fullStack: "Full Stack App",
      liveDemo: "Live Demo", noProjects: "No projects found in this category.",
    },
    about: {
      badge: "About SupaWeb", h1a: "Built for", h1b: "Results",
      intro: "SupaWeb is a premium web development agency founded on a simple belief: great digital products change businesses. We combine deep technical expertise with a relentless focus on outcomes — not just deliverables.",
      missionTitle: "Our Mission",
      missionText: "To build digital products that don't just look good — they perform. Every pixel, every line of code, every API call is in service of one goal: making our clients' businesses stronger.",
      approachTitle: "Our Approach",
      approachText: "We work as an extension of your team. No handoff chaos, no black boxes. You get direct access to the people building your product, with clear communication at every step.",
      processTag: "How We Work", processTitle: "Our Process",
      processSubtitle: "From first conversation to live product — a clear, collaborative process.",
      steps: [
        { step: "01", title: "Discovery", description: "We dive deep into your business goals, target audience, and technical requirements to build the right foundation." },
        { step: "02", title: "Design", description: "Our design team creates high-fidelity mockups that balance aesthetics with user experience and conversion goals." },
        { step: "03", title: "Development", description: "We build with clean, maintainable code using modern frameworks and best practices for performance and scalability." },
        { step: "04", title: "Launch", description: "Rigorous testing, deployment setup, and post-launch monitoring to ensure everything runs smoothly from day one." },
      ],
      techTag: "Tools & Technologies", techTitle: "Our Tech Stack",
      techSubtitle: "We use battle-tested, modern technologies to deliver fast, maintainable products.",
      whyTag: "Why SupaWeb", whyTitle: "Why Choose Us?",
      whyText: "There are a lot of dev shops out there. Here's what makes SupaWeb different: we care about outcomes, not just outputs. We won't build you something that looks good in a demo and breaks in production.",
      whyButton: "Let's Talk",
      whyList: [
        "End-to-end delivery — design, code, deploy, support",
        "Modern tech stack with proven frameworks",
        "Performance-first approach with Core Web Vitals focus",
        "Clean, documented code you can maintain and extend",
        "Direct communication with senior developers",
        "On-time delivery with transparent project tracking",
      ],
    },
    contact: {
      badge: "Get in Touch", h1a: "Let's Build Something", h1b: "Together",
      subtitle: "Tell us about your project. We'll get back to you within 24 hours.",
      contactInfoTitle: "Contact Info",
      whatsapp: "WhatsApp us",
      followUs: "Follow us",
      responseTitle: "Response Time",
      responseText: "We respond to all inquiries within 24 hours on business days.",
      within24: "24 hours",
      name: "Name *", email: "Email *", subject: "Subject", message: "Message *",
      namePlaceholder: "Your name", emailPlaceholder: "your@email.com",
      subjectPlaceholder: "What's this about?", messagePlaceholder: "Tell us about your project...",
      send: "Send Message", sending: "Sending...",
      successTitle: "Message Sent!", successText: "Thanks for reaching out. We'll be in touch within 24 hours.",
      sendAnother: "Send another message", errorText: "Something went wrong. Please try again.",
      faqTag: "FAQ", faqTitle: "Common Questions",
      faqs: [
        { q: "How long does a typical project take?", a: "Project timelines vary by scope. A business website typically takes 2-4 weeks, while a full-stack application can take 6-12 weeks. We always provide a detailed timeline before starting." },
        { q: "What's your pricing structure?", a: "We offer project-based and retainer pricing. Prices depend on complexity, timeline, and scope. Contact us with your requirements and we'll provide a detailed proposal." },
        { q: "Do you offer post-launch support?", a: "Yes — we offer maintenance and support packages for all projects. We don't just build and disappear; we're here for the long run." },
        { q: "What information do you need to get started?", a: "A brief about your business, what you want to build, your target audience, timeline, and budget range. The more detail, the better we can scope the project." },
        { q: "Can you work with our existing codebase?", a: "Absolutely. We regularly take over existing projects, do audits, refactors, and feature additions. Send us the details and we'll assess it." },
      ],
    },
    footer: {
      description: "A premium web development agency building exceptional digital products for ambitious businesses.",
      navigation: "Navigation", services: "Services", copyright: "All rights reserved.",
      privacyPolicy: "Privacy Policy", termsOfService: "Terms of Service", admin: "Admin",
    },
  },

  ar: {
    nav: {
      home: "الرئيسية", services: "الخدمات", portfolio: "أعمالنا",
      about: "من نحن", contact: "تواصل معنا", startProject: "ابدأ مشروعك",
    },
    home: {
      badge: "وكالة تطوير ويب متميزة",
      h1a: "نبني", h1b: "تجارب", h1c: "رقمية",
      subtitle: "من مواقع الأعمال الرائعة إلى التطبيقات المتكاملة — نصنع منتجات رقمية تُحقق النتائج وتترك أثراً دائماً.",
      viewPortfolio: "استعرض أعمالنا", startProject: "ابدأ مشروعك",
      statsProjects: "مشروع مُنجز", statsServices: "خدمة مقدَّمة",
      statsClients: "عميل سعيد", statsYears: "سنوات من الخبرة",
      servicesTag: "ما نقدمه", servicesTitle: "خدماتنا",
      servicesSubtitle: "خدمات تطوير ويب شاملة مصممة وفق احتياجات عملك.",
      viewAllServices: "عرض جميع الخدمات",
      projectsTag: "أعمالنا", projectsTitle: "مشاريع مميزة",
      projectsSubtitle: "مجموعة مختارة من المشاريع التي نفخر بها.",
      seeAllProjects: "عرض جميع المشاريع",
      liveDemo: "عرض مباشر", github: "GitHub", privateProject: "مشروع خاص",
      testimonialsTag: "قصص عملائنا", testimonialsTitle: "ماذا يقول عملاؤنا",
      ctaTag: "هل أنت مستعد؟", ctaTitle: "دعنا نبني شيئاً",
      ctaHighlight: "استثنائياً",
      ctaSubtitle: "أخبرنا عن مشروعك ودعنا نناقش كيف يمكننا تحقيق رؤيتك.",
      ctaButton: "ابدأ مشروعك",
    },
    services: {
      badge: "ما نقدمه", title: "خدماتنا",
      subtitle: "من مواقع الأعمال الراقية إلى التطبيقات المتكاملة — لدينا الخبرة لتحويل رؤيتك الرقمية إلى واقع.",
      ctaTitle: "هل أنت مستعد للبدء؟",
      ctaSubtitle: "دعنا نناقش مشروعك ونجد الخدمة المناسبة لاحتياجاتك.",
      ctaButton: "ابدأ محادثة",
    },
    portfolio: {
      badge: "أعمالنا", title: "معرض أعمالنا",
      subtitle: "نماذج من المشاريع التي بنيناها للعملاء في مختلف القطاعات.",
      all: "الكل", businessWebsite: "موقع أعمال",
      ecommerce: "تجارة إلكترونية", dashboard: "لوحة تحكم", fullStack: "تطبيق متكامل",
      liveDemo: "عرض مباشر", noProjects: "لا توجد مشاريع في هذه الفئة.",
    },
    about: {
      badge: "عن SupaWeb", h1a: "مبنيون من أجل", h1b: "النتائج",
      intro: "SupaWeb وكالة تطوير ويب متميزة تأسست على اعتقاد بسيط: المنتجات الرقمية الرائعة تُغيّر الأعمال. نجمع بين الخبرة التقنية العميقة والتركيز الدؤوب على النتائج — لا مجرد المخرجات.",
      missionTitle: "مهمتنا",
      missionText: "بناء منتجات رقمية لا تبدو جيدة فحسب — بل تؤدي وظيفتها. كل بكسل، وكل سطر كود، وكل استدعاء API في خدمة هدف واحد: تقوية أعمال عملائنا.",
      approachTitle: "نهجنا",
      approachText: "نعمل كامتداد لفريقك. لا فوضى في التسليم، ولا صناديق سوداء. تتواصل مباشرة مع المطورين الذين يبنون منتجك، بشفافية تامة في كل خطوة.",
      processTag: "طريقة عملنا", processTitle: "منهجيتنا",
      processSubtitle: "من أول محادثة إلى المنتج الحي — عملية واضحة وتعاونية.",
      steps: [
        { step: "٠١", title: "الاستكشاف", description: "نتعمق في أهداف عملك وجمهورك المستهدف ومتطلباتك التقنية لبناء الأساس الصحيح." },
        { step: "٠٢", title: "التصميم", description: "يبتكر فريق التصميم لدينا نماذج عالية الدقة توازن بين الجمال وتجربة المستخدم وأهداف التحويل." },
        { step: "٠٣", title: "التطوير", description: "نبني بكود نظيف وقابل للصيانة باستخدام أطر عمل حديثة وأفضل الممارسات للأداء والقابلية للتوسع." },
        { step: "٠٤", title: "الإطلاق", description: "اختبار دقيق وإعداد للنشر ومراقبة ما بعد الإطلاق لضمان سير كل شيء بسلاسة منذ اليوم الأول." },
      ],
      techTag: "الأدوات والتقنيات", techTitle: "مجموعة تقنياتنا",
      techSubtitle: "نستخدم تقنيات حديثة ومجربة لتقديم منتجات سريعة وقابلة للصيانة.",
      whyTag: "لماذا SupaWeb", whyTitle: "لماذا تختارنا؟",
      whyText: "هناك الكثير من شركات التطوير. إليك ما يميّز SupaWeb: نهتم بالنتائج لا بالمخرجات. لن نبني لك شيئاً يبدو جيداً في العرض ويتعطل في الإنتاج.",
      whyButton: "لنتحدث",
      whyList: [
        "تسليم شامل — تصميم، كود، نشر، دعم",
        "مجموعة تقنيات حديثة بأطر عمل مجربة",
        "نهج مرتكز على الأداء مع التركيز على Core Web Vitals",
        "كود نظيف وموثق يمكنك الحفاظ عليه وتوسيعه",
        "تواصل مباشر مع كبار المطورين",
        "تسليم في الوقت المحدد مع تتبع شفاف للمشروع",
      ],
    },
    contact: {
      badge: "تواصل معنا", h1a: "دعنا نبني شيئاً", h1b: "معاً",
      subtitle: "أخبرنا عن مشروعك. سنرد عليك خلال 24 ساعة.",
      contactInfoTitle: "معلومات التواصل",
      whatsapp: "راسلنا على واتساب",
      followUs: "تابعنا",
      responseTitle: "وقت الاستجابة",
      responseText: "نرد على جميع الاستفسارات خلال 24 ساعة في أيام العمل.",
      within24: "٢٤ ساعة",
      name: "الاسم *", email: "البريد الإلكتروني *", subject: "الموضوع", message: "الرسالة *",
      namePlaceholder: "اسمك", emailPlaceholder: "بريدك@الإلكتروني.com",
      subjectPlaceholder: "ما موضوع رسالتك؟", messagePlaceholder: "أخبرنا عن مشروعك...",
      send: "إرسال الرسالة", sending: "جار الإرسال...",
      successTitle: "تم إرسال الرسالة!", successText: "شكراً للتواصل معنا. سنرد عليك خلال 24 ساعة.",
      sendAnother: "إرسال رسالة أخرى", errorText: "حدث خطأ ما. يرجى المحاولة مرة أخرى.",
      faqTag: "الأسئلة الشائعة", faqTitle: "أسئلة متكررة",
      faqs: [
        { q: "كم يستغرق المشروع عادةً؟", a: "تختلف الجداول الزمنية حسب النطاق. يستغرق موقع الأعمال عادةً 2-4 أسابيع، بينما يستغرق التطبيق المتكامل 6-12 أسبوعاً. نقدم دائماً جدولاً تفصيلياً قبل البدء." },
        { q: "ما هيكل التسعير لديكم؟", a: "نقدم تسعيراً مبنياً على المشروع وخيار الاشتراك الشهري. تعتمد الأسعار على التعقيد والجدول الزمني والنطاق. تواصل معنا بمتطلباتك وسنقدم عرضاً تفصيلياً." },
        { q: "هل تقدمون دعماً بعد الإطلاق؟", a: "نعم — نقدم حزم صيانة ودعم لجميع المشاريع. لا نبني ونختفي؛ نحن هنا على المدى الطويل." },
        { q: "ما المعلومات التي تحتاجونها للبدء؟", a: "نبذة عن عملك، وما تريد بناءه، وجمهورك المستهدف، والجدول الزمني، ونطاق الميزانية. كلما كانت التفاصيل أكثر، كان بإمكاننا تحديد نطاق المشروع بشكل أفضل." },
        { q: "هل يمكنكم العمل مع قاعدة الكود الموجودة لدينا؟", a: "بالتأكيد. نتولى بانتظام مشاريع قائمة، ونجري مراجعات وإعادة هيكلة وإضافة ميزات. أرسل لنا التفاصيل وسنقيّمها." },
      ],
    },
    footer: {
      description: "وكالة تطوير ويب متميزة تبني منتجات رقمية استثنائية للأعمال الطموحة.",
      navigation: "روابط", services: "الخدمات", copyright: "جميع الحقوق محفوظة.",
      privacyPolicy: "سياسة الخصوصية", termsOfService: "شروط الخدمة", admin: "لوحة التحكم",
    },
  },
} as const;

export type Translations = typeof translations.en;

interface LanguageContextType {
  lang: Lang;
  t: Translations;
  setLang: (l: Lang) => void;
  toggleLang: () => void;
  isRTL: boolean;
}

const LanguageContext = createContext<LanguageContextType>({
  lang: "en",
  t: translations.en,
  setLang: () => {},
  toggleLang: () => {},
  isRTL: false,
});

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(() => {
    try { return (localStorage.getItem("supaweb-lang") as Lang) ?? "en"; }
    catch { return "en"; }
  });

  const setLang = (l: Lang) => {
    setLangState(l);
    try { localStorage.setItem("supaweb-lang", l); } catch {}
  };

  const toggleLang = () => setLang(lang === "en" ? "ar" : "en");
  const isRTL = lang === "ar";

  useEffect(() => {
    document.documentElement.dir = isRTL ? "rtl" : "ltr";
    document.documentElement.lang = lang;
    document.body.classList.toggle("font-arabic", isRTL);
  }, [lang, isRTL]);

  return (
    <LanguageContext.Provider value={{ lang, t: translations[lang] as Translations, setLang, toggleLang, isRTL }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
