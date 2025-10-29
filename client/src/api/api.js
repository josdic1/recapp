// src/api/api.js
import axios from 'axios';

const API_BASE = '/api';

const api = axios.create({
  baseURL: API_BASE,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add request interceptor to log outgoing requests
api.interceptors.request.use(
  (config) => {
    console.log(`🌐 [API REQUEST] ${config.method.toUpperCase()} ${config.url}`, config.data || '');
    return config;
  },
  (error) => {
    console.error('❌ [API REQUEST ERROR]', error);
    return Promise.reject(error);
  }
);

// Add response interceptor to log responses
api.interceptors.response.use(
  (response) => {
    console.log(`✅ [API RESPONSE] ${response.config.method.toUpperCase()} ${response.config.url}`, response.data);
    return response;
  },
  (error) => {
    console.error(`❌ [API RESPONSE ERROR] ${error.config?.method?.toUpperCase()} ${error.config?.url}`, error.response?.data || error.message);
    return Promise.reject(error);
  }
);

// ==================== AUTH ====================

export const login = async (name, password) => {
  console.log('📤 [api.login] Preparing to send login request');
  const response = await api.post('/login', { name, password });
  console.log('📥 [api.login] Received response:', response.data);
  return response.data;
};

export const logout = async () => {
  console.log('📤 [api.logout] Preparing to send logout request');
  const response = await api.post('/logout');
  console.log('📥 [api.logout] Received response:', response.data);
  return response.data;
};

export const register = async (name, password) => {
  const response = await api.post('/register', { name, password });
  return response.data;
};

export const checkSession = async () => {
  console.log('📤 [api.checkSession] Checking session...');
  const response = await api.get('/check-session');
  console.log('📥 [api.checkSession] Session data:', response.data);
  return response.data;
};


// ==================== USERS ====================

export const getUsers = async () => {
  const response = await api.get('/users');
  return response.data;
};

export const getUser = async (id) => {
  const response = await api.get(`/users/${id}`);
  return response.data;
};

export const updateUser = async (id, data) => {
  const response = await api.patch(`/users/${id}`, data);
  return response.data;
};

export const deleteUser = async (id) => {
  const response = await api.delete(`/users/${id}`);
  return response.data;
};

// ==================== CATEGORIES ====================

export const getCategories = async () => {
  const response = await api.get('/categories');
  return response.data;
};

export const getCategory = async (id) => {
  const response = await api.get(`/categories/${id}`);
  return response.data;
};

export const createCategory = async (name) => {
  const response = await api.post('/categories', { name });
  return response.data;
};

export const updateCategory = async (id, name) => {
  const response = await api.patch(`/categories/${id}`, { name });
  return response.data;
};

export const deleteCategory = async (id) => {
  const response = await api.delete(`/categories/${id}`);
  return response.data;
};

// ==================== RECIPES ====================

export const getRecipes = async (params = {}) => {
  const response = await api.get('/recipes', { params });
  return response.data;
};

export const getRecipe = async (id) => {
  const response = await api.get(`/recipes/${id}`);
  return response.data;
};

export const createRecipe = async (data) => {
  const response = await api.post('/recipes', data);
  return response.data;
};

export const updateRecipe = async (id, data) => {
  const response = await api.patch(`/recipes/${id}`, data);
  return response.data;
};

export const deleteRecipe = async (id) => {
  const response = await api.delete(`/recipes/${id}`);
  return response.data;
};

export default api;