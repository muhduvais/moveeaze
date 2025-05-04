import axiosInstance from "../infrastructure/apiClient/axiosInstance";

export const loginApi = (email: string, password: string) =>
  axiosInstance.post('/auth/login', { email, password });

export const signupApi = (name: string, email: string, password: string) =>
  axiosInstance.post('/auth/signup', { name, email, password });

export const getCurrentUserApi = () =>
  axiosInstance.get('/auth/me');