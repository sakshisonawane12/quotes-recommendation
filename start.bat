@echo off
echo ============================================================
echo    Quotes Recommendation - SmartBrightSkillWallet
echo    Starting Application...
echo ============================================================
echo.

echo [1/2] Starting Rasa Server...
start "Rasa Server" cmd /k "conda activate rasa_env && rasa run --enable-api --cors * --port 5005"

timeout /t 5 /nobreak >nul

echo [2/2] Starting Frontend Server...
start "Frontend Server" cmd /k "cd frontend && python server.py"

echo.
echo ============================================================
echo    Application Started Successfully!
echo ============================================================
echo.
echo    Rasa Server: http://localhost:5005
echo    Frontend: http://localhost:8000
echo.
echo    The browser will open automatically...
echo ============================================================
pause
