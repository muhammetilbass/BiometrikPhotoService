import Link from 'next/link';
import { Building2, Users, Award, Target, Heart, Globe } from 'lucide-react';

export default function SirketimizPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="container mx-auto px-4 py-16">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Şirketimiz
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Yeni Kurulmuş olan şirketimiz, 
            Yapay zeka destekli çözümüyle birlikte kullanıcıların biyometrik fotoğraflarını hızlı ve zahmetsiz bir şekilde sağlamak amacıyla hizmet sunmaktadır.
          </p>
        </div>

        {/* Company Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          <div className="text-center p-6 bg-white rounded-lg shadow-sm">
            <div className="text-3xl font-bold text-blue-600 mb-2">500K+</div>
            <p className="text-muted-foreground">Mutlu Müşteri</p>
          </div>
          <div className="text-center p-6 bg-white rounded-lg shadow-sm">
            <div className="text-3xl font-bold text-green-600 mb-2">150+</div>
            <p className="text-muted-foreground">Ülke Standardı</p>
          </div>
          <div className="text-center p-6 bg-white rounded-lg shadow-sm">
            <div className="text-3xl font-bold text-purple-600 mb-2">99.9%</div>
            <p className="text-muted-foreground">Başarı Oranı</p>
          </div>
          <div className="text-center p-6 bg-white rounded-lg shadow-sm">
            <div className="text-3xl font-bold text-orange-600 mb-2">4+</div>
            <p className="text-muted-foreground">Yıl Deneyim</p>
          </div>
        </div>

        {/* Mission & Vision */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <div className="bg-white rounded-lg p-8 shadow-sm">
            <div className="flex items-center mb-4">
              <Target className="w-8 h-8 text-blue-600 mr-3" />
              <h2 className="text-2xl font-semibold">Misyonumuz</h2>
            </div>
            <p className="text-muted-foreground leading-relaxed">
              Biyometrik fotoğraf ihtiyaçlarını karşılamak için en gelişmiş yapay zeka teknolojilerini 
              kullanarak, kullanıcı dostu ve güvenilir çözümler sunmak. Her türlü resmi belge için 
              uluslararası standartlara uygun fotoğraflar üretmek.
            </p>
          </div>
          
          <div className="bg-white rounded-lg p-8 shadow-sm">
            <div className="flex items-center mb-4">
              <Globe className="w-8 h-8 text-purple-600 mr-3" />
              <h2 className="text-2xl font-semibold">Vizyonumuz</h2>
            </div>
            <p className="text-muted-foreground leading-relaxed">
              Dünya çapında biyometrik fotoğraf teknolojisinde lider olmak ve dijital kimlik 
              çözümlerinde yenilikçi yaklaşımlarla sektöre öncülük etmek. Gelecekte tüm resmi 
              işlemlerin dijital ortamda güvenle yapılabilmesine katkı sağlamak.
            </p>
          </div>
        </div>

        {/* Values */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12">Değerlerimiz</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Kalite</h3>
              <p className="text-muted-foreground">
                Her fotoğrafta mükemmellik arayışı ve uluslararası standartlara uygunluk
              </p>
            </div>
            
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Güven</h3>
              <p className="text-muted-foreground">
                Kişisel verilerinizin güvenliği ve gizliliği bizim için öncelik
              </p>
            </div>
            
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Müşteri Odaklılık</h3>
              <p className="text-muted-foreground">
                Kullanıcı deneyimini sürekli iyileştirme ve 7/24 destek sağlama
              </p>
            </div>
          </div>
        </div>

        {/* Team */}
        <div className="bg-white rounded-lg p-8 shadow-sm mb-16">
          <div className="flex items-center mb-6">
            <Building2 className="w-8 h-8 text-blue-600 mr-3" />
            <h2 className="text-2xl font-semibold">Ekibimiz</h2>
          </div>
          <p className="text-muted-foreground leading-relaxed mb-6">
            Deneyimli yazılım geliştiricileri, yapay zeka uzmanları ve müşteri hizmetleri 
            temsilcilerinden oluşan profesyonel ekibimiz, size en iyi hizmeti sunmak için 
            sürekli çalışmaktadır.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600 mb-2">15+</div>
              <p className="text-muted-foreground">Yazılım Geliştirici</p>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600 mb-2">8+</div>
              <p className="text-muted-foreground">AI Uzmanı</p>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600 mb-2">12+</div>
              <p className="text-muted-foreground">Destek Uzmanı</p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <Link 
            href="/" 
            className="px-8 py-4 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 inline-block transition-colors"
          >
            Belge Türlerini Görüntüle
          </Link>
        </div>
      </div>
    </main>
  );
}