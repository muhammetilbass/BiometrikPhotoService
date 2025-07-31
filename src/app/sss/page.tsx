"use client";

import { useState } from 'react';
import Link from 'next/link';

type SoruCevap = {
  id: string;
  soru: string;
  cevap: string;
  kategori: 'genel' | 'teknik' | 'odeme' | 'kullanim';
};

const sorular: SoruCevap[] = [
  {
    id: 'nasil-calisir',
    soru: 'Biyometrik fotoğraf oluşturma sistemi nasıl çalışır?',
    cevap: 'Sistemimiz yapay zeka kullanarak normal fotoğraflarınızı resmî kurumlarda kullanılabilecek biyometrik fotoğraflara dönüştürür. Yüz tanıma teknolojisiyle yüzünüz tespit edilir, arkaplan temizlenir ve seçtiğiniz belge tipi için gereken boyut, ışık ve pozisyon standartlarına göre düzenlenir.',
    kategori: 'genel'
  },
  {
    id: 'hangi-belgeler',
    soru: 'Hangi belgeler için biyometrik fotoğraf oluşturabilirim?',
    cevap: 'Pasaport, ehliyet, ÖSYM sınavları, vize başvuruları, ikametgâh, öğrenci belgesi ve iş başvuruları gibi birçok resmî belge için uygun biyometrik fotoğraf oluşturabilirsiniz.',
    kategori: 'genel'
  },
  {
    id: 'fotograf-kalite',
    soru: 'Kullanacağım fotoğrafın kalitesi nasıl olmalı?',
    cevap: 'İyi sonuçlar almak için iyi aydınlatılmış, net bir yüz görünümü olan, yüksek çözünürlüklü bir fotoğraf yüklemenizi öneririz. Doğrudan kameraya bakılmış ve yüzün tamamen göründüğü bir fotoğraf idealdir. Basit arkaplanlar daha iyi sonuçlar verir.',
    kategori: 'teknik'
  },
  {
    id: 'basortulu-gozluklu',
    soru: 'Başörtülü veya gözlüklü fotoğrafım uygun mu?',
    cevap: 'Evet, yüzünüz net bir şekilde görünebiliyorsa başörtülü fotoğraflar kullanılabilir. Gözlük kullanıyorsanız, gözleriniz gözlük camları üzerinde net görünmeli ve yansıma olmamalıdır. Bazı belge tipleri için gözlüksüz fotoğraf gerekebilir.',
    kategori: 'genel'
  },
  {
    id: 'resmi-kurum-kabul',
    soru: 'Oluşturduğunuz fotoğraflar resmi kurumlarda kabul ediliyor mu?',
    cevap: 'Evet, sistemimiz uluslararası standartlara (ICAO, ISO/IEC 19794-5) uygun fotoğraflar oluşturur. Bununla birlikte, bazı kurumlar kendi özel kurallarına sahip olabilir, bu nedenle ilgili kurumun güncel gereksinimlerini kontrol etmenizi öneririz.',
    kategori: 'genel'
  },
  {
    id: 'ne-kadar-surer',
    soru: 'Fotoğrafımın işlenmesi ne kadar sürer?',
    cevap: 'Fotoğrafınız genellikle birkaç saniye içinde işlenir ve hazır hale gelir. Yoğunluk durumuna göre bu süre değişebilir, ancak çoğu durumda 30 saniyeden kısa sürer.',
    kategori: 'teknik'
  },
  {
    id: 'arkaplan-degistirme',
    soru: 'Farklı renkte arkaplan seçebilir miyim?',
    cevap: 'Şu anda sistemimiz otomatik olarak standartlara uygun beyaz arkaplan oluşturmaktadır. Çoğu resmi belge için beyaz arkaplan gerektiğinden, bu şekilde en yüksek kabul oranını sağlıyoruz.',
    kategori: 'teknik'
  },
  {
    id: 'odeme-yontemleri',
    soru: 'Hangi ödeme yöntemlerini kabul ediyorsunuz?',
    cevap: 'Kredi kartı (Visa, Mastercard), banka kartı, Papara ve havale gibi birçok ödeme yöntemini kabul ediyoruz. Tüm ödemeler güvenli ödeme altyapımız üzerinden gerçekleştirilir.',
    kategori: 'odeme'
  },
  {
    id: 'iade-politikasi',
    soru: 'İade politikanız nedir?',
    cevap: 'Eğer oluşturulan fotoğraf teknik bir sorun nedeniyle standartlara uygun değilse veya sistemimizden kaynaklanan bir hata varsa tam iade sağlıyoruz. İade talebinizi destek@biyometrikfotograf.com adresine gönderebilirsiniz.',
    kategori: 'odeme'
  },
  {
    id: 'dosya-formati',
    soru: 'Fotoğrafımı hangi formatta alabilirim?',
    cevap: 'Fotoğrafınızı JPEG formatında yüksek çözünürlüklü olarak indirebilirsiniz. Ayrıca dijital kullanım için özel boyutlandırılmış versiyonlar ve A4 kağıda basılmaya hazır PDF formatında da sunuyoruz.',
    kategori: 'kullanim'
  },
  {
    id: 'veri-guvenligi',
    soru: 'Yüklediğim fotoğraflar güvende mi?',
    cevap: 'Evet, tüm fotoğraflarınız güvenli sunucularda işlenir ve saklanır. Fotoğraflarınız 72 saat sonra otomatik olarak silinir. Verileriniz üçüncü taraflarla paylaşılmaz ve sadece biyometrik fotoğraf oluşturma amacıyla kullanılır.',
    kategori: 'teknik'
  },
  {
    id: 'fotografi-duzenleyebilir-miyim',
    soru: 'Oluşturulan fotoğrafı düzenleyebilir miyim?',
    cevap: 'Şu anda sistemimiz tamamen otomatik çalışmaktadır ve oluşturulan fotoğrafları manuel olarak düzenleme seçeneği yoktur. En iyi sonuç için kaliteli ve standartlara uygun bir giriş fotoğrafı kullanmanızı öneririz.',
    kategori: 'kullanim'
  }
];

export default function SSS() {
  const [secilenKategori, setSecilenKategori] = useState<string>('tumu');
  const [acikSorular, setAcikSorular] = useState<string[]>([]);
  
  const kategoriler = [
    { id: 'tumu', baslik: 'Tümü' },
    { id: 'genel', baslik: 'Genel Sorular' },
    { id: 'teknik', baslik: 'Teknik Sorular' },
    { id: 'odeme', baslik: 'Ödeme ve İade' },
    { id: 'kullanim', baslik: 'Kullanım' },
  ];
  
  const toggleSoru = (id: string) => {
    if (acikSorular.includes(id)) {
      setAcikSorular(acikSorular.filter(soruId => soruId !== id));
    } else {
      setAcikSorular([...acikSorular, id]);
    }
  };
  
  const filtrelenenSorular = secilenKategori === 'tumu' 
    ? sorular 
    : sorular.filter(soru => soru.kategori === secilenKategori);

  return (
    <main className="flex min-h-screen flex-col items-center p-8 md:p-24">
      <div className="max-w-4xl w-full">
        <h1 className="text-3xl font-bold mb-6">Sıkça Sorulan Sorular</h1>
        
        <div className="bg-gray-50 p-4 rounded-lg mb-8">
          <p className="text-lg">
            Biyometrik fotoğraf oluşturma hakkında en çok sorulan soruları ve cevaplarını burada bulabilirsiniz.
            Daha fazla yardıma ihtiyacınız olursa, <Link href="/iletisim" className="text-blue-600 hover:underline">bizimle iletişime geçebilirsiniz</Link>.
          </p>
        </div>
        
        <div className="mb-8 border-b pb-4">
          <div className="flex flex-wrap gap-2">
            {kategoriler.map(kategori => (
              <button
                key={kategori.id}
                onClick={() => setSecilenKategori(kategori.id)}
                className={`px-4 py-2 rounded-lg text-sm font-medium ${
                  secilenKategori === kategori.id
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {kategori.baslik}
              </button>
            ))}
          </div>
        </div>
        
        <div className="space-y-4">
          {filtrelenenSorular.map((soru) => (
            <div 
              key={soru.id} 
              className="border rounded-lg overflow-hidden"
            >
              <button
                onClick={() => toggleSoru(soru.id)}
                className="w-full text-left px-6 py-4 flex items-center justify-between focus:outline-none"
              >
                <h3 className="text-xl font-medium">{soru.soru}</h3>
                <svg
                  className={`w-5 h-5 transition-transform ${acikSorular.includes(soru.id) ? 'transform rotate-180' : ''}`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              
              {acikSorular.includes(soru.id) && (
                <div className="px-6 py-4 bg-gray-50 border-t">
                  <p className="text-lg">{soru.cevap}</p>
                </div>
              )}
            </div>
          ))}
        </div>
        
        <div className="mt-12 text-center space-y-6">
          <h2 className="text-2xl font-semibold">Başka sorunuz mu var?</h2>
          <p className="text-lg">
            Aradığınız cevabı bulamadıysanız, müşteri hizmetlerimiz size yardımcı olmaktan memnuniyet duyacaktır.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              href="/iletisim"
              className="px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 inline-block"
            >
              Bize Ulaşın
            </Link>
            <Link
              href="/"
              className="px-6 py-3 border border-blue-600 text-blue-600 rounded-lg font-medium hover:bg-blue-50 inline-block"
            >
              Belge Türlerini Görüntüle
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}