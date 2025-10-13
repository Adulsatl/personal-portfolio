"use client"

import { useState, useEffect, useRef, useMemo } from "react"
import { Menu, X, ArrowRight, Github, Linkedin, Mail, Phone, MapPin, Download, Loader2 } from "lucide-react"
import { motion, AnimatePresence, useMotionValue, useTransform } from "framer-motion"
import CertificationSection from "@/components/certification-section"

// Util: pick provided photos or default fallbacks
function usePhotos(portfolioData?: any) {
  const uploaded = Array.isArray(portfolioData?.photos) ? portfolioData.photos : []
  // Order matters: hero, about/secondary, desk divider, server rack bg, abstract bg
  const fallbacks = [
    "/portrait-headshot-dark-background.jpg",
    "/professional-portrait-neutral-background.jpg",
    "/working-on-computer-desk-setup.jpg",
    "/it-administrator-at-server-rack.jpg",
    "/abstract-geometric-shapes.png",
  ]
  return Array.from({ length: 5 }).map((_, i) => uploaded[i] || fallbacks[i])
}

// Mouse-based parallax offsets for subtle movement
function useParallax(strength = 15) {
  const x = useMotionValue(0)
  const y = useMotionValue(0)

  useEffect(() => {
    const handle = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window
      const relX = (e.clientX / innerWidth - 0.5) * 2 // -1..1
      const relY = (e.clientY / innerHeight - 0.5) * 2
      x.set(relX * strength)
      y.set(relY * strength)
    }
    window.addEventListener("mousemove", handle, { passive: true })
    return () => window.removeEventListener("mousemove", handle)
  }, [x, y, strength])

  return { x, y }
}

// Enhanced 3D Loader Component
const Enhanced3DLoader = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <div className="perspective-3d">
        <div className="cube">
          <div className="cube-face cube-face-front"></div>
          <div className="cube-face cube-face-back"></div>
          <div className="cube-face cube-face-right"></div>
          <div className="cube-face cube-face-left"></div>
          <div className="cube-face cube-face-top"></div>
          <div className="cube-face cube-face-bottom"></div>
        </div>
      </div>
      <div className="mt-8 text-cyan-600 dark:text-cyan-400 font-medium flex items-center">
        <Loader2 className="animate-spin mr-2 h-5 w-5" />
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="text-lg"
        >
          Loading Portfolio...
        </motion.span>
      </div>
      <motion.div
        className="w-48 h-1 bg-gray-200 dark:bg-gray-700 rounded-full mt-4 overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        <motion.div
          className="h-full bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full"
          initial={{ width: "0%" }}
          animate={{ width: "100%" }}
          transition={{ duration: 2.5, ease: "easeInOut", repeat: Number.POSITIVE_INFINITY }}
        />
      </motion.div>
    </div>
  )
}

// Static portfolio page with integrated photos and VFX
const StaticPortfolio = ({ portfolioData }) => {
  const photos = usePhotos(portfolioData)
  const { x: parallaxX, y: parallaxY } = useParallax(10)

  // Ensure required properties exist
  const safeData = useMemo(
    () => ({
      name: portfolioData?.name || "Adul S.",
      title: portfolioData?.title || "Junior IT Administrator",
      shortBio:
        portfolioData?.shortBio || "Passionate IT administrator with expertise in network management and support.",
      longBio:
        portfolioData?.longBio ||
        "I'm a dedicated junior IT administrator with a strong foundation in IT infrastructure, networking, and systems maintenance. I enjoy solving complex problems and keeping systems fast, secure, and reliable.",
      profileImage: portfolioData?.profileImage || photos[0] || "/professional-portrait.png",
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

  // State
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState("hero")
  const [scrollY, setScrollY] = useState(0)

  // Refs
  const heroTextRef = useRef<HTMLDivElement | null>(null)
  const mainRef = useRef<HTMLDivElement | null>(null)

  // Scroll effects and active section detection
  useEffect(() => {
    const handleScroll = () => {
      if (typeof window === "undefined") return
      window.requestAnimationFrame(() => {
        const s = window.scrollY
        setScrollY(s)
        const sections = ["hero", "about", "skills", "experience", "projects", "certifications", "contact"]
        for (const section of sections) {
          const el = document.getElementById(section)
          if (!el) continue
          const rect = el.getBoundingClientRect()
          if (rect.top <= 100 && rect.bottom >= 100) {
            setActiveSection(section)
            break
          }
        }
        if (heroTextRef.current) {
          heroTextRef.current.style.transform = `translateY(${s * 0.2}px)`
        }
      })
    }
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const sections = [
    { id: "about", label: "About" },
    { id: "skills", label: "Skills" },
    { id: "experience", label: "Experience" },
    { id: "projects", label: "Projects" },
    { id: "certifications", label: "Certifications" },
    { id: "contact", label: "Contact" },
  ]

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id)
    if (!el) return
    window.scrollTo({ top: el.offsetTop - 80, behavior: "smooth" })
  }

  // Animation variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  }

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
  }

  const pageTransition = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.5, when: "beforeChildren", staggerChildren: 0.08 } },
    exit: { opacity: 0, transition: { duration: 0.3 } },
  }

  // Motion transforms for hero cards
  const cardTranslateX = useTransform(parallaxX, (v) => v * 0.7)
  const cardTranslateY = useTransform(parallaxY, (v) => v * 0.7)

  return (
    <motion.div
      ref={mainRef}
      className="min-h-screen bg-gradient-to-b from-gray-50 via-white to-gray-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950 text-gray-900 dark:text-gray-100 overflow-x-hidden"
      initial="hidden"
      animate="visible"
      exit="exit"
      variants={pageTransition}
    >
      {/* Background decorative motion orbs */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <motion.div
          className="absolute top-1/4 -left-20 w-72 h-72 bg-blue-500/10 dark:bg-blue-500/10 rounded-full blur-3xl"
          animate={{ x: [0, 25, -20, 0], y: [0, -40, 15, 0], scale: [1, 1.07, 0.96, 1], opacity: [0.4, 0.6, 0.4, 0.4] }}
          transition={{ duration: 14, repeat: Number.POSITIVE_INFINITY, repeatType: "loop" }}
        />
        <motion.div
          className="absolute bottom-1/4 -right-20 w-72 h-72 bg-cyan-500/10 dark:bg-cyan-500/10 rounded-full blur-3xl"
          animate={{ x: [0, -25, 20, 0], y: [0, 40, -15, 0], scale: [1, 0.95, 1.08, 1], opacity: [0.4, 0.6, 0.4, 0.4] }}
          transition={{ duration: 16, repeat: Number.POSITIVE_INFINITY, repeatType: "loop", delay: 1.5 }}
        />
        {/* Fine grid */}
        <motion.div
          className="absolute inset-0 bg-grid-pattern opacity-[0.02] dark:opacity-[0.04]"
          animate={{ opacity: [0.02, 0.035, 0.02], scale: [1, 1.03, 1] }}
          transition={{ duration: 18, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse" }}
        />
      </div>

      {/* Top nav */}
      <motion.header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrollY > 50 ? "bg-white/85 dark:bg-gray-900/85 backdrop-blur-md shadow-lg" : "bg-transparent"
        }`}
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <motion.a
            href="#hero"
            className="font-bold text-xl text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 to-blue-600 dark:from-cyan-400 dark:to-blue-400"
          >
            <span className="relative overflow-hidden inline-block">
              <span className="relative z-10">{safeData.name}</span>
            </span>
          </motion.a>
          <nav className="hidden md:block">
            <ul className="flex space-x-8">
              {sections.map((section) => (
                <li key={section.id} className="relative group">
                  <motion.a
                    href={`#${section.id}`}
                    onClick={(e) => {
                      e.preventDefault()
                      scrollToSection(section.id)
                    }}
                    className={`text-sm hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors relative ${
                      activeSection === section.id ? "text-cyan-600 dark:text-cyan-400 font-medium" : ""
                    }`}
                  >
                    {section.label}
                    {activeSection === section.id && (
                      <motion.span
                        className="absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r from-cyan-500 to-blue-600 dark:from-cyan-400 dark:to-blue-500 rounded-full w-full"
                        layoutId="activeSection"
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                      />
                    )}
                  </motion.a>
                </li>
              ))}
            </ul>
          </nav>
          <motion.button
            className="md:hidden p-2 rounded-md text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            onClick={() => {
              const next = !isMenuOpen
              setIsMenuOpen(next)
              document.body.classList.toggle("mobile-nav-open", next)
            }}
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          >
            <AnimatePresence mode="wait">
              {isMenuOpen ? (
                <motion.div
                  key="close"
                  initial={{ rotate: 0 }}
                  animate={{ rotate: 90 }}
                  exit={{ rotate: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <X size={24} />
                </motion.div>
              ) : (
                <motion.div
                  key="menu"
                  initial={{ rotate: 0 }}
                  animate={{ rotate: 0 }}
                  exit={{ rotate: 90 }}
                  transition={{ duration: 0.2 }}
                >
                  <Menu size={24} />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>
        </div>
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              className="md:hidden bg-white/95 dark:bg-gray-900/95 backdrop-blur-md shadow-lg border-t border-gray-200 dark:border-gray-800"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25 }}
            >
              <ul className="py-2">
                {sections.map((section, index) => (
                  <motion.li
                    key={section.id}
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: index * 0.05, duration: 0.25 }}
                  >
                    <motion.a
                      href={`#${section.id}`}
                      onClick={(e) => {
                        e.preventDefault()
                        scrollToSection(section.id)
                        setIsMenuOpen(false)
                        document.body.classList.remove("mobile-nav-open")
                      }}
                      className={`block px-4 py-3 text-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors ${
                        activeSection === section.id ? "text-cyan-600 dark:text-cyan-400 font-medium" : ""
                      }`}
                    >
                      {section.label}
                    </motion.a>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>

      {/* HERO with layered photo cards */}
      <section id="hero" className="min-h-screen flex items-center px-4 md:px-6 pt-20 relative overflow-hidden">
        {/* Ken Burns background accent */}
        <div className="absolute inset-0 -z-10 opacity-[0.10] dark:opacity-[0.12]">
          <div className="absolute inset-0 bg-gradient-to-b from-cyan-500/10 to-blue-600/10" />
          <div
            className="absolute inset-0 kenburns"
            style={{
              backgroundImage: `url('${photos[1]}')`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              filter: "grayscale(30%) blur(1px)",
              opacity: 0.35,
            }}
          />
        </div>

        <div className="max-w-6xl mx-auto w-full grid lg:grid-cols-2 gap-10 items-center">
          {/* Text */}
          <motion.div variants={staggerContainer} initial="hidden" animate="visible" className="relative z-10">
            <div className="animate-fadeIn" ref={heroTextRef}>
              <motion.h1 variants={fadeInUp} className="text-5xl md:text-7xl font-bold tracking-tighter leading-tight">
                Hi, I'm{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 to-blue-600 dark:from-cyan-400 dark:to-blue-400">
                  {safeData.name}
                </span>
              </motion.h1>
              <motion.p variants={fadeInUp} className="mt-4 text-xl md:text-2xl text-gray-600 dark:text-gray-300">
                {safeData.title}
              </motion.p>
              <motion.p variants={fadeInUp} className="mt-4 text-lg text-gray-600 dark:text-gray-400 max-w-2xl">
                {safeData.shortBio}
              </motion.p>

              <motion.div variants={fadeInUp} className="mt-8 flex flex-wrap gap-4">
                <a
                  href="#contact"
                  onClick={(e) => {
                    e.preventDefault()
                    scrollToSection("contact")
                  }}
                  className="px-6 py-3 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-medium hover:shadow-lg transition-all duration-300 hover:scale-[1.02]"
                >
                  Get in touch
                </a>
                <a
                  href={safeData.cvUrl || "#"}
                  download
                  className="px-6 py-3 rounded-lg border-2 border-cyan-500 dark:border-cyan-400 text-cyan-600 dark:text-cyan-400 font-medium hover:bg-cyan-50 dark:hover:bg-cyan-900/20 transition-all duration-300 hover:scale-[1.02] inline-flex items-center"
                >
                  Download CV
                  <Download className="h-4 w-4 ml-2" />
                </a>
              </motion.div>

              {/* Socials */}
              <motion.div variants={fadeInUp} className="flex gap-4 mt-8">
                {safeData.socialLinks?.github && (
                  <a
                    href={safeData.socialLinks.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 bg-white/80 dark:bg-gray-800/80 rounded-full text-gray-600 hover:text-cyan-600 dark:text-gray-400 dark:hover:text-cyan-400 transition-all duration-300 shadow-sm"
                  >
                    <Github className="h-5 w-5" />
                    <span className="sr-only">GitHub</span>
                  </a>
                )}
                {safeData.socialLinks?.linkedin && (
                  <a
                    href={safeData.socialLinks.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 bg-white/80 dark:bg-gray-800/80 rounded-full text-gray-600 hover:text-cyan-600 dark:text-gray-400 dark:hover:text-cyan-400 transition-all duration-300 shadow-sm"
                  >
                    <Linkedin className="h-5 w-5" />
                    <span className="sr-only">LinkedIn</span>
                  </a>
                )}
                {safeData.contact?.email && (
                  <a
                    href={`mailto:${safeData.contact.email}`}
                    className="p-3 bg-white/80 dark:bg-gray-800/80 rounded-full text-gray-600 hover:text-cyan-600 dark:text-gray-400 dark:hover:text-cyan-400 transition-all duration-300 shadow-sm"
                  >
                    <Mail className="h-5 w-5" />
                    <span className="sr-only">Email</span>
                  </a>
                )}
              </motion.div>
            </div>
          </motion.div>

          {/* Layered photo cards with parallax + float */}
          <div className="relative h-[420px] md:h-[520px] lg:h-[580px]">
            {/* Card 1 */}
            <motion.div
              style={{ x: cardTranslateX, y: cardTranslateY }}
              whileHover={{ rotateZ: -1, scale: 1.02 }}
              transition={{ type: "spring", stiffness: 200, damping: 18 }}
              className="absolute left-2 md:left-8 top-6 md:top-4 w-64 md:w-80 lg:w-96 aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl border border-cyan-500/30 backdrop-blur-sm bg-white/10 dark:bg-gray-900/20 vfx-glow"
            >
              <img
                src={photos[0] || "/placeholder.svg"}
                alt="Professional portrait"
                className="w-full h-full object-cover"
                onError={(e) => (e.currentTarget.src = "/diverse-person-portrait.png")}
              />
              <div className="absolute inset-0 ring-1 ring-white/10 dark:ring-white/10 pointer-events-none" />
            </motion.div>

            {/* Card 2 (overlap) */}
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut", delay: 0.5 }}
              whileHover={{ rotateZ: 1.5, scale: 1.03 }}
              className="absolute right-2 md:right-6 bottom-0 w-52 md:w-64 lg:w-72 aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl border border-blue-500/30 bg-white/10 dark:bg-gray-900/20 backdrop-blur-sm vfx-glow"
            >
              <img
                src={photos[1] || "/placeholder.svg"}
                alt="Headshot neutral background"
                className="w-full h-full object-cover"
                onError={(e) => (e.currentTarget.src = "/diverse-person-portrait.png")}
              />
              <div className="absolute inset-0 gradient-fade" />
            </motion.div>
          </div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
          animate={{ y: [0, 10, 0], opacity: [0.6, 1, 0.6] }}
          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
        >
          <a
            href="#about"
            onClick={(e) => {
              e.preventDefault()
              scrollToSection("about")
            }}
            className="p-3 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm shadow-md rounded-full text-gray-600 hover:text-cyan-600 dark:text-gray-400 dark:hover:text-cyan-400 transition-colors flex items-center justify-center"
            aria-label="Scroll to About"
          >
            <ArrowRight className="h-6 w-6 rotate-90" />
          </a>
        </motion.div>
      </section>

      {/* ABOUT with framed portrait and overlapping badge */}
      <section id="about" className="py-20 px-4 md:px-6 relative overflow-hidden">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 items-center">
          {/* Framed portrait */}
          <motion.div
            className="relative w-full aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl bg-gray-200 dark:bg-gray-800 border border-white/10"
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <img
              src={safeData.profileImage || photos[0]}
              alt={`${safeData.name} portrait`}
              className="w-full h-full object-cover"
              onError={(e) => (e.currentTarget.src = "/diverse-person-portrait.png")}
            />
            {/* Overlay small card */}
            <motion.div
              className="absolute -bottom-4 -right-4 md:-right-6 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border border-white/20 rounded-xl shadow-xl p-4 w-[75%] md:w-[65%]"
              initial={{ opacity: 0, y: 20, rotate: 2 }}
              whileInView={{ opacity: 1, y: 0, rotate: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <p className="text-sm text-gray-600 dark:text-gray-300"></p>
              <h3 className="text-lg font-semibold text-cyan-600 dark:text-cyan-400">{safeData.name}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">{safeData.title}</p>
            </motion.div>
          </motion.div>

          {/* Content */}
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <div className="text-center md:text-left">
              <h2 className="text-3xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 to-blue-600 dark:from-cyan-400 dark:to-blue-400 mb-4">
                About Me
              </h2>
              <div className="w-24 h-1 bg-gradient-to-r from-cyan-500 to-blue-600 mx-auto md:mx-0 rounded-full" />
            </div>
            <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">{safeData.longBio}</p>
            <div>
              <h3 className="text-xl font-semibold mb-4 text-cyan-600 dark:text-cyan-400">Core Skills</h3>
              <motion.div
                className="flex flex-wrap gap-3"
                variants={staggerContainer}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                {safeData.coreSkills?.map((skill: string, i: number) => (
                  <motion.span
                    key={skill + i}
                    className="px-4 py-2 bg-gradient-to-r from-cyan-100 to-blue-100 text-cyan-800 dark:from-cyan-900/40 dark:to-blue-900/40 dark:text-cyan-300 rounded-full text-sm font-medium shadow-sm hover:scale-[1.03] transition-transform"
                    variants={fadeInUp}
                  >
                    {skill}
                  </motion.span>
                ))}
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Decorative desk photo divider with parallax */}
      <section aria-hidden="true" className="relative h-[28vh] md:h-[36vh] my-4 overflow-hidden">
        <motion.div className="absolute inset-0" style={{ y: useTransform(parallaxY, (v) => v * 0.4) }}>
          <div
            className="w-full h-full"
            style={{
              backgroundImage: `url('${photos[2]}')`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              filter: "saturate(1.1)",
            }}
          />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-r from-gray-50/85 via-transparent to-gray-50/85 dark:from-gray-900/85 dark:via-gray-900/20 dark:to-gray-900/85" />
      </section>

      {/* SKILLS with abstract background */}
      <section id="skills" className="py-20 px-4 md:px-6 relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.08] dark:opacity-[0.10] -z-10"
          style={{
            backgroundImage: `url('${photos[4]}')`,
            backgroundSize: "800px",
            backgroundRepeat: "repeat",
            backgroundPosition: "center",
            filter: "contrast(1.1) saturate(1)",
          }}
          aria-hidden="true"
        />
        <div className="max-w-6xl mx-auto relative z-10">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 to-blue-600 dark:from-cyan-400 dark:to-blue-400 mb-4">
              Technical Skills
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-cyan-500 to-blue-600 mx-auto rounded-full" />
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            {safeData.skillCategories?.map((category: any, i: number) => (
              <motion.div
                key={category?.name + i}
                className="bg-white/90 dark:bg-gray-900/80 backdrop-blur-sm p-6 rounded-2xl shadow-lg border border-gray-100/50 dark:border-gray-800 hover:translate-y-[-2px] transition-transform"
                variants={fadeInUp}
              >
                <h3 className="text-xl font-semibold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 to-blue-600 dark:from-cyan-400 dark:to-blue-400">
                  {category.name}
                </h3>
                <ul className="space-y-4">
                  {category.skills?.map((skill: any, idx: number) => (
                    <li key={skill.name + idx} className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm font-medium">{skill.name}</span>
                        <span className="text-sm text-gray-500 dark:text-gray-400">{skill.level}%</span>
                      </div>
                      <div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                        <motion.div
                          className="h-full bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full"
                          initial={{ width: 0 }}
                          whileInView={{ width: `${skill.level}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.9, delay: 0.15 + idx * 0.07 }}
                        />
                      </div>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* EXPERIENCE with subtle server rack background strip */}
      <section id="experience" className="py-20 px-4 md:px-6 relative overflow-hidden">
        {/* Right-side vertical strip */}
        <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-[32%] md:w-[28%] opacity-[0.10] dark:opacity-[0.12]">
          <div
            className="w-full h-full"
            style={{
              backgroundImage: `url('${photos[3]}')`,
              backgroundSize: "cover",
              backgroundPosition: "center right",
              filter: "grayscale(30%)",
              maskImage: "linear-gradient(to left, black, transparent)",
              WebkitMaskImage: "linear-gradient(to left, black, transparent)",
            }}
            aria-hidden="true"
          />
        </div>

        <div className="max-w-6xl mx-auto relative z-10">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 to-blue-600 dark:from-cyan-400 dark:to-blue-400 mb-4">
              Work Experience
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-cyan-500 to-blue-600 mx-auto rounded-full" />
          </motion.div>

          {safeData.experiences?.length ? (
            <div className="space-y-12">
              {safeData.experiences.map((experience: any, i: number) => (
                <motion.div
                  key={experience.role + i}
                  className="relative pl-8 md:pl-12 border-l-2 border-cyan-500/70 dark:border-cyan-400/70"
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.6, delay: i * 0.06 }}
                >
                  <motion.div
                    className="absolute w-5 h-5 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full -left-[11px] top-1 shadow-lg shadow-cyan-500/25"
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: 0.2 }}
                  />
                  <div className="p-6 bg-white/90 dark:bg-gray-900/80 backdrop-blur-md rounded-xl shadow-lg border border-gray-100/50 dark:border-gray-800">
                    <div className="flex flex-wrap justify-between items-start gap-2 mb-3">
                      <h3 className="text-xl font-semibold text-cyan-600 dark:text-cyan-400">{experience.role}</h3>
                      <span className="text-xs md:text-sm px-4 py-1 bg-gradient-to-r from-cyan-100 to-blue-100 text-cyan-800 dark:from-cyan-900/40 dark:to-blue-900/40 dark:text-cyan-300 rounded-full font-medium shadow-sm">
                        {experience.period}
                      </span>
                    </div>
                    <p className="text-gray-600 dark:text-gray-400 mb-2">{experience.company}</p>
                    <p className="text-gray-700 dark:text-gray-300">{experience.description}</p>

                    {experience.achievements?.length ? (
                      <div className="pt-4">
                        <h4 className="font-medium mb-2 text-gray-800 dark:text-gray-200">Key Achievements</h4>
                        <ul className="space-y-2">
                          {experience.achievements.map((ach: string, idx: number) => (
                            <li key={idx} className="flex items-start gap-2 text-gray-700 dark:text-gray-300">
                              <ArrowRight className="h-5 w-5 text-cyan-500 dark:text-cyan-400 flex-shrink-0 mt-0.5" />
                              <span>{ach}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ) : null}
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 text-gray-500 dark:text-gray-400">No work experience added yet.</div>
          )}
        </div>
      </section>

      {/* PROJECTS */}
      <section id="projects" className="py-20 px-4 md:px-6 relative overflow-hidden">
        <div className="max-w-6xl mx-auto relative z-10">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 to-blue-600 dark:from-cyan-400 dark:to-blue-400 mb-4">
              Projects
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-cyan-500 to-blue-600 mx-auto rounded-full" />
          </motion.div>

          {safeData.projects?.length ? (
            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 gap-8"
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
            >
              {safeData.projects.map((project: any, idx: number) => (
                <motion.div
                  key={project.title + idx}
                  className="bg-white/90 dark:bg-gray-900/80 backdrop-blur-sm rounded-2xl overflow-hidden shadow-lg border border-gray-100/50 dark:border-gray-800 hover:translate-y-[-2px] transition-transform"
                  variants={fadeInUp}
                >
                  <div className="aspect-video relative bg-gray-200 dark:bg-gray-800 overflow-hidden">
                    <img
                      src={project.image || "/placeholder.svg?height=200&width=400&query=project"}
                      alt={project.title}
                      className="object-cover w-full h-full"
                    />
                  </div>
                  <div className="p-6 space-y-4">
                    <h3 className="text-xl font-semibold text-cyan-600 dark:text-cyan-400">{project.title}</h3>
                    <p className="text-gray-600 dark:text-gray-400">{project.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {project.technologies?.map((tech: string, i2: number) => (
                        <span
                          key={tech + i2}
                          className="px-3 py-1 bg-gradient-to-r from-cyan-100 to-blue-100 text-cyan-800 dark:from-cyan-900/30 dark:to-blue-900/30 dark:text-cyan-300 rounded-full text-xs font-medium"
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
                        className="inline-flex items-center mt-2 text-cyan-600 dark:text-cyan-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                      >
                        View Project <ArrowRight className="ml-2 h-4 w-4" />
                      </a>
                    )}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <div className="text-center py-12 text-gray-500 dark:text-gray-400">No projects added yet.</div>
          )}
        </div>
      </section>

      {/* CERTIFICATIONS (kept as-is with visual consistency) */}
      <CertificationSection certifications={safeData.certifications} />

      {/* CONTACT with blurred photo background (frosted card) */}
      <section id="contact" className="py-20 px-4 md:px-6 relative overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `url('${photos[2]}')`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              filter: "blur(6px) saturate(0.9) brightness(0.9)",
              opacity: 0.35,
            }}
            aria-hidden="true"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-white/60 via-white/30 to-white/60 dark:from-gray-900/60 dark:via-gray-900/30 dark:to-gray-900/60" />
        </div>

        <div className="max-w-3xl mx-auto">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 to-blue-600 dark:from-cyan-400 dark:to-blue-400 mb-4">
              Get In Touch
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-cyan-500 to-blue-600 mx-auto rounded-full" />
          </motion.div>

          <motion.div
            className="frosted-card p-8 rounded-2xl shadow-2xl border border-white/30 dark:border-white/10"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5 }}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <h3 className="text-xl font-semibold text-cyan-600 dark:text-cyan-400">Contact Information</h3>
                <p className="text-gray-600 dark:text-gray-400">Feel free to reach out directly:</p>
                <div className="space-y-4 pt-2">
                  {safeData.contact?.email && (
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-cyan-100 dark:bg-cyan-900/30 rounded-full">
                        <Mail className="h-5 w-5 text-cyan-600 dark:text-cyan-400" />
                      </div>
                      <a
                        href={`mailto:${safeData.contact.email}`}
                        className="hover:text-cyan-600 dark:hover:text-cyan-400"
                      >
                        {safeData.contact.email}
                      </a>
                    </div>
                  )}
                  {safeData.contact?.phone && (
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-cyan-100 dark:bg-cyan-900/30 rounded-full">
                        <Phone className="h-5 w-5 text-cyan-600 dark:text-cyan-400" />
                      </div>
                      <span>{safeData.contact.phone}</span>
                    </div>
                  )}
                  {safeData.contact?.location && (
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-cyan-100 dark:bg-cyan-900/30 rounded-full">
                        <MapPin className="h-5 w-5 text-cyan-600 dark:text-cyan-400" />
                      </div>
                      <span>{safeData.contact.location}</span>
                    </div>
                  )}
                </div>
                <div className="flex gap-3 pt-2">
                  {safeData.socialLinks?.github && (
                    <a
                      href={safeData.socialLinks.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 bg-gray-100 dark:bg-gray-800 rounded-full text-gray-600 hover:text-cyan-600 dark:text-gray-400 dark:hover:text-cyan-400 transition-colors"
                    >
                      <Github className="h-5 w-5" />
                      <span className="sr-only">GitHub</span>
                    </a>
                  )}
                  {safeData.socialLinks?.linkedin && (
                    <a
                      href={safeData.socialLinks.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 bg-gray-100 dark:bg-gray-800 rounded-full text-gray-600 hover:text-cyan-600 dark:text-gray-400 dark:hover:text-cyan-400 transition-colors"
                    >
                      <Linkedin className="h-5 w-5" />
                      <span className="sr-only">LinkedIn</span>
                    </a>
                  )}
                </div>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-4 text-cyan-600 dark:text-cyan-400">Send a Message</h3>
                <form className="space-y-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium mb-1">
                      Name
                    </label>
                    <input
                      id="name"
                      className="w-full px-4 py-2 rounded-md bg-white/80 dark:bg-gray-800/80 border border-gray-300/50 dark:border-gray-700/50 focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-shadow"
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium mb-1">
                      Email
                    </label>
                    <input
                      id="email"
                      type="email"
                      className="w-full px-4 py-2 rounded-md bg-white/80 dark:bg-gray-800/80 border border-gray-300/50 dark:border-gray-700/50 focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-shadow"
                      placeholder="Your email"
                    />
                  </div>
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium mb-1">
                      Message
                    </label>
                    <textarea
                      id="message"
                      rows={4}
                      className="w-full px-4 py-2 rounded-md bg-white/80 dark:bg-gray-800/80 border border-gray-300/50 dark:border-gray-700/50 focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-shadow"
                      placeholder="Your message"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-medium rounded-lg hover:shadow-lg transition-all duration-300 hover:scale-[1.01]"
                  >
                    Send Message
                  </button>
                </form>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 md:px-6 border-t border-gray-200 dark:border-gray-800 bg-gray-50/80 dark:bg-gray-900/80 backdrop-blur-sm relative">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <motion.p
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-gray-600 dark:text-gray-400"
          >
            © {new Date().getFullYear()} {safeData.name}. All rights reserved.
          </motion.p>
          <motion.div
            className="flex gap-4"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            {safeData.socialLinks?.github && (
              <a
                href={safeData.socialLinks.github}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 text-gray-600 hover:text-cyan-600 dark:text-gray-400 dark:hover:text-cyan-400 transition-colors"
              >
                <Github className="h-5 w-5" />
              </a>
            )}
            {safeData.socialLinks?.linkedin && (
              <a
                href={safeData.socialLinks.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 text-gray-600 hover:text-cyan-600 dark:text-gray-400 dark:hover:text-cyan-400 transition-colors"
              >
                <Linkedin className="h-5 w-5" />
              </a>
            )}
          </motion.div>
        </div>
      </footer>

      {/* Global styles for VFX */}
      <style jsx global>{`
        /* 3D loader */
        .perspective-3d {
          perspective: 800px;
          width: 100px;
          height: 100px;
          position: relative;
        }
        .cube {
          width: 100%;
          height: 100%;
          position: relative;
          transform-style: preserve-3d;
          animation: rotate 5s infinite linear;
        }
        .cube-face {
          position: absolute;
          width: 100%;
          height: 100%;
          opacity: 0.8;
          border: 2px solid rgba(6, 182, 212, 0.5);
        }
        .cube-face-front { transform: translateZ(50px); background: linear-gradient(45deg, rgba(6, 182, 212, 0.2), rgba(37, 99, 235, 0.2)); }
        .cube-face-back { transform: rotateY(180deg) translateZ(50px); background: linear-gradient(45deg, rgba(6, 182, 212, 0.2), rgba(37, 99, 235, 0.2)); }
        .cube-face-right { transform: rotateY(90deg) translateZ(50px); background: linear-gradient(45deg, rgba(6, 182, 212, 0.2), rgba(37, 99, 235, 0.2)); }
        .cube-face-left { transform: rotateY(-90deg) translateZ(50px); background: linear-gradient(45deg, rgba(6, 182, 212, 0.2), rgba(37, 99, 235, 0.2)); }
        .cube-face-top { transform: rotateX(90deg) translateZ(50px); background: linear-gradient(45deg, rgba(6, 182, 212, 0.2), rgba(37, 99, 235, 0.2)); }
        .cube-face-bottom { transform: rotateX(-90deg) translateZ(50px); background: linear-gradient(45deg, rgba(6, 182, 212, 0.2), rgba(37, 99, 235, 0.2)); }
        @keyframes rotate { 0% { transform: rotateX(0) rotateY(0) rotateZ(0); } 100% { transform: rotateX(360deg) rotateY(360deg) rotateZ(360deg); } }

        /* Hero ken burns */
        .kenburns {
          animation: kenburns-zoom 18s ease-in-out infinite alternate;
        }
        @keyframes kenburns-zoom {
          0% { transform: scale(1) translate3d(0,0,0); }
          100% { transform: scale(1.06) translate3d(0,-1%,0); }
        }

        /* Subtle glow */
        .vfx-glow {
          box-shadow:
            0 10px 40px rgba(6, 182, 212, 0.18),
            0 2px 12px rgba(37, 99, 235, 0.12);
        }

        /* Gradient overlay fade for images */
        .gradient-fade {
          background: linear-gradient(to top, rgba(0,0,0,0.25), rgba(0,0,0,0));
          pointer-events: none;
        }

        /* Frosted glass card */
        .frosted-card {
          background: linear-gradient(
              to bottom right,
              rgba(255, 255, 255, 0.85),
              rgba(255, 255, 255, 0.75)
            );
          -webkit-backdrop-filter: blur(10px);
          backdrop-filter: blur(10px);
        }
        :root.dark .frosted-card {
          background: linear-gradient(
              to bottom right,
              rgba(17, 24, 39, 0.75),
              rgba(17, 24, 39, 0.65)
            );
        }

        /* Grid pattern */
        .bg-grid-pattern {
          background-image:
            linear-gradient(to right, rgba(6, 182, 212, 0.12) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(6, 182, 212, 0.12) 1px, transparent 1px);
          background-size: 40px 40px;
        }

        /* Basic animations */
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn { animation: fadeIn 1s ease forwards; }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }

        /* Mobile nav helper */
        @media (max-width: 768px) {
          .mobile-nav-open { overflow: hidden; }
        }
      `}</style>
    </motion.div>
  )
}

// Page wrapper with loader
export default function ClientPage({ portfolioData }) {
  const [isClient, setIsClient] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    setIsClient(true)
    const timer = setTimeout(() => setIsLoading(false), 1000)
    return () => clearTimeout(timer)
  }, [])

  return (
    <AnimatePresence mode="wait">
      {isLoading || !isClient ? (
        <motion.div
          key="loader"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
        >
          <Enhanced3DLoader />
        </motion.div>
      ) : (
        <motion.div
          key="portfolio"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
        >
          <StaticPortfolio portfolioData={portfolioData} />
        </motion.div>
      )}
    </AnimatePresence>
  )
}
