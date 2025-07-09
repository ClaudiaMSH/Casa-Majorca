document.addEventListener("DOMContentLoaded", function () {
  const parallax = document.getElementById("parallax");
  const header = document.getElementById("header");

  window.addEventListener("scroll", function () {
    // Parallax scroll
    if (parallax) {
      parallax.style.top = (window.pageYOffset * 0.5) + "px";
    }
  });
});

gsap.registerPlugin(ScrollTrigger);

// Create one timeline with shared ScrollTrigger
let shrinkTL = gsap.timeline({
  scrollTrigger: {
    trigger: ".container",
    start: "top top",
    end: "+=300",
    scrub: true,
    markers: false,
    onUpdate: self => {
      // When scroll progress is nearly complete, fade in nav and dropdown
      if (self.progress >= 0.99 && !document.body.classList.contains("nav-revealed")) {
        document.body.classList.add("nav-revealed");

        // Fade in the classic nav (if used)
        gsap.to(".nav", {
          opacity: 1,
          y: -10,
          duration: 0.6,
          ease: "power2.out"
        });

        // Fade in title text
        gsap.to(".title-text", {
          opacity: 1,
          y: -10,
          duration: 0.6,
          ease: "power2.out",
          delay: 0.2
        });

        // Add visible class to dropdown
        gsap.to(".dropdown", {
          duration: 0.6,
          ease: "power2.out",
          onStart: () => {
            document.querySelector(".dropdown").classList.add("dropdown-visible");
          }
        });
      }
    }
  }
});

// Animate both elements together
shrinkTL.to(".container", {
  height: "10vh", //container (header) height
  ease: "none"
}, 0); // ← both animations start at time 0

shrinkTL.to(".logo", {
  scale: () => {
    const width = window.innerWidth;
    const height = window.innerHeight;

    // Scale based on width, with a minimum and maximum clamp
    //const baseScale = width / 2000; // Adjust denominator for base size
    const baseScale = Math.min(width, height) / 1800;
    return gsap.utils.clamp(0.34, baseScale, 0.39); // min, value, max
  },
  top: "5vh",
  transform: "translateX(-50%) translateY(-50%)",
  ease: "none"
}, 0);

shrinkTL.to(".logo-subtext", {
  opacity: 0,
  y: -90, // optional: move it slightly up as it fades
  ease: "power1.out"
}, 0);

window.addEventListener("resize", () => {
  ScrollTrigger.refresh(); // forces recalculation of all ScrollTriggers
});
