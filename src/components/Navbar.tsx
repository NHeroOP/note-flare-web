"use client"

import { Book, Moon, Sun } from 'lucide-react'
import Link from 'next/link'
import React from 'react'
import { Button } from './ui/button'
import { useTheme } from 'next-themes'

export default function Navbar() {
  const { theme, setTheme } = useTheme()

  const toggleTheme = () => {
    setTheme(() => theme === 'light' ? 'dark' : 'light')
  }

  return (
    <nav className="bg-white border-b dark:bg-gray-900 dark:border-gray-800 sticky top-0 z-10">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link href="/home" className="text-2xl font-bold text-gray-900 dark:text-gray-100 flex items-center">
            <Book className="mr-2" />
            Notes Flare
          </Link>
          <div className="flex items-center space-x-4">
            <Link href="/home" className="text-sm font-medium text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-gray-100">Home</Link>
            <Link href="/note/upload" className="text-sm font-medium text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-gray-100">Upload</Link>
            <Link href="/profile" className="text-sm font-medium text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-gray-100">Profile</Link>
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              className="text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-gray-100"
            >
              {theme === 'light' ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
              <span className="sr-only">Toggle theme</span>
            </Button>
          </div>
        </div>
      </div>
    </nav>
  )
}
