// Nusantara Stats — the figures behind the site.
//
// Every number below comes from Badan Pusat Statistik (BPS), or where noted
// from the Ministry of Finance (Kemenkeu) citing BPS. Each figure on the site
// is shown with its source and year. Nothing here is estimated, projected by
// us, or invented: if a figure could not be verified from BPS, it is not in
// this file at all.
//
// Units: population in millions of people (juta jiwa), money in rupiah
// trillions (Rp triliun) unless noted, rates in percent.

export const META = {
  siteName: 'Nusantara Stats',
  country: 'Indonesia',
  tagline: 'Angka-angka Indonesia, dari sumber resmi.',
  dataNote: 'Data per 2024 · Sumber: BPS',
  lastChecked: 'November 2026',
};

// Headline indicators for the Ringkasan page. `detail` is the short label
// shown under the value; `source` is rendered next to every card.
export const kpis = [
  {
    id: 'penduduk',
    label: 'Penduduk',
    value: '281,6 jt',
    detail: 'jiwa, pertengahan 2024',
    note: 'Negara ke-4 terpadat di dunia',
    source: 'BPS, 2024',
    href: '#/penduduk',
  },
  {
    id: 'pdb',
    label: 'PDB',
    value: 'Rp22.139 T',
    detail: 'harga berlaku, 2024',
    note: 'US$1.396,3 miliar',
    source: 'BPS, 2024',
    href: '#/ekonomi',
  },
  {
    id: 'pdb-kapita',
    label: 'PDB per Kapita',
    value: 'Rp78,62 jt',
    detail: 'per tahun, 2024',
    note: '≈ US$4.960',
    source: 'BPS, 2024',
    href: '#/ekonomi',
  },
  {
    id: 'tumbuh',
    label: 'Pertumbuhan Ekonomi',
    value: '5,03%',
    detail: '2024 (c-to-c)',
    note: 'Triwulan IV 2024: 5,02% yoy',
    source: 'BPS, 2024',
    href: '#/ekonomi',
  },
  {
    id: 'inflasi',
    label: 'Inflasi',
    value: '1,57%',
    detail: 'Desember 2024, yoy',
    note: 'Indeks Harga Konsumen',
    source: 'BPS, 2024',
    href: '#/ekonomi',
  },
  {
    id: 'miskin',
    label: 'Kemiskinan',
    value: '8,57%',
    detail: 'September 2024',
    note: '24,06 juta jiwa',
    source: 'BPS, 2024',
    href: '#/sosial',
  },
  {
    id: 'ipm',
    label: 'IPM',
    value: '75,02',
    detail: 'Indeks Pembangunan Manusia, 2024',
    note: 'Kategori tinggi; 2023: 74,39',
    source: 'BPS, 2024',
    href: '#/sosial',
  },
  {
    id: 'tpt',
    label: 'Pengangguran (TPT)',
    value: '4,91%',
    detail: 'Agustus 2024',
    note: '7,47 juta penganggur; Feb 2024: 4,82%',
    source: 'BPS, 2024',
    href: '#/sosial',
  },
];

// Population, mid-year estimates (millions), BPS.
export const populationTrend = [
  { year: 2019, value: 266.91 },
  { year: 2020, value: 270.2 },
  { year: 2021, value: 272.68 },
  { year: 2022, value: 275.77 },
  { year: 2023, value: 278.7 },
  { year: 2024, value: 281.6 },
];

export const populationFacts = [
  { label: 'Penduduk (angka pasti)', value: '281.603.800 jiwa', source: 'BPS, 2024' },
  { label: 'Luas daratan', value: '1.892.555 km²', source: 'BPS, 2023' },
  { label: 'Jumlah provinsi', value: '38 provinsi', source: 'Kemendagri, 2024' },
  { label: 'Kepadatan penduduk', value: '147 jiwa/km²', source: 'BPS, 2023' },
  { label: 'Tiga provinsi di Jawa', value: '130,16 juta jiwa', source: 'BPS, 2024', note: '46,2% dari total penduduk' },
  { label: 'Laju tumbuh 2024', value: '1,04%', source: 'BPS, 2024' },
];

// The 10 most populous provinces, 2024 (millions of people), BPS.
// Full 38-province figures were not all verifiable in the build window, so the
// table shows only these verified ten — no province is shown with a guessed
// number.
export const topProvinces = [
  { rank: 1, name: 'Jawa Barat', population: 50.35, share: 17.88 },
  { rank: 2, name: 'Jawa Timur', population: 41.92, share: 14.89 },
  { rank: 3, name: 'Jawa Tengah', population: 37.89, share: 13.46 },
  { rank: 4, name: 'Sumatera Utara', population: 15.59, share: 5.54 },
  { rank: 5, name: 'Banten', population: 12.43, share: 4.41 },
  { rank: 6, name: 'DKI Jakarta', population: 10.7, share: 3.8 },
  { rank: 7, name: 'Sulawesi Selatan', population: 9.5, share: 3.37 },
  { rank: 8, name: 'Lampung', population: 9.4, share: 3.34 },
  { rank: 9, name: 'Sumatera Selatan', population: 8.8, share: 3.13 },
  { rank: 10, name: 'Riau', population: 6.7, share: 2.38 },
];

// Real GDP growth, percent year on year (c-to-c), BPS.
export const gdpGrowth = [
  { year: 2019, value: 5.02 },
  { year: 2020, value: -2.07 },
  { year: 2021, value: 3.69 },
  { year: 2022, value: 5.31 },
  { year: 2023, value: 5.05 },
  { year: 2024, value: 5.03 },
];

// GDP shares by field of business, current prices (ADHB), 2024, BPS.
// The five largest fields sum to 63,90%; the rest is grouped as Lainnya.
export const sectorShares = [
  { name: 'Industri Pengolahan', share: 18.98, growth: 4.43 },
  { name: 'Perdagangan', share: 13.07, growth: 4.86 },
  { name: 'Pertanian, Kehutanan & Perikanan', share: 12.61, growth: 0.67 },
  { name: 'Konstruksi', share: 10.09, growth: null },
  { name: 'Pertambangan & Penggalian', share: 9.15, growth: null },
  { name: 'Lainnya', share: 36.1, growth: null },
];

// Foreign trade, 2024. Source: BPS, as published by the Ministry of
// Finance (BKF) and Bank Indonesia.
export const trade = {
  exports: { value: 264.7, unit: 'US$ miliar', change: 2.29 },
  imports: { value: 233.66, unit: 'US$ miliar', change: 11.07 },
  surplus: { value: 31.04, unit: 'US$ miliar', note: 'Surplus tahun ke-5 berturut-turut' },
  source: 'BPS via Kemenkeu / BI, 2024',
};

// Social indicators, all BPS 2024.
export const social = {
  poverty: {
    rate: 8.57,
    people: '24,06 juta jiwa',
    period: 'September 2024',
    rural: 11.34,
    urban: 6.66,
    note: 'Tingkat kemiskinan terendah dalam sejarah pencatatan BPS',
    source: 'BPS, 2024',
  },
  unemployment: {
    feb: { rate: 4.82, people: '7,20 juta' },
    aug: { rate: 4.91, people: '7,47 juta' },
    source: 'BPS, 2024',
  },
  hdi: {
    value: 75.02,
    prev: 74.39,
    category: 'Tinggi',
    lifeExpectancy: 74.15,
    expectedSchooling: 13.21,
    meanSchooling: 8.85,
    realExpenditure: 'Rp12,34 jt/tahun',
    source: 'BPS, 2024',
  },
  gini: {
    sep: 0.381,
    mar: 0.379,
    urban: 0.402,
    rural: 0.308,
    period: 'September 2024',
    source: 'BPS, 2024',
  },
};

// Highlights for the Ringkasan page: short, sourced takeaways.
export const highlights = [
  {
    title: 'Ekonomi tumbuh 5,03% pada 2024',
    text: 'PDB atas dasar harga berlaku mencapai Rp22.139 triliun. Industri pengolahan tetap lapangan usaha terbesar dengan pangsa 18,98% dan tumbuh 4,43%.',
    source: 'BPS, 2024',
  },
  {
    title: 'Kemiskinan 8,57% — terendah sepanjang sejarah',
    text: 'Pada September 2024 ada 24,06 juta penduduk miskin. Kemiskinan perdesaan 11,34% masih hampir dua kali lipat perkotaan yang 6,66%.',
    source: 'BPS, 2024',
  },
  {
    title: 'IPM 75,02, kategori tinggi',
    text: 'Umur harapan hidup mencapai 74,15 tahun dan harapan lama sekolah 13,21 tahun. Pengeluaran riil per kapita Rp12,34 juta per tahun.',
    source: 'BPS, 2024',
  },
  {
    title: 'Surplus dagang US$31,04 miliar',
    text: 'Ekspor 2024 US$264,70 miliar (+2,29%) dan impor US$233,66 miliar (+11,07%). Neraca perdagangan surplus lima tahun berturut-turut.',
    source: 'BPS via Kemenkeu, 2024',
  },
];

// Sources page: where every figure comes from, and how to read it.
export const sources = [
  {
    name: 'Badan Pusat Statistik (BPS)',
    what: 'Penduduk, PDB dan pertumbuhan ekonomi, inflasi, kemiskinan, pengangguran, IPM, gini ratio, pangsa lapangan usaha.',
    refs: [
      'Statistik Indonesia 2025 — jumlah penduduk menurut provinsi',
      'Berita Resmi Statistik, 5 Februari 2025 — Pertumbuhan Ekonomi Indonesia 2024',
      'Berita Resmi Statistik, 15 November 2024 — IPM Indonesia 2024',
      'Berita Resmi Statistik, 5 November 2024 — Keadaan Ketenagakerjaan Agustus 2024',
      'Berita Resmi Statistik, 15 Januari 2025 — Gini Ratio September 2024',
      'Berita Resmi Statistik — Kemiskinan September 2024',
    ],
  },
  {
    name: 'Kementerian Keuangan (BKF) & Bank Indonesia',
    what: 'Neraca perdagangan 2024, mengutip data BPS.',
    refs: [
      'Siaran Pers BKF, 16 Januari 2025 — Surplus Neraca Perdagangan Tahun 2024',
      'Bank Indonesia, 15 Januari 2025 — Trade Surplus Maintained',
    ],
  },
  {
    name: 'Kementerian Dalam Negeri (Ditjen Dukcapil)',
    what: 'Jumlah provinsi (38) dan sebaran penduduk menurut provinsi, Semester I 2024.',
    refs: ['Rilis Data Kependudukan Bersih Semester I 2024'],
  },
];

export const methodology = [
  'Semua angka di situs ini adalah angka resmi yang sudah dipublikasikan. Tidak ada angka yang kami hitung sendiri dari data mentah, kecuali pangsa (persen terhadap total) yang dihitung langsung dari angka BPS yang sama dan dibulatkan dua desimal.',
  'Tahun yang tercantum pada setiap angka adalah tahun datanya, bukan tahun halaman ini dibuat. Angka 2024 adalah angka terbaru yang terverifikasi saat situs ini dibangun (November 2026).',
  'Penduduk memakai estimasi pertengahan tahun BPS; Sensus Penduduk 2020 mencatat 270,20 juta jiwa. PDB memakai harga berlaku (ADHB) kecuali pertumbuhan yang memakai harga konstan.',
  'Situs ini bukan situs resmi BPS. Nama "Nusantara Stats" adalah nama buatan kami; situs ini tidak berafiliasi dengan BPS, pemerintah, atau lembaga mana pun.',
];
