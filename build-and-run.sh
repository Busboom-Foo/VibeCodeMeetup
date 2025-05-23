#!/bin/bash

echo "Building Fartogger game..."
npm run build

if [ $? -eq 0 ]; then
    echo "Build successful! Starting server..."
    npm start
else
    echo "Build failed. Please check the errors above."
fi
