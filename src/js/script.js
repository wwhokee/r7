document.addEventListener('DOMContentLoaded', () => {
    // Mobile Menu Toggle
    const mobileBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    const links = document.querySelectorAll('.nav-links li');

    if (mobileBtn) {
        mobileBtn.addEventListener('click', () => {
            navLinks.classList.toggle('active');

            // Animate Links
            links.forEach((link, index) => {
                if (link.style.animation) {
                    link.style.animation = '';
                } else {
                    link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
                }
            });

            // Burger Animation
            mobileBtn.classList.toggle('toggle');
        });
    }

    // Smooth Scrolling for Anchor Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            // Close mobile menu if open
            if (navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
            }

            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerOffset = 80;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth"
                });
            }
        });
    });

    // Navbar Scroll Effect
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.style.backgroundColor = 'rgba(17, 17, 17, 1)';
            navbar.style.padding = '10px 0';
        } else {
            navbar.style.backgroundColor = 'rgba(17, 17, 17, 0.95)';
            navbar.style.padding = '15px 0';
        }
    });

    // Intersection Observer for Scroll Animations
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animationPlayState = 'running';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Reveal on scroll for elements
    const revealElements = document.querySelectorAll('.service-card, .about-text, .about-image');

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                revealObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    revealElements.forEach(el => {
        // revealObserver.observe(el); // Ative se tiver CSS para .revealed
    });

    // ==========================================
    //  NOVO CÓDIGO: CURSOR PERSONALIZADO
    // ==========================================

    const cursor = document.createElement('img');
    cursor.id = 'custom-cursor';

    // 1. Lógica inteligente para achar o caminho da imagem (Root vs Subpasta)
    // Verifica como o CSS foi importado para saber se precisa de "../"
    const cssLink = document.querySelector('link[rel="stylesheet"][href*="src/css/styles.css"]');
    let pathPrefix = '';

    if (cssLink) {
        const href = cssLink.getAttribute('href');
        if (href.includes('../')) {
            pathPrefix = '../';
        }
    }

    // Define o caminho e atributos da imagem
    cursor.src = `${pathPrefix}src/cursor/cursor.png`;
    cursor.alt = 'Cursor';

    // 2. Estilização via JS para garantir tamanho pequeno e sem erros
    Object.assign(cursor.style, {
        width: '70px',       // Tamanho pequeno e ajustado
        height: 'auto',
        position: 'fixed',
        pointerEvents: 'none', // Permite clicar através da imagem
        zIndex: '99999',       // Fica acima de tudo
        transform: 'translate(-50%, -50%)', // Centraliza na ponta do mouse
        transition: 'transform 0.1s ease',  // Suavidade leve
        left: '0px',
        top: '0px',
        display: 'none' // Escondido até o mouse mover
    });

    document.body.appendChild(cursor);

    // 3. CSS Injetado para esconder o cursor padrão original
    const style = document.createElement('style');
    style.innerHTML = `
        body, a, button, .btn { cursor: none !important; }
        /* Mantém o cursor de texto padrão em inputs para facilitar digitação */
        input, textarea { cursor: text !important; }
    `;
    document.head.appendChild(style);

    // 4. Faz a imagem seguir o mouse
    document.addEventListener('mousemove', (e) => {
        cursor.style.display = 'block';
        cursor.style.left = `${e.clientX}px`;
        cursor.style.top = `${e.clientY}px`;
    });

    // 5. Efeito extra: Aumentar um pouco ao passar em links/botões
    const clickables = document.querySelectorAll('a, button, .btn, input, textarea');
    clickables.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.style.transform = 'translate(-50%, -50%) scale(1.3)';
        });
        el.addEventListener('mouseleave', () => {
            cursor.style.transform = 'translate(-50%, -50%) scale(1)';
        });
    });
});