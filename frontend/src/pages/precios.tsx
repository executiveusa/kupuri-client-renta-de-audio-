// frontend/src/pages/precios.tsx
'use client';

import React, { useEffect, useRef } from 'react';
import Head from 'next/head';
import gsap from 'gsap';
import { useLanguage } from '@/hooks/useLanguage';
import { PRICING_TIERS } from '@/types';

export default function PricingPage() {
  const { lang } = useLanguage();
  const tiersRef = useRef<HTMLDivElement[]>([]);
  const [selectedTier, setSelectedTier] = React.useState<'social' | 'escenico' | 'corporativo'>('escenico');

  useEffect(() => {
    // Stagger reveal of pricing cards
    tiersRef.current.forEach((card, index) => {
      gsap.fromTo(
        card,
        { opacity: 0, y: 40, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.6,
          delay: index * 0.15,
          ease: 'cubic-bezier(0.22, 1, 0.36, 1)',
        }
      );
    });
  }, []);

  const translations = {
    es: {
      title: 'Precios Transparentes',
      subtitle: 'Elige el plan perfecto para tu evento',
      features: 'Incluye:',
      leadTime: 'Tiempo de preparación',
      priceFrom: 'Desde',
      contact: 'Solicitar propuesta',
      compare: 'Comparar planes',
      popular: 'Más popular',
    },
    en: {
      title: 'Transparent Pricing',
      subtitle: 'Choose the perfect plan for your event',
      features: 'Includes:',
      leadTime: 'Preparation time',
      priceFrom: 'From',
      contact: 'Request proposal',
      compare: 'Compare plans',
      popular: 'Most popular',
    },
  };

  const t = translations[lang as keyof typeof translations];
  const tiers = Object.values(PRICING_TIERS);

  return (
    <>
      <Head>
        <title>Precios | DOS2A</title>
        <meta name="description" content={t.subtitle} />
      </Head>

      <div className="min-h-screen bg-gradient-to-b from-[#0a0d12] to-[#050608] py-20">
        {/* Header */}
        <div className="max-w-6xl mx-auto px-4 mb-20 text-center">
          <h1
            className="text-5xl md:text-6xl font-bold mb-6"
            style={{
              color: '#f8fafc',
              fontFamily: "'Sora', sans-serif",
              fontSize: 'clamp(36px, 6vw, 64px)',
            }}
          >
            {t.title}
          </h1>
          <p
            className="text-lg md:text-xl max-w-2xl mx-auto"
            style={{ color: '#cbd5e1' }}
          >
            {t.subtitle}
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {tiers.map((tier, index) => {
            const isPopular = tier.id === 'escenico';
            const tierName = lang === 'es' ? tier.nameEs : tier.nameEn;
            const tierDesc = lang === 'es' ? tier.descriptionEs : tier.descriptionEn;
            const features = lang === 'es' ? tier.features.es : tier.features.en;

            return (
              <div
                key={tier.id}
                ref={(el) => {
                  if (el) tiersRef.current[index] = el;
                }}
                className="relative opacity-0"
                onMouseEnter={(e) => {
                  if (!isPopular) {
                    gsap.to(e.currentTarget, {
                      y: -8,
                      duration: 0.3,
                    });
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isPopular) {
                    gsap.to(e.currentTarget, {
                      y: 0,
                      duration: 0.3,
                    });
                  }
                }}
              >
                {/* Popular badge */}
                {isPopular && (
                  <div
                    className="absolute -top-4 left-1/2 transform -translate-x-1/2 px-4 py-1 rounded-full text-xs font-bold uppercase tracking-wider z-10"
                    style={{
                      background: 'linear-gradient(135deg, #fcd34d, #f59e0b)',
                      color: '#0a0d12',
                    }}
                  >
                    {t.popular}
                  </div>
                )}

                {/* Card */}
                <div
                  className="h-full rounded-2xl p-8 transition-all duration-300"
                  style={{
                    background: isPopular
                      ? 'linear-gradient(135deg, rgba(252, 211, 77, 0.1), rgba(56, 189, 248, 0.05))'
                      : 'linear-gradient(135deg, rgba(15, 20, 25, 0.6), rgba(10, 13, 18, 0.4))',
                    border: isPopular
                      ? '1px solid rgba(252, 211, 77, 0.3)'
                      : '1px solid rgba(255, 255, 255, 0.08)',
                    boxShadow: isPopular
                      ? '0 20px 40px rgba(252, 211, 77, 0.15)'
                      : 'none',
                  }}
                >
                  {/* Tier name */}
                  <h3
                    className="text-2xl font-bold mb-2"
                    style={{
                      color: '#f8fafc',
                      fontFamily: "'Sora', sans-serif",
                    }}
                  >
                    {tierName}
                  </h3>

                  {/* Description */}
                  <p className="text-sm mb-6" style={{ color: '#94a3b8' }}>
                    {tierDesc}
                  </p>

                  {/* Price */}
                  <div className="mb-6">
                    <p
                      className="text-sm mb-1"
                      style={{ color: '#94a3b8' }}
                    >
                      {t.priceFrom}
                    </p>
                    <p
                      className="text-4xl font-bold"
                      style={{
                        color: '#fcd34d',
                        fontFamily: "'Sora', sans-serif",
                      }}
                    >
                      ${tier.priceRange.min}
                      <span className="text-xl" style={{ color: '#cbd5e1' }}>
                        {' '}
                        USD
                      </span>
                    </p>
                    <p
                      className="text-xs mt-1"
                      style={{ color: '#64748b' }}
                    >
                      {t.leadTime}: {tier.leadTime.min}-{tier.leadTime.max}{' '}
                      {lang === 'es' ? 'semanas' : 'weeks'}
                    </p>
                  </div>

                  {/* Features */}
                  <div className="mb-8 space-y-3 border-t border-b border-[rgba(255,255,255,0.08)] py-6">
                    {features.map((feature, i) => (
                      <div key={i} className="flex items-start gap-3">
                        <span
                          className="text-lg mt-0.5 flex-shrink-0"
                          style={{ color: '#fcd34d' }}
                        >
                          ✓
                        </span>
                        <span
                          className="text-sm"
                          style={{ color: '#cbd5e1' }}
                        >
                          {feature}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* CTA Button */}
                  <button
                    className="w-full py-3 rounded-lg font-bold text-sm uppercase tracking-wider transition-all duration-300"
                    style={{
                      background: isPopular
                        ? 'linear-gradient(135deg, #fcd34d, #f59e0b)'
                        : 'transparent',
                      color: isPopular ? '#0a0d12' : '#fcd34d',
                      border: isPopular
                        ? 'none'
                        : '2px solid rgba(252, 211, 77, 0.3)',
                    }}
                    onMouseEnter={(e) => {
                      gsap.to(e.currentTarget, {
                        scale: 1.05,
                        duration: 0.3,
                      });
                    }}
                    onMouseLeave={(e) => {
                      gsap.to(e.currentTarget, {
                        scale: 1,
                        duration: 0.3,
                      });
                    }}
                  >
                    {t.contact}
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Comparison Section */}
        <div className="max-w-6xl mx-auto px-4 bg-[rgba(15,20,25,0.4)] rounded-2xl p-12 border border-[rgba(255,255,255,0.08)]">
          <h2
            className="text-3xl font-bold mb-8 text-center"
            style={{
              color: '#f8fafc',
              fontFamily: "'Sora', sans-serif",
            }}
          >
            {t.compare}
          </h2>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr>
                  <th className="text-left py-4 px-4" style={{ color: '#cbd5e1' }}>
                    {lang === 'es' ? 'Capacidad' : 'Capacity'}
                  </th>
                  <th className="text-center py-4 px-4" style={{ color: '#fcd34d' }}>
                    {PRICING_TIERS.social.nameEs}
                  </th>
                  <th className="text-center py-4 px-4" style={{ color: '#fcd34d' }}>
                    {PRICING_TIERS.escenico.nameEs}
                  </th>
                  <th className="text-center py-4 px-4" style={{ color: '#fcd34d' }}>
                    {PRICING_TIERS.corporativo.nameEs}
                  </th>
                </tr>
              </thead>
              <tbody>
                {[
                  { label: lang === 'es' ? 'Personas' : 'People', social: '300', escenico: '300+', corporativo: '1000' },
                  { label: 'Audio (kW)', social: '4-6', escenico: '15-30', corporativo: 'Custom' },
                  { label: lang === 'es' ? 'Iluminación' : 'Lighting', social: 'Básica', escenico: 'Profesional', corporativo: 'Premium' },
                  { label: lang === 'es' ? 'Operador dedicado' : 'Dedicated operator', social: '❌', escenico: '✓', corporativo: '✓' },
                ].map((row, i) => (
                  <tr
                    key={i}
                    style={{
                      borderTop: '1px solid rgba(255,255,255,0.08)',
                    }}
                  >
                    <td className="py-4 px-4" style={{ color: '#cbd5e1' }}>
                      {row.label}
                    </td>
                    <td className="text-center py-4 px-4" style={{ color: '#94a3b8' }}>
                      {row.social}
                    </td>
                    <td className="text-center py-4 px-4" style={{ color: '#94a3b8' }}>
                      {row.escenico}
                    </td>
                    <td className="text-center py-4 px-4" style={{ color: '#94a3b8' }}>
                      {row.corporativo}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}
