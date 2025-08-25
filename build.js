#!/usr/bin/env node

// Build script to inject environment variables into config.prod.js
const fs = require('fs');
const path = require('path');

console.log('🔧 Building OUIIPROF with environment variables...');

// Read the config file
const configPath = path.join(__dirname, 'config.prod.js');
let configContent = fs.readFileSync(configPath, 'utf8');

// Replace the empty azureFunctionKey with the environment variable
const azureKey = process.env.AZURE_FUNCTION_KEY || '';

if (azureKey) {
    console.log('✅ Found AZURE_FUNCTION_KEY environment variable');
    configContent = configContent.replace(
        "azureFunctionKey: '',  // Will be set by build process",
        `azureFunctionKey: '${azureKey}',  // Set from environment variable`
    );
} else {
    console.log('⚠️  No AZURE_FUNCTION_KEY found, forms will use localStorage fallback');
}

// Write the updated config back
fs.writeFileSync(configPath, configContent);

console.log('✅ Build complete - config.prod.js updated');