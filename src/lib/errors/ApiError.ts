export class ApiError extends Error {
  constructor(
    public statusCode: number,
    message: string,
    public code?: string,
    public data?: any
  ) {
    super(message);
    this.name = 'ApiError';
  }

  static fromAxiosError(error: any): ApiError {
    if (error.response) {
      // Sunucu yanıtı ile dönen hata
      return new ApiError(
        error.response.status,
        error.response.data?.message || 'Sunucu hatası',
        error.response.data?.code,
        error.response.data
      );
    } else if (error.request) {
      // İstek yapıldı ama yanıt alınamadı
      return new ApiError(
        0,
        'Sunucuya ulaşılamıyor',
        'NETWORK_ERROR'
      );
    } else {
      // İstek oluşturulurken hata oluştu
      return new ApiError(
        0,
        error.message || 'Beklenmeyen bir hata oluştu',
        'UNKNOWN_ERROR'
      );
    }
  }
} 