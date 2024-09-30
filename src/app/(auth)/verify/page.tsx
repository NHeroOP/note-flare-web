'use client'

import { useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Book, AlertCircle, CheckCircle2 } from 'lucide-react'
import axios from 'axios'
import { useToast } from '@/hooks/use-toast'

export default function VerifyAccountPage() {
  const router = useRouter()
  const searchParams = useSearchParams()

  const [mounted, setMounted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [verificationCode, setVerificationCode] = useState('')
  const [isVerifying, setIsVerifying] = useState(false)
  const [error, setError] = useState('')
  const [isVerified, setIsVerified] = useState(false)

  const [counter, setCounter] = useState(30)
  const toast = useToast()

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsVerifying(true)
    setError('')

    try {
      // Simulating API call to verify the code
      const { data: res } = await axios.post("/api/auth/verify", { verificationCode, userId: searchParams.get("user") })

      if (res.success) {
        setIsVerified(true)
        router.replace('/login')

      } else {
        setError(res.error)
      }

    } catch (err) {
      setError('An error occurred. Please try again later.')
    } finally {
      setIsVerifying(false)
    }
  }

  const handleResendCode = async () => {
    setError('')
    // Simulating API call to resend verification code
    await axios.post("/api/auth/verify/resend", { userId: searchParams.get("user") })
    setCounter(30)
    alert('A new verification code has been sent to your email.')
  }

  useEffect(() => {
    if (!searchParams.has("user")) {
      setError('Invalid verification link. Please try again.')
    }

    if (searchParams.has("verifyToken")) {
      setVerificationCode(searchParams.get("verifyToken") as string)
    }

    setMounted(true)
  }, [])

  useEffect(() => {
    counter > 0 && setTimeout(() => setCounter(counter - 1), 1000);
  }, [counter]);

  if (!mounted) {
    return (
      <div className="h-full flex flex-grow justify-center items-center">
        <span className="loading loading-bars w-48"></span>
      </div>
    )
  }
  

  return (
    <div className="h-full bg-gray-100 flex flex-grow flex-col justify-center items-center p-4 dark:bg-gray-800">
      <Card className="w-full max-w-md dark:bg-gray-900/70">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">Verify Your Account</CardTitle>
          <CardDescription className="text-center">
            We've sent a verification code to your email. Please enter it below.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {isVerified ? (
            <Alert className="mb-4">
              <CheckCircle2 className="h-4 w-4" />
              <AlertTitle>Success!</AlertTitle>
              <AlertDescription>
                Your account has been verified. Redirecting you to the homepage...
              </AlertDescription>
            </Alert>
          ) : (
            <form onSubmit={handleVerify}>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="verificationCode">Verification Code</Label>
                  <Input
                    id="verificationCode"
                    placeholder="Enter your 6-digit code"
                    value={verificationCode}
                    onChange={(e) => setVerificationCode(e.target.value)}
                    required
                    disabled={error ? true : false}
                  />
                </div>
                {error && (
                  <Alert variant="destructive">
                    <AlertCircle className="h-4 w-4" />
                    <AlertTitle>Error</AlertTitle>
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}
                <Button type="submit" className="w-full" disabled={isVerifying || (error ? true : false)}>
                  {isVerifying ? 'Verifying...' : 'Verify Account'}
                </Button>
              </div>
            </form>
          )}
        </CardContent>
        <CardFooter className="flex justify-center">
          <div>{counter !== 0 && counter}</div>
          <Button variant="link" onClick={handleResendCode} disabled={isVerifying || isVerified || (error ? true : false) || counter !== 0}>
            Resend verification code
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}