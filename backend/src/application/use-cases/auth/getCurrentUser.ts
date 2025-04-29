import { injectable } from 'tsyringe';
import { IGetCurrentUser } from '../../../domain/use-cases/auth/IGetCurrentUser';

@injectable()
export class GetCurrentUser implements IGetCurrentUser {
    async execute(user: any): Promise<any> {
        return user;
    }
}
