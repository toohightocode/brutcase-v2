import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// ============================================
// UTILITIES
// ============================================

const DELAY_MAP = {
  "delay-0": 0,
  "delay-75": 0.075,
  "delay-100": 0.1,
  "delay-150": 0.15,
  "delay-200": 0.2,
  "delay-300": 0.3,
  "delay-500": 0.5,
  "delay-700": 0.7,
  "delay-1000": 1,
};

function getDelay(el) {
  for (const [cls, seconds] of Object.entries(DELAY_MAP)) {
    if (el.classList.contains(cls)) return seconds;
  }
  return 0;
}

// ============================================
// ANIMATION MODULES
// Aggiungi qui nuove funzioni
// ============================================

const Animations = {
  
  /**
   * Reveal-up: elementi che entrano dal basso con fade
   */
  revealUp() {
    const elements = document.querySelectorAll(".reveal-up");
    if (!elements.length) return;

    elements.forEach((el) => {
      gsap.set(el, { opacity: 0, y: 40 });

      ScrollTrigger.create({
        trigger: el,
        start: "top 85%",
        once: true,
        onEnter: () => {
          gsap.to(el, {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: "power2.out",
            delay: getDelay(el),
          });
        },
      });
    });

    // Elementi già visibili al caricamento
    requestAnimationFrame(() => {
      elements.forEach((el) => {
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) {
          gsap.to(el, {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: "power2.out",
            delay: getDelay(el),
          });
          ScrollTrigger.getAll().forEach((st) => {
            if (st.trigger === el) st.kill();
          });
        }
      });
    });
  },

  /**
   * Esempio: aggiungi qui altre animazioni
   * 
   * revealLeft() {
   *   const elements = document.querySelectorAll(".reveal-left");
   *   // ...
   * },
   * 
   * parallax() {
   *   // logica parallax
   * },
   */

};

// ============================================
// INITIALIZER
// ============================================

function init() {
  document.body.classList.add("gsap-ready");

  // Chiama tutte le animazioni registrate
  Object.values(Animations).forEach((fn) => {
    if (typeof fn === "function") fn();
  });
}

// ============================================
// BOOT
// ============================================

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", init);
} else {
  init();
}