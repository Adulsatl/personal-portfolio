'use client'

import { motion } from 'framer-motion'
import { ExternalLink, Github, Code2 } from 'lucide-react'
import Image from 'next/image'

interface Project {
  id: string
  title: string
  description: string
  image?: string
  technologies: string[]
  link?: string
  github?: string
  featured?: boolean
}

interface ProjectsShowcaseProps {
  projects?: Project[]
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
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring',
      stiffness: 100,
      damping: 15,
    },
  },
}

export default function ProjectsShowcase({ projects = [] }: ProjectsShowcaseProps) {
  if (!projects || projects.length === 0) {
    return null
  }

  const featuredProjects = projects.filter((p) => p.featured)
  const displayProjects = featuredProjects.length > 0 ? featuredProjects : projects.slice(0, 3)

  return (
    <section className="py-20 px-4 md:px-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <Code2 className="w-8 h-8 text-cyan-400" />
            <h2 className="text-4xl sm:text-5xl font-bold">
              <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                Featured Projects
              </span>
            </h2>
          </div>
          <p className="text-slate-400 text-lg">Showcase of innovative IT solutions and implementations</p>
        </motion.div>

        {/* Projects Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {displayProjects.map((project, idx) => (
            <motion.div key={project.id || idx} variants={itemVariants}>
              <motion.div
                whileHover={{ y: -8 }}
                className="h-full rounded-xl bg-gradient-to-br from-slate-800/50 to-blue-900/50 border border-cyan-500/20 overflow-hidden group backdrop-blur-sm transition-all hover:border-cyan-500/50"
              >
                {/* Project image/placeholder */}
                {project.image && (
                  <div className="relative h-48 overflow-hidden bg-gradient-to-b from-cyan-500/20 to-blue-500/20">
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900 to-transparent" />
                  </div>
                )}

                {/* Content */}
                <div className="p-6 flex flex-col h-full">
                  {/* Title */}
                  <h3 className="text-xl font-bold text-white mb-3 group-hover:text-cyan-400 transition-colors">
                    {project.title}
                  </h3>

                  {/* Description */}
                  <p className="text-slate-400 text-sm mb-4 flex-1">{project.description}</p>

                  {/* Technologies */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.technologies.slice(0, 3).map((tech, idx) => (
                      <motion.span
                        key={idx}
                        whileHover={{ scale: 1.1 }}
                        className="px-3 py-1 rounded-full text-xs font-semibold bg-cyan-500/20 border border-cyan-500/30 text-cyan-300"
                      >
                        {tech}
                      </motion.span>
                    ))}
                    {project.technologies.length > 3 && (
                      <span className="px-3 py-1 rounded-full text-xs font-semibold text-slate-400">
                        +{project.technologies.length - 3}
                      </span>
                    )}
                  </div>

                  {/* Links */}
                  <div className="flex gap-3 pt-4 border-t border-cyan-500/10">
                    {project.link && (
                      <motion.a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ gap: 8 }}
                        className="inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-300 font-semibold text-sm transition-colors"
                      >
                        <span>Live</span>
                        <ExternalLink className="w-4 h-4" />
                      </motion.a>
                    )}
                    {project.github && (
                      <motion.a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.1 }}
                        className="inline-flex items-center gap-2 text-slate-400 hover:text-cyan-400 transition-colors"
                      >
                        <Github className="w-5 h-5" />
                      </motion.a>
                    )}
                  </div>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
