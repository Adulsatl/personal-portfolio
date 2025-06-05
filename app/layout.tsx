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
    <html lang="en" suppressHydrationWarning className="dark">
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                // Force dark theme by default
                document.documentElement.classList.add('dark');
                document.documentElement.classList.remove('light');
                document.documentElement.style.backgroundColor = 'rgb(10, 10, 10)';
                document.body.style.backgroundColor = 'rgb(10, 10, 10)';
                document.body.style.color = 'rgb(255, 255, 255)';
                
                // Only apply light theme if explicitly stored
                if (localStorage.theme === 'light') {
                  document.documentElement.classList.remove('dark');
                  document.documentElement.classList.add('light');
                }
              } catch (_) {
                // Fallback to dark theme
                document.documentElement.classList.add('dark');
                document.documentElement.classList.remove('light');
              }
            `,
          }}
        />
        <style
          dangerouslySetInnerHTML={{
            __html: `
            html, body {
              background-color: rgb(10, 10, 10) !important;
              color: rgb(255, 255, 255) !important;
            }
          `,
          }}
        />
      </head>
      <body className="antialiased bg-gray-900 text-white">
        <ThemeProvider attribute="class" defaultTheme="dark" storageKey="theme">
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
