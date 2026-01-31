/**
 * Common JavaScript Functions
 * ============================
 */

/**
 * Smooth scroll to element
 */
document.addEventListener('click', (e) => {
    if (e.target.classList.contains('scroll-btn')) {
        const href = e.target.getAttribute('href');
        if (href.startsWith('#')) {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        }
    }
});

/**
 * أنيميشن الأرقام باستخدام GSAP
 * Animate numbers using GSAP when they come into view
 */
function animateNumbers() {
    const statCards = document.querySelectorAll('.stat-value');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const element = entry.target;
                const finalValue = parseInt(element.getAttribute('data-target'));

                // التحقق إن الأنيميشن لم تشتغل من قبل
                if (!element.classList.contains('animated')) {
                    element.classList.add('animated');

                    // استخدام GSAP لتحريك الأرقام
                    gsap.to(element, {
                        textContent: finalValue,
                        duration: 2,
                        snap: { textContent: 1 },  // أرقام صحيحة بدون عشري
                        onUpdate() {
                            const currentValue = Math.floor(parseFloat(element.textContent));
                            element.textContent = currentValue.toLocaleString();
                        }
                    });
                }

                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    statCards.forEach(card => observer.observe(card));
}

/**
 * Format numbers with thousand separators
 */
function formatNumber(num) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

/**
 * Initialize when DOM is loaded
 */
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        animateNumbers();
    });
} else {
    animateNumbers();
}

/**
 * Intersection Observer for animations
 */
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe elements with animation classes
document.addEventListener('DOMContentLoaded', () => {
    const elementsToObserve = document.querySelectorAll('.intro-card, .mission-card, .team-card, .partner-card');
    elementsToObserve.forEach(el => observer.observe(el));
});
