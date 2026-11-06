function selectedPrice(line: HTMLElement): number {
  const on = line.querySelector<HTMLButtonElement>('button.is-on');
  const n = Number(on?.dataset.price ?? '0');
  return Number.isFinite(n) ? n : 0;
}

function updateTotal(root: HTMLElement) {
  let sum = 0;
  root.querySelectorAll<HTMLElement>('[data-estimator-line]').forEach((line) => {
    sum += selectedPrice(line);
  });
  const out = root.querySelector<HTMLElement>('[data-estimator-total]');
  if (out) out.textContent = `$${sum}`;
}

function setupEstimator(root: HTMLElement) {
  if (root.dataset.estimatorInit === 'true') return;
  root.dataset.estimatorInit = 'true';

  root.querySelectorAll<HTMLElement>('[data-estimator-line]').forEach((line) => {
    line.querySelectorAll<HTMLButtonElement>('button[data-price]').forEach((btn) => {
      btn.addEventListener('click', (event) => {
        event.preventDefault();
        event.stopPropagation();
        line.querySelectorAll<HTMLButtonElement>('button[data-price]').forEach((other) => {
          const active = other === btn;
          other.classList.toggle('is-on', active);
          other.setAttribute('aria-pressed', active ? 'true' : 'false');
        });
        updateTotal(root);
      });
    });
  });

  updateTotal(root);
}

function init() {
  document.querySelectorAll<HTMLElement>('[data-blog-price-estimator]').forEach(setupEstimator);
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}

document.addEventListener('astro:page-load', () => {
  document.querySelectorAll<HTMLElement>('[data-blog-price-estimator]').forEach((root) => {
    delete root.dataset.estimatorInit;
  });
  init();
});
