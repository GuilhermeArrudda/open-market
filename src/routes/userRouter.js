import { Router } from 'express';
import { signUp } from '../controllers/authController.js';
import { singUpSchema } from '../schemas/authSchema.js';
import validateMiddleware from '../middlewares/validateMiddleware.js';

const userRouter = Router();

userRouter.post('/sign-up', validateMiddleware(singUpSchema), signUp);

export default userRouter;