document.addEventListener('DOMContentLoaded', () => {

const header = document.getElementById('header');
let lastScrollY = window.scrollY;

window.addEventListener('scroll', () => {
    const currentScrollY = window.scrollY;
    if (currentScrollY > lastScrollY && currentScrollY > 20) {
        
        header.style.transform = 'translateY(-100%)';
    } else {
        
        header.style.transform = 'translateY(0)';
    }
    lastScrollY = currentScrollY;
});

});

const track = document.querySelector('.slider');

window.addEventListener('load', () => {
  // Buscamos la animación del carrusel por su nombre en CSS (@keyframes scroll)
  const anim = document.getAnimations().find(
    a => a.animationName === 'scroll'
  );

  if (!anim) {
    console.warn("No se encontró la animación 'scroll'. Revisa el nombre en tu CSS.");
    return;
  }

  let animFrameId;

  // Desaceleración progresiva (freno suave)
  track.addEventListener('mouseenter', () => {
    cancelAnimationFrame(animFrameId);

    const slowDown = () => {
      if (anim.playbackRate > 0.005) {
        anim.playbackRate *= 0.985;
        animFrameId = requestAnimationFrame(slowDown);
      } else {
        anim.playbackRate = 0;
      }
    };

    slowDown();
  });

  // Aceleración progresiva (arranque suave)
  track.addEventListener('mouseleave', () => {
    cancelAnimationFrame(animFrameId);

    const speedUp = () => {
      if (anim.playbackRate < 0.995) {
        anim.playbackRate += (1 - anim.playbackRate) * 0.015;
        animFrameId = requestAnimationFrame(speedUp);
      } else {
        anim.playbackRate = 1;
      }
    };

    speedUp();
  });
});

function setLanguage(lang) {
  if (!translations[lang]) lang = 'en';          

  document.documentElement.lang = lang;           

  document.querySelectorAll('[data-i18n]').forEach(el => {
    const text = translations[lang][el.dataset.i18n];
    if (text !== undefined) el.innerHTML = text;
  });

  document.querySelectorAll('[data-lang]').forEach(btn => {
    btn.setAttribute('aria-pressed', btn.dataset.lang === lang);
  });

  localStorage.setItem('lang', lang);
}

document.addEventListener('DOMContentLoaded', () => {
  const saved = localStorage.getItem('lang');
  const browser = navigator.language.slice(0, 2);
  setLanguage(saved || browser);

  document.querySelectorAll('[data-lang]').forEach(btn => {
    btn.addEventListener('click', () => setLanguage(btn.dataset.lang));
  });
});