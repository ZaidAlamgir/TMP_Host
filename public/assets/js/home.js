// Navigation handling for single page
const sections = document.querySelectorAll('.page-section');
const navLinks = document.querySelectorAll('.nav-links a');

function showSection(targetId) {
    sections.forEach(section => {
        section.classList.remove('active');
});
    document.getElementById(targetId).classList.add('active');

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === #${targetId})
            {
            link.classList.add('active');
        }
    });
}
// Handle nav clicks
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href').substring(1);
        showSection(targetId);
        history.pushState(null, '', #${targetId});
        document.querySelector('.nav-links').classList.remove('active'); // Close mobile menu
    });
});

// Handle initial load and hash change
window.addEventListener('load', () => {
    const hash = window.location.hash.substring(1) || 'home';
    showSection(hash);
});

window.addEventListener('hashchange', () => {
    const hash = window.location.hash.substring(1) || 'home';
    showSection(hash);
});

// Smooth scroll for internal anchors (like #learn-more)
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    if (anchor.getAttribute('href') !== '#home' && anchor.getAttribute('href') !== '#about' && anchor.getAttribute('href') !== '#contact' && anchor.getAttribute('href') !== '#login') {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    }
});

// Form submission (basic alert for demo)
document.querySelector('.contact-form')?.addEventListener('submit', (e) => {
    e.preventDefault();
    alert('Message sent successfully!');
    e.target.reset();
});