"use client"

import type React from "react"

import { useState, useEffect, useCallback } from "react"
import { useRouter } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import {
  Save,
  Moon,
  Sun,
  LogOut,
  Server,
  AlertTriangle,
  Check,
  LayoutDashboard,
  User,
  Code,
  Award,
  Mail,
  Settings,
  Briefcase,
  Activity,
  Menu,
  X,
} from "lucide-react"
import { useTheme } from "next-themes"
import BasicInfoTab from "@/components/admin/basic-info-tab"
import SkillsTab from "@/components/admin/skills-tab"
import ExperienceTab from "@/components/admin/experience-tab"
import ProjectsTab from "@/components/admin/projects-tab"
import ContactTab from "@/components/admin/contact-tab"
import SettingsTab from "@/components/admin/settings-tab"
import CertificationsTab from "@/components/admin/certifications-tab"
import EnquiriesTab from "@/components/admin/enquiries-tab"
import SupabaseConnectionTest from "@/components/supabase-connection-test"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

// Professional tech-inspired background component
const TechBackground = () => (
  <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
    {/* Circuit board pattern */}
    <div
      className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05]"
      style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 304 304' width='304' height='304'%3E%3Cpath fill='%239C92AC' fillOpacity='0.4' d='M44.1 224a5 5 0 1 1 0 2H0v-2h44.1zm160 48a5 5 0 1 1 0 2H82v-2h122.1zm57.8-46a5 5 0 1 1 0-2H304v2h-42.1zm0 16a5 5 0 1 1 0-2H304v2h-42.1zm6.2-114a5 5 0 1 1 0 2h-86.2a5 5 0 1 1 0-2h86.2zm-256-48a5 5 0 1 1 0 2H0v-2h12.1zm185.8 34a5 5 0 1 1 0-2h86.2a5 5 0 1 1 0 2h-86.2zM258 12.1a5 5 0 1 1-2 0V0h2v12.1zm-64 208a5 5 0 1 1-2 0v-54.2a5 5 0 1 1 2 0v54.2zm48-198.2V80h62v2h-64V21.9a5 5 0 1 1 2 0zm16 16V64h46v2h-48V37.9a5 5 0 1 1 2 0zm-128 96V208h16v12.1a5 5 0 1 1-2 0V210h-16v-76.1a5 5 0 1 1 2 0zm-5.9-21.9a5 5 0 1 1 0 2H114v48H85.9a5 5 0 1 1 0-2H112v-48h12.1zm-6.2 130a5 5 0 1 1 0-2H176v-74.1a5 5 0 1 1 2 0V242h-60.1zm-16-64a5 5 0 1 1 0-2H114v48h10.1a5 5 0 1 1 0 2H112v-48h-10.1zM66 284.1a5 5 0 1 1-2 0V274H50v30h-2v-32h18v12.1zM236.1 176a5 5 0 1 1 0 2H226v94h48v32h-2v-30h-48v-98h12.1zm25.8-30a5 5 0 1 1 0-2H274v44.1a5 5 0 1 1-2 0V146h-10.1zm-64 96a5 5 0 1 1 0-2H208v-80h16v-14h-42.1a5 5 0 1 1 0-2H226v18h-16v80h-12.1zm86.2-210a5 5 0 1 1 0 2H272V0h2v32h10.1zM98 101.9V146H53.9a5 5 0 1 1 0-2H96v-42.1a5 5 0 1 1 2 0zM53.9 34a5 5 0 1 1 0-2H80V0h2v34H53.9zm60.1 3.9V66H82v64H69.9a5 5 0 1 1 0-2H80V64h32V37.9a5 5 0 1 1 2 0zM101.9 82a5 5 0 1 1 0-2H128V37.9a5 5 0 1 1 2 0V82h-28.1zm16-64a5 5 0 1 1 0-2H146v44.1a5 5 0 1 1-2 0V18h-26.1zm102.2 270a5 5 0 1 1 0 2H98v14h-2v-16h124.1zM242 149.9V160h16v34h-16v62h48v48h-2v-46h-48v-66h16v-30h-16v-12.1a5 5 0 1 1 2 0zM53.9 18a5 5 0 1 1 0-2H64V2H48V0h18v18H53.9zm112 32a5 5 0 1 1 0-2H192V0h50v2h-48v48h-28.1zm-48-48a5 5 0 0 1-9.8-2h2.07a3 3 0 1 0 5.66 0H178v34h-18V21.9a5 5 0 1 1 2 0V32h14V2h-58.1zm0 96a5 5 0 1 1 0-2H137l32-32h39V21.9a5 5 0 1 1 2 0V66h-40.17l-32 32H117.9zm28.1 90.1a5 5 0 1 1-2 0v-76.51L175.59 80H224V21.9a5 5 0 1 1 2 0V82h-49.59L146 112.41v75.69zm16 32a5 5 0 1 1-2 0v-99.51L184.59 96H300.1a5 5 0 0 1 3.9-3.9v2.07a3 3 0 0 0 0 5.66v2.07a5 5 0 0 1-3.9-3.9H185.41L162 121.41v98.69zm-144-64a5 5 0 1 1-2 0v-3.51l48-48V48h32V0h2v50H66v55.41l-48 48v2.69zM50 53.9v43.51l-48 48V208h26.1a5 5 0 1 1 0 2H0v-65.41l48-48V53.9a5 5 0 1 1 2 0zm-16 16V89.41l-34 34v-2.82l32-32V69.9a5 5 0 1 1 2 0zM12.1 32a5 5 0 1 1 0 2H9.41L0 43.41V40.6L8.59 32h3.51zm265.8 18a5 5 0 1 1 0-2h18.69l7.41-7.41v2.82L297.41 50H277.9zm-16 160a5 5 0 1 1 0-2H288v-71.41l16-16v2.82l-14 14V210h-28.1zm-208 32a5 5 0 1 1 0-2H64v-22.59L40.59 194H21.9a5 5 0 1 1 0-2H41.41L66 217.59V242H53.9zm150.2 14a5 5 0 1 1 0 2H96v-56.6L56.6 162H37.9a5 5 0 1 1 0-2h19.5L98 200.6V256h106.1zm-150.2 2a5 5 0 1 1 0-2H80v-46.59L48.59 178H21.9a5 5 0 1 1 0-2H49.41L82 208.59V258H53.9zM34 39.8v1.61L9.41 66H0v-2h8.59L32 40.59V0h2v39.8zM2 300.1a5 5 0 0 1 3.9 3.9H3.83A3 3 0 0 0 0 302.17V256h18v48h-2v-46H2v42.1zM34 241v63h-2v-62H0v-2h34v1zM17 18H0v-2h16V0h2v18h-1zm273-2h14v2h-16V0h2v16zm-32 273v15h-2v-14h-14v14h-2v-16h18v1zM0 92.1A5.02 5.02 0 0 1 6 97a5 5 0 0 1-6 4.9v-2.07a3 3 0 1 0 0-5.66V92.1zM80 272h2v32h-2v-32zm37.9 32h-2.07a3 3 0 0 0-5.66 0h-2.07a5 5 0 0 1 9.8 0zM5.9 0A5.02 5.02 0 0 1 0 5.9V3.83A3 3 0 0 0 3.83 0H5.9zm294.2 0h2.07A3 3 0 0 0 304 3.83V5.9a5 5 0 0 1-3.9-5.9zm3.9 300.1v2.07a3 3 0 0 0-1.83 1.83h-2.07a5 5 0 0 1 3.9-3.9zM97 100a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm0-16a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm16 16a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm16 16a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm0 16a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm-48 32a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm16 16a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm32 48a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm-16 16a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm32-16a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm0-32a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm16 32a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm32 16a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm0-16a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm-16-64a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm16 0a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm16 96a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm0 16a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm16 16a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm16-144a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm0 32a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm16-32a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm16-16a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm-96 0a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm0 16a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm16-32a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm96 0a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm-16-64a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm16-16a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm-32 0a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm0-16a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm-16 0a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm-16 0a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm-16 0a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM49 36a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm-32 0a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm32 16a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM33 68a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm16-48a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm0 240a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm16 32a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm-16-64a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm0 16a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm-16-32a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm80-176a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm16 0a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm-16-16a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm32 48a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm16-16a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm0-32a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm112 176a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm-16 16a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm0 16a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm0 16a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM17 180a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm0 16a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm0-32a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm16 0a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM17 84a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm32 64a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm16-16a3 3 0 1 0 0-6 3 3 0 0 0 0 6z'%3E%3C/path%3E%3C/svg%3E")`,
      }}
    ></div>

    {/* Animated particles */}
    <div className="particles">
      {[...Array(20)].map((_, i) => (
        <div
          key={i}
          className="particle"
          style={
            {
              "--x": `${Math.random() * 100}%`,
              "--y": `${Math.random() * 100}%`,
              "--duration": `${Math.random() * 20 + 10}s`,
              "--delay": `${Math.random() * 5}s`,
              "--size": `${Math.random() * 10 + 5}px`,
              "--color": `hsl(${Math.random() * 60 + 200}, 70%, 60%)`,
            } as React.CSSProperties
          }
        ></div>
      ))}
    </div>

    {/* Gradient orbs */}
    <div className="absolute top-1/4 -left-20 w-72 h-72 bg-blue-500/20 dark:bg-blue-500/10 rounded-full blur-3xl"></div>
    <div className="absolute bottom-1/4 -right-20 w-72 h-72 bg-cyan-500/20 dark:bg-cyan-500/10 rounded-full blur-3xl"></div>
  </div>
)

// Professional button component
const ProfessionalButton = ({ children, onClick, disabled = false, className = "", variant = "primary" }) => {
  const getColors = () => {
    switch (variant) {
      case "primary":
        return "from-blue-600 to-indigo-700 dark:from-blue-500 dark:to-indigo-600 text-white"
      case "secondary":
        return "from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-800 text-gray-800 dark:text-gray-200"
      case "danger":
        return "from-red-600 to-rose-700 dark:from-red-500 dark:to-rose-600 text-white"
      default:
        return "from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-800 text-gray-800 dark:text-gray-200"
    }
  }

  return (
    <motion.button
      onClick={onClick}
      disabled={disabled}
      className={`relative px-4 py-2 rounded-md transition-all flex items-center gap-2 overflow-hidden ${className}`}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <motion.span
        className={`absolute inset-0 bg-gradient-to-r ${getColors()}`}
        initial={{ opacity: 0.9 }}
        animate={{ opacity: 0.9 }}
        whileHover={{
          opacity: 1,
          boxShadow: [
            "0 0 5px rgba(37, 99, 235, 0.5), 0 0 10px rgba(37, 99, 235, 0.3)",
            "0 0 15px rgba(37, 99, 235, 0.5), 0 0 20px rgba(37, 99, 235, 0.3)",
            "0 0 10px rgba(37, 99, 235, 0.5), 0 0 15px rgba(37, 99, 235, 0.3)",
            "0 0 5px rgba(37, 99, 235, 0.5), 0 0 10px rgba(37, 99, 235, 0.3)",
          ],
        }}
        transition={{
          duration: 2,
          repeat: Number.POSITIVE_INFINITY,
          repeatType: "reverse",
        }}
      />
      <span className="relative z-10 flex items-center text-white font-medium">{children}</span>
    </motion.button>
  )
}

function AdminDashboard({ initialPortfolioData, initialMaintenanceMode, initialEnquiries = [] }) {
  const router = useRouter()
  const { theme, setTheme, resolvedTheme } = useTheme()
  const [isSaving, setIsSaving] = useState(false)
  const [portfolioData, setPortfolioData] = useState(initialPortfolioData)
  const [maintenanceMode, setMaintenanceMode] = useState(initialMaintenanceMode)
  const [enquiries, setEnquiries] = useState(initialEnquiries)
  const [saveStatus, setSaveStatus] = useState(null)
  const [activeTab, setActiveTab] = useState("basic")
  const [mounted, setMounted] = useState(false)
  const [sidebarOpen, setSidebarOpen] = useState(false) // Default closed on mobile
  const [isMobile, setIsMobile] = useState(false)

  // Check if we're on mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  // Fix hydration issues with theme
  useEffect(() => {
    setMounted(true)

    // Open sidebar by default on desktop
    if (window.innerWidth >= 768) {
      setSidebarOpen(true)
    }
  }, [])

  // Save function with better error handling
  const handleSave = useCallback(async () => {
    if (isSaving) return

    setIsSaving(true)
    setSaveStatus(null)

    try {
      console.log("Starting save process...")

      // Update portfolio data
      console.log("Saving portfolio data...")
      const portfolioResponse = await fetch("/api/portfolio", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(portfolioData),
      })

      if (!portfolioResponse.ok) {
        const errorText = await portfolioResponse.text()
        console.error("Failed to update portfolio data:", errorText)
        throw new Error(`Failed to update portfolio data: ${errorText}`)
      }

      console.log("Portfolio data saved successfully")

      // Update maintenance mode
      console.log("Saving maintenance mode:", maintenanceMode)
      const maintenanceResponse = await fetch("/api/maintenance", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: maintenanceMode }),
      })

      if (!maintenanceResponse.ok) {
        const errorText = await maintenanceResponse.text()
        console.error("Failed to update maintenance mode:", errorText)
        throw new Error(`Failed to update maintenance mode: ${errorText}`)
      }

      console.log("Maintenance mode saved successfully")

      setSaveStatus("success")
      setTimeout(() => setSaveStatus(null), 3000)
    } catch (error) {
      console.error("Error saving changes:", error)
      setSaveStatus("error")
    } finally {
      setIsSaving(false)
    }
  }, [isSaving, portfolioData, maintenanceMode])

  const handleLogout = async () => {
    try {
      const response = await fetch("/api/auth/logout", {
        method: "POST",
      })

      if (response.ok) {
        router.push("/admin/login")
      }
    } catch (error) {
      console.error("Error logging out:", error)
    }
  }

  const fadeVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  }

  // Determine current theme for UI elements
  const currentTheme = mounted ? (theme === "system" ? resolvedTheme : theme) : "light"

  // Sidebar navigation items
  const navItems = [
    { id: "basic", label: "Basic Info", icon: User },
    { id: "skills", label: "Skills", icon: Code },
    { id: "experience", label: "Experience", icon: Briefcase },
    { id: "projects", label: "Projects", icon: LayoutDashboard },
    { id: "certifications", label: "Certifications", icon: Award },
    { id: "contact", label: "Contact", icon: Mail },
    { id: "enquiries", label: "Enquiries", icon: Mail },
    { id: "settings", label: "Settings", icon: Settings },
    { id: "diagnostics", label: "Diagnostics", icon: Activity },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 text-gray-900 dark:text-gray-100 relative">
      {/* Tech-inspired background */}
      <TechBackground />

      {/* Mobile header */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-30 bg-white/90 dark:bg-gray-800/90 backdrop-blur-md border-b border-gray-200 dark:border-gray-700 shadow-sm p-4">
        <div className="flex items-center justify-between">
          <h1 className="text-lg font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-700 dark:from-blue-500 dark:to-indigo-600">
            Admin Dashboard
          </h1>
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 rounded-md bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
            aria-label={sidebarOpen ? "Close menu" : "Open menu"}
          >
            {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Professional sidebar */}
      <div className="flex h-screen overflow-hidden">
        {/* Overlay for mobile */}
        {sidebarOpen && isMobile && (
          <motion.div
            className="fixed inset-0 bg-black/50 z-20 md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSidebarOpen(false)}
          />
        )}

        <motion.div
          className={`fixed inset-y-0 left-0 z-30 w-[280px] bg-white/90 dark:bg-gray-800/90 backdrop-blur-md border-r border-gray-200 dark:border-gray-700 shadow-lg transform transition-transform duration-300 ease-in-out ${
            sidebarOpen ? "translate-x-0" : "-translate-x-full"
          }`}
          initial={false}
        >
          <div className="flex flex-col h-full">
            <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-700 dark:from-blue-500 dark:to-indigo-600">
                  Admin Dashboard
                </h2>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Manage your portfolio</p>
              </div>
              {/* Close button for mobile */}
              {isMobile && (
                <button
                  onClick={() => setSidebarOpen(false)}
                  className="md:hidden p-2 rounded-md bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
                >
                  <X size={20} />
                </button>
              )}
            </div>

            <div className="flex-1 overflow-y-auto py-4 custom-scrollbar">
              <nav className="px-2 space-y-1">
                {navItems.map((item) => {
                  const Icon = item.icon
                  return (
                    <motion.button
                      key={item.id}
                      onClick={() => {
                        setActiveTab(item.id)
                        // On mobile, close sidebar after selection
                        if (isMobile) {
                          setSidebarOpen(false)
                        }
                      }}
                      className={`w-full flex items-center px-4 py-3 rounded-lg transition-colors ${
                        activeTab === item.id
                          ? "bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400"
                          : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700/50"
                      }`}
                      whileHover={{ x: 5 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Icon className="h-5 w-5 mr-3" />
                      <span className="font-medium">{item.label}</span>
                      {activeTab === item.id && (
                        <motion.div
                          className="ml-auto w-1.5 h-5 bg-blue-600 dark:bg-blue-500 rounded-full"
                          layoutId="activeTabIndicator"
                        />
                      )}
                    </motion.button>
                  )
                })}
              </nav>
            </div>

            <div className="p-4 border-t border-gray-200 dark:border-gray-700 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Server className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                  <span className="text-sm font-medium">Maintenance:</span>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={maintenanceMode}
                    onChange={() => setMaintenanceMode(!maintenanceMode)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                </label>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  {mounted && currentTheme === "dark" ? (
                    <Moon className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                  ) : (
                    <Sun className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                  )}
                  <span className="text-sm font-medium">Theme:</span>
                </div>
                <select
                  value={theme}
                  onChange={(e) => setTheme(e.target.value)}
                  className="bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2"
                >
                  <option value="light">Light</option>
                  <option value="dark">Dark</option>
                  <option value="system">System</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <ProfessionalButton onClick={handleSave} disabled={isSaving} variant="primary" className="w-full">
                  <Save className="h-4 w-4" />
                  {isSaving ? "Saving..." : "Save"}
                </ProfessionalButton>

                <ProfessionalButton onClick={handleLogout} variant="secondary" className="w-full">
                  <LogOut className="h-4 w-4" />
                  Logout
                </ProfessionalButton>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Toggle sidebar button - only visible on desktop */}
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="hidden md:block fixed top-4 left-4 z-30 p-2 rounded-md bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm shadow-md text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          aria-label={sidebarOpen ? "Close sidebar" : "Open sidebar"}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d={sidebarOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
            />
          </svg>
        </button>

        {/* Main content */}
        <div
          className={`flex-1 transition-all duration-300 ease-in-out ${
            sidebarOpen && !isMobile ? "ml-[280px]" : "ml-0"
          } relative z-10 overflow-y-auto h-screen`}
        >
          <main className="p-4 md:p-8 max-w-7xl mx-auto pt-20 md:pt-8 pb-20">
            <AnimatePresence>
              {saveStatus === "success" && (
                <motion.div
                  className="fixed top-4 right-4 z-50 bg-gradient-to-r from-green-500 to-emerald-600 text-white px-4 py-2 rounded-md shadow-lg flex items-center gap-2"
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <Check className="h-5 w-5" />
                  Changes saved successfully!
                </motion.div>
              )}

              {saveStatus === "error" && (
                <motion.div
                  className="fixed top-4 right-4 z-50 bg-gradient-to-r from-red-500 to-rose-600 text-white px-4 py-2 rounded-md shadow-lg flex items-center gap-2"
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <AlertTriangle className="h-5 w-5" />
                  Error saving changes. Please try again.
                </motion.div>
              )}
            </AnimatePresence>

            <AnimatePresence mode="wait">
              <motion.div key={activeTab} initial="hidden" animate="visible" exit="hidden" variants={fadeVariants}>
                {activeTab === "basic" && (
                  <BasicInfoTab portfolioData={portfolioData} setPortfolioData={setPortfolioData} />
                )}

                {activeTab === "skills" && (
                  <SkillsTab portfolioData={portfolioData} setPortfolioData={setPortfolioData} />
                )}

                {activeTab === "experience" && (
                  <ExperienceTab portfolioData={portfolioData} setPortfolioData={setPortfolioData} />
                )}

                {activeTab === "projects" && (
                  <ProjectsTab portfolioData={portfolioData} setPortfolioData={setPortfolioData} />
                )}

                {activeTab === "certifications" && (
                  <CertificationsTab portfolioData={portfolioData} setPortfolioData={setPortfolioData} />
                )}

                {activeTab === "contact" && (
                  <ContactTab portfolioData={portfolioData} setPortfolioData={setPortfolioData} />
                )}

                {activeTab === "enquiries" && (
                  <EnquiriesTab
                    enquiries={enquiries}
                    onEnquiriesChange={(updatedEnquiries) => setEnquiries(updatedEnquiries)}
                  />
                )}

                {activeTab === "settings" && <SettingsTab />}

                {activeTab === "diagnostics" && (
                  <Card>
                    <CardHeader>
                      <CardTitle>System Diagnostics</CardTitle>
                      <CardDescription>Check system connections and status</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <SupabaseConnectionTest />
                    </CardContent>
                  </Card>
                )}
              </motion.div>
            </AnimatePresence>
          </main>
        </div>
      </div>

      {/* CSS for animations */}
      <style jsx global>{`
        /* Custom scrollbar */
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background-color: rgba(156, 163, 175, 0.5);
          border-radius: 20px;
        }
        
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background-color: rgba(156, 163, 175, 0.7);
        }
        
        /* Particle animation */
        .particles {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          overflow: hidden;
        }
        
        .particle {
          position: absolute;
          display: block;
          pointer-events: none;
          width: var(--size);
          height: var(--size);
          background-color: var(--color);
          border-radius: 50%;
          top: var(--y);
          left: var(--x);
          opacity: 0.3;
          animation: float var(--duration) infinite linear;
          animation-delay: var(--delay);
          transform-origin: center center;
          box-shadow: 0 0 10px var(--color);
        }
        
        @keyframes float {
          0% {
            transform: translate(0, 0) rotate(0deg) scale(1);
            opacity: 0.3;
          }
          25% {
            opacity: 0.5;
          }
          50% {
            transform: translate(100px, 100px) rotate(180deg) scale(1.2);
            opacity: 0.1;
          }
          75% {
            opacity: 0.4;
          }
          100% {
            transform: translate(0, 0) rotate(360deg) scale(1);
            opacity: 0.3;
          }
        }
      `}</style>
    </div>
  )
}

export default AdminDashboard
