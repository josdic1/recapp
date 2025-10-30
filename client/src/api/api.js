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

export const getCategories = async () => {
  const response = await api.get('/categories');
  return response.data;
};

export const createCategory = async (name) => {
    const response = await api.post('/categories', { name });
    return response.data;
};

export const getRecipes = async (params = {}) => {
  const response = await api.get('/recipes', { params });
  return response.data;
};

export const getRecipe = async (id) => {
  try {
    const response = await api.get(`/recipes/${id}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to load recipe');
  }
};

export const createRecipe = async (data) => {
  const response = await api.post('/recipes', data);
  return response.data;
};

export const updateRecipe = async (recipe) => {
    const response = await api.patch(`/recipes/${recipe.id}`, recipe);  // ← CHANGE PUT TO PATCH
    return response.data;
};

export const deleteRecipe = async (id) => {
  const response = await api.delete(`/recipes/${id}`);
  return response.data;
};

export default api;