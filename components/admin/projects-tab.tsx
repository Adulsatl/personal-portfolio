"use client"
import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Trash2, Plus, X } from "lucide-react"
import FileUpload from "@/components/file-upload"

export default function ProjectsTab({ portfolioData, setPortfolioData }) {
  const [imageErrors, setImageErrors] = useState({})

  const handleProjectImageUpload = (url, filename, path, index) => {
    const updatedProjects = [...(portfolioData.projects || [])]
    updatedProjects[index].image = url

    // Clear any image error for this project
    setImageErrors((prev) => ({
      ...prev,
      [index]: false,
    }))

    setPortfolioData({
      ...portfolioData,
      projects: updatedProjects,
    })
  }

  const handleImageError = (index) => {
    setImageErrors((prev) => ({
      ...prev,
      [index]: true,
    }))

    // Replace with placeholder
    const updatedProjects = [...(portfolioData.projects || [])]
    const projectTitle = updatedProjects[index]?.title || "Project"
    updatedProjects[index].image = `/placeholder.svg?height=200&width=400&text=${encodeURIComponent(projectTitle)}`

    setPortfolioData({
      ...portfolioData,
      projects: updatedProjects,
    })
  }

  const addProject = () => {
    setPortfolioData({
      ...portfolioData,
      projects: [
        ...(portfolioData.projects || []),
        {
          title: "New Project",
          description: "Project description",
          technologies: ["Tech"],
          image: "/placeholder.svg?height=200&width=400&text=New%20Project",
          link: "",
        },
      ],
    })
  }

  const addTechnology = (projectIndex) => {
    const updatedProjects = [...(portfolioData.projects || [])]
    if (!updatedProjects[projectIndex].technologies) {
      updatedProjects[projectIndex].technologies = []
    }
    updatedProjects[projectIndex].technologies.push("New Tech")

    setPortfolioData({
      ...portfolioData,
      projects: updatedProjects,
    })
  }

  const removeTechnology = (projectIndex, techIndex) => {
    const updatedProjects = [...(portfolioData.projects || [])]
    updatedProjects[projectIndex].technologies.splice(techIndex, 1)

    setPortfolioData({
      ...portfolioData,
      projects: updatedProjects,
    })
  }

  const removeProject = (projectIndex) => {
    const updatedProjects = [...(portfolioData.projects || [])]
    updatedProjects.splice(projectIndex, 1)

    setPortfolioData({
      ...portfolioData,
      projects: updatedProjects,
    })
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Projects</CardTitle>
        <CardDescription>Manage your portfolio projects</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {portfolioData.projects?.map((project, projectIndex) => (
          <div key={projectIndex} className="border rounded-lg p-4 space-y-4">
            <div className="flex justify-between items-center">
              <input
                value={project.title}
                onChange={(e) => {
                  const updatedProjects = [...(portfolioData.projects || [])]
                  updatedProjects[projectIndex].title = e.target.value
                  setPortfolioData({ ...portfolioData, projects: updatedProjects })
                }}
                className="text-lg font-medium w-auto border-0 bg-transparent focus:outline-none focus:ring-2 focus:ring-blue-500 rounded px-2 py-1"
              />
              <button
                className="p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-md"
                onClick={() => removeProject(projectIndex)}
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium">Description</label>
              <textarea
                value={project.description}
                onChange={(e) => {
                  const updatedProjects = [...(portfolioData.projects || [])]
                  updatedProjects[projectIndex].description = e.target.value
                  setPortfolioData({ ...portfolioData, projects: updatedProjects })
                }}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="block text-sm font-medium">Project Image</label>
                <div className="flex items-start gap-4">
                  <div className="w-24 h-16 relative rounded-md overflow-hidden bg-gray-200 dark:bg-gray-700">
                    {imageErrors[projectIndex] ? (
                      <div className="w-full h-full flex items-center justify-center text-gray-400 text-xs">
                        Image not available
                      </div>
                    ) : (
                      <img
                        src={project.image || "/placeholder.svg?height=200&width=400"}
                        alt={project.title}
                        className="w-full h-full object-cover"
                        onError={() => handleImageError(projectIndex)}
                      />
                    )}
                  </div>
                  <div className="flex-1">
                    <FileUpload
                      onUploadComplete={(url, filename, path) =>
                        handleProjectImageUpload(url, filename, path, projectIndex)
                      }
                      folder="projects"
                      accept="image/*"
                      buttonText="Upload Image"
                    />
                  </div>
                </div>
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-medium">Project Link</label>
                <input
                  value={project.link || ""}
                  onChange={(e) => {
                    const updatedProjects = [...(portfolioData.projects || [])]
                    updatedProjects[projectIndex].link = e.target.value
                    setPortfolioData({ ...portfolioData, projects: updatedProjects })
                  }}
                  placeholder="https://example.com/project"
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium">Technologies</label>
              <div className="flex flex-wrap gap-2">
                {project.technologies?.map((tech, techIndex) => (
                  <div
                    key={techIndex}
                    className="flex items-center bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300 rounded-full px-3 py-1"
                  >
                    <input
                      value={tech}
                      onChange={(e) => {
                        const updatedProjects = [...(portfolioData.projects || [])]
                        updatedProjects[projectIndex].technologies[techIndex] = e.target.value
                        setPortfolioData({ ...portfolioData, projects: updatedProjects })
                      }}
                      className="border-0 bg-transparent p-0 h-auto w-auto focus:outline-none"
                    />
                    <button
                      className="h-5 w-5 ml-1 p-0 text-blue-800 dark:text-blue-300 hover:text-blue-900 dark:hover:text-blue-200"
                      onClick={() => removeTechnology(projectIndex, techIndex)}
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </div>
                ))}
                <button
                  className="px-3 py-1 rounded-full border border-blue-300 dark:border-blue-700 text-blue-800 dark:text-blue-300 hover:bg-blue-50 dark:hover:bg-blue-900/20 flex items-center gap-1"
                  onClick={() => addTechnology(projectIndex)}
                >
                  <Plus className="h-3 w-3" />
                  Add Tech
                </button>
              </div>
            </div>
          </div>
        ))}

        <button
          className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors flex items-center gap-2"
          onClick={addProject}
        >
          <Plus className="h-4 w-4" />
          Add Project
        </button>
      </CardContent>
    </Card>
  )
}
