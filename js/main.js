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

  // --- 4. Lightbox Modal Preview System ---
  const subjectImages = {
    arabic: [
      'images/arabic_0.png',
      'images/arabic_1.png',
      'images/arabic_2.jpg',
      'images/arabic_3.png',
      'images/arabic_4.png',
      'images/arabic_5.png'
    ],
    biology: [
      'images/biology_0.png',
      'images/biology_1.png',
      'images/biology_2.jpg',
      'images/biology_3.png',
      'images/biology_4.png',
      'images/biology_5.png'
    ],
    chemistry: [
      'images/chemistry_0.png',
      'images/chemistry_1.png',
      'images/chemistry_2.jpg',
      'images/chemistry_3.png',
      'images/chemistry_4.png',
      'images/chemistry_5.png',
      'images/chemistry_6.png',
      'images/chemistry_7.png'
    ],
    english: [
      'images/english_0.png',
      'images/english_1.png',
      'images/english_2.jpg',
      'images/english_3.png',
      'images/english_4.png',
      'images/english_5.png'
    ],
    math: [
      'images/math_0.png',
      'images/math_1.png',
      'images/math_2.jpg',
      'images/math_3.png',
      'images/math_4.png',
      'images/math_5.png'
    ],
    physics: [
      'images/physics_0.png',
      'images/physics_1.png',
      'images/physics_2.jpg',
      'images/physics_3.jpg',
      'images/physics_4.png',
      'images/physics_5.png',
      'images/physics_6.png'
    ]
  };

  const previewModal = document.getElementById('preview-modal');
  const modalTitle = document.getElementById('modal-subject-title');
  const modalGalleryBody = document.getElementById('modal-gallery-body');
  const modalOrderBtn = document.getElementById('modal-order-btn');
  const modalCloseBtn = document.getElementById('modal-close-btn');

  if (previewModal) {
    // Show modal function
    const showPreview = (subject, name, orderUrl) => {
      modalTitle.textContent = `معاينة ${name}`;
      modalOrderBtn.setAttribute('href', orderUrl);
      modalGalleryBody.innerHTML = '';
      
      if (subject === 'custom') {
        // Render custom design explanation
        modalGalleryBody.innerHTML = `
          <div style="text-align: center; padding: 2rem 1.5rem; background-color: var(--white); border: var(--border-width) solid var(--dark); border-radius: 16px; box-shadow: var(--neo-shadow-sm); max-width: 500px; margin: 0 auto;">
            <div style="font-size: 4.5rem; margin-bottom: 1.5rem;">🎨✨</div>
            <h3 style="font-size: 1.6rem; font-weight: 900; margin-bottom: 1rem; color: var(--primary);">كشكول بتصميمك الخاص!</h3>
            <p style="font-size: 1.1rem; font-weight: 700; color: var(--dark); line-height: 1.6; margin-bottom: 1.5rem;">
              تقدر تختار أي صورة، رسمة، أو تصميم بتحبه (زي غلاف فيلمك المفضل، اقتباس ملهم، أو صورة شخصية) واحنا هنطبعهولك على غلاف الكشكول بأعلى جودة!
            </p>
            <div style="border-top: 2px dashed var(--dark); padding-top: 1.5rem; font-weight: 800; text-align: right; font-size: 1.05rem; display: flex; flex-direction: column; gap: 0.75rem;">
              <div style="color: var(--secondary);">💡 خطوات الطلب:</div>
              <div style="font-weight: 600; color: #4b5563;">1. اضغط على زر الطلب بالأسفل لفتح محادثة الواتساب.</div>
              <div style="font-weight: 600; color: #4b5563;">2. ارسل لنا الصورة أو الفكرة التي تريد طباعتها.</div>
              <div style="font-weight: 600; color: #4b5563;">3. هنصمم الغلاف ونبعتلك معاينة ليه للموافقة عليه قبل ما نطبع ونشحن!</div>
            </div>
          </div>
        `;
      } else {
        const images = subjectImages[subject] || [];
        if (images.length === 0) {
          modalGalleryBody.innerHTML = '<p style="text-align: center; font-weight: 800; padding: 2rem;">لا توجد صور معاينة متاحة حالياً.</p>';
        } else {
          // Render images grid
          const galleryGrid = document.createElement('div');
          galleryGrid.className = 'modal-gallery';
          
          images.forEach((imgUrl, idx) => {
            const wrapper = document.createElement('div');
            wrapper.className = 'modal-gallery-img-wrapper';
            
            const img = document.createElement('img');
            img.className = 'modal-gallery-img';
            img.src = imgUrl;
            img.alt = `${name} - صفحة ${idx}`;
            img.loading = 'lazy';
            
            const label = document.createElement('div');
            label.className = 'modal-page-label';
            let labelText = '';
            if (idx === 0 || idx === 1) {
              labelText = 'الغلاف';
            } else {
              labelText = `صفحة ${idx - 1}`;
            }
            label.textContent = labelText;
            
            wrapper.appendChild(img);
            wrapper.appendChild(label);
            galleryGrid.appendChild(wrapper);
          });
          
          modalGalleryBody.appendChild(galleryGrid);
        }
      }
      
      previewModal.style.display = 'flex';
      document.body.classList.add('modal-open');
    };

    // Hide modal function
    const hidePreview = () => {
      previewModal.style.display = 'none';
      document.body.classList.remove('modal-open');
    };

    // Attach click events to product cards
    const productCards = document.querySelectorAll('.product-card');
    productCards.forEach(card => {
      card.addEventListener('click', (e) => {
        // Exclude order button clicks
        if (e.target.closest('a') || e.target.closest('button')) {
          return;
        }
        
        const subject = card.getAttribute('data-subject');
        if (subject) {
          const name = card.querySelector('.product-name').textContent;
          const orderUrl = card.querySelector('a').getAttribute('href');
          showPreview(subject, name, orderUrl);
        }
      });
    });

    // Close on button click
    modalCloseBtn.addEventListener('click', hidePreview);

    // Close on overlay background click
    previewModal.addEventListener('click', (e) => {
      if (e.target === previewModal) {
        hidePreview();
      }
    });

    // Close on Escape key press
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && previewModal.style.display === 'flex') {
        hidePreview();
      }
    });
  }

  // --- 5. Micro-Interaction: Random rotation for badge buttons on load ---
  const badges = document.querySelectorAll('.sticker-badge');
  badges.forEach(badge => {
    const randomRot = (Math.random() * 6 - 3).toFixed(1); // random between -3 and 3
    badge.style.transform = `rotate(${randomRot}deg)`;
  });
});
