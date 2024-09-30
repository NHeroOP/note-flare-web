'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useTheme } from 'next-themes'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Book, Smartphone, Upload, Download, Users, Star, Moon, Sun, Menu } from 'lucide-react'

export default function LandingPage() {
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return <div>Loading...</div>
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 flex flex-col">
      <header className="bg-white/70 backdrop-blur-md border-b border-gray-200 dark:bg-gray-800/70 dark:border-gray-700 sticky top-0 z-10">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <Book className="h-8 w-8 text-teal-500 dark:text-teal-400 mr-2" />
              <span className="text-2xl font-bold text-gray-800 dark:text-white">ClassroomNotes</span>
            </div>
            <nav className="hidden md:flex items-center space-x-4">
              <Button asChild variant="ghost">
                <Link href="/login">Log In</Link>
              </Button>
              <Button asChild className="bg-teal-500 hover:bg-teal-600 text-white dark:bg-teal-600 dark:hover:bg-teal-700">
                <Link href="/home">Go to App</Link>
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
                aria-label="Toggle theme"
              >
                {theme === 'light' ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
              </Button>
            </nav>
            <DropdownMenu>
              <DropdownMenuTrigger asChild className="md:hidden">
                <Button variant="outline" size="icon">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Open menu</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem asChild>
                  <Link href="/login">Log In</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/home">Go to App</Link>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>
                  Toggle theme
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>

      <main className="flex-grow">
        <section className="py-20 text-center">
          <div className="container mx-auto px-4">
            <h1 className="text-5xl font-bold mb-6 text-gray-900 dark:text-white">Welcome to ClassroomNotes</h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">Your ultimate platform for sharing and discovering academic notes. Elevate your learning experience today!</p>
            <div className="flex justify-center space-x-4">
              <Button asChild size="lg" className="bg-teal-500 hover:bg-teal-600 text-white dark:bg-teal-600 dark:hover:bg-teal-700">
                <Link href="/register">Get Started</Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="border-teal-500 text-teal-500 hover:bg-teal-50 dark:border-teal-400 dark:text-teal-400 dark:hover:bg-teal-900/20">
                <Link href="/home">Explore Notes</Link>
              </Button>
            </div>
          </div>
        </section>

        <section id="features" className="py-20 bg-gray-100 dark:bg-gray-800">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12 text-gray-900 dark:text-white">Features</h2>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              <Card className="bg-white dark:bg-gray-700 shadow-lg hover:shadow-xl transition-shadow duration-300">
                <CardHeader>
                  <Upload className="h-12 w-12 text-teal-500 dark:text-teal-400 mb-2" />
                  <CardTitle className="text-gray-900 dark:text-white">Easy Upload</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-gray-600 dark:text-gray-300">Quickly upload and share your notes with classmates and students worldwide.</CardDescription>
                </CardContent>
              </Card>
              <Card className="bg-white dark:bg-gray-700 shadow-lg hover:shadow-xl transition-shadow duration-300">
                <CardHeader>
                  <Download className="h-12 w-12 text-purple-500 dark:text-purple-400 mb-2" />
                  <CardTitle className="text-gray-900 dark:text-white">Instant Access</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-gray-600 dark:text-gray-300">Download high-quality notes from various subjects and boost your learning.</CardDescription>
                </CardContent>
              </Card>
              <Card className="bg-white dark:bg-gray-700 shadow-lg hover:shadow-xl transition-shadow duration-300">
                <CardHeader>
                  <Users className="h-12 w-12 text-orange-500 dark:text-orange-400 mb-2" />
                  <CardTitle className="text-gray-900 dark:text-white">Community</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-gray-600 dark:text-gray-300">Connect with fellow students, share knowledge, and grow together academically.</CardDescription>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        <section id="mobile" className="py-20">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row items-center">
              <div className="md:w-1/2 mb-8 md:mb-0">
                <h2 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">Coming Soon to Mobile</h2>
                <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                  Get ready for ClassroomNotes on the go! Our mobile app is in development and will be available soon for both iOS and Android devices.
                </p>
                <Button asChild className="bg-teal-500 hover:bg-teal-600 text-white dark:bg-teal-600 dark:hover:bg-teal-700">
                  <Link href="#notify">Get Notified</Link>
                </Button>
              </div>
              <div className="md:w-1/2 flex justify-center">
                <Smartphone className="h-64 w-64 text-teal-500 dark:text-teal-400" />
              </div>
            </div>
          </div>
        </section>

        <section id="testimonials" className="py-20 bg-gray-50 dark:bg-gray-900">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12 text-gray-900 dark:text-white">What Our Users Say</h2>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {[
                { name: "Alex Johnson", text: "ClassroomNotes has been a game-changer for my studies. The quality of notes available is outstanding!", color: "teal" },
                { name: "Samantha Lee", text: "I love how easy it is to share my notes and help other students. This platform has created a wonderful community.", color: "purple" },
                { name: "Michael Chen", text: "The variety of subjects covered is impressive. I always find what I need for my classes.", color: "orange" }
              ].map((testimonial, index) => (
                <Card key={index} className="bg-white dark:bg-gray-700 shadow-lg hover:shadow-xl transition-shadow duration-300">
                  <CardHeader>
                    <CardTitle className={`flex items-center text-${testimonial.color}-500 dark:text-${testimonial.color}-400`}>
                      <Star className={`h-5 w-5 text-${testimonial.color}-500 dark:text-${testimonial.color}-400 mr-2`} />
                      {testimonial.name}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-gray-600 dark:text-gray-300">"{testimonial.text}"</CardDescription>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section id="notify" className="py-20 bg-teal-500 dark:bg-teal-600">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4 text-white">Stay Updated</h2>
            <p className="text-lg text-teal-100 mb-8">Be the first to know when our mobile app launches. Sign up for notifications!</p>
            <form className="max-w-md mx-auto">
              <div className="flex">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-grow rounded-l-md border-0 bg-white dark:bg-gray-700 px-3 py-2 text-sm text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white dark:focus:ring-gray-300"
                />
                <Button type="submit" className="rounded-l-none bg-gray-800 text-white hover:bg-gray-700 dark:bg-gray-600 dark:hover:bg-gray-500">Notify Me</Button>
              </div>
            </form>
          </div>
        </section>
      </main>

      <footer className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <p className="text-sm text-gray-600 dark:text-gray-400">© 2023 ClassroomNotes. All rights reserved.</p>
            </div>
            <nav>
              <ul className="flex space-x-4">
                <li><Link href="/about" className="text-sm text-gray-600 hover:text-teal-500 dark:text-gray-400 dark:hover:text-teal-400">About</Link></li>
                <li><Link href="/privacy" className="text-sm text-gray-600 hover:text-teal-500 dark:text-gray-400 dark:hover:text-teal-400">Privacy</Link></li>
                <li><Link href="/terms" className="text-sm text-gray-600 hover:text-teal-500 dark:text-gray-400 dark:hover:text-teal-400">Terms</Link></li>
                <li><Link href="/contact" className="text-sm text-gray-600 hover:text-teal-500 dark:text-gray-400 dark:hover:text-teal-400">Contact</Link></li>
              </ul>
            </nav>
          </div>
        </div>
      </footer>
    </div>
  )
}