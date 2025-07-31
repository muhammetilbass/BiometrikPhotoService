import { FileText, AlertTriangle, CheckCircle, XCircle, Scale, CreditCard } from 'lucide-react';

export default function KullanimSartlariPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="container mx-auto px-4 py-16">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Kullanım Şartları
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Biyometrik fotoğraf hizmetimizi kullanarak aşağıdaki şart ve koşulları kabul etmiş sayılırsınız.
          </p>
          <div className="mt-6 text-sm text-muted-foreground">
            Son güncelleme: 15 Aralık 2024
          </div>
        </div>

        <div className="max-w-4xl mx-auto">
          {/* Service Description */}
          <section className="bg-white rounded-lg p-8 shadow-sm mb-8">
            <div className="flex items-center mb-6">
              <FileText className="w-8 h-8 text-blue-600 mr-3" />
              <h2 className="text-2xl font-semibold">Hizmet Tanımı</h2>
            </div>
            
            <div className="space-y-4">
              <p className="text-muted-foreground leading-relaxed">
                Biyometrik Fotoğraf Web Servisi, kullanıcıların yükledikleri fotoğrafları çeşitli resmi belge 
                standartlarına uygun hale getiren yapay zeka destekli bir platformdur. Hizmetimiz aşağıdaki 
                belge türleri için fotoğraf optimizasyonu sağlar:
              </p>
              
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                <li>Pasaport fotoğrafları (ICAO 9303 standardı)</li>
                <li>Ehliyet fotoğrafları</li>
                <li>Kimlik kartı fotoğrafları</li>
                <li>Vize başvuru fotoğrafları</li>
                <li>Öğrenci kimlik kartı fotoğrafları</li>
                <li>İş başvuru fotoğrafları</li>
              </ul>
            </div>
          </section>

          {/* User Responsibilities */}
          <section className="bg-white rounded-lg p-8 shadow-sm mb-8">
            <div className="flex items-center mb-6">
              <CheckCircle className="w-8 h-8 text-green-600 mr-3" />
              <h2 className="text-2xl font-semibold">Kullanıcı Sorumlulukları</h2>
            </div>
            
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium mb-3">Fotoğraf Kalitesi</h3>
                <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                  <li>Yüklenen fotoğrafların net ve yüksek kalitede olması</li>
                  <li>Yüzün tamamen görünür ve tanınabilir olması</li>
                  <li>Uygun ışıklandırma ve kontrasta sahip olması</li>
                  <li>Son 6 ay içinde çekilmiş güncel fotoğraf kullanılması</li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-lg font-medium mb-3">Yasal Uygunluk</h3>
                <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                  <li>Sadece kendi fotoğrafınızı veya yasal izniniz olan fotoğrafları yükleme</li>
                  <li>Telif hakkı ihlali yapmama</li>
                  <li>Sahte kimlik veya belge oluşturma amacıyla kullanmama</li>
                  <li>Yasadışı faaliyetlerde hizmeti kullanmama</li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-lg font-medium mb-3">Hesap Güvenliği</h3>
                <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                  <li>Hesap bilgilerini güvenli tutma</li>
                  <li>Şifrenizi düzenli olarak güncelleme</li>
                  <li>Hesabınızın yetkisiz kullanımını derhal bildirme</li>
                  <li>Doğru ve güncel bilgiler sağlama</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Prohibited Uses */}
          <section className="bg-white rounded-lg p-8 shadow-sm mb-8">
            <div className="flex items-center mb-6">
              <XCircle className="w-8 h-8 text-red-600 mr-3" />
              <h2 className="text-2xl font-semibold">Yasak Kullanımlar</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-medium mb-3 text-red-700">Kesinlikle Yasak</h3>
                <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                  <li>Sahte kimlik belgesi oluşturma</li>
                  <li>Başkasının fotoğrafını izinsiz kullanma</li>
                  <li>Dolandırıcılık amaçlı kullanım</li>
                  <li>Sistemi hack etme veya zarar verme</li>
                  <li>Spam veya kötü amaçlı içerik yükleme</li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-lg font-medium mb-3 text-orange-700">Sınırlı Kullanım</h3>
                <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                  <li>Ticari amaçlı toplu kullanım (lisans gerekir)</li>
                  <li>API'yi tersine mühendislik yapma</li>
                  <li>Otomatik bot veya script kullanma</li>
                  <li>Aşırı kaynak tüketimi</li>
                  <li>Rekabetçi analiz için kullanma</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Payment Terms */}
          <section className="bg-white rounded-lg p-8 shadow-sm mb-8">
            <div className="flex items-center mb-6">
              <CreditCard className="w-8 h-8 text-purple-600 mr-3" />
              <h2 className="text-2xl font-semibold">Ödeme Şartları</h2>
            </div>
            
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium mb-3">Fiyatlandırma</h3>
                <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                  <li>Temel fotoğraf işleme: Ücretsiz (günlük 3 fotoğraf limiti)</li>
                  <li>Premium işleme: 15 TL/fotoğraf</li>
                  <li>Toplu işleme paketi: 100 TL/10 fotoğraf</li>
                  <li>Kurumsal lisans: Özel fiyatlandırma</li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-lg font-medium mb-3">Ödeme Koşulları</h3>
                <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                  <li>Tüm ödemeler peşin olarak alınır</li>
                  <li>Kredi kartı, banka kartı ve havale kabul edilir</li>
                  <li>Fiyatlara %20 KDV dahildir</li>
                  <li>İade koşulları aşağıda belirtilmiştir</li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-lg font-medium mb-3">İade Politikası</h3>
                <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                  <li>Teknik hata durumunda tam iade</li>
                  <li>Kullanıcı hatası durumunda iade yok</li>
                  <li>İade talepleri 7 gün içinde yapılmalı</li>
                  <li>İade süreci 5-10 iş günü sürer</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Limitations */}
          <section className="bg-white rounded-lg p-8 shadow-sm mb-8">
            <div className="flex items-center mb-6">
              <AlertTriangle className="w-8 h-8 text-orange-600 mr-3" />
              <h2 className="text-2xl font-semibold">Sorumluluk Sınırları</h2>
            </div>
            
            <div className="space-y-4">
              <div className="p-4 bg-orange-50 rounded-lg">
                <h3 className="font-medium text-orange-900 mb-2">Hizmet Garantisi</h3>
                <p className="text-orange-800 text-sm">
                  Fotoğraflarınızın resmi kurumlar tarafından kabul edileceğini garanti etmiyoruz. 
                  Her kurumun kendine özgü değerlendirme kriterleri olabilir.
                </p>
              </div>
              
              <div className="p-4 bg-blue-50 rounded-lg">
                <h3 className="font-medium text-blue-900 mb-2">Teknik Sorumluluk</h3>
                <p className="text-blue-800 text-sm">
                  Sistem bakımı, güncelleme veya teknik arızalar nedeniyle hizmet kesintileri yaşanabilir. 
                  Bu durumlardan kaynaklanan zararlardan sorumlu değiliz.
                </p>
              </div>
              
              <div className="p-4 bg-purple-50 rounded-lg">
                <h3 className="font-medium text-purple-900 mb-2">Veri Kaybı</h3>
                <p className="text-purple-800 text-sm">
                  Fotoğraflarınızın yedeğini almanızı öneririz. Veri kaybı durumunda sorumluluğumuz 
                  ödediğiniz ücretle sınırlıdır.
                </p>
              </div>
            </div>
          </section>

          {/* Legal */}
          <section className="bg-white rounded-lg p-8 shadow-sm mb-8">
            <div className="flex items-center mb-6">
              <Scale className="w-8 h-8 text-gray-600 mr-3" />
              <h2 className="text-2xl font-semibold">Yasal Hükümler</h2>
            </div>
            
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-medium mb-3">Uygulanacak Hukuk</h3>
                <p className="text-muted-foreground">
                  Bu sözleşme Türkiye Cumhuriyeti kanunlarına tabidir. Uyuşmazlıklar İstanbul mahkemelerinde çözülür.
                </p>
              </div>
              
              <div>
                <h3 className="text-lg font-medium mb-3">Değişiklik Hakkı</h3>
                <p className="text-muted-foreground">
                  Bu şartları önceden haber vererek değiştirme hakkımız saklıdır. Değişiklikler web sitesinde 
                  yayınlandığı tarihte yürürlüğe girer.
                </p>
              </div>
              
              <div>
                <h3 className="text-lg font-medium mb-3">Sözleşmenin Sona Ermesi</h3>
                <p className="text-muted-foreground">
                  Bu şartları ihlal etmeniz durumunda hesabınızı askıya alabilir veya kapatabilir. 
                  Sözleşme sona erdikten sonra da bazı hükümler geçerliliğini korur.
                </p>
              </div>
            </div>
          </section>

          {/* Contact */}
          <section className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg p-8 text-white">
            <h2 className="text-2xl font-semibold mb-4">İletişim</h2>
            <p className="mb-4 opacity-90">
              Kullanım şartları hakkında sorularınız için bizimle iletişime geçin:
            </p>
            <div className="space-y-2">
              <p><strong>E-posta:</strong> hukuk@biyometrikfoto.com</p>
              <p><strong>Telefon:</strong> +90 (212) 555 0123</p>
              <p><strong>Adres:</strong> Teknoloji Geliştirme Bölgesi, Bilişim Vadisi, No: 42, 34906 Pendik / İstanbul</p>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}