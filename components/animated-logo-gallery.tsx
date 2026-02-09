'use client'

import { motion } from 'framer-motion'
import React from 'react'

interface Logo {
  id: string
  name: string
  icon: React.ReactNode
  color?: string
  category?: string
}

interface AnimatedLogoGalleryProps {
  logos: Logo[]
  title: string
  subtitle?: string
  columns?: number
  mobileColumns?: number
  tabletColumns?: number
  autoScroll?: boolean
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.15,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.85 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: 'spring',
      stiffness: 80,
      damping: 20,
      mass: 1,
    },
  },
  hover: {
    scale: 1.12,
    y: -12,
    transition: {
      type: 'spring',
      stiffness: 150,
      damping: 15,
      mass: 0.8,
    },
  },
  tap: {
    scale: 0.92,
  },
}

const glowVariants = {
  initial: { opacity: 0, scale: 0.8 },
  animate: {
    opacity: [0, 0.8, 0.6, 0],
    scale: [0.8, 1.3, 1.6, 1.8],
    transition: {
      duration: 3,
      repeat: Number.POSITIVE_INFINITY,
      ease: 'easeOut',
    },
  },
}

export const AnimatedLogoGallery: React.FC<AnimatedLogoGalleryProps> = ({
  logos,
  title,
  subtitle,
  columns = 4,
  mobileColumns = 2,
  tabletColumns = 3,
  autoScroll = true,
}) => {
  const getGridClass = (cols: number) => {
    const mapping: Record<number, string> = {
      2: 'grid-cols-2',
      3: 'grid-cols-3',
      4: 'grid-cols-4',
      5: 'grid-cols-5',
      6: 'grid-cols-6',
    }
    return mapping[Math.min(cols, 6)] || 'grid-cols-4'
  }

  const containerClass = `${getGridClass(mobileColumns)} md:${getGridClass(tabletColumns)} lg:${getGridClass(columns)}`

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
          className="text-2xl sm:text-3xl md:text-4xl font-bold bg-gradient-to-r from-cyan-400 via-blue-500 to-cyan-400 bg-clip-text text-transparent mb-2"
        >
          {title}
        </motion.h2>
        {subtitle && (
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
            className="text-sm sm:text-base md:text-lg text-slate-300"
          >
            {subtitle}
          </motion.p>
        )}
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className={`grid ${containerClass} gap-4 sm:gap-5 md:gap-6 lg:gap-8`}
      >
        {logos.map((logo) => (
          <motion.div
            key={logo.id}
            variants={itemVariants}
            whileHover="hover"
            whileTap="tap"
            className="relative group"
          >
            {/* Animated glow background */}
            <motion.div
              variants={glowVariants}
              initial="initial"
              animate="animate"
              className={`absolute inset-0 rounded-xl blur-xl opacity-0 ${logo.color || 'bg-cyan-500'}`}
              style={{ background: logo.color || 'rgba(34, 211, 238, 0.3)' }}
            />

            {/* Card container */}
            <div className="relative h-24 md:h-28 rounded-xl border border-slate-700/50 bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-xl overflow-hidden group-hover:border-cyan-400/50 transition-colors duration-300">
              {/* Grid pattern background */}
              <div className="absolute inset-0 opacity-5 group-hover:opacity-10 transition-opacity">
                <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                  <defs>
                    <pattern id={`grid-${logo.id}`} width="20" height="20" patternUnits="userSpaceOnUse">
                      <path d="M 20 0 L 0 0 0 20" fill="none" stroke="currentColor" strokeWidth="0.5" />
                    </pattern>
                  </defs>
                  <rect width="100%" height="100%" fill={`url(#grid-${logo.id})`} />
                </svg>
              </div>

              {/* Content */}
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 p-4">
                {/* Icon container with smooth rotation and glow */}
                <motion.div
                  className="text-5xl md:text-6xl filter drop-shadow-lg"
                  whileHover={{
                    rotate: [0, -8, 8, -6, 6, 0],
                    scale: [1, 1.15, 1.15, 1.15, 1.15, 1],
                    filter: [
                      "drop-shadow(0 0 8px rgba(34, 211, 238, 0.5))",
                      "drop-shadow(0 0 20px rgba(34, 211, 238, 0.8))",
                      "drop-shadow(0 0 30px rgba(34, 211, 238, 0.6))",
                    ],
                    transition: { duration: 0.6, ease: 'easeInOut' },
                  }}
                  transition={{ duration: 0.3, ease: 'easeOut' }}
                >
                  {logo.icon}
                </motion.div>

                {/* Logo name - Always visible with smooth transitions */}
                <motion.div className="text-center w-full">
                  <p className="text-sm md:text-base font-bold text-cyan-300 text-center leading-tight whitespace-normal">
                    {logo.name}
                  </p>
                  {logo.category && (
                    <motion.p
                      initial={{ opacity: 0, y: 5 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: 0.1 }}
                      className="text-xs text-slate-400 mt-1 capitalize"
                    >
                      {logo.category}
                    </motion.p>
                  )}
                </motion.div>
              </div>

              {/* Top accent line animation */}
              <motion.div
                className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-cyan-400 to-transparent"
                initial={{ scaleX: 0, opacity: 0 }}
                whileHover={{ scaleX: 1, opacity: 1 }}
                transition={{ duration: 0.3 }}
              />
            </div>

            {/* Label below on mobile/tablet */}
            <motion.p className="text-center text-xs text-slate-400 mt-2 group-hover:text-cyan-300 transition-colors md:hidden">
              {logo.name}
            </motion.p>
          </motion.div>
        ))}
      </motion.div>

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

export default AnimatedLogoGallery
