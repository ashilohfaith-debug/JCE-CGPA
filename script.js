document.addEventListener('DOMContentLoaded', () => {
    // Data Dictionaries (Regulation 2023)
    const semester1Subjects = [
        { code: 'JHS2121', name: 'English for Communicative Competence', credits: 3 },
        { code: 'JGE2102', name: 'Heritage of Tamils', credits: 1 },
        { code: 'JMA2121', name: 'Matrices and Calculus', credits: 3 },
        { code: 'JPH2101', name: 'Engineering Physics 1', credits: 3 },
        { code: 'JCY2101', name: 'Engineering Chemistry', credits: 3 },
        { code: 'JGE2101', name: 'Basic Engineering', credits: 3 },
        { code: 'JCS2121', name: 'Programming in C', credits: 4 },
        { code: 'JPC2111', name: 'Engineering Physics and Chemistry Laboratory', credits: 1 },
        { code: 'JGE2111', name: 'Basic Engineering Laboratory', credits: 1 }
    ];

    const semester2Subjects = [
        { code: 'JHS2221', name: 'English for Science and Technology', credits: 3 },
        { code: 'JGE2202', name: 'Tamils and Technology', credits: 1 },
        { code: 'JMA2221', name: 'Statistics for Engineers', credits: 3 },
        { code: 'JPH2201', name: 'Engineering Physics 2', credits: 3 },
        { code: 'JCY2201', name: 'Environmental Science and Sustainability', credits: 2 },
        { code: 'JGE2221', name: 'Engineering Graphics', credits: 3 },
        { code: 'JCS2201', name: 'Python Programming', credits: 3 },
        { code: 'JPC2211', name: 'Engineering Physics and Environmental Science Laboratory', credits: 1 },
        { code: 'JCS2211', name: 'Python Programming Laboratory', credits: 2 },
        { code: 'JGE2241', name: 'Gaming and Crafts studio', credits: 2 }
    ];

    // State Variables
    let sem1TotalCredits = 22;
    let sem2TotalCredits = 23;
    let sem1GPA = 0;
    let sem2GPA = 0;

    // DOM Elements
    const sem1Container = document.getElementById('sem1-subjects');
    const sem2Container = document.getElementById('sem2-subjects');
    const template = document.getElementById('subject-row-template');
    const toastContainer = document.getElementById('toast-container');
    const themeToggleBtn = document.getElementById('theme-toggle');
    const moonIcon = document.getElementById('moon-icon');
    const sunIcon = document.getElementById('sun-icon');
    const scrollTopBtn = document.getElementById('scroll-top-btn');

    // Stats Elements
    const statSem1GPA = document.getElementById('stat-sem1-gpa');
    const statSem2GPA = document.getElementById('stat-sem2-gpa');
    const statCGPA = document.getElementById('stat-cgpa');

    // Initialize the App
    function init() {
        renderSubjects(sem1Subjects, sem1Container, 'sem1');
        renderSubjects(sem2Subjects, sem2Container, 'sem2');
        
        loadTheme();
        loadLocalStorage();
        updateProgress('sem1');
        updateProgress('sem2');
        updateStatsCard();

        setupEventListeners();
    }

    // Render Subjects to DOM
    function renderSubjects(subjects, container, semesterId) {
        subjects.forEach((subject, index) => {
            const clone = template.content.cloneNode(true);
            const row = clone.querySelector('.subject-row');
            const select = clone.querySelector('.grade-select');
            
            clone.querySelector('.subject-name').textContent = subject.name;
            
            select.dataset.credits = subject.credits;
            select.dataset.id = `${semesterId}-subj-${index}`;
            select.id = `${semesterId}-subj-${index}`;
            
            // Add change listener for progress update & auto-save
            select.addEventListener('change', () => {
                updateProgress(semesterId);
                saveLocalStorage();
            });

            container.appendChild(clone);
        });
    }

    // Calculate Semester GPA
    function calculateSemester(semesterId, containerId, displayId, resultOverlayId) {
        if (!validateInputs(containerId)) {
            showToast('Please select grades for all subjects.', 'error');
            return null;
        }

        const container = document.getElementById(containerId);
        const selects = container.querySelectorAll('.grade-select');
        
        let totalGradePoints = 0;
        let totalCredits = 0;

        selects.forEach(select => {
            const grade = parseFloat(select.value);
            const credits = parseInt(select.dataset.credits, 10);
            
            totalGradePoints += (grade * credits);
            totalCredits += credits;
        });

        const gpa = totalGradePoints / totalCredits;
        const formattedGPA = gpa.toFixed(2);
        
        // Show result overlay
        const display = document.getElementById(displayId);
        display.textContent = formattedGPA;
        document.getElementById(resultOverlayId).classList.remove('hidden');
        
        showToast(`${semesterId === 'sem1' ? 'Semester 1' : 'Semester 2'} GPA calculated successfully!`, 'success');
        
        return parseFloat(formattedGPA);
    }

    // Calculate CGPA
    function calculateCGPA() {
        if (sem1GPA === 0 || sem2GPA === 0) {
            showToast('Please calculate both Semester 1 and Semester 2 GPA first.', 'error');
            return;
        }

        const cgpa = ((sem1GPA + sem2GPA) / 2).toFixed(2);
        
        // Show CGPA result overlay
        document.getElementById('cgpa-display').textContent = cgpa;
        const resultOverlay = document.getElementById('cgpa-result');
        resultOverlay.classList.remove('hidden');
        
        // Trigger Confetti
        createConfetti();
        
        statCGPA.textContent = cgpa;
        saveLocalStorage();
        
        showToast('CGPA calculated successfully!', 'success');
    }

    // Validate if all grades are selected
    function validateInputs(containerId) {
        const container = document.getElementById(containerId);
        const selects = container.querySelectorAll('.grade-select');
        let isValid = true;

        selects.forEach(select => {
            if (select.value === "") {
                isValid = false;
                select.parentElement.parentElement.parentElement.style.borderColor = 'var(--error)';
            } else {
                select.parentElement.parentElement.parentElement.style.borderColor = 'var(--border-color)';
            }
        });

        return isValid;
    }

    // Update Progress Bar
    function updateProgress(semesterId) {
        const container = document.getElementById(`${semesterId}-subjects`);
        const selects = container.querySelectorAll('.grade-select');
        let selectedCount = 0;
        
        selects.forEach(select => {
            if (select.value !== "") selectedCount++;
        });

        const totalCount = selects.length;
        const percentage = (selectedCount / totalCount) * 100;

        document.getElementById(`${semesterId}-progress-text`).textContent = `${selectedCount} / ${totalCount} Grades Selected`;
        document.getElementById(`${semesterId}-progress-fill`).style.width = `${percentage}%`;
    }

    // Update Stats Card
    function updateStatsCard() {
        statSem1GPA.textContent = sem1GPA > 0 ? sem1GPA.toFixed(2) : '-';
        statSem2GPA.textContent = sem2GPA > 0 ? sem2GPA.toFixed(2) : '-';
        
        if (sem1GPA > 0 && sem2GPA > 0) {
            statCGPA.textContent = ((sem1GPA + sem2GPA) / 2).toFixed(2);
        } else {
            statCGPA.textContent = '-';
        }
    }

    // Reset Functionality
    function resetSemester(semesterId) {
        const container = document.getElementById(`${semesterId}-subjects`);
        const selects = container.querySelectorAll('.grade-select');
        
        selects.forEach(select => {
            select.value = "";
            select.parentElement.parentElement.parentElement.style.borderColor = 'var(--border-color)';
        });
        
        if (semesterId === 'sem1') {
            sem1GPA = 0;
        } else {
            sem2GPA = 0;
        }
        
        updateProgress(semesterId);
        updateStatsCard();
        saveLocalStorage();
        showToast(`${semesterId === 'sem1' ? 'Semester 1' : 'Semester 2'} reset.`, 'success');
    }

    function resetAll() {
        resetSemester('sem1');
        resetSemester('sem2');
        localStorage.removeItem('jce-cgpa-data');
        showToast('All data reset.', 'success');
    }

    // Local Storage
    function saveLocalStorage() {
        const data = {
            sem1: getSemesterData('sem1-subjects'),
            sem2: getSemesterData('sem2-subjects'),
            sem1GPA: sem1GPA,
            sem2GPA: sem2GPA
        };
        localStorage.setItem('jce-cgpa-data', JSON.stringify(data));
    }

    function loadLocalStorage() {
        const dataStr = localStorage.getItem('jce-cgpa-data');
        if (dataStr) {
            const data = JSON.parse(dataStr);
            setSemesterData('sem1-subjects', data.sem1 || {});
            setSemesterData('sem2-subjects', data.sem2 || {});
            sem1GPA = data.sem1GPA || 0;
            sem2GPA = data.sem2GPA || 0;
        }
    }

    function getSemesterData(containerId) {
        const data = {};
        const container = document.getElementById(containerId);
        const selects = container.querySelectorAll('.grade-select');
        selects.forEach(select => {
            if (select.value !== "") {
                data[select.id] = select.value;
            }
        });
        return data;
    }

    function setSemesterData(containerId, data) {
        const container = document.getElementById(containerId);
        const selects = container.querySelectorAll('.grade-select');
        selects.forEach(select => {
            if (data[select.id]) {
                select.value = data[select.id];
            }
        });
    }

    // Toast Notifications
    function showToast(message, type = 'success') {
        const toast = document.createElement('div');
        toast.className = `toast ${type}`;
        
        const icon = type === 'success' 
            ? '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>'
            : '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>';
            
        toast.innerHTML = `${icon} <span>${message}</span>`;
        
        toastContainer.appendChild(toast);
        
        setTimeout(() => {
            toast.classList.add('fade-out');
            setTimeout(() => {
                toast.remove();
            }, 300);
        }, 3000);
    }

    // Theme Logic
    function loadTheme() {
        const savedTheme = localStorage.getItem('jce-theme');
        if (savedTheme === 'dark') {
            document.body.classList.add('dark-theme');
            moonIcon.style.display = 'none';
            sunIcon.style.display = 'block';
        }
    }

    function toggleTheme() {
        document.body.classList.toggle('dark-theme');
        const isDark = document.body.classList.contains('dark-theme');
        
        if (isDark) {
            moonIcon.style.display = 'none';
            sunIcon.style.display = 'block';
            localStorage.setItem('jce-theme', 'dark');
        } else {
            moonIcon.style.display = 'block';
            sunIcon.style.display = 'none';
            localStorage.setItem('jce-theme', 'light');
        }
    }

    // Confetti Animation
    function createConfetti() {
        const container = document.getElementById('confetti-container');
        container.innerHTML = '';
        const colors = ['#2563EB', '#7C3AED', '#06B6D4', '#10B981', '#F59E0B'];
        
        for (let i = 0; i < 100; i++) {
            const confetti = document.createElement('div');
            confetti.classList.add('confetti');
            confetti.style.left = `${Math.random() * 100}%`;
            confetti.style.top = `-10px`;
            confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            confetti.style.animationDuration = `${Math.random() * 2 + 1}s`;
            confetti.style.animationDelay = `${Math.random() * 0.5}s`;
            container.appendChild(confetti);
        }
    }

    // Setup Event Listeners
    function setupEventListeners() {
        document.getElementById('calc-sem1-btn').addEventListener('click', (e) => {
            createRipple(e);
            const gpa = calculateSemester('sem1', 'sem1-subjects', 'sem1-gpa-display', 'sem1-result');
            if (gpa !== null) {
                sem1GPA = gpa;
                updateStatsCard();
                saveLocalStorage();
            }
        });

        document.getElementById('calc-sem2-btn').addEventListener('click', (e) => {
            createRipple(e);
            const gpa = calculateSemester('sem2', 'sem2-subjects', 'sem2-gpa-display', 'sem2-result');
            if (gpa !== null) {
                sem2GPA = gpa;
                updateStatsCard();
                saveLocalStorage();
            }
        });

        document.getElementById('calc-cgpa-btn').addEventListener('click', (e) => {
            createRipple(e);
            calculateCGPA();
        });

        document.getElementById('reset-sem1-btn').addEventListener('click', () => resetSemester('sem1'));
        document.getElementById('reset-sem2-btn').addEventListener('click', () => resetSemester('sem2'));
        document.getElementById('reset-all-btn').addEventListener('click', resetAll);
        
        themeToggleBtn.addEventListener('click', toggleTheme);

        // Close Overlays
        document.querySelectorAll('.close-result').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const target = e.target.dataset.target;
                document.getElementById(target).classList.add('hidden');
                document.getElementById('confetti-container').innerHTML = ''; // clear confetti
            });
        });

        // Scroll to Top
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                scrollTopBtn.classList.remove('hidden');
            } else {
                scrollTopBtn.classList.add('hidden');
            }
        });

        scrollTopBtn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // Ripple Effect Logic
    function createRipple(event) {
        const button = event.currentTarget;
        const circle = document.createElement("span");
        const diameter = Math.max(button.clientWidth, button.clientHeight);
        const radius = diameter / 2;

        const rect = button.getBoundingClientRect();
        circle.style.width = circle.style.height = `${diameter}px`;
        circle.style.left = `${event.clientX - rect.left - radius}px`;
        circle.style.top = `${event.clientY - rect.top - radius}px`;
        circle.classList.add("ripple");

        const ripple = button.querySelector(".ripple");
        if (ripple) {
            ripple.remove();
        }

        button.appendChild(circle);
    }

    // Run Init
    init();
});
