'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

interface TextContent {
  headline: { es: string; en: string }
  subheadline: { es: string; en: string }
  btnEnter: { es: string; en: string }
  btnDiscover: { es: string; en: string }
  scrollHint: { es: string; en: string }
  formTitle: { es: string; en: string }
  formDesc: { es: string; en: string }
  eventType1: { es: string; en: string }
  eventType2: { es: string; en: string }
  eventType3: { es: string; en: string }
  inputName: { es: string; en: string }
  inputEmail: { es: string; en: string }
  inputNeeds: { es: string; en: string }
  btnSubmit: { es: string; en: string }
  closeHint: { es: string; en: string }
  successMsg: { es: string; en: string }
}

const content: TextContent = {
  headline: {
    es: 'Haz que tu evento sea un espectáculo',
    en: 'Make your event unforgettable',
  },
  subheadline: {
    es: 'Audio, iluminación y producción que transforman cualquier lugar en una experiencia premium.',
    en: 'Audio, lighting, and production that transform any space into a premium experience.',
  },
  btnEnter: { es: 'Entrar', en: 'Enter' },
  btnDiscover: { es: 'Descubrir propuesta', en: 'Discover proposal' },
  scrollHint: {
    es: 'Necesitas audio o iluminación para tu evento',
    en: 'Need audio or lighting for your event',
  },
  formTitle: { es: 'Cuéntanos sobre tu evento', en: 'Tell us about your event' },
  formDesc: {
    es: 'Comparte lo esencial. Responderemos en 24h.',
    en: "Share the essentials. We'll respond within 24h.",
  },
  eventType1: { es: 'Fiesta grande', en: 'Big party' },
  eventType2: { es: 'Concierto', en: 'Concert' },
  eventType3: { es: 'Corporativo', en: 'Corporate' },
  inputName: { es: 'Tu nombre', en: 'Your name' },
  inputEmail: { es: 'Tu correo', en: 'Your email' },
  inputNeeds: { es: 'Qué necesitas', en: 'What you need' },
  btnSubmit: { es: 'Solicitar cotización', en: 'Request quote' },
  closeHint: { es: 'Presiona ESC para cerrar', en: 'Press ESC to close' },
  successMsg: { es: '¡Solicitud enviada!', en: 'Request submitted!' },
}

export default function DOS2ALanding() {
  const [lang, setLang] = useState<'es' | 'en'>('es')
  const [showModal, setShowModal] = useState(false)
  const [formData, setFormData] = useState({ name: '', email: '', eventType: '', needs: '' })

  // Close modal on ESC
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setShowModal(false)
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const subject = encodeURIComponent(
      `Solicitud de evento: ${formData.eventType} - ${formData.name}`
    )
    const body = encodeURIComponent(
      `Hola DOS2A,\n\nNombre: ${formData.name}\nEmail: ${formData.email}\nTipo de evento: ${formData.eventType}\nNecesidades: ${formData.needs}\n\nGracias.`
    )
    window.location.href = `mailto:2audioiluminacion@gmail.com?subject=${subject}&body=${body}`
    setShowModal(false)
    setFormData({ name: '', email: '', eventType: '', needs: '' })
  }

  const t = (key: keyof TextContent) => content[key][lang]

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-[#0a0e18] to-[#0f1628] text-white overflow-hidden relative">
      {/* Grid overlay */}
      <div
        className="fixed inset-0 pointer-events-none z-0"
        style={{
          backgroundImage: `
            linear-gradient(0deg, transparent 24%, rgba(251, 191, 36, 0.03) 25%, rgba(251, 191, 36, 0.03) 26%, transparent 27%, transparent 74%, rgba(251, 191, 36, 0.03) 75%, rgba(251, 191, 36, 0.03) 76%, transparent 77%, transparent),
            linear-gradient(90deg, transparent 24%, rgba(251, 191, 36, 0.03) 25%, rgba(251, 191, 36, 0.03) 26%, transparent 27%, transparent 74%, rgba(251, 191, 36, 0.03) 75%, rgba(251, 191, 36, 0.03) 76%, transparent 77%, transparent)
          `,
          backgroundSize: '60px 60px',
        }}
      />

      {/* Gradient overlays */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              radial-gradient(circle at 20% 50%, rgba(251, 191, 36, 0.1) 0%, transparent 50%),
              radial-gradient(circle at 80% 50%, rgba(244, 63, 94, 0.1) 0%, transparent 50%),
              radial-gradient(circle at 50% 0%, rgba(14, 165, 233, 0.06) 0%, transparent 60%)
            `,
          }}
        />
      </div>

      {/* Language toggle */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.6 }}
        className="fixed top-6 right-6 z-50 flex items-center gap-3 px-3 py-2 rounded-full border border-amber-400 bg-black/80 backdrop-blur-md"
      >
        <button
          onClick={() => setLang('es')}
          className={`text-xs transition-colors font-${lang === 'es' ? 'bold' : 'normal'} ${
            lang === 'es' ? 'text-amber-400' : 'text-slate-400'
          }`}
        >
          ES
        </button>
        <span className="text-slate-400">|</span>
        <button
          onClick={() => setLang('en')}
          className={`text-xs transition-colors font-${lang === 'en' ? 'bold' : 'normal'} ${
            lang === 'en' ? 'text-amber-400' : 'text-slate-400'
          }`}
        >
          EN
        </button>
      </motion.div>

      {/* Hero container */}
      <div className="relative z-10 w-full h-screen flex flex-col justify-center items-center text-center px-4">
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.6, rotate: -20 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: 1.2, delay: 0.6 }}
          className="mb-12 drop-shadow-[0_0_30px_rgba(251,191,36,0.4)]"
        >
          <svg className="w-32 h-32 mx-auto" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
            <circle cx="100" cy="100" r="95" fill="none" stroke="#fbbf24" strokeWidth="2" opacity="0.4" />
            <text x="100" y="110" fontSize="48" fontWeight="700" textAnchor="middle" fill="#f1f5f9" fontFamily="Arial, sans-serif">
              dos2a
            </text>
            <g opacity="0.8">
              <path d="M 40 80 Q 60 70 70 90" stroke="#0ea5e9" strokeWidth="2" fill="none" strokeLinecap="round" />
              <circle cx="35" cy="85" r="4" fill="#0ea5e9" />
              <path d="M 160 80 Q 140 70 130 90" stroke="#f43f5e" strokeWidth="2" fill="none" strokeLinecap="round" />
              <circle cx="165" cy="85" r="4" fill="#f43f5e" />
            </g>
          </svg>
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight max-w-4xl mb-6"
          style={{ textShadow: '0 8px 24px rgba(251, 191, 36, 0.2)' }}
        >
          {t('headline')}
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="text-base md:text-lg text-slate-300 max-w-2xl mb-12"
        >
          {t('subheadline')}
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-wrap gap-4 justify-center mb-16"
        >
          <button
            onClick={() => setShowModal(true)}
            className="px-8 py-4 bg-gradient-to-r from-amber-400 to-amber-300 text-slate-900 font-bold text-sm uppercase tracking-wider rounded-lg hover:shadow-lg hover:-translate-y-1 hover:scale-105 active:scale-95 transition-all"
            style={{ boxShadow: '0 12px 32px rgba(251, 191, 36, 0.3)' }}
          >
            {t('btnEnter')}
          </button>
          <button
            onClick={() => setShowModal(true)}
            className="px-8 py-4 bg-transparent text-amber-400 font-bold text-sm uppercase tracking-wider rounded-lg border-2 border-amber-400/40 hover:border-amber-400 hover:bg-amber-400/5 hover:-translate-y-1 hover:scale-105 active:scale-95 transition-all"
          >
            {t('btnDiscover')}
          </button>
        </motion.div>

        {/* Scroll hint */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.8 }}
          className="absolute bottom-8 flex flex-col items-center gap-2"
        >
          <p className="text-xs text-slate-500">{t('scrollHint')}</p>
          <svg
            className="w-5 h-5 text-amber-400 animate-bounce"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v14M19 12l-7 7-7-7" />
          </svg>
        </motion.div>
      </div>

      {/* Modal */}
      {showModal && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md"
          onClick={() => setShowModal(false)}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
            className="bg-gradient-to-br from-slate-900 to-slate-950 border border-amber-400/25 rounded-2xl p-8 max-w-md w-full max-h-96 overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-2xl md:text-3xl font-bold mb-2">{t('formTitle')}</h2>
            <p className="text-sm text-slate-400 mb-6">{t('formDesc')}</p>

            <form onSubmit={handleFormSubmit} className="space-y-4">
              <input
                type="text"
                placeholder={t('inputName')}
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-3 py-2 rounded-lg border border-amber-400/25 bg-slate-800/50 text-white text-sm focus:outline-none focus:border-amber-400 focus:bg-slate-800"
                required
              />
              <input
                type="email"
                placeholder={t('inputEmail')}
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-3 py-2 rounded-lg border border-amber-400/25 bg-slate-800/50 text-white text-sm focus:outline-none focus:border-amber-400 focus:bg-slate-800"
                required
              />
              <select
                value={formData.eventType}
                onChange={(e) => setFormData({ ...formData, eventType: e.target.value })}
                className="w-full px-3 py-2 rounded-lg border border-amber-400/25 bg-slate-800/50 text-white text-sm focus:outline-none focus:border-amber-400 focus:bg-slate-800"
                required
              >
                <option value="">Selecciona tipo de evento</option>
                <option value="fiesta">{t('eventType1')}</option>
                <option value="concierto">{t('eventType2')}</option>
                <option value="corporativo">{t('eventType3')}</option>
              </select>
              <textarea
                placeholder={t('inputNeeds')}
                value={formData.needs}
                onChange={(e) => setFormData({ ...formData, needs: e.target.value })}
                rows={3}
                className="w-full px-3 py-2 rounded-lg border border-amber-400/25 bg-slate-800/50 text-white text-sm focus:outline-none focus:border-amber-400 focus:bg-slate-800 resize-none"
              />
              <button
                type="submit"
                className="w-full py-3 bg-gradient-to-r from-amber-400 to-rose-500 text-slate-900 font-bold text-sm uppercase tracking-wider rounded-lg hover:scale-105 active:scale-95 transition-transform"
              >
                {t('btnSubmit')}
              </button>
            </form>

            <p className="text-xs text-slate-500 mt-4 text-center">{t('closeHint')}</p>
          </motion.div>
        </motion.div>
      )}
    </div>
  )
}
