// 1. Define the logic in a function (don't run it yet)
function initAboutPage() {
    const header = document.querySelector('.header');
    const heroSection = document.querySelector('.hero-about');
    const fadeElements = document.querySelectorAll('.fade-in');

    // Safety Check: If we are not on the About page, stop.
    if (!heroSection) return;

    // --- Animation Logic ---
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    fadeElements.forEach(el => {
        // Remove visible class first to reset animation if navigating back
        el.classList.remove('visible'); 
        observer.observe(el);
    });

    // --- Header Logic ---
    if (header) {
        // Remove old listener to prevent duplicates
        window.removeEventListener('scroll', window.aboutScrollHandler);
        
        // Define handler attached to window so we can remove it later
        window.aboutScrollHandler = () => {
            if (window.scrollY > heroSection.offsetHeight - header.offsetHeight) {
                header.classList.add('header-solid');
            } else {
                header.classList.remove('header-solid');
            }
        };

        window.addEventListener('scroll', window.aboutScrollHandler);
        window.aboutScrollHandler(); // Run once immediately
    }
}

// 2. Trigger on Standard Load (Required for Refresh/First Load)
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAboutPage);
} else {
    initAboutPage(); // DOM is already ready, run immediately
}

// 3. Trigger on Turbo/Turbolinks Load (Required for clicking links)
document.addEventListener('turbo:load', initAboutPage);
document.addEventListener('turbolinks:load', initAboutPage); // Legacy support