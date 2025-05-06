"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Mail, Calendar, Search, Trash2, AlertCircle } from "lucide-react"
import { deleteEnquiry } from "@/lib/portfolio-service"
import { motion, AnimatePresence } from "framer-motion"

export default function EnquiriesTab({ enquiries = [], onEnquiriesChange }) {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedEnquiry, setSelectedEnquiry] = useState(null)
  const [isDeleting, setIsDeleting] = useState(false)
  const [deleteStatus, setDeleteStatus] = useState(null)

  // Filter enquiries based on search term
  const filteredEnquiries = enquiries.filter(
    (enquiry) =>
      enquiry.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      enquiry.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      enquiry.message?.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  // Format date
  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString() + " " + date.toLocaleTimeString()
  }

  // Handle enquiry deletion
  const handleDeleteEnquiry = async (id) => {
    if (!confirm("Are you sure you want to delete this enquiry?")) {
      return
    }

    setIsDeleting(true)
    setDeleteStatus(null)

    try {
      const success = await deleteEnquiry(id)

      if (success) {
        // Remove the enquiry from the local state
        if (onEnquiriesChange) {
          onEnquiriesChange(enquiries.filter((e) => e.id !== id))
        }

        // If the deleted enquiry was selected, clear the selection
        if (selectedEnquiry?.id === id) {
          setSelectedEnquiry(null)
        }

        setDeleteStatus({ type: "success", message: "Enquiry deleted successfully" })
      } else {
        setDeleteStatus({ type: "error", message: "Failed to delete enquiry" })
      }
    } catch (error) {
      console.error("Error deleting enquiry:", error)
      setDeleteStatus({ type: "error", message: "An error occurred while deleting the enquiry" })
    } finally {
      setIsDeleting(false)

      // Clear status after 3 seconds
      setTimeout(() => setDeleteStatus(null), 3000)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Enquiries</CardTitle>
        <CardDescription>View and manage contact form submissions</CardDescription>
      </CardHeader>
      <CardContent>
        <AnimatePresence>
          {deleteStatus && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className={`mb-4 p-3 rounded-md flex items-center ${
                deleteStatus.type === "success"
                  ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300"
                  : "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300"
              }`}
            >
              {deleteStatus.type === "success" ? (
                <span className="flex items-center">
                  <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  {deleteStatus.message}
                </span>
              ) : (
                <span className="flex items-center">
                  <AlertCircle className="w-5 h-5 mr-2" />
                  {deleteStatus.message}
                </span>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500 dark:text-gray-400" />
          <input
            type="text"
            placeholder="Search enquiries..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700"
          />
        </div>

        {enquiries.length === 0 ? (
          <div className="text-center py-8 text-gray-500 dark:text-gray-400">No enquiries yet.</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="md:col-span-1 border-r border-gray-200 dark:border-gray-700 pr-4">
              <h3 className="font-medium mb-2">Enquiries ({filteredEnquiries.length})</h3>
              <div className="space-y-2 max-h-[500px] overflow-y-auto">
                {filteredEnquiries.map((enquiry) => (
                  <div
                    key={enquiry.id}
                    className={`p-3 rounded-md cursor-pointer transition-colors ${
                      selectedEnquiry?.id === enquiry.id
                        ? "bg-blue-100 dark:bg-blue-900/30"
                        : "hover:bg-gray-100 dark:hover:bg-gray-800"
                    }`}
                    onClick={() => setSelectedEnquiry(enquiry)}
                  >
                    <div className="font-medium">{enquiry.name}</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400 truncate">{enquiry.email}</div>
                    <div className="text-xs text-gray-500 dark:text-gray-500 flex items-center gap-1 mt-1">
                      <Calendar className="h-3 w-3" />
                      {formatDate(enquiry.date)}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="md:col-span-2">
              {selectedEnquiry ? (
                <div>
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h2 className="text-xl font-medium">{selectedEnquiry.name}</h2>
                      <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                        <Mail className="h-4 w-4" />
                        <a href={`mailto:${selectedEnquiry.email}`} className="hover:underline">
                          {selectedEnquiry.email}
                        </a>
                      </div>
                      <div className="text-sm text-gray-500 dark:text-gray-500 mt-1">
                        {formatDate(selectedEnquiry.date)}
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button
                        className="px-3 py-1 text-sm border border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700"
                        onClick={() =>
                          window.open(
                            `mailto:${selectedEnquiry.email}?subject=Re: Your Enquiry&body=Dear ${selectedEnquiry.name},%0D%0A%0D%0AThank you for your message.%0D%0A%0D%0A`,
                          )
                        }
                      >
                        Reply
                      </button>
                      <button
                        className="px-3 py-1 text-sm border border-red-300 dark:border-red-700 text-red-600 dark:text-red-400 rounded-md hover:bg-red-50 dark:hover:bg-red-900/20 flex items-center gap-1"
                        onClick={() => handleDeleteEnquiry(selectedEnquiry.id)}
                        disabled={isDeleting}
                      >
                        <Trash2 className="h-4 w-4" />
                        {isDeleting ? "Deleting..." : "Delete"}
                      </button>
                    </div>
                  </div>

                  <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-md whitespace-pre-wrap">
                    {selectedEnquiry.message}
                  </div>
                </div>
              ) : (
                <div className="flex items-center justify-center h-full text-gray-500 dark:text-gray-400 py-16">
                  Select an enquiry to view details
                </div>
              )}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
