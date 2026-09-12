// Pure, framework-free validation for the enquiry form. Kept DOM-free so it
// can be unit-tested in isolation.

export interface ContactFormValues {
  name: string;
  email: string;
  phone: string;
  company: string;
  subject: string;
  message: string;
}

export type ContactFormErrors = Partial<Record<keyof ContactFormValues, string>>;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
// Accepts international landline/mobile formats, e.g. +353 813 000 000,
// 0813 000 000, 01-234-5678. Pure letter/emoji strings are rejected.
const PHONE_RE = /^\+?[0-9][0-9\s().-]{6,}$/;

export function validateContact(values: ContactFormValues): ContactFormErrors {
  const errors: ContactFormErrors = {};

  const name = values.name.trim();
  if (!name) {
    errors.name = 'Please enter your full name.';
  } else if (name.length < 2) {
    errors.name = 'Your name must be at least 2 characters.';
  }

  const email = values.email.trim();
  if (!email) {
    errors.email = 'Please enter your email address.';
  } else if (!EMAIL_RE.test(email)) {
    errors.email = 'Please enter a valid email address.';
  }

  const phone = values.phone.trim();
  if (phone && !PHONE_RE.test(phone)) {
    errors.phone = 'Please enter a valid phone number (digits, spaces, + or -).';
  }

  const subject = values.subject.trim();
  if (!subject) {
    errors.subject = 'Please choose a subject.';
  }

  const message = values.message.trim();
  if (!message) {
    errors.message = 'Please enter your message.';
  } else if (message.length < 10) {
    errors.message = 'Your message should be at least 10 characters.';
  }

  return errors;
}

/**
 * Builds a `mailto:` URL used as the honest, backend-free fallback after
 * client-side validation succeeds. The email address must come from verified
 * company data (or remain empty, in which case the caller shows a status note).
 */
export function buildMailtoDestination(
  email: string,
  values: ContactFormValues,
): string {
  const subject = encodeURIComponent(
    `[Website enquiry] ${values.subject}${values.company ? ` — from ${values.company}` : ''}`,
  );
  const body = encodeURIComponent(
    [
      `Name: ${values.name}`,
      `Email: ${values.email}`,
      values.phone ? `Phone: ${values.phone}` : null,
      values.company ? `Company: ${values.company}` : null,
      '',
      `Message:`,
      values.message,
      '',
      '— sent via the ANICET FARMS LIMITED website',
    ]
      .filter((line): line is string => line !== null)
      .join('\n'),
  );
  return `mailto:${email}?subject=${subject}&body=${body}`;
}