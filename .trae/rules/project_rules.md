# BiometrikPhotoService Proje Standartları ve Altyapısı

## Teknik Altyapı
- **Frontend**: Next.js (React)
- **Styling**: Tailwind CSS
- **Test**: Jest
- **Dil**: TypeScript

## Mimari
- **Katmanlı Mimari**: UI, API, Business Logic katmanları ayrılmıştır
- **Component Yapısı**: Atomic Design prensipleri uygulanmıştır
- **State Yönetimi**: Context API kullanılmaktadır

## Clean Code Prensipleri
1. **Kod Okunabilirliği**:
   - Anlamlı değişken ve fonksiyon isimleri
   - Yorum satırları sadece gerekli yerlerde
   - Kod tekrarından kaçınılmalı

2. **SOLID Prensipleri**:
   - Single Responsibility
   - Open/Closed
   - Liskov Substitution
   - Interface Segregation
   - Dependency Inversion

3. **Test Edilebilirlik**:
   - Unit testler her bileşen için yazılmalı
   - Testler AAA (Arrange-Act-Assert) patternine uygun olmalı

## İş Akışı
1. **Geliştirme**:
   - Feature branch'lerde çalışılır
   - Commit mesajları anlamlı olmalı
   - PR'ler code review sonrası merge edilir

2. **Test**:
   - Unit testler CI/CD pipeline'ında çalıştırılır
   - Test coverage minimum %80 olmalı

3. **Dağıtım**:
   - Otomatik CI/CD pipeline
   - Canlıya alım öncesi staging ortamında test

## Kod Stili Kuralları
- **Formatlama**: Prettier
- **Lint**: ESLint
- **Import Sıralaması**: External > Internal > Parent > Sibling
- **Indent**: 2 boşluk

## Versiyon Kontrol
- Git flow kullanılır
- Anlamlı commit mesajları
- Atomic commit'ler

## Güvenlik
- API endpoint'lerinde auth kontrolü
- Sensitive data .env'de tutulur
- Dependency'ler güncel tutulur