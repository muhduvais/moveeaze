import { IUser } from "../IUser";

export interface SignupResponse {
    status: string;
    token: string;
    user: IUser
  }
  
  export interface LoginResponse {
    status: string;
    token: string;
    user: IUser
  }
  
  export interface CurrentUserResponse {
    status: string;
    user: IUser
  }