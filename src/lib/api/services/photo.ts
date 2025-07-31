export interface PhotoUploadResponse {
  id: string;
  originalUrl: string;
  processedUrl: string;
  status: string;
  message?: string;
  error?: string;
}

export interface PhotoStatusResponse {
  id: string;
  status: string;
  originalUrl: string;
  processedUrl: string | null;
  error?: string;
}

export const photoService = {
  // Fotoğraf yükleme ve işleme (tek işlem)
  async uploadAndProcessPhoto(file: File, documentType: string = 'pasaport'): Promise<PhotoUploadResponse> {
    try {
      const formData = new FormData();
      formData.append('photo', file);
      formData.append('documentType', documentType);  // Belge tipini ekle
      
      console.log('PhotoService: Fotoğraf yükleniyor ve işleniyor...', {
        fileName: file.name,
        fileSize: file.size,
        documentType
      });
      
      // Relative URL kullan - apiClient yerine fetch
      const response = await fetch('/api/photos/upload', {
        method: 'POST',
        body: formData,
      });
      
      console.log('PhotoService: Response status:', response.status);
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ error: 'Bilinmeyen hata' }));
        throw new Error(errorData.error || `HTTP ${response.status}: ${response.statusText}`);
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

  // Geriye uyumluluk için eski method
  async uploadPhoto(file: File): Promise<PhotoUploadResponse> {
    return this.uploadAndProcessPhoto(file);
  },

  // Fotoğraf işleme (geriye uyumluluk için)
  async processPhoto(data: { id: string; documentType: string }): Promise<PhotoUploadResponse> {
    console.log('PhotoService: processPhoto çağrıldı, ancak artık upload sırasında işlem yapılıyor', data);
    
    // Bu method artık gereksiz çünkü upload sırasında işlem yapıyoruz
    // Ama geriye uyumluluk için mock response döndürüyoruz
    return {
      id: data.id,
      originalUrl: '',
      processedUrl: '',
      status: 'completed',
      message: 'İşlem upload sırasında tamamlandı'
    };
  },

  // Fotoğraf durumunu kontrol etme (şimdilik mock)
  async checkPhotoStatus(id: string): Promise<PhotoStatusResponse> {
    try {
      const response = await fetch(`/api/photos/status?id=${id}`);
      
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('PhotoService: Status check error:', error);
      throw error;
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