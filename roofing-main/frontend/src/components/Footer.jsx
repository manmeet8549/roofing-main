import { Link } from "react-router-dom";
import { Phone, Mail, MapPin, Navigation } from "lucide-react";
import { memo } from "react";

const LOGO_URL = "https://customer-assets.emergentagent.com/job_aussie-roof-pros/artifacts/6x02wug6_ChatGPT%20Image%20Feb%201%2C%202026%2C%2012_34_30%20AM.png";
const GOOGLE_MAPS_URL = "https://www.google.com/maps/search/?api=1&query=12+Bedford+Road+Blacktown+NSW+2148+Australia";

const Footer = memo(function Footer() {
  return (
    <footer className="bg-primary text-white" data-testid="footer">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <img
              src={LOGO_URL}
              alt="22G Roofing"
              className="h-16 w-auto mb-6 bg-white p-2 rounded-lg"
              loading="lazy"
            />
            <p className="text-slate-300 text-sm leading-relaxed mb-6 max-w-md">
              Premium roofing solutions for residential and commercial projects across NSW. 
              Specializing in new roof installations, re-roofing, and metal roofing systems 
              built to Australian standards.
            </p>
            <div className="flex flex-col gap-3">
              <a 
                href={GOOGLE_MAPS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-slate-300 hover:text-accent transition-colors group"
                data-testid="footer-address-link"
              >
                <MapPin className="w-4 h-4 text-accent flex-shrink-0" />
                <span className="text-sm group-hover:underline">12 Bedford Road, Blacktown NSW 2148</span>
                <Navigation className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
              </a>
              <a 
                href="mailto:sales22groofing@outlook.com" 
                className="flex items-center gap-3 text-slate-300 hover:text-accent transition-colors"
                data-testid="footer-email-link"
              >
                <Mail className="w-4 h-4 text-accent flex-shrink-0" />
                <span className="text-sm">sales22groofing@outlook.com</span>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-heading font-semibold text-lg mb-6">Quick Links</h4>
            <nav className="flex flex-col gap-3">
              <Link to="/" className="text-slate-300 text-sm hover:text-accent transition-colors">Home</Link>
              <Link to="/about" className="text-slate-300 text-sm hover:text-accent transition-colors">About Us</Link>
              <Link to="/services" className="text-slate-300 text-sm hover:text-accent transition-colors">Services</Link>
              <Link to="/projects" className="text-slate-300 text-sm hover:text-accent transition-colors">Projects</Link>
              <Link to="/contact" className="text-slate-300 text-sm hover:text-accent transition-colors">Contact</Link>
            </nav>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-heading font-semibold text-lg mb-6">Call Us Now</h4>
            <div className="flex flex-col gap-4">
              <div>
                <p className="text-sm text-accent font-medium mb-1">Pavandeep Singh (Director)</p>
                <a 
                  href="tel:+61448046461" 
                  className="flex items-center gap-2 text-white hover:text-accent transition-colors group"
                  data-testid="footer-phone-pavandeep"
                >
                  <Phone className="w-4 h-4 group-hover:animate-pulse" />
                  <span className="text-lg font-semibold">+61 448 046 461</span>
                </a>
              </div>
              <div>
                <p className="text-sm text-accent font-medium mb-1">Bhupendra Singh (Director)</p>
                <a 
                  href="tel:+61410632540" 
                  className="flex items-center gap-2 text-white hover:text-accent transition-colors group"
                  data-testid="footer-phone-bhupendra"
                >
                  <Phone className="w-4 h-4 group-hover:animate-pulse" />
                  <span className="text-lg font-semibold">+61 410 632 540</span>
                </a>
              </div>
            </div>
            <div className="mt-6">
              <Link
                to="/contact"
                className="inline-block bg-accent text-white px-6 py-3 text-sm font-bold tracking-wider uppercase hover:bg-accent/90 transition-colors"
                data-testid="footer-quote-btn"
              >
                Get Free Quote
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-slate-700 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-slate-400 text-sm">
            © {new Date().getFullYear()} 22G Roofing Pty Ltd. All rights reserved.
          </p>
          <p className="text-slate-400 text-sm">
            ASIC Registered Company | Licensed Roofing Contractor NSW
          </p>
        </div>
      </div>
    </footer>
  );
});

export default Footer;
