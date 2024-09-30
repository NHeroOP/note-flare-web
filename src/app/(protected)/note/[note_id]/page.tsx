'use client'

import { useState, useEffect, useRef, Suspense } from 'react'
import { useTheme } from 'next-themes'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { AlertCircle, Download, Edit, Eye, FileText, Save, X } from 'lucide-react'
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import * as pdfjs from 'pdfjs-dist/legacy/build/pdf.mjs'
import axios from 'axios'

// pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/legacy/build/pdf.worker.min.mjs`

const fetchNoteData = async (noteId: string) => {
  await new Promise(resolve => setTimeout(resolve, 1000))
  return {
    id: noteId,
    title: 'Sample Note Title',
    subject: 'Physics',
    description: 'This is a sample note description. It covers various topics in physics, including mechanics and thermodynamics.',
    tags: ['physics', 'mechanics', 'thermodynamics'],
    fileUrl: '/sample-note.pdf',
    fileType: 'pdf',
    uploadDate: '2023-06-15',
    downloads: 150,
    likes: 75,
  }
}

const updateNoteData = async (noteId: string, updatedData: any) => {
  await new Promise(resolve => setTimeout(resolve, 1000))
  console.log('Updating note:', noteId, 'with data:', updatedData)
  return { ...updatedData, id: noteId }
}

interface NotePageProps {
  params: {
    note_id: string;
  };
}

export default function NotePage({ params: { note_id } }: NotePageProps) {
  const { theme, setTheme } = useTheme()

  const [note, setNote] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')
  const [previewError, setPreviewError] = useState('')
  const [isEditing, setIsEditing] = useState(false)
  const [editedNote, setEditedNote] = useState({
    id: '',
    title: '',
    subject: '',
    description: '',
    tags: Array(),
    fileUrl: '',
    fileType: '',
    uploadDate: '0000-00-00',
    downloads: 0,
    likes: 0,
  })
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const loadNote = async () => {
      try {
        setIsLoading(true)
        const { data: noteData} = await axios.get(`/api/notes/get/${note_id}`)
              
        if (noteData.success) {
          setNote(noteData.note)
          setEditedNote(noteData.note)
          renderPdfPreview(noteData.note.file_url)
        } else {
          setError("Failed to load note data")
        }
      } catch (err) {
        setError('Failed to load note data')
      }
      finally{
        setIsLoading(false)
      }
    }
    loadNote()
  }, [note_id])

  const renderPdfPreview = async (url: string) => {
    try {
      const loadingTask = pdfjs.getDocument(url)
      const pdf = await loadingTask.promise
      const page = await pdf.getPage(1)
      const scale = 1.5
      const viewport = page.getViewport({ scale })

      const canvas = canvasRef.current
      if (!canvas) return

      const context = canvas.getContext('2d')
      if (!context) return

      canvas.height = viewport.height
      canvas.width = viewport.width

      const renderContext = {
        canvasContext: context,
        viewport: viewport,
      }
      const renderTask = page.render(renderContext);
      renderTask.promise.catch((error) => {
        console.error('Error rendering PDF:', error);
        setPreviewError('Failed to render PDF preview');
      });

      await renderTask.promise
    } catch (err) {
      console.error('Error rendering PDF:', err)
      setPreviewError('Failed to render PDF preview')
    }
  }

  const handleDownload = () => {
    console.log('Downloading file:', note.fileUrl)
  }

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light')
  }

  const handleEdit = () => {
    setIsEditing(true)
  }

  const handleCancelEdit = () => {
    setIsEditing(false)
    setEditedNote(note)
  }

  const handleSave = async () => {
    try {
      const updatedNote = await updateNoteData(note_id, editedNote)
      setNote(updatedNote)
      setIsEditing(false)
    } catch (err) {
      setError('Failed to update note')
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setEditedNote(prev => ({ ...prev, [name]: value }))
  }

  const handleTagChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const tags = e.target.value.split(',').map(tag => tag.trim())
    setEditedNote(prev => ({ ...prev, tags }))
  }

  if (isLoading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>
  }

  if (error) {
    return (
      <Alert variant="destructive" className="m-4">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>{error}</AlertDescription>
      </Alert>
    )
  }

  return (
    <Suspense>
      <main className="flex-grow container mx-auto px-4 py-8">
        <Card className="max-w-4xl mx-auto bg-white dark:bg-gray-800">
          <CardHeader>
            <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
              <div className="w-full">
                {isEditing ? (
                  <Input
                    name="title"
                    value={editedNote.title}
                    onChange={handleInputChange}
                    className="text-xl sm:text-2xl font-bold"
                  />
                ) : (
                  <CardTitle className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">{note.title}</CardTitle>
                )}
                {isEditing ? (
                  <Input
                    name="subject"
                    value={editedNote.subject}
                    onChange={handleInputChange}
                    className="mt-1 text-sm"
                  />
                ) : (
                  <CardDescription className="mt-1 text-sm text-gray-600 dark:text-gray-400">{note.subject}</CardDescription>
                )}
              </div>
              {isEditing ? (
                <div className="flex gap-2 w-full sm:w-auto">
                  <Button onClick={handleSave} className="w-full sm:w-auto">
                    <Save className="mr-2 h-4 w-4" />
                    Save
                  </Button>
                  <Button variant="outline" onClick={handleCancelEdit} className="w-full sm:w-auto">
                    <X className="mr-2 h-4 w-4" />
                    Cancel
                  </Button>
                </div>
              ) : (
                <Button variant="outline" onClick={handleEdit} className="w-full sm:w-auto">
                  <Edit className="mr-2 h-4 w-4" />
                  Edit
                </Button>
              )}
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white">Description</h3>
              {isEditing ? (
                <Textarea
                  name="description"
                  value={editedNote.description}
                  onChange={handleInputChange}
                  className="mt-1"
                />
              ) : (
                <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">{note.description}</p>
              )}
            </div>
            <div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white">Tags</h3>
              {isEditing ? (
                <Input
                  name="tags"
                  value={editedNote.tags.join(', ')}
                  onChange={handleTagChange}
                  className="mt-2"
                  placeholder="Enter tags separated by commas"
                />
              ) : (
                <div className="flex flex-wrap gap-2 mt-2">
                  {note.tags.map((tag: string, index: number) => (
                    <Badge key={index} variant="secondary" className="bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300">
                      {tag}
                    </Badge>
                  ))}
                </div>
              )}
            </div>
            <div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white">Preview</h3>
              <div className="mt-2 border rounded-lg overflow-hidden dark:border-gray-700">
                {"pdf" === 'pdf' ? (
                  previewError ? (
                    <div className="flex flex-col items-center justify-center p-4 bg-gray-100 dark:bg-gray-700">
                      <FileText className="w-12 h-12 text-gray-400 dark:text-gray-500 mb-2" />
                      <p className="text-sm text-gray-500 dark:text-gray-400">Preview not available</p>
                      <Button variant="link" onClick={() => window.open(note.file_url, '_blank')} className="text-blue-600 dark:text-blue-400">
                        Open PDF
                      </Button>
                    </div>
                  ) : (
                    <canvas ref={canvasRef} className="max-w-full sm:max-w-sm md:max-w-md lg:max-w-lg h-auto" />
                  )
                ) : (
                  <img 
                    src={note.file_url} 
                    alt="Note preview" 
                    className="max-w-full h-auto"
                    onError={() => setPreviewError('Failed to load image preview')}
                  />
                )}
              </div>
              {previewError && (
                <Alert variant="destructive" className="mt-2">
                  <AlertCircle className="h-4 w-4" />
                  <AlertTitle>Preview Error</AlertTitle>
                  <AlertDescription>{previewError}</AlertDescription>
                </Alert>
              )}
            </div>
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Uploaded on: {new Date(note.createdAt).toLocaleDateString()}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Downloads: {note.downloads_count} | Likes: {note.likes_count}
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
                <Button onClick={handleDownload} className="bg-blue-600 hover:bg-blue-700 text-white w-full sm:w-auto">
                  <Download className="mr-2 h-4 w-4" />
                  Download
                </Button>
                <Button variant="outline" onClick={() => window.open(note.file_url, '_blank')} className="text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white w-full sm:w-auto">
                  <Eye className="mr-2 h-4 w-4" />
                  Full Preview
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
    </Suspense>
  )
}