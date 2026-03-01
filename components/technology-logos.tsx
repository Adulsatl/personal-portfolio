'use client'

import React from 'react'
import {
  Server,
  Database,
  Shield,
  Cloud,
  Network,
  HardDrive,
  Terminal,
  Lock,
  Settings,
  Zap,
  Cpu,
  Router,
  GitBranch,
  Code,
  Package,
  Globe,
} from 'lucide-react'
import AnimatedLogoGallery from './animated-logo-gallery'

export const TechnologyLogos = () => {
  const technologies = [
    {
      id: 'windows-server',
      name: 'Windows Server',
      icon: <Server className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 text-blue-400" />,
      color: 'rgba(59, 130, 246, 0.3)',
      category: 'os',
    },
    {
      id: 'linux',
      name: 'Linux',
      icon: <Terminal className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 text-orange-400" />,
      color: 'rgba(251, 146, 60, 0.3)',
      category: 'os',
    },
    {
      id: 'active-directory',
      name: 'Active Directory',
      icon: <Shield className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 text-purple-400" />,
      color: 'rgba(168, 85, 247, 0.3)',
      category: 'security',
    },
    {
      id: 'networks',
      name: 'Network Mgmt',
      icon: <Router className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 text-green-400" />,
      color: 'rgba(34, 197, 94, 0.3)',
      category: 'networking',
    },
    {
      id: 'cloud',
      name: 'Cloud Services',
      icon: <Cloud className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 text-cyan-400" />,
      color: 'rgba(34, 211, 238, 0.3)',
      category: 'cloud',
    },
    {
      id: 'databases',
      name: 'Databases',
      icon: <Database className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 text-red-400" />,
      color: 'rgba(239, 68, 68, 0.3)',
      category: 'data',
    },
    {
      id: 'virtualization',
      name: 'Virtualization',
      icon: <Cpu className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 text-indigo-400" />,
      color: 'rgba(99, 102, 241, 0.3)',
      category: 'infrastructure',
    },
    {
      id: 'security',
      name: 'Cybersecurity',
      icon: <Lock className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 text-rose-400" />,
      color: 'rgba(244, 63, 94, 0.3)',
      category: 'security',
    },
    {
      id: 'backup',
      name: 'Backup Solutions',
      icon: <HardDrive className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 text-yellow-400" />,
      color: 'rgba(250, 204, 21, 0.3)',
      category: 'data',
    },
    {
      id: 'monitoring',
      name: 'Monitoring Tools',
      icon: <Zap className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 text-lime-400" />,
      color: 'rgba(132, 204, 22, 0.3)',
      category: 'operations',
    },
    {
      id: 'git',
      name: 'Version Control',
      icon: <GitBranch className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 text-pink-400" />,
      color: 'rgba(236, 72, 153, 0.3)',
      category: 'development',
    },
    {
      id: 'automation',
      name: 'Automation',
      icon: <Settings className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 text-teal-400" />,
      color: 'rgba(20, 184, 166, 0.3)',
      category: 'operations',
    },
  ]

  return (
    <AnimatedLogoGallery
      logos={technologies}
      title="Core Technologies & Tools"
      subtitle="Professional expertise in enterprise IT infrastructure and administration"
      columns={2}
      mobileColumns={2}
      tabletColumns={3}
    />
  )
}

export default TechnologyLogos
