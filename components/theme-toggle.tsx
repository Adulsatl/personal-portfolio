"use client"

import * as React from "react"
import { Moon, Sun, Monitor } from "lucide-react"
import { useTheme } from "@/components/theme-provider"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <Button variant="outline" size="icon" disabled className="bg-gray-800/80 border-gray-700">
        <Moon className="h-[1.2rem] w-[1.2rem] text-cyan-400" />
        <span className="sr-only">Toggle theme</span>
      </Button>
    )
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon" className="bg-gray-800/80 border-gray-700 hover:bg-gray-700/80">
          {theme === "light" && <Sun className="h-[1.2rem] w-[1.2rem] text-yellow-400" />}
          {theme === "dark" && <Moon className="h-[1.2rem] w-[1.2rem] text-cyan-400" />}
          {theme === "system" && <Monitor className="h-[1.2rem] w-[1.2rem] text-blue-400" />}
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="bg-gray-900/95 border-gray-700 backdrop-blur-sm">
        <DropdownMenuItem onClick={() => setTheme("light")} className="cursor-pointer text-gray-200 hover:bg-gray-800">
          <Sun className="mr-2 h-4 w-4 text-yellow-400" />
          <span>Light</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("dark")} className="cursor-pointer text-gray-200 hover:bg-gray-800">
          <Moon className="mr-2 h-4 w-4 text-cyan-400" />
          <span>Dark</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("system")} className="cursor-pointer text-gray-200 hover:bg-gray-800">
          <Monitor className="mr-2 h-4 w-4 text-blue-400" />
          <span>System</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
