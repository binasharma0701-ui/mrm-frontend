import axiosInstance from '../api/axiosInstance';

export const offerService = {
    getAllOffers: async () => {
        try {
            const response = await axiosInstance.get('/offers');
            return response.data;
        } catch (error) {
            console.error('Error fetching offers:', error);
            throw error;
        }
    }
};
