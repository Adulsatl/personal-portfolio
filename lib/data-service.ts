import { createServerSupabaseClient, createClientSupabaseClient } from "./supabase"

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

    const supabase = createServerSupabaseClient()
    const { data, error } = await supabase.from("portfolio").select("*").eq("id", "main").single()

    if (error) {
      console.error("Error fetching portfolio data:", error)
      return getDefaultPortfolioData()
    }

    if (data) {
      cachedPortfolioData = data.content
      lastFetchTime = now
      return data.content
    } else {
      // If no data exists, create default data
      const defaultData = getDefaultPortfolioData()
      await updatePortfolioData(defaultData)
      return defaultData
    }
  } catch (error) {
    console.error("Error getting portfolio data:", error)
    return getDefaultPortfolioData()
  }
}

// Update portfolio data
export async function updatePortfolioData(data: any) {
  try {
    console.log("Updating portfolio data")
    const supabase = createClientSupabaseClient()

    const { error } = await supabase.from("portfolio").upsert({
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

    const supabase = createServerSupabaseClient()
    const { data, error } = await supabase.from("settings").select("value").eq("key", "maintenance_mode").single()

    if (error) {
      console.error("Error fetching maintenance status:", error)
      return false
    }

    if (data) {
      cachedMaintenanceStatus = data.value === true
      maintenanceLastFetchTime = now
      return cachedMaintenanceStatus
    } else {
      // If no data exists, create default status
      await updateMaintenanceStatus(false)
      return false
    }
  } catch (error) {
    console.error("Error getting maintenance status:", error)
    return false
  }
}

export async function updateMaintenanceStatus(status: boolean) {
  try {
    console.log("Updating maintenance status:", status)
    const supabase = createClientSupabaseClient()

    const { error } = await supabase.from("settings").upsert({
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
    const supabase = createServerSupabaseClient()
    const { data, error } = await supabase.from("enquiries").select("*").order("created_at", { ascending: false })

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

export async function addEnquiry(enquiry: any) {
  try {
    const supabase = createClientSupabaseClient()

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
    console.error("Error adding enquiry:", error)
    return false
  }
}

export async function deleteEnquiry(enquiryId: string) {
  try {
    const supabase = createClientSupabaseClient()

    const { error } = await supabase.from("enquiries").delete().eq("id", enquiryId)

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
    certifications: [],
  }
}

// Authentication
export async function signIn(email: string, password: string) {
  try {
    const supabase = createClientSupabaseClient()

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      return { user: null, error }
    }

    return { user: data.user, error: null }
  } catch (error) {
    console.error("Error signing in:", error)
    return { user: null, error }
  }
}

export async function logOut() {
  try {
    const supabase = createClientSupabaseClient()
    await supabase.auth.signOut()
    return true
  } catch (error) {
    console.error("Error signing out:", error)
    return false
  }
}

export async function checkAuth() {
  try {
    const supabase = createClientSupabaseClient()
    const { data } = await supabase.auth.getSession()
    return !!data.session
  } catch (error) {
    console.error("Error checking auth:", error)
    return false
  }
}
