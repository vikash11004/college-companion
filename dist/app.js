// Offline College Companion - localStorage-based data management
class OfflineStorage {
    constructor() {
        this.initializeStorage();
    }

    initializeStorage() {
        if (!localStorage.getItem('cc_subjects')) {
            localStorage.setItem('cc_subjects', JSON.stringify([]));
        }
        if (!localStorage.getItem('cc_assignments')) {
            localStorage.setItem('cc_assignments', JSON.stringify([]));
        }
        if (!localStorage.getItem('cc_exams')) {
            localStorage.setItem('cc_exams', JSON.stringify([]));
        }
        if (!localStorage.getItem('cc_attendance')) {
            localStorage.setItem('cc_attendance', JSON.stringify([]));
        }
        if (!localStorage.getItem('cc_settings')) {
            localStorage.setItem('cc_settings', JSON.stringify({theme: 'dark'}));
        }
    }

    // Generic CRUD operations
    getAll(entity) {
        return JSON.parse(localStorage.getItem(`cc_${entity}`) || '[]');
    }

    save(entity, data) {
        localStorage.setItem(`cc_${entity}`, JSON.stringify(data));
    }

    add(entity, item) {
        const items = this.getAll(entity);
        item.id = Date.now() + Math.random();
        item.created_at = new Date().toISOString();
        items.push(item);
        this.save(entity, items);
        return item;
    }

    update(entity, id, updates) {
        const items = this.getAll(entity);
        const index = items.findIndex(item => item.id == id);
        if (index !== -1) {
            items[index] = { ...items[index], ...updates };
            this.save(entity, items);
            return items[index];
        }
        return null;
    }

    delete(entity, id) {
        const items = this.getAll(entity);
        const filtered = items.filter(item => item.id != id);
        this.save(entity, filtered);
        return filtered.length !== items.length;
    }

    // Specific methods
    calculateCGPA() {
        const subjects = this.getAll('subjects');
        if (subjects.length === 0) return 0;

        const gradePoints = {
            'A+': 10, 'A': 9, 'B+': 8, 'B': 7,
            'C+': 6, 'C': 5, 'D': 4, 'F': 0
        };

        let totalCredits = 0;
        let totalPoints = 0;

        subjects.forEach(subject => {
            const credits = parseInt(subject.credits) || 0;
            const points = gradePoints[subject.grade] || 0;
            totalCredits += credits;
            totalPoints += credits * points;
        });

        return totalCredits > 0 ? (totalPoints / totalCredits).toFixed(2) : 0;
    }

    getUpcoming() {
        const assignments = this.getAll('assignments')
            .filter(a => a.status === 'pending' && new Date(a.due_date) >= new Date())
            .sort((a, b) => new Date(a.due_date) - new Date(b.due_date))
            .slice(0, 3);

        const exams = this.getAll('exams')
            .filter(e => e.status === 'upcoming' && new Date(e.exam_date) >= new Date())
            .sort((a, b) => new Date(a.exam_date) - new Date(b.exam_date))
            .slice(0, 3);

        return { assignments, exams };
    }
}

// Global storage instance
const storage = new OfflineStorage();

// Utility functions
function showFlash(message, type = 'success') {
    const existing = document.querySelector('.flash');
    if (existing) existing.remove();

    const flash = document.createElement('div');
    flash.className = `flash ${type}`;
    flash.textContent = message;
    
    const container = document.querySelector('.container');
    if (container) {
        container.insertBefore(flash, container.firstChild);
        setTimeout(() => flash.remove(), 3000);
    }
}

function formatDate(dateStr) {
    return new Date(dateStr).toLocaleDateString();
}

function setActiveNavItem(page) {
    document.querySelectorAll('.bottom-nav-item').forEach(item => {
        item.classList.toggle('active', item.getAttribute('href').includes(page));
    });
}

// Theme management
function initTheme() {
    const settings = JSON.parse(localStorage.getItem('cc_settings') || '{}');
    if (settings.theme === 'light') {
        document.body.classList.add('light-theme');
    }
}

function toggleTheme() {
    const isLight = document.body.classList.toggle('light-theme');
    const settings = JSON.parse(localStorage.getItem('cc_settings') || '{}');
    settings.theme = isLight ? 'light' : 'dark';
    localStorage.setItem('cc_settings', JSON.stringify(settings));
    showFlash(`Switched to ${isLight ? 'light' : 'dark'} theme`);
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    
    // Set active nav item based on current page
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    setActiveNavItem(currentPage.replace('.html', ''));
});

// Export for global use
window.storage = storage;
window.showFlash = showFlash;
window.formatDate = formatDate;
window.toggleTheme = toggleTheme;
