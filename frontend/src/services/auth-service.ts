import { getCurrentUser, login, signup } from "../infrastructure/api/auth-api";
import { IAuthService } from "../domain/models/service/IAuthService";
import { LoginResponse, SignupResponse, CurrentUserResponse } from "../interfaces/apiResponses/authResponse";

export const authService: IAuthService = {

  async login(email: string, password: string): Promise<LoginResponse> {
    return await login(email, password);
  },
  async signup(name: string, email: string, password: string): Promise<SignupResponse> {
    return await signup(name, email, password);
  },
  async getCurrentUser(): Promise<CurrentUserResponse> {
    return await getCurrentUser();
  },
};
