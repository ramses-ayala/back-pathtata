import mongoose from "mongoose";
import { DB_CONNECTION_STRING } from "../env/mongodb-connection";

const connectDB = async () => {
    try {
        const connection = await mongoose.connect(DB_CONNECTION_STRING);
        console.log(`mongodb connected : ${connection.connection.host}`);
    } catch (error) {
        console.error("Occured an error connecting database: ",error);
        process.exit(1);
    }
}

export default connectDB;