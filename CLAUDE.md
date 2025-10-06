# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**Academix** is a modern React-based single-page web application for booking private finance and accounting lessons. It's a multi-language (French/English) educational service website with MongoDB backend integration and modern UI/UX design.

## Architecture

### Technology Stack
- **Frontend**: React 18.2.0 + Vite 5.0.8
- **UI Libraries**: Framer Motion (animations), GSAP (menu animations)
- **Backend**: Vercel Serverless Functions + MongoDB Atlas
- **Storage**: LocalStorage for user preferences (theme, language)
- **Deployment**: Vercel (React SPA + serverless API)
- **Styling**: CSS Modules with theme variables (glassmorphism design)

### Key Components

1. **Multi-language System**
   - Languages: French (default), English
   - Translation system in `src/translations.js` with complete FR/EN dictionaries
   - Language context provider in `src/context/LanguageContext.jsx`
   - Language preference saved to localStorage
   - All components use `t('key')` function for translations

2. **Theme System**
   - Dark/Light mode toggle with CSS variables
   - Theme context provider in `src/context/ThemeContext.jsx`
   - Plasma animated background with theme-aware colors
   - Theme preference saved to localStorage
   - Glassmorphism design with backdrop-filter effects

3. **Form Handling**
   - MongoDB Atlas backend for form submissions
   - Vercel serverless function at `/api/submit-form`
   - EmailJS integration for email notifications
   - Form validation and error handling with translations
   - Success/error messages in selected language

4. **UI/UX Features**
   - StaggeredMenu navigation with GSAP animations
   - Plasma animated background (5 gradient layers)
   - Subject modal with detailed information
   - Theme-aware components and styling
   - Auto-hiding header on scroll down
   - Responsive design for all screen sizes

## Development Setup

### Installing Dependencies
```bash
npm install
```

### Running Locally
```bash
npm run dev    # Starts Vite dev server (usually port 3000-3004)
```

### Building for Production
```bash
npm run build  # Builds to /dist directory
npm run preview # Preview production build locally
```

### Access Points
- Dev server: `http://localhost:3004` (or next available port)
- All routes handled by React Router (SPA)

### Environment Variables
Create `.env.local` file with:
```
MONGODB_URI=mongodb+srv://Academix-admin:VwCCtasgkklQArow@academix-cluster.nacfctb.mongodb.net/academix-db?retryWrites=true&w=majority&appName=academix-cluster

# Optional: EmailJS for email notifications
EMAILJS_SERVICE_ID=your_service_id
EMAILJS_TEMPLATE_ID=your_template_id
EMAILJS_PUBLIC_KEY=your_public_key
EMAILJS_PRIVATE_KEY=your_private_key
```

## Code Structure

### React Components (`src/components/`)
- **Hero.jsx**: Hero section with background image, overlay, animated title
- **Services.jsx**: Services grid with 3 service cards
- **Subjects.jsx**: 6 subjects with "En savoir plus" buttons opening modals
- **SubjectModal.jsx**: Detailed subject information modal
- **Appointment.jsx**: Booking form with full-width layout
- **Footer.jsx**: Modern footer with gradient, social links, legal sections
- **StaggeredMenuNew.jsx**: Animated hamburger menu with GSAP
- **ThemeToggle.jsx**: Theme switcher button
- **LanguageToggle.jsx**: Modern gradient language selector (FR/EN)
- **PlasmaBackground.jsx**: Animated gradient background

### Context Providers (`src/context/`)
- **ThemeContext.jsx**: Global theme state (light/dark)
- **LanguageContext.jsx**: Global language state + `t()` translation function

### Hooks (`src/hooks/`)
- **useScrollDirection.js**: Detects scroll direction for auto-hiding header

### Styles (`src/styles/`)
- **main.css**: Core component styles
- **plasma.css**: Plasma background animations
- **SubjectModal.css**: Modal styling with glassmorphism
- **Carousel.css**: Framer Motion carousel styles
- **LanguageToggle.css**: Modern language toggle button
- **StaggeredMenu.css**: GSAP menu animations

### Translations (`src/translations.js`)
Complete FR/EN dictionaries for all UI text

### API (`api/`)
- **submit-form.js**: Vercel serverless function for form submissions
  - Validates form data
  - Saves to MongoDB Atlas
  - Sends email via EmailJS (optional)
  - Returns success/error response

### MongoDB (`lib/`)
- **mongodb.js**: MongoDB connection helper with connection pooling

## MongoDB Backend

### Database Configuration
- **Provider**: MongoDB Atlas (cloud)
- **Database**: `academix-db`
- **Collection**: `form_submissions`
- **Connection**: Via `MONGODB_URI` environment variable

### Form Submission Flow
1. User fills form in Appointment section
2. Frontend sends POST to `/api/submit-form`
3. Serverless function validates data
4. Data saved to MongoDB Atlas
5. EmailJS sends notification (if configured)
6. Success message shown in selected language

### Environment Variables (Vercel)
Required:
- `MONGODB_URI`: MongoDB Atlas connection string

Optional (for email notifications):
- `EMAILJS_SERVICE_ID`
- `EMAILJS_TEMPLATE_ID`
- `EMAILJS_PUBLIC_KEY`
- `EMAILJS_PRIVATE_KEY`

## Deployment

### Vercel Configuration (`vercel.json`)
```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "rewrites": [...]
}
```

### Deploy to Vercel
1. Connect GitHub repository to Vercel
2. Add environment variables in Vercel dashboard
3. Deploy automatically on push to master

See [VERCEL_SETUP.md](./VERCEL_SETUP.md) for detailed deployment guide.

## Important Notes

1. **React Migration**: Migrated from vanilla JS to React 18 with Vite
2. **Translation System**: All text uses `t('key')` from LanguageContext
3. **Theme System**: All colors use CSS variables that change with theme
4. **Build Process**: Vite builds to `/dist` directory
5. **localStorage Keys**: `theme`, `language`
6. **Modern UI**: Glassmorphism, plasma background, smooth animations
7. **Responsive**: Mobile-first design with breakpoints at 768px, 1024px
8. **Accessibility**: ARIA labels, semantic HTML, keyboard navigation
9. **Performance**: Code splitting, lazy loading, optimized animations
10. **Browser Support**: Modern browsers (Chrome, Firefox, Safari, Edge)

## Development Workflow

1. **Start dev server**: `npm run dev`
2. **Make changes**: Hot module reload (HMR) updates automatically
3. **Test translations**: Switch between FR/EN using language toggle
4. **Test themes**: Switch between light/dark using theme toggle
5. **Test form**: Submit form (requires MongoDB connection)
6. **Build**: `npm run build` before deploying
7. **Deploy**: Push to GitHub → Vercel auto-deploys

## Testing

- **Manual testing**: Test all features in both languages and themes
- **Form testing**: Test form submission with valid/invalid data
- **Responsive testing**: Test on mobile, tablet, desktop sizes
- **Browser testing**: Test in Chrome, Firefox, Safari
- **API testing**: Verify MongoDB connection and email notifications

## Key Files Reference

- **Entry point**: `src/main.jsx`
- **Root component**: `src/App.jsx`
- **Translations**: `src/translations.js`
- **Theme config**: `src/theme.css`
- **Main HTML**: `index.html`
- **API endpoint**: `api/submit-form.js`
- **MongoDB config**: `lib/mongodb.js`
- **Deployment guide**: `VERCEL_SETUP.md`
