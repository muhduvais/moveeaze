import { IUser } from "../../entities/IUser";

export interface ILoginUser {
    execute(data: { email: string; password: string }): Promise<{ token: string; user: IUser }>;
}
