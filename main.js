// ==========================================
// DJAEV Digital Media Strategy - Main JavaScript
// ==========================================

document.addEventListener('DOMContentLoaded', function() {
    'use strict';
    
    // ==========================================
    // Initialize AOS (Animate On Scroll)
    // ==========================================
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 1000,
            once: true,
            offset: 100,
            easing: 'ease-out-cubic'
        });
    }
    
    // ==========================================
    // Navigation Scroll Effect
    // ==========================================
    const navbar = document.getElementById('navbar');
    let lastScroll = 0;
    
    window.addEventListener('scroll', function() {
        const currentScroll = window.pageYOffset;
        
        // Add shadow and change background on scroll
        if (currentScroll > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        lastScroll = currentScroll;
    });
    
    // ==========================================
    // Mobile Menu Toggle
    // ==========================================
    const menuToggle = document.getElementById('menuToggle');
    const mobileMenu = document.getElementById('mobileMenu');
    
    if (menuToggle && mobileMenu) {
        menuToggle.addEventListener('click', function() {
            mobileMenu.classList.toggle('hidden');
            
            // Change icon
            const icon = this.querySelector('i');
            if (mobileMenu.classList.contains('hidden')) {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            } else {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            }
        });
        
        // Close mobile menu when clicking on a link
        const mobileLinks = mobileMenu.querySelectorAll('a');
        mobileLinks.forEach(link => {
            link.addEventListener('click', function() {
                mobileMenu.classList.add('hidden');
                const icon = menuToggle.querySelector('i');
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            });
        });
    }
    
    // ==========================================
    // Smooth Scrolling for Navigation Links
    // ==========================================
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80; // Account for fixed navbar
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
                
                // Update active link
                updateActiveLink(targetId);
            }
        });
    });
    
    // ==========================================
    // Update Active Navigation Link on Scroll
    // ==========================================
    function updateActiveLink(activeId) {
        navLinks.forEach(link => {
            link.classList.remove('active', 'text-blue-600');
            if (link.getAttribute('href') === activeId) {
                link.classList.add('active', 'text-blue-600');
            }
        });
    }
    
    // Highlight active section on scroll
    window.addEventListener('scroll', function() {
        const sections = document.querySelectorAll('section[id]');
        const scrollPosition = window.pageYOffset + 150;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = '#' + section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                updateActiveLink(sectionId);
            }
        });
    });
    
    // ==========================================
    // Scroll to Top Button
    // ==========================================
    const scrollToTopBtn = document.getElementById('scrollToTop');
    
    if (scrollToTopBtn) {
        window.addEventListener('scroll', function() {
            if (window.pageYOffset > 300) {
                scrollToTopBtn.classList.add('show');
            } else {
                scrollToTopBtn.classList.remove('show');
            }
        });
        
        scrollToTopBtn.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
    
    // ==========================================
    // Counter Animation
    // ==========================================
    const counters = document.querySelectorAll('.counter');
    let counterAnimated = false;
    
    function animateCounters() {
        counters.forEach(counter => {
            const target = parseInt(counter.getAttribute('data-target'));
            const duration = 2000; // 2 seconds
            const increment = target / (duration / 16); // 60 FPS
            let current = 0;
            
            const updateCounter = () => {
                current += increment;
                if (current < target) {
                    counter.textContent = Math.floor(current);
                    requestAnimationFrame(updateCounter);
                } else {
                    counter.textContent = target;
                }
            };
            
            updateCounter();
        });
    }
    
    // Trigger counter animation when scrolling to statistics section
    window.addEventListener('scroll', function() {
        if (!counterAnimated && counters.length > 0) {
            const statsSection = counters[0].closest('section');
            if (statsSection) {
                const sectionTop = statsSection.offsetTop;
                const sectionHeight = statsSection.offsetHeight;
                const scrollPosition = window.pageYOffset + window.innerHeight;
                
                if (scrollPosition > sectionTop + sectionHeight / 3) {
                    animateCounters();
                    counterAnimated = true;
                }
            }
        }
    });
    
    // ==========================================
    // Progress Bar Animation
    // ==========================================
    const progressBars = document.querySelectorAll('[data-progress]');
    let progressAnimated = false;
    
    function animateProgress() {
        progressBars.forEach(bar => {
            const progress = bar.getAttribute('data-progress');
            setTimeout(() => {
                bar.style.width = progress + '%';
            }, 200);
        });
    }
    
    // Trigger progress animation when scrolling to goals section
    window.addEventListener('scroll', function() {
        if (!progressAnimated && progressBars.length > 0) {
            const goalsSection = progressBars[0].closest('section');
            if (goalsSection) {
                const sectionTop = goalsSection.offsetTop;
                const sectionHeight = goalsSection.offsetHeight;
                const scrollPosition = window.pageYOffset + window.innerHeight;
                
                if (scrollPosition > sectionTop + sectionHeight / 3) {
                    animateProgress();
                    progressAnimated = true;
                }
            }
        }
    });
    
    // ==========================================
    // Contact Form Handling
    // ==========================================
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(contactForm);
            const data = {};
            formData.forEach((value, key) => {
                data[key] = value;
            });
            
            // Show success message
            showNotification('success', 'تم إرسال رسالتك بنجاح! سنتواصل معك قريباً.');
            
            // Reset form
            contactForm.reset();
            
            // In a real application, you would send the data to a server here
            console.log('Form Data:', data);
        });
    }
    
    // ==========================================
    // Notification System
    // ==========================================
    function showNotification(type, message) {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `fixed top-24 left-1/2 transform -translate-x-1/2 z-50 px-6 py-4 rounded-xl shadow-2xl flex items-center gap-3 animate-bounce ${
            type === 'success' ? 'bg-green-500' : 'bg-red-500'
        } text-white`;
        
        notification.innerHTML = `
            <i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'} text-2xl"></i>
            <span class="font-semibold">${message}</span>
        `;
        
        document.body.appendChild(notification);
        
        // Remove notification after 3 seconds
        setTimeout(() => {
            notification.style.opacity = '0';
            notification.style.transform = 'translate(-50%, -100%)';
            setTimeout(() => {
                notification.remove();
            }, 300);
        }, 3000);
    }
    
    // ==========================================
    // Lazy Loading Images
    // ==========================================
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                        img.classList.remove('lazy');
                        observer.unobserve(img);
                    }
                }
            });
        });
        
        const lazyImages = document.querySelectorAll('img.lazy');
        lazyImages.forEach(img => imageObserver.observe(img));
    }
    
    // ==========================================
    // Parallax Effect for Hero Section
    // ==========================================
    const heroSection = document.querySelector('#hero');
    
    if (heroSection) {
        window.addEventListener('scroll', function() {
            const scrolled = window.pageYOffset;
            const parallaxSpeed = 0.5;
            
            if (scrolled < window.innerHeight) {
                heroSection.style.transform = `translateY(${scrolled * parallaxSpeed}px)`;
            }
        });
    }
    
    // ==========================================
    // Card Tilt Effect (3D Hover)
    // ==========================================
    const cards = document.querySelectorAll('.card-hover');
    
    cards.forEach(card => {
        card.addEventListener('mousemove', function(e) {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;
        });
        
        card.addEventListener('mouseleave', function() {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
        });
    });
    
    // ==========================================
    // Typing Effect for Hero Title (Optional)
    // ==========================================
    function typeWriter(element, text, speed = 100) {
        let i = 0;
        element.textContent = '';
        
        function type() {
            if (i < text.length) {
                element.textContent += text.charAt(i);
                i++;
                setTimeout(type, speed);
            }
        }
        
        type();
    }
    
    // ==========================================
    // Intersection Observer for Section Animations
    // ==========================================
    if ('IntersectionObserver' in window) {
        const sectionObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-fade-in');
                }
            });
        }, {
            threshold: 0.1
        });
        
        const sections = document.querySelectorAll('section');
        sections.forEach(section => sectionObserver.observe(section));
    }
    
    // ==========================================
    // Dark Mode Toggle (Future Enhancement)
    // ==========================================
    function initDarkMode() {
        const darkModeToggle = document.getElementById('darkModeToggle');
        
        if (darkModeToggle) {
            // Check for saved preference
            const darkMode = localStorage.getItem('darkMode');
            if (darkMode === 'enabled') {
                document.body.classList.add('dark-mode');
            }
            
            darkModeToggle.addEventListener('click', function() {
                document.body.classList.toggle('dark-mode');
                
                // Save preference
                if (document.body.classList.contains('dark-mode')) {
                    localStorage.setItem('darkMode', 'enabled');
                } else {
                    localStorage.setItem('darkMode', 'disabled');
                }
            });
        }
    }
    
    // Initialize dark mode
    initDarkMode();
    
    // ==========================================
    // Performance Monitoring
    // ==========================================
    window.addEventListener('load', function() {
        // Log page load time
        const loadTime = window.performance.timing.domContentLoadedEventEnd - window.performance.timing.navigationStart;
        console.log('Page loaded in:', loadTime, 'ms');
        
        // Check if page is loaded fast enough
        if (loadTime > 3000) {
            console.warn('Page load time is slow. Consider optimizing resources.');
        }
    });
    
    // ==========================================
    // Service Worker Registration (PWA)
    // ==========================================
    if ('serviceWorker' in navigator) {
        window.addEventListener('load', function() {
            navigator.serviceWorker.register('/sw.js')
                .then(registration => {
                    console.log('ServiceWorker registered:', registration);
                })
                .catch(error => {
                    console.log('ServiceWorker registration failed:', error);
                });
        });
    }
    
    // ==========================================
    // Console Welcome Message
    // ==========================================
    console.log('%c🏥 DJAEV - اتحاد الأطباء الألماني اليمني', 'font-size: 20px; color: #2563eb; font-weight: bold;');
    console.log('%c13 عاماً من العمل الإنساني الطبي', 'font-size: 14px; color: #14b8a6;');
    console.log('%cWebsite developed with ❤️ using modern web technologies', 'font-size: 12px; color: #666;');
    
    // ==========================================
    // End of Main JavaScript
    // ==========================================
});

// ==========================================
// Utility Functions
// ==========================================

// Debounce function for performance
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

// Throttle function for scroll events
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Check if element is in viewport
function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

// Format number with commas
function formatNumber(num) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

// Smooth scroll to element
function smoothScrollTo(element, offset = 0) {
    const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
    const offsetPosition = elementPosition - offset;
    
    window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
    });
}