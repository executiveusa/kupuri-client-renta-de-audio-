'use client'

import { motion } from 'framer-motion'
import { Navbar } from '@/components/layout/navbar'
import { Footer } from '@/components/layout/footer'

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-20">
        <section className="py-20 px-4 md:px-8">
          <div className="max-w-4xl mx-auto">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <h1 className="text-4xl font-bold mb-8">About Kupuri Audio</h1>
              <div className="prose prose-invert max-w-none space-y-6 text-text-secondary">
                <p>
                  Kupuri Audio is the premier audio equipment rental platform serving Mexico City's content creators, musicians, and audio professionals.
                </p>
                <p>
                  Founded in 2024, our mission is to make professional-grade audio equipment accessible and affordable for creators of all levels.
                </p>
                <h2 className="text-2xl font-bold text-white mt-8 mb-4">Our Values</h2>
                <ul className="space-y-2">
                  <li>• Quality equipment at competitive prices</li>
                  <li>• Fast, reliable delivery across CDMX</li>
                  <li>• Expert support and guidance</li>
                  <li>• Community-driven innovation</li>
                </ul>
              </div>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
