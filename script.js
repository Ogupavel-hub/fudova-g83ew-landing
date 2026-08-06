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
  let frameScheduled = false;

  const updateFighterFlight = () => {
    fighters.forEach((fighter) => {
      const card = fighter.closest('.target');
      const rect = card.getBoundingClientRect();
      const progress = Math.max(-1, Math.min(1, (window.innerHeight / 2 - rect.top) / window.innerHeight));
      fighter.style.setProperty('--flight-y', `${progress * 34}%`);
    });
    frameScheduled = false;
  };

  window.addEventListener('scroll', () => {
    if (!frameScheduled) {
      frameScheduled = true;
      requestAnimationFrame(updateFighterFlight);
    }
  }, { passive: true });

  updateFighterFlight();
}
