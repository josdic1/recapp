import axios from 'axios';

// Base URL for API calls (proxied through Vite)
const API_BASE = '/api';

// Create axios instance with credentials
const api = axios.create({
  baseURL: API_BASE,
  withCredentials: true, // Important for session cookies
  headers: {
    'Content-Type': 'application/json',
  },
});

// ==================== AUTH ====================

export const login = async (name, password) => {
  const response = await api.post('/login', { name, password });
  return response.data;
};

export const logout = async () => {
  const response = await api.post('/logout');
  return response.data;
};

export const register = async (name, password) => {
  const response = await api.post('/register', { name, password });
  return response.data;
};

export const checkSession = async () => {
  const response = await api.get('/check-session');
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