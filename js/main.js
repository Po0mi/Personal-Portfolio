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
      duration: 2,
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
      defaults: { ease: "smooth" },
    });

    // Animate title
    tl.to(
      aboutH1,
      {
        x: 0,
        opacity: 1,
        duration: 1,
      },
      0,
    )
      .to(
        aboutH2,
        {
          x: 0,
          opacity: 1,
          duration: 1,
        },
        0.15,
      )
      // Animate paragraph
      .to(
        aboutParagraph,
        {
          y: 0,
          opacity: 1,
          duration: 1.2,
        },
        0.4,
      )
      // Animate badges with stagger
      .to(
        badges,
        {
          scale: 1,
          opacity: 1,
          duration: 0.6,
          stagger: {
            amount: 0.8,
            from: "start",
            ease: "power2.out",
          },
        },
        0.8,
      );
  }
});

/////////////////////////////////////
//// PROJECT SECTION - VERTICAL SCROLL SNAP
/////////////////////////////////////
document.addEventListener("DOMContentLoaded", () => {
  const projectsSection = document.querySelector(".projects-section");
  const projectSlides = document.querySelectorAll(".project-slide");

  if (!projectsSection || projectSlides.length === 0) return;

  let currentSlide = 0;
  let isTransitioning = false;
  let isInProjectsSection = false;

  // Get section bounds
  function getSectionBounds() {
    const rect = projectsSection.getBoundingClientRect();
    return {
      top: rect.top + window.scrollY,
      bottom: rect.bottom + window.scrollY,
    };
  }

  // Check if in projects section
  function checkInSection() {
    const bounds = getSectionBounds();
    const scroll = window.scrollY;
    const viewportHeight = window.innerHeight;

    isInProjectsSection =
      scroll >= bounds.top - 50 &&
      scroll <= bounds.bottom - viewportHeight + 50;
  }

  // Animate slide transition
  function showSlide(index) {
    projectSlides.forEach((slide, i) => {
      if (i === index) {
        slide.classList.add("active");
        animateSlideIn(slide);
      } else {
        slide.classList.remove("active");
      }
    });
  }

  // Animate slide elements in
  function animateSlideIn(slide) {
    const number = slide.querySelector(".project-number");
    const plus = slide.querySelector(".project-plus");
    const title = slide.querySelector("h2");
    const desc = slide.querySelector("p");
    const link = slide.querySelector(".project-link");
    const media = slide.querySelector(".project-media");
    const img = slide.querySelector(".project-img");

    gsap.set([number, plus, title, desc, link], { opacity: 0, y: 30 });
    gsap.set(media, { opacity: 0, scale: 0.95 });
    gsap.set(img, { scale: 1.1 });

    const tl = gsap.timeline();

    tl.to(number, { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" })
      .to(
        plus,
        { opacity: 0.4, y: 0, duration: 0.6, ease: "power2.out" },
        "-=0.6",
      )
      .to(
        title,
        { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" },
        "-=0.5",
      )
      .to(
        desc,
        { opacity: 0.9, y: 0, duration: 0.8, ease: "power2.out" },
        "-=0.6",
      )
      .to(
        link,
        { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" },
        "-=0.5",
      )
      .to(
        media,
        { opacity: 1, scale: 1, duration: 1, ease: "power3.out" },
        "-=1",
      )
      .to(img, { scale: 1, duration: 1, ease: "power3.out" }, "-=1");
  }

  // Handle scroll within projects
  function handleProjectScroll(direction) {
    if (isTransitioning) return;

    const newIndex = currentSlide + direction;

    // If at bounds, allow normal scroll
    if (newIndex < 0 || newIndex >= projectSlides.length) {
      isInProjectsSection = false;
      return;
    }

    isTransitioning = true;
    currentSlide = newIndex;
    showSlide(currentSlide);

    // Calculate target scroll position
    const bounds = getSectionBounds();
    const slideHeight = window.innerHeight;
    const targetScroll = bounds.top + currentSlide * slideHeight;

    gsap.to(window, {
      duration: 1.2,
      scrollTo: targetScroll,
      ease: "power3.inOut",
      onComplete: () => {
        setTimeout(() => {
          isTransitioning = false;
        }, 300);
      },
    });
  }

  // Monitor scroll position
  let scrollTimeout;
  window.addEventListener("scroll", () => {
    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(() => {
      checkInSection();

      if (isInProjectsSection && !isTransitioning) {
        const bounds = getSectionBounds();
        const scroll = window.scrollY;
        const slideHeight = window.innerHeight;
        const relativeScroll = scroll - bounds.top;
        const calculatedSlide = Math.round(relativeScroll / slideHeight);

        if (
          calculatedSlide !== currentSlide &&
          calculatedSlide >= 0 &&
          calculatedSlide < projectSlides.length
        ) {
          currentSlide = calculatedSlide;
          showSlide(currentSlide);
        }
      }
    }, 50);
  });

  // Initial setup
  showSlide(0);
  checkInSection();
});
