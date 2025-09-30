document.addEventListener('DOMContentLoaded', () => {
    const header = document.querySelector('.header');
    const heroSection = document.querySelector('.hero-about');

    // --- Transparent Header on Scroll ---
    const handleScroll = () => {
        // Make header solid after scrolling past the hero section
        if (window.scrollY > heroSection.offsetHeight - header.offsetHeight) {
            header.classList.add('header-solid');
        } else {
            header.classList.remove('header-solid');
        }
    };

    window.addEventListener('scroll', handleScroll);

    // --- Fade-in animations on scroll ---
    const fadeElements = document.querySelectorAll('.fade-in');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    fadeElements.forEach(el => {
        observer.observe(el);
    });
});