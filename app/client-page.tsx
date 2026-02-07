"use client"

import { useState, useEffect, useMemo } from "react"
import { Menu, X, Github, Linkedin, Mail, Phone, MapPin, ExternalLink, Code, Briefcase } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import CertificationSection from "@/components/certification-section"
import ContactForm from "@/components/contact-form"
import TechnologyLogos from "@/components/technology-logos"
import RecommendationsGallery from "@/components/recommendations-gallery"

function usePhotos(portfolioData?: any) {
  const uploaded = Array.isArray(portfolioData?.photos) ? portfolioData.photos : []
  const fallbacks = [
    "/professional-it-administrator.jpg",
    "/server-room-administration.jpg",
    "/modern-office-workspace.jpg",
    "/network-infrastructure.jpg",
    "/technical-setup.jpg",
  ]
  return Array.from({ length: 5 }).map((_, i) => uploaded[i] || fallbacks[i])
}

const EnhancedLoader = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-slate-950 via-blue-950 to-slate-950">
      <div className="relative w-20 h-20">
        <motion.div
          className="absolute inset-0 rounded-full border-2 border-transparent border-t-cyan-500 border-r-cyan-500"
          animate={{ rotate: 360 }}
          transition={{ duration: 2.5, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
        />
        <motion.div
          className="absolute inset-3 rounded-full border-2 border-transparent border-b-blue-500 border-l-blue-500"
          animate={{ rotate: -360 }}
          transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
        />
      </div>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="mt-6 text-cyan-400 font-medium tracking-wider"
      >
        Initializing Portfolio
      </motion.p>
    </div>
  )
}

export const StaticPortfolio = ({ portfolioData }) => {
  const photos = usePhotos(portfolioData)

  const safeData = useMemo(
    () => ({
      name: portfolioData?.name || "Adul S.",
      title: portfolioData?.title || "IT Administrator",
      shortBio:
        portfolioData?.shortBio ||
        "Professional IT Administrator with expertise in infrastructure and systems management.",
      longBio:
        portfolioData?.longBio ||
        "Experienced IT professional dedicated to designing and maintaining secure, efficient IT infrastructure solutions.",
      profileImage: portfolioData?.profileImage || photos[0],
      cvUrl: portfolioData?.cvUrl || "#",
      coreSkills: portfolioData?.coreSkills || ["Windows Server", "Linux Administration", "Network Management"],
      skillCategories: portfolioData?.skillCategories || [],
      experiences: portfolioData?.experiences || [],
      projects: portfolioData?.projects || [],
      socialLinks: portfolioData?.socialLinks || {},
      contact: portfolioData?.contact || {},
      certifications: portfolioData?.certifications || [],
    }),
    [portfolioData, photos],
  )

  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState("hero")
  const [scrollY, setScrollY] = useState(0)
  const [isMounted, setIsMounted] = useState(false)

  const sections = [
    { id: "about", label: "About" },
    { id: "skills", label: "Skills" },
    { id: "experience", label: "Experience" },
    { id: "projects", label: "Projects" },
    { id: "certifications", label: "Certifications" },
    { id: "recommendations", label: "Recommendations" },
    { id: "contact", label: "Contact" },
  ]

  useEffect(() => {
    setIsMounted(true)

    const handleScroll = () => {
      const currentScrollY = window.scrollY
      setScrollY(currentScrollY)

      for (const section of sections) {
        const el = document.getElementById(section.id)
        if (!el) continue
        const rect = el.getBoundingClientRect()
        if (rect.top <= 100 && rect.bottom >= 100) {
          setActiveSection(section.id)
          break
        }
      }
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id)
    if (!el) return
    window.scrollTo({ top: el.offsetTop - 80, behavior: "smooth" })
  }

  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  }

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.1,
      },
    },
  }

  if (!isMounted) {
    return <EnhancedLoader />
  }

  return (
    <motion.div
      className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-white overflow-x-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-0 -left-64 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl"
          animate={{
            x: [0, 30, -15, 0],
            y: [0, -40, 20, 0],
          }}
          transition={{ duration: 25, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-0 -right-64 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl"
          animate={{
            x: [0, -30, 15, 0],
            y: [0, 40, -20, 0],
          }}
          transition={{ duration: 28, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut", delay: 1 }}
        />
      </div>

      <motion.header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrollY > 50 ? "bg-slate-950/90 backdrop-blur-xl border-b border-cyan-500/10 shadow-lg" : "bg-transparent"
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex justify-between items-center">
          <motion.a
            href="#hero"
            className="font-bold text-xl text-cyan-400 tracking-tight"
            whileHover={{ scale: 1.02 }}
          >
            {safeData.name.split(" ")[0]}
          </motion.a>

          <nav className="hidden md:flex gap-12">
            {sections.map((section) => (
              <motion.button
                key={section.id}
                onClick={() => scrollToSection(section.id)}
                className={`text-sm font-medium transition-colors relative ${
                  activeSection === section.id ? "text-cyan-400" : "text-gray-400 hover:text-cyan-400"
                }`}
                whileHover={{ scale: 1.02 }}
              >
                {section.label}
                {activeSection === section.id && (
                  <motion.div
                    className="absolute -bottom-2 left-0 h-0.5 w-full bg-cyan-500"
                    layoutId="nav-indicator"
                    transition={{ type: "spring", stiffness: 400, damping: 40 }}
                  />
                )}
              </motion.button>
            ))}
          </nav>

          <motion.button
            className="md:hidden p-2 text-cyan-400"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            whileTap={{ scale: 0.95 }}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </motion.button>
        </div>

        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              className="md:hidden bg-slate-900/95 backdrop-blur-xl border-t border-cyan-500/10"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
            >
              <div className="p-4 space-y-3">
                {sections.map((section) => (
                  <motion.button
                    key={section.id}
                    onClick={() => {
                      scrollToSection(section.id)
                      setIsMenuOpen(false)
                    }}
                    className="w-full text-left px-4 py-2 rounded-lg text-gray-300 hover:text-cyan-400 hover:bg-cyan-500/10 transition-colors"
                    whileHover={{ x: 4 }}
                  >
                    {section.label}
                  </motion.button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>

      <section id="hero" className="min-h-screen flex items-center px-4 pt-20">
        <div className="max-w-7xl mx-auto w-full grid lg:grid-cols-2 gap-16 items-center">
          <motion.div className="space-y-8" variants={staggerContainer} initial="hidden" animate="visible">
            <motion.div variants={fadeInUp}>
              <p className="text-cyan-400 font-medium tracking-widest uppercase text-sm mb-2">
                Welcome to my portfolio
              </p>
              <h1 className="text-6xl md:text-7xl font-bold leading-tight tracking-tight">{safeData.name}</h1>
              <p className="text-2xl text-cyan-400 font-medium mt-2">{safeData.title}</p>
            </motion.div>

            <motion.p variants={fadeInUp} className="text-lg text-gray-300 leading-relaxed max-w-lg">
              {safeData.shortBio}
            </motion.p>

            <motion.div variants={fadeInUp} className="flex flex-wrap gap-4 pt-4">
              <motion.button
                onClick={() => scrollToSection("contact")}
                className="px-8 py-3 rounded-lg bg-cyan-500 text-slate-950 font-medium hover:bg-cyan-400 transition-all"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Get in Touch
              </motion.button>

              <motion.a
                href={safeData.cvUrl || "#"}
                download
                className="px-8 py-3 rounded-lg border-2 border-cyan-500/50 text-cyan-400 font-medium hover:bg-cyan-500/10 transition-all"
                whileHover={{ scale: 1.05 }}
              >
                Download CV
              </motion.a>
            </motion.div>

            <motion.div variants={fadeInUp} className="flex gap-4 pt-4">
              {safeData.socialLinks?.github && (
                <motion.a
                  href={safeData.socialLinks.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-full bg-slate-800/50 text-cyan-400 hover:bg-cyan-500/10 transition-all"
                  whileHover={{ scale: 1.1 }}
                >
                  <Github size={20} />
                </motion.a>
              )}
              {safeData.socialLinks?.linkedin && (
                <motion.a
                  href={safeData.socialLinks.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-full bg-slate-800/50 text-cyan-400 hover:bg-cyan-500/10 transition-all"
                  whileHover={{ scale: 1.1 }}
                >
                  <Linkedin size={20} />
                </motion.a>
              )}
            </motion.div>
          </motion.div>

          <motion.div
            className="relative h-96 md:h-[500px] hidden lg:flex items-center justify-center"
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <div className="relative w-72 h-96 rounded-2xl overflow-hidden shadow-2xl border border-cyan-500/20">
              <img src={photos[0] || "/placeholder.svg"} alt="Profile" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 to-transparent" />
            </div>
          </motion.div>
        </div>
      </section>

      <section id="about" className="py-32 px-4 border-t border-cyan-500/10">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            className="relative"
          >
            <div className="relative w-full aspect-[3/4] rounded-2xl overflow-hidden shadow-2xl border border-cyan-500/20">
              <img
                src={safeData.profileImage || "/placeholder.svg"}
                alt={safeData.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 to-transparent" />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            className="space-y-8"
          >
            <div>
              <h2 className="text-5xl font-bold mb-6">
                <span className="text-cyan-400">About</span> Me
              </h2>
              <div className="h-1 w-16 bg-cyan-500 rounded-full" />
            </div>

            <p className="text-lg text-gray-300 leading-relaxed">{safeData.longBio}</p>

            <div>
              <h3 className="text-xl font-semibold mb-4 text-cyan-400">Core Competencies</h3>
              <motion.div
                className="grid grid-cols-2 gap-3"
                variants={staggerContainer}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                {safeData.coreSkills?.map((skill, i) => (
                  <motion.div
                    key={skill + i}
                    className="px-4 py-3 rounded-lg bg-slate-800/50 border border-cyan-500/30 text-cyan-400 text-sm font-medium hover:border-cyan-500 transition-all"
                    variants={fadeInUp}
                  >
                    {skill}
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-32 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <h2 className="text-5xl font-bold mb-6">
              <span className="text-cyan-400">Technical</span> Skills
            </h2>
            <div className="h-1 w-16 bg-cyan-500 rounded-full mx-auto" />
          </motion.div>

          <motion.div
            className="grid md:grid-cols-3 gap-8"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            {safeData.skillCategories?.map((category, i) => (
              <motion.div
                key={category.name + i}
                className="p-8 rounded-xl bg-slate-800/40 backdrop-blur border border-cyan-500/20 hover:border-cyan-500/50 transition-all hover:shadow-lg hover:shadow-cyan-500/10"
                variants={fadeInUp}
              >
                <h3 className="text-lg font-semibold mb-6 text-cyan-400 flex items-center gap-2">
                  <Code size={20} />
                  {category.name}
                </h3>
                <div className="space-y-5">
                  {category.skills?.map((skill, idx) => (
                    <div key={skill.name + idx}>
                      <div className="flex justify-between mb-2">
                        <span className="text-sm font-medium text-gray-300">{skill.name}</span>
                        <span className="text-xs text-gray-400">{skill.level}%</span>
                      </div>
                      <div className="h-2 bg-slate-700/50 rounded-full overflow-hidden">
                        <motion.div
                          className="h-full bg-gradient-to-r from-cyan-500 to-blue-600"
                          initial={{ width: 0 }}
                          whileInView={{ width: `${skill.level}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 1, delay: idx * 0.1 }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Technology Logos Gallery */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-32 pt-16 border-t border-slate-700/50"
          >
            <TechnologyLogos />
          </motion.div>
        </div>
      </section>

      <section id="experience" className="py-32 px-4 border-t border-cyan-500/10">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <h2 className="text-5xl font-bold mb-6">
              <span className="text-cyan-400">Work</span> Experience
            </h2>
            <div className="h-1 w-16 bg-cyan-500 rounded-full mx-auto" />
          </motion.div>

          {safeData.experiences?.length ? (
            <div className="space-y-8">
              {safeData.experiences.map((exp, i) => (
                <motion.div
                  key={exp.role + i}
                  className="relative pl-8 border-l-2 border-cyan-500/30"
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                >
                  <motion.div
                    className="absolute -left-4 top-1 w-6 h-6 rounded-full bg-cyan-500 shadow-lg shadow-cyan-500/50"
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 + i * 0.1 }}
                  />
                  <div className="p-8 rounded-xl bg-slate-800/40 border border-cyan-500/20 hover:border-cyan-500/50 transition-all">
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex items-center gap-3">
                        <Briefcase size={20} className="text-cyan-400" />
                        <div>
                          <h3 className="text-xl font-semibold text-cyan-400">{exp.role}</h3>
                          <p className="text-gray-400">{exp.company}</p>
                        </div>
                      </div>
                      <span className="text-xs px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">
                        {exp.period}
                      </span>
                    </div>
                    <p className="text-gray-300 mb-4">{exp.description}</p>
                    {exp.achievements?.length > 0 && (
                      <ul className="space-y-2">
                        {exp.achievements.map((ach, idx) => (
                          <li key={idx} className="flex items-start gap-3 text-gray-300 text-sm">
                            <span className="text-cyan-400 mt-1">▹</span>
                            <span>{ach}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-500">No work experience added yet.</p>
          )}
        </div>
      </section>

      <section id="projects" className="py-32 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <h2 className="text-5xl font-bold mb-6">
              <span className="text-cyan-400">Featured</span> Projects
            </h2>
            <div className="h-1 w-16 bg-cyan-500 rounded-full mx-auto" />
          </motion.div>

          {safeData.projects?.length ? (
            <motion.div
              className="grid md:grid-cols-2 gap-8"
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
            >
              {safeData.projects.map((project, i) => (
                <motion.div
                  key={project.title + i}
                  className="rounded-xl overflow-hidden bg-slate-800/40 border border-cyan-500/20 hover:border-cyan-500/50 transition-all hover:shadow-lg hover:shadow-cyan-500/10"
                  variants={fadeInUp}
                >
                  <div className="aspect-video relative overflow-hidden bg-slate-800">
                    <img
                      src={project.image || "/placeholder.svg"}
                      alt={project.title}
                      className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 to-transparent" />
                  </div>
                  <div className="p-6 space-y-4">
                    <h3 className="text-xl font-semibold text-cyan-400">{project.title}</h3>
                    <p className="text-gray-300 text-sm">{project.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {project.technologies?.map((tech, idx) => (
                        <span
                          key={tech + idx}
                          className="px-3 py-1 text-xs rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/20"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                    {project.link && (
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center text-cyan-400 hover:text-cyan-300 transition-colors text-sm font-medium"
                      >
                        View Project <ExternalLink className="h-4 w-4 ml-2" />
                      </a>
                    )}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <p className="text-center text-gray-500">No projects added yet.</p>
          )}
        </div>
      </section>

      <CertificationSection certifications={safeData.certifications} />

      {/* Recommendations Section */}
      <section id="recommendations" className="py-32 px-4 border-t border-cyan-500/10">
        <div className="max-w-6xl mx-auto">
          <RecommendationsGallery />
        </div>
      </section>

      <section id="contact" className="py-32 px-4 border-t border-cyan-500/10">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <h2 className="text-5xl font-bold mb-6">
              <span className="text-cyan-400">Get</span> in Touch
            </h2>
            <div className="h-1 w-16 bg-cyan-500 rounded-full mx-auto" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="p-12 rounded-2xl bg-slate-800/40 border border-cyan-500/20"
          >
            <div className="grid md:grid-cols-2 gap-16">
              <div className="space-y-8">
                <h3 className="text-2xl font-semibold text-cyan-400">Contact Information</h3>

                <div className="space-y-6">
                  {safeData.contact?.email && (
                    <motion.a
                      href={`mailto:${safeData.contact.email}`}
                      className="flex items-center gap-4 group"
                      whileHover={{ x: 4 }}
                    >
                      <div className="p-3 rounded-lg bg-cyan-500/10 text-cyan-400 group-hover:bg-cyan-500/20 transition-all">
                        <Mail size={20} />
                      </div>
                      <div>
                        <p className="text-xs text-gray-400">Email</p>
                        <p className="text-gray-300 group-hover:text-cyan-400 transition-colors">
                          {safeData.contact.email}
                        </p>
                      </div>
                    </motion.a>
                  )}
                  {safeData.contact?.phone && (
                    <div className="flex items-center gap-4">
                      <div className="p-3 rounded-lg bg-cyan-500/10 text-cyan-400">
                        <Phone size={20} />
                      </div>
                      <div>
                        <p className="text-xs text-gray-400">Phone</p>
                        <p className="text-gray-300">{safeData.contact.phone}</p>
                      </div>
                    </div>
                  )}
                  {safeData.contact?.location && (
                    <div className="flex items-center gap-4">
                      <div className="p-3 rounded-lg bg-cyan-500/10 text-cyan-400">
                        <MapPin size={20} />
                      </div>
                      <div>
                        <p className="text-xs text-gray-400">Location</p>
                        <p className="text-gray-300">{safeData.contact.location}</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <ContactForm />
            </div>
          </motion.div>
        </div>
      </section>

      <footer className="py-12 px-4 border-t border-cyan-500/10">
        <div className="max-w-7xl mx-auto flex justify-between items-center flex-col md:flex-row gap-6">
          <p className="text-gray-400">
            © {new Date().getFullYear()} {safeData.name}. All rights reserved.
          </p>
          <div className="flex gap-6">
            {safeData.socialLinks?.github && (
              <a
                href={safeData.socialLinks.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-cyan-400 transition-colors"
              >
                <Github size={20} />
              </a>
            )}
            {safeData.socialLinks?.linkedin && (
              <a
                href={safeData.socialLinks.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-cyan-400 transition-colors"
              >
                <Linkedin size={20} />
              </a>
            )}
          </div>
        </div>
      </footer>
    </motion.div>
  )
}

export default function ClientPage({ portfolioData }) {
  const [isClient, setIsClient] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    setIsClient(true)
    const timer = setTimeout(() => setIsLoading(false), 1200)
    return () => clearTimeout(timer)
  }, [])

  if (!isClient) return null

  return (
    <AnimatePresence mode="wait">
      {isLoading ? <EnhancedLoader /> : <StaticPortfolio portfolioData={portfolioData} />}
    </AnimatePresence>
  )
}
