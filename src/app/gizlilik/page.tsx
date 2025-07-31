import { Shield, Eye, Lock, FileText, Users, Database } from 'lucide-react';

export default function GizlilikPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="container mx-auto px-4 py-16">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Gizlilik Politikası
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Kişisel verilerinizin güvenliği bizim için önceliktir. Bu politika, verilerinizi nasıl topladığımızı, 
            kullandığımızı ve koruduğumuzu açıklar.
          </p>
          <div className="mt-6 text-sm text-muted-foreground">
            Son güncelleme: 15 Aralık 2024
          </div>
        </div>

        <div className="max-w-4xl mx-auto">
          {/* Data Collection */}
          <section className="bg-white rounded-lg p-8 shadow-sm mb-8">
            <div className="flex items-center mb-6">
              <Database className="w-8 h-8 text-blue-600 mr-3" />
              <h2 className="text-2xl font-semibold">Toplanan Veriler</h2>
            </div>
            
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium mb-3">Kişisel Bilgiler</h3>
                <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                  <li>Ad, soyad ve e-posta adresi (hesap oluşturma için)</li>
                  <li>Telefon numarası (isteğe bağlı, destek için)</li>
                  <li>IP adresi ve tarayıcı bilgileri (güvenlik için)</li>
                  <li>Ödeme bilgileri (şifrelenmiş olarak, üçüncü taraf ödeme sağlayıcıları aracılığıyla)</li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-lg font-medium mb-3">Fotoğraf Verileri</h3>
                <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                  <li>Yüklenen orijinal fotoğraflar (işleme için geçici olarak)</li>
                  <li>İşlenmiş biyometrik fotoğraflar</li>
                  <li>Fotoğraf meta verileri (boyut, format, çekim tarihi)</li>
                  <li>Yüz tanıma ve analiz verileri (sadece işleme sırasında)</li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-lg font-medium mb-3">Kullanım Verileri</h3>
                <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                  <li>Site kullanım istatistikleri ve sayfa görüntülemeleri</li>
                  <li>Özellik kullanım sıklığı ve tercihleri</li>
                  <li>Hata raporları ve performans verileri</li>
                  <li>Müşteri destek etkileşimleri</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Data Usage */}
          <section className="bg-white rounded-lg p-8 shadow-sm mb-8">
            <div className="flex items-center mb-6">
              <Eye className="w-8 h-8 text-green-600 mr-3" />
              <h2 className="text-2xl font-semibold">Verilerin Kullanımı</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-medium mb-3">Birincil Amaçlar</h3>
                <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                  <li>Biyometrik fotoğraf işleme hizmeti sağlama</li>
                  <li>Hesap yönetimi ve kimlik doğrulama</li>
                  <li>Ödeme işlemlerinin gerçekleştirilmesi</li>
                  <li>Müşteri destek hizmetleri</li>
                  <li>Yasal yükümlülüklerin yerine getirilmesi</li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-lg font-medium mb-3">İkincil Amaçlar</h3>
                <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                  <li>Hizmet kalitesinin iyileştirilmesi</li>
                  <li>Yeni özellik geliştirme</li>
                  <li>Güvenlik ve dolandırıcılık önleme</li>
                  <li>İstatistiksel analiz (anonim)</li>
                  <li>Pazarlama iletişimi (onay ile)</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Data Protection */}
          <section className="bg-white rounded-lg p-8 shadow-sm mb-8">
            <div className="flex items-center mb-6">
              <Shield className="w-8 h-8 text-purple-600 mr-3" />
              <h2 className="text-2xl font-semibold">Veri Güvenliği</h2>
            </div>
            
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium mb-3">Teknik Güvenlik Önlemleri</h3>
                <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                  <li>256-bit SSL şifreleme ile veri aktarımı</li>
                  <li>AES-256 şifreleme ile veri depolama</li>
                  <li>Çok faktörlü kimlik doğrulama</li>
                  <li>Düzenli güvenlik denetimleri ve penetrasyon testleri</li>
                  <li>Güvenlik duvarı ve DDoS koruması</li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-lg font-medium mb-3">Operasyonel Güvenlik</h3>
                <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                  <li>Sınırlı erişim kontrolü ve yetkilendirme</li>
                  <li>Personel güvenlik eğitimleri</li>
                  <li>Veri erişim logları ve izleme</li>
                  <li>Düzenli yedekleme ve felaket kurtarma planları</li>
                  <li>Üçüncü taraf güvenlik sertifikaları</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Data Retention */}
          <section className="bg-white rounded-lg p-8 shadow-sm mb-8">
            <div className="flex items-center mb-6">
              <Lock className="w-8 h-8 text-red-600 mr-3" />
              <h2 className="text-2xl font-semibold">Veri Saklama ve Silme</h2>
            </div>
            
            <div className="space-y-4">
              <div className="p-4 bg-blue-50 rounded-lg">
                <h3 className="font-medium text-blue-900 mb-2">Fotoğraf Verileri</h3>
                <p className="text-blue-800 text-sm">
                  Yüklenen orijinal fotoğraflar işleme tamamlandıktan sonra 24 saat içinde silinir. 
                  İşlenmiş fotoğraflar 30 gün boyunca indirme için saklanır.
                </p>
              </div>
              
              <div className="p-4 bg-green-50 rounded-lg">
                <h3 className="font-medium text-green-900 mb-2">Hesap Bilgileri</h3>
                <p className="text-green-800 text-sm">
                  Hesap bilgileri aktif kullanım süresince saklanır. Hesap kapatma talebinde 
                  30 gün içinde tüm veriler silinir.
                </p>
              </div>
              
              <div className="p-4 bg-purple-50 rounded-lg">
                <h3 className="font-medium text-purple-900 mb-2">İşlem Kayıtları</h3>
                <p className="text-purple-800 text-sm">
                  Yasal yükümlülükler gereği ödeme ve işlem kayıtları 10 yıl boyunca saklanır.
                </p>
              </div>
            </div>
          </section>

          {/* User Rights */}
          <section className="bg-white rounded-lg p-8 shadow-sm mb-8">
            <div className="flex items-center mb-6">
              <Users className="w-8 h-8 text-orange-600 mr-3" />
              <h2 className="text-2xl font-semibold">Kullanıcı Hakları</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-medium mb-3">KVKK Hakları</h3>
                <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                  <li>Kişisel verilerinizin işlenip işlenmediğini öğrenme</li>
                  <li>İşlenen verileriniz hakkında bilgi talep etme</li>
                  <li>Verilerin işlenme amacını ve bunların amacına uygun kullanılıp kullanılmadığını öğrenme</li>
                  <li>Yurt içinde veya yurt dışında verilerin aktarıldığı üçüncü kişileri bilme</li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-lg font-medium mb-3">Düzeltme ve Silme</h3>
                <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                  <li>Eksik veya yanlış işlenen verilerin düzeltilmesini isteme</li>
                  <li>Verilerin silinmesini veya yok edilmesini isteme</li>
                  <li>Düzeltme ve silme işlemlerinin üçüncü kişilere bildirilmesini isteme</li>
                  <li>İşlenen verilerin münhasıran otomatik sistemler vasıtasıyla analiz edilmesi suretiyle kişinin aleyhine bir sonucun ortaya çıkmasına itiraz etme</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Contact */}
          <section className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg p-8 text-white">
            <div className="flex items-center mb-4">
              <FileText className="w-8 h-8 mr-3" />
              <h2 className="text-2xl font-semibold">İletişim</h2>
            </div>
            <p className="mb-4 opacity-90">
              Gizlilik politikamız hakkında sorularınız veya veri haklarınızı kullanmak için:
            </p>
            <div className="space-y-2">
              <p><strong>E-posta:</strong> gizlilik@biyometrikfoto.com</p>
              <p><strong>Telefon:</strong> +90 (212) 555 0123</p>
              <p><strong>Adres:</strong> Teknoloji Geliştirme Bölgesi, Bilişim Vadisi, No: 42, 34906 Pendik / İstanbul</p>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}