document.addEventListener('DOMContentLoaded', () => {

    // ======================================================
    // 1. PROTEÇÃO DE IMAGENS (Não baixar logos/fotos)
    // ======================================================
    document.addEventListener('contextmenu', (e) => {
        if (e.target.tagName === 'IMG') {
            e.preventDefault(); // Bloqueia botão direito em imagens
        }
    });

    document.addEventListener('dragstart', (e) => {
        if (e.target.tagName === 'IMG') {
            e.preventDefault(); // Bloqueia arrastar imagens
        }
    });

    // ======================================================
    // 2. MENU MOBILE & NAVEGAÇÃO
    // ======================================================
    const mobileBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    const links = document.querySelectorAll('.nav-links li');

    if (mobileBtn) {
        mobileBtn.addEventListener('click', () => {
            navLinks.classList.toggle('active');

            // Animação dos Links
            links.forEach((link, index) => {
                if (link.style.animation) {
                    link.style.animation = '';
                } else {
                    link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
                }
            });

            // Animação do Ícone Hamburguer
            mobileBtn.classList.toggle('toggle');
        });
    }

    // Scroll Suave
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            if (navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                mobileBtn.classList.remove('toggle'); // Garante que o ícone volte ao normal
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

    // Efeito da Navbar ao rolar
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.style.backgroundColor = 'rgba(10, 10, 10, 1)'; // Cor sólida (Dark Mode)
            navbar.style.padding = '10px 0';
            navbar.style.boxShadow = '0 2px 10px rgba(0,0,0,0.5)';
        } else {
            navbar.style.backgroundColor = 'rgba(10, 10, 10, 0.95)';
            navbar.style.padding = '15px 0';
            navbar.style.boxShadow = 'none';
        }
    });

    // ======================================================
    // 3. ANIMAÇÕES DE SCROLL (Fade In)
    // ======================================================
    const observerOptions = { threshold: 0.1 };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animationPlayState = 'running';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Elementos que devem aparecer ao rolar
    const revealElements = document.querySelectorAll('.service-card, .about-text, .about-image, .hero-content, .section-header');

    // Adiciona classe para disparar animação CSS (caso use classes .visible)
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                revealObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    revealElements.forEach(el => {
        // revealObserver.observe(el); // Opcional: Ative se usar CSS de reveal
    });

    // ======================================================
    // 4. CURSOR PERSONALIZADO (Apenas Desktop)
    // ======================================================

    // Verifica se o dispositivo tem suporte a mouse (hover) e ponteiro fino.
    // Isso exclui celulares e tablets da lógica do cursor.
    const isDesktop = window.matchMedia("(hover: hover) and (pointer: fine)").matches;

    if (isDesktop) {
        const cursor = document.createElement('img');
        cursor.id = 'custom-cursor';

        // Lógica de Caminho da Imagem (Root vs Subpasta)
        const cssLink = document.querySelector('link[rel="stylesheet"][href*="src/css/styles.css"]');
        let pathPrefix = '';

        if (cssLink) {
            const href = cssLink.getAttribute('href');
            if (href.includes('../')) {
                pathPrefix = '../';
            }
        }

        cursor.src = `${pathPrefix}src/cursor/cursor.png`;
        cursor.alt = 'Cursor';

        // Estilos do Cursor
        Object.assign(cursor.style, {
            width: '75px',
            height: 'auto',
            position: 'fixed',
            pointerEvents: 'none',
            zIndex: '99999',
            transform: 'translate(-50%, -50%)',
            transition: 'transform 0.15s ease-out', // Um pouco mais suave
            left: '-100px', // Começa fora da tela
            top: '-100px',
            display: 'block'
        });

        document.body.appendChild(cursor);

        // Esconde o cursor padrão SOMENTE se for desktop
        const style = document.createElement('style');
        style.innerHTML = `
            body, a, button, .btn, img { cursor: none !important; }
            input, textarea { cursor: text !important; }
        `;
        document.head.appendChild(style);

        // Movimento
        document.addEventListener('mousemove', (e) => {
            cursor.style.left = `${e.clientX}px`;
            cursor.style.top = `${e.clientY}px`;
        });

        // Efeito de Hover (Crescer)
        const clickables = document.querySelectorAll('a, button, .btn, input, textarea, .service-card');
        clickables.forEach(el => {
            el.addEventListener('mouseenter', () => {
                cursor.style.transform = 'translate(-50%, -50%) scale(1.5)';
                cursor.style.filter = 'drop-shadow(0 0 5px rgba(255,0,0,0.5))'; // Brilho sutil vermelho
            });
            el.addEventListener('mouseleave', () => {
                cursor.style.transform = 'translate(-50%, -50%) scale(1)';
                cursor.style.filter = 'none';
            });
        });

        // Garante que ao sair da janela o cursor suma (opcional)
        document.addEventListener('mouseout', (e) => {
            if (!e.relatedTarget && !e.toElement) {
                cursor.style.opacity = '0';
            }
        });
        document.addEventListener('mouseover', () => {
            cursor.style.opacity = '1';
        });
    }
});
