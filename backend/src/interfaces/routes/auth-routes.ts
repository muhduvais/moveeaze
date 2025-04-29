import { Router } from 'express';
import { protect } from '../middlewares/auth-middleware';
import { container } from '../../infrastructure/config/container';
import { IAuthController } from '../../domain/controllers/IAuthController';

const authRouter = Router();

const authController = container.resolve<IAuthController>("IAuthController");

authRouter.post('/signup', authController.signup);
authRouter.post('/login', authController.login);

authRouter.use(protect);
authRouter.get('/me', authController.getCurrentUser);

export default authRouter;