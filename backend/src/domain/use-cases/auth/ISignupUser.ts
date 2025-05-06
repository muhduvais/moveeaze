import { IUser } from "../../entities/IUser";

export interface SignupUserResponse {
    token: string;
    user: IUser;
}

export interface ISignupUser {
    execute(data: { name: string; email: string; password: string }): Promise<SignupUserResponse>;
}
