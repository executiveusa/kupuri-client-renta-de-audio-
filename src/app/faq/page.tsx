'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Navbar } from '@/components/layout/navbar'
import { Footer } from '@/components/layout/footer'

const faqs = [
  {
    q: 'How long can I rent equipment?',
    a: 'You can rent equipment for as long as you need, from a single day to several weeks. Longer rentals may be eligible for discounts.',
  },
  {
    q: 'What is your delivery policy?',
    a: 'We offer 24-hour delivery across Mexico City. Rush delivery is available for an additional fee.',
  },
  {
    q: 'Do you provide technical support?',
    a: 'Yes! Our team is available via phone and email to help with setup and troubleshooting.',
  },
  {
    q: 'What if equipment is damaged?',
    a: 'Damage is covered under our rental agreement. Normal wear is covered; intentional damage may incur fees.',
  },
]

export default function FAQPage() {
  const [openId, setOpenId] = useState<number | null>(null)

  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-20">
        <section className="py-20 px-4 md:px-8">
          <div className="max-w-2xl mx-auto">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-12">
              <h1 className="text-4xl font-bold mb-4">Frequently Asked Questions</h1>
              <p className="text-text-secondary">Find answers to common questions about Kupuri Audio rentals</p>
            </motion.div>

            <div className="space-y-4">
              {faqs.map((faq, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-bg-secondary rounded-lg border border-bg-dark overflow-hidden"
                >
                  <button
                    onClick={() => setOpenId(openId === i ? null : i)}
                    className="w-full p-6 flex items-center justify-between hover:bg-bg-dark/50 transition"
                  >
                    <span className="text-lg font-semibold text-left">{faq.q}</span>
                    <span className="text-primary text-xl">{openId === i ? '−' : '+'}</span>
                  </button>
                  {openId === i && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="px-6 py-4 border-t border-bg-dark text-text-secondary"
                    >
                      {faq.a}
                    </motion.div>
                  )}
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
