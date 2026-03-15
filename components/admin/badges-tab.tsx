'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Trash2, Plus } from 'lucide-react'
import FileUpload from '@/components/file-upload'

interface Badge {
  id: string
  name: string
  description: string
  category: string
  color: string
  year: number
  badgeImage?: string
  verificationUrl?: string
}

export default function BadgesTab({ portfolioData, setPortfolioData }) {
  const [imageErrors, setImageErrors] = useState<{ [key: number]: boolean }>({})

  const badges: Badge[] = portfolioData?.badges || []
  console.log("[v0] BadgesTab received badges:", badges.length, "badges", badges)

  const addBadge = () => {
    const newBadge: Badge = {
      id: `badge-${Date.now()}`,
      name: 'New Badge',
      description: 'Badge description',
      category: 'Achievements',
      color: 'from-cyan-500 to-blue-500',
      year: new Date().getFullYear(),
    }
    setPortfolioData({
      ...portfolioData,
      badges: [...badges, newBadge],
    })
  }

  const updateBadge = (index: number, field: keyof Badge, value: any) => {
    const updated = [...badges]
    updated[index] = { ...updated[index], [field]: value }
    setPortfolioData({
      ...portfolioData,
      badges: updated,
    })
  }

  const deleteBadge = (index: number) => {
    setPortfolioData({
      ...portfolioData,
      badges: badges.filter((_, i) => i !== index),
    })
  }

  const handleImageUpload = (url: string, _filename: string, _path: string, index: number) => {
    updateBadge(index, 'badgeImage', url)
  }

  const handleImageError = (index: number) => {
    setImageErrors({ ...imageErrors, [index]: true })
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Badges Management</CardTitle>
        <CardDescription>
          Manage your achievement badges and verification links
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {badges.map((badge, index) => (
          <div key={badge.id} className="space-y-4 p-4 border rounded-lg bg-slate-50 dark:bg-slate-900">
            <div className="flex justify-between items-start">
              <h3 className="text-lg font-semibold">Badge {index + 1}</h3>
              <button
                onClick={() => deleteBadge(index)}
                className="text-red-600 hover:text-red-700 transition-colors"
              >
                <Trash2 className="h-5 w-5" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Name */}
              <div>
                <label className="block text-sm font-medium mb-1">Badge Name</label>
                <input
                  type="text"
                  value={badge.name}
                  onChange={(e) => updateBadge(index, 'name', e.target.value)}
                  className="w-full px-3 py-2 border rounded-md dark:bg-slate-800 dark:border-slate-700"
                />
              </div>

              {/* Category */}
              <div>
                <label className="block text-sm font-medium mb-1">Category</label>
                <input
                  type="text"
                  value={badge.category}
                  onChange={(e) => updateBadge(index, 'category', e.target.value)}
                  className="w-full px-3 py-2 border rounded-md dark:bg-slate-800 dark:border-slate-700"
                />
              </div>
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium mb-1">Description</label>
              <textarea
                value={badge.description}
                onChange={(e) => updateBadge(index, 'description', e.target.value)}
                rows={2}
                className="w-full px-3 py-2 border rounded-md dark:bg-slate-800 dark:border-slate-700"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Year */}
              <div>
                <label className="block text-sm font-medium mb-1">Year</label>
                <input
                  type="number"
                  value={badge.year}
                  onChange={(e) => updateBadge(index, 'year', parseInt(e.target.value))}
                  className="w-full px-3 py-2 border rounded-md dark:bg-slate-800 dark:border-slate-700"
                />
              </div>

              {/* Color */}
              <div>
                <label className="block text-sm font-medium mb-1">Color Gradient</label>
                <select
                  value={badge.color}
                  onChange={(e) => updateBadge(index, 'color', e.target.value)}
                  className="w-full px-3 py-2 border rounded-md dark:bg-slate-800 dark:border-slate-700"
                >
                  <option value="from-cyan-500 to-blue-500">Cyan to Blue</option>
                  <option value="from-purple-500 to-pink-500">Purple to Pink</option>
                  <option value="from-red-500 to-orange-500">Red to Orange</option>
                  <option value="from-green-500 to-teal-500">Green to Teal</option>
                  <option value="from-yellow-500 to-amber-500">Yellow to Amber</option>
                </select>
              </div>
            </div>

            {/* Verification Link */}
            <div>
              <label className="block text-sm font-medium mb-1">Verification Link (URL)</label>
              <input
                type="url"
                value={badge.verificationUrl || ''}
                onChange={(e) => updateBadge(index, 'verificationUrl', e.target.value)}
                placeholder="https://verify.badge.com/..."
                className="w-full px-3 py-2 border rounded-md dark:bg-slate-800 dark:border-slate-700"
              />
              <p className="text-xs text-gray-500 mt-1">
                Users can click the badge to verify it at this URL
              </p>
            </div>

            {/* Badge Image */}
            <div className="space-y-2">
              <label className="block text-sm font-medium">Badge Image</label>
              <div className="flex items-start gap-4">
                <div className="w-24 h-24 relative rounded-lg overflow-hidden bg-gray-200 dark:bg-gray-700 flex-shrink-0">
                  {imageErrors[index] ? (
                    <div className="w-full h-full flex items-center justify-center text-gray-400 text-xs">
                      Image error
                    </div>
                  ) : (
                    <img
                      src={badge.badgeImage || '/placeholder.svg?height=100&width=100&text=Badge'}
                      alt={badge.name}
                      className="w-full h-full object-cover"
                      onError={() => handleImageError(index)}
                    />
                  )}
                </div>
                <div className="flex-1">
                  <FileUpload
                    onUploadComplete={(url, filename, path) => handleImageUpload(url, filename, path, index)}
                    folder="badges"
                    accept="image/*"
                    buttonText="Upload Badge Image"
                  />
                  <p className="text-xs text-gray-500 mt-2">
                    Recommended: Square image (200x200px)
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}

        <button
          onClick={addBadge}
          className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors flex items-center gap-2"
        >
          <Plus className="h-4 w-4" />
          Add Badge
        </button>
      </CardContent>
    </Card>
  )
}
