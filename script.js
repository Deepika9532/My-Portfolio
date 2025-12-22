// ===================================
// INITIALIZATION
// ===================================

// Set current year in footer
document.addEventListener('DOMContentLoaded', () => {
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
});

// ===================================
// DARK MODE FUNCTIONALITY
// ===================================

function toggleTheme() {
    document.body.classList.toggle("dark");
    const isDark = document.body.classList.contains("dark");
    localStorage.setItem("theme", isDark ? "dark" : "light");
}

function loadTheme() {
    if (localStorage.getItem("theme") === "dark") {
        document.body.classList.add("dark");
    }
}

// ===================================
// SCROLL FUNCTIONALITY
// ===================================

// Scroll progress bar
window.addEventListener('scroll', () => {
    updateScrollProgress();
    toggleFABVisibility();
    updateParallaxEffect();
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
// PARALLAX EFFECT
// ===================================

function updateParallaxEffect() {
    const scrolled = window.scrollY;
    const header = document.querySelector('header');
    
    if (header) {
        header.style.transform = `translateY(${scrolled * 0.3}px)`;
        header.style.opacity = 1 - (scrolled / 500);
    }
}

// ===================================
// REVEAL ANIMATIONS
// ===================================

function initializeAnimations() {
    const reveals = document.querySelectorAll(".reveal, .skill-category");
    
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("active");
            }
        });
    }, { 
        threshold: 0.15 
    });

    reveals.forEach(element => observer.observe(element));
}

// ===================================
// SMOOTH SCROLL FOR NAVIGATION
// ===================================

document.addEventListener('DOMContentLoaded', () => {
    const navLinks = document.querySelectorAll('nav a');
    
    navLinks.forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            
            // Only prevent default for internal links (starting with #)
            if (href && href.startsWith('#')) {
                e.preventDefault();
                const targetId = href;
                const targetSection = document.querySelector(targetId);
                
                if (targetSection) {
                    targetSection.scrollIntoView({ 
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });
});

// ===================================
// FORM HANDLING
// ===================================

function initializeFormHandling() {
    const form = document.getElementById('contactForm');
    const successMessage = document.getElementById('successMessage');
    
    if (form && successMessage) {
        form.addEventListener('submit', function(e) {
            // Allow form to submit naturally to Formspree
            // Show success message after a brief delay
            setTimeout(() => {
                successMessage.classList.add('show');
                form.reset();
                
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
        const text = tagline.textContent;
        tagline.textContent = '';
        let i = 0;
        
        function typeWriter() {
            if (i < text.length) {
                tagline.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 100);
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
    updateParallaxEffect();
}, 10);

window.addEventListener('scroll', optimizedScroll);

// ===================================
// PREVENT LAYOUT SHIFT
// ===================================

// Ensure smooth page load
window.addEventListener('load', () => {
    document.body.style.opacity = '1';
});

// ===================================
// ACCESSIBILITY ENHANCEMENTS
// ===================================

// Add keyboard navigation for FAB
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
// PERFORMANCE MONITORING (Optional)
// ===================================

// Log page load performance (can be removed in production)
window.addEventListener('load', () => {
    const perfData = window.performance.timing;
    const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
    console.log(`Page load time: ${pageLoadTime}ms`);
});

// ===================================
// ERROR HANDLING
// ===================================

// Global error handler for debugging
window.addEventListener('error', (e) => {
    console.error('An error occurred:', e.message);
});

// Handle unhandled promise rejections
window.addEventListener('unhandledrejection', (e) => {
    console.error('Unhandled promise rejection:', e.reason);
});