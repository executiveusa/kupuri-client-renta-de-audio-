'use client'

import { motion } from 'framer-motion'
import { Navbar } from '@/components/layout/navbar'
import { Footer } from '@/components/layout/footer'

export default function TermsPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-20">
        <section className="py-20 px-4 md:px-8">
          <div className="max-w-4xl mx-auto">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <h1 className="text-4xl font-bold mb-8">Terms of Service</h1>
              <div className="prose prose-invert max-w-none space-y-6 text-text-secondary">
                <p>Last updated: April 2026</p>
                <h2 className="text-2xl font-bold text-white">1. Acceptance of Terms</h2>
                <p>By using Kupuri Audio, you agree to these terms of service.</p>
                <h2 className="text-2xl font-bold text-white">2. Equipment Rental</h2>
                <p>Equipment must be returned in the same condition as rented. Damage fees may apply.</p>
                <h2 className="text-2xl font-bold text-white">3. Liability</h2>
                <p>Kupuri Audio is not liable for any indirect damages resulting from equipment use.</p>
              </div>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
