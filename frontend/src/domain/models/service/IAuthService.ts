import { CurrentUserResponse, LoginResponse, SignupResponse } from "../../../interfaces/apiResponses/authResponse";

export interface IAuthService {
    login(email: string, password: string): Promise<LoginResponse>;
    signup(name: string, email: string, password: string): Promise<SignupResponse>;
    getCurrentUser(): Promise<CurrentUserResponse>;
}