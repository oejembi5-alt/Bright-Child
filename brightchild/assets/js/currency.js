/* ============================================================
   BrightChild — currency helpers (sample rates, dynamic-ready)
   ------------------------------------------------------------
   SAMPLE_RATES lives in data.js and is clearly marked as sample
   data. Swap it for a live exchange-rate feed later without
   touching the UI code — everything reads through this module.
   ============================================================ */

const CURRENCIES = ['NGN', 'USD', 'GBP'];

function cur(n) { return SAMPLE_RATES[n] || SAMPLE_RATES.NGN; }
function sym(n) { return cur(n).symbol; }

/** Format an integer amount in the given currency, e.g. ₦25,000 */
function formatMoney(amount, currency) {
  return sym(currency) + Number(amount).toLocaleString('en-US');
}

/** Approximate equivalents in the other supported currencies. */
function equivalents(amount, currency) {
  const r = cur(currency);
  const out = [];
  if (currency !== 'USD') out.push('≈ ' + sym('USD') + (amount * r.usdPerUnit).toFixed(2));
  if (currency !== 'GBP') out.push('≈ ' + sym('GBP') + (amount * r.gbpPerUnit).toFixed(2));
  return out;
}

/** Convert any amount to NGN (the platform's base currency). */
function toNGN(amount, currency) {
  const r = cur(currency);
  return Math.round(amount / r.usdPerUnit * SAMPLE_RATES.NGN.usdPerUnit * 1000) / 1000;
}

/** Sample minimum donation per currency (structure ready for dynamic rules). */
function minDonation(currency) { return SAMPLE_MIN_DONATION[currency] || SAMPLE_MIN_DONATION.NGN; }

/** Preset amounts per currency — NGN presets are canonical, others are localised. */
function presets(currency) {
  if (currency === 'USD') return [5, 10, 25, 50];
  if (currency === 'GBP') return [5, 10, 20, 40];
  return [5000, 10000, 25000, 50000];
}
