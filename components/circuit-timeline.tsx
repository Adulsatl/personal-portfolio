'use client'

import { motion } from 'framer-motion'
import { Building2, Zap, MapPin, Calendar } from 'lucide-react'

interface TimelineExperience {
  id: string
  title: string
  company: string
  location?: string
  startDate: string
  endDate?: string
  description?: string
  achievements?: string[]
  isCurrent?: boolean
}

interface CircuitTimelineProps {
  experiences?: TimelineExperience[]
}

export default function CircuitTimeline({ experiences = [] }: CircuitTimelineProps) {
  const displayedExperiences = experiences.length > 0 ? experiences : []

  if (!displayedExperiences.length) {
    return null
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 20,
      },
    },
  }

  return (
    <section className="py-20 px-4 md:px-6 bg-gradient-to-b from-blue-950/50 to-slate-950 border-t border-cyan-500/10">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <Zap className="w-8 h-8 text-cyan-400" />
            <h2 className="text-4xl sm:text-5xl font-bold">
              <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                Experience Timeline
              </span>
            </h2>
          </div>
          <p className="text-slate-400 text-lg">Professional journey as a circuit board trace</p>
        </motion.div>

        {/* Timeline */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="relative"
        >
          {/* Vertical circuit line */}
          <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-1 md:w-0.5 bg-gradient-to-b from-cyan-400/30 via-cyan-400/50 to-cyan-400/30 md:-translate-x-1/2" />

          {/* Timeline items */}
          <div className="space-y-12">
            {displayedExperiences.map((exp, idx) => (
              <motion.div key={exp.id || idx} variants={itemVariants} className="relative">
                {/* Grid for alternating layout */}
                <div className="grid md:grid-cols-2 gap-6 md:gap-0">
                  {/* Content */}
                  <div className={`md:pr-8 ${idx % 2 === 0 ? 'md:text-right' : 'md:col-start-2 md:pl-8'}`}>
                    <motion.div
                      whileHover={{ y: -4 }}
                      className="relative p-6 rounded-lg bg-gradient-to-br from-cyan-500/10 to-blue-500/10 border border-cyan-500/30 backdrop-blur-sm overflow-hidden group"
                    >
                      {/* Background glow */}
                      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity">
                        <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/10 via-transparent to-blue-400/10" />
                      </div>

                      <div className="relative z-10">
                        {/* Current badge */}
                        {exp.isCurrent && (
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="inline-block mb-3 px-3 py-1 bg-cyan-500/30 border border-cyan-400 rounded-full text-xs font-bold text-cyan-300"
                          >
                            CURRENT
                          </motion.div>
                        )}

                        {/* Position and company */}
                        <h3 className="text-2xl font-bold text-white mb-2">{exp.title}</h3>

                        <div className="flex flex-col gap-2 mb-4">
                          <div className="flex items-center gap-2 text-cyan-300">
                            <Building2 className="w-4 h-4" />
                            <span className="font-semibold">{exp.company}</span>
                          </div>

                          {exp.location && (
                            <div className="flex items-center gap-2 text-slate-400 text-sm">
                              <MapPin className="w-4 h-4" />
                              <span>{exp.location}</span>
                            </div>
                          )}

                          <div className="flex items-center gap-2 text-slate-400 text-sm">
                            <Calendar className="w-4 h-4" />
                            <span>
                              {exp.startDate} - {exp.endDate || 'Present'}
                            </span>
                          </div>
                        </div>

                        {/* Description */}
                        {exp.description && <p className="text-slate-300 mb-4">{exp.description}</p>}

                        {/* Achievements */}
                        {exp.achievements && exp.achievements.length > 0 && (
                          <ul className="space-y-2">
                            {exp.achievements.map((achievement, idx) => (
                              <li key={idx} className="flex gap-2 text-sm text-slate-300">
                                <span className="text-cyan-400">→</span>
                                <span>{achievement}</span>
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    </motion.div>
                  </div>
                </div>

                {/* Circuit node */}
                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  className="absolute left-0 top-8 md:left-1/2 w-4 h-4 -translate-x-1.5 md:-translate-x-1/2 bg-cyan-400 rounded-full border-4 border-slate-950 shadow-lg shadow-cyan-400/50"
                />

                {/* Connection pulse */}
                <motion.div
                  animate={{ scale: [1, 1.5, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="absolute left-0 top-8 md:left-1/2 w-4 h-4 -translate-x-1.5 md:-translate-x-1/2 bg-cyan-400 rounded-full opacity-30"
                />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
