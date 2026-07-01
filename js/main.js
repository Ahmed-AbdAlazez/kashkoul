document.addEventListener('DOMContentLoaded', () => {
  // --- 1. Smooth Scrolling for Navigation ---
  const scrollBtns = document.querySelectorAll('a[href^="#"]');
  scrollBtns.forEach(btn => {
    btn.addEventListener('click', function(e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      const targetElement = document.querySelector(targetId);
      
      if (targetElement) {
        // Offset for sticky header
        const headerOffset = 90;
        const elementPosition = targetElement.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
        
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    });
  });

  // --- 2. Scroll Reveal Animations (Intersection Observer) ---
  const reveals = document.querySelectorAll('.reveal');
  
  const revealOnScroll = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        // Unobserve once revealed
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
  });

  reveals.forEach(element => {
    revealOnScroll.observe(element);
  });

  // --- 3. Playful Interactive Tilt Effect for Gallery/Pricing/Product Cards ---
  const interactiveCards = document.querySelectorAll('.pricing-card, .product-card');
  
  interactiveCards.forEach(card => {
    const placeholder = card.querySelector('.empty-circle-placeholder, .empty-square-placeholder, .product-img-wrapper');
    
    if (!placeholder) return;
    
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left; // x position within element
      const y = e.clientY - rect.top;  // y position within element
      
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      // Calculate rotation angles (max 6 degrees tilt)
      const rotateX = ((centerY - y) / centerY) * 6;
      const rotateY = ((x - centerX) / centerX) * 6;
      
      // Apply transforms
      placeholder.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.04) translate(-4px, -4px)`;
      placeholder.style.boxShadow = `8px 8px 0px var(--dark)`;
    });
    
    card.addEventListener('mouseleave', () => {
      placeholder.style.transform = '';
      placeholder.style.boxShadow = '';
    });

    card.addEventListener('click', (e) => {
      // If clicked element or parent is a button or link, do not open details page
      if (e.target.closest('a') || e.target.closest('button')) {
        return;
      }
      const url = card.getAttribute('data-url');
      if (url) {
        window.location.href = url;
      }
    });
  });

  // --- 4. Micro-Interaction: Random rotation for badge buttons on load ---
  const badges = document.querySelectorAll('.sticker-badge');
  badges.forEach(badge => {
    const randomRot = (Math.random() * 6 - 3).toFixed(1); // random between -3 and 3
    badge.style.transform = `rotate(${randomRot}deg)`;
  });
});
