@echo off
chcp 65001 > nul
echo ==========================================
echo تشغيل خادم معين الصوتي
echo ==========================================
echo.

python --version >nul 2>&1
if errorlevel 1 (
    echo خطأ: Python غير مثبت
    pause
    exit /b 1
)

echo تم العثور على Python
python --version
echo.

echo فحص المكتبات المطلوبة...
python -c "import flask, whisper" 2>nul
if errorlevel 1 (
    echo جاري تثبيت المكتبات...
    python -m pip install -r requirements.txt
)

echo جميع المكتبات جاهزة
echo.
echo بدء خادم معين...
echo.
echo افتح المتصفح ثم افتح ملف dashboard.html واضغط على زر معين
echo.

python voice_server.py

pause
