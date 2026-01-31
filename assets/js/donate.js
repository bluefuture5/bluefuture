/* Donation Page Script */
let selectedAmount = 0;

function initializeDonationForm() {
    const amountButtons = document.querySelectorAll('.amount-btn');
    const customAmountInput = document.getElementById('customAmount');
    const donationForm = document.getElementById('donationForm');

    amountButtons.forEach((button) => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            selectedAmount = parseFloat(button.getAttribute('data-amount'));
            amountButtons.forEach((btn) => btn.classList.remove('active'));
            button.classList.add('active');
            if (customAmountInput) customAmountInput.value = '';
            updateDonationSummary();
        });
    });

    if (customAmountInput) {
        customAmountInput.addEventListener('input', (e) => {
            const customValue = parseFloat(e.target.value) || 0;
            if (customValue > 0) {
                selectedAmount = customValue;
                amountButtons.forEach((btn) => btn.classList.remove('active'));
            }
            updateDonationSummary();
        });
    }

    if (donationForm) {
        donationForm.addEventListener('submit', handleDonationSubmit);
    }
}

function updateDonationSummary() {
    const donationAmountDisplay = document.getElementById('donationAmountDisplay');
    const processingFeeDisplay = document.getElementById('processingFee');
    const totalAmountDisplay = document.getElementById('totalAmount');

    if (!selectedAmount || selectedAmount <= 0) {
        donationAmountDisplay.textContent = '$0.00';
        processingFeeDisplay.textContent = '$0.00';
        totalAmountDisplay.textContent = '$0.00';
        return;
    }

    const processingFee = selectedAmount * 0.022 + 0.3;
    const total = selectedAmount + processingFee;

    donationAmountDisplay.textContent = '$' + selectedAmount.toFixed(2);
    processingFeeDisplay.textContent = '$' + processingFee.toFixed(2);
    totalAmountDisplay.textContent = '$' + total.toFixed(2);
}

function handleDonationSubmit(e) {
    e.preventDefault();
    if (!selectedAmount || selectedAmount <= 0) {
        alert('Please select or enter a donation amount.');
        return;
    }

    const donorName = document.getElementById('donorName').value.trim();
    const donorEmail = document.getElementById('donorEmail').value.trim();
    const donorMessage = document.getElementById('donorMessage').value.trim();
    const donationType = document.querySelector('input[name="donationType"]:checked').value;
    const paymentMethod = document.querySelector('input[name="paymentMethod"]:checked').value;
    const newsletter = document.getElementById('newsletter').checked;

    if (!donorName) return alert('Please enter your full name.');
    if (!donorEmail) return alert('Please enter your email address.');
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(donorEmail)) return alert('Please enter a valid email address.');

    const donationData = {
        amount: selectedAmount,
        donorName,
        donorEmail,
        donorMessage,
        donationType,
        paymentMethod,
        newsletter,
        timestamp: new Date().toISOString()
    };

    processPayment(donationData);
}

function processPayment(donationData) {
    const donateBtn = document.getElementById('donateBtn');
    if (!donateBtn) return;
    const originalText = donateBtn.textContent;
    donateBtn.disabled = true;
    donateBtn.textContent = 'Processing...';

    setTimeout(() => {
        showSuccessMessage(donationData);
        donateBtn.disabled = false;
        donateBtn.textContent = originalText;
    }, 1500);
}

function showSuccessMessage(donationData) {
    const form = document.getElementById('donationForm');
    if (!form) return;

    const successHTML = `
        <div class="alert alert-success alert-dismissible fade show" role="alert">
            <h5>Thank You for Your Donation!</h5>
            <p>We've received your donation of <strong>$${donationData.amount.toFixed(2)}</strong>.</p>
            <p>A confirmation email has been sent to <strong>${donationData.donorEmail}</strong>.</p>
            ${donationData.donationType === 'monthly' ? '<p class="mb-0">Your monthly donation will start next month. Thank you for becoming a Water Conservation Champion!</p>' : '<p class="mb-0">Thank you for supporting water conservation efforts!</p>'}
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>`;

    form.insertAdjacentHTML('beforebegin', successHTML);
    form.reset();
    selectedAmount = 0;
    document.querySelectorAll('.amount-btn').forEach((btn) => btn.classList.remove('active'));
    updateDonationSummary();
    const successEl = document.querySelector('.alert-success');
    successEl?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    saveDonationRecord(donationData);
}

function saveDonationRecord(donationData) {
    try {
        const donations = JSON.parse(localStorage.getItem('Blue FutureDonations')) || [];
        donations.push(donationData);
        localStorage.setItem('Blue FutureDonations', JSON.stringify(donations));
    } catch (err) {
        console.warn('Could not save donation record:', err);
    }
}

// Initialize Impact Counters with GSAP Animation
function initializeImpactCounters() {
    const statCards = document.querySelectorAll('.stat-card');

    if (!statCards.length) return;

    // Create an observer to trigger animation on scroll
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.dataset.animated) {
                const statValue = entry.target.querySelector('.stat-value');
                if (statValue) {
                    // Extract the number from the text (e.g., "184+" -> 184)
                    const text = statValue.textContent;
                    const number = parseInt(text.replace(/\D/g, ''));
                    const suffix = text.replace(/\d/g, ''); // Get the "+" or other suffix

                    if (!isNaN(number)) {
                        // Animate counter with GSAP
                        gsap.to({ value: 0 }, {
                            value: number,
                            duration: 2.5,
                            ease: 'power2.out',
                            onUpdate: function () {
                                statValue.textContent = Math.floor(this.targets()[0].value) + suffix;
                            }
                        });

                        entry.target.dataset.animated = 'true';
                    }
                }
            }
        });
    }, { threshold: 0.3 });

    statCards.forEach(card => observer.observe(card));
}

document.addEventListener('DOMContentLoaded', () => {
    initializeDonationForm();
    updateDonationSummary();
    initializeImpactCounters();
});
