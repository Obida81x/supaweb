import { db, projectsTable, servicesTable, testimonialsTable, adminUsersTable } from "@workspace/db";
import bcrypt from "bcryptjs";

async function seed() {
  console.log("Seeding database...");

  // Seed admin user
  const passwordHash = await bcrypt.hash("admin123", 10);
  await db
    .insert(adminUsersTable)
    .values({ email: "admin@supaweb.dev", passwordHash })
    .onConflictDoNothing();

  // Seed services
  await db
    .insert(servicesTable)
    .values([
      {
        title: "Business Websites",
        description: "Professional, conversion-optimized websites that represent your brand with authority.",
        icon: "Globe",
        features: ["Custom design", "SEO optimized", "Mobile responsive", "Fast loading", "CMS integration"],
        sortOrder: 1,
      },
      {
        title: "E-commerce Stores",
        description: "High-converting online stores with seamless checkout and inventory management.",
        icon: "ShoppingCart",
        features: ["Payment integration", "Inventory management", "Order tracking", "Product analytics", "Multi-currency"],
        sortOrder: 2,
      },
      {
        title: "Admin Dashboards",
        description: "Data-rich admin panels and internal tools that make operations effortless.",
        icon: "LayoutDashboard",
        features: ["Real-time analytics", "Role-based access", "Custom reports", "Data visualization", "Export tools"],
        sortOrder: 3,
      },
      {
        title: "Full Stack Applications",
        description: "End-to-end web applications built with modern frameworks and scalable architecture.",
        icon: "Code2",
        features: ["React / Next.js", "Node.js backend", "PostgreSQL / Supabase", "REST & GraphQL APIs", "Cloud deployment"],
        sortOrder: 4,
      },
      {
        title: "UI/UX Design",
        description: "Human-centered design that turns complex products into delightful user experiences.",
        icon: "Palette",
        features: ["User research", "Wireframing", "Figma prototypes", "Design systems", "Accessibility audits"],
        sortOrder: 5,
      },
      {
        title: "API Integration",
        description: "Connect your systems with third-party services and custom API development.",
        icon: "Plug",
        features: ["REST API development", "GraphQL APIs", "Webhook setup", "Payment gateways", "Third-party services"],
        sortOrder: 6,
      },
      {
        title: "Database Design",
        description: "Optimized database architecture and data modeling for performance at scale.",
        icon: "Database",
        features: ["Schema design", "Query optimization", "Data migration", "Backups & recovery", "PostgreSQL / MySQL"],
        sortOrder: 7,
      },
      {
        title: "Website Deployment",
        description: "CI/CD pipelines, cloud hosting, and DevOps to keep your app running smoothly.",
        icon: "Rocket",
        features: ["Docker & containers", "CI/CD pipelines", "AWS / Vercel / Railway", "Domain & SSL setup", "Monitoring"],
        sortOrder: 8,
      },
    ])
    .onConflictDoNothing();

  // Seed projects
  await db
    .insert(projectsTable)
    .values([
      {
        title: "NexaCommerce",
        description: "A high-performance e-commerce platform for a fashion brand serving 50K+ monthly customers, with real-time inventory and personalized recommendations.",
        imageUrl: null,
        technologies: ["Next.js", "PostgreSQL", "Stripe", "Redis", "Tailwind CSS"],
        category: "E-commerce",
        liveUrl: "https://nexacommerce.example.com",
        githubUrl: null,
        featured: true,
        published: true,
      },
      {
        title: "DataPulse Analytics",
        description: "A real-time analytics dashboard for a SaaS startup, tracking user behavior, revenue metrics, and product engagement across 200+ enterprise clients.",
        imageUrl: null,
        technologies: ["React", "Node.js", "TimescaleDB", "Chart.js", "WebSockets"],
        category: "Dashboard",
        liveUrl: "https://datapulse.example.com",
        githubUrl: "https://github.com/example/datapulse",
        featured: true,
        published: true,
      },
      {
        title: "Meridian Legal",
        description: "A corporate website and client portal for a boutique law firm, featuring secure document management and appointment scheduling.",
        imageUrl: null,
        technologies: ["React", "Express", "PostgreSQL", "AWS S3", "Tailwind CSS"],
        category: "Business Website",
        liveUrl: "https://meridianlegal.example.com",
        githubUrl: null,
        featured: false,
        published: true,
      },
      {
        title: "FlowHR",
        description: "A full-stack HR management application for mid-size companies, handling recruitment, onboarding, payroll, and employee performance reviews.",
        imageUrl: null,
        technologies: ["React", "Node.js", "PostgreSQL", "Drizzle ORM", "Framer Motion"],
        category: "Full Stack App",
        liveUrl: "https://flowhr.example.com",
        githubUrl: "https://github.com/example/flowhr",
        featured: true,
        published: true,
      },
      {
        title: "Luminary Portfolio",
        description: "A stunning portfolio website for an award-winning photographer, with a CMS, gallery lightbox, and print ordering system.",
        imageUrl: null,
        technologies: ["Next.js", "Sanity CMS", "Cloudinary", "Framer Motion"],
        category: "Business Website",
        liveUrl: "https://luminary.example.com",
        githubUrl: null,
        featured: false,
        published: true,
      },
      {
        title: "SupplyChain Pro",
        description: "An enterprise supply chain management system with real-time tracking, supplier portals, and automated procurement workflows.",
        imageUrl: null,
        technologies: ["React", "Node.js", "PostgreSQL", "Redis", "Docker"],
        category: "Full Stack App",
        liveUrl: null,
        githubUrl: null,
        featured: false,
        published: true,
      },
    ])
    .onConflictDoNothing();

  // Seed testimonials
  await db
    .insert(testimonialsTable)
    .values([
      {
        name: "Sarah Mitchell",
        role: "CEO",
        company: "NexaRetail",
        content: "SupaWeb delivered a world-class e-commerce platform that tripled our conversion rate in the first month. Their attention to performance and user experience is unmatched.",
        avatarUrl: null,
        rating: 5,
      },
      {
        name: "Marcus Chen",
        role: "CTO",
        company: "DataPulse Inc.",
        content: "The dashboard they built handles millions of events daily without breaking a sweat. Clean code, great documentation, and they hit every deadline. Genuinely impressive team.",
        avatarUrl: null,
        rating: 5,
      },
      {
        name: "Priya Sharma",
        role: "Founder",
        company: "FlowHR",
        content: "From concept to launch in 8 weeks. SupaWeb turned our rough wireframes into a production-ready SaaS product. Our users love the interface — we keep getting compliments.",
        avatarUrl: null,
        rating: 5,
      },
      {
        name: "James Okafor",
        role: "Managing Partner",
        company: "Meridian Legal",
        content: "We needed a secure, professional web presence that matched our firm's reputation. SupaWeb delivered exactly that — elegant, fast, and built with security as a priority.",
        avatarUrl: null,
        rating: 5,
      },
    ])
    .onConflictDoNothing();

  console.log("Seeding complete!");
  process.exit(0);
}

seed().catch((e) => {
  console.error(e);
  process.exit(1);
});
