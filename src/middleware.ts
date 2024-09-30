import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

import getOrCreateDB from '@/models/server/dbSetup'
import getOrCreateStorage from "@/models/server/storageSetup" 
import { getLoggedInUser } from '@/models/server/config'

let isDbInitialized = false
let isStorageInitialized = false

export async function middleware(req: NextRequest) {
  
  if (!isDbInitialized && !isStorageInitialized) {
    await Promise.all([
      getOrCreateDB(),
      getOrCreateStorage()
    ]);
    isDbInitialized = true;
    isStorageInitialized = true;
  }

  const url = req.nextUrl
  const user = await getLoggedInUser()
  
  const isLoginPage = url.pathname === "/login"
  const isRegisterPage = url.pathname === "/register"
  const isVerifyPage = url.pathname === "/verify"
  const isLandingPage = url.pathname === "/"
  

  if (!user && !isLoginPage && !isRegisterPage && !isVerifyPage && !isLandingPage) {
    return NextResponse.redirect(new URL("/login", url))
  }

  if (user && (isLoginPage || isRegisterPage || isVerifyPage)) {
    return NextResponse.redirect(new URL("/home", url))
  }

  return NextResponse.next()
}

export const config = {
  /* Match all request paths except for the ones that start with:
  - api
  - _next/static
  - _next/image
  - favicon.ico
  */
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
}