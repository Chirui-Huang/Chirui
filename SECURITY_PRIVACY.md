# 🔒 Website Security & Privacy

This page explains how we protect your data and ensure your security when visiting this website.

## Security Measures

### 🛡️ For Visitors

Your security is our priority. Here's what we've implemented:

#### 1. **Input Protection**
- All form inputs are sanitized to prevent malicious code
- XSS (Cross-Site Scripting) protection on all user inputs
- HTML encoding prevents code injection

#### 2. **Rate Limiting**
- **Contact Form**: Maximum 5 submissions per 5 minutes
- **Newsletter**: Maximum 3 subscriptions per 10 minutes  
- **Comments**: Maximum 3 comments per 30 minutes
- Prevents spam and abuse

#### 3. **Form Validation**
- **Email**: Strict validation (must be valid format, max 254 characters)
- **Name**: Letters only, 2-50 characters
- **Messages**: 10-2000 characters for contact form
- **Comments**: 10-1000 characters

#### 4. **Spam Protection**
- Honeypot fields catch automated bots
- Hidden fields detect non-human submissions
- Server-side validation

#### 5. **Data Privacy**
- No tracking cookies without consent
- Local data storage only (no external tracking)
- Your data is stored securely in an encrypted database

#### 6. **Secure Connections**
- Security headers prevent clickjacking
- External links open safely with `rel="noopener noreferrer"`
- Frame protection prevents embedding attacks

#### 7. **Content Security**
- User-generated content is sanitized
- Script tags are removed from comments
- Event handlers are stripped from submissions

## Privacy Policy

### What We Collect

#### Contact Form
When you submit the contact form, we collect:
- Name
- Email address
- Subject (optional)
- Message
- Submission timestamp

#### Newsletter
When you subscribe, we collect:
- Email address
- Subscription timestamp

#### Comments
When you comment, we collect:
- Name
- Email (not displayed publicly)
- Comment content
- Page URL
- Submission timestamp

### How We Use Your Data

- **Contact submissions**: To respond to your inquiries
- **Newsletter subscriptions**: To send updates (you can unsubscribe anytime)
- **Comments**: To display on the website after moderation

### Data Storage

- All data is stored in a local encrypted database
- Data is only accessible to the website administrator
- No data is shared with third parties
- No external analytics or tracking services

### Your Rights

You have the right to:
- Request a copy of your data
- Request deletion of your data
- Unsubscribe from the newsletter at any time
- Know how your data is being used

### Cookies

This website uses minimal cookies:
- **Session cookies**: For security and functionality
- **Preference cookies**: To remember your settings (if you opt-in)
- No advertising or tracking cookies

You can view our [Cookie Consent Notice](cookie-demo.html) and manage your preferences.

### Data Retention

- **Contact submissions**: Retained until resolved, then archived
- **Newsletter subscriptions**: Retained until you unsubscribe
- **Comments**: Retained indefinitely (unless you request deletion)

### Security Measures

We implement industry-standard security practices:
- Input sanitization and validation
- Rate limiting to prevent abuse
- Honeypot spam protection
- XSS and CSRF protection
- Secure data storage
- Regular security updates

## Browser Security Features

Your browser provides additional protection:

- **X-Content-Type-Options**: Prevents MIME type sniffing
- **X-Frame-Options**: Prevents clickjacking
- **X-XSS-Protection**: Enables browser XSS filtering
- **Referrer Policy**: Controls referrer information
- **Permissions Policy**: Restricts sensitive features

## Technical Details

For developers and security researchers:

### Security Headers
```
X-Content-Type-Options: nosniff
X-Frame-Options: SAMEORIGIN
X-XSS-Protection: 1; mode=block
Referrer-Policy: strict-origin-when-cross-origin
Permissions-Policy: geolocation=(), microphone=(), camera=()
```

### Input Validation
- Email: `/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/`
- Name: `/^[a-zA-Z\s\-']{2,50}$/`
- Length limits enforced server-side

### Rate Limiting
- Time-based window approach
- Per-form tracking
- Auto-reset after time window

## Report Security Issues

If you discover a security vulnerability:
- **Email**: fredykraft7@gmail.com
- Subject line: "Security Issue Report"
- Include details of the vulnerability
- Please allow 48 hours for response

## Updates to This Policy

Last updated: March 1, 2026

We may update this policy occasionally. Check this page for the latest version.

## Contact

Questions about security or privacy?
- Email: fredykraft7@gmail.com
- Subject: "Privacy Inquiry"

---

## Quick Summary

**✅ We protect you with:**
- Input validation & sanitization
- Rate limiting & spam protection
- Secure data storage
- No external tracking
- Minimal cookies

**✅ We respect your privacy:**
- Only collect necessary data
- No data selling or sharing
- You control your data
- Transparent practices

**✅ You're in control:**
- Request your data anytime
- Delete your data anytime
- Manage cookie preferences
- Opt-out of newsletters

---

**Your security and privacy matter to us.** 🔒
