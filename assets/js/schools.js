/* Schools Page Script */

function initializeSchoolForm() {
    const form = document.getElementById('schoolForm');
    if (!form) return;

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const schoolName = document.getElementById('schoolName').value.trim();
        const location = document.getElementById('schoolLocation').value.trim();
        const students = parseInt(document.getElementById('schoolStudents').value, 10);
        const activityType = document.getElementById('activityType').value;

        if (!schoolName || !location || !students || !activityType) {
            showMessage('Please fill in all required fields', 'error');
            return;
        }
        if (students < 10) {
            showMessage('We work with schools of at least 10 students', 'error');
            return;
        }

        console.log('📝 School Session Request:', {
            schoolName,
            location,
            students,
            activityType,
            timestamp: new Date().toLocaleString()
        });

        form.reset();
        showMessage("✅ Thank you! We'll contact you within 2-3 business days to arrange the session.", 'success');
    });
}

function showMessage(message, type) {
    const messageEl = document.getElementById('schoolMessage');
    if (!messageEl) return;
    messageEl.textContent = message;
    messageEl.style.color = type === 'success' ? '#00ff88' : '#ffeb3b';
    setTimeout(() => { messageEl.textContent = ''; }, 5000);
}

function initializeSchoolsPage() {
    initializeSchoolForm();
}

document.addEventListener('DOMContentLoaded', initializeSchoolsPage);
