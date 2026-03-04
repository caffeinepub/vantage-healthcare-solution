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
  BarChart3,
  Building2,
  CheckCircle2,
  ClipboardCheck,
  FilePen,
  FileSearch,
  FileText,
  HeartPulse,
  Loader2,
  Mail,
  Menu,
  Phone,
  RefreshCw,
  Shield,
  X,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";

// ── Types ────────────────────────────────────────────────────
interface Enquiry {
  name: string;
  email: string;
  message: string;
  phoneNumber: string;
}

// ── Fade-up animation variant ────────────────────────────────
const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, delay: i * 0.1, ease: "easeOut" as const },
  }),
};

// ── Service data ─────────────────────────────────────────────
const services = [
  {
    id: 1,
    icon: Shield,
    title: "GIC Renewal Management",
    description:
      "End-to-end management of Group Insurance Cover renewals — ensuring uninterrupted coverage and optimal policy terms for your organisation.",
    price: "₹75,000.00",
    priceLabel: "Fixed Fee",
    color: "from-navy to-navy-light",
    accentBg: "bg-accent/10",
    accentText: "text-accent-foreground",
  },
  {
    id: 2,
    icon: FileText,
    title: "Old Claims Recovery",
    description:
      "Systematic retrieval of long-pending or rejected historical claims through expert follow-up, documentation, and insurer coordination.",
    price: "15%",
    priceLabel: "on Settlement Amount",
    color: "from-teal-brand/90 to-teal-brand",
    accentBg: "bg-teal-brand/10",
    accentText: "text-foreground",
  },
  {
    id: 3,
    icon: ClipboardCheck,
    title: "Short Claim Approval Recovery",
    description:
      "Professional justification and appeal process for short-paid claims, recovering the rightful settlement amount from TPAs and insurers.",
    price: "10%",
    priceLabel: "on Settlement Amount",
    color: "from-gold to-gold-light",
    accentBg: "bg-gold/10",
    accentText: "text-foreground",
  },
];

// ── Scope items ──────────────────────────────────────────────
const scopeItems = [
  {
    icon: Building2,
    text: "Complete coordination with Insurance Companies & TPAs",
  },
  {
    icon: RefreshCw,
    text: "Follow-up for pending and rejected claims",
  },
  {
    icon: FileSearch,
    text: "Documentation review and compliance correction",
  },
  {
    icon: FilePen,
    text: "Justification submission for short claims",
  },
  {
    icon: BarChart3,
    text: "Regular MIS reporting",
  },
];

// ── Navbar ───────────────────────────────────────────────────
function Navbar({ onNav }: { onNav: (id: string) => void }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const navLinks = [
    { id: "home", label: "Home" },
    { id: "services", label: "Services" },
    { id: "scope", label: "Scope" },
    { id: "contact", label: "Contact" },
  ];

  const handleLink = (id: string) => {
    onNav(id);
    setMenuOpen(false);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-navy-dark/95 backdrop-blur-md shadow-navy"
          : "bg-navy-dark/80 backdrop-blur-sm"
      }`}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <button
            type="button"
            onClick={() => handleLink("home")}
            className="flex items-center gap-3 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold rounded"
          >
            <div className="w-9 h-9 rounded-lg bg-gold flex items-center justify-center shadow-gold group-hover:scale-105 transition-transform">
              <HeartPulse className="w-5 h-5 text-navy-dark" />
            </div>
            <div className="flex flex-col leading-none">
              <span className="font-display font-semibold text-white text-base tracking-wide">
                Vantage Healthcare
              </span>
              <span className="text-gold/80 text-[0.65rem] font-body tracking-widest uppercase">
                Solution
              </span>
            </div>
          </button>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <button
                type="button"
                key={link.id}
                data-ocid={`nav.${link.id}.link`}
                onClick={() => handleLink(link.id)}
                className="px-4 py-2 text-sm font-body font-medium text-white/80 hover:text-gold transition-colors rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
              >
                {link.label}
              </button>
            ))}
            <Button
              onClick={() => handleLink("contact")}
              className="ml-4 bg-gold hover:bg-gold-light text-navy-dark font-body font-semibold text-sm shadow-gold transition-all hover:shadow-md"
              size="sm"
            >
              Get Started
            </Button>
          </div>

          {/* Mobile menu button */}
          <button
            type="button"
            className="md:hidden p-2 text-white/80 hover:text-gold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold rounded"
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

        {/* Mobile menu */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25 }}
              className="md:hidden border-t border-white/10 overflow-hidden"
            >
              <div className="py-3 flex flex-col gap-1">
                {navLinks.map((link) => (
                  <button
                    type="button"
                    key={link.id}
                    data-ocid={`nav.${link.id}.link`}
                    onClick={() => handleLink(link.id)}
                    className="w-full text-left px-4 py-3 text-sm font-body font-medium text-white/80 hover:text-gold hover:bg-white/5 transition-colors rounded"
                  >
                    {link.label}
                  </button>
                ))}
                <div className="px-4 pt-2 pb-3">
                  <Button
                    onClick={() => handleLink("contact")}
                    className="w-full bg-gold hover:bg-gold-light text-navy-dark font-body font-semibold"
                    size="sm"
                  >
                    Get Started
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

// ── Hero ─────────────────────────────────────────────────────
function HeroSection({ onCta }: { onCta: () => void }) {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center overflow-hidden bg-navy-dark"
    >
      {/* Background image with overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage:
            "url('/assets/generated/hero-healthcare.dim_1400x700.jpg')",
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-navy-dark/95 via-navy-dark/80 to-navy-dark/50" />
      <div className="absolute inset-0 bg-gradient-to-t from-navy-dark/60 via-transparent to-transparent" />

      {/* Decorative gold line */}
      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-48 bg-gradient-to-b from-transparent via-gold to-transparent" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 pt-40">
        <div className="max-w-3xl">
          {/* Tag */}
          <motion.div
            custom={0}
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-gold/40 bg-gold/10 mb-6"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse" />
            <span className="text-gold text-xs font-body font-medium tracking-wider uppercase">
              Healthcare Claims Management Experts
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            custom={1}
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            className="font-display text-4xl sm:text-5xl lg:text-6xl font-semibold text-white leading-tight tracking-tight mb-6"
          >
            Maximise Your <span className="text-gold italic">Healthcare</span>
            <br />
            Claims Recovery
          </motion.h1>

          {/* Subhead */}
          <motion.p
            custom={2}
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            className="font-body text-lg text-white/70 leading-relaxed mb-10 max-w-xl"
          >
            Vantage Healthcare Solution provides expert coordination with
            insurance companies and TPAs — recovering your rightful settlements,
            managing renewals, and ensuring complete claim compliance.
          </motion.p>

          {/* CTA */}
          <motion.div
            custom={3}
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            className="flex flex-col sm:flex-row gap-4"
          >
            <Button
              data-ocid="hero.primary_button"
              onClick={onCta}
              size="lg"
              className="bg-gold hover:bg-gold-light text-navy-dark font-body font-bold text-base shadow-gold hover:shadow-lg transition-all hover:scale-[1.02] group"
            >
              Get in Touch
              <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Button>
            <Button
              onClick={() =>
                document
                  .getElementById("services")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
              variant="outline"
              size="lg"
              className="border-white/30 text-white hover:bg-white/10 hover:border-white/50 font-body font-medium text-base bg-transparent"
            >
              View Services
            </Button>
          </motion.div>

          {/* Stats row */}
          <motion.div
            custom={4}
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            className="mt-16 grid grid-cols-3 gap-6 max-w-xl"
          >
            {[
              { value: "100%", label: "Claim Follow-up" },
              { value: "15%", label: "Max Recovery Fee" },
              { value: "MIS", label: "Regular Reporting" },
            ].map((stat) => (
              <div key={stat.label} className="text-center sm:text-left">
                <div className="font-display text-2xl font-semibold text-gold">
                  {stat.value}
                </div>
                <div className="font-body text-xs text-white/50 mt-0.5 uppercase tracking-wide">
                  {stat.label}
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// ── Services ─────────────────────────────────────────────────
function ServicesSection() {
  return (
    <section id="services" className="py-24 px-4 sm:px-6 lg:px-8 bg-background">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={fadeUp}
          className="text-center mb-16"
        >
          <span className="inline-block px-3 py-1 text-xs font-body font-semibold uppercase tracking-widest text-gold bg-gold/10 rounded-full mb-4">
            Our Services
          </span>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-semibold text-foreground mb-4">
            Comprehensive Claims Solutions
          </h2>
          <p className="font-body text-muted-foreground max-w-xl mx-auto text-base">
            Transparent, performance-aligned pricing. We succeed only when you
            recover what's rightfully yours.
          </p>
        </motion.div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {services.map((service, i) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={service.id}
                data-ocid={`services.item.${service.id}`}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-60px" }}
                variants={fadeUp}
                whileHover={{ y: -6, transition: { duration: 0.25 } }}
                className="bg-card rounded-2xl shadow-card hover:shadow-card-hover transition-shadow duration-300 overflow-hidden flex flex-col border border-border/60"
              >
                {/* Top accent strip */}
                <div
                  className={`h-1.5 w-full bg-gradient-to-r ${service.color}`}
                />

                <div className="p-7 flex flex-col flex-1">
                  {/* Icon */}
                  <div
                    className={`w-12 h-12 rounded-xl ${service.accentBg} flex items-center justify-center mb-5`}
                  >
                    <Icon className="w-6 h-6 text-navy" />
                  </div>

                  {/* Title */}
                  <h3 className="font-display text-xl font-semibold text-foreground mb-3">
                    {service.title}
                  </h3>

                  {/* Description */}
                  <p className="font-body text-sm text-muted-foreground leading-relaxed flex-1 mb-6">
                    {service.description}
                  </p>

                  {/* Pricing badge */}
                  <div className="pt-4 border-t border-border/60 flex items-end justify-between">
                    <div>
                      <div className="font-display text-2xl font-semibold text-foreground">
                        {service.price}
                      </div>
                      <div className="font-body text-xs text-muted-foreground mt-0.5">
                        {service.priceLabel}
                      </div>
                    </div>
                    <Badge
                      variant="secondary"
                      className="bg-gold/10 text-navy font-body font-semibold text-xs border border-gold/20"
                    >
                      Active
                    </Badge>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// ── Scope of Services ─────────────────────────────────────────
function ScopeSection() {
  return (
    <section
      id="scope"
      data-ocid="scope.section"
      className="py-24 px-4 sm:px-6 lg:px-8 bg-navy-dark relative overflow-hidden"
    >
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-80 h-80 rounded-full bg-gold/5 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full bg-teal-brand/5 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left: text */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={fadeUp}
          >
            <span className="inline-block px-3 py-1 text-xs font-body font-semibold uppercase tracking-widest text-gold bg-gold/10 rounded-full mb-5 border border-gold/20">
              What We Deliver
            </span>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-semibold text-white mb-6 leading-tight">
              Scope of <span className="text-gold italic">Services</span>
            </h2>
            <p className="font-body text-white/60 text-base leading-relaxed mb-8">
              Every engagement includes end-to-end operational support — from
              initial documentation to final settlement — so your team can focus
              on patient care while we handle the complexities of claims
              management.
            </p>

            {/* Trust indicators */}
            <div className="flex flex-wrap gap-3">
              {[
                "TPA Coordination",
                "Legal Compliance",
                "Insurer Liaison",
                "MIS Reports",
              ].map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs font-body text-white/60"
                >
                  {tag}
                </span>
              ))}
            </div>
          </motion.div>

          {/* Right: scope list */}
          <div className="flex flex-col gap-4">
            {scopeItems.map((item, i) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.text}
                  custom={i}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-40px" }}
                  variants={fadeUp}
                  className="flex items-start gap-4 p-5 bg-white/5 border border-white/8 rounded-xl hover:bg-white/8 hover:border-gold/20 transition-all duration-200 group"
                >
                  <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-gold/10 border border-gold/20 flex items-center justify-center group-hover:bg-gold/20 transition-colors">
                    <Icon className="w-5 h-5 text-gold" />
                  </div>
                  <div className="flex items-center flex-1 min-h-[40px]">
                    <p className="font-body text-sm text-white/75 leading-snug group-hover:text-white/90 transition-colors">
                      {item.text}
                    </p>
                  </div>
                  <CheckCircle2 className="flex-shrink-0 w-4 h-4 text-gold/40 group-hover:text-gold/70 transition-colors mt-0.5" />
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

// ── Contact / Enquiry Form ────────────────────────────────────
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

  return (
    <section id="contact" className="py-24 px-4 sm:px-6 lg:px-8 bg-background">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Left: info */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={fadeUp}
          >
            <span className="inline-block px-3 py-1 text-xs font-body font-semibold uppercase tracking-widest text-gold bg-gold/10 rounded-full mb-5 border border-gold/20">
              Enquire Now
            </span>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-semibold text-foreground mb-6 leading-tight">
              Ready to Recover{" "}
              <span className="text-gold italic">What's Yours?</span>
            </h2>
            <p className="font-body text-muted-foreground text-base leading-relaxed mb-10">
              Reach out to our team and we'll assess your claims situation at no
              obligation. Our experts work across all major Indian insurance
              companies and TPAs.
            </p>

            {/* Contact details */}
            <div className="space-y-4">
              <div className="flex items-center gap-4 p-4 bg-secondary/60 rounded-xl border border-border/60">
                <div className="w-10 h-10 rounded-lg bg-gold/10 border border-gold/20 flex items-center justify-center flex-shrink-0">
                  <Phone className="w-5 h-5 text-gold" />
                </div>
                <div>
                  <p className="font-body text-xs text-muted-foreground uppercase tracking-wide">
                    Phone
                  </p>
                  <p className="font-body text-sm font-medium text-foreground">
                    +91 98765 43210
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-4 p-4 bg-secondary/60 rounded-xl border border-border/60">
                <div className="w-10 h-10 rounded-lg bg-gold/10 border border-gold/20 flex items-center justify-center flex-shrink-0">
                  <Mail className="w-5 h-5 text-gold" />
                </div>
                <div>
                  <p className="font-body text-xs text-muted-foreground uppercase tracking-wide">
                    Email
                  </p>
                  <p className="font-body text-sm font-medium text-foreground">
                    info@vantagehealthcare.in
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right: form */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={fadeUp}
            custom={1}
          >
            <div className="bg-card rounded-2xl shadow-card border border-border/60 overflow-hidden">
              <div className="h-1.5 w-full bg-gradient-to-r from-navy via-teal-brand to-gold" />

              <div className="p-8">
                <AnimatePresence mode="wait">
                  {mutation.isSuccess ? (
                    <motion.div
                      key="success"
                      data-ocid="contact.success_state"
                      initial={{ opacity: 0, scale: 0.96 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.96 }}
                      transition={{ duration: 0.35 }}
                      className="py-12 text-center"
                    >
                      <div className="w-16 h-16 rounded-full bg-green-50 border-2 border-green-200 flex items-center justify-center mx-auto mb-5">
                        <CheckCircle2 className="w-8 h-8 text-green-600" />
                      </div>
                      <h3 className="font-display text-2xl font-semibold text-foreground mb-3">
                        Enquiry Received!
                      </h3>
                      <p className="font-body text-muted-foreground text-sm leading-relaxed max-w-xs mx-auto mb-6">
                        Thank you for reaching out. Our team will review your
                        case and get back to you within 24 business hours.
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
                          placeholder="+91 98765 43210"
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
                          placeholder="rajesh@company.com"
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
                          placeholder="Briefly describe your claim situation or service requirement..."
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
                        className="w-full h-11 bg-navy hover:bg-navy-light text-white font-body font-semibold text-sm shadow-navy transition-all hover:scale-[1.01]"
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

// ── Footer ───────────────────────────────────────────────────
function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="bg-navy-dark border-t border-white/8 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          {/* Brand */}
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-gold flex items-center justify-center shadow-gold">
              <HeartPulse className="w-5 h-5 text-navy-dark" />
            </div>
            <div>
              <div className="font-display font-semibold text-white text-base">
                Vantage Healthcare Solution
              </div>
              <div className="font-body text-white/50 text-xs mt-0.5">
                Expert Claims & Insurance Management
              </div>
            </div>
          </div>

          {/* Quick links */}
          <nav className="flex flex-wrap gap-x-6 gap-y-2">
            {[
              { id: "home", label: "Home" },
              { id: "services", label: "Services" },
              { id: "scope", label: "Scope" },
              { id: "contact", label: "Contact" },
            ].map((link) => (
              <button
                type="button"
                key={link.id}
                onClick={() =>
                  document
                    .getElementById(link.id)
                    ?.scrollIntoView({ behavior: "smooth" })
                }
                className="font-body text-sm text-white/50 hover:text-gold transition-colors"
              >
                {link.label}
              </button>
            ))}
          </nav>
        </div>

        <div className="mt-8 pt-8 border-t border-white/8 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="font-body text-xs text-white/35">
            © {year} Vantage Healthcare Solution. All rights reserved.
          </p>
          <p className="font-body text-xs text-white/35">
            Built with <span className="text-gold/60">♥</span> using{" "}
            <a
              href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(
                typeof window !== "undefined" ? window.location.hostname : "",
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/40 hover:text-gold/60 transition-colors"
            >
              caffeine.ai
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}

// ── App root ─────────────────────────────────────────────────
export default function App() {
  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen font-body bg-background">
      <Navbar onNav={scrollTo} />
      <main>
        <HeroSection onCta={() => scrollTo("contact")} />
        <ServicesSection />
        <ScopeSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}
