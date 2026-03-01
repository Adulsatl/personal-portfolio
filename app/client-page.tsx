"use client"

import { useState, useEffect, useMemo } from "react"
import { Menu, X, Github, Linkedin, Mail, Phone, MapPin, ExternalLink, Code, Briefcase } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import SleekIntro from "@/components/sleek-intro"
import ModernCertificationsVault from "@/components/modern-certifications-vault"
import CircuitTimeline from "@/components/circuit-timeline"
import ProjectsShowcase from "@/components/projects-showcase"
import TechnologyLogos from "@/components/technology-logos"
import ProfessionalPhotoGallery from "@/components/professional-photo-gallery"
import RecommendationsGallery from "@/components/recommendations-gallery"
import LiveTroubleshooting from "@/components/live-troubleshooting"

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
    { id: "gallery", label: "Gallery" },
    { id: "testimonials", label: "Testimonials" },
    { id: "troubleshooting", label: "Troubleshooting" },
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

      <SleekIntro
        name={safeData.name}
        title={safeData.title}
        tagline={safeData.shortBio}
      />

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

      <CircuitTimeline experiences={safeData.experiences} />

      <ProjectsShowcase projects={safeData.projects} />

      {/* Certifications Vault Section */}
      <ModernCertificationsVault certifications={safeData.certifications} />

      {/* Professional Photo Gallery */}
      <section id="gallery" className="py-32 px-4 border-t border-cyan-500/10">
        <div className="max-w-6xl mx-auto">
          <ProfessionalPhotoGallery />
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-32 px-4 border-t border-cyan-500/10">
        <div className="max-w-6xl mx-auto">
          <RecommendationsGallery />
        </div>
      </section>

      {/* Live Troubleshooting - Replaces Standard Contact Form */}
      <LiveTroubleshooting />

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
