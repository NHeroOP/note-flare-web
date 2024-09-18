'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import { useTheme } from 'next-themes'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Moon, Sun, Book, AlertCircle, X } from 'lucide-react'
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

const subjects = [
  { name: 'Mathematics', value: 'mathematics' },
  { name: 'Physics', value: 'physics' },
  { name: 'Chemistry', value: 'chemistry' },
  { name: 'Biology', value: 'biology' },
  { name: 'Computer Science', value: 'computer-science' },
  { name: 'Literature', value: 'literature' },
]

// Mock function to fetch note data
const fetchNoteData = async (noteId: string) => {
  // Simulating API call
  await new Promise(resolve => setTimeout(resolve, 1000))
  return {
    id: noteId,
    title: 'Sample Note Title',
    subject: 'physics',
    description: 'This is a sample note description.',
    tags: ['physics', 'mechanics', 'newton'],
    fileUrl: '/sample-note.pdf',
  }
}

export default function EditNotePage() {
  const params = useParams()
  const router = useRouter()
  const noteId = params.noteId as string
  const { theme, setTheme } = useTheme()

  const [note, setNote] = useState({
    title: '',
    subject: '',
    description: '',
    tags: [] as string[],
    fileUrl: '',
  })
  const [isLoading, setIsLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState('')
  const [currentTag, setCurrentTag] = useState('')

  useEffect(() => {
    const loadNote = async () => {
      try {
        const data = await fetchNoteData(noteId)
        setNote(data)
        setIsLoading(false)
      } catch (err) {
        setError('Failed to load note data')
        setIsLoading(false)
      }
    }
    loadNote()
  }, [noteId])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError('')

    try {
      // Simulating API call
      await new Promise(resolve => setTimeout(resolve, 2000))
      router.push(`/notes/${noteId}`)
    } catch (err) {
      setError('Failed to update note')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleAddTag = () => {
    if (currentTag && !note.tags.includes(currentTag)) {
      setNote(prev => ({ ...prev, tags: [...prev.tags, currentTag] }))
      setCurrentTag('')
    }
  }

  const handleRemoveTag = (tagToRemove: string) => {
    setNote(prev => ({ ...prev, tags: prev.tags.filter(tag => tag !== tagToRemove) }))
  }

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light')
  }

  if (isLoading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>
  }

  return (
    <>
      <main className="flex-grow container mx-auto px-4 py-8">
        <Card className="max-w-2xl mx-auto dark:bg-black/50">
          <CardHeader>
            <CardTitle className="text-2xl font-bold">Edit Note</CardTitle>
            <CardDescription>Update the details of your note</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  value={note.title}
                  onChange={(e) => setNote(prev => ({ ...prev, title: e.target.value }))}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="subject">Subject</Label>
                <Select
                  value={note.subject}
                  onValueChange={(value) => setNote(prev => ({ ...prev, subject: value }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a subject" />
                  </SelectTrigger>
                  <SelectContent>
                    {subjects.map((subject) => (
                      <SelectItem key={subject.value} value={subject.value}>
                        {subject.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={note.description}
                  onChange={(e) => setNote(prev => ({ ...prev, description: e.target.value }))}
                  rows={4}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="tags">Tags</Label>
                <div className="flex space-x-2">
                  <Input
                    id="tags"
                    value={currentTag}
                    onChange={(e) => setCurrentTag(e.target.value)}
                    placeholder="Add a tag"
                  />
                  <Button type="button" onClick={handleAddTag}>Add</Button>
                </div>
                <div className="flex flex-wrap gap-2 mt-2">
                  {note.tags.map((tag, index) => (
                    <Badge key={index} variant="secondary" className="flex items-center space-x-1">
                      <span>{tag}</span>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="h-5 w-5 p-0"
                        onClick={() => handleRemoveTag(tag)}
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    </Badge>
                  ))}
                </div>
              </div>
              {error && (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertTitle>Error</AlertTitle>
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}
              <Button type="submit" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? 'Updating...' : 'Update Note'}
              </Button>
            </form>
          </CardContent>
        </Card>
      </main>

    </>
  )
}