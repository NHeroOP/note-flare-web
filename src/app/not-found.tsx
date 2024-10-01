import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { Book, AlertCircle } from 'lucide-react'
import { Layout } from '@/components'

export default function NotFound() {
  return (
    <Layout>
      <section className="flex flex-grow items-center justify-center">
        <div className="h-full bg-background dark:bg-gray-900 flex flex-col items-center justify-center p-4">
          <Link href="/" className="mb-8 text-2xl font-bold text-primary flex items-center">
            <Book className="mr-2 h-6 w-6" />
            NotesFlare
          </Link>
          <div className="text-center space-y-4">
            <AlertCircle className="mx-auto h-12 w-12 text-destructive" />
            <h1 className="text-4xl font-bold text-foreground">404 - Page Not Found</h1>
            <p className="text-xl text-muted-foreground">Oops! The page you're looking for doesn't exist.</p>
            <p className="text-muted-foreground">
              It might have been moved or deleted, or you may have mistyped the URL.
            </p>
          </div>
          <div className="mt-8 space-x-4">
            <Button asChild>
              <Link href="/home">Go to Homepage</Link>
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  )
}