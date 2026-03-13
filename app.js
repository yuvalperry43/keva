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
