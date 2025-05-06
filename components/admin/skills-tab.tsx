"use client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Trash2, Plus, X } from "lucide-react"

export default function SkillsTab({ portfolioData, setPortfolioData }) {
  const addSkillCategory = () => {
    setPortfolioData({
      ...portfolioData,
      skillCategories: [...(portfolioData.skillCategories || []), { name: "New Category", skills: [] }],
    })
  }

  const addSkill = (categoryIndex) => {
    const updatedCategories = [...(portfolioData.skillCategories || [])]
    updatedCategories[categoryIndex].skills.push({ name: "New Skill", level: 75 })

    setPortfolioData({
      ...portfolioData,
      skillCategories: updatedCategories,
    })
  }

  const removeSkill = (categoryIndex, skillIndex) => {
    const updatedCategories = [...(portfolioData.skillCategories || [])]
    updatedCategories[categoryIndex].skills.splice(skillIndex, 1)

    setPortfolioData({
      ...portfolioData,
      skillCategories: updatedCategories,
    })
  }

  const removeCategory = (categoryIndex) => {
    const updatedCategories = [...(portfolioData.skillCategories || [])]
    updatedCategories.splice(categoryIndex, 1)

    setPortfolioData({
      ...portfolioData,
      skillCategories: updatedCategories,
    })
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Technical Skills</CardTitle>
        <CardDescription>Manage your skill categories and proficiency levels</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {portfolioData.skillCategories?.map((category, categoryIndex) => (
          <div key={categoryIndex} className="border rounded-lg p-4 space-y-4">
            <div className="flex justify-between items-center">
              <input
                value={category.name}
                onChange={(e) => {
                  const updatedCategories = [...(portfolioData.skillCategories || [])]
                  updatedCategories[categoryIndex].name = e.target.value
                  setPortfolioData({ ...portfolioData, skillCategories: updatedCategories })
                }}
                className="text-lg font-medium w-auto border-0 bg-transparent focus:outline-none focus:ring-2 focus:ring-blue-500 rounded px-2 py-1"
              />
              <button
                className="p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-md"
                onClick={() => removeCategory(categoryIndex)}
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>

            <div className="space-y-3">
              {category.skills?.map((skill, skillIndex) => (
                <div key={skillIndex} className="flex items-center gap-4">
                  <input
                    value={skill.name}
                    onChange={(e) => {
                      const updatedCategories = [...(portfolioData.skillCategories || [])]
                      updatedCategories[categoryIndex].skills[skillIndex].name = e.target.value
                      setPortfolioData({ ...portfolioData, skillCategories: updatedCategories })
                    }}
                    className="w-1/3 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700"
                  />
                  <div className="flex-1">
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={skill.level}
                      onChange={(e) => {
                        const updatedCategories = [...(portfolioData.skillCategories || [])]
                        updatedCategories[categoryIndex].skills[skillIndex].level = Number.parseInt(e.target.value)
                        setPortfolioData({ ...portfolioData, skillCategories: updatedCategories })
                      }}
                      className="w-full"
                    />
                  </div>
                  <span className="w-10 text-center">{skill.level}%</span>
                  <button
                    className="p-2 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md"
                    onClick={() => removeSkill(categoryIndex, skillIndex)}
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>

            <button
              className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors flex items-center gap-2"
              onClick={() => addSkill(categoryIndex)}
            >
              <Plus className="h-4 w-4" />
              Add Skill
            </button>
          </div>
        ))}

        <button
          className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors flex items-center gap-2"
          onClick={addSkillCategory}
        >
          <Plus className="h-4 w-4" />
          Add Skill Category
        </button>
      </CardContent>
    </Card>
  )
}
