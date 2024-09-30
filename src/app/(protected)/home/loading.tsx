"use client"

import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"

export default function Loading() {
  return (
    <section className="flex flex-grow">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8 flex flex-col justify-center items-center">
          <Skeleton className="h-10 w-full max-w-md mb-4" />
          <Skeleton className="h-7 w-full max-w-lg mb-6" />
          <Skeleton className="h-9 w-full max-w-4xl mb-4" />
          <div className="flex w-full max-w-4xl gap-4">
            <Skeleton className="h-9 w-full max-w-md mb-2" />
            <Skeleton className="h-9 w-full max-w-md mb-2" />
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {[...Array(3)].map((_, index) => (
            <Card key={index} className="overflow-hidden dark:bg-gray-800">
              <CardHeader className="pb-4">
                <Skeleton className="h-6 w-3/4 mb-2" />
                <Skeleton className="h-4 w-1/2" />
              </CardHeader>
              <CardContent className="pb-4">
                <Skeleton className="h-32 w-full mb-4" />
                <Skeleton className="h-4 w-full mb-2" />
                <Skeleton className="h-4 w-5/6" />
              </CardContent>
              <CardFooter>
                <div className="flex justify-between items-center w-full">
                  <Skeleton className="h-10 w-24" />
                  <div className="flex space-x-2">
                    <Skeleton className="h-8 w-8 rounded-full" />
                    <Skeleton className="h-8 w-8 rounded-full" />
                  </div>
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}