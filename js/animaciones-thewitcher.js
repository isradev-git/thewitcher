// animaciones-thewitcher.js

// ===========================
// 1. Registro de plugins GSAP
// ===========================
gsap.registerPlugin(ScrollTrigger);

// ===========================
// 2. ANIMACIÓN DE INICIO (HEADER)
// ===========================
window.addEventListener('load', () => {
  // 2.1. Fade-in y slide-down del logo
  gsap.from('.logo img', {
    duration: 1,
    y: -50,
    opacity: 0,
    ease: 'power2.out',
    delay: 0.5
  });

  // 2.2. Aparición escalonada de los enlaces del menú
  gsap.from('.main-nav ul li', {
    duration: 1,
    x: -20,
    opacity: 0,
    ease: 'power2.out',
    stagger: 0.1,
    delay: 1
  });

  // 2.3. Animación del botón “Ver Tráiler”: escala + fade-in
  // gsap.from('.trailer-button', {
  //   duration: 0.8,
  //   scale: 0.6,
  //   opacity: 0,
  //   ease: 'back.out(1.5)',
  //   delay: 1.5
  // });
});

// ===========================
// 3. REVELACIÓN POR SCROLL
// ===========================
// Todas las secciones <section> aparecerán con un fade + slide-up al entrar en viewport
gsap.utils.toArray('section').forEach(section => {
  gsap.from(section, {
    scrollTrigger: {
      trigger: section,
      start: 'top 80%',     // cuando el top de la sección llegue al 80% del viewport
      toggleActions: 'play none none none'
    },
    opacity: 0,
    y: 50,
    duration: 1
  });
});

// 3.1. Animación específica para las tarjetas de personaje (fade-in + scale ligeramente)
//      aparecen con mayor retardo si hay muchas en pantalla
gsap.utils.toArray('.character-card').forEach((card, index) => {
  gsap.from(card, {
    scrollTrigger: {
      trigger: card,
      start: 'top 85%',
      toggleActions: 'play none none none'
    },
    opacity: 0,
    scale: 0.8,
    duration: 0.6,
    delay: index * 0.05
  });
});

// 3.2. Animación para ítems de “Armas y Armaduras”
gsap.utils.toArray('.weapon-item, .armor-item').forEach((item) => {
  gsap.from(item, {
    scrollTrigger: {
      trigger: item,
      start: 'top 90%',
      toggleActions: 'play none none none'
    },
    opacity: 0,
    y: 30,
    duration: 0.7
  });
});

// 3.3. Animación para “Alquimia” (pociones, bombas)
gsap.utils.toArray('.potion-item').forEach((potion, idx) => {
  gsap.from(potion, {
    scrollTrigger: {
      trigger: potion,
      start: 'top 90%',
      toggleActions: 'play none none none'
    },
    opacity: 0,
    y: 30,
    duration: 0.6,
    delay: idx * 0.05
  });
});

// 3.4. Animación para “Bestiario” (cada tarjeta de monstruo)
gsap.utils.toArray('.monster-card').forEach((monster, idx) => {
  gsap.from(monster, {
    scrollTrigger: {
      trigger: monster,
      start: 'top 90%',
      toggleActions: 'play none none none'
    },
    opacity: 0,
    y: 40,
    duration: 0.7,
    delay: idx * 0.05
  });
});

// 3.5. Animación para “Lore” (línea de tiempo)
//      cada .timeline-item aparece con un pequeño slide desde la izquierda
gsap.utils.toArray('.timeline-item').forEach((item, idx) => {
  gsap.from(item, {
    scrollTrigger: {
      trigger: item,
      start: 'top 85%',
      toggleActions: 'play none none none'
    },
    opacity: 0,
    x: -50,
    duration: 0.7,
    delay: idx * 0.1
  });
});

// 3.6. Animación para “Expansiones”
gsap.utils.toArray('.expansion-card').forEach((card, idx) => {
  gsap.from(card, {
    scrollTrigger: {
      trigger: card,
      start: 'top 90%',
      toggleActions: 'play none none none'
    },
    opacity: 0,
    y: 30,
    duration: 0.7,
    delay: idx * 0.05
  });
});

// ===========================
// 4. HOVER EFECTOS CON GSAP
// ===========================
// 4.1. Resaltar ligeramente la tarjeta de personaje al pasar el cursor
document.querySelectorAll('.character-card').forEach(card => {
  const inner = card.querySelector('.card-inner');

  card.addEventListener('mouseenter', () => {
    gsap.to(inner, {
      duration: 0.3,
      boxShadow: '0 0 20px rgba(224, 62, 62, 0.6)',
      scale: 1.02,
      ease: 'power1.out'
    });
  });

  card.addEventListener('mouseleave', () => {
    gsap.to(inner, {
      duration: 0.3,
      boxShadow: '0 0 0px rgba(224, 62, 62, 0)',
      scale: 1,
      ease: 'power1.out'
    });
  });
});

// 4.2. Botones “Más información” de personajes (pequeño “pop” al pasar el mouse)
document.querySelectorAll('.more-info').forEach(btn => {
  btn.addEventListener('mouseenter', () => {
    gsap.to(btn, { duration: 0.2, scale: 1.05, boxShadow: '0 0 8px rgba(224, 62, 62, 0.5)' });
  });
  btn.addEventListener('mouseleave', () => {
    gsap.to(btn, { duration: 0.2, scale: 1, boxShadow: '0 0 0px rgba(224, 62, 62, 0)' });
  });
});

// 4.3. Hover sobre elementos de “Armas” y “Armors” (ligero elevamiento y sombra roja)
document.querySelectorAll('.weapon-item, .armor-item').forEach(item => {
  item.addEventListener('mouseenter', () => {
    gsap.to(item, { duration: 0.3, y: -5, boxShadow: '0 8px 16px rgba(224, 62, 62, 0.4)' });
  });
  item.addEventListener('mouseleave', () => {
    gsap.to(item, { duration: 0.3, y: 0, boxShadow: '0 0 0 rgba(224, 62, 62, 0)' });
  });
});

// ===========================
// 5. ANIMACIONES ADICIONALES (OPCIONALES)
// ===========================

// 5.1. Parpadeo suave del botón “Volver arriba” cuando aparece
ScrollTrigger.create({
  trigger: '#scroll-to-top',
  start: 'bottom 100%',
  onEnter: () => gsap.fromTo('#scroll-to-top',
    { opacity: 0, scale: 0.8 },
    { opacity: 1, scale: 1, duration: 0.4, ease: 'power1.out' }
  )
});

// 5.2. Animación de “parpadeo” de la línea de timeline central (línea roja)
//       Se puede aplicar un ligero pulso al elemento ::before de .timeline
gsap.fromTo('.timeline::before',
  { backgroundColor: 'rgba(224, 62, 62, 0.6)' },
  {
    backgroundColor: 'rgba(224, 62, 62, 0.9)',
    duration: 1.5,
    repeat: -1,
    yoyo: true,
    ease: 'sine.inOut'
  }
);

// 5.3. Animación de “breathing” (respiración) sobre el overlay del header
gsap.to('.header-overlay', {
  backgroundColor: 'rgba(0, 0, 0, 0.75)',
  duration: 2,
  repeat: -1,
  yoyo: true,
  ease: 'sine.inOut'
});
