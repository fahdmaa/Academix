// MongoDB Backend Configuration for Academix
const API_CONFIG = {
    // Production: Uses Vercel serverless function
    production: {
        endpoint: '/api/submit-form',
        method: 'POST'
    },

    // Development: Uses Vercel dev server
    development: {
        endpoint: 'http://localhost:3000/api/submit-form',
        method: 'POST'
    }
};

// Auto-detect environment
const isDevelopment = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
const config = isDevelopment ? API_CONFIG.development : API_CONFIG.production;

// Export configuration
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { API_CONFIG: config };
}
