"use client";

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Camera, X, Upload, FileImage, CreditCard, User, Briefcase, GraduationCap, Plane, Car } from 'lucide-react';

interface DocumentType {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  size: string;
  background: string;
}

const documentTypes: DocumentType[] = [
  {
    id: 'pasaport',
    name: 'Pasaport Fotoğrafı',
    description: 'ICAO standartlarına uygun',
    icon: <Plane className="w-8 h-8" />,
    color: 'text-blue-600',
    size: '50x60 mm',
    background: 'Açık Gri'
  },
  {
    id: 'kimlik',
    name: 'T.C. Kimlik Kartı Fotoğrafı',
    description: 'Nüfus müdürlüğü standartları',
    icon: <CreditCard className="w-8 h-8" />,
    color: 'text-red-600',
    size: '50x60 mm',
    background: 'Beyaz'
  },
  {
    id: 'ehliyet',
    name: 'Ehliyet Fotoğrafı',
    description: 'MEB standartlarına uygun',
    icon: <Car className="w-8 h-8" />,
    color: 'text-green-600',
    size: '50x60 mm',
    background: 'Beyaz'
  },

  {
    id: 'ogrenci',
    name: 'Öğrenci Kartı Fotoğrafı',
    description: 'Okul standartlarına uygun',
    icon: <GraduationCap className="w-8 h-8" />,
    color: 'text-indigo-600',
    size: '50x60 mm',
    background: 'Beyaz'
  },
  {
    id: 'osym',
    name: 'ÖSYM Sınav Fotoğrafı',
    description: 'YKS, AYT, TYT standartları',
    icon: <User className="w-8 h-8" />,
    color: 'text-orange-600',
    size: '50x60 mm',
    background: 'Beyaz'
  },
  {
    id: 'is-basvuru',
    name: 'İş Başvuru Fotoğrafı',
    description: 'Profesyonel görünüm',
    icon: <Briefcase className="w-8 h-8" />,
    color: 'text-teal-600',
    size: '50x60 mm',
    background: 'Beyaz'
  }
];

interface PhotoCreationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function PhotoCreationModal({ isOpen, onClose }: PhotoCreationModalProps) {
  const [selectedDocument, setSelectedDocument] = useState<DocumentType | null>(null);
  const [currentStep, setCurrentStep] = useState<'select' | 'upload' | 'process' | 'result'>('select');
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [processedImage, setProcessedImage] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setUploadedFile(file);
      setCurrentStep('process');
    }
  };

  const handleDocumentSelect = (document: DocumentType) => {
    setSelectedDocument(document);
    setCurrentStep('upload');
  };

  const handleProcessPhoto = async () => {
    if (!uploadedFile || !selectedDocument) return;

    setIsProcessing(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append('photo', uploadedFile);
      formData.append('document_type', selectedDocument.id);

      const response = await fetch('/api/photos/upload', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      if (result.processedUrl) {
        setProcessedImage(result.processedUrl);
        setCurrentStep('result');
      } else {
        throw new Error('İşlenmiş fotoğraf URL\'si alınamadı');
      }
    } catch (err) {
      console.error('Processing error:', err);
      setError('Fotoğraf işlenirken bir hata oluştu. Lütfen tekrar deneyin.');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDownload = () => {
    if (processedImage) {
      const link = document.createElement('a');
      link.href = processedImage;
      link.download = `${selectedDocument?.name || 'fotograf'}.jpg`;
      link.click();
    }
  };

  const resetModal = () => {
    setSelectedDocument(null);
    setCurrentStep('select');
    setUploadedFile(null);
    setProcessedImage(null);
    setIsProcessing(false);
    setIsCameraOpen(false);
    setError(null);
  };

  const handleClose = () => {
    resetModal();
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[9999] p-4 min-h-screen">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto mx-auto my-auto">
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b">
          <h2 className="text-2xl font-bold text-gray-900">
            {currentStep === 'select' && 'Bir belge seçin'}
            {currentStep === 'upload' && `${selectedDocument?.name} - Fotoğraf Yükle`}
            {currentStep === 'process' && 'Fotoğrafınızı İşleyin'}
            {currentStep === 'result' && 'Fotoğrafınız Hazır!'}
          </h2>
          <button
            onClick={handleClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-700">{error}</p>
            </div>
          )}

          {/* Step 1: Document Selection */}
          {currentStep === 'select' && (
            <div className="space-y-6">
              <div className="text-center mb-8">
                <h3 className="text-xl font-semibold mb-2">Biyometrik Fotoğraf Özellikleri</h3>
                <div className="flex justify-center space-x-8 text-sm text-gray-600">
                  <div className="text-center">
                    <div className="font-medium">Önce</div>
                    <div className="w-20 h-24 bg-gray-200 rounded mx-auto mt-2 flex items-center justify-center">
                      <User className="w-8 h-8 text-gray-400" />
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="font-medium">Sonrasında</div>
                    <div className="w-20 h-24 bg-blue-100 rounded mx-auto mt-2 flex items-center justify-center border-2 border-blue-300">
                      <User className="w-8 h-8 text-blue-600" />
                    </div>
                  </div>
                </div>
                <p className="mt-4 text-gray-600">Bütün çekilen fotoğraflar uluslararası ICAO standartlarına uygunluk.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {documentTypes.map((doc) => (
                  <div
                    key={doc.id}
                    onClick={() => handleDocumentSelect(doc)}
                    className="p-6 border-2 border-gray-200 rounded-lg hover:border-blue-400 hover:bg-blue-50 cursor-pointer transition-all duration-200 group"
                  >
                    <div className={`${doc.color} mb-4 group-hover:scale-110 transition-transform`}>
                      {doc.icon}
                    </div>
                    <h4 className="font-semibold text-lg mb-2">{doc.name}</h4>
                    <p className="text-sm text-gray-600 mb-3">{doc.description}</p>
                    <div className="text-xs text-gray-500">
                      <div>Boyut: {doc.size}</div>
                      <div>Arka plan: {doc.background}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Step 2: Photo Upload */}
          {currentStep === 'upload' && selectedDocument && (
            <div className="space-y-6">
              <div className="bg-blue-50 p-4 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className={selectedDocument.color}>
                    {selectedDocument.icon}
                  </div>
                  <div>
                    <h4 className="font-semibold">{selectedDocument.name}</h4>
                    <p className="text-sm text-gray-600">
                      Boyut: {selectedDocument.size} | Arka plan: {selectedDocument.background}
                    </p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Upload Area */}
                <div 
                  className="relative border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-blue-400 hover:bg-gradient-to-br hover:from-blue-50 hover:to-indigo-50 transition-all duration-300 group cursor-pointer"
                  onDragOver={(e) => {
                    e.preventDefault();
                    e.currentTarget.classList.add('border-blue-500', 'bg-blue-50');
                  }}
                  onDragLeave={(e) => {
                    e.preventDefault();
                    e.currentTarget.classList.remove('border-blue-500', 'bg-blue-50');
                  }}
                  onDrop={(e) => {
                    e.preventDefault();
                    e.currentTarget.classList.remove('border-blue-500', 'bg-blue-50');
                    const files = e.dataTransfer.files;
                    if (files.length > 0) {
                      setUploadedFile(files[0]);
                      setCurrentStep('process');
                    }
                  }}
                  onClick={() => document.getElementById('file-upload')?.click()}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <Upload className="w-16 h-16 text-gray-400 group-hover:text-blue-500 mx-auto mb-4 transition-colors duration-300 group-hover:scale-110" />
                  <h4 className="text-xl font-bold mb-2 group-hover:text-blue-600 transition-colors">Fotoğraf Yükle</h4>
                  <p className="text-sm text-gray-600 mb-6 group-hover:text-gray-700">
                    Fotoğrafınızı sürükleyip bırakın veya tıklayın
                  </p>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileSelect}
                    className="hidden"
                    id="file-upload"
                  />
                  <div className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform group-hover:scale-105 opacity-0 group-hover:opacity-100">
                    <Upload className="mr-2 h-4 w-4" />
                    Belge Seç
                  </div>
                </div>

                {/* Camera Option */}
                <div className="relative border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-green-400 hover:bg-gradient-to-br hover:from-green-50 hover:to-emerald-50 transition-all duration-300 group cursor-pointer" onClick={() => setIsCameraOpen(true)}>
                  <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 to-emerald-500/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <Camera className="w-16 h-16 text-gray-400 group-hover:text-green-500 mx-auto mb-4 transition-colors duration-300 group-hover:scale-110" />
                  <h4 className="text-xl font-bold mb-2 group-hover:text-green-600 transition-colors">Fotoğraf Çek</h4>
                  <p className="text-sm text-gray-600 mb-6 group-hover:text-gray-700">
                    Kameranızla anlık fotoğraf çekin
                  </p>
                  <div className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-full font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform group-hover:scale-105 opacity-0 group-hover:opacity-100">
                    <Camera className="mr-2 h-4 w-4" />
                    Kamera Aç
                  </div>
                </div>
              </div>

              <div className="flex justify-between">
                <Button
                  onClick={() => setCurrentStep('select')}
                  variant="outline"
                >
                  Geri
                </Button>
              </div>
            </div>
          )}

          {/* Step 3: Process Photo */}
          {currentStep === 'process' && uploadedFile && selectedDocument && (
            <div className="space-y-6">
              <div className="bg-blue-50 p-4 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className={selectedDocument.color}>
                    {selectedDocument.icon}
                  </div>
                  <div>
                    <h4 className="font-semibold">{selectedDocument.name}</h4>
                    <p className="text-sm text-gray-600">
                      Boyut: {selectedDocument.size} | Arka plan: {selectedDocument.background}
                    </p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold mb-3">Yüklenen Fotoğraf</h4>
                  <div className="border rounded-lg p-4">
                    <img
                      src={URL.createObjectURL(uploadedFile)}
                      alt="Yüklenen fotoğraf"
                      className="w-full h-64 object-cover rounded"
                    />
                    <p className="text-sm text-gray-600 mt-2">{uploadedFile.name}</p>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold mb-3">İşlem Detayları</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span>Belge Türü:</span>
                      <span className="font-medium">{selectedDocument.name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Boyut:</span>
                      <span className="font-medium">{selectedDocument.size}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Arka Plan:</span>
                      <span className="font-medium">{selectedDocument.background}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Çözünürlük:</span>
                      <span className="font-medium">300 DPI</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-between">
                <Button
                  onClick={() => setCurrentStep('upload')}
                  variant="outline"
                  disabled={isProcessing}
                >
                  Geri
                </Button>
                <Button
                  onClick={handleProcessPhoto}
                  disabled={isProcessing}
                  className="min-w-[120px]"
                >
                  {isProcessing ? (
                    <div className="flex items-center space-x-2">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>İşleniyor...</span>
                    </div>
                  ) : (
                    'Fotoğrafı İşle'
                  )}
                </Button>
              </div>
            </div>
          )}

          {/* Step 4: Result */}
          {currentStep === 'result' && processedImage && selectedDocument && (
            <div className="space-y-6">
              <div className="text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">Fotoğrafınız Başarıyla İşlendi!</h3>
                <p className="text-gray-600">Aşağıdan fotoğrafınızı indirebilirsiniz.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold mb-3">Orijinal Fotoğraf</h4>
                  <div className="border rounded-lg p-4">
                    <img
                      src={uploadedFile ? URL.createObjectURL(uploadedFile) : ''}
                      alt="Orijinal fotoğraf"
                      className="w-full h-64 object-cover rounded"
                    />
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold mb-3">İşlenmiş Fotoğraf</h4>
                  <div className="border rounded-lg p-4">
                    <img
                      src={processedImage}
                      alt="İşlenmiş fotoğraf"
                      className="w-full h-64 object-cover rounded"
                    />
                    <div className="mt-3 space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Boyut:</span>
                        <span>{selectedDocument.size}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Arka Plan:</span>
                        <span>{selectedDocument.background}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Çözünürlük:</span>
                        <span>300 DPI</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-between">
                <Button
                  onClick={resetModal}
                  variant="outline"
                >
                  Yeni Fotoğraf
                </Button>
                <Button
                  onClick={handleDownload}
                  className="bg-green-600 hover:bg-green-700"
                >
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  Fotoğrafı İndir
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Camera Modal */}
      {isCameraOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-[10000]">
          <div className="bg-white p-6 rounded-lg max-w-2xl w-full mx-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Fotoğraf Çek</h3>
              <button
                onClick={() => setIsCameraOpen(false)}
                className="p-2 hover:bg-gray-100 rounded-full"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="text-center text-gray-600">
              <Camera className="w-16 h-16 mx-auto mb-4 text-gray-400" />
              <p>Kamera özelliği yakında eklenecek...</p>
              <Button
                onClick={() => setIsCameraOpen(false)}
                className="mt-4"
              >
                Tamam
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}