document.addEventListener('DOMContentLoaded', function() {
    // Menu mobile
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const navMenu = document.getElementById('nav-menu');
    
    mobileMenuBtn.addEventListener('click', function() {
        this.classList.toggle('active');
        navMenu.classList.toggle('active');
        const isExpanded = this.getAttribute('aria-expanded') === 'true';
        this.setAttribute('aria-expanded', !isExpanded);
    });
    
    // Fechar menu ao clicar em um link
    const navLinks = document.querySelectorAll('#nav-menu a');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenuBtn.classList.remove('active');
            navMenu.classList.remove('active');
            mobileMenuBtn.setAttribute('aria-expanded', 'false');
        });
    });
    
    // Atualizar ano no footer
    const currentYear = new Date().getFullYear();
    document.getElementById('currentYear').textContent = currentYear;
    
    // Carrossel de depoimentos
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
    
    function nextSlide() {
        showSlide(currentSlide + 1);
    }
    
    // Configurar os dots para navegação
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            showSlide(index);
        });
    });
    
    // Iniciar carrossel automático
    let slideInterval = setInterval(nextSlide, 5000);
    
    // Pausar carrossel quando o mouse estiver sobre ele
    const carousel = document.querySelector('.testimonial-carousel');
    carousel.addEventListener('mouseenter', () => {
        clearInterval(slideInterval);
    });
    
    carousel.addEventListener('mouseleave', () => {
        slideInterval = setInterval(nextSlide, 5000);
    });
    
    // Efeito de scroll suave para links internos
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerHeight = document.querySelector('header').offsetHeight;
                const targetPosition = targetElement.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Efeito de aparecer elementos ao rolar
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.portfolio-item, .timeline-item, .stat-item');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.2;
            
            if (elementPosition < screenPosition) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    };
    
    // Configurar opacidade inicial para elementos animados
    document.querySelectorAll('.portfolio-item, .timeline-item, .stat-item').forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });
    
    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll(); // Executar uma vez ao carregar
    
    // Formulário de contato
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const submitBtn = document.getElementById('submitBtn');
            const formFeedback = document.getElementById('formFeedback');
            
            submitBtn.disabled = true;
            submitBtn.textContent = 'Enviando...';
            
            // Simular envio (substituir por AJAX real)
            setTimeout(() => {
                formFeedback.textContent = 'Mensagem enviada com sucesso! Entraremos em contato em breve.';
                formFeedback.style.display = 'block';
                formFeedback.style.backgroundColor = 'rgba(0, 247, 255, 0.1)';
                formFeedback.style.color = 'var(--primary-color)';
                formFeedback.style.border = '1px solid var(--primary-color)';
                
                submitBtn.disabled = false;
                submitBtn.textContent = 'Enviar Mensagem';
                
                // Limpar formulário
                contactForm.reset();
                
                // Esconder feedback após alguns segundos
                setTimeout(() => {
                    formFeedback.style.display = 'none';
                }, 5000);
            }, 1500);
        });
    }
    
    // Criar ícones de fundo
    const backgroundIcons = document.getElementById('background-icons');
    if (backgroundIcons) {
        const icons = ['💻', '🌐', '🚀', '📱', '🔌', '📊', '🔗', '⚡'];
        const colors = ['#00f7ff', '#ff00f7', '#f7ff00', '#00ff7f', '#7f00ff'];
        
        for (let i = 0; i < 30; i++) {
            const icon = document.createElement('div');
            icon.textContent = icons[Math.floor(Math.random() * icons.length)];
            icon.style.position = 'absolute';
            icon.style.left = `${Math.random() * 100}%`;
            icon.style.top = `${Math.random() * 100}%`;
            icon.style.fontSize = `${Math.random() * 20 + 10}px`;
            icon.style.opacity = '0.1';
            icon.style.color = colors[Math.floor(Math.random() * colors.length)];
            icon.style.animation = `float ${Math.random() * 5 + 3}s infinite ease-in-out`;
            icon.style.animationDelay = `${Math.random() * 5}s`;
            icon.style.pointerEvents = 'none';
            icon.style.userSelect = 'none';
            
            backgroundIcons.appendChild(icon);
        }
    }
    
    // Efeito de mudança de cor no header ao rolar
    window.addEventListener('scroll', function() {
        const header = document.querySelector('header');
        if (window.scrollY > 50) {
            header.style.backgroundColor = 'rgba(5, 5, 16, 0.95)';
            header.style.boxShadow = '0 5px 20px rgba(0, 247, 255, 0.1)';
        } else {
            header.style.backgroundColor = 'rgba(10, 10, 26, 0.8)';
            header.style.boxShadow = 'none';
        }
    });
});

// Formulário de contato - versão corrigida
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        const submitBtn = document.getElementById('submitBtn');
        const formFeedback = document.getElementById('formFeedback');
        
        submitBtn.disabled = true;
        submitBtn.textContent = 'Enviando...';
        
        try {
            const formData = new FormData(contactForm);
            const response = await fetch(contactForm.action, {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            });
            
            if (response.ok) {
                formFeedback.textContent = 'Mensagem enviada com sucesso!';
                formFeedback.style.display = 'block';
                formFeedback.style.backgroundColor = 'rgba(0, 247, 255, 0.1)';
                formFeedback.style.color = 'var(--primary-color)';
                contactForm.reset();
                
                // Redirecionar para a página de obrigado se configurado
                const nextPage = contactForm.querySelector('input[name="_next"]').value;
                if (nextPage) {
                    window.location.href = nextPage;
                }
            } else {
                throw new Error('Falha no envio');
            }
        } catch (error) {
            formFeedback.textContent = 'Erro ao enviar mensagem. Por favor, tente novamente mais tarde ou entre em contato diretamente por WhatsApp.';
            formFeedback.style.display = 'block';
            formFeedback.style.backgroundColor = 'rgba(255, 0, 0, 0.1)';
            formFeedback.style.color = 'var(--secondary-color)';
        } finally {
            submitBtn.disabled = false;
            submitBtn.textContent = 'Enviar Mensagem';
            
            setTimeout(() => {
                formFeedback.style.display = 'none';
            }, 5000);
        }
    });
}

// Teste no console do navegador
fetch('https://formsubmit.co/ajax/ber.digitall@gmail.com', {
    method: 'POST',
    body: JSON.stringify({name: "Teste", message: "Isso é um teste"}),
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    }
})
.then(response => response.json())
.then(data => console.log(data))
.catch(error => console.error(error));