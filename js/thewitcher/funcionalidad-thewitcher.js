// funcionalidad-thewitcher.js

document.addEventListener('DOMContentLoaded', function() {
    /* =========================
       1. LOADER (Pantalla de carga)
       ========================= */
    const loader = document.querySelector('.loader');
    if (loader) {
        // Mantener el loader visible durante 1.5 segundos aproximadamente
        setTimeout(() => {
            loader.style.display = 'none';
        }, 1500);
    }

    /* =========================
       2. BOTÓN “Volver arriba” //NOFUNCIONA
       ========================= */
    const scrollBtn = document.getElementById('scroll-to-top');
    if (scrollBtn) {
        window.addEventListener('scroll', function() {
            if (window.pageYOffset > 400) {
                scrollBtn.style.display = 'block';
            } else {
                scrollBtn.style.display = 'none';
            }
        });

        scrollBtn.addEventListener('click', function() {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    /* =========================
       3. MODALES (Tráiler y Personajes) //NOFUCNIONA
       ========================= */

    // 3.1. Abrir modal de tráiler
    // const trailerBtn = document.getElementById('trailer-btn');
    // const trailerModal = document.getElementById('trailer-modal');
    // if (trailerBtn && trailerModal) {
    //     trailerBtn.addEventListener('click', function() {
    //         trailerModal.style.display = 'flex';
    //     });
    // }

    // 3.2. Cerrar cualquier modal con la “X” o clic fuera del contenido
    // const closeButtons = document.querySelectorAll('.close-modal');
    // closeButtons.forEach(btn => {
    //     btn.addEventListener('click', function() {
    //         const modal = this.closest('.modal');
    //         if (modal) {
    //             modal.style.display = 'none';
    //             // Si el modal cerrado es el del tráiler, reseteamos el iframe para detener el vídeo
    //             const iframe = modal.querySelector('#trailer-video');
    //             if (iframe) {
    //                 iframe.src = iframe.src;
    //             }
    //         }
    //     });
    // });

    // window.addEventListener('click', function(e) {
    //     if (e.target.classList.contains('modal')) {
    //         e.target.style.display = 'none';
    //         const iframe = e.target.querySelector('#trailer-video');
    //         if (iframe) {
    //             iframe.src = iframe.src;
    //         }
    //     }
    // });

    /* =========================
       4. EFECTO “TYPEWRITER” en “El Universo”
       ========================= */
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
        }, 10); //Original 25
    }

    /* =========================
       5. INTERACTIVIDAD DEL MAPA
       ========================= */
    // const mapAreas = document.querySelectorAll('area');
    // const mapLocation = document.getElementById('map-location');
    // const mapDescription = document.getElementById('map-description');

    // mapAreas.forEach(area => {
    //     area.addEventListener('click', function(e) {
    //         e.preventDefault();
    //         const regionName = this.getAttribute('title') || this.getAttribute('alt') || 'Región desconocida';
    //         if (mapLocation) {
    //             mapLocation.textContent = regionName;
    //         }
    //         if (mapDescription) {
    //             mapDescription.textContent = `Información detallada sobre ${regionName}.`;
    //         }
    //     });
    // });
});  // <-- Aquí cerramos la función y el addEventListener, y añadimos el punto y coma
