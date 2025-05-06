"use client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Trash2, Plus, X } from "lucide-react"

export default function ExperienceTab({ portfolioData, setPortfolioData }) {
  const addExperience = () => {
    const newExperience = {
      role: "New Role",
      company: "Company Name",
      period: "Start - End",
      description: "Description",
      achievements: [],
    }

    setPortfolioData((prevData) => ({
      ...prevData,
      experiences: [newExperience, ...(prevData.experiences || [])],
    }))
  }

  const addAchievement = (experienceIndex) => {
    const updatedExperiences = [...(portfolioData.experiences || [])]
    if (!updatedExperiences[experienceIndex].achievements) {
      updatedExperiences[experienceIndex].achievements = []
    }
    updatedExperiences[experienceIndex].achievements.push("New achievement")

    setPortfolioData({
      ...portfolioData,
      experiences: updatedExperiences,
    })
  }

  const removeAchievement = (experienceIndex, achievementIndex) => {
    const updatedExperiences = [...(portfolioData.experiences || [])]
    updatedExperiences[experienceIndex].achievements.splice(achievementIndex, 1)

    setPortfolioData({
      ...portfolioData,
      experiences: updatedExperiences,
    })
  }

  const removeExperience = (experienceIndex) => {
    const updatedExperiences = [...(portfolioData.experiences || [])]
    updatedExperiences.splice(experienceIndex, 1)

    setPortfolioData({
      ...portfolioData,
      experiences: updatedExperiences,
    })
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <div>
            <CardTitle>Work Experience</CardTitle>
            <CardDescription>Manage your professional experience</CardDescription>
          </div>
          <button
            className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors flex items-center gap-2"
            onClick={addExperience}
          >
            <Plus className="h-4 w-4" />
            Add Experience
          </button>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {portfolioData.experiences?.map((experience, experienceIndex) => (
          <div key={experienceIndex} className="border rounded-lg p-4 space-y-4">
            <div className="flex justify-between items-center">
              <input
                value={experience.role}
                onChange={(e) => {
                  const updatedExperiences = [...(portfolioData.experiences || [])]
                  updatedExperiences[experienceIndex].role = e.target.value
                  setPortfolioData({ ...portfolioData, experiences: updatedExperiences })
                }}
                className="text-lg font-medium w-auto border-0 bg-transparent focus:outline-none focus:ring-2 focus:ring-blue-500 rounded px-2 py-1"
              />
              <button
                className="p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-md"
                onClick={() => removeExperience(experienceIndex)}
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="block text-sm font-medium">Company</label>
                <input
                  value={experience.company}
                  onChange={(e) => {
                    const updatedExperiences = [...(portfolioData.experiences || [])]
                    updatedExperiences[experienceIndex].company = e.target.value
                    setPortfolioData({ ...portfolioData, experiences: updatedExperiences })
                  }}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700"
                />
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-medium">Period</label>
                <input
                  value={experience.period}
                  onChange={(e) => {
                    const updatedExperiences = [...(portfolioData.experiences || [])]
                    updatedExperiences[experienceIndex].period = e.target.value
                    setPortfolioData({ ...portfolioData, experiences: updatedExperiences })
                  }}
                  placeholder="Jan 2020 - Present"
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium">Description</label>
              <textarea
                value={experience.description}
                onChange={(e) => {
                  const updatedExperiences = [...(portfolioData.experiences || [])]
                  updatedExperiences[experienceIndex].description = e.target.value
                  setPortfolioData({ ...portfolioData, experiences: updatedExperiences })
                }}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium">Achievements</label>
              <div className="space-y-2">
                {experience.achievements?.map((achievement, achievementIndex) => (
                  <div key={achievementIndex} className="flex items-center gap-2">
                    <input
                      value={achievement}
                      onChange={(e) => {
                        const updatedExperiences = [...(portfolioData.experiences || [])]
                        updatedExperiences[experienceIndex].achievements[achievementIndex] = e.target.value
                        setPortfolioData({ ...portfolioData, experiences: updatedExperiences })
                      }}
                      className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700"
                    />
                    <button
                      className="p-2 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md"
                      onClick={() => removeAchievement(experienceIndex, achievementIndex)}
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                ))}
              </div>
              <button
                className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors flex items-center gap-2"
                onClick={() => addAchievement(experienceIndex)}
              >
                <Plus className="h-4 w-4" />
                Add Achievement
              </button>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
