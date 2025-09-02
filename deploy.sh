#!/bin/bash

# Exit on error
set -e

echo "🚀 Preparing to deploy Book List App to Choreo..."

# Check if we have the needed environment variables
if [ -z "$CHOREO_PROJECT_ID" ]; then
  echo "❌ CHOREO_PROJECT_ID environment variable is required"
  echo "Please set it to the UUID of your 'Rovin Test' project in Choreo"
  exit 1
fi

# Build the application
echo "📦 Building application..."
npm run build

echo "🔍 Validating Dockerfile..."
# Make sure Docker is running
docker info > /dev/null 2>&1 || { echo "❌ Docker is not running. Please start Docker and try again."; exit 1; }

echo "✅ Ready to deploy!"
echo "Please run the following commands to deploy to Choreo:"
echo ""
echo "1. Create the webapp component in Choreo:"
echo "   choreo components create --type webApp \\"
echo "     --project-id $CHOREO_PROJECT_ID \\"
echo "     --name book-list-app \\"
echo "     --git-repo $(git config --get remote.origin.url) \\"
echo "     --git-branch $(git rev-parse --abbrev-ref HEAD)"
echo ""
echo "2. Then create a connection to the book-list-service:"
echo "   choreo connections create --component-id YOUR_COMPONENT_ID \\"
echo "     --marketplace-service-id 01f078db-1725-1a78-84f5-e3d88551f87c"
echo ""
echo "3. Create environment variables for the API connection in Choreo console:"
echo "   VITE_API_BASE_URL: <Service URL from the connection>"
echo "   VITE_API_KEY: <API Key from the connection>"
echo ""
