"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { motion, AnimatePresence, useInView } from "framer-motion"
import {
  ArrowDown,
  ArrowRight,
  Github,
  Linkedin,
  Mail,
  Phone,
  MapPin,
  Download,
  ChevronRight,
  Server,
  Shield,
  Terminal,
} from "lucide-react"
import ContactForm from "@/components/contact-form"
import CertificationSection from "@/components/certification-section"
import ThemeToggle from "@/components/theme-toggle"

// Simplified background component for better performance
const OptimizedBackground = () => (
  <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
    {/* Simplified gradient orbs */}
    <div className="absolute top-1/4 -left-20 w-72 h-72 bg-blue-500/5 dark:bg-blue-500/10 rounded-full blur-3xl"></div>
    <div className="absolute bottom-1/4 -right-20 w-72 h-72 bg-cyan-500/5 dark:bg-cyan-500/10 rounded-full blur-3xl"></div>
    <div className="absolute top-3/4 left-1/3 w-72 h-72 bg-indigo-500/5 dark:bg-indigo-500/10 rounded-full blur-3xl"></div>
  </div>
)

// Simplified button component
const OptimizedButton = ({ children, href, className = "", download = false }) => {
  return (
    <Link
      href={href}
      download={download}
      className={`inline-flex items-center px-6 py-3 rounded-lg transition-all duration-200 ${className}`}
    >
      {children}
    </Link>
  )
}

// Simplified section title component
const OptimizedSectionTitle = ({ children }) => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px 0px" })

  return (
    <motion.div
      ref={ref}
      className="relative mb-12 text-center"
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.3 }}
    >
      <h2 className="text-3xl md:text-4xl font-bold text-cyan-600 dark:text-cyan-400 mb-4">{children}</h2>
      <div className="w-24 h-1 bg-gradient-to-r from-cyan-500 to-blue-600 mx-auto rounded-full" />
    </motion.div>
  )
}

// Simplified card component
const OptimizedCard = ({ children, delay = 0 }) => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-50px 0px" })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.3, delay }}
      className="relative"
    >
      {children}
    </motion.div>
  )
}

// Main HomePage component
export default function HomePage({ portfolioData = {} }) {
  // Ensure all required properties exist
  const safeData = {
    name: portfolioData.name || "Adul S.",
    title: portfolioData.title || "Junior IT Administrator",
    shortBio: portfolioData.shortBio || "Passionate IT administrator with expertise in network management.",
    longBio:
      portfolioData.longBio ||
      "I'm a dedicated junior IT administrator with a strong foundation in IT infrastructure management.",
    profileImage: portfolioData.profileImage || "/placeholder.svg?height=400&width=400",
    cvUrl: portfolioData.cvUrl || "#",
    coreSkills: portfolioData.coreSkills || ["Windows Server", "Linux Administration", "Network Management"],
    skillCategories: portfolioData.skillCategories || [],
    experiences: portfolioData.experiences || [],
    projects: portfolioData.projects || [],
    socialLinks: portfolioData.socialLinks || {},
    contact: portfolioData.contact || {},
    certifications: portfolioData.certifications || [],
  }

  const [mounted, setMounted] = useState(false)
  const [activeSection, setActiveSection] = useState("hero")
  const [scrollY, setScrollY] = useState(0)
  const [isClient, setIsClient] = useState(false)

  // Fix hydration issues and ensure client-side only rendering
  useEffect(() => {
    setMounted(true)
    setIsClient(true)
  }, [])

  // Optimized scroll handler
  useEffect(() => {
    if (!isClient) return

    const handleScroll = () => {
      const currentScrollY = window.scrollY
      setScrollY(currentScrollY)

      // Throttle section detection for better performance
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
    }

    // Use passive listener for better performance
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [isClient])

  const sections = [
    { id: "about", label: "About" },
    { id: "skills", label: "Skills" },
    { id: "experience", label: "Experience" },
    { id: "projects", label: "Projects" },
    { id: "certifications", label: "Certifications" },
    { id: "contact", label: "Contact" },
  ]

  // Don't render anything until we're on the client side
  if (!isClient || !mounted) {
    return (
      <div className="min-h-screen bg-white dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-cyan-500 mx-auto"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-400">Loading...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 via-white to-gray-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-200 relative overflow-x-hidden">
      {/* Optimized background */}
      <OptimizedBackground />

      {/* Theme Toggle */}
      <div className="fixed top-4 right-4 z-50">
        <ThemeToggle />
      </div>

      {/* Navigation Bar - Simplified */}
      <AnimatePresence>
        {scrollY > 100 && (
          <motion.nav
            className="fixed top-0 left-0 right-0 bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm z-40 border-b border-gray-200 dark:border-gray-800"
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -100, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <div className="container mx-auto px-4 py-3 flex justify-between items-center">
              <Link href="#hero" className="font-bold text-lg text-cyan-600 dark:text-cyan-400">
                {safeData.name}
              </Link>

              {/* Desktop Navigation */}
              <ul className="hidden md:flex space-x-6">
                {sections.map((section) => (
                  <li key={section.id}>
                    <Link
                      href={`#${section.id}`}
                      className={`text-sm hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors ${
                        activeSection === section.id ? "text-cyan-600 dark:text-cyan-400 font-medium" : ""
                      }`}
                    >
                      {section.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>

      {/* Hero Section */}
      <section
        id="hero"
        className="relative min-h-screen flex flex-col justify-center items-center px-4 md:px-6 overflow-hidden"
      >
        <div className="max-w-3xl mx-auto text-center space-y-6 z-10">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <h1 className="text-5xl md:text-7xl font-bold tracking-tighter mb-4">
              Hi, I'm <span className="text-cyan-600 dark:text-cyan-400">{safeData.name}</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-6">{safeData.title}</p>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">{safeData.shortBio}</p>
          </motion.div>

          <motion.div
            className="flex flex-wrap justify-center gap-4 pt-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <OptimizedButton
              href="#contact"
              className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white hover:shadow-lg"
            >
              Get in touch <ArrowRight className="ml-2 h-4 w-4" />
            </OptimizedButton>

            <OptimizedButton
              href={safeData.cvUrl || "#"}
              download
              className="border-2 border-cyan-500 dark:border-cyan-400 text-cyan-600 dark:text-cyan-400 hover:bg-cyan-50 dark:hover:bg-cyan-900/20"
            >
              Download CV <Download className="ml-2 h-4 w-4" />
            </OptimizedButton>
          </motion.div>
        </div>

        <motion.div
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
        >
          <Link
            href="#about"
            className="p-3 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm shadow-md rounded-full text-gray-600 hover:text-cyan-600 dark:text-gray-400 dark:hover:text-cyan-400 transition-colors flex items-center justify-center"
          >
            <ArrowDown className="h-6 w-6" />
          </Link>
        </motion.div>
      </section>

      {/* About Section */}
      <section
        id="about"
        className="py-20 px-4 md:px-6 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm relative overflow-hidden"
      >
        <div className="max-w-5xl mx-auto relative z-10">
          <OptimizedSectionTitle>About Me</OptimizedSectionTitle>

          <div className="grid md:grid-cols-2 gap-10 items-center">
            <OptimizedCard>
              <div className="aspect-square relative rounded-xl overflow-hidden bg-gray-200 dark:bg-gray-700 shadow-xl">
                <img
                  src={safeData.profileImage || "/placeholder.svg?height=400&width=400"}
                  alt={safeData.name}
                  className="object-cover w-full h-full"
                  loading="lazy"
                />
              </div>
            </OptimizedCard>

            <div className="space-y-6">
              <OptimizedCard delay={0.1}>
                <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">{safeData.longBio}</p>
              </OptimizedCard>

              <OptimizedCard delay={0.2}>
                <div className="pt-4">
                  <h3 className="text-xl font-semibold mb-4 text-cyan-600 dark:text-cyan-400">Core Skills</h3>
                  <div className="flex flex-wrap gap-3">
                    {safeData.coreSkills?.map((skill, index) => (
                      <span
                        key={index}
                        className="px-4 py-2 bg-gradient-to-r from-cyan-100 to-blue-100 text-cyan-800 dark:from-cyan-900/40 dark:to-blue-900/40 dark:text-cyan-300 rounded-full text-sm font-medium"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </OptimizedCard>
            </div>
          </div>

          {/* Features section */}
          <div className="mt-20">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  icon: Server,
                  title: "IT Administration",
                  description: "Comprehensive experience in administering both Linux and Windows OS systems.",
                },
                {
                  icon: Terminal,
                  title: "Troubleshooting & Maintenance",
                  description: "Skilled in diagnosing and resolving hardware, software, and network issues.",
                },
                {
                  icon: Shield,
                  title: "Asset Management",
                  description: "Specializing in strategic planning, optimization, and long-term value creation.",
                },
              ].map((feature, index) => (
                <OptimizedCard key={index} delay={index * 0.1}>
                  <div className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm p-6 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700 h-full">
                    <div className="mb-6">
                      <div className="bg-gradient-to-r from-cyan-100 to-blue-100 dark:from-cyan-900/40 dark:to-blue-900/40 p-4 rounded-full w-16 h-16 flex items-center justify-center">
                        <feature.icon className="h-8 w-8 text-cyan-600 dark:text-cyan-400" />
                      </div>
                    </div>
                    <h3 className="text-xl font-semibold mb-2 text-cyan-600 dark:text-cyan-400">{feature.title}</h3>
                    <p className="text-gray-600 dark:text-gray-400">{feature.description}</p>
                  </div>
                </OptimizedCard>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section
        id="skills"
        className="py-20 px-4 md:px-6 bg-gray-50/80 dark:bg-gray-900/80 backdrop-blur-sm relative overflow-hidden"
      >
        <div className="max-w-5xl mx-auto relative z-10">
          <OptimizedSectionTitle>Technical Skills</OptimizedSectionTitle>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {safeData.skillCategories?.map((category, index) => (
              <OptimizedCard key={index} delay={index * 0.1}>
                <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm p-6 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700 h-full">
                  <h3 className="text-xl font-semibold mb-4 text-cyan-600 dark:text-cyan-400">{category.name}</h3>
                  <ul className="space-y-4">
                    {category.skills?.map((skill, skillIndex) => (
                      <li key={skillIndex} className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-sm font-medium">{skill.name}</span>
                          <span className="text-sm text-gray-500 dark:text-gray-400">{skill.level}%</span>
                        </div>
                        <div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full transition-all duration-1000"
                            style={{ width: `${skill.level}%` }}
                          />
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </OptimizedCard>
            ))}
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section
        id="experience"
        className="py-20 px-4 md:px-6 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm relative overflow-hidden"
      >
        <div className="max-w-5xl mx-auto relative z-10">
          <OptimizedSectionTitle>Work Experience</OptimizedSectionTitle>

          {safeData.experiences && safeData.experiences.length > 0 ? (
            <div className="space-y-12">
              {safeData.experiences.map((experience, index) => (
                <OptimizedCard key={index} delay={index * 0.1}>
                  <div className="relative pl-8 md:pl-12 border-l-2 border-cyan-500 dark:border-cyan-400">
                    <div className="absolute w-5 h-5 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full -left-[11px] top-1" />

                    <div className="p-6 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-lg shadow-lg border border-gray-100 dark:border-gray-700">
                      <div className="flex flex-wrap justify-between items-start gap-2 mb-4">
                        <h3 className="text-xl font-semibold text-cyan-600 dark:text-cyan-400">{experience.role}</h3>
                        <span className="text-sm px-4 py-1 bg-gradient-to-r from-cyan-100 to-blue-100 text-cyan-800 dark:from-cyan-900/40 dark:to-blue-900/40 dark:text-cyan-300 rounded-full font-medium">
                          {experience.period}
                        </span>
                      </div>

                      <p className="text-gray-600 dark:text-gray-400 mb-2">{experience.company}</p>
                      <p className="text-gray-700 dark:text-gray-300 mb-4">{experience.description}</p>

                      {experience.achievements && experience.achievements.length > 0 && (
                        <div className="pt-2">
                          <h4 className="font-medium mb-3 text-gray-800 dark:text-gray-200">Key Achievements:</h4>
                          <ul className="space-y-2">
                            {experience.achievements.map((achievement, achievementIndex) => (
                              <li
                                key={achievementIndex}
                                className="flex items-start gap-2 text-gray-700 dark:text-gray-300"
                              >
                                <ChevronRight className="h-5 w-5 text-cyan-500 dark:text-cyan-400 flex-shrink-0 mt-0.5" />
                                <span>{achievement}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  </div>
                </OptimizedCard>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 text-gray-500 dark:text-gray-400">No work experience added yet.</div>
          )}
        </div>
      </section>

      {/* Projects Section */}
      <section
        id="projects"
        className="py-20 px-4 md:px-6 bg-gray-50/80 dark:bg-gray-900/80 backdrop-blur-sm relative overflow-hidden"
      >
        <div className="max-w-5xl mx-auto relative z-10">
          <OptimizedSectionTitle>Projects</OptimizedSectionTitle>

          {safeData.projects && safeData.projects.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {safeData.projects.map((project, index) => (
                <OptimizedCard key={index} delay={index * 0.1}>
                  <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-xl overflow-hidden shadow-lg border border-gray-100 dark:border-gray-700 h-full">
                    <div className="aspect-video relative bg-gray-200 dark:bg-gray-700 overflow-hidden">
                      <img
                        src={project.image || "/placeholder.svg?height=200&width=400"}
                        alt={project.title}
                        className="object-cover w-full h-full"
                        loading="lazy"
                      />
                    </div>

                    <div className="p-6 space-y-4">
                      <h3 className="text-xl font-semibold text-cyan-600 dark:text-cyan-400">{project.title}</h3>
                      <p className="text-gray-600 dark:text-gray-400">{project.description}</p>

                      <div className="flex flex-wrap gap-2">
                        {project.technologies?.map((tech, techIndex) => (
                          <span
                            key={techIndex}
                            className="px-3 py-1 bg-cyan-100 text-cyan-800 dark:bg-cyan-900/30 dark:text-cyan-300 rounded-full text-xs font-medium"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>

                      {project.link && (
                        <div className="pt-2">
                          <Link
                            href={project.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center text-cyan-600 dark:text-cyan-400 hover:underline font-medium"
                          >
                            View Project <ArrowRight className="ml-2 h-4 w-4" />
                          </Link>
                        </div>
                      )}
                    </div>
                  </div>
                </OptimizedCard>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 text-gray-500 dark:text-gray-400">No projects added yet.</div>
          )}
        </div>
      </section>

      {/* Certifications Section */}
      <CertificationSection certifications={safeData.certifications} />

      {/* Contact Section */}
      <section
        id="contact"
        className="py-20 px-4 md:px-6 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm relative overflow-hidden"
      >
        <div className="max-w-3xl mx-auto relative z-10">
          <OptimizedSectionTitle>Get In Touch</OptimizedSectionTitle>

          <OptimizedCard>
            <div className="bg-gray-50/90 dark:bg-gray-900/90 backdrop-blur-sm p-8 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                <div className="space-y-6">
                  <h3 className="text-xl font-semibold text-cyan-600 dark:text-cyan-400">Contact Information</h3>
                  <p className="text-gray-600 dark:text-gray-400">Feel free to reach out to me directly:</p>

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
                </div>

                <ContactForm />
              </div>
            </div>
          </OptimizedCard>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 md:px-6 border-t border-gray-200 dark:border-gray-700 bg-gray-50/80 dark:bg-gray-900/80 backdrop-blur-sm">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-600 dark:text-gray-400">
            © {new Date().getFullYear()} {safeData.name}. All rights reserved.
          </p>

          <div className="flex gap-4">
            {safeData.socialLinks?.github && (
              <Link
                href={safeData.socialLinks.github}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 text-gray-600 hover:text-cyan-600 dark:text-gray-400 dark:hover:text-cyan-400 transition-colors"
              >
                <Github className="h-5 w-5" />
              </Link>
            )}

            {safeData.socialLinks?.linkedin && (
              <Link
                href={safeData.socialLinks.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 text-gray-600 hover:text-cyan-600 dark:text-gray-400 dark:hover:text-cyan-400 transition-colors"
              >
                <Linkedin className="h-5 w-5" />
              </Link>
            )}
          </div>
        </div>
      </footer>
    </div>
  )
}
