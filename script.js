const form = document.querySelector('#lead-form');
const status = document.querySelector('.form-status');

form.addEventListener('submit', (event) => {
  event.preventDefault();
  const endpoint = form.dataset.sheetEndpoint;
  const data = Object.fromEntries(new FormData(form).entries());
  const submitButton = form.querySelector('[type="submit"]');

  if (!endpoint) {
    status.textContent = 'Форма временно настраивается. Попробуйте позже.';
    return;
  }

  submitButton.disabled = true;
  status.textContent = 'Отправляем заявку…';

  fetch(endpoint, {
    method: 'POST',
    mode: 'no-cors',
    headers: { 'Content-Type': 'text/plain;charset=utf-8' },
    body: JSON.stringify({ ...data, source: window.location.href }),
  })
    .then(() => {
      status.textContent = `${data.name ? `${data.name}, ` : ''}заявка принята. Скоро свяжемся.`;
      form.reset();
    })
    .catch(() => {
      status.textContent = 'Не удалось отправить заявку. Попробуйте ещё раз.';
    })
    .finally(() => {
      submitButton.disabled = false;
    });
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
