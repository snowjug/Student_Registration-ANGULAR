// REVA University Student Registration Portal - JavaScript

// Mock Database
const MOCK_DATABASE = {
  students: [
    {
      studentId: "R2025001",
      name: "Priya Sharma",
      email: "priya.sharma@reva.edu.in",
      phone: "9876543210",
      course: "B.Tech Computer Science & Engineering",
      password: "student123",
      address: "JP Nagar, Bangalore",
      city: "Bangalore",
      state: "Karnataka",
      pincode: "560078",
      dateOfBirth: "2005-03-15",
      gender: "female",
      previousEducation: "12th",
      percentage: "92.5%",
      registrationDate: "2025-01-15",
      semester: "1st Semester",
      feeStatus: "Paid"
    },
    {
      studentId: "R2025002",
      name: "Rahul Kumar",
      email: "rahul.kumar@reva.edu.in",
      phone: "9876543211",
      course: "B.Tech Artificial Intelligence & Machine Learning",
      password: "student456",
      address: "Whitefield, Bangalore",
      city: "Bangalore",
      state: "Karnataka",
      pincode: "560066",
      dateOfBirth: "2004-07-22",
      gender: "male",
      previousEducation: "12th",
      percentage: "88.2%",
      registrationDate: "2025-01-16",
      semester: "1st Semester",
      feeStatus: "Pending"
    },
    {
      studentId: "R2025003",
      name: "Sneha Patel",
      email: "sneha.patel@reva.edu.in",
      phone: "9876543212",
      course: "B.Com",
      password: "student789",
      address: "HSR Layout, Bangalore",
      city: "Bangalore",
      state: "Karnataka",
      pincode: "560102",
      dateOfBirth: "2005-11-08",
      gender: "female",
      previousEducation: "12th",
      percentage: "95.1%",
      registrationDate: "2025-01-17",
      semester: "1st Semester",
      feeStatus: "Paid"
    }
  ],
  admin: {
    studentId: "admin",
    name: "Admin User",
    email: "admin@reva.edu.in",
    password: "admin123",
    role: "admin"
  }
};

// Current session
let currentUser = null;
let studentIdCounter = 4; // For auto-generating student IDs

// Utility Functions
function showPage(pageId) {
  // Hide all pages
  document.querySelectorAll('.page').forEach(page => {
    page.classList.remove('active');
  });
  
  // Show selected page
  document.getElementById(pageId).classList.add('active');
  
  // Clear any form data when switching pages
  if (pageId === 'login-page') {
    const loginForm = document.getElementById('login-form');
    if (loginForm) loginForm.reset();
    clearErrors();
  } else if (pageId === 'registration-page') {
    const regForm = document.getElementById('registration-form');
    if (regForm) regForm.reset();
    clearErrors();
    generateStudentId();
  }
}

function showLoading() {
  document.getElementById('loading-spinner').classList.remove('hidden');
}

function hideLoading() {
  document.getElementById('loading-spinner').classList.add('hidden');
}

function showToast(message, type = 'success') {
  const toast = document.getElementById('toast');
  const icon = toast.querySelector('.toast-icon');
  const messageEl = toast.querySelector('.toast-message');
  
  // Set message and type
  messageEl.textContent = message;
  toast.className = `toast show ${type}`;
  
  // Set appropriate icon
  if (type === 'success') {
    icon.className = 'toast-icon fas fa-check-circle';
  } else if (type === 'error') {
    icon.className = 'toast-icon fas fa-times-circle';
  } else if (type === 'warning') {
    icon.className = 'toast-icon fas fa-exclamation-triangle';
  }
  
  // Auto hide after 3 seconds
  setTimeout(() => {
    toast.classList.remove('show');
  }, 3000);
}

function clearErrors() {
  document.querySelectorAll('.error-message').forEach(error => {
    error.classList.remove('show');
    error.textContent = '';
  });
  
  document.querySelectorAll('input, select, textarea').forEach(input => {
    input.style.borderColor = '';
  });
}

function showError(fieldId, message) {
  const errorEl = document.getElementById(`${fieldId}-error`);
  const inputEl = document.getElementById(fieldId);
  
  if (errorEl) {
    errorEl.textContent = message;
    errorEl.classList.add('show');
  }
  
  if (inputEl) {
    inputEl.style.borderColor = '#DC3545';
  }
}

// Password Strength Checker
function checkPasswordStrength(password) {
  let strength = 0;
  let feedback = '';
  
  if (password.length >= 8) strength += 1;
  if (/[A-Z]/.test(password)) strength += 1;
  if (/[a-z]/.test(password)) strength += 1;
  if (/[0-9]/.test(password)) strength += 1;
  if (/[^A-Za-z0-9]/.test(password)) strength += 1;
  
  switch (strength) {
    case 0:
    case 1:
      feedback = 'Very Weak';
      break;
    case 2:
      feedback = 'Weak';
      break;
    case 3:
      feedback = 'Fair';
      break;
    case 4:
      feedback = 'Good';
      break;
    case 5:
      feedback = 'Strong';
      break;
  }
  
  return { strength, feedback };
}

function updatePasswordStrength() {
  const password = document.getElementById('reg-password').value;
  const strengthBar = document.querySelector('.strength-fill');
  const strengthText = document.querySelector('.strength-text');
  
  if (!password) {
    strengthBar.style.width = '0%';
    strengthText.textContent = '';
    return;
  }
  
  const { strength, feedback } = checkPasswordStrength(password);
  const percentage = (strength / 5) * 100;
  
  strengthBar.style.width = `${percentage}%`;
  strengthText.textContent = feedback;
  
  // Color coding
  if (strength <= 1) {
    strengthBar.style.backgroundColor = '#DC3545';
    strengthText.style.color = '#DC3545';
  } else if (strength <= 2) {
    strengthBar.style.backgroundColor = '#FFC107';
    strengthText.style.color = '#FFC107';
  } else if (strength <= 3) {
    strengthBar.style.backgroundColor = '#FF7A00';
    strengthText.style.color = '#FF7A00';
  } else {
    strengthBar.style.backgroundColor = '#28A745';
    strengthText.style.color = '#28A745';
  }
}

// Student ID Generator
function generateStudentId() {
  const currentYear = new Date().getFullYear();
  const studentId = `R${currentYear}${String(studentIdCounter).padStart(3, '0')}`;
  const displayField = document.getElementById('student-id-display');
  if (displayField) {
    displayField.value = studentId;
  }
  return studentId;
}

// Toggle Password Visibility
function togglePassword(fieldId) {
  const passwordField = document.getElementById(fieldId);
  const toggleButton = passwordField.nextElementSibling.querySelector('i');
  
  if (passwordField.type === 'password') {
    passwordField.type = 'text';
    toggleButton.classList.remove('fa-eye');
    toggleButton.classList.add('fa-eye-slash');
  } else {
    passwordField.type = 'password';
    toggleButton.classList.remove('fa-eye-slash');
    toggleButton.classList.add('fa-eye');
  }
}

// Validation Functions
function validateEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function validatePhone(phone) {
  const phoneRegex = /^[6-9]\d{9}$/;
  return phoneRegex.test(phone);
}

function validatePincode(pincode) {
  const pincodeRegex = /^\d{6}$/;
  return pincodeRegex.test(pincode);
}

// Authentication Functions
async function login(studentId, password) {
  showLoading();
  
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  // Check admin credentials
  if (studentId === MOCK_DATABASE.admin.studentId && password === MOCK_DATABASE.admin.password) {
    currentUser = MOCK_DATABASE.admin;
    hideLoading();
    return { success: true, user: currentUser };
  }
  
  // Check student credentials
  const student = MOCK_DATABASE.students.find(s => 
    s.studentId === studentId && s.password === password
  );
  
  if (student) {
    currentUser = student;
    hideLoading();
    return { success: true, user: currentUser };
  }
  
  hideLoading();
  return { success: false, message: 'Invalid Student ID or Password' };
}

async function register(studentData) {
  showLoading();
  
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 2000));
  
  // Check if email already exists
  const emailExists = MOCK_DATABASE.students.some(s => s.email === studentData.email);
  if (emailExists) {
    hideLoading();
    return { success: false, message: 'Email already registered' };
  }
  
  // Add new student to mock database
  const newStudent = {
    ...studentData,
    registrationDate: new Date().toISOString().split('T')[0],
    semester: "1st Semester",
    feeStatus: "Pending"
  };
  
  MOCK_DATABASE.students.push(newStudent);
  studentIdCounter++;
  
  hideLoading();
  return { success: true, message: 'Registration successful!' };
}

// Form Handlers
async function handleLogin(event) {
  event.preventDefault();
  clearErrors();
  
  const formData = new FormData(event.target);
  const studentId = formData.get('studentId').trim();
  const password = formData.get('password');
  
  // Basic validation
  if (!studentId) {
    showError('student-id', 'Student ID is required');
    return;
  }
  
  if (!password) {
    showError('password', 'Password is required');
    return;
  }
  
  const result = await login(studentId, password);
  
  if (result.success) {
    showToast('Login successful! Welcome back.', 'success');
    setTimeout(() => {
      showPage('dashboard-page');
      loadDashboard();
    }, 1000);
  } else {
    showToast(result.message, 'error');
  }
}

async function handleRegistration(event) {
  event.preventDefault();
  clearErrors();
  
  const formData = new FormData(event.target);
  let isValid = true;
  
  // Get form values
  const fullName = formData.get('fullName').trim();
  const email = formData.get('email').trim();
  const phone = formData.get('phone').trim();
  const dateOfBirth = formData.get('dateOfBirth');
  const course = formData.get('course');
  const address = formData.get('address').trim();
  const city = formData.get('city').trim();
  const state = formData.get('state').trim();
  const pincode = formData.get('pincode').trim();
  const regPassword = formData.get('regPassword');
  const confirmPassword = formData.get('confirmPassword');
  const terms = formData.get('terms');
  
  // Validation
  if (!fullName) {
    showError('full-name', 'Full name is required');
    isValid = false;
  }
  
  if (!email) {
    showError('email', 'Email is required');
    isValid = false;
  } else if (!validateEmail(email)) {
    showError('email', 'Please enter a valid email address');
    isValid = false;
  }
  
  if (!phone) {
    showError('phone', 'Phone number is required');
    isValid = false;
  } else if (!validatePhone(phone)) {
    showError('phone', 'Please enter a valid 10-digit phone number');
    isValid = false;
  }
  
  if (!dateOfBirth) {
    showError('dob', 'Date of birth is required');
    isValid = false;
  }
  
  if (!course) {
    showError('course', 'Please select a course');
    isValid = false;
  }
  
  if (!address) {
    showError('address', 'Address is required');
    isValid = false;
  }
  
  if (!city) {
    showError('city', 'City is required');
    isValid = false;
  }
  
  if (!state) {
    showError('state', 'State is required');
    isValid = false;
  }
  
  if (!pincode) {
    showError('pincode', 'PIN code is required');
    isValid = false;
  } else if (!validatePincode(pincode)) {
    showError('pincode', 'Please enter a valid 6-digit PIN code');
    isValid = false;
  }
  
  if (!regPassword) {
    showError('reg-password', 'Password is required');
    isValid = false;
  } else if (regPassword.length < 6) {
    showError('reg-password', 'Password must be at least 6 characters long');
    isValid = false;
  }
  
  if (!confirmPassword) {
    showError('confirm-password', 'Please confirm your password');
    isValid = false;
  } else if (regPassword !== confirmPassword) {
    showError('confirm-password', 'Passwords do not match');
    isValid = false;
  }
  
  if (!terms) {
    showError('terms', 'You must agree to the terms and conditions');
    isValid = false;
  }
  
  if (!isValid) {
    showToast('Please fix the errors in the form', 'error');
    return;
  }
  
  // Prepare student data
  const studentData = {
    studentId: document.getElementById('student-id-display').value,
    name: fullName,
    email: email,
    phone: phone,
    dateOfBirth: dateOfBirth,
    gender: formData.get('gender'),
    course: course,
    previousEducation: formData.get('previousEducation'),
    percentage: formData.get('percentage'),
    address: address,
    city: city,
    state: state,
    pincode: pincode,
    password: regPassword
  };
  
  const result = await register(studentData);
  
  if (result.success) {
    showToast(result.message, 'success');
    setTimeout(() => {
      showPage('login-page');
    }, 2000);
  } else {
    showToast(result.message, 'error');
  }
}

// Dashboard Functions
function loadDashboard() {
  if (!currentUser) return;
  
  // Update user name in header
  document.getElementById('dashboard-user-name').textContent = currentUser.name;
  document.getElementById('welcome-user-name').textContent = currentUser.name;
  
  // Update stats
  document.getElementById('stat-student-id').textContent = currentUser.studentId;
  document.getElementById('stat-course').textContent = currentUser.course || 'Not specified';
  document.getElementById('stat-semester').textContent = currentUser.semester || '1st Semester';
  
  const feeStatusEl = document.getElementById('stat-fee-status');
  if (currentUser.feeStatus) {
    feeStatusEl.textContent = currentUser.feeStatus;
    feeStatusEl.className = `status ${currentUser.feeStatus.toLowerCase()}`;
  }
  
  // Load profile details
  loadProfileSection();
  loadAcademicSection();
  loadFeesSection();
}

function loadProfileSection() {
  const profileDetails = document.getElementById('profile-details');
  
  profileDetails.innerHTML = `
    <h4>${currentUser.name}</h4>
    <div class="detail-row">
      <span class="detail-label">Student ID:</span>
      <span class="detail-value">${currentUser.studentId}</span>
    </div>
    <div class="detail-row">
      <span class="detail-label">Email:</span>
      <span class="detail-value">${currentUser.email}</span>
    </div>
    <div class="detail-row">
      <span class="detail-label">Phone:</span>
      <span class="detail-value">${currentUser.phone || 'Not provided'}</span>
    </div>
    <div class="detail-row">
      <span class="detail-label">Date of Birth:</span>
      <span class="detail-value">${currentUser.dateOfBirth || 'Not provided'}</span>
    </div>
    <div class="detail-row">
      <span class="detail-label">Gender:</span>
      <span class="detail-value">${currentUser.gender ? currentUser.gender.charAt(0).toUpperCase() + currentUser.gender.slice(1) : 'Not specified'}</span>
    </div>
    <div class="detail-row">
      <span class="detail-label">Address:</span>
      <span class="detail-value">${currentUser.address || 'Not provided'}</span>
    </div>
    <div class="detail-row">
      <span class="detail-label">Registration Date:</span>
      <span class="detail-value">${currentUser.registrationDate || 'Not available'}</span>
    </div>
  `;
}

function loadAcademicSection() {
  const academicInfo = document.getElementById('academic-info');
  
  academicInfo.innerHTML = `
    <div class="detail-row">
      <span class="detail-label">Course:</span>
      <span class="detail-value">${currentUser.course || 'Not specified'}</span>
    </div>
    <div class="detail-row">
      <span class="detail-label">Current Semester:</span>
      <span class="detail-value">${currentUser.semester || '1st Semester'}</span>
    </div>
    <div class="detail-row">
      <span class="detail-label">Previous Education:</span>
      <span class="detail-value">${currentUser.previousEducation || 'Not specified'}</span>
    </div>
    <div class="detail-row">
      <span class="detail-label">Previous Percentage/CGPA:</span>
      <span class="detail-value">${currentUser.percentage || 'Not provided'}</span>
    </div>
    <div class="detail-row">
      <span class="detail-label">Academic Year:</span>
      <span class="detail-value">2025-2026</span>
    </div>
  `;
}

function loadFeesSection() {
  const feesInfo = document.getElementById('fees-info');
  const feeAmount = currentUser.course && currentUser.course.includes('B.Tech') ? '₹1,20,000' : '₹80,000';
  
  feesInfo.innerHTML = `
    <div class="detail-row">
      <span class="detail-label">Total Fee:</span>
      <span class="detail-value">${feeAmount}</span>
    </div>
    <div class="detail-row">
      <span class="detail-label">Fee Status:</span>
      <span class="detail-value">
        <span class="status ${currentUser.feeStatus ? currentUser.feeStatus.toLowerCase() : 'pending'}">
          ${currentUser.feeStatus || 'Pending'}
        </span>
      </span>
    </div>
    <div class="detail-row">
      <span class="detail-label">Due Date:</span>
      <span class="detail-value">March 31, 2025</span>
    </div>
    <div class="detail-row">
      <span class="detail-label">Payment Method:</span>
      <span class="detail-value">${currentUser.feeStatus === 'Paid' ? 'Online Payment' : 'Not applicable'}</span>
    </div>
  `;
}

// Dashboard Navigation
function showSection(sectionId) {
  // Update nav items
  document.querySelectorAll('.nav-item').forEach(item => {
    item.classList.remove('active');
  });
  
  const navItem = document.querySelector(`[data-section="${sectionId}"]`);
  if (navItem) {
    navItem.classList.add('active');
  }
  
  // Update content sections
  document.querySelectorAll('.content-section').forEach(section => {
    section.classList.remove('active');
  });
  
  const section = document.getElementById(`${sectionId}-section`);
  if (section) {
    section.classList.add('active');
  }
}

// Logout Function
function logout() {
  currentUser = null;
  showToast('Logged out successfully', 'success');
  setTimeout(() => {
    showPage('login-page');
  }, 1000);
}

// Initialize app
function init() {
  // Show login page by default
  showPage('login-page');
  
  // Initialize student ID counter based on existing students
  studentIdCounter = MOCK_DATABASE.students.length + 1;
  
  // Set up event listeners
  setupEventListeners();
}

function setupEventListeners() {
  // Login form
  const loginForm = document.getElementById('login-form');
  if (loginForm) {
    loginForm.addEventListener('submit', handleLogin);
  }
  
  // Registration form
  const registrationForm = document.getElementById('registration-form');
  if (registrationForm) {
    registrationForm.addEventListener('submit', handleRegistration);
  }
  
  // Password strength checker
  const regPasswordField = document.getElementById('reg-password');
  if (regPasswordField) {
    regPasswordField.addEventListener('input', updatePasswordStrength);
  }
  
  // Dashboard navigation
  document.querySelectorAll('.nav-item').forEach(item => {
    item.addEventListener('click', (e) => {
      e.preventDefault();
      const sectionId = item.dataset.section;
      showSection(sectionId);
    });
  });
  
  // Navigation links
  document.querySelectorAll('[onclick*="showPage"]').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const onclickAttr = link.getAttribute('onclick');
      const pageMatch = onclickAttr.match(/showPage\('([^']+)'\)/);
      if (pageMatch) {
        showPage(pageMatch[1]);
      }
    });
  });
  
  // Generate initial student ID for registration
  generateStudentId();
}

// Make functions globally available for onclick handlers
window.showPage = showPage;
window.togglePassword = togglePassword;
window.showSection = showSection;
window.logout = logout;

// Run when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
  init();
});