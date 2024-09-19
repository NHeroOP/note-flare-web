'use client'

import { useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { useTheme } from 'next-themes'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Moon, Sun, Book, Download, ThumbsUp, FileText, Edit, Trash2, Camera } from 'lucide-react'

// Mock data (unchanged)
const userData = {
  id: '1',
  name: 'John Doe',
  avatar: 'https://i.pravatar.cc/150?u=john.doe@example.com',
  tagline: 'Passionate student | Physics enthusiast | Always learning',
  notesUploaded: 15,
  totalDownloads: 1200,
  totalLikes: 350,
}

const userNotes = [
  { id: '1', title: 'Quantum Mechanics Basics', subject: 'Physics', downloads: 250, likes: 80, date: '2023-06-01' },
  { id: '2', title: 'Introduction to Calculus', subject: 'Mathematics', downloads: 180, likes: 65, date: '2023-05-15' },
  { id: '3', title: 'Organic Chemistry Fundamentals', subject: 'Chemistry', downloads: 200, likes: 70, date: '2023-05-28' },
]

const recentActivity = [
  { id: '1', type: 'upload', content: 'Uploaded "Advanced Thermodynamics"', date: '2023-06-10' },
  { id: '2', type: 'download', content: 'Your note "Quantum Mechanics Basics" was downloaded 50 times', date: '2023-06-09' },
  { id: '3', type: 'like', content: 'Your note "Introduction to Calculus" received 20 new likes', date: '2023-06-08' },
  { id: '4', type: 'comment', content: 'New comment on "Organic Chemistry Fundamentals"', date: '2023-06-07' },
]

export default function ProfilePage() {
  const { userId } = useParams()
  const router = useRouter()
  const { theme, setTheme } = useTheme()
  const [isEditing, setIsEditing] = useState(false)
  const [editedTagline, setEditedTagline] = useState(userData.tagline)
  const [avatar, setAvatar] = useState(userData.avatar)

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light')
  }

  const handleEditProfile = () => {
    setIsEditing(true)
  }

  const handleSaveProfile = () => {
    userData.tagline = editedTagline
    userData.avatar = avatar
    setIsEditing(false)
  }

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setAvatar(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleDeleteNote = (noteId: string) => {
    console.log(`Deleting note with id: ${noteId}`)
  }

  return (
    <main className="container mx-auto px-4 py-8 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <div className="max-w-4xl mx-auto">
        <Card className="mb-8 bg-white dark:bg-gray-800">
          <CardHeader className="flex flex-col items-center sm:flex-row sm:items-start gap-4">
            <div className="relative">
              <Avatar className="w-24 h-24">
                <AvatarImage src={avatar} alt={userData.name} />
                <AvatarFallback>{userData.name.charAt(0)}</AvatarFallback>
              </Avatar>
              {isEditing && (
                <label htmlFor="avatar-upload" className="absolute bottom-0 right-0 bg-primary text-primary-foreground rounded-full p-1 cursor-pointer">
                  <Camera className="h-4 w-4" />
                  <input
                    id="avatar-upload"
                    type="file"
                    className="hidden"
                    onChange={handleAvatarChange}
                    accept="image/*"
                  />
                </label>
              )}
            </div>
            <div className="flex-grow text-center sm:text-left">
              <CardTitle className="text-2xl mb-2">{userData.name}</CardTitle>
              {isEditing ? (
                <Input
                  value={editedTagline}
                  onChange={(e) => setEditedTagline(e.target.value)}
                  className="mb-4"
                />
              ) : (
                <CardDescription className="mb-4">{userData.tagline}</CardDescription>
              )}
              <div className="flex flex-wrap justify-center sm:justify-start gap-2">
                <Badge variant="secondary" className="flex items-center bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-300">
                  <FileText className="mr-1 h-4 w-4" />
                  {userData.notesUploaded} Notes
                </Badge>
                <Badge variant="secondary" className="flex items-center bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-300">
                  <Download className="mr-1 h-4 w-4" />
                  {userData.totalDownloads} Downloads
                </Badge>
                <Badge variant="secondary" className="flex items-center bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-300">
                  <ThumbsUp className="mr-1 h-4 w-4" />
                  {userData.totalLikes} Likes
                </Badge>
              </div>
            </div>
            <div className="mt-4 sm:mt-0">
              {isEditing ? (
                <Button onClick={handleSaveProfile}>Save Profile</Button>
              ) : (
                <Button variant="outline" onClick={handleEditProfile} className="bg-white hover:bg-gray-100 text-gray-800 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-gray-100">
                  <Edit className="mr-2 h-4 w-4" />
                  Edit Profile
                </Button>
              )}
            </div>
          </CardHeader>
        </Card>

        <Tabs defaultValue="notes" className="mb-8">
          <TabsList className="mb-4 bg-white dark:bg-gray-800 w-full justify-start">
            <TabsTrigger value="notes" className="flex-1 data-[state=active]:bg-gray-200 data-[state=active]:dark:bg-gray-700">My Notes</TabsTrigger>
            <TabsTrigger value="activity" className="flex-1 data-[state=active]:bg-gray-200 data-[state=active]:dark:bg-gray-700">Recent Activity</TabsTrigger>
          </TabsList>
          <TabsContent value="notes">
            <div className="grid gap-6 sm:grid-cols-2">
              {userNotes.map((note) => (
                <Card key={note.id} className="bg-white dark:bg-gray-800">
                  <CardHeader>
                    <CardTitle className="text-lg">{note.title}</CardTitle>
                    <CardDescription>{note.subject}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      Uploaded on: {new Date(note.date).toLocaleDateString()}
                    </div>
                  </CardContent>
                  <CardFooter className="flex flex-wrap justify-between gap-2">
                    <div className="flex flex-wrap gap-2">
                      <Badge variant="secondary" className="flex items-center bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-300">
                        <Download className="mr-1 h-4 w-4" />
                        {note.downloads}
                      </Badge>
                      <Badge variant="secondary" className="flex items-center bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-300">
                        <ThumbsUp className="mr-1 h-4 w-4" />
                        {note.likes}
                      </Badge>
                    </div>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="destructive" size="sm">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Are you sure you want to delete this note?</DialogTitle>
                          <DialogDescription>
                            This action cannot be undone. This will permanently delete your note.
                          </DialogDescription>
                        </DialogHeader>
                        <DialogFooter>
                          <Button variant="outline" onClick={() => {}}>Cancel</Button>
                          <Button variant="destructive" onClick={() => handleDeleteNote(note.id)}>Delete</Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>
          <TabsContent value="activity">
            <Card className="dark:bg-black/50">
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-4">
                  {recentActivity.map((activity) => (
                    <li key={activity.id} className="flex flex-col sm:flex-row sm:items-center gap-2">
                      <Badge variant="outline">{activity.type}</Badge>
                      <span className="text-sm">{activity.content}</span>
                      <span className="text-xs text-gray-500 sm:ml-auto">{new Date(activity.date).toLocaleDateString()}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </main>
  )
}