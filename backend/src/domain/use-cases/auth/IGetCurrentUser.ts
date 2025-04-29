import { IUser } from "../../entities/IUser";

export interface IGetCurrentUser {
    execute(user: IUser): Promise<IUser>;
}
