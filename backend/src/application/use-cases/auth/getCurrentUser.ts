import { injectable } from 'tsyringe';
import { IGetCurrentUser } from '../../../domain/use-cases/auth/IGetCurrentUser';
import { IUser } from '../../../domain/entities/IUser';

@injectable()
export class GetCurrentUser implements IGetCurrentUser {
    async execute(user: IUser): Promise<IUser> {
        return user;
    }
}
