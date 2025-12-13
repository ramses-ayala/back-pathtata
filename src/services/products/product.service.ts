import { ProductEntity } from "../../entities/product.entity";
import { createProductRepository, getAllProductsRepository, getProductByIdRepository, deleteProductByIdRepository, updateProductRepository } from "../../repositories/products/product.repository";
import { createProductSchema, updateProductSchema } from "../../test/helpers/schemas";
import Joi from "joi";


export async function getAllProductsService (): Promise<ProductEntity[]> {
    return await getAllProductsRepository();
}

export async function getProductByIdService (productId: string): Promise<ProductEntity | null> {
    const product = await getProductByIdRepository(productId);
    return product;
}

export async function createProductService (incomingProduct: Omit<ProductEntity, 'id'>): Promise<ProductEntity | Joi.ValidationError> {

    const myNewProduct = {  
        ...incomingProduct
    }
    const { error, value } = createProductSchema.validate(myNewProduct);
    if (error) throw error;

    return await createProductRepository(value);
}

export async function updateProductService (productId: string, incomingProduct: Partial<ProductEntity>): Promise<ProductEntity | Joi.ValidationError | null> {
    const { error, value } = updateProductSchema.validate(incomingProduct);
    if (error) throw error;
    return await updateProductRepository(productId, value);
}

export async function deleteProductService (productId: string): Promise<boolean> {
    return await deleteProductByIdRepository(productId);
}