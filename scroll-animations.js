// Scroll-triggered animations using GSAP ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

document.addEventListener('DOMContentLoaded', () => {
  // Fade in animation for sections
  const animateOnScroll = (selector, animationConfig = {}) => {
    const defaultConfig = {
      opacity: 0,
      y: 60,
      duration: 0.8,
      ease: 'power2.out',
      ...animationConfig
    };

    gsap.from(selector, {
      ...defaultConfig,
      scrollTrigger: {
        trigger: selector,
        start: 'top 85%',
        end: 'top 60%',
        toggleActions: 'play none none none',
      }
    });
  };

  // Animate section titles
  const sectionTitles = document.querySelectorAll('.section-title');
  sectionTitles.forEach((title) => {
    animateOnScroll(title, {
      opacity: 0,
      y: 40,
      duration: 0.6
    });
  });

  // Animate section descriptions
  const sectionDescriptions = document.querySelectorAll('.section-description, .section-subtitle');
  sectionDescriptions.forEach((desc) => {
    animateOnScroll(desc, {
      opacity: 0,
      y: 30,
      duration: 0.7,
      delay: 0.1
    });
  });

  // Animate service cards
  const serviceCards = document.querySelectorAll('.service-card');
  serviceCards.forEach((card, index) => {
    gsap.from(card, {
      opacity: 0,
      y: 80,
      duration: 0.8,
      delay: index * 0.15,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: card,
        start: 'top 90%',
        end: 'top 60%',
        toggleActions: 'play none none none',
      }
    });
  });

  // Animate subject cards
  const subjectCards = document.querySelectorAll('.subject-card');
  subjectCards.forEach((card, index) => {
    gsap.from(card, {
      opacity: 0,
      scale: 0.9,
      y: 60,
      duration: 0.7,
      delay: index * 0.1,
      ease: 'back.out(1.2)',
      scrollTrigger: {
        trigger: card,
        start: 'top 90%',
        end: 'top 60%',
        toggleActions: 'play none none none',
      }
    });
  });

  // Animate achievement cards
  const achievementCards = document.querySelectorAll('.achievement-card');
  achievementCards.forEach((card, index) => {
    gsap.from(card, {
      opacity: 0,
      x: index % 2 === 0 ? -60 : 60,
      duration: 0.8,
      delay: index * 0.15,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: card,
        start: 'top 85%',
        end: 'top 60%',
        toggleActions: 'play none none none',
      }
    });
  });

  // Animate info cards
  const infoCards = document.querySelectorAll('.info-card');
  infoCards.forEach((card, index) => {
    gsap.from(card, {
      opacity: 0,
      y: 50,
      duration: 0.7,
      delay: index * 0.12,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: card,
        start: 'top 90%',
        end: 'top 60%',
        toggleActions: 'play none none none',
      }
    });
  });

  // Animate form container
  const formContainer = document.querySelector('.appointment-form-container');
  if (formContainer) {
    gsap.from(formContainer, {
      opacity: 0,
      x: -80,
      duration: 1,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: formContainer,
        start: 'top 85%',
        end: 'top 55%',
        toggleActions: 'play none none none',
      }
    });
  }

  // Animate hero section content
  const heroText = document.querySelector('.hero-text');
  const heroVisual = document.querySelector('.hero-visual');

  if (heroText) {
    gsap.from(heroText, {
      opacity: 0,
      x: -60,
      duration: 1.2,
      delay: 0.3,
      ease: 'power3.out'
    });
  }

  if (heroVisual) {
    gsap.from(heroVisual, {
      opacity: 0,
      x: 60,
      duration: 1.2,
      delay: 0.5,
      ease: 'power3.out'
    });
  }

  // Parallax effect for sections
  const sections = document.querySelectorAll('.hero-section, .services-section, .subjects-section, .appointment-section');
  sections.forEach((section) => {
    gsap.to(section, {
      y: -50,
      ease: 'none',
      scrollTrigger: {
        trigger: section,
        start: 'top bottom',
        end: 'bottom top',
        scrub: 1
      }
    });
  });
});
