// script.js (Versi Perbaikan)

document.addEventListener('DOMContentLoaded', () => {
    // === 1. Navbar Scroll Effect dan Mobile Menu Logic ===
    const nav = document.getElementById('navbar');
    const menuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    const menuOpenIcon = document.getElementById('menu-open');
    const menuCloseIcon = document.getElementById('menu-close');
    const mobileLinks = document.querySelectorAll('.mobile-link');

    const toggleMenu = () => {
        const isHidden = mobileMenu.style.display === 'block';
        mobileMenu.style.display = isHidden ? 'none' : 'block';
        menuOpenIcon.style.display = isHidden ? 'block' : 'none';
        menuCloseIcon.style.display = isHidden ? 'none' : 'block';
    };

    const closeMenu = () => {
        mobileMenu.style.display = 'none';
        menuOpenIcon.style.display = 'block';
        menuCloseIcon.style.display = 'none';
    };

    menuButton.addEventListener('click', toggleMenu);
    mobileLinks.forEach(link => {
        link.addEventListener('click', closeMenu);
    });

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
    });


    // === 2. Reveal Animation (Fade-In On Scroll) Logic ===
    
    const revealElements = document.querySelectorAll('.fade-in-item');

    // Cek apakah browser mendukung IntersectionObserver
    if ('IntersectionObserver' in window) {
        
        const observerOptions = {
            root: null, // Mengamati viewport
            rootMargin: '0px',
            threshold: 0.1 // Elemen muncul ketika 10% terlihat untuk pemicuan yang lebih cepat
        };

        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Tambahkan class 'visible' untuk memicu animasi CSS
                    entry.target.classList.add('visible');
                    // Hentikan pengamatan
                    observer.unobserve(entry.target); 
                }
            });
        }, observerOptions);

        // Mulai mengamati dan menerapkan delay bertahap
        revealElements.forEach(element => {
            // Tentukan elemen mana yang harus mendapatkan delay bertahap di dalam grid
            if (element.classList.contains('service-card') || 
                element.classList.contains('project-item') || 
                element.classList.contains('stat-item') || 
                element.classList.contains('value-item')) {
                
                const parent = element.parentElement;
                
                if (parent) {
                    // Filter hanya elemen yang memiliki class .fade-in-item di dalam parent yang sama
                    const siblings = Array.from(parent.children).filter(child => child.classList.contains('fade-in-item'));
                    const index = siblings.indexOf(element);

                    // Terapkan delay 0.1s untuk setiap item berturut-turut
                    element.style.transitionDelay = `${index * 0.1}s`; 
                }
            }
            observer.observe(element);
        });
    } else {
        // Fallback: langsung tampilkan elemen jika browser lama
        revealElements.forEach(element => {
            element.classList.add('visible');
        });
    }
});