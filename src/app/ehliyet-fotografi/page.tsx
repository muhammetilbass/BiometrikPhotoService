"use client";

import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { useErrorHandler } from '@/lib/hooks/useErrorHandler';
import { photoService } from '@/lib/api';
import { ArrowUpTrayIcon, PhotoIcon, CameraIcon, InformationCircleIcon, CheckCircleIcon } from '@heroicons/react/24/outline';

export default function EhliyetPage() {
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

      const response = await photoService.uploadAndProcessPhoto(uploadedFile, 'ehliyet');
      
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
          
          setProcessedUrl('');
          setOriginalUrl('');
          setProcessId('');
          clearError();
          
          stopCamera();
        }
      }, 'image/jpeg', 0.9);
    }
  };

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
              <p className="text-lg font-medium text-gray-900 mb-4">
                Ehliyet fotoğrafınızı yükleyin veya çekin
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <div
                {...getRootProps()}
                className={`flex-1 border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors ${
                  isDragActive
                    ? 'border-green-400 bg-green-50'
                    : 'border-gray-300 hover:border-green-400 hover:bg-gray-50'
                }`}
              >
                <input {...getInputProps()} />
                <button className="w-full px-6 py-3 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition-colors">
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
            

          </div>
        </div>

        {/* Standartlar */}
        <div className="max-w-4xl mx-auto mb-12">
          <div className="p-6 bg-green-50 rounded-lg border border-green-200">
            <h2 className="text-xl font-semibold text-green-900 mb-4 flex items-center">
              <InformationCircleIcon className="h-6 w-6 mr-2" />
              Ehliyet Fotoğrafı Standartları
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold text-green-800 mb-2">Teknik Özellikler</h3>
                <ul className="space-y-1 text-green-700">
                  <li className="flex items-center"><CheckCircleIcon className="h-4 w-4 mr-2 text-green-600" />Boyut: 50x60 mm (413x531 piksel)</li>
                  <li className="flex items-center"><CheckCircleIcon className="h-4 w-4 mr-2 text-green-600" />Beyaz arka plan</li>
                  <li className="flex items-center"><CheckCircleIcon className="h-4 w-4 mr-2 text-green-600" />Yüz oranı: %75-80</li>
                  <li className="flex items-center"><CheckCircleIcon className="h-4 w-4 mr-2 text-green-600" />Çözünürlük: 300 DPI</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-green-800 mb-2">Gereksinimler</h3>
                <ul className="space-y-1 text-green-700">
                  <li className="flex items-center"><CheckCircleIcon className="h-4 w-4 mr-2 text-green-600" />Doğrudan kameraya bakış</li>
                  <li className="flex items-center"><CheckCircleIcon className="h-4 w-4 mr-2 text-green-600" />Net aydınlatma</li>
                  <li className="flex items-center"><CheckCircleIcon className="h-4 w-4 mr-2 text-green-600" />Gözlük takılabilir</li>
                  <li className="flex items-center"><CheckCircleIcon className="h-4 w-4 mr-2 text-green-600" />MEB standartları</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Önizleme ve İşleme */}
        {previewUrl && (
          <div className="max-w-4xl mx-auto mb-8">
            <div className="bg-white p-6 rounded-lg shadow-sm border">
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
                        ? 'bg-green-400 cursor-not-allowed'
                        : 'bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transform hover:scale-105 transition-all duration-200'
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
                        Ehliyet Fotoğrafı Oluştur
                      </>
                    )}
                  </button>
                  
                  <div className="mt-4 text-sm text-gray-600">
                    <p>✓ Otomatik yüz tespiti</p>
                    <p>✓ Arka plan temizleme</p>
                    <p>✓ Boyut optimizasyonu</p>
                    <p>✓ MEB standartları</p>
                  </div>
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
          <div className="max-w-4xl mx-auto mb-12">
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
                  <h4 className="font-medium text-gray-900 mb-2">Ehliyet Fotoğrafı</h4>
                  <img
                    src={processedUrl}
                    alt="İşlenmiş ehliyet fotoğrafı"
                    className="w-full rounded-lg shadow-sm"
                  />
                  <button
                    onClick={handleDownload}
                    className="mt-4 w-full px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
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
          </div>
        )}

        {/* Ehliyet Fotoğrafı Hakkında */}
        <div className="max-w-4xl mx-auto">
          <div className="bg-white p-8 rounded-lg shadow-sm border">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">Ehliyet Fotoğrafı Hakkında</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">MEB Standartları</h3>
                <p className="text-gray-600 mb-4">
                  Ehliyet fotoğrafları, Milli Eğitim Bakanlığı (MEB) tarafından belirlenen 
                  standartlara uygun olmalıdır. Bu standartlar, sürücü belgesi için gerekli 
                  biyometrik fotoğraf gereksinimlerini belirler.
                </p>
                <ul className="space-y-2 text-gray-600">
                  <li>• Yüz, fotoğrafın %75-80'ini kapsamalı</li>
                  <li>• Beyaz arka plan zorunlu</li>
                  <li>• Net aydınlatma gerekli</li>
                  <li>• Gözlük takılabilir (cam yansıması olmamalı)</li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Kullanım Alanları</h3>
                <p className="text-gray-600 mb-4">
                  Ehliyet fotoğrafınızı birçok resmi işlemde kullanabilirsiniz:
                </p>
                <ul className="space-y-2 text-gray-600">
                  <li>• Sürücü belgesi başvurusu</li>
                  <li>• Ehliyet yenileme işlemleri</li>
                  <li>• Uluslararası sürücü belgesi</li>
                  <li>• Araç kiralama işlemleri</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}