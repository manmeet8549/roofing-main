import { useState } from "react";
import { motion } from "framer-motion";
import { Phone, Mail, MapPin, Clock, Send, CheckCircle, Navigation } from "lucide-react";
import { toast } from "sonner";
import axios from "axios";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

// Business location coordinates
const BUSINESS_ADDRESS = "12 Bedford Road, Blacktown NSW 2148, Australia";
const GOOGLE_MAPS_URL = "https://www.google.com/maps/search/?api=1&query=12+Bedford+Road+Blacktown+NSW+2148+Australia";
const APPLE_MAPS_URL = "https://maps.apple.com/?address=12+Bedford+Road,Blacktown,NSW+2148,Australia&ll=-33.7688,150.9063&q=22G+Roofing+Pty+Ltd";

const fadeInUp = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-50px" },
  transition: { duration: 1, ease: [0.16, 1, 0.3, 1] }
};

const serviceOptions = [
  "New Roof Installation",
  "Re-Roofing",
  "Metal Roofing",
  "Flashings & Guttering",
  "Skylights",
  "Other"
];

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    service_type: "",
    address: "",
    message: ""
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await axios.post(`${API}/quote`, formData);
      setSubmitted(true);
      toast.success("Quote request submitted successfully! We'll be in touch soon.");
      setFormData({
        name: "",
        email: "",
        phone: "",
        service_type: "",
        address: "",
        message: ""
      });
    } catch (error) {
      console.error("Error submitting quote:", error);
      toast.error("Failed to submit quote. Please try again or call us directly.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div data-testid="contact-page" className="pt-20">
      {/* Hero Section */}
      <section className="relative py-20 md:py-32 bg-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeInUp} className="max-w-3xl">
            <span className="text-accent text-sm font-bold tracking-widest uppercase mb-4 block">
              Contact Us
            </span>
            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-primary tracking-tight mb-6">
              Get Your Free
              <br />
              <span className="text-accent">Roofing Quote</span>
            </h1>
            <p className="text-muted text-base md:text-lg leading-relaxed">
              Ready to start your roofing project? Fill out the form below or give us a call. 
              We'll provide a free consultation and detailed quote.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Content */}
      <section className="py-20 md:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Contact Info */}
            <motion.div {...fadeInUp}>
              <h2 className="font-heading text-2xl md:text-3xl font-bold text-primary mb-8">
                Get in Touch
              </h2>

              {/* Contact Cards */}
              <div className="space-y-6 mb-12">
                <div className="flex gap-4 p-6 bg-surface border border-border hover:border-accent/30 transition-all duration-300">
                  <div className="w-12 h-12 bg-accent/10 flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-6 h-6 text-accent" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-heading font-semibold text-primary mb-1">Location</h3>
                    <p className="text-muted text-sm">12 Bedford Road</p>
                    <p className="text-muted text-sm mb-3">Blacktown NSW 2148, Australia</p>
                    <div className="flex flex-wrap gap-2">
                      <a
                        href={GOOGLE_MAPS_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-accent text-white text-xs font-semibold rounded hover:bg-accent/90 transition-colors"
                        data-testid="google-maps-btn"
                      >
                        <Navigation className="w-3 h-3" />
                        Google Maps
                      </a>
                      <a
                        href={APPLE_MAPS_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-800 text-white text-xs font-semibold rounded hover:bg-slate-700 transition-colors"
                        data-testid="apple-maps-btn"
                      >
                        <Navigation className="w-3 h-3" />
                        Apple Maps
                      </a>
                    </div>
                  </div>
                </div>

                <div className="flex gap-4 p-6 bg-surface border border-border hover:border-accent/30 transition-all duration-300">
                  <div className="w-12 h-12 bg-accent/10 flex items-center justify-center flex-shrink-0">
                    <Mail className="w-6 h-6 text-accent" />
                  </div>
                  <div>
                    <h3 className="font-heading font-semibold text-primary mb-1">Email</h3>
                    <a 
                      href="mailto:sales22groofing@outlook.com" 
                      className="text-accent hover:underline text-sm"
                      data-testid="email-link"
                    >
                      sales22groofing@outlook.com
                    </a>
                  </div>
                </div>

                <div className="flex gap-4 p-6 bg-surface border border-border hover:border-accent/30 transition-all duration-300">
                  <div className="w-12 h-12 bg-accent/10 flex items-center justify-center flex-shrink-0">
                    <Phone className="w-6 h-6 text-accent" />
                  </div>
                  <div>
                    <h3 className="font-heading font-semibold text-primary mb-2">Phone</h3>
                    <div className="space-y-3">
                      <div>
                        <p className="text-xs text-muted uppercase tracking-wider">Pavandeep Singh (Director)</p>
                        <a 
                          href="tel:+61448046461" 
                          className="text-primary font-semibold text-lg hover:text-accent transition-colors inline-flex items-center gap-2"
                          data-testid="phone-pavandeep"
                        >
                          +61 448 046 461
                          <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded">Tap to Call</span>
                        </a>
                      </div>
                      <div>
                        <p className="text-xs text-muted uppercase tracking-wider">Bhupendra Singh (Director)</p>
                        <a 
                          href="tel:+61410632540" 
                          className="text-primary font-semibold text-lg hover:text-accent transition-colors inline-flex items-center gap-2"
                          data-testid="phone-bhupendra"
                        >
                          +61 410 632 540
                          <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded">Tap to Call</span>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex gap-4 p-6 bg-surface border border-border hover:border-accent/30 transition-all duration-300">
                  <div className="w-12 h-12 bg-accent/10 flex items-center justify-center flex-shrink-0">
                    <Clock className="w-6 h-6 text-accent" />
                  </div>
                  <div>
                    <h3 className="font-heading font-semibold text-primary mb-1">Business Hours</h3>
                    <p className="text-muted text-sm">Monday - Friday: 7:00 AM - 7:00 PM</p>
                    <p className="text-muted text-sm">Saturday: 8:00 AM - 5:00 PM</p>
                    <p className="text-muted text-sm">Sunday: Closed</p>
                  </div>
                </div>
              </div>

              {/* Google Maps Embed */}
              <div className="aspect-video w-full border border-border">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3315.5!2d150.9063!3d-33.7688!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6b129838f39a743d%3A0x3017d681632a850!2s12%20Bedford%20Rd%2C%20Blacktown%20NSW%202148%2C%20Australia!5e0!3m2!1sen!2sus!4v1700000000000!5m2!1sen!2sus"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="22G Roofing Location - 12 Bedford Road, Blacktown NSW 2148"
                  data-testid="google-map-embed"
                ></iframe>
              </div>
            </motion.div>

            {/* Quote Form */}
            <motion.div
              {...fadeInUp}
              transition={{ delay: 0.2 }}
            >
              <div className="bg-surface p-8 lg:p-12 border border-border">
                <h2 className="font-heading text-2xl md:text-3xl font-bold text-primary mb-2">
                  Request a Quote
                </h2>
                <p className="text-muted text-sm mb-8">
                  Fill out the form below and we'll get back to you within 24 hours.
                </p>

                {submitted ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-12"
                  >
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                      <CheckCircle className="w-8 h-8 text-green-600" />
                    </div>
                    <h3 className="font-heading text-xl font-semibold text-primary mb-2">
                      Quote Request Sent!
                    </h3>
                    <p className="text-muted mb-6">
                      Thank you for your interest. We'll be in touch shortly.
                    </p>
                    <button
                      onClick={() => setSubmitted(false)}
                      className="text-accent font-medium hover:underline"
                      data-testid="submit-another-btn"
                    >
                      Submit Another Request
                    </button>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6" data-testid="quote-form">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-primary mb-2">
                          Full Name *
                        </label>
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          required
                          className="w-full h-12 px-4 border border-border bg-white text-primary focus:ring-2 focus:ring-accent focus:border-accent transition-colors"
                          placeholder="Your name"
                          data-testid="input-name"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-primary mb-2">
                          Email *
                        </label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          className="w-full h-12 px-4 border border-border bg-white text-primary focus:ring-2 focus:ring-accent focus:border-accent transition-colors"
                          placeholder="your@email.com"
                          data-testid="input-email"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-primary mb-2">
                          Phone *
                        </label>
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          required
                          className="w-full h-12 px-4 border border-border bg-white text-primary focus:ring-2 focus:ring-accent focus:border-accent transition-colors"
                          placeholder="0400 000 000"
                          data-testid="input-phone"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-primary mb-2">
                          Service Type *
                        </label>
                        <select
                          name="service_type"
                          value={formData.service_type}
                          onChange={handleChange}
                          required
                          className="w-full h-12 px-4 border border-border bg-white text-primary focus:ring-2 focus:ring-accent focus:border-accent transition-colors"
                          data-testid="input-service"
                        >
                          <option value="">Select a service</option>
                          {serviceOptions.map(option => (
                            <option key={option} value={option}>{option}</option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-primary mb-2">
                        Project Address
                      </label>
                      <input
                        type="text"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        className="w-full h-12 px-4 border border-border bg-white text-primary focus:ring-2 focus:ring-accent focus:border-accent transition-colors"
                        placeholder="Where is your project located?"
                        data-testid="input-address"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-primary mb-2">
                        Project Details
                      </label>
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        rows={5}
                        className="w-full px-4 py-3 border border-border bg-white text-primary focus:ring-2 focus:ring-accent focus:border-accent transition-colors resize-none"
                        placeholder="Tell us about your project..."
                        data-testid="input-message"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full bg-accent text-white px-8 py-4 text-sm font-bold tracking-widest uppercase hover:bg-accent/90 transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                      data-testid="submit-quote-btn"
                    >
                      {loading ? (
                        <>
                          <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          Sending...
                        </>
                      ) : (
                        <>
                          <Send className="w-4 h-4" />
                          Submit Quote Request
                        </>
                      )}
                    </button>
                  </form>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Service Areas */}
      <section className="py-20 bg-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeInUp} className="text-center mb-12">
            <h2 className="font-heading text-2xl md:text-3xl font-bold text-primary mb-4">
              Service Areas
            </h2>
            <p className="text-muted max-w-2xl mx-auto">
              We provide roofing services across Greater Sydney and NSW
            </p>
          </motion.div>
          
          <motion.div 
            {...fadeInUp}
            className="flex flex-wrap justify-center gap-4"
          >
            {[
              "Blacktown",
              "Marsden Park",
              "Box Hill",
              "Riverstone",
              "Parramatta", 
              "Penrith",
              "Liverpool",
              "Campbelltown",
              "Castle Hill",
              "Rouse Hill",
              "Sydney CBD",
              "North Sydney",
              "Bankstown",
              "Fairfield",
              "Greater Western Sydney"
            ].map((area) => (
              <span
                key={area}
                className={`px-4 py-2 text-sm transition-all duration-300 ${
                  ["Blacktown", "Marsden Park", "Box Hill", "Riverstone"].includes(area)
                    ? "bg-accent text-white font-semibold"
                    : "bg-white border border-border text-primary hover:border-accent/50"
                }`}
              >
                {area}
              </span>
            ))}
          </motion.div>
        </div>
      </section>
    </div>
  );
}
