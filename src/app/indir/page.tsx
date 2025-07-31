"use client";

import React, { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import Image from 'next/image';

// Ana içerik bileşeni
function IndirmeIcerik() {
  const [indirilenler, setIndirilenler] = useState<{
    id: string;
    ad: string;
    boyut: string;
    indirildi: boolean;
    url: string;
    format: string;
  }[]>([
    {
      id: 'biyometrik-pasaport',
      ad: 'Pasaport Biyometrik Fotoğraf',
      boyut: '1.2 MB',
      indirildi: false,
      url: '#', // Gerçek durumda bu bir URL olacak
      format: 'JPEG (35x45mm)'
    },
    {
      id: 'biyometrik-a4',
      ad: 'Biyometrik Fotoğraf A4 Baskı',
      boyut: '3.5 MB',
      indirildi: false,
      url: '#', // Gerçek durumda bu bir URL olacak
      format: 'PDF (A4)'
    },
    {
      id: 'dijital-kullanim',
      ad: 'Dijital Kullanım Dosyası',
      boyut: '820 KB',
      indirildi: false,
      url: '#', // Gerçek durumda bu bir URL olacak
      format: 'JPEG (Yüksek Çözünürlük)'
    },
  ]);
  
  const [indirmeTamamlandi, setIndirmeTamamlandi] = useState(false);
  
  useEffect(() => {
    // Tüm dosyalar indirildiğinde durumu güncelle
    const tumDosyalarIndirildi = indirilenler.every(dosya => dosya.indirildi);
    if (tumDosyalarIndirildi) {
      setIndirmeTamamlandi(true);
    }
  }, [indirilenler]);
  
  const dosyaIndir = (id: string) => {
    // Normalde burada gerçek bir indirme işlemi yapılacak
    // Şimdilik simülasyon yapıyoruz
    
    setIndirilenler(prev => 
      prev.map(dosya => 
        dosya.id === id ? { ...dosya, indirildi: true } : dosya
      )
    );
  };
  
  const tumDosyalariIndir = () => {
    // Tüm dosyaları tek tek indir
    indirilenler.forEach(dosya => {
      if (!dosya.indirildi) {
        setTimeout(() => {
          dosyaIndir(dosya.id);
        }, 800 * Math.random()); // Rastgele gecikme ile indirme simülasyonu
      }
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-blue-50 py-12">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-4xl mx-auto">
          {/* Başlık ve Durum */}
          <div className="text-center mb-10">
            <div className="inline-flex items-center justify-center mb-6">
              <div className="w-10 h-10 flex items-center justify-center rounded-full bg-blue-600 text-white font-semibold mr-2">1</div>
              <div className="w-16 h-1 bg-blue-600"></div>
              <div className="w-10 h-10 flex items-center justify-center rounded-full bg-blue-600 text-white font-semibold mr-2">2</div>
              <div className="w-16 h-1 bg-blue-600"></div>
              <div className="w-10 h-10 flex items-center justify-center rounded-full bg-blue-600 text-white font-semibold">3</div>
            </div>
            
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h1 className="text-3xl font-bold mb-4">Biyometrik Fotoğrafınız Hazır!</h1>
            <p className="text-gray-600 max-w-lg mx-auto">
              Fotoğrafınız başarıyla hazırlandı. Aşağıdaki dosyaları indirerek kullanmaya başlayabilirsiniz.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-5 gap-8 mb-10">
            {/* Fotoğraf Önizleme */}
            <div className="md:col-span-2">
              <div className="bg-white rounded-2xl shadow-soft overflow-hidden p-6">
                <h2 className="text-xl font-semibold mb-4">Fotoğraf Önizlemesi</h2>
                
                <div className="relative aspect-[3/4] w-full border-8 border-white shadow-lg rounded-lg overflow-hidden mb-4">
                  <div className="absolute inset-0 bg-gray-100 flex items-center justify-center">
                    {/* Gerçek uygulamada burada kullanıcının dönüştürülmüş biyometrik fotoğrafı gösterilecek */}
                    <svg className="w-20 h-20 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                </div>
                
                <div className="bg-blue-50 rounded-lg p-4">
                  <h3 className="font-medium text-blue-800 mb-2">Özellikler</h3>
                  <ul className="space-y-1 text-sm text-gray-700">
                    <li className="flex justify-between">
                      <span>Boyut:</span>
                      <span className="font-medium">35x45mm</span>
                    </li>
                    <li className="flex justify-between">
                      <span>Format:</span>
                      <span className="font-medium">JPEG, PDF</span>
                    </li>
                    <li className="flex justify-between">
                      <span>Arkaplan:</span>
                      <span className="font-medium">Beyaz</span>
                    </li>
                    <li className="flex justify-between">
                      <span>Standart:</span>
                      <span className="font-medium">ISO/IEC 19794-5</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            
            {/* İndirilebilir Dosyalar */}
            <div className="md:col-span-3">
              <div className="bg-white rounded-2xl shadow-soft overflow-hidden">
                <div className="flex justify-between items-center p-6 border-b border-gray-100">
                  <h2 className="text-xl font-semibold">İndirilebilir Dosyalar</h2>
                  
                  <button
                    onClick={tumDosyalariIndir}
                    disabled={indirmeTamamlandi}
                    className={`px-4 py-2 rounded-full text-sm font-medium flex items-center ${
                      indirmeTamamlandi 
                        ? 'bg-gray-200 text-gray-500 cursor-not-allowed' 
                        : 'bg-blue-600 text-white hover:bg-blue-700'
                    }`}
                  >
                    <svg className="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                    </svg>
                    Tümünü İndir
                  </button>
                </div>
                
                <div className="divide-y divide-gray-100">
                  {indirilenler.map((dosya) => (
                    <div key={dosya.id} className="p-5 hover:bg-gray-50 transition-colors">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <div className="w-10 h-10 flex-shrink-0 mr-4">
                            {dosya.id.includes('pdf') || dosya.format.includes('PDF') ? (
                              <svg className="w-10 h-10 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                              </svg>
                            ) : (
                              <svg className="w-10 h-10 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                              </svg>
                            )}
                          </div>
                          
                          <div>
                            <h3 className="font-medium">{dosya.ad}</h3>
                            <div className="flex text-xs text-gray-500 space-x-4">
                              <span>{dosya.format}</span>
                              <span>{dosya.boyut}</span>
                            </div>
                          </div>
                        </div>
                        
                        <button
                          onClick={() => dosyaIndir(dosya.id)}
                          disabled={dosya.indirildi}
                          className={`flex items-center px-3 py-2 rounded-lg font-medium text-sm ${
                            dosya.indirildi 
                              ? 'bg-green-50 text-green-600' 
                              : 'bg-blue-50 text-blue-600 hover:bg-blue-100'
                          }`}
                        >
                          {dosya.indirildi ? (
                            <>
                              <svg className="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                              </svg>
                              İndirildi
                            </>
                          ) : (
                            <>
                              <svg className="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                              </svg>
                              İndir
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="p-6 bg-blue-50">
                  <div className="flex items-start">
                    <svg className="w-5 h-5 text-blue-600 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <div>
                      <h3 className="font-medium text-blue-800 mb-1">İndirme Bilgileri</h3>
                      <p className="text-sm text-blue-700">
                        İndirdiğiniz dosyalar 72 saat boyunca erişilebilir olacaktır. Kaydetmeyi unutmayın.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Yapılacaklar ve Bilgiler */}
          <div className="bg-white rounded-2xl shadow-soft overflow-hidden p-6 mb-10">
            <h2 className="text-xl font-semibold mb-4">Sıradaki Adımlar</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="border border-gray-200 rounded-xl p-5">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
                  </svg>
                </div>
                <h3 className="font-medium mb-2">Baskı Alırken</h3>
                <p className="text-sm text-gray-600">
                  Fotoğrafları A4 boyutunda, gerçek boyutlarını koruyarak ve yüksek kalitede (300 dpi) yazdırın.
                </p>
              </div>
              
              <div className="border border-gray-200 rounded-xl p-5">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="font-medium mb-2">Dikkat Edilecekler</h3>
                <p className="text-sm text-gray-600">
                  Fotoğraf üzerinde herhangi bir düzenleme yapmayın ve orijinal ölçüleri koruyun.
                </p>
              </div>
              
              <div className="border border-gray-200 rounded-xl p-5">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="font-medium mb-2">Sorun Yaşarsanız</h3>
                <p className="text-sm text-gray-600">
                  Teknik destek için <a href="mailto:destek@biyometrikfotograf.com" className="text-blue-600 hover:underline">destek@biyometrikfotograf.com</a> adresine e-posta gönderin.
                </p>
              </div>
            </div>
          </div>
          
          {/* Butonlar */}
          <div className="flex flex-col md:flex-row items-center justify-center space-y-4 md:space-y-0 md:space-x-6">
            <Link 
              href="/" 
              className="px-6 py-3 bg-blue-600 text-white rounded-full font-medium hover:bg-blue-700 shadow-md flex items-center"
            >
              <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              Başka Fotoğraf Oluştur
            </Link>
            
            <Link 
              href="/" 
              className="px-6 py-3 border border-gray-300 text-gray-700 rounded-full font-medium hover:bg-gray-50"
            >
              Ana Sayfaya Dön
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

// Ana sayfa bileşeni
export default function IndirmeSayfasi() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-600"></div>
      </div>
    }>
      <IndirmeIcerik />
    </Suspense>
  );
}