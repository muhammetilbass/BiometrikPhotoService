import { Mail, Phone, MapPin, Clock, Send, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function IletisimPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="container mx-auto px-4 py-16">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            İletişim
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Sorularınız için bizimle iletişime geçin. Size yardımcı olmaktan mutluluk duyarız.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="bg-white rounded-lg p-8 shadow-sm">
            <h2 className="text-2xl font-semibold mb-6 flex items-center">
              <MessageCircle className="w-6 h-6 mr-3 text-blue-600" />
              Bize Yazın
            </h2>
            
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Ad Soyad *
                  </label>
                  <input
                    type="text"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                    placeholder="Adınız ve soyadınız"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    E-posta *
                  </label>
                  <input
                    type="email"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                    placeholder="ornek@email.com"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Telefon
                </label>
                <input
                  type="tel"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                  placeholder="+90 (5xx) xxx xx xx"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Konu *
                </label>
                <select 
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                >
                  <option value="">Konu seçiniz</option>
                  <option value="teknik-destek">Teknik Destek</option>
                  <option value="fatura-odeme">Fatura & Ödeme</option>
                  <option value="urun-bilgi">Ürün Bilgisi</option>
                  <option value="sikayet">Şikayet</option>
                  <option value="oneri">Öneri</option>
                  <option value="diger">Diğer</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Mesajınız *
                </label>
                <textarea
                  required
                  rows={5}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors resize-none"
                  placeholder="Mesajınızı buraya yazın..."
                ></textarea>
              </div>
              
              <Button className="w-full py-3 text-lg">
                <Send className="w-5 h-5 mr-2" />
                Mesaj Gönder
              </Button>
            </form>
          </div>

          {/* Contact Info */}
          <div className="space-y-8">
            {/* Contact Details */}
            <div className="bg-white rounded-lg p-8 shadow-sm">
              <h2 className="text-2xl font-semibold mb-6">İletişim Bilgileri</h2>
              
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Mail className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">E-posta</h3>
                    <p className="text-muted-foreground">destek@biyometrikfoto.com</p>
                    <p className="text-muted-foreground">info@biyometrikfoto.com</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Phone className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Telefon</h3>
                    <p className="text-muted-foreground">+90 (212) 555 0123</p>
                    <p className="text-muted-foreground">+90 (532) 555 0123</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-6 h-6 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Adres</h3>
                    <p className="text-muted-foreground">
                      Teknoloji Geliştirme Bölgesi<br />
                      Bilişim Vadisi, No: 42<br />
                      34906 Pendik / İstanbul
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Clock className="w-6 h-6 text-orange-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Çalışma Saatleri</h3>
                    <p className="text-muted-foreground">Pazartesi - Cuma: 09:00 - 18:00</p>
                    <p className="text-muted-foreground">Cumartesi: 10:00 - 16:00</p>
                    <p className="text-muted-foreground">Pazar: Kapalı</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Support */}
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg p-8 text-white">
              <h3 className="text-xl font-semibold mb-4">Hızlı Destek</h3>
              <p className="mb-6 opacity-90">
                Acil durumlar için 7/24 canlı destek hattımızdan bize ulaşabilirsiniz.
              </p>
              <Button variant="secondary" className="w-full">
                <MessageCircle className="w-5 h-5 mr-2" />
                Canlı Destek
              </Button>
            </div>

            {/* FAQ Link */}
            <div className="bg-white rounded-lg p-6 shadow-sm text-center">
              <h3 className="text-lg font-semibold mb-2">Sık Sorulan Sorular</h3>
              <p className="text-muted-foreground mb-4">
                Aradığınız cevap SSS bölümünde olabilir.
              </p>
              <Button variant="outline" asChild>
                <a href="/sss">SSS'yi İncele</a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}