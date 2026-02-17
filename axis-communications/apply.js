/* ============================================
   APPLY PAGES — Scroll Animation Engine
   Vanilla JS, no dependencies
   ============================================ */

(function () {
  'use strict';

  // Force scroll to top on refresh
  if ('scrollRestoration' in history) history.scrollRestoration = 'manual';
  window.scrollTo(0, 0);

  // Ensure scroll position is 0 before unload so browser remembers top
  window.addEventListener('beforeunload', function () {
    window.scrollTo(0, 0);
  });

  // --- Scroll Reveal via IntersectionObserver ---
  const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-scale');

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
    );

    revealElements.forEach((el) => observer.observe(el));
  } else {
    // Fallback: show everything immediately
    revealElements.forEach((el) => el.classList.add('is-visible'));
  }

  // --- Subtle Parallax on Large Text ---
  const parallaxElements = document.querySelectorAll('.large-text[data-parallax]');

  if (parallaxElements.length > 0) {
    let ticking = false;

    function onScroll() {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const scrollY = window.scrollY;

          parallaxElements.forEach((el) => {
            const rect = el.getBoundingClientRect();
            const center = rect.top + rect.height / 2;
            const viewportCenter = window.innerHeight / 2;
            const offset = (center - viewportCenter) * 0.06;
            el.style.transform = 'translateY(' + offset + 'px)';
          });

          ticking = false;
        });
        ticking = true;
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true });
  }

  // --- Hide nav on dark sections ---
  const siteNav = document.getElementById('siteNav');
  const darkSections = document.querySelectorAll('.section--dark');

  if (siteNav && darkSections.length > 0) {
    const navObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            siteNav.classList.add('is-hidden');
          } else {
            siteNav.classList.remove('is-hidden');
          }
        });
      },
      { threshold: 0, rootMargin: '-1px 0px 0px 0px' }
    );

    darkSections.forEach((section) => navObserver.observe(section));
  }

  // --- Smooth scroll for anchor links ---
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;

      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
})();

/* --- Video Showcase: scroll-driven zoom + Vimeo control --- */
(function () {
  if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;
  gsap.registerPlugin(ScrollTrigger);
  ScrollTrigger.clearScrollMemory();
  window.scrollTo(0, 0);

  var section      = document.getElementById('videoSection');
  var playerEl     = document.getElementById('videoPlayer');
  var text1        = document.getElementById('videoText1');
  var text2        = document.getElementById('videoText2');
  var arrow        = document.getElementById('videoArrow');
  var overlay      = document.getElementById('videoPlayOverlay');
  var pauseBtn     = document.getElementById('videoPauseBtn');
  var subtitlesBtn = document.getElementById('videoSubtitlesBtn');
  var volumeEl     = document.getElementById('videoVolume');
  var volumeFill   = document.getElementById('videoVolumeFill');
  var progressEl   = document.getElementById('videoProgress');
  var progressFill = document.getElementById('videoProgressFill');
  var iframe       = playerEl ? playerEl.querySelector('iframe') : null;
  if (!section || !playerEl) return;

  var heading = section.querySelector('.video-section__heading');
  var sub     = section.querySelector('.video-section__sub');

  // --- State ---
  var vimeo       = null;
  var isLooping   = true;
  var isPlaying   = false;
  var isFullScale = false;
  var subtitlesOn = false;
  var savedTime   = 0;
  var videoDuration = 0;
  var LOOP_END    = 5;

  // --- Vimeo init (only if SDK loaded) ---
  if (typeof Vimeo !== 'undefined' && iframe) {
    vimeo = new Vimeo.Player(iframe);

    vimeo.on('timeupdate', function (data) {
      if (isLooping && data.seconds >= LOOP_END) {
        vimeo.setCurrentTime(0);
      }
      if (isPlaying && progressFill && data.duration > 0) {
        savedTime = data.seconds;
        videoDuration = data.duration;
        progressFill.style.width = ((data.seconds / data.duration) * 100) + '%';
      }
    });

    vimeo.ready().then(function () {
      vimeo.setVolume(0);
      vimeo.getDuration().then(function (d) { videoDuration = d; });
      vimeo.play();
    });

    vimeo.on('ended', function () {
      isPlaying = false;
      isLooping = true;
      savedTime = 0;
      if (progressFill) progressFill.style.width = '0%';
      playerEl.classList.remove('is-playing');
      vimeo.setVolume(0);
      vimeo.setCurrentTime(0);
      vimeo.play();
      if (isFullScale && overlay) overlay.classList.add('is-visible');
    });
  }

  // --- GSAP scroll timeline ---
  var tl = gsap.timeline({
    scrollTrigger: {
      trigger: section,
      start: 'top top',
      end: '+=150%',
      pin: true,
      scrub: 0.5,
      onUpdate: function (self) {
        var progress = self.progress;

        if (progress >= 0.75 && !isFullScale) {
          isFullScale = true;
          if (!isPlaying && overlay) overlay.classList.add('is-visible');
        } else if (progress < 0.75 && isFullScale) {
          isFullScale = false;
          if (isPlaying) {
            isPlaying = false;
            playerEl.classList.remove('is-playing');
            if (vimeo) {
              vimeo.setVolume(0);
              vimeo.pause();
            }
          }
          if (overlay) overlay.classList.remove('is-visible');
        }
      }
    }
  });

  tl.fromTo(playerEl,
    { scale: 0.3, rotate: 3, y: 0, borderRadius: '48px' },
    { scale: 0.78, rotate: 0, y: '-18vh', borderRadius: '14px', duration: 0.75, ease: 'none' },
    0
  );

  tl.to(heading, { opacity: 0, y: -30, duration: 0.4, ease: 'none' }, 0.2);
  tl.to(sub,     { opacity: 0, y: -20, duration: 0.3, ease: 'none' }, 0.25);
  tl.to(text1,   { opacity: 1, y: 0, duration: 0.13, ease: 'none' }, 0.75);
  tl.to(text2,   { opacity: 1, y: 0, duration: 0.1, ease: 'none' }, 0.85);
  if (arrow) tl.to(arrow, { opacity: 1, duration: 0.08, ease: 'none' }, 0.92);

  // --- Play button ---
  if (overlay) {
    overlay.addEventListener('click', function () {
      isLooping = false;
      isPlaying = true;
      overlay.classList.remove('is-visible');
      playerEl.classList.add('is-playing');
      if (vimeo) {
        vimeo.setVolume(0.85);
        vimeo.play();
      }
    });
  }

  // --- Pause button (hover controls) ---
  if (pauseBtn) {
    pauseBtn.addEventListener('click', function () {
      isPlaying = false;
      playerEl.classList.remove('is-playing');
      if (vimeo) vimeo.pause();
      if (isFullScale && overlay) overlay.classList.add('is-visible');
    });
  }

  // --- Subtitles toggle ---
  if (subtitlesBtn) {
    subtitlesBtn.addEventListener('click', function (e) {
      e.stopPropagation();
      if (!vimeo) return;
      if (subtitlesOn) {
        vimeo.disableTextTrack();
        subtitlesBtn.classList.remove('is-active');
        subtitlesOn = false;
      } else {
        vimeo.getTextTracks().then(function (tracks) {
          if (tracks.length > 0) {
            vimeo.enableTextTrack(tracks[0].language, tracks[0].kind);
            subtitlesBtn.classList.add('is-active');
            subtitlesOn = true;
          }
        });
      }
    });
  }

  // --- Volume bar ---
  if (volumeEl && volumeFill && vimeo) {
    var dragging = false;

    function setVolumeFromEvent(e) {
      var rect = volumeEl.querySelector('.video-controls__volume-track').getBoundingClientRect();
      var y = Math.max(0, Math.min(1, (rect.bottom - e.clientY) / rect.height));
      vimeo.setVolume(y);
      volumeFill.style.height = (y * 100) + '%';
    }

    volumeEl.addEventListener('mousedown', function (e) {
      e.stopPropagation();
      dragging = true;
      setVolumeFromEvent(e);
    });

    document.addEventListener('mousemove', function (e) {
      if (dragging) setVolumeFromEvent(e);
    });

    document.addEventListener('mouseup', function () {
      dragging = false;
    });

    // Sync fill on play (starts at full volume)
    vimeo.on('volumechange', function (data) {
      volumeFill.style.height = (data.volume * 100) + '%';
    });
  }

  // --- Progress bar seek ---
  if (progressEl && progressFill && vimeo) {
    progressEl.addEventListener('click', function (e) {
      e.stopPropagation();
      if (!videoDuration) return;
      var rect = progressEl.getBoundingClientRect();
      var ratio = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
      var seekTo = ratio * videoDuration;
      savedTime = seekTo;
      progressFill.style.width = (ratio * 100) + '%';
      vimeo.setCurrentTime(seekTo);
    });
  }
})();

/* --- Skills Section: scroll-driven box growth + hover interaction --- */
(function () {
  if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;

  var skillsSection = document.getElementById('skillsSection');
  var skillsBox = skillsSection ? skillsSection.querySelector('.skills-box') : null;
  if (!skillsSection || !skillsBox) return;

  // --- Nav hide on skills section (dark bg) ---
  var siteNav = document.getElementById('siteNav');
  if (siteNav) {
    var skillsNavObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            siteNav.classList.add('is-hidden');
          } else {
            siteNav.classList.remove('is-hidden');
          }
        });
      },
      { threshold: 0, rootMargin: '-1px 0px 0px 0px' }
    );
    skillsNavObserver.observe(skillsBox);
  }

  // --- GSAP scroll animation: box grows to fill viewport ---
  // Expansion happens as the section scrolls into view (no pin)
  var skillsTl = gsap.timeline({
    scrollTrigger: {
      trigger: skillsSection,
      start: 'top 80%',
      end: 'top 50%',
      scrub: 0.5
    }
  });

  skillsTl.fromTo(skillsBox,
    { margin: '24px', borderRadius: '32px' },
    { margin: '0px', borderRadius: '0px', duration: 1, ease: 'none' },
    0
  );

  // --- GSAP scroll animation: box shrinks on exit ---
  var shrinkTl = gsap.timeline({
    scrollTrigger: {
      trigger: skillsSection,
      start: 'bottom bottom',
      end: 'bottom 20%',
      scrub: 0.5
    }
  });

  shrinkTl.fromTo(skillsBox,
    { margin: '0px', borderRadius: '0px' },
    { margin: '24px', borderRadius: '32px', duration: 1, ease: 'none' },
    0
  );

  // --- Hover interaction: character-by-character animation ---
  var skillsItems = skillsSection.querySelectorAll('.skills-item');

  function splitIntoChars(el) {
    var text = el.textContent;
    el.textContent = '';
    var spans = [];
    for (var i = 0; i < text.length; i++) {
      var span = document.createElement('span');
      span.textContent = text[i] === ' ' ? '\u00A0' : text[i];
      span.style.display = 'inline-block';
      el.appendChild(span);
      spans.push(span);
    }
    return spans;
  }

  function restoreText(el, originalText) {
    el.textContent = originalText;
  }

  skillsItems.forEach(function (item) {
    var numEl = item.querySelector('.skills-item__num');
    var descEl = item.querySelector('.skills-item__desc');
    var numText = numEl.textContent;
    var descText = descEl.textContent;

    item.addEventListener('mouseenter', function () {
      item.classList.add('is-hovered');

      // Kill any running tweens to prevent stale state
      gsap.killTweensOf(numEl);
      gsap.killTweensOf(descEl);
      restoreText(numEl, numText);

      // Split and animate number
      var numChars = splitIntoChars(numEl);
      gsap.fromTo(numChars,
        { opacity: 0, y: 8 },
        { opacity: 1, y: 0, stagger: 0.03, duration: 0.3, ease: 'power2.out' }
      );
      gsap.to(numEl, { opacity: 1, duration: 0.01 });

      // Fade in description
      gsap.to(descEl, { opacity: 1, duration: 0.35, ease: 'power2.out' });
    });

    item.addEventListener('mouseleave', function () {
      item.classList.remove('is-hovered');

      // Kill any running tweens and reset immediately
      gsap.killTweensOf(numEl);
      gsap.killTweensOf(descEl);
      var numSpans = numEl.querySelectorAll('span');
      if (numSpans.length) numSpans.forEach(function (s) { gsap.killTweensOf(s); });

      restoreText(numEl, numText);
      gsap.set(numEl, { opacity: 0 });
      gsap.set(descEl, { opacity: 0 });
    });
  });
})();

/* --- Proof Section: faster scroll-up parallax --- */
(function () {
  if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;

  var proofSection = document.getElementById('proofSection');
  var proofBox = document.getElementById('proofBox');
  if (!proofSection || !proofBox) return;

  gsap.fromTo(proofBox,
    { y: '15vh' },
    {
      y: '0vh',
      ease: 'none',
      scrollTrigger: {
        trigger: proofSection,
        start: 'top bottom',
        end: 'top top',
        scrub: 0.5
      }
    }
  );
})();
