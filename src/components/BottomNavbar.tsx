import { Home, Moon, Sun, Upload, User } from 'lucide-react'
import { useTheme } from 'next-themes'
import Link from 'next/link'
import React from 'react'
import { useMediaQuery } from "react-responsive"

export default function BottomNavbar() {
  const { theme, setTheme } = useTheme()
  const isMobile = useMediaQuery({ query: '(max-width: 426px)' })
  
  const toggleTheme = () => {
    setTheme(() => theme === 'light' ? 'dark' : 'light')
  }

  return (
    <>
    {isMobile && (
        <nav className="sticky bottom-0 left-0 right-0 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 py-2 px-4 flex justify-around items-center">
          <Link href="/home" className="flex flex-col items-center">
            <Home className="h-6 w-6 text-gray-700 dark:text-gray-300" />
            <span className="text-xs mt-1 text-gray-600 dark:text-gray-400">Home</span>
          </Link>
          <Link href="/note/upload" className="flex flex-col items-center">
            <Upload className="h-6 w-6 text-gray-700 dark:text-gray-300" />
            <span className="text-xs mt-1 text-gray-600 dark:text-gray-400">Upload</span>
          </Link>
          <Link href="/profile" className="flex flex-col items-center">
            <User className="h-6 w-6 text-gray-700 dark:text-gray-300" />
            <span className="text-xs mt-1 text-gray-600 dark:text-gray-400">Profile</span>
          </Link>
          <button
            onClick={toggleTheme}
            className="flex flex-col items-center"
          >
            {theme === 'light' ? (
              <Moon className="h-6 w-6 text-gray-700 dark:text-gray-300" />
            ) : (
              <Sun className="h-6 w-6 text-gray-700 dark:text-gray-300" />
            )}
            <span className="text-xs mt-1 text-gray-600 dark:text-gray-400">Theme</span>
          </button>
        </nav>
      )}
    </>
  )
}
