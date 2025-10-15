"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Trash2, Plus } from "lucide-react"
import FileUpload from "@/components/file-upload"

type Cert = {
  id: string
  name: string
  issuer: string
  date: string
  link?: string
  category: string
  image?: string | null
  badgeImage?: string | null
  displayType?: "badge" | "certificate"
}

export default function CertificationsTab({ portfolioData, setPortfolioData }) {
  const [imageErrors, setImageErrors] = useState<Record<string | number, boolean>>({})
  const [badgeErrors, setBadgeErrors] = useState<Record<string | number, boolean>>({})

  const certifications: Cert[] = portfolioData.certifications || []

  const updateCert = (index: number, patch: Partial<Cert>) => {
    const updated = [...certifications]
    updated[index] = { ...updated[index], ...patch }
    setPortfolioData({ ...portfolioData, certifications: updated })
  }

  const handleCertificationImageUpload = (url: string, _filename: string, _path: string, index: number) => {
    // If a cert image is uploaded and there is no badge image, default to certificate view,
    // unless the user already selected "badge".
    const isExplicitBadge = certifications[index]?.displayType === "badge"
    updateCert(index, {
      image: url,
      displayType: isExplicitBadge ? "badge" : "certificate",
    })
    setImageErrors((prev) => ({ ...prev, [index]: false }))
  }

  const handleBadgeImageUpload = (url: string, _filename: string, _path: string, index: number) => {
    // Badge upload should make the item show in badges only by default.
    updateCert(index, {
      badgeImage: url,
      displayType: "badge",
    })
    setBadgeErrors((prev) => ({ ...prev, [index]: false }))
  }

  const handleImageError = (index: number) => {
    setImageErrors((prev) => ({ ...prev, [index]: true }))
    const updated = [...certifications]
    const certName = updated[index]?.name || "Certificate"
    updated[index].image = `/placeholder.svg?height=200&width=400&text=${encodeURIComponent(certName)}`
    setPortfolioData({ ...portfolioData, certifications: updated })
  }

  const handleBadgeError = (index: number) => {
    setBadgeErrors((prev) => ({ ...prev, [index]: true }))
    const updated = [...certifications]
    const certName = updated[index]?.name || "Badge"
    updated[index].badgeImage = `/placeholder.svg?height=100&width=100&text=${encodeURIComponent(certName)}`
    setPortfolioData({ ...portfolioData, certifications: updated })
  }

  const addCertification = (type: "certificate" | "badge" = "certificate") => {
    const newCertification: Cert = {
      id: Date.now().toString(),
      name: type === "certificate" ? "New Certification" : "New Badge",
      issuer: "Certification Issuer",
      date: new Date().toISOString().split("T")[0],
      link: "",
      category: "other",
      displayType: type === "badge" ? "badge" : "certificate",
    }

    if (type === "certificate") {
      newCertification.image = "/placeholder.svg?height=200&width=400&text=New%20Certification"
    } else {
      newCertification.badgeImage = "/placeholder.svg?height=100&width=100&text=Badge"
    }

    setPortfolioData({
      ...portfolioData,
      certifications: [...certifications, newCertification],
    })
  }

  const removeCertification = (index: number) => {
    const updated = [...certifications]
    updated.splice(index, 1)
    setPortfolioData({ ...portfolioData, certifications: updated })
  }

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
                  onChange={(e) => updateCert(index, { name: e.target.value })}
                  className="text-lg font-medium w-auto border-0 bg-transparent focus:outline-none focus:ring-2 focus:ring-cyan-500 rounded px-2 py-1"
                  placeholder="Certification Name"
                />
                <button
                  className="p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-md"
                  onClick={() => removeCertification(index)}
                  aria-label="Remove certification"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="block text-sm font-medium">Issuer</label>
                  <input
                    value={certification.issuer || ""}
                    onChange={(e) => updateCert(index, { issuer: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700"
                    placeholder="Issuing Organization"
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium">Date</label>
                  <input
                    type="date"
                    value={certification.date?.split("T")[0] || new Date().toISOString().split("T")[0]}
                    onChange={(e) => updateCert(index, { date: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700"
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium">Link</label>
                  <input
                    value={certification.link || ""}
                    onChange={(e) => updateCert(index, { link: e.target.value })}
                    placeholder="https://example.com/certification"
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700"
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium">Category</label>
                  <input
                    value={certification.category || "other"}
                    onChange={(e) => updateCert(index, { category: e.target.value })}
                    placeholder="e.g., cloud, networking, security"
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700"
                  />
                </div>

                {/* Display Type Selector */}
                <div className="space-y-2 md:col-span-2">
                  <label className="block text-sm font-medium">Display As</label>
                  <div className="flex flex-wrap gap-2">
                    <button
                      type="button"
                      className={`px-3 py-1.5 rounded-md border ${
                        (certification.displayType || (certification.badgeImage ? "badge" : "certificate")) === "badge"
                          ? "bg-cyan-600 text-white border-cyan-600"
                          : "bg-gray-100 dark:bg-gray-700 border-gray-300 dark:border-gray-600"
                      }`}
                      onClick={() => updateCert(index, { displayType: "badge" })}
                    >
                      Badge
                    </button>
                    <button
                      type="button"
                      className={`px-3 py-1.5 rounded-md border ${
                        (certification.displayType || (certification.badgeImage ? "badge" : "certificate")) ===
                        "certificate"
                          ? "bg-cyan-600 text-white border-cyan-600"
                          : "bg-gray-100 dark:bg-gray-700 border-gray-300 dark:border-gray-600"
                      }`}
                      onClick={() => updateCert(index, { displayType: "certificate" })}
                    >
                      Certificate
                    </button>
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      Tip: Uploading a badge image will default this to Badge. You can override anytime.
                    </span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Certificate Image */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium">Certificate Image</label>
                  <div className="flex items-start gap-4">
                    <div className="w-28 h-18 relative rounded-md overflow-hidden bg-gray-200 dark:bg-gray-700">
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
                        buttonText="Upload Certificate"
                      />
                    </div>
                  </div>
                </div>

                {/* Badge Image */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium">Badge Image</label>
                  <div className="flex items-start gap-4">
                    <div className="w-18 h-18 relative rounded-md overflow-hidden bg-gray-200 dark:bg-gray-700">
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
