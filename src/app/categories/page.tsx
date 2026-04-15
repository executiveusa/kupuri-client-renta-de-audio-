'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Navbar } from '@/components/layout/navbar'
import { Footer } from '@/components/layout/footer'

const categories = [
  { id: 'microphones', name: 'Microphones', emoji: '🎤', count: 45 },
  { id: 'cameras', name: 'Cameras', emoji: '📹', count: 28 },
  { id: 'lighting', name: 'Lighting', emoji: '💡', count: 67 },
  { id: 'stands', name: 'Stands & Rigs', emoji: '📐', count: 34 },
  { id: 'mixing', name: 'Mixing Console', emoji: '🎚️', count: 12 },
  { id: 'cables', name: 'Cables & Accessories', emoji: '🔌', count: 89 },
]

export default function CategoriesPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-20">
        <section className="py-20 px-4 md:px-8">
          <div className="max-w-6xl mx-auto">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-12">
              <h1 className="text-4xl font-bold mb-4">Equipment Categories</h1>
              <p className="text-text-secondary text-lg">Browse equipment by type</p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {categories.map((cat, i) => (
                <motion.div
                  key={cat.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                >
                  <Link href={`/equipment?category=${cat.id}`}>
                    <div className="p-8 bg-bg-secondary rounded-xl border border-bg-dark hover:border-primary transition cursor-pointer">
                      <div className="text-5xl mb-4">{cat.emoji}</div>
                      <h3 className="text-2xl font-bold mb-2">{cat.name}</h3>
                      <p className="text-primary font-semibold">{cat.count} items available</p>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
