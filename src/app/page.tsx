"use client";

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Camera, Zap, Download, Shield, Clock, CheckCircle, Star, Users, Globe, Award, ArrowRight, Play, Sparkles, ChevronLeft, ChevronRight } from 'lucide-react';
import SupportedDocumentTypes from '@/components/SupportedDocumentTypes';
import PhotoCreationModal from '@/components/PhotoCreationModal';

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const testimonials = [
    {
      name: "Ahmet Yılmaz",
      role: "İş Başvurusu",
      content: "Pasaport başvurum için mükemmel bir fotoğraf elde ettim. AI teknolojisi gerçekten çok başarılı!",
      rating: 5,
      avatar: "AY",
      color: "bg-blue-500"
    },
    {
      name: "Zeynep Kaya",
      role: "Öğrenci",
      content: "Evden çıkmadan öğrenci kartım için fotoğraf hazırladım. Çok pratik ve kaliteli!",
      rating: 5,
      avatar: "ZK",
      color: "bg-purple-500"
    },
    {
      name: "Mehmet Demir",
      role: "Pasaport Başvurusu",
      content: "Pasaport başvurum için kullandım, hiç sorun yaşamadım. Kesinlikle tavsiye ederim!",
      rating: 5,
      avatar: "MD",
      color: "bg-green-500"
    },
    {
      name: "Fatma Özkan",
      role: "Ehliyet Yenileme",
      content: "Ehliyet yenileme için kullandım. Çok hızlı ve kolay bir süreçti. Herkese tavsiye ederim!",
      rating: 5,
      avatar: "FÖ",
      color: "bg-orange-500"
    },
    {
      name: "Can Arslan",
      role: "Kimlik Kartı",
      content: "Yeni kimlik kartım için fotoğraf çektirdim. Kalite ve hız açısından mükemmel bir hizmet!",
      rating: 5,
      avatar: "CA",
      color: "bg-indigo-500"
    }
  ];

  // Auto-play carousel
  useEffect(() => {
    if (!isAutoPlaying) return;
    
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, testimonials.length]);

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    setIsAutoPlaying(false);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    setIsAutoPlaying(false);
  };

  const goToTestimonial = (index: number) => {
    setCurrentTestimonial(index);
    setIsAutoPlaying(false);
  };

  return (
    <main className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative py-16 md:py-24 lg:py-32 overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 overflow-hidden">
          <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: 'url(/uploads/Gemini_Generated_Image_3lz6xy3lz6xy3lz6.png)',
              filter: 'blur(2px) brightness(0.7)'
            }}
          ></div>
          <div className="absolute inset-0 bg-gradient-to-br from-slate-900/40 via-stone-900/30 to-neutral-900/40"></div>
          <div className="absolute top-0 left-0 w-full h-full">
            <div className="absolute top-20 right-20 w-16 h-16 md:w-24 md:h-24 bg-gradient-to-br from-amber-200 to-orange-200 rounded-full blur-2xl opacity-20"></div>
            <div className="absolute bottom-32 left-32 w-20 h-20 md:w-28 md:h-28 bg-gradient-to-br from-emerald-200 to-teal-200 rounded-full blur-2xl opacity-20"></div>
          </div>
        </div>
        
        <div className="container mx-auto px-4 md:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col items-center text-center space-y-6 md:space-y-8">
            <div className="space-y-4 md:space-y-6">
              <div className="inline-flex items-center px-4 md:px-6 py-2 md:py-3 rounded-full bg-gradient-to-r from-blue-100 via-indigo-100 to-cyan-100 text-blue-800 text-xs md:text-sm font-medium mb-2 md:mb-4 border border-blue-200 shadow-sm hover:shadow-md transition-all duration-300">
                <Sparkles className="w-3 h-3 md:w-4 md:h-4 mr-1 md:mr-2 animate-pulse" />
                <span className="hidden sm:inline">AI Destekli Teknoloji ile %99.9 Başarı Oranı</span>
                <span className="sm:hidden">AI ile %99.9 Başarı</span>
              </div>
              <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight text-white leading-tight">
                <span className="block">Profesyonel Biyometrik</span>
                <span className="block bg-gradient-to-r from-blue-400 via-indigo-400 to-cyan-400 bg-clip-text text-transparent" style={{fontFeatureSettings: '"kern" 1, "liga" 1, "calt" 1'}}>
                  Fotoğraf Hizmeti
                </span>
              </h1>
              <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-200 max-w-4xl mx-auto leading-relaxed px-4">
                Yapay zeka destekli teknoloji ile pasaport, ehliyet ve diğer resmi belgeler için 
                <span className="font-semibold text-white bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent"> uluslararası standartlara uygun </span>
                biyometrik fotoğraflar oluşturun.
              </p>
            </div>
            
            <div className="flex justify-center items-center w-full max-w-2xl mx-auto">
              <Button 
                size="lg" 
                className="group px-8 sm:px-12 py-4 sm:py-6 text-lg sm:text-xl font-bold bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-700 hover:via-indigo-700 hover:to-purple-700 shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:scale-105 rounded-2xl border border-white/30 backdrop-blur-sm relative overflow-hidden w-full sm:w-auto"
                onClick={() => setIsModalOpen(true)}
              >
                {/* Animated background */}
                <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                <Camera className="mr-3 h-5 w-5 sm:h-6 sm:w-6 group-hover:rotate-12 group-hover:scale-110 transition-all duration-500" />
                <span className="relative z-10">Hemen Başla</span>
                <ArrowRight className="ml-3 h-5 w-5 sm:h-6 sm:w-6 group-hover:translate-x-2 group-hover:scale-110 transition-all duration-500" />
              </Button>
            </div>
            

            
            <div className="flex flex-wrap justify-center items-center gap-3 md:gap-6 pt-4 md:pt-8 max-w-4xl mx-auto">
              <div className="group flex items-center space-x-2 md:space-x-3 bg-white/90 backdrop-blur-md px-3 md:px-6 py-2 md:py-3 rounded-full shadow-md border border-emerald-200 hover:shadow-lg hover:scale-105 transition-all duration-300 hover:bg-emerald-50">
                <Shield className="h-4 w-4 md:h-6 md:w-6 text-emerald-600 group-hover:animate-pulse" />
                <span className="text-xs md:text-sm font-semibold text-emerald-800">SSL Güvenli</span>
              </div>
              <div className="group flex items-center space-x-2 md:space-x-3 bg-white/90 backdrop-blur-md px-3 md:px-6 py-2 md:py-3 rounded-full shadow-md border border-teal-200 hover:shadow-lg hover:scale-105 transition-all duration-300 hover:bg-teal-50">
                <CheckCircle className="h-4 w-4 md:h-6 md:w-6 text-teal-600 group-hover:animate-bounce" />
                <span className="text-xs md:text-sm font-semibold text-teal-800">ICAO Uyumlu</span>
              </div>
              <div className="group flex items-center space-x-2 md:space-x-3 bg-white/90 backdrop-blur-md px-3 md:px-6 py-2 md:py-3 rounded-full shadow-md border border-blue-200 hover:shadow-lg hover:scale-105 transition-all duration-300 hover:bg-blue-50">
                <Clock className="h-4 w-4 md:h-6 md:w-6 text-blue-600 group-hover:animate-spin" />
                <span className="text-xs md:text-sm font-semibold text-blue-800">
                  <span className="hidden sm:inline">30 Saniyede Hazır</span>
                  <span className="sm:hidden">30sn Hazır</span>
                </span>
              </div>
              <div className="group flex items-center space-x-2 md:space-x-3 bg-white/90 backdrop-blur-md px-3 md:px-6 py-2 md:py-3 rounded-full shadow-md border border-indigo-200 hover:shadow-lg hover:scale-105 transition-all duration-300 hover:bg-indigo-50">
                <Users className="h-4 w-4 md:h-6 md:w-6 text-indigo-600 group-hover:animate-pulse" />
                <span className="text-xs md:text-sm font-semibold text-indigo-800">
                  <span className="hidden sm:inline">500K+ Kullanıcı</span>
                  <span className="sm:hidden">500K+</span>
                </span>
              </div>
            </div>
            

          </div>
        </div>
      </section>



      {/* Features Section */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-slate-50 via-stone-50 to-neutral-50 relative overflow-hidden">
        {/* Subtle background pattern */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-20 left-20 w-32 h-32 bg-gradient-to-br from-blue-200 to-indigo-200 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-20 w-40 h-40 bg-gradient-to-br from-emerald-200 to-teal-200 rounded-full blur-3xl"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-36 h-36 bg-gradient-to-br from-indigo-200 to-cyan-200 rounded-full blur-3xl"></div>
        </div>
        
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="text-center mb-12 md:mb-16">
            <div className="inline-flex items-center px-5 py-2.5 rounded-full bg-gradient-to-r from-blue-100 via-indigo-100 to-cyan-100 text-blue-800 text-sm font-medium mb-6 shadow-sm border border-blue-200">
              <Award className="w-4 h-4 mr-2 animate-pulse" />
              Özelliklerimiz
            </div>
            <h2 className="text-3xl md:text-5xl font-bold mb-4 md:mb-6 bg-gradient-to-r from-slate-800 via-stone-700 to-neutral-800 bg-clip-text text-transparent">
              Neden Bizi Seçmelisiniz?
            </h2>
            <p className="text-lg md:text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
              Gelişmiş AI teknolojisi ve kullanıcı dostu arayüzümüzle fark yaratıyoruz
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 max-w-6xl mx-auto">
            {/* Hızlı İşlem Card */}
            <Card className="group hover:shadow-xl transition-all duration-300 border border-blue-200/50 shadow-md bg-gradient-to-br from-white via-blue-50/30 to-indigo-50/30 hover:from-blue-50 hover:via-indigo-50 hover:to-cyan-50 transform hover:scale-[1.02] hover:-translate-y-1 backdrop-blur-sm">
              <CardHeader className="text-center p-6 md:p-8">
                <div className="mx-auto w-16 h-16 md:w-20 md:h-20 bg-gradient-to-br from-blue-500 via-indigo-500 to-cyan-500 rounded-2xl md:rounded-3xl flex items-center justify-center mb-4 md:mb-6 shadow-lg group-hover:shadow-xl group-hover:scale-105 transition-all duration-300 group-hover:rotate-3">
                  <Zap className="h-8 w-8 md:h-10 md:w-10 text-white group-hover:animate-pulse" />
                </div>
                <CardTitle className="text-xl md:text-2xl mb-3 md:mb-4 group-hover:text-blue-700 transition-colors duration-300 font-semibold">Hızlı İşlem</CardTitle>
                <CardDescription className="text-base md:text-lg leading-relaxed group-hover:text-slate-700 text-slate-600">
                  30 saniye içinde profesyonel kalitede biyometrik fotoğraf elde edin
                </CardDescription>
              </CardHeader>
            </Card>
            
            {/* Güvenli Platform Card */}
            <Card className="group hover:shadow-xl transition-all duration-300 border border-emerald-200/50 shadow-md bg-gradient-to-br from-white via-emerald-50/30 to-teal-50/30 hover:from-emerald-50 hover:via-teal-50 hover:to-cyan-50 transform hover:scale-[1.02] hover:-translate-y-1 backdrop-blur-sm">
              <CardHeader className="text-center p-6 md:p-8">
                <div className="mx-auto w-16 h-16 md:w-20 md:h-20 bg-gradient-to-br from-emerald-500 via-teal-500 to-cyan-500 rounded-2xl md:rounded-3xl flex items-center justify-center mb-4 md:mb-6 shadow-lg group-hover:shadow-xl group-hover:scale-105 transition-all duration-300 group-hover:rotate-3">
                  <Shield className="h-8 w-8 md:h-10 md:w-10 text-white group-hover:animate-pulse" />
                </div>
                <CardTitle className="text-xl md:text-2xl mb-3 md:mb-4 group-hover:text-emerald-700 transition-colors duration-300 font-semibold">Güvenli Platform</CardTitle>
                <CardDescription className="text-base md:text-lg leading-relaxed group-hover:text-slate-700 text-slate-600">
                  Verileriniz şifrelenir, fotoğraflarınız işlem sonrası otomatik silinir
                </CardDescription>
              </CardHeader>
            </Card>
            
            {/* Garantili Kabul Card */}
            <Card className="group hover:shadow-xl transition-all duration-300 border border-indigo-200/50 shadow-md bg-gradient-to-br from-white via-indigo-50/30 to-purple-50/30 hover:from-indigo-50 hover:via-purple-50 hover:to-violet-50 transform hover:scale-[1.02] hover:-translate-y-1 backdrop-blur-sm">
              <CardHeader className="text-center p-6 md:p-8">
                <div className="mx-auto w-16 h-16 md:w-20 md:h-20 bg-gradient-to-br from-indigo-500 via-purple-500 to-violet-500 rounded-2xl md:rounded-3xl flex items-center justify-center mb-4 md:mb-6 shadow-lg group-hover:shadow-xl group-hover:scale-105 transition-all duration-300 group-hover:rotate-3">
                  <CheckCircle className="h-8 w-8 md:h-10 md:w-10 text-white group-hover:animate-pulse" />
                </div>
                <CardTitle className="text-xl md:text-2xl mb-3 md:mb-4 group-hover:text-indigo-700 transition-colors duration-300 font-semibold">Garantili Kabul</CardTitle>
                <CardDescription className="text-base md:text-lg leading-relaxed group-hover:text-slate-700 text-slate-600">
                  Uluslararası standartlara uygun, resmi kurumlar tarafından kabul edilir
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 md:py-28 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 relative overflow-hidden">
        {/* Background Animation */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-10 w-32 h-32 bg-blue-200 rounded-full opacity-20 animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-24 h-24 bg-purple-200 rounded-full opacity-20 animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-green-200 rounded-full opacity-20 animate-pulse delay-2000"></div>
        </div>
        
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-6 py-3 rounded-full bg-gradient-to-r from-green-100 to-emerald-100 text-green-800 text-sm font-medium mb-6 shadow-sm border border-green-200">
              <Users className="w-4 h-4 mr-2" />
              Müşteri Yorumları
            </div>
            <h2 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-gray-900 via-green-900 to-emerald-900 bg-clip-text text-transparent">
              Müşterilerimiz Ne Diyor?
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Binlerce memnun müşterimizin deneyimlerini keşfedin
            </p>
          </div>
          
          <div className="max-w-5xl mx-auto relative">
            {/* Carousel Container */}
            <div className="relative overflow-hidden rounded-3xl">
              <div 
                className="flex transition-transform duration-700 ease-in-out"
                style={{ transform: `translateX(-${currentTestimonial * 100}%)` }}
              >
                {testimonials.map((testimonial, index) => (
                  <div key={index} className="w-full flex-shrink-0 px-4">
                    <Card className="border-0 shadow-2xl bg-white/95 backdrop-blur-xl p-8 md:p-12 mx-auto max-w-4xl hover:shadow-3xl transition-all duration-500">
                      <CardContent className="text-center">
                        {/* Stars */}
                        <div className="flex justify-center mb-8">
                          {[...Array(testimonial.rating)].map((_, i) => (
                            <Star 
                              key={i} 
                              className="w-7 h-7 text-yellow-400 fill-current mx-1 animate-pulse" 
                              style={{ animationDelay: `${i * 100}ms` }}
                            />
                          ))}
                        </div>
                        
                        {/* Quote */}
                        <blockquote className="text-2xl md:text-3xl font-medium text-gray-900 mb-8 leading-relaxed italic relative">
                          <span className="text-6xl text-blue-200 absolute -top-4 -left-4 font-serif">"</span>
                          {testimonial.content}
                          <span className="text-6xl text-blue-200 absolute -bottom-8 -right-4 font-serif">"</span>
                        </blockquote>
                        
                        {/* Author */}
                        <div className="flex items-center justify-center space-x-6">
                          <div className={`w-16 h-16 ${testimonial.color} rounded-full flex items-center justify-center shadow-lg transform hover:scale-110 transition-transform duration-300`}>
                            <span className="text-white font-bold text-xl">
                              {testimonial.avatar}
                            </span>
                          </div>
                          <div className="text-left">
                            <div className="font-bold text-xl text-gray-900">{testimonial.name}</div>
                            <div className="text-lg text-muted-foreground">{testimonial.role}</div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Navigation Arrows */}
            <button
              onClick={prevTestimonial}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full shadow-lg hover:shadow-xl flex items-center justify-center text-gray-600 hover:text-blue-600 transition-all duration-300 hover:scale-110 z-10"
              aria-label="Önceki yorum"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            
            <button
              onClick={nextTestimonial}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full shadow-lg hover:shadow-xl flex items-center justify-center text-gray-600 hover:text-blue-600 transition-all duration-300 hover:scale-110 z-10"
              aria-label="Sonraki yorum"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
            
            {/* Dots Indicator */}
            <div className="flex justify-center mt-8 space-x-3">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  className={`w-4 h-4 rounded-full transition-all duration-300 ${
                    index === currentTestimonial 
                      ? 'bg-gradient-to-r from-blue-600 to-purple-600 scale-125 shadow-lg' 
                      : 'bg-gray-300 hover:bg-gray-400 hover:scale-110'
                  }`}
                  onClick={() => goToTestimonial(index)}
                  aria-label={`${index + 1}. yoruma git`}
                />
              ))}
            </div>
            
            {/* Auto-play Control */}
            <div className="flex justify-center mt-6">
              <button
                onClick={() => setIsAutoPlaying(!isAutoPlaying)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  isAutoPlaying 
                    ? 'bg-blue-100 text-blue-800 hover:bg-blue-200' 
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {isAutoPlaying ? 'Otomatik Geçişi Durdur' : 'Otomatik Geçişi Başlat'}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Advantages Section */}
      <section className="py-20 md:py-28 bg-gradient-to-br from-indigo-50 via-white to-purple-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-purple-100 text-purple-800 text-sm font-medium mb-6">
              <Sparkles className="w-4 h-4 mr-2" />
              Avantajlarımız
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-gray-900 to-purple-900 bg-clip-text text-transparent">
              Neden En İyisiyiz?
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Gelişmiş AI teknolojisi ile size sunduğumuz benzersiz özellikler
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="hover:shadow-lg transition-shadow duration-300 border-0 shadow-md bg-white">
              <CardContent className="p-8 text-center">
                <div className="mx-auto w-16 h-16 bg-blue-500 rounded-2xl flex items-center justify-center mb-6 shadow-lg">
                  <Zap className="h-8 w-8 text-white" />
                </div>
                <h3 className="font-bold text-xl mb-3 text-gray-900">AI Destekli Teknoloji</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Gelişmiş yapay zeka algoritmaları ile otomatik arka plan kaldırma, yüz hizalama ve boyut ayarlama
                </p>
              </CardContent>
            </Card>
            
            <Card className="hover:shadow-lg transition-shadow duration-300 border-0 shadow-md bg-white">
              <CardContent className="p-8 text-center">
                <div className="mx-auto w-16 h-16 bg-green-500 rounded-2xl flex items-center justify-center mb-6 shadow-lg">
                  <Shield className="h-8 w-8 text-white" />
                </div>
                <h3 className="font-bold text-xl mb-3 text-gray-900">Standart Uyumluluk</h3>
                <p className="text-muted-foreground leading-relaxed">
                  ICAO, ISO/IEC 19794-5 ve yerel standartlara tam uyumluluk
                </p>
              </CardContent>
            </Card>
            
            <Card className="hover:shadow-lg transition-shadow duration-300 border-0 shadow-md bg-white">
              <CardContent className="p-8 text-center">
                <div className="mx-auto w-16 h-16 bg-purple-500 rounded-2xl flex items-center justify-center mb-6 shadow-lg">
                  <Download className="h-8 w-8 text-white" />
                </div>
                <h3 className="font-bold text-xl mb-3 text-gray-900">Anında İndirme</h3>
                <p className="text-muted-foreground leading-relaxed">
                  İşlem tamamlandıktan sonra yüksek çözünürlüklü fotoğrafınızı anında indirin
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 md:py-28 bg-gradient-to-br from-gray-50 to-blue-50 relative overflow-hidden">
        {/* Background Animation */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-20 w-40 h-40 bg-blue-200 rounded-full opacity-20 animate-pulse"></div>
          <div className="absolute bottom-20 right-20 w-32 h-32 bg-purple-200 rounded-full opacity-20 animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/3 w-24 h-24 bg-blue-200 rounded-full opacity-20 animate-pulse delay-2000"></div>
        </div>
        
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="text-center mb-20">
            <div className="inline-flex items-center px-6 py-3 rounded-full bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-800 text-sm font-medium mb-8 shadow-sm border border-blue-200">
              <Play className="w-4 h-4 mr-2 animate-pulse" />
              Nasıl Çalışır
            </div>
            <h2 className="text-5xl md:text-6xl font-bold mb-8 bg-gradient-to-r from-gray-900 via-blue-900 to-indigo-900 bg-clip-text text-transparent">
              3 Basit Adımda Hazır!
            </h2>
            <p className="text-2xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
              Dakikalar içinde profesyonel kalitede biyometrik fotoğrafınızı elde edin
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
            {/* Connection Lines */}
            <div className="hidden md:block absolute top-1/2 left-1/3 w-1/3 h-0.5 bg-gradient-to-r from-blue-300 to-green-300 transform -translate-y-1/2 z-0"></div>
            <div className="hidden md:block absolute top-1/2 right-1/3 w-1/3 h-0.5 bg-gradient-to-r from-green-300 to-blue-300 transform -translate-y-1/2 z-0"></div>
            
            {[
              {
                step: 1,
                title: "Fotoğraf Yükleyin",
                description: "Herhangi bir fotoğrafınızı sisteme yükleyin. Kalite endişesi yapmayın, AI teknolojimiz gerisini halleder.",
                color: "bg-gradient-to-br from-blue-500 to-indigo-600",
                icon: "📸"
              },
              {
                step: 2,
                title: "AI İşleme",
                description: "Gelişmiş algoritmalarımız fotoğrafınızı analiz eder, arka planı kaldırır ve standartlara uygun hale getirir.",
                color: "bg-gradient-to-br from-green-500 to-emerald-600",
                icon: "🤖"
              },
              {
                step: 3,
                title: "İndirin",
                description: "Biyometrik standartlara uygun, yüksek çözünürlüklü fotoğrafınızı anında indirin ve kullanın.",
                color: "bg-gradient-to-br from-blue-500 to-indigo-600",
                icon: "⬇️"
              }
            ].map((item, index) => (
              <div key={index} className="text-center relative z-10 group">
                <div className={`mx-auto w-28 h-28 ${item.color} rounded-full flex items-center justify-center mb-8 shadow-2xl group-hover:shadow-3xl group-hover:scale-110 transition-all duration-500 group-hover:rotate-12 relative`}>
                  <span className="text-4xl font-bold text-white group-hover:animate-bounce">{item.step}</span>
                  <div className="absolute -inset-2 bg-gradient-to-r from-white/20 to-white/10 rounded-full opacity-0 group-hover:opacity-100 animate-pulse transition-opacity duration-500"></div>
                </div>
                <div className="text-4xl mb-4 group-hover:animate-bounce">{item.icon}</div>
                <h3 className="font-bold text-2xl mb-6 text-gray-900 group-hover:text-blue-700 transition-colors duration-300">{item.title}</h3>
                <p className="text-lg text-muted-foreground leading-relaxed group-hover:text-gray-700 transition-colors duration-300">{item.description}</p>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-16">
            <Button 
              size="lg" 
              className="group bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-700 hover:via-indigo-700 hover:to-purple-700 text-white px-12 py-6 rounded-full text-xl font-bold shadow-2xl hover:shadow-3xl transition-all duration-500 transform hover:scale-110 hover:-translate-y-2 relative overflow-hidden"
              onClick={() => setIsModalOpen(true)}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
              <Play className="mr-3 h-6 w-6 group-hover:scale-110 transition-transform duration-300" />
              <span className="relative z-10">Hemen Deneyin</span>
              <ArrowRight className="ml-3 h-6 w-6 group-hover:translate-x-2 group-hover:scale-110 transition-all duration-500" />
            </Button>
          </div>
        </div>
      </section>

      {/* Document Types Section */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-blue-100 text-blue-800 text-sm font-medium mb-6">
              <Globe className="w-4 h-4 mr-2" />
              Belge Tipleri
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-gray-900 to-blue-900 bg-clip-text text-transparent">
              Desteklenen Belge Tipleri
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Tüm resmi belgeler için uluslararası standartlara uygun fotoğraf çözümleri
            </p>
          </div>
          
          <SupportedDocumentTypes />
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