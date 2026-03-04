import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useActor } from "@/hooks/useActor";
import { useMutation } from "@tanstack/react-query";
import {
  AlertCircle,
  ArrowRight,
  BadgeCheck,
  Briefcase,
  Building2,
  CheckCircle2,
  ClipboardList,
  Globe,
  HeartHandshake,
  HeartPulse,
  Home,
  IndianRupee,
  Loader2,
  Mail,
  MapPin,
  Menu,
  Phone,
  PhoneCall,
  ShieldCheck,
  UserCheck,
  Users,
  X,
  Zap,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";

// ── Types ──────────────────────────────────────────────────────
interface Enquiry {
  name: string;
  email: string;
  message: string;
  phoneNumber: string;
}

// ── Animation variants ─────────────────────────────────────────
const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.1, ease: "easeOut" as const },
  }),
};

const fadeIn = {
  hidden: { opacity: 0 },
  visible: (i = 0) => ({
    opacity: 1,
    transition: { duration: 0.5, delay: i * 0.08 },
  }),
};

// ── Scroll helper ─────────────────────────────────────────────
function scrollTo(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
}

// ─────────────────────────────────────────────────────────────
// NAVBAR
// ─────────────────────────────────────────────────────────────
function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const navLinks = [
    { id: "home", label: "Home", ocid: "nav.home.link" },
    { id: "about", label: "About", ocid: "nav.about.link" },
    { id: "services", label: "Services", ocid: "nav.services.link" },
    { id: "why-us", label: "Why Us", ocid: "nav.why-us.link" },
    { id: "process", label: "Process", ocid: "nav.process.link" },
    { id: "contact", label: "Contact", ocid: "nav.contact.link" },
  ];

  const handleNav = (id: string) => {
    scrollTo(id);
    setMenuOpen(false);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-navy-dark/97 backdrop-blur-md shadow-navy"
          : "bg-navy-dark/85 backdrop-blur-sm"
      }`}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <button
            type="button"
            onClick={() => handleNav("home")}
            className="flex items-center gap-3 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal rounded-lg"
          >
            <div className="w-9 h-9 rounded-xl bg-teal flex items-center justify-center shadow-teal group-hover:scale-105 transition-transform">
              <HeartPulse className="w-5 h-5 text-white" />
            </div>
            <div className="flex flex-col leading-none">
              <span className="font-display font-semibold text-white text-[0.95rem] tracking-tight">
                Vantage Healthcare
              </span>
              <span className="text-teal-light/80 text-[0.62rem] font-body tracking-widest uppercase">
                Solutions
              </span>
            </div>
          </button>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-0.5">
            {navLinks.map((link) => (
              <button
                type="button"
                key={link.id}
                data-ocid={link.ocid}
                onClick={() => handleNav(link.id)}
                className="px-3.5 py-2 text-sm font-body font-medium text-white/70 hover:text-teal-light transition-colors rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal"
              >
                {link.label}
              </button>
            ))}
            <Button
              onClick={() => handleNav("contact")}
              className="ml-3 bg-teal hover:bg-teal-dark text-white font-body font-semibold text-sm shadow-teal transition-all hover:shadow-lg"
              size="sm"
            >
              Get a Quote
            </Button>
          </div>

          {/* Mobile hamburger */}
          <button
            type="button"
            className="md:hidden p-2 text-white/70 hover:text-teal-light transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal rounded-lg"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
          >
            {menuOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </button>
        </div>

        {/* Mobile dropdown */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.22 }}
              className="md:hidden border-t border-white/10 overflow-hidden"
            >
              <div className="py-3 flex flex-col gap-0.5">
                {navLinks.map((link) => (
                  <button
                    type="button"
                    key={link.id}
                    data-ocid={link.ocid}
                    onClick={() => handleNav(link.id)}
                    className="w-full text-left px-4 py-3 text-sm font-body font-medium text-white/75 hover:text-teal-light hover:bg-white/5 transition-colors rounded-lg"
                  >
                    {link.label}
                  </button>
                ))}
                <div className="px-4 pt-2 pb-3">
                  <Button
                    onClick={() => handleNav("contact")}
                    className="w-full bg-teal hover:bg-teal-dark text-white font-body font-semibold"
                    size="sm"
                  >
                    Get a Quote
                  </Button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
}

// ─────────────────────────────────────────────────────────────
// HERO SECTION
// ─────────────────────────────────────────────────────────────
function HeroSection() {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center overflow-hidden bg-navy-dark"
    >
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage:
            "url('/assets/generated/hero-staffing.dim_1400x700.jpg')",
        }}
      />
      {/* Dark overlay layers */}
      <div className="absolute inset-0 bg-gradient-to-r from-navy-dark/96 via-navy-dark/82 to-navy-dark/55" />
      <div className="absolute inset-0 bg-gradient-to-t from-navy-dark/70 via-transparent to-transparent" />

      {/* Decorative teal accent line */}
      <div className="absolute left-0 top-1/3 -translate-y-1/2 w-1.5 h-56 bg-gradient-to-b from-transparent via-teal to-transparent rounded-full" />

      {/* Subtle dot grid */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "radial-gradient(circle, oklch(0.98 0 0) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 pt-40">
        <div className="max-w-3xl">
          {/* Tag pill */}
          <motion.div
            custom={0}
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-teal/40 bg-teal/10 mb-8"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-teal animate-pulse-glow" />
            <span className="text-teal-light text-xs font-body font-medium tracking-wider uppercase">
              Your Trusted Partner in Healthcare Workforce Management
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            custom={1}
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            className="font-display text-4xl sm:text-5xl lg:text-[3.5rem] font-semibold text-white leading-[1.12] tracking-tight mb-6"
          >
            Delivering Trusted{" "}
            <span className="text-teal-light italic">Healthcare Staffing</span>
            <br />& Workforce Solutions
          </motion.h1>

          {/* Subtext */}
          <motion.p
            custom={2}
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            className="font-body text-lg text-white/65 leading-relaxed mb-10 max-w-2xl"
          >
            We provide reliable, qualified, and professional healthcare staff to
            hospitals, clinics, diagnostic centers, and healthcare institutions
            across India.
          </motion.p>

          {/* CTAs */}
          <motion.div
            custom={3}
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            className="flex flex-col sm:flex-row gap-4"
          >
            <Button
              data-ocid="hero.primary_button"
              onClick={() => scrollTo("contact")}
              size="lg"
              className="bg-teal hover:bg-teal-dark text-white font-body font-bold text-base shadow-teal hover:shadow-lg transition-all hover:scale-[1.02] group"
            >
              Get a Quote
              <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Button>
            <Button
              data-ocid="hero.secondary_button"
              onClick={() => scrollTo("services")}
              variant="outline"
              size="lg"
              className="border-white/30 text-white hover:bg-white/10 hover:border-teal/50 font-body font-medium text-base bg-transparent"
            >
              Our Services
            </Button>
          </motion.div>

          {/* Stats row */}
          <motion.div
            custom={4}
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            className="mt-16 flex flex-wrap gap-8"
          >
            {[
              { value: "500+", label: "Healthcare Staff Placed" },
              { value: "50+", label: "Partner Hospitals" },
              { value: "24/7", label: "Support Available" },
              { value: "100%", label: "Background Verified" },
            ].map((stat) => (
              <div key={stat.label} className="flex flex-col">
                <span className="font-display text-2xl font-semibold text-teal-light">
                  {stat.value}
                </span>
                <span className="font-body text-xs text-white/45 mt-0.5 uppercase tracking-wide">
                  {stat.label}
                </span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────
// ABOUT SECTION
// ─────────────────────────────────────────────────────────────
function AboutSection() {
  return (
    <section id="about" className="py-24 px-4 sm:px-6 lg:px-8 bg-background">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left: text */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={fadeUp}
          >
            <span className="inline-block px-3 py-1 text-xs font-body font-semibold uppercase tracking-widest text-teal bg-teal/10 rounded-full mb-5 border border-teal/20">
              About Us
            </span>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-semibold text-foreground mb-6 leading-tight">
              About Vantage{" "}
              <span className="text-teal italic">Healthcare Solutions</span>
            </h2>
            <p className="font-body text-muted-foreground text-base leading-relaxed mb-4">
              Vantage Healthcare Solutions is a professional healthcare staffing
              and workforce management company dedicated to supporting hospitals
              and medical institutions with skilled and trained healthcare
              professionals.
            </p>
            <p className="font-body text-muted-foreground text-base leading-relaxed">
              We understand the importance of quality patient care. Our mission
              is to bridge the gap between healthcare institutions and qualified
              professionals by providing dependable, efficient, and
              cost-effective staffing solutions.
            </p>

            <div className="mt-8">
              <Button
                onClick={() => scrollTo("contact")}
                className="bg-navy hover:bg-navy-light text-white font-body font-semibold shadow-navy transition-all group"
              >
                Partner With Us
                <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </div>
          </motion.div>

          {/* Right: Vision & Mission cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-60px" }}
              variants={fadeUp}
              custom={0}
              className="bg-navy-dark rounded-2xl p-7 flex flex-col gap-4 shadow-navy"
            >
              <div className="w-12 h-12 rounded-xl bg-teal/15 border border-teal/25 flex items-center justify-center">
                <HeartPulse className="w-6 h-6 text-teal-light" />
              </div>
              <h3 className="font-display text-xl font-semibold text-white">
                Our Vision
              </h3>
              <p className="font-body text-white/65 text-sm leading-relaxed">
                To become a leading healthcare staffing partner known for
                reliability, quality service, and long-term client
                relationships.
              </p>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-60px" }}
              variants={fadeUp}
              custom={1}
              className="bg-teal rounded-2xl p-7 flex flex-col gap-4 shadow-teal"
            >
              <div className="w-12 h-12 rounded-xl bg-white/15 border border-white/20 flex items-center justify-center">
                <HeartHandshake className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-display text-xl font-semibold text-white">
                Our Mission
              </h3>
              <p className="font-body text-white/80 text-sm leading-relaxed">
                To deliver competent healthcare professionals while maintaining
                the highest standards of ethics, compliance, and patient care.
              </p>
            </motion.div>

            {/* Wide stat card spanning both columns */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-60px" }}
              variants={fadeUp}
              custom={2}
              className="sm:col-span-2 bg-secondary/80 border border-border rounded-2xl p-6 flex items-center gap-5"
            >
              <div className="w-12 h-12 rounded-xl bg-teal/10 border border-teal/20 flex items-center justify-center flex-shrink-0">
                <BadgeCheck className="w-6 h-6 text-teal" />
              </div>
              <div>
                <p className="font-display text-base font-semibold text-foreground">
                  Pune, Maharashtra Based
                </p>
                <p className="font-body text-sm text-muted-foreground mt-0.5">
                  Serving healthcare institutions across India with trained,
                  verified professionals.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────
// SERVICES SECTION
// ─────────────────────────────────────────────────────────────
const servicesData = [
  {
    id: 1,
    icon: UserCheck,
    title: "Healthcare Staffing Solutions",
    description:
      "We source, screen, and deploy qualified nursing and allied health staff tailored to your institution's requirements.",
    items: [
      "Nurses (GNM, BSc Nursing)",
      "ICU / OT Staff",
      "Ward Boys & Support Staff",
      "Lab Technicians",
      "Pharmacists",
      "Radiology Technicians",
      "Home Healthcare Staff",
    ],
    accent: "teal",
  },
  {
    id: 2,
    icon: Building2,
    title: "Hospital Workforce Management",
    description:
      "Flexible engagement models to match your hospital's evolving workforce needs — from temporary cover to permanent placements.",
    items: [
      "Contract Staffing",
      "Temporary & Permanent Placement",
      "Bulk Hiring Support",
      "Emergency Staffing Solutions",
    ],
    accent: "navy",
  },
  {
    id: 3,
    icon: Home,
    title: "Home Healthcare Services",
    description:
      "Professional caregivers and nurses who bring compassionate, clinical-grade care directly to patients at home.",
    items: ["Home Nurses", "Caretakers", "Elderly Care", "Post-Surgery Care"],
    accent: "gold",
  },
];

function ServicesSection() {
  return (
    <section
      id="services"
      className="py-24 px-4 sm:px-6 lg:px-8 bg-navy-dark relative overflow-hidden"
    >
      {/* Background decorations */}
      <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-teal/5 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-72 h-72 rounded-full bg-navy-light/10 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto relative">
        {/* Header */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={fadeUp}
          className="text-center mb-16"
        >
          <span className="inline-block px-3 py-1 text-xs font-body font-semibold uppercase tracking-widest text-teal-light bg-teal/10 rounded-full mb-4 border border-teal/20">
            Our Services
          </span>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-semibold text-white mb-4">
            Complete Healthcare{" "}
            <span className="text-teal-light italic">Staffing Solutions</span>
          </h2>
          <p className="font-body text-white/60 max-w-xl mx-auto text-base">
            From ICU specialists to home caregivers — we deliver the right
            professionals at the right time.
          </p>
        </motion.div>

        {/* Service cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {servicesData.map((service, i) => {
            const Icon = service.icon;
            const isTeal = service.accent === "teal";
            const isNavy = service.accent === "navy";

            return (
              <motion.div
                key={service.id}
                data-ocid={`services.item.${service.id}`}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-60px" }}
                variants={fadeUp}
                whileHover={{ y: -6, transition: { duration: 0.2 } }}
                className={`rounded-2xl p-7 flex flex-col gap-5 border transition-shadow duration-300 ${
                  isTeal
                    ? "bg-teal/12 border-teal/25 hover:border-teal/50 hover:shadow-teal"
                    : isNavy
                      ? "bg-white/5 border-white/10 hover:border-white/20 hover:shadow-navy"
                      : "bg-gold/8 border-gold/20 hover:border-gold/40"
                }`}
              >
                {/* Icon */}
                <div
                  className={`w-13 h-13 w-[3.25rem] h-[3.25rem] rounded-xl flex items-center justify-center ${
                    isTeal
                      ? "bg-teal/20 border border-teal/30"
                      : isNavy
                        ? "bg-white/10 border border-white/15"
                        : "bg-gold/15 border border-gold/25"
                  }`}
                >
                  <Icon
                    className={`w-6 h-6 ${isTeal ? "text-teal-light" : isNavy ? "text-white/80" : "text-gold"}`}
                  />
                </div>

                {/* Title */}
                <div>
                  <h3 className="font-display text-xl font-semibold text-white mb-2">
                    {service.title}
                  </h3>
                  <p className="font-body text-sm text-white/55 leading-relaxed">
                    {service.description}
                  </p>
                </div>

                {/* Item list */}
                <ul className="flex flex-col gap-2 mt-auto">
                  {service.items.map((item) => (
                    <li key={item} className="flex items-center gap-2.5">
                      <CheckCircle2
                        className={`w-4 h-4 flex-shrink-0 ${
                          isTeal
                            ? "text-teal-light"
                            : isNavy
                              ? "text-white/50"
                              : "text-gold"
                        }`}
                      />
                      <span className="font-body text-sm text-white/70">
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────
// WHY CHOOSE US SECTION
// ─────────────────────────────────────────────────────────────
const whyUsItems = [
  {
    id: 1,
    icon: ShieldCheck,
    title: "Verified & Qualified Professionals",
    desc: "Every staff member is credential-checked and registered with their respective boards.",
  },
  {
    id: 2,
    icon: Zap,
    title: "Quick Deployment",
    desc: "Rapid response to urgent staffing needs — available within 24–48 hours.",
  },
  {
    id: 3,
    icon: IndianRupee,
    title: "Affordable & Transparent Pricing",
    desc: "No hidden charges. Competitive rates with full pricing clarity upfront.",
  },
  {
    id: 4,
    icon: PhoneCall,
    title: "24/7 Support",
    desc: "Our operations team is available around the clock for any staffing emergencies.",
  },
  {
    id: 5,
    icon: ClipboardList,
    title: "Strict Background Verification",
    desc: "Thorough police verification, reference checks, and document authentication.",
  },
  {
    id: 6,
    icon: Users,
    title: "Client-Focused Approach",
    desc: "Dedicated account managers ensure your requirements are always met on time.",
  },
];

function WhyUsSection() {
  return (
    <section id="why-us" className="py-24 px-4 sm:px-6 lg:px-8 bg-background">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={fadeUp}
          className="text-center mb-16"
        >
          <span className="inline-block px-3 py-1 text-xs font-body font-semibold uppercase tracking-widest text-teal bg-teal/10 rounded-full mb-4 border border-teal/20">
            Why Choose Us
          </span>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-semibold text-foreground mb-4">
            Why Choose <span className="text-teal italic">Vantage?</span>
          </h2>
          <p className="font-body text-muted-foreground max-w-xl mx-auto text-base">
            At Vantage Healthcare Solutions, we focus on reliability,
            professionalism, and long-term partnerships.
          </p>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {whyUsItems.map((item, i) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.id}
                data-ocid={`why-us.item.${item.id}`}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-60px" }}
                variants={fadeUp}
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
                className="bg-card border border-border/60 rounded-2xl p-6 flex flex-col gap-4 shadow-card hover:shadow-card-hover transition-shadow duration-300 group"
              >
                <div className="w-12 h-12 rounded-xl bg-teal/10 border border-teal/20 flex items-center justify-center group-hover:bg-teal/15 transition-colors">
                  <Icon className="w-6 h-6 text-teal" />
                </div>
                <div>
                  <h3 className="font-display text-base font-semibold text-foreground mb-1.5">
                    {item.title}
                  </h3>
                  <p className="font-body text-sm text-muted-foreground leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────
// INDUSTRIES WE SERVE SECTION
// ─────────────────────────────────────────────────────────────
const industries = [
  { id: 1, label: "Multi-Specialty Hospitals", icon: Building2 },
  { id: 2, label: "Nursing Homes", icon: HeartPulse },
  { id: 3, label: "Clinics", icon: Briefcase },
  { id: 4, label: "Diagnostic Centers", icon: ClipboardList },
  { id: 5, label: "Rehabilitation Centers", icon: UserCheck },
  { id: 6, label: "Home Healthcare Clients", icon: Home },
];

function IndustriesSection() {
  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 bg-secondary/40">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={fadeUp}
          className="text-center mb-14"
        >
          <span className="inline-block px-3 py-1 text-xs font-body font-semibold uppercase tracking-widest text-teal bg-teal/10 rounded-full mb-4 border border-teal/20">
            Industries We Serve
          </span>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-semibold text-foreground mb-4">
            Trusted Across <span className="text-teal italic">Healthcare</span>
          </h2>
          <p className="font-body text-muted-foreground max-w-lg mx-auto text-base">
            Our staffing solutions serve the full spectrum of healthcare
            delivery.
          </p>
        </motion.div>

        {/* Tile grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {industries.map((ind, i) => {
            const Icon = ind.icon;
            return (
              <motion.div
                key={ind.id}
                data-ocid={`industries.item.${ind.id}`}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-60px" }}
                variants={fadeIn}
                whileHover={{ scale: 1.04, transition: { duration: 0.18 } }}
                className="bg-card border border-border/60 rounded-2xl p-5 flex flex-col items-center gap-3 text-center shadow-card hover:shadow-card-hover hover:border-teal/30 transition-all duration-200 cursor-default group"
              >
                <div className="w-11 h-11 rounded-xl bg-teal/10 border border-teal/15 flex items-center justify-center group-hover:bg-teal/18 transition-colors">
                  <Icon className="w-5 h-5 text-teal" />
                </div>
                <span className="font-body text-xs font-semibold text-foreground/80 leading-snug">
                  {ind.label}
                </span>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────
// OUR PROCESS SECTION
// ─────────────────────────────────────────────────────────────
const processSteps = [
  {
    id: 1,
    title: "Requirement Understanding",
    desc: "We begin by thoroughly understanding your staffing requirements, timelines, and institutional standards.",
  },
  {
    id: 2,
    title: "Candidate Screening & Verification",
    desc: "Our team screens candidates against your criteria — verifying credentials, experience, and conduct records.",
  },
  {
    id: 3,
    title: "Interview & Selection",
    desc: "Shortlisted candidates go through a structured interview process, ensuring only the best reach you.",
  },
  {
    id: 4,
    title: "Quick Deployment",
    desc: "Approved professionals are deployed within agreed timelines with all documentation in order.",
  },
  {
    id: 5,
    title: "Ongoing Support & Monitoring",
    desc: "Post-placement, we provide continuous performance monitoring and replacement support as needed.",
  },
];

function ProcessSection() {
  return (
    <section
      id="process"
      className="py-24 px-4 sm:px-6 lg:px-8 bg-navy-dark relative overflow-hidden"
    >
      {/* Background decoration */}
      <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-teal/4 blur-3xl pointer-events-none" />

      <div className="max-w-5xl mx-auto relative">
        {/* Header */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={fadeUp}
          className="text-center mb-16"
        >
          <span className="inline-block px-3 py-1 text-xs font-body font-semibold uppercase tracking-widest text-teal-light bg-teal/10 rounded-full mb-4 border border-teal/20">
            Our Process
          </span>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-semibold text-white mb-4">
            How We <span className="text-teal-light italic">Work</span>
          </h2>
          <p className="font-body text-white/55 max-w-lg mx-auto text-base">
            A streamlined 5-step process ensuring reliable, fast, and quality
            staff delivery.
          </p>
        </motion.div>

        {/* Steps */}
        <div className="relative flex flex-col gap-0">
          {processSteps.map((step, i) => (
            <motion.div
              key={step.id}
              data-ocid={`process.item.${step.id}`}
              custom={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-60px" }}
              variants={fadeUp}
              className="flex gap-6 group"
            >
              {/* Left: number + connector */}
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 rounded-full bg-teal/15 border-2 border-teal/40 flex items-center justify-center flex-shrink-0 group-hover:bg-teal/25 group-hover:border-teal/60 transition-all">
                  <span className="font-display text-lg font-semibold text-teal-light">
                    {step.id}
                  </span>
                </div>
                {i < processSteps.length - 1 && (
                  <div className="w-0.5 flex-1 min-h-[3rem] bg-gradient-to-b from-teal/30 to-teal/10 mt-2 mb-2" />
                )}
              </div>

              {/* Right: content */}
              <div
                className={`pb-10 ${i === processSteps.length - 1 ? "pb-0" : ""}`}
              >
                <h3 className="font-display text-xl font-semibold text-white mb-2 group-hover:text-teal-light transition-colors">
                  {step.title}
                </h3>
                <p className="font-body text-sm text-white/55 leading-relaxed">
                  {step.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────
// CONTACT SECTION
// ─────────────────────────────────────────────────────────────
function ContactSection() {
  const { actor } = useActor();
  const [form, setForm] = useState({
    name: "",
    phoneNumber: "",
    email: "",
    message: "",
  });
  const [errors, setErrors] = useState<Partial<typeof form>>({});

  const mutation = useMutation({
    mutationFn: async (data: Enquiry) => {
      if (!actor) throw new Error("Service unavailable. Please try again.");
      await actor.submitEnquiry(data);
    },
  });

  const validate = () => {
    const e: Partial<typeof form> = {};
    if (!form.name.trim()) e.name = "Full name is required.";
    if (!form.phoneNumber.trim()) e.phoneNumber = "Phone number is required.";
    else if (!/^\+?[\d\s\-()]{7,15}$/.test(form.phoneNumber.trim()))
      e.phoneNumber = "Enter a valid phone number.";
    if (!form.email.trim()) e.email = "Email address is required.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim()))
      e.email = "Enter a valid email address.";
    if (!form.message.trim()) e.message = "Message is required.";
    return e;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    setErrors({});
    mutation.mutate({
      name: form.name.trim(),
      phoneNumber: form.phoneNumber.trim(),
      email: form.email.trim(),
      message: form.message.trim(),
    });
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof typeof errors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const contactDetails = [
    {
      icon: MapPin,
      label: "Address",
      value: "Pune, Maharashtra",
    },
    {
      icon: Phone,
      label: "Phone",
      value: "+91-9881783462",
    },
    {
      icon: Mail,
      label: "Email",
      value: "vantagehealth2022@gmail.com",
    },
    {
      icon: Globe,
      label: "Website",
      value: "www.vantagehealthcare.in",
    },
  ];

  return (
    <section id="contact" className="py-24 px-4 sm:px-6 lg:px-8 bg-background">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Left: contact info */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={fadeUp}
          >
            <span className="inline-block px-3 py-1 text-xs font-body font-semibold uppercase tracking-widest text-teal bg-teal/10 rounded-full mb-5 border border-teal/20">
              Contact Us
            </span>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-semibold text-foreground mb-6 leading-tight">
              Let's Work <span className="text-teal italic">Together</span>
            </h2>
            <p className="font-body text-muted-foreground text-base leading-relaxed mb-10">
              Reach out to our team with your staffing requirements. We'll
              respond within 24 business hours with a tailored workforce
              solution.
            </p>

            {/* Contact detail cards */}
            <div className="flex flex-col gap-3">
              {contactDetails.map((detail) => {
                const Icon = detail.icon;
                return (
                  <div
                    key={detail.label}
                    className="flex items-center gap-4 p-4 bg-secondary/70 rounded-xl border border-border/60 hover:border-teal/30 transition-colors"
                  >
                    <div className="w-10 h-10 rounded-lg bg-teal/10 border border-teal/20 flex items-center justify-center flex-shrink-0">
                      <Icon className="w-5 h-5 text-teal" />
                    </div>
                    <div>
                      <p className="font-body text-xs text-muted-foreground uppercase tracking-wide">
                        {detail.label}
                      </p>
                      <p className="font-body text-sm font-medium text-foreground mt-0.5">
                        {detail.value}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.div>

          {/* Right: enquiry form */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={fadeUp}
            custom={1}
          >
            <div className="bg-card rounded-2xl shadow-card border border-border/60 overflow-hidden">
              {/* Teal top accent */}
              <div className="h-1.5 w-full bg-gradient-to-r from-teal-dark via-teal to-teal-light" />

              <div className="p-8">
                <AnimatePresence mode="wait">
                  {mutation.isSuccess ? (
                    <motion.div
                      key="success"
                      data-ocid="contact.success_state"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.3 }}
                      className="py-12 text-center"
                    >
                      <div className="w-16 h-16 rounded-full bg-teal/10 border-2 border-teal/30 flex items-center justify-center mx-auto mb-5">
                        <CheckCircle2 className="w-8 h-8 text-teal" />
                      </div>
                      <h3 className="font-display text-2xl font-semibold text-foreground mb-3">
                        Enquiry Received!
                      </h3>
                      <p className="font-body text-muted-foreground text-sm leading-relaxed max-w-xs mx-auto mb-6">
                        Thank you for reaching out. Our team will review your
                        requirement and get back to you within 24 business
                        hours.
                      </p>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          mutation.reset();
                          setForm({
                            name: "",
                            phoneNumber: "",
                            email: "",
                            message: "",
                          });
                        }}
                        className="font-body text-sm"
                      >
                        Submit Another Enquiry
                      </Button>
                    </motion.div>
                  ) : (
                    <motion.form
                      key="form"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      onSubmit={handleSubmit}
                      noValidate
                      className="space-y-5"
                    >
                      <div className="mb-6">
                        <h3 className="font-display text-xl font-semibold text-foreground">
                          Send an Enquiry
                        </h3>
                        <p className="font-body text-sm text-muted-foreground mt-1">
                          All fields are required.
                        </p>
                      </div>

                      {/* Full Name */}
                      <div className="space-y-1.5">
                        <Label
                          htmlFor="name"
                          className="font-body text-sm font-medium text-foreground"
                        >
                          Full Name
                        </Label>
                        <Input
                          id="name"
                          name="name"
                          data-ocid="contact.name.input"
                          placeholder="e.g. Rajesh Sharma"
                          value={form.name}
                          onChange={handleChange}
                          autoComplete="name"
                          className={`font-body text-sm h-11 ${errors.name ? "border-destructive focus-visible:ring-destructive" : ""}`}
                        />
                        {errors.name && (
                          <p className="font-body text-xs text-destructive flex items-center gap-1">
                            <AlertCircle className="w-3.5 h-3.5" />
                            {errors.name}
                          </p>
                        )}
                      </div>

                      {/* Phone Number */}
                      <div className="space-y-1.5">
                        <Label
                          htmlFor="phoneNumber"
                          className="font-body text-sm font-medium text-foreground"
                        >
                          Phone Number
                        </Label>
                        <Input
                          id="phoneNumber"
                          name="phoneNumber"
                          data-ocid="contact.phone.input"
                          placeholder="+91 98817 83462"
                          value={form.phoneNumber}
                          onChange={handleChange}
                          autoComplete="tel"
                          type="tel"
                          className={`font-body text-sm h-11 ${errors.phoneNumber ? "border-destructive focus-visible:ring-destructive" : ""}`}
                        />
                        {errors.phoneNumber && (
                          <p className="font-body text-xs text-destructive flex items-center gap-1">
                            <AlertCircle className="w-3.5 h-3.5" />
                            {errors.phoneNumber}
                          </p>
                        )}
                      </div>

                      {/* Email */}
                      <div className="space-y-1.5">
                        <Label
                          htmlFor="email"
                          className="font-body text-sm font-medium text-foreground"
                        >
                          Email Address
                        </Label>
                        <Input
                          id="email"
                          name="email"
                          data-ocid="contact.email.input"
                          placeholder="rajesh@hospital.com"
                          value={form.email}
                          onChange={handleChange}
                          autoComplete="email"
                          type="email"
                          className={`font-body text-sm h-11 ${errors.email ? "border-destructive focus-visible:ring-destructive" : ""}`}
                        />
                        {errors.email && (
                          <p className="font-body text-xs text-destructive flex items-center gap-1">
                            <AlertCircle className="w-3.5 h-3.5" />
                            {errors.email}
                          </p>
                        )}
                      </div>

                      {/* Message */}
                      <div className="space-y-1.5">
                        <Label
                          htmlFor="message"
                          className="font-body text-sm font-medium text-foreground"
                        >
                          Message
                        </Label>
                        <Textarea
                          id="message"
                          name="message"
                          data-ocid="contact.message.textarea"
                          placeholder="Describe your staffing requirement — number of staff, type, location, duration..."
                          value={form.message}
                          onChange={handleChange}
                          rows={4}
                          className={`font-body text-sm resize-none ${errors.message ? "border-destructive focus-visible:ring-destructive" : ""}`}
                        />
                        {errors.message && (
                          <p className="font-body text-xs text-destructive flex items-center gap-1">
                            <AlertCircle className="w-3.5 h-3.5" />
                            {errors.message}
                          </p>
                        )}
                      </div>

                      {/* Error state */}
                      {mutation.isError && (
                        <div
                          data-ocid="contact.error_state"
                          className="flex items-center gap-2 p-3 bg-destructive/10 border border-destructive/20 rounded-lg"
                        >
                          <AlertCircle className="w-4 h-4 text-destructive flex-shrink-0" />
                          <p className="font-body text-xs text-destructive">
                            {mutation.error instanceof Error
                              ? mutation.error.message
                              : "Submission failed. Please try again."}
                          </p>
                        </div>
                      )}

                      {/* Submit */}
                      <Button
                        data-ocid="contact.submit_button"
                        type="submit"
                        disabled={mutation.isPending}
                        className="w-full h-11 bg-teal hover:bg-teal-dark text-white font-body font-semibold text-sm shadow-teal transition-all hover:scale-[1.01]"
                      >
                        {mutation.isPending ? (
                          <>
                            <Loader2
                              data-ocid="contact.loading_state"
                              className="mr-2 w-4 h-4 animate-spin"
                            />
                            Submitting Enquiry...
                          </>
                        ) : (
                          <>
                            Submit Enquiry
                            <ArrowRight className="ml-2 w-4 h-4" />
                          </>
                        )}
                      </Button>
                    </motion.form>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────
// FOOTER
// ─────────────────────────────────────────────────────────────
function Footer() {
  const year = new Date().getFullYear();

  const footerLinks = [
    { id: "home", label: "Home" },
    { id: "about", label: "About" },
    { id: "services", label: "Services" },
    { id: "why-us", label: "Why Us" },
    { id: "process", label: "Process" },
    { id: "contact", label: "Contact" },
  ];

  return (
    <footer className="bg-navy-dark border-t border-white/8 pt-14 pb-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-9 h-9 rounded-xl bg-teal flex items-center justify-center shadow-teal">
                <HeartPulse className="w-5 h-5 text-white" />
              </div>
              <div>
                <div className="font-display font-semibold text-white text-base">
                  Vantage Healthcare Solutions
                </div>
                <div className="font-body text-white/45 text-xs mt-0.5">
                  Complete Healthcare Staffing & Management Services
                </div>
              </div>
            </div>
            <p className="font-body text-sm text-white/45 leading-relaxed">
              Serving healthcare institutions across India with reliable,
              verified, and professionally trained workforce solutions.
            </p>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="font-display font-semibold text-white/80 text-sm mb-5 uppercase tracking-widest">
              Quick Links
            </h4>
            <nav className="flex flex-col gap-2.5">
              {footerLinks.map((link) => (
                <button
                  type="button"
                  key={link.id}
                  onClick={() => scrollTo(link.id)}
                  className="text-left font-body text-sm text-white/45 hover:text-teal-light transition-colors"
                >
                  {link.label}
                </button>
              ))}
            </nav>
          </div>

          {/* Contact info */}
          <div>
            <h4 className="font-display font-semibold text-white/80 text-sm mb-5 uppercase tracking-widest">
              Get in Touch
            </h4>
            <div className="flex flex-col gap-3">
              {[
                { icon: MapPin, text: "Pune, Maharashtra" },
                { icon: Phone, text: "+91-9881783462" },
                { icon: Mail, text: "vantagehealth2022@gmail.com" },
                { icon: Globe, text: "www.vantagehealthcare.in" },
              ].map((item) => {
                const Icon = item.icon;
                return (
                  <div key={item.text} className="flex items-center gap-2.5">
                    <Icon className="w-4 h-4 text-teal/70 flex-shrink-0" />
                    <span className="font-body text-xs text-white/45">
                      {item.text}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-white/8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <p className="font-body text-xs text-white/35">
              Vantage Healthcare Solutions © {year}. All Rights Reserved.
            </p>
            <div className="flex items-center gap-3">
              <button
                type="button"
                className="font-body text-xs text-white/30 hover:text-teal-light/60 transition-colors"
              >
                Privacy Policy
              </button>
              <span className="text-white/20">|</span>
              <button
                type="button"
                className="font-body text-xs text-white/30 hover:text-teal-light/60 transition-colors"
              >
                Terms & Conditions
              </button>
            </div>
          </div>
          <p className="font-body text-xs text-white/30">
            Built with <span className="text-teal/50">♥</span> using{" "}
            <a
              href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(
                typeof window !== "undefined" ? window.location.hostname : "",
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/30 hover:text-teal-light/60 transition-colors"
            >
              caffeine.ai
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}

// ─────────────────────────────────────────────────────────────
// APP ROOT
// ─────────────────────────────────────────────────────────────
export default function App() {
  return (
    <div className="min-h-screen font-body bg-background">
      <Navbar />
      <main>
        <HeroSection />
        <AboutSection />
        <ServicesSection />
        <WhyUsSection />
        <IndustriesSection />
        <ProcessSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}
