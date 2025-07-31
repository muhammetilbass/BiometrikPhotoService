from flask import Flask, request, send_file, jsonify
from flask_cors import CORS
import cv2
import numpy as np
import face_recognition
from PIL import Image, ImageEnhance, ImageFilter
import io
import logging

app = Flask(__name__)
CORS(app)

# Logging ayarları
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Belge standartları konfigürasyonu
DOCUMENT_STANDARDS = {
    'pasaport': {
        'name': 'Pasaport',
        'size_mm': (50, 60),
        'size_pixels': (590, 708),  # 300 DPI
        'head_height_mm': (32, 36),
        'head_ratio': 0.7,
        'background_color': (240, 240, 240),  # Açık gri
        'face_position': 'center',
        'padding_ratio': 0.8,
        'enhancement': {
            'sharpening': 0.5,
            'brightness': 0.05,
            'contrast': 0.1,
            'color_balance': True
        }
    },
    'ehliyet': {
        'name': 'Ehliyet',
        'size_mm': (50, 60),
        'size_pixels': (590, 708),
        'head_height_mm': (25, 35),
        'head_ratio': 0.75,
        'background_color': (255, 255, 255),  # Saf beyaz
        'face_position': 'center',
        'padding_ratio': 0.6,
        'enhancement': {
            'sharpening': 0.7,
            'brightness': 0.1,
            'contrast': 0.15,
            'color_balance': True
        }
    },
    'kimlik': {
        'name': 'T.C. Kimlik Kartı',
        'size_mm': (50, 60),
        'size_pixels': (590, 708),
        'head_height_mm': (30, 36),
        'head_ratio': 0.7,
        'background_color': (255, 255, 255),  # Saf beyaz
        'face_position': 'center',
        'padding_ratio': 0.7,
        'enhancement': {
            'sharpening': 0.6,
            'brightness': 0.05,
            'contrast': 0.12,
            'color_balance': True
        }
    },
    'vize': {
        'name': 'Vize Başvurusu',
        'size_mm': (35, 45),  # Schengen standartı
        'size_pixels': (413, 531),
        'head_height_mm': (32, 36),
        'head_ratio': 0.7,
        'background_color': (245, 245, 245),  # Açık gri
        'face_position': 'center',
        'padding_ratio': 0.8,
        'enhancement': {
            'sharpening': 0.4,
            'brightness': 0.03,
            'contrast': 0.08,
            'color_balance': True
        }
    },
    'osym': {
        'name': 'ÖSYM Sınavları',
        'size_mm': (50, 60),
        'size_pixels': (590, 708),
        'head_height_mm': (30, 36),
        'head_ratio': 0.7,
        'background_color': (255, 255, 255),  # Saf beyaz
        'face_position': 'center',
        'padding_ratio': 0.7,
        'enhancement': {
            'sharpening': 0.6,
            'brightness': 0.08,
            'contrast': 0.12,
            'color_balance': True
        }
    },
    'ogrenci': {
        'name': 'Öğrenci Kimlik Kartı',
        'size_mm': (50, 60),
        'size_pixels': (590, 708),
        'head_height_mm': (28, 34),
        'head_ratio': 0.65,
        'background_color': (255, 255, 255),  # Beyaz
        'face_position': 'center',
        'padding_ratio': 0.6,
        'enhancement': {
            'sharpening': 0.3,
            'brightness': 0.1,
            'contrast': 0.08,
            'color_balance': True
        }
    },
    'is_yeri': {
        'name': 'İş Yeri Kimlik Kartı',
        'size_mm': (30, 40),
        'size_pixels': (354, 472),
        'head_height_mm': (22, 28),
        'head_ratio': 0.7,
        'background_color': (255, 255, 255),  # Beyaz
        'face_position': 'center',
        'padding_ratio': 0.5,
        'enhancement': {
            'sharpening': 0.8,
            'brightness': 0.05,
            'contrast': 0.15,
            'color_balance': True
        }
    },
    'nufus': {
        'name': 'Nüfus Cüzdanı',
        'size_mm': (50, 60),
        'size_pixels': (590, 708),
        'head_height_mm': (30, 36),
        'head_ratio': 0.7,
        'background_color': (255, 255, 255),  # Beyaz
        'face_position': 'center',
        'padding_ratio': 0.7,
        'enhancement': {
            'sharpening': 0.5,
            'brightness': 0.05,
            'contrast': 0.1,
            'color_balance': True
        }
    }
}

def apply_professional_enhancements(img, enhancement_settings):
    """Profesyonel fotoğraf iyileştirmeleri uygula"""
    
    # NumPy array'den PIL Image'e çevir
    pil_img = Image.fromarray(img)
    
    # Renk dengesi
    if enhancement_settings.get('color_balance', False):
        # Beyaz denge düzeltmesi (basit yöntem)
        enhancer = ImageEnhance.Color(pil_img)
        pil_img = enhancer.enhance(1.1)
    
    # Parlaklık ayarı
    brightness_factor = 1.0 + enhancement_settings.get('brightness', 0)
    enhancer = ImageEnhance.Brightness(pil_img)
    pil_img = enhancer.enhance(brightness_factor)
    
    # Kontrast ayarı
    contrast_factor = 1.0 + enhancement_settings.get('contrast', 0)
    enhancer = ImageEnhance.Contrast(pil_img)
    pil_img = enhancer.enhance(contrast_factor)
    
    # Netleştirme
    sharpening_amount = enhancement_settings.get('sharpening', 0)
    if sharpening_amount > 0:
        # Hafif netleştirme filtresi
        enhancer = ImageEnhance.Sharpness(pil_img)
        pil_img = enhancer.enhance(1.0 + sharpening_amount)
    
    # Gürültü azaltma (çok hafif)
    pil_img = pil_img.filter(ImageFilter.SMOOTH_MORE)
    
    return np.array(pil_img)

def create_background_with_gradient(size, base_color):
    """Profesyonel arka plan oluştur"""
    img = np.ones((size[1], size[0], 3), dtype=np.uint8)
    
    # Ana rengi uygula
    img[:, :] = base_color
    
    # Çok hafif gradient efekti (merkez biraz daha aydınlık)
    center_y, center_x = size[1] // 2, size[0] // 2
    max_distance = np.sqrt(center_x**2 + center_y**2)
    
    for y in range(size[1]):
        for x in range(size[0]):
            distance = np.sqrt((x - center_x)**2 + (y - center_y)**2)
            gradient_factor = 1.0 - (distance / max_distance) * 0.05  # %5 varyasyon
            img[y, x] = np.clip(img[y, x] * gradient_factor, 0, 255)
    
    return img

@app.route('/process', methods=['POST'])
def process_photo():
    try:
        logger.info("Gelişmiş foto işleme isteği alındı")
        
        if 'file' not in request.files:
            return jsonify({'error': 'Dosya yüklenmedi'}), 400

        file = request.files['file']
        if file.filename == '':
            return jsonify({'error': 'Dosya seçilmedi'}), 400

        # Belge tipi
        document_type = request.form.get('document_type', 'pasaport')
        
        if document_type not in DOCUMENT_STANDARDS:
            return jsonify({'error': f'Desteklenmeyen belge tipi: {document_type}'}), 400
        
        standards = DOCUMENT_STANDARDS[document_type]
        logger.info(f"İşlenen dosya: {file.filename}, Belge tipi: {standards['name']}")

        # Dosyayı yükle
        img = face_recognition.load_image_file(file)
        face_locations = face_recognition.face_locations(img)

        if not face_locations:
            return jsonify({'error': 'Yüz tespit edilemedi. Lütfen yüzünüzün net görünür olduğu bir fotoğraf yükleyin.'}), 400

        logger.info(f"Tespit edilen yüz sayısı: {len(face_locations)}")

        # Resim boyutlarını al
        img_height, img_width = img.shape[:2]
        
        # İlk yüzü al
        top, right, bottom, left = face_locations[0]
        face_width = right - left
        face_height = bottom - top
        face_center_x = (left + right) // 2
        face_center_y = (top + bottom) // 2
        
        # Belge standardına göre kırpma alanını hesapla
        padding_ratio = standards['padding_ratio']
        crop_size = int(max(face_width, face_height) * (2.0 + padding_ratio))
        
        # Kare alanın koordinatlarını hesapla
        half_crop = crop_size // 2
        crop_left = max(0, face_center_x - half_crop)
        crop_right = min(img_width, face_center_x + half_crop)
        crop_top = max(0, face_center_y - half_crop)
        crop_bottom = min(img_height, face_center_y + half_crop)
        
        # Kenarlardan taşma kontrolü
        if crop_right - crop_left < crop_size:
            if crop_left == 0:
                crop_right = min(img_width, crop_size)
            else:
                crop_left = max(0, img_width - crop_size)
                
        if crop_bottom - crop_top < crop_size:
            if crop_top == 0:
                crop_bottom = min(img_height, crop_size)
            else:
                crop_top = max(0, img_height - crop_size)
        
        # Kırpılmış alanı al
        cropped_img = img[crop_top:crop_bottom, crop_left:crop_right]
        
        logger.info(f"Yüz merkezi: ({face_center_x}, {face_center_y})")
        logger.info(f"Kırpılan alan: {crop_right-crop_left}x{crop_bottom-crop_top}")

        # Final boyutları belirle
        target_pixels = standards['size_pixels']
        final_width, final_height = target_pixels
        
        # Profesyonel arka plan oluştur
        background_color = standards['background_color']
        final_img = create_background_with_gradient((final_width, final_height), background_color)
        
        # Kırpılmış resmi yeniden boyutlandır ve yerleştir
        h, w = cropped_img.shape[:2]
        if h > 0 and w > 0:
            # En-boy oranını koru
            scale = min(final_width / w, final_height / h) * 0.95  # %95 oranında
            new_w = int(w * scale)
            new_h = int(h * scale)
            
            # Resize et
            pil_cropped = Image.fromarray(cropped_img)
            pil_resized = pil_cropped.resize((new_w, new_h), Image.Resampling.LANCZOS)
            resized_img = np.array(pil_resized)
            
            # Merkezle ve yerleştir
            y_offset = (final_height - new_h) // 2
            x_offset = (final_width - new_w) // 2
            final_img[y_offset:y_offset+new_h, x_offset:x_offset+new_w] = resized_img
        else:
            return jsonify({'error': 'Resim işleme hatası'}), 500

        # Profesyonel iyileştirmeler uygula
        enhanced_img = apply_professional_enhancements(final_img, standards['enhancement'])

        # Sonucu JPEG olarak döndür
        pil_img = Image.fromarray(enhanced_img)
        buf = io.BytesIO()
        pil_img.save(buf, format='JPEG', quality=95, optimize=True)
        buf.seek(0)
        
        logger.info(f"{standards['name']} fotoğrafı başarıyla işlendi")
        return send_file(buf, mimetype='image/jpeg', as_attachment=True, 
                        download_name=f'processed-{document_type}.jpg')

    except Exception as e:
        logger.error(f"Hata: {str(e)}")
        return jsonify({'error': f'İşlem hatası: {str(e)}'}), 500

@app.route('/document-types', methods=['GET'])
def get_document_types():
    """Desteklenen belge tiplerini listele"""
    types = []
    for key, value in DOCUMENT_STANDARDS.items():
        types.append({
            'id': key,
            'name': value['name'],
            'size_mm': f"{value['size_mm'][0]}x{value['size_mm'][1]} mm",
            'size_pixels': f"{value['size_pixels'][0]}x{value['size_pixels'][1]} px"
        })
    return jsonify({'document_types': types})

@app.route('/health', methods=['GET'])
def health_check():
    return jsonify({
        'status': 'OK', 
        'message': 'Gelişmiş biyometrik fotoğraf servisi çalışıyor',
        'supported_documents': len(DOCUMENT_STANDARDS)
    })

@app.route('/', methods=['GET'])
def home():
    return jsonify({
        'message': 'Gelişmiş Biyometrik Fotoğraf İşleme Servisi',
        'version': '2.0',
        'endpoints': {
            'process': '/process (POST)',
            'document_types': '/document-types (GET)',
            'health': '/health (GET)'
        }
    })

if __name__ == '__main__':
    print("=" * 60)
    print("🚀 Gelişmiş Biyometrik Fotoğraf Servisi v2.0")
    print("=" * 60)
    print("📍 Ana sayfa: http://127.0.0.1:5001")
    print("🏥 Sağlık kontrolü: http://127.0.0.1:5001/health")
    print("📋 Belge tipleri: http://127.0.0.1:5001/document-types")
    print("🔄 İşleme endpoint: http://127.0.0.1:5001/process")
    print(f"📝 Desteklenen belge sayısı: {len(DOCUMENT_STANDARDS)}")
    print("=" * 60)
    app.run(host='127.0.0.1', port=5001, debug=True)