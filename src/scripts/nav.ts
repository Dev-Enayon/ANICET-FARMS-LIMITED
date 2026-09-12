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