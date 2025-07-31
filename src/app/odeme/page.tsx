"use client";

import React, { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';

// Asıl ödeme formunu içeren bileşen
function OdemeFormu() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const belgetipi = searchParams.get('belgetipi');
  
  const [adSoyad, setAdSoyad] = useState('');
  const [email, setEmail] = useState('');
  const [kartNumarasi, setKartNumarasi] = useState('');
  const [sonKullanmaTarihi, setSonKullanmaTarihi] = useState('');
  const [cvv, setCvv] = useState('');
  const [islemDurumu, setIslemDurumu] = useState<'hazir' | 'isleniyor' | 'tamamlandi' | 'hata'>('hazir');

  // Form doğrulama
  const [formHatalari, setFormHatalari] = useState<{
    adSoyad?: string;
    email?: string;
    kartNumarasi?: string;
    sonKullanmaTarihi?: string;
    cvv?: string;
  }>({});

  // Kart numarası formatlama
  const formatKartNumarasi = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || '';
    const parts = [];
    
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    
    if (parts.length) {
      return parts.join(' ');
    } else {
      return value;
    }
  };

  // Son kullanma tarihi formatlama
  const formatSonKullanmaTarihi = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    if (v.length >= 2) {
      return v.slice(0, 2) + (v.length > 2 ? '/' + v.slice(2, 4) : '');
    }
    return v;
  };

  // Form doğrulama
  const formDogrula = () => {
    const hatalar: {
      adSoyad?: string;
      email?: string;
      kartNumarasi?: string;
      sonKullanmaTarihi?: string;
      cvv?: string;
    } = {};

    if (!adSoyad.trim()) hatalar.adSoyad = "Ad Soyad alanı gereklidir";
    
    if (!email.trim()) {
      hatalar.email = "E-posta alanı gereklidir";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      hatalar.email = "Geçerli bir e-posta adresi giriniz";
    }
    
    if (!kartNumarasi.trim()) {
      hatalar.kartNumarasi = "Kart numarası gereklidir";
    } else if (kartNumarasi.replace(/\s/g, '').length !== 16) {
      hatalar.kartNumarasi = "Kart numarası 16 haneli olmalıdır";
    }
    
    if (!sonKullanmaTarihi) {
      hatalar.sonKullanmaTarihi = "Son kullanma tarihi gereklidir";
    } else {
      const [ay, yil] = sonKullanmaTarihi.split('/');
      const simdikiYil = new Date().getFullYear() % 100;
      const simdikiAy = new Date().getMonth() + 1;
      
      if (!ay || !yil || Number(ay) > 12 || Number(ay) < 1) {
        hatalar.sonKullanmaTarihi = "Geçerli bir ay giriniz (01-12)";
      } else if (Number(yil) < simdikiYil || (Number(yil) === simdikiYil && Number(ay) < simdikiAy)) {
        hatalar.sonKullanmaTarihi = "Kartınızın süresi dolmuş";
      }
    }
    
    if (!cvv.trim()) {
      hatalar.cvv = "CVV/CVC gereklidir";
    } else if (cvv.length < 3 || cvv.length > 4) {
      hatalar.cvv = "CVV/CVC 3 veya 4 haneli olmalıdır";
    }

    setFormHatalari(hatalar);
    return Object.keys(hatalar).length === 0;
  };

  const handleOdeme = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formDogrula()) {
      return;
    }
    
    setIslemDurumu('isleniyor');
    
    try {
      // Burada gerçek ödeme işlemi API çağrısı yapılacak
      // Şimdilik simülasyon yapıyoruz
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Başarılı işlem simülasyonu
      setIslemDurumu('tamamlandi');
      
      // 3 saniye sonra indirme sayfasına yönlendir
      setTimeout(() => {
        router.push('/indir');
      }, 3000);
      
    } catch (error) {
      console.error('Ödeme işlemi hatası:', error);
      setIslemDurumu('hata');
    }
  };

  useEffect(() => {
    if (!belgetipi) {
      router.push('/');
    }
  }, [belgetipi, router]);
  
  if (!belgetipi) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-blue-50 py-12">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center mb-4">
              <div className="w-10 h-10 flex items-center justify-center rounded-full bg-blue-600 text-white font-semibold mr-2">1</div>
              <div className="w-20 h-1 bg-blue-600"></div>
              <div className="w-10 h-10 flex items-center justify-center rounded-full bg-blue-600 text-white font-semibold mr-2">2</div>
              <div className="w-20 h-1 bg-blue-600"></div>
              <div className="w-10 h-10 flex items-center justify-center rounded-full bg-blue-600 text-white font-semibold">3</div>
            </div>
            <h1 className="text-3xl font-bold">Ödeme İşlemi</h1>
            <p className="text-gray-600 mt-2">
              Biyometrik fotoğraf paketinizi satın almak için ödeme yapın
            </p>
          </div>
          
          {islemDurumu === 'tamamlandi' ? (
            <div className="bg-white rounded-2xl shadow-soft p-8 text-center">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-green-800 mb-4">Ödeme Başarılı!</h2>
              <p className="text-gray-700 mb-8 max-w-md mx-auto">
                Biyometrik fotoğrafınız hazırlanıyor. Birkaç saniye içinde indirme sayfasına yönlendirileceksiniz.
              </p>
              <div className="flex items-center justify-center space-x-2 text-green-600">
                <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <span>Yönlendiriliyor...</span>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="md:col-span-2">
                <div className="bg-white rounded-2xl shadow-soft overflow-hidden">
                  {islemDurumu === 'hata' && (
                    <div className="bg-red-50 px-6 py-4 border-b border-red-100">
                      <div className="flex items-center">
                        <svg className="h-5 w-5 text-red-500 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                        </svg>
                        <div>
                          <p className="font-medium text-red-800">Ödeme işlemi sırasında bir hata oluştu!</p>
                          <p className="text-sm text-red-700">Lütfen bilgilerinizi kontrol edip tekrar deneyin.</p>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  <div className="p-8">
                    <h2 className="text-xl font-semibold mb-6">Ödeme Bilgileri</h2>
                    
                    <form onSubmit={handleOdeme} className="space-y-6">
                      <div className="space-y-4">
                        <div>
                          <label htmlFor="adSoyad" className="block text-sm font-medium text-gray-700 mb-1">
                            Ad Soyad
                          </label>
                          <input
                            type="text"
                            id="adSoyad"
                            value={adSoyad}
                            onChange={(e) => setAdSoyad(e.target.value)}
                            className={`w-full p-3 border rounded-lg ${formHatalari.adSoyad ? 'border-red-500 bg-red-50' : 'border-gray-300'}`}
                            placeholder="Adınız Soyadınız"
                          />
                          {formHatalari.adSoyad && (
                            <p className="mt-1 text-sm text-red-600">{formHatalari.adSoyad}</p>
                          )}
                        </div>
                        
                        <div>
                          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                            E-posta Adresi
                          </label>
                          <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className={`w-full p-3 border rounded-lg ${formHatalari.email ? 'border-red-500 bg-red-50' : 'border-gray-300'}`}
                            placeholder="ornek@email.com"
                          />
                          {formHatalari.email && (
                            <p className="mt-1 text-sm text-red-600">{formHatalari.email}</p>
                          )}
                          <p className="mt-1 text-sm text-gray-500">
                            Fotoğrafınız ve faturanız bu e-posta adresine gönderilecektir
                          </p>
                        </div>
                      </div>
                      
                      <div className="border-t border-gray-200 pt-6">
                        <h3 className="text-lg font-medium mb-4">Kart Bilgileri</h3>
                        
                        <div className="mb-4">
                          <label htmlFor="kartNumarasi" className="block text-sm font-medium text-gray-700 mb-1">
                            Kart Numarası
                          </label>
                          <div className="relative">
                            <input
                              type="text"
                              id="kartNumarasi"
                              value={kartNumarasi}
                              onChange={(e) => setKartNumarasi(formatKartNumarasi(e.target.value))}
                              className={`w-full p-3 pl-10 border rounded-lg ${formHatalari.kartNumarasi ? 'border-red-500 bg-red-50' : 'border-gray-300'}`}
                              placeholder="0000 0000 0000 0000"
                              maxLength={19}
                            />
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                              <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                              </svg>
                            </div>
                          </div>
                          {formHatalari.kartNumarasi && (
                            <p className="mt-1 text-sm text-red-600">{formHatalari.kartNumarasi}</p>
                          )}
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label htmlFor="sonKullanmaTarihi" className="block text-sm font-medium text-gray-700 mb-1">
                              Son Kullanma Tarihi
                            </label>
                            <input
                              type="text"
                              id="sonKullanmaTarihi"
                              value={sonKullanmaTarihi}
                              onChange={(e) => setSonKullanmaTarihi(formatSonKullanmaTarihi(e.target.value))}
                              className={`w-full p-3 border rounded-lg ${formHatalari.sonKullanmaTarihi ? 'border-red-500 bg-red-50' : 'border-gray-300'}`}
                              placeholder="AA/YY"
                              maxLength={5}
                            />
                            {formHatalari.sonKullanmaTarihi && (
                              <p className="mt-1 text-sm text-red-600">{formHatalari.sonKullanmaTarihi}</p>
                            )}
                          </div>
                          
                          <div>
                            <label htmlFor="cvv" className="block text-sm font-medium text-gray-700 mb-1">
                              CVV/CVC
                            </label>
                            <div className="relative">
                              <input
                                type="text"
                                id="cvv"
                                value={cvv}
                                onChange={(e) => setCvv(e.target.value.replace(/\D/g, '').slice(0, 4))}
                                className={`w-full p-3 pr-10 border rounded-lg ${formHatalari.cvv ? 'border-red-500 bg-red-50' : 'border-gray-300'}`}
                                placeholder="000"
                                maxLength={4}
                              />
                              <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                                <button 
                                  type="button"
                                  className="text-gray-400 hover:text-gray-500 focus:outline-none"
                                  title="CVV/CVC kodu, kartınızın arkasındaki 3 veya 4 haneli güvenlik kodudur"
                                >
                                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                  </svg>
                                </button>
                              </div>
                            </div>
                            {formHatalari.cvv && (
                              <p className="mt-1 text-sm text-red-600">{formHatalari.cvv}</p>
                            )}
                          </div>
                        </div>
                      </div>
                      
                      <div className="pt-4">
                        <button
                          type="submit"
                          disabled={islemDurumu === 'isleniyor'}
                          className={`w-full py-4 rounded-full font-medium text-white text-lg shadow-md transition-colors ${
                            islemDurumu === 'isleniyor' ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
                          }`}
                        >
                          {islemDurumu === 'isleniyor' ? (
                            <span className="flex items-center justify-center">
                              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                              </svg>
                              İşleniyor...
                            </span>
                          ) : (
                            `Ödeme Yap (25,00₺)`
                          )}
                        </button>
                        
                        <p className="text-sm text-gray-500 text-center mt-4">
                          Ödeme yaparak <Link href="/kosullar" className="text-blue-600 hover:underline">Kullanım Koşullarını</Link> kabul etmiş olursunuz.
                        </p>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
              
              <div className="md:col-span-1">
                <div className="bg-white rounded-2xl shadow-soft overflow-hidden">
                  <div className="p-6 bg-blue-50 border-b border-blue-100">
                    <h3 className="font-semibold mb-1">Sipariş Özeti</h3>
                    <p className="text-sm text-gray-600">Biyometrik Fotoğraf Paketi</p>
                  </div>
                  
                  <div className="p-6">
                    <div className="space-y-4">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Fotoğraf Paketi</span>
                        <span className="font-medium">20,00₺</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">KDV (%18)</span>
                        <span className="font-medium">5,00₺</span>
                      </div>
                      <div className="border-t border-gray-200 pt-4 mt-4">
                        <div className="flex justify-between items-center">
                          <span className="font-semibold">Toplam</span>
                          <span className="text-lg font-bold text-blue-600">25,00₺</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-6 pt-6 border-t border-gray-200">
                      <h4 className="font-medium mb-3">Paket İçeriği:</h4>
                      <ul className="space-y-2">
                        <li className="flex items-start">
                          <svg className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          <span className="text-sm text-gray-600">Biyometrik standartlara uygun dijital fotoğraf</span>
                        </li>
                        <li className="flex items-start">
                          <svg className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          <span className="text-sm text-gray-600">A4 baskıya uygun PDF formatı</span>
                        </li>
                        <li className="flex items-start">
                          <svg className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          <span className="text-sm text-gray-600">Anında e-posta ile teslim</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                  
                  <div className="p-6 bg-gray-50 border-t border-gray-200">
                    <div className="flex items-center mb-2">
                      <svg className="h-5 w-5 text-blue-600 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                      </svg>
                      <span className="font-medium">Güvenli Ödeme</span>
                    </div>
                    <p className="text-xs text-gray-600">
                      Tüm ödemeler güvenli bağlantı üzerinden gerçekleştirilir. Kart bilgileriniz kesinlikle saklanmaz.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          <div className="mt-8 flex justify-center">
            <Link href="/olustur" className="text-blue-600 hover:text-blue-700 font-medium flex items-center">
              <svg className="w-5 h-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Fotoğraf Oluşturmaya Geri Dön
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

// Ana sayfa bileşeni
export default function OdemeSayfasi() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-600"></div>
      </div>
    }>
      <OdemeFormu />
    </Suspense>
  );
} 