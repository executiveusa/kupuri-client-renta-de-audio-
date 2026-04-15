'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { Navbar } from '@/components/layout/navbar'
import { Footer } from '@/components/layout/footer'
import { useParams } from 'next/navigation'

interface Equipment {
  id: string
  name: string
  category: string
  description: string
  pricePerDay: number
  image: string
  available: number
  specs: string
  reviews: { rating: number }[]
}

export default function EquipmentDetailPage() {
  const params = useParams()
  const id = params.id as string
  const [equipment, setEquipment] = useState<Equipment | null>(null)
  const [loading, setLoading] = useState(true)
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')

  useEffect(() => {
    const fetchEquipment = async () => {
      try {
        const res = await fetch(`/api/equipment/${id}`)
        if (res.ok) {
          const data = await res.json()
          setEquipment(data)
        }
      } catch (error) {
        console.error('Failed to fetch equipment:', error)
      } finally {
        setLoading(false)
      }
    }

    if (id) fetchEquipment()
  }, [id])

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen pt-20 flex items-center justify-center">
          <p className="text-text-secondary">Loading equipment details...</p>
        </div>
        <Footer />
      </>
    )
  }

  if (!equipment) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen pt-20 flex flex-col items-center justify-center">
          <p className="text-text-secondary mb-4">Equipment not found</p>
          <Link href="/equipment" className="text-primary hover:underline">
            Back to catalog
          </Link>
        </div>
        <Footer />
      </>
    )
  }

  const avgRating = equipment.reviews.length > 0
    ? (equipment.reviews.reduce((sum, r) => sum + r.rating, 0) / equipment.reviews.length).toFixed(1)
    : null

  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-20">
        <section className="py-20 px-4 md:px-8">
          <div className="max-w-7xl mx-auto">
            <Link href="/equipment" className="text-primary hover:underline mb-8 inline-block">
              ← Back to equipment
            </Link>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-12"
            >
              {/* Image Section */}
              <div className="bg-bg-secondary rounded-xl h-96 flex items-center justify-center text-6xl">
                🎤
              </div>

              {/* Details Section */}
              <div>
                <span className="text-xs px-3 py-1 bg-primary/20 text-primary rounded-full">
                  {equipment.category}
                </span>
                
                <h1 className="text-4xl font-bold mt-6 mb-4">{equipment.name}</h1>
                
                {avgRating && (
                  <div className="flex items-center gap-2 mb-6">
                    <div className="flex text-yellow-400">
                      {[...Array(5)].map((_, i) => (
                        <span key={i}>{i < Math.round(Number(avgRating)) ? '★' : '☆'}</span>
                      ))}
                    </div>
                    <span className="text-text-secondary text-sm">
                      {avgRating} ({equipment.reviews.length} reviews)
                    </span>
                  </div>
                )}

                <p className="text-text-secondary text-lg mb-8">{equipment.description}</p>

                {equipment.specs && (
                  <div className="mb-8 pb-8 border-b border-bg-dark">
                    <h3 className="font-bold mb-4">Specifications</h3>
                    <p className="text-text-secondary whitespace-pre-wrap">{equipment.specs}</p>
                  </div>
                )}

                {/* Booking Form */}
                <div className="bg-bg-secondary p-8 rounded-xl">
                  <h3 className="font-bold text-xl mb-6">Rental Details</h3>
                  
                  <div className="space-y-4 mb-6">
                    <div>
                      <label className="block text-sm font-medium mb-2">Start Date</label>
                      <input
                        type="date"
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                        className="w-full px-4 py-2 bg-bg-dark border border-bg-dark rounded-lg text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">End Date</label>
                      <input
                        type="date"
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                        className="w-full px-4 py-2 bg-bg-dark border border-bg-dark rounded-lg text-white"
                      />
                    </div>
                  </div>

                  <div className="flex items-center justify-between mb-6 pb-6 border-b border-bg-dark">
                    <div>
                      <div className="text-sm text-text-secondary">Price per day</div>
                      <div className="text-2xl font-bold text-primary">${equipment.pricePerDay.toFixed(2)}</div>
                    </div>
                    {equipment.available > 0 ? (
                      <span className="text-green-400 font-semibold">{equipment.available} available</span>
                    ) : (
                      <span className="text-red-400 font-semibold">Out of stock</span>
                    )}
                  </div>

                  <button
                    disabled={equipment.available === 0}
                    className="w-full py-3 bg-primary text-white rounded-lg font-bold hover:opacity-90 transition disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Book Now
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
