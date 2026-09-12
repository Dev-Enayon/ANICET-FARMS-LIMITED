import { describe, expect, it } from 'vitest';
import { whatsappDigits, whatsappInquiryMessage, whatsappLink } from '../src/data/whatsapp';

describe('whatsappLink', () => {
  it('returns the base wa.me link without a message query when message is empty', () => {
    expect(whatsappLink('')).toBe(`https://wa.me/${whatsappDigits}`);
  });

  it('returns the correctly encoded default enquiry link', () => {
    expect(whatsappLink()).toBe(
      'https://wa.me/2348176697512?text=Hello%20ANICET%20FARMS%20LIMITED%2C%20I%20would%20like%20to%20make%20an%20inquiry.',
    );
  });

  it('encodes the default message via encodeURIComponent (no raw spaces)', () => {
    expect(whatsappLink()).toContain(encodeURIComponent(whatsappInquiryMessage));
    expect(whatsappLink()).not.toContain(' ');
  });

  it('encodes a custom message', () => {
    const link = whatsappLink('Partnership enquiry for product supply');
    expect(link).toBe(
      `https://wa.me/${whatsappDigits}?text=${encodeURIComponent('Partnership enquiry for product supply')}`,
    );
  });

  it('always targets the verified number digits', () => {
    expect(whatsappLink()).toContain('https://wa.me/2348176697512');
    expect(whatsappDigits).toBe('2348176697512');
  });
});