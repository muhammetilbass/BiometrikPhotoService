export interface PhotoUploadResponse {
  id: string;
  originalUrl: string;
  processedUrl: string;
  status: string;
  message?: string;
  error?: string;
}



export const photoService = {
  // Fotoğraf yükleme ve işleme (tek işlem)
  async uploadAndProcessPhoto(file: File, documentType: string = 'pasaport'): Promise<PhotoUploadResponse> {
    try {
      const formData = new FormData();
      formData.append('photo', file);
      formData.append('document_type', documentType);  // Belge tipini ekle
      
      console.log('PhotoService: Fotoğraf yükleniyor ve işleniyor...', {
        fileName: file.name,
        fileSize: file.size,
        documentType
      });
      
      // FormData doğrulaması
      if (!file || file.size === 0) {
        throw new Error('Geçerli bir fotoğraf dosyası seçiniz');
      }
      
      if (file.size > 5 * 1024 * 1024) { // 5MB limit
        throw new Error('Dosya boyutu 5MB\'dan küçük olmalıdır');
      }
      
      // Relative URL kullan - apiClient yerine fetch
      const response = await fetch('/api/photos/upload', {
        method: 'POST',
        body: formData,
      });
      
      console.log('PhotoService: Response status:', response.status);
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ message: 'Sunucu hatası' }));
        
        // Spesifik hata mesajları
        if (response.status === 400) {
          throw new Error(errorData.message || 'Geçersiz istek. Lütfen dosya formatını kontrol edin.');
        } else if (response.status === 413) {
          throw new Error('Dosya boyutu çok büyük. Maksimum 5MB olmalıdır.');
        } else if (response.status === 503) {
          throw new Error('Fotoğraf işleme servisi çalışmıyor. Lütfen daha sonra tekrar deneyin.');
        } else {
          throw new Error(errorData.message || errorData.error || `HTTP ${response.status}: ${response.statusText}`);
        }
      }
      
      const data = await response.json();
      console.log('PhotoService: Response data:', data);
      
      return data;
      
    } catch (error) {
      console.error('PhotoService: Upload error:', error);
      
      if (error instanceof Error) {
        // Network hatası
        if (error.message.includes('fetch')) {
          throw new Error('Sunucuya bağlantı kurulamıyor. Flask servisi çalışıyor mu?');
        }
        throw error;
      }
      
      throw new Error('Fotoğraf yükleme sırasında bilinmeyen bir hata oluştu');
    }
  },





  // API health check
  async checkHealth(): Promise<any> {
    try {
      const response = await fetch('/api/photos/upload', {
        method: 'GET',
      });
      
      if (!response.ok) {
        throw new Error(`Health check failed: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('PhotoService: Health check error:', error);
      throw error;
    }
  },

  // Fotoğraf indirme
  downloadPhoto: async (photoUrl: string): Promise<void> => {
    try {
      const response = await fetch(photoUrl);
      
      if (!response.ok) {
        throw new Error(`Download failed: ${response.status}`);
      }
      
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'processed-photo.jpg';
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (error) {
      console.error('PhotoService: Download error:', error);
      throw error;
    }
  },
};