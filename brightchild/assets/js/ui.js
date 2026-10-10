/* ============================================================
   BrightChild — shared UI: nav, footer, reveal animations,
   animated counters, SVG portrait generator.
   Depends on: data.js (loaded first)
   ============================================================ */

/* ------------------------- deterministic SVG child portraits -------------------------
   These are warm, hopeful illustrated portraits — never photos of real children.
   Deterministic per seed so the same child always renders the same face. */
function hashCode(str) {
  let h = 0;
  for (let i = 0; i < str.length; i++) { h = ((h << 5) - h + str.charCodeAt(i)) | 0; }
  return Math.abs(h);
}

const PORTRAIT_BG = ['#bfe0ff', '#ffe3c4', '#d8f3e8', '#fff1c9', '#fcdce8', '#e2dcff'];
const PORTRAIT_SKIN = ['#8d5524', '#c68642', '#e0ac69', '#f1c27d', '#6b4423', '#a5693a'];
const PORTRAIT_SHIRT = ['#2f80ed', '#ff7a59', '#2ec4a0', '#ffc93c', '#ff8fb1', '#7c5cff'];

function childPortraitSVG(seed, altLabel) {
  const h = hashCode(seed);
  const bg = PORTRAIT_BG[h % PORTRAIT_BG.length];
  const skin = PORTRAIT_SKIN[(h >> 3) % PORTRAIT_SKIN.length];
  const shirt = PORTRAIT_SHIRT[(h >> 6) % PORTRAIT_SHIRT.length];
  const hairStyle = h % 4; // 0 short, 1 afro puffs, 2 braids, 3 curly
  const smileW = 34 + (h % 10);
  const id = 'g' + (h % 100000);
  const hairDark = '#2a2320';
  let hair = '';
  if (hairStyle === 0) hair = `<path d="M60 44 Q100 18 140 44 Q138 30 100 26 Q62 30 60 44Z" fill="${hairDark}"/>`;
  if (hairStyle === 1) hair = `<circle cx="62" cy="46" r="20" fill="${hairDark}"/><circle cx="138" cy="46" r="20" fill="${hairDark}"/><path d="M60 46 Q100 20 140 46 Q136 28 100 26 Q64 28 60 46Z" fill="${hairDark}"/>`;
  if (hairStyle === 2) hair = `<path d="M60 48 Q100 16 140 48 Q140 28 100 24 Q60 28 60 48Z" fill="${hairDark}"/><rect x="52" y="42" width="10" height="34" rx="5" fill="${hairDark}"/><rect x="138" y="42" width="10" height="34" rx="5" fill="${hairDark}"/>`;
  if (hairStyle === 3) hair = `<path d="M58 50 Q58 22 100 22 Q142 22 142 50 Q130 34 100 34 Q70 34 58 50Z" fill="${hairDark}"/>`;
  return `<svg class="portrait-svg" viewBox="0 0 200 200" role="img" aria-label="${altLabel || 'Illustrated portrait of a smiling child'}" xmlns="http://www.w3.org/2000/svg">
  <defs><clipPath id="${id}"><rect width="200" height="200"/></clipPath></defs>
  <g clip-path="url(#${id})">
    <rect width="200" height="200" fill="${bg}"/>
    <circle cx="168" cy="34" r="26" fill="rgba(255,255,255,.45)"/>
    <circle cx="26" cy="160" r="34" fill="rgba(255,255,255,.35)"/>
    <path d="M100 148 C60 148 40 176 40 200 L160 200 C160 176 140 148 100 148Z" fill="${shirt}"/>
    <circle cx="100" cy="96" r="46" fill="${skin}"/>
    ${hair}
    <circle cx="84" cy="92" r="4.5" fill="#2a2320"/>
    <circle cx="116" cy="92" r="4.5" fill="#2a2320"/>
    <circle cx="86" cy="90" r="1.5" fill="#fff"/>
    <circle cx="118" cy="90" r="1.5" fill="#fff"/>
    <path d="M${100 - smileW / 2} 110 Q100 ${110 + smileW * 0.42} ${100 + smileW / 2} 110" stroke="#2a2320" stroke-width="4" fill="none" stroke-linecap="round"/>
    <circle cx="72" cy="106" r="7" fill="rgba(255,122,89,.35)"/>
    <circle cx="128" cy="106" r="7" fill="rgba(255,122,89,.35)"/>
  </g></svg>`;
}

/* ---------------------------------------------- donation destination (session state) */
const BC_DonationState = {
  currency: 'NGN', frequency: 'one-time', amount: null, custom: null,
  destination: 'general', childId: null,
};

/* ---------------------------------------------------------- shared chrome */
function renderNav(activeLabel) {
  const links = NAV_LINKS.map(l =>
    `<a href="${l.href}" class="${l.label === activeLabel ? 'is-active' : ''}">${l.label}</a>`
  ).join('');
  return `
  <header class="nav">
    <div class="nav__inner">
      <a class="nav__logo" href="index.html" aria-label="BrightChild home">
        <span class="nav__logo-mark" aria-hidden="true">B</span>
        <span>Bright<b style="color:var(--coral)">Child</b></span>
      </a>
      <nav class="nav__links" aria-label="Primary">${links}</nav>
      <a href="donate.html" class="btn btn--primary btn--sm nav__cta">Donate Now</a>
      <button class="nav__burger" aria-label="Open menu" aria-expanded="false" aria-controls="mobileDrawer">
        <span></span><span></span><span></span>
      </button>
    </div>
  </header>
  <div class="nav__drawer" id="mobileDrawer" role="dialog" aria-modal="true" aria-label="Menu">
    <div class="nav__drawer-panel">
      ${links}
      <a href="donate.html" class="btn btn--primary btn--block">Donate Now</a>
    </div>
  </div>`;
}

function renderFooter() {
  const socials = [
    ['Instagram', 'M12 2.2c3.2 0 3.6 0 4.9.1 3.3.1 4.8 1.7 4.9 4.9.1 1.3.1 1.6.1 4.8s0 3.6-.1 4.8c-.1 3.2-1.7 4.8-4.9 4.9-1.3.1-1.6.1-4.9.1s-3.6 0-4.9-.1c-3.3-.1-4.8-1.7-4.9-4.9-.1-1.3-.1-1.6-.1-4.8s0-3.6.1-4.8C2.3 4 3.9 2.4 7.1 2.3 8.4 2.2 8.8 2.2 12 2.2zm0 3.6a6.2 6.2 0 100 12.4 6.2 6.2 0 000-12.4zm0 2.2a4 4 0 110 8 4 4 0 010-8zm6.4-2.7a1.44 1.44 0 11-2.88 0 1.44 1.44 0 012.88 0z'],
    ['Facebook', 'M13.5 21v-8.2h2.8l.4-3.2h-3.2V7.6c0-.9.3-1.6 1.6-1.6h1.7V3.1c-.3 0-1.3-.1-2.5-.1-2.5 0-4.2 1.5-4.2 4.3v2.4H7.3v3.2h2.8V21h3.4z'],
    ['X', 'M17.8 3h3.1l-6.8 7.8L22 21h-6.3l-4.9-6.4L5.2 21H2.1l7.3-8.3L2 3h6.5l4.4 5.9L17.8 3zm-1.1 16.1h1.7L7.5 4.8H5.7l11 14.3z'],
    ['YouTube', 'M23 12s0-3.8-.5-5.6c-.3-1-1-1.8-2-2C18.7 4 12 4 12 4s-6.7 0-8.5.4c-1 .3-1.8 1-2 2C1 8.2 1 12 1 12s0 3.8.5 5.6c.3 1 1 1.8 2 2 1.8.4 8.5.4 8.5.4s6.7 0 8.5-.4c1-.3 1.8-1 2-2 .5-1.8.5-5.6.5-5.6zM9.8 15.5v-7l6 3.5-6 3.5z'],
  ];
  return `
  <footer class="footer">
    <div class="container">
      <div class="footer__grid">
        <div class="footer__brand">
          <a class="nav__logo" href="index.html" aria-label="BrightChild home">
            <span class="nav__logo-mark" aria-hidden="true">B</span>
            <span>Bright<b style="color:var(--coral)">Child</b></span>
          </a>
          <p class="footer__desc">Connecting compassionate people with children facing hardship — providing food, healthcare, education, shelter, and hope for a brighter tomorrow.</p>
          <div class="footer__social">
            ${socials.map(([name, path]) => `<a href="#" aria-label="BrightChild on ${name} (placeholder)" title="${name} (placeholder)"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="${path}"/></svg></a>`).join('')}
          </div>
        </div>
        <div>
          <h4>Explore</h4>
          <ul>
            <li><a href="index.html#about">About</a></li>
            <li><a href="index.html#impact">Our Impact</a></li>
            <li><a href="index.html#children">Children</a></li>
            <li><a href="index.html#causes">Causes</a></li>
            <li><a href="index.html#how-it-works">How It Works</a></li>
            <li><a href="#">Contact</a></li>
            <li><a href="#">FAQs</a></li>
          </ul>
        </div>
        <div>
          <h4>Get Involved</h4>
          <ul>
            <li><a href="donate.html">Donate</a></li>
            <li><a href="index.html#children">Support a Child</a></li>
            <li><a href="index.html#causes">Support a Cause</a></li>
            <li><a href="index.html#impact">Impact Stories</a></li>
            <li><a href="index.html#newsletter">Newsletter</a></li>
          </ul>
        </div>
        <div>
          <h4>Legal &amp; Policies</h4>
          <ul>
            <li><a href="#">Privacy Policy</a></li>
            <li><a href="#">Terms &amp; Conditions</a></li>
            <li><a href="#">Child Safeguarding Policy</a></li>
            <li><a href="#">Donation Policy</a></li>
          </ul>
        </div>
      </div>
      <div class="footer__bottom">
        <span>© 2026 BrightChild. All rights reserved.</span>
        <span class="footer__sample-note">Prototype notice: all children, stories, figures and testimonials are fictional sample content for design demonstration only. No real donations are processed.</span>
      </div>
    </div>
  </footer>`;
}

/* -------------------------------------------------- mobile menu behaviour */
function initNav() {
  const burger = document.querySelector('.nav__burger');
  const drawer = document.getElementById('mobileDrawer');
  if (!burger || !drawer) return;
  const close = () => {
    drawer.classList.remove('is-open'); burger.classList.remove('is-open');
    burger.setAttribute('aria-expanded', 'false'); document.body.style.overflow = '';
  };
  burger.addEventListener('click', () => {
    const open = drawer.classList.toggle('is-open');
    burger.classList.toggle('is-open', open);
    burger.setAttribute('aria-expanded', String(open));
    document.body.style.overflow = open ? 'hidden' : '';
  });
  drawer.addEventListener('click', (e) => { if (e.target === drawer) close(); });
  drawer.querySelectorAll('a').forEach(a => a.addEventListener('click', close));
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') close(); });
}

/* --------------------------------------------------- reveal animations */
function initReveals() {
  const els = document.querySelectorAll('.reveal');
  if (!('IntersectionObserver' in window)) { els.forEach(el => el.classList.add('is-visible')); return; }
  const io = new IntersectionObserver((entries) => {
    entries.forEach(en => { if (en.isIntersecting) { en.target.classList.add('is-visible'); io.unobserve(en.target); } });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
  els.forEach(el => io.observe(el));
}

/* --------------------------------------------------- animated counters */
function initCounters() {
  const counters = document.querySelectorAll('[data-counter]');
  if (!counters.length) return;
  const animate = (el) => {
    const target = parseFloat(el.dataset.counter);
    const prefix = el.dataset.prefix || '';
    const suffix = el.dataset.suffix || '';
    if (prefersReducedMotion()) { el.textContent = prefix + target.toLocaleString() + suffix; return; }
    const dur = 1600; const start = performance.now();
    const tick = (now) => {
      const p = Math.min((now - start) / dur, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      el.textContent = prefix + Math.round(target * eased).toLocaleString() + suffix;
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  };
  if (!('IntersectionObserver' in window)) { counters.forEach(animate); return; }
  const io = new IntersectionObserver((entries) => {
    entries.forEach(en => { if (en.isIntersecting) { animate(en.target); io.unobserve(en.target); } });
  }, { threshold: 0.4 });
  counters.forEach(el => io.observe(el));
}

function prefersReducedMotion() {
  return window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

/* ---------------------------------------------- progress bar animation */
function animateProgressBars() {
  document.querySelectorAll('.progress__fill[data-width]').forEach(bar => {
    bar.style.width = '0%';
    requestAnimationFrame(() => { requestAnimationFrame(() => { bar.style.width = bar.dataset.width + '%'; }); });
  });
}

/* ------------------------------------------------------------ boot */
document.addEventListener('DOMContentLoaded', () => {
  const navHost = document.getElementById('siteNav');
  if (navHost) navHost.outerHTML = renderNav(navHost.dataset.active || '');
  const footHost = document.getElementById('siteFooter');
  if (footHost) footHost.outerHTML = renderFooter();
  initNav();
  initReveals();
  initCounters();
  animateProgressBars();
});
