// src/data/api.ts
import axios from 'axios';

const api = axios.create({
  baseURL: 'https://fakestoreapi.com/',
});

export const fetchProducts = () => api.get('/products');
export const fetchProductById = (id: number) => api.get(`/products/${id}`);
export const fetchCategories = () => api.get('/products/categories');
export const fetchCategoryProducts = (category: string) => api.get(`/products/category/${category}`);
export const fetchUser = (id: number) => api.get(`/users/${id}`);
