// Production Configuration for OUIIPROF
// This file is safe to commit to GitHub (no secrets)

window.OUIIPROF_CONFIG = {
    // Azure Functions Configuration
    azureFunctionUrl: 'https://ouiiprof-form-handler.azurewebsites.net/api/handleForm',
    
    // Function key will be loaded from environment variable
    azureFunctionKey: '',  // Will be set by build process
    
    // Fallback settings
    forceLocalStorage: false,
    
    // Email settings
    recipientEmail: 'fahd.maatoug@outlook.fr',
    senderName: 'OUIIPROF Contact Form',
    
    // Debug mode - disabled in production
    debugMode: false
};

console.log('✅ OUIIPROF Production Config loaded (no secrets)');