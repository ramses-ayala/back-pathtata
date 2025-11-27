import { ProductEntity } from "../../entities/product.entity";
import { createProductRepository, deleteProductByIdRepository, getAllProductsRepository, getProductByIdRepository, updateProductRepository } from "../../repositories/products/product.repository";
import { createProductSchema, updateProductSchema } from "../../test/helpers/schemas";
import Joi from "joi";


export function getAllProductsService (): ProductEntity[] {
    return getAllProductsRepository();
}

export function getProductByIdService (productId: string): ProductEntity | undefined {
    const product = getProductByIdRepository(productId);
    return product;
}

export function createProductService (incomingProduct: Omit<ProductEntity, 'id'>): ProductEntity | Joi.ValidationError {

    const myNewProduct = {  
        ...incomingProduct
    }
    const { error, value } = createProductSchema.validate(myNewProduct);
    if (error) throw error;

    return createProductRepository(value);
}

export function updateProductService (productId: string, incomingProduct: Partial<ProductEntity>): ProductEntity | Joi.ValidationError | undefined {
    const { error, value } = updateProductSchema.validate(incomingProduct);
    if (error) throw error;
    return updateProductRepository(productId, value);
}

export function deleteProductService (productId: string): boolean {
    return deleteProductByIdRepository(productId);
}