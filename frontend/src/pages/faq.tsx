// frontend/src/pages/faq.tsx
'use client';

import React, { useState } from 'react';
import Head from 'next/head';
import gsap from 'gsap';
import { useLanguage } from '@/hooks/useLanguage';

interface FAQItem {
  questionEs: string;
  questionEn: string;
  answerEs: string;
  answerEn: string;
}

const FAQ_ITEMS: FAQItem[] = [
  {
    questionEs: '¿Cuál es el tiempo mínimo de preparación?',
    questionEn: 'What is the minimum preparation time?',
    answerEs: 'Depende del tipo de evento. Para eventos Social necesitamos 2-3 semanas. Para eventos Escénico 4-6 semanas. Para eventos Corporativo 2-4 semanas. A veces podemos hacer excepciones con urgencia.',
    answerEn: 'It depends on the event type. Social events need 2-3 weeks. Stage events need 4-6 weeks. Corporate events need 2-4 weeks. We can make exceptions for rush requests.',
  },
  {
    questionEs: '¿Qué incluye el precio?',
    questionEn: 'What is included in the price?',
    answerEs: 'El precio incluye: equipo profesional, operadores dedicados, montaje completo, pruebas técnicas y soporte en vivo. Cotizaremos separadamente viajes fuera de CDMX o servicios adicionales.',
    answerEn: 'The price includes: professional equipment, dedicated operators, full setup, technical testing, and live support. We will quote separately for travel outside CDMX or additional services.',
  },
  {
    questionEs: '¿Aceptan cambios de último momento?',
    questionEn: 'Do you accept last-minute changes?',
    answerEs: 'Sí. Nuestro equipo está preparado para adaptarse. Cambios durante el evento se manejan sin costo si son razonables. Cambios que requieran equipo adicional se cotizarán sobre el momento.',
    answerEn: 'Yes. Our team is prepared to adapt. Changes during the event are handled at no cost if reasonable. Changes requiring additional equipment will be quoted on the spot.',
  },
  {
    questionEs: '¿Incluye grabación de video?',
    questionEn: 'Does it include video recording?',
    answerEs: 'La grabación está incluida en los paquetes Escénico y Corporativo. En el paquete Social, la grabación se ofrece como servicio adicional. Entregamos videos editados en HD 1080p.',
    answerEn: 'Recording is included in Stage and Corporate packages. In the Social package, recording is offered as an add-on. We deliver edited 1080p HD videos.',
  },
  {
    questionEs: '¿Pueden hacer streaming del evento?',
    questionEn: 'Can you stream the event?',
    answerEs: 'Sí. Hacemos streaming profesional en vivo a YouTube, Facebook, Instagram o plataformas personalizadas. Se incluye en paquetes Escénico y Corporativo, o como addon en Social.',
    answerEn: 'Yes. We do professional live streaming to YouTube, Facebook, Instagram, or custom platforms. Included in Stage and Corporate, or as an add-on in Social.',
  },
  {
    questionEs: '¿Cuál es el área de cobertura geográfica?',
    questionEn: 'What is your geographic coverage area?',
    answerEs: 'Operamos principalmente en CDMX. Podemos servir hasta 100km a la redonda. Para distancias mayores cotizaremos viajes y hospedaje adicional.',
    answerEn: 'We operate mainly in CDMX. We can serve up to 100km radius. For greater distances we will quote additional travel and accommodation.',
  },
];

export default function FAQPage() {
  const { lang } = useLanguage();
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const translations = {
    es: {
      title: 'Preguntas Frecuentes',
      subtitle: 'Todo lo que necesitas saber sobre DOS2A',
    },
    en: {
      title: 'Frequently Asked Questions',
      subtitle: 'Everything you need to know about DOS2A',
    },
  };

  const t = translations[lang as keyof typeof translations];

  return (
    <>
      <Head>
        <title>FAQ | DOS2A</title>
        <meta name="description" content={t.subtitle} />
      </Head>

      <div className="min-h-screen bg-gradient-to-b from-[#0a0d12] to-[#050608] py-20">
        {/* Header */}
        <div className="max-w-4xl mx-auto px-4 mb-20 text-center">
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
            className="text-lg md:text-xl"
            style={{ color: '#cbd5e1' }}
          >
            {t.subtitle}
          </p>
        </div>

        {/* FAQ Items */}
        <div className="max-w-4xl mx-auto px-4 space-y-4">
          {FAQ_ITEMS.map((item, index) => {
            const isOpen = openIndex === index;
            const question = lang === 'es' ? item.questionEs : item.questionEn;
            const answer = lang === 'es' ? item.answerEs : item.answerEn;

            return (
              <div
                key={index}
                className="rounded-lg overflow-hidden"
                style={{
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  background: 'rgba(15, 20, 25, 0.4)',
                }}
              >
                {/* Question Button */}
                <button
                  onClick={() => {
                    setOpenIndex(isOpen ? null : index);
                    gsap.to(`.faq-answer-${index}`, {
                      height: isOpen ? 0 : 'auto',
                      opacity: isOpen ? 0 : 1,
                      duration: 0.4,
                      ease: 'cubic-bezier(0.22, 1, 0.36, 1)',
                    });
                  }}
                  className="w-full flex items-start justify-between p-6 hover:bg-[rgba(252,211,77,0.05)] transition-colors"
                >
                  <h3
                    className="text-lg font-semibold text-left"
                    style={{ color: '#f8fafc' }}
                  >
                    {question}
                  </h3>
                  <span
                    className="text-2xl flex-shrink-0 ml-4 transition-transform"
                    style={{
                      color: '#fcd34d',
                      transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                    }}
                  >
                    ▼
                  </span>
                </button>

                {/* Answer */}
                <div
                  className={`faq-answer-${index} overflow-hidden`}
                  style={{
                    height: isOpen ? 'auto' : 0,
                    opacity: isOpen ? 1 : 0,
                  }}
                >
                  <div
                    className="px-6 pb-6 pt-0"
                    style={{ color: '#cbd5e1', lineHeight: 1.7 }}
                  >
                    {answer}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
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
                ? '¿No encontraste la respuesta?'
                : "Didn't find the answer?"}
            </h2>
            <p className="mb-8" style={{ color: '#cbd5e1' }}>
              {lang === 'es'
                ? 'Contacta directamente con nuestro equipo.'
                : 'Contact our team directly.'}
            </p>
            <a
              href="mailto:2audioiluminacion@gmail.com"
              className="inline-block px-8 py-4 rounded-lg font-bold text-lg uppercase tracking-wider"
              style={{
                background:
                  'linear-gradient(135deg, #fcd34d, #f59e0b)',
                color: '#0a0d12',
              }}
            >
              {lang === 'es' ? 'Enviar email' : 'Send email'}
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
