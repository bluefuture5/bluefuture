/**
 * Home Page Specific Scripts
 * ===========================
 */

/**
 * Vanta.js Waves Animation for Hero Section
 */

function initVantaWaves() {
    if (window.VANTA && window.THREE) {
        window.VANTA.WAVES({
            el: hero,
            color: 0x0066cc,            // لون الأمواج (أزرق) - بصيغة hex
            shininess: 30,              // درجة اللمعان (0-100)
            waveHeight: 20,             // ارتفاع الأمواج (كلما زاد = أمواج أعلى)
            waveSpeed: 0.8,             // سرعة حركة الأمواج (0.5-2.0)
            zoom: 1.1,                  // تكبير/تصغير الكاميرا
            mouseControls: true,        // التحكم بالماوس (يتحرك مع مؤشر الفأرة)
            touchControls: true,        // التحكم باللمس (للموبايل)
            gyroControls: false,        // التحكم بالـ Gyroscope (حركة الموبايل)
            minHeight: 200.0,           // الحد الأدنى لارتفاع العنصر
            minWidth: 200.0,            // الحد الأدنى لعرض العنصر
            backgroundColor: 0x0a0e27
        });
        console.log('✅ Vanta Waves initialized');
    } else {
        console.warn('⚠️ Vanta.js or Three.js not loaded');
    }
}

/**
 * Marquee Animation for Partners Section using GSAP ScrollTrigger
 * أنيميشن الشركاء المتحركة باستخدام GSAP والـ Scroll
 */
function initMarquee() {
    const marqueeContent = document.getElementById('marqueeContent');
    if (!marqueeContent || typeof gsap === 'undefined') return;

    // نسخ العناصر للحركة السلسة
    const items = marqueeContent.querySelectorAll('.partner-card');
    items.forEach(item => {
        const clone = item.cloneNode(true);
        marqueeContent.appendChild(clone);
    });

    // تسجيل ScrollTrigger plugin
    gsap.registerPlugin(ScrollTrigger);

    // حركة الـ Marquee مع scroll الصفحة
    gsap.to(marqueeContent, {
        x: -marqueeContent.scrollWidth / 2,  // حرك لليسار نص العرض
        scrollTrigger: {
            trigger: marqueeContent.parentElement,
            start: 'top center',      // ابدأ لما الـ marquee يصير في المنتصف
            end: 'bottom center',     // انتهي لما يطلع من الشاشة
            scrub: 1,                 // حرك مع الـ scroll (smooth = 1)
            markers: false            // بدون علامات تصحيح
        },
        ease: 'none'
    });

    console.log('✅ Marquee with ScrollTrigger initialized');
}

/**
 * GSAP Animations (if GSAP is available)
 */
function initGSAPAnimations() {
    if (typeof gsap === 'undefined') {
        console.log('⚠️ GSAP not loaded, skipping GSAP animations');
        return;
    }

    // Animate intro cards on scroll
    if (typeof ScrollTrigger !== 'undefined') {
        gsap.registerPlugin(ScrollTrigger);

        gsap.utils.toArray('.intro-card').forEach(card => {
            gsap.from(card, {
                scrollTrigger: {
                    trigger: card,
                    start: 'top 80%',
                    once: true
                },
                duration: 0.8,
                opacity: 0,
                y: 30,
                ease: 'power2.out'
            });
        });
    }
}



/**
 * Initialize Particles.js (if available)
 */
function initParticles() {
    if (typeof tsParticles === 'undefined') {
        console.log('⚠️ tsParticles not loaded, skipping particle animation');
        return;
    }

    // Optional: Initialize particles if container exists
    const particleContainer = document.getElementById('particles');
    if (particleContainer) {
        tsParticles.load('particles', {
            background: { color: { value: 'transparent' } },
            fpsLimit: 120,
            particles: {
                number: { value: 80 },
                color: { value: '#00BFFF' },
                shape: { type: 'circle' },
                opacity: { value: 0.5 },
                size: { value: { min: 1, max: 3 } },
                move: {
                    enable: true,
                    speed: 0.5,
                    direction: 'none',
                    random: false,
                    straight: false,
                    outModes: { default: 'out' }
                }
            }
        });
    }
}

/**
 * Initialize all animations
 */
function initAnimations() {
    initMarquee();
    initGSAPAnimations();
    initParticles();
}

/**
 * Newsletter Form Handler
 */
function initNewsletterForm() {
    const form = document.querySelector('.newsletter-form');
    if (!form) return;

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const email = document.getElementById('newsletter-email').value;
        const country = document.getElementById('newsletter-country').value;

        // Simple validation
        if (!email || !country) {
            alert('Please fill in all fields');
            return;
        }

        // Here you would send the data to a server
        console.log('Newsletter subscription:', { email, country });

        // Show success message
        alert('Thank you for subscribing! Check your email for confirmation.');
        form.reset();
    });
}

/**
 * Initialize on DOM ready
 */


if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        initVantaWaves();
        initAnimations();
        initNewsletterForm();
    });
} else {
    initVantaWaves();
    initAnimations();
    initNewsletterForm();
}
