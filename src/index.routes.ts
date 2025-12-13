import { Router } from 'express';
import { createProductController, getAllProductsController, getProductByIdController, deleteProductController, updateProductController } from './controllers/products/products.controller';

const routes = Router();

routes.get("/products", getAllProductsController);
routes.get("/products/:id", getProductByIdController);
routes.post("/products", createProductController);
routes.put("/products/:id", updateProductController);
routes.delete("/products/:id", deleteProductController);

export { routes };