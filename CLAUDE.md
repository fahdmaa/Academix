# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

OOUI PROF is a static single-page web application for booking private finance and accounting lessons. It's a multi-language (French/English/Arabic) educational service website with no backend dependencies.

## Architecture

### Technology Stack
- **Frontend**: Pure HTML, CSS, JavaScript (no framework)
- **Email Service**: EmailJS for contact form submissions
- **Storage**: LocalStorage for user preferences and form data backup
- **Deployment**: Static files, can be served from any web server

### Key Components

1. **Multi-language System**
   - Languages: French (default), English, Arabic (with RTL support)
   - Translation keys in `script.js` (translations object)
   - Language preference saved to localStorage

2. **Theme System**
   - Dark/Light mode toggle
   - CSS variables for theming in `styles.css`
   - Theme preference saved to localStorage

3. **Form Handling**
   - EmailJS integration (service_id: "service_0btadmm", template_id: "template_kbj9hcc")
   - Backup submission to localStorage if EmailJS fails
   - Form validation and error handling

4. **Mobile Support**
   - Responsive design with mobile optimizations integrated into main files
   - Touch interactions and swipe gestures
   - Mobile menu with hamburger icon
   - Performance optimizations for low-end devices

## Development Commands

Since this is a static site with no build process:

```bash
# To run locally, use any static file server:
python -m http.server 8000
# or
npx serve .
# or
php -S localhost:8000
```

## Code Structure

- **script.js**: Contains all core functionality:
  - Theme switching (`toggleTheme()`)
  - Language switching (`changeLanguage()`)
  - Form submission (`handleSubmit()`)
  - UI animations and interactions
  - Achievement counters
  - Modal system for subjects
  - Mobile enhancements (navigation, touch, performance)

- **styles.css**: Main stylesheet with:
  - CSS custom properties for theming
  - Responsive breakpoints
  - Animation keyframes
  - Component styles
  - Mobile-specific media queries (768px, 480px, 437px)

## Important Notes

1. **No Build Process**: Changes to files are immediately reflected - no compilation needed
2. **Security**: Input sanitization implemented, EmailJS credentials properly managed
3. **localStorage Keys**: `theme`, `language`, `formSubmissions`
4. **Testing**: Manual testing only - open HTML files directly in browser
5. **Mobile Integration**: All mobile functionality is now integrated into the main files (index.html, styles.css, script.js)
6. **Cleaned Structure**: Test/debug files removed, duplicate functions eliminated, code optimized
7. **Accessibility**: ARIA labels added, semantic HTML improved, keyboard navigation supported