'use client'

import { motion } from 'framer-motion'
import { Navbar } from '@/components/layout/navbar'
import { Footer } from '@/components/layout/footer'

export default function PricingPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-20">
        <section className="py-20 px-4 md:px-8">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center mb-16"
            >
              <h1 className="text-4xl font-bold mb-4">Pricing</h1>
              <p className="text-text-secondary text-lg">
                Transparent, flexible pricing for your audio rental needs
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { name: 'Basic', price: '$20', desc: 'Entry-level audio equipment' },
                { name: 'Pro', price: '$50', desc: 'Professional grade equipment', featured: true },
                { name: 'Studio', price: '$100+', desc: 'Full studio setup' },
              ].map((plan, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className={`p-8 rounded-xl border ${
                    plan.featured
                      ? 'bg-primary/20 border-primary'
                      : 'bg-bg-secondary border-bg-dark'
                  }`}
                >
                  <h3 className="text-xl font-bold mb-2">{plan.name}</h3>
                  <div className="text-3xl font-bold text-primary mb-2">{plan.price}</div>
                  <p className="text-text-secondary text-sm mb-6">{plan.desc}</p>
                  <button className="w-full py-2 bg-primary text-white rounded-lg font-semibold hover:opacity-90 transition">
                    Get Started
                  </button>
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
