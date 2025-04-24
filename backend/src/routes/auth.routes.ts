import express from 'express';
import * as authController from '../controllers/auth.controller';
import { protect } from '../middlewares/auth.middleware';

const router = express.Router();

router.post('/signup', authController.signup);
router.post('/login', authController.login);

router.use(protect);
router.get('/me', authController.getCurrentUser);

export default router;