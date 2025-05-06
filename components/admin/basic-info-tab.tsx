"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { X, Plus } from "lucide-react"
import FileUpload from "@/components/file-upload"

export default function BasicInfoTab({ portfolioData, setPortfolioData }) {
  const [uploadError, setUploadError] = useState(null)
  const [imageError, setImageError] = useState(false)

  // Reset image error when profileImage changes
  useEffect(() => {
    setImageError(false)
  }, [portfolioData.profileImage])

  const handleProfileImageUploadComplete = (url, filename) => {
    setPortfolioData({
      ...portfolioData,
      profileImage: url,
    })
  }

  const handleCVUploadComplete = (url, filename) => {
    setPortfolioData({
      ...portfolioData,
      cvUrl: url,
    })
  }

  const handleImageError = () => {
    setImageError(true)
    // Replace with placeholder if image fails to load
    if (portfolioData.profileImage !== "/placeholder.svg?height=400&width=400") {
      setPortfolioData({
        ...portfolioData,
        profileImage: "/placeholder.svg?height=400&width=400",
      })
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Basic Information</CardTitle>
        <CardDescription>Update your personal information and CV</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="name" className="block text-sm font-medium">
                Full Name
              </label>
              <input
                id="name"
                value={portfolioData.name}
                onChange={(e) => setPortfolioData({ ...portfolioData, name: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="title" className="block text-sm font-medium">
                Professional Title
              </label>
              <input
                id="title"
                value={portfolioData.title}
                onChange={(e) => setPortfolioData({ ...portfolioData, title: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="shortBio" className="block text-sm font-medium">
                Short Bio (Homepage)
              </label>
              <textarea
                id="shortBio"
                value={portfolioData.shortBio}
                onChange={(e) => setPortfolioData({ ...portfolioData, shortBio: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700"
                rows={3}
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="longBio" className="block text-sm font-medium">
                Long Bio (About Section)
              </label>
              <textarea
                id="longBio"
                value={portfolioData.longBio}
                rows={5}
                onChange={(e) => setPortfolioData({ ...portfolioData, longBio: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700"
              />
            </div>
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <label className="block text-sm font-medium">Profile Image</label>
              <div className="flex items-start gap-4">
                <div className="w-24 h-24 relative rounded-md overflow-hidden bg-gray-200 dark:bg-gray-700">
                  {imageError ? (
                    <div className="w-full h-full flex items-center justify-center text-gray-400 text-xs">
                      Image not available
                    </div>
                  ) : (
                    <img
                      src={portfolioData.profileImage || "/placeholder.svg?height=100&width=100"}
                      alt="Profile"
                      className="w-full h-full object-cover"
                      onError={handleImageError}
                    />
                  )}
                </div>
                <div className="flex-1">
                  <FileUpload
                    onUploadComplete={handleProfileImageUploadComplete}
                    folder="profile"
                    accept="image/*"
                    buttonText="Upload Profile Image"
                  />
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium">CV Upload</label>
              <div className="flex items-center gap-4">
                {portfolioData.cvUrl && (
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    Current: {portfolioData.cvUrl.split("/").pop()}
                  </span>
                )}
                <div className="flex-1">
                  <FileUpload
                    onUploadComplete={handleCVUploadComplete}
                    folder="cv"
                    accept=".pdf,.doc,.docx"
                    buttonText="Upload CV"
                  />
                </div>
              </div>
            </div>

            <div className="space-y-2 pt-4">
              <label className="block text-sm font-medium">Core Skills</label>
              <div className="flex flex-wrap gap-2">
                {portfolioData.coreSkills?.map((skill, index) => (
                  <div
                    key={index}
                    className="flex items-center bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300 rounded-full px-3 py-1"
                  >
                    <input
                      value={skill}
                      onChange={(e) => {
                        const updatedSkills = [...portfolioData.coreSkills]
                        updatedSkills[index] = e.target.value
                        setPortfolioData({ ...portfolioData, coreSkills: updatedSkills })
                      }}
                      className="border-0 bg-transparent p-0 h-auto w-auto focus:outline-none"
                    />
                    <button
                      className="h-5 w-5 ml-1 p-0 text-blue-800 dark:text-blue-300 hover:text-blue-900 dark:hover:text-blue-200"
                      onClick={() => {
                        const updatedSkills = [...portfolioData.coreSkills]
                        updatedSkills.splice(index, 1)
                        setPortfolioData({ ...portfolioData, coreSkills: updatedSkills })
                      }}
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </div>
                ))}
                <button
                  className="px-3 py-1 rounded-full border border-blue-300 dark:border-blue-700 text-blue-800 dark:text-blue-300 hover:bg-blue-50 dark:hover:bg-blue-900/20 flex items-center gap-1"
                  onClick={() => {
                    setPortfolioData({
                      ...portfolioData,
                      coreSkills: [...(portfolioData.coreSkills || []), "New Skill"],
                    })
                  }}
                >
                  <Plus className="h-3 w-3" />
                  Add Skill
                </button>
              </div>
            </div>

            <div className="space-y-2 pt-4">
              <label className="block text-sm font-medium">Social Links</label>
              <div className="space-y-4">
                <div className="space-y-2">
                  <label htmlFor="github" className="block text-sm font-medium">
                    GitHub URL
                  </label>
                  <input
                    id="github"
                    value={portfolioData.socialLinks?.github || ""}
                    onChange={(e) =>
                      setPortfolioData({
                        ...portfolioData,
                        socialLinks: {
                          ...(portfolioData.socialLinks || {}),
                          github: e.target.value,
                        },
                      })
                    }
                    placeholder="https://github.com/username"
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="linkedin" className="block text-sm font-medium">
                    LinkedIn URL
                  </label>
                  <input
                    id="linkedin"
                    value={portfolioData.socialLinks?.linkedin || ""}
                    onChange={(e) =>
                      setPortfolioData({
                        ...portfolioData,
                        socialLinks: {
                          ...(portfolioData.socialLinks || {}),
                          linkedin: e.target.value,
                        },
                      })
                    }
                    placeholder="https://linkedin.com/in/username"
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="email" className="block text-sm font-medium">
                    Email Address
                  </label>
                  <input
                    id="email"
                    value={portfolioData.socialLinks?.email || ""}
                    onChange={(e) =>
                      setPortfolioData({
                        ...portfolioData,
                        socialLinks: {
                          ...(portfolioData.socialLinks || {}),
                          email: e.target.value,
                        },
                      })
                    }
                    placeholder="your@email.com"
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
