// วาดมอเตอร์ไซค์เป็น SVG (c = สีตัวรถ, spin = ให้ล้อหมุนหรือไม่)
function bike(c, spin) {
  const wheel = (x) =>
    `<g transform="translate(${x} 168)"><g${spin ? ' class="spin"' : ''}>
      <circle r="38" fill="none" stroke="var(--ink)" stroke-width="9"/>
      <circle r="7" fill="var(--ink)"/>
      <path d="M0-30V30M-30 0H30M-21-21L21 21M21-21L-21 21" stroke="var(--ink)" stroke-width="2.5" opacity=".5"/>
    </g></g>`;

  return `<svg viewBox="0 0 420 220" fill="none" role="img" aria-label="มอเตอร์ไซค์ไฟฟ้า">
    <ellipse cx="210" cy="212" rx="150" ry="5" fill="var(--ink)" opacity=".12"/>
    <path d="M104 122Q108 98 150 98H252Q292 104 288 142L272 156H136Q106 156 104 122Z" fill="${c}"/>
    <rect x="112" y="82" width="120" height="17" rx="8.5" fill="var(--ink)"/>
    <path d="M334 168L298 64M298 64L274 56" stroke="var(--ink)" stroke-width="9" stroke-linecap="round"/>
    <circle class="glow" cx="308" cy="88" r="8" fill="#fff" stroke="${c}" stroke-width="3"/>
    <path d="M170 128l18-16h-10l8-14" stroke="#fff" stroke-width="5" stroke-linecap="round" stroke-linejoin="round" opacity=".9"/>
    ${wheel(86)}${wheel(334)}
  </svg>`;
}

// ใส่รถลงในทุก element ที่มี data-bike
document.querySelectorAll('[data-bike]').forEach((el) => {
  el.innerHTML = bike(el.dataset.c, !!el.dataset.spin);
});

// สลับ dark / light
const root = document.documentElement;
const btn = document.getElementById('theme');

try {
  const saved = localStorage.getItem('volt-theme');
  if (saved) root.setAttribute('data-theme', saved);
} catch (e) {}

btn.addEventListener('click', () => {
  const current =
    root.getAttribute('data-theme') ||
    (matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
  const next = current === 'dark' ? 'light' : 'dark';
  root.setAttribute('data-theme', next);
  try { localStorage.setItem('volt-theme', next); } catch (e) {}
});