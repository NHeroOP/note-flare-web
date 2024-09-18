"use client"

import Link from 'next/link'
import React from 'react'

export default function Footer() {
  return (
    <footer className="bg-white border-t dark:bg-gray-900 dark:border-gray-800">
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p className="text-sm text-gray-600 dark:text-gray-400">© {new Date().getFullYear()} Notes Flare. All rights reserved.</p>
          </div>
          <nav className="flex space-x-4">
            <Link href="/about" className="text-sm text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100">
              About
            </Link>
            <Link href="/privacy" className="text-sm text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100">
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-sm text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100">
              Terms of Service
            </Link>
            <Link href="/contact" className="text-sm text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100">
              Contact Us
            </Link>
          </nav>
        </div>
      </div>
    </footer>
  )
}
