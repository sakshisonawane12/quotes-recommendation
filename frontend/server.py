#!/usr/bin/env python3
"""
Simple HTTP Server for Quotes Recommendation Frontend
SmartBrightSkillWallet Project
"""

import http.server
import socketserver
import webbrowser
import os
from pathlib import Path

PORT = 8000
DIRECTORY = Path(__file__).parent

class MyHTTPRequestHandler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=str(DIRECTORY), **kwargs)
    
    def end_headers(self):
        self.send_header('Cache-Control', 'no-store, no-cache, must-revalidate')
        self.send_header('Expires', '0')
        super().end_headers()

def main():
    print("=" * 60)
    print("🚀 Quotes Recommendation Frontend Server")
    print("📦 SmartBrightSkillWallet Project")
    print("=" * 60)
    print(f"\n✅ Server starting on port {PORT}...")
    print(f"📂 Serving directory: {DIRECTORY}")
    print(f"\n🌐 Open your browser and visit:")
    print(f"   http://localhost:{PORT}")
    print(f"\n⚠️  Make sure Rasa server is running:")
    print(f"   rasa run --enable-api --cors \"*\"")
    print(f"\n💡 Press Ctrl+C to stop the server\n")
    print("=" * 60)
    
    with socketserver.TCPServer(("", PORT), MyHTTPRequestHandler) as httpd:
        # Auto-open browser
        webbrowser.open(f'http://localhost:{PORT}')
        
        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            print("\n\n🛑 Server stopped. Goodbye!")
            httpd.shutdown()

if __name__ == "__main__":
    main()
