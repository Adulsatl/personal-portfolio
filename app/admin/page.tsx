"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import AdminDashboard from "@/components/admin-dashboard"
import LoadingSpinner from "@/components/loading-spinner"
import "@/app/globals.css" // Fixed CSS import path

// Default data for when database is not accessible
const defaultPortfolioData = {
  name: "Adul S.",
  title: "Junior IT Administrator",
  shortBio: "Passionate IT administrator with expertise in network management.",
  longBio: "I'm a dedicated junior IT administrator with a strong foundation in IT infrastructure management.",
  profileImage: "/placeholder.svg?height=400&width=400", // Use placeholder instead of blob URL
  cvUrl: "",
  coreSkills: ["Windows Server", "Linux Administration", "Network Management"],
  skillCategories: [
    {
      name: "Operating Systems",
      skills: [
        { name: "Windows Server", level: 85 },
        { name: "Linux", level: 80 },
      ],
    },
  ],
  experiences: [],
  projects: [],
  socialLinks: {
    github: "",
    linkedin: "",
    email: "",
  },
  contact: {
    email: "",
    phone: "",
    location: "",
  },
  certifications: [],
  enquiries: [],
}

export default function AdminPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(true)
  const [portfolioData, setPortfolioData] = useState(defaultPortfolioData)
  const [maintenanceMode, setMaintenanceMode] = useState(false)
  const [enquiries, setEnquiries] = useState([])
  const [authChecked, setAuthChecked] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    // Check authentication first
    const checkAuthentication = async () => {
      try {
        // Try to check auth status
        const response = await fetch("/api/auth/check").catch(() => null)

        // If fetch failed completely, redirect to login
        if (!response) {
          console.error("Auth check failed - redirecting to login")
          router.push("/admin/login")
          return
        }

        // Try to parse the response
        let data
        try {
          data = await response.json()
        } catch (e) {
          console.error("Failed to parse auth check response:", e)
          router.push("/admin/login")
          return
        }

        // Check authentication status
        if (!data.authenticated) {
          router.push("/admin/login")
          return
        }

        setAuthChecked(true)

        // Load data
        try {
          console.log("Fetching admin data...")

          // Fetch portfolio data
          try {
            const portfolioResponse = await fetch("/api/portfolio/data")
            if (portfolioResponse.ok) {
              const portfolioData = await portfolioResponse.json()
              if (portfolioData) {
                // Sanitize data to ensure no broken blob URLs
                const sanitizedData = sanitizePortfolioData(portfolioData)
                setPortfolioData(sanitizedData)
              }
            } else {
              console.warn("Could not fetch portfolio data, using defaults")
            }
          } catch (e) {
            console.error("Error fetching portfolio data:", e)
          }

          // Fetch maintenance status
          try {
            const maintenanceResponse = await fetch("/api/maintenance/status")
            if (maintenanceResponse.ok) {
              const { status } = await maintenanceResponse.json()
              setMaintenanceMode(status)
            } else {
              console.warn("Could not fetch maintenance status, using default (false)")
            }
          } catch (e) {
            console.error("Error fetching maintenance status:", e)
          }

          // Fetch enquiries
          try {
            const enquiriesResponse = await fetch("/api/enquiries")
            if (enquiriesResponse.ok) {
              const enquiriesData = await enquiriesResponse.json()
              setEnquiries(enquiriesData || [])
            } else {
              console.warn("Could not fetch enquiries, using empty array")
            }
          } catch (e) {
            console.error("Error fetching enquiries:", e)
          }
        } catch (error) {
          console.error("Error fetching admin data:", error)
          setError("Failed to load data. Please try refreshing the page.")
        } finally {
          setIsLoading(false)
        }
      } catch (error) {
        console.error("Error checking authentication:", error)
        router.push("/admin/login")
      }
    }

    checkAuthentication()
  }, [router])

  // Function to sanitize portfolio data and replace any blob URLs with placeholders
  const sanitizePortfolioData = (data) => {
    if (!data) return defaultPortfolioData

    // Create a deep copy to avoid mutating the original
    const sanitized = JSON.parse(JSON.stringify(data))

    // Replace profile image if it's a blob URL or doesn't exist
    if (!sanitized.profileImage || sanitized.profileImage.includes("blob:")) {
      sanitized.profileImage = "/placeholder.svg?height=400&width=400"
    }

    // Replace CV URL if it's a blob URL
    if (sanitized.cvUrl && sanitized.cvUrl.includes("blob:")) {
      sanitized.cvUrl = ""
    }

    // Sanitize project images
    if (sanitized.projects && Array.isArray(sanitized.projects)) {
      sanitized.projects = sanitized.projects.map((project) => {
        if (!project.image || project.image.includes("blob:")) {
          project.image = `/placeholder.svg?height=200&width=400&text=${encodeURIComponent(project.title || "Project")}`
        }
        return project
      })
    }

    // Sanitize certification images
    if (sanitized.certifications && Array.isArray(sanitized.certifications)) {
      sanitized.certifications = sanitized.certifications.map((cert) => {
        if (!cert.image || cert.image.includes("blob:")) {
          cert.image = `/placeholder.svg?height=200&width=400&text=${encodeURIComponent(cert.name || "Certificate")}`
        }
        if (!cert.badgeImage || cert.badgeImage.includes("blob:")) {
          cert.badgeImage = `/placeholder.svg?height=100&width=100&text=${encodeURIComponent(cert.name || "Badge")}`
        }
        return cert
      })
    }

    return sanitized
  }

  if (!authChecked || isLoading) {
    return <LoadingSpinner />
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900 p-4">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg max-w-md w-full">
          <h2 className="text-xl font-bold text-red-600 dark:text-red-400 mb-4">Error Loading Dashboard</h2>
          <p className="text-gray-700 dark:text-gray-300 mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            Refresh Page
          </button>
        </div>
      </div>
    )
  }

  return (
    <AdminDashboard
      initialPortfolioData={portfolioData}
      initialMaintenanceMode={maintenanceMode}
      initialEnquiries={enquiries}
    />
  )
}
