// Header + mobile-menu behaviour. Uses the native <dialog> element so focus
// trapping, Escape-to-close and top-layer stacking come for free.

export function initNav(): void {
  const toggle = document.querySelector<HTMLButtonElement>('[data-nav-open]');
  const dialog = document.querySelector<HTMLDialogElement>('[data-nav-dialog]');
  const close = document.querySelector<HTMLButtonElement>('[data-nav-close]');

  const setScrolled = () => {
    document.body.classList.toggle('is-scrolled', window.scrollY > 8);
  };
  document.addEventListener('scroll', setScrolled, { passive: true });
  setScrolled();

  if (!toggle || !dialog || !close) return;

  const openMenu = () => {
    if (!dialog.open) dialog.showModal();
    toggle.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
    const first = dialog.querySelector<HTMLElement>('[data-nav-close], .site-menu__link, a');
    first?.focus();
  };

  const closeMenu = () => {
    if (dialog.open) dialog.close();
    toggle.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  };

  toggle.addEventListener('click', () => (dialog.open ? closeMenu() : openMenu()));
  close.addEventListener('click', closeMenu);
  dialog.addEventListener('close', closeMenu);

  // The fixed bottom navigation's "Menu" slot opens the same dialog.
  document.querySelectorAll<HTMLButtonElement>('[data-bottom-menu]').forEach((trigger) => {
    trigger.addEventListener('click', () => {
      if (!dialog.open) openMenu();
      trigger.setAttribute('aria-expanded', String(dialog.open));
    });
  });

  // Close when the backdrop itself is clicked.
  dialog.addEventListener('click', (event) => {
    const rect = dialog.getBoundingClientRect();
    const isOutside =
      event.clientX < rect.left ||
      event.clientX > rect.right ||
      event.clientY < rect.top ||
      event.clientY > rect.bottom;
    if (isOutside) closeMenu();
  });

  // Close after navigating from the mobile menu.
  dialog.querySelectorAll<HTMLAnchorElement>('.site-menu__link, .site-menu [data-cta]').forEach((link) => {
    link.addEventListener('click', () => {
      if (link.target === '_blank') return;
      closeMenu();
    });
  });
}

// Full-screen mobile search overlay, opened by the bottom navigation's Search
// tab. Reuses the existing [data-search-form] inputs (bound by search.ts).
export function initMobileSearchOverlay(): void {
  const overlay = document.querySelector<HTMLElement>('[data-search-overlay]');
  if (!overlay) return;
  const openButtons = Array.from(document.querySelectorAll<HTMLElement>('[data-search-open]'));
  const closeButton = document.querySelector<HTMLElement>('[data-search-close]');
  const input = overlay.querySelector<HTMLInputElement>('[data-search-input]');

  const openOverlay = () => {
    overlay.hidden = false;
    document.body.style.overflow = 'hidden';
    openButtons.forEach((button) => button.setAttribute('aria-expanded', 'true'));
    window.setTimeout(() => input?.focus(), 0);
  };

  const closeOverlay = () => {
    overlay.hidden = true;
    document.body.style.overflow = '';
    openButtons.forEach((button) => button.setAttribute('aria-expanded', 'false'));
  };

  openButtons.forEach((button) => button.addEventListener('click', openOverlay));
  closeButton?.addEventListener('click', closeOverlay);
  overlay.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') closeOverlay();
  });
  overlay.addEventListener('click', (event) => {
    if (event.target === overlay) closeOverlay();
  });
}

// Dismissible storefront info banner. Hides on demand and remembers the choice
// in localStorage (wrapped in try/catch so storage failures never break it).
export function initInfoBanner(): void {
  const banner = document.querySelector<HTMLElement>('[data-info-banner]');
  if (!banner) return;
  const KEY = 'anicet-info-banner-dismissed';

  try {
    if (localStorage.getItem(KEY) === '1') banner.hidden = true;
  } catch {
    // Storage unavailable — keep the banner visible.
  }

  banner.querySelector<HTMLElement>('[data-info-dismiss]')?.addEventListener('click', () => {
    banner.hidden = true;
    try {
      localStorage.setItem(KEY, '1');
    } catch {
      // Ignore persistence failures.
    }
  });
}