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
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"
import { ToastAction } from "@/components/ui/toast"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { loginSchema } from "@/schemas/loginSchema"
import { Loader2 } from "lucide-react"

import { useAuthStore } from '@/store/Auth'

export default function Login() {
  const { login, loginWithGoogle } = useAuthStore()
  const [loading, setLoading] = useState(false)

  const router = useRouter()
  const { toast } = useToast()

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      identifier: "",
      password: "",
    },
  })

  const handleGoogleLogin = async () => {
    console.log("Calling loginWithGoogle:", "http://localhost:3000/", "http://localhost:3000/login");
    await loginWithGoogle();
  };

  const onSubmit = async(data: z.infer<typeof loginSchema>) => {
    if (data.identifier === "" || data.password === "") { 
      return;
    }

    setLoading(true)

    try {
      const res = await login(data.identifier, data.password)
      console.log(res);
      

      if (!res?.error) {
        router.replace("/")
        toast({
          title: "Login Success!",
          description: "You have successfully logged in",
        })
      }
      else {
        toast({
          variant: "destructive",
          title: "Uh oh! Something went wrong.",
          description: "Please check your credentials and try again",
          action: <ToastAction altText="Try again">Try again</ToastAction>,
        })
      }
    } catch (err: any) {
      console.log(err.message);
      
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: "Please check your credentials and try again",
        action: <ToastAction altText="Try again">Try again</ToastAction>,
      })
    }

    setLoading(false)
  }

  return (
    <section className="flex justify-center items-center h-screen ">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <Card className="mx-auto max-w-sm">
            <CardHeader>
              <CardTitle className="text-2xl">Login</CardTitle>
              <CardDescription>
                Enter your email below to login to your account
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                <div className="grid gap-2">
                  <FormField
                    name="identifier"
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
                    Loging In
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  </> : "Login"}
                </Button>
                <Button variant="outline" className="w-full" onClick={handleGoogleLogin}>
                  Login with Google
                </Button>
              </div>
              <div className="mt-4 text-center text-sm">
                Don&apos;t have an account?{" "}
                <Link href="#" className="underline">
                  Sign up
                </Link>
              </div>
            </CardContent>
          </Card> 
        </form>
      </Form>  
    </section>
  )
}





    