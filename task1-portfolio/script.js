// ===== Footer year =====
document.getElementById('year').textContent = new Date().getFullYear();

// ===== Mobile nav toggle =====
const navToggle = document.getElementById('navToggle');
const tabs = document.querySelector('.tabbar__tabs');
if (navToggle) {
  navToggle.addEventListener('click', () => {
    const isOpen = tabs.style.display === 'flex';
    tabs.style.display = isOpen ? 'none' : 'flex';
    tabs.style.flexDirection = 'column';
    tabs.style.position = 'absolute';
    tabs.style.top = '56px';
    tabs.style.right = '20px';
    tabs.style.background = '#161b22';
    tabs.style.border = '1px solid #2a3340';
    tabs.style.borderRadius = '10px';
    tabs.style.padding = '10px';
  });
}

// ===== Terminal typing effect =====
const typedLineEl = document.getElementById('typedLine');
const outputEl = document.getElementById('terminalOutput');

const sequence = [
  { type: 'cmd', text: 'whoami' },
  { type: 'out', text: 'yash — full-stack dev, data science student & AI enthusiast' },
  { type: 'cmd', text: 'cat skills.txt' },
  { type: 'out', text: 'JavaScript · HTML5 · CSS3 · Node.js · TensorFlow.js · OpenCV.js · MySQL' },
  { type: 'cmd', text: 'npm run build-future' },
  { type: 'okout', text: '✓ build succeeded. ready for opportunities.' }
];

let seqIndex = 0;
let charIndex = 0;
let typing = true;

function typeStep() {
  if (!typedLineEl) return;

  if (seqIndex >= sequence.length) {
    // restart loop after a pause
    setTimeout(() => {
      outputEl.innerHTML = '';
      seqIndex = 0;
      charIndex = 0;
      typing = true;
      typedLineEl.textContent = '';
      typeStep();
    }, 2200);
    return;
  }

  const current = sequence[seqIndex];

  if (current.type === 'cmd') {
    if (charIndex < current.text.length) {
      typedLineEl.textContent += current.text.charAt(charIndex);
      charIndex++;
      setTimeout(typeStep, 45 + Math.random() * 40);
    } else {
      // command fully typed, commit it as a static output line, clear input
      const p = document.createElement('p');
      p.className = 'line';
      p.innerHTML = `<span class="prompt">yash@dev</span><span class="path">~</span><span class="dollar">$</span> ${current.text}`;
      outputEl.appendChild(p);
      typedLineEl.textContent = '';
      charIndex = 0;
      seqIndex++;
      setTimeout(typeStep, 280);
    }
  } else {
    const p = document.createElement('p');
    p.className = current.type === 'okout' ? 'ok' : '';
    p.textContent = current.text;
    outputEl.appendChild(p);
    seqIndex++;
    setTimeout(typeStep, 500);
  }
}

// respect reduced motion: show static final state instead of animating
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (prefersReducedMotion) {
  if (typedLineEl) typedLineEl.textContent = 'npm run build-future';
  sequence.forEach(item => {
    const p = document.createElement('p');
    if (item.type === 'cmd') {
      p.className = 'line';
      p.innerHTML = `<span class="prompt">yash@dev</span><span class="path">~</span><span class="dollar">$</span> ${item.text}`;
    } else {
      p.className = item.type === 'okout' ? 'ok' : '';
      p.textContent = item.text;
    }
    outputEl.appendChild(p);
  });
} else {
  typeStep();
}

// ===== Smooth-scroll active tab highlight (simple scrollspy) =====
const sections = document.querySelectorAll('section[id]');
const tabLinks = document.querySelectorAll('.tab');

window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(sec => {
    const rect = sec.getBoundingClientRect();
    if (rect.top <= 120 && rect.bottom >= 120) {
      current = sec.id;
    }
  });
  tabLinks.forEach(tab => {
    tab.style.color = '';
    if (tab.getAttribute('href') === `#${current}`) {
      tab.style.color = '#58a6ff';
    }
  });
});
