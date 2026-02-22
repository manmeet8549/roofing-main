import { useEffect, useState, useCallback, memo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { X, ArrowRight } from "lucide-react";
import axios from "axios";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const fadeInUp = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-50px" },
  transition: { duration: 1, ease: [0.16, 1, 0.3, 1] }
};

// Additional gallery images (empty - all images now come from backend)
const additionalImages = [];

// Memoized project card component
const ProjectGridCard = memo(function ProjectGridCard({ project, index, onClick }) {
  const [imageLoaded, setImageLoaded] = useState(false);
  
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.6, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
      className="group relative aspect-[4/5] overflow-hidden cursor-pointer bg-slate-100"
      onClick={onClick}
      data-testid={`project-card-${project.id}`}
    >
      {!imageLoaded && (
        <div className="absolute inset-0 bg-slate-100 animate-pulse" />
      )}
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
      <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/30 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 ease-out">
        <div className="absolute bottom-0 left-0 right-0 p-6 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 ease-out">
          <span className="text-accent text-xs font-bold tracking-wider uppercase mb-2 block">
            {project.category}
          </span>
          <h3 className="font-heading font-semibold text-white text-xl mb-2">
            {project.title}
          </h3>
          <p className="text-slate-300 text-sm line-clamp-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
            {project.description}
          </p>
        </div>
      </div>
    </motion.div>
  );
});

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedProject, setSelectedProject] = useState(null);
  const [filter, setFilter] = useState("All");

  const fetchProjects = useCallback(async () => {
    try {
      const response = await axios.get(`${API}/projects`);
      setProjects([...response.data, ...additionalImages]);
    } catch (error) {
      console.error("Error fetching projects:", error);
      setProjects(additionalImages);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  const categories = ["All", ...new Set(projects.map(p => p.category))];
  
  const filteredProjects = filter === "All" 
    ? projects 
    : projects.filter(p => p.category === filter);

  const handleProjectClick = useCallback((project) => {
    setSelectedProject(project);
  }, []);

  const handleCloseModal = useCallback(() => {
    setSelectedProject(null);
  }, []);

  return (
    <div data-testid="projects-page" className="pt-20">
      {/* Hero Section */}
      <section className="relative py-20 md:py-32 bg-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeInUp} className="max-w-3xl">
            <span className="text-accent text-sm font-bold tracking-widest uppercase mb-4 block">
              Our Projects
            </span>
            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-primary tracking-tight mb-6">
              Showcasing Our
              <br />
              <span className="text-accent">Best Work</span>
            </h1>
            <p className="text-muted text-base md:text-lg leading-relaxed">
              Browse through our portfolio of completed roofing projects. Each project 
              represents our commitment to quality craftsmanship and customer satisfaction.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filter Tabs */}
      <section className="py-8 bg-white border-b border-border sticky top-20 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap gap-4">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setFilter(category)}
                className={`px-6 py-2 text-sm font-medium tracking-wider uppercase transition-colors ${
                  filter === category
                    ? "bg-primary text-white"
                    : "bg-surface text-muted hover:bg-border"
                }`}
                data-testid={`filter-${category.toLowerCase()}`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-20 md:py-32 bg-white" data-testid="projects-gallery">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="aspect-[4/5] bg-slate-100 animate-pulse rounded" />
              ))}
            </div>
          ) : (
            <motion.div 
              layout
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              <AnimatePresence mode="popLayout">
                {filteredProjects.map((project, index) => (
                  <ProjectGridCard
                    key={project.id}
                    project={project}
                    index={index}
                    onClick={() => handleProjectClick(project)}
                  />
                ))}
              </AnimatePresence>
            </motion.div>
          )}
        </div>
      </section>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
            onClick={handleCloseModal}
            data-testid="project-lightbox"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="relative max-w-5xl w-full bg-white"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={handleCloseModal}
                className="absolute top-4 right-4 z-10 w-10 h-10 bg-white flex items-center justify-center hover:bg-surface transition-colors duration-300"
                data-testid="close-lightbox-btn"
              >
                <X className="w-5 h-5" />
              </button>
              
              <div className="grid grid-cols-1 lg:grid-cols-2">
                <img
                  src={selectedProject.image_url}
                  alt={selectedProject.title}
                  className="w-full aspect-square lg:aspect-auto lg:h-full object-cover"
                />
                <div className="p-8 lg:p-12">
                  <span className="text-accent text-sm font-bold tracking-widest uppercase mb-4 block">
                    {selectedProject.category}
                  </span>
                  <h2 className="font-heading text-2xl lg:text-3xl font-bold text-primary mb-4">
                    {selectedProject.title}
                  </h2>
                  <p className="text-muted leading-relaxed mb-8">
                    {selectedProject.description}
                  </p>
                  <Link
                    to="/contact"
                    className="inline-flex items-center gap-2 bg-primary text-white px-6 py-3 text-sm font-bold tracking-wider uppercase hover:bg-primary/90 transition-colors"
                    data-testid="lightbox-quote-btn"
                  >
                    Request Similar Project
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Stats Section */}
      <section className="py-20 bg-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { value: "1200+", label: "Projects Completed" },
              { value: "500+", label: "Happy Clients" },
              { value: "10+", label: "Years Experience" },
              { value: "100%", label: "Satisfaction Rate" }
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="font-heading text-4xl lg:text-5xl font-bold text-accent mb-2">
                  {stat.value}
                </div>
                <div className="text-muted text-sm tracking-wider uppercase">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 md:py-32 bg-primary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div {...fadeInUp}>
            <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-white tracking-tight mb-6">
              Like What You See?
            </h2>
            <p className="text-slate-300 text-base md:text-lg max-w-2xl mx-auto mb-10">
              Let us create something amazing for your property. Contact us today 
              to discuss your roofing project.
            </p>
            <Link
              to="/contact"
              className="inline-block bg-accent text-white px-8 py-4 text-sm font-bold tracking-widest uppercase hover:bg-accent/90 transition-colors"
              data-testid="projects-cta-btn"
            >
              Start Your Project
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
