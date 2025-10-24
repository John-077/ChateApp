import mongoose from 'mongoose';
import dotenv from "dotenv";

export const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI)
        console.log("MONGO CONNECTED:", conn.connection.host);
        
    } catch (error) {
        console.error('Error connection to MONGODB:', error);
        process.exit(1); // 1 status code means fail, 0 means success

        
    }
}