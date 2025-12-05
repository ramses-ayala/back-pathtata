import { Types } from "mongoose";
import { ProductEntity } from "../../entities/product.entity";
import Product from "../../models/Product";

export async function getAllProductsRepository (): Promise<ProductEntity[]> {
    const products = await Product.find().lean();
    return products.map(item => {
        return { id: item._id.toString(), title: item.title, description: item.description, price: item.price }
    });
}

export async function getProductByIdRepository (productId: string): Promise<ProductEntity | null> {
    const productFound = await Product.findOne({ "_id": productId }).lean();

    if (!productFound) return null;

    return {
        id: productFound._id.toString(),
        title: productFound.title,
        description: productFound.description,
        price: productFound.price
    }
}

export async function createProductRepository (newProduct: Omit<ProductEntity, 'id'>): Promise<ProductEntity> {

    const myNewProduct = new Product(newProduct);
    const response = await myNewProduct.save();

    return {
        id: response._id.toString(),
        title: response.title,
        description: response.description,
        price: response.price
    }
}

export async function deleteProductByIdRepository (productId: string): Promise<boolean> {
    const deletedProduct = await Product.deleteOne({ "_id": productId });
    if (deletedProduct.deletedCount === 0) return false
    return true
}

export async function updateProductRepository (productId: string, newValues : Partial<ProductEntity>): Promise<ProductEntity | null> {
    const productUpdated = await Product.findOneAndUpdate({ "_id": productId }, newValues, { new: true }).lean();
    
    if (!productUpdated) return null;

    return {
        id: productUpdated._id.toString(),
        title: productUpdated.title,
        description: productUpdated.description,
        price: productUpdated.price
    };
}