import axios from 'axios';

const API_URL = `${import.meta.env.VITE_API_URL}/taxonomy`;

export const getAllTaxonomy = async () => {
	try {
		const response = await axios.get(API_URL);
		return response.data;
	} catch (error) {
		console.log('error: ', error);
		throw new Error('Error fetching taxonomies');
	}
};

export const getTaxonomyById = async (id) => {
	try {
		const response = await axios.get(`${API_URL}/${id}`);
		return response.data;
	} catch (error) {
		console.log('error: ', error);
		throw new Error(`Error fetching taxonomy with id ${id}`);
	}
};

export const createTaxonomy = async (taxonomyData) => {
	try {
		const response = await axios.post(API_URL, taxonomyData);
		return response.data;
	} catch (error) {
		console.log('error: ', error);
		throw new Error('Error creating taxonomy');
	}
};

export const updateTaxonomy = async (id, taxonomyData) => {
	try {
		const response = await axios.put(`${API_URL}/${id}`, taxonomyData);
		return response.data;
	} catch (error) {
		console.log('error: ', error);
		throw new Error(`Error updating taxonomy with id ${id}`);
	}
};

export const deleteTaxonomy = async (id) => {
	try {
		await axios.delete(`${API_URL}/${id}`);
	} catch (error) {
		console.log('error: ', error);
		throw new Error(`Error deleting taxonomy with id ${id}`);
	}
};
