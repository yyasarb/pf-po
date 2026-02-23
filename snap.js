/* ============================================
   SNAP SCROLL
   GSAP Observer for full-page snap
   ============================================ */
(function () {
  'use strict';

  var lenis = window.lenis;
  if (typeof gsap === 'undefined' || typeof Observer === 'undefined' || !lenis) return;
  if (window.innerWidth <= 767) return;

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
  var snapTimer = null;
  var SNAP_COOLDOWN = 50;
  var SNAP_DURATION = 1.1;
  var SAFETY_TIMEOUT = (SNAP_DURATION * 1000) + 400;

  /* ---------- Helpers ---------- */
  function sectionTop(el) {
    return el.getBoundingClientRect().top + window.scrollY;
  }

  function unlock() {
    clearTimeout(snapTimer);
    isSnapping = false;
    lenis.start();
  }

  /* ---------- Snap ---------- */
  function snapTo(index) {
    if (index < 0 || index >= total) return;
    if (isSnapping) return;
    isSnapping = true;
    currentIndex = index;

    // Sync Lenis position before stopping to prevent micro-jump
    lenis.scrollTo(window.scrollY, { immediate: true });
    lenis.stop();

    // Safety: always unlock if animation doesn't complete
    clearTimeout(snapTimer);
    snapTimer = setTimeout(unlock, SAFETY_TIMEOUT);

    // Animate scroll position directly via GSAP tween
    var startY = window.scrollY;
    var endY = sectionTop(sections[index]);
    var obj = { y: startY };

    gsap.to(obj, {
      y: endY,
      duration: SNAP_DURATION,
      ease: 'power2.out',
      onUpdate: function () {
        window.scrollTo(0, obj.y);
      },
      onComplete: function () {
        clearTimeout(snapTimer);
        setTimeout(unlock, SNAP_COOLDOWN);
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
    preventDefault: true,
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
