"use client"

import React, { ReactNode } from 'react'
import Navbar from './Navbar'
import Footer from './Footer'
import { useTheme } from 'next-themes'

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { theme } = useTheme()

  return (
    <div className={`min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900`}>
      <Navbar  />
      {children}
      <Footer />
    </div>
  )
}
