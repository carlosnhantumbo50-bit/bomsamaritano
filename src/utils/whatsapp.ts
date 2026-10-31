import { StoredQuote } from '../types';

export const AGENCY_PHONE_CALLS = '852808080';
export const AGENCY_PHONE_CALLS_DISPLAY = '+258 852 808 080';
export const AGENCY_WHATSAPP = '258865606060';
export const AGENCY_WHATSAPP_DISPLAY = '+258 865 606 060';
export const AGENCY_EMAIL = 'bomsamaritanoavt@outlook.com';
export const AGENCY_ADDRESS = 'Av. Eduardo Mondlane, Paragem Belita, Maputo — Moçambique';
export const AGENCY_INSTAGRAM = '@bom_samaritano.viagens';
export const AGENCY_FACEBOOK = '/bomsamaritanoviagens';
export const AGENCY_WEBSITE = 'bomsamaritano.co.mz';

/**
 * Builds a direct WhatsApp click URL (compatible with Mobile App and WhatsApp Web).
 */
export function buildWhatsAppUrl(message: string): string {
  const encodedText = encodeURIComponent(message.trim());
  return `https://wa.me/${AGENCY_WHATSAPP}?text=${encodedText}`;
}

/**
 * Opens WhatsApp in a new tab/window or triggers app on mobile.
 */
export function openWhatsApp(message: string): void {
  const url = buildWhatsAppUrl(message);
  window.open(url, '_blank', 'noopener,noreferrer');
}

/**
 * Save request to browser local storage for agency tracking.
 */
export function saveQuoteLocally(quote: Omit<StoredQuote, 'id' | 'timestamp' | 'status'>): StoredQuote {
  const newQuote: StoredQuote = {
    id: 'BS-' + Date.now().toString().slice(-6),
    timestamp: new Date().toLocaleString('pt-MZ', {
      dateStyle: 'short',
      timeStyle: 'short',
    }),
    status: 'Novo',
    ...quote,
  };

  try {
    const existing = localStorage.getItem('bom_samaritano_quotes');
    const list: StoredQuote[] = existing ? JSON.parse(existing) : [];
    list.unshift(newQuote);
    // Keep last 50
    localStorage.setItem('bom_samaritano_quotes', JSON.stringify(list.slice(0, 50)));
  } catch (e) {
    console.warn('Could not save quote to localStorage', e);
  }

  return newQuote;
}

export function getStoredQuotes(): StoredQuote[] {
  try {
    const existing = localStorage.getItem('bom_samaritano_quotes');
    return existing ? JSON.parse(existing) : [];
  } catch (e) {
    return [];
  }
}

export function deleteStoredQuote(id: string): void {
  try {
    const existing = localStorage.getItem('bom_samaritano_quotes');
    if (!existing) return;
    const list: StoredQuote[] = JSON.parse(existing);
    const updated = list.filter((q) => q.id !== id);
    localStorage.setItem('bom_samaritano_quotes', JSON.stringify(updated));
  } catch (e) {
    console.warn('Could not delete quote', e);
  }
}

export function updateStoredQuoteStatus(id: string, status: StoredQuote['status']): void {
  try {
    const existing = localStorage.getItem('bom_samaritano_quotes');
    if (!existing) return;
    const list: StoredQuote[] = JSON.parse(existing);
    const updated = list.map((q) => (q.id === id ? { ...q, status } : q));
    localStorage.setItem('bom_samaritano_quotes', JSON.stringify(updated));
  } catch (e) {
    console.warn('Could not update status', e);
  }
}
