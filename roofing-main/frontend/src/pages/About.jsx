import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Shield, Users, Award, Target, CheckCircle, Phone } from "lucide-react";
import { useEffect } from "react";

const fadeInUp = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-50px" },
  transition: { duration: 1, ease: [0.16, 1, 0.3, 1] }
};

const teamMembers = [
  {
    name: "Pavandeep Singh",
    role: "Director",
    phone: "+61 448 046 461",
    description: "Leading 22G Roofing with a focus on quality craftsmanship and customer satisfaction."
  },
  {
    name: "Bhupendra Singh",
    role: "Director",
    phone: "+61 410 632 540",
    description: "Ensuring every project runs smoothly from start to finish with excellence."
  }
];

const values = [
  {
    icon: Shield,
    title: "Quality First",
    description: "We never compromise on materials or workmanship. Every roof we install meets the highest Australian standards."
  },
  {
    icon: Users,
    title: "Customer Focus",
    description: "Your satisfaction is our priority. We work closely with you to understand and deliver on your vision."
  },
  {
    icon: Award,
    title: "Excellence",
    description: "We continuously improve our techniques and stay updated with industry best practices."
  },
  {
    icon: Target,
    title: "Precision",
    description: "Attention to detail in every cut, every seal, and every finish ensures lasting results."
  }
];

export default function About() {
  useEffect(() => {
    document.title = "About 22G Roofing Pty Ltd | NSW Roofing Specialists";
  }, []);

  return (
    <div data-testid="about-page" className="pt-20">
      {/* Hero Section with Decorative Design */}
      <section className="relative py-20 md:py-32 bg-surface overflow-hidden">
        {/* Decorative Diagonal Stripes */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-20 -right-20 w-96 h-96 bg-accent/5 rotate-12 transform"></div>
          <div className="absolute -top-10 -right-10 w-80 h-80 bg-accent/10 rotate-12 transform"></div>
          <div className="absolute top-0 right-0 w-64 h-64 bg-accent/5 rotate-12 transform"></div>
          <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-accent/30 to-transparent"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeInUp} className="max-w-3xl">
            <span className="text-accent text-sm font-bold tracking-widest uppercase mb-4 block">
              About Us
            </span>
            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-primary tracking-tight mb-6">
              Building Roofs,
              <br />
              <span className="text-accent">Building Trust</span>
            </h1>
            <p className="text-muted text-base md:text-lg leading-relaxed">
              22G Roofing Pty Ltd is a professional roofing company based in Blacktown, NSW. 
              We specialize in new roof installations and re-roofing for residential and 
              commercial projects across Greater Sydney and New South Wales.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20 md:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div {...fadeInUp}>
              <span className="text-accent text-sm font-bold tracking-widest uppercase mb-4 block">
                Our Story
              </span>
              <h2 className="font-heading text-3xl md:text-4xl font-bold text-primary tracking-tight mb-6">
                Committed to Excellence in Every Project
              </h2>
              <div className="space-y-4 text-muted">
                <p className="leading-relaxed">
                  Founded with a passion for quality roofing, 22G Roofing has grown to become 
                  a trusted name in the NSW construction industry. Our team brings together 
                  years of experience in metal roofing, working with builders, developers, 
                  and homeowners across the region.
                </p>
                <p className="leading-relaxed">
                  We understand that a roof is more than just a covering—it's protection for 
                  your family, your assets, and your investment. That's why we use only premium 
                  materials like Colorbond and BlueScope steel, backed by comprehensive warranties.
                </p>
                <p className="leading-relaxed">
                  Our commitment to Australian building standards and safety regulations ensures 
                  every project we complete stands the test of time and weather.
                </p>
              </div>
            </motion.div>
            
            <motion.div
              {...fadeInUp}
              transition={{ delay: 0.2 }}
              className="relative"
            >
              <img
                src="https://customer-assets.emergentagent.com/job_5a784e05-5e78-4067-aa14-a5ab6084b2ac/artifacts/pf0u4br6_WhatsApp%20Image%202026-01-30%20at%202.39.06%20PM%20%282%29.jpeg"
                alt="22G Roofing Project"
                className="w-full aspect-[4/3] object-cover"
              />
              <div className="absolute -bottom-6 -left-6 bg-accent text-white p-8">
                <div className="font-heading text-4xl font-bold">1200+</div>
                <div className="text-sm tracking-wider uppercase">Projects Completed</div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 md:py-32 bg-surface" data-testid="values-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeInUp} className="text-center mb-16">
            <span className="text-accent text-sm font-bold tracking-widest uppercase mb-4 block">
              Our Values
            </span>
            <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-primary tracking-tight">
              What Drives Us
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="bg-white p-8 border border-border hover:border-accent/30 transition-all duration-500"
              >
                <div className="w-12 h-12 bg-accent/10 flex items-center justify-center mb-6">
                  <value.icon className="w-6 h-6 text-accent" />
                </div>
                <h3 className="font-heading font-semibold text-lg text-primary mb-3">
                  {value.title}
                </h3>
                <p className="text-muted text-sm leading-relaxed">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 md:py-32 bg-white" data-testid="team-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeInUp} className="text-center mb-16">
            <span className="text-accent text-sm font-bold tracking-widest uppercase mb-4 block">
              Our Team
            </span>
            <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-primary tracking-tight">
              Meet the Experts
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto">
            {teamMembers.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="bg-surface p-8 text-center hover:shadow-lg transition-all duration-500"
              >
                <div className="w-20 h-20 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Users className="w-10 h-10 text-accent" />
                </div>
                <h3 className="font-heading font-semibold text-xl text-primary mb-1">
                  {member.name}
                </h3>
                <p className="text-accent font-medium text-sm mb-4">{member.role}</p>
                <p className="text-muted text-sm leading-relaxed mb-6">
                  {member.description}
                </p>
                <a
                  href={`tel:${member.phone.replace(/\s/g, '')}`}
                  className="inline-flex items-center gap-2 text-primary font-medium hover:text-accent transition-colors"
                >
                  <Phone className="w-4 h-4" />
                  {member.phone}
                </a>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Certifications Section */}
      <section className="py-20 md:py-32 bg-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeInUp} className="text-center mb-16">
            <span className="text-accent text-sm font-bold tracking-widest uppercase mb-4 block">
              Our Credentials
            </span>
            <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-primary tracking-tight">
              Licensed & Certified
            </h2>
          </motion.div>

          <motion.div
            {...fadeInUp}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16"
          >
            {[
              "Licensed Roofing Contractor NSW",
              "Fully Insured - Public Liability",
              "Colorbond Accredited Installer"
            ].map((cert, index) => (
              <div
                key={cert}
                className="flex items-center gap-4 bg-white p-6 border border-border hover:border-accent/30 transition-all duration-300"
              >
                <CheckCircle className="w-6 h-6 text-accent flex-shrink-0" />
                <span className="font-medium text-primary">{cert}</span>
              </div>
            ))}
          </motion.div>

          {/* ASIC Registration Certificate */}
          <motion.div
            {...fadeInUp}
            className="max-w-4xl mx-auto"
          >
            <div className="bg-white border border-border p-8 md:p-12">
              <div className="flex flex-col md:flex-row items-center gap-8">
                <div className="flex-shrink-0">
                  <img
                    src="https://customer-assets.emergentagent.com/job_aussie-roof-pros/artifacts/jvd6ukxd_WhatsApp%20Image%202026-01-30%20at%202.38.35%20PM.jpeg"
                    alt="ASIC Certificate of Registration - 22G Roofing Pty Ltd"
                    className="w-full md:w-80 h-auto border border-slate-200 shadow-sm"
                    loading="lazy"
                  />
                </div>
                <div className="text-center md:text-left">
                  <div className="flex items-center justify-center md:justify-start gap-2 mb-4">
                    <Shield className="w-8 h-8 text-accent" />
                    <h3 className="font-heading text-2xl font-bold text-primary">
                      Registered Australian Company
                    </h3>
                  </div>
                  <p className="text-muted leading-relaxed mb-4">
                    22G Roofing Pty Ltd is officially registered with the Australian Securities 
                    and Investments Commission (ASIC), ensuring full compliance with Australian 
                    business regulations and standards.
                  </p>
                  <div className="flex flex-wrap gap-4 justify-center md:justify-start">
                    <div className="bg-surface px-4 py-2 border border-border">
                      <span className="text-xs text-muted uppercase tracking-wider block">Company Type</span>
                      <span className="font-semibold text-primary">Proprietary Limited</span>
                    </div>
                    <div className="bg-surface px-4 py-2 border border-border">
                      <span className="text-xs text-muted uppercase tracking-wider block">Registration</span>
                      <span className="font-semibold text-primary">ASIC Certified</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 md:py-32 bg-primary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div {...fadeInUp}>
            <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-white tracking-tight mb-6">
              Let's Build Something Great
            </h2>
            <p className="text-slate-300 text-base md:text-lg max-w-2xl mx-auto mb-10">
              Partner with 22G Roofing for your next project. We're ready to deliver 
              quality roofing solutions that exceed your expectations.
            </p>
            <Link
              to="/contact"
              className="inline-block bg-accent text-white px-8 py-4 text-sm font-bold tracking-widest uppercase hover:bg-accent/90 transition-colors"
              data-testid="about-cta-btn"
            >
              Get in Touch
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
