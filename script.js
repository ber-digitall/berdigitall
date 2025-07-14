document.addEventListener('DOMContentLoaded', function() {
  // Mobile Menu Toggle
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const navMenu = document.getElementById('nav-menu');
  
  mobileMenuBtn.addEventListener('click', function() {
    this.classList.toggle('active');
    navMenu.classList.toggle('active');
    this.setAttribute('aria-expanded', this.classList.contains('active'));
  });

  // Close mobile menu when clicking on a link
  const navLinks = document.querySelectorAll('#nav-menu a');
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      mobileMenuBtn.classList.remove('active');
      navMenu.classList.remove('active');
      mobileMenuBtn.setAttribute('aria-expanded', 'false');
    });
  });

  // Background Icons Animation
  const backgroundIcons = document.getElementById('background-icons');
  const icons = ['fa-html5', 'fa-css3-alt', 'fa-js', 'fa-react', 'fa-node', 'fa-database', 
                 'fa-server', 'fa-code', 'fa-laptop-code', 'fa-microchip', 'fa-globe', 
                 'fa-cloud', 'fa-mobile-alt', 'fa-tablet-alt', 'fa-desktop'];
  
  for (let i = 0; i < 30; i++) {
    const icon = document.createElement('i');
    icon.className = `fab ${icons[Math.floor(Math.random() * icons.length)]}`;
    icon.style.left = `${Math.random() * 100}%`;
    icon.style.top = `${Math.random() * 100}%`;
    icon.style.animationDuration = `${10 + Math.random() * 20}s`;
    icon.style.animationDelay = `${Math.random() * 5}s`;
    backgroundIcons.appendChild(icon);
  }

  // Testimonial Carousel
  let currentSlide = 0;
  const slides = document.querySelectorAll('.testimonial-slide');
  const dots = document.querySelectorAll('.dot');
  
  function showSlide(n) {
    slides.forEach(slide => slide.classList.remove('active'));
    dots.forEach(dot => dot.classList.remove('active'));
    
    currentSlide = (n + slides.length) % slides.length;
    slides[currentSlide].classList.add('active');
    dots[currentSlide].classList.add('active');
  }
  
  dots.forEach((dot, index) => {
    dot.addEventListener('click', () => showSlide(index));
  });
  
  // Auto-rotate testimonials
  setInterval(() => {
    showSlide(currentSlide + 1);
  }, 5000);

  // Animate stats on scroll
  const stats = document.querySelectorAll('.stat-item');
  
  function animateValue(el, start, end, duration) {
    if (el.dataset.animated) return;
    el.dataset.animated = true;
    
    let startTimestamp = null;
    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      const value = Math.floor(progress * (end - start) + start);
      el.querySelector('.stat-number').textContent = value;
      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };
    window.requestAnimationFrame(step);
  }
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const statNumber = entry.target.querySelector('.stat-number');
        const target = parseInt(statNumber.textContent);
        animateValue(entry.target, 0, target, 1000);
      }
    });
  }, { threshold: 0.5 });
  
  stats.forEach(stat => observer.observe(stat));

  // Form validation
  const contactForm = document.getElementById('contactForm');
  const formFeedback = document.getElementById('formFeedback');
  
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Simple validation
      const name = document.getElementById('name');
      const email = document.getElementById('email');
      const message = document.getElementById('message');
      
      let isValid = true;
      
      if (name.value.length < 3) {
        isValid = false;
        name.style.borderColor = 'red';
      } else {
        name.style.borderColor = '';
      }
      
      if (!email.value.includes('@') || !email.value.includes('.')) {
        isValid = false;
        email.style.borderColor = 'red';
      } else {
        email.style.borderColor = '';
      }
      
      if (message.value.length < 10) {
        isValid = false;
        message.style.borderColor = 'red';
      } else {
        message.style.borderColor = '';
      }
      
      if (isValid) {
        formFeedback.textContent = 'Enviando mensagem...';
        formFeedback.style.display = 'block';
        formFeedback.style.color = 'var(--accent-color)';
        
        // Simulate form submission (in a real scenario, this would be an AJAX call)
        setTimeout(() => {
          formFeedback.textContent = 'Mensagem enviada com sucesso! Entraremos em contato em breve.';
          formFeedback.style.color = 'var(--accent-color)';
          contactForm.reset();
        }, 1500);
      } else {
        formFeedback.textContent = 'Por favor, preencha todos os campos corretamente.';
        formFeedback.style.display = 'block';
        formFeedback.style.color = 'red';
      }
    });
  }

  // Set current year in footer
  document.getElementById('currentYear').textContent = new Date().getFullYear();

  // Header scroll effect
  window.addEventListener('scroll', function() {
    const header = document.querySelector('header');
    if (window.scrollY > 50) {
      header.style.background = 'rgba(10, 10, 26, 0.9)';
      header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    } else {
      header.style.background = 'transparent';
      header.style.boxShadow = 'none';
    }
  });

  // Make current year dynamic
  document.getElementById('currentYear').textContent = new Date().getFullYear();
});

// Make testimonial carousel accessible globally
function currentSlide(n) {
  const slides = document.querySelectorAll('.testimonial-slide');
  const dots = document.querySelectorAll('.dot');
  
  slides.forEach(slide => slide.classList.remove('active'));
  dots.forEach(dot => dot.classList.remove('active'));
  
  slides[n - 1].classList.add('active');
  dots[n - 1].classList.add('active');
}