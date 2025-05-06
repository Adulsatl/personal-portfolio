"use client"

import { useState } from "react"
import { motion } from "framer-motion"

export default function ContactForm() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [message, setMessage] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<null | "success" | "error">(null)
  const [errorMessage, setErrorMessage] = useState("")

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus(null)
    setErrorMessage("")

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, message }),
      })

      // Check if response is ok before trying to parse JSON
      if (response.ok) {
        setSubmitStatus("success")
        setName("")
        setEmail("")
        setMessage("")
      } else {
        // Handle non-200 responses more gracefully
        try {
          const errorData = await response.json()
          console.error("Error submitting form:", errorData)
          setErrorMessage(errorData.error || "Failed to send message")
        } catch (jsonError) {
          // If JSON parsing fails, use the status text
          console.error("Error parsing error response:", jsonError)
          setErrorMessage(`Error: ${response.status} ${response.statusText}`)
        }
        setSubmitStatus("error")
      }
    } catch (error) {
      console.error("Network error submitting form:", error)
      setErrorMessage("Network error. Please check your connection and try again.")
      setSubmitStatus("error")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div>
      <h3 className="text-xl font-semibold mb-4 text-blue-600 dark:text-blue-400">Send a Message</h3>

      {submitStatus === "success" && (
        <motion.div
          className="mb-4 p-3 bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300 rounded-md"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
        >
          Your message has been sent successfully!
        </motion.div>
      )}

      {submitStatus === "error" && (
        <motion.div
          className="mb-4 p-3 bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300 rounded-md"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
        >
          {errorMessage || "There was an error sending your message. Please try again."}
        </motion.div>
      )}

      <form className="space-y-4" onSubmit={handleSubmit}>
        <div>
          <motion.input
            type="text"
            placeholder="Your Name"
            className="w-full px-4 py-3 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            whileFocus={{ scale: 1.01, boxShadow: "0 0 0 2px rgba(59, 130, 246, 0.3)" }}
          />
        </div>

        <div>
          <motion.input
            type="email"
            placeholder="Your Email"
            className="w-full px-4 py-3 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            whileFocus={{ scale: 1.01, boxShadow: "0 0 0 2px rgba(59, 130, 246, 0.3)" }}
          />
        </div>

        <div>
          <motion.textarea
            placeholder="Your Message"
            rows={4}
            className="w-full px-4 py-3 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 resize-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
            whileFocus={{ scale: 1.01, boxShadow: "0 0 0 2px rgba(59, 130, 246, 0.3)" }}
          ></motion.textarea>
        </div>

        <motion.button
          type="submit"
          className="w-full px-4 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-md transition-colors disabled:opacity-70 shadow-md"
          disabled={isSubmitting}
          whileHover={{ scale: 1.02, boxShadow: "0 5px 15px rgba(0, 0, 0, 0.1)" }}
          whileTap={{ scale: 0.98 }}
        >
          {isSubmitting ? "Sending..." : "Send Message"}
        </motion.button>
      </form>
    </div>
  )
}
