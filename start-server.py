#!/usr/bin/env python3
"""
Simple HTTP Server for OUIIPROF
Works with Firefox Developer Edition
"""

import http.server
import socketserver
import os
import sys

# Try different ports if 8000 is busy
PORTS = [8000, 8080, 3000, 5000, 9000]
PORT = None
httpd = None

# Change to the script's directory
os.chdir(os.path.dirname(os.path.abspath(__file__)))

print("🚀 Starting OUIIPROF Development Server...")
print("📁 Serving from:", os.getcwd())

# Try to find an available port
for port in PORTS:
    try:
        Handler = http.server.SimpleHTTPRequestHandler
        httpd = socketserver.TCPServer(("", port), Handler)
        PORT = port
        break
    except OSError:
        print(f"❌ Port {port} is already in use, trying another...")
        continue

if httpd is None:
    print("❌ Could not find an available port. Please close other servers.")
    sys.exit(1)

print(f"\n✅ Server started successfully!")
print(f"🌐 Open Firefox Developer Edition and navigate to:")
print(f"   http://localhost:{PORT}")
print(f"   http://localhost:{PORT}/index.html")
print(f"   http://localhost:{PORT}/pricing-module.html")
print(f"\n📋 Available files:")
for file in os.listdir('.'):
    if file.endswith('.html'):
        print(f"   - http://localhost:{PORT}/{file}")

print("\n⚡ Press Ctrl+C to stop the server")

try:
    httpd.serve_forever()
except KeyboardInterrupt:
    print("\n\n👋 Server stopped. Goodbye!")
    httpd.shutdown()