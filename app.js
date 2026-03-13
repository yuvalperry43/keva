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

// Font size — scales everything via html root font size
var sizes = [8, 10, 12, 14, 16, 18, 21, 24, 28];
var idx = parseInt(localStorage.getItem('fontSize') || '4');
document.documentElement.style.fontSize = sizes[idx] + 'px';

document.getElementById('font-up').addEventListener('click', function () {
  if (idx < sizes.length - 1) {
    idx++;
    document.documentElement.style.fontSize = sizes[idx] + 'px';
    localStorage.setItem('fontSize', idx);
  }
});

document.getElementById('font-down').addEventListener('click', function () {
  if (idx > 0) {
    idx--;
    document.documentElement.style.fontSize = sizes[idx] + 'px';
    localStorage.setItem('fontSize', idx);
  }
});
