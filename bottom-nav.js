document.addEventListener('DOMContentLoaded', () => {
    const navPlaceholder = document.getElementById('bottom-nav-placeholder');
    if (navPlaceholder) {
        fetch('bottom-nav.html')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.text();
            })
            .then(data => {
                navPlaceholder.innerHTML = data;

                // Add active class to the correct nav link based on the current page
                const path = window.location.pathname.split("/").pop();
                if (path === 'home.html' || path === '') {
                    const homeLink = document.getElementById('nav-home');
                    if (homeLink) homeLink.classList.add('active');
                } else if (path === 'index.html') {
                    const latestLink = document.getElementById('nav-latest');
                    if (latestLink) latestLink.classList.add('active');
                }
            })
            .catch(error => console.error('Error loading bottom navigation:', error));
    }
});
