"use client"

import { useState, useEffect } from "react"
import { AlertTriangle, CheckCircle, Database, Server, ShieldAlert } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function SupabaseConnectionTest() {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [adminStatus, setAdminStatus] = useState<"success" | "error" | "warning" | null>(null)
  const [clientStatus, setClientStatus] = useState<"success" | "error" | "warning" | null>(null)
  const [adminMessage, setAdminMessage] = useState<string>("")
  const [clientMessage, setClientMessage] = useState<string>("")
  const [envVars, setEnvVars] = useState<Record<string, boolean>>({})

  useEffect(() => {
    const checkConnections = async () => {
      try {
        setLoading(true)

        // Check environment variables first
        const envResponse = await fetch("/api/diagnostics/env-check")
        if (envResponse.ok) {
          const envData = await envResponse.json()
          setEnvVars(envData.vars || {})

          // Check if service role key is missing
          if (!envData.vars.SUPABASE_SERVICE_ROLE_KEY) {
            setAdminStatus("warning")
            setAdminMessage("Missing SUPABASE_SERVICE_ROLE_KEY - admin functionality will be limited")
          }
        }

        // Test admin connection
        const adminResponse = await fetch("/api/diagnostics/admin-connection")
        if (adminResponse.ok) {
          const adminData = await adminResponse.json()
          if (adminData.success) {
            setAdminStatus("success")
            setAdminMessage(adminData.message || "Admin connection successful")
          } else {
            setAdminStatus(adminData.warning ? "warning" : "error")
            setAdminMessage(adminData.message || "Admin connection failed")
          }
        } else {
          setAdminStatus("error")
          setAdminMessage("Failed to test admin connection")
        }

        // Test client connection
        const clientResponse = await fetch("/api/diagnostics/client-connection")
        if (clientResponse.ok) {
          const clientData = await clientResponse.json()
          if (clientData.success) {
            setClientStatus("success")
            setClientMessage(clientData.message || "Client connection successful")
          } else {
            setClientStatus("error")
            setClientMessage(clientData.message || "Client connection failed")
          }
        } else {
          setClientStatus("error")
          setClientMessage("Failed to test client connection")
        }
      } catch (err) {
        setError("Failed to run connection tests")
        console.error("Connection test error:", err)
      } finally {
        setLoading(false)
      }
    }

    checkConnections()
  }, [])

  const getStatusIcon = (status: "success" | "error" | "warning" | null) => {
    if (status === "success") return <CheckCircle className="h-5 w-5 text-green-500" />
    if (status === "warning") return <AlertTriangle className="h-5 w-5 text-amber-500" />
    if (status === "error") return <AlertTriangle className="h-5 w-5 text-red-500" />
    return null
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Database className="h-5 w-5" />
            Supabase Connection Status
          </CardTitle>
          <CardDescription>Check the connection status to your Supabase database</CardDescription>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="flex items-center justify-center p-6">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            </div>
          ) : error ? (
            <div className="bg-red-50 dark:bg-red-900/20 p-4 rounded-lg text-red-600 dark:text-red-400">{error}</div>
          ) : (
            <div className="space-y-4">
              {/* Environment Variables */}
              <div className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-4">
                <h3 className="font-medium flex items-center gap-2 mb-2">
                  <ShieldAlert className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                  Environment Variables
                </h3>
                <div className="space-y-2 ml-7">
                  <div className="flex items-center justify-between text-sm">
                    <span>NEXT_PUBLIC_SUPABASE_URL:</span>
                    <span
                      className={
                        envVars.NEXT_PUBLIC_SUPABASE_URL
                          ? "text-green-600 dark:text-green-400"
                          : "text-red-600 dark:text-red-400"
                      }
                    >
                      {envVars.NEXT_PUBLIC_SUPABASE_URL ? "✓ Present" : "✗ Missing"}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span>NEXT_PUBLIC_SUPABASE_ANON_KEY:</span>
                    <span
                      className={
                        envVars.NEXT_PUBLIC_SUPABASE_ANON_KEY
                          ? "text-green-600 dark:text-green-400"
                          : "text-red-600 dark:text-red-400"
                      }
                    >
                      {envVars.NEXT_PUBLIC_SUPABASE_ANON_KEY ? "✓ Present" : "✗ Missing"}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span>SUPABASE_SERVICE_ROLE_KEY:</span>
                    <span
                      className={
                        envVars.SUPABASE_SERVICE_ROLE_KEY
                          ? "text-green-600 dark:text-green-400"
                          : "text-amber-600 dark:text-amber-400"
                      }
                    >
                      {envVars.SUPABASE_SERVICE_ROLE_KEY ? "✓ Present" : "⚠ Missing (admin features limited)"}
                    </span>
                  </div>
                </div>
              </div>

              {/* Admin Connection */}
              <div
                className={`rounded-lg p-4 ${
                  adminStatus === "success"
                    ? "bg-green-50 dark:bg-green-900/20"
                    : adminStatus === "warning"
                      ? "bg-amber-50 dark:bg-amber-900/20"
                      : "bg-red-50 dark:bg-red-900/20"
                }`}
              >
                <h3 className="font-medium flex items-center gap-2 mb-2">
                  <Server className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                  Admin Connection
                  {getStatusIcon(adminStatus)}
                </h3>
                <p
                  className={`text-sm ml-7 ${
                    adminStatus === "success"
                      ? "text-green-600 dark:text-green-400"
                      : adminStatus === "warning"
                        ? "text-amber-600 dark:text-amber-400"
                        : "text-red-600 dark:text-red-400"
                  }`}
                >
                  {adminMessage}
                </p>

                {adminStatus === "warning" && (
                  <div className="mt-2 p-3 bg-amber-100 dark:bg-amber-900/40 rounded text-sm text-amber-800 dark:text-amber-200">
                    <p className="font-medium">How to fix:</p>
                    <ol className="list-decimal ml-5 mt-1 space-y-1">
                      <li>Go to your Supabase project dashboard</li>
                      <li>Navigate to Project Settings &gt; API</li>
                      <li>Copy the "service_role key" (it's secret!)</li>
                      <li>Add it to your Vercel project as SUPABASE_SERVICE_ROLE_KEY</li>
                    </ol>
                  </div>
                )}
              </div>

              {/* Client Connection */}
              <div
                className={`rounded-lg p-4 ${
                  clientStatus === "success" ? "bg-green-50 dark:bg-green-900/20" : "bg-red-50 dark:bg-red-900/20"
                }`}
              >
                <h3 className="font-medium flex items-center gap-2 mb-2">
                  <Database className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                  Client Connection
                  {getStatusIcon(clientStatus)}
                </h3>
                <p
                  className={`text-sm ml-7 ${
                    clientStatus === "success" ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"
                  }`}
                >
                  {clientMessage}
                </p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
