// In a real application, you would use a database to store portfolio data
// This is a simplified example using a global variable for demonstration
let portfolioData = {
  name: "Adul S.",
  title: "Junior IT Administrator",
  shortBio:
    "Passionate IT administrator with expertise in network management, server administration, and IT infrastructure.",
  longBio:
    "I'm a dedicated junior IT administrator with a strong foundation in IT infrastructure management. My expertise spans across Windows and Linux server administration, network configuration, and cloud services. I'm passionate about implementing efficient systems and ensuring optimal performance and security.",
  profileImage: "/placeholder.svg?height=400&width=400",
  cvUrl: "/files/resume.pdf",
  coreSkills: [
    "Windows Server",
    "Linux Administration",
    "Network Management",
    "Cloud Services",
    "Security",
    "Troubleshooting",
  ],
  skillCategories: [
    {
      name: "Operating Systems",
      skills: [
        { name: "Windows Server", level: 85 },
        { name: "Linux (Ubuntu/CentOS)", level: 80 },
        { name: "macOS", level: 70 },
      ],
    },
    {
      name: "Networking",
      skills: [
        { name: "TCP/IP", level: 85 },
        { name: "DNS", level: 80 },
        { name: "DHCP", level: 75 },
        { name: "VPN", level: 70 },
      ],
    },
    {
      name: "Cloud & Services",
      skills: [
        { name: "AWS", level: 65 },
        { name: "Azure", level: 70 },
        { name: "Office 365", level: 85 },
        { name: "G Suite", level: 80 },
      ],
    },
  ],
  experiences: [
    {
      role: "Junior IT administrator",
      company: "Tech Solutions Inc.",
      period: "Jan 2023 - Present",
      description:
        "Responsible for managing and maintaining IT infrastructure, including servers, networks, and security systems.",
      achievements: [
        "Implemented automated backup system reducing recovery time by 40%",
        "Upgraded network infrastructure improving overall performance by 25%",
        "Deployed new security protocols to enhance data protection",
      ],
    },
    {
      role: "IT Support Specialist",
      company: "Global Services Ltd.",
      period: "Jun 2021 - Dec 2022",
      description: "Provided technical support to end-users and assisted in IT administration tasks.",
      achievements: [
        "Resolved over 500 technical support tickets with 98% satisfaction rate",
        "Contributed to server migration project that improved system reliability",
        "Created documentation for common IT procedures reducing training time",
      ],
    },
  ],
  projects: [
    {
      title: "Network Infrastructure Upgrade",
      description: "Led a project to upgrade the company's network infrastructure to improve performance and security.",
      technologies: ["Cisco", "Firewall", "VPN", "Routing"],
      image: "/placeholder.svg?height=200&width=400",
      link: "",
    },
    {
      title: "Server Virtualization",
      description: "Implemented virtualization solution to optimize server resources and improve scalability.",
      technologies: ["VMware", "Hyper-V", "Server Management", "Resource Optimization"],
      image: "/placeholder.svg?height=200&width=400",
      link: "",
    },
    {
      title: "Automated Backup System",
      description: "Developed and implemented an automated backup system to ensure data integrity and quick recovery.",
      technologies: ["Veeam", "PowerShell", "Scheduling", "Data Recovery"],
      image: "/placeholder.svg?height=200&width=400",
      link: "",
    },
  ],
  socialLinks: {
    github: "https://github.com/aduls",
    linkedin: "https://linkedin.com/in/aduls",
    email: "adul@example.com",
  },
  contact: {
    email: "adul@example.com",
    phone: "+1 (555) 123-4567",
    location: "New York, USA",
  },
  certifications: [
    {
      id: "1",
      name: "AWS Certified Solutions Architect",
      issuer: "Amazon Web Services",
      date: "Jan 2023",
      link: "https://aws.amazon.com/certification/",
      image: "/placeholder.svg?height=200&width=400",
      badgeImage: "/placeholder.svg?height=100&width=100",
      category: "cloud",
    },
    {
      id: "2",
      name: "Microsoft Certified: Azure Administrator",
      issuer: "Microsoft",
      date: "Mar 2023",
      link: "https://learn.microsoft.com/en-us/certifications/",
      image: "/placeholder.svg?height=200&width=400",
      badgeImage: "/placeholder.svg?height=100&width=100",
      category: "cloud",
    },
    {
      id: "3",
      name: "CompTIA Network+",
      issuer: "CompTIA",
      date: "Jun 2022",
      link: "https://www.comptia.org/certifications/network",
      image: "/placeholder.svg?height=200&width=400",
      badgeImage: "/placeholder.svg?height=100&width=100",
      category: "networking",
    },
    {
      id: "4",
      name: "Cisco Certified Network Associate (CCNA)",
      issuer: "Cisco",
      date: "Sep 2022",
      link: "https://www.cisco.com/c/en/us/training-events/training-certifications/certifications/associate/ccna.html",
      image: "/placeholder.svg?height=200&width=400",
      badgeImage: "/placeholder.svg?height=100&width=100",
      category: "networking",
    },
    {
      id: "5",
      name: "Linux Professional Institute Certification (LPIC-1)",
      issuer: "Linux Professional Institute",
      date: "Nov 2022",
      link: "https://www.lpi.org/our-certifications/lpic-1-overview",
      image: "/placeholder.svg?height=200&width=400",
      badgeImage: "/placeholder.svg?height=100&width=100",
      category: "operating systems",
    },
  ],
  enquiries: [],
}

export function getPortfolioData() {
  return portfolioData
}

export function updatePortfolioData(data) {
  portfolioData = { ...portfolioData, ...data }
  return true
}

export function addEnquiry(enquiry) {
  portfolioData.enquiries = [
    ...(portfolioData.enquiries || []),
    {
      id: Date.now().toString(),
      date: new Date().toISOString(),
      ...enquiry,
    },
  ]
  return true
}

export function getEnquiries() {
  return portfolioData.enquiries || []
}
