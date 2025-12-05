import mongoose from "mongoose";
import { ProductEntity } from "../entities/product.entity";

type fd = Omit<ProductEntity, 'id'>
const productSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true }
});

const Product = mongoose.model<Omit<ProductEntity, 'id'>>("Product", productSchema);
export default Product;