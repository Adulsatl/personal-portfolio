'use client'

import { motion } from 'framer-motion'
import { Award, CheckCircle2 } from 'lucide-react'

interface Badge {
  id: string
  name: string
  description: string
  icon?: string
  category?: string
  color?: string
  year?: number
}

interface BadgesShowcaseProps {
  badges?: Badge[]
}

const defaultBadges: Badge[] = [
  {
    id: 'network-expert',
    name: 'Network Master',
    description: 'Expert in network configuration and management',
    category: 'Infrastructure',
    color: 'from-blue-500 to-cyan-500',
    year: 2024,
  },
  {
    id: 'system-admin',
    name: 'System Administrator',
    description: 'Advanced Windows and Linux administration',
    category: 'Systems',
    color: 'from-purple-500 to-pink-500',
    year: 2024,
  },
  {
    id: 'security-focused',
    name: 'Security First',
    description: 'Committed to cybersecurity best practices',
    category: 'Security',
    color: 'from-red-500 to-orange-500',
    year: 2024,
  },
  {
    id: 'automation-specialist',
    name: 'Automation Specialist',
    description: 'Skilled in scripting and process automation',
    category: 'Automation',
    color: 'from-green-500 to-teal-500',
    year: 2024,
  },
]

const badgeIcons = {
  'Network Master': '🌐',
  'System Administrator': '⚙️',
  'Security First': '🔒',
  'Automation Specialist': '⚡',
}

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
}

const badgeVariant = {
  hidden: { opacity: 0, scale: 0.8, y: 20 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: 'easeOut',
    },
  },
}

export default function BadgesShowcase({ badges = defaultBadges }: BadgesShowcaseProps) {
  const displayedBadges = badges.length > 0 ? badges : defaultBadges

  return (
    <section id="badges" className="py-32 px-4 border-t border-cyan-500/10">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className="text-5xl font-bold mb-6">
            <span className="text-cyan-400">Achievement</span> Badges
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto mb-4">
            Recognized expertise and professional achievements
          </p>
          <div className="h-1 w-16 bg-cyan-500 rounded-full mx-auto" />
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {displayedBadges.map((badge) => (
            <motion.div key={badge.id} variants={badgeVariant} className="group">
              <div className="relative h-full">
                {/* Glowing background */}
                <div
                  className={`absolute inset-0 rounded-xl bg-gradient-to-br ${badge.color || 'from-cyan-500 to-blue-500'} opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-300`}
                />

                {/* Card */}
                <div className="relative bg-slate-800/50 border border-cyan-500/30 rounded-xl p-6 h-full flex flex-col hover:border-cyan-500/70 transition-all duration-300 group-hover:shadow-lg group-hover:shadow-cyan-500/20">
                  {/* Icon/Badge at top */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="text-4xl opacity-80">
                      {badgeIcons[badge.name] || '★'}
                    </div>
                    {badge.year && (
                      <span className="text-xs px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                        {badge.year}
                      </span>
                    )}
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-cyan-400 mb-2">
                      {badge.name}
                    </h3>
                    <p className="text-sm text-gray-300 mb-4 line-clamp-2">
                      {badge.description}
                    </p>
                  </div>

                  {/* Category and check */}
                  <div className="flex items-center justify-between pt-4 border-t border-cyan-500/10">
                    {badge.category && (
                      <span className="text-xs px-2 py-1 rounded bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                        {badge.category}
                      </span>
                    )}
                    <CheckCircle2 className="w-4 h-4 text-cyan-400 opacity-70 group-hover:opacity-100 transition-opacity" />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Stats footer */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 p-8 rounded-xl bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-500/20"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <Award className="w-8 h-8 text-cyan-400 mx-auto mb-3" />
              <p className="text-3xl font-bold text-cyan-400 mb-2">
                {displayedBadges.length}
              </p>
              <p className="text-gray-400 text-sm">Earned Badges</p>
            </div>
            <div>
              <CheckCircle2 className="w-8 h-8 text-cyan-400 mx-auto mb-3" />
              <p className="text-3xl font-bold text-cyan-400 mb-2">100%</p>
              <p className="text-gray-400 text-sm">Verified Achievements</p>
            </div>
            <div>
              <span className="text-3xl font-bold text-cyan-400 mb-2 block">
                2024
              </span>
              <p className="text-gray-400 text-sm">Current Year Focus</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
