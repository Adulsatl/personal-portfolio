"use client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function ContactTab({ portfolioData, setPortfolioData }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Contact Information</CardTitle>
        <CardDescription>Manage your contact details</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="contact-email" className="block text-sm font-medium">
                Email
              </label>
              <input
                id="contact-email"
                value={portfolioData.contact?.email || ""}
                onChange={(e) =>
                  setPortfolioData({
                    ...portfolioData,
                    contact: {
                      ...(portfolioData.contact || {}),
                      email: e.target.value,
                    },
                  })
                }
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="contact-phone" className="block text-sm font-medium">
                Phone
              </label>
              <input
                id="contact-phone"
                value={portfolioData.contact?.phone || ""}
                onChange={(e) =>
                  setPortfolioData({
                    ...portfolioData,
                    contact: {
                      ...(portfolioData.contact || {}),
                      phone: e.target.value,
                    },
                  })
                }
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="contact-location" className="block text-sm font-medium">
                Location
              </label>
              <input
                id="contact-location"
                value={portfolioData.contact?.location || ""}
                onChange={(e) =>
                  setPortfolioData({
                    ...portfolioData,
                    contact: {
                      ...(portfolioData.contact || {}),
                      location: e.target.value,
                    },
                  })
                }
                placeholder="City, Country"
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700"
              />
            </div>
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <label className="block text-sm font-medium">Email Notification Settings</label>
              <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-md">
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                  Contact form submissions will be sent to your email address. Make sure your email settings are
                  configured correctly in the environment variables.
                </p>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="email-notifications"
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      checked={true}
                      disabled
                    />
                    <label
                      htmlFor="email-notifications"
                      className="ml-2 block text-sm text-gray-700 dark:text-gray-300"
                    >
                      Receive email notifications
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="store-enquiries"
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      checked={true}
                      disabled
                    />
                    <label htmlFor="store-enquiries" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                      Store enquiries in admin dashboard
                    </label>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium">Contact Form Message</label>
              <textarea
                value={portfolioData.contact?.formMessage || ""}
                onChange={(e) =>
                  setPortfolioData({
                    ...portfolioData,
                    contact: {
                      ...(portfolioData.contact || {}),
                      formMessage: e.target.value,
                    },
                  })
                }
                placeholder="Optional message to display above the contact form"
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700"
              />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
