#!/bin/bash
echo "Current directory: $(pwd)"
echo "Listing files:"
ls -la
echo "Checking dist folder:"
ls -la dist/ || echo "dist folder not found"
echo "Starting application..."
node dist/main.js
