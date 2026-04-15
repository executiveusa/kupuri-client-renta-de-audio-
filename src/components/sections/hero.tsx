'use client'

import { motion } from 'framer-motion'

export function HeroSection() {
  return (
    <section className="min-h-screen flex items-center justify-center px-4 md:px-8 pt-20">
      <div className="max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Professional Audio Equipment
          </h1>
          
          <p className="text-xl md:text-2xl text-text-secondary mb-8">
            Rent premium audio gear for your next project. Fast delivery across Mexico City.
          </p>
          
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="flex flex-col md:flex-row gap-4 justify-center"
          >
            <button className="px-8 py-4 bg-primary text-white rounded-lg font-semibold hover:opacity-90 transition">
              Browse Catalog
            </button>
            <button className="px-8 py-4 border border-primary text-primary rounded-lg font-semibold hover:bg-primary/10 transition">
              Learn More
            </button>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="mt-16 grid grid-cols-3 gap-8 text-center"
        >
          <div>
            <div className="text-3xl font-bold text-primary">500+</div>
            <p className="text-text-secondary">Equipment Items</p>
          </div>
          <div>
            <div className="text-3xl font-bold text-accent">1000+</div>
            <p className="text-text-secondary">Happy Customers</p>
          </div>
          <div>
            <div className="text-3xl font-bold text-primary">24h</div>
            <p className="text-text-secondary">Fast Delivery</p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
