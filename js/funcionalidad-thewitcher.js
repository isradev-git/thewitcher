// funcionalidad-thewitcher.js

// --------------------------------------------------------------
// 1. Loader (pantalla de carga)
// --------------------------------------------------------------
//
// Queremos que el loader permanezca visible hasta que TODA la página
// (incluyendo imágenes, vídeos, fuentes, etc.) esté totalmente cargada
// y, además, que al menos se muestre un mínimo de 1.5 segundos. Para ello:
//
//  • Registramos el instante inicial al cargar el script.
//  • Escuchamos el evento 'load' de window, que se dispara cuando ya
//    todo el contenido ha terminado de cargar.
//  • Calculamos cuánto tiempo ha pasado desde el inicio; si no ha
//    sido 1.5s mínimo, esperamos el tiempo restante antes de ocultar.
//  • Aplicamos la clase 'hide' para desvanecer el loader (definida en CSS)
//    y, al terminar la transición, lo retiramos del DOM por completo.
//  • También cubrimos el caso de que document.readyState ya sea 'complete'
//    (por ejemplo, si el usuario recarga y el script se ejecuta tras el evento 'load').
//
// ----------------------------------------------------------------

(function() {
  // Tiempo mínimo que debe mostrarse el loader (en milisegundos)
  const MIN_DISPLAY_TIME = 1500;
  // Marca de tiempo en que se ejecuta este script
  const startTime = Date.now();

  // Función que realmente esconde/elimina el loader
  function hideLoader() {
    const loader = document.querySelector('.loader');
    if (!loader) return;

    // Añadimos la clase 'hide' para disparar la transición de opacidad
    loader.classList.add('hide');

    // Escuchamos el 'transitionend' para eliminar el elemento definitivamente
    loader.addEventListener('transitionend', () => {
      loader.remove();
    });
  }

  // Esta función calcula si ya pasaron los 1.5s mínimos;  
  // si no, espera lo que falte; si sí, oculta inmediatamente.
  function attemptHideLoader() {
    const elapsed = Date.now() - startTime;
    const remaining = Math.max(0, MIN_DISPLAY_TIME - elapsed);

    setTimeout(hideLoader, remaining);
  }

  // Si el documento ya terminó de cargar antes de ejecutar este script,
  // escondemos el loader (respetando el tiempo mínimo).
  if (document.readyState === 'complete') {
    attemptHideLoader();
  } else {
    // En caso contrario, esperamos al evento 'load'
    window.addEventListener('load', attemptHideLoader);
  }
})();


// --------------------------------------------------------------
// 2. Botón “Volver arriba” (scroll-to-top)
// --------------------------------------------------------------
//
// • El botón comienza oculto en CSS con
//     #scroll-to-top { opacity: 0; visibility: hidden; transition: opacity 0.3s ease, visibility 0.3s ease; }
// • Cuando el usuario hace scroll más allá de 400px desde arriba, 
//   añadimos la clase 'visible' para mostrarlo:
//     #scroll-to-top.visible { opacity: 1; visibility: visible; }
// • Al hacer clic en el botón, la ventana hace un 'scrollTo' suave hasta el top.
//

const scrollBtn = document.getElementById('scroll-to-top');
if (scrollBtn) {
  window.addEventListener('scroll', () => {
    if (window.pageYOffset > 400) {
      scrollBtn.classList.add('visible');
    } else {
      scrollBtn.classList.remove('visible');
    }
  });

  scrollBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}


// --------------------------------------------------------------
// 3. Efecto “Typewriter” en “El Universo” (párrafo con .typing-effect)
// --------------------------------------------------------------
//
// • Buscamos el párrafo que contiene la clase 'typing-effect'.
// • Guardamos su texto original, lo vaciamos y luego vamos añadiendo
//   un carácter cada 10ms (se puede ajustar este intervalo).
// • Una vez terminado, detenemos el intervalo.
//

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

// --------------------------------------------------------------
// 4. animaciones-localizaciones.js
// --------------------------------------------------------------

document.addEventListener('DOMContentLoaded', () => {
  // Referencias a elementos del DOM
  const track = document.querySelector('.carousel-track');
  const items = Array.from(track.querySelectorAll('.carousel-item'));
  const prevButton = document.querySelector('.carousel-prev');
  const nextButton = document.querySelector('.carousel-next');
  const titleEl = document.getElementById('location-title');
  const descEl = document.getElementById('location-description');

  // Índice de la imagen actualmente activa
  let currentIndex = 0;

  // Calcula y devuelve el ancho de cada item (en píxeles)
  function getItemWidth() {
    // Cada .carousel-item está configurado para ocupar el 100% del contenedor padre,
    // con padding horizontal. Tomamos el ancho real del track y lo dividimos por 1,
    // o bien tomamos directamente el ancho del primer item.
    return items[0].getBoundingClientRect().width;
  }

  // Función que actualiza la posición del track y la información (título/descr.)
  function updateCarousel() {
    const itemWidth = getItemWidth();
    // Desplazamos el track: cada índice mueve el contenedor hacia la izquierda
    track.style.transform = `translateX(-${currentIndex * itemWidth}px)`;

    // Ajustar clases .active
    items.forEach((item, idx) => {
      if (idx === currentIndex) {
        item.classList.add('active');
      } else {
        item.classList.remove('active');
      }
    });

    // Leer atributos data-* del ítem activo y actualizar título/descr.
    const activeItem = items[currentIndex];
    const newTitle = activeItem.dataset.title || '';
    const newDescription = activeItem.dataset.description || '';

    titleEl.textContent = newTitle;
    descEl.textContent = newDescription;
  }

  // Evento para botón “Anterior”
  prevButton.addEventListener('click', () => {
    currentIndex = (currentIndex === 0) ? items.length - 1 : currentIndex - 1;
    updateCarousel();
  });

  // Evento para botón “Siguiente”
  nextButton.addEventListener('click', () => {
    currentIndex = (currentIndex === items.length - 1) ? 0 : currentIndex + 1;
    updateCarousel();
  });

  // Recalcular posición al redimensionar ventana (para pantallas responsive)
  window.addEventListener('resize', () => {
    updateCarousel();
  });

  // Inicializar el carrusel
  updateCarousel();
});
