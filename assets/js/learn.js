// ========================================
// LEARN.JS - Country Water Explorer
// ========================================

let countriesData = [];
let selectedCountry = null;

// Get water category color and label
function getWaterCategoryInfo(category) {
    const categories = {
        poor: { label: "Water Poor Country", color: "#dc3545", bgColor: "rgba(220, 53, 69, 0.1)", textColor: "#dc3545" },
        moderate: { label: "Moderate Water Access", color: "#ffc107", bgColor: "rgba(255, 193, 7, 0.1)", textColor: "#ff9800" },
        rich: { label: "Water Rich Country", color: "#28a745", bgColor: "rgba(40, 167, 69, 0.1)", textColor: "#28a745" }
    };
    return categories[category] || categories.moderate;
}

// Load countries data
async function loadCountriesData() {
    try {
        console.log('🔄 Attempting to load countries from JSON...');
        let response;

        // Try multiple possible paths
        const paths = [
            'data/countries-water-data.json',
            './data/countries-water-data.json',
            '/Blue-Future/data/countries-water-data.json'
        ];

        for (let path of paths) {
            try {
                response = await fetch(path, { cache: 'no-cache' });
                if (response.ok) {
                    console.log(`✅ Loaded from: ${path}`);
                    break;
                }
            } catch (e) {
                console.log(`⚠️ Path failed: ${path}`);
                continue;
            }
        }

        if (!response || !response.ok) {
            throw new Error('Could not load from any path');
        }

        countriesData = await response.json();
        console.log('✅ Countries data loaded:', countriesData.length, 'countries');
        initializeCountryExplorer();
    } catch (error) {
        console.error('❌ Error loading countries data:', error);
        // Fallback data if fetch fails
        loadFallbackData();
    }
}

// Fallback data
function loadFallbackData() {
    countriesData = [
        { name: "Egypt", flag: "🇪🇬", waterAvailability: 550, waterCategory: "poor", waterQuality: 65, industrialUse: 8, agriculturalUse: 85, populationMillions: 104, safeWaterAccess: 99 },
        { name: "United States", flag: "🇺🇸", waterAvailability: 9000, waterCategory: "rich", waterQuality: 85, industrialUse: 41, agriculturalUse: 37, populationMillions: 331, safeWaterAccess: 99.5 },
        { name: "Brazil", flag: "🇧🇷", waterAvailability: 43000, waterCategory: "rich", waterQuality: 78, industrialUse: 11, agriculturalUse: 62, populationMillions: 215, safeWaterAccess: 97 },
        { name: "India", flag: "🇮🇳", waterAvailability: 1100, waterCategory: "poor", waterQuality: 58, industrialUse: 12, agriculturalUse: 90, populationMillions: 1417, safeWaterAccess: 92 },
        { name: "China", flag: "🇨🇳", waterAvailability: 2000, waterCategory: "moderate", waterQuality: 62, industrialUse: 22, agriculturalUse: 65, populationMillions: 1426, safeWaterAccess: 98 },
        { name: "Australia", flag: "🇦🇺", waterAvailability: 21000, waterCategory: "rich", waterQuality: 92, industrialUse: 11, agriculturalUse: 65, populationMillions: 26, safeWaterAccess: 100 },
        { name: "Germany", flag: "🇩🇪", waterAvailability: 2300, waterCategory: "moderate", waterQuality: 88, industrialUse: 21, agriculturalUse: 17, populationMillions: 84, safeWaterAccess: 100 },
        { name: "Japan", flag: "🇯🇵", waterAvailability: 3400, waterCategory: "rich", waterQuality: 86, industrialUse: 15, agriculturalUse: 63, populationMillions: 123, safeWaterAccess: 100 },
        { name: "South Africa", flag: "🇿🇦", waterAvailability: 900, waterCategory: "poor", waterQuality: 68, industrialUse: 10, agriculturalUse: 62, populationMillions: 60, safeWaterAccess: 93 },
        { name: "Canada", flag: "🇨🇦", waterAvailability: 87000, waterCategory: "rich", waterQuality: 94, industrialUse: 11, agriculturalUse: 12, populationMillions: 39, safeWaterAccess: 99.8 }
    ];
    console.log('✅ Using fallback data:', countriesData.length, 'countries');
    initializeCountryExplorer();
}

// Initialize the country explorer
function initializeCountryExplorer() {
    const container = document.getElementById('countriesContainer');
    console.log('Container element:', container);

    if (!container) {
        console.error('❌ countriesContainer element not found');
        return;
    }

    // Clear container
    container.innerHTML = '';

    // Create category sections
    const categories = ['poor', 'moderate', 'rich'];
    const categoryLabels = {
        poor: '🔴 Water Poor Countries',
        moderate: '🟡 Moderate Water Access',
        rich: '🟢 Water Rich Countries'
    };

    let totalCountries = 0;

    categories.forEach(category => {
        const countriesInCategory = countriesData.filter(c => c.waterCategory === category);
        console.log(`Category ${category}:`, countriesInCategory.length, 'countries');

        if (countriesInCategory.length === 0) return;

        const categorySection = document.createElement('div');
        categorySection.className = 'category-section';

        const categoryTitle = document.createElement('h4');
        categoryTitle.className = 'category-title';
        categoryTitle.textContent = categoryLabels[category];
        categorySection.appendChild(categoryTitle);

        const countriesGrid = document.createElement('div');
        countriesGrid.className = 'countries-grid-simplified';

        countriesInCategory.forEach(country => {
            const countryBtn = document.createElement('button');
            countryBtn.className = 'country-btn-simple';
            countryBtn.innerHTML = `<span class="country-flag">${country.flag}</span> <span>${country.name}</span>`;
            countryBtn.addEventListener('click', () => displayCountryData(country));
            countriesGrid.appendChild(countryBtn);
            totalCountries++;
        });

        categorySection.appendChild(countriesGrid);
        container.appendChild(categorySection);
    });

    console.log('✅ Explorer initialized with', totalCountries, 'countries');
}

// Display country data
function displayCountryData(country) {
    selectedCountry = country;

    const categoryInfo = getWaterCategoryInfo(country.waterCategory);
    const dataPanel = document.getElementById('countryDataPanel');

    if (!dataPanel) {
        console.error('❌ countryDataPanel element not found');
        return;
    }

    dataPanel.style.borderTop = `4px solid ${categoryInfo.color}`;
    dataPanel.innerHTML = `
        <div class="data-panel-header" style="border-bottom: 2px solid ${categoryInfo.bgColor};">
            <h3 class="data-panel-title">
                <span class="country-flag-large">${country.flag}</span>
                ${country.name}
            </h3>
            <div class="water-category-badge" style="background: ${categoryInfo.bgColor}; color: ${categoryInfo.textColor}; border: 2px solid ${categoryInfo.color};">
                ${categoryInfo.label}
            </div>
        </div>

        <div class="data-panel-content">
            <div class="data-metric">
                <div class="metric-icon">💧</div>
                <div class="metric-info">
                    <div class="metric-label">Freshwater Availability</div>
                    <div class="metric-value" style="color: ${categoryInfo.color};">
                        ${country.waterAvailability.toLocaleString()} m³/capita/year
                    </div>
                    <div class="metric-percentage">
                        <div class="percentage-bar">
                            <div class="percentage-fill" style="width: ${Math.min((country.waterAvailability / 20000) * 100, 100)}%; background: ${categoryInfo.color};"></div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="data-metric">
                <div class="metric-icon">⭐</div>
                <div class="metric-info">
                    <div class="metric-label">Water Quality Index</div>
                    <div class="metric-value">${country.waterQuality}/100</div>
                    <div class="metric-percentage">
                        <div class="percentage-bar">
                            <div class="percentage-fill" style="width: ${country.waterQuality}%; background: #1E90FF;"></div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="data-metrics-grid">
                <div class="mini-metric">
                    <div class="mini-metric-icon">🏭</div>
                    <div class="mini-metric-label">Industrial Use</div>
                    <div class="mini-metric-value">${country.industrialUse}%</div>
                </div>

                <div class="mini-metric">
                    <div class="mini-metric-icon">🌾</div>
                    <div class="mini-metric-label">Agricultural Use</div>
                    <div class="mini-metric-value">${country.agriculturalUse}%</div>
                </div>

                <div class="mini-metric">
                    <div class="mini-metric-icon">👥</div>
                    <div class="mini-metric-label">Population</div>
                    <div class="mini-metric-value">${country.populationMillions}M</div>
                </div>

                <div class="mini-metric">
                    <div class="mini-metric-icon">🚰</div>
                    <div class="mini-metric-label">Safe Drinking Water</div>
                    <div class="mini-metric-value">${country.safeWaterAccess}%</div>
                </div>
            </div>
        </div>
    `;

    // Scroll to data panel
    dataPanel.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

// Initialize on DOM load
document.addEventListener('DOMContentLoaded', () => {
    console.log('🌍 Initializing Water Explorer...');
    loadCountriesData();
});
