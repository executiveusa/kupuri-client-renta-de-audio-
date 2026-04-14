// frontend/src/pages/index.tsx
'use client';

import React, { useState } from 'react';
import Head from 'next/head';
import Hero from '@/components/Hero';
import EventFormModal from '@/components/EventFormModal';
import LanguageToggle from '@/components/LanguageToggle';
import { useLanguage } from '@/hooks/useLanguage';

export default function HomePage() {
  const { lang } = useLanguage();
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <Head>
        <title>DOS2A - Audio & Iluminación Premium</title>
        <meta
          name="description"
          content="Servicios profesionales de audio, iluminación y producción audiovisual en CDMX"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta charSet="utf-8" />
        <meta property="og:title" content="DOS2A - Audio & Iluminación Premium" />
        <meta
          property="og:description"
          content="Servicios profesionales para eventos de impacto"
        />
        <meta property="og:type" content="website" />
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-[#050608] via-[#0a0d12] to-[#050608]">
        {/* Language Toggle */}
        <LanguageToggle />

        {/* Hero Section */}
        <Hero />

        {/* Form Modal */}
        <EventFormModal
          isOpen={showModal}
          onClose={() => setShowModal(false)}
        />

        {/* Additional Sections (Placeholder for Phase 3) */}
        <section className="min-h-screen bg-[#0f1419] flex items-center justify-center">
          <div className="text-center">
            <h2
              className="text-3xl font-bold mb-4"
              style={{
                color: '#f8fafc',
                fontFamily: "'Sora', sans-serif",
              }}
            >
              {lang === 'es' ? 'Servicios' : 'Services'}
            </h2>
            <p style={{ color: '#cbd5e1' }}>
              {lang === 'es' ? 'Más contenido en desarrollo...' : 'More content coming...'}
            </p>
          </div>
        </section>
      </div>
    </>
  );
}
