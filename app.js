// Settings popover (theme + font size)
var savedDark = localStorage.getItem('darkMode');
var prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
var isDarkMode = savedDark !== null ? savedDark === '1' : prefersDark;
document.documentElement.classList.toggle('dark', isDarkMode);
(function() { var m = document.getElementById('theme-color-meta'); if (m) m.setAttribute('content', isDarkMode ? '#111110' : '#faf9f7'); })();

function sunIcon() { return '<svg width="16" height="16" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.7"><circle cx="10" cy="10" r="4"/><line x1="10" y1="2" x2="10" y2="0"/><line x1="10" y1="18" x2="10" y2="20"/><line x1="2" y1="10" x2="0" y2="10"/><line x1="18" y1="10" x2="20" y2="10"/><line x1="4.2" y1="4.2" x2="2.8" y2="2.8"/><line x1="15.8" y1="15.8" x2="17.2" y2="17.2"/><line x1="15.8" y1="4.2" x2="17.2" y2="2.8"/><line x1="4.2" y1="15.8" x2="2.8" y2="17.2"/></svg>'; }
function moonIcon() { return '<svg width="16" height="16" viewBox="0 0 20 20" fill="currentColor"><path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"/></svg>'; }

// Dark mode toggle — next to hamburger
var darkToggle = document.createElement('button');
darkToggle.className = 'theme-btn dark-toggle';
darkToggle.setAttribute('aria-label', 'החלף ערכת צבעים');

function updateThemeColor() {
  var meta = document.getElementById('theme-color-meta');
  if (meta) meta.setAttribute('content', document.documentElement.classList.contains('dark') ? '#111110' : '#faf9f7');
}

function updateDarkToggle() {
  var isDark = document.documentElement.classList.contains('dark');
  darkToggle.innerHTML = isDark ? sunIcon() : moonIcon();
  updateThemeColor();
}
updateDarkToggle();

darkToggle.addEventListener('click', function() {
  var isDark = document.documentElement.classList.toggle('dark');
  localStorage.setItem('darkMode', isDark ? '1' : '0');
  updateDarkToggle();
  if (sidebarThemeBtn) sidebarThemeBtn.innerHTML = document.documentElement.classList.contains('dark') ? sunIcon() : moonIcon();
});

// Font size popover — on the left
var fontPopover = document.createElement('div');
fontPopover.className = 'font-popover';
fontPopover.innerHTML = '<button id="fp-down">−</button><button id="fp-up">+</button>';

var fontToggleBtn = document.createElement('button');
fontToggleBtn.className = 'font-toggle-btn';
fontToggleBtn.textContent = 'Aa';

var header = document.querySelector('.mobile-header');
if (header) {
  header.appendChild(fontPopover);
  header.appendChild(fontToggleBtn);
  header.appendChild(darkToggle);
}

fontToggleBtn.addEventListener('click', function(e) {
  e.stopPropagation();
  fontPopover.classList.toggle('open');
});
document.addEventListener('click', function(e) {
  if (!fontPopover.contains(e.target) && e.target !== fontToggleBtn) {
    fontPopover.classList.remove('open');
  }
});

// Sidebar theme button (desktop)
var sidebarLogo = document.querySelector('.sidebar-logo');
if (sidebarLogo) {
  var sidebarThemeBtn = document.createElement('button');
  sidebarThemeBtn.className = 'theme-btn theme-btn-sidebar';
  sidebarThemeBtn.addEventListener('click', function() {
    var isDark = document.documentElement.classList.toggle('dark');
    localStorage.setItem('darkMode', isDark ? '1' : '0');
    updateDarkToggle();
    sidebarThemeBtn.innerHTML = document.documentElement.classList.contains('dark') ? sunIcon() : moonIcon();
  });
  sidebarThemeBtn.innerHTML = document.documentElement.classList.contains('dark') ? sunIcon() : moonIcon();
  sidebarLogo.appendChild(sidebarThemeBtn);
}

// Sidebar toggle
var btn = document.querySelector('.menu-toggle');

var iconHamburger = '<rect x="2" y="4" width="16" height="2" rx="1"/><rect x="2" y="9" width="16" height="2" rx="1"/><rect x="2" y="14" width="16" height="2" rx="1"/>';
var iconClose = '<line x1="4" y1="4" x2="16" y2="16" stroke="currentColor" stroke-width="2" stroke-linecap="round"/><line x1="16" y1="4" x2="4" y2="16" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>';

function setIcon(open) {
  var svg = btn.querySelector('.menu-icon');
  svg.setAttribute('fill', open ? 'none' : 'currentColor');
  svg.innerHTML = open ? iconClose : iconHamburger;
}

function closeSidebar() {
  document.body.classList.remove('sidebar-open');
  setIcon(false);
}

btn.addEventListener('click', function () {
  var isOpen = document.body.classList.toggle('sidebar-open');
  setIcon(isOpen);
});

document.addEventListener('click', function (e) {
  if (!document.body.classList.contains('sidebar-open')) return;
  if (!e.target.closest('.sidebar') && !e.target.closest('.menu-toggle')) closeSidebar();
});

var sidebar = document.querySelector('.sidebar');

document.querySelectorAll('.sidebar .nav-item').forEach(function(link) {
  link.addEventListener('click', function(e) {
    if (!document.body.classList.contains('sidebar-open')) return;
    var href = link.getAttribute('href');
    if (!href) return;
    e.preventDefault();
    closeSidebar();
    function onDone() {
      sidebar.removeEventListener('transitionend', onDone);
      window.location.href = href;
    }
    sidebar.addEventListener('transitionend', onDone);
  });
});

// Collapsible sub-items under parent nav items
document.querySelectorAll('.nav-item:not(.nav-sub)').forEach(function(item) {
  var subs = [];
  var next = item.nextElementSibling;
  while (next && next.classList.contains('nav-sub')) {
    subs.push(next);
    next = next.nextElementSibling;
  }
  if (subs.length === 0) return;

  item.classList.add('has-subs');

  var anyActive = item.classList.contains('active') || subs.some(function(s) { return s.classList.contains('active'); });
  if (!anyActive) {
    item.classList.add('subs-collapsed');
    subs.forEach(function(s) { s.style.display = 'none'; });
  }

  var arrow = document.createElement('span');
  arrow.className = 'nav-toggle-arrow';
  arrow.textContent = '›';
  item.appendChild(arrow);

  arrow.addEventListener('click', function(e) {
    e.preventDefault();
    e.stopPropagation();
    var collapsed = item.classList.toggle('subs-collapsed');
    subs.forEach(function(s) { s.style.display = collapsed ? 'none' : ''; });
  });
});

// Info tips — bottom sheet
var sheet = document.querySelector('.tip-sheet');
var sheetContent = document.querySelector('.tip-sheet-content');

document.querySelectorAll('.info-tip').forEach(function (tip) {
  tip.addEventListener('click', function (e) {
    e.stopPropagation();
    sheetContent.textContent = tip.dataset.tip;
    sheet.classList.add('open');
  });
});

sheet.addEventListener('click', function (e) {
  if (!e.target.closest('.tip-sheet-content')) sheet.classList.remove('open');
});

// Checklist
var checkboxes = document.querySelectorAll('.checklist-item input[type="checkbox"]');
if (checkboxes.length) {
  var saved = JSON.parse(localStorage.getItem('checklist') || '{}');
  checkboxes.forEach(function(cb) {
    if (saved[cb.dataset.id]) { cb.checked = true; cb.closest('.checklist-item').classList.add('done'); }
    cb.addEventListener('change', function() {
      cb.closest('.checklist-item').classList.toggle('done', cb.checked);
      saved[cb.dataset.id] = cb.checked;
      localStorage.setItem('checklist', JSON.stringify(saved));
    });
  });

  var shareBtn = document.getElementById('share-btn');
  if (shareBtn) {
    shareBtn.addEventListener('click', function() {
      var lines = ['כלכלה בקבע - צ\'ק ליסט', ''];
      document.querySelectorAll('.checklist-group').forEach(function(group) {
        lines.push(group.querySelector('.checklist-group-title').textContent);
        group.querySelectorAll('.checklist-item').forEach(function(item) {
          var cb = item.querySelector('input');
          var span = item.querySelector('span');
          var text = Array.from(span.childNodes).map(function(n) {
            return n.nodeName === 'A' ? n.textContent + ' (' + n.href + ')' : n.textContent;
          }).join('').trim();
          lines.push((cb.checked ? '[x] ' : '[ ] ') + text);
        });
        lines.push('');
      });
      var text = lines.join('\n');
      if (navigator.share) {
        navigator.share({ title: 'כלכלה בקבע - צ\'ק ליסט', text: text });
      } else {
        navigator.clipboard.writeText(text).then(function() {
          shareBtn.textContent = 'הועתק!';
          setTimeout(function() { shareBtn.textContent = 'שתף / העתק'; }, 2000);
        });
      }
    });
  }
}

// Font size — scales everything via html root font size
var sizes = [8, 10, 12, 14, 16, 18, 21, 24, 28];
var idx = parseInt(localStorage.getItem('fontSize') || '4');
document.documentElement.style.fontSize = sizes[idx] + 'px';

function changeFontSize(delta) {
  idx = Math.max(0, Math.min(sizes.length - 1, idx + delta));
  document.documentElement.style.fontSize = sizes[idx] + 'px';
  localStorage.setItem('fontSize', idx);
}

var fpUp = document.getElementById('fp-up');
if (fpUp) fpUp.addEventListener('click', function () { changeFontSize(1); });

// Contact form — AJAX submit + clear
function showToast(msg) {
  var t = document.createElement('div');
  t.textContent = msg;
  t.style.cssText = 'position:fixed;bottom:2rem;left:50%;transform:translateX(-50%);background:#1a1a18;color:#fff;padding:0.6rem 1.25rem;border-radius:8px;font-size:0.875rem;z-index:9999;opacity:1;transition:opacity 0.4s';
  document.body.appendChild(t);
  setTimeout(function() { t.style.opacity = '0'; setTimeout(function() { t.remove(); }, 400); }, 2500);
}

var contactForm = document.querySelector('.contact-form');
if (contactForm) {
  contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    fetch(contactForm.action, {
      method: 'POST',
      body: new FormData(contactForm),
      headers: { 'Accept': 'application/json' }
    }).then(function(res) {
      if (res.ok) {
        contactForm.reset();
        showToast('תודה על הפידבק!');
      } else {
        showToast('שגיאה, נסו שוב');
      }
    }).catch(function() {
      showToast('שגיאה, נסו שוב');
    });
  });
}

var fpDown = document.getElementById('fp-down');
if (fpDown) fpDown.addEventListener('click', function () { changeFontSize(-1); });
