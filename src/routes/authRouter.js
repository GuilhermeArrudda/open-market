import { Router } from 'express';
import { signIn } from '../controllers/authController.js';
import validateMiddleware from '../middlewares/validateMiddleware.js';
import { loginSchema } from '../schemas/authSchema.js';

const authRouter = Router();

authRouter.post('/sign-in', validateMiddleware(loginSchema), signIn);

export default authRouter;