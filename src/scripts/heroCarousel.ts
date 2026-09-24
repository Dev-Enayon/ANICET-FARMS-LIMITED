// Shared, dependency-free FADE carousel powering the homepage hero on the
// desktop (>=768px) and mobile (<=767px) storefront heroes.
//
// Behaviour: autoplay every 6s, Previous/Next buttons, clickable indicators,
// keyboard ArrowLeft/ArrowRight, horizontal swipe (pointer events, page scroll
// untouched via touch-action: pan-y), pause while hovered/focused/touched and a
// delayed resume, eager first slide, reduced-motion fully respected.

const AUTOPLAY_INTERVAL = 6000;
const RESUME_DELAY = 3500;
const SWIPE_THRESHOLD = 48;

export function initHeroCarousel(root: HTMLElement): void {
  if (root.dataset.carouselReady === 'true') return;
  root.dataset.carouselReady = 'true';

  const slides = Array.from(
    root.querySelectorAll<HTMLElement>('[data-hero-slide]')
  );
  const dots = Array.from(
    root.querySelectorAll<HTMLButtonElement>('[data-hero-dot]')
  );
  const slidesRegion = root.querySelector<HTMLElement>('[data-hero-slides]');
  const prev = root.querySelector<HTMLButtonElement>('[data-hero-prev]');
  const next = root.querySelector<HTMLButtonElement>('[data-hero-next]');
  const count = slides.length;
  if (count === 0) return;

  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');

  let index = 0;
  let timer: number | undefined;
  let resumeTimer: number | undefined;
  let hoverPaused = false;
  let focusPaused = false;
  let pointerX = 0;
  let dragging = false;

  const blocked = () =>
    hoverPaused || focusPaused || reduced.matches || document.hidden;

  const setIndex = (next: number) => {
    index = (next + count) % count;
    slides.forEach((slide, i) => {
      const active = i === index;
      slide.style.opacity = active ? '1' : '0';
      slide.setAttribute('aria-hidden', String(!active));
    });
    dots.forEach((dot, i) => {
      dot.setAttribute('aria-current', String(i === index));
    });
    const img = slides[index].querySelector<HTMLImageElement>('img');
    if (img) img.loading = 'eager';
  };

  const stop = () => {
    if (timer !== undefined) window.clearInterval(timer);
    timer = undefined;
  };

  const restart = () => {
    stop();
    if (!blocked()) {
      timer = window.setInterval(() => setIndex(index + 1), AUTOPLAY_INTERVAL);
    }
  };

  const goTo = (next: number) => {
    setIndex(next);
    restart();
  };

  const pause = () => {
    stop();
    window.clearTimeout(resumeTimer);
    resumeTimer = undefined;
  };

  const scheduleResume = () => {
    window.clearTimeout(resumeTimer);
    resumeTimer = window.setTimeout(() => {
      hoverPaused = false;
      focusPaused = false;
      restart();
    }, RESUME_DELAY);
  };

  prev?.addEventListener('click', () => goTo(index - 1));
  next?.addEventListener('click', () => goTo(index + 1));
  dots.forEach((dot, i) => dot.addEventListener('click', () => goTo(i)));

  root.addEventListener('mouseenter', () => {
    hoverPaused = true;
    pause();
  });
  root.addEventListener('mouseleave', () => {
    hoverPaused = false;
    scheduleResume();
  });
  root.addEventListener('focusin', () => {
    focusPaused = true;
    pause();
  });
  root.addEventListener('focusout', (event) => {
    if (!root.contains(event.relatedTarget as Node | null)) {
      focusPaused = false;
      scheduleResume();
    }
  });

  root.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowLeft') {
      event.preventDefault();
      goTo(index - 1);
    } else if (event.key === 'ArrowRight') {
      event.preventDefault();
      goTo(index + 1);
    }
  });

  // Horizontal swipe; vertical panning stays with the browser (pan-y).
  const endDrag = () => {
    if (dragging) {
      dragging = false;
      scheduleResume();
    }
  };
  slidesRegion?.addEventListener('pointerdown', (event) => {
    dragging = true;
    pointerX = event.clientX;
    pause();
  });
  slidesRegion?.addEventListener('pointermove', (event) => {
    if (!dragging) return;
    const delta = event.clientX - pointerX;
    if (Math.abs(delta) > SWIPE_THRESHOLD) {
      dragging = false;
      goTo(delta < 0 ? index + 1 : index - 1);
    }
  });
  slidesRegion?.addEventListener('pointerup', endDrag);
  slidesRegion?.addEventListener('pointercancel', endDrag);

  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      stop();
    } else if (!reduced.matches) {
      restart();
    }
  });

  reduced.addEventListener('change', () => {
    if (reduced.matches) {
      stop();
    } else {
      restart();
    }
  });

  // Warm the lazy second slide soon after first paint so the first cross-fade
  // never waits on a late image.
  window.addEventListener(
    'load',
    () => {
      slides.forEach((slide) => {
        const img = slide.querySelector<HTMLImageElement>('img');
        if (img && img.loading === 'lazy') img.loading = 'eager';
      });
    },
    { once: true }
  );

  setIndex(0);
  restart();
}