import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

import getOrCreateDB from '@/models/server/dbSetup'
import getOrCreateStorage from "@/models/server/storageSetup" 
import { getLoggedInUser } from './models/server/config'

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

  const user = await getLoggedInUser()
  
  const isLoginPage = req.nextUrl.pathname === "/login"
  const isRegisterPage = req.nextUrl.pathname === "/register"

  if (!user && !isLoginPage && !isRegisterPage) {  

    const url = req.nextUrl.clone()
    url.pathname = "/login"
    return NextResponse.redirect(url)
  }

  if (user && (isLoginPage || isRegisterPage)) {
    
    const url = req.nextUrl.clone()
    url.pathname = "/home"
    return NextResponse.redirect(url)
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