import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Adul S - Junior IT Administrator",
  description:
    "Professional portfolio of Adul S, a Junior IT Administrator with expertise in network management, server administration, and IT infrastructure.",
  verification: {
    google: "googleaa0d53c26a096342",
  },
    generator: 'v0.dev'
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
