@echo off
title AI Chatbot - Created by Akshat Singh Panwar
color 0A

echo.
echo ===============================================
echo        AI CHATBOT - OLLAMA INTERFACE
echo       Created by Akshat Singh Panwar
echo ===============================================
echo.

echo [1/4] Checking Ollama connection...
curl -s http://localhost:11434/api/tags >nul 2>&1
if %errorlevel% neq 0 (
    echo [ERROR] Ollama is not running!
    echo Please start Ollama and ensure it's accessible at localhost:11434
    echo Download from: https://ollama.ai
    echo.
    pause
    exit /b 1
)
echo [OK] Ollama is running

echo.
echo [2/4] Starting Backend Server...
start "AI Chatbot Backend" cmd /k "cd src\backend && python main.py"

echo [3/4] Waiting for backend to initialize...
timeout /t 3 /nobreak >nul

echo [4/4] Starting Frontend Application...
start "AI Chatbot Frontend" cmd /k "cd src\frontend && npm start"

echo.
echo ===============================================
echo Chatbot is starting up!
echo Backend API: http://localhost:8001
echo Frontend UI: http://localhost:3000
echo ===============================================
echo.
echo Press any key to close this window...
pause >nul
