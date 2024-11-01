import axiosInstance from '../utils/axiosInstance';

const END_POINT = '/equipment';

export const getAllEquipment = async () => {
	try {
		const response = await axiosInstance.get(END_POINT);
		return response.data;
	} catch (error) {
		throw error.response?.data?.message || 'Failed to fetch equipment';
	}
};

export const getEquipmentById = async (id) => {
	try {
		const response = await axiosInstance.get(`${END_POINT}/${id}`);
		return response.data;
	} catch (error) {
		throw error.response?.data?.message || 'Failed to fetch equipment details';
	}
};

export const createEquipment = async (equipmentData) => {
	try {
		const response = await axiosInstance.post(END_POINT, equipmentData);
		return response.data;
	} catch (error) {
		throw error.response?.data?.message || 'Failed to create equipment';
	}
};

export const updateEquipment = async (id, equipmentData) => {
	try {
		const response = await axiosInstance.put(`${END_POINT}/${id}`, equipmentData);
		return response.data;
	} catch (error) {
		throw error.response?.data?.message || 'Failed to update equipment';
	}
};

export const deleteEquipment = async (id) => {
	try {
		const response = await axiosInstance.delete(`${END_POINT}/${id}`);
		return response.data;
	} catch (error) {
		throw error.response?.data?.message || 'Failed to delete equipment';
	}
};
