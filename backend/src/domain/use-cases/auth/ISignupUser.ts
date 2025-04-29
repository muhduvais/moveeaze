import { IUser } from "../../entities/IUser";

export interface ISignupUser {
    execute(data: { name: string; email: string; password: string }): Promise<{ token: string; user: IUser }>;
}
