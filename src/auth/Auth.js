// auth/authService.js
import axios from 'axios';

const API_BASE_URL = 'https://api.escuelajs.co/api/v1';

export const login = async (email, password) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/auth/login`, {
      email,
      password,
    });

    if (response.data.access_token) {
      // Authentication successful, store access token in localStorage or a state management solution
      localStorage.setItem('accessToken', response.data.access_token);
      return true;
    }
  } catch (error) {
    console.error('Login failed:', error);
  }

  return false;
};


export const logout = () => {
  localStorage.removeItem('accessToken');
};


export const isAuthenticated = () => {
  // Check if the user is authenticated based on the presence of the access token
  const accessToken = localStorage.getItem('accessToken');
  return !!accessToken;
};
