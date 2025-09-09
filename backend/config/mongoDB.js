import mongoose from "mongoose";
import { MONGO_URI } from "./env.js";

const connectDB = async() => {
    try {
        await mongoose.connect(MONGO_URI)
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
        process.exit(1);
    }
};

export default connectDB;
