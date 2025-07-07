# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

OOUI PROF is a static single-page web application for booking private finance and accounting lessons. It's a multi-language (French/English/Arabic) educational service website with no backend dependencies.

## Architecture

### Technology Stack
- **Frontend**: Pure HTML, CSS, JavaScript (no framework)
- **Backend**: Azure Functions for contact form submissions
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
   - Azure Functions backend integration for form submissions
   - Backup submission to localStorage if Azure backend fails
   - Form validation and error handling

4. **Mobile Support**
   - Responsive design with mobile optimizations integrated into main files
   - Touch interactions and swipe gestures
   - Mobile menu with hamburger icon
   - Performance optimizations for low-end devices

## Development Setup

### Installing Dependencies
```bash
npm install  # Only installs dev servers (http-server, live-server)
```

### Running Locally

Since this is a static site with no build process, you can use any static file server:

#### Method 1: npm Scripts (Recommended)
```bash
npm start      # Starts http-server on port 8080 and opens browser
npm run live   # Starts live-server with auto-reload on port 8080
npm run dev    # Alias for npm start
```

#### Method 2: Python Server
```bash
# Navigate to project directory
cd /mnt/c/Users/fahdm/WebstormProjects/OUIIPROF
python3 -m http.server 8080
```

#### Method 3: Use the Start Script
```bash
# Windows users can double-click start-server.bat
# Or run:
python start-server.py  # Automatic port selection (8080-8089)
```

#### Method 4: Alternative Servers
```bash
# Using Node.js
npm install -g http-server
http-server -p 8080

# Using PHP
php -S localhost:8080
```

#### Method 5: Direct File Access (Firefox)
- Open files directly in Firefox Developer Edition via File > Open
- Full path: `file:///C:/Users/fahdm/WebstormProjects/OUIIPROF/index.html`
- Note: May encounter CORS issues with some features

### Access Points
- Main site: `http://localhost:8080/index.html`
- Pricing module: `http://localhost:8080/pricing-module.html`

### Troubleshooting
- **Port conflicts**: The Python script automatically tries ports 8080-8089
- **CORS errors**: Always use `http://` URLs instead of `file://` protocol
- **Windows Firewall**: May need to allow Python through firewall
- **Live reload**: Use `npm run live` for automatic browser refresh on file changes

## Code Structure

### Main Files
- **index.html**: Main landing page with all sections (hero, services, about, contact)
- **pricing-module.html**: Dedicated pricing page with detailed lesson packages

### JavaScript
- **script.js**: Contains all core functionality:
  - Theme switching (`toggleTheme()`)
  - Language switching (`changeLanguage()`)
  - Form submission (`handleSubmit()`)
  - UI animations and interactions
  - Achievement counters
  - Modal system for subjects
  - Mobile enhancements (navigation, touch, performance)

### Styles
- **styles.css**: Main stylesheet with:
  - CSS custom properties for theming
  - Responsive breakpoints
  - Animation keyframes
  - Component styles
  - Mobile-specific media queries (768px, 480px, 437px)

### Helper Scripts
- **start-server.bat**: Windows batch file for starting local server
- **start-server.py**: Python script with automatic port selection (8080-8089)
- **backup-submit.js**: Handles form submission fallback to localStorage

## Important Notes

1. **No Build Process**: Changes to files are immediately reflected - no compilation needed
2. **Security**: Input sanitization implemented, Azure Functions provide secure backend
3. **localStorage Keys**: `theme`, `language`, `formSubmissions`
4. **Testing**: Manual testing only - no automated test framework
5. **Mobile Integration**: All mobile functionality is now integrated into the main files (index.html, styles.css, script.js)
6. **Cleaned Structure**: Test/debug files removed, duplicate functions eliminated, code optimized
7. **Accessibility**: ARIA labels added, semantic HTML improved, keyboard navigation supported
8. **Configuration**: Azure Functions configuration is in `config.js` (excluded from repository)
9. **Fallback System**: Form submissions automatically fall back to localStorage if Azure backend fails
10. **Browser Testing**: Test in multiple browsers, especially for RTL (Arabic) support
11. **Mobile Testing**: Significant mobile optimizations - test on various device sizes