@echo off
setlocal enabledelayedexpansion

:: Colors for output
set "GREEN=[92m"
set "BLUE=[94m"
set "RED=[91m"
set "NC=[0m"

:: Store the root directory path
set "ROOT_DIR=%CD%"
echo %BLUE%Project root directory: %ROOT_DIR%%NC%

:: Fix docker-compose.yml file for Windows
echo %BLUE%Ensuring docker-compose.yml is properly formatted...%NC%
if exist "docker/compose/docker-compose.yml" (
    :: Create a temporary file with the correct content and encoding
    type nul > docker-compose.yml.tmp
    :: Copy content line by line to ensure proper line endings
    for /f "usebackq delims=" %%a in ("docker/compose/docker-compose.yml") do (
        echo %%a>> docker-compose.yml.tmp
    )
    :: Replace the original file
    move /y docker-compose.yml.tmp docker-compose.yml
    echo %GREEN%docker-compose.yml has been fixed for Windows compatibility%NC%
) else (
    echo %RED%Warning: Could not find docker/compose/docker-compose.yml%NC%
)

:: Fix configuration files for Docker build
echo %BLUE%Ensuring configuration files are properly set up...%NC%

:: Copy next.config.mjs
if exist "config/next.config.mjs" (
    :: Create a temporary file with the correct content and encoding
    type nul > next.config.mjs.tmp
    :: Copy content line by line to ensure proper line endings
    for /f "usebackq delims=" %%a in ("config/next.config.mjs") do (
        echo %%a>> next.config.mjs.tmp
    )
    :: Replace the original file
    move /y next.config.mjs.tmp next.config.mjs
    echo %GREEN%next.config.mjs has been fixed for Docker compatibility%NC%
) else (
    echo %RED%Warning: Could not find config/next.config.mjs%NC%
)

:: Copy postcss.config.mjs
if exist "config/postcss.config.mjs" (
    type nul > postcss.config.mjs.tmp
    for /f "usebackq delims=" %%a in ("config/postcss.config.mjs") do (
        echo %%a>> postcss.config.mjs.tmp
    )
    move /y postcss.config.mjs.tmp postcss.config.mjs
    echo %GREEN%postcss.config.mjs has been fixed for Docker compatibility%NC%
) else (
    echo %RED%Warning: Could not find config/postcss.config.mjs%NC%
)

:: Copy tailwind.config.ts
if exist "config/tailwind.config.ts" (
    type nul > tailwind.config.ts.tmp
    for /f "usebackq delims=" %%a in ("config/tailwind.config.ts") do (
        echo %%a>> tailwind.config.ts.tmp
    )
    move /y tailwind.config.ts.tmp tailwind.config.ts
    echo %GREEN%tailwind.config.ts has been fixed for Docker compatibility%NC%
) else (
    echo %RED%Warning: Could not find config/tailwind.config.ts%NC%
)

:: Copy tsconfig.json
if exist "config/tsconfig.json" (
    type nul > tsconfig.json.tmp
    for /f "usebackq delims=" %%a in ("config/tsconfig.json") do (
        echo %%a>> tsconfig.json.tmp
    )
    move /y tsconfig.json.tmp tsconfig.json
    echo %GREEN%tsconfig.json has been fixed for Docker compatibility%NC%
) else (
    echo %RED%Warning: Could not find config/tsconfig.json%NC%
)

:: Create necessary directories with proper permissions
echo %BLUE%Creating necessary directories...%NC%
if not exist logs mkdir logs
if not exist storage\markdown mkdir storage\markdown
if not exist crawl_results mkdir crawl_results

:: Set permissions (Windows equivalent of chmod)
echo %BLUE%Setting directory permissions...%NC%
icacls logs /grant Everyone:F /T
icacls storage /grant Everyone:F /T
icacls crawl_results /grant Everyone:F /T

:: Start Docker containers
echo %BLUE%Starting Docker containers...%NC%
echo %BLUE%Building Docker images to include latest code changes...%NC%
docker-compose up -d --build

echo %GREEN%All services are running!%NC%
echo %BLUE%Frontend:%NC% http://localhost:3001
echo %BLUE%Backend:%NC% http://localhost:24125
echo %BLUE%Crawl4AI:%NC% http://localhost:11235
echo %BLUE%Logs:%NC% .\logs\
echo %BLUE%Press Ctrl+C to stop all services%NC%

:: Monitor containers
echo %BLUE%Monitoring services...%NC%
:loop
:: Check if all containers are running
for /f "tokens=*" %%a in ('docker ps -q -f name^=devdocs-frontend') do set "FRONTEND_RUNNING=%%a"
for /f "tokens=*" %%a in ('docker ps -q -f name^=devdocs-backend') do set "BACKEND_RUNNING=%%a"
for /f "tokens=*" %%a in ('docker ps -q -f name^=devdocs-mcp') do set "MCP_RUNNING=%%a"
for /f "tokens=*" %%a in ('docker ps -q -f name^=devdocs-crawl4ai') do set "CRAWL4AI_RUNNING=%%a"

if "!FRONTEND_RUNNING!"=="" (
    echo %RED%Frontend container has stopped unexpectedly%NC%
    goto shutdown
)
if "!BACKEND_RUNNING!"=="" (
    echo %RED%Backend container has stopped unexpectedly%NC%
    goto shutdown
)
if "!MCP_RUNNING!"=="" (
    echo %RED%MCP container has stopped unexpectedly%NC%
    goto shutdown
)
if "!CRAWL4AI_RUNNING!"=="" (
    echo %RED%Crawl4AI container has stopped unexpectedly%NC%
    goto shutdown
)

:: Wait for 5 seconds before checking again
timeout /t 5 /nobreak > nul
goto loop

:shutdown
echo %BLUE%Shutting down services...%NC%
docker-compose down
echo %GREEN%All services stopped%NC%