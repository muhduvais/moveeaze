import { inject, injectable } from 'tsyringe';
import { ILoginUser } from '../../../domain/use-cases/auth/ILoginUser';
import User from '../../../infrastructure/database/models/user-model';
import { AppError } from '../../../shared/errors/appError';
import { IJwtService } from '../../../domain/services/IJwtService';

@injectable()
export class LoginUser implements ILoginUser {
    constructor(
        @inject("IJwtService") private jwtService: IJwtService

    ) { }

    async execute({ email, password }: { email: string; password: string }): Promise<{ token: string; user: any }> {
        if (!email || !password) throw new AppError('Please provide email and password', 400);

        const user = await User.findOne({ email }).select('+password');
        if (!user || !(await user.comparePassword(password))) {
            throw new AppError('Incorrect email or password', 401);
        }

        user.password = undefined;
        const token = this.jwtService.sign({ id: user._id });

        return { token, user };
    }
}
