import { useState, useEffect, useCallback } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Phone } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const LOGO_URL = "https://customer-assets.emergentagent.com/job_aussie-roof-pros/artifacts/6x02wug6_ChatGPT%20Image%20Feb%201%2C%202026%2C%2012_34_30%20AM.png";

const navLinks = [
  { name: "Home", path: "/" },
  { name: "About", path: "/about" },
  { name: "Services", path: "/services" },
  { name: "Projects", path: "/projects" },
  { name: "Contact", path: "/contact" },
];

const contacts = [
  { name: "Pavandeep Singh", phone: "+61 448 046 461" },
  { name: "Bhupendra Singh", phone: "+61 410 632 540" }
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currentContactIndex, setCurrentContactIndex] = useState(0);
  const location = useLocation();

  const handleScroll = useCallback(() => {
    setIsScrolled(window.scrollY > 50);
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setMobileMenuOpen(false);
  }, [location.pathname]);

  // Alternate between contacts every 4 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentContactIndex((prev) => (prev + 1) % contacts.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const isHome = location.pathname === "/";
  const currentContact = contacts[currentContactIndex];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled || !isHome
          ? "bg-white/95 backdrop-blur-lg shadow-lg border-b border-slate-100"
          : "bg-transparent"
      }`}
      data-testid="navbar"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 flex-shrink-0" data-testid="logo-link">
            <img
              src={LOGO_URL}
              alt="22G Roofing"
              className="h-12 w-auto"
              loading="eager"
            />
          </Link>

          {/* Desktop Navigation - Centered */}
          <nav className="hidden lg:flex items-center justify-center flex-1 mx-8" data-testid="desktop-nav">
            <div className="flex items-center gap-1 bg-slate-50/80 backdrop-blur-sm rounded-full px-2 py-1.5 border border-slate-200/50">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`relative px-5 py-2.5 text-sm font-semibold tracking-wide transition-all duration-300 rounded-full ${
                    location.pathname === link.path
                      ? "bg-accent text-white shadow-md"
                      : "text-slate-700 hover:text-accent hover:bg-white"
                  }`}
                  data-testid={`nav-link-${link.name.toLowerCase()}`}
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </nav>

          {/* CTA Button & Phone with alternating contacts */}
          <div className="hidden lg:flex items-center gap-6 flex-shrink-0">
            <a
              href={`tel:${currentContact.phone.replace(/\s/g, '')}`}
              className={`flex items-center gap-2 transition-colors duration-300 ${
                isScrolled || !isHome ? "text-slate-700 hover:text-accent" : "text-white hover:text-accent"
              }`}
              data-testid="phone-link"
            >
              <div className={`p-2 rounded-full transition-colors duration-300 ${
                isScrolled || !isHome ? "bg-accent/10" : "bg-white/20"
              }`}>
                <Phone className="w-4 h-4" />
              </div>
              <div className="flex flex-col items-start min-w-[140px]">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentContactIndex}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                    className="flex flex-col"
                  >
                    <span className="text-xs font-medium opacity-70">{currentContact.name}</span>
                    <span className="text-sm font-semibold">{currentContact.phone}</span>
                  </motion.div>
                </AnimatePresence>
              </div>
            </a>
            <Link
              to="/contact"
              className="bg-accent text-white px-6 py-3 text-sm font-bold tracking-wider uppercase hover:bg-accent/90 transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-0.5"
              data-testid="get-quote-btn"
            >
              Get Quote
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2 rounded-lg transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            data-testid="mobile-menu-btn"
          >
            {mobileMenuOpen ? (
              <X className={`w-6 h-6 ${isScrolled || !isHome ? "text-slate-800" : "text-white"}`} />
            ) : (
              <Menu className={`w-6 h-6 ${isScrolled || !isHome ? "text-slate-800" : "text-white"}`} />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="lg:hidden bg-white border-t border-slate-100 shadow-lg"
            data-testid="mobile-menu"
          >
            <nav className="flex flex-col py-4">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`px-6 py-4 text-sm font-semibold transition-colors ${
                    location.pathname === link.path
                      ? "text-accent bg-accent/5 border-l-4 border-accent"
                      : "text-slate-700 hover:bg-slate-50 border-l-4 border-transparent"
                  }`}
                  data-testid={`mobile-nav-link-${link.name.toLowerCase()}`}
                >
                  {link.name}
                </Link>
              ))}
              <div className="px-6 py-4 border-t border-slate-100 mt-2">
                {contacts.map((contact, index) => (
                  <a
                    key={index}
                    href={`tel:${contact.phone.replace(/\s/g, '')}`}
                    className="flex items-center gap-3 text-slate-700 font-semibold mb-3"
                  >
                    <div className="p-2 bg-accent/10 rounded-full">
                      <Phone className="w-4 h-4 text-accent" />
                    </div>
                    <div>
                      <span className="text-xs text-slate-500 block">{contact.name}</span>
                      <span>{contact.phone}</span>
                    </div>
                  </a>
                ))}
                <Link
                  to="/contact"
                  className="block w-full bg-accent text-white text-center px-6 py-3.5 text-sm font-bold tracking-wider uppercase shadow-lg mt-4"
                  data-testid="mobile-get-quote-btn"
                >
                  Get Quote
                </Link>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
