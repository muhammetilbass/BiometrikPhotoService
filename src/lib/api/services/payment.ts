import { apiClient } from '../client';

export interface PaymentResponse {
  id: string;
  status: string;
  url: string;
}

export const paymentService = {
  async createPayment(amount: number): Promise<PaymentResponse> {
    const response = await apiClient.post<PaymentResponse>('/api/payments', { amount });
    return response.data;
  },

  async checkPaymentStatus(id: string): Promise<PaymentResponse> {
    const response = await apiClient.get<PaymentResponse>(`/api/payments/${id}/status`);
    return response.data;
  }
}; 