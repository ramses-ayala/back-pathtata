import { wrap } from "@mikro-orm/core";
import { ProductEntity } from "../../entities/product.entity";
import { Product } from "../../models/Product";
import { getEntityManager } from '../../mikroOrmInit';


export async function getAllProductsRepository (): Promise<ProductEntity[]> {
    const entityManager = getEntityManager();
    const em = entityManager.fork();
    const allProducts = await em.find(Product, {});
    return allProducts
}



export async function getProductByIdRepository (productId: string): Promise<ProductEntity | null> {
    const entityManager = getEntityManager();
    const em = entityManager.fork();
    const productFound = await em.findOne(Product, { id: productId });

    if (!productFound) return null;

    return productFound
}

export async function createProductRepository (newProduct: Omit<ProductEntity, 'id'>): Promise<ProductEntity> {
    const { title, description, price } = newProduct;

    const myNewProduct = new Product(title, description, price);
    const entityManager = getEntityManager();
    const em = entityManager.fork();
    await em.persist(myNewProduct).flush();

    return myNewProduct;
}

export async function deleteProductByIdRepository (productId: string): Promise<boolean> {
    const entityManager = getEntityManager();
    const em = entityManager.fork();
    const response = await em.nativeDelete(Product, { id: productId });
    if (response) return true;
    return false;
}



export async function updateProductRepository (productId: string, newValues : Partial<ProductEntity>): Promise<ProductEntity | null> {
    const entityManager = getEntityManager();
    const em = entityManager.fork();
    const productFound = await em.findOne(Product, { id: productId });
    
    if (!productFound) return null;

    const updatedProduct = wrap(productFound).assign(newValues);
    await em.flush();
    return updatedProduct
}