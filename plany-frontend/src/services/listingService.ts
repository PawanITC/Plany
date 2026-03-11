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
  },

  triggerScrape: async (councilId: number): Promise<{ message: string, runId: string }> => {
    const response = await apiClient.post(`/listings/scrape/trigger/${councilId}`);
    return response.data;
  },

  processScrape: async (councilId: number, runId: string): Promise<{ message: string, savedListings: number }> => {
    const response = await apiClient.post(`/listings/scrape/process/${councilId}/${runId}`);
    return response.data;
  }
};
