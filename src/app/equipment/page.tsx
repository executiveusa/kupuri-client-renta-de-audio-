'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { Navbar } from '@/components/layout/navbar'
import { Footer } from '@/components/layout/footer'

interface Equipment {
  id: string
  name: string
  category: string
  description: string
  pricePerDay: number
  image: string
  available: number
}

export default function EquipmentPage() {
  const [equipment, setEquipment] = useState<Equipment[]>([])
  const [category, setCategory] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchEquipment = async () => {
      const params = new URLSearchParams(window.location.search)
      const cat = params.get('category')
      setCategory(cat)

      try {
        const url = new URL('/api/equipment', window.location.origin)
        if (cat) url.searchParams.set('category', cat)
        
        const res = await fetch(url)
        const data = await res.json()
        setEquipment(data)
      } catch (error) {
        console.error('Failed to fetch equipment:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchEquipment()
  }, [])

  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-20">
        <section className="py-20 px-4 md:px-8">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-12"
            >
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                {category ? `${category.charAt(0).toUpperCase() + category.slice(1)} Equipment` : 'All Equipment'}
              </h1>
              <p className="text-text-secondary text-lg">
                Browse our full catalog of professional audio equipment for rent
              </p>
            </motion.div>

            {loading ? (
              <div className="text-center py-12">
                <p className="text-text-secondary">Loading equipment...</p>
              </div>
            ) : equipment.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {equipment.map((item, index) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ y: -5 }}
                  >
                    <Link href={`/equipment/${item.id}`}>
                      <div className="bg-bg-secondary rounded-xl overflow-hidden border border-bg-dark hover:border-primary transition cursor-pointer h-full flex flex-col">
                        {item.image && (
                          <div className="w-full h-48 bg-bg-dark">
                            {/* Image placeholder */}
                            <div className="w-full h-full flex items-center justify-center text-4xl">🎤</div>
                          </div>
                        )}
                        <div className="p-6 flex-1 flex flex-col justify-between">
                          <div>
                            <span className="text-xs px-3 py-1 bg-primary/20 text-primary rounded-full">
                              {item.category}
                            </span>
                            <h3 className="text-xl font-bold mt-4 mb-2">{item.name}</h3>
                            <p className="text-text-secondary text-sm mb-4">{item.description}</p>
                          </div>
                          <div className="flex items-center justify-between pt-4 border-t border-bg-dark">
                            <div className="text-2xl font-bold text-primary">${item.pricePerDay.toFixed(2)}</div>
                            <span className="text-sm text-text-secondary">/day</span>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-text-secondary text-lg mb-4">No equipment available in this category yet.</p>
                <Link href="/" className="text-primary hover:underline">
                  Back to home
                </Link>
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
