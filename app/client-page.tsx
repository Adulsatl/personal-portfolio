"use client"

import { useState, useEffect, useRef, useMemo } from "react"
import { Menu, X, ArrowRight, Github, Linkedin, Mail, Phone, MapPin, Download, ChevronRight } from 'lucide-react'
import { motion, AnimatePresence } from "framer-motion"
import CertificationSection from "@/components/certification-section"

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

// Enhanced 3D Loader
const Enhanced3DLoader = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950">
      <div className="relative w-24 h-24">
        <motion.div
          className="absolute inset-0 rounded-full border-2 border-transparent border-t-cyan-500 border-r-cyan-500"
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
        />
        <motion.div
          className="absolute inset-4 rounded-full border-2 border-transparent border-b-blue-500 border-l-blue-500"
          animate={{ rotate: -360 }}
          transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
        />
        <motion.div
          className="absolute inset-8 rounded-full bg-gradient-to-r from-cyan-500/20 to-blue-500/20"
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
        />
      </div>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="mt-6 text-cyan-400 font-medium text-lg"
      >
        Loading Portfolio...
      </motion.p>
    </div>
  )
}

// Main Portfolio Component
const StaticPortfolio = ({ portfolioData }) => {
  const photos = usePhotos(portfolioData)
  
  const safeData = useMemo(
    () => ({
      name: portfolioData?.name || "Adul S.",
      title: portfolioData?.title || "Junior IT Administrator",
      shortBio: portfolioData?.shortBio || "Passionate IT administrator with expertise in network management and infrastructure support.",
      longBio:
        portfolioData?.longBio ||
        "I'm a dedicated IT professional with expertise in system administration, network management, and infrastructure optimization. I focus on creating efficient, secure, and scalable IT solutions.",
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

  const sections = [
    { id: "about", label: "About" },
    { id: "skills", label: "Skills" },
    { id: "experience", label: "Experience" },
    { id: "projects", label: "Projects" },
    { id: "certifications", label: "Certifications" },
    { id: "contact", label: "Contact" },
  ]

  // Scroll detection
  useEffect(() => {
    const handleScroll = () => {
      if (typeof window === "undefined") return
      
      const currentScrollY = window.scrollY
      setScrollY(currentScrollY)

      // Detect active section
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

  // Animation variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  }

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1,
      },
    },
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
          className="absolute top-20 -left-40 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl"
          animate={{
            x: [0, 20, -10, 0],
            y: [0, -30, 10, 0],
            scale: [1, 1.1, 0.9, 1],
          }}
          transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-40 -right-40 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"
          animate={{
            x: [0, -20, 10, 0],
            y: [0, 30, -10, 0],
            scale: [1, 0.9, 1.1, 1],
          }}
          transition={{ duration: 22, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut", delay: 1 }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-cyan-500/5 via-transparent to-blue-500/5" />
      </div>

      {/* Header Navigation */}
      <motion.header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrollY > 50
            ? "bg-slate-950/80 backdrop-blur-md border-b border-cyan-500/10 shadow-lg shadow-cyan-500/5"
            : "bg-transparent"
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
          <motion.a
            href="#hero"
            className="font-bold text-2xl gradient-text"
            whileHover={{ scale: 1.05 }}
          >
            {safeData.name}
          </motion.a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex gap-8">
            {sections.map((section) => (
              <motion.button
                key={section.id}
                onClick={() => scrollToSection(section.id)}
                className={`text-sm font-medium transition-colors relative group ${
                  activeSection === section.id
                    ? "text-cyan-400"
                    : "text-gray-300 hover:text-cyan-400"
                }`}
                whileHover={{ scale: 1.05 }}
              >
                {section.label}
                {activeSection === section.id && (
                  <motion.div
                    className="absolute -bottom-2 left-0 h-0.5 bg-gradient-to-r from-cyan-400 to-blue-500"
                    layoutId="nav-indicator"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    style={{ width: "100%" }}
                  />
                )}
              </motion.button>
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <motion.button
            className="md:hidden p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            whileTap={{ scale: 0.95 }}
          >
            <AnimatePresence>
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </AnimatePresence>
          </motion.button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              className="md:hidden bg-slate-900/95 backdrop-blur-md border-t border-cyan-500/10"
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
                    className="w-full text-left px-4 py-2 rounded-lg hover:bg-cyan-500/10 transition-colors"
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

      {/* Hero Section */}
      <section id="hero" className="min-h-screen flex items-center px-4 pt-20 relative overflow-hidden">
        <div className="max-w-6xl mx-auto w-full grid lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <motion.div
            className="space-y-6 z-10"
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
          >
            <motion.div variants={fadeInUp}>
              <h1 className="text-5xl md:text-7xl font-bold leading-tight">
                Hi, I'm{" "}
                <span className="gradient-text">
                  {safeData.name}
                </span>
              </h1>
            </motion.div>

            <motion.p variants={fadeInUp} className="text-xl md:text-2xl text-gray-300">
              {safeData.title}
            </motion.p>

            <motion.p variants={fadeInUp} className="text-lg text-gray-400 max-w-xl leading-relaxed">
              {safeData.shortBio}
            </motion.p>

            {/* CTA Buttons */}
            <motion.div variants={fadeInUp} className="flex flex-wrap gap-4 pt-4">
              <motion.button
                onClick={() => scrollToSection("contact")}
                className="px-8 py-3 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-medium shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/40 transition-all"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                Get in Touch
                <ArrowRight className="inline ml-2 h-4 w-4" />
              </motion.button>

              <motion.a
                href={safeData.cvUrl || "#"}
                download
                className="px-8 py-3 rounded-lg border-2 border-cyan-500/50 text-cyan-400 font-medium hover:bg-cyan-500/10 transition-all"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                Download CV
                <Download className="inline ml-2 h-4 w-4" />
              </motion.a>
            </motion.div>

            {/* Social Links */}
            <motion.div variants={fadeInUp} className="flex gap-4 pt-4">
              {safeData.socialLinks?.github && (
                <motion.a
                  href={safeData.socialLinks.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-full bg-slate-800/50 text-cyan-400 hover:bg-cyan-500/10 transition-all"
                  whileHover={{ scale: 1.1, y: -2 }}
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
                  whileHover={{ scale: 1.1, y: -2 }}
                >
                  <Linkedin size={20} />
                </motion.a>
              )}
            </motion.div>
          </motion.div>

          {/* Image Cards */}
          <motion.div
            className="relative h-96 md:h-[500px] hidden lg:block"
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
          >
            {/* Card 1 */}
            <motion.div
              className="absolute left-0 top-10 w-64 aspect-[3/4] rounded-2xl overflow-hidden glass-effect-strong shadow-2xl"
              animate={{ y: [0, -10, 0], rotate: [-2, 0, -2] }}
              transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY }}
              whileHover={{ scale: 1.05, rotate: 0 }}
            >
              <img
                src={photos[0] || "/placeholder.svg"}
                alt="Profile"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 to-transparent" />
            </motion.div>

            {/* Card 2 */}
            <motion.div
              className="absolute right-0 bottom-0 w-56 aspect-[3/4] rounded-2xl overflow-hidden glass-effect shadow-2xl"
              animate={{ y: [0, 10, 0], rotate: [2, 0, 2] }}
              transition={{ duration: 5, repeat: Number.POSITIVE_INFINITY, delay: 0.5 }}
              whileHover={{ scale: 1.05, rotate: 0 }}
            >
              <img
                src={photos[1] || "/placeholder.svg"}
                alt="Tech"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 to-transparent" />
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
        >
          <motion.button
            onClick={() => scrollToSection("about")}
            className="p-3 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 hover:bg-cyan-500/20 transition-all"
            whileHover={{ scale: 1.1 }}
          >
            <ArrowRight className="h-6 w-6 rotate-90" />
          </motion.button>
        </motion.div>
      </section>

      {/* About Section */}
      <section id="about" className="py-24 px-4 relative">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7 }}
            className="relative"
          >
            <div className="relative w-full aspect-[3/4] rounded-2xl overflow-hidden glass-effect-strong shadow-2xl group">
              <img
                src={safeData.profileImage || "/placeholder.svg"}
                alt={safeData.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent" />
            </div>
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7 }}
            className="space-y-6"
          >
            <div>
              <h2 className="text-4xl md:text-5xl font-bold mb-4">
                <span className="gradient-text">About Me</span>
              </h2>
              <div className="h-1 w-20 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full" />
            </div>

            <p className="text-lg text-gray-300 leading-relaxed">
              {safeData.longBio}
            </p>

            <div>
              <h3 className="text-xl font-semibold mb-4 text-cyan-400">Core Skills</h3>
              <motion.div
                className="flex flex-wrap gap-3"
                variants={staggerContainer}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                {safeData.coreSkills?.map((skill, i) => (
                  <motion.span
                    key={skill + i}
                    className="px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-sm font-medium hover:bg-cyan-500/20 transition-all"
                    variants={fadeInUp}
                    whileHover={{ scale: 1.05, y: -2 }}
                  >
                    {skill}
                  </motion.span>
                ))}
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-24 px-4 relative">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="gradient-text">Technical Skills</span>
            </h2>
            <div className="h-1 w-20 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full mx-auto" />
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
                className="glass-effect-strong p-6 rounded-xl hover-lift group"
                variants={fadeInUp}
              >
                <h3 className="text-xl font-semibold mb-6 text-cyan-400 group-hover:text-cyan-300 transition-colors">
                  {category.name}
                </h3>
                <div className="space-y-4">
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
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="py-24 px-4 relative">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="gradient-text">Work Experience</span>
            </h2>
            <div className="h-1 w-20 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full mx-auto" />
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
                    className="absolute -left-4 top-1 w-6 h-6 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 shadow-lg shadow-cyan-500/50"
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    initial={{ scale: 0 }}
                    transition={{ delay: 0.2 + i * 0.1 }}
                  />
                  <div className="glass-effect-strong p-6 rounded-xl group hover-lift">
                    <div className="flex justify-between items-start mb-3">
                      <h3 className="text-xl font-semibold text-cyan-400">{exp.role}</h3>
                      <span className="text-xs px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">
                        {exp.period}
                      </span>
                    </div>
                    <p className="text-gray-400 mb-2">{exp.company}</p>
                    <p className="text-gray-300 mb-4">{exp.description}</p>
                    {exp.achievements?.length > 0 && (
                      <ul className="space-y-2">
                        {exp.achievements.map((ach, idx) => (
                          <li key={idx} className="flex items-start gap-2 text-gray-300">
                            <ChevronRight className="h-4 w-4 text-cyan-400 mt-1 flex-shrink-0" />
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

      {/* Projects Section */}
      <section id="projects" className="py-24 px-4 relative">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="gradient-text">Projects</span>
            </h2>
            <div className="h-1 w-20 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full mx-auto" />
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
                  className="glass-effect-strong rounded-xl overflow-hidden hover-lift group"
                  variants={fadeInUp}
                >
                  <div className="aspect-video relative overflow-hidden bg-slate-800">
                    <img
                      src={project.image || "/placeholder.svg"}
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent" />
                  </div>
                  <div className="p-6 space-y-4">
                    <h3 className="text-xl font-semibold text-cyan-400">{project.title}</h3>
                    <p className="text-gray-300">{project.description}</p>
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
                        className="inline-flex items-center text-cyan-400 hover:text-cyan-300 transition-colors"
                      >
                        View Project
                        <ArrowRight className="h-4 w-4 ml-2" />
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

      {/* Certifications Section */}
      <CertificationSection certifications={safeData.certifications} />

      {/* Contact Section */}
      <section id="contact" className="py-24 px-4 relative">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="gradient-text">Get In Touch</span>
            </h2>
            <div className="h-1 w-20 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full mx-auto" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass-effect-strong p-8 md:p-12 rounded-2xl"
          >
            <div className="grid md:grid-cols-2 gap-12">
              <div className="space-y-6">
                <h3 className="text-2xl font-semibold text-cyan-400">Contact Information</h3>
                <p className="text-gray-300">Feel free to reach out directly:</p>

                <div className="space-y-4">
                  {safeData.contact?.email && (
                    <motion.div
                      className="flex items-center gap-4"
                      whileHover={{ x: 4 }}
                    >
                      <div className="p-3 rounded-full bg-cyan-500/10 text-cyan-400">
                        <Mail size={20} />
                      </div>
                      <a href={`mailto:${safeData.contact.email}`} className="text-gray-300 hover:text-cyan-400 transition-colors">
                        {safeData.contact.email}
                      </a>
                    </motion.div>
                  )}
                  {safeData.contact?.phone && (
                    <div className="flex items-center gap-4">
                      <div className="p-3 rounded-full bg-cyan-500/10 text-cyan-400">
                        <Phone size={20} />
                      </div>
                      <span className="text-gray-300">{safeData.contact.phone}</span>
                    </div>
                  )}
                  {safeData.contact?.location && (
                    <div className="flex items-center gap-4">
                      <div className="p-3 rounded-full bg-cyan-500/10 text-cyan-400">
                        <MapPin size={20} />
                      </div>
                      <span className="text-gray-300">{safeData.contact.location}</span>
                    </div>
                  )}
                </div>

                <div className="flex gap-3 pt-4">
                  {safeData.socialLinks?.github && (
                    <a href={safeData.socialLinks.github} target="_blank" rel="noopener noreferrer" className="p-2 rounded-full bg-slate-800 text-cyan-400 hover:bg-cyan-500/10 transition-all">
                      <Github size={20} />
                    </a>
                  )}
                  {safeData.socialLinks?.linkedin && (
                    <a href={safeData.socialLinks.linkedin} target="_blank" rel="noopener noreferrer" className="p-2 rounded-full bg-slate-800 text-cyan-400 hover:bg-cyan-500/10 transition-all">
                      <Linkedin size={20} />
                    </a>
                  )}
                </div>
              </div>

              <form className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-300">Name</label>
                  <input
                    type="text"
                    placeholder="Your name"
                    className="w-full px-4 py-2 rounded-lg bg-slate-800/50 border border-cyan-500/20 text-gray-300 placeholder-gray-500 focus:outline-none focus:border-cyan-500 transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-300">Email</label>
                  <input
                    type="email"
                    placeholder="Your email"
                    className="w-full px-4 py-2 rounded-lg bg-slate-800/50 border border-cyan-500/20 text-gray-300 placeholder-gray-500 focus:outline-none focus:border-cyan-500 transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-300">Message</label>
                  <textarea
                    rows={4}
                    placeholder="Your message"
                    className="w-full px-4 py-2 rounded-lg bg-slate-800/50 border border-cyan-500/20 text-gray-300 placeholder-gray-500 focus:outline-none focus:border-cyan-500 transition-colors resize-none"
                  />
                </div>
                <motion.button
                  type="submit"
                  className="w-full px-6 py-3 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-medium shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/40 transition-all"
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Send Message
                </motion.button>
              </form>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 border-t border-cyan-500/10">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <p className="text-gray-400">© {new Date().getFullYear()} {safeData.name}. All rights reserved.</p>
          <div className="flex gap-4">
            {safeData.socialLinks?.github && (
              <a href={safeData.socialLinks.github} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-cyan-400 transition-colors">
                <Github size={20} />
              </a>
            )}
            {safeData.socialLinks?.linkedin && (
              <a href={safeData.socialLinks.linkedin} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-cyan-400 transition-colors">
                <Linkedin size={20} />
              </a>
            )}
          </div>
        </div>
      </footer>
    </motion.div>
  )
}

// Page wrapper with loader
export default function ClientPage({ portfolioData }) {
  const [isClient, setIsClient] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    setIsClient(true)
    const timer = setTimeout(() => setIsLoading(false), 1500)
    return () => clearTimeout(timer)
  }, [])

  return (
    <AnimatePresence mode="wait">
      {isLoading || !isClient ? (
        <Enhanced3DLoader />
      ) : (
        <StaticPortfolio portfolioData={portfolioData} />
      )}
    </AnimatePresence>
  )
}
