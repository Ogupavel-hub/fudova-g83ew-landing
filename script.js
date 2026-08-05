const form = document.querySelector('#lead-form');
const status = document.querySelector('.form-status');

form.addEventListener('submit', (event) => {
  event.preventDefault();
  const name = new FormData(form).get('name').trim();
  status.textContent = `${name ? `${name}, ` : ''}заявка принята. Скоро свяжемся.`;
  form.reset();
});

const gallery = document.querySelector('.spec-gallery');

if (gallery) {
  const slides = [...gallery.querySelectorAll('.gallery-slide')];
  const dots = [...gallery.querySelectorAll('.gallery-dots button')];
  const previous = gallery.querySelector('[data-gallery-prev]');
  const next = gallery.querySelector('[data-gallery-next]');
  let activeIndex = 0;

  const showSlide = (index) => {
    activeIndex = (index + slides.length) % slides.length;
    slides.forEach((slide, slideIndex) => slide.classList.toggle('is-active', slideIndex === activeIndex));
    dots.forEach((dot, dotIndex) => {
      const isActive = dotIndex === activeIndex;
      dot.classList.toggle('is-active', isActive);
      dot.setAttribute('aria-current', String(isActive));
    });
  };

  previous.addEventListener('click', () => showSlide(activeIndex - 1));
  next.addEventListener('click', () => showSlide(activeIndex + 1));
  dots.forEach((dot, index) => dot.addEventListener('click', () => showSlide(index)));
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
