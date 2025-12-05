import mongoose from "mongoose"
import { DB_CONNECTION_STRING } from "./env/mongodb-connection";
import Product from "./models/Product";
import { products } from "./data/products";

const seedProduct = async () => {
    try {
        await mongoose.connect(DB_CONNECTION_STRING);    
        await Product.deleteMany();
        await Promise.all(products.map(async product => {
            return new Product(product).save();
        }));
        console.log("Product seeder executed successfully");
    } catch (error) {
        console.error("Ocurred either an error connecting to BD or deleting products or saving new ones: ", error);
        process.exit(1);
    }
    finally {
        await mongoose.disconnect();
        process.exit(0);
    }
}

seedProduct();