"use client"

import React from 'react'
import Navbar from './Navbar'
import Footer from './Footer'
import BottomNavbar from './BottomNavbar'
import { useMediaQuery } from 'react-responsive'
import { usePathname } from 'next/navigation'

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const isMobile = useMediaQuery({ query: '(max-width: 426px)' })
  const path = usePathname()
  

  return (
    <div className={`min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900`}>
      {(!isMobile || path === "/") && <Navbar />}
      {children}
      {(!isMobile || path === "/") && <Footer />}
      {(isMobile && path !== "/") && <BottomNavbar />}
    </div>
  )
}
