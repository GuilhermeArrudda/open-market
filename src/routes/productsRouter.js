import { Router } from "express";
import { deleteProducts, getProducts, postProducts, updateProducts } from "../controllers/productsController.js";
import validateMiddleware from "../middlewares/validateMiddleware.js";
import validateToken from "../middlewares/validateTokenMiddleware.js";
import productSchema from "../schemas/productSchema.js";

const productsRouter = Router();

productsRouter.use(validateToken);

productsRouter.post('/products/create', validateMiddleware(productSchema), postProducts);
productsRouter.get('/products/home', getProducts);
productsRouter.put('/products/update/:id', updateProducts);
productsRouter.delete('/products/delete/:id', deleteProducts);

export default productsRouter;