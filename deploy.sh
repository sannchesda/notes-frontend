#!/bin/bash

# Build and deploy script for notes-frontend

set -e

echo "🚀 Building and deploying Notes Frontend..."

# Check if environment file exists
if [ -f .env ]; then
    echo "📄 Using environment variables from .env file"
    source .env
else
    echo "⚠️  No .env file found, using default values"
fi

# Build the Docker image
echo "🔨 Building Docker image..."
docker build \
    --build-arg VITE_API_BASE_URL="${VITE_API_BASE_URL:-http://localhost:5228/api}" \
    -t notes-frontend .

# Stop existing container if running
echo "🛑 Stopping existing container..."
docker stop notes-frontend-container 2>/dev/null || true
docker rm notes-frontend-container 2>/dev/null || true

# Run the new container
echo "🚀 Starting new container..."
docker run -d \
    --name notes-frontend-container \
    -p 3000:80 \
    --restart unless-stopped \
    notes-frontend

echo "✅ Deployment complete!"
echo "🌐 Application is running at http://localhost:3000"

# Show container status
docker ps | grep notes-frontend
