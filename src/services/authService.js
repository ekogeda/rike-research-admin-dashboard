import axiosInstance from '../utils/axiosInstance';

const END_POINT = '/users';

export const registerUser = async (userData) => {
	try {
		const response = await axiosInstance.post(`${END_POINT}/register`, userData);
		return response.data;
	} catch (error) {
		throw error.response?.data?.message || 'Registration failed';
	}
};

export const loginUser = async (userData) => {
	try {
		const response = await axiosInstance.post(`${END_POINT}/login`, userData);
		return response.data;
	} catch (error) {
		throw error.response?.data?.message || 'Login failed';
	}
};
