import { Router } from "express";
import validateToken from "../middlewares/validateTokenMiddleware.js";
import validateMiddleware from "../middlewares/validateMiddleware.js";
import categorySchema from "../schemas/categorySchema.js";
import { createCategory, deleteCategory, getCategory, updateCategory } from "../controllers/categoryController.js";

const categoryRoutes = Router();

categoryRoutes.use(validateToken);

categoryRoutes.post('/categories/create', validateMiddleware(categorySchema), createCategory);
categoryRoutes.get('/categories/home', getCategory);
categoryRoutes.put('/categories/update/:id', updateCategory);
categoryRoutes.delete('/categories/delete/:id', deleteCategory);

export default categoryRoutes;