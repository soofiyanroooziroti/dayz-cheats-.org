const STORAGE_KEY = 'siteLocale';

const VIEWPORT_MARGIN = 8;

function positionHeaderMenu(trigger: HTMLButtonElement, menu: HTMLElement) {
  const rect = trigger.getBoundingClientRect();
  const viewportW = Math.min(
    document.documentElement?.clientWidth ?? window.innerWidth,
    window.innerWidth,
  );
  const minW = 220;
  const width = Math.min(Math.max(rect.width, minW), viewportW - VIEWPORT_MARGIN * 2);
  const idealLeft = rect.right - width;
  const left = Math.min(Math.max(VIEWPORT_MARGIN, idealLeft), viewportW - VIEWPORT_MARGIN - width);

  menu.style.top = `${rect.bottom + 8}px`;
  menu.style.left = `${left}px`;
  menu.style.right = 'auto';
  menu.style.width = `${width}px`;
}

function clearHeaderMenuPosition(menu: HTMLElement) {
  menu.style.top = '';
  menu.style.right = '';
  menu.style.left = '';
  menu.style.width = '';
}

function initLanguageSwitchers() {
  document.querySelectorAll('[data-language-switcher]').forEach((root) => {
    if (root.getAttribute('data-language-bound') === '1') return;
    root.setAttribute('data-language-bound', '1');

    const trigger = root.querySelector('[data-language-trigger]');
    const menu = root.querySelector('[data-language-menu]');
    if (!(trigger instanceof HTMLButtonElement) || !(menu instanceof HTMLElement)) return;

    const variant = root.getAttribute('data-language-variant') ?? 'header';
    const options = [...menu.querySelectorAll<HTMLAnchorElement>('a[data-locale-option]')];
    const stored = (() => {
      try {
        return localStorage.getItem(STORAGE_KEY);
      } catch {
        return null;
      }
    })();
    if (stored) {
      options.forEach((link) => {
        link.classList.toggle('ring-1', link.dataset.localeOption === stored);
      });
    }

    let focusReturn = trigger;
    let rafId: number | null = null;

    const repositionHeaderMenu = () => {
      if (variant !== 'header' || menu.hidden) return;
      if (rafId !== null) return;
      rafId = window.requestAnimationFrame(() => {
        rafId = null;
        if (!menu.hidden) positionHeaderMenu(trigger, menu);
      });
    };

    const close = () => {
      if (rafId !== null) {
        window.cancelAnimationFrame(rafId);
        rafId = null;
      }
      menu.hidden = true;
      menu.classList.add('pointer-events-none', 'opacity-0');
      trigger.setAttribute('aria-expanded', 'false');
      if (variant === 'header') {
        clearHeaderMenuPosition(menu);
      }
      focusReturn.focus();
    };

    const open = () => {
      if (variant === 'header') {
        positionHeaderMenu(trigger, menu);
      }
      menu.hidden = false;
      menu.classList.remove('pointer-events-none', 'opacity-0');
      trigger.setAttribute('aria-expanded', 'true');
      focusReturn = trigger;
      const selected = options.find((o) => o.closest('li')?.getAttribute('aria-selected') === 'true');
      (selected ?? options[0])?.focus();
    };

    trigger.addEventListener('click', (e) => {
      e.stopPropagation();
      if (menu.hidden) open();
      else close();
    });

    document.addEventListener('click', (e) => {
      if (!root.contains(e.target as Node)) close();
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && !menu.hidden) {
        e.preventDefault();
        close();
      }
      if (!menu.hidden && (e.key === 'ArrowDown' || e.key === 'ArrowUp')) {
        e.preventDefault();
        const idx = options.indexOf(document.activeElement as HTMLAnchorElement);
        const next =
          e.key === 'ArrowDown'
            ? options[(idx + 1 + options.length) % options.length]
            : options[(idx - 1 + options.length) % options.length];
        next?.focus();
      }
    });

    window.addEventListener('resize', repositionHeaderMenu, { passive: true });

    window.addEventListener('scroll', repositionHeaderMenu, { passive: true, capture: true });

    options.forEach((link) => {
      link.addEventListener('click', () => {
        const code = link.dataset.localeOption;
        if (code) {
          try {
            localStorage.setItem(STORAGE_KEY, code);
          } catch {
            /* ignore */
          }
        }
        close();
      });
    });
  });
}

export function setupLanguageSwitchers() {
  initLanguageSwitchers();
  document.addEventListener('astro:page-load', initLanguageSwitchers);
}
