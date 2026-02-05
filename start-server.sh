#!/bin/bash

# Simple local server starter script
# Choose your preferred method below

echo "Starting local server..."
echo ""
echo "Choose a method:"
echo "1) Python HTTP Server (port 8000)"
echo "2) Node.js http-server (port 8080)"
echo "3) Vercel Dev (port 3000)"
echo ""
read -p "Enter choice (1-3): " choice

case $choice in
    1)
        echo "Starting Python server on http://localhost:8000"
        python3 -m http.server 8000
        ;;
    2)
        if command -v npx &> /dev/null; then
            echo "Starting Node.js http-server on http://localhost:8080"
            npx http-server -p 8080 -o
        else
            echo "http-server not found. Installing..."
            npm install -g http-server
            npx http-server -p 8080 -o
        fi
        ;;
    3)
        if command -v vercel &> /dev/null; then
            echo "Starting Vercel dev server on http://localhost:3000"
            vercel dev
        else
            echo "Vercel CLI not found. Install with: npm i -g vercel"
            exit 1
        fi
        ;;
    *)
        echo "Invalid choice. Starting Python server by default..."
        python3 -m http.server 8000
        ;;
esac
