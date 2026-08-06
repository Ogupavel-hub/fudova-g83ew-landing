const form = document.querySelector('#lead-form');
const status = document.querySelector('.form-status');

form.addEventListener('submit', (event) => {
  event.preventDefault();
  const name = new FormData(form).get('name').trim();
  status.textContent = `${name ? `${name}, ` : ''}заявка принята. Скоро свяжемся.`;
  form.reset();
});

const showcase = document.querySelector('.product-showcase');

if (showcase) {
  const slides = [...showcase.querySelectorAll('.showcase-slide')];
  const counter = showcase.querySelector('.showcase-controls span');
  let activeSlide = 0;

  const showProduct = (index) => {
    activeSlide = (index + slides.length) % slides.length;
    slides.forEach((slide, slideIndex) => slide.classList.toggle('is-active', slideIndex === activeSlide));
    counter.textContent = `${String(activeSlide + 1).padStart(2, '0')} / ${String(slides.length).padStart(2, '0')}`;
  };

  showcase.querySelector('[data-showcase-prev]').addEventListener('click', () => showProduct(activeSlide - 1));
  showcase.querySelector('[data-showcase-next]').addEventListener('click', () => showProduct(activeSlide + 1));
}

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
