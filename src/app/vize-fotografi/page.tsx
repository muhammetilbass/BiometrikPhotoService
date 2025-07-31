"use client";

import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { useErrorHandler } from '@/lib/hooks/useErrorHandler';
import { ErrorMessage } from '@/components/ui/ErrorMessage';
import { photoService } from '@/lib/api';
import { ArrowUpTrayIcon, PhotoIcon, CameraIcon, InformationCircleIcon, CheckCircleIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';

export default function VizePage() {
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [processedUrl, setProcessedUrl] = useState<string>('');
  const [originalUrl, setOriginalUrl] = useState<string>('');
  const [processId, setProcessId] = useState<string>('');
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const { error, handleError, clearError } = useErrorHandler();

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (file) {
      setUploadedFile(file);
      const reader = new FileReader();
      reader.onload = () => {
        setPreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
      
      setProcessedUrl('');
      setOriginalUrl('');
      setProcessId('');
      clearError();
    }
  }, [clearError]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png']
    },
    maxFiles: 1,
    multiple: false,
    maxSize: 5 * 1024 * 1024
  });

  const handleProcess = async () => {
    if (!uploadedFile) {
      handleError(new Error('Lütfen fotoğraf yükleyin'));
      return;
    }

    try {
      setIsProcessing(true);
      clearError();

      const response = await photoService.uploadAndProcessPhoto(uploadedFile, 'vize');
      
      if (response.status === 'completed') {
        setProcessedUrl(response.processedUrl);
        setOriginalUrl(response.originalUrl);
        setProcessId(response.id);
      } else if (response.status === 'error') {
        throw new Error(response.error || 'Fotoğraf işleme hatası');
      } else {
        throw new Error('Beklenmeyen yanıt formatı');
      }

    } catch (error: any) {
      console.error('Processing error:', error);
      
      let errorMessage = 'Fotoğraf işlenirken bir hata oluştu';
      
      if (error.message) {
        if (error.message.includes('Flask servisi')) {
          errorMessage = 'Fotoğraf işleme servisi çalışmıyor. Lütfen tekrar deneyin.';
        } else if (error.message.includes('Yüz tespit')) {
          errorMessage = 'Fotoğrafta yüz tespit edilemedi. Lütfen net bir yüz fotoğrafı yükleyin.';
        } else {
          errorMessage = error.message;
        }
      }
      
      handleError(new Error(errorMessage));
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDownload = () => {
    if (processedUrl) {
      photoService.downloadPhoto(processedUrl).catch((error) => {
        console.error('Download error:', error);
        handleError(new Error('Fotoğraf indirilemedi'));
      });
    }
  };

  const startCamera = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: { width: 640, height: 480 }
      });
      setStream(mediaStream);
      setIsCameraOpen(true);
      clearError();
    } catch (error) {
      console.error('Camera error:', error);
      handleError(new Error('Kameraya erişim sağlanamadı. Lütfen kamera izinlerini kontrol edin.'));
    }
  };

  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      setStream(null);
    }
    setIsCameraOpen(false);
  };

  const capturePhoto = () => {
    const video = document.getElementById('camera-video') as HTMLVideoElement;
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    
    if (video && context) {
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      context.drawImage(video, 0, 0);
      
      canvas.toBlob((blob) => {
        if (blob) {
          const file = new File([blob], 'camera-photo.jpg', { type: 'image/jpeg' });
          setUploadedFile(file);
          
          const reader = new FileReader();
          reader.onload = () => {
            setPreviewUrl(reader.result as string);
          };
          reader.readAsDataURL(file);
          
          // Önceki sonuçları temizle
          setProcessedUrl('');
          setOriginalUrl('');
          setProcessId('');
          clearError();
          
          stopCamera();
        }
      }, 'image/jpeg', 0.9);
    }
  };

  // Cleanup effect
  React.useEffect(() => {
    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, [stream]);

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Photo Upload Section - Moved to Top */}
        <div className="max-w-2xl mx-auto mb-12">
          <div className="bg-white p-8 rounded-lg shadow-sm border">
            <div className="text-center mb-6">
              <div className="flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="h-8 w-8 text-gray-400 mr-2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
                </svg>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="h-10 w-10 text-blue-600">
                  <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 15.75 5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0Z" />
                </svg>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="h-8 w-8 text-gray-400 ml-2 transform scale-x-[-1]">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
                </svg>
              </div>
              <p className="text-lg font-medium text-gray-900 mb-2">
                Fotoğrafınızı sürükleyip bırakın veya
              </p>
            </div>

          {/* Standartlar */}
          <div className="mb-12 p-6 bg-purple-50 rounded-lg border border-purple-200">
            <h2 className="text-xl font-semibold text-purple-900 mb-4 flex items-center">
              <InformationCircleIcon className="h-6 w-6 mr-2" />
              Vize Başvuru Fotoğrafı Standartları
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold text-purple-800 mb-2">Teknik Özellikler</h3>
                <ul className="space-y-1 text-purple-700">
                  <li className="flex items-center"><CheckCircleIcon className="h-4 w-4 mr-2 text-purple-600" />Boyut: 35x45 mm (295x378 piksel)</li>
                  <li className="flex items-center"><CheckCircleIcon className="h-4 w-4 mr-2 text-purple-600" />Açık gri arka plan</li>
                  <li className="flex items-center"><CheckCircleIcon className="h-4 w-4 mr-2 text-purple-600" />Yüz oranı: %70-80</li>
                  <li className="flex items-center"><CheckCircleIcon className="h-4 w-4 mr-2 text-purple-600" />Çözünürlük: 300 DPI</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-purple-800 mb-2">Gereksinimler</h3>
                <ul className="space-y-1 text-purple-700">
                  <li className="flex items-center"><CheckCircleIcon className="h-4 w-4 mr-2 text-purple-600" />Doğrudan kameraya bakış</li>
                  <li className="flex items-center"><CheckCircleIcon className="h-4 w-4 mr-2 text-purple-600" />Uluslararası standartlar</li>
                  <li className="flex items-center"><CheckCircleIcon className="h-4 w-4 mr-2 text-purple-600" />6 ay geçerlilik</li>
                  <li className="flex items-center"><CheckCircleIcon className="h-4 w-4 mr-2 text-purple-600" />Schengen uyumlu</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Fotoğraf Yükleme */}
          <div className="mb-12">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Biyometrik Fotoğraf
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Mükemmel biyometrik fotoğrafınızı çekin (uyumluluk garantili)
              </p>
            </div>
            
            <div className="max-w-2xl mx-auto">
              <div className="bg-white p-8 rounded-lg shadow-sm border">
                <div className="text-center mb-6">
                  <div className="flex items-center justify-center mb-4">
                    <ArrowUpTrayIcon className="h-8 w-8 text-gray-400 mr-2" />
                    <PhotoIcon className="h-10 w-10 text-purple-600" />
                    <ArrowUpTrayIcon className="h-8 w-8 text-gray-400 ml-2 transform scale-x-[-1]" />
                  </div>
                  <p className="text-lg font-medium text-gray-900 mb-2">
                    Fotoğrafınızı sürükleyip bırakın veya
                  </p>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <div
                    {...getRootProps()}
                    className={`flex-1 border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors ${
                      isDragActive
                        ? 'border-purple-400 bg-purple-50'
                        : 'border-gray-300 hover:border-purple-400 hover:bg-gray-50'
                    }`}
                  >
                    <input {...getInputProps()} />
                    <button className="w-full px-6 py-3 bg-purple-600 text-white rounded-lg font-medium hover:bg-purple-700 transition-colors">
                      Fotoğraf yükle
                    </button>
                  </div>
                  
                  <div className="flex-1 border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                    <button 
                      onClick={startCamera}
                      className="w-full px-6 py-3 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition-colors"
                    >
                      Fotoğraf çek
                    </button>
                  </div>
                </div>
                
                <div className="mt-6 text-center">
                  <div className="flex items-center justify-center space-x-4 text-sm text-gray-500">
                    <span className="flex items-center">
                      <CheckCircleIcon className="h-4 w-4 mr-1 text-green-500" />
                      13157 hakkında incelemeler
                    </span>
                    <span className="flex items-center">
                      <svg className="h-4 w-4 mr-1 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                      Trustpilot
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Önizleme ve İşleme */}
            {previewUrl && (
              <div className="bg-white p-6 rounded-lg shadow-sm border mb-8">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Fotoğraf Önizleme</h3>
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="flex-1">
                    <img
                      src={previewUrl}
                      alt="Yüklenen fotoğraf"
                      className="w-full max-w-sm mx-auto rounded-lg shadow-sm"
                    />
                  </div>
                  <div className="flex-1 flex flex-col justify-center">
                    <button
                      onClick={handleProcess}
                      disabled={isProcessing}
                      className={`inline-flex items-center justify-center px-8 py-4 border border-transparent text-lg font-medium rounded-lg shadow-sm text-white ${
                        isProcessing
                          ? 'bg-purple-400 cursor-not-allowed'
                          : 'bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transform hover:scale-105 transition-all duration-200'
                      }`}
                    >
                      {isProcessing ? (
                        <>
                          <svg className="animate-spin -ml-1 mr-3 h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          İşleniyor...
                        </>
                      ) : (
                        <>
                          <PhotoIcon className="h-6 w-6 mr-2" />
                          Vize Fotoğrafı Oluştur
                        </>
                      )}
                    </button>
                    
                    <div className="mt-4 text-sm text-gray-600">
                      <p>✓ Otomatik yüz tespiti</p>
                      <p>✓ Arka plan temizleme</p>
                      <p>✓ Boyut optimizasyonu</p>
                      <p>✓ Uluslararası standartlar</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Kamera Modal */}
            {isCameraOpen && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                <div className="bg-white p-6 rounded-lg max-w-2xl w-full mx-4">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-semibold">Fotoğraf Çek</h3>
                    <button
                      onClick={stopCamera}
                      className="text-gray-500 hover:text-gray-700"
                    >
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                  <div className="text-center">
                    <video
                      id="camera-video"
                      autoPlay
                      playsInline
                      ref={(video) => {
                        if (video && stream) {
                          video.srcObject = stream;
                        }
                      }}
                      className="w-full max-w-md mx-auto rounded-lg"
                    />
                    <div className="mt-4 space-x-4">
                      <button
                        onClick={capturePhoto}
                        className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                      >
                        Fotoğrafı Çek
                      </button>
                      <button
                        onClick={stopCamera}
                        className="px-6 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
                      >
                        İptal
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}



            {/* Sonuç */}
            {processedUrl && (
              <div className="bg-white p-6 rounded-lg shadow-sm border">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">İşlem Tamamlandı!</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Orijinal Fotoğraf</h4>
                    <img
                      src={originalUrl}
                      alt="Orijinal fotoğraf"
                      className="w-full rounded-lg shadow-sm"
                    />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Vize Başvuru Fotoğrafı</h4>
                    <img
                      src={processedUrl}
                      alt="İşlenmiş vize fotoğrafı"
                      className="w-full rounded-lg shadow-sm"
                    />
                    <button
                      onClick={handleDownload}
                      className="mt-4 w-full px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                    >
                      Fotoğrafı İndir
                    </button>
                  </div>
                </div>
                {processId && (
                  <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                    <p className="text-sm text-gray-600">
                      İşlem ID: <code className="font-mono">{processId}</code>
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Vize Fotoğrafı Hakkında */}
          <div className="bg-white p-8 rounded-lg shadow-sm border mb-12">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">Vize Başvuru Fotoğrafı Hakkında</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Uluslararası Standartlar</h3>
                <p className="text-gray-600 mb-4">
                  Vize başvuru fotoğrafları, her ülkenin kendi belirlediği standartlara uygun olmalıdır. 
                  Ancak genel olarak ICAO 9303 standardına benzer kurallar geçerlidir. Schengen ülkeleri 
                  için özel gereksinimler bulunmaktadır.
                </p>
                <ul className="space-y-2 text-gray-600">
                  <li>• Boyut: 35x45 mm (Schengen standartı)</li>
                  <li>• Açık gri veya beyaz arka plan</li>
                  <li>• Son 6 ay içinde çekilmiş</li>
                  <li>• Yüksek kalite ve netlik</li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Kullanım Alanları</h3>
                <p className="text-gray-600 mb-4">
                  Uluslararası standartlara uygun vize fotoğrafları aşağıdaki başvurular için kullanılabilir:
                </p>
                <ul className="space-y-2 text-gray-600">
                  <li>• Schengen Vize Başvuruları</li>
                  <li>• ABD Vize Başvuruları</li>
                  <li>• İngiltere Vize Başvuruları</li>
                  <li>• Kanada Vize Başvuruları</li>
                  <li>• Avustralya Vize Başvuruları</li>
                  <li>• Diğer ülke vize başvuruları</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Diğer Belge Tipleri */}
          <div className="text-center">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">Diğer Belge Tipleri</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <Link href="/pasaport-fotografi" className="p-4 bg-white rounded-lg shadow-sm border hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-2">
                  <div className="w-8 h-10 bg-blue-600 rounded-sm flex items-center justify-center">
                    <div className="w-5 h-5 bg-white rounded-full"></div>
                  </div>
                </div>
                <p className="font-medium text-sm">Pasaport</p>
              </Link>
              
              <Link href="/ehliyet-fotografi" className="p-4 bg-white rounded-lg shadow-sm border hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-2">
                  <div className="w-8 h-10 bg-green-600 rounded-sm flex items-center justify-center">
                    <div className="w-5 h-5 bg-white rounded-full"></div>
                  </div>
                </div>
                <p className="font-medium text-sm">Ehliyet</p>
              </Link>
              
              <Link href="/kimlik-karti-fotografi" className="p-4 bg-white rounded-lg shadow-sm border hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mx-auto mb-2">
                  <div className="w-8 h-10 bg-red-600 rounded-sm flex items-center justify-center">
                    <div className="w-5 h-5 bg-white rounded-full"></div>
                  </div>
                </div>
                <p className="font-medium text-sm">Kimlik Kartı</p>
              </Link>
            </div>
            
            <div className="mt-6">
              <Link 
                href="/" 
                className="inline-flex items-center px-6 py-3 border border-gray-300 text-base font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50 transition-colors"
              >
                Tüm Belge Tipleri
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}