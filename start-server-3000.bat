@echo off
echo 🚀 Starting OUIIPROF Development Server on port 3000...
echo.
echo 📋 Requirements:
echo   - Python 3 must be installed
echo   - Run this from the OUIIPROF project directory
echo.
echo 🌐 Server will be available at:
echo   http://localhost:3000
echo   http://localhost:3000/index.html
echo.
echo ⚡ Press Ctrl+C to stop the server
echo.

REM Try different Python commands
python start-server.py 2>nul || py start-server.py 2>nul || python3 start-server.py 2>nul || (
    echo ❌ Python not found!
    echo.
    echo 📥 Please install Python 3 from: https://www.python.org/downloads/
    echo    Or install from Microsoft Store: python
    echo.
    echo 💡 Alternative: Use Node.js if available
    echo    npm run serve
    echo.
    pause
    exit /b 1
)
