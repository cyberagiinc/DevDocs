#!/bin/bash

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Store the root directory path
ROOT_DIR="$(pwd)"
echo -e "${BLUE}Project root directory: ${ROOT_DIR}${NC}"

# Function to check if a port is in use
check_port() {
    lsof -i :$1 > /dev/null 2>&1
    return $?
}

# Function to wait for a service to be ready
wait_for_service() {
    local port=$1
    local service=$2
    local max_attempts=30
    local attempt=1

    echo -e "${BLUE}Waiting for $service to start...${NC}"
    while ! nc -z localhost $port && [ $attempt -le $max_attempts ]; do
        sleep 1
        attempt=$((attempt + 1))
    done

    if [ $attempt -le $max_attempts ]; then
        echo -e "${GREEN}$service is ready!${NC}"
        return 0
    else
        echo -e "${RED}$service failed to start${NC}"
        return 1
    fi
}

# Kill any existing processes on our ports
if check_port 3001; then
    echo "Port 3001 in use, killing process..."
    lsof -ti:3001 | xargs kill -9
fi

if check_port 24125; then
    echo "Port 24125 in use, killing process..."
    lsof -ti:24125 | xargs kill -9
fi

# Create a log directory
mkdir -p logs

# Install Python backend dependencies
echo -e "${BLUE}Installing Python backend dependencies...${NC}"
if [ -f "backend/requirements.txt" ]; then
    cd "backend"
    python3 -m venv venv
    source venv/bin/activate
    pip install -r requirements.txt
    cd "$ROOT_DIR"
else
    echo -e "${RED}Error: requirements.txt not found in backend directory${NC}"
    exit 1
fi

# Start Next.js frontend on port 3001
echo -e "${BLUE}Starting Next.js frontend...${NC}"
PORT=3001 npm run dev > logs/frontend.log 2>&1 &
FRONTEND_PID=$!

# Start FastAPI backend
echo -e "${BLUE}Starting FastAPI backend...${NC}"
cd backend
source venv/bin/activate
uvicorn app.main:app --host 0.0.0.0 --port 24125 --reload > ../logs/backend.log 2>&1 &
BACKEND_PID=$!
cd "$ROOT_DIR"

# Activate MCP server's virtual environment and start it
echo -e "${BLUE}Starting MCP server...${NC}"
source fast-markdown-mcp/venv/bin/activate

# Get storage path from .env file if it exists, otherwise use default
STORAGE_PATH="$ROOT_DIR/storage/markdown"
if [ -f ".env" ]; then
  # Extract STORAGE_PATH from .env file
  ENV_STORAGE_PATH=$(grep -e "^STORAGE_PATH=" .env | cut -d '=' -f 2)
  if [ ! -z "$ENV_STORAGE_PATH" ]; then
    # If path is relative (doesn't start with /), prepend ROOT_DIR
    if [[ "$ENV_STORAGE_PATH" != /* ]]; then
      STORAGE_PATH="$ROOT_DIR/$ENV_STORAGE_PATH"
    else
      STORAGE_PATH="$ENV_STORAGE_PATH"
    fi
  fi
fi

# Create storage directory if it doesn't exist
mkdir -p "$STORAGE_PATH"
echo -e "${BLUE}Using storage path: $STORAGE_PATH${NC}"

PYTHONPATH="$ROOT_DIR/fast-markdown-mcp/src" \
    fast-markdown-mcp/venv/bin/python -m fast_markdown_mcp.server \
    "$STORAGE_PATH" > logs/mcp.log 2>&1 &
MCP_PID=$!

# Wait for services to be ready
wait_for_service 3001 "Frontend" && \
wait_for_service 24125 "Backend"

if [ $? -eq 0 ]; then
    echo -e "${GREEN}All services are running!${NC}"
    echo -e "${BLUE}Frontend:${NC} http://localhost:3001"
    echo -e "${BLUE}Backend:${NC} http://localhost:24125"
    echo -e "${BLUE}Logs:${NC} ./logs/"
    echo -e "${BLUE}Press Ctrl+C to stop all services${NC}"

    # Open the frontend in the default browser
    if [[ "$OSTYPE" == "darwin"* ]]; then
        open http://localhost:3001
    elif [[ "$OSTYPE" == "linux-gnu"* ]]; then
        xdg-open http://localhost:3001
    fi

    # Handle graceful shutdown
    cleanup() {
        echo -e "\n${BLUE}Shutting down services...${NC}"
        kill $FRONTEND_PID $BACKEND_PID $MCP_PID
        wait $FRONTEND_PID $BACKEND_PID $MCP_PID 2>/dev/null
        echo -e "${GREEN}All services stopped${NC}"
        exit 0
    }
    
    trap cleanup SIGINT SIGTERM

    # Keep the script running and monitor child processes
    while kill -0 $FRONTEND_PID $BACKEND_PID $MCP_PID 2>/dev/null; do
        sleep 1
    done

    echo -e "${RED}One or more services have stopped unexpectedly${NC}"
    cleanup
else
    echo -e "${RED}Failed to start all services${NC}"
    kill $FRONTEND_PID $BACKEND_PID $MCP_PID 2>/dev/null
    exit 1
fi
