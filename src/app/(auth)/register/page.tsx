"use client"

import React, { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { useToast } from "@/hooks/use-toast"
import { ToastAction } from "@/components/ui/toast"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Loader2 } from "lucide-react"

import { signupSchema } from "@/schemas/signupSchema"
import axios from "axios"
import { signInWithGoogle } from "@/models/server/oauth"

export default function RegisterPage() {
  const [loading, setLoading] = useState(false)

  const router = useRouter()
  const { toast } = useToast()
  

  const form = useForm<z.infer<typeof signupSchema>>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      username: "lorem_ipsum",
      email: "fakenhero01@gmail.com",
      password: "loremipsum",
    },
  })

  const onSubmit = async (data: z.infer<typeof signupSchema>) => {
    if (data.username === "" || data.email === "" || data.password === "") { 
      return;
    }

    setLoading(true)

    try {
      const {data: res} = await axios.post("/api/auth/register", data)

      if (!res?.error && res?.success) {
        router.replace(`/verify?user=${res.userId}`)
        toast({
          title: "Register Success!",
          description: "You have successfully registered, Redirecting pls wait..",
        })
      }
      else {
        toast({
          variant: "destructive",
          title: "Uh oh! Something went wrong.",
          description: res.error?.message || "Please check your credentials and try again",
          action: <ToastAction altText="Try again">Try again</ToastAction>,
        })
      }
    } catch (err: any) {
      console.log(err.message);
      
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: err?.message || "Please check your credentials and try again",
        action: <ToastAction altText="Try again">Try again</ToastAction>,
      })
    }

    setLoading(false)
  }

  return (
    <section className="flex flex-grow justify-center items-center">
      <Card className="mx-auto max-w-sm">
        <CardHeader>
          <CardTitle className="text-2xl">Register</CardTitle>
          <CardDescription>
            Enter your email below to register your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid gap-4">
                <div className="grid gap-2">
                  <FormField
                    name="username"
                    control={form.control}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Username</FormLabel>
                        <FormControl>
                          <Input type="textt" placeholder="NHero" min={5} max={16} {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="grid gap-2">
                  <FormField
                    name="email"
                    control={form.control}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input type="email" placeholder="nhero@nhero.tech" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="grid gap-2">
                  <FormField
                    name="password"
                    control={form.control}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Password</FormLabel>
                        <FormControl>
                          <Input type="password" placeholder="*****" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}  
                  />
                </div>
                <Button type="submit" disabled={loading} className="mt-2 w-full">
                  {loading ? 
                  <>
                    Registering
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    </> : "Register"}
                </Button>
              </div>
            </form>
          </Form>  
          <form className="mt-4" action={signInWithGoogle}>
            <Button variant="outline" className="w-full" >
              Login with Google
            </Button>
          </form>
          <div className="mt-4 text-center text-sm">
            Already have an account?{" "}
            <Link href="/login" className="underline">
              Login
            </Link>
          </div>
        </CardContent>
      </Card> 
    </section>
  )
}





    