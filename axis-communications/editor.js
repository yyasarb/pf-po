/* ============================================
   VISUAL PAGE EDITOR
   Loads only when URL contains ?edit
   ============================================ */
(function () {
  'use strict';

  var STORAGE_KEY = 'page-editor-' + window.location.pathname;
  var workingConfig = JSON.parse(JSON.stringify(window.PAGE_CONFIG || {}));

  // Restore from localStorage if available
  var saved = localStorage.getItem(STORAGE_KEY);
  if (saved) {
    try {
      var parsed = JSON.parse(saved);
      mergeDeep(workingConfig, parsed);
      applyWorkingConfig();
    } catch (e) { /* ignore corrupt data */ }
  }

  // --- Deep merge helper ---
  function mergeDeep(target, source) {
    for (var key in source) {
      if (source[key] && typeof source[key] === 'object' && !Array.isArray(source[key])) {
        if (!target[key]) target[key] = {};
        mergeDeep(target[key], source[key]);
      } else {
        target[key] = source[key];
      }
    }
  }

  // --- Save to localStorage ---
  function persist() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(workingConfig));
  }

  // --- Re-apply working config to DOM ---
  function applyWorkingConfig() {
    var cfg = workingConfig;

    Object.keys(cfg.text).forEach(function (key) {
      var el = document.querySelector('[data-config="' + key + '"]');
      if (el && !el.hasAttribute('contenteditable')) el.innerHTML = cfg.text[key];
      var dup = document.querySelector('[data-config-title-dup="' + key + '"]');
      if (dup) dup.innerHTML = cfg.text[key];
    });

    var logoImg = document.querySelector('[data-config-logo]');
    if (logoImg && cfg.company) {
      logoImg.src = cfg.company.logo;
      logoImg.alt = cfg.company.name || '';
    }

    if (cfg.greeting) {
      var gb = document.querySelector('[data-config="greeting-before"]');
      var ga = document.querySelector('[data-config="greeting-after"]');
      if (gb) gb.textContent = cfg.greeting[0];
      if (ga) ga.textContent = cfg.greeting[1];
    }

    if (cfg.video && cfg.video.vimeoId) {
      var iframe = document.querySelector('.video-section__player iframe');
      if (iframe) {
        var hash = cfg.video.vimeoHash ? '?h=' + cfg.video.vimeoHash + '&' : '?';
        iframe.src = 'https://player.vimeo.com/video/' + cfg.video.vimeoId + hash + 'title=0&byline=0&portrait=0&autoplay=1&muted=1&controls=0';
      }
    }

    Object.keys(cfg.sections).forEach(function (key) {
      var sections = document.querySelectorAll('[data-section="' + key + '"]');
      sections.forEach(function (s) {
        s.style.display = cfg.sections[key] ? '' : 'none';
      });
    });

    if (typeof ScrollTrigger !== 'undefined') {
      setTimeout(function () { ScrollTrigger.refresh(); }, 150);
    }
  }

  // --- Inject editor styles ---
  var style = document.createElement('style');
  style.textContent =
    '#editor-banner{position:fixed;top:0;left:0;right:0;z-index:10000;background:#2563eb;color:#fff;text-align:center;padding:6px 0;font:600 13px/1 system-ui,sans-serif;letter-spacing:2px;pointer-events:none}' +
    '#editor-panel{position:fixed;top:40px;right:16px;width:300px;max-height:calc(100vh - 56px);overflow-y:auto;z-index:9999;background:#1e1e2e;color:#cdd6f4;border-radius:12px;padding:20px;font:13px/1.5 system-ui,sans-serif;box-shadow:0 8px 32px rgba(0,0,0,0.4)}' +
    '#editor-panel h3{margin:0 0 12px;font-size:14px;color:#89b4fa;border-bottom:1px solid #313244;padding-bottom:8px}' +
    '#editor-panel label{display:block;margin:8px 0 4px;font-size:12px;color:#a6adc8}' +
    '#editor-panel input[type="text"],#editor-panel textarea{width:100%;box-sizing:border-box;padding:6px 8px;border:1px solid #45475a;border-radius:6px;background:#313244;color:#cdd6f4;font-size:13px;outline:none;font-family:system-ui,sans-serif}' +
    '#editor-panel textarea{resize:vertical;min-height:48px;line-height:1.4}' +
    '#editor-panel input[type="text"]:focus,#editor-panel textarea:focus{border-color:#89b4fa}' +
    '.editor-section-heading{font-size:12px;color:#89b4fa;margin:12px 0 6px;padding-top:8px;border-top:1px solid #313244;font-weight:600}' +
    '.editor-skill-item{background:#313244;border-radius:6px;padding:8px;margin-bottom:6px}' +
    '.editor-skill-item label{margin:2px 0!important}' +
    '.editor-skill-row{display:flex;gap:6px}' +
    '.editor-skill-row input{flex:1}' +
    '.editor-btn-add-skill{background:#313244;color:#89b4fa;font-size:12px;padding:6px!important;margin-top:4px!important}' +
    '.editor-btn-remove-skill{background:none;border:none!important;color:#f38ba8;font-size:16px;cursor:pointer;padding:0 4px!important;margin:0!important;width:auto!important;line-height:1}' +
    '.editor-toggle{display:flex;align-items:center;justify-content:space-between;padding:4px 0}' +
    '.editor-toggle span{font-size:12px;color:#a6adc8}' +
    '.editor-switch{position:relative;width:36px;height:20px;cursor:pointer}' +
    '.editor-switch input{opacity:0;width:0;height:0;position:absolute}' +
    '.editor-switch .slider{position:absolute;inset:0;background:#45475a;border-radius:20px;transition:.2s}' +
    '.editor-switch .slider:before{content:"";position:absolute;height:14px;width:14px;left:3px;bottom:3px;background:#cdd6f4;border-radius:50%;transition:.2s}' +
    '.editor-switch input:checked+.slider{background:#89b4fa}' +
    '.editor-switch input:checked+.slider:before{transform:translateX(16px)}' +
    '.editor-section{margin-bottom:16px}' +
    '#editor-panel button{display:block;width:100%;padding:8px;border:none;border-radius:6px;font:600 13px system-ui,sans-serif;cursor:pointer;margin-top:8px}' +
    '.editor-btn-export{background:#a6e3a1;color:#1e1e2e}' +
    '.editor-btn-export:hover{background:#94e2d5}' +
    '.editor-btn-reset{background:#45475a;color:#cdd6f4}' +
    '.editor-btn-reset:hover{background:#585b70}' +
    '.editor-btn-collapse{background:none;border:none!important;color:#89b4fa;font-size:11px;margin:0!important;padding:2px!important;width:auto!important;cursor:pointer;text-align:right}' +
    '[data-config].editor-hoverable{outline:2px dashed transparent;outline-offset:2px;cursor:pointer;transition:outline-color .15s}' +
    '[data-config].editor-hoverable:hover{outline-color:#2563eb}' +
    '[data-config][contenteditable="true"]{outline:2px solid #2563eb!important;outline-offset:2px;background:rgba(37,99,235,0.05);min-height:1em}' +
    '[data-section].editor-section-off{opacity:0.3;pointer-events:none}' +
    /* Edit mode: force video player visible at full scale */
    'body.editor-active .video-section__player{transform:none!important;border-radius:16px!important;opacity:1!important}' +
    'body.editor-active .video-section__heading{opacity:1!important;transform:none!important}' +
    'body.editor-active .video-section__sub{opacity:1!important;transform:none!important}' +
    'body.editor-active .video-section__text{opacity:1!important;transform:none!important}' +
    'body.editor-active .video-outro{opacity:1!important;transform:none!important;position:relative!important;top:auto!important}' +
    'body.editor-active .video-play-overlay{display:none!important}' +
    /* Edit mode: force skills items fully visible */
    'body.editor-active .skills-item__num{opacity:1!important}' +
    'body.editor-active .skills-item__desc{opacity:1!important}' +
    'body.editor-active .skills-box{margin:0!important;border-radius:0!important}' +
    /* Edit mode: force char reveals visible */
    'body.editor-active .char{opacity:1!important}';
  document.head.appendChild(style);

  // Add editor-active class to body
  document.body.classList.add('editor-active');

  // Kill GSAP pinning and scroll animations so sections flow naturally in edit mode
  if (typeof ScrollTrigger !== 'undefined') {
    ScrollTrigger.getAll().forEach(function (st) {
      if (st.pin) st.kill(true);
    });
    ScrollTrigger.refresh();
  }

  // --- Edit mode banner ---
  var banner = document.createElement('div');
  banner.id = 'editor-banner';
  banner.textContent = 'EDIT MODE';
  document.body.appendChild(banner);

  // --- Skill item HTML builder ---
  function buildSkillItemHTML(index, skill) {
    return '<div class="editor-skill-item" data-skill-index="' + index + '">' +
      '<div class="editor-skill-row">' +
      '<input type="text" data-skill-field="num" value="' + escAttr(skill.num) + '" placeholder="001" style="max-width:50px">' +
      '<input type="text" data-skill-field="word" value="' + escAttr(skill.word) + '" placeholder="Skill name">' +
      '<button class="editor-btn-remove-skill" data-skill-remove="' + index + '">&times;</button>' +
      '</div>' +
      '<textarea data-skill-field="desc" rows="2" style="margin-top:4px">' + escAttr(skill.desc) + '</textarea>' +
      '</div>';
  }

  // --- Rebuild skills DOM from working config ---
  function rebuildSkillsDOM() {
    var skillsList = document.querySelector('[data-config-skills]');
    if (!skillsList) return;
    skillsList.innerHTML = '';
    workingConfig.skills.forEach(function (skill) {
      var item = document.createElement('div');
      item.className = 'skills-item';
      item.innerHTML =
        '<span class="skills-item__num">(' + skill.num + ')</span>' +
        '<span class="skills-item__word">' + skill.word + '</span>' +
        '<span class="skills-item__desc">' + skill.desc + '</span>';
      skillsList.appendChild(item);
    });
  }

  // --- Rebuild skills editor list ---
  function rebuildSkillsEditor() {
    var container = document.getElementById('ed-skills-list');
    if (!container) return;
    container.innerHTML = '';
    workingConfig.skills.forEach(function (skill, i) {
      container.innerHTML += buildSkillItemHTML(i, skill);
    });
    bindSkillInputs();
  }

  // --- Bind skill input events ---
  function bindSkillInputs() {
    var items = document.querySelectorAll('#ed-skills-list .editor-skill-item');
    items.forEach(function (item) {
      var idx = parseInt(item.getAttribute('data-skill-index'), 10);
      var fields = item.querySelectorAll('[data-skill-field]');
      fields.forEach(function (field) {
        field.addEventListener('input', function () {
          var key = field.getAttribute('data-skill-field');
          workingConfig.skills[idx][key] = field.value;
          rebuildSkillsDOM();
          persist();
        });
      });
      var removeBtn = item.querySelector('[data-skill-remove]');
      if (removeBtn) {
        removeBtn.addEventListener('click', function () {
          workingConfig.skills.splice(idx, 1);
          rebuildSkillsDOM();
          rebuildSkillsEditor();
          persist();
        });
      }
    });
  }

  // --- Build sidebar panel ---
  var panel = document.createElement('div');
  panel.id = 'editor-panel';

  var html = '<h3>Page Editor</h3>';

  // Company
  html += '<div class="editor-section">';
  html += '<label>Company Name</label>';
  html += '<input type="text" id="ed-company-name" value="' + escAttr(workingConfig.company.name) + '">';
  html += '<label>Company Logo URL</label>';
  html += '<input type="text" id="ed-company-logo" value="' + escAttr(workingConfig.company.logo) + '">';
  html += '</div>';

  // Greeting
  html += '<div class="editor-section">';
  html += '<label>Greeting (before logo)</label>';
  html += '<input type="text" id="ed-greeting-0" value="' + escAttr(workingConfig.greeting[0]) + '">';
  html += '<label>Greeting (after logo)</label>';
  html += '<input type="text" id="ed-greeting-1" value="' + escAttr(workingConfig.greeting[1]) + '">';
  html += '</div>';

  // Video
  html += '<div class="editor-section">';
  html += '<div class="editor-section-heading">Video</div>';
  html += '<label>Vimeo URL or ID</label>';
  html += '<input type="text" id="ed-video" value="' + escAttr(workingConfig.video.vimeoId) + '" placeholder="e.g. 1140568272 or full URL">';
  html += '<label>Heading</label>';
  html += '<textarea id="ed-video-heading" rows="2">' + escAttr(workingConfig.text['video-heading']) + '</textarea>';
  html += '<label>Subtitle</label>';
  html += '<input type="text" id="ed-video-sub" value="' + escAttr(workingConfig.text['video-sub']) + '">';
  html += '<label>Text after video</label>';
  html += '<textarea id="ed-video-text1" rows="2">' + escAttr(workingConfig.text['video-text1']) + '</textarea>';
  html += '<label>Outro</label>';
  html += '<input type="text" id="ed-video-outro" value="' + escAttr(workingConfig.text['video-outro']) + '">';
  html += '</div>';

  // Skills
  html += '<div class="editor-section" id="ed-skills-section">';
  html += '<div class="editor-section-heading">Skills</div>';
  html += '<div id="ed-skills-list">';
  workingConfig.skills.forEach(function (skill, i) {
    html += buildSkillItemHTML(i, skill);
  });
  html += '</div>';
  html += '<button class="editor-btn-add-skill" id="ed-add-skill">+ Add Skill</button>';
  html += '<label>Skills outro</label>';
  html += '<textarea id="ed-skills-outro" rows="2">' + escAttr(workingConfig.text['skills-outro']) + '</textarea>';
  html += '</div>';

  // Section toggles
  html += '<div class="editor-section">';
  html += '<label>Sections</label>';
  var sectionLabels = {
    hero: 'Hero', whyAxis: 'Why Axis', clients: 'Clients',
    video: 'Video', skills: 'Skills', proof: 'Framework', closing: 'Closing'
  };
  Object.keys(workingConfig.sections).forEach(function (key) {
    var checked = workingConfig.sections[key] ? ' checked' : '';
    html += '<div class="editor-toggle"><span>' + sectionLabels[key] + '</span>' +
      '<label class="editor-switch"><input type="checkbox" data-section-toggle="' + key + '"' + checked + '>' +
      '<span class="slider"></span></label></div>';
  });
  html += '</div>';

  // Buttons
  html += '<button class="editor-btn-export" id="ed-export">Export Config</button>';
  html += '<button class="editor-btn-reset" id="ed-reset">Reset Changes</button>';

  panel.innerHTML = html;
  document.body.appendChild(panel);

  // --- Make text elements editable ---
  var editables = document.querySelectorAll('[data-config]');
  editables.forEach(function (el) {
    el.classList.add('editor-hoverable');

    el.addEventListener('click', function (e) {
      if (el.getAttribute('contenteditable') === 'true') return;
      e.preventDefault();
      e.stopPropagation();
      el.setAttribute('contenteditable', 'true');
      el.focus();
    });

    el.addEventListener('blur', function () {
      el.removeAttribute('contenteditable');
      var key = el.getAttribute('data-config');
      if (key && workingConfig.text[key] !== undefined) {
        workingConfig.text[key] = el.innerHTML;
        // Sync duplicate title elements
        var dup = document.querySelector('[data-config-title-dup="' + key + '"]');
        if (dup) dup.innerHTML = el.innerHTML;
        persist();
      }
    });

    el.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') {
        el.blur();
      }
    });
  });

  // --- Panel input handlers ---
  bindInput('ed-company-name', function (val) {
    workingConfig.company.name = val;
    var logo = document.querySelector('[data-config-logo]');
    if (logo) logo.alt = val;
    persist();
  });

  bindInput('ed-company-logo', function (val) {
    workingConfig.company.logo = val;
    var logo = document.querySelector('[data-config-logo]');
    if (logo) logo.src = val;
    persist();
  });

  bindInput('ed-greeting-0', function (val) {
    workingConfig.greeting[0] = val;
    var el = document.querySelector('[data-config="greeting-before"]');
    if (el) el.textContent = val;
    persist();
  });

  bindInput('ed-greeting-1', function (val) {
    workingConfig.greeting[1] = val;
    var el = document.querySelector('[data-config="greeting-after"]');
    if (el) el.textContent = val;
    persist();
  });

  bindInput('ed-video', function (val) {
    // Extract Vimeo ID from URL or use raw ID
    var match = val.match(/vimeo\.com\/(?:video\/)?(\d+)/);
    var id = match ? match[1] : val.replace(/\D/g, '');
    var hashMatch = val.match(/[?&]h=([a-f0-9]+)/);
    workingConfig.video.vimeoId = id;
    if (hashMatch) workingConfig.video.vimeoHash = hashMatch[1];
    var iframe = document.querySelector('.video-section__player iframe');
    if (iframe && id) {
      var hash = workingConfig.video.vimeoHash ? '?h=' + workingConfig.video.vimeoHash + '&' : '?';
      iframe.src = 'https://player.vimeo.com/video/' + id + hash + 'title=0&byline=0&portrait=0&autoplay=1&muted=1&controls=0';
    }
    persist();
  });

  // Video text fields
  bindTextarea('ed-video-heading', 'video-heading');
  bindTextarea('ed-video-sub', 'video-sub');
  bindTextarea('ed-video-text1', 'video-text1');
  bindTextarea('ed-video-outro', 'video-outro');

  // Skills outro
  bindTextarea('ed-skills-outro', 'skills-outro');

  // Bind skill inputs and add button
  bindSkillInputs();
  var addSkillBtn = document.getElementById('ed-add-skill');
  if (addSkillBtn) {
    addSkillBtn.addEventListener('click', function () {
      var nextNum = String(workingConfig.skills.length + 1).padStart(3, '0');
      workingConfig.skills.push({ num: nextNum, word: 'New Skill', desc: 'Description...' });
      rebuildSkillsDOM();
      rebuildSkillsEditor();
      persist();
    });
  }

  // --- Section toggles ---
  var toggles = panel.querySelectorAll('[data-section-toggle]');
  toggles.forEach(function (toggle) {
    toggle.addEventListener('change', function () {
      var key = toggle.getAttribute('data-section-toggle');
      workingConfig.sections[key] = toggle.checked;
      var sections = document.querySelectorAll('[data-section="' + key + '"]');
      sections.forEach(function (s) {
        if (toggle.checked) {
          s.style.display = '';
          s.classList.remove('editor-section-off');
        } else {
          s.style.display = 'none';
          s.classList.add('editor-section-off');
        }
      });
      if (typeof ScrollTrigger !== 'undefined') {
        setTimeout(function () { ScrollTrigger.refresh(); }, 150);
      }
      persist();
    });
  });

  // --- Export config ---
  document.getElementById('ed-export').addEventListener('click', function () {
    var output = 'var PAGE_CONFIG = ' + JSON.stringify(workingConfig, null, 2) + ';\n';
    var blob = new Blob([output], { type: 'application/javascript' });
    var url = URL.createObjectURL(blob);
    var a = document.createElement('a');
    a.href = url;
    a.download = 'page-config.js';
    a.click();
    URL.revokeObjectURL(url);
  });

  // --- Reset ---
  document.getElementById('ed-reset').addEventListener('click', function () {
    if (!confirm('Reset all changes? This clears your edits and reloads the page.')) return;
    localStorage.removeItem(STORAGE_KEY);
    window.location.reload();
  });

  // --- Helpers ---
  function escAttr(str) {
    return String(str).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }

  function bindInput(id, handler) {
    var el = document.getElementById(id);
    if (!el) return;
    el.addEventListener('input', function () { handler(el.value); });
  }

  function bindTextarea(id, configKey) {
    var el = document.getElementById(id);
    if (!el) return;
    el.addEventListener('input', function () {
      workingConfig.text[configKey] = el.value;
      var target = document.querySelector('[data-config="' + configKey + '"]');
      if (target) target.innerHTML = el.value;
      persist();
    });
  }
})();
