// Nusantara Stats — HTML for each page. Every value is escaped before it
// goes into the page; every figure carries its source and year next to it.
// The chart tabs on Ringkasan and Ekonomi swap the chart in place.

import { META, kpis, populationTrend, populationFacts, topProvinces, gdpGrowth, sectorShares, trade, social, highlights, sources, methodology } from './data.js';
import { barChart, lineChart, donutChart, hbarChart, fmtNum } from './charts.js';

const esc = (s) => String(s).replace(/[&<>"']/g, (c) => `&#${c.charCodeAt(0)};`);

function srcTag(source) {
  return `<span class="src">Sumber: ${esc(source)}</span>`;
}

function kpiCard(k) {
  return `<a class="kpi" href="${k.href}">
  <span class="kpi-label">${esc(k.label)}</span>
  <span class="kpi-value">${esc(k.value)}</span>
  <span class="kpi-detail">${esc(k.detail)}</span>
  <span class="kpi-note">${esc(k.note)}</span>
  ${srcTag(k.source)}
</a>`;
}

function chartCard(id, title, subtitle, tabs, body, source) {
  const tabHtml = tabs
    .map((t, i) => `<button type="button" class="tab${i === 0 ? ' active' : ''}" data-chart="${id}" data-view="${t.view}" aria-pressed="${i === 0}">${esc(t.label)}</button>`)
    .join('');
  return `<section class="card chart-card" aria-label="${esc(title)}">
  <div class="card-head">
    <div><h2>${esc(title)}</h2><p class="card-sub">${esc(subtitle)}</p></div>
    <div class="tabs" role="tablist">${tabHtml}</div>
  </div>
  <div class="chart-body" id="chart-${id}">${body}</div>
  ${srcTag(source)}
</section>`;
}

// ---- Ringkasan (#/) ----
export function home() {
  const cards = kpis.map(kpiCard).join('');
  const popBars = lineChart(
    populationTrend.map((d) => ({ label: String(d.year), value: d.value })),
    { unit: '' },
  );
  const popHbars = hbarChart(
    topProvinces.slice(0, 5).map((p) => ({ label: p.name, value: p.population })),
    {},
  );
  const growthLine = lineChart(
    gdpGrowth.map((d) => ({ label: String(d.year), value: d.value })),
    {},
  );
  const growthBars = barChart(
    gdpGrowth.map((d) => ({ label: String(d.year), value: d.value })),
    { unit: '%' },
  );
  const news = highlights
    .map(
      (h) => `<article class="highlight">
  <h3>${esc(h.title)}</h3>
  <p>${esc(h.text)}</p>
  ${srcTag(h.source)}
</article>`,
    )
    .join('');
  return `<section class="hero">
  <p class="eyebrow">Statistik nasional · Indonesia</p>
  <h1>Indonesia dalam angka</h1>
  <p class="lede">Penduduk, ekonomi, dan kesejahteraan — angka resmi terbaru dari Badan Pusat Statistik, dijelaskan dengan bahasa yang mudah dibaca. ${esc(META.dataNote)}.</p>
</section>
<section class="kpi-grid" aria-label="Indikator utama">${cards}</section>
${chartCard('penduduk', 'Penduduk terus bertambah', 'Jumlah penduduk pertengahan tahun, juta jiwa', [{ label: 'Tren 2019–2024', view: 'trend' }, { label: '5 provinsi teratas', view: 'top' }], `<div data-pane="trend">${popBars}</div><div data-pane="top" hidden>${popHbars}</div>`, 'BPS, 2024')}
${chartCard('tumbuh', 'Pertumbuhan ekonomi', 'PDB tumbuh 5,03% pada 2024 — sempat minus pada 2020', [{ label: 'Garis', view: 'line' }, { label: 'Batang', view: 'bars' }], `<div data-pane="line">${growthLine}</div><div data-pane="bars" hidden>${growthBars}</div>`, 'BPS, 2019–2024')}
<section class="highlights" aria-label="Sorotan">
  <h2>Sorotan</h2>
  <div class="highlight-grid">${news}</div>
</section>
<p class="page-note">Semua angka di halaman ini memakai tahun datanya masing-masing. Lihat <a href="#/sumber">halaman Sumber</a> untuk daftar lengkap dan cara baca datanya.</p>`;
}

// ---- Penduduk (#/penduduk) ----
export function penduduk() {
  const bars = lineChart(
    populationTrend.map((d) => ({ label: String(d.year), value: d.value })),
    { unit: '' },
  );
  const hbars = hbarChart(
    topProvinces.map((p) => ({ label: p.name, value: p.population })),
    {},
  );
  const facts = populationFacts
    .map(
      (f) => `<li><span class="fact-label">${esc(f.label)}</span><span class="fact-value">${esc(f.value)}</span>${f.note ? `<span class="fact-note">${esc(f.note)}</span>` : ''}${srcTag(f.source)}</li>`,
    )
    .join('');
  return `<h1>Penduduk</h1>
<p class="lede">281,6 juta jiwa pada pertengahan 2024 — Indonesia negara ke-4 terpadat di dunia. Pertumbuhan melambat perlahan, dari 1,13% pada 2022 menjadi 1,04% pada 2024.</p>
<section class="card chart-card">
  <div class="card-head"><div><h2>Tren penduduk 2019–2024</h2><p class="card-sub">Juta jiwa, estimasi pertengahan tahun</p></div></div>
  <div class="chart-body">${bars}</div>
  ${srcTag('BPS, 2019–2024')}
</section>
<section class="card chart-card">
  <div class="card-head"><div><h2>10 provinsi terpadat</h2><p class="card-sub">Juta jiwa, 2024 — tiga provinsi di Jawa menampung 46,2% penduduk</p></div></div>
  <div class="chart-body">${hbars}</div>
  ${srcTag('BPS, 2024')}
</section>
<section class="card">
  <h2>Fakta kunci</h2>
  <ul class="facts">${facts}</ul>
</section>
<p class="page-note">Sensus Penduduk 2020 mencatat 270,20 juta jiwa. Angka 2019–2024 di atas adalah estimasi pertengahan tahun BPS. <a href="#/provinsi">Lihat tabel provinsi →</a></p>`;
}

// ---- Ekonomi (#/ekonomi) ----
export function ekonomi() {
  const growthLine = lineChart(
    gdpGrowth.map((d) => ({ label: String(d.year), value: d.value })),
    {},
  );
  const growthBars = barChart(
    gdpGrowth.map((d) => ({ label: String(d.year), value: d.value })),
    { unit: '%' },
  );
  const donut = donutChart(sectorShares.map((s) => ({ name: s.name, share: s.share })), {});
  const sectorRows = sectorShares
    .map(
      (s) => `<tr><td>${esc(s.name)}</td><td class="num">${fmtNum(s.share)}%</td><td class="num">${s.growth === null ? '—' : `${fmtNum(s.growth)}%`}</td></tr>`,
    )
    .join('');
  return `<h1>Ekonomi</h1>
<p class="lede">PDB 2024 Rp22.139 triliun dengan pertumbuhan 5,03%. PDB per kapita Rp78,62 juta (sekitar US$4.960) dan inflasi Desember 2024 sebesar 1,57% yoy.</p>
${chartCard('tumbuh', 'Pertumbuhan ekonomi 2019–2024', 'Persen, c-to-c — 2020 minus 2,07% karena pandemi', [{ label: 'Garis', view: 'line' }, { label: 'Batang', view: 'bars' }], `<div data-pane="line">${growthLine}</div><div data-pane="bars" hidden>${growthBars}</div>`, 'BPS, 2019–2024')}
<section class="card chart-card">
  <div class="card-head"><div><h2>Pangsa PDB menurut lapangan usaha</h2><p class="card-sub">Harga berlaku (ADHB), 2024</p></div></div>
  <div class="chart-body">${donut}</div>
  ${srcTag('BPS, 2024')}
</section>
<section class="card">
  <h2>Lima lapangan usaha terbesar</h2>
  <table class="table">
    <thead><tr><th>Lapangan usaha</th><th class="num">Pangsa PDB</th><th class="num">Tumbuh 2024</th></tr></thead>
    <tbody>${sectorRows}</tbody>
  </table>
  ${srcTag('BPS, 2024 — pertumbuhan industri, perdagangan, dan pertanian dari rilis BPS 5 Februari 2025')}
</section>
<section class="card">
  <h2>Perdagangan luar negeri 2024</h2>
  <div class="trade-grid">
    <div class="trade-item"><span class="trade-label">Ekspor</span><span class="trade-value">US$${fmtNum(trade.exports.value)} M</span><span class="trade-note">+${fmtNum(trade.exports.change)}% dari 2023</span></div>
    <div class="trade-item"><span class="trade-label">Impor</span><span class="trade-value">US$${fmtNum(trade.imports.value)} M</span><span class="trade-note">+${fmtNum(trade.imports.change)}% dari 2023</span></div>
    <div class="trade-item"><span class="trade-label">Surplus</span><span class="trade-value">US$${fmtNum(trade.surplus.value)} M</span><span class="trade-note">${esc(trade.surplus.note)}</span></div>
  </div>
  ${srcTag(trade.source)}
</section>`;
}

// ---- Sosial (#/sosial) ----
export function sosial() {
  const s = social;
  return `<h1>Sosial</h1>
<p class="lede">Kemiskinan di titik terendah sepanjang sejarah pencatatan, pengangguran 4,91%, dan IPM 75,02 — kategori tinggi.</p>
<section class="card">
  <h2>Kemiskinan</h2>
  <p class="big-stat">${fmtNum(s.poverty.rate)}% <span>penduduk miskin, ${esc(s.poverty.period)}</span></p>
  <p>${esc(s.poverty.people)} jiwa hidup di bawah garis kemiskinan. ${esc(s.poverty.note)}.</p>
  <table class="table">
    <thead><tr><th>Wilayah</th><th class="num">Tingkat kemiskinan</th></tr></thead>
    <tbody>
      <tr><td>Perkotaan</td><td class="num">${fmtNum(s.poverty.urban)}%</td></tr>
      <tr><td>Perdesaan</td><td class="num">${fmtNum(s.poverty.rural)}%</td></tr>
    </tbody>
  </table>
  ${srcTag(s.poverty.source)}
</section>
<section class="card">
  <h2>Pengangguran terbuka (TPT)</h2>
  <p class="big-stat">${fmtNum(s.unemployment.aug.rate)}% <span>Agustus 2024 — ${esc(s.unemployment.aug.people)} penganggur</span></p>
  <p>Pada Februari 2024 TPT sebesar ${fmtNum(s.unemployment.feb.rate)}% (${esc(s.unemployment.feb.people)} penganggur). TPT turun 0,41 poin dibanding Agustus 2023 yang sebesar 5,32%.</p>
  ${srcTag(s.unemployment.source)}
</section>
<section class="card">
  <h2>Indeks Pembangunan Manusia</h2>
  <p class="big-stat">${fmtNum(s.hdi.value)} <span>kategori ${esc(s.hdi.category)} — naik dari ${fmtNum(s.hdi.prev)} pada 2023</span></p>
  <table class="table">
    <thead><tr><th>Komponen IPM 2024</th><th class="num">Nilai</th></tr></thead>
    <tbody>
      <tr><td>Umur harapan hidup saat lahir</td><td class="num">${fmtNum(s.hdi.lifeExpectancy)} tahun</td></tr>
      <tr><td>Harapan lama sekolah</td><td class="num">${fmtNum(s.hdi.expectedSchooling)} tahun</td></tr>
      <tr><td>Rata-rata lama sekolah</td><td class="num">${fmtNum(s.hdi.meanSchooling)} tahun</td></tr>
      <tr><td>Pengeluaran riil per kapita (disesuaikan)</td><td class="num">${esc(s.hdi.realExpenditure)}</td></tr>
    </tbody>
  </table>
  ${srcTag(s.hdi.source)}
</section>
<section class="card">
  <h2>Ketimpangan (Gini ratio)</h2>
  <p class="big-stat">${fmtNum(s.gini.sep, 3)} <span>${esc(s.gini.period)} — Maret 2024: ${fmtNum(s.gini.mar, 3)}</span></p>
  <p>Gini mengukur ketimpangan pengeluaran: 0 berarti semua sama, 1 berarti satu orang menguasai segalanya. Perkotaan ${fmtNum(s.gini.urban, 3)}, perdesaan ${fmtNum(s.gini.rural, 3)}.</p>
  ${srcTag(s.gini.source)}
</section>`;
}

// ---- Provinsi (#/provinsi) ----
export function provinsi() {
  const rows = topProvinces
    .map(
      (p) => `<tr><td class="num">${p.rank}</td><td>${esc(p.name)}</td><td class="num" data-sort="${p.population}">${fmtNum(p.population)}</td><td class="num" data-sort="${p.share}">${fmtNum(p.share)}%</td></tr>`,
    )
    .join('');
  return `<h1>Provinsi</h1>
<p class="lede">10 provinsi dengan penduduk terbanyak, 2024. Klik judul kolom untuk mengurutkan, atau ketik di kotak cari untuk menyaring. Hanya 10 provinsi yang angkanya terverifikasi dari BPS yang kami tampilkan — tidak ada angka tebakan.</p>
<section class="card">
  <div class="table-tools">
    <label>Cari provinsi <input id="prov-search" type="search" placeholder="cth: Jawa" autocomplete="off"></label>
    <span class="table-count" id="prov-count">${topProvinces.length} provinsi</span>
  </div>
  <div class="table-wrap">
  <table class="table sortable" id="prov-table">
    <thead><tr><th data-sort-key="rank">#</th><th data-sort-key="name">Provinsi</th><th class="num" data-sort-key="population">Penduduk (juta jiwa)</th><th class="num" data-sort-key="share">Pangsa</th></tr></thead>
    <tbody>${rows}</tbody>
  </table>
  </div>
  ${srcTag('BPS, 2024')}
  <p class="page-note">Tiga provinsi di Jawa — Jawa Barat, Jawa Timur, Jawa Tengah — menampung 130,16 juta jiwa atau 46,2% penduduk Indonesia. Provinsi terkecil, Kalimantan Utara, tidak kami tampilkan karena angkanya belum terverifikasi saat situs ini dibangun.</p>
</section>`;
}

// ---- Sumber (#/sumber) ----
export function sumber() {
  const blocks = sources
    .map(
      (s) => `<section class="card">
  <h2>${esc(s.name)}</h2>
  <p>${esc(s.what)}</p>
  <ul>${s.refs.map((r) => `<li>${esc(r)}</li>`).join('')}</ul>
</section>`,
    )
    .join('');
  const notes = methodology.map((m) => `<li>${esc(m)}</li>`).join('');
  return `<h1>Sumber &amp; Metodologi</h1>
<p class="lede">Setiap angka di situs ini bisa dilacak ke publikasi resminya. Di bawah ini daftar sumber per kelompok angka, dan cara kami membaca datanya.</p>
${blocks}
<section class="card">
  <h2>Cara baca data</h2>
  <ol class="method">${notes}</ol>
</section>
<p class="page-note">${esc(META.siteName)} bukan situs resmi BPS dan tidak berafiliasi dengan pemerintah. Angka-angka di sini dikutip dari publikasi resmi yang tercantum di atas.</p>`;
}

export function missing() {
  return `<h1>Halaman tidak ditemukan</h1>
<p>Tidak ada halaman di alamat ini. <a href="#/">Kembali ke Ringkasan</a>.</p>`;
}
