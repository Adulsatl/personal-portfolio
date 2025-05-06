"use client"
import { useState, useEffect, useRef } from "react"
import {
  Menu,
  X,
  ExternalLink,
  Award,
  FileText,
  Filter,
  ArrowRight,
  Github,
  Linkedin,
  Mail,
  Phone,
  MapPin,
  Download,
  Server,
  Shield,
  Terminal,
  Loader2,
} from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

// Enhanced 3D Loader Component with improved animation
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

      {/* Loading progress bar */}
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

// Simple static component that doesn't create any promises
const StaticPortfolio = ({ portfolioData }) => {
  // Ensure all required properties exist with safe defaults
  const safeData = {
    name: portfolioData?.name || "Adul S.",
    title: portfolioData?.title || "Junior IT Administrator",
    shortBio: portfolioData?.shortBio || "Passionate IT administrator with expertise in network management.",
    longBio:
      portfolioData?.longBio ||
      "I'm a dedicated junior IT administrator with a strong foundation in IT infrastructure management.",
    profileImage: portfolioData?.profileImage || "/placeholder.svg?height=400&width=400",
    cvUrl: portfolioData?.cvUrl || "#",
    coreSkills: portfolioData?.coreSkills || ["Windows Server", "Linux Administration", "Network Management"],
    skillCategories: portfolioData?.skillCategories || [],
    experiences: portfolioData?.experiences || [],
    projects: portfolioData?.projects || [],
    socialLinks: portfolioData?.socialLinks || {},
    contact: portfolioData?.contact || {},
    certifications: portfolioData?.certifications || [],
  }

  // State for mobile navigation
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState("hero")
  const [scrollY, setScrollY] = useState(0)

  // State for certification section
  const [displayMode, setDisplayMode] = useState("both")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [showFilters, setShowFilters] = useState(false)

  // Refs for scroll animations
  const sectionsRef = useRef({})
  const heroTextRef = useRef(null)
  const mainRef = useRef(null)

  // Handle scroll events to update active section and parallax effects
  useEffect(() => {
    const handleScroll = () => {
      // Use requestAnimationFrame for better performance
      if (typeof window !== "undefined") {
        window.requestAnimationFrame(() => {
          const scrollPosition = window.scrollY
          setScrollY(scrollPosition)

          // Determine active section based on scroll position
          const sections = ["hero", "about", "skills", "experience", "projects", "certifications", "contact"]

          for (const section of sections) {
            const element = document.getElementById(section)
            if (element) {
              const rect = element.getBoundingClientRect()
              if (rect.top <= 100 && rect.bottom >= 100) {
                setActiveSection(section)
                break
              }
            }
          }

          // Apply parallax effect to hero text
          if (heroTextRef.current) {
            heroTextRef.current.style.transform = `translateY(${scrollPosition * 0.3}px)`
          }
        })
      }
    }

    if (typeof window !== "undefined") {
      window.addEventListener("scroll", handleScroll, { passive: true })
      return () => window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  // Navigation sections
  const sections = [
    { id: "about", label: "About" },
    { id: "skills", label: "Skills" },
    { id: "experience", label: "Experience" },
    { id: "projects", label: "Projects" },
    { id: "certifications", label: "Certifications" },
    { id: "contact", label: "Contact" },
  ]

  // Toggle mobile menu
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
    // Prevent body scrolling when menu is open
    if (typeof document !== "undefined") {
      if (!isMenuOpen) {
        document.body.classList.add("mobile-nav-open")
      } else {
        document.body.classList.remove("mobile-nav-open")
      }
    }
  }

  // Close menu when clicking a link
  const handleNavClick = () => {
    setIsMenuOpen(false)
    if (typeof document !== "undefined") {
      document.body.classList.remove("mobile-nav-open")
    }
  }

  // Certification section logic
  const hasCertifications = safeData.certifications && safeData.certifications.length > 0

  // Extract unique categories
  const certificationCategories = hasCertifications
    ? ["all", ...new Set(safeData.certifications.map((cert) => cert.category || "Uncategorized"))]
    : ["all"]

  // Filter certifications by category
  const filteredCertifications = hasCertifications
    ? selectedCategory === "all"
      ? safeData.certifications
      : safeData.certifications.filter((cert) => cert.category === selectedCategory)
    : []

  // Debug log certifications
  console.log("All certifications:", safeData.certifications)
  console.log("Filtered certifications:", filteredCertifications)

  // Filter by image type - ensure each cert has an id and proper properties
  const certificatesWithImages = filteredCertifications
    .filter((cert) => cert && cert.image && cert.image.trim() !== "")
    .map((cert, index) => ({
      ...cert,
      id: cert.id || `cert-${index}`,
      category: cert.category || "Uncategorized",
      date: cert.date || "N/A",
      issuer: cert.issuer || "N/A",
    }))

  const certificatesWithBadges = filteredCertifications
    .filter((cert) => cert && cert.badgeImage && cert.badgeImage.trim() !== "")
    .map((cert, index) => ({
      ...cert,
      id: cert.id || `badge-${index}`,
      category: cert.category || "Uncategorized",
      date: cert.date || "N/A",
      issuer: cert.issuer || "N/A",
    }))

  console.log("Certificates with images:", certificatesWithImages)
  console.log("Certificates with badges:", certificatesWithBadges)

  // Smooth scroll to section with animation
  const scrollToSection = (sectionId) => {
    if (typeof window !== "undefined") {
      const section = document.getElementById(sectionId)
      if (section) {
        // Enhanced smooth scrolling
        window.scrollTo({
          top: section.offsetTop - 80,
          behavior: "smooth",
        })
      }
    }
  }

  // Animation variants for framer-motion
  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  }

  const fadeIn = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.6 } },
  }

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  // Enhanced page transition
  const pageTransition = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.5,
        when: "beforeChildren",
        staggerChildren: 0.1,
      },
    },
    exit: {
      opacity: 0,
      transition: { duration: 0.3 },
    },
  }

  return (
    <motion.div
      ref={mainRef}
      className="min-h-screen bg-gradient-to-b from-gray-50 via-white to-gray-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 text-gray-900 dark:text-gray-100 overflow-x-hidden"
      initial="hidden"
      animate="visible"
      exit="exit"
      variants={pageTransition}
    >
      {/* Background Elements with enhanced effects */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        {/* Animated gradient orbs with improved animation */}
        <motion.div
          className="absolute top-1/4 -left-20 w-72 h-72 bg-blue-500/10 dark:bg-blue-500/5 rounded-full blur-3xl"
          animate={{
            x: [0, 30, -20, 0],
            y: [0, -50, 20, 0],
            scale: [1, 1.1, 0.9, 1],
            opacity: [0.5, 0.7, 0.5, 0.5],
          }}
          transition={{
            duration: 15,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "loop",
          }}
        />
        <motion.div
          className="absolute bottom-1/4 -right-20 w-72 h-72 bg-cyan-500/10 dark:bg-cyan-500/5 rounded-full blur-3xl"
          animate={{
            x: [0, -30, 20, 0],
            y: [0, 50, -20, 0],
            scale: [1, 0.9, 1.1, 1],
            opacity: [0.5, 0.7, 0.5, 0.5],
          }}
          transition={{
            duration: 15,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "loop",
            delay: 2,
          }}
        />
        <motion.div
          className="absolute top-3/4 left-1/3 w-72 h-72 bg-indigo-500/10 dark:bg-indigo-500/5 rounded-full blur-3xl"
          animate={{
            x: [0, 20, -30, 0],
            y: [0, -20, 50, 0],
            scale: [1, 1.2, 0.8, 1],
            opacity: [0.5, 0.7, 0.5, 0.5],
          }}
          transition={{
            duration: 15,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "loop",
            delay: 4,
          }}
        />

        {/* Enhanced grid pattern with subtle animation */}
        <motion.div
          className="absolute inset-0 bg-grid-pattern opacity-[0.02] dark:opacity-[0.03]"
          animate={{
            scale: [1, 1.05, 1],
            opacity: [0.02, 0.03, 0.02],
          }}
          transition={{
            duration: 20,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "reverse",
          }}
        />

        {/* Enhanced animated gradient background */}
        <motion.div
          className="absolute inset-0 opacity-30 dark:opacity-20"
          style={{
            background: "radial-gradient(circle at center, rgba(6, 182, 212, 0.1) 0%, rgba(6, 182, 212, 0) 70%)",
          }}
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.3, 0.2, 0.3],
          }}
          transition={{
            duration: 10,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "reverse",
          }}
        />

        {/* New digital circuit lines */}
        <div className="absolute inset-0 overflow-hidden opacity-[0.03] dark:opacity-[0.05] circuit-lines"></div>
      </div>

      {/* Navigation Bar with enhanced animations */}
      <motion.header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrollY > 50 ? "bg-white/90 dark:bg-gray-900/90 backdrop-blur-md shadow-lg" : "bg-transparent"
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

          {/* Desktop Navigation with enhanced hover effects */}
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

          {/* Mobile Menu Button with enhanced animation */}
          <motion.button
            className="md:hidden p-2 rounded-md text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            onClick={toggleMenu}
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

        {/* Mobile Navigation with enhanced animations */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              className="md:hidden bg-white/95 dark:bg-gray-900/95 backdrop-blur-md shadow-lg border-t border-gray-200 dark:border-gray-800"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <ul className="py-2">
                {sections.map((section, index) => (
                  <motion.li
                    key={section.id}
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: index * 0.05, duration: 0.3 }}
                  >
                    <motion.a
                      href={`#${section.id}`}
                      onClick={(e) => {
                        e.preventDefault()
                        scrollToSection(section.id)
                        handleNavClick()
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

      {/* Hero Section with enhanced animations */}
      <section
        id="hero"
        className="min-h-screen flex flex-col justify-center items-center px-4 md:px-6 pt-16 relative overflow-hidden"
      >
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-hero-pattern opacity-[0.03] dark:opacity-[0.05]"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-cyan-500/5 to-blue-600/5 dark:from-cyan-400/5 dark:to-blue-500/5"></div>
        </div>

        <motion.div
          className="max-w-3xl mx-auto text-center space-y-6 z-10 relative"
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
        >
          <div className="animate-fadeIn" ref={heroTextRef}>
            <motion.div className="relative mb-6 inline-block" variants={fadeInUp}>
              <h1 className="text-5xl md:text-7xl font-bold tracking-tighter mb-4 hero-text">
                Hi, I'm{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 to-blue-600 dark:from-cyan-400 dark:to-blue-400 relative">
                  {safeData.name}
                </span>
              </h1>
            </motion.div>

            <motion.div className="relative" variants={fadeInUp}>
              <p className="text-xl md:text-3xl text-gray-600 dark:text-gray-300 mb-6 animate-fadeIn animation-delay-300 typewriter">
                <span className="inline-block">{safeData.title}</span>
                <motion.span
                  className="inline-block w-1 h-8 bg-cyan-500 dark:bg-cyan-400 ml-1"
                  animate={{ opacity: [1, 0, 1] }}
                  transition={{
                    duration: 1,
                    repeat: Number.POSITIVE_INFINITY,
                    repeatType: "loop",
                  }}
                />
              </p>
            </motion.div>

            <motion.p
              className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed"
              variants={fadeInUp}
            >
              {safeData.shortBio}
            </motion.p>
          </div>

          <motion.div className="flex flex-wrap justify-center gap-4 pt-4" variants={fadeInUp}>
            <motion.a
              href="#contact"
              onClick={(e) => {
                e.preventDefault()
                scrollToSection("contact")
              }}
              className="px-6 py-3 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-medium hover:shadow-lg transition-all duration-300"
            >
              <span className="relative z-10">Get in touch</span>
            </motion.a>

            <motion.a
              href={safeData.cvUrl || "#"}
              download
              className="px-6 py-3 rounded-lg border-2 border-cyan-500 dark:border-cyan-400 text-cyan-600 dark:text-cyan-400 font-medium hover:bg-cyan-50 dark:hover:bg-cyan-900/20 transition-all duration-300"
            >
              <span className="relative z-10 flex items-center">
                Download CV
                <motion.span
                  className="ml-2"
                  animate={{ y: [0, 5, 0] }}
                  transition={{
                    duration: 1.5,
                    repeat: Number.POSITIVE_INFINITY,
                    repeatType: "loop",
                  }}
                >
                  <Download className="h-4 w-4" />
                </motion.span>
              </span>
            </motion.a>
          </motion.div>

          {/* Social Links with enhanced animations */}
          <motion.div className="flex justify-center gap-4 mt-8" variants={fadeInUp}>
            {safeData.socialLinks?.github && (
              <motion.a
                href={safeData.socialLinks.github}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-white/80 dark:bg-gray-800/80 rounded-full text-gray-600 hover:text-cyan-600 dark:text-gray-400 dark:hover:text-cyan-400 transition-all duration-300 shadow-sm"
              >
                <Github className="h-5 w-5" />
              </motion.a>
            )}

            {safeData.socialLinks?.linkedin && (
              <motion.a
                href={safeData.socialLinks.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-white/80 dark:bg-gray-800/80 rounded-full text-gray-600 hover:text-cyan-600 dark:text-gray-400 dark:hover:text-cyan-400 transition-all duration-300 shadow-sm"
              >
                <Linkedin className="h-5 w-5" />
              </motion.a>
            )}

            {safeData.contact?.email && (
              <motion.a
                href={`mailto:${safeData.contact.email}`}
                className="p-3 bg-white/80 dark:bg-gray-800/80 rounded-full text-gray-600 hover:text-cyan-600 dark:text-gray-400 dark:hover:text-cyan-400 transition-all duration-300 shadow-sm"
              >
                <Mail className="h-5 w-5" />
              </motion.a>
            )}
          </motion.div>
        </motion.div>

        {/* Enhanced scroll indicator */}
        <motion.div
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
          animate={{
            y: [0, 10, 0],
            opacity: [0.6, 1, 0.6],
          }}
          transition={{
            duration: 2,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "loop",
          }}
        >
          <motion.a
            href="#about"
            onClick={(e) => {
              e.preventDefault()
              scrollToSection("about")
            }}
            className="p-3 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm shadow-md rounded-full text-gray-600 hover:text-cyan-600 dark:text-gray-400 dark:hover:text-cyan-400 transition-colors flex items-center justify-center"
          >
            <ArrowRight className="h-6 w-6" />
            <span className="sr-only">Scroll down</span>
          </motion.a>
        </motion.div>
      </section>

      {/* About Section with enhanced animations */}
      <section
        id="about"
        className="py-20 px-4 md:px-6 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm relative overflow-hidden"
      >
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-about-pattern opacity-[0.02] dark:opacity-[0.03]"></div>
        </div>

        <div className="max-w-5xl mx-auto relative z-10">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 to-blue-600 dark:from-cyan-400 dark:to-blue-400 mb-4">
              About Me
            </h2>
            <motion.div
              className="w-24 h-1 bg-gradient-to-r from-cyan-500 to-blue-600 mx-auto rounded-full"
              initial={{ width: 0 }}
              whileInView={{ width: 96 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            />
          </motion.div>

          <div className="grid md:grid-cols-2 gap-10 items-center">
            <motion.div
              className="aspect-square rounded-xl overflow-hidden bg-gray-200 dark:bg-gray-700 shadow-xl"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
            >
              <img
                src={safeData.profileImage || "/placeholder.svg?height=400&width=400"}
                alt={safeData.name}
                className="w-full h-full object-cover"
              />
            </motion.div>

            <motion.div
              className="space-y-6"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
            >
              <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed animated-text">
                {safeData.longBio}
              </p>

              <div className="pt-4">
                <h3 className="text-xl font-semibold mb-4 text-cyan-600 dark:text-cyan-400">Core Skills</h3>
                <motion.div
                  className="flex flex-wrap gap-3"
                  variants={staggerContainer}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-100px" }}
                >
                  {safeData.coreSkills?.map((skill, index) => (
                    <motion.span
                      key={index}
                      className="px-4 py-2 bg-gradient-to-r from-cyan-100 to-blue-100 text-cyan-800 dark:from-cyan-900/40 dark:to-blue-900/40 dark:text-cyan-300 rounded-full text-sm font-medium shadow-sm"
                      variants={fadeInUp}
                    >
                      {skill}
                    </motion.span>
                  ))}
                </motion.div>
              </div>
            </motion.div>
          </div>

          {/* Features section with enhanced animations */}
          <div className="mt-20">
            <motion.div
              className="grid grid-cols-1 md:grid-cols-3 gap-8"
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
            >
              {[
                {
                  icon: Server,
                  title: "IT Administration",
                  description:
                    "I have comprehensive experience in administering both Linux and Windows OS, ensuring that systems are optimized for performance, reliability, and security.",
                },
                {
                  icon: Terminal,
                  title: "Troubleshooting & Maintenance",
                  description:
                    "Skilled in diagnosing and resolving hardware, software, and network issues to ensure optimal system performance. Proficient in routine maintenance, updates, and preventive measures to reduce downtime and improve reliability.",
                },
                {
                  icon: Shield,
                  title: "Asset Management",
                  description:
                    "I specialize in asset management, focusing on strategic planning, optimization, and long-term value creation. By aligning resources with business goals, I help maximize efficiency, minimize costs, and ensure sustainable growth.",
                },
              ].map((feature, index) => (
                <motion.div
                  key={index}
                  className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm p-6 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700 h-full transition-all duration-300"
                  variants={fadeInUp}
                >
                  <div className="relative mb-6">
                    <div className="relative bg-gradient-to-r from-cyan-100 to-blue-100 dark:from-cyan-900/40 dark:to-blue-900/40 p-4 rounded-full w-16 h-16 flex items-center justify-center">
                      <feature.icon className="h-8 w-8 text-cyan-600 dark:text-cyan-400" />
                    </div>
                  </div>
                  <h3 className="text-xl font-semibold mb-2 text-cyan-600 dark:text-cyan-400">{feature.title}</h3>
                  <p className="text-gray-600 dark:text-gray-400">{feature.description}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>

        {/* Background decoration */}
        <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-cyan-100 dark:bg-cyan-900/20 rounded-full opacity-50 blur-3xl"></div>
        <div className="absolute -top-24 -left-24 w-64 h-64 bg-blue-100 dark:bg-blue-900/20 rounded-full opacity-50 blur-3xl"></div>
      </section>

      {/* Skills Section with enhanced animations */}
      <section
        id="skills"
        className="py-20 px-4 md:px-6 bg-gray-50/80 dark:bg-gray-900/80 backdrop-blur-sm relative overflow-hidden"
      >
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-skills-pattern opacity-[0.02] dark:opacity-[0.03]"></div>
          <div className="absolute top-0 left-0 w-full h-20 bg-gradient-to-b from-white/50 to-transparent dark:from-gray-900/50"></div>
          <div className="absolute bottom-0 left-0 w-full h-20 bg-gradient-to-t from-white/50 to-transparent dark:from-gray-900/50"></div>
        </div>

        <div className="max-w-5xl mx-auto relative z-10">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 to-blue-600 dark:from-cyan-400 dark:to-blue-400 mb-4">
              Technical Skills
            </h2>
            <motion.div
              className="w-24 h-1 bg-gradient-to-r from-cyan-500 to-blue-600 mx-auto rounded-full"
              initial={{ width: 0 }}
              whileInView={{ width: 96 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            />
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            {safeData.skillCategories?.map((category, index) => (
              <motion.div
                key={index}
                className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg transition-all duration-300 border border-gray-100 dark:border-gray-700"
                variants={fadeInUp}
              >
                <h3 className="text-xl font-semibold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 to-blue-600 dark:from-cyan-400 dark:to-blue-400 transition-all duration-500">
                  {category.name}
                </h3>
                <ul className="space-y-4">
                  {category.skills?.map((skill, skillIndex) => (
                    <li key={skillIndex} className="space-y-2">
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
                          transition={{ duration: 1, delay: 0.2 + skillIndex * 0.1 }}
                        />
                      </div>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </motion.div>

          {/* Enhanced skill cloud with 3D effect */}
          <motion.div
            className="mt-16 p-8 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-xl shadow-lg border border-gray-100 dark:border-gray-700"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="text-xl font-semibold mb-6 text-center text-cyan-600 dark:text-cyan-400">
              Technologies & Tools
            </h3>
            <motion.div
              className="flex flex-wrap justify-center gap-3"
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {[
                "Windows",
                "Linux",
                "Mac",
                "Active Directory",
                "AWS",
                "VMware",
                "Docker",
                "PowerShell",
                "Bash",
                "Python",
                "Networking",
                "VPN",
                "DNS",
                "DHCP",
                "Backup Solutions",
                "Selenium Webdriver",
                "Adobe",
                "Rufus",
              ].map((tech, index) => (
                <motion.span
                  key={index}
                  className="px-3 py-1.5 bg-gradient-to-r from-cyan-50 to-blue-50 dark:from-cyan-900/20 dark:to-blue-900/20 text-gray-700 dark:text-gray-300 rounded-full text-sm"
                  variants={fadeInUp}
                  style={{
                    fontSize: "0.875rem", // Consistent font size
                  }}
                >
                  {tech}
                </motion.span>
              ))}
            </motion.div>
          </motion.div>
        </div>

        {/* Background decoration */}
        <div className="absolute top-1/2 left-0 w-full h-px bg-gradient-to-r from-transparent via-gray-300 dark:via-gray-700 to-transparent"></div>
      </section>

      {/* Experience Section with enhanced animations */}
      <section
        id="experience"
        className="py-20 px-4 md:px-6 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm relative overflow-hidden"
      >
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 opacity-[0.02] dark:opacity-[0.03]"></div>
        </div>

        <div className="max-w-5xl mx-auto relative z-10">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 to-blue-600 dark:from-cyan-400 dark:to-blue-400 mb-4">
              Work Experience
            </h2>
            <motion.div
              className="w-24 h-1 bg-gradient-to-r from-cyan-500 to-blue-600 mx-auto rounded-full"
              initial={{ width: 0 }}
              whileInView={{ width: 96 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            />
          </motion.div>

          {safeData.experiences && safeData.experiences.length > 0 ? (
            <div className="space-y-12">
              {safeData.experiences.map((experience, index) => (
                <motion.div
                  key={index}
                  className="relative pl-8 md:pl-12 border-l-2 border-cyan-500 dark:border-cyan-400"
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <motion.div
                    className="absolute w-5 h-5 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full -left-[11px] top-1 shadow-md shadow-cyan-500/30 dark:shadow-cyan-400/20"
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: 0.2 }}
                  />

                  <motion.div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg transition-all duration-300 border border-gray-100 dark:border-gray-700">
                    <div className="flex flex-wrap justify-between items-start gap-2 mb-4">
                      <h3 className="text-xl font-semibold text-cyan-600 dark:text-cyan-400">{experience.role}</h3>
                      <span className="text-sm px-4 py-1 bg-gradient-to-r from-cyan-100 to-blue-100 text-cyan-800 dark:from-cyan-900/40 dark:to-blue-900/40 dark:text-cyan-300 rounded-full font-medium shadow-sm">
                        {experience.period}
                      </span>
                    </div>

                    <p className="text-gray-600 dark:text-gray-400 mb-2">{experience.company}</p>
                    <p className="text-gray-700 dark:text-gray-300 mb-4">{experience.description}</p>

                    {experience.achievements && experience.achievements.length > 0 && (
                      <motion.div
                        className="pt-2"
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.3, delay: 0.3 }}
                      >
                        <h4 className="font-medium mb-3 text-gray-800 dark:text-gray-200">Key Achievements:</h4>
                        <ul className="space-y-2">
                          {experience.achievements.map((achievement, achievementIndex) => (
                            <motion.li
                              key={achievementIndex}
                              className="flex items-start gap-2 text-gray-700 dark:text-gray-300"
                              initial={{ opacity: 0, x: -10 }}
                              whileInView={{ opacity: 1, x: 0 }}
                              viewport={{ once: true }}
                              transition={{ duration: 0.3, delay: 0.4 + achievementIndex * 0.05 }}
                            >
                              <ArrowRight className="h-5 w-5 text-cyan-500 dark:text-cyan-400 flex-shrink-0 mt-0.5" />
                              <span>{achievement}</span>
                            </motion.li>
                          ))}
                        </ul>
                      </motion.div>
                    )}
                  </motion.div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 text-gray-500 dark:text-gray-400">No work experience added yet.</div>
          )}
        </div>

        {/* Background decoration */}
        <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-cyan-100 dark:bg-cyan-900/20 rounded-full opacity-50 blur-3xl"></div>
      </section>

      {/* Projects Section with enhanced animations */}
      <section
        id="projects"
        className="py-20 px-4 md:px-6 bg-gray-50/80 dark:bg-gray-900/80 backdrop-blur-sm relative overflow-hidden"
      >
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 opacity-[0.02] dark:opacity-[0.03]"></div>
        </div>

        <div className="max-w-5xl mx-auto relative z-10">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 to-blue-600 dark:from-cyan-400 dark:to-blue-400 mb-4">
              Projects
            </h2>
            <motion.div
              className="w-24 h-1 bg-gradient-to-r from-cyan-500 to-blue-600 mx-auto rounded-full"
              initial={{ width: 0 }}
              whileInView={{ width: 96 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            />
          </motion.div>

          {safeData.projects && safeData.projects.length > 0 ? (
            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 gap-8"
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
            >
              {safeData.projects.map((project, index) => (
                <motion.div
                  key={index}
                  className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg transition-all duration-300 border border-gray-100 dark:border-gray-700"
                  variants={fadeInUp}
                >
                  <div className="aspect-video bg-gray-200 dark:bg-gray-700 overflow-hidden relative">
                    <img
                      src={project.image || "/placeholder.svg?height=200&width=400"}
                      alt={project.title}
                      className="object-cover w-full h-full"
                    />
                  </div>

                  <div className="p-6 space-y-4">
                    <h3 className="text-xl font-semibold text-cyan-600 dark:text-cyan-400">{project.title}</h3>
                    <p className="text-gray-600 dark:text-gray-400">{project.description}</p>

                    <motion.div
                      className="flex flex-wrap gap-2"
                      variants={staggerContainer}
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true }}
                    >
                      {project.technologies?.map((tech, techIndex) => (
                        <motion.span
                          key={techIndex}
                          className="px-3 py-1 bg-gradient-to-r from-cyan-100 to-blue-100 text-cyan-800 dark:from-cyan-900/30 dark:to-blue-900/30 dark:text-cyan-300 rounded-full text-xs font-medium"
                          variants={fadeIn}
                        >
                          {tech}
                        </motion.span>
                      ))}
                    </motion.div>

                    {project.link && (
                      <motion.a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center mt-2 text-cyan-600 dark:text-cyan-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                      >
                        View Project
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </motion.a>
                    )}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <div className="text-center py-12 text-gray-500 dark:text-gray-400">No projects added yet.</div>
          )}
        </div>

        {/* Background decoration */}
        <div className="absolute -top-24 -right-24 w-64 h-64 bg-blue-100 dark:bg-blue-900/20 rounded-full opacity-50 blur-3xl"></div>
      </section>

      {/* Certifications Section with enhanced animations */}
      <section
        id="certifications"
        className="py-20 px-4 md:px-6 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm overflow-hidden relative"
      >
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 opacity-[0.02] dark:opacity-[0.03]"></div>
        </div>

        <div className="max-w-5xl mx-auto relative z-10">
          <motion.div
            className="text-center mb-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 to-blue-600 dark:from-cyan-400 dark:to-blue-400 mb-4">
              Certifications
            </h2>
            <motion.div
              className="w-24 h-1 bg-gradient-to-r from-cyan-500 to-blue-600 mx-auto rounded-full mb-4"
              initial={{ width: 0 }}
              whileInView={{ width: 96 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            />
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Professional certifications and achievements that validate my expertise and skills in the field.
            </p>
          </motion.div>

          {hasCertifications ? (
            <div className="relative">
              {/* Filter Toggle Button (Mobile) with enhanced animation */}
              <motion.div
                className="md:hidden flex justify-center mb-6"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4 }}
              >
                <motion.button
                  onClick={() => setShowFilters(!showFilters)}
                  className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-cyan-100 to-blue-100 dark:from-cyan-900/30 dark:to-blue-900/30 text-cyan-800 dark:text-cyan-300 rounded-full"
                >
                  <Filter size={16} />
                  {showFilters ? "Hide Filters" : "Show Filters"}
                </motion.button>
              </motion.div>

              {/* Filter Controls with enhanced animations */}
              <AnimatePresence>
                <motion.div
                  className={`md:flex flex-wrap justify-center gap-6 mb-10 transition-all duration-500 ${
                    showFilters ? "block" : "hidden md:flex"
                  }`}
                  initial={{ opacity: 0, height: 0 }}
                  animate={{
                    opacity: showFilters || (typeof window !== "undefined" && window.innerWidth >= 768) ? 1 : 0,
                    height: showFilters || (typeof window !== "undefined" && window.innerWidth >= 768) ? "auto" : 0,
                  }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {/* Category Filter with enhanced animations */}
                  <motion.div
                    className="mb-4 md:mb-0 filter-group"
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4 }}
                  >
                    <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 text-center md:text-left">
                      Category
                    </h3>
                    <div className="flex flex-wrap justify-center md:justify-start gap-2">
                      {certificationCategories.map((category, index) => (
                        <motion.button
                          key={category}
                          onClick={() => setSelectedCategory(category)}
                          className={`px-3 py-1.5 rounded-md text-sm transition-all duration-300 ${
                            selectedCategory === category
                              ? "bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-md"
                              : "bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600"
                          }`}
                          initial={{ opacity: 0, y: 5 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.05, duration: 0.3 }}
                        >
                          {category.charAt(0).toUpperCase() + category.slice(1)}
                        </motion.button>
                      ))}
                    </div>
                  </motion.div>

                  {/* Display Mode Filter with enhanced animations */}
                  <motion.div
                    className="filter-group"
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.1 }}
                  >
                    <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 text-center md:text-left">
                      Display
                    </h3>
                    <div className="flex justify-center md:justify-start gap-2">
                      <motion.button
                        onClick={() => setDisplayMode("badge")}
                        className={`px-3 py-1.5 rounded-md text-sm flex items-center gap-1.5 transition-all duration-300 ${
                          displayMode === "badge"
                            ? "bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-md"
                            : "bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600"
                        }`}
                      >
                        <Award size={14} />
                        Badges
                      </motion.button>
                      <motion.button
                        onClick={() => setDisplayMode("certificate")}
                        className={`px-3 py-1.5 rounded-md text-sm flex items-center gap-1.5 transition-all duration-300 ${
                          displayMode === "certificate"
                            ? "bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-md"
                            : "bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600"
                        }`}
                      >
                        <FileText size={14} />
                        Certificates
                      </motion.button>
                      <motion.button
                        onClick={() => setDisplayMode("both")}
                        className={`px-3 py-1.5 rounded-md text-sm transition-all duration-300 ${
                          displayMode === "both"
                            ? "bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-md"
                            : "bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600"
                        }`}
                      >
                        Both
                      </motion.button>
                    </div>
                  </motion.div>
                </motion.div>
              </AnimatePresence>

              {/* Badge View with enhanced animations */}
              <AnimatePresence>
                {(displayMode === "badge" || displayMode === "both") && (
                  <motion.div
                    className="mb-16"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.5 }}
                  >
                    <div className="flex items-center justify-center mb-8">
                      <div className="h-px bg-gray-200 dark:bg-gray-700 w-full max-w-xs"></div>
                      <h3 className="text-2xl font-semibold px-6 text-center text-cyan-600 dark:text-cyan-400">
                        Badges
                      </h3>
                      <div className="h-px bg-gray-200 dark:bg-gray-700 w-full max-w-xs"></div>
                    </div>

                    {certificatesWithBadges.length > 0 ? (
                      <motion.div
                        className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 md:gap-8"
                        variants={staggerContainer}
                        initial="hidden"
                        animate="visible"
                      >
                        {certificatesWithBadges.map((cert, index) => (
                          <motion.div
                            key={`badge-${cert.id}`}
                            className="flex flex-col items-center"
                            variants={fadeInUp}
                          >
                            <div className="relative w-24 h-24 mb-3 rounded-full overflow-hidden shadow-md transition-all duration-300 badge-image">
                              <img
                                src={cert.badgeImage || "/placeholder.svg?height=100&width=100&text=Badge"}
                                alt={`${cert.name} Badge`}
                                className="w-full h-full object-contain p-1"
                                onError={(e) => {
                                  console.error("Badge image failed to load:", cert.badgeImage)
                                  e.currentTarget.src = "/placeholder.svg?height=100&width=100&text=Badge"
                                }}
                              />
                            </div>
                            <h4 className="text-sm font-medium text-center text-gray-800 dark:text-gray-200">
                              {cert.name}
                            </h4>
                            <p className="text-xs text-gray-600 dark:text-gray-400 text-center">{cert.issuer}</p>
                            {cert.link && (
                              <motion.a
                                href={cert.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="mt-2 text-xs text-cyan-600 dark:text-cyan-400 hover:underline flex items-center"
                              >
                                View <ExternalLink className="ml-1 h-3 w-3" />
                              </motion.a>
                            )}
                          </motion.div>
                        ))}
                      </motion.div>
                    ) : (
                      <p className="text-center text-gray-500 dark:text-gray-400">
                        No badges available in this category.
                      </p>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Certificate View with enhanced animations */}
              <AnimatePresence>
                {(displayMode === "certificate" || displayMode === "both") && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.5 }}
                  >
                    <div className="flex items-center justify-center mb-8">
                      <div className="h-px bg-gray-200 dark:bg-gray-700 w-full max-w-xs"></div>
                      <h3 className="text-2xl font-semibold px-6 text-center text-cyan-600 dark:text-cyan-400">
                        Certificates
                      </h3>
                      <div className="h-px bg-gray-200 dark:bg-gray-700 w-full max-w-xs"></div>
                    </div>

                    {certificatesWithImages.length > 0 ? (
                      <motion.div
                        className="grid grid-cols-1 md:grid-cols-2 gap-8"
                        variants={staggerContainer}
                        initial="hidden"
                        animate="visible"
                      >
                        {certificatesWithImages.map((cert, index) => (
                          <motion.div
                            key={`cert-${cert.id}`}
                            className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden transition-all duration-300 border border-gray-100 dark:border-gray-700"
                            variants={fadeInUp}
                          >
                            <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
                              <div>
                                <h4 className="text-lg font-medium text-gray-900 dark:text-gray-100">{cert.name}</h4>
                                <p className="text-sm text-gray-600 dark:text-gray-400">{cert.issuer}</p>
                              </div>
                              {cert.link && (
                                <motion.a
                                  href={cert.link}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="p-2 text-cyan-600 dark:text-cyan-400 hover:bg-cyan-50 dark:hover:bg-cyan-900/20 rounded-full transition-colors"
                                >
                                  <ExternalLink className="h-5 w-5" />
                                </motion.a>
                              )}
                            </div>
                            <div className="relative aspect-[16/9] overflow-hidden bg-gray-100 dark:bg-gray-900">
                              <img
                                src={cert.image || "/placeholder.svg?height=200&width=400&text=Certificate"}
                                alt={`${cert.name} Certificate`}
                                className="w-full h-full object-cover"
                                onError={(e) => {
                                  console.error("Certificate image failed to load:", cert.image)
                                  e.currentTarget.src = "/placeholder.svg?height=200&width=400&text=Certificate"
                                }}
                              />
                            </div>
                            <div className="p-4 bg-gray-50 dark:bg-gray-800/80">
                              <div className="flex justify-between items-center">
                                <p className="text-sm text-gray-600 dark:text-gray-400">Issued: {cert.date}</p>
                                <span className="px-2 py-1 bg-gradient-to-r from-cyan-100 to-blue-100 dark:from-cyan-900/30 dark:to-blue-900/30 text-cyan-800 dark:text-cyan-300 rounded-full text-xs">
                                  {cert.category?.charAt(0).toUpperCase() + cert.category?.slice(1) || "General"}
                                </span>
                              </div>
                            </div>
                          </motion.div>
                        ))}
                      </motion.div>
                    ) : (
                      <p className="text-center text-gray-500 dark:text-gray-400">
                        No certificates available in this category.
                      </p>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ) : (
            <div className="text-center py-12 text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-gray-900/30 rounded-lg">
              No certifications added yet.
            </div>
          )}
        </div>
      </section>

      {/* Contact Section with enhanced animations */}
      <section
        id="contact"
        className="py-20 px-4 md:px-6 bg-gray-50/80 dark:bg-gray-900/80 backdrop-blur-sm relative overflow-hidden"
      >
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 opacity-[0.02] dark:opacity-[0.03]"></div>
        </div>

        <div className="max-w-3xl mx-auto relative z-10">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 to-blue-600 dark:from-cyan-400 dark:to-blue-400 mb-4">
              Get In Touch
            </h2>
            <motion.div
              className="w-24 h-1 bg-gradient-to-r from-cyan-500 to-blue-600 mx-auto rounded-full"
              initial={{ width: 0 }}
              whileInView={{ width: 96 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            />
          </motion.div>

          <motion.div
            className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm p-8 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              <motion.div
                className="space-y-6"
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <h3 className="text-xl font-semibold text-cyan-600 dark:text-cyan-400">Contact Information</h3>
                <p className="text-gray-600 dark:text-gray-400">Feel free to reach out to me directly:</p>

                <div className="space-y-4 pt-2">
                  {safeData.contact?.email && (
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-gradient-to-r from-cyan-100 to-blue-100 dark:from-cyan-900/30 dark:to-blue-900/30 rounded-full">
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
                      <div className="p-2 bg-gradient-to-r from-cyan-100 to-blue-100 dark:from-cyan-900/30 dark:to-blue-900/30 rounded-full">
                        <Phone className="h-5 w-5 text-cyan-600 dark:text-cyan-400" />
                      </div>
                      <span>{safeData.contact.phone}</span>
                    </div>
                  )}

                  {safeData.contact?.location && (
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-gradient-to-r from-cyan-100 to-blue-100 dark:from-cyan-900/30 dark:to-blue-900/30 rounded-full">
                        <MapPin className="h-5 w-5 text-cyan-600 dark:text-cyan-400" />
                      </div>
                      <span>{safeData.contact.location}</span>
                    </div>
                  )}
                </div>

                {/* Social Links with enhanced animations */}
                <div className="pt-6 border-t border-gray-100 dark:border-gray-700">
                  <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Connect with me:</h4>
                  <div className="flex gap-3">
                    {safeData.socialLinks?.github && (
                      <a
                        href={safeData.socialLinks.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 bg-gray-100 dark:bg-gray-700 rounded-full text-gray-600 hover:text-cyan-600 dark:text-gray-400 dark:hover:text-cyan-400 transition-all duration-300"
                      >
                        <Github className="h-5 w-5" />
                      </a>
                    )}

                    {safeData.socialLinks?.linkedin && (
                      <a
                        href={safeData.socialLinks.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 bg-gray-100 dark:bg-gray-700 rounded-full text-gray-600 hover:text-cyan-600 dark:text-gray-400 dark:hover:text-cyan-400 transition-all duration-300"
                      >
                        <Linkedin className="h-5 w-5" />
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <h3 className="text-xl font-semibold mb-4 text-cyan-600 dark:text-cyan-400">Send a Message</h3>
                <form className="space-y-4">
                  <motion.div
                    className="form-group"
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.5 }}
                  >
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-800 focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-all duration-300"
                      placeholder="Your name"
                    />
                  </motion.div>
                  <motion.div
                    className="form-group"
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.6 }}
                  >
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-800 focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-all duration-300"
                      placeholder="Your email"
                    />
                  </motion.div>
                  <motion.div
                    className="form-group"
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.7 }}
                  >
                    <label
                      htmlFor="message"
                      className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                    >
                      Message
                    </label>
                    <textarea
                      id="message"
                      rows={4}
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-800 focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-all duration-300"
                      placeholder="Your message"
                    ></textarea>
                  </motion.div>
                  <motion.button
                    type="submit"
                    className="w-full px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-medium rounded-lg hover:shadow-lg transition-all duration-300"
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.8 }}
                  >
                    <span className="relative z-10">Send Message</span>
                  </motion.button>
                </form>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Background decoration */}
        <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-cyan-100 dark:bg-cyan-900/20 rounded-full opacity-50 blur-3xl"></div>
        <div className="absolute top-1/2 left-0 w-full h-px bg-gradient-to-r from-transparent via-gray-300 dark:via-gray-700 to-transparent"></div>
      </section>

      {/* Footer with enhanced animations */}
      <footer className="py-8 px-4 md:px-6 border-t border-gray-200 dark:border-gray-700 bg-gray-50/80 dark:bg-gray-900/80 backdrop-blur-sm relative">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 opacity-[0.02] dark:opacity-[0.03]"></div>
        </div>

        <div className="max-w-5xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-gray-600 dark:text-gray-400">
              © {new Date().getFullYear()} {safeData.name}. All rights reserved.
            </p>
          </motion.div>

          <motion.div
            className="flex gap-4"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
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

      {/* Basic styles without custom cursor */}
      <style jsx global>{`
        /* Enhanced 3D Loader */
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
        
        .cube-face-front {
          transform: translateZ(50px);
          background: linear-gradient(45deg, rgba(6, 182, 212, 0.2), rgba(37, 99, 235, 0.2));
        }
        
        .cube-face-back {
          transform: rotateY(180deg) translateZ(50px);
          background: linear-gradient(45deg, rgba(6, 182, 212, 0.2), rgba(37, 99, 235, 0.2));
        }
        
        .cube-face-right {
          transform: rotateY(90deg) translateZ(50px);
          background: linear-gradient(45deg, rgba(6, 182, 212, 0.2), rgba(37, 99, 235, 0.2));
        }
        
        .cube-face-left {
          transform: rotateY(-90deg) translateZ(50px);
          background: linear-gradient(45deg, rgba(6, 182, 212, 0.2), rgba(37, 99, 235, 0.2));
        }
        
        .cube-face-top {
          transform: rotateX(90deg) translateZ(50px);
          background: linear-gradient(45deg, rgba(6, 182, 212, 0.2), rgba(37, 99, 235, 0.2));
        }
        
        .cube-face-bottom {
          transform: rotateX(-90deg) translateZ(50px);
          background: linear-gradient(45deg, rgba(6, 182, 212, 0.2), rgba(37, 99, 235, 0.2));
        }
        
        @keyframes rotate {
          0% {
            transform: rotateX(0deg) rotateY(0deg) rotateZ(0deg);
          }
          100% {
            transform: rotateX(360deg) rotateY(360deg) rotateZ(360deg);
          }
        }
        
        /* Enhanced animations */
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        
        .animate-fadeIn {
          animation: fadeIn 1s ease forwards;
        }
        
        /* Enhanced typewriter animation */
        .typewriter {
          overflow: hidden;
          white-space: nowrap;
          animation: typing 3.5s steps(40, end);
        }
        
        @keyframes typing {
          from { width: 0 }
          to { width: 100% }
        }
        
        /* Enhanced background patterns */
        .bg-hero-pattern {
          background-image: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fillRule='evenodd'%3E%3Cg fill='%230891b2' fillOpacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
        }
        
        .bg-about-pattern {
          background-image: url("data:image/svg+xml,%3Csvg width='52' height='26' viewBox='0 0 52 26' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fillRule='evenodd'%3E%3Cpath d='M51 25V0H26v25H51zM0 1h25v24H0V1z' fill='rgba(100, 116, 139, 0.06)'/%3E%3Cpath d='M51 25V0H26v25H51zM0 1h25v24H0V1z' fill='url(%23a)' transform='translate(1 1)'/%3E%3Cdefs%3E%3ClinearGradient x1='50%' y1='0%' x2='50%' y2='100%' id='a'%3E%3Cstop stopColor='%230891b2' stopOpacity='0' offset='0%'/%3E%3Cstop stopColor='%230891b2' stopOpacity='0.5' offset='100%'/%3E%3C/linearGradient%3E%3C/defs%3E%3C/g%3E%3C/svg%3E");
        }
        
        .bg-skills-pattern {
          background-image: url("data:image/svg+xml,%3Csvg width='42' height='42' viewBox='0 0 42 42' xmlns='http://www.w3.org/2000/svg'%3E%3Cg id='Page-1' stroke='none' strokeWidth='1' fill='none' fillRule='evenodd'%3E%3Cg id='skill-pattern' fill='%230891b2' fillOpacity='0.08'%3E%3Cpath d='M3 41.353a5 5 0 0 0 5 0l12-12a5 5 0 0 0 0-7.07L3 3.647a5 5 0 0 0-7.07 0L-9 15.647a5 5 0 0 0 0 7.07l12 12a5 5 0 0 0 7.07 0zM24 41.353a5 5 0 0 0 5 0l12-12a5 5 0 0 0 0-7.07L24 3.647a5 5 0 0 0-7.07 0L12 15.647a5 5 0 0 0 0 7.07l12 12a5 5 0 0 0 7.07 0z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
        }
        
        /* Enhanced grid pattern */
        .bg-grid-pattern {
          background-image: 
            linear-gradient(to right, rgba(100, 116, 139, 0.1) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(100, 116, 139, 0.1) 1px, transparent 1px);
          background-size: 40px 40px;
        }
        
        /* Enhanced digital circuit lines */
        .circuit-lines {
          background-image: url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0h100v100H0z' fill='none'/%3E%3Cpath d='M10 10h80v80H10z' fill='none' stroke='%230891b2' strokeWidth='0.5'/%3E%3Cpath d='M30 10v30h40v40h30' fill='none' stroke='%230891b2' strokeWidth='0.5'/%3E%3Cpath d='M10 30h20M30 50h20M50 70h20M70 90h20' fill='none' stroke='%230891b2' strokeWidth='0.5'/%3E%3Ccircle cx='30' cy='30' r='2' fill='%230891b2'/%3E%3Ccircle cx='50' cy='50' r='2' fill='%230891b2'/%3E%3Ccircle cx='70' cy='70' r='2' fill='%230891b2'/%3E%3C/svg%3E");
          background-size: 100px 100px;
          animation: circuit-move 30s linear infinite;
        }
      `}</style>
    </motion.div>
  )
}

// Main component with loading state and enhanced animations
export default function ClientPage({ portfolioData }) {
  const [isClient, setIsClient] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    setIsClient(true)
    // Simulate loading for a smoother experience
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1500)

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
          transition={{ duration: 0.5 }}
        >
          <Enhanced3DLoader />
        </motion.div>
      ) : (
        <motion.div
          key="portfolio"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          <StaticPortfolio portfolioData={portfolioData} />
        </motion.div>
      )}
    </AnimatePresence>
  )
}
