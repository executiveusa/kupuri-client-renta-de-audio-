'use client'

import { motion } from 'framer-motion'
import { Navbar } from '@/components/layout/navbar'
import { Footer } from '@/components/layout/footer'

export default function PrivacyPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-20">
        <section className="py-20 px-4 md:px-8">
          <div className="max-w-4xl mx-auto">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <h1 className="text-4xl font-bold mb-8">Privacy Policy</h1>
              <div className="prose prose-invert max-w-none space-y-6 text-text-secondary">
                <p>Last updated: April 2026</p>
                <h2 className="text-2xl font-bold text-white">1. Information We Collect</h2>
                <p>We collect information you provide directly to us, such as when you create an account or make a booking.</p>
                <h2 className="text-2xl font-bold text-white">2. How We Use Your Information</h2>
                <p>We use your information to provide, maintain, and improve our services.</p>
                <h2 className="text-2xl font-bold text-white">3. Contact Us</h2>
                <p>If you have questions about this privacy policy, please contact us at info@kupriaudio.com</p>
              </div>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
