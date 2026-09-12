// Contact form handling. Strict client-side validation first; then either a
// real backend POST (when PUBLIC_CONTACT_FORM_ENDPOINT is configured) or an
// honest mailto fallback. It never pretends to send when no backend exists.

import { buildMailtoDestination, validateContact, type ContactFormValues } from '../utils/validate';

interface FormStatus {
  kind: 'idle' | 'error' | 'sent' | 'fallback' | 'unset';
  message: string;
}

export function initContactForm(form: HTMLFormElement): void {
  const statusEl = form.querySelector<HTMLElement>('[data-form-status]');
  const fields = form.querySelectorAll<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>(
    'input, select, textarea',
  );

  const renderErrors = (errors: Record<string, string>) => {
    form.querySelectorAll<HTMLElement>('[data-error-for]').forEach((node) => {
      const key = node.getAttribute('data-error-for');
      const message = key ? errors[key] : undefined;
      node.textContent = message ?? '';
      node.hidden = !message;
    });
    fields.forEach((field) => {
      const name = field.name;
      const invalid = Boolean(name && errors[name]);
      field.closest('.field')?.classList.toggle('is-invalid', invalid);
      field.setAttribute('aria-invalid', String(invalid));
    });
  };

  const setStatus = (status: FormStatus) => {
    if (!statusEl) return;
    statusEl.textContent = status.message;
    statusEl.setAttribute('role', status.kind === 'error' || status.kind === 'unset' ? 'alert' : 'status');
    statusEl.hidden = false;
  };

  const getValues = (): ContactFormValues => {
    const read = (name: string) =>
      (form.elements.namedItem(name) as HTMLInputElement | null)?.value ?? '';
    return {
      name: read('name'),
      email: read('email'),
      phone: read('phone'),
      company: read('company'),
      subject: read('subject'),
      message: read('message'),
    };
  };

  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    const values = getValues();
    const errors = validateContact(values);

    renderErrors(errors);

    if (Object.keys(errors).length > 0) {
      setStatus({
        kind: 'error',
        message: 'Please correct the highlighted fields and try again.',
      });
      const firstInvalid = form.querySelector<HTMLElement>('.field.is-invalid input, .field.is-invalid select, .field.is-invalid textarea');
      firstInvalid?.focus();
      return;
    }

    const endpoint = import.meta.env.PUBLIC_CONTACT_FORM_ENDPOINT as string | undefined;

    if (endpoint) {
      try {
        setStatus({ kind: 'idle', message: 'Sending your message…' });
        const response = await fetch(endpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
          body: JSON.stringify(values),
        });
        if (!response.ok) throw new Error(`Request failed: ${response.status}`);
        resetForm();
        setStatus({
          kind: 'sent',
          message: 'Thank you — your message has been sent. We will respond as soon as possible.',
        });
      } catch {
        setStatus({
          kind: 'error',
          message: 'Your message could not be sent. Please try again or reach us by email instead.',
        });
      }
      return;
    }

    // No backend configured yet — honest fallback.
    const email = (import.meta.env.PUBLIC_CONTACT_EMAIL as string | undefined) ?? '';
    if (!email) {
      setStatus({
        kind: 'unset',
        message:
          'A contact destination is not configured on this site yet. In the meantime, please reach out on the contact details provided.',
      });
      return;
    }

    setStatus({
      kind: 'fallback',
      message:
        'Validated and ready. Your email app will open with your message pre-filled — just press send.',
    });
    window.location.href = buildMailtoDestination(email, values);
  });

  // Clear per-field errors as the user corrects them.
  fields.forEach((field) => {
    field.addEventListener('input', () => {
      const name = field.name;
      if (!name) return;
      const node = form.querySelector<HTMLElement>(`[data-error-for="${name}"]`);
      if (node) {
        node.textContent = '';
        node.hidden = true;
      }
      field.closest('.field')?.classList.remove('is-invalid');
      field.setAttribute('aria-invalid', 'false');
    });
  });

  const resetForm = () => {
    form.reset();
    renderErrors({});
  };
}