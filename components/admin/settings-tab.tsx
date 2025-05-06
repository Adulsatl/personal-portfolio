"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function SettingsTab() {
  const [currentPassword, setCurrentPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [status, setStatus] = useState<null | "success" | "error">(null)
  const [errorMessage, setErrorMessage] = useState("")

  const handleResetPassword = async (e) => {
    e.preventDefault()

    // Validate passwords
    if (newPassword !== confirmPassword) {
      setStatus("error")
      setErrorMessage("New passwords do not match")
      return
    }

    setIsSubmitting(true)
    setStatus(null)
    setErrorMessage("")

    try {
      const response = await fetch("/api/auth/reset-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ currentPassword, newPassword }),
      })

      if (response.ok) {
        setStatus("success")
        setCurrentPassword("")
        setNewPassword("")
        setConfirmPassword("")
      } else {
        const data = await response.json()
        setStatus("error")
        setErrorMessage(data.error || "Failed to reset password")
      }
    } catch (error) {
      console.error("Error resetting password:", error)
      setStatus("error")
      setErrorMessage("An unexpected error occurred")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Account Settings</CardTitle>
        <CardDescription>Manage your admin account</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="max-w-md">
          <form onSubmit={handleResetPassword} className="space-y-4">
            {status === "success" && (
              <div className="p-3 bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300 rounded-md">
                Password changed successfully!
              </div>
            )}

            {status === "error" && (
              <div className="p-3 bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300 rounded-md">
                {errorMessage || "Failed to change password. Please try again."}
              </div>
            )}

            <div className="space-y-2">
              <label htmlFor="current-password" className="block text-sm font-medium">
                Current Password
              </label>
              <input
                id="current-password"
                type="password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700"
                required
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="new-password" className="block text-sm font-medium">
                New Password
              </label>
              <input
                id="new-password"
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700"
                required
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="confirm-password" className="block text-sm font-medium">
                Confirm New Password
              </label>
              <input
                id="confirm-password"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700"
                required
              />
            </div>

            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors disabled:opacity-70"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Changing Password..." : "Change Password"}
            </button>
          </form>
        </div>
      </CardContent>
    </Card>
  )
}
