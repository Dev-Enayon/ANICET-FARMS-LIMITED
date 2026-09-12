// ---------------------------------------------------------------------------
// Verified WhatsApp contact channel — the ONLY verified direct contact number
// at this time. No other phone/email has been provided, so none is invented.
//
// wa.me links: desktop opens WhatsApp Web, mobile opens the WhatsApp app.
// Messages are encoded via URLSearchParams — never hand-built raw URLs.
// ---------------------------------------------------------------------------

export const whatsappNumber = '+234 817 669 7512';
export const whatsappDigits = '2348176697512';

export const whatsappInquiryMessage =
  'Hello ANICET FARMS LIMITED, I would like to make an inquiry.';

export function whatsappLink(message: string = whatsappInquiryMessage): string {
  const base = `https://wa.me/${whatsappDigits}`;
  if (!message.trim()) return base;
  // encodeURIComponent yields %20 for spaces (matches the spec example) and is
  // safe for the message body — never hand-build URLs with raw spaces.
  return `${base}?text=${encodeURIComponent(message.trim())}`;
}