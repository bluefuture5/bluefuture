/**
 * Community Page Script
 * Handles ambassador form and displays current ambassadors
 */

// Placeholder ambassadors data
const ambassadorsData = [
    { name: 'Fatima Ahmed', age: 16, country: 'Egypt', motivation: 'Passionate about protecting the Nile', avatar: '👩‍🦰' },
    { name: 'Omar Hassan', age: 17, country: 'Egypt', motivation: 'Water champion in my school', avatar: '👨‍🦱' },
    { name: 'Leila Mansour', age: 15, country: 'Egypt', motivation: 'Inspired by nature conservation', avatar: '👩‍🦳' },
    { name: 'Karim Ibrahim', age: 18, country: 'Sudan', motivation: 'Fighting water scarcity in Africa', avatar: '👨‍🦲' },
    { name: 'Noor Samir', age: 16, country: 'Egypt', motivation: 'Youth for sustainable water', avatar: '👩‍🦰' },
    { name: 'Ahmed Saleh', age: 17, country: 'Egypt', motivation: 'Environmental activist', avatar: '👨‍🦳' }
];

/**
 * Display current ambassadors
 */
function displayAmbassadors() {
    const container = document.getElementById('ambassadorsList');
    if (!container) return;

    container.innerHTML = ambassadorsData.map((amb, index) => `
        <div class="ambassador-card" style="animation: fadeInUp 0.5s ease forwards; animation-delay: ${index * 0.1}s;">
            <div class="ambassador-avatar">${amb.avatar}</div>
            <div class="ambassador-name">${amb.name}</div>
            <div class="ambassador-role">${amb.country} • Age ${amb.age}</div>
            <p style="font-size: 0.85rem; color: var(--text-light); margin-top: 1rem;">"${amb.motivation}"</p>
        </div>
    `).join('');
}


/**
 * Initialize Community page
 */
function initializeCommunityPage() {
    console.log('🤝 Initializing Community Page...');

    displayAmbassadors();

    console.log('✅ Community Page Initialized!');
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeCommunityPage);
} else {
    initializeCommunityPage();
}
