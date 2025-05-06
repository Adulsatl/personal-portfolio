"use client"
import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Trash2, Plus } from "lucide-react"
import FileUpload from "@/components/file-upload"

export default function CertificationsTab({ portfolioData, setPortfolioData }) {
  const [imageErrors, setImageErrors] = useState({})
  const [badgeErrors, setBadgeErrors] = useState({})

  const handleCertificationImageUpload = (url, filename, path, index) => {
    const updatedCertifications = [...(portfolioData.certifications || [])]
    updatedCertifications[index].image = url

    // Clear any image error for this certification
    setImageErrors((prev) => ({
      ...prev,
      [index]: false,
    }))

    setPortfolioData({
      ...portfolioData,
      certifications: updatedCertifications,
    })
  }

  const handleBadgeImageUpload = (url, filename, path, index) => {
    const updatedCertifications = [...(portfolioData.certifications || [])]
    updatedCertifications[index].badgeImage = url

    // Clear any badge error for this certification
    setBadgeErrors((prev) => ({
      ...prev,
      [index]: false,
    }))

    setPortfolioData({
      ...portfolioData,
      certifications: updatedCertifications,
    })
  }

  const handleImageError = (index) => {
    setImageErrors((prev) => ({
      ...prev,
      [index]: true,
    }))

    // Replace with placeholder
    const updatedCertifications = [...(portfolioData.certifications || [])]
    const certName = updatedCertifications[index]?.name || "Certificate"
    updatedCertifications[index].image = `/placeholder.svg?height=200&width=400&text=${encodeURIComponent(certName)}`

    setPortfolioData({
      ...portfolioData,
      certifications: updatedCertifications,
    })
  }

  const handleBadgeError = (index) => {
    setBadgeErrors((prev) => ({
      ...prev,
      [index]: true,
    }))

    // Replace with placeholder
    const updatedCertifications = [...(portfolioData.certifications || [])]
    const certName = updatedCertifications[index]?.name || "Badge"
    updatedCertifications[index].badgeImage =
      `/placeholder.svg?height=100&width=100&text=${encodeURIComponent(certName)}`

    setPortfolioData({
      ...portfolioData,
      certifications: updatedCertifications,
    })
  }

  const addCertification = (type = "certificate") => {
    const newCertification = {
      id: Date.now().toString(),
      name: type === "certificate" ? "New Certification" : "New Badge",
      issuer: "Certification Issuer",
      date: new Date().toISOString().split("T")[0],
      link: "",
      category: "other",
    }

    // Add appropriate image based on type
    if (type === "certificate") {
      newCertification.image = "/placeholder.svg?height=200&width=400&text=New%20Certification"
    } else {
      newCertification.badgeImage = "/placeholder.svg?height=100&width=100&text=Badge"
    }

    // Ensure certifications array exists
    const currentCertifications = portfolioData.certifications || []

    setPortfolioData({
      ...portfolioData,
      certifications: [...currentCertifications, newCertification],
    })
  }

  const removeCertification = (index) => {
    const updatedCertifications = [...(portfolioData.certifications || [])]
    updatedCertifications.splice(index, 1)

    setPortfolioData({
      ...portfolioData,
      certifications: updatedCertifications,
    })
  }

  // Ensure certifications array exists
  const certifications = portfolioData.certifications || []

  return (
    <Card>
      <CardHeader>
        <CardTitle>Certifications</CardTitle>
        <CardDescription>Manage your certifications and badges</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {certifications.length === 0 ? (
          <div className="text-center py-4 text-gray-500">
            No certifications added yet. Add your first certification or badge below.
          </div>
        ) : (
          certifications.map((certification, index) => (
            <div key={certification.id || index} className="border rounded-lg p-4 space-y-4">
              <div className="flex justify-between items-center">
                <input
                  value={certification.name || ""}
                  onChange={(e) => {
                    const updatedCertifications = [...(portfolioData.certifications || [])]
                    updatedCertifications[index].name = e.target.value
                    setPortfolioData({
                      ...portfolioData,
                      certifications: updatedCertifications,
                    })
                  }}
                  className="text-lg font-medium w-auto border-0 bg-transparent focus:outline-none focus:ring-2 focus:ring-blue-500 rounded px-2 py-1"
                  placeholder="Certification Name"
                />
                <button
                  className="p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-md"
                  onClick={() => removeCertification(index)}
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="block text-sm font-medium">Issuer</label>
                  <input
                    value={certification.issuer || ""}
                    onChange={(e) => {
                      const updatedCertifications = [...(portfolioData.certifications || [])]
                      updatedCertifications[index].issuer = e.target.value
                      setPortfolioData({
                        ...portfolioData,
                        certifications: updatedCertifications,
                      })
                    }}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700"
                    placeholder="Issuing Organization"
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium">Date</label>
                  <input
                    type="date"
                    value={certification.date?.split("T")[0] || new Date().toISOString().split("T")[0]}
                    onChange={(e) => {
                      const updatedCertifications = [...(portfolioData.certifications || [])]
                      updatedCertifications[index].date = e.target.value
                      setPortfolioData({
                        ...portfolioData,
                        certifications: updatedCertifications,
                      })
                    }}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700"
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium">Link</label>
                  <input
                    value={certification.link || ""}
                    onChange={(e) => {
                      const updatedCertifications = [...(portfolioData.certifications || [])]
                      updatedCertifications[index].link = e.target.value
                      setPortfolioData({
                        ...portfolioData,
                        certifications: updatedCertifications,
                      })
                    }}
                    placeholder="https://example.com/certification"
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700"
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium">Category</label>
                  <input
                    value={certification.category || "other"}
                    onChange={(e) => {
                      const updatedCertifications = [...(portfolioData.certifications || [])]
                      updatedCertifications[index].category = e.target.value
                      setPortfolioData({
                        ...portfolioData,
                        certifications: updatedCertifications,
                      })
                    }}
                    placeholder="e.g., cloud, networking, security"
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="block text-sm font-medium">Certificate Image</label>
                  <div className="flex items-start gap-4">
                    <div className="w-24 h-16 relative rounded-md overflow-hidden bg-gray-200 dark:bg-gray-700">
                      {imageErrors[index] ? (
                        <div className="w-full h-full flex items-center justify-center text-gray-400 text-xs">
                          Image not available
                        </div>
                      ) : (
                        <img
                          src={certification.image || "/placeholder.svg?height=200&width=400&text=Certificate"}
                          alt={certification.name || "Certificate"}
                          className="w-full h-full object-cover"
                          onError={() => handleImageError(index)}
                        />
                      )}
                    </div>
                    <div className="flex-1">
                      <FileUpload
                        onUploadComplete={(url, filename, path) =>
                          handleCertificationImageUpload(url, filename, path, index)
                        }
                        folder="certifications"
                        accept="image/*"
                        buttonText="Upload Image"
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium">Badge Image</label>
                  <div className="flex items-start gap-4">
                    <div className="w-16 h-16 relative rounded-md overflow-hidden bg-gray-200 dark:bg-gray-700">
                      {badgeErrors[index] ? (
                        <div className="w-full h-full flex items-center justify-center text-gray-400 text-xs">
                          Badge not available
                        </div>
                      ) : (
                        <img
                          src={certification.badgeImage || "/placeholder.svg?height=100&width=100&text=Badge"}
                          alt={`${certification.name || "Certificate"} Badge`}
                          className="w-full h-full object-cover"
                          onError={() => handleBadgeError(index)}
                        />
                      )}
                    </div>
                    <div className="flex-1">
                      <FileUpload
                        onUploadComplete={(url, filename, path) => handleBadgeImageUpload(url, filename, path, index)}
                        folder="badges"
                        accept="image/*"
                        buttonText="Upload Badge"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}

        <div className="flex gap-4">
          <button
            className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors flex items-center gap-2"
            onClick={() => addCertification("certificate")}
          >
            <Plus className="h-4 w-4" />
            Add Certificate
          </button>
          <button
            className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors flex items-center gap-2"
            onClick={() => addCertification("badge")}
          >
            <Plus className="h-4 w-4" />
            Add Badge
          </button>
        </div>
      </CardContent>
    </Card>
  )
}
