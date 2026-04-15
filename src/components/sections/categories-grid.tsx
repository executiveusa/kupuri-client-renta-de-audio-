'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'

const categories = [
  {
    id: 'microphones',
    name: 'Microphones',
    description: 'Condenser, Dynamic, Ribbon microphones for every recording style',
    icon: '🎤',
  },
  {
    id: 'cameras',
    name: 'Cameras',
    description: '4K, 8K cinema and professional video cameras',
    icon: '📹',
  },
  {
    id: 'lighting',
    name: 'Lighting',
    description: 'LED, HMI, Softbox and ring lights for professional production',
    icon: '💡',
  },
  {
    id: 'stands',
    name: 'Stands & Rigs',
    description: 'Boom stands, C-stands, tripods and mounting solutions',
    icon: '📐',
  },
  {
    id: 'mixing',
    name: 'Mixing Console',
    description: 'Digital and analog mixing boards for live and studio',
    icon: '🎚️',
  },
  {
    id: 'cables',
    name: 'Cables & Accessories',
    description: 'Professional grade XLR, USB and specialty audio cables',
    icon: '🔌',
  },
]

export function CategoriesGrid() {
  return (
    <section className="py-20 px-4 md:px-8 bg-bg-secondary/50">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-4">Browse by Category</h2>
          <p className="text-text-secondary text-lg">
            Find exactly what you need for your next project
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category, index) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5 }}
            >
              <Link href={`/equipment?category=${category.id}`}>
                <div className="p-6 bg-bg-dark rounded-xl border border-bg-secondary hover:border-primary transition cursor-pointer">
                  <div className="text-4xl mb-4">{category.icon}</div>
                  <h3 className="text-xl font-bold mb-2">{category.name}</h3>
                  <p className="text-text-secondary text-sm">{category.description}</p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
