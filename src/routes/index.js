import { Router } from 'express';
import authRouter from './authRouter.js';
import categoryRoutes from './categoryRouter.js';
import productsRouter from './productsRouter.js';
import userRouter from './userRouter.js'

const router = Router();

router.use(userRouter)
router.use(authRouter)
router.use(productsRouter)
router.use(categoryRoutes)

export default router;