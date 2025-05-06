import { getMaintenanceStatus, getPortfolioData } from "@/lib/portfolio-service"
import MaintenanceMode from "@/components/maintenance-mode"
import ClientPage from "./client-page"
import ErrorBoundary from "@/components/error-boundary"
import { validateCertifications, fixCertifications } from "@/lib/debug-utils"

// Add default data to use when Supabase is not accessible
const defaultPortfolioData = {
  name: "Adul S.",
  title: "Junior IT Administrator",
  shortBio:
    "Passionate IT administrator with expertise in network management, server administration, and IT infrastructure.",
  longBio:
    "I'm a dedicated junior IT administrator with a strong foundation in IT infrastructure management. My expertise spans across Windows and Linux server administration, network configuration, and cloud services. I'm passionate about implementing efficient systems and ensuring optimal performance and security.",
  profileImage: "/placeholder.svg?height=400&width=400",
  cvUrl: "/files/resume.pdf",
  coreSkills: [
    "Windows Server",
    "Linux Administration",
    "Network Management",
    "Cloud Services",
    "Security",
    "Troubleshooting",
  ],
  skillCategories: [
    {
      name: "Operating Systems",
      skills: [
        { name: "Windows Server", level: 85 },
        { name: "Linux (Ubuntu/CentOS)", level: 80 },
        { name: "macOS", level: 70 },
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
}

export const revalidate = 60 // Revalidate this page every 60 seconds

export default async function Home() {
  // Get maintenance status and portfolio data
  let isInMaintenance = false
  let portfolioData = defaultPortfolioData

  try {
    // Try to get maintenance status, but don't let errors stop the page from loading
    try {
      isInMaintenance = await getMaintenanceStatus()
    } catch (maintenanceError) {
      console.error("Error fetching maintenance status:", maintenanceError)
      // Continue with default (false) if there's an error
    }

    if (isInMaintenance) {
      return <MaintenanceMode />
    }

    // Try to get portfolio data, but use defaults if there's an error
    try {
      const fetchedData = await getPortfolioData()
      if (fetchedData) {
        // Validate and fix certifications if needed
        if (fetchedData && fetchedData.certifications) {
          const validationResult = validateCertifications(fetchedData.certifications)
          console.log("Certification validation:", validationResult)

          if (!validationResult.valid) {
            fetchedData.certifications = fixCertifications(fetchedData.certifications)
            console.log("Fixed certifications:", fetchedData.certifications)
          }
        }
        portfolioData = fetchedData
      }
    } catch (portfolioError) {
      console.error("Error fetching portfolio data:", portfolioError)
      // Continue with default data
    }
  } catch (error) {
    console.error("Error in Home component:", error)
    // Continue with default data
  }

  // Wrap the ClientPage in an ErrorBoundary to catch any client-side errors
  return (
    <ErrorBoundary>
      <ClientPage portfolioData={portfolioData} />
    </ErrorBoundary>
  )
}
