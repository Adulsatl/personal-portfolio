"use client"

import { motion } from "framer-motion"
import { Briefcase, Calendar, MapPin } from "lucide-react"

interface TimelineEvent {
  id: string
  title: string
  company: string
  location: string
  period: string
  description: string
  achievements?: string[]
}

interface ExperienceTimelineProps {
  experiences?: TimelineEvent[]
}

const defaultExperiences: TimelineEvent[] = [
  {
    id: "1",
    title: "Senior IT Administrator",
    company: "Tech Solutions Inc.",
    location: "Dubai, UAE",
    period: "2022 - Present",
    description: "Managing enterprise infrastructure with focus on security and automation",
    achievements: [
      "Reduced system downtime by 60%",
      "Implemented automated backup solutions",
      "Led security audit and compliance initiatives",
    ],
  },
  {
    id: "2",
    title: "IT Systems Administrator",
    company: "Global Networks Ltd.",
    location: "Abu Dhabi, UAE",
    period: "2020 - 2022",
    description: "Administered 500+ user network infrastructure",
    achievements: [
      "Migrated legacy systems to cloud",
      "Implemented Active Directory optimization",
      "Managed IT support team of 8 people",
    ],
  },
  {
    id: "3",
    title: "IT Support Specialist",
    company: "Digital Services Corp",
    location: "Dubai, UAE",
    period: "2018 - 2020",
    description: "Provided technical support and user management",
    achievements: [
      "Achieved 95% ticket resolution rate",
      "Developed knowledge base documentation",
      "Trained new IT support staff",
    ],
  },
]

export default function ExperienceTimeline({ experiences = defaultExperiences }: ExperienceTimelineProps) {
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
    hidden: { opacity: 0, x: -30 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 20,
      },
    },
  }

  return (
    <section className="py-20 px-4 md:px-6 bg-gradient-to-b from-blue-950 to-slate-950">
      <div className="max-w-4xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-cyan-400 bg-clip-text text-transparent">
              Experience Timeline
            </span>
          </h2>
          <p className="text-slate-300 text-lg max-w-2xl mx-auto">
            My professional journey in IT infrastructure and systems administration
          </p>
        </motion.div>

        {/* Timeline */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="relative"
        >
          {/* Circuit board timeline line */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-cyan-500/50 via-blue-500/50 to-cyan-500/50">
            {/* Decorative circuit nodes */}
            {experiences.map((_, index) => (
              <div
                key={`node-${index}`}
                className="absolute left-1/2 transform -translate-x-1/2 w-3 h-3 rounded-full bg-cyan-400 border-2 border-slate-950"
                style={{
                  top: `${(index / (experiences.length - 1)) * 100}%`,
                }}
              />
            ))}
          </div>

          {/* Timeline events */}
          <div className="space-y-12">
            {experiences.map((event, index) => (
              <motion.div key={event.id} variants={itemVariants} className={`flex ${index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"}`}>
                {/* Content side */}
                <div className="ml-16 md:ml-0 md:w-1/2 md:px-8">
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-slate-700/50 hover:border-cyan-500/50 rounded-xl p-6 transition-all duration-300 backdrop-blur-sm"
                  >
                    {/* Header */}
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <h3 className="text-2xl font-bold text-white mb-1">{event.title}</h3>
                        <p className="text-cyan-400 font-medium">{event.company}</p>
                      </div>
                      <div className="ml-4 flex-shrink-0">
                        <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center">
                          <Briefcase className="w-6 h-6 text-white" />
                        </div>
                      </div>
                    </div>

                    {/* Meta information */}
                    <div className="space-y-2 mb-4 text-sm text-slate-400">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-cyan-400" />
                        {event.period}
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-cyan-400" />
                        {event.location}
                      </div>
                    </div>

                    {/* Description */}
                    <p className="text-slate-300 mb-4">{event.description}</p>

                    {/* Achievements */}
                    {event.achievements && event.achievements.length > 0 && (
                      <div className="mt-4 pt-4 border-t border-slate-700">
                        <p className="text-xs uppercase tracking-widest text-cyan-400 font-semibold mb-3">Key Achievements</p>
                        <ul className="space-y-2">
                          {event.achievements.map((achievement, idx) => (
                            <li key={idx} className="text-sm text-slate-300 flex items-start">
                              <span className="text-cyan-400 mr-3 flex-shrink-0">▸</span>
                              {achievement}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Circuit board pattern */}
                    <div className="absolute top-0 right-0 w-16 h-16 opacity-5 pointer-events-none">
                      <svg viewBox="0 0 100 100" className="w-full h-full">
                        <circle cx="10" cy="10" r="2" fill="currentColor" />
                        <line x1="10" y1="10" x2="50" y2="10" stroke="currentColor" strokeWidth="0.5" />
                        <circle cx="50" cy="10" r="2" fill="currentColor" />
                        <line x1="50" y1="10" x2="50" y2="50" stroke="currentColor" strokeWidth="0.5" />
                        <circle cx="50" cy="50" r="2" fill="currentColor" />
                      </svg>
                    </div>
                  </motion.div>
                </div>

                {/* Empty space for alignment */}
                <div className="hidden md:block md:w-1/2" />
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Bottom accent */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <p className="text-slate-400 text-sm">
            Continuous growth through diverse IT roles and challenging projects
          </p>
        </motion.div>
      </div>
    </section>
  )
}
