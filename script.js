const form = document.querySelector('#lead-form');
const status = document.querySelector('.form-status');

form.addEventListener('submit', (event) => {
  event.preventDefault();
  const name = new FormData(form).get('name').trim();
  status.textContent = `${name ? `${name}, ` : ''}заявка принята. Скоро свяжемся.`;
  form.reset();
});

if (!matchMedia('(prefers-reduced-motion: reduce)').matches) {
  const fighters = document.querySelectorAll('.slide-fighter');
  let scheduled = false;
  const updateFighters = () => {
    fighters.forEach((fighter) => {
      const rect = fighter.closest('.target').getBoundingClientRect();
      const progress = Math.max(-1, Math.min(1, (window.innerHeight / 2 - rect.top) / window.innerHeight));
      fighter.style.setProperty('--flight-y', `${progress * 34}%`);
    });
    scheduled = false;
  };
  window.addEventListener('scroll', () => {
    if (!scheduled) { scheduled = true; requestAnimationFrame(updateFighters); }
  }, { passive: true });
  updateFighters();
}
