"use client";

import ParticleCanvas from "./components/ParticleCanvas";

import { useEffect, useRef, useState } from "react";

/* ─────────────────────────────────────────────
   SVG Icon System (Heroicons style, inline)
──────────────────────────────────────────────── */
const Icon = {
  Arrow: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
    </svg>
  ),
  ChevronDown: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="6 9 12 15 18 9" />
    </svg>
  ),
  Check: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  ),
  Star: () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="#f97316" stroke="none">
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  ),
  Code: () => (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" />
    </svg>
  ),
  Palette: () => (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" /><circle cx="8.5" cy="9" r="1.5" fill="currentColor" /><circle cx="15.5" cy="9" r="1.5" fill="currentColor" /><circle cx="12" cy="15" r="1.5" fill="currentColor" />
    </svg>
  ),
  Bolt: () => (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
    </svg>
  ),
  Shield: () => (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    </svg>
  ),
  Globe: () => (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" /><line x1="2" y1="12" x2="22" y2="12" /><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    </svg>
  ),
  Chart: () => (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <line x1="18" y1="20" x2="18" y2="10" /><line x1="12" y1="20" x2="12" y2="4" /><line x1="6" y1="20" x2="6" y2="14" /><line x1="2" y1="20" x2="22" y2="20" />
    </svg>
  ),
  Mail: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" />
    </svg>
  ),
  Phone: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 2.22h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 9.91a16 16 0 0 0 6.09 6.09l1.87-1.87a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  ),
  X: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  ),
  Menu: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="18" x2="21" y2="18" />
    </svg>
  ),
};

/* ─────────────────────────────────────────────
   Data
──────────────────────────────────────────────── */
const NAV_LINKS = [
  { label: "Services", href: "#services" },
  { label: "Work", href: "#work" },
  { label: "About", href: "#about" },
  { label: "Pricing", href: "#pricing" },
  { label: "Contact", href: "#contact" },
];

const SERVICES = [
  {
    icon: Icon.Code,
    title: "Full-Stack Development",
    desc: "Scalable web applications built with Next.js, React, Node.js, and cutting-edge databases — engineered for performance.",
    color: "#6366f1",
  },
  {
    icon: Icon.Palette,
    title: "UI/UX Design",
    desc: "Pixel-perfect interfaces grounded in user psychology. We design experiences people love to use.",
    color: "#a855f7",
  },
  {
    icon: Icon.Bolt,
    title: "Performance & SEO",
    desc: "Lighthouse 100 scores, Core Web Vitals optimization, and technical SEO that ranks and converts.",
    color: "#f97316",
  },
  {
    icon: Icon.Shield,
    title: "Security & DevOps",
    desc: "CI/CD pipelines, containerization, cloud architecture, and enterprise-grade security standards.",
    color: "#22c55e",
  },
  {
    icon: Icon.Globe,
    title: "E-Commerce Solutions",
    desc: "Revenue-driving storefronts with seamless checkout flows, inventory management, and analytics.",
    color: "#06b6d4",
  },
  {
    icon: Icon.Chart,
    title: "Growth Analytics",
    desc: "Data-driven dashboards, conversion funnels, and A/B testing frameworks to accelerate growth.",
    color: "#ec4899",
  },
];

const PORTFOLIO = [
  {
    title: "FinTech Dashboard",
    category: "SaaS / Finance",
    tags: ["Next.js", "D3.js", "PostgreSQL"],
    gradient: "from-[#6366f1] to-[#a855f7]",
    metrics: "2.4× faster load",
  },
  {
    title: "Luxury E-Commerce",
    category: "Retail / Fashion",
    tags: ["React", "Stripe", "Sanity"],
    gradient: "from-[#f97316] to-[#ec4899]",
    metrics: "+38% conversion",
  },
  {
    title: "Health & Wellness App",
    category: "Healthcare / Mobile",
    tags: ["Next.js", "Prisma", "Twilio"],
    gradient: "from-[#22c55e] to-[#06b6d4]",
    metrics: "50k+ users",
  },
];

const TESTIMONIALS = [
  {
    name: "Priya Sharma",
    role: "CEO, DataFlow Inc.",
    text: "Sourav Web Solutions transformed our platform in 6 weeks. The quality was beyond anything we expected — clean code, stunning UI, and our conversion rate jumped 41%.",
    avatar: "PS",
    rating: 5,
  },
  {
    name: "Marcus Oliveira",
    role: "Founder, Kreative Studio",
    text: "They don't just build websites — they build growth engines. The attention to detail is unreal. Worth every penny and then some.",
    avatar: "MO",
    rating: 5,
  },
  {
    name: "Aisha Kamara",
    role: "Product Lead, NexaTech",
    text: "From the first call, I knew they were different. They challenged our assumptions, pushed the design further, and delivered a product our users rave about.",
    avatar: "AK",
    rating: 5,
  },
];

const PRICING = [
  {
    name: "Starter",
    price: "₹24,999",
    period: "one-time",
    desc: "Perfect for small businesses and landing pages.",
    features: [
      "5-page responsive website",
      "Mobile-first design",
      "SEO foundation",
      "Contact form integration",
      "1 month support",
    ],
    cta: "Get Started",
    highlight: false,
  },
  {
    name: "Growth",
    price: "₹59,999",
    period: "one-time",
    desc: "Full-featured web app for growing companies.",
    features: [
      "Up to 20 pages / views",
      "Custom UI/UX design",
      "CMS integration",
      "E-commerce or SaaS features",
      "Performance optimization",
      "3 months support",
    ],
    cta: "Most Popular",
    highlight: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: "project-based",
    desc: "End-to-end digital solutions at scale.",
    features: [
      "Unlimited scope",
      "Dedicated team",
      "Architecture design",
      "Advanced analytics",
      "DevOps & CI/CD",
      "Priority support + SLA",
    ],
    cta: "Let's Talk",
    highlight: false,
  },
];

const TECH_STACK = [
  "Next.js", "React", "TypeScript", "Node.js", "PostgreSQL",
  "Tailwind CSS", "Figma", "Vercel", "AWS", "Docker",
  "Next.js", "React", "TypeScript", "Node.js", "PostgreSQL",
  "Tailwind CSS", "Figma", "Vercel", "AWS", "Docker",
];

const STATS = [
  { value: "120+", label: "Projects Delivered" },
  { value: "98%", label: "Client Satisfaction" },
  { value: "4.9★", label: "Average Rating" },
  { value: "3×", label: "Avg ROI Increase" },
];

/* ─────────────────────────────────────────────
   Hooks
──────────────────────────────────────────────── */
function useScrolled(threshold = 20) {
  const [s, setS] = useState(false);
  useEffect(() => {
    const fn = () => setS(window.scrollY > threshold);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, [threshold]);
  return s;
}

function useIntersection(ref: React.RefObject<Element | null>, options?: IntersectionObserverInit) {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    if (!ref.current) return;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setVisible(true); obs.disconnect(); }
    }, { threshold: 0.15, ...options });
    obs.observe(ref.current);
    return () => obs.disconnect();
  }, [ref, options]);
  return visible;
}

/* ─────────────────────────────────────────────
   Components
──────────────────────────────────────────────── */
function Navbar() {
  const scrolled = useScrolled();
  const [open, setOpen] = useState(false);

  return (
    <header
      id="navbar"
      style={{
        position: "fixed",
        top: scrolled ? "12px" : "0",
        left: scrolled ? "16px" : "0",
        right: scrolled ? "16px" : "0",
        zIndex: 50,
        transition: "all 0.35s ease",
        borderRadius: scrolled ? "16px" : "0",
        background: scrolled ? "rgba(5,8,22,0.85)" : "transparent",
        backdropFilter: scrolled ? "blur(20px)" : "none",
        border: scrolled ? "1px solid rgba(255,255,255,0.08)" : "1px solid transparent",
        boxShadow: scrolled ? "0 8px 32px rgba(0,0,0,0.4)" : "none",
      }}
    >
      <div className="container" style={{ maxWidth: "1280px" }}>
        <nav style={{ display: "flex", alignItems: "center", justifyContent: "space-between", height: "64px" }}>
          {/* Logo */}
          <a href="#" id="nav-logo" style={{ display: "flex", alignItems: "center", gap: "10px", cursor: "pointer" }}>
            <div style={{
              width: "36px", height: "36px",
              background: "linear-gradient(135deg, #6366f1, #a855f7)",
              borderRadius: "10px",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: "16px", fontWeight: 800, color: "#fff",
              fontFamily: "var(--font-head)",
            }}>S</div>
            <span style={{ fontFamily: "var(--font-head)", fontWeight: 700, fontSize: "1rem" }}>
              Sourav<span style={{ color: "var(--clr-primary-glow)" }}> Web</span>
            </span>
          </a>

          {/* Desktop Links */}
          <ul style={{ display: "flex", gap: "2rem", listStyle: "none", alignItems: "center" }} className="hidden-mobile">
            {NAV_LINKS.map((l) => (
              <li key={l.label}>
                <a
                  href={l.href}
                  id={`nav-${l.label.toLowerCase()}`}
                  style={{
                    fontSize: "0.9rem", fontWeight: 500,
                    color: "var(--clr-muted)",
                    transition: "color 0.2s ease",
                    cursor: "pointer",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "var(--clr-text)")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "var(--clr-muted)")}
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>

          {/* CTA */}
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
            <a href="#contact" id="nav-cta" className="btn-primary hidden-mobile" style={{ padding: "0.55rem 1.3rem", fontSize: "0.85rem" }}>
              <span>Start a Project</span>
            </a>
            <button
              id="nav-menu-btn"
              onClick={() => setOpen(!open)}
              style={{ display: "none", background: "none", border: "none", color: "var(--clr-text)", cursor: "pointer", padding: "4px" }}
              className="show-mobile"
              aria-label="Toggle mobile menu"
            >
              {open ? <Icon.X /> : <Icon.Menu />}
            </button>
          </div>
        </nav>

        {/* Mobile Menu */}
        {open && (
          <div id="mobile-menu" style={{
            padding: "1rem 0 1.5rem",
            borderTop: "1px solid var(--clr-border)",
            display: "flex", flexDirection: "column", gap: "0.5rem",
          }}>
            {NAV_LINKS.map((l) => (
              <a
                key={l.label}
                href={l.href}
                onClick={() => setOpen(false)}
                style={{ padding: "0.6rem 0", color: "var(--clr-muted)", fontSize: "0.95rem", cursor: "pointer" }}
              >
                {l.label}
              </a>
            ))}
            <a href="#contact" onClick={() => setOpen(false)} className="btn-primary" style={{ marginTop: "0.75rem", justifyContent: "center" }}>
              <span>Start a Project</span>
            </a>
          </div>
        )}
      </div>

      <style>{`
        @media (max-width: 768px) {
          .hidden-mobile { display: none !important; }
          .show-mobile { display: flex !important; }
        }
        @media (min-width: 769px) {
          .show-mobile { display: none !important; }
        }
      `}</style>
    </header>
  );
}

function HeroSection() {
  return (
    <section
      id="hero"
      className="noise-overlay grid-pattern"
      style={{
        position: "relative",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        paddingTop: "80px",
        overflow: "hidden",
      }}
    >
      <div className="hero-glow" />

      {/* Floating orbs */}
      <div style={{
        position: "absolute", top: "15%", right: "8%",
        width: "280px", height: "280px",
        borderRadius: "50%",
        background: "radial-gradient(circle, rgba(99,102,241,0.2) 0%, transparent 70%)",
        filter: "blur(40px)",
        animation: "float 8s ease-in-out infinite",
      }} />
      <div style={{
        position: "absolute", bottom: "20%", left: "5%",
        width: "200px", height: "200px",
        borderRadius: "50%",
        background: "radial-gradient(circle, rgba(249,115,22,0.15) 0%, transparent 70%)",
        filter: "blur(30px)",
        animation: "float 10s ease-in-out infinite 2s",
      }} />

      <div className="container" style={{ position: "relative", zIndex: 2 }}>
        <div style={{ maxWidth: "760px" }}>
          {/* Live badge */}
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "2rem" }}>
            <div className="badge fade-up fade-up-delay-1">
              <span className="pulse-dot" />
              Available for new projects
            </div>
          </div>

          <h1 className="fade-up fade-up-delay-2" style={{ fontSize: "clamp(2.6rem, 7vw, 5.2rem)", fontWeight: 900, lineHeight: 1.05, marginBottom: "1.5rem" }}>
            We Build Digital{" "}
            <span className="grad-text">Experiences</span>{" "}
            That Actually{" "}
            <span style={{ color: "var(--clr-accent)" }}>Convert.</span>
          </h1>

          <p className="fade-up fade-up-delay-3" style={{ fontSize: "clamp(1rem, 2.5vw, 1.2rem)", color: "var(--clr-muted)", maxWidth: "560px", marginBottom: "2.5rem", lineHeight: 1.75 }}>
            From idea to launch — we design and engineer premium websites, web apps, and SaaS platforms that grow your business. No templates. No compromises.
          </p>

          <div className="fade-up fade-up-delay-4" style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
            <a href="#contact" id="hero-cta-primary" className="btn-primary">
              <span>Start Your Project</span>
              <Icon.Arrow />
            </a>
            <a href="#work" id="hero-cta-secondary" className="btn-secondary">
              <span>View Our Work</span>
            </a>
          </div>

          {/* Social proof */}
          <div className="fade-up fade-up-delay-4" style={{ display: "flex", alignItems: "center", gap: "1.5rem", marginTop: "3rem", flexWrap: "wrap" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "-8px" }}>
              {["👤", "👤", "👤"].map((_, i) => (
                <div key={i} style={{
                  width: "36px", height: "36px", borderRadius: "50%",
                  background: `linear-gradient(${135 + i * 40}deg, #6366f1, #a855f7)`,
                  border: "2px solid var(--clr-bg)",
                  marginLeft: i > 0 ? "-10px" : "0",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: "0.65rem", color: "#fff", fontWeight: 700,
                }}>
                  {["PS", "MO", "AK"][i]}
                </div>
              ))}
            </div>
            <div style={{ display: "flex", gap: "2px" }}>
              {[0,1,2,3,4].map((i) => <Icon.Star key={i} />)}
            </div>
            <span style={{ color: "var(--clr-muted)", fontSize: "0.88rem" }}>
              <strong style={{ color: "var(--clr-text)" }}>4.9/5</strong> — 120+ happy clients
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

function StatsSection() {
  const ref = useRef<HTMLDivElement>(null);
  const visible = useIntersection(ref);

  return (
    <div ref={ref} style={{ background: "rgba(255,255,255,0.02)", borderTop: "1px solid var(--clr-border)", borderBottom: "1px solid var(--clr-border)" }}>
      <div className="container" style={{ paddingBlock: "3rem" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))", gap: "2rem", textAlign: "center" }}>
          {STATS.map((s, i) => (
            <div
              key={s.label}
              style={{
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0)" : "translateY(20px)",
                transition: `all 0.6s ease ${i * 0.1}s`,
              }}
            >
              <div className="stat-value grad-text">{s.value}</div>
              <div style={{ color: "var(--clr-muted)", fontSize: "0.88rem", marginTop: "0.4rem" }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function ServicesSection() {
  const ref = useRef<HTMLDivElement>(null);
  const visible = useIntersection(ref);

  return (
    <section id="services" className="section" style={{ position: "relative" }}>
      <div className="section-glow" />
      <div ref={ref} className="container" style={{ position: "relative", zIndex: 1 }}>
        <div style={{ textAlign: "center", marginBottom: "4rem" }}>
          <p className="section-label" style={{ marginBottom: "1rem" }}>What We Do</p>
          <h2 style={{ fontSize: "clamp(2rem, 5vw, 3.2rem)", fontWeight: 800 }}>
            Full-Service <span className="grad-text">Digital Solutions</span>
          </h2>
          <p style={{ color: "var(--clr-muted)", maxWidth: "500px", margin: "1rem auto 0", fontSize: "1.05rem" }}>
            Everything you need to launch, grow, and scale your digital presence — under one roof.
          </p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "1.5rem" }}>
          {SERVICES.map((svc, i) => (
            <div
              key={svc.title}
              id={`service-${i}`}
              className="glass-card shine-on-hover"
              style={{
                padding: "2rem",
                cursor: "pointer",
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0)" : "translateY(30px)",
                transition: `all 0.6s ease ${i * 0.1}s`,
              }}
            >
              <div style={{
                width: "52px", height: "52px", borderRadius: "14px",
                background: `${svc.color}18`,
                border: `1px solid ${svc.color}30`,
                display: "flex", alignItems: "center", justifyContent: "center",
                color: svc.color, marginBottom: "1.25rem",
              }}>
                <svc.icon />
              </div>
              <h3 style={{ fontFamily: "var(--font-head)", fontSize: "1.15rem", fontWeight: 700, marginBottom: "0.65rem" }}>{svc.title}</h3>
              <p style={{ color: "var(--clr-muted)", fontSize: "0.92rem", lineHeight: 1.7 }}>{svc.desc}</p>
              <div style={{ marginTop: "1.25rem", display: "flex", alignItems: "center", gap: "0.4rem", color: svc.color, fontSize: "0.85rem", fontWeight: 600 }}>
                Learn more <Icon.Arrow />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function TechMarquee() {
  return (
    <div style={{ borderTop: "1px solid var(--clr-border)", borderBottom: "1px solid var(--clr-border)", overflow: "hidden", padding: "1.2rem 0" }}>
      <div className="marquee-track">
        {TECH_STACK.map((t, i) => (
          <div key={i} style={{ display: "flex", alignItems: "center", gap: "2.5rem", paddingInline: "1.5rem" }}>
            <span style={{ color: "var(--clr-subtle)", fontSize: "0.85rem", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", whiteSpace: "nowrap" }}>
              {t}
            </span>
            <span style={{ color: "var(--clr-border)", fontSize: "1.2rem" }}>·</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function PortfolioSection() {
  const ref = useRef<HTMLDivElement>(null);
  const visible = useIntersection(ref);

  return (
    <section id="work" className="section">
      <div ref={ref} className="container">
        <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", marginBottom: "3rem", flexWrap: "wrap", gap: "1rem" }}>
          <div>
            <p className="section-label" style={{ marginBottom: "0.75rem" }}>Our Work</p>
            <h2 style={{ fontSize: "clamp(2rem, 5vw, 3rem)", fontWeight: 800 }}>
              Results We're <span className="grad-text">Proud Of</span>
            </h2>
          </div>
          <a href="#contact" className="btn-secondary">View All Projects</a>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "1.5rem" }}>
          {PORTFOLIO.map((p, i) => (
            <div
              key={p.title}
              id={`project-${i}`}
              className="glass-card"
              style={{
                overflow: "hidden", cursor: "pointer",
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0)" : "translateY(30px)",
                transition: `all 0.6s ease ${i * 0.15}s`,
              }}
            >
              {/* Gradient thumbnail */}
              <div className={`bg-gradient-to-br ${p.gradient}`} style={{
                height: "200px",
                position: "relative",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}>
                <div style={{
                  background: "rgba(0,0,0,0.2)", backdropFilter: "blur(4px)",
                  padding: "0.4rem 0.9rem", borderRadius: "9999px",
                  fontSize: "0.8rem", fontWeight: 600, color: "#fff",
                  border: "1px solid rgba(255,255,255,0.2)",
                }}>
                  {p.metrics}
                </div>
              </div>

              <div style={{ padding: "1.5rem" }}>
                <p style={{ fontSize: "0.75rem", fontWeight: 600, color: "var(--clr-primary-glow)", marginBottom: "0.4rem", letterSpacing: "0.08em", textTransform: "uppercase" }}>
                  {p.category}
                </p>
                <h3 style={{ fontFamily: "var(--font-head)", fontSize: "1.2rem", fontWeight: 700, marginBottom: "1rem" }}>{p.title}</h3>
                <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
                  {p.tags.map((tag) => (
                    <span key={tag} style={{
                      padding: "0.2rem 0.7rem",
                      background: "rgba(255,255,255,0.05)",
                      border: "1px solid var(--clr-border)",
                      borderRadius: "9999px",
                      fontSize: "0.75rem", color: "var(--clr-muted)",
                    }}>{tag}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function AboutSection() {
  const ref = useRef<HTMLDivElement>(null);
  const visible = useIntersection(ref);

  return (
    <section id="about" className="section" style={{ background: "rgba(255,255,255,0.015)", position: "relative" }}>
      <div className="section-glow" />
      <div ref={ref} className="container" style={{ position: "relative", zIndex: 1 }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "4rem", alignItems: "center" }}>
          {/* Text side */}
          <div style={{ opacity: visible ? 1 : 0, transform: visible ? "translateX(0)" : "translateX(-30px)", transition: "all 0.7s ease" }}>
            <p className="section-label" style={{ marginBottom: "1rem" }}>About Us</p>
            <h2 style={{ fontSize: "clamp(2rem, 4.5vw, 3rem)", fontWeight: 800, marginBottom: "1.25rem" }}>
              A Small Team With{" "}
              <span className="grad-text">Big Impact</span>
            </h2>
            <p style={{ color: "var(--clr-muted)", lineHeight: 1.8, marginBottom: "1.25rem" }}>
              We&apos;re a boutique digital studio that obsesses over craft. Every line of code is intentional. Every pixel is purposeful. We don&apos;t just build products — we build competitive advantages.
            </p>
            <p style={{ color: "var(--clr-muted)", lineHeight: 1.8, marginBottom: "2rem" }}>
              Based in India, working globally. Our clients range from funded startups to Fortune 500 companies — and we treat them all with the same intensity and care.
            </p>
            <ul style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
              {["Transparent communication throughout", "Agile delivery in 2-week sprints", "48-hour critical bug response SLA", "Post-launch growth partnership"].map((item) => (
                <li key={item} style={{ display: "flex", alignItems: "center", gap: "0.75rem", color: "var(--clr-muted)", fontSize: "0.95rem" }}>
                  <span style={{ color: "#22c55e", flexShrink: 0 }}><Icon.Check /></span>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Visual panel */}
          <div style={{ opacity: visible ? 1 : 0, transform: visible ? "translateX(0)" : "translateX(30px)", transition: "all 0.7s ease 0.2s" }}>
            <div style={{
              background: "var(--clr-bg-card)",
              border: "1px solid var(--clr-border)",
              borderRadius: "20px",
              padding: "2rem",
            }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", marginBottom: "1rem" }}>
                {[
                  { val: "4+", label: "Years of Experience", clr: "#6366f1" },
                  { val: "15+", label: "Team Members", clr: "#a855f7" },
                  { val: "12", label: "Countries Served", clr: "#f97316" },
                  { val: "∞", label: "Coffee Consumed", clr: "#22c55e" },
                ].map((card) => (
                  <div key={card.label} style={{
                    background: `${card.clr}10`,
                    border: `1px solid ${card.clr}25`,
                    borderRadius: "12px", padding: "1.25rem",
                    textAlign: "center",
                  }}>
                    <div style={{ fontSize: "2rem", fontWeight: 800, fontFamily: "var(--font-head)", color: card.clr }}>{card.val}</div>
                    <div style={{ fontSize: "0.78rem", color: "var(--clr-muted)", marginTop: "0.25rem" }}>{card.label}</div>
                  </div>
                ))}
              </div>
              <div style={{
                background: "rgba(99,102,241,0.08)", border: "1px solid rgba(99,102,241,0.2)",
                borderRadius: "12px", padding: "1rem 1.25rem",
                display: "flex", alignItems: "center", gap: "0.75rem",
              }}>
                <span className="pulse-dot" />
                <span style={{ fontSize: "0.88rem", color: "var(--clr-muted)" }}>
                  Currently onboarding <strong style={{ color: "var(--clr-text)" }}>2 new clients</strong> — limited spots available
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function TestimonialsSection() {
  const ref = useRef<HTMLDivElement>(null);
  const visible = useIntersection(ref);

  return (
    <section className="section">
      <div ref={ref} className="container">
        <div style={{ textAlign: "center", marginBottom: "3.5rem" }}>
          <p className="section-label" style={{ marginBottom: "0.75rem" }}>Testimonials</p>
          <h2 style={{ fontSize: "clamp(2rem, 4.5vw, 3rem)", fontWeight: 800 }}>
            Don&apos;t Take Our <span className="grad-text">Word For It</span>
          </h2>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "1.5rem" }}>
          {TESTIMONIALS.map((t, i) => (
            <div
              key={t.name}
              id={`testimonial-${i}`}
              className="glass-card"
              style={{
                padding: "2rem",
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0)" : "translateY(30px)",
                transition: `all 0.6s ease ${i * 0.15}s`,
              }}
            >
              <div style={{ display: "flex", gap: "2px", marginBottom: "1rem" }}>
                {[...Array(t.rating)].map((_, i) => <Icon.Star key={i} />)}
              </div>
              <p style={{ color: "var(--clr-muted)", lineHeight: 1.75, fontStyle: "italic", marginBottom: "1.5rem", fontSize: "0.95rem" }}>
                &ldquo;{t.text}&rdquo;
              </p>
              <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                <div style={{
                  width: "42px", height: "42px", borderRadius: "50%",
                  background: "linear-gradient(135deg, #6366f1, #a855f7)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: "0.7rem", fontWeight: 700, color: "#fff",
                }}>{t.avatar}</div>
                <div>
                  <div style={{ fontWeight: 600, fontSize: "0.95rem" }}>{t.name}</div>
                  <div style={{ color: "var(--clr-muted)", fontSize: "0.8rem" }}>{t.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function PricingSection() {
  const ref = useRef<HTMLDivElement>(null);
  const visible = useIntersection(ref);

  return (
    <section id="pricing" className="section" style={{ background: "rgba(255,255,255,0.015)", position: "relative" }}>
      <div className="section-glow" />
      <div ref={ref} className="container" style={{ position: "relative", zIndex: 1 }}>
        <div style={{ textAlign: "center", marginBottom: "3.5rem" }}>
          <p className="section-label" style={{ marginBottom: "0.75rem" }}>Pricing</p>
          <h2 style={{ fontSize: "clamp(2rem, 4.5vw, 3rem)", fontWeight: 800 }}>
            Transparent <span className="grad-text">Investment</span>
          </h2>
          <p style={{ color: "var(--clr-muted)", marginTop: "0.75rem" }}>No hidden fees. No surprises. Just results.</p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "1.5rem", alignItems: "stretch" }}>
          {PRICING.map((plan, i) => (
            <div
              key={plan.name}
              id={`plan-${plan.name.toLowerCase()}`}
              className="glass-card"
              style={{
                padding: "2rem",
                border: plan.highlight ? "1px solid rgba(99,102,241,0.5)" : "1px solid var(--clr-border)",
                boxShadow: plan.highlight ? "0 0 40px rgba(99,102,241,0.15)" : "none",
                position: "relative",
                display: "flex",
                flexDirection: "column",
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0)" : "translateY(30px)",
                transition: `all 0.6s ease ${i * 0.15}s`,
              }}
            >
              {plan.highlight && (
                <div style={{
                  position: "absolute", top: "-14px", left: "50%", transform: "translateX(-50%)",
                  background: "linear-gradient(135deg, #6366f1, #a855f7)",
                  padding: "0.3rem 1.2rem", borderRadius: "9999px",
                  fontSize: "0.75rem", fontWeight: 700, color: "#fff",
                  whiteSpace: "nowrap",
                }}>Most Popular</div>
              )}

              <div style={{ marginBottom: "1.5rem" }}>
                <h3 style={{ fontFamily: "var(--font-head)", fontSize: "1.25rem", fontWeight: 700, marginBottom: "0.4rem" }}>{plan.name}</h3>
                <p style={{ color: "var(--clr-muted)", fontSize: "0.88rem" }}>{plan.desc}</p>
              </div>

              <div style={{ marginBottom: "1.5rem" }}>
                <span style={{ fontFamily: "var(--font-head)", fontSize: "2.5rem", fontWeight: 800 }}>{plan.price}</span>
                <span style={{ color: "var(--clr-muted)", marginLeft: "0.4rem", fontSize: "0.9rem" }}>/ {plan.period}</span>
              </div>

              <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "0.65rem", marginBottom: "2rem", flex: 1 }}>
                {plan.features.map((f) => (
                  <li key={f} style={{ display: "flex", alignItems: "center", gap: "0.65rem", fontSize: "0.9rem", color: "var(--clr-muted)" }}>
                    <span style={{ color: "#22c55e", flexShrink: 0 }}><Icon.Check /></span>
                    {f}
                  </li>
                ))}
              </ul>

              <a
                href="#contact"
                className={plan.highlight ? "btn-primary" : "btn-secondary"}
                style={{ textAlign: "center", justifyContent: "center" }}
              >
                <span>{plan.cta}</span>
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ContactSection() {
  const ref = useRef<HTMLDivElement>(null);
  const visible = useIntersection(ref);
  const [formState, setFormState] = useState({ name: "", email: "", project: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);
    setFormState({ name: "", email: "", project: "", message: "" });
  };

  const inputStyle = {
    width: "100%",
    padding: "0.85rem 1rem",
    background: "rgba(255,255,255,0.04)",
    border: "1px solid var(--clr-border)",
    borderRadius: "10px",
    color: "var(--clr-text)",
    fontSize: "0.95rem",
    outline: "none",
    transition: "border-color 0.2s ease",
    fontFamily: "var(--font-body)",
  };

  return (
    <section id="contact" className="section">
      <div ref={ref} className="container">
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "4rem", alignItems: "start" }}>
          {/* Info side */}
          <div style={{ opacity: visible ? 1 : 0, transform: visible ? "translateX(0)" : "translateX(-30px)", transition: "all 0.7s ease" }}>
            <p className="section-label" style={{ marginBottom: "1.25rem" }}>Get In Touch</p>
            <h2 style={{ fontSize: "clamp(2rem, 4.5vw, 3rem)", fontWeight: 800, marginBottom: "1.25rem", lineHeight: 1.2 }}>
              Ready to Build{" "}
              <span className="grad-text">Something Great?</span>
            </h2>
            <p style={{ color: "var(--clr-muted)", lineHeight: 1.8, marginBottom: "2rem" }}>
              Tell us about your project. We respond within 24 hours and typically kick off discovery calls the same week.
            </p>

            <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              {[
                { icon: Icon.Mail, label: "Email", val: "hello@souravweb.dev" },
                { icon: Icon.Phone, label: "Phone", val: "+91 98765 43210" },
              ].map((contact) => (
                <div key={contact.label} style={{ display: "flex", alignItems: "center", gap: "0.85rem" }}>
                  <div style={{
                    width: "42px", height: "42px", borderRadius: "12px",
                    background: "rgba(99,102,241,0.12)",
                    border: "1px solid rgba(99,102,241,0.25)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    color: "var(--clr-primary-glow)", flexShrink: 0,
                  }}>
                    <contact.icon />
                  </div>
                  <div>
                    <div style={{ fontSize: "0.78rem", color: "var(--clr-subtle)", marginBottom: "1px" }}>{contact.label}</div>
                    <div style={{ fontSize: "0.95rem" }}>{contact.val}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Form */}
          <div style={{ opacity: visible ? 1 : 0, transform: visible ? "translateX(0)" : "translateX(30px)", transition: "all 0.7s ease 0.2s" }}>
            <div className="glass-card" style={{ padding: "2.5rem" }}>
              {submitted ? (
                <div style={{ textAlign: "center", padding: "2rem 0" }}>
                  <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>🎉</div>
                  <h3 style={{ fontFamily: "var(--font-head)", fontSize: "1.4rem", marginBottom: "0.75rem" }}>Message Sent!</h3>
                  <p style={{ color: "var(--clr-muted)" }}>We&apos;ll get back to you within 24 hours.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                    <div>
                      <label htmlFor="contact-name" style={{ display: "block", fontSize: "0.82rem", color: "var(--clr-muted)", marginBottom: "0.4rem" }}>Your Name</label>
                      <input
                        id="contact-name"
                        type="text"
                        required
                        placeholder="John Doe"
                        value={formState.name}
                        onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                        style={inputStyle}
                        onFocus={(e) => e.target.style.borderColor = "rgba(99,102,241,0.5)"}
                        onBlur={(e) => e.target.style.borderColor = "var(--clr-border)"}
                      />
                    </div>
                    <div>
                      <label htmlFor="contact-email" style={{ display: "block", fontSize: "0.82rem", color: "var(--clr-muted)", marginBottom: "0.4rem" }}>Email Address</label>
                      <input
                        id="contact-email"
                        type="email"
                        required
                        placeholder="john@company.com"
                        value={formState.email}
                        onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                        style={inputStyle}
                        onFocus={(e) => e.target.style.borderColor = "rgba(99,102,241,0.5)"}
                        onBlur={(e) => e.target.style.borderColor = "var(--clr-border)"}
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="contact-project" style={{ display: "block", fontSize: "0.82rem", color: "var(--clr-muted)", marginBottom: "0.4rem" }}>Project Type</label>
                    <select
                      id="contact-project"
                      required
                      value={formState.project}
                      onChange={(e) => setFormState({ ...formState, project: e.target.value })}
                      style={{ ...inputStyle, cursor: "pointer" }}
                      onFocus={(e) => e.target.style.borderColor = "rgba(99,102,241,0.5)"}
                      onBlur={(e) => e.target.style.borderColor = "var(--clr-border)"}
                    >
                      <option value="" disabled style={{ background: "#0d1224" }}>Select a service...</option>
                      <option value="web" style={{ background: "#0d1224" }}>Website Development</option>
                      <option value="webapp" style={{ background: "#0d1224" }}>Web Application / SaaS</option>
                      <option value="design" style={{ background: "#0d1224" }}>UI/UX Design</option>
                      <option value="ecommerce" style={{ background: "#0d1224" }}>E-Commerce</option>
                      <option value="other" style={{ background: "#0d1224" }}>Other</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="contact-message" style={{ display: "block", fontSize: "0.82rem", color: "var(--clr-muted)", marginBottom: "0.4rem" }}>Tell Us About Your Project</label>
                    <textarea
                      id="contact-message"
                      required
                      rows={4}
                      placeholder="Describe your vision, goals, timeline, budget..."
                      value={formState.message}
                      onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                      style={{ ...inputStyle, resize: "vertical", minHeight: "120px" }}
                      onFocus={(e) => e.target.style.borderColor = "rgba(99,102,241,0.5)"}
                      onBlur={(e) => e.target.style.borderColor = "var(--clr-border)"}
                    />
                  </div>

                  <button type="submit" id="contact-submit" className="btn-primary" style={{ justifyContent: "center" }}>
                    <span>Send Message</span>
                    <Icon.Arrow />
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function CtaBanner() {
  return (
    <div style={{
      background: "linear-gradient(135deg, rgba(99,102,241,0.15) 0%, rgba(168,85,247,0.15) 100%)",
      borderTop: "1px solid rgba(99,102,241,0.2)",
      borderBottom: "1px solid rgba(99,102,241,0.2)",
    }}>
      <div className="container" style={{ paddingBlock: "4.5rem", textAlign: "center" }}>
        <h2 style={{ fontSize: "clamp(1.8rem, 4vw, 2.8rem)", fontWeight: 800, marginBottom: "1rem" }}>
          Your next big thing{" "}
          <span className="grad-text">starts here.</span>
        </h2>
        <p style={{ color: "var(--clr-muted)", marginBottom: "2rem", fontSize: "1.05rem" }}>
          Limited spots available. Book your free discovery call today.
        </p>
        <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
          <a href="#contact" id="cta-banner-primary" className="btn-primary">
            <span>Book Free Call</span>
            <Icon.Arrow />
          </a>
          <a href="#services" id="cta-banner-secondary" className="btn-secondary">
            <span>Explore Services</span>
          </a>
        </div>
      </div>
    </div>
  );
}

function Footer() {
  return (
    <footer style={{ background: "var(--clr-bg-card)", borderTop: "1px solid var(--clr-border)", paddingBlock: "3rem" }}>
      <div className="container">
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "2.5rem", marginBottom: "2.5rem" }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "1rem" }}>
              <div style={{
                width: "34px", height: "34px",
                background: "linear-gradient(135deg, #6366f1, #a855f7)",
                borderRadius: "10px",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: "15px", fontWeight: 800, color: "#fff",
                fontFamily: "var(--font-head)",
              }}>S</div>
              <span style={{ fontFamily: "var(--font-head)", fontWeight: 700, fontSize: "0.95rem" }}>
                Sourav <span style={{ color: "var(--clr-primary-glow)" }}>Web</span>
              </span>
            </div>
            <p style={{ color: "var(--clr-muted)", fontSize: "0.88rem", lineHeight: 1.7 }}>
              Premium digital agency building products that drive growth.
            </p>
          </div>

          {[
            {
              title: "Services",
              links: ["Web Development", "UI/UX Design", "E-Commerce", "SEO & Analytics"],
            },
            {
              title: "Company",
              links: ["About Us", "Our Work", "Pricing", "Contact"],
            },
            {
              title: "Social",
              links: ["Twitter / X", "LinkedIn", "GitHub", "Dribbble"],
            },
          ].map((col) => (
            <div key={col.title}>
              <h4 style={{ fontFamily: "var(--font-head)", fontWeight: 600, fontSize: "0.88rem", marginBottom: "1rem", color: "var(--clr-text)" }}>{col.title}</h4>
              <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "0.6rem" }}>
                {col.links.map((link) => (
                  <li key={link}>
                    <a href="#" style={{ color: "var(--clr-muted)", fontSize: "0.88rem", cursor: "pointer", transition: "color 0.2s" }}
                      onMouseEnter={(e) => (e.currentTarget.style.color = "var(--clr-text)")}
                      onMouseLeave={(e) => (e.currentTarget.style.color = "var(--clr-muted)")}
                    >{link}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div style={{ borderTop: "1px solid var(--clr-border)", paddingTop: "1.5rem", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "1rem" }}>
          <p style={{ color: "var(--clr-subtle)", fontSize: "0.82rem" }}>
            © {new Date().getFullYear()} Sourav Web Solutions. All rights reserved.
          </p>
          <div style={{ display: "flex", gap: "1.5rem" }}>
            {["Privacy Policy", "Terms of Service"].map((l) => (
              <a key={l} href="#" style={{ color: "var(--clr-subtle)", fontSize: "0.82rem" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "var(--clr-muted)")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "var(--clr-subtle)")}
              >{l}</a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

/* ─────────────────────────────────────────────
   Main Page
──────────────────────────────────────────────── */
export default function Home() {
  return (
    <>
      <ParticleCanvas />
      <Navbar />
      <main style={{ position: "relative", zIndex: 1 }}>
        <HeroSection />
        <StatsSection />
        <ServicesSection />
        <TechMarquee />
        <PortfolioSection />
        <AboutSection />
        <TestimonialsSection />
        <PricingSection />
        <ContactSection />
        <CtaBanner />
      </main>
      <Footer />
    </>
  );
}
