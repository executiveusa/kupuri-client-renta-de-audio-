'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'

export function Navbar() {
  return (
    <motion.nav 
      className="fixed top-0 w-full bg-bg-dark/80 backdrop-blur-md z-50 border-b border-bg-secondary"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 font-bold text-xl">
          <div className="w-8 h-8 bg-primary rounded-lg"></div>
          Kupuri Audio
        </Link>

        <div className="flex items-center gap-8">
          <Link href="/equipment" className="text-text-secondary hover:text-primary transition">
            Equipment
          </Link>
          <Link href="/bookings" className="text-text-secondary hover:text-primary transition">
            My Bookings
          </Link>
          <Link 
            href="/login" 
            className="px-4 py-2 bg-primary rounded-lg text-white hover:opacity-90 transition"
          >
            Sign In
          </Link>
        </div>
      </div>
    </motion.nav>
  )
}
