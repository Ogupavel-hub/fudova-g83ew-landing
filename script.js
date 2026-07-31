const form = document.querySelector('#lead-form');
const status = document.querySelector('.form-status');
const targets = document.querySelectorAll('.target');
const fight = document.querySelector('.fight');
const kickOverlay = document.querySelector('.kick-overlay');
const kickImage = kickOverlay.querySelector('img');

form.addEventListener('submit', (event) => {
  event.preventDefault();
  const name = new FormData(form).get('name').trim();
  status.textContent = `${name ? `${name}, ` : ''}заявка принята. Скоро свяжемся.`;
  form.reset();
});

if (!matchMedia('(prefers-reduced-motion: reduce)').matches) {
  let pending = false;

  const updateFight = () => {
    const rect = fight.getBoundingClientRect();
    const availableScroll = Math.max(1, fight.offsetHeight - window.innerHeight);
    const progress = Math.max(0, Math.min(1, -rect.top / availableScroll));
    const insideFight = rect.top < window.innerHeight && rect.bottom > 0;
    const scaledProgress = Math.min(progress * targets.length, targets.length - 0.001);
    const activeIndex = Math.floor(scaledProgress);
    const phase = scaledProgress - activeIndex;
    const kickStart = 0.28;
    const kickImpact = 0.56;
    const kickEnd = 0.86;
    const activeTarget = targets[activeIndex];
    targets.forEach((target, index) => {
      target.classList.toggle('current', index === activeIndex);
    });
    const headline = activeTarget.querySelector('h2').getBoundingClientRect();
    const imageWidth = kickImage.offsetWidth;
    const imageScale = imageWidth / 956;
    const footX = 836 * imageScale;
    const footY = 602 * imageScale;
    const impactX = headline.left + headline.width * 0.68 - footX;
    const impactY = headline.top + headline.height * 0.56 - footY;
    const startX = -imageWidth - 120;
    const endX = window.innerWidth + 120;
    let kickX = startX;
    let kickOpacity = 0;

    if (phase >= kickStart && phase <= kickEnd) {
      const kickProgress = phase <= kickImpact
        ? (phase - kickStart) / (kickImpact - kickStart)
        : (phase - kickImpact) / (kickEnd - kickImpact);
      kickX = phase <= kickImpact
        ? startX + (impactX - startX) * kickProgress
        : impactX + (endX - impactX) * kickProgress;
      kickOpacity = 1;
    } else if (phase > kickEnd) {
      kickX = endX;
    }

    targets.forEach((target, index) => {
      const isCurrent = index === activeIndex;
      const exitProgress = isCurrent && phase >= kickImpact
        ? Math.min(1, (phase - kickImpact) / (kickEnd - kickImpact))
        : 0;
      target.classList.toggle('active', isCurrent && phase < kickImpact);
      target.classList.toggle('hit', isCurrent && phase >= kickImpact);
      target.style.setProperty('--target-x', `${exitProgress * 145}vw`);
      target.style.setProperty('--target-opacity', `${isCurrent ? 1 - Math.max(0, exitProgress - 0.72) / 0.28 : 0}`);
    });

    kickOverlay.style.setProperty('--kick-x', `${kickX}px`);
    kickOverlay.style.setProperty('--kick-y', `${impactY}px`);
    kickOverlay.style.opacity = insideFight ? kickOpacity : 0;
    pending = false;
  };

  const requestUpdate = () => {
    if (!pending) {
      pending = true;
      requestAnimationFrame(updateFight);
    }
  };

  window.addEventListener('scroll', requestUpdate, { passive: true });
  window.addEventListener('resize', requestUpdate);
  requestUpdate();
}
