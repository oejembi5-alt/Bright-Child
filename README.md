# BrightChild — Charity Donation Website (Prototype)

"Every Child Deserves a Brighter Tomorrow."

A polished, responsive, multi-page static prototype for an international
children's charity platform. No build step required — plain HTML/CSS/JS.

## Structure
    brightchild/
      index.html          Homepage (hero, counters, children, causes, donate widget,
                          trust, how it works, impact, about, dashboard preview,
                          testimonials, newsletter)
      child.html          Campaign detail page (child.html?id=amina|daniel|grace|samuel)
      donate.html         5-step donation flow (currency → amount → destination →
                          details → payment placeholder)
      assets/css/styles.css   Design system (bright palette, responsive, reduced-motion)
      assets/js/data.js      Sample children/causes/stats/testimonials (all fictional)
      assets/js/currency.js  Currency helpers — sample rates, ready for a live feed
      assets/js/ui.js        Nav, footer, mobile menu, counters, reveal animations,
                             SVG portrait generator
      assets/js/home.js      Homepage rendering + donate widget
    worker.js              Cloudflare Worker: serves assets via env.ASSETS.fetch
    manifest.json          Sites deploy manifest

## Run locally
    cd brightchild
    python3 -m http.server 3000

## Notes
- All children, stories, figures and testimonials are FICTIONAL SAMPLE CONTENT.
- No real payments are processed; payment step is an honest placeholder.
- Sample exchange rates in data.js are structured for easy replacement with a
  live rates API.
