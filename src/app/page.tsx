"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Camera, Zap, Download, Shield, Clock, CheckCircle } from 'lucide-react';
import SupportedDocumentTypes from '@/components/SupportedDocumentTypes';
import PhotoCreationModal from '@/components/PhotoCreationModal';

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <main className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative py-20 md:py-32 overflow-hidden bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-2000"></div>
          <div className="absolute top-40 left-1/2 w-60 h-60 bg-indigo-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-4000"></div>
        </div>
        
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="flex flex-col items-center text-center space-y-8">
            <div className="space-y-4">
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-blue-100 text-blue-800 text-sm font-medium mb-4">
                <Zap className="w-4 h-4 mr-2" />
                AI Destekli Teknoloji
              </div>
              <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
                Profesyonel Biyometrik
                <span className="text-primary block bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Fotoğraf Oluşturun
                </span>
              </h1>
              <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl">
                AI teknolojisi ile saniyeler içinde pasaport, vize ve kimlik belgeleriniz için
                uygun fotoğraflar oluşturun. Tüm uluslararası standartlara uygun.
              </p>
            </div>
            
            <div className="flex justify-center">
              <Button 
                size="lg" 
                onClick={() => setIsModalOpen(true)}
                className="text-lg px-8 py-6 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-200"
              >
                <Camera className="mr-2 h-5 w-5" />
                Fotoğraf Oluştur
              </Button>
            </div>
            
            <div className="flex flex-wrap justify-center items-center gap-6 text-sm text-muted-foreground">
              <div className="flex items-center bg-white/50 backdrop-blur-sm px-4 py-2 rounded-full">
                <Zap className="mr-2 h-4 w-4 text-yellow-500" />
                Anında İşlem
              </div>
              <div className="flex items-center bg-white/50 backdrop-blur-sm px-4 py-2 rounded-full">
                <Shield className="mr-2 h-4 w-4 text-green-500" />
                %100 Güvenli
              </div>
              <div className="flex items-center bg-white/50 backdrop-blur-sm px-4 py-2 rounded-full">
                <CheckCircle className="mr-2 h-4 w-4 text-blue-500" />
                Garantili Uyumluluk
              </div>
            </div>
            
            {/* Demo Preview */}
            <div className="mt-12 relative">
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-2xl border border-white/20">
                <div className="flex items-center justify-center space-x-8">
                  <div className="text-center">
                    <div className="w-24 h-32 bg-gradient-to-br from-gray-200 to-gray-300 rounded-lg mb-3 flex items-center justify-center">
                      <Camera className="w-8 h-8 text-gray-500" />
                    </div>
                    <p className="text-sm text-gray-600">Fotoğrafınız</p>
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-2">
                      <Zap className="w-6 h-6 text-blue-600 animate-pulse" />
                    </div>
                    <p className="text-xs text-gray-500">AI İşleme</p>
                  </div>
                  <div className="text-center">
                    <div className="w-24 h-32 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg mb-3 flex items-center justify-center">
                      <CheckCircle className="w-8 h-8 text-white" />
                    </div>
                    <p className="text-sm text-gray-600">Resmi Fotoğraf</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Neden <span className="text-primary">BiyometrikFoto</span>?
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Gelişmiş AI teknolojisi ile hızlı, güvenli ve standartlara uygun fotoğraf çözümü
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="text-center">
              <CardHeader>
                <div className="mx-auto w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <Clock className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Hızlı İşlem</CardTitle>
                <CardDescription>
                  Sadece 30 saniyede profesyonel kalitede biyometrik fotoğraf
                </CardDescription>
              </CardHeader>
            </Card>
            
            <Card className="text-center">
              <CardHeader>
                <div className="mx-auto w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <Shield className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Güvenli & Gizli</CardTitle>
                <CardDescription>
                  Fotoğraflarınız güvenli şekilde işlenir ve saklanmaz
                </CardDescription>
              </CardHeader>
            </Card>
            
            <Card className="text-center">
              <CardHeader>
                <div className="mx-auto w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <CheckCircle className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Garantili Kabul</CardTitle>
                <CardDescription>
                  Uluslararası standartlara uygun, resmi kurumlar tarafından kabul edilir
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Advantages Section */}
       <section className="py-16 md:py-24 bg-muted/50">
         <div className="container mx-auto px-4 md:px-6">
           <div className="text-center mb-12">
             <h2 className="text-3xl md:text-4xl font-bold mb-4">
               Avantajlarımız
             </h2>
             <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
               Gelişmiş AI teknolojisi ile size sunduğumuz benzersiz özellikler
             </p>
           </div>
           
           <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
             <Card>
               <CardContent className="p-6">
                 <div className="flex items-start space-x-4">
                   <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                     <Zap className="h-6 w-6 text-primary" />
                   </div>
                   <div>
                     <h3 className="font-semibold mb-2">AI Destekli Teknoloji</h3>
                     <p className="text-muted-foreground text-sm">
                       Gelişmiş yapay zeka algoritmaları ile otomatik arka plan kaldırma, yüz hizalama ve boyut ayarlama
                     </p>
                   </div>
                 </div>
               </CardContent>
             </Card>
             
             <Card>
               <CardContent className="p-6">
                 <div className="flex items-start space-x-4">
                   <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                     <Shield className="h-6 w-6 text-primary" />
                   </div>
                   <div>
                     <h3 className="font-semibold mb-2">Standart Uyumluluk</h3>
                     <p className="text-muted-foreground text-sm">
                       ICAO, ISO/IEC 19794-5 ve yerel standartlara tam uyumluluk
                     </p>
                   </div>
                 </div>
               </CardContent>
             </Card>
             
             <Card>
               <CardContent className="p-6">
                 <div className="flex items-start space-x-4">
                   <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                     <Download className="h-6 w-6 text-primary" />
                   </div>
                   <div>
                     <h3 className="font-semibold mb-2">Anında İndirme</h3>
                     <p className="text-muted-foreground text-sm">
                       İşlem tamamlandıktan sonra yüksek çözünürlüklü fotoğrafınızı anında indirin
                     </p>
                   </div>
                 </div>
               </CardContent>
             </Card>
           </div>
         </div>
       </section>

      {/* How It Works Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Nasıl Çalışır?
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              3 basit adımda profesyonel biyometrik fotoğrafınızı oluşturun
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                step: 1,
                title: "Fotoğraf Yükleyin",
                description: "Herhangi bir fotoğrafınızı sisteme yükleyin. Kalite endişesi yapmayın, AI teknolojimiz gerisini halleder."
              },
              {
                step: 2,
                title: "AI İşleme",
                description: "Gelişmiş algoritmalarımız fotoğrafınızı analiz eder, arka planı kaldırır ve standartlara uygun hale getirir."
              },
              {
                step: 3,
                title: "İndirin",
                description: "Biyometrik standartlara uygun, yüksek çözünürlüklü fotoğrafınızı anında indirin ve kullanın."
              }
            ].map((item, index) => (
              <Card key={index} className="text-center">
                <CardContent className="p-8">
                  <div className="relative">
                    <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center mx-auto mb-6 text-lg font-bold">
                      {item.step}
                    </div>
                    {index < 2 && (
                      <div className="hidden md:block absolute top-6 left-1/2 w-full h-0.5 bg-border transform translate-x-6"></div>
                    )}
                  </div>
                  <h3 className="text-xl font-semibold mb-4">{item.title}</h3>
                  <p className="text-muted-foreground">{item.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>



      {/* Document Types Section */}
      <section className="py-16 md:py-24 bg-muted/50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Desteklenen Belge Tipleri
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Tüm resmi belgeler için uygun fotoğraf standartları
            </p>
          </div>
          
          <SupportedDocumentTypes />
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Müşteri Yorumları
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Binlerce memnun kullanıcımızın deneyimleri
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: "Ahmet Yılmaz",
                role: "Pasaport Başvurusu",
                content: "Harika bir hizmet! Pasaport fotoğrafım ilk seferde kabul edildi. Çok pratik ve hızlı.",
                rating: 5,
                avatar: "AY",
                bgColor: "bg-blue-500"
              },
              {
                name: "Elif Kaya",
                role: "Ehliyet Yenileme",
                content: "AI teknolojisi gerçekten çok başarılı. Eski fotoğrafımı yükledim, mükemmel bir sonuç aldım.",
                rating: 5,
                avatar: "EK",
                bgColor: "bg-purple-500"
              },
              {
                name: "Mehmet Demir",
                role: "Vize Başvurusu",
                content: "Konsoloslukta hiç sorun yaşamadım. Standartlara tam uygun fotoğraf hazırladılar.",
                rating: 5,
                avatar: "MD",
                bgColor: "bg-green-500"
              }
            ].map((testimonial, index) => (
              <Card key={index} className="hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 bg-white/80 backdrop-blur-sm border-0 shadow-lg">
                <CardContent className="p-6">
                  <div className="flex mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <svg key={i} className="w-5 h-5 text-yellow-400 fill-current" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <p className="text-muted-foreground mb-4 text-lg leading-relaxed">"{testimonial.content}"</p>
                  <div className="flex items-center space-x-3 pt-4">
                    <div className={`w-12 h-12 ${testimonial.bgColor} rounded-full flex items-center justify-center text-white font-bold text-sm`}>
                      {testimonial.avatar}
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">{testimonial.name}</p>
                      <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          
          {/* Stats Section */}
          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-blue-600 mb-2">50K+</div>
              <p className="text-muted-foreground">Mutlu Müşteri</p>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-green-600 mb-2">99.9%</div>
              <p className="text-muted-foreground">Başarı Oranı</p>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-purple-600 mb-2">150+</div>
              <p className="text-muted-foreground">Ülke Standardı</p>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-orange-600 mb-2">24/7</div>
              <p className="text-muted-foreground">Destek</p>
            </div>
          </div>
        </div>
      </section>

      {/* Photo Creation Modal */}
      <PhotoCreationModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
    </main>
  );
}