from flask import Flask, request, jsonify, send_from_directory, render_template_string
from flask_cors import CORS
import whisper
import os
import tempfile
from datetime import datetime
import sys
from pathlib import Path
import subprocess
import atexit
import shutil

possible_paths = [
    r"C:\Users\shouq\Downloads\ffmpeg-2025-12-10-git-4f947880bd-essentials_build\ffmpeg-2025-12-10-git-4f947880bd-essentials_build\bin\ffmpeg.exe",  # المسار الجديد
    "ffmpeg",  
    r"C:\ffmpeg\bin\ffmpeg.exe",
    r"C:\Program Files\ffmpeg\bin\ffmpeg.exe",
    r"C:\Program Files (x86)\ffmpeg\bin\ffmpeg.exe",
    os.path.join(os.environ.get('USERPROFILE', ''), "ffmpeg", "bin", "ffmpeg.exe"),
    "ffmpeg.exe"
]

FFMPEG_PATH = None
for path in possible_paths:
    try:
        path = path.format(os.getenv('USERNAME')) if '{' in path else path
        subprocess.run([path, "-version"], check=True, capture_output=True, text=True)
        FFMPEG_PATH = path
        print(f"✅ تم العثور على FFmpeg في: {FFMPEG_PATH}")
        break
    except (subprocess.CalledProcessError, FileNotFoundError):
        continue

if not FFMPEG_PATH:
    print("⚠️ تحذير: لم يتم العثور على FFmpeg في المواقع الشائعة")
    print("سيتم محاولة استخدام 'ffmpeg' من متغيرات النظام...")
    FFMPEG_PATH = "ffmpeg" 
    try:
        subprocess.run([FFMPEG_PATH, "-version"], check=True, capture_output=True, text=True)
        print("✅ تم العثور على FFmpeg في متغيرات النظام")
    except (subprocess.CalledProcessError, FileNotFoundError):
        print("❌ خطأ: لم يتم العثور على FFmpeg في النظام")
        print("الرجاء تثبيت FFmpeg وإضافته إلى متغيرات النظام")
        print("يمكنك تحميله من: https://ffmpeg.org/download.html")
        FFMPEG_PATH = "ffmpeg"

ffmpeg_dir = os.path.dirname(FFMPEG_PATH) if os.path.isabs(FFMPEG_PATH) else ""
if ffmpeg_dir and ffmpeg_dir not in os.environ['PATH']:
    os.environ['PATH'] = ffmpeg_dir + os.pathsep + os.environ.get('PATH', '')

app = Flask(__name__, static_folder='.', static_url_path='')
CORS(app)

TEMP_DIR = Path(tempfile.gettempdir()) / "mueayann_temp"

if TEMP_DIR.exists():
    shutil.rmtree(TEMP_DIR, ignore_errors=True)
os.makedirs(TEMP_DIR, exist_ok=True)
print(f"📁 المجلد المؤقت: {TEMP_DIR}")

def cleanup_temp_files():
    if TEMP_DIR.exists():
        shutil.rmtree(TEMP_DIR, ignore_errors=True)
        print("🧹 تم تنظيف الملفات المؤقتة")

atexit.register(cleanup_temp_files)

try:
    print("⏳ جاري تحميل نموذج Whisper...")
    model = whisper.load_model("base")
    print("✅ تم تحميل النموذج بنجاح!")
except Exception as e:
    print(f"❌ فشل في تحميل نموذج Whisper: {str(e)}")
    print("⚠️ تأكد من تثبيت جميع المتطلبات المطلوبة")
    model = None 

PAGE_ROUTES = {
    "الخدمات": "services.html",
    "إستعلامات": "inquiries.html",
    "الأمن العام": "public_security.html",
    "المرور": "traffic.html",
    "الأحوال المدنية": "civil_status.html",
    "الجوازات": "passports.html",
    "الوافدين": "expats.html",
    "خدمات المركبات": "vehicle_services.html",
    "مبايعة المركبات": "vehicle_sales.html",
    "إدارة المركبات": "vehicle_management.html",
    "لوحات المركبات": "vehicle_plates.html",
    "المزادات": "auctions.html",
    "الخدمات العامة": "general_services.html",
    "تحديث معلومات الجواز": "update_passport.html",
    "خدمات المقيمين": "resident_services.html",
    "التأشيرات": "visas.html",
    "الاستعلام عن التأمين الصحي": "health_insurance.html",
    "البصمة": "fingerprint.html",
    "سجل السفر": "travel_history.html",
    "تأشيرة خروج وعودة": "exit_reentry_visa.html",
    "تقرير المقيم": "resident_report.html",
    "توصيل الوثائق": "document_delivery.html",
    "طلب توصيل وثائق": "document_delivery.html"
}

@app.route('/')
def index():
    return send_from_directory('.', 'index.html')

@app.route('/<path:path>')
def serve_file(path):
    if path in PAGE_ROUTES.values():
        return f"""
        <!DOCTYPE html>
        <html dir="rtl">
        <head>
            <meta charset="UTF-8">
            <title>معين - {path}</title>
            <style>
                body {{
                    font-family: Arial, sans-serif;
                    text-align: center;
                    padding: 50px;
                    background-color: #f5f5f5;
                }}
                .container {{
                    max-width: 600px;
                    margin: 0 auto;
                    background: white;
                    padding: 30px;
                    border-radius: 10px;
                    box-shadow: 0 2px 10px rgba(0,0,0,0.1);
                }}
                h1 {{
                    color: #2c3e50;
                }}
                .back-btn {{
                    display: inline-block;
                    margin-top: 20px;
                    padding: 10px 20px;
                    background-color: #4CAF50;
                    color: white;
                    text-decoration: none;
                    border-radius: 5px;
                }}
            </style>
        </head>
        <body>
            <div class="container">
                <h1>مرحباً بك في صفحة {path}</h1>
                <p>هذه الصفحة خاصة بـ: {path}</p>
                <a href="/" class="back-btn">العودة للصفحة الرئيسية</a>
            </div>
        </body>
        </html>
        """
    return send_from_directory('.', path)

@app.route('/transcribe', methods=['POST'])
def transcribe_audio():
    if model is None:
        return jsonify({
            'success': False, 
            'error': 'نموذج التعرف على الصوت غير متاح. يرجى التأكد من تثبيت النموذج المطلوب.'
        })
        
    temp_path = None
    converted_path = None
    try:
        if 'audio' not in request.files or not request.files['audio'].filename:
            return jsonify({'success': False, 'error': 'لم يتم إرسال ملف صوتي صالح'})

        audio_file = request.files['audio']
        
        try:
            os.makedirs(TEMP_DIR, exist_ok=True)
            print(f"📂 المجلد المؤقت: {TEMP_DIR}")
            
            temp_path = TEMP_DIR / f"recording_{datetime.now().strftime('%Y%m%d_%H%M%S')}.wav"
            print(f"📝 حفظ الملف الصوتي في: {temp_path}")
            
            audio_file.save(str(temp_path))
            
            if not os.path.exists(temp_path):
                raise FileNotFoundError(f"فشل في حفظ الملف في: {temp_path}")
            
            print(f"🔍 حجم الملف: {os.path.getsize(temp_path)} بايت")
            print(f"⏳ جاري تحليل الصوت...")
            
            if not os.path.exists(FFMPEG_PATH):
                raise FileNotFoundError(f"لم يتم العثور على FFmpeg في المسار: {FFMPEG_PATH}")

            try:
                converted_path = str(temp_path) + ".converted.wav"
                cmd = [
                    FFMPEG_PATH,
                    '-i', str(temp_path),
                    '-ar', '16000',
                    '-ac', '1',
                    '-c:a', 'pcm_s16le',
                    '-y',  
                    converted_path
                ]
                
                print(f"🔄 جاري تحويل الملف الصوتي...")
                subprocess.run(cmd, check=True, capture_output=True, text=True)
                
                print(f"🔊 جاري تحويل الصوت إلى نص...")
                try:
                    result = model.transcribe(
                        converted_path,
                        language="ar",
                        fp16=False, 
                        verbose=True 
                    )
                except Exception as e:
                    print(f"❌ خطأ في تحويل الصوت إلى نص: {str(e)}")
                    return jsonify({
                        'success': False, 
                        'error': 'فشل في تحويل الصوت إلى نص',
                        'details': str(e)
                    })
                
                try:
                    os.remove(converted_path)
                except Exception as e:
                    print(f"⚠️ تحذير: لم يتم حذف الملف المحول: {e}")
                    
            except subprocess.CalledProcessError as e:
                print(f"❌ خطأ في معالجة الصوت باستخدام FFmpeg: {e.stderr}")
                raise
            
            transcription = result["text"].strip()
            print(f"✅ النص المحول: {transcription}")
            
            for keyword, route in PAGE_ROUTES.items():
                if keyword in transcription:
                    print(f"🔍 تم العثور على أمر: {keyword} - إعادة توجيه إلى: {route}")
                    return jsonify({
                        'success': True,
                        'text': f"جاري توجيهك إلى صفحة {keyword}",
                        'redirect_to': f"/{route}"
                    })
            
            print("⚠️ لم يتم العثور على صفحة مطابقة")
            return jsonify({
                'success': True,
                'text': transcription,
                'redirect_to': None
            })
            
        except Exception as e:
            import traceback
            error_details = traceback.format_exc()
            print(f"❌ خطأ في معالجة الصوت: {str(e)}")
            print(f"🔧 تفاصيل الخطأ: {error_details}")
            
            error_message = str(e)
            if "No such file or directory" in error_message or "The system cannot find the file specified" in error_message:
                error_message = "خطأ: لم يتم العثور على ملف FFmpeg. يرجى تثبيت FFmpeg وإضافته إلى متغيرات النظام."
            
            return jsonify({
                'success': False, 
                'error': error_message,
                'details': 'تأكد من تثبيت FFmpeg وإضافته إلى متغيرات النظام.'
            })
            
    except Exception as e:
        print(f"❌ خطأ: {str(e)}")
        import traceback
        traceback.print_exc()
        return jsonify({
            'success': False, 
            'error': 'حدث خطأ أثناء معالجة الطلب',
            'details': str(e)
        })
    finally:
        try:
            if temp_path and os.path.exists(temp_path):
                os.remove(temp_path)
            if 'converted_path' in locals() and converted_path and os.path.exists(converted_path):
                os.remove(converted_path)
        except Exception as e:
            print(f"⚠️ تحذير: فشل في حذف الملفات المؤقتة: {e}")

if __name__ == '__main__':
    print("\n" + "="*50)
    print("🚀 خادم معين الصوتي يعمل الآن!")
    print("📍 افتح المتصفح على: http://localhost:5000")
    print("="*50 + "\n")
    
    app.run(host='0.0.0.0', port=5000, debug=True)