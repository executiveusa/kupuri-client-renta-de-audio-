// frontend/src/components/Navigation.tsx
'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import { useLanguage } from '@/hooks/useLanguage';

export const Navigation: React.FC = () => {
  const { lang } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const translations = {
    es: {
      home: 'Inicio',
      services: 'Servicios',
      process: 'Proceso',
      pricing: 'Precios',
      faq: 'Preguntas',
    },
    en: {
      home: 'Home',
      services: 'Services',
      process: 'Process',
      pricing: 'Pricing',
      faq: 'FAQ',
    },
  };

  const t = translations[lang as keyof typeof translations];

  const navLinks = [
    { label: t.home, href: '/' },
    { label: t.services, href: '/servicios' },
    { label: t.process, href: '/proceso' },
    { label: t.pricing, href: '/precios' },
    { label: t.faq, href: '/faq' },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled
          ? 'bg-[rgba(10,13,18,0.95)] backdrop-blur-md border-b border-[rgba(255,255,255,0.08)]'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link href="/">
          <span
            className="text-2xl font-bold cursor-pointer hover:text-[#fcd34d] transition-colors"
            style={{ color: '#f8fafc', fontFamily: "'Sora', sans-serif" }}
          >
            DOS2A
          </span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex gap-8">
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href}>
              <span
                className="font-medium text-sm uppercase tracking-wider cursor-pointer hover:text-[#fcd34d] transition-colors"
                style={{ color: '#cbd5e1' }}
              >
                {link.label}
              </span>
            </Link>
          ))}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden"
          onClick={() => setIsOpen(!isOpen)}
          style={{ color: '#f8fafc' }}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>

        {/* Mobile Menu */}
        {isOpen && (
          <div
            className="absolute top-full left-0 right-0 md:hidden"
            style={{
              background: 'rgba(10, 13, 18, 0.95)',
              borderTop: '1px solid rgba(255, 255, 255, 0.08)',
            }}
          >
            <div className="flex flex-col gap-4 p-4">
              {navLinks.map((link) => (
                <Link key={link.href} href={link.href}>
                  <span
                    className="block py-2 text-sm uppercase tracking-wider cursor-pointer hover:text-[#fcd34d] transition-colors"
                    style={{ color: '#cbd5e1' }}
                    onClick={() => setIsOpen(false)}
                  >
                    {link.label}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
