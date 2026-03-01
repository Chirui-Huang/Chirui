// PocketBase Integration for Chirui Huang's Website
// This file handles all PocketBase API interactions

const PB_URL = 'http://127.0.0.1:8090';

// Initialize PocketBase client
class PocketBaseClient {
  constructor(baseUrl) {
    this.baseUrl = baseUrl;
  }

  async createRecord(collection, data) {
    try {
      const response = await fetch(`${this.baseUrl}/api/collections/${collection}/records`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to create record');
      }

      return await response.json();
    } catch (error) {
      console.error('PocketBase error:', error);
      throw error;
    }
  }

  async getRecords(collection, options = {}) {
    try {
      const params = new URLSearchParams(options);
      const response = await fetch(`${this.baseUrl}/api/collections/${collection}/records?${params}`);

      if (!response.ok) {
        throw new Error('Failed to fetch records');
      }

      return await response.json();
    } catch (error) {
      console.error('PocketBase error:', error);
      throw error;
    }
  }
}

const pb = new PocketBaseClient(PB_URL);

// Contact Form Handler
async function handleContactForm(event) {
  event.preventDefault();
  
  const form = event.target;
  const submitButton = form.querySelector('button[type="submit"]');
  const originalButtonText = submitButton.textContent;
  
  // Get form data - handle both popup and embedded form field IDs
  const nameField = form.querySelector('#form-name, #contact-name');
  const emailField = form.querySelector('#form-email, #contact-email');
  const subjectField = form.querySelector('#form-subject, #contact-subject');
  const messageField = form.querySelector('#form-text, #contact-message');
  
  // Check honeypot (if exists)
  const honeypot = form.querySelector('#website');
  if (honeypot && honeypot.value !== '') {
    console.log('Spam detected');
    return false;
  }
  
  // Rate limiting - 5 submissions per 5 minutes
  const rateCheck = window.RateLimiter.check('contact_form', 5, 5 * 60 * 1000);
  if (!rateCheck.allowed) {
    alert(rateCheck.message);
    return false;
  }
  
  // Get and sanitize values
  const name = window.sanitizeInput(nameField ? nameField.value : '');
  const email = window.sanitizeInput(emailField ? emailField.value : '');
  const subject = window.sanitizeInput(subjectField ? subjectField.value : '');
  const message = window.sanitizeInput(messageField ? messageField.value : '');
  
  // Validate inputs
  if (!window.validateName(name)) {
    alert('Please enter a valid name (2-50 characters, letters only)');
    nameField.focus();
    return false;
  }
  
  if (!window.validateEmail(email)) {
    alert('Please enter a valid email address');
    emailField.focus();
    return false;
  }
  
  if (!window.validateText(message, 10, 2000)) {
    alert('Message must be between 10 and 2000 characters');
    messageField.focus();
    return false;
  }
  
  const formData = {
    name: name,
    email: email,
    subject: subject,
    message: message,
    submitted_at: new Date().toISOString()
  };

  try {
    submitButton.disabled = true;
    submitButton.textContent = 'Sending...';
    submitButton.style.opacity = '0.6';

    await pb.createRecord('contacts', formData);

    // Success
    submitButton.textContent = '✓ Sent!';
    submitButton.style.background = '#4CAF50';
    form.reset();

    setTimeout(() => {
      submitButton.textContent = originalButtonText;
      submitButton.style.background = '';
      submitButton.style.opacity = '1';
      submitButton.disabled = false;
    }, 3000);

  } catch (error) {
    submitButton.textContent = '✗ Error';
    submitButton.style.background = '#f44336';
    
    setTimeout(() => {
      submitButton.textContent = originalButtonText;
      submitButton.style.background = '';
      submitButton.style.opacity = '1';
      submitButton.disabled = false;
    }, 3000);

    console.error('Contact form error:', error);
  }
}

// Newsletter Subscription Handler
async function handleNewsletterSubscribe(event) {
  event.preventDefault();
  
  const form = event.target;
  const submitButton = form.querySelector('input[type="submit"]');
  const emailInput = form.querySelector('#mce-EMAIL');
  const originalButtonValue = submitButton.value;
  
  // Rate limiting - 3 subscriptions per 10 minutes
  const rateCheck = window.RateLimiter.check('newsletter_form', 3, 10 * 60 * 1000);
  if (!rateCheck.allowed) {
    alert(rateCheck.message);
    return false;
  }
  
  // Sanitize and validate email
  const email = window.sanitizeInput(emailInput.value);
  
  if (!window.validateEmail(email)) {
    alert('Please enter a valid email address');
    emailInput.focus();
    return false;
  }

  const subscriptionData = {
    email: email,
    subscribed_at: new Date().toISOString(),
    status: 'active'
  };

  try {
    submitButton.disabled = true;
    submitButton.value = 'Subscribing...';
    submitButton.style.opacity = '0.6';

    await pb.createRecord('newsletter_subscribers', subscriptionData);

    // Success
    submitButton.value = '✓ Subscribed!';
    submitButton.style.background = '#4CAF50';
    emailInput.value = '';

    setTimeout(() => {
      submitButton.value = originalButtonValue;
      submitButton.style.background = '';
      submitButton.style.opacity = '1';
      submitButton.disabled = false;
    }, 3000);

  } catch (error) {
    submitButton.value = '✗ Error';
    submitButton.style.background = '#f44336';
    
    setTimeout(() => {
      submitButton.value = originalButtonValue;
      submitButton.style.background = '';
      submitButton.style.opacity = '1';
      submitButton.disabled = false;
    }, 3000);

    console.error('Newsletter subscription error:', error);
  }
}

// Comments System
async function loadComments(pageUrl) {
  try {
    const comments = await pb.getRecords('comments', {
      filter: `page_url="${pageUrl}" && status="approved"`,
      sort: '-created'
    });

    return comments.items || [];
  } catch (error) {
    console.error('Error loading comments:', error);
    return [];
  }
}

async function submitComment(commentData) {
  try {
    const data = {
      ...commentData,
      page_url: window.location.pathname,
      status: 'pending',
      created_date: new Date().toISOString()
    };

    await pb.createRecord('comments', data);
    return true;
  } catch (error) {
    console.error('Error submitting comment:', error);
    throw error;
  }
}

function displayComments(comments, containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;

  if (comments.length === 0) {
    container.innerHTML = '<p style="text-align: center; color: #888;">No comments yet. Be the first to comment!</p>';
    return;
  }

  const commentsHtml = comments.map(comment => `
    <div class="comment" style="padding: 20px; margin-bottom: 15px; background: #f9f9f9; border-radius: 8px; border-left: 3px solid #FFB6C1;">
      <div style="display: flex; justify-content: space-between; margin-bottom: 10px;">
        <strong style="color: #333;">${escapeHtml(comment.author_name)}</strong>
        <span style="color: #888; font-size: 14px;">${formatDate(comment.created)}</span>
      </div>
      <p style="margin: 0; color: #555; line-height: 1.6;">${escapeHtml(comment.content)}</p>
    </div>
  `).join('');

  container.innerHTML = commentsHtml;
}

function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

function formatDate(dateString) {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
  // Contact form (popup)
  const contactForm = document.querySelector('.c-form');
  if (contactForm) {
    contactForm.removeAttribute('action');
    contactForm.addEventListener('submit', handleContactForm);
  }

  // Contact form (embedded on page)
  const contactFormMain = document.getElementById('contact-form-main');
  if (contactFormMain) {
    contactFormMain.addEventListener('submit', handleContactForm);
  }

  // Newsletter form
  const newsletterForm = document.querySelector('.c-newsletter-form');
  if (newsletterForm) {
    newsletterForm.removeAttribute('action');
    newsletterForm.addEventListener('submit', handleNewsletterSubscribe);
  }

  // Load comments if comments section exists
  const commentsContainer = document.getElementById('comments-list');
  if (commentsContainer) {
    loadComments(window.location.pathname).then(comments => {
      displayComments(comments, 'comments-list');
    });
  }

  // Comment form submission
  const commentForm = document.getElementById('comment-form');
  if (commentForm) {
    commentForm.addEventListener('submit', async function(event) {
      event.preventDefault();
      
      const submitButton = this.querySelector('button[type="submit"]');
      const originalText = submitButton.textContent;
      
      // Rate limiting - 3 comments per 30 minutes
      const rateCheck = window.RateLimiter.check('comment_form', 3, 30 * 60 * 1000);
      if (!rateCheck.allowed) {
        alert(rateCheck.message);
        return false;
      }
      
      // Get and sanitize inputs
      const name = window.sanitizeInput(this.querySelector('#comment-name').value);
      const email = window.sanitizeInput(this.querySelector('#comment-email').value);
      const content = window.sanitizeInput(this.querySelector('#comment-content').value);
      
      // Validate inputs
      if (!window.validateName(name)) {
        alert('Please enter a valid name (2-50 characters, letters only)');
        this.querySelector('#comment-name').focus();
        return false;
      }
      
      if (!window.validateEmail(email)) {
        alert('Please enter a valid email address');
        this.querySelector('#comment-email').focus();
        return false;
      }
      
      if (!window.validateText(content, 10, 1000)) {
        alert('Comment must be between 10 and 1000 characters');
        this.querySelector('#comment-content').focus();
        return false;
      }

      const commentData = {
        author_name: name,
        author_email: email,
        content: content
      };

      try {
        submitButton.disabled = true;
        submitButton.textContent = 'Submitting...';

        await submitComment(commentData);

        submitButton.textContent = '✓ Submitted!';
        submitButton.style.background = '#4CAF50';
        this.reset();

        const pendingMessage = document.createElement('p');
        pendingMessage.style.cssText = 'text-align: center; color: #4CAF50; padding: 20px; background: #e8f5e9; border-radius: 8px; margin: 20px 0;';
        pendingMessage.textContent = 'Your comment has been submitted and is awaiting approval!';
        this.insertAdjacentElement('afterend', pendingMessage);

        setTimeout(() => {
          submitButton.textContent = originalText;
          submitButton.style.background = '';
          submitButton.disabled = false;
          pendingMessage.remove();
        }, 5000);

      } catch (error) {
        submitButton.textContent = '✗ Error';
        submitButton.style.background = '#f44336';
        
        setTimeout(() => {
          submitButton.textContent = originalText;
          submitButton.style.background = '';
          submitButton.disabled = false;
        }, 3000);
      }
    });
  }
});
