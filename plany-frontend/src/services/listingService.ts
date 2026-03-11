import apiClient from './api';

export interface Listing {
  id: number;
  referenceNumber: string;
  councilName: string;
  status: string;
  address: string;
  description: string;
  decisionDate: string;
}

export const listingService = {
  getAll: async () => {
    const response = await apiClient.get<Listing[]>('/listings');
    return response.data;
  },
  
  search: async (params: { keyword?: string; status?: string; councilId?: number }) => {
    const response = await apiClient.get<Listing[]>('/listings/search', { params });
    return response.data;
  },

  getById: async (id: number) => {
    const response = await apiClient.get<Listing>(`/listings/${id}`);
    return response.data;
  }
};
