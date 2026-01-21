/**
 * MWIZA SERVICES - Main JavaScript
 * Premium Event Management Website
 * 
 * IMPROVEMENTS IMPLEMENTED:
 * 1. Mobile navigation toggle
 * 2. Smooth scroll behavior
 * 3. Form validation
 * 4. Gallery filtering
 * 5. Toast notifications
 * 6. Loading states
 * 7. Modal system
 */

// ============================================
// CONFIGURATION
// ============================================
const CONFIG = {
  apiBaseUrl: '/api', // Update for production
  toastDuration: 4000,
  animationDuration: 300,
  debounceDelay: 300
};

// ============================================
// UTILITY FUNCTIONS
// ============================================
const Utils = {
  // Debounce function for performance
  debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  },

  // Format currency (Ugandan Shillings)
  formatCurrency(amount) {
    return new Intl.NumberFormat('en-UG', {
      style: 'currency',
      currency: 'UGX',
      minimumFractionDigits: 0
    }).format(amount);
  },

  // Format date
  formatDate(date, options = {}) {
    const defaultOptions = { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    };
    return new Date(date).toLocaleDateString('en-UG', { ...defaultOptions, ...options });
  },

  // Generate unique ID
  generateId() {
    return `mwiza-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  },

  // Check if element is in viewport
  isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
  }
};

// ============================================
// MOBILE NAVIGATION
// ============================================
const MobileNav = {
  init() {
    this.toggleBtn = document.getElementById('mobile-nav-toggle');
    this.closeBtn = document.getElementById('mobile-nav-close');
    this.menu = document.getElementById('mobile-menu');
    this.overlay = document.getElementById('mobile-overlay');
    
    if (this.toggleBtn) {
      this.toggleBtn.addEventListener('click', () => this.open());
    }
    
    if (this.closeBtn) {
      this.closeBtn.addEventListener('click', () => this.close());
    }
    
    if (this.overlay) {
      this.overlay.addEventListener('click', () => this.close());
    }
    
    // Close on escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') this.close();
    });
  },

  open() {
    this.menu?.classList.remove('translate-x-full');
    this.menu?.classList.add('translate-x-0');
    this.overlay?.classList.remove('hidden');
    document.body.classList.add('overflow-hidden');
  },

  close() {
    this.menu?.classList.add('translate-x-full');
    this.menu?.classList.remove('translate-x-0');
    this.overlay?.classList.add('hidden');
    document.body.classList.remove('overflow-hidden');
  }
};

// ============================================
// TOAST NOTIFICATIONS
// ============================================
const Toast = {
  container: null,

  init() {
    // Create toast container if it doesn't exist
    if (!document.getElementById('toast-container')) {
      this.container = document.createElement('div');
      this.container.id = 'toast-container';
      this.container.className = 'fixed top-4 right-4 z-[100] flex flex-col gap-2';
      document.body.appendChild(this.container);
    } else {
      this.container = document.getElementById('toast-container');
    }
  },

  show(message, type = 'info') {
    const toast = document.createElement('div');
    const id = Utils.generateId();
    toast.id = id;
    
    const colors = {
      success: 'bg-success/90 border-success',
      error: 'bg-error/90 border-error',
      warning: 'bg-warning/90 border-warning',
      info: 'bg-info/90 border-info'
    };
    
    const icons = {
      success: 'check_circle',
      error: 'error',
      warning: 'warning',
      info: 'info'
    };
    
    toast.className = `flex items-center gap-3 px-4 py-3 rounded-lg border backdrop-blur-md text-white shadow-lg transform translate-x-full transition-transform duration-300 ${colors[type]}`;
    toast.innerHTML = `
      <span class="material-symbols-outlined">${icons[type]}</span>
      <p class="text-sm font-medium">${message}</p>
      <button onclick="Toast.dismiss('${id}')" class="ml-2 hover:opacity-70">
        <span class="material-symbols-outlined text-sm">close</span>
      </button>
    `;
    
    this.container.appendChild(toast);
    
    // Animate in
    requestAnimationFrame(() => {
      toast.classList.remove('translate-x-full');
      toast.classList.add('translate-x-0');
    });
    
    // Auto dismiss
    setTimeout(() => this.dismiss(id), CONFIG.toastDuration);
  },

  dismiss(id) {
    const toast = document.getElementById(id);
    if (toast) {
      toast.classList.add('translate-x-full');
      setTimeout(() => toast.remove(), CONFIG.animationDuration);
    }
  },

  success(message) { this.show(message, 'success'); },
  error(message) { this.show(message, 'error'); },
  warning(message) { this.show(message, 'warning'); },
  info(message) { this.show(message, 'info'); }
};

// ============================================
// MODAL SYSTEM
// ============================================
const Modal = {
  activeModal: null,

  open(modalId) {
    const modal = document.getElementById(modalId);
    if (!modal) return;
    
    modal.classList.remove('hidden');
    modal.classList.add('flex');
    document.body.classList.add('overflow-hidden');
    this.activeModal = modal;
    
    // Focus trap
    const focusableElements = modal.querySelectorAll('button, input, select, textarea, a[href]');
    if (focusableElements.length) focusableElements[0].focus();
  },

  close(modalId) {
    const modal = modalId ? document.getElementById(modalId) : this.activeModal;
    if (!modal) return;
    
    modal.classList.add('hidden');
    modal.classList.remove('flex');
    document.body.classList.remove('overflow-hidden');
    this.activeModal = null;
  },

  // Initialize close on backdrop click and escape key
  init() {
    document.querySelectorAll('[data-modal-backdrop]').forEach(backdrop => {
      backdrop.addEventListener('click', (e) => {
        if (e.target === backdrop) Modal.close();
      });
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.activeModal) Modal.close();
    });
  }
};

// ============================================
// FORM VALIDATION & HANDLING
// ============================================
const Forms = {
  init() {
    // Add validation to all forms with data-validate attribute
    document.querySelectorAll('form[data-validate]').forEach(form => {
      form.addEventListener('submit', (e) => this.handleSubmit(e, form));
      
      // Real-time validation
      form.querySelectorAll('input, select, textarea').forEach(input => {
        input.addEventListener('blur', () => this.validateField(input));
        input.addEventListener('input', Utils.debounce(() => this.validateField(input), CONFIG.debounceDelay));
      });
    });
  },

  validateField(field) {
    const value = field.value.trim();
    const type = field.type;
    const required = field.hasAttribute('required');
    let isValid = true;
    let errorMessage = '';

    // Remove existing error
    this.clearError(field);

    // Required check
    if (required && !value) {
      isValid = false;
      errorMessage = 'This field is required';
    }
    
    // Email validation
    else if (type === 'email' && value) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value)) {
        isValid = false;
        errorMessage = 'Please enter a valid email address';
      }
    }
    
    // Phone validation (Uganda format)
    else if (type === 'tel' && value) {
      const phoneRegex = /^(\+256|0)?[3-9]\d{8}$/;
      if (!phoneRegex.test(value.replace(/\s/g, ''))) {
        isValid = false;
        errorMessage = 'Please enter a valid Ugandan phone number';
      }
    }
    
    // Min length
    else if (field.minLength > 0 && value.length < field.minLength) {
      isValid = false;
      errorMessage = `Minimum ${field.minLength} characters required`;
    }

    if (!isValid) {
      this.showError(field, errorMessage);
    }

    return isValid;
  },

  showError(field, message) {
    field.classList.add('border-error', 'focus:border-error', 'focus:ring-error');
    
    const errorEl = document.createElement('p');
    errorEl.className = 'text-error text-xs mt-1 flex items-center gap-1';
    errorEl.innerHTML = `<span class="material-symbols-outlined text-sm">error</span>${message}`;
    errorEl.setAttribute('data-error', 'true');
    
    field.parentNode.appendChild(errorEl);
  },

  clearError(field) {
    field.classList.remove('border-error', 'focus:border-error', 'focus:ring-error');
    const error = field.parentNode.querySelector('[data-error]');
    if (error) error.remove();
  },

  async handleSubmit(e, form) {
    e.preventDefault();
    
    // Validate all fields
    let isValid = true;
    form.querySelectorAll('input, select, textarea').forEach(field => {
      if (!this.validateField(field)) isValid = false;
    });

    if (!isValid) {
      Toast.error('Please fix the errors in the form');
      return;
    }

    // Show loading state
    const submitBtn = form.querySelector('[type="submit"]');
    const originalText = submitBtn.innerHTML;
    submitBtn.disabled = true;
    submitBtn.innerHTML = `
      <svg class="animate-spin h-5 w-5 mr-2" viewBox="0 0 24 24">
        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" fill="none"></circle>
        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
      </svg>
      Processing...
    `;

    try {
      // Simulate API call (replace with actual endpoint)
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Get form action or default handler
      const action = form.getAttribute('action') || form.dataset.action;
      
      if (action === 'booking') {
        Toast.success('Booking request submitted! We\'ll contact you within 24 hours.');
        form.reset();
        // Redirect to success page
        // window.location.href = '/booking-success.html';
      } else if (action === 'contact') {
        Toast.success('Message sent successfully!');
        form.reset();
      } else if (action === 'login') {
        Toast.success('Login successful! Redirecting...');
        // window.location.href = '/admin/dashboard.html';
      }
    } catch (error) {
      Toast.error('Something went wrong. Please try again.');
    } finally {
      submitBtn.disabled = false;
      submitBtn.innerHTML = originalText;
    }
  }
};

// ============================================
// GALLERY FILTERING
// ============================================
const Gallery = {
  init() {
    this.filterBtns = document.querySelectorAll('[data-filter]');
    this.items = document.querySelectorAll('[data-category]');
    
    if (!this.filterBtns.length || !this.items.length) return;

    this.filterBtns.forEach(btn => {
      btn.addEventListener('click', () => this.filter(btn.dataset.filter));
    });
  },

  filter(category) {
    // Update active button
    this.filterBtns.forEach(btn => {
      if (btn.dataset.filter === category) {
        btn.classList.add('bg-primary', 'text-background-dark');
        btn.classList.remove('bg-card-dark', 'text-white');
      } else {
        btn.classList.remove('bg-primary', 'text-background-dark');
        btn.classList.add('bg-card-dark', 'text-white');
      }
    });

    // Filter items with animation
    this.items.forEach(item => {
      const itemCategory = item.dataset.category;
      
      if (category === 'all' || itemCategory === category) {
        item.classList.remove('hidden', 'scale-0', 'opacity-0');
        item.classList.add('scale-100', 'opacity-100');
      } else {
        item.classList.add('scale-0', 'opacity-0');
        setTimeout(() => item.classList.add('hidden'), CONFIG.animationDuration);
      }
    });
  }
};

// ============================================
// SCROLL ANIMATIONS
// ============================================
const ScrollAnimations = {
  init() {
    this.elements = document.querySelectorAll('[data-animate]');
    if (!this.elements.length) return;

    // Initial check
    this.check();
    
    // Check on scroll (debounced)
    window.addEventListener('scroll', Utils.debounce(() => this.check(), 100));
  },

  check() {
    this.elements.forEach(el => {
      if (Utils.isInViewport(el) && !el.classList.contains('animated')) {
        el.classList.add('animated');
        const animation = el.dataset.animate || 'fade-in';
        el.classList.add(`animate-${animation}`);
      }
    });
  }
};

// ============================================
// BOOKING FORM MULTI-STEP
// ============================================
const BookingForm = {
  currentStep: 1,
  totalSteps: 3,

  init() {
    this.form = document.getElementById('booking-form');
    this.progressBar = document.getElementById('booking-progress');
    this.stepIndicator = document.getElementById('step-indicator');
    
    if (!this.form) return;

    this.nextBtns = document.querySelectorAll('[data-next-step]');
    this.prevBtns = document.querySelectorAll('[data-prev-step]');
    
    this.nextBtns.forEach(btn => {
      btn.addEventListener('click', () => this.nextStep());
    });
    
    this.prevBtns.forEach(btn => {
      btn.addEventListener('click', () => this.prevStep());
    });

    this.updateUI();
  },

  nextStep() {
    if (this.currentStep < this.totalSteps) {
      // Validate current step fields
      const currentFields = document.querySelectorAll(`[data-step="${this.currentStep}"] input, [data-step="${this.currentStep}"] select`);
      let isValid = true;
      
      currentFields.forEach(field => {
        if (!Forms.validateField(field)) isValid = false;
      });
      
      if (!isValid) return;
      
      this.currentStep++;
      this.updateUI();
    }
  },

  prevStep() {
    if (this.currentStep > 1) {
      this.currentStep--;
      this.updateUI();
    }
  },

  updateUI() {
    // Update progress bar
    const progress = (this.currentStep / this.totalSteps) * 100;
    if (this.progressBar) {
      this.progressBar.style.width = `${progress}%`;
    }
    
    // Update step indicator
    if (this.stepIndicator) {
      this.stepIndicator.textContent = `Step ${this.currentStep} of ${this.totalSteps}`;
    }

    // Show/hide step content
    document.querySelectorAll('[data-step]').forEach(step => {
      const stepNum = parseInt(step.dataset.step);
      if (stepNum === this.currentStep) {
        step.classList.remove('hidden');
        step.classList.add('animate-fade-in');
      } else {
        step.classList.add('hidden');
      }
    });
  }
};

// ============================================
// HEADER SCROLL BEHAVIOR
// ============================================
const Header = {
  init() {
    this.header = document.getElementById('main-header');
    if (!this.header) return;

    let lastScroll = 0;
    
    window.addEventListener('scroll', Utils.debounce(() => {
      const currentScroll = window.pageYOffset;
      
      // Add/remove background on scroll
      if (currentScroll > 50) {
        this.header.classList.add('bg-background-dark/95', 'shadow-lg');
      } else {
        this.header.classList.remove('bg-background-dark/95', 'shadow-lg');
      }
      
      // Hide/show on scroll direction (optional)
      // if (currentScroll > lastScroll && currentScroll > 100) {
      //   this.header.classList.add('-translate-y-full');
      // } else {
      //   this.header.classList.remove('-translate-y-full');
      // }
      
      lastScroll = currentScroll;
    }, 50));
  }
};

// ============================================
// INITIALIZE ON DOM READY
// ============================================
document.addEventListener('DOMContentLoaded', () => {
  // Core functionality
  MobileNav.init();
  Toast.init();
  Modal.init();
  Forms.init();
  Header.init();
  
  // Feature-specific
  Gallery.init();
  ScrollAnimations.init();
  BookingForm.init();
  
  // Log initialization
  console.log('✨ Mwiza Services website initialized');
});

// Export for use in other modules if needed
window.MwizaApp = {
  Utils,
  Toast,
  Modal,
  Forms,
  Gallery
};
