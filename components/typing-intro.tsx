"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"

interface TypingIntroProps {
  title?: string
  subtitle?: string
  lines?: string[]
}

export default function TypingIntro({
  title = "Hi, I'm an IT Administrator",
  subtitle = "Infrastructure | Security | Automation",
  lines = [
    "I design and maintain secure IT infrastructure",
    "I troubleshoot complex system issues",
    "I automate operational tasks for efficiency",
  ],
}: TypingIntroProps) {
  const [displayedLines, setDisplayedLines] = useState<string[]>([])
  const [currentLineIndex, setCurrentLineIndex] = useState(0)
  const [currentCharIndex, setCurrentCharIndex] = useState(0)

  useEffect(() => {
    if (currentLineIndex >= lines.length) return

    const currentLine = lines[currentLineIndex]
    if (currentCharIndex >= currentLine.length) {
      // Line complete, move to next line after 500ms
      const timeout = setTimeout(() => {
        setCurrentLineIndex((prev) => prev + 1)
        setCurrentCharIndex(0)
      }, 500)
      return () => clearTimeout(timeout)
    }

    // Add character to current line
    const timeout = setTimeout(() => {
      setDisplayedLines((prev) => {
        const updated = [...prev]
        if (updated[currentLineIndex]) {
          updated[currentLineIndex] += currentLine[currentCharIndex]
        } else {
          updated[currentLineIndex] = currentLine[currentCharIndex]
        }
        return updated
      })
      setCurrentCharIndex((prev) => prev + 1)
    }, 50)

    return () => clearTimeout(timeout)
  }, [currentCharIndex, currentLineIndex, lines])

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-12 bg-gradient-to-b from-slate-950 via-blue-950 to-slate-950">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-3xl w-full text-center"
      >
        {/* Main Title */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-cyan-400 via-blue-500 to-cyan-400 bg-clip-text text-transparent">
          {title}
        </h1>

        {/* Subtitle */}
        <p className="text-lg sm:text-xl text-cyan-300 mb-12 font-medium tracking-wide">
          {subtitle}
        </p>

        {/* Typing Lines */}
        <div className="space-y-4 mb-12 min-h-40 flex flex-col justify-center">
          {displayedLines.map((line, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
              className="text-base sm:text-lg text-slate-300 flex items-center"
            >
              <span className="text-cyan-400 mr-3">▶</span>
              {line}
              {index === currentLineIndex && currentCharIndex < lines[index].length && (
                <motion.span
                  animate={{ opacity: [0, 1] }}
                  transition={{ duration: 0.6, repeat: Number.POSITIVE_INFINITY }}
                  className="ml-1 text-cyan-400 text-xl"
                >
                  ▌
                </motion.span>
              )}
            </motion.div>
          ))}
        </div>

        {/* Scroll indicator */}
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
          className="mt-12"
        >
          <p className="text-cyan-400 text-sm mb-2">Scroll to explore</p>
          <div className="flex justify-center">
            <svg className="w-6 h-6 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </div>
        </motion.div>
      </motion.div>
    </div>
  )
}
