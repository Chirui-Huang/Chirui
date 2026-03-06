/**
 * WeChat Browser Compatibility Module
 * Handles detection and compatibility for WeChat's in-app browser (MicroMessenger)
 */

(function() {
  'use strict';

  /**
   * Detect WeChat browser
   */
  function isWeChat() {
    var ua = navigator.userAgent.toLowerCase();
    return ua.indexOf('micromessenger') !== -1;
  }

  /**
   * Get WeChat version
   */
  function getWeChatVersion() {
    var ua = navigator.userAgent.toLowerCase();
    var match = ua.match(/micromessenger\/([\d.]+)/);
    return match ? match[1] : null;
  }

  /**
   * Check if iOS or Android
   */
  function getPlatform() {
    var ua = navigator.userAgent.toLowerCase();
    if (ua.indexOf('iphone') !== -1 || ua.indexOf('ipad') !== -1) {
      return 'ios';
    } else if (ua.indexOf('android') !== -1) {
      return 'android';
    }
    return 'unknown';
  }

  /**
   * Initialize WeChat compatibility
   */
  function init() {
    if (!isWeChat()) {
      return; // Not WeChat browser, no need for compatibility fixes
    }

    var version = getWeChatVersion();
    var platform = getPlatform();
    
    console.log('[WeChat] Detected WeChat browser v' + version + ' on ' + platform);

    // Add marker to body for CSS targeting
    document.documentElement.classList.add('wechat-browser');
    document.documentElement.setAttribute('data-wechat-version', version || 'unknown');
    document.documentElement.setAttribute('data-platform', platform);

    // Fix viewport for WeChat
    fixViewport();

    // Fix external links (WeChat blocks some)
    fixExternalLinks();

    // Fix form handling
    fixFormHandling();

    // Notify user if security features are limited
    if (window.console) {
      console.log('[WeChat] Running in WeChat browser - some features may be limited');
    }
  }

  /**
   * Fix viewport issues in WeChat
   */
  function fixViewport() {
    // WeChat sometimes ignores viewport meta tags
    var viewport = document.querySelector('meta[name="viewport"]');
    if (viewport) {
      // Force viewport update
      viewport.content = 'width=device-width, initial-scale=1.0, maximum-scale=5.0, user-scalable=yes';
    }
  }

  /**
   * Fix external links for WeChat
   */
  function fixExternalLinks() {
    // WeChat blocks some external domains
    // Add warning for external links
    document.addEventListener('click', function(e) {
      var link = e.target.closest('a');
      if (!link) return;

      var href = link.getAttribute('href');
      if (!href) return;

      // Check if external link
      if (href.indexOf('http') === 0 && href.indexOf(window.location.host) === -1) {
        // External link - WeChat may block
        var shouldWarn = link.getAttribute('data-wechat-warn') !== 'false';
        
        if (shouldWarn && !link.hasAttribute('data-wechat-warned')) {
          e.preventDefault();
          link.setAttribute('data-wechat-warned', 'true');
          
          var confirmMsg = 'You will be leaving WeChat to visit an external website. Continue?';
          if (confirm(confirmMsg)) {
            // User confirmed, open link
            window.location.href = href;
          }
        }
      }
    });
  }

  /**
   * Fix form handling for WeChat
   */
  function fixFormHandling() {
    // WeChat has issues with some form submissions
    // Ensure forms work properly
    var forms = document.querySelectorAll('form');
    
    forms.forEach(function(form) {
      form.addEventListener('submit', function(e) {
        // Log form submission for debugging
        console.log('[WeChat] Form submitted');
        
        // WeChat sometimes loses form data, ensure it's captured
        var formData = new FormData(form);
        var dataObj = {};
        formData.forEach(function(value, key) {
          dataObj[key] = value;
        });
        
        console.log('[WeChat] Form data:', dataObj);
      });
    });
  }

  /**
   * Show WeChat-specific notice if needed
   */
  function showWeChatNotice() {
    // Only show once per session
    if (sessionStorage.getItem('wechat_notice_shown')) {
      return;
    }

    // Create subtle notice
    var notice = document.createElement('div');
    notice.style.cssText = 'position:fixed;top:0;left:0;right:0;background:#fff3cd;color:#856404;padding:10px;text-align:center;font-size:14px;z-index:9999;border-bottom:1px solid #ffeaa7;';
    notice.innerHTML = '📱 Viewing in WeChat Browser - Some features may be limited. For best experience, open in Safari or Chrome.';
    
    var closeBtn = document.createElement('button');
    closeBtn.innerHTML = '×';
    closeBtn.style.cssText = 'position:absolute;right:10px;top:50%;transform:translateY(-50%);background:none;border:none;font-size:24px;color:#856404;cursor:pointer;';
    closeBtn.onclick = function() {
      notice.remove();
      sessionStorage.setItem('wechat_notice_shown', 'true');
    };
    
    notice.appendChild(closeBtn);
    
    // Show notice after page loads
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', function() {
        document.body.insertBefore(notice, document.body.firstChild);
      });
    } else {
      document.body.insertBefore(notice, document.body.firstChild);
    }

    // Auto-hide after 10 seconds
    setTimeout(function() {
      if (notice.parentNode) {
        notice.style.transition = 'opacity 0.5s';
        notice.style.opacity = '0';
        setTimeout(function() {
          notice.remove();
          sessionStorage.setItem('wechat_notice_shown', 'true');
        }, 500);
      }
    }, 10000);
  }

  /**
   * Fix WeChat JSSDK issues if needed
   */
  function loadWeChatJSSDK() {
    // Only load if explicitly needed
    if (window.ENABLE_WECHAT_JSSDK) {
      var script = document.createElement('script');
      script.src = 'https://res.wx.qq.com/open/js/jweixin-1.6.0.js';
      script.onload = function() {
        console.log('[WeChat] JSSDK loaded');
      };
      document.head.appendChild(script);
    }
  }

  /**
   * Create global WeChat utility object
   */
  window.WeChatCompat = {
    isWeChat: isWeChat,
    getVersion: getWeChatVersion,
    getPlatform: getPlatform,
    showNotice: showWeChatNotice,
    init: init
  };

  // Auto-initialize on page load
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  console.log('[WeChat Compat] Module loaded');
})();
