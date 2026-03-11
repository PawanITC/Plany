import apiClient from './api';

export interface Council {
  id: number;
  name: string;
  region: string;
  isActive: boolean;
}

export const councilService = {
  getAll: async () => {
    const response = await apiClient.get<Council[]>('/councils');
    return response.data;
  }
};
