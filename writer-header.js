// A self-contained script to create a styled header with a special login flow for writers.
// This script includes all necessary CSS and has no external dependencies like Firebase.

document.addEventListener('DOMContentLoaded', function() {
    const headerPlaceholder = document.getElementById('header-placeholder');

    if (headerPlaceholder) {
        // All necessary styles from menu.css, login.css, and the main header are now included here.
        const headerHTML = `
            <style>
                /* --- Main Header Styles --- */
                .header {
                    background-color: #ffffff;
                    padding: 0 1rem;
                    box-shadow: 0 2px 4px rgba(0,0,0,0.05);
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    box-sizing: border-box;
                    z-index: 1000;
                }
                .header-content {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    max-width: 1200px;
                    margin: 0 auto;
                    height: 60px;
                }
                .header-left, .header-right {
                    display: flex;
                    align-items: center;
                }
                .header-center {
                    position: absolute;
                    left: 50%;
                    transform: translateX(-50%);
                }
                .logo {
                    font-size: 1.6rem;
                    font-weight: bold;
                    color: #1c1e21;
                    text-decoration: none;
                }

                /* --- Hamburger Menu Styles (from menu.css) --- */
                .hamburger {
                    background: none;
                    border: none;
                    font-size: 28px;
                    cursor: pointer;
                    color: black;
                    z-index: 1001;
                    padding: 0 15px;
                }
                .nav-links {
                    position: fixed;
                    top: 60px; /* Aligns below header */
                    left: 0;
                    width: 100%;
                    height: calc(100% - 60px);
                    background: white;
                    list-style: none;
                    padding: 0;
                    margin: 0;
                    display: none;
                    flex-direction: column;
                    align-items: flex-start;
                }
                .nav-links li {
                    width: 100%;
                    border-bottom: 1px solid #eee;
                }
                .nav-links a {
                    display: block;
                    width: 100%;
                    padding: 18px 25px;
                    color: black;
                    font-size: 20px;
                    text-decoration: none;
                }
                .nav-links.active {
                    display: flex;
                }
                .hamburger.active {
                    font-size: 32px;
                }
                
                /* --- Writer Login Icon Styles (from login.css) --- */
                .writer-login-icon {
                  cursor: pointer;
                  display: inline-block;
                }
                .writer-login-icon svg {
                  stroke: black;
                  transition: stroke 0.3s ease;
                  width: 30px; /* Consistent size */
                  height: 30px;
                }
                .writer-login-icon:hover svg {
                  stroke: #007bff; /* Hover color */
                }
            </style>
            
            <header class="header">
                <div class="header-content">
                    <div class="header-left">
                        <nav class="navbar">
                            <button class="hamburger" id="hamburger-btn">&#9776;</button>
                            <ul id="nav-menu" class="nav-links">
                                <li><a href="/TMP_Host/">Home</a></li>
                                <li><a href="/TMP_Host/news-hub.html">News Hub</a></li>
                                <li><a href="/TMP_Host/latest.html">Latest</a></li>
                            </ul>
                        </nav>
                    </div>
                    <div class="header-center">
                        <a href="/TMP_Host/" class="logo">The Muslim Post</a>
                    </div>
                    <div class="header-right">
                        <div class="user-actions">
                            <!-- This icon is now the specific entry point for writers -->
                            <a id="writer-login-btn" class="writer-login-icon" title="Writer Login">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                                    <circle cx="12" cy="7" r="4"></circle>
                                </svg>
                            </a>
                        </div>
                    </div>
                </div>
            </header>
        `;
        headerPlaceholder.innerHTML = headerHTML;

        // --- ATTACH EVENT LISTENERS ---

        // 1. Hamburger Menu Functionality
        const hamburgerBtn = document.getElementById('hamburger-btn');
        const navMenu = document.getElementById('nav-menu');
        hamburgerBtn.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            hamburgerBtn.classList.toggle('active');
            hamburgerBtn.innerHTML = hamburgerBtn.classList.contains('active') ? '&times;' : '&#9776;';
        });

        // 2. Writer Login Functionality with Warning
        const writerLoginBtn = document.getElementById('writer-login-btn');
        writerLoginBtn.addEventListener('click', (event) => {
            event.preventDefault(); // Prevent the link from navigating immediately
            
            // Show a confirmation dialog to the user
            const proceed = confirm("ADMIN NOTICE: This login is for authorized writers only. Press OK to continue.");
            
            // If the user clicks "OK", proceed to the CMS page
            if (proceed) {
                window.location.href = '/TMP_Host/cms.html';
            }
        });
    }
});
