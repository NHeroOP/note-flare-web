"use client"

import { Book, LogIn, LogOut, Moon, Sun } from 'lucide-react'
import Link from 'next/link'
import React, { useEffect } from 'react'
import { Button } from './ui/button'
import { useTheme } from 'next-themes'
import { useRouter } from 'next/navigation'
import axios from 'axios'
import { useAuthStore } from '@/store/Auth'
import { Skeleton } from './ui/skeleton'

export default function Navbar() {
  const { theme, setTheme } = useTheme()
  const { isAuthenticated, hydrated, verifySession } = useAuthStore()
  const router = useRouter()
  

  const handleLogout = async() => {
    const res = (await axios.get("/api/auth/logout")).data

    if (res.success) {
      router.replace("/login")
    }
  }

  const toggleTheme = () => {
    setTheme(() => theme === 'light' ? 'dark' : 'light')
  }

  useEffect(() => {
    verifySession()
  }, [])

  if (!hydrated) {
    return <NavbarSkeleton />
  }


  return (
    <nav className="bg-white border-b dark:bg-gray-900 dark:border-gray-800 sticky top-0 z-10">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link href="/home" className="text-2xl font-bold text-gray-900 dark:text-gray-100 items-center flex">
            <Book className="mr-2" />
            <span className="hidden sm:inline">Notes Flare</span>
          </Link>
          {
            isAuthenticated ? 
            <>
              <div className="space-x-4">
                <Link href="/home" className="text-sm font-medium text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-gray-100">Home</Link>
                <Link href="/note/upload" className="text-sm font-medium text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-gray-100">Upload</Link>
                <Link href="/profile" className="text-sm font-medium text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-gray-100">Profile</Link>
              </div>
              <div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={toggleTheme}
                  className="text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-gray-100"
                >
                  {theme === 'light' ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
                  <span className="sr-only">Toggle theme</span>
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={handleLogout}
                  className="text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-gray-100"
                >
                  <LogOut className="h-5 w-5" />
                  <span className="sr-only">Logout</span>
                </Button>
              </div> 
            </> :
            <div>
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleTheme}
                className="text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-gray-100"
              >
                {theme === 'light' ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
                <span className="sr-only">Toggle theme</span>
              </Button>
              <Link href={"/login"}>
                <Button
                variant="ghost"
                size="icon"
                className="text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-gray-100"
              >
                <LogIn className="h-5 w-5" />
                <span className="sr-only">Login</span>
              </Button>
              </Link>
            </div>
          }
        </div>
      </div>
    </nav>
  )
}


export function NavbarSkeleton() {
  return (
    <nav className="bg-white border-b dark:bg-gray-900 dark:border-gray-800 sticky top-0 z-10">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Skeleton className="h-8 w-8 mr-2" />
            <Skeleton className="h-6 w-32 hidden sm:inline-block" />
          </div>
          <div className="flex items-center space-x-4">
            <Skeleton className="h-4 w-16" />
            <Skeleton className="h-4 w-16" />
            <Skeleton className="h-4 w-16" />
          </div>
          <div className="flex items-center space-x-2">
            <Skeleton className="h-8 w-8 rounded-full" />
            <Skeleton className="h-8 w-8 rounded-full" />
          </div>
        </div>
      </div>
    </nav>
  )
}