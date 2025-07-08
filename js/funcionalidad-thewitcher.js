// funcionalidad-thewitcher.js

document.addEventListener("DOMContentLoaded", () => {
  // --------------------------------------------------------------
  // 1. Loader
  // --------------------------------------------------------------
  const MIN_DISPLAY_TIME = 1500;
  const startTime = Date.now();
  const loader = document.querySelector(".loader");
  function hideLoader() {
    if (!loader) return;
    loader.classList.add("hide");
    loader.addEventListener("transitionend", () => loader.remove());
  }
  function attemptHideLoader() {
    const elapsed = Date.now() - startTime;
    const remaining = Math.max(0, MIN_DISPLAY_TIME - elapsed);
    setTimeout(hideLoader, remaining);
  }
  if (document.readyState === "complete") {
    attemptHideLoader();
  } else {
    window.addEventListener("load", attemptHideLoader);
  }

  // --------------------------------------------------------------
  // 2. Scroll-to-top
  // --------------------------------------------------------------
  const scrollBtn = document.getElementById("scroll-to-top");
  if (scrollBtn) {
    window.addEventListener("scroll", () => {
      scrollBtn.classList.toggle("visible", window.pageYOffset > 400);
    });
    scrollBtn.addEventListener("click", () =>
      window.scrollTo({ top: 0, behavior: "smooth" })
    );
  }

  // --------------------------------------------------------------
  // 3. Typewriter effect
  // --------------------------------------------------------------
  const universeText = document.querySelector(".typing-effect");
  if (universeText) {
    const fullText = universeText.textContent.trim();
    universeText.textContent = "";
    let idx = 0;
    const writer = setInterval(() => {
      if (idx < fullText.length) {
        universeText.textContent += fullText.charAt(idx++);
      } else {
        clearInterval(writer);
      }
    }, 10);
  }

  // --------------------------------------------------------------
  // 4. Carrusel
  // --------------------------------------------------------------
  const nextDom = document.getElementById("next");
  const prevDom = document.getElementById("prev");
  const carouselDom = document.querySelector(".carousel");
  if (carouselDom && nextDom && prevDom) {
    const SliderDom = carouselDom.querySelector(".list");
    const thumbnailDom = carouselDom.querySelector(".thumbnail");
    let timeRunning = 1000;
    let timeAutoNext = 7000;
    let runTimeout;
    let runNextAuto = setTimeout(() => nextDom.click(), timeAutoNext);

    function showSlider(type) {
      const slides = SliderDom.querySelectorAll(".item");
      const thumbs = thumbnailDom.querySelectorAll(".item");
      if (type === "next") {
        SliderDom.appendChild(slides[0]);
        thumbnailDom.appendChild(thumbs[0]);
        carouselDom.classList.add("next");
      } else {
        SliderDom.prepend(slides[slides.length - 1]);
        thumbnailDom.prepend(thumbs[thumbs.length - 1]);
        carouselDom.classList.add("prev");
      }
      clearTimeout(runTimeout);
      runTimeout = setTimeout(() => {
        carouselDom.classList.remove("next", "prev");
      }, timeRunning);
      clearTimeout(runNextAuto);
      runNextAuto = setTimeout(() => nextDom.click(), timeAutoNext);
    }

    nextDom.addEventListener("click", () => showSlider("next"));
    prevDom.addEventListener("click", () => showSlider("prev"));
  }

  // --------------------------------------------------------------
  // 5. Tarjetas de armas hover
  // --------------------------------------------------------------
  document.querySelectorAll(".weapon-card").forEach((card) => {
    card.addEventListener("mouseenter", () => {
      card.style.transform = "translateY(-15px)";
      // card.style.boxShadow = "0 15px 30px rgba(224,62,62,0.5)";
    });
    card.addEventListener("mouseleave", () => {
      card.style.transform = "translateY(0px)";
      // card.style.boxShadow = "0 10px 25px rgba(224,62,62,0.4)";
    });
    const button = card.querySelector(".view-button");
    if (button) {
      button.addEventListener("mouseenter", () => {
        button.style.transform = "scale(1.05)";
      });
      button.addEventListener("mouseleave", () => {
        button.style.transform = "scale(1)";
      });
    }
  });

  // --------------------------------------------------------------
  // 6. Audio (botón sound-toggle + audio-player)
  // --------------------------------------------------------------
  const audioPlayer = document.getElementById("audio-player");
  const soundBtn = document.getElementById("sound-toggle");
  if (audioPlayer && soundBtn) {
    soundBtn.disabled = true;
    audioPlayer.addEventListener("canplaythrough", () => {
      soundBtn.disabled = false;
    });
    audioPlayer.addEventListener("error", () => {
      soundBtn.disabled = true;
      soundBtn.innerHTML = '<i class="fas fa-exclamation-triangle"></i>';
    });
    let isPlaying = false;
    soundBtn.addEventListener("click", () => {
      if (isPlaying) {
        audioPlayer.pause();
        soundBtn.innerHTML = '<i class="fas fa-bell"></i>';
      } else {
        audioPlayer.play().catch(() => {});
        soundBtn.innerHTML = '<i class="fas fa-bell-slash"></i>';
      }
      isPlaying = !isPlaying;
    });
    audioPlayer.load();
  }

  // --------------------------------------------------------------
  // 7. Vanta funcionalidad
  // --------------------------------------------------------------
  const vContainer = document.querySelector(".vanta-container");
  const vImage = document.querySelector(".vanta-image");
  const vBubble = document.querySelector(".speech-bubble");
  const infoBtn = document.getElementById("info-btn");
  const musicBtn = document.getElementById("music-toggle");
  const themeBtn = document.getElementById("theme-toggle");
  const silenceBtn = document.getElementById("bubble-toggle");
  const vModal = document.querySelector(".vanta-modal");
  const closeModalBtn = document.querySelector(".modal-close");
  let vMusicOn = false;

  // 7.0) Desactivar burbuja si ya silenciada
  if (localStorage.getItem("vantaBubbleDisabled") === "true") {
    vBubble.classList.add("disabled");
  } else {
    setTimeout(() => vBubble.classList.add("active"), 2000);
  }

  // 7.1) Toggle opciones al clicar imagen
  if (vImage && vContainer) {
    vImage.addEventListener("click", (e) => {
      e.stopPropagation();
      vContainer.classList.toggle("show-options");
    });
    document.addEventListener("click", () => {
      vContainer.classList.remove("show-options");
    });
  }

  // 7.2) Info → abrir modal
  if (infoBtn && vModal) {
    infoBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      vModal.classList.add("active");
    });
  }

  // 7.3) Cerrar modal
  if (closeModalBtn && vModal) {
    closeModalBtn.addEventListener("click", () =>
      vModal.classList.remove("active")
    );
    vModal.addEventListener("click", (e) => {
      if (e.target === vModal) vModal.classList.remove("active");
    });
  }

  // 7.4) Música on/off (reusa audioPlayer)
  if (musicBtn && audioPlayer) {
    musicBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      if (!vMusicOn) {
        audioPlayer.play().catch(() => {});
        musicBtn.innerHTML = '<i class="fas fa-volume-mute"></i>';
      } else {
        audioPlayer.pause();
        musicBtn.innerHTML = '<i class="fas fa-music"></i>';
      }
      vMusicOn = !vMusicOn;
    });
  }

  // 7.5) Tema claro/oscuro
  if (themeBtn) {
    themeBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      const isLight = document.body.classList.toggle("light-mode");
      themeBtn.innerHTML = isLight
        ? '<i class="fas fa-moon"></i>'
        : '<i class="fas fa-sun"></i>';
    });
  }

  // 7.6) Toggle burbuja (activar/desactivar) + cambio de icono
  if (silenceBtn && vBubble) {
    // Inicializar icono según estado guardado
    const wasDisabled = localStorage.getItem("vantaBubbleDisabled") === "true";
    silenceBtn.innerHTML = wasDisabled
      ? '<i class="fas fa-comment-dots"></i>' // para reactivar
      : '<i class="fas fa-comment-slash"></i>'; // para silenciar

    silenceBtn.addEventListener("click", function (e) {
      e.stopPropagation();
      // Toggle clase .disabled en la burbuja
      const isDisabled = vBubble.classList.toggle("disabled");

      if (isDisabled) {
        // acabo de silenciar → oculto burbuja, guardo y cambio a icono "para activar"
        vBubble.classList.remove("active");
        localStorage.setItem("vantaBubbleDisabled", "true");
        silenceBtn.innerHTML = '<i class="fas fa-comment-dots"></i>';
      } else {
        // acabo de activar → muestro burbuja, quito flag y cambio a icono "para silenciar"
        vBubble.classList.add("active");
        localStorage.removeItem("vantaBubbleDisabled");
        silenceBtn.innerHTML = '<i class="fas fa-comment-slash"></i>';
      }
    });
  }

  // 7.7) IntersectionObserver para burbuja dinámica
  const sections = document.querySelectorAll("section");
  const messages = {
    universe: "Aquí explorarás el vasto universo de The Witcher…",
    characters: "Esta es la galería de personajes…",
    location: "Descubre los lugares emblemáticos…",
    weapons: "En esta sección encontrarás las armas…",
    alchemy: "La alquimia es esencial para cualquier brujo…",
    bestiary: "El bestiario contiene información sobre…",
    lore: "Sumérgete en la rica historia…",
    expansions: "Las expansiones añaden nuevas capas…",
  };
  if (vBubble && sections.length) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !vBubble.classList.contains("disabled")) {
            vBubble.textContent =
              messages[entry.target.id] || "¡Explora las secciones!";
            vBubble.classList.add("active");
          }
        });
      },
      { threshold: 0.5 }
    );
    sections.forEach((sec) => observer.observe(sec));
  }
}); // end DOMContentLoaded
