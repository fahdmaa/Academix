# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

OuiiProf is a static tutoring website with multi-language support (French, English, Arabic) and dark/light theme switching. It's a single-page application built with vanilla JavaScript, HTML5, and CSS3.

## Development Commands

```bash
# Install dependencies (currently none required)
npm install

# Run local development server (requires manual setup)
# Use any static file server like:
python -m http.server 8000
# or
npx serve
```

## Architecture & Key Components

### Core Features
- **Multi-language System**: Translations stored in `script.js` as `translations` object. Language preference saved to localStorage.
- **Theme Switching**: CSS variables in `:root` and `[data-theme="dark"]`. Theme preference saved to localStorage.
- **Form Handling**: Contact form with client-side validation, currently no backend integration.
- **Interactive Elements**: Testimonial carousel, typewriter effect, smooth scrolling navigation, statistics counter animation.

### File Structure
- `index.html`: Single-page application with all content sections
- `script.js`: All JavaScript functionality including translations, theme switching, form handling, and animations
- `styles.css`: Complete styling with CSS variables, responsive design, and theme definitions
- `images/`: Logo variants (light/dark) and user avatars

### Key Patterns
- No build process or bundling - direct file serving
- localStorage for persistence (theme, language)
- Event delegation for dynamic content
- CSS animations and transitions for UI effects
- Mobile-first responsive design with burger menu