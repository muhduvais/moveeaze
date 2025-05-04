import axiosInstance from "../infrastructure/apiClient/axiosInstance";

export const loginApi = (email: string, password: string) =>
  axiosInstance.post('/api/auth/login', { email, password });

export const signupApi = (name: string, email: string, password: string) =>
  axiosInstance.post('/api/auth/signup', { name, email, password });

export const getCurrentUserApi = () =>
  axiosInstance.get('/api/auth/me');