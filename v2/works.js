(function () {
  'use strict';

  /* ============================================
     WORKS DATA
     ============================================ */
  var WORKS = [
    {
      searchText: 'brand builder who actually understands business not just design',
      suggestions: [
        '<strong>handsome</strong> brand designer',
        '<strong>brand</strong> designer who <strong>delivers</strong>',
        '<strong>brand builder who has</strong> done <strong>it</strong> for himself first'
      ],
      tags: ['Brand Identity', 'Art Direction', 'Brand Voice & DNA', 'Packaging Design', 'Supply Chain', 'International Distribution', 'Sustainability', 'Creative Direction', 'Team Leadership'],
      image: 'images/liberte.jpg',
      video: 'videos/liberte.mp4',
      title: 'Liberte Coffee',
      desc: 'Liberte started as an idea and became a cold brew coffee brand in eight countries across four continents. I built the brand DNA, led the design teams, sourced materials, set up production, and handled distribution. Everything recyclable. Everything intentional. Gold foil on raw cardboard because sustainability should not mean looking like you gave up.'
    },
    {
      searchText: 'how to get sales with zero ad spend',
      suggestions: [
        '<strong>how to get</strong> sales without selling <strong>your soul</strong>',
        '<strong>marketing that works</strong> while you sleep',
        '<strong>someone who actually reads</strong> Google Analytics'
      ],
      tags: ['SEO Strategy', 'Content Marketing', 'Brand Creation', 'E-Commerce', 'Organic Growth', 'Copywriting', 'Sales Strategy', 'Analytics', 'AI Automation', 'Generative AI', 'Content Systems'],
      image: 'images/terralina.jpg',
      video: null,
      title: 'Terralina',
      desc: 'Terralina started with no audience, no ads, and no budget for either. I built the brand, wrote SEO driven content, built AI automation tools for image generation and content creation, and generated sales within the first month. Zero ad spend. All organic. When your systems do the selling, you do not need a media budget.'
    },
    {
      searchText: 'someone who builds the whole product not just the mockup',
      suggestions: [
        '<strong>developer</strong> who also <strong>has taste</strong>',
        '<strong>developer</strong> who does not <strong>speak</strong> only in code',
        '<strong>full stack</strong> but make it <strong>beautiful</strong>'
      ],
      tags: ['Full Stack Development', 'Web Application', 'UX Design', 'Backend', 'Frontend Development', 'Database Architecture', 'Brand Identity', 'Bilingual Platform'],
      image: 'images/fikola.jpg',
      video: null,
      title: 'Fikola',
      desc: 'Fikola is a bilingual ride-sharing platform I built from scratch. Not just the brand. The actual product. Backend, frontend, database, email systems, deployment. One person, zero investors, fully functional. Free to use, no ads, no data selling. Just a working platform that solves a real problem. Visit fikola.com and see for yourself.'
    },
    {
      searchText: 'documentary filmmaker who can deliver millions of views',
      suggestions: [
        '<strong>cinematographer</strong> who also does the research',
        '<strong>filmmaker who</strong> brings his own <strong>snacks on location</strong>',
        '<strong>filmmaker who does</strong> not need a full crew to <strong>deliver</strong>'
      ],
      tags: ['Director of Photography', 'Documentary Filmmaking', 'Pre-Production Research', 'Interview Sourcing', 'Location Scouting', 'Cinematography', 'Aerial Cinematography', 'International Production', 'Cross-Border Collaboration'],
      image: 'images/business-insider.jpg',
      video: null,
      title: 'Business Insider',
      desc: 'Eight million views. That is how many people watched a documentary I shot for Business Insider. I did not just show up with a camera. I researched the subject, found the people worth interviewing, scouted every location, and filmed across Norway and Nigeria while working with a UK based producer. Cinematography and aerial. Pre-production to final delivery.'
    },
    {
      searchText: 'filmmaker who can make complex topics actually interesting',
      suggestions: [
        'someone who <strong>films in minus forty and still delivers</strong>',
        '<strong>filmmaker</strong> who made someone care about <strong>winter cycling</strong>',
        '<strong>storyteller who does</strong> not need a narrator to <strong>make a point</strong>'
      ],
      tags: ['Documentary Filmmaking', 'Storytelling', 'Sit Down Interviews', 'Cinematography', 'Color Grading', 'Narrative Film', 'Multi-Country Production', 'Urban Planning', 'Sustainability Content'],
      image: 'images/eit.jpg',
      video: null,
      title: 'EIT Urban Mobility',
      desc: 'Can you bike to work when it is minus forty? That is the kind of question I turned into a film people actually wanted to watch. Multiple documentary and narrative projects for EIT Urban Mobility, shot across three countries. Complex problems around urban planning and sustainable transport, told through real people and real stories. Interviews, cinematography, color grading, and storytelling that makes innovation feel human instead of institutional.'
    },
    {
      searchText: 'someone who can capture the human story behind a brand',
      suggestions: [
        '<strong>filmmaker who makes</strong> your customers more <strong>interesting</strong> than your <strong>ads</strong>',
        '<strong>filmmaker who finds the story</strong> you did not know was there',
        '<strong>filmmaker who</strong> makes strangers <strong>feel like someone</strong> you know'
      ],
      tags: ['Director', 'Cinematic Storytelling', 'Portrait Film', 'Customer Stories', 'Narrative Filmmaking', 'Cinematography', 'Art Direction', 'Brand Storytelling', 'Human Interest'],
      image: 'images/you-cannot.jpg',
      video: null,
      title: 'You Cannot Hide',
      desc: 'A glass artist on Bornholm, working alone in her studio between silence and heat. No script. No product placement. No voiceover telling you what to feel. Just a real person and the invisible process that shapes her work. I directed and produced "You Cannot Hide," a cinematic portrait of Manon Hillereau. This is the approach that works for customer stories. Follow someone in their world, let the craft speak, and the brand becomes felt instead of forced.'
    },
    {
      searchText: 'aerial cinematographer who handles permits not just a controller',
      suggestions: [
        '<strong>a drone pilot who knows what</strong> a NOTAM is without <strong>Googling is</strong>',
        '<strong>aerial cinematographer</strong> who has never lost a drone <strong>(on camera)</strong>',
        '<strong>pilot who gets the shot</strong> and the paperwork right'
      ],
      tags: ['Licensed Drone Operator', 'Aerial Cinematography', 'European Drone Regulations', 'Airspace Planning', 'Flight Permits', 'Safety Protocols', 'Restricted Airspace Operations', 'Cinematic Filming', 'Production Planning', 'DJI Systems'],
      image: 'images/drone.jpg',
      video: null,
      title: 'Aerial Cinematography',
      desc: 'The difference between a drone operator and an aerial cinematographer is paperwork, planning, and taste. I handle all three. Licensed, regulation-fluent, and experienced in restricted airspace operations across Europe. I do not just fly up and press record. I plan the shot, file the permits, and deliver footage that looks like it belongs on a cinema screen.'
    }
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
  var loaderEl      = document.getElementById('worksLoader');
  var caseEl        = document.getElementById('worksCase');
  var tagList       = document.getElementById('worksTagList');
  var worksVideo    = document.getElementById('worksVideo');
  var worksCard     = document.getElementById('worksCard');
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
  var suggestionTimers = [];

  function clearSuggestionTimers() {
    suggestionTimers.forEach(function (id) { clearTimeout(id); });
    suggestionTimers = [];
  }

  /* ============================================
     3D CARD ROTATION
     ============================================ */
  var CARD_MAX_ROT = 12;
  var CARD_LERP = 0.08;
  var cardRotX = 0;
  var cardRotY = 0;
  var isMobile = window.innerWidth < 768;

  window.addEventListener('resize', function () {
    isMobile = window.innerWidth < 768;
  });

  function cardRotationLoop() {
    if (!isMobile && caseEl.classList.contains('is-visible')) {
      var targetRotY = window.__mouseX * CARD_MAX_ROT;
      var targetRotX = window.__mouseY * -CARD_MAX_ROT;

      cardRotX += (targetRotX - cardRotX) * CARD_LERP;
      cardRotY += (targetRotY - cardRotY) * CARD_LERP;

      var tilt = Math.sqrt(cardRotX * cardRotX + cardRotY * cardRotY);
      var lift = (tilt / CARD_MAX_ROT) * 20;

      worksCard.style.transform =
        'rotateX(' + cardRotX.toFixed(2) + 'deg) rotateY(' + cardRotY.toFixed(2) + 'deg) translateZ(' + lift.toFixed(1) + 'px)';
    }

    requestAnimationFrame(cardRotationLoop);
  }

  requestAnimationFrame(cardRotationLoop);

  /* ============================================
     UTILITIES
     ============================================ */

  function splitChars(el, preserveSpaces) {
    var text = el.textContent;
    el.innerHTML = text.split('').map(function (c) {
      if (c === ' ') {
        return preserveSpaces ? ' ' : '<span class="char">&nbsp;</span>';
      }
      return '<span class="char">' + c + '</span>';
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

      // Pause once after the third word
      var hesitationIndex = -1;
      var spaceCount = 0;
      for (var s = 0; s < text.length; s++) {
        if (text[s] === ' ') {
          spaceCount++;
          if (spaceCount === 3) {
            hesitationIndex = s + 1;
            break;
          }
        }
      }

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

          if (i === hesitationIndex) {
            nextDelay = 900 + Math.random() * 300;
          } else {
            nextDelay = speed + Math.random() * 15;
          }

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
    clearSuggestionTimers();
    suggestions.classList.add('is-visible');

    suggestionEls.forEach(function (el, i) {
      suggestionTimers.push(setTimeout(function () {
        el.classList.add('is-visible');
      }, i * 400));
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
    clearSuggestionTimers();
    var items = Array.prototype.slice.call(suggestionEls);
    var visible = items.filter(function (el) {
      return el.classList.contains('is-visible');
    });
    if (visible.length === 0) {
      suggestions.classList.remove('is-visible');
      return Promise.resolve();
    }
    visible.reverse();
    return new Promise(function (resolve) {
      visible.forEach(function (el, i) {
        suggestionTimers.push(setTimeout(function () {
          el.classList.remove('is-visible');
        }, i * 300));
      });
      suggestionTimers.push(setTimeout(function () {
        suggestions.classList.remove('is-visible');
        resolve();
      }, visible.length * 300 + 300));
    });
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

  function showLoader() {
    loaderEl.classList.add('is-visible');
  }

  function hideLoader() {
    loaderEl.classList.remove('is-visible');
  }

  /* ============================================
     SHOW WORK CASE
     ============================================ */

  function prepareCase(work) {
    // Update text content
    worksDesc.textContent = work.desc;
    worksTitle.textContent = work.title;

    // Update tags
    tagList.innerHTML = work.tags.map(function (tag) {
      return '<li>' + tag + '</li>';
    }).join('');

    // Swap media source
    worksVideo.poster = work.image;
    if (work.video) {
      worksVideo.src = work.video;
      worksVideo.load();
    } else {
      worksVideo.removeAttribute('src');
      worksVideo.load();
    }

    // Snap card rotation to current mouse position (no lerp jump on appear)
    cardRotX = window.__mouseY * -CARD_MAX_ROT;
    cardRotY = window.__mouseX * CARD_MAX_ROT;
    var lift = (Math.sqrt(cardRotX * cardRotX + cardRotY * cardRotY) / CARD_MAX_ROT) * 20;
    worksCard.style.transform =
      'rotateX(' + cardRotX.toFixed(2) + 'deg) rotateY(' + cardRotY.toFixed(2) + 'deg) translateZ(' + lift.toFixed(1) + 'px)';

    // Hide text elements before case becomes visible (prevents flash of unsplit text)
    worksTitle.style.visibility = 'hidden';
    worksDesc.style.visibility = 'hidden';
    caseEl.querySelector('.works__tags-label').style.visibility = 'hidden';

    // Show case container
    caseEl.classList.add('is-visible');

    // Return promise gated on canplaythrough with timeout fallback
    if (!work.video) {
      worksVideo.pause();
      return Promise.resolve();
    }
    return new Promise(function (resolve) {
      var resolved = false;
      function done() {
        if (resolved) return;
        resolved = true;
        worksVideo.play().catch(function () {});
        resolve();
      }

      worksVideo.addEventListener('canplaythrough', done, { once: true });
      setTimeout(done, 3000);
    });
  }

  function revealCase() {
    // Restore visibility now that text is about to be split and animated
    worksTitle.style.visibility = '';
    worksDesc.style.visibility = '';
    caseEl.querySelector('.works__tags-label').style.visibility = '';

    if (typeof gsap !== 'undefined') {
      // 1. Title — letter by letter
      var chars = splitChars(worksTitle);
      gsap.from(chars, {
        opacity: 0,
        duration: 0.3,
        stagger: 0.02,
        ease: 'none'
      });

      // 2. Description — letter by letter
      var descChars = splitChars(worksDesc, true);
      gsap.from(descChars, {
        opacity: 0,
        duration: 0.2,
        stagger: 0.008,
        delay: 0.3,
        ease: 'none'
      });

      // 3. Tags label — letter by letter
      var tagsLabel = caseEl.querySelector('.works__tags-label');
      var labelChars = splitChars(tagsLabel, true);
      gsap.from(labelChars, {
        opacity: 0,
        duration: 0.2,
        stagger: 0.01,
        delay: 0.6,
        ease: 'none'
      });
    }

    // 4. Tag items — stagger after label
    var tagItems = tagList.querySelectorAll('li');
    tagItems.forEach(function (li, i) {
      setTimeout(function () {
        li.classList.add('is-visible');
      }, 800 + i * 80);
    });
  }

  function hideCase() {
    caseEl.classList.remove('is-visible');
    var tagItems = tagList.querySelectorAll('li');
    tagItems.forEach(function (li) {
      li.classList.remove('is-visible');
    });

    // Reset card rotation and pause video
    cardRotX = 0;
    cardRotY = 0;
    worksCard.style.transform = 'rotateX(0deg) rotateY(0deg)';
    worksVideo.pause();
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
    hideLoader();
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
      // Update suggestion content for this work
      suggestionEls.forEach(function (el, i) {
        if (work.suggestions && work.suggestions[i]) {
          el.querySelector('span').innerHTML = work.suggestions[i];
        }
      });

      // Step 1: Type search text
      await typeText(work.searchText, searchText);

      // Step 2: Show loader
      showLoader();
      await delay(800);

      // Step 3: Hide loader, show found text
      hideLoader();
      showFound();
      await delay(900);

      // Step 4: Show work case
      await prepareCase(work);
      revealCase();

      isAnimating = false;

      // Step 5: Auto-cycle after 6 seconds
      cycleTimer = setTimeout(function () {
        var nextIndex = (currentWork + 1) % WORKS.length;
        transitionToWork(nextIndex);
      }, 6000);
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

    // 2. Delete text + hide suggestions in reverse (wait for both)
    await Promise.all([hideSuggestionsReverse(), deleteText(searchText)]);
    if (myId !== transitionId) return;

    // 3. Brief pause at empty state
    await delay(200);
    if (myId !== transitionId) return;

    // 4. Update suggestion content for next work
    suggestionEls.forEach(function (el, i) {
      if (work.suggestions && work.suggestions[i]) {
        el.querySelector('span').innerHTML = work.suggestions[i];
      }
    });

    // 5. Type new query (suggestions appear during typing via showSuggestions)
    await typeText(work.searchText, searchText);
    if (myId !== transitionId) return;

    // 6. Fade out old case
    hideCase();

    // 7. Show loader
    showLoader();
    await delay(800);
    if (myId !== transitionId) return;

    // 8. Hide loader, show found text
    hideLoader();
    showFound();
    await delay(900);
    if (myId !== transitionId) return;

    // 9. Show new case
    await prepareCase(work);
    revealCase();

    isAnimating = false;

    // 10. Schedule next auto-cycle
    cycleTimer = setTimeout(function () {
      var nextIndex = (currentWork + 1) % WORKS.length;
      transitionToWork(nextIndex);
    }, 6000);
  }

  /* ============================================
     GO TO SPECIFIC WORK
     ============================================ */

  function goToWork(index) {
    // Cancel any in-progress transition
    transitionId++;
    clearTimeout(cycleTimer);
    cancelAnimationFrame(typeTimer);
    clearSuggestionTimers();
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
    var nextIndex = (currentWork + 1) % WORKS.length;
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
