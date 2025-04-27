# Feature: Update Docker Start Scripts to Pull Specific Image

**Objective:** Modify the Docker startup scripts (`scripts/docker/docker-start.sh` and `scripts/docker/docker-start.bat`) to automatically pull the specific Docker image `unclecode/crawl4ai:0.6.0-r1` with error handling before starting the containers.

**Plan:**

*   [x] **Subtask 1:** Modify `scripts/docker/docker-start.sh` (Implemented)
    *   Insert the following lines *before* the existing line `$DOCKER_COMPOSE up -d --build` (currently line 32):
        ```bash
        echo -e "${BLUE}Pulling specific Crawl4AI image (unclecode/crawl4ai:0.6.0-r1)...${NC}"
        docker pull unclecode/crawl4ai:0.6.0-r1
        # Check if the pull command was successful
        if [ $? -ne 0 ]; then
            echo -e "${RED}Error: Failed to pull Docker image unclecode/crawl4ai:0.6.0-r1. Please check your internet connection and Docker Hub access.${NC}"
            exit 1 # Exit the script if pull fails
        fi

        ```
*   [x] **Subtask 2:** Modify `scripts/docker/docker-start.bat` (Implemented)
    *   Insert the following lines *before* the existing line `docker-compose up -d --build` (currently line 45):
        ```batch
        echo %BLUE%Pulling specific Crawl4AI image (unclecode/crawl4ai:0.6.0-r1)...%NC%
        docker pull unclecode/crawl4ai:0.6.0-r1
        :: Check if the pull command was successful
        if %ERRORLEVEL% neq 0 (
            echo %RED%Error: Failed to pull Docker image unclecode/crawl4ai:0.6.0-r1. Please check your internet connection and Docker Hub access.%NC%
            exit /b 1 :: Exit the script if pull fails
        )

        ```
*   [x] **Subtask 3:** Verify changes and seal task list.

**Confidence Score (Revised Plan):** 9/10
**Rationale:** The revised plan directly addresses the requirement and adds crucial error handling, making the scripts more robust. The hardcoded version remains a minor point for future consideration but is acceptable for the current task.