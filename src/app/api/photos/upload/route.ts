import { NextResponse } from 'next/server';
import { writeFile } from 'fs/promises';
import { join } from 'path';
import { v4 as uuidv4 } from 'uuid';
import { mkdir } from 'fs/promises';

const FLASK_URL = 'http://127.0.0.1:5001';

export async function POST(request: Request) {
  try {
    console.log('Upload API: İstek alındı');
    
    const formData = await request.formData();
    
    // FormData doğrulaması
    console.log('Upload API: FormData alındı, doğrulanıyor...');
    
    const file = formData.get('photo') as File;
    const documentType = formData.get('document_type') as string;
    
    if (!file) {
      console.error('Upload API: Fotoğraf bulunamadı');
      return NextResponse.json(
        { message: 'Fotoğraf bulunamadı' },
        { status: 400 }
      );
    }
    
    if (!documentType) {
      console.error('Upload API: Belge tipi bulunamadı');
      return NextResponse.json(
        { message: 'Belge tipi bulunamadı' },
        { status: 400 }
      );
    }

    // Dosya boyutu kontrolü (5MB limit)
    if (file.size > 5 * 1024 * 1024) {
      console.error('Upload API: Dosya boyutu çok büyük:', file.size);
      return NextResponse.json(
        { message: 'Dosya boyutu 5MB\'dan küçük olmalıdır' },
        { status: 400 }
      );
    }

    // Dosya tipi kontrolü
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png'];
    if (!allowedTypes.includes(file.type)) {
      console.error('Upload API: Desteklenmeyen dosya tipi:', file.type);
      return NextResponse.json(
        { message: 'Sadece JPEG, JPG ve PNG dosyaları desteklenmektedir' },
        { status: 400 }
      );
    }

    console.log(`Upload API: Dosya bilgileri - Ad: ${file.name}, Boyut: ${file.size} bytes`);

    // Önce orijinal dosyayı kaydet
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    
    const uploadDir = join(process.cwd(), 'public', 'uploads');
    try {
      await mkdir(uploadDir, { recursive: true });
    } catch (error) {
      console.error('Uploads klasörü oluşturulamadı:', error);
    }

    const uniqueId = uuidv4();
    const originalFileName = `original-${uniqueId}-${file.name}`;
    const originalFilePath = join(uploadDir, originalFileName);
    
    await writeFile(originalFilePath, buffer);
    console.log(`Upload API: Orijinal dosya kaydedildi: ${originalFileName}`);

    // Flask servisine gönder ve işle
    console.log('Upload API: Flask servisine gönderiliyor...');
    
    const flaskFormData = new FormData();
    flaskFormData.append('file', file);
    flaskFormData.append('document_type', documentType);

    try {
      // Flask servisine timeout ile istek gönder
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 30000); // 30 saniye timeout
      
      const flaskResponse = await fetch(`${FLASK_URL}/process`, {
        method: 'POST',
        body: flaskFormData,
        signal: controller.signal,
      });
      
      clearTimeout(timeoutId);

      console.log(`Upload API: Flask yanıt durumu: ${flaskResponse.status}`);

      if (!flaskResponse.ok) {
        const errorText = await flaskResponse.text();
        console.error('Upload API: Flask hatası:', errorText);
        
        try {
          const errorJson = JSON.parse(errorText);
          return NextResponse.json({
            id: uniqueId,
            originalUrl: `/uploads/${originalFileName}`,
            status: 'error',
            error: errorJson.error || 'Yüz işleme hatası'
          }, { status: flaskResponse.status });
        } catch {
          return NextResponse.json({
            id: uniqueId,
            originalUrl: `/uploads/${originalFileName}`,
            status: 'error',
            error: 'Yüz işleme sırasında bir hata oluştu'
          }, { status: flaskResponse.status });
        }
      }

      // İşlenmiş resmi al ve kaydet
      const processedImageBuffer = await flaskResponse.arrayBuffer();
      const processedFileName = `processed-${uniqueId}.jpg`;
      const processedFilePath = join(uploadDir, processedFileName);
      
      await writeFile(processedFilePath, Buffer.from(processedImageBuffer));
      console.log(`Upload API: İşlenmiş dosya kaydedildi: ${processedFileName}`);

      return NextResponse.json({
        id: uniqueId,
        originalUrl: `/uploads/${originalFileName}`,
        processedUrl: `/uploads/${processedFileName}`,
        status: 'completed',
        message: 'Fotoğraf başarıyla işlendi'
      });

    } catch (fetchError: any) {
      console.error('Upload API: Flask bağlantı hatası:', fetchError);
      
      let errorMessage = 'Flask servisi çalışmıyor. Lütfen biometrik_service.py dosyasını çalıştırdığınızdan emin olun.';
      let statusCode = 503;
      
      if (fetchError.name === 'AbortError') {
        errorMessage = 'İşlem zaman aşımına uğradı. Lütfen tekrar deneyin.';
        statusCode = 408;
      } else if (fetchError.code === 'ECONNREFUSED') {
        errorMessage = 'Flask servisi bağlantısı reddedildi. Servis çalışmıyor olabilir.';
      }
      
      return NextResponse.json({
        id: uniqueId,
        originalUrl: `/uploads/${originalFileName}`,
        status: 'error',
        error: errorMessage,
        instruction: 'Terminal açıp "python biometrik_service.py" komutunu çalıştırın'
      }, { status: statusCode });
    }

  } catch (error) {
    console.error('Upload API: Genel hata:', error);
    return NextResponse.json({
      message: 'Fotoğraf yüklenirken bir hata oluştu',
      error: error instanceof Error ? error.message : 'Bilinmeyen hata'
    }, { status: 500 });
  }
}

// Health check endpoint
export async function GET() {
  try {
    const flaskHealthResponse = await fetch(`${FLASK_URL}/health`);
    const flaskHealth = await flaskHealthResponse.json();
    
    return NextResponse.json({
      message: 'Upload API çalışıyor',
      timestamp: new Date().toISOString(),
      flask_service: flaskHealth
    });
  } catch (error) {
    return NextResponse.json({
      message: 'Upload API çalışıyor',
      timestamp: new Date().toISOString(),
      flask_service: 'Bağlantı kurulamadı',
      error: error instanceof Error ? error.message : 'Bilinmeyen hata'
    }, { status: 503 });
  }
}