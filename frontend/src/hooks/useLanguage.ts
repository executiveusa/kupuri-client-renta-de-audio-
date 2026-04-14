// frontend/src/hooks/useLanguage.ts
import { useState, useEffect, useCallback } from 'react';
import { Language } from '@/types';

export function useLanguage() {
  const [lang, setLang] = useState<Language>('es');

  useEffect(() => {
    // Load from localStorage on mount
    const savedLang = localStorage.getItem('dos2a_lang') as Language | null;
    if (savedLang) {
      setLang(savedLang);
    }
  }, []);

  const changeLang = useCallback((newLang: Language) => {
    setLang(newLang);
    localStorage.setItem('dos2a_lang', newLang);
  }, []);

  const t = useCallback(
    (key: string): string => {
      // Translation keys are structured as "section.key.lang"
      // This is a placeholder - actual translations are in a separate file
      return key;
    },
    [lang]
  );

  return { lang, changeLang, t };
}

// frontend/src/lib/api.ts
import { EventFormData, ProposalResponse, APIResponse } from '@/types';

const API_BASE = process.env.NEXT_PUBLIC_API_URL || '/api';

export async function submitEventForm(
  data: EventFormData
): Promise<APIResponse<ProposalResponse>> {
  try {
    const response = await fetch(`${API_BASE}/forms/submit`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Form submission error:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
      timestamp: new Date().toISOString(),
    };
  }
}

export async function getProposal(
  email: string
): Promise<APIResponse<ProposalResponse>> {
  try {
    const response = await fetch(`${API_BASE}/proposals/get?email=${email}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Proposal fetch error:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
      timestamp: new Date().toISOString(),
    };
  }
}

// frontend/src/hooks/useModal.ts
import { useState, useCallback } from 'react';

export function useModal() {
  const [isOpen, setIsOpen] = useState(false);

  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => setIsOpen(false), []);
  const toggle = useCallback(() => setIsOpen((prev) => !prev), []);

  return { isOpen, open, close, toggle };
}
