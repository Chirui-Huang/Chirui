/**
 * Form Security Module
 * Provides CSRF protection, rate limiting, and input validation for forms
 */

var FormSecurity = (function() {
  'use strict';

  // Configuration
  var config = {
    rateLimitWindow: 5 * 60 * 1000, // 5 minutes
    maxSubmissionsContact: 5,
    maxSubmissionsNewsletter: 3,
    maxSubmissionsComment: 3,
    storagePrefix: 'form_security_'
  };

  // Rate limit tracking
  var rateLimits = {
    contact: { window: 5 * 60 * 1000, max: 5 },
    newsletter: { window: 10 * 60 * 1000, max: 3 },
    comment: { window: 30 * 60 * 1000, max: 3 }
  };

  /**
   * Generate a simple CSRF token
   */
  function generateCSRFToken() {
    var array = new Uint8Array(32);
    crypto.getRandomValues(array);
    return Array.from(array, function(byte) {
      return byte.toString(16).padStart(2, '0');
    }).join('');
  }

  /**
   * Store CSRF token in session
   */
  function setCSRFToken(formType) {
    var token = generateCSRFToken();
    sessionStorage.setItem(config.storagePrefix + 'csrf_' + formType, token);
    return token;
  }

  /**
   * Validate CSRF token
   */
  function validateCSRFToken(formType, token) {
    var stored = sessionStorage.getItem(config.storagePrefix + 'csrf_' + formType);
    return stored && stored === token;
  }

  /**
   * Check rate limit for form submissions
   */
  function checkRateLimit(formType) {
    var limit = rateLimits[formType];
    if (!limit) return true;

    var key = config.storagePrefix + 'rate_' + formType;
    var submissions = JSON.parse(sessionStorage.getItem(key) || '[]');
    var now = Date.now();

    // Clean old submissions
    submissions = submissions.filter(function(timestamp) {
      return now - timestamp < limit.window;
    });

    // Check if limit exceeded
    if (submissions.length >= limit.max) {
      var oldestSubmission = Math.min.apply(null, submissions);
      var timeRemaining = Math.ceil((limit.window - (now - oldestSubmission)) / 1000 / 60);
      return {
        allowed: false,
        message: 'Too many submissions. Please wait ' + timeRemaining + ' minutes before trying again.',
        timeRemaining: timeRemaining
      };
    }

    // Add current submission
    submissions.push(now);
    sessionStorage.setItem(key, JSON.stringify(submissions));

    return { allowed: true };
  }

  /**
   * Sanitize input to prevent XSS
   */
  function sanitizeInput(input) {
    if (typeof input !== 'string') return input;
    
    // Remove any HTML tags
    var div = document.createElement('div');
    div.textContent = input;
    var sanitized = div.innerHTML;
    
    // Ensure no script content
    sanitized = sanitized.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');
    sanitized = sanitized.replace(/on\w+\s*=/gi, ''); // Remove event handlers
    
    return sanitized;
  }

  /**
   * Validate email format
   */
  function validateEmail(email) {
    var re = /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
    return re.test(email) && email.length <= 254;
  }

  /**
   * Validate name (letters, spaces, hyphens, apostrophes only)
   */
  function validateName(name) {
    var re = /^[a-zA-Z\s\-']{2,50}$/;
    return re.test(name);
  }

  /**
   * Initialize form security for a form element
   */
  function secureForm(formElement, formType) {
    if (!formElement) {
      console.error('FormSecurity: Form element not found');
      return;
    }

    // Add CSRF token
    var csrfToken = setCSRFToken(formType);
    var csrfInput = document.createElement('input');
    csrfInput.type = 'hidden';
    csrfInput.name = '_csrf_token';
    csrfInput.value = csrfToken;
    formElement.appendChild(csrfInput);

    // Add timestamp for additional validation
    var timestampInput = document.createElement('input');
    timestampInput.type = 'hidden';
    timestampInput.name = '_timestamp';
    timestampInput.value = Date.now().toString();
    formElement.appendChild(timestampInput);

    // Intercept form submission
    formElement.addEventListener('submit', function(e) {
      // Check rate limit
      var rateCheck = checkRateLimit(formType);
      if (!rateCheck.allowed) {
        e.preventDefault();
        alert('Security: ' + rateCheck.message);
        return false;
      }

      // Validate CSRF token
      var token = formElement.querySelector('[name="_csrf_token"]');
      if (!token || !validateCSRFToken(formType, token.value)) {
        e.preventDefault();
        alert('Security: Form validation failed. Please refresh and try again.');
        return false;
      }

      // Check timestamp (prevent form replay attacks)
      var timestamp = formElement.querySelector('[name="_timestamp"]');
      if (timestamp) {
        var formAge = Date.now() - parseInt(timestamp.value);
        if (formAge > 3600000) { // 1 hour
          e.preventDefault();
          alert('Security: Form has expired. Please refresh and try again.');
          return false;
        }
      }

      // Sanitize all text inputs
      var inputs = formElement.querySelectorAll('input[type="text"], input[type="email"], textarea');
      inputs.forEach(function(input) {
        if (input.value) {
          input.value = sanitizeInput(input.value);
        }
      });

      // Validate email fields
      var emailInputs = formElement.querySelectorAll('input[type="email"]');
      for (var i = 0; i < emailInputs.length; i++) {
        if (!validateEmail(emailInputs[i].value)) {
          e.preventDefault();
          alert('Please enter a valid email address.');
          emailInputs[i].focus();
          return false;
        }
      }

      // Validate name fields
      var nameInputs = formElement.querySelectorAll('[name="name"]');
      for (var j = 0; j < nameInputs.length; j++) {
        if (nameInputs[j].value && !validateName(nameInputs[j].value)) {
          e.preventDefault();
          alert('Name should only contain letters, spaces, hyphens, and apostrophes (2-50 characters).');
          nameInputs[j].focus();
          return false;
        }
      }

      console.log('Form security checks passed');
    });

    console.log('Form secured: ' + formType);
  }

  /**
   * Initialize all forms on the page
   */
  function init() {
    // Secure contact form
    var contactForm = document.querySelector('.c-form');
    if (contactForm) {
      secureForm(contactForm, 'contact');
    }

    // Secure newsletter forms
    var newsletterForms = document.querySelectorAll('form[action*="newsletter"], .newsletter-form');
    newsletterForms.forEach(function(form) {
      secureForm(form, 'newsletter');
    });

    // Secure comment forms
    var commentForms = document.querySelectorAll('.comment-form, form[action*="comment"]');
    commentForms.forEach(function(form) {
      secureForm(form, 'comment');
    });

    console.log('FormSecurity initialized for all forms');
  }

  // Public API
  return {
    init: init,
    secureForm: secureForm,
    validateEmail: validateEmail,
    validateName: validateName,
    sanitizeInput: sanitizeInput,
    checkRateLimit: checkRateLimit
  };
})();

// Auto-initialize on DOM ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', FormSecurity.init);
} else {
  FormSecurity.init();
}
