#!/bin/bash

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Store the root directory path
ROOT_DIR="$(pwd)"
echo -e "${BLUE}Project root directory: ${ROOT_DIR}${NC}"

# Get storage path from .env file if it exists, otherwise use default
STORAGE_PATH="storage/markdown"
if [ -f ".env" ]; then
  STORAGE_PATH_FROM_ENV=$(grep -e "^STORAGE_PATH=" .env | cut -d '=' -f 2)
  if [ ! -z "$STORAGE_PATH_FROM_ENV" ]; then
    STORAGE_PATH="$STORAGE_PATH_FROM_ENV"
  fi
fi

# If not absolute, make it relative to current directory
if [[ "$STORAGE_PATH" != /* ]]; then
  STORAGE_PATH="$ROOT_DIR/$STORAGE_PATH"
fi

echo -e "${BLUE}Using storage path: $STORAGE_PATH${NC}"
export STORAGE_PATH

# Create necessary directories with proper permissions
mkdir -p logs
mkdir -p "$STORAGE_PATH"
mkdir -p crawl_results
chmod -R 777 logs "$STORAGE_PATH" crawl_results

# Start Docker containers
echo -e "${BLUE}Starting Docker containers...${NC}"
echo -e "${BLUE}Building Docker images to include latest code changes...${NC}"
docker-compose up -d --build

echo -e "${GREEN}All services are running!${NC}"
echo -e "${BLUE}Frontend:${NC} http://localhost:3001"
echo -e "${BLUE}Backend:${NC} http://localhost:24125"
echo -e "${BLUE}Crawl4AI:${NC} http://localhost:11235"
echo -e "${BLUE}Logs:${NC} ./logs/"
echo -e "${BLUE}Press Ctrl+C to stop all services${NC}"

# Handle graceful shutdown
cleanup() {
    echo -e "\n${BLUE}Shutting down services...${NC}"
    docker-compose down
    echo -e "${GREEN}All services stopped${NC}"
    exit 0
}

trap cleanup SIGINT SIGTERM

# Keep the script running
echo -e "${BLUE}Monitoring services...${NC}"
while true; do
    # Check if all containers are running
    FRONTEND_RUNNING=$(docker ps -q -f name=devdocs-frontend)
    BACKEND_RUNNING=$(docker ps -q -f name=devdocs-backend)
    MCP_RUNNING=$(docker ps -q -f name=devdocs-mcp)
    CRAWL4AI_RUNNING=$(docker ps -q -f name=devdocs-crawl4ai)
    
    if [ -z "$FRONTEND_RUNNING" ] || [ -z "$BACKEND_RUNNING" ] || [ -z "$MCP_RUNNING" ] || [ -z "$CRAWL4AI_RUNNING" ]; then
        echo -e "${RED}One or more containers have stopped unexpectedly${NC}"
        echo -e "${BLUE}Shutting down services...${NC}"
        docker-compose down
        exit 1
    fi
    
    sleep 5
done