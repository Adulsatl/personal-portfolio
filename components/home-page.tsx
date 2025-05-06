"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import Link from "next/link"
import { motion, AnimatePresence, useInView } from "framer-motion"
import { useTheme } from "next-themes"
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
  Menu,
  X,
} from "lucide-react"
import ContactForm from "@/components/contact-form"
import CertificationSection from "@/components/certification-section"

// Digital Matrix Rain component
const MatrixRain = ({ dimensions }) => {
  const canvasRef = useRef(null)
  const [isInitialized, setIsInitialized] = useState(false)

  useEffect(() => {
    if (!canvasRef.current || dimensions.width === 0) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")

    canvas.width = dimensions.width
    canvas.height = dimensions.height

    const characters =
      "アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ"
    const columns = Math.floor(dimensions.width / 20)
    const drops = Array(columns).fill(1)

    const draw = () => {
      ctx.fillStyle = "rgba(0, 0, 0, 0.05)"
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      ctx.fillStyle = "#0fa"
      ctx.font = "15px monospace"

      for (let i = 0; i < drops.length; i++) {
        const text = characters.charAt(Math.floor(Math.random() * characters.length))
        ctx.fillText(text, i * 20, drops[i] * 20)

        if (drops[i] * 20 > canvas.height && Math.random() > 0.975) {
          drops[i] = 0
        }

        drops[i]++
      }
    }

    setIsInitialized(true)
    const interval = setInterval(draw, 33)

    return () => clearInterval(interval)
  }, [dimensions])

  return <canvas ref={canvasRef} className="absolute inset-0 z-0 opacity-10 dark:opacity-20" />
}

// Tech-inspired background component
const TechBackground = () => (
  <div className="absolute inset-0 z-0 overflow-hidden">
    {/* Circuit board pattern */}
    <div
      className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05]"
      style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 304 304' width='304' height='304'%3E%3Cpath fill='%239C92AC' fillOpacity='0.4' d='M44.1 224a5 5 0 1 1 0 2H0v-2h44.1zm160 48a5 5 0 1 1 0 2H82v-2h122.1zm57.8-46a5 5 0 1 1 0-2H304v2h-42.1zm0 16a5 5 0 1 1 0-2H304v2h-42.1zm6.2-114a5 5 0 1 1 0 2h-86.2a5 5 0 1 1 0-2h86.2zm-256-48a5 5 0 1 1 0 2H0v-2h12.1zm185.8 34a5 5 0 1 1 0-2h86.2a5 5 0 1 1 0 2h-86.2zM258 12.1a5 5 0 1 1-2 0V0h2v12.1zm-64 208a5 5 0 1 1-2 0v-54.2a5 5 0 1 1 2 0v54.2zm48-198.2V80h62v2h-64V21.9a5 5 0 1 1 2 0zm16 16V64h46v2h-48V37.9a5 5 0 1 1 2 0zm-128 96V208h16v12.1a5 5 0 1 1-2 0V210h-16v-76.1a5 5 0 1 1 2 0zm-5.9-21.9a5 5 0 1 1 0 2H114v48H85.9a5 5 0 1 1 0-2H112v-48h12.1zm-6.2 130a5 5 0 1 1 0-2H176v-74.1a5 5 0 1 1 2 0V242h-60.1zm-16-64a5 5 0 1 1 0-2H114v48h10.1a5 5 0 1 1 0 2H112v-48h-10.1zM66 284.1a5 5 0 1 1-2 0V274H50v30h-2v-32h18v12.1zM236.1 176a5 5 0 1 1 0 2H226v94h48v32h-2v-30h-48v-98h12.1zm25.8-30a5 5 0 1 1 0-2H274v44.1a5 5 0 1 1-2 0V146h-10.1zm-64 96a5 5 0 1 1 0-2H208v-80h16v-14h-42.1a5 5 0 1 1 0-2H226v18h-16v80h-12.1zm86.2-210a5 5 0 1 1 0 2H272V0h2v32h10.1zM98 101.9V146H53.9a5 5 0 1 1 0-2H96v-42.1a5 5 0 1 1 2 0zM53.9 34a5 5 0 1 1 0-2H80V0h2v34H53.9zm60.1 3.9V66H82v64H69.9a5 5 0 1 1 0-2H80V64h32V37.9a5 5 0 1 1 2 0zM101.9 82a5 5 0 1 1 0-2H128V37.9a5 5 0 1 1 2 0V82h-28.1zm16-64a5 5 0 1 1 0-2H146v44.1a5 5 0 1 1-2 0V18h-26.1zm102.2 270a5 5 0 1 1 0 2H98v14h-2v-16h124.1zM242 149.9V160h16v34h-16v62h48v48h-2v-46h-48v-66h16v-30h-16v-12.1a5 5 0 1 1 2 0zM53.9 18a5 5 0 1 1 0-2H64V2H48V0h18v18H53.9zm112 32a5 5 0 1 1 0-2H192V0h50v2h-48v48h-28.1zm-48-48a5 5 0 0 1-9.8-2h2.07a3 3 0 1 0 5.66 0H178v34h-18V21.9a5 5 0 1 1 2 0V32h14V2h-58.1zm0 96a5 5 0 1 1 0-2H137l32-32h39V21.9a5 5 0 1 1 2 0V66h-40.17l-32 32H117.9zm28.1 90.1a5 5 0 1 1-2 0v-76.51L175.59 80H224V21.9a5 5 0 1 1 2 0V82h-49.59L146 112.41v75.69zm16 32a5 5 0 1 1-2 0v-99.51L184.59 96H300.1a5 5 0 0 1 3.9-3.9v2.07a3 3 0 0 0 0 5.66v2.07a5 5 0 0 1-3.9-3.9H185.41L162 121.41v98.69zm-144-64a5 5 0 1 1-2 0v-3.51l48-48V48h32V0h2v50H66v55.41l-48 48v2.69zM50 53.9v43.51l-48 48V208h26.1a5 5 0 1 1 0 2H0v-65.41l48-48V53.9a5 5 0 1 1 2 0zm-16 16V89.41l-34 34v-2.82l32-32V69.9a5 5 0 1 1 2 0zM12.1 32a5 5 0 1 1 0 2H9.41L0 43.41V40.6L8.59 32h3.51zm265.8 18a5 5 0 1 1 0-2h18.69l7.41-7.41v2.82L297.41 50H277.9zm-16 160a5 5 0 1 1 0-2H288v-71.41l16-16v2.82l-14 14V210h-28.1zm-208 32a5 5 0 1 1 0-2H64v-22.59L40.59 194H21.9a5 5 0 1 1 0-2H41.41L66 217.59V242H53.9zm150.2 14a5 5 0 1 1 0 2H96v-56.6L56.6 162H37.9a5 5 0 1 1 0-2h19.5L98 200.6V256h106.1zm-150.2 2a5 5 0 1 1 0-2H80v-46.59L48.59 178H21.9a5 5 0 1 1 0-2H49.41L82 208.59V258H53.9zM34 39.8v1.61L9.41 66H0v-2h8.59L32 40.59V0h2v39.8zM2 300.1a5 5 0 0 1 3.9 3.9H3.83A3 3 0 0 0 0 302.17V256h18v48h-2v-46H2v42.1zM34 241v63h-2v-62H0v-2h34v1zM17 18H0v-2h16V0h2v18h-1zm273-2h14v2h-16V0h2v16zm-32 273v15h-2v-14h-14v14h-2v-16h18v1zM0 92.1A5.02 5.02 0 0 1 6 97a5 5 0 0 1-6 4.9v-2.07a3 3 0 1 0 0-5.66V92.1zM80 272h2v32h-2v-32zm37.9 32h-2.07a3 3 0 0 0-5.66 0h-2.07a5 5 0 0 1 9.8 0zM5.9 0A5.02 5.02 0 0 1 0 5.9V3.83A3 3 0 0 0 3.83 0H5.9zm294.2 0h2.07A3 3 0 0 0 304 3.83V5.9a5 5 0 0 1-3.9-5.9zm3.9 300.1v2.07a3 3 0 0 0-1.83 1.83h-2.07a5 5 0 0 1 3.9-3.9zM97 100a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm0-16a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm16 16a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm16 16a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm0 16a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm-48 32a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm16 16a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm32 48a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm-16 16a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm32-16a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm0-32a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm16 32a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm32 16a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm0-16a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm-16-64a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm16 0a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm16 96a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm0 16a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm16 16a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm16-144a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm0 32a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm16-32a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm16-16a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm-96 0a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm0 16a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm16-32a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm96 0a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm-16-64a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm16-16a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm-32 0a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm0-16a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm-16 0a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm-16 0a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm-16 0a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM49 36a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm-32 0a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm32 16a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM33 68a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm16-48a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm0 240a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm16 32a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm-16-64a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm0 16a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm-16-32a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm80-176a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm16 0a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm-16-16a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm32 48a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm16-16a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm0-32a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm112 176a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm-16 16a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm0 16a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm0 16a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM17 180a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm0 16a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm0-32a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm16 0a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM17 84a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm32 64a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm16-16a3 3 0 1 0 0-6 3 3 0 0 0 0 6z'%3E%3C/path%3E%3C/svg%3E")`,
      }}
    ></div>
  </div>
)

// Cyber neon text component
const CyberNeonText = ({ children, className = "", delay = 0 }) => {
  return (
    <motion.span
      className={`relative ${className}`}
      initial={{ opacity: 0, textShadow: "0 0 0px #06b6d4" }}
      animate={{
        opacity: 1,
        textShadow: ["0 0 5px #06b6d4", "0 0 20px #06b6d4", "0 0 10px #06b6d4", "0 0 15px #06b6d4", "0 0 5px #06b6d4"],
      }}
      transition={{
        duration: 3,
        repeat: Number.POSITIVE_INFINITY,
        repeatType: "reverse",
        delay,
      }}
    >
      {children}
    </motion.span>
  )
}

// Cyber neon button component
const CyberNeonButton = ({ children, href, className = "", download = false }) => {
  return (
    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
      <Link
        href={href}
        download={download}
        className={`relative inline-flex items-center px-6 py-3 overflow-hidden rounded-lg ${className}`}
      >
        <motion.span
          className="absolute inset-0 z-0 bg-gradient-to-r from-cyan-500 to-blue-600 dark:from-cyan-400 dark:to-blue-500"
          initial={{ opacity: 0.8 }}
          whileHover={{
            opacity: 1,
            boxShadow: [
              "0 0 5px rgba(6, 182, 212, 0.5), 0 0 10px rgba(6, 182, 212, 0.3)",
              "0 0 15px rgba(6, 182, 212, 0.5), 0 0 20px rgba(6, 182, 212, 0.3)",
              "0 0 10px rgba(6, 182, 212, 0.5), 0 0 15px rgba(6, 182, 212, 0.3)",
              "0 0 5px rgba(6, 182, 212, 0.5), 0 0 10px rgba(6, 182, 212, 0.3)",
            ],
          }}
          transition={{
            duration: 2,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "reverse",
          }}
        />
        <span className="relative z-10 flex items-center text-white font-medium">{children}</span>
      </Link>
    </motion.div>
  )
}

// Animated section title component
const AnimatedSectionTitle = ({ children }) => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px 0px" })

  return (
    <motion.div
      ref={ref}
      className="relative mb-12 text-center"
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-3xl md:text-4xl font-bold relative inline-block">
        <CyberNeonText className="text-cyan-600 dark:text-cyan-400">{children}</CyberNeonText>
        <motion.div
          className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-cyan-500 to-blue-600 dark:from-cyan-400 dark:to-blue-500 rounded-full"
          initial={{ width: 0, left: "50%" }}
          animate={isInView ? { width: "100%", left: "0%" } : {}}
          transition={{ duration: 0.7, delay: 0.3 }}
        />
      </h2>
    </motion.div>
  )
}

// Animated card component
const AnimatedCard = ({ children, delay = 0 }) => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-50px 0px" })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay }}
      className="relative"
    >
      {children}
    </motion.div>
  )
}

// Tech feature card component
const TechFeatureCard = ({ icon: Icon, title, description, delay = 0 }) => {
  return (
    <AnimatedCard delay={delay}>
      <motion.div
        className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm p-6 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700 h-full transform transition-all duration-300 hover:shadow-xl hover:-translate-y-2 group"
        whileHover={{
          boxShadow: "0 0 25px rgba(6, 182, 212, 0.4)",
        }}
      >
        <div className="relative mb-6">
          <div className="absolute -inset-2 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full opacity-0 group-hover:opacity-100 blur-md transition-all duration-500"></div>
          <div className="relative bg-gradient-to-r from-cyan-100 to-blue-100 dark:from-cyan-900/40 dark:to-blue-900/40 p-4 rounded-full w-16 h-16 flex items-center justify-center">
            <Icon className="h-8 w-8 text-cyan-600 dark:text-cyan-400" />
          </div>
        </div>
        <h3 className="text-xl font-semibold mb-2 text-cyan-600 dark:text-cyan-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
          {title}
        </h3>
        <p className="text-gray-600 dark:text-gray-400">{description}</p>
      </motion.div>
    </AnimatedCard>
  )
}

// Mobile Navigation Menu
const MobileNav = ({ sections, activeSection }) => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="md:hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 rounded-md bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm shadow-md text-gray-600 dark:text-gray-400 hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors"
        aria-label={isOpen ? "Close menu" : "Open menu"}
      >
        {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="absolute top-16 left-0 right-0 bg-white/90 dark:bg-gray-900/90 backdrop-blur-md shadow-lg rounded-b-lg z-50 border-t border-gray-200 dark:border-gray-800"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
          >
            <ul className="py-2">
              {sections.map((section) => (
                <li key={section.id}>
                  <Link
                    href={`#${section.id}`}
                    className={`block px-4 py-3 text-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors ${
                      activeSection === section.id ? "text-cyan-600 dark:text-cyan-400 font-medium" : ""
                    }`}
                    onClick={() => setIsOpen(false)}
                  >
                    {section.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
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
  const { theme, setTheme } = useTheme()
  const [activeSection, setActiveSection] = useState("hero")
  const [scrollY, setScrollY] = useState(0)
  const [resolvedTheme, setResolvedTheme] = useState("light")
  const [isClient, setIsClient] = useState(false)
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 })

  // Fix hydration issues and ensure client-side only rendering
  useEffect(() => {
    setMounted(true)
    setIsClient(true)

    // Set initial dimensions
    setDimensions({
      width: window.innerWidth,
      height: window.innerHeight,
    })

    // Update dimensions on resize
    const handleResize = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      })
    }

    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  // Scroll animation - use ref instead of direct hook to avoid suspense
  const scrollRef = useRef(null)
  const [scrollProgress, setScrollProgress] = useState(0)

  // Move useScroll and its onChange callback inside a useCallback hook
  const updateScrollProgress = useCallback(() => {
    if (!isClient) return

    const handleScroll = () => {
      const currentScrollY = window.scrollY
      const documentHeight = document.documentElement.scrollHeight
      const windowHeight = window.innerHeight
      const scrollableHeight = documentHeight - windowHeight

      // Calculate scroll progress as a percentage
      const progress = scrollableHeight > 0 ? currentScrollY / scrollableHeight : 0
      setScrollProgress(progress)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [isClient])

  useEffect(() => {
    return updateScrollProgress()
  }, [updateScrollProgress])

  // Use state for parallax values instead of transforms that might cause suspense
  const [heroYValue, setHeroYValue] = useState(0)
  const [heroOpacityValue, setHeroOpacityValue] = useState(1)

  useEffect(() => {
    if (!isClient) return

    // Update parallax values based on scroll progress
    setHeroYValue(scrollProgress * -100)
    setHeroOpacityValue(1 - scrollProgress * 5)
  }, [scrollProgress, isClient])

  // Only show theme toggle after mounting to avoid hydration mismatch
  useEffect(() => {
    if (typeof window !== "undefined") {
      // Set initial resolved theme
      setResolvedTheme(window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light")
    }

    const handleScroll = () => {
      setScrollY(window.scrollY)

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
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Update resolved theme when theme changes
  useEffect(() => {
    if (mounted) {
      if (theme === "system") {
        setResolvedTheme(window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light")
      } else {
        setResolvedTheme(theme)
      }
    }
  }, [theme, mounted])

  // Determine current theme for UI elements
  const currentTheme = mounted ? resolvedTheme : "light"

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
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

  const navVariants = {
    hidden: { y: -100, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.5 } },
  }

  const sections = [
    { id: "about", label: "About" },
    { id: "skills", label: "Skills" },
    { id: "experience", label: "Experience" },
    { id: "projects", label: "Projects" },
    { id: "certifications", label: "Certifications" },
    { id: "contact", label: "Contact" },
  ]

  // Don't render anything until we're on the client side
  if (!isClient) {
    return null
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 via-white to-gray-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-200 relative overflow-x-hidden">
      {/* Matrix Rain Background */}
      {mounted && <MatrixRain dimensions={dimensions} />}

      {/* Tech-inspired background */}
      <TechBackground />

      {/* Navigation Bar - Appears after scrolling */}
      <AnimatePresence>
        {scrollY > 100 && (
          <motion.nav
            className="fixed top-0 left-0 right-0 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md z-40 border-b border-gray-200 dark:border-gray-800 shadow-md"
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={navVariants}
          >
            <div className="container mx-auto px-4 py-3 flex justify-between items-center">
              <Link href="#hero" className="font-bold text-lg">
                <motion.span
                  className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-500 to-blue-600 dark:from-cyan-400 dark:to-blue-500"
                  whileHover={{ scale: 1.05 }}
                >
                  {safeData.name}
                </motion.span>
              </Link>

              {/* Mobile Navigation */}
              <div className="md:hidden">
                <MobileNav sections={sections} activeSection={activeSection} />
              </div>

              {/* Desktop Navigation */}
              <ul className="hidden md:flex space-x-6">
                {sections.map((section) => (
                  <li key={section.id}>
                    <Link
                      href={`#${section.id}`}
                      className={`text-sm hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors relative ${
                        activeSection === section.id ? "text-cyan-600 dark:text-cyan-400 font-medium" : ""
                      }`}
                    >
                      <span className="relative">
                        {section.label}
                        {activeSection === section.id && (
                          <motion.div
                            className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-cyan-500 to-blue-600 dark:from-cyan-400 dark:to-blue-500 rounded-full"
                            layoutId="activeSection"
                            transition={{ type: "spring", stiffness: 300, damping: 30 }}
                          />
                        )}
                      </span>
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
        {/* Hero content */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-gradient-to-b from-cyan-50/50 to-white/30 dark:from-cyan-900/20 dark:to-gray-900/50"></div>
          <motion.div
            className="absolute inset-0"
            animate={{
              backgroundPosition: ["0% 0%", "100% 100%"],
              backgroundSize: ["100% 100%", "120% 120%", "100% 100%"],
            }}
            transition={{
              duration: 15,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "reverse",
            }}
            style={{
              backgroundImage:
                "radial-gradient(circle at center, rgba(6, 182, 212, 0.15) 0%, rgba(6, 182, 212, 0) 50%)",
            }}
          />
        </div>

        <motion.div
          style={{
            y: heroYValue,
            opacity: heroOpacityValue,
          }}
          className="max-w-3xl mx-auto text-center space-y-6 z-10"
        >
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <motion.h1
              className="text-5xl md:text-7xl font-bold tracking-tighter mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Hi, I'm <CyberNeonText className="text-cyan-600 dark:text-cyan-400">{safeData.name}</CyberNeonText>
            </motion.h1>
            <motion.p
              className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              {safeData.title}
            </motion.p>
            <motion.p
              className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              {safeData.shortBio}
            </motion.p>
          </motion.div>

          <motion.div
            className="flex flex-wrap justify-center gap-4 pt-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <CyberNeonButton href="#contact" className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white">
              Get in touch <ArrowRight className="ml-2 h-4 w-4" />
            </CyberNeonButton>

            <CyberNeonButton
              href={safeData.cvUrl || "#"}
              download
              className="bg-transparent border-2 border-cyan-500 dark:border-cyan-400 text-cyan-600 dark:text-cyan-400"
            >
              Download CV <Download className="ml-2 h-4 w-4" />
            </CyberNeonButton>
          </motion.div>
        </motion.div>

        <motion.div
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
          animate={{
            y: [0, 10, 0],
            opacity: [0.6, 1, 0.6],
            boxShadow: [
              "0 0 5px rgba(6, 182, 212, 0.3)",
              "0 0 15px rgba(6, 182, 212, 0.5)",
              "0 0 5px rgba(6, 182, 212, 0.3)",
            ],
          }}
          transition={{
            duration: 2,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "loop",
          }}
        >
          <Link
            href="#about"
            className="p-3 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm shadow-md rounded-full text-gray-600 hover:text-cyan-600 dark:text-gray-400 dark:hover:text-cyan-400 transition-colors flex items-center justify-center"
          >
            <ArrowDown className="h-6 w-6" />
            <span className="sr-only">Scroll down</span>
          </Link>
        </motion.div>
      </section>

      {/* About Section */}
      <section
        id="about"
        className="py-20 px-4 md:px-6 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm relative overflow-hidden"
      >
        <div className="max-w-5xl mx-auto relative z-10">
          <AnimatedSectionTitle>About Me</AnimatedSectionTitle>

          <div className="grid md:grid-cols-2 gap-10 items-center">
            <AnimatedCard>
              <div className="aspect-square relative rounded-xl overflow-hidden bg-gray-200 dark:bg-gray-700 shadow-xl group">
                <img
                  src={safeData.profileImage || "/placeholder.svg?height=400&width=400"}
                  alt={safeData.name}
                  className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110"
                />
                <motion.div
                  className="absolute inset-0 bg-gradient-to-tr from-cyan-600/20 to-transparent"
                  animate={{ opacity: [0, 0.3, 0] }}
                  transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
            </AnimatedCard>

            <div className="space-y-6">
              <AnimatedCard delay={0.2}>
                <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">{safeData.longBio}</p>
              </AnimatedCard>

              <AnimatedCard delay={0.4}>
                <div className="pt-4">
                  <h3 className="text-xl font-semibold mb-4 text-cyan-600 dark:text-cyan-400">Core Skills</h3>
                  <motion.div
                    className="flex flex-wrap gap-3"
                    variants={staggerContainer}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                  >
                    {safeData.coreSkills?.map((skill, index) => (
                      <motion.span
                        key={index}
                        className="px-4 py-2 bg-gradient-to-r from-cyan-100 to-blue-100 text-cyan-800 dark:from-cyan-900/40 dark:to-blue-900/40 dark:text-cyan-300 rounded-full text-sm font-medium shadow-sm relative group"
                        variants={fadeIn}
                        whileHover={{
                          scale: 1.05,
                          y: -3,
                          boxShadow: "0 0 15px rgba(6, 182, 212, 0.5)",
                        }}
                      >
                        <span className="relative z-10">{skill}</span>
                        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-cyan-600/0 to-blue-600/0 group-hover:from-cyan-600/20 group-hover:to-blue-600/20 transition-all duration-300"></div>
                      </motion.span>
                    ))}
                  </motion.div>
                </div>
              </AnimatedCard>
            </div>
          </div>

          {/* Features section */}
          <div className="mt-20">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <TechFeatureCard
                icon={Server}
                title="IT Administration"
                description="I have comprehensive experience in administering both Linux and Windows OS, ensuring that systems are optimized for performance, reliability, and security."
                delay={0.1}
              />
              <TechFeatureCard
                icon={Terminal}
                title="Troubleshootiing & Maintenance"
                description="Skilled in diagnosing and resolving hardware, software, and network issues to ensure optimal system performance. Proficient in routine maintenance, updates, and preventive measures to reduce downtime and improve reliability."
                delay={0.2}
              />
              <TechFeatureCard
                icon={Shield}
                title="Asset Management"
                description="I specialize in asset management, focusing on strategic planning, optimization, and long-term value creation. By aligning resources with business goals, I help maximize efficiency, minimize costs, and ensure sustainable growth."
                delay={0.3}
              />
            </div>
          </div>
        </div>

        {/* Background decoration */}
        <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-cyan-100 dark:bg-cyan-900/20 rounded-full opacity-50 blur-3xl"></div>
        <div className="absolute -top-24 -left-24 w-64 h-64 bg-blue-100 dark:bg-blue-900/20 rounded-full opacity-50 blur-3xl"></div>
      </section>

      {/* Skills Section */}
      <section
        id="skills"
        className="py-20 px-4 md:px-6 bg-gray-50/80 dark:bg-gray-900/80 backdrop-blur-sm relative overflow-hidden"
      >
        <div className="max-w-5xl mx-auto relative z-10">
          <AnimatedSectionTitle>Technical Skills</AnimatedSectionTitle>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {safeData.skillCategories?.map((category, index) => (
              <AnimatedCard key={index} delay={index * 0.1}>
                <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm p-6 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700 h-full transform transition-all duration-300 hover:shadow-xl hover:-translate-y-2 group">
                  <h3 className="text-xl font-semibold mb-4 text-cyan-600 dark:text-cyan-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {category.name}
                  </h3>
                  <ul className="space-y-4">
                    {category.skills?.map((skill, skillIndex) => (
                      <li key={skillIndex} className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-sm font-medium">{skill.name}</span>
                          <span className="text-sm text-gray-500 dark:text-gray-400">{skill.level}%</span>
                        </div>
                        <div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden relative">
                          <motion.div
                            className="h-full rounded-full"
                            style={{
                              background: "linear-gradient(90deg, #06b6d4 0%, #2563eb 100%)",
                              width: `${skill.level}%`,
                            }}
                            initial={{ width: 0 }}
                            whileInView={{ width: `${skill.level}%` }}
                            transition={{ duration: 1, delay: 0.2 + skillIndex * 0.1 }}
                            viewport={{ once: true }}
                          />
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </AnimatedCard>
            ))}
          </div>
        </div>

        {/* Background decoration */}
        <div className="absolute top-1/2 left-0 w-full h-px bg-gradient-to-r from-transparent via-gray-300 dark:via-gray-700 to-transparent"></div>
      </section>

      {/* Experience Section */}
      <section
        id="experience"
        className="py-20 px-4 md:px-6 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm relative overflow-hidden"
      >
        <div className="max-w-5xl mx-auto relative z-10">
          <AnimatedSectionTitle>Work Experience</AnimatedSectionTitle>

          {safeData.experiences && safeData.experiences.length > 0 ? (
            <div className="space-y-12">
              {safeData.experiences.map((experience, index) => (
                <AnimatedCard key={index} delay={index * 0.1}>
                  <div className="relative pl-8 md:pl-12 border-l-2 border-cyan-500 dark:border-cyan-400">
                    <motion.div
                      className="absolute w-5 h-5 bg-gradient-to-r from-cyan-500 to-blue-600 dark:from-cyan-400 dark:to-blue-500 rounded-full -left-[11px] top-1 shadow-md"
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      transition={{ duration: 0.3, delay: 0.2 }}
                      viewport={{ once: true }}
                      whileHover={{
                        boxShadow: "0 0 15px rgba(6, 182, 212, 0.7)",
                      }}
                    />

                    <div className="p-6 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-lg shadow-lg border border-gray-100 dark:border-gray-700 hover:shadow-xl transition-all duration-300 group">
                      <div className="flex flex-wrap justify-between items-start gap-2 mb-4">
                        <h3 className="text-xl font-semibold text-cyan-600 dark:text-cyan-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                          {experience.role}
                        </h3>
                        <span className="text-sm px-4 py-1 bg-gradient-to-r from-cyan-100 to-blue-100 text-cyan-800 dark:from-cyan-900/40 dark:to-blue-900/40 dark:text-cyan-300 rounded-full font-medium">
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
                          transition={{ duration: 0.3, delay: 0.3 }}
                          viewport={{ once: true }}
                        >
                          <h4 className="font-medium mb-3 text-gray-800 dark:text-gray-200">Key Achievements:</h4>
                          <ul className="space-y-2">
                            {experience.achievements.map((achievement, achievementIndex) => (
                              <motion.li
                                key={achievementIndex}
                                className="flex items-start gap-2 text-gray-700 dark:text-gray-300"
                                initial={{ opacity: 0, x: -10 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.3, delay: 0.4 + achievementIndex * 0.05 }}
                                viewport={{ once: true }}
                              >
                                <ChevronRight className="h-5 w-5 text-cyan-500 dark:text-cyan-400 flex-shrink-0 mt-0.5" />
                                <span>{achievement}</span>
                              </motion.li>
                            ))}
                          </ul>
                        </motion.div>
                      )}
                    </div>
                  </div>
                </AnimatedCard>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 text-gray-500 dark:text-gray-400">No work experience added yet.</div>
          )}
        </div>

        {/* Background decoration */}
        <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-cyan-100 dark:bg-cyan-900/20 rounded-full opacity-50 blur-3xl"></div>
      </section>

      {/* Projects Section */}
      <section
        id="projects"
        className="py-20 px-4 md:px-6 bg-gray-50/80 dark:bg-gray-900/80 backdrop-blur-sm relative overflow-hidden"
      >
        <div className="max-w-5xl mx-auto relative z-10">
          <AnimatedSectionTitle>Projects</AnimatedSectionTitle>

          {safeData.projects && safeData.projects.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {safeData.projects.map((project, index) => (
                <AnimatedCard key={index} delay={index * 0.1}>
                  <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-xl overflow-hidden shadow-lg border border-gray-100 dark:border-gray-700 h-full transform transition-all duration-300 hover:shadow-xl hover:-translate-y-2 group">
                    <div className="aspect-video relative bg-gray-200 dark:bg-gray-700 overflow-hidden">
                      <img
                        src={project.image || "/placeholder.svg?height=200&width=400"}
                        alt={project.title}
                        className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110"
                      />
                      <motion.div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>

                    <div className="p-6 space-y-4">
                      <h3 className="text-xl font-semibold text-cyan-600 dark:text-cyan-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                        {project.title}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400">{project.description}</p>

                      <div className="flex flex-wrap gap-2">
                        {project.technologies?.map((tech, techIndex) => (
                          <motion.span
                            key={techIndex}
                            className="px-3 py-1 bg-cyan-100 text-cyan-800 dark:bg-cyan-900/30 dark:text-cyan-300 rounded-full text-xs font-medium relative group"
                            whileHover={{
                              scale: 1.05,
                              y: -1,
                              boxShadow: "0 0 10px rgba(6, 182, 212, 0.5)",
                            }}
                          >
                            <span className="relative z-10">{tech}</span>
                            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-cyan-600/0 to-blue-600/0 group-hover:from-cyan-600/20 group-hover:to-blue-600/20 transition-all duration-300"></div>
                          </motion.span>
                        ))}
                      </div>

                      {project.link && (
                        <div className="pt-2">
                          <motion.div whileHover={{ x: 3 }} whileTap={{ scale: 0.98 }}>
                            <Link
                              href={project.link}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center text-cyan-600 dark:text-cyan-400 hover:underline font-medium group"
                            >
                              View Project <ArrowRight className="ml-2 h-4 w-4 group-hover:ml-3 transition-all" />
                            </Link>
                          </motion.div>
                        </div>
                      )}
                    </div>
                  </div>
                </AnimatedCard>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 text-gray-500 dark:text-gray-400">No projects added yet.</div>
          )}
        </div>

        {/* Background decoration */}
        <div className="absolute -top-24 -right-24 w-64 h-64 bg-blue-100 dark:bg-blue-900/20 rounded-full opacity-50 blur-3xl"></div>
      </section>

      {/* Certifications Section */}
      <CertificationSection certifications={safeData.certifications} />

      {/* Contact Section */}
      <section
        id="contact"
        className="py-20 px-4 md:px-6 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm relative overflow-hidden"
      >
        <div className="max-w-3xl mx-auto relative z-10">
          <AnimatedSectionTitle>Get In Touch</AnimatedSectionTitle>

          <AnimatedCard>
            <div className="bg-gray-50/90 dark:bg-gray-900/90 backdrop-blur-sm p-8 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700 relative group">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-xl opacity-0 group-hover:opacity-70 blur-lg transition-all duration-500"></div>
              <div className="relative bg-gray-50 dark:bg-gray-900 rounded-lg p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                  <div className="space-y-6">
                    <h3 className="text-xl font-semibold text-cyan-600 dark:text-cyan-400">Contact Information</h3>
                    <p className="text-gray-600 dark:text-gray-400">Feel free to reach out to me directly:</p>

                    <div className="space-y-4 pt-2">
                      {safeData.contact?.email && (
                        <motion.div className="flex items-center gap-3" whileHover={{ x: 3, color: "#06b6d4" }}>
                          <div className="p-2 bg-cyan-100 dark:bg-cyan-900/30 rounded-full">
                            <Mail className="h-5 w-5 text-cyan-600 dark:text-cyan-400" />
                          </div>
                          <a
                            href={`mailto:${safeData.contact.email}`}
                            className="hover:text-cyan-600 dark:hover:text-cyan-400"
                          >
                            {safeData.contact.email}
                          </a>
                        </motion.div>
                      )}

                      {safeData.contact?.phone && (
                        <motion.div className="flex items-center gap-3" whileHover={{ x: 3, color: "#06b6d4" }}>
                          <div className="p-2 bg-cyan-100 dark:bg-cyan-900/30 rounded-full">
                            <Phone className="h-5 w-5 text-cyan-600 dark:text-cyan-400" />
                          </div>
                          <span>{safeData.contact.phone}</span>
                        </motion.div>
                      )}

                      {safeData.contact?.location && (
                        <motion.div className="flex items-center gap-3" whileHover={{ x: 3, color: "#06b6d4" }}>
                          <div className="p-2 bg-cyan-100 dark:bg-cyan-900/30 rounded-full">
                            <MapPin className="h-5 w-5 text-cyan-600 dark:text-cyan-400" />
                          </div>
                          <span>{safeData.contact.location}</span>
                        </motion.div>
                      )}
                    </div>
                  </div>

                  <ContactForm />
                </div>
              </div>
            </div>
          </AnimatedCard>
        </div>

        {/* Background decoration */}
        <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-cyan-100 dark:bg-cyan-900/20 rounded-full opacity-50 blur-3xl"></div>
        <div className="absolute top-1/2 left-0 w-full h-px bg-gradient-to-r from-transparent via-gray-300 dark:via-gray-700 to-transparent"></div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 md:px-6 border-t border-gray-200 dark:border-gray-700 bg-gray-50/80 dark:bg-gray-900/80 backdrop-blur-sm">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <p className="text-gray-600 dark:text-gray-400">
              © {new Date().getFullYear()} {safeData.name}. All rights reserved.
            </p>
          </motion.div>

          <motion.div
            className="flex gap-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            {safeData.socialLinks?.github && (
              <motion.div
                whileHover={{
                  scale: 1.2,
                  rotate: 5,
                  boxShadow: "0 0 15px rgba(6, 182, 212, 0.5)",
                }}
                whileTap={{ scale: 0.9 }}
              >
                <Link
                  href={safeData.socialLinks.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 text-gray-600 hover:text-cyan-600 dark:text-gray-400 dark:hover:text-cyan-400 transition-colors"
                >
                  <Github className="h-5 w-5" />
                  <span className="sr-only">GitHub</span>
                </Link>
              </motion.div>
            )}

            {safeData.socialLinks?.linkedin && (
              <motion.div
                whileHover={{
                  scale: 1.2,
                  rotate: -5,
                  boxShadow: "0 0 15px rgba(6, 182, 212, 0.5)",
                }}
                whileTap={{ scale: 0.9 }}
              >
                <Link
                  href={safeData.socialLinks.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 text-gray-600 hover:text-cyan-600 dark:text-gray-400 dark:hover:text-cyan-400 transition-colors"
                >
                  <Linkedin className="h-5 w-5" />
                  <span className="sr-only">LinkedIn</span>
                </Link>
              </motion.div>
            )}
          </motion.div>
        </div>
      </footer>
    </div>
  )
}
