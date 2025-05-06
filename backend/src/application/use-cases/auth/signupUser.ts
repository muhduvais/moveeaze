import { inject, injectable } from 'tsyringe';
import { ISignupUser } from '../../../domain/use-cases/auth/ISignupUser';
import User from '../../../infrastructure/database/models/user-model';
import { AppError } from '../../../shared/errors/appError';
import { IJwtService } from '../../../domain/services/IJwtService';
import { IUser } from '../../../domain/entities/IUser';

@injectable()
export class SignupUser implements ISignupUser {
    constructor(
        @inject("IJwtService") private jwtService: IJwtService
    ) { }

    async execute({ name, email, password }: { name: string; email: string; password: string }): Promise<{ token: string; user: IUser }> {
        const existingUser = await User.findOne({ email });
        if (existingUser) throw new AppError('Email already in use', 400);

        const newUser = await User.create({ name, email, password });
        newUser.password = undefined;

        console.log('new user: ', newUser)

        const token = this.jwtService.sign({ id: newUser._id });

        return { token, user: newUser };
    }
}
