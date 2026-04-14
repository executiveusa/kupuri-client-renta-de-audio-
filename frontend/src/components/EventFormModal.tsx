// frontend/src/components/EventFormModal.tsx
'use client';

import React, { useState } from 'react';
import { EventFormData, EventType } from '@/types';
import { submitEventForm } from '@/lib/api';
import gsap from 'gsap';
import { useLanguage } from '@/hooks/useLanguage';

interface EventFormModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const EventFormModal: React.FC<EventFormModalProps> = ({
  isOpen,
  onClose,
}) => {
  const { lang } = useLanguage();
  const [formData, setFormData] = useState<EventFormData>({
    name: '',
    email: '',
    eventType: 'fiesta',
    needs: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const translations = {
    es: {
      title: 'Solicita tu propuesta',
      subtitle: 'Cuéntanos sobre tu evento. Responderemos en 24 horas.',
      name: 'Nombre',
      email: 'Correo electrónico',
      eventType: 'Tipo de evento',
      needs: '¿Qué necesitas?',
      submit: 'Enviar solicitud',
      success: '¡Solicitud enviada! Nos pondremos en contacto pronto.',
      error: 'Error al enviar. Por favor, intenta de nuevo.',
      selectEvent: 'Selecciona',
      fiesta: 'Fiesta grande',
      concierto: 'Concierto',
      corporativo: 'Corporativo',
      otro: 'Otro',
    },
    en: {
      title: 'Request your proposal',
      subtitle: 'Tell us about your event. We\'ll respond within 24 hours.',
      name: 'Name',
      email: 'Email',
      eventType: 'Event type',
      needs: 'What do you need?',
      submit: 'Send request',
      success: 'Request sent! We\'ll contact you soon.',
      error: 'Error sending. Please try again.',
      selectEvent: 'Select',
      fiesta: 'Big party',
      concierto: 'Concert',
      corporativo: 'Corporate',
      otro: 'Other',
    },
  };

  const t = translations[lang as keyof typeof translations];
  const eventTypeLabels = {
    es: { fiesta: t.fiesta, concierto: t.concierto, corporativo: t.corporativo, otro: t.otro },
    en: { fiesta: t.fiesta, concierto: t.concierto, corporativo: t.corporativo, otro: t.otro },
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);

    try {
      const result = await submitEventForm(formData);

      if (result.success) {
        // Show success and close
        alert(t.success);
        setFormData({
          name: '',
          email: '',
          eventType: 'fiesta',
          needs: '',
        });
        onClose();
      } else {
        setError(result.error || t.error);
      }
    } catch (err) {
      setError(t.error);
      console.error('Form submission error:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Modal animation
  React.useEffect(() => {
    if (isOpen) {
      gsap.to('.modal-overlay', { opacity: 1, duration: 0.3 });
      gsap.to('.modal-content', { scale: 1, opacity: 1, duration: 0.4 });
    } else {
      gsap.to('.modal-overlay', { opacity: 0, duration: 0.3 });
      gsap.to('.modal-content', { scale: 0.9, opacity: 0, duration: 0.3 });
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      className="modal-overlay fixed inset-0 z-50 flex items-center justify-center opacity-0"
      style={{
        background: 'rgba(5, 6, 8, 0.8)',
        backdropFilter: 'blur(12px)',
      }}
      onClick={onClose}
    >
      <div
        className="modal-content relative bg-gradient-to-br from-[#0f1419] to-[#0a0d12] rounded-2xl p-8 max-w-md w-full shadow-2xl border border-[rgba(255,255,255,0.12)] scale-90 opacity-0"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 text-[#94a3b8] hover:text-[#f8fafc] transition-colors"
          aria-label="Close"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        {/* Title */}
        <h2
          className="text-2xl font-bold mb-2"
          style={{
            fontSize: 'clamp(20px, 4vw, 28px)',
            color: '#f8fafc',
            fontFamily: "'Sora', sans-serif",
          }}
        >
          {t.title}
        </h2>

        <p
          className="text-sm mb-6"
          style={{
            color: '#94a3b8',
            lineHeight: 1.6,
          }}
        >
          {t.subtitle}
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name */}
          <div>
            <label
              className="block text-xs font-semibold uppercase tracking-wider mb-2"
              style={{ color: '#cbd5e1' }}
            >
              {t.name}
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
              className="w-full px-3 py-2 rounded-lg border border-[rgba(255,255,255,0.12)] bg-[rgba(255,255,255,0.04)] text-[#f8fafc] placeholder-[#64748b] focus:outline-none focus:border-[#fcd34d] focus:bg-[rgba(255,255,255,0.06)] transition-all"
              placeholder="Your name"
            />
          </div>

          {/* Email */}
          <div>
            <label
              className="block text-xs font-semibold uppercase tracking-wider mb-2"
              style={{ color: '#cbd5e1' }}
            >
              {t.email}
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
              className="w-full px-3 py-2 rounded-lg border border-[rgba(255,255,255,0.12)] bg-[rgba(255,255,255,0.04)] text-[#f8fafc] placeholder-[#64748b] focus:outline-none focus:border-[#fcd34d] focus:bg-[rgba(255,255,255,0.06)] transition-all"
              placeholder="your@email.com"
            />
          </div>

          {/* Event Type */}
          <div>
            <label
              className="block text-xs font-semibold uppercase tracking-wider mb-2"
              style={{ color: '#cbd5e1' }}
            >
              {t.eventType}
            </label>
            <select
              name="eventType"
              value={formData.eventType}
              onChange={handleInputChange}
              className="w-full px-3 py-2 rounded-lg border border-[rgba(255,255,255,0.12)] bg-[rgba(255,255,255,0.04)] text-[#f8fafc] focus:outline-none focus:border-[#fcd34d] focus:bg-[rgba(255,255,255,0.06)] transition-all"
            >
              <option value="">{t.selectEvent}</option>
              <option value="fiesta">{t.fiesta}</option>
              <option value="concierto">{t.concierto}</option>
              <option value="corporativo">{t.corporativo}</option>
              <option value="otro">{t.otro}</option>
            </select>
          </div>

          {/* Needs */}
          <div>
            <label
              className="block text-xs font-semibold uppercase tracking-wider mb-2"
              style={{ color: '#cbd5e1' }}
            >
              {t.needs}
            </label>
            <textarea
              name="needs"
              value={formData.needs}
              onChange={handleInputChange}
              required
              rows={3}
              className="w-full px-3 py-2 rounded-lg border border-[rgba(255,255,255,0.12)] bg-[rgba(255,255,255,0.04)] text-[#f8fafc] placeholder-[#64748b] focus:outline-none focus:border-[#fcd34d] focus:bg-[rgba(255,255,255,0.06)] transition-all resize-none"
              placeholder="Audio, lighting, visuals..."
            />
          </div>

          {/* Error message */}
          {error && (
            <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 text-sm">
              {error}
            </div>
          )}

          {/* Submit button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3 rounded-lg font-semibold text-sm uppercase tracking-wider transition-all duration-300 disabled:opacity-50"
            style={{
              background: isSubmitting
                ? 'rgba(252, 211, 77, 0.3)'
                : 'linear-gradient(135deg, #fcd34d, #f59e0b)',
              color: '#0a0d12',
            }}
          >
            {isSubmitting ? 'Enviando...' : t.submit}
          </button>
        </form>
      </div>
    </div>
  );
};

export default EventFormModal;
