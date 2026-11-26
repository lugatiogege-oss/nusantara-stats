// Nusantara Stats — hand-rolled SVG charts. No libraries, no network: each
// function takes plain data and returns an SVG string the views drop into the
// page. Colours come from the site palette (deep green, amber, terracotta).

const PALETTE = ['#0e5e4a', '#e8a33d', '#c65d3a', '#3e7d6b', '#7fae9c', '#d9c27a'];

const esc = (s) => String(s).replace(/[&<>"']/g, (c) => `&#${c.charCodeAt(0)};`);

// Indonesian number formatting: decimal comma, dot thousands.
export function fmtNum(n, decimals = 2) {
  return Number(n).toLocaleString('id-ID', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
}

function svgOpen(width, height, label) {
  return `<svg viewBox="0 0 ${width} ${height}" width="100%" role="img" aria-label="${esc(label)}" preserveAspectRatio="xMidYMid meet">`;
}

// Vertical bar chart. data: [{label, value}]. Negative values hang below
// the zero line; the zero line is drawn so a dip (e.g. 2020) reads clearly.
export function barChart(data, { width = 640, height = 300, unit = '', min = null } = {}) {
  const padL = 52, padR = 12, padT = 18, padB = 34;
  const plotW = width - padL - padR;
  const plotH = height - padT - padB;
  const values = data.map((d) => d.value);
  let lo = min !== null ? min : Math.min(0, ...values);
  let hi = Math.max(...values);
  if (hi === lo) hi = lo + 1;
  const y = (v) => padT + ((hi - v) / (hi - lo)) * plotH;
  const zeroY = y(0);
  const slot = plotW / data.length;
  const barW = Math.min(46, slot * 0.62);
  let out = svgOpen(width, height, 'Diagram batang');
  // Gridlines: 4 steps between lo and hi.
  for (let i = 0; i <= 4; i++) {
    const v = lo + ((hi - lo) * i) / 4;
    const gy = y(v);
    out += `<line x1="${padL}" y1="${gy.toFixed(1)}" x2="${width - padR}" y2="${gy.toFixed(1)}" stroke="#e3ddd0" stroke-width="1"/>`;
    out += `<text x="${padL - 8}" y="${(gy + 4).toFixed(1)}" text-anchor="end" font-size="11" fill="#6b655a">${fmtNum(v, 0)}${unit}</text>`;
  }
  out += `<line x1="${padL}" y1="${zeroY.toFixed(1)}" x2="${width - padR}" y2="${zeroY.toFixed(1)}" stroke="#8a8378" stroke-width="1.5"/>`;
  data.forEach((d, i) => {
    const cx = padL + slot * i + slot / 2;
    const top = Math.min(y(d.value), zeroY);
    const h = Math.abs(zeroY - y(d.value));
    const color = d.value < 0 ? '#c65d3a' : i === data.length - 1 ? '#e8a33d' : '#0e5e4a';
    out += `<rect x="${(cx - barW / 2).toFixed(1)}" y="${top.toFixed(1)}" width="${barW}" height="${Math.max(h, 1.5).toFixed(1)}" rx="3" fill="${color}"><title>${esc(d.label)}: ${fmtNum(d.value)}${unit}</title></rect>`;
    const labelY = d.value < 0 ? zeroY + h + 14 : top - 6;
    out += `<text x="${cx.toFixed(1)}" y="${labelY.toFixed(1)}" text-anchor="middle" font-size="12" font-weight="700" fill="#2b2620">${fmtNum(d.value)}${unit}</text>`;
    out += `<text x="${cx.toFixed(1)}" y="${height - 12}" text-anchor="middle" font-size="12" fill="#6b655a">${esc(d.label)}</text>`;
  });
  return `${out}</svg>`;
}

// Line chart with dots and value labels. data: [{label, value}].
export function lineChart(data, { width = 640, height = 300, unit = '%' } = {}) {
  const padL = 52, padR = 16, padT = 24, padB = 34;
  const plotW = width - padL - padR;
  const plotH = height - padT - padB;
  const values = data.map((d) => d.value);
  let lo = Math.min(...values);
  let hi = Math.max(...values);
  if (lo === hi) hi = lo + 1;
  // Zoom to the data's own range (a series like 267–282 would read as a flat
  // line if the axis started at zero). Pad a little so labels never clip, and
  // draw the zero line only when the range actually crosses zero.
  const span = hi - lo;
  lo -= span * 0.12;
  hi += span * 0.18;
  const crossesZero = lo < 0 && hi > 0;
  const x = (i) => padL + (plotW * i) / (data.length - 1);
  const y = (v) => padT + ((hi - v) / (hi - lo)) * plotH;
  let out = svgOpen(width, height, 'Diagram garis');
  for (let i = 0; i <= 4; i++) {
    const v = lo + ((hi - lo) * i) / 4;
    const gy = y(v);
    out += `<line x1="${padL}" y1="${gy.toFixed(1)}" x2="${width - padR}" y2="${gy.toFixed(1)}" stroke="#e3ddd0" stroke-width="1"/>`;
    out += `<text x="${padL - 8}" y="${(gy + 4).toFixed(1)}" text-anchor="end" font-size="11" fill="#6b655a">${fmtNum(v, 0)}${unit}</text>`;
  }
  const zeroY = y(0);
  if (crossesZero) {
    out += `<line x1="${padL}" y1="${zeroY.toFixed(1)}" x2="${width - padR}" y2="${zeroY.toFixed(1)}" stroke="#8a8378" stroke-width="1.5"/>`;
  }
  const points = data.map((d, i) => `${x(i).toFixed(1)},${y(d.value).toFixed(1)}`).join(' ');
  out += `<polyline points="${points}" fill="none" stroke="#0e5e4a" stroke-width="2.5" stroke-linejoin="round" stroke-linecap="round"/>`;
  data.forEach((d, i) => {
    const negative = d.value < 0;
    out += `<circle cx="${x(i).toFixed(1)}" cy="${y(d.value).toFixed(1)}" r="4.5" fill="${negative ? '#c65d3a' : '#0e5e4a'}" stroke="#f7f5ef" stroke-width="2"><title>${esc(d.label)}: ${fmtNum(d.value)}${unit}</title></circle>`;
    const labelY = negative ? y(d.value) + 18 : y(d.value) - 10;
    out += `<text x="${x(i).toFixed(1)}" y="${labelY.toFixed(1)}" text-anchor="middle" font-size="12" font-weight="700" fill="#2b2620">${fmtNum(d.value)}${unit}</text>`;
    out += `<text x="${x(i).toFixed(1)}" y="${height - 12}" text-anchor="middle" font-size="12" fill="#6b655a">${esc(d.label)}</text>`;
  });
  return `${out}</svg>`;
}

// Donut chart with a legend. data: [{name, share}]. Shares must sum to ~100.
export function donutChart(data, { width = 640, height = 300 } = {}) {
  const cx = 150;
  const cy = height / 2;
  const r = 105;
  const inner = 62;
  const total = data.reduce((s, d) => s + d.share, 0);
  let angle = -Math.PI / 2;
  let out = svgOpen(width, height, 'Diagram donat');
  data.forEach((d, i) => {
    const frac = d.share / total;
    const a0 = angle;
    const a1 = angle + frac * Math.PI * 2;
    angle = a1;
    const large = frac > 0.5 ? 1 : 0;
    const x0 = cx + r * Math.cos(a0);
    const y0 = cy + r * Math.sin(a0);
    const x1 = cx + r * Math.cos(a1);
    const y1 = cy + r * Math.sin(a1);
    const xi1 = cx + inner * Math.cos(a1);
    const yi1 = cy + inner * Math.sin(a1);
    const xi0 = cx + inner * Math.cos(a0);
    const yi0 = cy + inner * Math.sin(a0);
    const color = PALETTE[i % PALETTE.length];
    out += `<path d="M ${x0.toFixed(1)} ${y0.toFixed(1)} A ${r} ${r} 0 ${large} 1 ${x1.toFixed(1)} ${y1.toFixed(1)} L ${xi1.toFixed(1)} ${yi1.toFixed(1)} A ${inner} ${inner} 0 ${large} 0 ${xi0.toFixed(1)} ${yi0.toFixed(1)} Z" fill="${color}"><title>${esc(d.name)}: ${fmtNum(d.share)}%</title></path>`;
  });
  out += `<text x="${cx}" y="${cy - 6}" text-anchor="middle" font-size="22" font-weight="700" fill="#2b2620">100%</text>`;
  out += `<text x="${cx}" y="${cy + 16}" text-anchor="middle" font-size="12" fill="#6b655a">PDB 2024</text>`;
  // Legend on the right.
  let ly = 34;
  data.forEach((d, i) => {
    const color = PALETTE[i % PALETTE.length];
    out += `<rect x="300" y="${ly - 11}" width="14" height="14" rx="3" fill="${color}"/>`;
    out += `<text x="322" y="${ly + 1}" font-size="13" fill="#2b2620">${esc(d.name)}</text>`;
    out += `<text x="322" y="${ly + 17}" font-size="12" fill="#6b655a">${fmtNum(d.share)}% dari PDB</text>`;
    ly += 44;
  });
  return `${out}</svg>`;
}

// Horizontal bar chart, best for ranked lists (provinces). data:
// [{label, value, note}]. Bars scale to the largest value.
export function hbarChart(data, { width = 640, barH = 34, unit = ' jt' } = {}) {
  const padL = 132;
  const padR = 64;
  const height = data.length * barH + 16;
  const max = Math.max(...data.map((d) => d.value));
  let out = svgOpen(width, height, 'Diagram batang horizontal');
  data.forEach((d, i) => {
    const y = 8 + i * barH;
    const w = ((width - padL - padR) * d.value) / max;
    const color = i < 3 ? '#0e5e4a' : i < 5 ? '#3e7d6b' : '#7fae9c';
    out += `<text x="${padL - 10}" y="${y + barH / 2 + 4}" text-anchor="end" font-size="13" fill="#2b2620">${esc(d.label)}</text>`;
    out += `<rect x="${padL}" y="${y + 6}" width="${Math.max(w, 2).toFixed(1)}" height="${barH - 14}" rx="3" fill="${color}"><title>${esc(d.label)}: ${fmtNum(d.value)}${unit}</title></rect>`;
    out += `<text x="${(padL + w + 8).toFixed(1)}" y="${y + barH / 2 + 4}" font-size="12" font-weight="700" fill="#2b2620">${fmtNum(d.value)}${unit}</text>`;
  });
  return `${out}</svg>`;
}
