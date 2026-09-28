// Product carousel — horizontal, snap-scrolled slider shown per category.
// Drives Prev/Next buttons, keyboard on the track, touch (native scroll with
// scroll-snap) and read-only position/count output. Reduced motion uses
// instant scrolling. Toggling a product image fires `product:open-image` with
// the current category's slide images for the shared lightbox.

interface SlideImage {
  src?: string;
  alt?: string;
  name?: string;
  description?: string;
}

function readStep(track: HTMLElement): number {
  const first = track.querySelector<HTMLElement>('[data-product-slide]');
  if (!first) return track.clientWidth;
  const gap = parseFloat(getComputedStyle(track).columnGap) || 0;
  return first.offsetWidth + gap;
}

export function initProductCarousel(root: ParentNode = document): void {
  const carousels = root.querySelectorAll<HTMLElement>('[data-product-carousel]');

  carousels.forEach((carousel) => {
    const track = carousel.querySelector<HTMLElement>('[data-product-track]');
    const prev = carousel.querySelector<HTMLButtonElement>('[data-product-prev]');
    const next = carousel.querySelector<HTMLButtonElement>('[data-product-next]');
    const countEl = carousel.querySelector<HTMLElement>('[data-product-count]');
    if (!track) return;

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
    const slides = () => track.querySelectorAll<HTMLElement>('[data-product-slide]');
    const behavior = (): ScrollBehavior => (reduced.matches ? 'auto' : 'smooth');

    const maxScroll = () => Math.max(0, track.scrollWidth - track.clientWidth);

    const update = (): void => {
      const total = slides().length;
      const step = readStep(track);
      const current = Math.round(track.scrollLeft / Math.max(1, step));
      const index = Math.min(current, Math.max(0, total - 1));
      if (countEl) countEl.textContent = `${index + 1} / ${total}`;
      if (prev) prev.disabled = track.scrollLeft < 4;
      if (next) next.disabled = track.scrollLeft > maxScroll() - 4;
    };

    const goBy = (direction: number): void => {
      const step = readStep(track);
      const target = Math.min(Math.max(0, track.scrollLeft + direction * step), maxScroll());
      track.scrollTo({ left: target, behavior: behavior() });
    };

    prev?.addEventListener('click', () => goBy(-1));
    next?.addEventListener('click', () => goBy(1));

    track.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);

    track.addEventListener('keydown', (event) => {
      if (event.key === 'ArrowLeft') {
        event.preventDefault();
        goBy(-1);
      } else if (event.key === 'ArrowRight') {
        event.preventDefault();
        goBy(1);
      }
    });

    // Open the lightbox from any product image trigger within this carousel.
    carousel.addEventListener('click', (event) => {
      const button = (event.target as HTMLElement).closest<HTMLElement>('[data-lightbox-open]');
      if (!button) return;
      const card = button.closest<HTMLElement>('[data-product-slide]');
      if (!card) return;
      const list = Array.from(slides());
      const images: SlideImage[] = list.map((slide) => ({
        src: slide.dataset.imageSrc,
        alt: slide.dataset.imageAlt,
        name: slide.dataset.imageName,
        description: slide.dataset.imageDescription,
      }));
      const index = Math.max(0, list.indexOf(card));
      document.dispatchEvent(
        new CustomEvent('product:open-image', {
          detail: { images, index },
        }),
      );
    });

    update();
  });
}