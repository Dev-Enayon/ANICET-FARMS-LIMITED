// Dependency-free auto-sliding cross-fade for the full-width collection
// cards on the Products page ([data-catcard-slides]).
//
// Behaviour: autoplay every 4.5s, cross-fade between stacked photos, "current /
// total" counter, pause while hovered/focused with a delayed resume, and one
// window load warms any lazy slide so a cross-fade never waits on a late image.
// Reduced motion and hidden tabs fully stop the animation; the first slide
// stays visible.

const AUTOPLAY_INTERVAL = 4500;
const RESUME_DELAY = 3000;

export function initCatCardSlideshow(root: ParentNode = document): void {
  const regions = Array.from(
    root.querySelectorAll<HTMLElement>('[data-catcard-slides]')
  );
  if (regions.length === 0) return;

  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');

  regions.forEach((region) => {
    if (region.dataset.catcardSlidesReady === 'true') return;
    region.dataset.catcardSlidesReady = 'true';

    const slides = Array.from(
      region.querySelectorAll<HTMLElement>('[data-catcard-slide]')
    );
    const count = slides.length;
    if (count < 2) return;

    const counter = region.querySelector<HTMLElement>('[data-catcard-count]');

    let index = 0;
    let hoverPaused = false;
    let focusPaused = false;
    let timer: number | undefined;
    let resumeTimer: number | undefined;

    const blocked = () =>
      hoverPaused || focusPaused || reduced.matches || document.hidden;

    const setIndex = (next: number) => {
      index = (next + count) % count;
      slides.forEach((slide, i) => {
        const active = i === index;
        slide.style.opacity = active ? '1' : '0';
        slide.setAttribute('aria-hidden', String(!active));
        // The active slide carries the slow Ken-Burns drift (see
        // .catcard__photo.is-active in ProductCategoryCard.astro).
        slide.classList.toggle('is-active', active);
      });
      if (counter) counter.textContent = `${index + 1} / ${count}`;
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

    region.addEventListener('mouseenter', () => {
      hoverPaused = true;
      pause();
    });
    region.addEventListener('mouseleave', () => {
      hoverPaused = false;
      scheduleResume();
    });
    region.addEventListener('focusin', () => {
      focusPaused = true;
      pause();
    });
    region.addEventListener('focusout', (event) => {
      if (!region.contains(event.relatedTarget as Node | null)) {
        focusPaused = false;
        scheduleResume();
      }
    });

    document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
        stop();
      } else {
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

    window.addEventListener(
      'load',
      () => {
        slides.forEach((slide) => {
          const img = slide as HTMLImageElement;
          if (img.loading === 'lazy') img.loading = 'eager';
        });
      },
      { once: true }
    );

    setIndex(0);
    restart();
  });
}