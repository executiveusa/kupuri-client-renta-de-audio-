// frontend/src/pages/proceso.tsx
'use client';

import React, { useEffect, useRef } from 'react';
import Head from 'next/head';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { useLanguage } from '@/hooks/useLanguage';

gsap.registerPlugin(ScrollTrigger);

interface ProcessStep {
  number: number;
  titleEs: string;
  titleEn: string;
  descEs: string;
  descEn: string;
  icon: string;
  daysEs: string;
  daysEn: string;
}

const PROCESS_STEPS: ProcessStep[] = [
  {
    number: 1,
    titleEs: 'Diagnóstico',
    titleEn: 'Assessment',
    descEs: 'Entendemos tu evento: tamaño, público, ubicación, presupuesto y visión. Hacemos preguntas específicas para diseñar la solución perfecta.',
    descEn: 'We understand your event: size, audience, location, budget, and vision. We ask specific questions to design the perfect solution.',
    icon: '📋',
    daysEs: 'Día 0-1',
    daysEn: 'Day 0-1',
  },
  {
    number: 2,
    titleEs: 'Propuesta Técnica',
    titleEn: 'Technical Proposal',
    descEs: 'Presentamos opciones de audio, iluminación y producción. Detallamos especificaciones, presupuesto y timeline. Ajustamos según feedback.',
    descEn: 'We present audio, lighting, and production options. We detail specs, budget, and timeline. We adjust based on your feedback.',
    icon: '🎯',
    daysEs: 'Día 1-2',
    daysEn: 'Day 1-2',
  },
  {
    number: 3,
    titleEs: 'Planificación Detallada',
    titleEn: 'Detailed Planning',
    descEs: 'Confirmamos especificaciones finales, cronograma de montaje, pruebas técnicas y contingencias. Preparamos a nuestro equipo.',
    descEn: 'We confirm final specs, setup schedule, technical rehearsals, and contingencies. We prepare our team.',
    icon: '⚙️',
    daysEs: '2-4 semanas antes',
    daysEn: '2-4 weeks before',
  },
  {
    number: 4,
    titleEs: 'Montaje & Pruebas',
    titleEn: 'Setup & Testing',
    descEs: 'Instalamos todo el equipo, hacemos pruebas de audio, iluminación y video. Calibramos cada aspecto para máxima calidad.',
    descEn: 'We install all equipment and test audio, lighting, and video. We calibrate every aspect for maximum quality.',
    icon: '🔧',
    daysEs: '1-2 días antes',
    daysEn: '1-2 days before',
  },
  {
    number: 5,
    titleEs: 'Ejecución',
    titleEn: 'Execution',
    descEs: 'Nuestro equipo opera en vivo, monitorea calidad y responde a cambios de última hora. Control total en cada momento.',
    descEn: 'Our team operates live, monitors quality, and responds to last-minute changes. Total control at every moment.',
    icon: '🎬',
    daysEs: 'Día del evento',
    daysEn: 'Event day',
  },
  {
    number: 6,
    titleEs: 'Cierre & Entrega',
    titleEn: 'Closure & Delivery',
    descEs: 'Desinstalamos equipo, entregamos grabaciones y documentación. Recopilamos feedback para futuras mejoras.',
    descEn: 'We dismantle equipment and deliver recordings and documentation. We gather feedback for future improvements.',
    icon: '✅',
    daysEs: 'Post-evento',
    daysEn: 'Post-event',
  },
];

export default function ProcessPage() {
  const { lang } = useLanguage();
  const stepsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    stepsRef.current.forEach((step, index) => {
      gsap.fromTo(
        step,
        { opacity: 0, x: index % 2 === 0 ? -50 : 50 },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          ease: 'cubic-bezier(0.22, 1, 0.36, 1)',
          scrollTrigger: {
            trigger: step,
            start: 'top 75%',
            end: 'top 50%',
            scrub: false,
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
      title: 'Nuestro Proceso',
      subtitle: 'De la idea al evento perfecto',
    },
    en: {
      title: 'Our Process',
      subtitle: 'From idea to perfect event',
    },
  };

  const t = translations[lang as keyof typeof translations];

  return (
    <>
      <Head>
        <title>Proceso | DOS2A</title>
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

        {/* Timeline */}
        <div className="max-w-4xl mx-auto px-4">
          {PROCESS_STEPS.map((step, index) => {
            const isLeft = index % 2 === 0;
            return (
              <div key={step.number} className="mb-20">
                <div className="relative">
                  {/* Timeline line */}
                  {index < PROCESS_STEPS.length - 1 && (
                    <div
                      className="absolute left-1/2 transform -translate-x-1/2 w-1 h-24"
                      style={{
                        background:
                          'linear-gradient(180deg, #fcd34d 0%, rgba(252, 211, 77, 0.1) 100%)',
                        top: '100%',
                      }}
                    />
                  )}

                  {/* Step */}
                  <div
                    ref={(el) => {
                      if (el) stepsRef.current[index] = el;
                    }}
                    className="opacity-0"
                  >
                    <div className="flex gap-8">
                      {/* Left content (only on even indices) */}
                      {isLeft && (
                        <div className="flex-1">
                          <div
                            className="rounded-xl p-6 h-full"
                            style={{
                              background: 'rgba(15, 20, 25, 0.6)',
                              border: '1px solid rgba(255, 255, 255, 0.08)',
                            }}
                          >
                            <p
                              className="text-sm font-semibold mb-2 uppercase tracking-wider"
                              style={{ color: '#fcd34d' }}
                            >
                              {lang === 'es'
                                ? step.daysEs
                                : step.daysEn}
                            </p>
                            <h3
                              className="text-2xl font-bold mb-3"
                              style={{
                                color: '#f8fafc',
                                fontFamily: "'Sora', sans-serif",
                              }}
                            >
                              {lang === 'es'
                                ? step.titleEs
                                : step.titleEn}
                            </h3>
                            <p style={{ color: '#cbd5e1', lineHeight: 1.6 }}>
                              {lang === 'es'
                                ? step.descEs
                                : step.descEn}
                            </p>
                          </div>
                        </div>
                      )}

                      {/* Center dot */}
                      <div className="flex-shrink-0 flex flex-col items-center">
                        <div
                          className="w-12 h-12 rounded-full flex items-center justify-center text-2xl mb-4"
                          style={{
                            background:
                              'linear-gradient(135deg, #fcd34d, #f59e0b)',
                          }}
                        >
                          {step.icon}
                        </div>
                      </div>

                      {/* Right content (only on odd indices) */}
                      {!isLeft && (
                        <div className="flex-1">
                          <div
                            className="rounded-xl p-6 h-full"
                            style={{
                              background: 'rgba(15, 20, 25, 0.6)',
                              border: '1px solid rgba(255, 255, 255, 0.08)',
                            }}
                          >
                            <p
                              className="text-sm font-semibold mb-2 uppercase tracking-wider"
                              style={{ color: '#fcd34d' }}
                            >
                              {lang === 'es'
                                ? step.daysEs
                                : step.daysEn}
                            </p>
                            <h3
                              className="text-2xl font-bold mb-3"
                              style={{
                                color: '#f8fafc',
                                fontFamily: "'Sora', sans-serif",
                              }}
                            >
                              {lang === 'es'
                                ? step.titleEs
                                : step.titleEn}
                            </h3>
                            <p style={{ color: '#cbd5e1', lineHeight: 1.6 }}>
                              {lang === 'es'
                                ? step.descEs
                                : step.descEn}
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* CTA Section */}
        <div className="max-w-4xl mx-auto px-4 mt-20 text-center">
          <div
            className="rounded-2xl p-12"
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
                ? 'Estamos listos para tu evento'
                : 'We are ready for your event'}
            </h2>
            <p className="mb-8" style={{ color: '#cbd5e1' }}>
              {lang === 'es'
                ? 'Contáctanos hoy y empecemos juntos.'
                : 'Contact us today and let\'s start together.'}
            </p>
            <button
              className="px-8 py-4 rounded-lg font-bold text-lg uppercase tracking-wider"
              style={{
                background:
                  'linear-gradient(135deg, #fcd34d, #f59e0b)',
                color: '#0a0d12',
              }}
            >
              {lang === 'es'
                ? 'Solicitar propuesta'
                : 'Request proposal'}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
