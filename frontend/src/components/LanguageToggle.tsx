// frontend/src/components/LanguageToggle.tsx
'use client';

import React from 'react';
import { useLanguage } from '@/hooks/useLanguage';

export const LanguageToggle: React.FC = () => {
  const { lang, changeLang } = useLanguage();

  return (
    <div
      className="fixed top-6 right-6 z-50 flex items-center gap-4 px-4 py-2 rounded-full border border-[rgba(255,255,255,0.12)] bg-[rgba(15,20,25,0.8)] backdrop-blur-md"
      style={{ animation: 'slideDown 0.6s ease 0.2s both' }}
    >
      <button
        onClick={() => changeLang('es')}
        className={`text-xs font-semibold uppercase tracking-widest transition-colors duration-300 ${
          lang === 'es'
            ? 'text-[#fcd34d]'
            : 'text-[#94a3b8] hover:text-[#f8fafc]'
        }`}
      >
        ES
      </button>
      <span style={{ color: '#94a3b8' }}>|</span>
      <button
        onClick={() => changeLang('en')}
        className={`text-xs font-semibold uppercase tracking-widest transition-colors duration-300 ${
          lang === 'en'
            ? 'text-[#fcd34d]'
            : 'text-[#94a3b8] hover:text-[#f8fafc]'
        }`}
      >
        EN
      </button>

      <style jsx>{`
        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
};

export default LanguageToggle;
