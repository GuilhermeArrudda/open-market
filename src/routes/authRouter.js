import { Router } from 'express';
import { signUp } from '../controllers/authController.js';
import { validateNewUser } from '../middlewares/newUserMiddleware.js';

const authRouter = Router();

authRouter.post('/sign-up', validateNewUser, signUp);

export default authRouter;