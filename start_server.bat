@echo off
chcp 65001 > nul
echo ==========================================
echo تشغيل خادم معين الصوتي
echo ==========================================
echo.

python --version >nul 2>&1
if errorlevel 1 (
    echo 
    pause
    exit 
)

echo 

echo.

echo 
 "import flask, whisper" 2>nul
if errorlevel 1 (
    echo 
)

echo
echo.
echo 
echo.
echo
echo.



pause
