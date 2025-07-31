# Biyometrik Fotoğraf Web Servisi

Türkiye resmi belgeleri için profesyonel biyometrik fotoğraf oluşturma web servisi.

## Özellikler

- 🛂 **8 Belge Türü**: Pasaport, ehliyet, kimlik, vize, ÖSYM, öğrenci, iş yeri, nüfus cüzdanı
- 🎯 **Otomatik Optimizasyon**: Her belge için özel standartlar
- 🤖 **AI Destekli**: Yüz algılama ve otomatik kırpma
- ✨ **Profesyonel Rötuj**: Arka plan değiştirme, netleştirme, renk düzeltme
- 📱 **Responsive**: Mobil ve masaüstü uyumlu

## Teknoloji Yığını

- **Frontend**: Next.js 15, React 18, TypeScript, Tailwind CSS
- **Backend**: Python Flask, OpenCV, Face Recognition
- **AI/ML**: face_recognition, PIL/Pillow, NumPy

## Kurulum

### 1. Projeyi Klonlayın
```bash
git clone https://github.com/muhammedSeyrek/BiometricPhotoWebService.git
cd BiometricPhotoWebService
```

### 2. Frontend Kurulumu
```bash
# Node.js bağımlılıklarını yükle
npm install

# Geliştirme sunucusunu başlat
npm run dev
```

### 3. Backend Kurulumu
```bash
# Python bağımlılıklarını yükle
pip install flask flask-cors opencv-python face-recognition pillow numpy

# Flask servisini başlat
python biometrik_service.py
```

## Kullanım

1. **Frontend**: http://localhost:3000
2. **Backend**: http://127.0.0.1:5001
3. Belge tipini seçin
4. Fotoğrafınızı yükleyin
5. "Fotoğrafı İşle" butonuna tıklayın
6. Biyometrik standardlara uygun fotoğrafınızı indirin

## Desteklenen Standartlar

- **ICAO 9303**: Uluslararası sivil havacılık standartları
- **NVI**: Türkiye Nüfus ve Vatandaşlık İşleri standartları
- **Schengen**: AB vize standartları
- **ÖSYM**: Türkiye sınav sistemi standartları

## API Endpoints

### Flask Backend
- `POST /process` - Fotoğraf işleme
- `GET /health` - Sistem sağlığı
- `GET /document-types` - Desteklenen belge tipleri

### Next.js Frontend
- `POST /api/photos/upload` - Fotoğraf yükleme ve işleme

## Geliştirme

```bash
# Frontend geliştirme
npm run dev

# Backend geliştirme (debug mode)
python biometrik_service.py

# Build
npm run build
```

## Lisans

MIT License

## Katkıda Bulunma

1. Fork edin
2. Feature branch oluşturun (`git checkout -b feature/amazing-feature`)
3. Commit edin (`git commit -m 'Add amazing feature'`)
4. Push edin (`git push origin feature/amazing-feature`)
5. Pull Request açın

## İletişim

Muhammed Seyrek - [GitHub](https://github.com/muhammedSeyrek)

Proje Linki: [https://github.com/muhammedSeyrek/BiometricPhotoWebService](https://github.com/muhammedSeyrek/BiometricPhotoWebService)