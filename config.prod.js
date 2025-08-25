// Production Configuration for OUIIPROF
// This file is safe to commit to GitHub (no secrets)

window.OUIIPROF_CONFIG = {
    // Azure Functions Configuration
    azureFunctionUrl: 'https://ouiiprof-form-handler.azurewebsites.net/api/ouiiprof-form-handler',
    
    // No function key needed - will use Azure Function's built-in CORS and domain validation
    azureFunctionKey: null,
    
    // Fallback settings
    forceLocalStorage: false,
    
    // Email settings
    recipientEmail: 'fahd.maatoug@outlook.fr',
    senderName: 'OUIIPROF Contact Form',
    
    // Debug mode - disabled in production
    debugMode: false
};

console.log('✅ OUIIPROF Production Config loaded (no secrets)');