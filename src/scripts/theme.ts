// Theme (light/dark) handling.
//
// The saved/system theme is applied *before* first paint by an inline script in
// BaseLayout (see the <head> of src/layouts/BaseLayout.astro) to prevent a flash
// of the wrong theme. This module powers the visible switch: it keeps every
// [data-theme-toggle] control in sync, persists the choice, and updates the
// browser theme-color.

export type Theme = 'light' | 'dark';

export const THEME_KEY = 'anicet-theme';

export const THEME_COLORS: Record<Theme, string> = {
  light: '#f4f0e6', // parchment
  dark: '#14110c', // deep sable
};

function currentTheme(): Theme {
  const attr = document.documentElement.getAttribute('data-theme');
  return attr === 'dark' ? 'dark' : 'light';
}

export function getSystemTheme(): Theme {
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

export function initThemeToggle(): void {
  const toggles = document.querySelectorAll<HTMLButtonElement>('[data-theme-toggle]');
  if (toggles.length === 0) return;

  const apply = (theme: Theme) => {
    document.documentElement.setAttribute('data-theme', theme);

    toggles.forEach((toggle) => {
      const isDark = theme === 'dark';
      // aria-checked reflects the switch state (dark = on); the label states
      // the *action* the control will perform.
      toggle.setAttribute('aria-checked', String(isDark));
      toggle.setAttribute('aria-label', isDark ? 'Switch to light mode' : 'Switch to dark mode');
    });

    const meta = document.querySelector<HTMLMetaElement>('meta[name="theme-color"]');
    if (meta) meta.setAttribute('content', THEME_COLORS[theme]);

    try {
      localStorage.setItem(THEME_KEY, theme);
    } catch {
      /* storage unavailable — theme still applies for this session */
    }
  };

  // Initial state comes from the pre-render inline script (saved or system).
  apply(currentTheme());

  toggles.forEach((toggle) => {
    toggle.addEventListener('click', () => {
      apply(currentTheme() === 'dark' ? 'light' : 'dark');
    });
  });
}