/**
 * Website Security Module
 * Protects visitors from common web vulnerabilities
 */

(function() {
  'use strict';

  // ============================================
  // 1. INPUT SANITIZATION
  // ============================================
  
  window.sanitizeInput = function(input) {
    if (typeof input !== 'string') return '';
    
    // Remove any script tags
    input = input.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');
    
    // Remove event handlers
    input = input.replace(/on\w+\s*=\s*["'][^"']*["']/gi, '');
    input = input.replace(/on\w+\s*=\s*[^\s>]*/gi, '');
    
    // Remove javascript: protocol
    input = input.replace(/javascript:/gi, '');
    
    // Limit length to prevent DoS
    if (input.length > 10000) {
      input = input.substring(0, 10000);
    }
    
    return input.trim();
  };

  // ============================================
  // 2. XSS PROTECTION
  // ============================================
  
  window.escapeHtml = function(text) {
    if (!text) return '';
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  };

  window.unescapeHtml = function(html) {
    const div = document.createElement('div');
    div.innerHTML = html;
    return div.textContent || div.innerText || '';
  };

  // ============================================
  // 3. RATE LIMITING
  // ============================================
  
  const RateLimiter = {
    limits: {},
    
    check: function(key, maxAttempts, windowMs) {
      const now = Date.now();
      
      if (!this.limits[key]) {
        this.limits[key] = { count: 0, resetTime: now + windowMs };
      }
      
      const limit = this.limits[key];
      
      // Reset if window expired
      if (now > limit.resetTime) {
        limit.count = 0;
        limit.resetTime = now + windowMs;
      }
      
      // Check if exceeded
      if (limit.count >= maxAttempts) {
        const waitTime = Math.ceil((limit.resetTime - now) / 1000);
        return {
          allowed: false,
          message: `Too many attempts. Please wait ${waitTime} seconds.`,
          waitTime: waitTime
        };
      }
      
      limit.count++;
      return { allowed: true };
    },
    
    reset: function(key) {
      delete this.limits[key];
    }
  };

  window.RateLimiter = RateLimiter;

  // ============================================
  // 4. FORM SECURITY
  // ============================================
  
  window.validateEmail = function(email) {
    // Strict email validation
    const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return re.test(email) && email.length <= 254;
  };

  window.validateName = function(name) {
    // Allow letters, spaces, hyphens, apostrophes
    const re = /^[a-zA-Z\s\-']{2,50}$/;
    return re.test(name);
  };

  window.validateText = function(text, minLength, maxLength) {
    if (!text || typeof text !== 'string') return false;
    const length = text.trim().length;
    return length >= minLength && length <= maxLength;
  };

  // ============================================
  // 5. CSRF-LIKE PROTECTION
  // ============================================
  
  const SecurityToken = {
    generate: function() {
      const array = new Uint8Array(32);
      crypto.getRandomValues(array);
      return Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('');
    },
    
    set: function() {
      const token = this.generate();
      sessionStorage.setItem('security_token', token);
      return token;
    },
    
    get: function() {
      let token = sessionStorage.getItem('security_token');
      if (!token) {
        token = this.set();
      }
      return token;
    },
    
    verify: function(token) {
      return token === this.get();
    }
  };

  window.SecurityToken = SecurityToken;

  // ============================================
  // 6. SAFE EXTERNAL LINKS
  // ============================================
  
  function secureExternalLinks() {
    const links = document.querySelectorAll('a[href^="http"]');
    links.forEach(function(link) {
      const url = new URL(link.href);
      const currentDomain = window.location.hostname;
      
      // If external link, add security attributes
      if (url.hostname !== currentDomain && url.hostname !== 'localhost') {
        link.setAttribute('rel', 'noopener noreferrer');
        link.setAttribute('target', '_blank');
      }
    });
  }

  // ============================================
  // 7. PREVENT CLICKJACKING
  // ============================================
  
  function preventClickjacking() {
    if (window.self !== window.top) {
      // Page is in an iframe
      window.top.location = window.self.location;
    }
  }

  // ============================================
  // 8. SECURE STORAGE
  // ============================================
  
  window.SecureStorage = {
    set: function(key, value, encrypt) {
      try {
        const data = encrypt ? btoa(JSON.stringify(value)) : JSON.stringify(value);
        localStorage.setItem(key, data);
        return true;
      } catch (e) {
        console.error('Storage error:', e);
        return false;
      }
    },
    
    get: function(key, encrypted) {
      try {
        const data = localStorage.getItem(key);
        if (!data) return null;
        return encrypted ? JSON.parse(atob(data)) : JSON.parse(data);
      } catch (e) {
        console.error('Storage error:', e);
        return null;
      }
    },
    
    remove: function(key) {
      localStorage.removeItem(key);
    },
    
    clear: function() {
      localStorage.clear();
    }
  };

  // ============================================
  // 9. CONTENT SECURITY
  // ============================================
  
  function sanitizeUserContent(container) {
    if (!container) return;
    
    // Remove any inline scripts
    const scripts = container.querySelectorAll('script');
    scripts.forEach(script => script.remove());
    
    // Remove event handlers from all elements
    const allElements = container.querySelectorAll('*');
    allElements.forEach(function(el) {
      // Remove on* attributes
      const attributes = Array.from(el.attributes);
      attributes.forEach(function(attr) {
        if (attr.name.startsWith('on')) {
          el.removeAttribute(attr.name);
        }
      });
    });
  }

  window.sanitizeUserContent = sanitizeUserContent;

  // ============================================
  // 10. HONEYPOT SPAM PROTECTION
  // ============================================
  
  window.createHoneypot = function(formId) {
    const form = document.getElementById(formId);
    if (!form) return;
    
    // Create invisible honeypot field
    const honeypot = document.createElement('input');
    honeypot.type = 'text';
    honeypot.name = 'website';
    honeypot.id = 'website';
    honeypot.className = 'hp-field';
    honeypot.tabIndex = -1;
    honeypot.autocomplete = 'off';
    honeypot.setAttribute('aria-hidden', 'true');
    
    // Add styles to hide it
    honeypot.style.cssText = 'position:absolute;left:-9999px;width:1px;height:1px;opacity:0;pointer-events:none;';
    
    form.appendChild(honeypot);
    
    // Check on submit
    form.addEventListener('submit', function(e) {
      if (honeypot.value !== '') {
        e.preventDefault();
        console.log('Spam detected');
        return false;
      }
    });
  };

  // ============================================
  // INITIALIZATION
  // ============================================
  
  document.addEventListener('DOMContentLoaded', function() {
    // Prevent clickjacking
    preventClickjacking();
    
    // Secure external links
    secureExternalLinks();
    
    // Initialize security token
    SecurityToken.set();
    
    // Log security initialization
    console.log('🔒 Security module initialized');
  });

  // ============================================
  // PUBLIC API
  // ============================================
  
  window.SecurityUtils = {
    sanitizeInput: window.sanitizeInput,
    escapeHtml: window.escapeHtml,
    unescapeHtml: window.unescapeHtml,
    validateEmail: window.validateEmail,
    validateName: window.validateName,
    validateText: window.validateText,
    RateLimiter: window.RateLimiter,
    SecurityToken: window.SecurityToken,
    SecureStorage: window.SecureStorage,
    sanitizeUserContent: window.sanitizeUserContent,
    createHoneypot: window.createHoneypot
  };

})();
