import { supabase } from "./supabase-client"
import { supabaseAdmin } from "./supabase-admin"

// Cache for portfolio data
let cachedPortfolioData: any = null
let lastFetchTime = 0
const CACHE_DURATION = 30000 // 30 seconds

// Get portfolio data
export async function getPortfolioData() {
  try {
    // Check if we have cached data that's still fresh
    const now = Date.now()
    if (cachedPortfolioData && now - lastFetchTime < CACHE_DURATION) {
      return cachedPortfolioData
    }

    // Try to fetch from Supabase
    try {
      const { data, error } = await supabaseAdmin.from("portfolio").select("*").eq("id", "main").single()

      if (error) {
        console.warn("Error fetching portfolio data:", error)
        return getDefaultPortfolioData()
      }

      if (data) {
        // Ensure certifications array exists
        if (data.content && !data.content.certifications) {
          data.content.certifications = []
        }

        cachedPortfolioData = data.content
        lastFetchTime = now
        return data.content
      }
    } catch (error) {
      console.warn("Exception fetching portfolio data:", error)
    }

    // If we get here, either no data exists or there was an error
    // Return default data
    const defaultData = getDefaultPortfolioData()

    // Try to save the default data, but don't wait for it
    updatePortfolioData(defaultData).catch((err) => console.warn("Failed to save default portfolio data:", err))

    return defaultData
  } catch (error) {
    console.error("Error getting portfolio data:", error)
    return getDefaultPortfolioData()
  }
}

// Update portfolio data
export async function updatePortfolioData(data: any) {
  try {
    console.log("Updating portfolio data")

    // Ensure certifications array exists
    if (!data.certifications) {
      data.certifications = []
    }

    const { error } = await supabaseAdmin.from("portfolio").upsert({
      id: "main",
      content: data,
      updated_at: new Date().toISOString(),
    })

    if (error) {
      console.error("Error updating portfolio data:", error)
      return false
    }

    // Update cache
    cachedPortfolioData = data
    lastFetchTime = Date.now()

    return true
  } catch (error) {
    console.error("Error updating portfolio data:", error)
    return false
  }
}

// Maintenance status
let cachedMaintenanceStatus: boolean | null = null
let maintenanceLastFetchTime = 0

export async function getMaintenanceStatus() {
  try {
    // Check if we have cached status that's still fresh
    const now = Date.now()
    if (cachedMaintenanceStatus !== null && now - maintenanceLastFetchTime < CACHE_DURATION) {
      return cachedMaintenanceStatus
    }

    // Try to fetch from Supabase
    try {
      // Use supabaseAdmin to bypass RLS policies
      const { data, error } = await supabaseAdmin.from("settings").select("value").eq("key", "maintenance_mode")

      if (error) {
        console.warn("Error fetching maintenance status:", error)
        return false
      }

      // If we got data and at least one row
      if (data && data.length > 0) {
        // Use the first row if multiple exist (shouldn't happen, but just in case)
        cachedMaintenanceStatus = data[0].value === true
        maintenanceLastFetchTime = now
        return cachedMaintenanceStatus
      }
    } catch (error) {
      console.warn("Exception fetching maintenance status:", error)
    }

    // If we get here, either no data exists or there was an error
    // Set default status to false and try to save it
    await updateMaintenanceStatus(false).catch((err) => console.warn("Failed to save default maintenance status:", err))
    return false
  } catch (error) {
    console.error("Error getting maintenance status:", error)
    return false
  }
}

export async function updateMaintenanceStatus(status: boolean) {
  try {
    console.log("Updating maintenance status:", status)

    // Use supabaseAdmin to bypass RLS policies
    const { error } = await supabaseAdmin.from("settings").upsert({
      key: "maintenance_mode",
      value: status,
      updated_at: new Date().toISOString(),
    })

    if (error) {
      console.error("Error updating maintenance status:", error)
      return false
    }

    // Update cache
    cachedMaintenanceStatus = status
    maintenanceLastFetchTime = Date.now()

    return true
  } catch (error) {
    console.error("Error updating maintenance status:", error)
    return false
  }
}

// Enquiries
export async function getEnquiries() {
  try {
    const { data, error } = await supabaseAdmin.from("enquiries").select("*").order("created_at", { ascending: false })

    if (error) {
      console.error("Error fetching enquiries:", error)
      return []
    }

    return data || []
  } catch (error) {
    console.error("Error getting enquiries:", error)
    return []
  }
}

// Add enquiry
export async function addEnquiry(enquiry) {
  try {
    if (!supabase) {
      console.error("Supabase client not initialized")
      return false
    }

    // For enquiries from the public site, we'll still use the regular client
    // but we'll need to make sure the RLS policies allow this operation
    const { error } = await supabase.from("enquiries").insert({
      name: enquiry.name,
      email: enquiry.email,
      message: enquiry.message,
      created_at: new Date().toISOString(),
    })

    if (error) {
      console.error("Error adding enquiry:", error)
      return false
    }

    return true
  } catch (error) {
    console.error("Exception adding enquiry:", error)
    return false
  }
}

// Add this function to the file
export async function deleteEnquiry(enquiryId) {
  try {
    console.log("Deleting enquiry:", enquiryId)

    // Use supabaseAdmin to bypass RLS policies
    const { error } = await supabaseAdmin.from("enquiries").delete().eq("id", enquiryId)

    if (error) {
      console.error("Error deleting enquiry:", error)
      return false
    }

    return true
  } catch (error) {
    console.error("Error deleting enquiry:", error)
    return false
  }
}

// Default data
function getDefaultPortfolioData() {
  return {
    name: "Adul S.",
    title: "Junior IT Administrator",
    shortBio: "Passionate IT administrator with expertise in network management.",
    longBio: "I'm a dedicated junior IT administrator with a strong foundation in IT infrastructure management.",
    profileImage: "/placeholder.svg?height=400&width=400",
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
    certifications: [], // Ensure certifications array exists in default data
  }
}
