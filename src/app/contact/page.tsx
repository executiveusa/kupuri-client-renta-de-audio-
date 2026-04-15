'use client'

import { motion } from 'framer-motion'
import { Navbar } from '@/components/layout/navbar'
import { Footer } from '@/components/layout/footer'

export default function ContactPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-20">
        <section className="py-20 px-4 md:px-8">
          <div className="max-w-4xl mx-auto">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <h1 className="text-4xl font-bold mb-8">Contact Us</h1>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-bold mb-4">Get in Touch</h3>
                  <div className="space-y-4 text-text-secondary">
                    <p>Email: <a href="mailto:info@kupriaudio.com" className="text-primary hover:underline">info@kupriaudio.com</a></p>
                    <p>Phone: <a href="tel:+525555555555" className="text-primary hover:underline">+52 55 5555 5555</a></p>
                    <p>Location: Mexico City, CDMX</p>
                  </div>
                </div>
                <form className="space-y-4">
                  <input type="email" placeholder="Your email" className="w-full px-4 py-2 bg-bg-secondary border border-bg-dark rounded-lg text-white" />
                  <textarea placeholder="Your message" rows={4} className="w-full px-4 py-2 bg-bg-secondary border border-bg-dark rounded-lg text-white"></textarea>
                  <button type="submit" className="w-full py-2 bg-primary text-white rounded-lg font-semibold hover:opacity-90 transition">
                    Send Message
                  </button>
                </form>
              </div>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
