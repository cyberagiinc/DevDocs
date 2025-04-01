#!/bin/bash

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Store the root directory path
ROOT_DIR="$(pwd)"
echo -e "${BLUE}Project root directory: ${ROOT_DIR}${NC}"

# Create necessary directories with proper permissions
mkdir -p logs
mkdir -p storage/markdown
mkdir -p crawl_results
chmod -R 777 logs storage crawl_results

# Detect which docker compose command to use
if docker compose version &>/dev/null; then
    DOCKER_COMPOSE="docker compose"
elif command -v docker-compose &>/dev/null; then
    DOCKER_COMPOSE="docker-compose"
else
    echo -e "${RED}Neither docker compose nor docker-compose found${NC}"
    exit 1
fi

# Start Docker containers
echo -e "${BLUE}Starting Docker containers...${NC}"
echo -e "${BLUE}Building Docker images to include latest code changes...${NC}"
$DOCKER_COMPOSE up -d --build
echo -e "${GREEN}All services are running!${NC}"
echo -e "${BLUE}Frontend:${NC} http://localhost:3001"
echo -e "${BLUE}Backend:${NC} http://localhost:24125"
echo -e "${BLUE}Crawl4AI:${NC} http://localhost:11235"
echo -e "${BLUE}Logs:${NC} ./logs/"
echo -e "${BLUE}Press Ctrl+C to stop all services${NC}"

# Handle graceful shutdown
cleanup() {
    echo -e "\n${BLUE}Shutting down services...${NC}"
    $DOCKER_COMPOSE down
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
        $DOCKER_COMPOSE down
        exit 1
    fi
    sleep 5
done
