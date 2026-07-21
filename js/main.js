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
    ],
    history: [
      'h1.png',
      'h2.png',
      'h3.jpeg',
      'h4.png',
      'h5.png',
      'h6.png'
    ],
    programming: [
      'p1.png',
      'p2.png',
      'p3.jpeg',
      'p4.png',
      'p5.png',
      'p6.png'
    ],
    french: [
      'images/french_0.png',
      'images/french_1.png',
      'images/french_2.png',
      'images/french_3.png',
      'images/french_4.png'
    ],
    psychology: [
      'images/psychology_0.png',
      'images/psychology_1.png',
      'images/psychology_2.png',
      'images/psychology_3.png',
      'images/psychology_4.png'
    ],
    geography: [
      'images/geography_0.png',
      'images/geography_1.png',
      'images/geography_2.png',
      'images/geography_3.png',
      'images/geography_4.png'
    ],
    statistics: [
      'images/statistics_0.png',
      'images/statistics_1.png',
      'images/statistics_2.png',
      'images/statistics_3.png',
      'images/statistics_4.png'
    ],
    economics: [
      'images/economics_0.png',
      'images/economics_1.png',
      'images/economics_2.png',
      'images/economics_3.png',
      'images/economics_4.png'
    ],
    todo_list: [
      'supplies/غلاف التودوليست.png',
      'supplies/ورقة التودوليست.png'
    ],
    evaluation_book: [
      'supplies/tips غلاف.png',
      'supplies/tips نصيحة.png',
      'supplies/tips ورقتين جنب بعض.png',
      'supplies/tips. تقييم.png'
    ],
    glitter_highlighter: [
      'supplies/ماركر جليتر.png'
    ],
    mechanical_pencil: [
      'supplies/قلم رصاص سنون.png'
    ],
    sticky_notes: [
      'supplies/ستيكي نوت.png'
    ],
    bookmarks: [
      'supplies/فواصل.png'
    ],
    stickers: [
      'supplies/ستيكر.png'
    ],
    full_box: [
      'supplies/كله.png'
    ]
  };

  const allNotebooks = [
    { subject: 'arabic', name: 'كشكول اللغة العربية', cover: 'images/arabic_0.png' },
    { subject: 'english', name: 'كشكول اللغة الإنجليزية', cover: 'images/english_0.png' },
    { subject: 'physics', name: 'كشكول الفيزياء', cover: 'images/physics_0.png' },
    { subject: 'chemistry', name: 'كشكول الكيمياء', cover: 'images/chemistry_0.png' },
    { subject: 'biology', name: 'كشكول الأحياء', cover: 'images/biology_0.png' },
    { subject: 'math', name: 'كشكول الرياضيات', cover: 'images/math_0.png' },
    { subject: 'history', name: 'كشكول التاريخ', cover: 'h1.png' },
    { subject: 'programming', name: 'كشكول البرمجة', cover: 'p1.png' },
    { subject: 'french', name: 'كشكول الفرنساوي', cover: 'images/french_0.png' },
    { subject: 'psychology', name: 'كشكول علم النفس', cover: 'images/psychology_0.png' },
    { subject: 'geography', name: 'كشكول الجغرافيا', cover: 'images/geography_0.png' },
    { subject: 'statistics', name: 'كشكول الإحصاء', cover: 'images/statistics_0.png' },
    { subject: 'economics', name: 'كشكول الاقتصاد', cover: 'images/economics_0.png' }
  ];

  const boxNotebooks = {
    thanawya: allNotebooks,
    baccalaureate: allNotebooks
  };

  const previewModal = document.getElementById('preview-modal');
  const modalTitle = document.getElementById('modal-subject-title');
  const modalGalleryBody = document.getElementById('modal-gallery-body');
  const modalOrderBtn = document.getElementById('modal-order-btn');
  const modalCloseBtn = document.getElementById('modal-close-btn');

  if (previewModal) {
    // Show box preview containing all notebook covers
    const showBoxPreview = (boxType) => {
      const boxName = boxType === 'thanawya' ? 'بوكس الثانوية العامة' : 'بوكس الباكالوريا';
      modalTitle.textContent = `مكونات ${boxName}`;
      
      const orderUrls = {
        thanawya: 'https://wa.me/201065506337?text=%D8%B9%D8%A7%D9%8A%D8%B2%20%D8%A3%D8%B7%D9%84%D8%A8%20%D8%A8%D9%88%D9%83%D8%B3%20%D8%A7%D9%84%D8%AB%D8%A7%D9%86%D9%88%D9%8A%D8%A9%20%D8%A7%D9%84%D8%B9%D8%A7%D9%85%D8%A9%20%D8%A8%D9%80%20500%20%D8%AC%D9%86%D9%8A%D9%87',
        baccalaureate: 'https://wa.me/201065506337?text=%D8%B9%D8%A7%D9%8A%D8%B2%20%D8%A3%D8%B7%D9%84%D8%A8%20%D8%A8%D9%88%D9%83%D8%B3%20%D8%A7%D9%84%D8%A8%D8%A7%D9%83%D8%A7%D9%84%D9%88%D8%B1%D9%8A%D8%A7%20%D8%A8%D9%80%20400%20%D8%AC%D9%86%D9%8A%D9%87'
      };
      modalOrderBtn.setAttribute('href', orderUrls[boxType]);
      modalGalleryBody.innerHTML = '';
      
      const notebooks = boxNotebooks[boxType] || [];
      const boxGrid = document.createElement('div');
      boxGrid.className = 'modal-gallery';
      
      notebooks.forEach(notebook => {
        const card = document.createElement('div');
        card.className = 'modal-gallery-img-wrapper';
        card.style.cursor = 'pointer';
        
        const img = document.createElement('img');
        img.className = 'modal-gallery-img';
        img.src = notebook.cover;
        img.alt = notebook.name;
        
        const label = document.createElement('div');
        label.className = 'modal-page-label';
        label.textContent = notebook.name;
        label.style.width = 'calc(100% - 20px)';
        label.style.textAlign = 'center';
        label.style.fontSize = '0.85rem';
        label.style.fontWeight = '800';
        
        card.appendChild(img);
        card.appendChild(label);
        
        card.addEventListener('click', () => {
          showNotebookFromBox(notebook.subject, notebook.name, boxType);
        });
        
        boxGrid.appendChild(card);
      });
      
      modalGalleryBody.appendChild(boxGrid);
      previewModal.style.display = 'flex';
      document.body.classList.add('modal-open');
    };

    // Show single notebook from box view with back button
    const showNotebookFromBox = (subject, name, boxType) => {
      modalTitle.textContent = `معاينة ${name}`;
      modalGalleryBody.innerHTML = '';
      
      const backBtnWrapper = document.createElement('div');
      backBtnWrapper.style.marginBottom = '1.5rem';
      backBtnWrapper.style.textAlign = 'right';
      
      const backBtn = document.createElement('button');
      backBtn.className = 'neo-btn';
      backBtn.style.padding = '0.4rem 1.25rem';
      backBtn.style.fontSize = '0.9rem';
      backBtn.style.backgroundColor = 'var(--secondary)';
      backBtn.innerHTML = `<span>← العودة لبوكس الكشاكيل</span>`;
      backBtn.addEventListener('click', () => {
        showBoxPreview(boxType);
      });
      
      backBtnWrapper.appendChild(backBtn);
      modalGalleryBody.appendChild(backBtnWrapper);
      
      const images = subjectImages[subject] || [];
      if (images.length === 0) {
        const msg = document.createElement('p');
        msg.style.textAlign = 'center';
        msg.style.fontWeight = '800';
        msg.style.padding = '2rem';
        msg.textContent = 'لا توجد صور معاينة متاحة حالياً.';
        modalGalleryBody.appendChild(msg);
      } else {
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
          if (subject === 'history' || subject === 'programming') {
            if (idx === 0 || idx === 1) {
              labelText = 'الغلاف';
            } else {
              labelText = `ورقة ${idx - 1}`;
            }
          } else {
            if (idx === 0 || idx === 1) {
              labelText = 'الغلاف';
            } else {
              labelText = `صفحة ${idx - 1}`;
            }
          }
          label.textContent = labelText;
          
          wrapper.appendChild(img);
          wrapper.appendChild(label);
          galleryGrid.appendChild(wrapper);
        });
        
        modalGalleryBody.appendChild(galleryGrid);
      }
    };

    // Show standard preview function
    const showPreview = (subject, name, orderUrl) => {
      modalTitle.textContent = `معاينة ${name}`;
      modalOrderBtn.setAttribute('href', orderUrl);
      modalGalleryBody.innerHTML = '';
      
      if (subject === 'custom') {
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
            if (subject === 'full_box') {
              labelText = 'بوكس المستلزمات الكامل';
            } else if (subject === 'todo_list') {
              if (idx === 0) labelText = 'الغلاف';
              else labelText = 'صفحة المهام';
            } else if (subject === 'evaluation_book') {
              if (idx === 0) labelText = 'الغلاف';
              else if (idx === 1) labelText = 'نصيحة أسبوعية';
              else if (idx === 2) labelText = 'صفحتين متقابلتين';
              else labelText = 'تقييم الأسبوع';
            } else if (subject === 'glitter_highlighter') {
              labelText = 'هايلايتر جليتر';
            } else if (subject === 'mechanical_pencil') {
              labelText = 'قلم رصاص سنون';
            } else if (subject === 'sticky_notes') {
              labelText = 'ستيكي نوت';
            } else if (subject === 'bookmarks') {
              labelText = 'فواصل كتب';
            } else if (subject === 'stickers') {
              labelText = 'ستيكرات';
            } else if (subject === 'history' || subject === 'programming') {
              if (idx === 0 || idx === 1) {
                labelText = 'الغلاف';
              } else {
                labelText = `ورقة ${idx - 1}`;
              }
            } else {
              if (idx === 0 || idx === 1) {
                labelText = 'الغلاف';
              } else {
                labelText = `صفحة ${idx - 1}`;
              }
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

    // Attach click events to package preview buttons
    const previewBoxBtns = document.querySelectorAll('.preview-box-btn');
    previewBoxBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation(); // prevent card redirection
        const boxType = btn.getAttribute('data-box-type');
        if (boxType) {
          showBoxPreview(boxType);
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
