(function () {
  'use strict';

  /* ============================================
     WORKS DATA
     ============================================ */
  var WORKS = [
    {
      searchText: 'brand builder who actually understands business not just design',
      suggestions: [
        'a <strong>handsome</strong> brand designer',
        'a <strong>brand</strong> designer who <strong>delivers</strong>',
        'a <strong>handsome</strong> brand designer <strong>with a cat</strong>'
      ],
      tags: ['Brand Identity', 'Art Direction', 'Brand Voice & DNA', 'Packaging Design', 'Supply Chain', 'International Distribution', 'Sustainability', 'Creative Direction', 'Team Leadership'],
      image: 'images/liberte.jpg',
      title: 'Liberte Coffee',
      desc: 'Liberte started as an idea and became a cold brew coffee brand in eight countries across four continents. I built the brand DNA, led the design teams, sourced materials, set up production, and handled distribution. Everything recyclable. Everything intentional. Gold foil on raw cardboard because sustainability should not mean looking like you gave up.'
    }
    // Works 2–8: add here later
  ];

  /* ============================================
     DOM REFS
     ============================================ */
  var searchBox     = document.getElementById('searchBox');
  var searchText    = document.getElementById('searchText');
  var searchCursor  = document.getElementById('searchCursor');
  var suggestions   = document.getElementById('searchSuggestions');
  var suggestionEls = suggestions.querySelectorAll('.search__suggestion');
  var foundEl       = document.getElementById('worksFound');
  var caseEl        = document.getElementById('worksCase');
  var tagList       = document.getElementById('worksTagList');
  var worksImage    = document.getElementById('worksImage');
  var worksTitle    = document.getElementById('worksTitle');
  var worksDesc     = document.getElementById('worksDesc');
  var pagination    = document.getElementById('worksPagination');
  var pageButtons   = pagination.querySelectorAll('.works__page[data-page]');
  var nextButton    = document.getElementById('worksNext');
  var section       = document.getElementById('worksSection');

  var currentWork   = 0;
  var isAnimating   = false;
  var cycleTimer    = null;
  var typeTimer     = null;
  var hasStarted    = false;
  var transitionId  = 0;

  /* ============================================
     UTILITIES
     ============================================ */

  function splitChars(el) {
    var text = el.textContent;
    el.innerHTML = text.split('').map(function (c) {
      return '<span class="char">' + (c === ' ' ? '&nbsp;' : c) + '</span>';
    }).join('');
    return el.querySelectorAll('.char');
  }

  function delay(ms) {
    return new Promise(function (resolve) {
      setTimeout(resolve, ms);
    });
  }

  /* ============================================
     TYPING ANIMATION
     ============================================ */

  function typeText(text, element, speed) {
    speed = speed || 30;
    return new Promise(function (resolve) {
      var i = 0;
      var suggestionsShown = false;
      var lastTime = 0;
      var nextDelay = speed + Math.random() * 15;

      searchBox.classList.add('has-text');

      function tick(timestamp) {
        if (!lastTime) lastTime = timestamp;
        var elapsed = timestamp - lastTime;

        if (elapsed >= nextDelay) {
          element.textContent += text[i];
          i++;

          if (i >= 15 && !suggestionsShown) {
            suggestionsShown = true;
            showSuggestions();
          }

          lastTime = timestamp;
          nextDelay = speed + Math.random() * 15;

          if (i < text.length) {
            typeTimer = requestAnimationFrame(tick);
          } else {
            resolve();
          }
        } else {
          typeTimer = requestAnimationFrame(tick);
        }
      }

      typeTimer = requestAnimationFrame(tick);
    });
  }

  /* ============================================
     DELETE TEXT ANIMATION
     ============================================ */

  function deleteText(element, speed) {
    speed = speed || 20;
    return new Promise(function (resolve) {
      var lastTime = 0;
      var nextDelay = speed + Math.random() * 10;

      function tick(timestamp) {
        if (!lastTime) lastTime = timestamp;
        var elapsed = timestamp - lastTime;

        if (elapsed >= nextDelay) {
          var current = element.textContent;
          if (current.length === 0) {
            searchBox.classList.remove('has-text');
            resolve();
            return;
          }
          element.textContent = current.slice(0, -1);
          lastTime = timestamp;
          nextDelay = speed + Math.random() * 10;
          typeTimer = requestAnimationFrame(tick);
        } else {
          typeTimer = requestAnimationFrame(tick);
        }
      }

      typeTimer = requestAnimationFrame(tick);
    });
  }

  /* ============================================
     SUGGESTIONS
     ============================================ */

  function showSuggestions() {
    suggestions.classList.add('is-visible');

    suggestionEls.forEach(function (el, i) {
      setTimeout(function () {
        el.classList.add('is-visible');
      }, i * 400);
    });
  }

  function hideSuggestions() {
    suggestionEls.forEach(function (el) {
      el.classList.remove('is-visible');
    });
    setTimeout(function () {
      suggestions.classList.remove('is-visible');
    }, 300);
  }

  function hideSuggestionsReverse() {
    var items = Array.prototype.slice.call(suggestionEls);
    var visible = items.filter(function (el) {
      return el.classList.contains('is-visible');
    });
    visible.reverse();
    visible.forEach(function (el, i) {
      setTimeout(function () {
        el.classList.remove('is-visible');
      }, i * 300);
    });
    setTimeout(function () {
      suggestions.classList.remove('is-visible');
    }, visible.length * 300);
  }

  /* ============================================
     SHOW FOUND TEXT
     ============================================ */

  function showFound() {
    foundEl.classList.add('is-visible');
  }

  function hideFound() {
    foundEl.classList.remove('is-visible');
  }

  /* ============================================
     SHOW WORK CASE
     ============================================ */

  function showCase(work) {
    // Update content
    worksImage.src = work.image;
    worksImage.alt = work.title;
    worksDesc.textContent = work.desc;
    worksTitle.textContent = work.title;

    // Update tags
    tagList.innerHTML = work.tags.map(function (tag) {
      return '<li>' + tag + '</li>';
    }).join('');

    // Show case container
    caseEl.classList.add('is-visible');

    // Animate title chars with GSAP
    var chars = splitChars(worksTitle);
    if (typeof gsap !== 'undefined') {
      gsap.from(chars, {
        opacity: 0,
        y: 20,
        duration: 0.5,
        stagger: 0.02,
        ease: 'power2.out'
      });

      // Animate description
      gsap.from(worksDesc, {
        opacity: 0,
        y: 16,
        duration: 0.6,
        delay: 0.3,
        ease: 'power2.out'
      });

      // Animate image
      gsap.from(worksImage, {
        opacity: 0,
        scale: 0.97,
        duration: 0.7,
        ease: 'power2.out'
      });

      // Animate tags label
      var tagsLabel = caseEl.querySelector('.works__tags-label');
      gsap.from(tagsLabel, {
        opacity: 0,
        y: 10,
        duration: 0.4,
        ease: 'power2.out'
      });
    }

    // Stagger tag items
    var tagItems = tagList.querySelectorAll('li');
    tagItems.forEach(function (li, i) {
      setTimeout(function () {
        li.classList.add('is-visible');
      }, 100 + i * 80);
    });
  }

  function hideCase() {
    caseEl.classList.remove('is-visible');
    var tagItems = tagList.querySelectorAll('li');
    tagItems.forEach(function (li) {
      li.classList.remove('is-visible');
    });
  }

  /* ============================================
     RESET STATE
     ============================================ */

  function resetAll() {
    cancelAnimationFrame(typeTimer);
    clearTimeout(cycleTimer);
    searchText.textContent = '';
    searchBox.classList.remove('has-text');
    searchCursor.style.display = '';
    hideSuggestions();
    hideFound();
    hideCase();
  }

  /* ============================================
     UPDATE PAGINATION
     ============================================ */

  function updatePagination(index) {
    pageButtons.forEach(function (btn) {
      btn.classList.remove('is-active');
    });
    var active = pagination.querySelector('[data-page="' + index + '"]');
    if (active) active.classList.add('is-active');
  }

  /* ============================================
     PLAY ONE WORK (first appearance only)
     ============================================ */

  function playWork(index) {
    if (isAnimating) return;
    isAnimating = true;

    // Wrap index for available works
    var workIndex = index % WORKS.length;
    var work = WORKS[workIndex];
    currentWork = index;

    updatePagination(index);
    resetAll();

    // Small delay before starting typing
    setTimeout(async function () {
      // Step 1: Type search text
      await typeText(work.searchText, searchText);

      // Step 2: Show found text
      showFound();
      await delay(400);

      // Step 3: Show work case
      showCase(work);

      isAnimating = false;

      // Step 4: Auto-cycle after 7 seconds
      cycleTimer = setTimeout(function () {
        var nextIndex = (currentWork + 1) % 8;
        transitionToWork(nextIndex);
      }, 7000);
    }, 300);
  }

  /* ============================================
     SMOOTH TRANSITION BETWEEN WORKS
     ============================================ */

  async function transitionToWork(index) {
    if (isAnimating) return;
    isAnimating = true;

    transitionId++;
    var myId = transitionId;

    var workIndex = index % WORKS.length;
    var work = WORKS[workIndex];
    currentWork = index;

    updatePagination(index);

    // 1. Hide "found" text
    hideFound();

    // 2. Delete text + hide suggestions in reverse (parallel)
    hideSuggestionsReverse();
    await deleteText(searchText);
    if (myId !== transitionId) return;

    // 3. Brief pause at empty state
    await delay(200);
    if (myId !== transitionId) return;

    // 4. Update suggestion content for next work
    suggestionEls.forEach(function (el, i) {
      if (work.suggestions && work.suggestions[i]) {
        el.innerHTML = work.suggestions[i];
      }
    });

    // 5. Type new query (suggestions appear during typing via showSuggestions)
    await typeText(work.searchText, searchText);
    if (myId !== transitionId) return;

    // 6. Show "found" + brief delay
    showFound();
    await delay(400);
    if (myId !== transitionId) return;

    // 7. Fade out old case
    hideCase();
    await delay(500);
    if (myId !== transitionId) return;

    // 8. Show new case
    showCase(work);

    isAnimating = false;

    // 9. Schedule next auto-cycle
    cycleTimer = setTimeout(function () {
      var nextIndex = (currentWork + 1) % 8;
      transitionToWork(nextIndex);
    }, 7000);
  }

  /* ============================================
     GO TO SPECIFIC WORK
     ============================================ */

  function goToWork(index) {
    // Cancel any in-progress transition
    transitionId++;
    clearTimeout(cycleTimer);
    cancelAnimationFrame(typeTimer);
    isAnimating = false;

    // If work case is currently visible, do a smooth transition
    if (caseEl.classList.contains('is-visible')) {
      transitionToWork(index);
    } else {
      resetAll();
      setTimeout(function () {
        playWork(index);
      }, 100);
    }
  }

  /* ============================================
     PAGINATION CLICK HANDLERS
     ============================================ */

  pageButtons.forEach(function (btn) {
    btn.addEventListener('click', function () {
      var page = parseInt(btn.getAttribute('data-page'), 10);
      goToWork(page);
    });
  });

  nextButton.addEventListener('click', function () {
    var nextIndex = (currentWork + 1) % 8;
    goToWork(nextIndex);
  });

  /* ============================================
     SCROLL TRIGGER — START ON VIEWPORT ENTRY
     ============================================ */

  if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);

    ScrollTrigger.create({
      trigger: section,
      start: 'top 80%',
      once: true,
      onEnter: function () {
        if (!hasStarted) {
          hasStarted = true;
          playWork(0);
        }
      }
    });
  } else {
    // Fallback: IntersectionObserver
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting && !hasStarted) {
          hasStarted = true;
          playWork(0);
          observer.disconnect();
        }
      });
    }, { threshold: 0.2 });

    observer.observe(section);
  }

})();
