'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Navbar } from '@/components/layout/navbar'
import { Footer } from '@/components/layout/footer'

export default function BookingsPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-20">
        <section className="py-20 px-4 md:px-8">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-12"
            >
              <h1 className="text-4xl font-bold mb-4">My Bookings</h1>
              <p className="text-text-secondary text-lg">
                Track and manage your equipment rentals
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="bg-bg-secondary rounded-xl p-12 text-center"
            >
              <p className="text-text-secondary text-lg mb-6">
                You don't have any bookings yet. 
              </p>
              <Link
                href="/equipment"
                className="inline-block px-8 py-3 bg-primary text-white rounded-lg font-semibold hover:opacity-90 transition"
              >
                Browse Equipment
              </Link>
            </motion.div>

            {/* Booking status legend */}
            <div className="mt-16 grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="p-4 bg-bg-secondary rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                  <span className="font-semibold">Pending</span>
                </div>
                <p className="text-text-secondary text-sm">Awaiting confirmation</p>
              </div>
              <div className="p-4 bg-bg-secondary rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                  <span className="font-semibold">Confirmed</span>
                </div>
                <p className="text-text-secondary text-sm">Ready for pickup</p>
              </div>
              <div className="p-4 bg-bg-secondary rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-3 h-3 bg-blue-400 rounded-full"></div>
                  <span className="font-semibold">In Progress</span>
                </div>
                <p className="text-text-secondary text-sm">Rental active</p>
              </div>
              <div className="p-4 bg-bg-secondary rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-3 h-3 bg-gray-400 rounded-full"></div>
                  <span className="font-semibold">Completed</span>
                </div>
                <p className="text-text-secondary text-sm">Rental finished</p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
