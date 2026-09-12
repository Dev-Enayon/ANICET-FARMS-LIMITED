import { describe, expect, it } from 'vitest';
import { buildMailtoDestination, validateContact } from '../src/utils/validate';

const valid = {
  name: 'Ada Obi',
  email: 'ada@example.com',
  phone: '+353 87 000 0000',
  company: 'Sample Partners Ltd',
  subject: 'Partnership enquiry',
  message: 'We would like to discuss a potential partnership.',
};

describe('validateContact', () => {
  it('accepts a fully valid submission', () => {
    expect(validateContact(valid)).toEqual({});
  });

  it('accepts empty optional phone and company', () => {
    expect(validateContact({ ...valid, phone: '', company: '' })).toEqual({});
  });

  it('flags a missing name', () => {
    expect(validateContact({ ...valid, name: '' }).name).toBeTruthy();
  });

  it('flags an invalid email', () => {
    expect(validateContact({ ...valid, email: 'not-an-email' }).email).toBeTruthy();
  });

  it('flags a missing email', () => {
    expect(validateContact({ ...valid, email: '' }).email).toBeTruthy();
  });

  it('flags a message that is too short', () => {
    expect(validateContact({ ...valid, message: 'too short' }).message).toBeTruthy();
  });

  it('flags a missing subject', () => {
    expect(validateContact({ ...valid, subject: '' }).subject).toBeTruthy();
  });

  it('flags an invalid phone number', () => {
    expect(validateContact({ ...valid, phone: '####' }).phone).toBeTruthy();
  });

  it('returns multiple errors at once', () => {
    const errors = validateContact({ ...valid, name: '', email: '', subject: '' });
    expect(errors.name).toBeTruthy();
    expect(errors.email).toBeTruthy();
    expect(errors.subject).toBeTruthy();
  });
});

describe('buildMailtoDestination', () => {
  it('builds an encoded mailto URL', () => {
    const url = buildMailtoDestination('hello@anicetfarms.example', valid);
    expect(url.startsWith('mailto:hello@anicetfarms.example?subject=')).toBe(true);
    expect(decodeURIComponent(url)).toContain('Ada Obi');
    expect(decodeURIComponent(url)).toContain('Sample Partners Ltd');
  });

  it('omits optional fields when absent', () => {
    const url = buildMailtoDestination('hello@anicetfarms.example', {
      ...valid,
      phone: '',
      company: '',
    });
    const decoded = decodeURIComponent(url);
    expect(decoded).not.toContain('Phone:');
    expect(decoded).not.toContain('Company:');
  });
});