document.getElementById('year').textContent = new Date().getFullYear();

const form = document.getElementById('signupForm');
const status = document.getElementById('signupStatus');

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const email = form.querySelector('input').value.trim();

  if (!email) {
    status.textContent = 'Enter a work email to continue.';
    return;
  }

  status.textContent = `Board on its way to ${email}. Check your inbox!`;
  form.reset();
});

// subtle parallax tilt on the hero cards (purely decorative, ignored on touch / reduced motion)
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const cards = document.querySelectorAll('.card');

const baseRotations = ['-6deg', '3deg', '-2deg'];

if (!prefersReducedMotion && window.matchMedia('(hover: hover)').matches) {
  document.querySelector('.hero__stack')?.addEventListener('mousemove', (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const relX = (e.clientX - rect.left) / rect.width - 0.5;
    const relY = (e.clientY - rect.top) / rect.height - 0.5;

    cards.forEach((card, i) => {
      const depth = (i + 1) * 4;
      card.style.transform = `rotate(${baseRotations[i]}) translate(${relX * depth}px, ${relY * depth}px)`;
    });
  });
}
