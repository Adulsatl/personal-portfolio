"use client"

import { motion } from "framer-motion"
import { AlertTriangle, Server, Clock, ArrowRight } from "lucide-react"

export default function MaintenanceMode() {
  const handleRefresh = () => {
    window.location.reload()
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 flex flex-col items-center justify-center p-4">
      <div className="max-w-2xl w-full bg-white/90 dark:bg-gray-800/90 backdrop-blur-md rounded-xl shadow-xl overflow-hidden">
        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 p-6 text-white">
          <div className="flex items-center gap-3">
            <Server className="h-8 w-8" />
            <h1 className="text-2xl font-bold">System Maintenance</h1>
          </div>
        </div>

        <div className="p-8">
          <div className="flex flex-col md:flex-row items-center gap-6 mb-8">
            <motion.div
              className="w-24 h-24 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center flex-shrink-0"
              animate={{
                scale: [1, 1.05, 1],
                boxShadow: [
                  "0 0 0 rgba(37, 99, 235, 0.4)",
                  "0 0 20px rgba(37, 99, 235, 0.6)",
                  "0 0 0 rgba(37, 99, 235, 0.4)",
                ],
              }}
              transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
            >
              <AlertTriangle className="h-12 w-12 text-blue-600 dark:text-blue-400" />
            </motion.div>

            <div>
              <h2 className="text-xl font-semibold mb-2 text-gray-900 dark:text-gray-100">
                We&apos;re currently updating our systems
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                Our website is temporarily unavailable while we make improvements to enhance your experience. We
                apologize for any inconvenience and appreciate your patience.
              </p>
            </div>
          </div>

          <div className="bg-gray-50 dark:bg-gray-900/50 rounded-lg p-4 mb-6">
            <div className="flex items-center gap-3 mb-2">
              <Clock className="h-5 w-5 text-blue-600 dark:text-blue-400" />
              <h3 className="font-medium text-gray-900 dark:text-gray-100">Expected Downtime</h3>
            </div>
            <p className="text-gray-600 dark:text-gray-400 ml-8">
              We expect to be back online shortly. Thank you for your understanding.
            </p>
          </div>

          <motion.div
            className="text-center"
            animate={{ y: [0, 5, 0] }}
            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
          >
            <button
              onClick={handleRefresh}
              className="inline-flex items-center text-blue-600 dark:text-blue-400 font-medium hover:underline bg-transparent border-none cursor-pointer p-0"
            >
              Refresh the page <ArrowRight className="ml-2 h-4 w-4" />
            </button>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
