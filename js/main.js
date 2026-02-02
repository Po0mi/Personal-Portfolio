/////////////////////////////////////
//// GSAP SMOOTH SCROLL
/////////////////////////////////////
gsap.registerPlugin(ScrollToPlugin, ScrollTrigger);

let target = window.scrollY;

window.addEventListener(
  "wheel",
  (e) => {
    e.preventDefault();
    target += e.deltaY;

    // Limit scroll between top and bottom
    target = Math.max(
      0,
      Math.min(target, document.body.scrollHeight - window.innerHeight),
    );

    gsap.to(window, {
      duration: 3,
      scrollTo: target,
      ease: "power3.out",
      overwrite: "auto",
    });
  },
  { passive: false },
);

/////////////////////////////////////
//// SMOOTH SCROLLING FOR NAV
/////////////////////////////////////
document.addEventListener("DOMContentLoaded", () => {
  const navLinks = document.querySelectorAll(".nav-link");

  navLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();

      const targetId = link.getAttribute("href");
      const targetSection = document.querySelector(targetId);

      if (targetSection) {
        const targetPosition = targetSection.offsetTop;
        target = targetPosition; // update smooth scroll target

        gsap.to(window, {
          duration: 1.5,
          scrollTo: targetPosition,
          ease: "power2.inOut",
        });
      }
    });
  });
});

/////////////////////////////////////
//// HEADER ANIMATIONS
/////////////////////////////////////
document.addEventListener("DOMContentLoaded", () => {
  const header = document.querySelector(".header");

  if (!header) return;

  // Get all elements to animate
  const logo = header.querySelector(".logo");
  const name = header.querySelector(".name h1");
  const navLinks = header.querySelectorAll(".nav-link");

  // Set initial states
  gsap.set(logo, { x: -50, opacity: 0 });
  gsap.set(name, { y: -30, opacity: 0 });
  gsap.set(navLinks, { y: -30, opacity: 0 });

  // Create entrance animation timeline
  const tl = gsap.timeline({
    defaults: { ease: "smooth" },
    delay: 0.1,
  });

  // Animate header elements
  tl.to(
    logo,
    {
      x: 0,
      opacity: 1,
      duration: 1,
      ease: "back.out(1.5)",
    },
    0,
  )
    .to(
      name,
      {
        y: 0,
        opacity: 1,
        duration: 1,
      },
      0.15,
    )
    .to(
      navLinks,
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.1,
      },
      0.3,
    );

  // Add hover animations to nav links
  navLinks.forEach((link) => {
    link.addEventListener("mouseenter", () => {
      gsap.to(link, {
        y: -3,
        duration: 0.3,
        ease: "power2.out",
      });
    });

    link.addEventListener("mouseleave", () => {
      gsap.to(link, {
        y: 0,
        duration: 0.3,
        ease: "power2.out",
      });
    });
  });
});

/////////////////////////////////////
//// HERO SECTION ANIMATIONS
/////////////////////////////////////
document.addEventListener("DOMContentLoaded", () => {
  const heroSection = document.querySelector(".hero-section");

  if (!heroSection) return;

  // Get all elements to animate
  const heroWrapper = heroSection.querySelector(".hero-wrapper");
  const heroH1 = heroSection.querySelector("h1");
  const heroH2 = heroSection.querySelector("h2");
  const scrollIndicator = heroSection.querySelector(".scroll-indicator");
  const socialIcons = heroSection.querySelectorAll(".socials img, .socials a");

  // Set initial states
  gsap.set(heroWrapper, { scale: 1.1, opacity: 0 });
  gsap.set(heroH1, { scale: 0.8, opacity: 0 });
  gsap.set(heroH2, { y: 50, opacity: 0 });
  gsap.set(scrollIndicator, { y: -20, opacity: 0 });
  gsap.set(socialIcons, { x: -50, opacity: 0 });

  // Create entrance animation timeline
  const tl = gsap.timeline({
    defaults: { ease: "smooth" },
    delay: 0.3,
  });

  // Animate wrapper first (background reveal)
  tl.to(
    heroWrapper,
    {
      scale: 1,
      opacity: 1,
      duration: 1.5,
      ease: "power2.out",
    },
    0,
  )
    // Animate hero title with scale
    .to(
      heroH1,
      {
        scale: 1,
        opacity: 1,
        duration: 1.5,
        ease: "back.out(1.2)",
      },
      0.3,
    )
    // Animate subtitle
    .to(
      heroH2,
      {
        y: 0,
        opacity: 1,
        duration: 1.2,
      },
      0.6,
    )
    // Animate scroll indicator
    .to(
      scrollIndicator,
      {
        y: 0,
        opacity: 0.5,
        duration: 1,
      },
      1.1,
    )
    // Animate social icons with stagger
    .to(
      socialIcons,
      {
        x: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.15,
      },
      1.3,
    );

  // Add continuous bounce animation to scroll indicator
  gsap.to(scrollIndicator.querySelector(".arrow"), {
    y: 10,
    duration: 0.8,
    ease: "power1.inOut",
    repeat: -1,
    yoyo: true,
    delay: 2,
  });
});

/////////////////////////////////////
//// ABOUT SECTION ANIMATIONS
/////////////////////////////////////
document.addEventListener("DOMContentLoaded", () => {
  const aboutSection = document.querySelector(".about-section");

  if (!aboutSection) return;

  // Get all elements to animate
  const aboutH1 = aboutSection.querySelector("h1");
  const aboutH2 = aboutSection.querySelector("h2");
  const aboutParagraph = aboutSection.querySelector(".first-paragraph");
  const badges = aboutSection.querySelectorAll(".badge");

  // Set initial states
  gsap.set(aboutH1, { x: -100, opacity: 0 });
  gsap.set(aboutH2, { x: -80, opacity: 0 });
  gsap.set(aboutParagraph, { y: 50, opacity: 0 });
  gsap.set(badges, { scale: 0, opacity: 0 });

  // Create Intersection Observer for scroll-triggered animation
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animateAboutSection();
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.2,
      rootMargin: "0px 0px -100px 0px",
    },
  );

  observer.observe(aboutSection);

  // Animation function
  function animateAboutSection() {
    const tl = gsap.timeline({
      defaults: { ease: "power2.out" },
    });

    // Animate title
    tl.to(
      aboutH1,
      {
        x: 0,
        opacity: 1,
        duration: 0.6,
      },
      0,
    )
      .to(
        aboutH2,
        {
          x: 0,
          opacity: 1,
          duration: 0.6,
        },
        0.1,
      )
      // Animate paragraph
      .to(
        aboutParagraph,
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
        },
        0.2,
      )
      // Animate badges with stagger
      .to(
        badges,
        {
          scale: 1,
          opacity: 1,
          duration: 0.4,
          stagger: {
            amount: 0.4,
            from: "start",
            ease: "power2.out",
          },
        },
        0.4,
      );
  }
});
/////////////////////////////////////
//// PROJECT SECTION - HORIZONTAL SCROLL
/////////////////////////////////////
document.addEventListener("DOMContentLoaded", () => {
  const projectsSection = document.querySelector(".projects-section");

  if (!projectsSection) return;

  const track = document.querySelector(".projects-track");
  const cards = gsap.utils.toArray(".project-card");
  const bgTitle = document.querySelector(".projects-title h1");

  // Calculate total width with extra padding for the last card
  const cardWidth = window.innerWidth;
  const lastCardPadding = cardWidth * 0.3; // Extra 30% viewport width for last card
  const totalWidth = cards.length * cardWidth + lastCardPadding;
  const scrollDistance = totalWidth - window.innerWidth;

  // Set initial states
  gsap.set(cards, { opacity: 0, y: 50 });
  if (bgTitle) gsap.set(bgTitle, { opacity: 0, scale: 0.8 });

  // Reveal animation when section enters viewport
  ScrollTrigger.create({
    trigger: projectsSection,
    start: "top bottom",
    once: true,
    onEnter: () => {
      // Animate background title
      if (bgTitle) {
        gsap.to(bgTitle, {
          opacity: 1,
          scale: 1,
          duration: 1,
          ease: "power2.out",
        });
      }

      // Stagger animate cards
      gsap.to(cards, {
        opacity: 1,
        y: 0,
        duration: 4,
        stagger: 0.2,
        ease: "power2.out",
      });
    },
  });

  // Horizontal scroll animation
  gsap.to(track, {
    x: -scrollDistance,
    ease: "none",
    scrollTrigger: {
      trigger: projectsSection,
      start: "top top",
      end: () => `+=${scrollDistance}`,
      pin: true,
      scrub: 1,
      anticipatePin: 1,
    },
  });

  console.log("Horizontal scroll initialized");
});
/////////////////////////////////////
//// CURSOR
/////////////////////////////////////
var cursor = $(".cursor"),
  follower = $(".cursor-follower");

var posX = 0,
  posY = 0;

var mouseX = 0,
  mouseY = 0;

TweenMax.to({}, 0.016, {
  repeat: -1,
  onRepeat: function () {
    posX += (mouseX - posX) / 9;
    posY += (mouseY - posY) / 9;

    TweenMax.set(follower, {
      css: {
        left: posX - 12,
        top: posY - 12,
      },
    });

    TweenMax.set(cursor, {
      css: {
        left: mouseX,
        top: mouseY,
      },
    });
  },
});

$(document).on("mousemove", function (e) {
  mouseX = e.clientX;
  mouseY = e.clientY;
});

// Add active state on hover for links, buttons, and interactive elements
$(
  "a, button, .link, .nav-link, .view-btn, .badge, .project-visual, img, .arrow",
).on("mouseenter", function () {
  cursor.addClass("active");
  follower.addClass("active");
});

$(
  "a, button, .link, .nav-link, .view-btn, .badge, .project-visual, img, .arrow",
).on("mouseleave", function () {
  cursor.removeClass("active");
  follower.removeClass("active");
});

/////////////////////////////////////
//// CURSOR COORDINATES
/////////////////////////////////////
// Get coordinate elements
const coordsDisplay = document.getElementById("coords");
const xDisplay = coordsDisplay.querySelector(".x");
const yDisplay = coordsDisplay.querySelector(".y");

// Update coordinates on mouse move
document.addEventListener("mousemove", (e) => {
  const x = String(e.clientX).padStart(3, "0");
  const y = String(e.clientY).padStart(3, "0");

  xDisplay.textContent = `X: ${x}`;
  yDisplay.textContent = `Y: ${y}`;
});

// Optional: Hide on mobile/touch devices
if ("ontouchstart" in window) {
  coordsDisplay.style.display = "none";
}
