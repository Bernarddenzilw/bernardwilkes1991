// ============================================
// LUXURIOUS PERSONAL WEBSITE - INTERACTIVE ELEMENTS
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    // Smooth scroll for navigation links
    const navLinks = document.querySelectorAll('.nav-links a, .cta-button, .footer-links a');
    
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            if (href.startsWith('#')) {
                e.preventDefault();
                const targetId = href.substring(1);
                const targetElement = document.getElementById(targetId);
                
                if (targetElement) {
                    const offsetTop = targetElement.offsetTop - 80;
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // Navbar scroll effect
    const navbar = document.querySelector('.navbar');
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;

        if (currentScroll > 100) {
            navbar.style.padding = '15px 0';
            navbar.style.background = 'rgba(10, 20, 40, 0.98)';
            navbar.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.3)';
        } else {
            navbar.style.padding = '20px 0';
            navbar.style.background = 'rgba(10, 20, 40, 0.95)';
            navbar.style.boxShadow = 'none';
        }

        lastScroll = currentScroll;
    });

    // Intersection Observer for fade-in animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe all cards and sections
    const animatedElements = document.querySelectorAll(
        '.music-card, .book-card, .invention-card, .social-card, .stat-item'
    );

    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    // Parallax effect for hero section
    const hero = document.querySelector('.hero');
    if (hero) {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const parallaxSpeed = 0.5;
            hero.style.transform = `translateY(${scrolled * parallaxSpeed}px)`;
        });
    }

    // Dynamic stats counter animation
    const statNumbers = document.querySelectorAll('.stat-number');
    let hasAnimated = false;

    const animateStats = () => {
        if (hasAnimated) return;

        const statsSection = document.querySelector('.about-stats');
        const statsPosition = statsSection.getBoundingClientRect().top;
        const screenPosition = window.innerHeight;

        if (statsPosition < screenPosition) {
            hasAnimated = true;
            
            statNumbers.forEach((stat, index) => {
                const text = stat.textContent;
                
                // Skip if it's a special character like ∞
                if (text === '∞') return;
                
                const target = parseInt(text);
                if (isNaN(target)) return;

                let current = 0;
                const increment = target / 50;
                const timer = setInterval(() => {
                    current += increment;
                    if (current >= target) {
                        stat.textContent = target + '+';
                        clearInterval(timer);
                    } else {
                        stat.textContent = Math.floor(current) + '+';
                    }
                }, 30);
            });
        }
    };

    window.addEventListener('scroll', animateStats);

    // Add hover effect sound feedback (visual only)
    const interactiveCards = document.querySelectorAll(
        '.music-card, .book-card, .invention-card, .social-card, .cta-button'
    );

    interactiveCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
        });
    });

    // Mobile menu toggle (for future implementation)
    const createMobileMenu = () => {
        const navLinks = document.querySelector('.nav-links');
        if (window.innerWidth <= 768 && !document.querySelector('.mobile-menu-toggle')) {
            const menuToggle = document.createElement('button');
            menuToggle.classList.add('mobile-menu-toggle');
            menuToggle.innerHTML = '☰';
            menuToggle.style.cssText = `
                background: none;
                border: none;
                color: var(--gold);
                font-size: 2rem;
                cursor: pointer;
                display: block;
            `;
            
            const navbar = document.querySelector('.navbar .container');
            navbar.appendChild(menuToggle);

            menuToggle.addEventListener('click', () => {
                navLinks.classList.toggle('active');
                if (navLinks.classList.contains('active')) {
                    navLinks.style.display = 'flex';
                    navLinks.style.flexDirection = 'column';
                    navLinks.style.position = 'absolute';
                    navLinks.style.top = '70px';
                    navLinks.style.right = '20px';
                    navLinks.style.background = 'rgba(10, 20, 40, 0.98)';
                    navLinks.style.padding = '20px';
                    navLinks.style.borderRadius = '10px';
                    navLinks.style.gap = '20px';
                } else {
                    navLinks.style.display = 'none';
                }
            });
        }
    };

    // Initialize mobile menu on load and resize
    createMobileMenu();
    window.addEventListener('resize', createMobileMenu);

    // Add active link highlighting
    const sections = document.querySelectorAll('section[id]');
    
    const highlightNav = () => {
        const scrollY = window.pageYOffset;
        
        sections.forEach(section => {
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.offsetTop - 100;
            const sectionId = section.getAttribute('id');
            const navLink = document.querySelector(`.nav-links a[href="#${sectionId}"]`);
            
            if (navLink && scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                document.querySelectorAll('.nav-links a').forEach(link => {
                    link.style.color = 'var(--text-light)';
                });
                navLink.style.color = 'var(--gold)';
            }
        });
    };

    window.addEventListener('scroll', highlightNav);

    // Add glowing effect to cards on hover
    const cards = document.querySelectorAll('.music-card, .book-card, .invention-card');
    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            card.style.setProperty('--mouse-x', `${x}px`);
            card.style.setProperty('--mouse-y', `${y}px`);
        });
    });

    // Initialize
    console.log('🌟 Bernard Denzil Wilkes - Luxurious Personal Website Loaded');
    console.log('✨ Where technology, consciousness, and innovation converge');
});
