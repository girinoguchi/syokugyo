/* 広告用LP（/lp/entame）のスクロール出現アニメーションとCV計測 */
(function () {
  'use strict';

  // スクロール時の出現アニメーション
  var revealEls = document.querySelectorAll('.lp-root .reveal');
  if ('IntersectionObserver' in window && revealEls.length) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('in');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });
    revealEls.forEach(function (el) { io.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add('in'); });
  }

  // CTAクリックの計測（GA4 / Google広告 / Meta Pixel）
  var cfg = window.ENGINE_LP || {};
  function track() {
    try {
      if (typeof gtag === 'function') {
        gtag('event', 'sign_up_cta_click', { event_category: 'lp_entame' });
        if (cfg.gadsId && cfg.gadsLabel) {
          gtag('event', 'conversion', { send_to: cfg.gadsId + '/' + cfg.gadsLabel });
        }
      }
      if (typeof fbq === 'function') {
        fbq('track', 'Lead');
      }
    } catch (e) {}
  }

  document.querySelectorAll('.lp-root a[data-cta], .lp-root .btn-cta').forEach(function (btn) {
    btn.addEventListener('click', track);
  });
})();
