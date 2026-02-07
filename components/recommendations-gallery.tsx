'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Star, ChevronLeft, ChevronRight } from 'lucide-react'

interface Recommendation {
  id: string
  name: string
  role: string
  company: string
  content: string
  rating: number
  image?: string
  date: string
}

interface RecommendationsGalleryProps {
  recommendations?: Recommendation[]
}

const defaultRecommendations: Recommendation[] = [
  {
    id: '1',
    name: 'Mohammed Al-Mansouri',
    role: 'IT Director',
    company: 'Dubai Tech Solutions',
    content:
      'Exceptional IT administrator with outstanding expertise in infrastructure management. Highly professional and reliable.',
    rating: 5,
    date: '2024',
  },
  {
    id: '2',
    name: 'Sarah Johnson',
    role: 'Infrastructure Manager',
    company: 'Emirates Enterprise',
    content:
      'Outstanding problem-solving skills and deep technical knowledge. Always ready to support team and exceed expectations.',
    rating: 5,
    date: '2024',
  },
  {
    id: '3',
    name: 'Ahmed Al-Zaabi',
    role: 'CTO',
    company: 'Digital Arabia Inc',
    content:
      'Demonstrates excellent system administration capabilities. Proactive in security and performance optimization.',
    rating: 5,
    date: '2023',
  },
]

export const RecommendationsGallery: React.FC<RecommendationsGalleryProps> = ({
  recommendations = defaultRecommendations,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0)

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % recommendations.length)
  }

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + recommendations.length) % recommendations.length)
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, x: 50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 15,
      },
    },
    exit: {
      opacity: 0,
      x: -50,
      transition: { duration: 0.3 },
    },
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className="w-full"
    >
      <div className="mb-12">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-cyan-400 via-blue-500 to-cyan-400 bg-clip-text text-transparent mb-2"
        >
          Professional Recommendations
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          viewport={{ once: true }}
          className="text-slate-300 text-lg"
        >
          Trusted by industry professionals across the UAE
        </motion.p>
      </div>

      {/* Main carousel */}
      <div className="relative h-auto">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            variants={itemVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="w-full"
          >
            <div className="rounded-2xl border border-slate-700/50 bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-xl p-8 md:p-10 min-h-72 flex flex-col justify-between relative overflow-hidden">
              {/* Background accent */}
              <div className="absolute top-0 right-0 w-40 h-40 bg-cyan-500/10 rounded-full blur-3xl -z-10" />
              <div className="absolute bottom-0 left-0 w-40 h-40 bg-blue-500/10 rounded-full blur-3xl -z-10" />

              {/* Stars rating */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="flex gap-1 mb-4"
              >
                {[...Array(recommendations[currentIndex].rating)].map((_, i) => (
                  <motion.div
                    key={i}
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ delay: 0.1 + i * 0.1 }}
                  >
                    <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  </motion.div>
                ))}
              </motion.div>

              {/* Recommendation content */}
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-slate-200 text-lg md:text-xl leading-relaxed mb-8 flex-grow"
              >
                "{recommendations[currentIndex].content}"
              </motion.p>

              {/* Author info */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="border-t border-slate-700/50 pt-6"
              >
                <p className="font-semibold text-cyan-300 text-lg">
                  {recommendations[currentIndex].name}
                </p>
                <p className="text-slate-400 text-sm">
                  {recommendations[currentIndex].role} at{' '}
                  <span className="text-cyan-400">{recommendations[currentIndex].company}</span>
                </p>
                <p className="text-slate-500 text-xs mt-1">{recommendations[currentIndex].date}</p>
              </motion.div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Navigation controls */}
        <div className="flex items-center justify-between mt-8">
          {/* Progress indicators */}
          <motion.div
            className="flex gap-2"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {recommendations.map((_, index) => (
              <motion.button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  index === currentIndex
                    ? 'bg-gradient-to-r from-cyan-400 to-blue-500 w-8'
                    : 'bg-slate-700 w-2 hover:bg-slate-600'
                }`}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.95 }}
              />
            ))}
          </motion.div>

          {/* Navigation buttons */}
          <div className="flex gap-3">
            <motion.button
              onClick={prevSlide}
              whileHover={{ scale: 1.1, backgroundColor: 'rgba(34, 211, 238, 0.2)' }}
              whileTap={{ scale: 0.95 }}
              className="p-3 rounded-lg border border-slate-700 hover:border-cyan-400 transition-colors duration-300"
            >
              <ChevronLeft className="w-5 h-5 text-cyan-400" />
            </motion.button>
            <motion.button
              onClick={nextSlide}
              whileHover={{ scale: 1.1, backgroundColor: 'rgba(34, 211, 238, 0.2)' }}
              whileTap={{ scale: 0.95 }}
              className="p-3 rounded-lg border border-slate-700 hover:border-cyan-400 transition-colors duration-300"
            >
              <ChevronRight className="w-5 h-5 text-cyan-400" />
            </motion.button>
          </div>
        </div>

        {/* Auto-rotate info */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center text-slate-400 text-sm mt-4"
        >
          {currentIndex + 1} of {recommendations.length}
        </motion.p>
      </div>

      {/* Decorative bottom accent */}
      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        viewport={{ once: true }}
        className="h-1 bg-gradient-to-r from-transparent via-cyan-500 to-transparent mt-12 rounded-full"
      />
    </motion.div>
  )
}

export default RecommendationsGallery
