# OUIIPROF - Tutoring Website

A modern, responsive tutoring website for finance and accounting courses with multi-language support (French, English, Arabic) and dark/light theme.

## Features

- 🌐 Multi-language support (FR/EN/AR)
- 🌓 Dark/Light theme switcher
- 📧 Contact form with EmailJS integration
- 💾 Local storage for form submissions
- 📊 Admin dashboard for managing submissions
- 📱 Fully responsive design
- ✨ Modern animations and micro-interactions

## Setup

### 1. EmailJS Configuration

1. Create an account at [EmailJS](https://www.emailjs.com/)
2. Follow the setup guide in `EMAILJS_SETUP.md`
3. Update `config.js` with your credentials:
   ```javascript
   const EMAILJS_CONFIG = {
       SERVICE_ID: 'your_service_id',
       TEMPLATE_ID: 'your_template_id',
       PUBLIC_KEY: 'your_public_key'
   };
   ```

### 2. Running the Website

1. Open `index.html` in a web browser
2. Or use a local server:
   ```bash
   python -m http.server 8000
   # or
   npx serve
   ```

### 3. Admin Dashboard

Access the admin dashboard at `admin.html` to:
- View all form submissions
- Search through submissions
- Export data as CSV
- Clear submission history

## File Structure

```
ouiiprof/
├── index.html          # Main website
├── admin.html          # Admin dashboard
├── script.js           # Main JavaScript
├── styles.css          # Styles
├── config.js           # EmailJS configuration (git-ignored)
├── images/             # Logo and images
└── EMAILJS_SETUP.md    # EmailJS setup guide
```

## Technologies Used

- HTML5, CSS3, JavaScript (Vanilla)
- EmailJS for email notifications
- LocalStorage for data persistence
- Lucide icons
- Google Fonts (Poppins)

## Security Notes

- Keep `config.js` secure and never commit it to version control
- The `.gitignore` file is configured to exclude sensitive files
- Form submissions are stored locally in the browser

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

All rights reserved © 2025 OUIIPROF