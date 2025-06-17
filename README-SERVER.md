# 🚀 How to Start the Local Server

## For Firefox Developer Edition Users

### Method 1: Python Server (Recommended)
```bash
# From the terminal/command prompt:
cd /mnt/c/Users/fahdm/OneDrive/Documents/ouiiprof
python3 -m http.server 8080
```

Then open: `http://localhost:8080/pricing-module.html`

### Method 2: Use the Start Script
Double-click `start-server.bat` (Windows) or run:
```bash
python start-server.py
```

### Method 3: Alternative Servers

#### Using Node.js (if installed):
```bash
# Install http-server globally
npm install -g http-server

# Run in the project directory
http-server -p 8080
```

#### Using PHP (if installed):
```bash
php -S localhost:8080
```

### Method 4: Firefox File Protocol
Simply open the file directly in Firefox Developer Edition:
1. Press `Ctrl+O` (or `Cmd+O` on Mac)
2. Navigate to: `C:\Users\fahdm\OneDrive\Documents\ouiiprof\pricing-module.html`
3. Select and open the file

### Troubleshooting

1. **Port Already in Use**: Try different ports (8080, 3000, 5000, 9000)
2. **Firefox Security**: If you see CORS errors, use the server methods instead of file://
3. **Windows Firewall**: May need to allow Python through firewall

### Quick Links Once Server is Running:
- Main site: `http://localhost:8080/index.html`
- Pricing module: `http://localhost:8080/pricing-module.html`