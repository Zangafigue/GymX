/*
GymX Premium Fitness Website - JavaScript
Interactive features: schedule display, form validation, theme toggle
*/

// DOM Content Loaded Event
document.addEventListener('DOMContentLoaded', function() {
    initializeHeader();
    initializeThemeToggle();
    initializeMobileMenu();
    initializeSchedule();
    initializeContactForm();
    initializeSmoothScrolling();
    initializeAnimations();
    initializeAuthModal();
});

// Header Scroll Effect
function initializeHeader() {
    const header = document.querySelector('.header');
    
    function updateHeader() {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    }
    
    window.addEventListener('scroll', updateHeader);
    updateHeader(); // Initial check
}

// Theme Toggle Functionality
function initializeThemeToggle() {
    const themeToggle = document.getElementById('themeToggle');
    const body = document.body;
    const savedTheme = localStorage.getItem('theme') || 'light';
    body.setAttribute('data-theme', savedTheme);
    
    themeToggle.addEventListener('click', function() {
        const currentTheme = body.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        body.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        
        // Add a small animation effect
        themeToggle.style.transform = 'scale(0.9)';
        setTimeout(() => {
            themeToggle.style.transform = 'scale(1)';
        }, 150);
    });
}

// Mobile Menu Toggle
function initializeMobileMenu() {
    const mobileMenuToggle = document.getElementById('mobileMenuToggle');
    const mobileMenu = document.getElementById('mobileMenu');
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
    
    mobileMenuToggle.addEventListener('click', function() {
        mobileMenu.classList.toggle('active');
        
        // Animate hamburger menu
        const spans = mobileMenuToggle.querySelectorAll('span');
        if (mobileMenu.classList.contains('active')) {
            spans[0].style.transform = 'rotate(45deg) translateY(6px)';
            spans[1].style.opacity = '0';
            spans[2].style.transform = 'rotate(-45deg) translateY(-6px)';
        } else {
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        }
    });
    
    // Close mobile menu when clicking on a link
    mobileNavLinks.forEach(link => {
        link.addEventListener('click', function() {
            mobileMenu.classList.remove('active');
            const spans = mobileMenuToggle.querySelectorAll('span');
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        });
    });
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!mobileMenu.contains(e.target) && !mobileMenuToggle.contains(e.target)) {
            mobileMenu.classList.remove('active');
            const spans = mobileMenuToggle.querySelectorAll('span');
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        }
    });
}

// Schedule Data and Functionality
function initializeSchedule() {
    const scheduleData = {
        monday: [
            { class: 'Morning Yoga', time: '7:00 AM', trainer: 'Emma Davis', spots: '8/12 spots available' },
            { class: 'HIIT Cardio', time: '12:00 PM', trainer: 'Mike Chen', spots: '5/10 spots available' },
            { class: 'Strength Training', time: '6:00 PM', trainer: 'Sarah Johnson', spots: '3/8 spots available' }
        ],
        tuesday: [
            { class: 'Boxing', time: '8:00 AM', trainer: 'Mike Chen', spots: '6/10 spots available' },
            { class: 'Yoga Flow', time: '1:00 PM', trainer: 'Emma Davis', spots: '10/12 spots available' },
            { class: 'Strength & Conditioning', time: '7:00 PM', trainer: 'Sarah Johnson', spots: '2/8 spots available' }
        ],
        wednesday: [
            { class: 'HIIT Blast', time: '6:30 AM', trainer: 'Mike Chen', spots: '4/10 spots available' },
            { class: 'Mindful Yoga', time: '12:30 PM', trainer: 'Emma Davis', spots: '9/12 spots available' },
            { class: 'PowerLifting', time: '6:30 PM', trainer: 'Sarah Johnson', spots: '5/8 spots available' }
        ],
        thursday: [
            { class: 'Boxing Fundamentals', time: '7:30 AM', trainer: 'Mike Chen', spots: '7/10 spots available' },
            { class: 'Vinyasa Yoga', time: '1:30 PM', trainer: 'Emma Davis', spots: '8/12 spots available' },
            { class: 'CrossFit', time: '7:30 PM', trainer: 'Sarah Johnson', spots: '1/8 spots available' }
        ],
        friday: [
            { class: 'HIIT Circuit', time: '7:00 AM', trainer: 'Mike Chen', spots: '6/10 spots available' },
            { class: 'Restorative Yoga', time: '12:00 PM', trainer: 'Emma Davis', spots: '11/12 spots available' },
            { class: 'Functional Training', time: '6:00 PM', trainer: 'Sarah Johnson', spots: '4/8 spots available' }
        ],
        saturday: [
            { class: 'Weekend Warrior', time: '9:00 AM', trainer: 'Sarah Johnson', spots: '6/10 spots available' },
            { class: 'Yoga & Meditation', time: '11:00 AM', trainer: 'Emma Davis', spots: '8/15 spots available' },
            { class: 'Boxing Bootcamp', time: '2:00 PM', trainer: 'Mike Chen', spots: '5/12 spots available' }
        ]
    };
    
    const scheduleGrid = document.getElementById('scheduleGrid');
    const filterBtns = document.querySelectorAll('.filter-btn');
    
    function renderSchedule(day = 'all') {
        scheduleGrid.innerHTML = '';
        
        if (day === 'all') {
            // Show all days
            Object.keys(scheduleData).forEach(dayKey => {
                scheduleData[dayKey].forEach(item => {
                    const scheduleItem = createScheduleItem(item, dayKey);
                    scheduleGrid.appendChild(scheduleItem);
                });
            });
        } else {
            // Show specific day
            if (scheduleData[day]) {
                scheduleData[day].forEach(item => {
                    const scheduleItem = createScheduleItem(item, day);
                    scheduleGrid.appendChild(scheduleItem);
                });
            }
        }
        
        // Add animation to new items
        const items = scheduleGrid.querySelectorAll('.schedule-item');
        items.forEach((item, index) => {
            item.style.opacity = '0';
            item.style.transform = 'translateY(20px)';
            setTimeout(() => {
                item.style.transition = 'all 0.3s ease';
                item.style.opacity = '1';
                item.style.transform = 'translateY(0)';
            }, index * 100);
        });
    }
    
    function createScheduleItem(item, day) {
        const scheduleItem = document.createElement('div');
        scheduleItem.className = 'schedule-item';
        scheduleItem.innerHTML = `
            <div class="schedule-header">
                <span class="schedule-class">${item.class}</span>
                <span class="schedule-time">${item.time}</span>
            </div>
            <div class="schedule-trainer">Trainer: ${item.trainer}</div>
            <div class="schedule-spots">${item.spots}</div>
            <button class="btn btn-primary" style="margin-top: 1rem; width: 100%;" onclick="bookClass('${item.class}', '${day}', '${item.time}')">
                Book Now
            </button>
        `;
        return scheduleItem;
    }
    
    // Filter button functionality
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const day = this.getAttribute('data-day');
            
            // Update active button
            filterBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            // Render schedule for selected day
            renderSchedule(day);
        });
    });
    
    // Initial render
    renderSchedule();
}

// Book Class Function
function bookClass(className, day, time) {
    if (localStorage.getItem('gymxLogged') !== '1') {
        showToast('Please log in to book a class!');
        openModal('authModal');
        return;
    }
    let bookings = JSON.parse(localStorage.getItem('gymxBookings') || '[]');
    if (bookings.some(b => b.className === className && b.day === day && b.time === time)) {
        showToast('You have already booked this class!');
        return;
    }
    bookings.push({ className, day, time });
    localStorage.setItem('gymxBookings', JSON.stringify(bookings));
    showToast(`Booking confirmed for ${className} on ${day.charAt(0).toUpperCase() + day.slice(1)} at ${time}.`);
    updateBookingsList();
    showSection('dashboard');
}

function updateBookingsList() {
    const bookingsList = document.getElementById('bookingsList');
    const noBookingsMsg = document.getElementById('noBookingsMsg');
    if (!bookingsList || !noBookingsMsg) return;
    let bookings = JSON.parse(localStorage.getItem('gymxBookings') || '[]');
    bookingsList.innerHTML = '';
    if (bookings.length === 0) {
        noBookingsMsg.style.display = 'block';
        return;
    }
    noBookingsMsg.style.display = 'none';
    bookings.forEach((b, i) => {
        const li = document.createElement('li');
        li.textContent = `${b.className} on ${b.day.charAt(0).toUpperCase() + b.day.slice(1)} at ${b.time}`;
        const cancelBtn = document.createElement('button');
        cancelBtn.textContent = 'Cancel';
        cancelBtn.className = 'btn btn-secondary btn-xs';
        cancelBtn.style.marginLeft = '1rem';
        cancelBtn.onclick = function() {
            bookings.splice(i, 1);
            localStorage.setItem('gymxBookings', JSON.stringify(bookings));
            updateBookingsList();
        };
        li.appendChild(cancelBtn);
        bookingsList.appendChild(li);
    });
}

// Mets à jour la liste au chargement du dashboard
window.addEventListener('DOMContentLoaded', function() {
    if (localStorage.getItem('gymxLogged') === '1') {
        updateBookingsList();
    }
});

// Contact Form Validation
function initializeContactForm() {
    const form = document.getElementById('contactForm');
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const phoneInput = document.getElementById('phone');
    const membershipSelect = document.getElementById('membership');
    
    // Real-time validation
    nameInput.addEventListener('blur', validateName);
    emailInput.addEventListener('blur', validateEmail);
    phoneInput.addEventListener('blur', validatePhone);
    membershipSelect.addEventListener('change', validateMembership);
    
    // Form submission
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const isNameValid = validateName();
        const isEmailValid = validateEmail();
        const isPhoneValid = validatePhone();
        const isMembershipValid = validateMembership();
        
        if (isNameValid && isEmailValid && isPhoneValid && isMembershipValid) {
            // Simulate form submission
            submitForm();
        }
    });
    
    function validateName() {
        const name = nameInput.value.trim();
        const errorElement = document.getElementById('nameError');
        
        if (name.length < 2) {
            showError(errorElement, 'Name must be at least 2 characters long');
            return false;
        }
        
        hideError(errorElement);
        return true;
    }
    
    function validateEmail() {
        const email = emailInput.value.trim();
        const errorElement = document.getElementById('emailError');
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            showError(errorElement, 'Please enter a valid email address (ex: john@email.com)');
            return false;
        }
        hideError(errorElement);
        return true;
    }
    
    function validatePhone() {
        const phone = phoneInput.value.trim();
        const errorElement = document.getElementById('phoneError');
        // Accepts international and local formats (at least 8 digits)
        const phoneRegex = /^(\+?\d{1,3}[-.\s]?)?(\(?\d{2,4}\)?[-.\s]?)?[\d\-.\s]{6,}$/;
        if (!phoneRegex.test(phone)) {
            showError(errorElement, 'Please enter a valid phone number (at least 8 digits, numbers only).');
            return false;
        }
        hideError(errorElement);
        return true;
    }
    
    function validateMembership() {
        const membership = membershipSelect.value;
        const errorElement = document.getElementById('membershipError');
        
        if (!membership) {
            showError(errorElement, 'Please select a membership plan');
            return false;
        }
        
        hideError(errorElement);
        return true;
    }
    
    function showError(element, message) {
        element.textContent = message;
        element.classList.add('show');
        element.parentElement.querySelector('input, select').style.borderColor = 'var(--primary)';
    }
    
    function hideError(element) {
        element.classList.remove('show');
        element.parentElement.querySelector('input, select').style.borderColor = 'var(--border)';
    }
    
    function submitForm() {
        const submitBtn = form.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        
        // Show loading state
        submitBtn.textContent = 'Processing...';
        submitBtn.disabled = true;
        submitBtn.classList.add('loading');
        
        // Simulate API call
        setTimeout(() => {
            alert('Thank you for your interest! We will contact you within 24 hours to complete your membership setup.');
            
            // Reset form
            form.reset();
            
            // Reset button
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
            submitBtn.classList.remove('loading');
        }, 2000);
    }
}

// Smooth Scrolling
function initializeSmoothScrolling() {
    // Handle navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = target.offsetTop - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Global scroll to section function
function scrollToSection(selector) {
    const target = document.querySelector(selector);
    if (target) {
        const headerHeight = document.querySelector('.header').offsetHeight;
        const targetPosition = target.offsetTop - headerHeight - 20;
        
        window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
        });
    }
}

// Intersection Observer for Animations
function initializeAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-up');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animateElements = document.querySelectorAll(
        '.class-card, .trainer-card, .pricing-card, .contact-item, .section-header'
    );
    
    animateElements.forEach(el => {
        observer.observe(el);
    });
}

// --- Auth Modal Logic ---
function initializeAuthModal() {
    // Modal open/close logic
    document.querySelectorAll('[data-modal]').forEach(btn => {
        btn.addEventListener('click', function() {
            const modalId = this.getAttribute('data-modal');
            openModal(modalId);
        });
    });
    
    document.querySelectorAll('.modal-close').forEach(btn => {
        btn.addEventListener('click', function() {
            const modalId = this.closest('.modal').id;
            closeModal(modalId);
        });
    });
}

function openModal(id) {
    document.getElementById(id).setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    showAuthStep('choice');
}

function closeModal(id) {
    document.getElementById(id).setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
}

function showAuthStep(step) {
    document.querySelectorAll('#auth-steps .auth-step').forEach(el => el.style.display = 'none');
    if (step === 'register') document.getElementById('auth-register').style.display = 'flex';
    else if (step === 'login') document.getElementById('auth-login').style.display = 'flex';
    else if (step === 'member') document.getElementById('auth-member').style.display = 'flex';
    else document.getElementById('auth-choice').style.display = 'flex';
}

function handleRegister(e) {
    e.preventDefault();
    const name = document.getElementById('regName').value.trim();
    const email = document.getElementById('regEmail').value.trim();
    const pass = document.getElementById('regPassword').value;
    if (name.length < 2 || !email.includes('@') || pass.length < 4) {
        document.getElementById('registerMsg').textContent = "Please fill all fields correctly.";
        return false;
    }
    localStorage.setItem('gymxUser', JSON.stringify({ name, email, pass }));
    document.getElementById('registerMsg').textContent = "Account created! You can now log in.";
    setTimeout(() => showAuthStep('login'), 1200);
    return false;
}

function handleLogin(e) {
    e.preventDefault();
    const email = document.getElementById('loginEmail').value.trim();
    const pass = document.getElementById('loginPassword').value;
    const user = JSON.parse(localStorage.getItem('gymxUser') || '{}');
    if (user.email === email && user.pass === pass) {
        document.getElementById('loginMsg').textContent = "";
        document.getElementById('memberName').textContent = user.name;
        localStorage.setItem('gymxLogged', '1');
        showAuthStep('member');
        closeModal('authModal');
        showSection('dashboard');
        document.getElementById('dashboardName').textContent = user.name;
    } else {
        document.getElementById('loginMsg').textContent = "Invalid credentials.";
    }
    return false;
}

function logout() {
    localStorage.removeItem('gymxLogged');
    showSection('main');
    closeModal('authModal');
}

function showSection(section) {
    // Toujours masquer les sections dynamiques sauf dashboard et locations
    document.getElementById('dashboardSection').style.display = 'none';
    document.getElementById('contactSupportSection').style.display = 'none';
    document.getElementById('locationsSection').style.display = 'none';

    if (section === 'dashboard') {
        document.getElementById('dashboardSection').style.display = 'block';
    }
    if (section === 'contactSupport') {
        document.getElementById('contactSupportSection').style.display = 'block';
    }
    if (section === 'locations') {
        // Affiche dashboard ET locations
        document.getElementById('dashboardSection').style.display = 'block';
        document.getElementById('locationsSection').style.display = 'block';
        // Scroll automatique vers la section locations
        setTimeout(() => {
            document.getElementById('locationsSection').scrollIntoView({ behavior: 'smooth' });
        }, 100);
    }
    if (section === 'main') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
}

// Service client (support)
function handleSupport(e) {
    e.preventDefault();
    const subject = document.getElementById('supportSubject').value.trim();
    const msg = document.getElementById('supportMessage').value.trim();
    if (subject.length < 2 || msg.length < 10) {
        document.getElementById('supportMsg').textContent = "Please fill all fields.";
        return false;
    }
    document.getElementById('supportMsg').textContent = "Message sent! Our team will reply soon.";
    setTimeout(() => {
        document.getElementById('supportMsg').textContent = "";
        showSection('dashboard');
    }, 1800);
    return false;
}

// Ferme la modale si clic en dehors
document.addEventListener('mousedown', function(e) {
    const modal = document.getElementById('authModal');
    if (modal.getAttribute('aria-hidden') === 'false' && !modal.querySelector('.modal-content').contains(e.target)) {
        closeModal('authModal');
    }
});

// Affiche dashboard si déjà connecté
window.addEventListener('DOMContentLoaded', function() {
    if (localStorage.getItem('gymxLogged') === '1') {
        const user = JSON.parse(localStorage.getItem('gymxUser') || '{}');
        document.getElementById('dashboardName').textContent = user.name || '';
        showSection('dashboard');
    }
});

// Performance Monitoring
function initializePerformanceMonitoring() {
    // Monitor page load performance
    window.addEventListener('load', function() {
        const loadTime = performance.now();
        console.log(`Page loaded in ${Math.round(loadTime)}ms`);
        
        // Track Core Web Vitals if available
        if ('web-vital' in window) {
            // Implementation would go here
        }
    });
}

// Error Handling
window.addEventListener('error', function(e) {
    console.error('JavaScript Error:', e.error);
    // In production, this would send errors to a logging service
});

// Utility Functions
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Initialize performance monitoring
initializePerformanceMonitoring();

// Export functions for global access
window.scrollToSection = scrollToSection;
window.bookClass = bookClass;

function showToast(message) {
    const toast = document.getElementById('toast');
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add('show');
    setTimeout(() => {
        toast.classList.remove('show');
    }, 2500);
}