import { Router } from 'express';
import { createProductController, getAllProductsController, getProductByIdController, deleteProductController, updateProductController } from './controllers/products/products.controller';
import { registerController } from './controllers/auth/register.controller';
import { loginController } from './controllers/auth/login.controller';
import { tokenValidator } from './middlewares/tokenValidator';
import { isAdmin } from './middlewares/isAdmin';
import { checkHealthServer } from './controllers/health/health.controller';

const routes = Router();

routes.get("/products", tokenValidator, getAllProductsController);
routes.get("/products/:id", tokenValidator, getProductByIdController);
routes.get("/health", checkHealthServer);
routes.post("/auth/register", registerController);
routes.post("/auth/login", loginController)
routes.post("/products", tokenValidator, createProductController);
routes.put("/products/:id", tokenValidator, updateProductController);
routes.delete("/products/:id", tokenValidator, isAdmin, deleteProductController);

export { routes };