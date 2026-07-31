const form = document.querySelector('#lead-form');
const status = document.querySelector('.form-status');

form.addEventListener('submit', (event) => {
  event.preventDefault();
  const name = new FormData(form).get('name').trim();
  status.textContent = `${name ? `${name}, ` : ''}спасибо! Заявка принята — мы скоро свяжемся с вами.`;
  form.reset();
});
