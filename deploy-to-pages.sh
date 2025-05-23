#!/bin/bash

# Deploy script for GitHub Pages

echo "Building for GitHub Pages..."
npm run build:pages

if [ $? -eq 0 ]; then
    echo "Build successful!"
    echo ""
    echo "To deploy to GitHub Pages:"
    echo "1. Commit all changes including the built files"
    echo "2. Push to your GitHub repository"
    echo "3. Enable GitHub Pages in your repository settings"
    echo ""
    echo "Your game will be available at https://[your-username].github.io/[repository-name]/"
else
    echo "Build failed. Please check the errors above."
fi
