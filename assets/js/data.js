// ========================================
// DATA.JS - Map and Charts Initialization
// ========================================

// Initialize Nile River Map
function initializeMap() {
    const mapElement = document.getElementById('nile-map');
    if (!mapElement) return;

    // Initialize Leaflet map centered on Egypt
    const map = L.map('nile-map').setView([26.8206, 30.8025], 6);

    // Add tile layer
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors',
        maxZoom: 18
    }).addTo(map);

    // Add markers for key Nile locations
    const nileLocations = [
        { name: "Cairo", coords: [30.0444, 31.2357], info: "Capital city on the Nile" },
        { name: "Aswan", coords: [24.0889, 32.8998], info: "Home of the Aswan High Dam" },
        { name: "Luxor", coords: [25.6872, 32.6396], info: "Ancient city on the Nile" },
        { name: "Alexandria", coords: [31.2001, 29.9187], info: "Mediterranean port city" }
    ];

    nileLocations.forEach(location => {
        L.marker(location.coords)
            .addTo(map)
            .bindPopup(`<strong>${location.name}</strong><br>${location.info}`);
    });

    // Add Nile River polyline
    const nileRiver = [
        [24.0889, 32.8998], // Aswan
        [25.6872, 32.6396], // Luxor
        [26.1833, 32.7167], // Qena
        [27.1833, 31.1833], // Asyut
        [28.0871, 30.7618], // Minya
        [30.0444, 31.2357], // Cairo
        [30.4667, 31.1833]  // Delta
    ];

    L.polyline(nileRiver, {
        color: '#1E90FF',
        weight: 4,
        opacity: 0.7
    }).addTo(map);
}

// Initialize Charts
function initializeCharts() {
    // Water Usage Chart
    const usageCtx = document.getElementById('usageChart');
    if (usageCtx) {
        new Chart(usageCtx, {
            type: 'doughnut',
            data: {
                labels: ['Agriculture', 'Industrial', 'Domestic'],
                datasets: [{
                    data: [85, 8, 7],
                    backgroundColor: [
                        '#1E90FF',
                        '#00BFFF',
                        '#0091d5'
                    ],
                    borderWidth: 2,
                    borderColor: '#fff'
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: true,
                plugins: {
                    legend: {
                        position: 'bottom',
                        labels: {
                            padding: 15,
                            font: {
                                size: 12,
                                family: "'Poppins', sans-serif"
                            }
                        }
                    },
                    tooltip: {
                        callbacks: {
                            label: function (context) {
                                return context.label + ': ' + context.parsed + '%';
                            }
                        }
                    }
                }
            }
        });
    }

    // Water Loss Chart
    const lossCtx = document.getElementById('lossChart');
    if (lossCtx) {
        new Chart(lossCtx, {
            type: 'line',
            data: {
                labels: ['2018', '2019', '2020', '2021', '2022', '2023'],
                datasets: [{
                    label: 'Water Loss (%)',
                    data: [32, 31, 30, 29, 28, 27],
                    borderColor: '#1E90FF',
                    backgroundColor: 'rgba(30, 144, 255, 0.1)',
                    tension: 0.4,
                    fill: true,
                    pointRadius: 5,
                    pointHoverRadius: 7,
                    pointBackgroundColor: '#1E90FF',
                    pointBorderColor: '#fff',
                    pointBorderWidth: 2
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: true,
                plugins: {
                    legend: {
                        display: false
                    },
                    tooltip: {
                        backgroundColor: 'rgba(0, 0, 0, 0.8)',
                        padding: 12,
                        titleFont: {
                            size: 14,
                            family: "'Poppins', sans-serif"
                        },
                        bodyFont: {
                            size: 13,
                            family: "'Poppins', sans-serif"
                        }
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        max: 40,
                        ticks: {
                            callback: function (value) {
                                return value + '%';
                            },
                            font: {
                                family: "'Poppins', sans-serif"
                            }
                        },
                        grid: {
                            color: 'rgba(0, 0, 0, 0.05)'
                        }
                    },
                    x: {
                        ticks: {
                            font: {
                                family: "'Poppins', sans-serif"
                            }
                        },
                        grid: {
                            display: false
                        }
                    }
                }
            }
        });
    }
}

// Animate stat counters
function animateStats() {
    const statCards = document.querySelectorAll('.stat-card');

    statCards.forEach(card => {
        const valueElement = card.querySelector('.stat-value');
        const target = parseFloat(valueElement.getAttribute('data-target') || 0);
        const unit = valueElement.getAttribute('data-unit') || '';
        const decimals = parseInt(valueElement.getAttribute('data-decimals') || 0);

        // Mock data for demonstration
        let finalValue = target;
        if (card.dataset.stat === 'renewable') {
            finalValue = 550;
        } else if (card.dataset.stat === 'drinking-water') {
            finalValue = 97.8;
        } else if (card.dataset.stat === 'population') {
            finalValue = 104.2;
        }

        // Update year
        const yearElement = card.querySelector('.stat-year');
        if (yearElement) {
            yearElement.textContent = '(2023 data)';
        }

        // Animate counter with GSAP
        if (typeof gsap !== 'undefined') {
            const obj = { value: 0 };
            gsap.to(obj, {
                value: finalValue,
                duration: 2.5,
                ease: "power2.out",
                onUpdate: function () {
                    valueElement.textContent = obj.value.toFixed(decimals) + ' ' + unit;
                }
            });
        } else {
            valueElement.textContent = finalValue.toFixed(decimals) + ' ' + unit;
        }
    });
}

// Load World Bank data
async function loadWorldBankData() {
    try {
        const response = await fetch('data/worldbank-data.json');
        const data = await response.json();

        // Process data for Egypt
        const egyptData = data.filter(item => item.country === 'Egypt');

        // Update stats based on real data
        egyptData.forEach(item => {
            if (item.indicator === 'Water Quality Index') {
                const card = document.querySelector('[data-stat="renewable"]');
                if (card) {
                    const valueElement = card.querySelector('.stat-value');
                    valueElement.setAttribute('data-target', item.value);
                }
            }
        });

        // Animate after data is loaded
        setTimeout(animateStats, 100);

    } catch (error) {
        console.error('Error loading World Bank data:', error);
        // Fallback to mock data
        setTimeout(animateStats, 100);
    }
}

// Initialize everything when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    initializeMap();
    initializeCharts();
    loadWorldBankData();

    // Animate stats on scroll
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateStats();
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });

    const statsSection = document.querySelector('.stats-section');
    if (statsSection) {
        observer.observe(statsSection);
    }
});
