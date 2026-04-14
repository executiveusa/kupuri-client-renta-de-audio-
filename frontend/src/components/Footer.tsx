// frontend/src/components/Footer.tsx
'use client';

import React from 'react';
import { useLanguage } from '@/hooks/useLanguage';

export const Footer: React.FC = () => {
  const { lang } = useLanguage();

  const translations = {
    es: {
      contact: 'Contacto',
      email: 'Email',
      phone: 'Teléfono',
      location: 'Ubicación',
      social: 'Síguenos',
      rights: 'Todos los derechos reservados',
      made: 'Hecho con passion para eventos memorables',
    },
    en: {
      contact: 'Contact',
      email: 'Email',
      phone: 'Phone',
      location: 'Location',
      social: 'Follow us',
      rights: 'All rights reserved',
      made: 'Made with passion for memorable events',
    },
  };

  const t = translations[lang as keyof typeof translations];

  return (
    <footer
      style={{
        background: 'linear-gradient(180deg, rgba(10, 13, 18, 0.5), rgba(5, 6, 8, 1))',
        borderTop: '1px solid rgba(255, 255, 255, 0.08)',
      }}
    >
      <div className="max-w-6xl mx-auto px-4 py-16">
        {/* Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Brand */}
          <div>
            <h3
              className="text-2xl font-bold mb-4"
              style={{
                color: '#f8fafc',
                fontFamily: "'Sora', sans-serif",
              }}
            >
              DOS2A
            </h3>
            <p style={{ color: '#cbd5e1', lineHeight: 1.7 }}>
              {t.made}
            </p>
          </div>

          {/* Contact */}
          <div>
            <h4
              className="font-bold mb-4 uppercase tracking-wider"
              style={{ color: '#fcd34d' }}
            >
              {t.contact}
            </h4>
            <div className="space-y-3" style={{ color: '#cbd5e1' }}>
              <div>
                <p className="text-xs uppercase tracking-wider mb-1" style={{ color: '#94a3b8' }}>
                  {t.email}
                </p>
                <a
                  href="mailto:2audioiluminacion@gmail.com"
                  className="hover:text-[#fcd34d] transition-colors"
                >
                  2audioiluminacion@gmail.com
                </a>
              </div>
              <div>
                <p className="text-xs uppercase tracking-wider mb-1" style={{ color: '#94a3b8' }}>
                  {t.location}
                </p>
                <p>CDMX, México</p>
              </div>
            </div>
          </div>

          {/* Social */}
          <div>
            <h4
              className="font-bold mb-4 uppercase tracking-wider"
              style={{ color: '#fcd34d' }}
            >
              {t.social}
            </h4>
            <div className="flex gap-4">
              <a
                href="https://instagram.com/dos2a"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-[#fcd34d] hover:text-[#0a0d12] transition-colors"
                style={{
                  background: 'rgba(252, 211, 77, 0.1)',
                  color: '#fcd34d',
                  border: '1px solid rgba(252, 211, 77, 0.2)',
                }}
              >
                <span className="text-lg">📷</span>
              </a>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div style={{ height: '1px', background: 'rgba(255, 255, 255, 0.08)' }} className="mb-8" />

        {/* Bottom */}
        <div className="flex flex-col md:flex-row items-center justify-between">
          <p style={{ color: '#94a3b8', fontSize: '14px' }}>
            © 2024 DOS2A. {t.rights}.
          </p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <a
              href="#"
              className="text-xs uppercase tracking-wider hover:text-[#fcd34d] transition-colors"
              style={{ color: '#94a3b8' }}
            >
              Privacy
            </a>
            <a
              href="#"
              className="text-xs uppercase tracking-wider hover:text-[#fcd34d] transition-colors"
              style={{ color: '#94a3b8' }}
            >
              Terms
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
