import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, CheckCircle, Phone } from "lucide-react";
import axios from "axios";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const fadeInUp = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-50px" },
  transition: { duration: 1, ease: [0.16, 1, 0.3, 1] }
};

export default function Services() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    document.title = "Roofing Services in Blacktown NSW | 22G Roofing";
  }, []);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await axios.get(`${API}/services`);
        setServices(response.data);
      } catch (error) {
        console.error("Error fetching services:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchServices();
  }, []);

  return (
    <div data-testid="services-page" className="pt-20">
      {/* Hero Section */}
      <section className="relative py-20 md:py-32 bg-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeInUp} className="max-w-3xl">
            <span className="text-accent text-sm font-bold tracking-widest uppercase mb-4 block">
              Our Services
            </span>
            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-primary tracking-tight mb-6">
              Comprehensive
              <br />
              <span className="text-accent">Roofing Solutions</span>
            </h1>
            <p className="text-muted text-base md:text-lg leading-relaxed">
              From new roof installations to complete re-roofing, we offer a full range 
              of professional roofing services for residential and commercial projects 
              across NSW.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 md:py-32 bg-white" data-testid="services-list">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {loading ? (
            <div className="text-center py-20">
              <div className="animate-pulse text-muted">Loading services...</div>
            </div>
          ) : (
            <div className="space-y-20">
              {services.map((service, index) => (
                <motion.div
                  key={service.id}
                  initial={{ opacity: 0, y: 60 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                  className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${
                    index % 2 === 1 ? "lg:flex-row-reverse" : ""
                  }`}
                  data-testid={`service-${service.id}`}
                >
                  <div className={index % 2 === 1 ? "lg:order-2" : ""}>
                    <div className="relative overflow-hidden aspect-[4/3]">
                      <img
                        src={service.image_url}
                        alt={service.title}
                        className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                      />
                    </div>
                  </div>
                  
                  <div className={index % 2 === 1 ? "lg:order-1" : ""}>
                    <span className="text-accent text-sm font-bold tracking-widest uppercase mb-4 block">
                      Service {String(index + 1).padStart(2, '0')}
                    </span>
                    <h2 className="font-heading text-2xl md:text-3xl lg:text-4xl font-bold text-primary tracking-tight mb-6">
                      {service.title}
                    </h2>
                    <p className="text-muted leading-relaxed mb-8">
                      {service.description}
                    </p>
                    
                    <div className="grid grid-cols-2 gap-4 mb-8">
                      {service.features.map((feature) => (
                        <div key={feature} className="flex items-center gap-3">
                          <CheckCircle className="w-5 h-5 text-accent flex-shrink-0" />
                          <span className="text-sm text-primary font-medium">{feature}</span>
                        </div>
                      ))}
                    </div>
                    
                    <Link
                      to="/contact"
                      className="inline-flex items-center gap-2 bg-primary text-white px-6 py-3 text-sm font-bold tracking-wider uppercase hover:bg-primary/90 transition-colors"
                      data-testid={`service-quote-btn-${service.id}`}
                    >
                      Get a Quote
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 md:py-32 bg-surface" data-testid="process-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeInUp} className="text-center mb-16">
            <span className="text-accent text-sm font-bold tracking-widest uppercase mb-4 block">
              Our Process
            </span>
            <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-primary tracking-tight">
              How We Work
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { step: "01", title: "Consultation", desc: "Free on-site assessment and detailed quote" },
              { step: "02", title: "Planning", desc: "Material selection and project scheduling" },
              { step: "03", title: "Installation", desc: "Professional installation by our expert team" },
              { step: "04", title: "Completion", desc: "Final inspection and handover with warranty" }
            ].map((item, index) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="relative bg-white p-8 border border-border hover:border-accent/30 transition-all duration-500"
              >
                <span className="font-display text-6xl font-bold text-accent/10 absolute top-4 right-4">
                  {item.step}
                </span>
                <div className="relative">
                  <h3 className="font-heading font-semibold text-xl text-primary mb-3">
                    {item.title}
                  </h3>
                  <p className="text-muted text-sm leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Materials Section */}
      <section className="py-20 md:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div {...fadeInUp}>
              <span className="text-accent text-sm font-bold tracking-widest uppercase mb-4 block">
                Quality Materials
              </span>
              <h2 className="font-heading text-3xl md:text-4xl font-bold text-primary tracking-tight mb-6">
                Premium Products for Lasting Results
              </h2>
              <p className="text-muted leading-relaxed mb-8">
                We exclusively use premium Australian-made materials including Colorbond 
                and BlueScope steel products. These materials are designed to withstand 
                Australia's harsh climate while maintaining their aesthetic appeal for decades.
              </p>
              
              <div className="space-y-4">
                {[
                  "Colorbond Steel - 22 colour options",
                  "Zincalume - Superior corrosion resistance",
                  "BlueScope - Industry leading warranty",
                  "Velux Skylights - Premium quality"
                ].map((item) => (
                  <div key={item} className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-accent" />
                    <span className="text-primary font-medium">{item}</span>
                  </div>
                ))}
              </div>
            </motion.div>
            
            <motion.div
              {...fadeInUp}
              transition={{ delay: 0.2 }}
            >
              <img
                src="https://customer-assets.emergentagent.com/job_5a784e05-5e78-4067-aa14-a5ab6084b2ac/artifacts/ov39vvwi_WhatsApp%20Image%202026-01-30%20at%202.39.01%20PM%20%281%29.jpeg"
                alt="Premium metal roofing"
                className="w-full aspect-square object-cover"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 md:py-32 bg-primary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div {...fadeInUp}>
            <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-white tracking-tight mb-6">
              Ready to Get Started?
            </h2>
            <p className="text-slate-300 text-base md:text-lg max-w-2xl mx-auto mb-10">
              Contact us today for a free consultation and quote. Our team is ready 
              to help you with your roofing project.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                to="/contact"
                className="bg-accent text-white px-8 py-4 text-sm font-bold tracking-widest uppercase hover:bg-accent/90 transition-colors"
                data-testid="services-cta-btn"
              >
                Request a Quote
              </Link>
              <a
                href="tel:+61448046461"
                className="bg-transparent border border-white/30 text-white px-8 py-4 text-sm font-bold tracking-widest uppercase hover:bg-white/10 transition-colors flex items-center gap-2"
                data-testid="services-call-btn"
              >
                <Phone className="w-4 h-4" />
                Call Now
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
