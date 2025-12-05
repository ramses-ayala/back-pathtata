import { Request, Response } from "express"
import { createProductService, deleteProductService, getAllProductsService, getProductByIdService, updateProductService } from "../../services/products/product.service"
import Joi from "joi";

export const getAllProductsController = async (_: Request, res: Response) => {
    try {
        const products = await getAllProductsService();
        res.status(200).json({
            data: products
        });    
    } catch (error) {
        console.error("Occured an error getting all products: ", error);
        res.status(500).json({
            error
        });
    }
}

export const getProductByIdController = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const product = await getProductByIdService(id);
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

export const createProductController = async (req: Request, res: Response) => {
    const { title, description, price } = req.body;

    const product = {
        title,
        description,
        price
    };

    try {
        const createdProduct = await createProductService(product);
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

export const updateProductController = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const updatedProduct = await updateProductService(id, req.body);
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

export const deleteProductController = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const wasDeletedProduct = await deleteProductService(id);
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