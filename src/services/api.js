import axios from 'axios';

const API_BASE_URL = 'https://api.escuelajs.co/api/v1';

export const fetchProducts = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/products`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const fetchProductById = async (productId) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/products/${productId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getAllProducts = ({ offset, limit }) => {
  return axios.get(`${API_BASE_URL}/products?offset=${offset}&limit=${limit}`);
};

export const filterProduct = async (categoryId, minPrice, maxPrice) =>{
  try{
    const response = await axios.get(`${API_BASE_URL}/products/?price_min=${minPrice}&price_max=${maxPrice}&categoryId=${categoryId}`);
    return response.data;
  }catch(error){
    throw error;
  }
}

