// Nusantara Stats — the router and the page behaviour.
//
//   #/            Ringkasan
//   #/penduduk    Penduduk
//   #/ekonomi     Ekonomi
//   #/sosial      Sosial
//   #/provinsi    Provinsi (searchable, sortable table)
//   #/sumber      Sumber & Metodologi
//
// window.__shotReady is false while a page renders and true once it is on
// screen, so a screenshot script knows when to capture.

import { home, penduduk, ekonomi, sosial, provinsi, sumber, missing } from './views.js';
import { topProvinces } from './data.js';

const app = document.getElementById('app');
const navLinks = document.querySelectorAll('[data-nav]');

const routes = {
  '/': home,
  '/penduduk': penduduk,
  '/ekonomi': ekonomi,
  '/sosial': sosial,
  '/provinsi': provinsi,
  '/sumber': sumber,
};

const titles = {
  '/': 'Nusantara Stats — Indonesia dalam Angka',
  '/penduduk': 'Penduduk | Nusantara Stats',
  '/ekonomi': 'Ekonomi | Nusantara Stats',
  '/sosial': 'Sosial | Nusantara Stats',
  '/provinsi': 'Provinsi | Nusantara Stats',
  '/sumber': 'Sumber & Metodologi | Nusantara Stats',
};

function currentPath() {
  const hash = location.hash || '#/';
  const path = hash.replace(/^#/, '') || '/';
  return routes[path] ? path : null;
}

// Chart tabs: each .tab switches the visible pane inside its own chart card.
function bindTabs(root) {
  root.querySelectorAll('.tab').forEach((tab) => {
    tab.addEventListener('click', () => {
      const card = tab.closest('.chart-card');
      if (!card) return;
      card.querySelectorAll('.tab').forEach((t) => {
        t.classList.toggle('active', t === tab);
        t.setAttribute('aria-pressed', t === tab ? 'true' : 'false');
      });
      card.querySelectorAll('[data-pane]').forEach((pane) => {
        pane.hidden = pane.dataset.pane !== tab.dataset.view;
      });
    });
  });
}

// Province table: live search plus click-to-sort on every column header.
// Sorting is stable and toggles direction on a second click.
function bindProvinceTable(root) {
  const input = root.querySelector('#prov-search');
  const table = root.querySelector('#prov-table');
  const count = root.querySelector('#prov-count');
  if (!input || !table) return;
  const tbody = table.querySelector('tbody');
  const original = Array.from(tbody.rows);
  let sortKey = 'rank';
  let sortDir = 1;

  const values = new Map(
    topProvinces.map((p) => [p.name, { rank: p.rank, name: p.name, population: p.population, share: p.share }]),
  );

  function apply() {
    const q = input.value.trim().toLowerCase();
    let rows = original.filter((row) => row.cells[1].textContent.toLowerCase().includes(q));
    rows = rows.slice().sort((a, b) => {
      const va = values.get(a.cells[1].textContent)[sortKey];
      const vb = values.get(b.cells[1].textContent)[sortKey];
      if (typeof va === 'string') return va.localeCompare(vb, 'id') * sortDir;
      return (va - vb) * sortDir;
    });
    tbody.replaceChildren(...rows);
    count.textContent = `${rows.length} provinsi`;
  }

  input.addEventListener('input', apply);
  table.querySelectorAll('th[data-sort-key]').forEach((th) => {
    th.addEventListener('click', () => {
      const key = th.dataset.sortKey;
      if (sortKey === key) {
        sortDir = -sortDir;
      } else {
        sortKey = key;
        sortDir = 1;
      }
      table.querySelectorAll('th').forEach((h) => {
        h.removeAttribute('aria-sort');
        h.classList.remove('sorted-asc', 'sorted-desc');
      });
      th.setAttribute('aria-sort', sortDir === 1 ? 'ascending' : 'descending');
      th.classList.add(sortDir === 1 ? 'sorted-asc' : 'sorted-desc');
      apply();
    });
  });
}

function render() {
  window.__shotReady = false;
  const path = currentPath();
  document.title = path ? titles[path] : 'Tidak ditemukan | Nusantara Stats';
  app.innerHTML = path ? routes[path]() : missing();
  navLinks.forEach((a) => {
    const target = a.getAttribute('href').replace(/^#/, '') || '/';
    a.setAttribute('aria-current', target === path ? 'page' : 'false');
    a.classList.toggle('active', target === path);
  });
  bindTabs(app);
  if (path === '/provinsi') bindProvinceTable(app);
  window.scrollTo(0, 0);
  window.__shotReady = true;
}

window.addEventListener('hashchange', render);
render();
