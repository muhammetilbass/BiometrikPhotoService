import { useState, useCallback } from 'react';
import { ApiError } from '../errors/ApiError';

interface ErrorState {
  message: string;
  code?: string;
  isVisible: boolean;
}

export function useErrorHandler() {
  const [error, setError] = useState<ErrorState>({
    message: '',
    isVisible: false
  });

  const handleError = useCallback((err: unknown) => {
    let message = 'Bir hata oluştu';
    let code: string | undefined;

    if (err instanceof ApiError) {
      message = err.message;
      code = err.code;
    } else if (err instanceof Error) {
      message = err.message;
    }

    setError({
      message,
      code,
      isVisible: true
    });

    // 5 saniye sonra hata mesajını otomatik olarak kaldır
    setTimeout(() => {
      setError(prev => ({ ...prev, isVisible: false }));
    }, 5000);
  }, []);

  const clearError = useCallback(() => {
    setError(prev => ({ ...prev, isVisible: false }));
  }, []);

  return { error, handleError, clearError };
} 