'use client';

import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { useLanguage } from '@/hooks/useLanguage';

export const Hero: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const sublineRef = useRef<HTMLParagraphElement>(null);
  const ctaGroupRef = useRef<HTMLDivElement>(null);
  const [showModal, setShowModal] = useState(false);
  const { lang, t } = useLanguage();

  useEffect(() => {
    // GSAP timeline orchestration - Webflow quality
    const tl = gsap.timeline({ delay: 0.2 });

    // Logo entrance with scale + glow
    tl.to(logoRef.current, {
      opacity: 1,
      scale: 1,
      duration: 0.8,
      ease: 'cubic-bezier(0.22, 1, 0.36, 1)',
    }, 0.4)
      // Glow pulse on logo
      .to(logoRef.current, {
        boxShadow: '0 0 40px rgba(252, 211, 77, 0.5)',
        duration: 0.6,
        ease: 'sine.inOut',
      }, 0.8);

    // Headline stagger reveal
    tl.to(headlineRef.current, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: 'cubic-bezier(0.22, 1, 0.36, 1)',
    }, 0.6);

    // Subheadline reveal
    tl.to(sublineRef.current, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: 'cubic-bezier(0.22, 1, 0.36, 1)',
    }, 0.8);

    // CTA group entrance
    tl.to(ctaGroupRef.current, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: 'cubic-bezier(0.22, 1, 0.36, 1)',
    }, 1.0);

    // Scroll hint bounce
    gsap.to('.scroll-hint', {
      y: 8,
      duration: 2,
      ease: 'sine.inOut',
      repeat: -1,
      yoyo: true,
      delay: 3.5,
    });
  }, []);

  const translations = {
    es: {
      headline: 'Tu evento merece <span class="accent">impacto visual</span> y <span class="accent">sonido premium</span>',
      subheadline: 'Diseñamos y operamos montajes de audio, iluminación y producción audiovisual para eventos que necesitan presencia, claridad técnica y una ejecución que convierte cualquier idea en espectáculo.',
      cta1: 'Entrar',
      cta2: 'Descubrir',
      scroll: 'Desliza para explorar',
    },
    en: {
      headline: 'Your event deserves <span class="accent">visual impact</span> and <span class="accent">premium sound</span>',
      subheadline: 'We design and operate audio, lighting, and audiovisual production setups for events that need presence, technical clarity, and execution that turns any idea into a spectacle.',
      cta1: 'Enter',
      cta2: 'Discover',
      scroll: 'Scroll to explore',
    },
  };

  const content = translations[lang as keyof typeof translations];

  return (
    <section
      ref={containerRef}
      className="relative w-screen h-screen flex flex-col items-center justify-center text-center overflow-hidden bg-gradient-to-br from-[#050608] via-[#0a0d12] to-[#050608]"
    >
      {/* Background with club image overlay - modern minimal gradient */}
      <div className="absolute inset-0 z-0">
        {/* Club image background with overlay */}
        <div
          className="absolute inset-0 bg-cover bg-center opacity-40"
          style={{
            backgroundImage:
              'linear-gradient(135deg, rgba(252, 211, 77, 0.08) 0%, rgba(56, 189, 248, 0.04) 100%), radial-gradient(circle at 20% 50%, rgba(252, 211, 77, 0.1) 0%, transparent 50%), radial-gradient(circle at 80% 80%, rgba(56, 189, 248, 0.06) 0%, transparent 50%)',
          }}
        />
        
        {/* Dark overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-[rgba(5,6,8,0.7)] via-[rgba(10,13,18,0.5)] to-[rgba(5,6,8,0.7)]" />
      </div>

      {/* Content Container */}
      <div className="relative z-10 px-4 sm:px-6 max-w-6xl w-full">
        {/* Logo - DOS2A */}
        <div
          ref={logoRef}
          className="mb-8 sm:mb-12 opacity-0 scale-75"
          style={{
            fontSize: 'clamp(28px, 5vw, 40px)',
            fontWeight: 800,
            letterSpacing: '-0.03em',
            color: '#f8fafc',
            fontFamily: "'Sora', sans-serif",
          }}
        >
          <div className="flex items-center justify-center gap-3">
            {/* Minimal DOS2A icon */}
            <svg
              width="48"
              height="48"
              viewBox="0 0 48 48"
              className="drop-shadow-lg"
              style={{ filter: 'drop-shadow(0 0 20px rgba(252, 211, 77, 0.3))' }}
            >
              <circle
                cx="24"
                cy="24"
                r="22"
                fill="none"
                stroke="#fcd34d"
                strokeWidth="2"
                opacity="0.6"
              />
              <text
                x="24"
                y="32"
                textAnchor="middle"
                fontSize="18"
                fontWeight="700"
                fill="#fcd34d"
                fontFamily="'Sora', sans-serif"
              >
                2A
              </text>
            </svg>
            <span>DOS2A</span>
          </div>
        </div>

        {/* Headline */}
        <h1
          ref={headlineRef}
          className="opacity-0 translate-y-10 mb-4 sm:mb-6"
          style={{
            fontSize: 'clamp(36px, 8vw, 72px)',
            fontWeight: 800,
            lineHeight: 1.1,
            letterSpacing: '-0.03em',
            color: '#f8fafc',
            fontFamily: "'Sora', sans-serif",
            maxWidth: '900px',
            margin: '0 auto 1rem',
          }}
          dangerouslySetInnerHTML={{ __html: content.headline }}
        />

        {/* Subheadline */}
        <p
          ref={sublineRef}
          className="opacity-0 translate-y-10 mb-8 sm:mb-10"
          style={{
            fontSize: 'clamp(16px, 2vw, 20px)',
            color: '#cbd5e1',
            maxWidth: '700px',
            margin: '0 auto 2.5rem',
            lineHeight: 1.7,
            fontFamily: "'Inter', sans-serif",
          }}
        >
          {content.subheadline}
        </p>

        {/* CTA Group */}
        <div
          ref={ctaGroupRef}
          className="opacity-0 translate-y-10 flex gap-3 sm:gap-4 justify-center flex-wrap mb-12"
        >
          {/* Primary CTA */}
          <button
            onClick={() => setShowModal(true)}
            className="group relative px-8 sm:px-10 py-3 sm:py-4 rounded-lg font-semibold text-sm sm:text-base uppercase tracking-wider text-[#0a0d12] transition-all duration-300"
            style={{
              background: 'linear-gradient(135deg, #fcd34d, #f59e0b)',
              boxShadow: '0 12px 32px rgba(252, 211, 77, 0.2)',
            }}
            onMouseEnter={(e) =>
              gsap.to(e.currentTarget, {
                y: -4,
                boxShadow: '0 20px 48px rgba(252, 211, 77, 0.3)',
                duration: 0.3,
              })
            }
            onMouseLeave={(e) =>
              gsap.to(e.currentTarget, {
                y: 0,
                boxShadow: '0 12px 32px rgba(252, 211, 77, 0.2)',
                duration: 0.3,
              })
            }
          >
            {content.cta1}
          </button>

          {/* Secondary CTA */}
          <button
            onClick={() => setShowModal(true)}
            className="group relative px-8 sm:px-10 py-3 sm:py-4 rounded-lg font-semibold text-sm sm:text-base uppercase tracking-wider text-[#f8fafc] transition-all duration-300"
            style={{
              background: 'transparent',
              border: '1.5px solid rgba(255, 255, 255, 0.12)',
            }}
            onMouseEnter={(e) => {
              gsap.to(e.currentTarget, {
                y: -4,
                borderColor: '#fcd34d',
                color: '#fcd34d',
                background: 'rgba(252, 211, 77, 0.05)',
                duration: 0.3,
              });
            }}
            onMouseLeave={(e) => {
              gsap.to(e.currentTarget, {
                y: 0,
                borderColor: 'rgba(255, 255, 255, 0.12)',
                color: '#f8fafc',
                background: 'transparent',
                duration: 0.3,
              });
            }}
          >
            {content.cta2}
          </button>
        </div>
      </div>

      {/* Scroll Hint */}
      <div className="scroll-hint absolute bottom-12 left-1/2 transform -translate-x-1/2 text-center opacity-0" style={{ animation: 'fadeIn 0.8s ease 3.5s forwards' }}>
        <p
          className="text-xs uppercase tracking-widest mb-2"
          style={{ color: '#94a3b8' }}
        >
          {content.scroll}
        </p>
        <svg
          className="w-6 h-6 mx-auto"
          style={{ color: '#fcd34d', stroke: 'currentColor', fill: 'none' }}
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 5v14m0 0l-7-7m7 7l7-7"
          />
        </svg>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        .accent {
          background: linear-gradient(135deg, #fcd34d, #38bdf8);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
      `}</style>
    </section>
  );
};

export default Hero;
