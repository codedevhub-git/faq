/* ============================================
   CODEDEVHUB FAQ — JAVASCRIPT
   Bilingual toggle + smooth interactions
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

  // ===== LANGUAGE TOGGLE =====
  const langOptions = document.querySelectorAll('.lang-option');
  let currentLang = 'en';

  langOptions.forEach(option => {
    option.addEventListener('click', () => {
      const lang = option.dataset.lang;
      if (lang === currentLang) return;

      currentLang = lang;

      // Update active state on toggle buttons
      langOptions.forEach(opt => opt.classList.remove('active'));
      option.classList.add('active');

      // Update all i18n elements
      document.querySelectorAll('.i18n').forEach(el => {
        const text = el.dataset[lang];
        if (text) el.textContent = text;
      });

      // Update HTML lang attribute
      document.documentElement.setAttribute('lang', lang);
    });
  });

  // ===== NAVBAR SCROLL EFFECT =====
  const navbar = document.querySelector('.navbar');
  let lastScroll = 0;

  window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll > 40) {
      navbar.style.background = 'rgba(255, 255, 255, 0.95)';
      navbar.style.boxShadow = '0 2px 12px rgba(0, 0, 0, 0.08)';
    } else {
      navbar.style.background = 'rgba(255, 255, 255, 0.88)';
      navbar.style.boxShadow = 'none';
    }

    lastScroll = currentScroll;
  });

  // ===== SMOOTH REVEAL ON SCROLL =====
  const observerOptions = {
    threshold: 0.12,
    rootMargin: '0px 0px -30px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, observerOptions);

  // Observe all faq-cards
  document.querySelectorAll('.faq-card').forEach((card, index) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(18px)';
    card.style.transition = `opacity 0.55s ease ${index % 3 * 0.1}s, transform 0.55s ease ${index % 3 * 0.1}s`;
    observer.observe(card);
  });

  // Observe section labels
  document.querySelectorAll('.section-label').forEach((label) => {
    label.style.opacity = '0';
    label.style.transform = 'translateX(-16px)';
    label.style.transition = 'opacity 0.45s ease, transform 0.45s ease';
    observer.observe(label);
  });

  // ===== CONTACT CARDS HOVER SOUND EFFECT (subtle) =====
  // Just a nice little hover scale on contact cards
  document.querySelectorAll('.contact-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
      card.style.transition = 'border-color 0.2s, transform 0.2s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.2s';
    });
  });

  // ===== SMOOTH ANCHOR SCROLL =====
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      e.preventDefault();
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // ===== HERO SUBTLE PARALLAX =====
  const heroGrid = document.querySelector('.hero-bg-grid');

  window.addEventListener('scroll', () => {
    if (heroGrid) {
      const scrolled = window.pageYOffset;
      heroGrid.style.transform = `translateY(${scrolled * 0.3}px)`;
    }
  });

});