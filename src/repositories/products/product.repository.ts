import crypto from "crypto"

import { products } from "../../data/products";
import { ProductEntity } from "../../entities/product.entity";

export function getAllProductsRepository () {
    return products;
}

export function getProductByIdRepository (productId: string): ProductEntity | undefined {
    const productFound = products.find(product => product.id === productId);
    if (!productFound) return undefined;

    return productFound;
}

export function createProductRepository (newProduct: Omit<ProductEntity, 'id'>): ProductEntity {
    const myNewProduct: ProductEntity = { id: crypto.randomUUID(), ...newProduct };
    products.push(myNewProduct); // *
    return myNewProduct;
}

export function deleteProductByIdRepository (productId: string): boolean {
    const productIndex = products.findIndex(product => product.id === productId);
    if (productIndex === -1) return false;

    products.splice(productIndex, 1);
    return true;
}

export function updateProductRepository (productId: string, newValues : Partial<ProductEntity>): ProductEntity | undefined {
    const productFound = products.find(product => product.id === productId);

    if (!productFound) return undefined

    return Object.assign(productFound, newValues);
}