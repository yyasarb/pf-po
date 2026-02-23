/* ============================================
   SNAP SCROLL
   GSAP Observer for full-page snap
   ============================================ */
(function () {
  'use strict';

  if (typeof gsap === 'undefined' || typeof Observer === 'undefined' || !window.lenis) return;
  if (window.innerWidth <= 768) return;

  gsap.registerPlugin(Observer);

  /* ---------- DOM refs ---------- */
  var sectionKeys = ['hero', 'works', 'clients', 'about', 'contact'];
  var sections = [];
  for (var i = 0; i < sectionKeys.length; i++) {
    var el = document.querySelector('[data-section="' + sectionKeys[i] + '"]');
    if (!el) return;
    sections.push(el);
  }

  var total = sections.length;

  /* ---------- State ---------- */
  var currentIndex = 0;
  var isSnapping = false;
  var SNAP_COOLDOWN = 300;
  var SNAP_DURATION = 1.2;

  /* ---------- Helpers ---------- */
  function sectionTop(el) {
    return el.getBoundingClientRect().top + window.scrollY;
  }

  /* ---------- Block native scroll while snapping ---------- */
  window.addEventListener('wheel', function (e) {
    if (isSnapping) {
      e.preventDefault();
    }
  }, { passive: false });

  var touchStartY = 0;
  window.addEventListener('touchstart', function (e) {
    touchStartY = e.touches[0].clientY;
  }, { passive: true });

  window.addEventListener('touchmove', function (e) {
    if (isSnapping) {
      e.preventDefault();
    }
  }, { passive: false });

  /* ---------- Snap ---------- */
  function snapTo(index) {
    if (index < 0 || index >= total) return;
    if (isSnapping) return;
    isSnapping = true;
    currentIndex = index;

    window.lenis.scrollTo(sections[index], {
      duration: SNAP_DURATION,
      force: true,
      lock: true,
      onComplete: function () {
        setTimeout(function () {
          isSnapping = false;
        }, SNAP_COOLDOWN);
      }
    });
  }

  /* ---------- Determine current index from scroll position ---------- */
  function syncIndex() {
    var scroll = window.scrollY;
    var viewH = window.innerHeight;
    for (var i = total - 1; i >= 0; i--) {
      if (scroll >= sectionTop(sections[i]) - viewH * 0.5) {
        currentIndex = i;
        return;
      }
    }
    currentIndex = 0;
  }

  /* ---------- Observer ---------- */
  Observer.create({
    type: 'wheel,touch',
    tolerance: 50,
    preventDefault: false,
    onUp: function () {
      if (isSnapping) return;
      syncIndex();
      snapTo(currentIndex - 1);
    },
    onDown: function () {
      if (isSnapping) return;
      syncIndex();
      snapTo(currentIndex + 1);
    }
  });

})();
