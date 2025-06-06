// funcionalidad-thewitcher.js

// 1. Loader (pantalla de carga)
// Esperar a que TODOS los recursos (imágenes, vídeo, etc.) estén completamente cargados
window.addEventListener('load', () => {
  const loader = document.querySelector('.loader');
  if (!loader) return;

  // Después de 1.5 s, aplicamos una clase para desvanecerlo y luego lo eliminamos del DOM
  setTimeout(() => {
    loader.classList.add('hide');           // clase CSS que hace fade-out
    setTimeout(() => loader.remove(), 500); // quitarlo del DOM tras el fade
  }, 1500);
});


// 2. Botón “Volver arriba” (scroll-to-top)
const scrollBtn = document.getElementById('scroll-to-top');
if (scrollBtn) {
  // En tu CSS asegúrate de tener:
  // #scroll-to-top { opacity: 0; visibility: hidden; transition: opacity 0.3s ease, visibility 0.3s ease; }
  // #scroll-to-top.visible { opacity: 1; visibility: visible; }

  // Al hacer scroll, mostramos u ocultamos el botón
  window.addEventListener('scroll', () => {
    if (window.pageYOffset > 400) {
      scrollBtn.classList.add('visible');
    } else {
      scrollBtn.classList.remove('visible');
    }
  });

  // Al hacer clic, subimos suavemente hasta arriba
  scrollBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}


// 3. Efecto “Typewriter” en “El Universo” (párrafo con .typing-effect)
const universeText = document.querySelector('.typing-effect');
if (universeText) {
  const fullText = universeText.textContent.trim();
  universeText.textContent = '';
  let idx = 0;

  const writer = setInterval(() => {
    if (idx < fullText.length) {
      universeText.textContent += fullText.charAt(idx);
      idx++;
    } else {
      clearInterval(writer);
    }
  }, 10);
}
