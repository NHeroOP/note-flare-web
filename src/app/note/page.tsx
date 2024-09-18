'use client'

import { useState, useEffect, useRef } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { useTheme } from 'next-themes'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { AlertCircle, Download, Edit, Eye, FileText } from 'lucide-react'
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import * as pdfjs from 'pdfjs-dist'

// Ensure PDF.js worker is set up correctly
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`

// Mock function to fetch note data
const fetchNoteData = async (noteId: string) => {
  // Simulating API call
  await new Promise(resolve => setTimeout(resolve, 1000))
  return {
    id: noteId,
    title: 'Sample Note Title',
    subject: 'Physics',
    description: 'This is a sample note description. It covers various topics in physics, including mechanics and thermodynamics.',
    tags: ['physics', 'mechanics', 'thermodynamics'],
    fileUrl: '/sample-note.pdf', // This could be either a PDF or an image URL
    fileType: 'pdf', // or 'image'
    uploadDate: '2023-06-15',
    downloads: 150,
    likes: 75,
  }
}

export default function NotePage() {
  const params = useParams()
  const router = useRouter()
  const noteId = params.noteId as string
  const { theme, setTheme } = useTheme()

  const [note, setNote] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')
  const [previewError, setPreviewError] = useState('')
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const loadNote = async () => {
      try {
        const data = await fetchNoteData(noteId)
        setNote(data)
        setIsLoading(false)
        if (data.fileType === 'pdf') {
          renderPdfPreview(data.fileUrl)
        }
      } catch (err) {
        setError('Failed to load note data')
        setIsLoading(false)
      }
    }
    loadNote()
  }, [noteId])

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
      await page.render(renderContext).promise
    } catch (err) {
      console.error('Error rendering PDF:', err)
      setPreviewError('Failed to render PDF preview')
    }
  }

  const handleDownload = () => {
    // In a real application, this would trigger the file download
    console.log('Downloading file:', note.fileUrl)
  }

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light')
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
    <>
      <main className="flex-grow container mx-auto px-4 py-8 ">
        <Card className="max-w-4xl mx-auto bg-white dark:bg-gray-800">
          <CardHeader>
            <div className="flex justify-between items-start">
              <div>
                <CardTitle className="text-2xl font-bold text-gray-900 dark:text-white">{note.title}</CardTitle>
                <CardDescription className="mt-1 text-sm text-gray-600 dark:text-gray-400">{note.subject}</CardDescription>
              </div>
              <Button variant="outline" onClick={() => router.push(`/notes/${noteId}/edit`)}>
                <Edit className="mr-2 h-4 w-4" />
                Edit
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white">Description</h3>
              <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">{note.description}</p>
            </div>
            <div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white">Tags</h3>
              <div className="flex flex-wrap gap-2 mt-2">
                {note.tags.map((tag: string, index: number) => (
                  <Badge key={index} variant="secondary" className="bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
            <div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white">Preview</h3>
              <div className="mt-2 border rounded-lg overflow-hidden dark:border-gray-700">
                {note.fileType === 'pdf' ? (
                  previewError ? (
                    <div className="flex flex-col items-center justify-center p-4 bg-gray-100 dark:bg-gray-700">
                      <FileText className="w-12 h-12 text-gray-400 dark:text-gray-500 mb-2" />
                      <p className="text-sm text-gray-500 dark:text-gray-400">Preview not available</p>
                      <Button variant="link" onClick={() => window.open(note.fileUrl, '_blank')} className="text-blue-600 dark:text-blue-400">
                        Open PDF
                      </Button>
                    </div>
                  ) : (
                    <canvas ref={canvasRef} className="max-w-full h-auto" />
                  )
                ) : (
                  <img 
                    src={note.fileUrl} 
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
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Uploaded on: {new Date(note.uploadDate).toLocaleDateString()}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Downloads: {note.downloads} | Likes: {note.likes}
                </p>
              </div>
              <div className="flex space-x-2">
                <Button onClick={handleDownload} className="bg-blue-600 hover:bg-blue-700 text-white">
                  <Download className="mr-2 h-4 w-4" />
                  Download
                </Button>
                <Button variant="outline" onClick={() => window.open(note.fileUrl, '_blank')} className="text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white">
                  <Eye className="mr-2 h-4 w-4" />
                  Full Preview
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
    </>
  )
}