/**
 * ============================================
 * Dynamic Navbar & Footer Loader
 * تحميل الناڤبار والفوتر تلقائياً في كل صفحة
 * ============================================
 */

// ==========================================
// 1️⃣ NAVBAR HTML
// ==========================================

const navbarHTML = `
<nav class="navbar navbar-expand-lg navbar-light bg-white fixed-top shadow-sm" id="navbar">
    <div class="container-fluid">
        <a class="navbar-brand fw-bold" href="index.html">
            <img src="assets/img/logo.png" alt="Blue Future " class="me-2" style="height: 40px;">
            <span class="brand-text">Blue Future</span>
        </a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
            aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
            <ul class="navbar-nav ms-auto">
                <li class="nav-item"><a class="nav-link" href="index.html">Home</a></li>
                <li class="nav-item"><a class="nav-link" href="learn.html">Learn</a></li>
                <li class="nav-item"><a class="nav-link" href="community.html">Community</a></li>
                <li class="nav-item"><a class="nav-link" href="schools.html">For Schools</a></li>
                <li class="nav-item"><a class="nav-link" href="store.html">Shop</a></li>
                <li class="nav-item"><a class="nav-link donate-link text-white ms-2 px-3" href="donate.html">Donate</a></li>
            </ul>
        </div>
    </div>
</nav>`;

// ==========================================
// 2️⃣ FOOTER HTML
// ==========================================

const footerHTML = `
<footer class="footer bg-dark text-white py-5" id="main-footer">
    <div class="container">
        <div class="row mb-4">
            <div class="col-md-3 mb-4 mb-md-0">
                <div class="d-flex align-items-center mb-3">
                    <img src="assets/img/logo.png" alt="Blue Future Logo" class="me-2" style="height: 40px;">
                    <span class="fw-bold fs-5">Blue Future</span>
                </div>
                <p class="text-secondary mb-3">Protecting the Nile River and raising awareness about global water scarcity.</p>
                <div class="d-flex gap-2">
                    <a href="https://facebook.com" class="btn btn-sm btn-outline-secondary rounded-circle p-2" title="Facebook" target="_blank">f</a>
                    <a href="https://twitter.com" class="btn btn-sm btn-outline-secondary rounded-circle p-2" title="Twitter" target="_blank">𝕏</a>
                    <a href="https://instagram.com" class="btn btn-sm btn-outline-secondary rounded-circle p-2" title="Instagram" target="_blank">📷</a>
                    <a href="https://linkedin.com" class="btn btn-sm btn-outline-secondary rounded-circle p-2" title="LinkedIn" target="_blank">in</a>
                </div>
            </div>
            <div class="col-md-3 mb-4 mb-md-0">
                <h5 class="fw-bold mb-3">Quick Links</h5>
                <ul class="list-unstyled">
                    <li class="mb-2"><a href="index.html" class="text-secondary text-decoration-none">Home</a></li>
                    <li class="mb-2"><a href="learn.html" class="text-secondary text-decoration-none">Learn & Data</a></li>
                    <li class="mb-2"><a href="community.html" class="text-secondary text-decoration-none">Community</a></li>
                    <li class="mb-2"><a href="store.html" class="text-secondary text-decoration-none">Shop</a></li>
                    <li class="mb-2"><a href="donate.html" class="text-secondary text-decoration-none">Donate</a></li>
                </ul>
            </div>
            <div class="col-md-3 mb-4 mb-md-0">
                <h5 class="fw-bold mb-3">Resources</h5>
                <ul class="list-unstyled">
                    <li class="mb-2"><a href="#about" class="text-secondary text-decoration-none">About Us</a></li>
                    <li class="mb-2"><a href="#research" class="text-secondary text-decoration-none">Research & Reports</a></li>
                    <li class="mb-2"><a href="#materials" class="text-secondary text-decoration-none">Educational Materials</a></li>
                    <li class="mb-2"><a href="#partner" class="text-secondary text-decoration-none">Partner With Us</a></li>
                    <li class="mb-2"><a href="#privacy" class="text-secondary text-decoration-none">Privacy Policy</a></li>
                </ul>
            </div>
            <div class="col-md-3">
                <h5 class="fw-bold mb-3">Contact Us</h5>
                <div class="mb-2"><span class="me-2">📍</span><span class="text-secondary">Egypt</span></div>
                <div class="mb-2"><span class="me-2">✉️</span><a href="mailto:info@bluefuture.org" class="text-secondary text-decoration-none">info@bluefuture.org</a></div>
                <div><span class="me-2">📞</span><a href="tel:+201234567890" class="text-secondary text-decoration-none">+20 123 456 7890</a></div>
            </div>
        </div>
        <hr class="bg-secondary">
        <p class="text-center text-secondary mb-0">&copy; <span id="currentYear">2026</span> Blue Future. All rights reserved. Together for a water-secure future.</p>
    </div>
</footer>`;

// ==========================================
// 3️⃣ تحديث السنة
// ==========================================

function updateCurrentYear() {
    const yearSpan = document.getElementById('currentYear');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }
}

// ==========================================
// 4️⃣ تحميل الناڤبار
// ==========================================

function loadNavbar() {
    console.log('📍 Loading Navbar...');
    fetch('includes/navbar.html')
        .then(response => {
            if (!response.ok) throw new Error(`HTTP ${response.status}`);
            return response.text();
        })
        .then(html => {
            console.log('✅ Navbar loaded from file');
            document.body.insertAdjacentHTML('afterbegin', html);
            initNavbarBehaviors();
        })
        .catch(error => {
            console.warn('⚠️ Fetch failed, using fallback:', error.message);
            document.body.insertAdjacentHTML('afterbegin', navbarHTML);
            initNavbarBehaviors();
        });
}

// ==========================================
// 5️⃣ تحميل الفوتر
// ==========================================

function loadFooter() {
    console.log('📍 Loading Footer...');
    fetch('includes/footer.html')
        .then(response => {
            if (!response.ok) throw new Error(`HTTP ${response.status}`);
            return response.text();
        })
        .then(html => {
            console.log('✅ Footer loaded from file');
            document.body.insertAdjacentHTML('beforeend', html);
            updateCurrentYear();
        })
        .catch(error => {
            console.warn('⚠️ Fetch failed, using fallback:', error.message);
            document.body.insertAdjacentHTML('beforeend', footerHTML);
            updateCurrentYear();
        });
}

// ==========================================
// 6️⃣ تفعيل سلوك الناڤبار
// ==========================================

function initNavbarBehaviors() {
    try {
        const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
        const currentPage = window.location.pathname.split('/').pop() || 'index.html';

        navLinks.forEach(link => {
            const href = link.getAttribute('href');
            if (href === currentPage || (currentPage === '' && href === 'index.html')) {
                link.classList.add('active');
            }
        });

        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                const collapse = document.querySelector('.navbar-collapse');
                if (collapse && collapse.classList.contains('show')) {
                    document.querySelector('.navbar-toggler').click();
                }
            });
        });

        console.log('✅ Navbar behaviors initialized');
    } catch (error) {
        console.error('❌ Error initializing navbar behaviors:', error);
    }
}

// ==========================================
// 7️⃣ تشغيل عند تحميل الصفحة
// ==========================================

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        console.log('🚀 DOM Content Loaded');
        loadNavbar();
        loadFooter();
    });
} else {
    console.log('🚀 DOM Already Loaded');
    loadNavbar();
    loadFooter();
}