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
  autoScroll?: boolean
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
  hidden: { opacity: 0, y: 20, scale: 0.8 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: 'spring',
      stiffness: 100,
      damping: 15,
    },
  },
  hover: {
    scale: 1.15,
    y: -10,
    transition: {
      type: 'spring',
      stiffness: 200,
      damping: 10,
    },
  },
  tap: {
    scale: 0.95,
  },
}

const glowVariants = {
  initial: { opacity: 0, scale: 0.8 },
  animate: {
    opacity: [0, 1, 0],
    scale: [0.8, 1.2, 1.4],
    transition: {
      duration: 2,
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
  autoScroll = true,
}) => {
  const containerClass = {
    2: 'grid-cols-2',
    3: 'grid-cols-3',
    4: 'grid-cols-4',
    5: 'grid-cols-5',
    6: 'grid-cols-6',
  }[Math.min(columns, 6)] || 'grid-cols-4'

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
          {title}
        </motion.h2>
        {subtitle && (
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
            className="text-slate-300 text-lg"
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
        className={`grid ${containerClass} gap-6 md:gap-8`}
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
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 p-4">
                {/* Icon container with pulse effect */}
                <motion.div
                  className="text-4xl md:text-5xl"
                  whileHover={{
                    rotate: [0, -5, 5, -5, 5, 0],
                    transition: { duration: 0.5 },
                  }}
                >
                  {logo.icon}
                </motion.div>

                {/* Logo name with fade-in on hover */}
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  whileHover={{ opacity: 1, y: 0 }}
                  className="text-xs md:text-sm font-semibold text-cyan-300 text-center truncate max-w-full"
                >
                  {logo.name}
                </motion.p>
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
