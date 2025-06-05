"use client"

import type * as React from "react"
import { createContext, useContext, useEffect, useState } from "react"

type Theme = "dark" | "light" | "system"

type ThemeProviderProps = {
  children: React.ReactNode
  defaultTheme?: Theme
  storageKey?: string
}

type ThemeProviderState = {
  theme: Theme
  setTheme: (theme: Theme) => void
}

const initialState: ThemeProviderState = {
  theme: "dark",
  setTheme: () => null,
}

const ThemeProviderContext = createContext<ThemeProviderState>(initialState)

export function ThemeProvider({
  children,
  defaultTheme = "dark", // Changed to dark as default
  storageKey = "theme",
  ...props
}: ThemeProviderProps) {
  const [theme, setTheme] = useState<Theme>(() => {
    // Force dark theme as default, only check localStorage for user preference
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem(storageKey) as Theme
      return stored || "dark" // Default to dark if no stored preference
    }
    return "dark"
  })
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!mounted) return

    const root = window.document.documentElement

    // Remove all existing theme classes
    root.classList.remove("light", "dark")

    // Apply the current theme - default to dark
    if (theme === "system") {
      // Even for system, prefer dark unless explicitly light
      const systemTheme = window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark"
      root.classList.add(systemTheme)
    } else {
      root.classList.add(theme)
    }
  }, [theme, mounted])

  // Store theme in localStorage when it changes
  useEffect(() => {
    if (mounted) {
      localStorage.setItem(storageKey, theme)
    }
  }, [theme, storageKey, mounted])

  // Add listener for system theme changes
  useEffect(() => {
    if (!mounted) return

    if (theme === "system") {
      const mediaQuery = window.matchMedia("(prefers-color-scheme: light)")

      const handleChange = () => {
        const root = window.document.documentElement
        root.classList.remove("light", "dark")
        // Prefer dark theme even for system
        root.classList.add(mediaQuery.matches ? "light" : "dark")
      }

      mediaQuery.addEventListener("change", handleChange)
      return () => mediaQuery.removeEventListener("change", handleChange)
    }
  }, [theme, mounted])

  const value = {
    theme,
    setTheme: (theme: Theme) => {
      setTheme(theme)
    },
  }

  // Don't render children until mounted to prevent hydration mismatch
  if (!mounted) {
    return null
  }

  return (
    <ThemeProviderContext.Provider {...props} value={value}>
      {children}
    </ThemeProviderContext.Provider>
  )
}

export const useTheme = () => {
  const context = useContext(ThemeProviderContext)

  if (context === undefined) throw new Error("useTheme must be used within a ThemeProvider")

  return context
}
