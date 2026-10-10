/* ============================================================
   BrightChild — homepage rendering + donate widget behaviour
   Depends on: data.js, ui.js, currency.js (loaded in that order)
   ============================================================ */

const esc = (s) => String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

/* ------------------------------------------------------ child cards */
function childCardHTML(c, delay) {
  const pct = Math.min(100, Math.round((c.raised / c.target) * 100));
  return `
  <article class="child-card reveal" data-delay="${delay}" data-category="${c.categoryKey}">
    <a class="child-card__media" href="child.html?id=${c.id}" aria-label="View ${esc(c.firstName)}'s campaign">
      ${childPortraitSVG(c.seed, `Illustrated portrait of ${esc(c.firstName)}, a hopeful smiling child`)}
      <span class="child-card__tag tag--${c.categoryKey}">${esc(c.category)}</span>
    </a>
    <div class="child-card__body">
      <div class="child-card__name-row">
        <h3 class="child-card__name">${esc(c.firstName)}</h3>
        <span class="child-card__age">${c.age} yrs</span>
      </div>
      <p class="child-card__loc">📍 ${esc(c.location)}</p>
      <p class="child-card__story">${esc(c.story)}</p>
      <div class="child-card__meta">
        <span class="raised">${formatMoney(c.raised, 'NGN')} raised</span>
        <span class="goal">of ${formatMoney(c.target, 'NGN')}</span>
      </div>
      <div class="progress" role="progressbar" aria-valuenow="${pct}" aria-valuemin="0" aria-valuemax="100" aria-label="${pct}% of goal raised">
        <div class="progress__fill" data-width="${pct}"></div>
      </div>
      <a href="child.html?id=${c.id}" class="btn btn--primary btn--sm btn--block">Help ${esc(c.firstName)}</a>
    </div>
  </article>`;
}

function renderChildren(filter) {
  const grid = document.getElementById('childrenGrid');
  if (!grid) return;
  const list = filter && filter !== 'all' ? CHILDREN.filter(c => c.categoryKey === filter) : CHILDREN;
  if (!list.length) {
    grid.innerHTML = `<p class="section-sub" style="grid-column:1/-1;text-align:center;">No sample campaigns in this category yet — check back soon.</p>`;
    return;
  }
  grid.innerHTML = list.map((c, i) => childCardHTML(c, Math.min(i, 3))).join('');
  grid.querySelectorAll('.reveal').forEach(el => el.classList.add('is-visible'));
  animateProgressBars();
}

/* ------------------------------------------------------ causes */
function causeCardHTML(ca, delay) {
  return `
  <article class="cause-card cause-card--${ca.color} reveal" data-delay="${delay}">
    <div class="cause-card__icon" aria-hidden="true">${ca.icon}</div>
    <h3 class="cause-card__title">${esc(ca.title)}</h3>
    <p class="cause-card__text">${esc(ca.text)}</p>
    <a class="link-arrow" href="index.html#children" data-filter="${ca.key}" data-filter-label="${esc(ca.title)}">Help Now</a>
  </article>`;
}

/* ------------------------------------------------------ testimonials */
function testiCardHTML(t, delay) {
  return `
  <article class="testi-card reveal" data-delay="${delay}">
    <div class="quote-mark quote-mark--${t.accent}" aria-hidden="true">"</div>
    <blockquote>${esc(t.quote)}</blockquote>
    <div class="testi-who">
      <span class="testi-avatar" style="background:linear-gradient(135deg,var(--${t.accent}),var(--orange))" aria-hidden="true">${esc(t.name.charAt(0))}</span>
      <div><strong>${esc(t.name)}</strong><span>${esc(t.role)}</span></div>
    </div>
  </article>`;
}

/* ------------------------------------------------------ impact stories */
function storyCardHTML(s, delay) {
  return `
  <article class="story-card reveal" data-delay="${delay}">
    ${childPortraitSVG(s.seed + '-scene', `Illustration representing our ${esc(s.title)} impact area`)}
    <div class="story-card__body">
      <span class="story-card__tag story-card__tag--${s.accent}">${esc(s.title)}</span>
      <p>${esc(s.text)}</p>
    </div>
  </article>`;
}

/* ------------------------------------------------------ donate widget */
function donateWidgetHTML() {
  const p = presets('NGN');
  return `
  <div>
    <div class="seg" role="group" aria-label="Currency">
      ${CURRENCIES.map(c => `<button type="button" data-currency="${c}" class="${c === 'NGN' ? 'is-active' : ''}">${c}</button>`).join('')}
    </div>
    <div class="seg" role="group" aria-label="Frequency" style="margin-top:14px;">
      <button type="button" data-frequency="one-time" class="is-active">One-time</button>
      <button type="button" data-frequency="monthly">Monthly</button>
    </div>
    <div class="amount-grid" role="group" aria-label="Donation amount">
      ${p.map((a, i) => `<button type="button" class="amount-chip ${i === 1 ? 'is-active' : ''}" data-amount="${a}">
        ${formatMoney(a, 'NGN')}<small data-equiv></small></button>`).join('')}
    </div>
    <div style="margin-top:14px;">
      <label class="sr-only" for="dwCustom" style="position:absolute;left:-9999px;">Custom amount</label>
      <input id="dwCustom" class="donate-field" type="number" inputmode="numeric" min="5000" step="500"
             placeholder="Custom amount (min ₦5,000)" aria-label="Custom amount in Nigerian Naira, minimum 5,000">
    </div>
    <div class="choice-row" role="radiogroup" aria-label="Donation destination">
      <button type="button" class="choice-pill is-active" data-dest="general">
        <span class="radio" aria-hidden="true"></span>
        <span><strong>General BrightChild Fund</strong><span>Where the need is greatest</span></span>
      </button>
      <button type="button" class="choice-pill" data-dest="child">
        <span class="radio" aria-hidden="true"></span>
        <span><strong>A Specific Child</strong><span>Pick a campaign you love</span></span>
      </button>
    </div>
    <div id="dwChildPick" style="margin-top:14px;" class="hidden">
      <select class="donate-field" id="dwChildSelect" aria-label="Choose a child to support">
        ${CHILDREN.map(c => `<option value="${c.id}">${esc(c.firstName)}, ${c.age} — ${esc(c.category)}</option>`).join('')}
      </select>
    </div>
    <div class="donate-summary" id="dwSummary" aria-live="polite"></div>
    <p class="rate-note">Currency equivalents are sample approximations for this prototype — the interface is structured for a live exchange-rate feed.</p>
    <a href="donate.html" class="btn btn--yellow btn--lg btn--block" id="dwContinue" style="margin-top:20px;">Continue to Donate →</a>
  </div>`;
}

function initDonateWidget() {
  const root = document.getElementById('donateWidget');
  if (!root) return;
  root.innerHTML = donateWidgetHTML();

  const state = { ...BC_DonationState, amount: presets('NGN')[1] };

  const summary = root.querySelector('#dwSummary');
  const chips = [...root.querySelectorAll('.amount-chip')];
  const custom = root.querySelector('#dwCustom');

  function updateEquivs() {
    chips.forEach(ch => {
      const a = parseInt(ch.dataset.amount, 10);
      ch.querySelector('[data-equiv]').textContent = equivalents(a, state.currency).join(' · ');
      ch.firstChild.textContent = '';
      ch.insertBefore(document.createTextNode(formatMoney(a, state.currency)), ch.firstChild);
    });
    if (custom) custom.placeholder = `Custom amount (min ${formatMoney(minDonation(state.currency), state.currency)})`;
    custom.min = minDonation(state.currency);
  }

  function renderSummary() {
    const amt = state.amount;
    const dest = state.destination === 'child'
      ? `the <b>${esc((CHILDREN.find(c => c.id === root.querySelector('#dwChildSelect').value) || CHILDREN[0]).firstName)}</b> campaign`
      : 'the <b>General BrightChild Fund</b>';
    const freq = state.frequency === 'monthly' ? 'every month' : 'once';
    summary.innerHTML = `You're giving <b>${formatMoney(amt, state.currency)}</b> ${freq} to ${dest}. ${equivalents(amt, state.currency).join(' · ')}`;
  }

  root.querySelectorAll('[data-currency]').forEach(btn => btn.addEventListener('click', () => {
    root.querySelectorAll('[data-currency]').forEach(b => b.classList.remove('is-active'));
    btn.classList.add('is-active');
    state.currency = btn.dataset.currency;
    const p = presets(state.currency);
    state.amount = p[1];
    chips.forEach((ch, i) => {
      ch.dataset.amount = p[i]; ch.classList.toggle('is-active', i === 1);
      ch.querySelector('[data-equiv]').textContent = '';
    });
    custom.value = '';
    updateEquivs(); renderSummary();
  }));

  root.querySelectorAll('[data-frequency]').forEach(btn => btn.addEventListener('click', () => {
    root.querySelectorAll('[data-frequency]').forEach(b => b.classList.remove('is-active'));
    btn.classList.add('is-active');
    state.frequency = btn.dataset.frequency;
    renderSummary();
  }));

  chips.forEach(ch => ch.addEventListener('click', () => {
    chips.forEach(c => c.classList.remove('is-active'));
    ch.classList.add('is-active');
    state.amount = parseInt(ch.dataset.amount, 10);
    custom.value = '';
    renderSummary();
  }));

  custom.addEventListener('input', () => {
    const v = parseInt(custom.value, 10);
    if (!isNaN(v) && v >= minDonation(state.currency)) {
      chips.forEach(c => c.classList.remove('is-active'));
      state.amount = v;
    }
    renderSummary();
  });

  root.querySelectorAll('.choice-pill').forEach(pill => pill.addEventListener('click', () => {
    root.querySelectorAll('.choice-pill').forEach(p => p.classList.remove('is-active'));
    pill.classList.add('is-active');
    state.destination = pill.dataset.dest;
    root.querySelector('#dwChildPick').classList.toggle('hidden', state.destination !== 'child');
    renderSummary();
  }));

  root.querySelector('#dwChildSelect').addEventListener('change', renderSummary);
  root.querySelector('#dwContinue').addEventListener('click', () => {
    BC_DonationState.currency = state.currency;
    BC_DonationState.frequency = state.frequency;
    BC_DonationState.amount = state.amount;
    BC_DonationState.destination = state.destination;
    BC_DonationState.childId = state.destination === 'child' ? root.querySelector('#dwChildSelect').value : null;
  });

  updateEquivs(); renderSummary();
}

/* ------------------------------------------------------ cause filter wiring */
function initCauseFilters() {
  document.querySelectorAll('[data-filter]').forEach(el => {
    el.addEventListener('click', () => {
      const f = el.dataset.filter;
      const map = { medical: 'medical', education: 'education', food: 'food', shelter: 'shelter', basics: 'all', emergency: 'all' };
      try { sessionStorage.setItem('bcFilter', map[f] || 'all'); } catch (e) {}
    });
  });
  const stored = (() => { try { return sessionStorage.getItem('bcFilter'); } catch (e) { return null; } })();
  if (stored) {
    try { sessionStorage.removeItem('bcFilter'); } catch (e) {}
    setTimeout(() => {
      renderChildren(stored);
      const el = document.getElementById('children');
      if (el) el.scrollIntoView({ behavior: prefersReducedMotion() ? 'auto' : 'smooth' });
    }, 60);
  }
}

/* ------------------------------------------------------ newsletter */
function initNewsletter() {
  const form = document.getElementById('newsletterForm');
  if (!form) return;
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = form.querySelector('input[type="email"]').value.trim();
    const msg = document.getElementById('newsletterMsg');
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      msg.textContent = 'Please enter a valid email address.'; return;
    }
    msg.textContent = 'Thank you! (Prototype — no email was actually stored.)';
    form.reset();
  });
}

/* ------------------------------------------------------ boot */
document.addEventListener('DOMContentLoaded', () => {
  renderChildren('all');
  const causesGrid = document.getElementById('causesGrid');
  if (causesGrid) causesGrid.innerHTML = CAUSES.map((c, i) => causeCardHTML(c, Math.min(i, 3))).join('');
  const testiGrid = document.getElementById('testiGrid');
  if (testiGrid) testiGrid.innerHTML = TESTIMONIALS.map((t, i) => testiCardHTML(t, Math.min(i, 2))).join('');
  const storyGrid = document.getElementById('storyGrid');
  if (storyGrid) storyGrid.innerHTML = IMPACT_STORIES.map((s, i) => storyCardHTML(s, i)).join('');
  initDonateWidget();
  initCauseFilters();
  initNewsletter();
});
