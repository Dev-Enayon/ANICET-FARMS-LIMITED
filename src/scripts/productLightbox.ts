// Product image lightbox — full-screen dialog over a darkened backdrop.
// Body scroll is locked while open, focus is trapped, and focus is restored
// to the triggering element on close. Escape closes; arrow keys navigate.
// Reduced motion is respected by the CSS layer (global rule collapses
// transitions to ~0ms).

interface LightboxImage {
  src?: string;
  alt?: string;
  name?: string;
  description?: string;
}

export function initProductLightbox(root: ParentNode = document): void {
  const lightbox = root.querySelector<HTMLElement>('[data-product-lightbox]');
  if (!lightbox) return;

  const image = lightbox.querySelector<HTMLImageElement>('[data-lightbox-img]');
  const meta = lightbox.querySelector<HTMLElement>('[data-lightbox-meta]');
  const count = lightbox.querySelector<HTMLElement>('[data-lightbox-count]');
  const close = lightbox.querySelector<HTMLButtonElement>('[data-lightbox-close]');
  const prev = lightbox.querySelector<HTMLButtonElement>('[data-lightbox-prev]');
  const next = lightbox.querySelector<HTMLButtonElement>('[data-lightbox-next]');
  const backdrop = lightbox.querySelector<HTMLElement>('[data-lightbox-backdrop]');

  let images: LightboxImage[] = [];
  let index = 0;
  let lastFocus: HTMLElement | null = null;

  const render = (): void => {
    const item = images[index];
    if (!item || !image) return;
    image.src = item.src ?? '';
    image.alt = item.alt ?? '';
    if (meta) {
      meta.innerHTML = `${item.name ?? ''}${item.description ? `<span>${item.description}</span>` : ''}`;
    }
    if (count) count.textContent = `${index + 1} / ${images.length}`;
    if (prev) prev.disabled = index === 0;
    if (next) next.disabled = index === images.length - 1;
  };

  const lockScroll = (): void => {
    document.documentElement.style.overflow = 'hidden';
  };
  const unlockScroll = (): void => {
    document.documentElement.style.overflow = '';
  };

  const open = (): void => {
    lastFocus = document.activeElement as HTMLElement | null;
    lightbox.classList.add('is-open');
    lightbox.setAttribute('aria-hidden', 'false');
    lightbox.removeAttribute('inert');
    lockScroll();
    render();
    close?.focus();
  };

  const closeLightbox = (): void => {
    lightbox.classList.remove('is-open');
    lightbox.setAttribute('aria-hidden', 'true');
    lightbox.setAttribute('inert', '');
    unlockScroll();
    lastFocus?.focus?.();
  };

  const go = (direction: number): void => {
    const nextIndex = index + direction;
    if (nextIndex < 0 || nextIndex >= images.length) return;
    index = nextIndex;
    render();
  };

  document.addEventListener('product:open-image', (event) => {
    const detail = (event as CustomEvent<{ images: LightboxImage[]; index: number }>).detail;
    if (!Array.isArray(detail.images) || detail.images.length === 0) return;
    images = detail.images;
    index = Math.min(Math.max(0, detail.index), images.length - 1);
    open();
  });

  close?.addEventListener('click', closeLightbox);
  prev?.addEventListener('click', () => go(-1));
  next?.addEventListener('click', () => go(1));

  lightbox.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      event.preventDefault();
      closeLightbox();
    } else if (event.key === 'ArrowLeft') {
      event.preventDefault();
      go(-1);
    } else if (event.key === 'ArrowRight') {
      event.preventDefault();
      go(1);
    } else if (event.key === 'Tab') {
      // Minimal focus trap around the three lightbox controls.
      const focusables = [close, prev, next].filter((el): el is HTMLButtonElement => !!el);
      if (focusables.length === 0) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }
  });

  backdrop?.addEventListener('click', closeLightbox);
}