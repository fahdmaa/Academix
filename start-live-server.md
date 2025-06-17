# 🚀 FIX LOCALHOST WITH VISUAL STUDIO CODE

## Method 1: Use Live Server Extension (RECOMMENDED)

1. **Install Live Server Extension**:
   - Open VS Code
   - Press `Ctrl+Shift+X` (Extensions)
   - Search for "Live Server" by Ritwick Dey
   - Click Install

2. **Start Live Server**:
   - Open `index.html` in VS Code
   - Right-click anywhere in the file
   - Select "Open with Live Server"
   - OR press `Alt+L` then `Alt+O`

3. **If port 5500 is blocked**, I've configured it to use port 5500 in `.vscode/settings.json`

## Method 2: Use VS Code Terminal

Open the integrated terminal (`Ctrl+``) and run:

```bash
# Python 3 (most common)
python -m http.server 8080

# OR if you have Node.js
npx http-server -p 8080

# OR if you have PHP
php -S localhost:8080
```

## Method 3: Use Preview Extension

1. Install "Preview on Web Server" extension
2. Press `Ctrl+Shift+P`
3. Type "Preview on Web Server" and select it

## Method 4: Direct File Access

1. Press `Ctrl+K` then `O` to open folder
2. Navigate to your project
3. Right-click `index.html`
4. Select "Reveal in File Explorer"
5. Double-click to open in Firefox

## Troubleshooting

### "Port already in use" error:
```bash
# Windows PowerShell
netstat -ano | findstr :5500
taskkill /PID <PID_NUMBER> /F

# OR change port in VS Code settings
```

### Live Server not working:
1. Check Windows Firewall
2. Disable antivirus temporarily
3. Try different port: File > Preferences > Settings > Search "liveServer.settings.port" > Change to 3000

### Quick Test:
After starting server, open Firefox and try:
- http://localhost:5500
- http://127.0.0.1:5500
- http://localhost:5500/index.html

## VS Code Shortcuts:
- `Alt+L, Alt+O` - Open with Live Server
- `Alt+L, Alt+C` - Stop Live Server
- `Ctrl+Shift+P` - Command Palette
- `Ctrl+`` ` - Open Terminal