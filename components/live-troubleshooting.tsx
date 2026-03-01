"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Zap, Send, Copy, Check } from "lucide-react"

interface TroubleshootingStep {
  step: number
  title: string
  description: string
  action: string
}

interface TroubleshootingResponse {
  problem: string
  severity: string
  estimatedTime: string
  steps: TroubleshootingStep[]
}

interface LiveTroubleshootingProps {
  onSubmit?: (response: TroubleshootingResponse) => void
}

// AI-powered troubleshooting logic
const generateTroubleshootingSteps = (problem: string): TroubleshootingResponse => {
  const problemLower = problem.toLowerCase()

  // Define common IT problems and their solutions
  const problemDatabase: Record<string, Partial<TroubleshootingResponse>> = {
    "server 500 error": {
      severity: "High",
      estimatedTime: "15-30 minutes",
      steps: [
        {
          step: 1,
          title: "Check Server Logs",
          description: "Access the application server logs to identify the root cause",
          action: "ssh user@server && tail -f /var/log/application.log",
        },
        {
          step: 2,
          title: "Verify System Resources",
          description: "Check CPU, memory, and disk usage to identify bottlenecks",
          action: "top && df -h && free -h",
        },
        {
          step: 3,
          title: "Restart Services",
          description: "Restart the affected service and monitor for stability",
          action: "sudo systemctl restart application && systemctl status application",
        },
      ],
    },
    "network connectivity": {
      severity: "High",
      estimatedTime: "10-20 minutes",
      steps: [
        {
          step: 1,
          title: "Test Network Interface",
          description: "Verify that the network interface is up and has correct IP",
          action: "ip addr show && ip route show",
        },
        {
          step: 2,
          title: "Check DNS Resolution",
          description: "Test DNS nameserver connectivity and resolution",
          action: "nslookup example.com && dig example.com",
        },
        {
          step: 3,
          title: "Verify Gateway and Routing",
          description: "Test connectivity to gateway and internet routes",
          action: "ping gateway && traceroute example.com && netstat -rn",
        },
      ],
    },
    "secure linux application": {
      severity: "Critical",
      estimatedTime: "30-60 minutes",
      steps: [
        {
          step: 1,
          title: "Configure Firewall Rules",
          description: "Set up UFW or iptables to restrict unnecessary ports",
          action: "sudo ufw enable && sudo ufw default deny incoming && sudo ufw default allow outgoing",
        },
        {
          step: 2,
          title: "Implement SSH Hardening",
          description: "Disable root login, change default port, use key-based authentication",
          action: "sudo nano /etc/ssh/sshd_config && sudo systemctl restart ssh",
        },
        {
          step: 3,
          title: "Enable SELinux/AppArmor",
          description: "Configure mandatory access controls for application isolation",
          action: "sudo apt install apparmor-utils && sudo aa-enforce /usr/bin/app",
        },
      ],
    },
    "memory leak": {
      severity: "High",
      estimatedTime: "20-40 minutes",
      steps: [
        {
          step: 1,
          title: "Monitor Process Memory",
          description: "Track memory usage of the problematic process over time",
          action: "ps aux --sort=-%mem && watch -n 1 'ps aux | grep process_name'",
        },
        {
          step: 2,
          title: "Analyze Memory Dumps",
          description: "Generate and analyze memory dump to find memory leaks",
          action: "jmap -dump:live,format=b,file=heap.bin <pid> && jhat heap.bin",
        },
        {
          step: 3,
          title: "Apply Code Patches",
          description: "Deploy fixes or update to patched version",
          action: "git pull && npm install && npm test && npm start",
        },
      ],
    },
    "high cpu usage": {
      severity: "Medium",
      estimatedTime: "15-30 minutes",
      steps: [
        {
          step: 1,
          title: "Identify Resource Hogs",
          description: "Use system monitoring tools to find processes consuming CPU",
          action: "top -o %CPU && ps aux --sort=-%cpu | head -10",
        },
        {
          step: 2,
          title: "Analyze Process Threads",
          description: "Examine thread count and CPU affinity of problem process",
          action: "ps -eLf | grep process_name && ps -mo THREAD,,tid -p <pid>",
        },
        {
          step: 3,
          title: "Optimize or Restart",
          description: "Implement performance tuning or gracefully restart the service",
          action: "sudo systemctl restart service && monitor CPU with 'htop'",
        },
      ],
    },
  }

  // Find matching problem or use default response
  let response: TroubleshootingResponse = {
    problem,
    severity: "Medium",
    estimatedTime: "20-30 minutes",
    steps: [
      {
        step: 1,
        title: "Gather Information",
        description: "Collect details about the issue, error messages, and recent changes",
        action: "Check logs: tail -f /var/log/syslog && dmesg | tail -20",
      },
      {
        step: 2,
        title: "Isolate the Problem",
        description: "Test components individually to identify the root cause",
        action: "Run diagnostics and test connectivity between systems",
      },
      {
        step: 3,
        title: "Implement Solution",
        description: "Apply fix, monitor results, and document the resolution",
        action: "Apply patch or configuration change and verify resolution",
      },
    ],
  }

  // Match problem keywords for specific solutions
  for (const [key, value] of Object.entries(problemDatabase)) {
    if (problemLower.includes(key)) {
      response = {
        problem,
        ...value,
      } as TroubleshootingResponse
      break
    }
  }

  return response
}

export default function LiveTroubleshooting({ onSubmit }: LiveTroubleshootingProps) {
  const [problemInput, setProblemInput] = useState("")
  const [response, setResponse] = useState<TroubleshootingResponse | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [copiedStep, setCopiedStep] = useState<number | null>(null)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!problemInput.trim()) return

    setIsLoading(true)

    // Simulate AI processing delay
    setTimeout(() => {
      const generatedResponse = generateTroubleshootingSteps(problemInput)
      setResponse(generatedResponse)
      onSubmit?.(generatedResponse)
      setIsLoading(false)
    }, 1000)
  }

  const copyToClipboard = (text: string, stepNum: number) => {
    navigator.clipboard.writeText(text)
    setCopiedStep(stepNum)
    setTimeout(() => setCopiedStep(null), 2000)
  }

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "Critical":
        return "from-red-500 to-red-600"
      case "High":
        return "from-orange-500 to-orange-600"
      case "Medium":
        return "from-yellow-500 to-yellow-600"
      default:
        return "from-green-500 to-green-600"
    }
  }

  return (
    <section id="troubleshooting" className="py-20 px-4 md:px-6 bg-gradient-to-b from-slate-950 to-blue-950">
      <div className="max-w-5xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center gap-2 mb-4">
            <Zap className="w-8 h-8 text-cyan-400" />
            <h2 className="text-4xl md:text-5xl font-bold">
              <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-cyan-400 bg-clip-text text-transparent">
                Live Troubleshooting Simulation
              </span>
            </h2>
          </div>
          <p className="text-slate-300 text-lg max-w-2xl mx-auto">
            Describe any IT problem and I'll generate professional troubleshooting steps in real-time
          </p>
        </motion.div>

        {/* Input Section */}
        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-xl blur opacity-50" />
            <div className="relative bg-slate-900/50 border border-slate-700/50 rounded-xl p-6 backdrop-blur-sm">
              <label className="block text-sm font-semibold text-cyan-400 mb-3 uppercase tracking-wide">
                Describe Your IT Problem
              </label>
              <textarea
                value={problemInput}
                onChange={(e) => setProblemInput(e.target.value)}
                placeholder="e.g., Server 500 error in production, Network connectivity issues, Need a secure Linux application, High CPU usage on database server..."
                className="w-full bg-slate-800/50 border border-slate-600 rounded-lg px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500/50 resize-none"
                rows={4}
              />
              <div className="flex justify-end mt-4">
                <button
                  type="submit"
                  disabled={!problemInput.trim() || isLoading}
                  className="flex items-center gap-2 px-6 py-2 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/20"
                >
                  {isLoading ? (
                    <>
                      <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY }} className="w-4 h-4">
                        <Zap className="w-4 h-4" />
                      </motion.div>
                      Analyzing...
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      Generate Solution
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </motion.form>

        {/* Response Section */}
        <AnimatePresence>
          {response && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.6 }}
              className="space-y-6"
            >
              {/* Response Header */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.1 }}
                  className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-4"
                >
                  <p className="text-sm text-slate-400 uppercase tracking-wide mb-2">Problem</p>
                  <p className="text-white font-semibold line-clamp-2">{response.problem}</p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.2 }}
                  className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-4"
                >
                  <p className="text-sm text-slate-400 uppercase tracking-wide mb-2">Severity</p>
                  <div className={`inline-flex px-3 py-1 rounded-full bg-gradient-to-r ${getSeverityColor(response.severity)} text-white text-sm font-bold`}>
                    {response.severity}
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.3 }}
                  className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-4"
                >
                  <p className="text-sm text-slate-400 uppercase tracking-wide mb-2">Est. Time</p>
                  <p className="text-white font-semibold">{response.estimatedTime}</p>
                </motion.div>
              </div>

              {/* Troubleshooting Steps */}
              <div className="space-y-4">
                <h3 className="text-2xl font-bold text-white mb-6">Troubleshooting Steps</h3>
                {response.steps.map((step, index) => (
                  <motion.div
                    key={step.step}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 + index * 0.1 }}
                    className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-slate-700/50 hover:border-cyan-500/50 rounded-xl p-6 transition-all duration-300"
                  >
                    {/* Step Number and Title */}
                    <div className="flex items-start gap-4 mb-4">
                      <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center font-bold text-white">
                        {step.step}
                      </div>
                      <div className="flex-1">
                        <h4 className="text-lg font-bold text-white mb-1">{step.title}</h4>
                        <p className="text-slate-300 text-sm">{step.description}</p>
                      </div>
                    </div>

                    {/* Command/Action */}
                    <div className="bg-slate-900/50 border border-slate-600/50 rounded-lg p-4 mt-4">
                      <div className="flex items-center justify-between gap-2 mb-2">
                        <p className="text-xs uppercase text-cyan-400 font-semibold">Command / Action</p>
                        <button
                          onClick={() => copyToClipboard(step.action, step.step)}
                          className="text-slate-400 hover:text-cyan-400 transition-colors"
                          title="Copy to clipboard"
                        >
                          {copiedStep === step.step ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                        </button>
                      </div>
                      <code className="text-sm text-green-400 font-mono break-all">{step.action}</code>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Footer Message */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="text-center pt-6 border-t border-slate-700/50"
              >
                <p className="text-slate-400 text-sm">
                  This demonstrates my operational expertise in diagnosing and resolving IT infrastructure issues with professional methodologies.
                </p>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Example Problems */}
        {!response && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
            className="mt-12 pt-12 border-t border-slate-700/50"
          >
            <p className="text-slate-400 text-center text-sm mb-6 uppercase tracking-wide">Example Problems to Try:</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {[
                "Server 500 error in production",
                "Network connectivity issues",
                "Secure Linux application",
                "High CPU usage",
                "Memory leak investigation",
                "Database performance slow",
              ].map((example) => (
                <button
                  key={example}
                  onClick={() => {
                    setProblemInput(example)
                  }}
                  className="px-4 py-2 bg-slate-800/50 hover:bg-slate-700/50 border border-slate-700 hover:border-cyan-500/50 rounded-lg text-sm text-slate-300 hover:text-cyan-400 transition-all duration-300"
                >
                  {example}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </section>
  )
}
