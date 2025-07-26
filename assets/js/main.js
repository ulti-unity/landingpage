/**
 * UltiUnity Landing Page JavaScript
 * Handles navigation, animations, and user interactions
 */

(function () {
    'use strict';

    // DOM Elements
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navClose = document.getElementById('nav-close');
    const navLinks = document.querySelectorAll('.nav__link');
    const header = document.querySelector('.header');

    // Initialize the application
    function init() {
        setupNavigation();
        setupScrollEffects();
        setupAnimations();
        setupSmoothScrolling();
        setupAnalytics();
    }

    // Navigation functionality
    function setupNavigation() {
        // Mobile menu toggle
        if (navToggle) {
            navToggle.addEventListener('click', () => {
                navMenu.classList.add('show-menu');
                document.body.style.overflow = 'hidden';
            });
        }

        // Close mobile menu
        if (navClose) {
            navClose.addEventListener('click', closeMenu);
        }

        // Close menu when clicking on links
        navLinks.forEach(link => {
            link.addEventListener('click', closeMenu);
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!navMenu.contains(e.target) && !navToggle.contains(e.target)) {
                closeMenu();
            }
        });

        // Header scroll effect
        window.addEventListener('scroll', handleHeaderScroll);
    }

    function closeMenu() {
        navMenu.classList.remove('show-menu');
        document.body.style.overflow = 'auto';
    }

    function handleHeaderScroll() {
        const scrollY = window.pageYOffset;

        if (scrollY >= 100) {
            header.style.background = 'rgba(255, 255, 255, 0.98)';
            header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        } else {
            header.style.background = 'rgba(255, 255, 255, 0.95)';
            header.style.boxShadow = 'none';
        }
    }

    // Scroll effects and animations
    function setupScrollEffects() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, observerOptions);

        // Observe elements for fade-in animation
        const elementsToAnimate = document.querySelectorAll('.feature-card, .benefit, .section__header');
        elementsToAnimate.forEach(el => {
            el.classList.add('fade-in');
            observer.observe(el);
        });
    }

    function setupAnimations() {
        // Enhance floating card animations
        const floatingCards = document.querySelectorAll('.floating-card');
        floatingCards.forEach((card, index) => {
            card.style.animationDelay = `${index * 2}s`;

            // Add hover effect
            card.addEventListener('mouseenter', () => {
                card.style.transform = 'translateY(-10px) scale(1.05)';
                card.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.2)';
                card.style.transition = 'all 0.3s ease';
            });

            card.addEventListener('mouseleave', () => {
                card.style.transform = '';
                card.style.boxShadow = '';
                card.style.transition = 'all 0.3s ease';
            });
        });

        // Enhanced platform diagram interactions
        const diagramNodes = document.querySelectorAll('.diagram-node');
        const connectionLines = document.querySelectorAll('.connection-lines line');

        diagramNodes.forEach((node, index) => {
            node.addEventListener('mouseenter', () => {
                // Highlight connected lines
                connectionLines.forEach(line => {
                    line.style.opacity = '0.3';
                    line.style.transition = 'opacity 0.3s ease';
                });

                // Show tooltip
                showDiagramTooltip(node);
            });

            node.addEventListener('mouseleave', () => {
                // Reset lines
                connectionLines.forEach(line => {
                    line.style.opacity = '';
                    line.style.transition = '';
                });

                // Hide tooltip
                hideDiagramTooltip();
            });
        });

        // Remove problematic parallax effect that can cause layout issues
        // Add scroll-triggered animations instead
        window.addEventListener('scroll', throttle(() => {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.3;

            // Subtle background movement for hero section only
            const heroBackground = document.querySelector('.hero::before');
            if (heroBackground && scrolled < window.innerHeight) {
                document.querySelector('.hero').style.transform = `translateY(${rate}px)`;
            }
        }, 16));
    }

    function showDiagramTooltip(node) {
        const existingTooltip = document.querySelector('.diagram-tooltip');
        if (existingTooltip) existingTooltip.remove();

        const tooltip = document.createElement('div');
        tooltip.className = 'diagram-tooltip';

        let tooltipText = '';
        if (node.classList.contains('central')) {
            tooltipText = 'Central hub for all MCP tools and integrations';
        } else if (node.classList.contains('client')) {
            tooltipText = 'AI clients that connect to UltiUnity platform';
        } else if (node.classList.contains('tool')) {
            tooltipText = 'MCP tools managed through UltiUnity';
        }

        tooltip.innerHTML = tooltipText;
        tooltip.style.cssText = `
            position: absolute;
            background: rgba(31, 41, 55, 0.95);
            color: white;
            padding: 0.75rem 1rem;
            border-radius: 0.5rem;
            font-size: 0.875rem;
            white-space: nowrap;
            z-index: 1000;
            pointer-events: none;
            opacity: 0;
            transform: translateY(10px);
            transition: all 0.3s ease;
            backdrop-filter: blur(10px);
        `;

        document.body.appendChild(tooltip);

        const rect = node.getBoundingClientRect();
        tooltip.style.left = rect.left + (rect.width / 2) - (tooltip.offsetWidth / 2) + 'px';
        tooltip.style.top = rect.bottom + 10 + 'px';

        setTimeout(() => {
            tooltip.style.opacity = '1';
            tooltip.style.transform = 'translateY(0)';
        }, 10);
    }

    function hideDiagramTooltip() {
        const tooltip = document.querySelector('.diagram-tooltip');
        if (tooltip) {
            tooltip.style.opacity = '0';
            tooltip.style.transform = 'translateY(10px)';
            setTimeout(() => tooltip.remove(), 300);
        }
    }

    function setupSmoothScrolling() {
        // Enhanced smooth scrolling for anchor links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const targetId = this.getAttribute('href');
                const target = document.querySelector(targetId);

                if (target) {
                    const headerHeight = header ? header.offsetHeight : 80;
                    const targetPosition = target.offsetTop - headerHeight - 20;

                    // Close mobile menu if open
                    closeMenu();

                    // Smooth scroll with better easing
                    const startPosition = window.pageYOffset;
                    const distance = targetPosition - startPosition;
                    const duration = Math.min(Math.abs(distance) / 2, 1000); // Max 1 second
                    let start = null;

                    function smoothScroll(timestamp) {
                        if (!start) start = timestamp;
                        const progress = (timestamp - start) / duration;

                        if (progress < 1) {
                            const easeInOutCubic = progress < 0.5
                                ? 4 * progress * progress * progress
                                : 1 - Math.pow(-2 * progress + 2, 3) / 2;

                            window.scrollTo(0, startPosition + distance * easeInOutCubic);
                            requestAnimationFrame(smoothScroll);
                        } else {
                            window.scrollTo(0, targetPosition);
                        }
                    }

                    requestAnimationFrame(smoothScroll);
                }
            });
        });
    }

    // Analytics and tracking
    function setupAnalytics() {
        // Track page view
        trackEvent('page_view', {
            page: 'landing',
            timestamp: new Date().toISOString(),
            user_agent: navigator.userAgent,
            viewport: `${window.innerWidth}x${window.innerHeight}`
        });

        // Track scroll depth
        let maxScrollDepth = 0;
        window.addEventListener('scroll', throttle(() => {
            const scrollDepth = Math.round((window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100);
            if (scrollDepth > maxScrollDepth) {
                maxScrollDepth = scrollDepth;
                if (scrollDepth % 25 === 0) { // Track at 25%, 50%, 75%, 100%
                    trackEvent('scroll_depth', { depth: scrollDepth });
                }
            }
        }, 100));

        // Track feature card interactions
        document.querySelectorAll('.feature-card').forEach((card, index) => {
            card.addEventListener('click', () => {
                const title = card.querySelector('.feature-card__title').textContent;
                trackEvent('feature_click', { feature: title, index });
            });
        });

        // Track time on page
        const startTime = Date.now();
        window.addEventListener('beforeunload', () => {
            const timeOnPage = Math.round((Date.now() - startTime) / 1000);
            trackEvent('time_on_page', { seconds: timeOnPage });
        });
    }

    function trackEvent(eventName, properties = {}) {
        // Google Analytics 4
        if (typeof gtag !== 'undefined') {
            gtag('event', eventName, properties);
        }

        // Console log for development
        if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
            console.log('📊 Analytics Event:', eventName, properties);
        }

        // You can add other analytics providers here
        // Example: Mixpanel, Amplitude, etc.
    }

    // Utility functions
    function throttle(func, wait) {
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

    // Handle device orientation changes
    window.addEventListener('orientationchange', debounce(() => {
        // Recalculate animations and layouts
        setupAnimations();
    }, 300));

    // Handle window resize
    window.addEventListener('resize', debounce(() => {
        closeMenu(); // Close mobile menu on resize
    }, 250));

    // Keyboard accessibility
    document.addEventListener('keydown', (e) => {
        // Close mobile menu with Escape key
        if (e.key === 'Escape') {
            closeMenu();
        }
    });

    // Touch gestures for mobile
    let touchStartX = 0;
    let touchStartY = 0;

    document.addEventListener('touchstart', (e) => {
        touchStartX = e.touches[0].clientX;
        touchStartY = e.touches[0].clientY;
    });

    document.addEventListener('touchend', (e) => {
        if (!touchStartX || !touchStartY) return;

        const touchEndX = e.changedTouches[0].clientX;
        const touchEndY = e.changedTouches[0].clientY;

        const diffX = touchStartX - touchEndX;
        const diffY = touchStartY - touchEndY;

        // Swipe left to close menu (mobile)
        if (Math.abs(diffX) > Math.abs(diffY) && diffX > 50 && navMenu.classList.contains('show-menu')) {
            closeMenu();
        }

        touchStartX = 0;
        touchStartY = 0;
    });

    // Performance optimization: Lazy load images
    function setupLazyLoading() {
        const images = document.querySelectorAll('img[data-src]');
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });

        images.forEach(img => imageObserver.observe(img));
    }

    // Error handling
    window.addEventListener('error', (e) => {
        console.error('JavaScript error:', e.error);
        trackEvent('javascript_error', {
            message: e.message,
            filename: e.filename,
            lineno: e.lineno,
            colno: e.colno
        });
    });

    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    // Expose some functions globally for debugging
    if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
        window.UltiUnity = {
            trackEvent,
            closeMenu
        };
    }

})();
