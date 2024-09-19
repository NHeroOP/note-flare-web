'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Download, ThumbsUp, FileText } from 'lucide-react'
import { useTheme } from 'next-themes'
import { subjects } from '@/const'

const sortOptions = [
  { name: 'Most Downloaded', value: 'downloads' },
  { name: 'Most Liked', value: 'likes' },
  { name: 'Most Recent', value: 'recent' },
]

const notes = [
  { id: '1', title: 'Calculus Fundamentals', subject: 'Mathematics', author: 'John Doe', downloads: 1200, likes: 420, date: '2023-06-01', image: '/placeholder.svg?height=100&width=200' },
  { id: '2', title: 'Quantum Physics Explained', subject: 'Physics', author: 'Jane Smith', downloads: 950, likes: 380, date: '2023-06-02', image: '/placeholder.svg?height=100&width=200' },
  { id: '3', title: 'Organic Chemistry Basics', subject: 'Chemistry', author: 'Alice Johnson', downloads: 880, likes: 350, date: '2023-06-03', image: '/placeholder.svg?height=100&width=200' },
  { id: '4', title: 'Data Structures and Algorithms', subject: 'Computer Science', author: 'Bob Wilson', downloads: 1100, likes: 400, date: '2023-06-04', image: '/placeholder.svg?height=100&width=200' },
  { id: '5', title: 'Cell Biology Essentials', subject: 'Biology', author: 'Emma Brown', downloads: 820, likes: 310, date: '2023-06-05', image: '/placeholder.svg?height=100&width=200' },
  { id: '6', title: "Shakespeare's Major Works", subject: 'Literature', author: 'David Lee', downloads: 750, likes: 290, date: '2023-06-06', image: '/placeholder.svg?height=100&width=200' },
]

export default function Component() {
  const { theme, setTheme } = useTheme()
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedSubject, setSelectedSubject] = useState('all')
  const [sortBy, setSortBy] = useState('downloads')

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light')
  }

  const filteredAndSortedNotes = notes
    .filter(note => 
      (selectedSubject === 'all' || note.subject.toLowerCase() === selectedSubject) &&
      (note.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
       note.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
       note.author.toLowerCase().includes(searchQuery.toLowerCase()))
    )
    .sort((a, b) => {
      if (sortBy === 'downloads') return b.downloads - a.downloads
      if (sortBy === 'likes') return b.likes - a.likes
      if (sortBy === 'recent') return new Date(b.date).getTime() - new Date(a.date).getTime()
      return 0
    })

  return (
    <main className="flex-grow container mx-auto px-4 py-8 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <section className="mb-8 text-center">
        <h1 className="text-3xl sm:text-4xl font-bold mb-4">Find the Best Study Notes</h1>
        <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-400 mb-6">Access high-quality notes from top students worldwide</p>
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col gap-4">
            <Input 
              placeholder="Search for notes..." 
              className="w-full bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <div className="flex flex-col sm:flex-row gap-4">
              <Select value={selectedSubject} onValueChange={setSelectedSubject}>
                <SelectTrigger className="w-full bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100">
                  <SelectValue placeholder="Select subject" />
                </SelectTrigger>
                <SelectContent>
                  {subjects.map((subject) => (
                    <SelectItem key={subject.value} value={subject.value}>
                      {subject.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-full bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  {sortOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAndSortedNotes.map((note) => (
            <Card key={note.id} className="bg-white dark:bg-gray-800 hover:shadow-lg transition-shadow">
              <CardHeader className="p-0">
                <img src={"https://placehold.co/200x100"} alt={note.title} className="w-full h-32 object-cover rounded-t-lg" />
              </CardHeader>
              <CardContent className="p-4">
                <CardTitle className="text-lg sm:text-xl text-gray-900 dark:text-gray-100">{note.title}</CardTitle>
                <CardDescription className="text-sm sm:text-base text-gray-600 dark:text-gray-400">{note.subject}</CardDescription>
                <div className="flex items-center mt-2">
                  <Avatar className="h-6 w-6 mr-2">
                    <AvatarImage src={`https://i.pravatar.cc/150?u=${note.author}`} />
                    <AvatarFallback>{note.author[0]}</AvatarFallback>
                  </Avatar>
                  <span className="text-xs sm:text-sm text-gray-700 dark:text-gray-300">{note.author}</span>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between p-4">
                <Badge variant="secondary" className="bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-300 flex items-center text-xs sm:text-sm">
                  <Download className="h-3 w-3 sm:h-4 sm:w-4 mr-1" /> {note.downloads}
                </Badge>
                <Badge variant="secondary" className="bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-300 flex items-center text-xs sm:text-sm">
                  <ThumbsUp className="h-3 w-3 sm:h-4 sm:w-4 mr-1" /> {note.likes}
                </Badge>
              </CardFooter>
            </Card>
          ))}
        </div>
      </section>

      {filteredAndSortedNotes.length === 0 && (
        <p className="text-center text-gray-600 dark:text-gray-400 mt-8">
          No notes found matching your search criteria. Try adjusting your search or subject selection.
        </p>
      )}

      <div className="mt-8 text-center">
        <Button variant="outline" className="w-full sm:w-auto bg-white hover:bg-gray-100 text-gray-900 dark:bg-gray-800 dark:hover:bg-gray-700 dark:text-gray-100">
          <FileText className="mr-2 h-4 w-4" /> Load More Notes
        </Button>
      </div>
    </main>
  )
}