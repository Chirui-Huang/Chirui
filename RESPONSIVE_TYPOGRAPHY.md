# Responsive Typography System

This website uses a comprehensive responsive typography system that automatically adjusts font sizes based on screen size for optimal readability across all devices.

## 📱 Responsive Breakpoints

The typography system uses four breakpoints to ensure text is readable on all devices:

### 1. **Desktop** (901px and above)
- **Base font size**: 15px
- **Line height**: 28px
- **H1**: 32px
- **H2**: 28px
- **H3**: 24px
- **H4**: 20px
- **H5**: 18px
- **H6**: 16px

### 2. **Tablet** (768px - 900px)
- **Base font size**: 14px
- **Line height**: 26px
- **H1**: 28px
- **H2**: 24px
- **H3**: 21px
- **H4**: 18px
- **H5**: 16px
- **H6**: 15px

### 3. **Mobile** (481px - 640px)
- **Base font size**: 14px
- **Line height**: 24px
- **H1**: 24px
- **H2**: 21px
- **H3**: 18px
- **H4**: 16px
- **H5**: 15px
- **H6**: 14px

### 4. **Small Mobile** (480px and below)
- **Base font size**: 13px
- **Line height**: 22px
- **H1**: 22px
- **H2**: 19px
- **H3**: 17px
- **H4**: 15px
- **H5**: 14px
- **H6**: 13px

## 🎨 What Elements Are Responsive?

### Body Text
- Paragraphs, lists, and general content automatically scale
- Line height adjusts proportionally for better readability

### Headings (H1-H6)
- All heading sizes scale down on smaller screens
- Maintains hierarchy and visual balance
- Spacing and margins adjust for mobile viewing

### Code Blocks
- Inline code and code blocks resize for readability
- Padding adjusts on mobile to save space
- Font sizes: 14px → 13px → 12px

### Blockquotes
- Font size scales from 18px to 15px
- Padding reduces on mobile devices
- Border and styling remain consistent

### Buttons
- Button text and padding scale appropriately
- Touch targets remain accessible (minimum 44px)
- Full-width on very small screens

## ✨ Benefits

1. **Better Readability**: Text is optimized for each screen size
2. **Improved UX**: Content is easier to read without zooming
3. **Professional Look**: Consistent typography hierarchy
4. **Mobile-First**: Designed for mobile users first
5. **Accessible**: Maintains WCAG compliance across devices

## 🔧 Technical Implementation

The responsive typography system uses:
- **CSS Media Queries**: Breakpoint-based font scaling
- **SCSS Variables**: Centralized typography settings
- **Relative Units**: Consistent scaling relationships
- **Line Height Adjustments**: Maintains optimal reading experience

## 📝 Customization

To adjust typography settings, edit:
- `_sass/0-settings/_typography.scss` - Font size variables
- `_sass/3-elements/_headings.scss` - Heading styles
- `_sass/3-elements/_page.scss` - Body text styles

## 🧪 Testing

Test responsive typography by:
1. Opening your website in a browser
2. Using DevTools responsive mode (F12 → Toggle Device Toolbar)
3. Resizing browser window to different widths
4. Checking readability at 320px, 480px, 768px, and 1200px

## 📱 Recommended Testing Devices

- **Desktop**: 1920x1080, 1440x900
- **Tablet**: iPad (768x1024), iPad Pro (1024x1366)
- **Mobile**: iPhone 13 (390x844), Samsung Galaxy (360x740)
- **Small**: iPhone SE (375x667), small Android (320x568)

---

**Last Updated**: March 1, 2026
