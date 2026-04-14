// frontend/src/pages/servicios.tsx
'use client';

import React, { useEffect, useRef } from 'react';
import Head from 'next/head';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { useLanguage } from '@/hooks/useLanguage';

gsap.registerPlugin(ScrollTrigger);

interface Service {
  id: string;
  titleEs: string;
  titleEn: string;
  descEs: string;
  descEn: string;
  features: { es: string[]; en: string[] };
  icon: string;
}

const SERVICES: Service[] = [
  {
    id: 'audio',
    titleEs: 'Audio Profesional',
    titleEn: 'Professional Audio',
    descEs: 'Sistemas de sonido de alta calidad, desde equipos portátiles hasta instalaciones de gran escala. Garantizamos claridad, potencia y cobertura en cualquier espacio.',
    descEn: 'High-quality sound systems, from portable equipment to large-scale installations. We guarantee clarity, power, and coverage in any space.',
    features: {
      es: [
        'Consolas digitales de última generación',
        'Microfonía inalámbrica profesional',
        'Sistemas de monitoreo personalizado',
        'Cobertura de sonido uniforme',
        'Support técnico en vivo',
      ],
      en: [
        'Latest-generation digital consoles',
        'Professional wireless microphones',
        'Custom monitoring systems',
        'Uniform sound coverage',
        'Live technical support',
      ],
    },
    icon: '🎙️',
  },
  {
    id: 'lighting',
    titleEs: 'Iluminación Escénica',
    titleEn: 'Stage Lighting',
    descEs: 'Diseño de iluminación que transforma espacios. Desde luz ambiente elegante hasta efectos dinámicos que generan impacto visual. Control total desde cualquier punto.',
    descEn: 'Lighting design that transforms spaces. From elegant ambient light to dynamic effects that create visual impact. Full control from anywhere.',
    features: {
      es: [
        'Proyectores LED de última tecnología',
        'Sistemas de seguimiento automatizado',
        'Control DMX inalámbrico',
        'Efectos de iluminación sincronizados',
        'Diseño personalizado por evento',
      ],
      en: [
        'Latest LED projection technology',
        'Automated tracking systems',
        'Wireless DMX control',
        'Synchronized lighting effects',
        'Custom event design',
      ],
    },
    icon: '💡',
  },
  {
    id: 'production',
    titleEs: 'Producción Audiovisual',
    titleEn: 'Audiovisual Production',
    descEs: 'Captura profesional en video, proyección de alta resolución y streaming en vivo. Hacemos que tu evento sea visible para todos, presentes o remotos.',
    descEn: 'Professional video capture, high-resolution projection, and live streaming. We make your event visible to everyone, present or remote.',
    features: {
      es: [
        'Cámaras 4K de cine profesional',
        'Proyección para pantallas gigantes',
        'Streaming multi-plataforma',
        'Edición en vivo y efectos',
        'Grabación de archivo profesional',
      ],
      en: [
        'Professional 4K cinema cameras',
        'Projection for giant screens',
        'Multi-platform streaming',
        'Live editing and effects',
        'Professional archival recording',
      ],
    },
    icon: '📹',
  },
  {
    id: 'operations',
    titleEs: 'Operación Técnica',
    titleEn: 'Technical Operations',
    descEs: 'Control en vivo y coordinación técnica durante tu evento. Nuestro equipo está atento a cada detalle para que todo funcione sin interrupciones.',
    descEn: 'Live control and technical coordination during your event. Our team pays attention to every detail so everything runs smoothly.',
    features: {
      es: [
        'Operadores especializados dedicados',
        'Sistema de comunicación interno profesional',
        'Monitoreo constante de calidad',
        'Respuesta rápida a cambios',
        'Documentación técnica completa',
      ],
      en: [
        'Dedicated specialized operators',
        'Professional internal communication system',
        'Constant quality monitoring',
        'Quick response to changes',
        'Complete technical documentation',
      ],
    },
    icon: '⚙️',
  },
];

export default function ServicesPage() {
  const { lang } = useLanguage();
  const containerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    // Animate cards on scroll
    cardsRef.current.forEach((card, index) => {
      gsap.fromTo(
        card,
        {
          opacity: 0,
          y: 60,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'cubic-bezier(0.22, 1, 0.36, 1)',
          scrollTrigger: {
            trigger: card,
            start: 'top 80%',
            end: 'top 50%',
            scrub: false,
            markers: false,
          },
        }
      );
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  const translations = {
    es: {
      title: 'Nuestros Servicios',
      subtitle: 'Soluciones técnicas profesionales para eventos de impacto',
      cta: 'Solicitar propuesta',
    },
    en: {
      title: 'Our Services',
      subtitle: 'Professional technical solutions for impactful events',
      cta: 'Request proposal',
    },
  };

  const t = translations[lang as keyof typeof translations];

  return (
    <>
      <Head>
        <title>Servicios | DOS2A</title>
        <meta name="description" content={t.subtitle} />
      </Head>

      <div
        ref={containerRef}
        className="min-h-screen bg-gradient-to-b from-[#0a0d12] to-[#050608] py-20"
      >
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

        {/* Services Grid */}
        <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
          {SERVICES.map((service, index) => (
            <div
              key={service.id}
              ref={(el) => {
                if (el) cardsRef.current[index] = el;
              }}
              className="group opacity-0"
              style={{
                background:
                  'linear-gradient(135deg, rgba(15, 20, 25, 0.8), rgba(10, 13, 18, 0.6))',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                borderRadius: '16px',
                padding: '32px',
                transition: 'all 0.4s cubic-bezier(0.22, 1, 0.36, 1)',
                cursor: 'pointer',
              }}
              onMouseEnter={(e) => {
                gsap.to(e.currentTarget, {
                  y: -8,
                  borderColor: '#fcd34d',
                  boxShadow: '0 20px 40px rgba(252, 211, 77, 0.1)',
                  duration: 0.3,
                });
              }}
              onMouseLeave={(e) => {
                gsap.to(e.currentTarget, {
                  y: 0,
                  borderColor: 'rgba(255, 255, 255, 0.08)',
                  boxShadow: 'none',
                  duration: 0.3,
                });
              }}
            >
              {/* Icon */}
              <div className="text-5xl mb-6">{service.icon}</div>

              {/* Title */}
              <h3
                className="text-2xl font-bold mb-4"
                style={{
                  color: '#f8fafc',
                  fontFamily: "'Sora', sans-serif",
                }}
              >
                {lang === 'es' ? service.titleEs : service.titleEn}
              </h3>

              {/* Description */}
              <p
                className="mb-6 leading-relaxed"
                style={{ color: '#cbd5e1' }}
              >
                {lang === 'es' ? service.descEs : service.descEn}
              </p>

              {/* Features */}
              <ul className="space-y-3 mb-6">
                {(lang === 'es' ? service.features.es : service.features.en).map(
                  (feature, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <span
                        className="text-lg mt-1"
                        style={{ color: '#fcd34d' }}
                      >
                        ✓
                      </span>
                      <span style={{ color: '#94a3b8' }}>{feature}</span>
                    </li>
                  )
                )}
              </ul>

              {/* CTA Button */}
              <button
                className="w-full py-3 rounded-lg font-semibold text-sm uppercase tracking-wider transition-all"
                style={{
                  background: 'linear-gradient(135deg, #fcd34d, #f59e0b)',
                  color: '#0a0d12',
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
                {t.cta}
              </button>
            </div>
          ))}
        </div>

        {/* Bottom CTA Section */}
        <div
          className="max-w-4xl mx-auto px-4 py-20 text-center rounded-2xl"
          style={{
            background: 'rgba(252, 211, 77, 0.05)',
            border: '1px solid rgba(252, 211, 77, 0.2)',
          }}
        >
          <h2
            className="text-3xl font-bold mb-4"
            style={{
              color: '#f8fafc',
              fontFamily: "'Sora', sans-serif",
            }}
          >
            {lang === 'es'
              ? '¿Cuál es tu siguiente evento?'
              : "What's your next event?"}
          </h2>
          <p className="mb-8" style={{ color: '#cbd5e1' }}>
            {lang === 'es'
              ? 'Contacta con nosotros para una cotización personalizada en 24 horas.'
              : 'Contact us for a personalized quote within 24 hours.'}
          </p>
          <button
            className="px-8 py-4 rounded-lg font-bold text-lg uppercase tracking-wider"
            style={{
              background: 'linear-gradient(135deg, #fcd34d, #f59e0b)',
              color: '#0a0d12',
            }}
          >
            {lang === 'es' ? 'Solicitar propuesta' : 'Request proposal'}
          </button>
        </div>
      </div>
    </>
  );
}
