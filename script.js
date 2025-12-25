// ===================================
// INITIALIZATION
// ===================================

document.addEventListener('DOMContentLoaded', () => {
    // Set current year in footer
    const yearElement = document.getElementById("current-year");
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }
    
    // Load saved theme
    loadTheme();
    
    // Initialize animations
    initializeAnimations();
    
    // Initialize form handling
    initializeFormHandling();
    
    // Initialize typing effect
    initializeTypingEffect();
    
    // Initialize smooth scroll
    initializeSmoothScroll();
});

// ===================================
// DARK MODE FUNCTIONALITY
// ===================================

function toggleTheme() {
    document.body.classList.toggle("dark-mode");
    const isDark = document.body.classList.contains("dark-mode");
    
    // Update all dark mode buttons
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(btn => {
        if (btn.textContent.includes('Dark Mode') || btn.textContent.includes('Light Mode')) {
            btn.textContent = isDark ? '☀️ Light Mode' : '🌙 Dark Mode';
        }
    });
    
    // Save preference
    localStorage.setItem("theme", isDark ? "dark" : "light");
}

function loadTheme() {
    if (localStorage.getItem("theme") === "dark") {
        document.body.classList.add("dark-mode");
        
        // Update button text if it exists
        const buttons = document.querySelectorAll('.btn');
        buttons.forEach(btn => {
            if (btn.textContent.includes('Dark Mode')) {
                btn.textContent = '☀️ Light Mode';
            }
        });
    }
}

// ===================================
// SCROLL FUNCTIONALITY
// ===================================

// Scroll progress bar and FAB visibility
window.addEventListener('scroll', () => {
    updateScrollProgress();
    toggleFABVisibility();
});

function updateScrollProgress() {
    const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (window.scrollY / windowHeight) * 100;
    const progressBar = document.getElementById('scroll-progress');
    if (progressBar) {
        progressBar.style.width = scrolled + '%';
    }
}

// Show/hide Floating Action Button
function toggleFABVisibility() {
    const fab = document.querySelector('.fab');
    if (fab) {
        if (window.scrollY > 300) {
            fab.classList.add('visible');
        } else {
            fab.classList.remove('visible');
        }
    }
}

// Scroll to top function
function scrollToTop() {
    window.scrollTo({ 
        top: 0, 
        behavior: 'smooth' 
    });
}

// ===================================
// REVEAL ANIMATIONS
// ===================================

function initializeAnimations() {
    const reveals = document.querySelectorAll(".reveal, section");
    
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
            }
        });
    }, { 
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    reveals.forEach(element => observer.observe(element));
}

// ===================================
// SMOOTH SCROLL FOR NAVIGATION
// ===================================

function initializeSmoothScroll() {
    const navLinks = document.querySelectorAll('nav a[href^="#"]');
    
    navLinks.forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({ 
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// ===================================
// FORM HANDLING
// ===================================

function initializeFormHandling() {
    const form = document.getElementById('contactForm');
    const successMessage = document.getElementById('successMessage');
    
    if (form && successMessage) {
        // Handle form submission
        form.addEventListener('submit', function(e) {
            // For Netlify forms, we'll show the success message
            // The actual form submission is handled by Netlify
            // Reset form after submission
            setTimeout(() => {
                successMessage.classList.add('show');
                
                // Hide success message after 5 seconds
                setTimeout(() => {
                    successMessage.classList.remove('show');
                }, 5000);
            }, 500);
        });
    }
}

// ===================================
// TYPING EFFECT
// ===================================

function initializeTypingEffect() {
    const tagline = document.querySelector('.typing-effect');
    
    if (tagline) {
        const originalText = tagline.getAttribute('data-text') || tagline.textContent;
        tagline.textContent = '';
        tagline.style.borderRight = '2px solid var(--primary)';
        let i = 0;
        
        function typeWriter() {
            if (i < originalText.length) {
                tagline.textContent += originalText.charAt(i);
                i++;
                setTimeout(typeWriter, 100);
            } else {
                // Blinking cursor effect
                setInterval(() => {
                    if (tagline.style.borderRight) {
                        tagline.style.borderRight = 
                            tagline.style.borderRight.includes('transparent') 
                            ? '2px solid var(--primary)' 
                            : '2px solid transparent';
                    }
                }, 500);
            }
        }
        
        // Start typing after a brief delay
        setTimeout(typeWriter, 500);
    }
}

// ===================================
// SKILL PROGRESS BAR ANIMATION
// ===================================

// Trigger skill bar animations when in view
const skillObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const skillBars = entry.target.querySelectorAll('.skill-progress');
            skillBars.forEach(bar => {
                const progress = bar.style.getPropertyValue('--progress');
                bar.style.width = progress;
            });
        }
    });
}, { threshold: 0.5 });

document.addEventListener('DOMContentLoaded', () => {
    const skillCategories = document.querySelectorAll('.skill-category');
    skillCategories.forEach(category => {
        skillObserver.observe(category);
    });
});

// ===================================
// ACCESSIBILITY ENHANCEMENTS
// ===================================

document.addEventListener('DOMContentLoaded', () => {
    const fab = document.querySelector('.fab');
    
    if (fab) {
        fab.setAttribute('role', 'button');
        fab.setAttribute('aria-label', 'Scroll to top');
        fab.setAttribute('tabindex', '0');
        
        // Allow Enter key to trigger scroll to top
        fab.addEventListener('keypress', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                scrollToTop();
            }
        });
    }
});

// ===================================
// UTILITY FUNCTIONS
// ===================================

// Debounce function for performance optimization
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Optimized scroll handler
const optimizedScroll = debounce(() => {
    updateScrollProgress();
    toggleFABVisibility();
}, 10);

window.addEventListener('scroll', optimizedScroll);

// ===================================
// ERROR HANDLING
// ===================================

// Global error handler
window.addEventListener('error', (e) => {
    console.error('An error occurred:', e.message);
});

// Handle unhandled promise rejections
window.addEventListener('unhandledrejection', (e) => {
    console.error('Unhandled promise rejection:', e.reason);
});
