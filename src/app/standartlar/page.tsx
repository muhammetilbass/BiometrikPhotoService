"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Camera } from 'lucide-react';
import PhotoCreationModal from '@/components/PhotoCreationModal';

export default function FotografStandartlari() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <main className="flex min-h-screen flex-col items-center p-8 md:p-24">
      <div className="max-w-4xl w-full">
        <h1 className="text-3xl font-bold mb-6">Biyometrik Fotoğraf Standartları</h1>
        
        <p className="text-lg mb-8">
          Biyometrik fotoğraflar için ülkeler ve kurumlar belirli standartlar belirlemiştir.
          Aşağıda en yaygın biyometrik fotoğraf standartlarını bulabilirsiniz.
        </p>
        
        <div className="space-y-12">
          <section>
            <h2 className="text-2xl font-semibold mb-4">Pasaport Fotoğrafı Standartları</h2>
            <div className="bg-white border rounded-lg p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-xl font-medium mb-3">Genel Özellikler</h3>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Boyut: 35x45 mm (genişlik x yükseklik)</li>
                    <li>Baş yüksekliği: 28-35 mm (çeneden saç tepesine)</li>
                    <li>Arka plan: Beyaz veya açık gri, düz renk</li>
                    <li>Renkli fotoğraf</li>
                    <li>Yüksek çözünürlük, net görüntü</li>
                    <li>Son 6 ay içinde çekilmiş</li>
                    <li>Biometrik tanıma için yüz özellikleri net olmalı</li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="text-xl font-medium mb-3">Yüz Pozisyonu</h3>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Yüz doğrudan kameraya bakmalı</li>
                    <li>Hafif gülümseme veya nötr ifade</li>
                    <li>Her iki kulak görünmeli</li>
                    <li>Gözler açık ve net görünmeli</li>
                    <li>Gözlük kullanıyorsanız gözleriniz net görünmeli</li>
                    <li>Başörtüsü dini gerekçelerle kabul edilir, ancak yüz açıkta olmalı</li>
                    <li>Şapka, bere vb. aksesuarlar kabul edilmez</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>
          
          <section>
            <h2 className="text-2xl font-semibold mb-4">Ehliyet Fotoğrafı Standartları</h2>
            <div className="bg-white border rounded-lg p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-xl font-medium mb-3">Genel Özellikler</h3>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Boyut: 50x60 mm (genişlik x yükseklik)</li>
                    <li>Baş yüksekliği: 30-36 mm</li>
                    <li>Arka plan: Beyaz, düz renk</li>
                    <li>Renkli fotoğraf</li>
                    <li>Net ve yüksek kalite</li>
                    <li>Son 6 ay içinde çekilmiş</li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="text-xl font-medium mb-3">Yüz Pozisyonu</h3>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Doğrudan kameraya bakılmalı</li>
                    <li>Nötr ifade, hafif gülümseme kabul edilebilir</li>
                    <li>Şapka, kep gibi aksesuarlar kabul edilmez</li>
                    <li>Gözlük kullanımında gözler net görünmeli</li>
                    <li>Işık yansıması veya gözlük çerçevesi tarafından kapatma olmamalı</li>
                    <li>Farklı renkte lensler kullanılmamalı</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>
          
          <section>
            <h2 className="text-2xl font-semibold mb-4">Uluslararası Vize Başvuruları</h2>
            <div className="bg-white border rounded-lg p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-xl font-medium mb-3">Schengen Vizesi</h3>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Boyut: 35x45 mm</li>
                    <li>Arka plan: Beyaz veya açık renk</li>
                    <li>Son 6 ay içinde çekilmiş</li>
                    <li>Baş boyutu: Fotoğrafın %70-80'ini kapsamalı</li>
                    <li>Dijital manipülasyon olmadan</li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="text-xl font-medium mb-3">Amerika Birleşik Devletleri</h3>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Boyut: 2x2 inç (51x51 mm)</li>
                    <li>Baş boyutu: 1 inç ile 1 3/8 inç (25-35 mm)</li>
                    <li>Yüz kameraya dönük, gözler açık</li>
                    <li>Beyaz veya açık renkli arka plan</li>
                    <li>Normal günlük kıyafet</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>
          
          <section>
            <h2 className="text-2xl font-semibold mb-4">İş Başvuruları İçin Fotoğraf Standartları</h2>
            <div className="bg-white border rounded-lg p-6">
              <p className="mb-4">
                İş başvuruları için genellikle kesin bir standart yoktur, ancak profesyonel görünüm için aşağıdaki özellikler tavsiye edilir:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Profesyonel kıyafet (iş görüşmesine giderken giyeceğiniz türden)</li>
                <li>Nötr, düz renk arka plan</li>
                <li>Doğrudan kameraya bakış</li>
                <li>Profesyonel, dostça bir ifade veya hafif gülümseme</li>
                <li>Güncel bir fotoğraf (son 6-12 ay içinde çekilmiş)</li>
                <li>Yüksek çözünürlüklü, net görüntü</li>
              </ul>
            </div>
          </section>
        </div>
        
        <div className="mt-10 text-center">
          <Button 
            onClick={() => setIsModalOpen(true)}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700"
            size="lg"
          >
            <Camera className="mr-2 h-4 w-4" />
            Biyometrik Fotoğraf Oluştur
          </Button>
        </div>
      </div>
      
      {/* Photo Creation Modal */}
      <PhotoCreationModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
    </main>
  );
}