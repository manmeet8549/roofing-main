import { useEffect, useState, useMemo, useCallback, memo } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Phone, ArrowRight, Shield, Award, Clock, CheckCircle } from "lucide-react";
import axios from "axios";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const fadeInUp = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-50px" },
  transition: { duration: 1, ease: [0.16, 1, 0.3, 1] }
};

const staggerContainer = {
  initial: {},
  whileInView: {
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1
    }
  }
};

const staggerItem = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
};

// Memoized feature cards
const FeatureCard = memo(function FeatureCard({ icon: Icon, title, desc }) {
  return (
    <motion.div
      variants={staggerItem}
      className="text-center p-8 border border-border hover:border-accent/30 transition-all duration-500 card-lift bg-white"
    >
      <div className="w-14 h-14 bg-accent/10 flex items-center justify-center mx-auto mb-6">
        <Icon className="w-7 h-7 text-accent" />
      </div>
      <h3 className="font-heading font-semibold text-lg text-primary mb-3">{title}</h3>
      <p className="text-muted text-sm leading-relaxed">{desc}</p>
    </motion.div>
  );
});

// Memoized service card
const ServiceCard = memo(function ServiceCard({ service }) {
  const [imageLoaded, setImageLoaded] = useState(false);
  
  return (
    <motion.div
      variants={staggerItem}
      className="group relative bg-white border border-border overflow-hidden card-lift"
    >
      <div className="aspect-[4/3] overflow-hidden bg-slate-100">
        {!imageLoaded && <div className="absolute inset-0 bg-slate-100 animate-pulse" />}
        <img
          src={service.image_url}
          alt={service.title}
          loading="lazy"
          decoding="async"
          onLoad={() => setImageLoaded(true)}
          className={`w-full h-full object-cover transition-all duration-700 ease-out group-hover:scale-110 ${
            imageLoaded ? 'opacity-100' : 'opacity-0'
          }`}
        />
      </div>
      <div className="p-6">
        <h3 className="font-heading font-semibold text-xl text-primary mb-3 group-hover:text-accent transition-colors duration-300">
          {service.title}
        </h3>
        <p className="text-muted text-sm leading-relaxed line-clamp-2">
          {service.description}
        </p>
      </div>
    </motion.div>
  );
});

// Memoized project card
const ProjectCard = memo(function ProjectCard({ project }) {
  const [imageLoaded, setImageLoaded] = useState(false);
  
  return (
    <motion.div
      variants={staggerItem}
      className="group relative aspect-[4/5] overflow-hidden cursor-pointer bg-slate-100"
    >
      {!imageLoaded && <div className="absolute inset-0 bg-slate-100 animate-pulse" />}
      <img
        src={project.image_url}
        alt={project.title}
        loading="lazy"
        decoding="async"
        onLoad={() => setImageLoaded(true)}
        className={`w-full h-full object-cover transition-all duration-700 ease-out group-hover:scale-110 ${
          imageLoaded ? 'opacity-100' : 'opacity-0'
        }`}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 ease-out">
        <div className="absolute bottom-0 left-0 right-0 p-6">
          <span className="text-accent text-xs font-bold tracking-wider uppercase mb-2 block">
            {project.category}
          </span>
          <h3 className="font-heading font-semibold text-white text-lg">
            {project.title}
          </h3>
        </div>
      </div>
    </motion.div>
  );
});

const features = [
  { icon: Shield, title: "Licensed & Insured", desc: "Fully licensed roofing contractor with comprehensive insurance coverage" },
  { icon: Award, title: "Quality Materials", desc: "We use premium Colorbond and BlueScope steel products" },
  { icon: Clock, title: "On-Time Delivery", desc: "Projects completed on schedule with minimal disruption" },
  { icon: CheckCircle, title: "Warranty", desc: "Comprehensive warranty on workmanship and materials" },
];

export default function Home() {
  const [services, setServices] = useState([]);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = useCallback(async () => {
    try {
      const [servicesRes, projectsRes] = await Promise.all([
        axios.get(`${API}/services`),
        axios.get(`${API}/projects`)
      ]);
      setServices(servicesRes.data.slice(0, 3));
      setProjects(projectsRes.data.slice(0, 4));
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <div data-testid="home-page">
      {/* Hero Section with Video Background */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden" data-testid="hero-section">
        {/* Hero Background Image */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://customer-assets.emergentagent.com/job_aussie-roof-pros/artifacts/v9tz2fvc_image.png"
            alt="Professional Roofing"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-primary/50 via-primary/60 to-primary/90"></div>
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.span
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="inline-block text-white text-4xl sm:text-5xl md:text-6xl font-bold tracking-wide mb-4"
          >
            22G Roofing Pty Ltd
          </motion.span>
          
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="font-heading text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-medium text-slate-200 tracking-tight leading-tight mb-6"
          >
            Premium Roofing
            <br />
            <span className="text-accent">Solutions in NSW</span>
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="text-slate-300 text-base md:text-lg max-w-2xl mx-auto mb-10"
          >
            Specializing in new roof installations and re-roofing for residential 
            and commercial projects. Built to Australian standards.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link
              to="/contact"
              className="btn-primary bg-accent text-white px-8 py-4 text-sm font-bold tracking-widest uppercase hover:bg-accent/90 transition-colors flex items-center gap-2"
              data-testid="hero-quote-btn"
            >
              Request a Quote
              <ArrowRight className="w-4 h-4" />
            </Link>
            <a
              href="tel:+61448046461"
              className="bg-white/10 backdrop-blur-sm border border-white/30 text-white px-8 py-4 text-sm font-bold tracking-widest uppercase hover:bg-white/20 transition-colors flex items-center gap-2"
              data-testid="hero-call-btn"
            >
              <Phone className="w-4 h-4" />
              Call Now
            </a>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center pt-2">
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
              className="w-1.5 h-1.5 bg-white rounded-full"
            />
          </div>
        </motion.div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-20 md:py-32 bg-white" data-testid="why-choose-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeInUp} className="text-center mb-16">
            <span className="text-accent text-sm font-bold tracking-widest uppercase mb-4 block">
              Why Choose Us
            </span>
            <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-primary tracking-tight">
              Built on Trust & Quality
            </h2>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {features.map((item) => (
              <FeatureCard key={item.title} {...item} />
            ))}
          </motion.div>
        </div>
      </section>

      {/* Services Preview */}
      <section className="py-20 md:py-32 bg-surface" data-testid="services-preview-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeInUp} className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div>
              <span className="text-accent text-sm font-bold tracking-widest uppercase mb-4 block">
                Our Services
              </span>
              <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-primary tracking-tight">
                What We Offer
              </h2>
            </div>
            <Link
              to="/services"
              className="text-accent font-medium flex items-center gap-2 hover:gap-3 transition-all"
              data-testid="view-all-services-link"
            >
              View All Services
              <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {loading ? (
              // Loading skeleton
              [...Array(3)].map((_, i) => (
                <div key={i} className="bg-white border border-border overflow-hidden">
                  <div className="aspect-[4/3] bg-slate-100 animate-pulse" />
                  <div className="p-6 space-y-3">
                    <div className="h-6 bg-slate-100 animate-pulse rounded w-3/4" />
                    <div className="h-4 bg-slate-100 animate-pulse rounded w-full" />
                  </div>
                </div>
              ))
            ) : (
              services.map((service) => (
                <ServiceCard key={service.id} service={service} />
              ))
            )}
          </motion.div>
        </div>
      </section>

      {/* Projects Preview */}
      <section className="py-20 md:py-32 bg-white" data-testid="projects-preview-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeInUp} className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div>
              <span className="text-accent text-sm font-bold tracking-widest uppercase mb-4 block">
                Our Work
              </span>
              <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-primary tracking-tight">
                Recent Projects
              </h2>
            </div>
            <Link
              to="/projects"
              className="text-accent font-medium flex items-center gap-2 hover:gap-3 transition-all"
              data-testid="view-all-projects-link"
            >
              View All Projects
              <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {loading ? (
              // Loading skeleton
              [...Array(4)].map((_, i) => (
                <div key={i} className="aspect-[4/5] bg-slate-100 animate-pulse" />
              ))
            ) : (
              projects.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))
            )}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 md:py-32 bg-primary" data-testid="cta-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div {...fadeInUp}>
            <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-white tracking-tight mb-6">
              Ready to Start Your Project?
            </h2>
            <p className="text-slate-300 text-base md:text-lg max-w-2xl mx-auto mb-10">
              Get in touch with our team for a free consultation and quote. 
              We're here to help bring your roofing vision to life.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                to="/contact"
                className="bg-accent text-white px-8 py-4 text-sm font-bold tracking-widest uppercase hover:bg-accent/90 transition-colors"
                data-testid="cta-quote-btn"
              >
                Get a Free Quote
              </Link>
              <a
                href="tel:+61448046461"
                className="bg-transparent border border-white/30 text-white px-8 py-4 text-sm font-bold tracking-widest uppercase hover:bg-white/10 transition-colors flex items-center gap-2"
                data-testid="cta-call-btn"
              >
                <Phone className="w-4 h-4" />
                +61 448 046 461
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
