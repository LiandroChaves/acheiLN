import { api } from './api';
import { Company } from '../types';

export const companyService = {
    async getAll(cityId: string, categoryId?: string) {
        const response = await api.get<Company[]>('/companies', {
            params: { cityId, categoryId }
        });
        return response.data;
    },

    async getById(id: string) {
        const response = await api.get<Company>(`/companies/${id}`);
        return response.data;
    }
};