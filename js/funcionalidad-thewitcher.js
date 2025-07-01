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
let timeAutoNext = 999000;// ESTE ES DE PRUEBAS PARA PODER EDITAR TRANQUILAMENTE

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
// 6. fUNCIONALIDAD DE TARJETAS DE ARMAS Y ARMADURAS
// --------------------------------------------------------------
        document.querySelectorAll('.weapon-card').forEach(card => {
            card.addEventListener('mouseenter', () => {
                card.style.transform = 'translateY(-15px)';
                card.style.boxShadow = '0 15px 30px rgba(224, 62, 62, 0.5)';
            });
            
            card.addEventListener('mouseleave', () => {
                card.style.transform = 'translateY(-10px)';
                card.style.boxShadow = '0 10px 25px rgba(224, 62, 62, 0.4)';
            });
            
            // Efecto de botón
            const button = card.querySelector('.view-button');
            button.addEventListener('mouseenter', () => {
                button.style.transform = 'scale(1.05)';
            });
            
            button.addEventListener('mouseleave', () => {
                button.style.transform = 'scale(1)';
            });
        });


// --------------------------------------------------------------
// 7. Funcionalidad para el botón de sonido en el iframe de Spotify
// --------------------------------------------------------------
document.addEventListener('DOMContentLoaded', () => {
    const audioPlayer = document.getElementById('audio-player');
    const btn = document.getElementById('sound-toggle');
    let isPlaying = false;

    // Habilitar el botón cuando el audio esté listo
    audioPlayer.addEventListener('canplaythrough', () => {
        btn.disabled = false;
        console.log('[Audio] El reproductor está listo');
    });

    // Manejar errores de carga
    audioPlayer.addEventListener('error', () => {
        console.error('[Audio] Error al cargar el archivo de música');
        btn.disabled = true;
        btn.innerHTML = '<i class="fas fa-exclamation-triangle"></i>';
    });

    // Controlar el botón
    btn.addEventListener('click', () => {
        if (isPlaying) {
            audioPlayer.pause();
            console.log('[Audio] Música pausada');
        } else {
            audioPlayer.play()
                .then(() => {
                    console.log('[Audio] Música iniciada');
                })
                .catch(error => {
                    console.error('[Audio] Error al reproducir:', error);
                    btn.innerHTML = '<i class="fas fa-exclamation-triangle"></i>';
                });
        }
        
        isPlaying = !isPlaying;
        updateButtonIcon();
    });

    // Actualizar icono del botón
    function updateButtonIcon() {
        btn.innerHTML = isPlaying 
            ? '<i class="fas fa-bell-slash"></i>' 
            : '<i class="fas fa-bell"></i>';
    }

    // Precargar el audio
    audioPlayer.load();
    console.log('[Audio] Precargando archivo de música...');
});

// --------------------------------------------------------------
// 8. Funcionalidad de Vanta
// --------------------------------------------------------------

        document.addEventListener('DOMContentLoaded', function() {
            const vantaContainer = document.querySelector('.vanta-container');
            const speechBubble = document.querySelector('.speech-bubble');
            const vantaModal = document.querySelector('.vanta-modal');
            const modalClose = document.querySelector('.modal-close');
            const silenceBtn = document.getElementById('silence-btn');
            const sections = document.querySelectorAll('section');
            let silenced = false;
            
            // Mostrar mensaje de bienvenida
            setTimeout(() => {
                speechBubble.classList.add('active');
            }, 2000);
            
            // Abrir modal al hacer clic en Vanta
            vantaContainer.addEventListener('click', () => {
                vantaModal.classList.add('active');
            });
            
            // Cerrar modal
            modalClose.addEventListener('click', () => {
                vantaModal.classList.remove('active');
            });
            
            // Silenciar a Vanta
            silenceBtn.addEventListener('click', () => {
                silenced = !silenced;
                silenceBtn.textContent = silenced ? 'Activar' : 'Silenciar';
                if (silenced) {
                    speechBubble.classList.remove('active');
                }
            });
            
            // Observador de intersección para las secciones
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting && !silenced) {
                        // Mostrar mensaje específico para la sección
                        const sectionId = entry.target.id;
                        showSectionMessage(sectionId);
                    }
                });
            }, { threshold: 0.5 });
            
            // Observar cada sección
            sections.forEach(section => {
                observer.observe(section);
            });
            
            // Mensajes específicos para cada sección
            function showSectionMessage(sectionId) {
                let message = '';
                
                switch(sectionId) {
                    case 'universe':
                        message = 'Aquí explorarás el vasto universo de The Witcher. Un mundo lleno de reinos en conflicto, criaturas mágicas y complejas historias políticas.';
                        break;
                    case 'characters':
                        message = 'Esta es la galería de personajes. Conoce a Geralt, Yennefer, Ciri y muchos otros personajes que dan vida a este universo. Cada uno tiene su propia historia única.';
                        break;
                    case 'location':
                        message = 'Descubre los lugares emblemáticos del continente. Desde Kaer Morhen hasta las calles de Novigrad, cada lugar tiene su propia magia y peligros.';
                        break;
                    case 'weapons':
                        message = 'En esta sección encontrarás las armas y armaduras más legendarias. ¿Sabías que cada escuela de brujos tiene su propio estilo de equipamiento?';
                        break;
                    case 'alchemy':
                        message = 'La alquimia es esencial para cualquier brujo. Aquí aprenderás sobre pociones, aceites y bombas que te ayudarán en tus enfrentamientos.';
                        break;
                    case 'bestiary':
                        message = 'El bestiario contiene información sobre todas las criaturas que encontrarás en el continente. Conoce sus debilidades antes de enfrentarte a ellas.';
                        break;
                    case 'lore':
                        message = 'Sumérgete en la rica historia del universo de The Witcher. Desde los libros originales hasta los eventos clave que han dado forma a este mundo.';
                        break;
                    case 'expansions':
                        message = 'Las expansiones añaden nuevas capas a la historia. Hearts of Stone y Blood and Wine son consideradas de lo mejor en narrativa de videojuegos.';
                        break;
                    default:
                        message = '¡Explora las diferentes secciones para descubrir todo sobre el universo de The Witcher!';
                }
                
                // Actualizar y mostrar el mensaje
                document.querySelector('.vanta-message').textContent = message;
                speechBubble.classList.add('active');
                
                // Ocultar el mensaje después de 8 segundos
                setTimeout(() => {
                    speechBubble.classList.remove('active');
                }, 8000);
            }
            
            // Cerrar modal al hacer clic fuera
            window.addEventListener('click', (e) => {
                if (e.target === vantaModal) {
                    vantaModal.classList.remove('active');
                }
            });
        });