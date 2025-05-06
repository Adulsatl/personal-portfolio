"use client"

import { useEffect, useState } from "react"

export default function ErrorBoundary({ children }) {
  const [hasError, setHasError] = useState(false)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    const errorHandler = (error: ErrorEvent) => {
      console.error("Caught error:", error)
      setHasError(true)
      setError(error.error || new Error("An unknown error occurred"))

      // Prevent the error from bubbling up
      error.preventDefault()
      return true
    }

    // Add global error handler
    window.addEventListener("error", errorHandler)

    return () => {
      window.removeEventListener("error", errorHandler)
    }
  }, [])

  if (hasError) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 p-4">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg max-w-md w-full">
          <h2 className="text-xl font-bold text-red-600 dark:text-red-400 mb-4">Something went wrong</h2>
          <p className="text-gray-700 dark:text-gray-300 mb-4">{error?.message || "An unknown error occurred"}</p>
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

  return <>{children}</>
}
