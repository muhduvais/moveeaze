import { CurrentUserResponse, LoginResponse, SignupResponse } from "../../interfaces/apiResponses/authResponse";
import axiosInstance from "../apiClient/axiosInstance";

export const login = async (email: string, password: string) => {
    const response = await axiosInstance.post<LoginResponse>('/api/auth/login', { email, password });
    return response.data;
};

export const signup = async (name: string, email: string, password: string) => {
    const response = await axiosInstance.post<SignupResponse>('/api/auth/signup', { name, email, password });
    return response.data;
};

export const getCurrentUser = async () => {
    const response = await axiosInstance.get<CurrentUserResponse>('/api/auth/me');
    return response.data;
};