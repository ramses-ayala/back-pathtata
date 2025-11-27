import { Request, Response } from "express"
import { createProductService, deleteProductService, getAllProductsService, getProductByIdService, updateProductService } from "../../services/products/product.service"
import Joi from "joi";

export const getAllProductsController = (_: Request, res: Response) => {
    try {
        const products = getAllProductsService();
        res.status(200).json({
            data: products
        });    
    } catch (error) {
        console.error("Occured an error getting all products: ", error);
    }
}

export const getProductByIdController = (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        const product = getProductByIdService(id);
        if (!product) {
            res.status(404).json({
                error: "Product not found"
            });
            return;
        }

        res.status(200).json({
            data: product
        });
    } catch (error) {
        res.status(500).json({
            error
        });
    }
}

export const createProductController = (req: Request, res: Response) => {
    const { title, description, price } = req.body;

    const product = {
        title,
        description,
        price
    };

    try {
        const createdProduct = createProductService(product);
        res.status(201).json({ 
            data: createdProduct
        });
    } catch (error) {
        const myError = error as Joi.ValidationError;
        if (myError.isJoi) {
            res.status(400).json({
                error: myError.details
            });
            return;
        }
        res.status(500).json({
            error
        });
    }
}

export const updateProductController = (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const updatedProduct = updateProductService(id, req.body);
        if (!updatedProduct) {
            res.status(404).json({
                error: "Product not found"
            });
            return;
        }

        res.status(200).json({
            data: updatedProduct
        });
    } catch (error) {
        const myError = error as Joi.ValidationError;
        if (myError.isJoi) {
            res.status(400).json({
                error: myError.details
            });
            return;
        }
        res.status(500).json({
            error
        })
    }
}

export const deleteProductController = (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const wasDeletedProduct = deleteProductService(id);
        if (!wasDeletedProduct) {
            res.status(404).json({
                error: "Product not found"
            })
            return;
        }

        res.status(200).json({
            message: "deleted successfully"
        });
    } catch (error) {
        console.error("Occured an error deleting product: ", error);
        res.status(500).json({
            error
        })
    }
}