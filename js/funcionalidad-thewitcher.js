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
// 4. Funcionalidad del carrousel
// --------------------------------------------------------------
let nextDom = document.getElementById('next');
let prevDom = document.getElementById('prev');

let carouselDom = document.querySelector('.carousel');
let SliderDom = carouselDom.querySelector('.carousel .list');
let thumbnailBorderDom = document.querySelector('.carousel .thumbnail');
let thumbnailItemsDom = thumbnailBorderDom.querySelectorAll('.item');
let timeDom = document.querySelector('.carousel .time');

thumbnailBorderDom.appendChild(thumbnailItemsDom[0]);
// let timeRunning = 3000 ORIGINAL VALOR;
// let timeAutoNext = 7000 ORIGINAL VALOR;
let timeRunning = 1000; //Con 0 va bien, pero no da tiempo a que se vea el cambio de imagen
let timeAutoNext = 16000;

nextDom.onclick = function(){
    showSlider('next');    
}

prevDom.onclick = function(){
    showSlider('prev');    
}
let runTimeOut;
let runNextAuto = setTimeout(() => {
    next.click();
}, timeAutoNext)
function showSlider(type){
    let  SliderItemsDom = SliderDom.querySelectorAll('.carousel .list .item');
    let thumbnailItemsDom = document.querySelectorAll('.carousel .thumbnail .item');
    
    if(type === 'next'){
        SliderDom.appendChild(SliderItemsDom[0]);
        thumbnailBorderDom.appendChild(thumbnailItemsDom[0]);
        carouselDom.classList.add('next');
    }else{
        SliderDom.prepend(SliderItemsDom[SliderItemsDom.length - 1]);
        thumbnailBorderDom.prepend(thumbnailItemsDom[thumbnailItemsDom.length - 1]);
        carouselDom.classList.add('prev');
    }
    clearTimeout(runTimeOut);
    runTimeOut = setTimeout(() => {
        carouselDom.classList.remove('next');
        carouselDom.classList.remove('prev');
    }, timeRunning);

    clearTimeout(runNextAuto);
    runNextAuto = setTimeout(() => {
        next.click();
    }, timeAutoNext)
}

// --------------------------------------------------------------
// 6. Funcionalidad para el botón de sonido en el iframe de Spotify
// --------------------------------------------------------------
document.addEventListener('DOMContentLoaded', () => {
  const iframe = document.getElementById('spotify-iframe');
  const btn    = document.getElementById('sound-toggle');
  let playing  = false;

  function enableButton() {
    if (btn.disabled) {
      btn.disabled = false;
      console.log('[Spotify] iframe cargado → botón habilitado');
    }
  }

  // 1) Si ya está completado, habilita ya; sino, espera al load
  if (iframe.readyState === 'complete' || iframe.complete) {
    enableButton();
  } else {
    iframe.addEventListener('load', enableButton);
  }

  // 2) Click → postMessage + toggle icono
  btn.addEventListener('click', () => {
    console.log('[Spotify] click → toggle');
    iframe.contentWindow.postMessage(
      { command: 'toggle' },
      'https://open.spotify.com'
    );
    playing = !playing;
    btn.innerHTML = playing
      ? '<i class="fas fa-bell-slash"></i>'
      : '<i class="fas fa-bell"></i>';
  });
});

