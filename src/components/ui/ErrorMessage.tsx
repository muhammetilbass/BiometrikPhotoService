import React from 'react';
import { XMarkIcon } from '@heroicons/react/24/outline';

interface ErrorMessageProps {
  message: string;
  code?: string;
  onClose?: () => void;
}

export function ErrorMessage({ message, code, onClose }: ErrorMessageProps) {
  return (
    <div className="fixed top-4 right-4 z-50">
      <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-lg shadow-lg">
        <div className="flex items-start">
          <div className="flex-shrink-0">
            <svg
              className="h-5 w-5 text-red-500"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <div className="ml-3">
            <h3 className="text-sm font-medium text-red-800">
              {code ? `Hata (${code})` : 'Hata'}
            </h3>
            <p className="text-sm text-red-700 mt-1">{message}</p>
          </div>
          {onClose && (
            <button
              onClick={onClose}
              className="ml-auto pl-3"
            >
              <XMarkIcon className="h-5 w-5 text-red-500" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
} 