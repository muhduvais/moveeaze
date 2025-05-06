import { IUser } from "../../entities/IUser";

export interface LoginUserResponse {
    token: string;
    user: IUser;
}

export interface ILoginUser {
    execute(data: { email: string; password: string }): Promise<LoginUserResponse>;
}
