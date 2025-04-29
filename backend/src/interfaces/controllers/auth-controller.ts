import { Request, Response, NextFunction } from 'express';
import { inject, injectable } from 'tsyringe';
import { IAuthController } from '../../domain/controllers/IAuthController';
import { ISignupUser } from '../../domain/use-cases/auth/ISignupUser';
import { ILoginUser } from '../../domain/use-cases/auth/ILoginUser';
import { IGetCurrentUser } from '../../domain/use-cases/auth/IGetCurrentUser';

@injectable()
export class AuthController implements IAuthController {
    constructor(
        @inject("ISignupUser") private signupUser: ISignupUser,
        @inject("ILoginUser") private loginUser: ILoginUser,
        @inject("IGetCurrentUser") private getCurrentUserUseCase: IGetCurrentUser
    ) { }

    async signup(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const result = await this.signupUser.execute(req.body);
            res.status(201).json({ status: 'success', ...result });
        } catch (err) {
            next(err);
        }
    }

    async login(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const result = await this.loginUser.execute(req.body);
            res.status(200).json({ status: 'success', ...result });
        } catch (err) {
            next(err);
        }
    }

    async getCurrentUser(req: Request, res: Response): Promise<void> {
        const result = await this.getCurrentUserUseCase.execute(req.user!);
        res.status(200).json({ status: 'success', data: { user: result } });
    }
}
