import { IUser } from "../../infrastructure/database/models/user-model";

declare global {
    namespace Express {
        interface Request {
            user?: IUser;
        }
    }
}

export {};