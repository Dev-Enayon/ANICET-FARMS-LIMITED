// Product search behaviour for the header search bars. Reads the build-time
// product index serialised by <Search />, filters case-insensitively as the
// user types, and renders suggestions under any [data-search-form] on the
// page (desktop pill + mobile stacked bar). Submissions use the native GET
// form (action /products/, input name=q); selection links back to the
// catalogue page (there are no per-product pages on this site).

import type { Product } from '../data/types';

interface SearchResult {
  name: string;
  category: string;
  description: string;
  packaging?: string;
  unit?: string;
  availability?: Product['availability'];
}

function readIndex(): SearchResult[] {
  const source = document.querySelector<HTMLScriptElement>(
    'script[data-search-index]',
  );
  if (!source) return [];
  try {
    return JSON.parse(source.textContent || '[]') as SearchResult[];
  } catch {
    return [];
  }
}

function escapeHtml(value: string): string {
  return value.replace(/[&<>"']/g, (char) => {
    const map: Record<string, string> = {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#39;',
    };
    return map[char];
  });
}

function availabilityLabel(availability?: Product['availability']): string {
  if (availability === 'in-stock') return 'Available';
  if (availability === 'request-information') return 'Request information';
  return 'Pending specification';
}

function matches(query: string, product: SearchResult): boolean {
  return [product.name, product.category, product.description, product.packaging, product.unit]
    .filter(Boolean)
    .some((field) => field!.toLowerCase().includes(query));
}

export function initSearch(products: SearchResult[] = readIndex()): void {
  const forms = document.querySelectorAll<HTMLFormElement>('[data-search-form]');
  if (!forms.length) return;

  const bindSearchBar = (form: HTMLFormElement): void => {
    const bar = form.closest<HTMLElement>('.searchbar');
    const input = form.querySelector<HTMLInputElement>('[data-search-input]');
    const panel = bar?.querySelector<HTMLElement>('[data-search-panel]');
    const resultsEl = bar?.querySelector<HTMLDivElement>('[data-search-results]');
    const statusEl = bar?.querySelector<HTMLElement>('[data-search-status]');
    if (!bar || !input || !panel || !resultsEl || !statusEl) return;

    const showPanel = () => {
      panel.hidden = false;
    };
    const hidePanel = () => {
      panel.hidden = true;
    };

    const render = (raw: string): void => {
      const query = raw.trim().toLowerCase();

      if (!query) {
        statusEl.textContent = 'Start typing to search the product catalogue.';
        resultsEl.innerHTML = '';
        hidePanel();
        return;
      }

      const hits = products.filter((product) => matches(query, product));

      showPanel();

      if (hits.length === 0) {
        statusEl.textContent = `No products found for "${raw.trim()}".`;
        resultsEl.innerHTML =
          '<div class="search-empty">' +
          '<p>The catalogue is published as specifications are verified. No product claims are made until confirmed.</p>' +
          '<a class="btn btn--accent btn--sm" href="/products/">View the catalogue</a>' +
          '</div>';
        return;
      }

      statusEl.textContent = `${hits.length} product${hits.length === 1 ? '' : 's'} found.`;
      resultsEl.innerHTML = hits
        .slice(0, 8)
        .map(
          (product) =>
            `<a class="search-result" href="/products/">` +
            `<span class="search-result__name">${escapeHtml(product.name)}</span>` +
            `<span class="search-result__meta">${escapeHtml(product.category)} · ${availabilityLabel(product.availability)}</span>` +
            `</a>`,
        )
        .join('');
    };

    input.addEventListener('input', () => render(input.value));
    input.addEventListener('focus', () => {
      if (input.value.trim()) render(input.value);
    });

    // Escape closes the suggestion panel without clearing the query.
    input.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') {
        hidePanel();
        input.blur();
      }
    });

    // Clicking anywhere outside a search bar dismisses its suggestions.
    document.addEventListener('click', (event) => {
      if (!(event.target as HTMLElement).closest('.searchbar')) hidePanel();
    });

    // Picking a suggestion navigates to the catalogue; dismiss first.
    resultsEl.addEventListener('click', (event) => {
      if ((event.target as HTMLElement).closest('a')) hidePanel();
    });
  };

  forms.forEach(bindSearchBar);
}