import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';

let mongoServer = null;

export const connectDB = async () => {
  try {
    const connUri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/satyam_portfolio';
    
    // Attempt standard MongoDB connection with a short timeout
    const options = {
      serverSelectionTimeoutMS: 2000,
    };

    await mongoose.connect(connUri, options);
    console.log(`[Database] Connected to MongoDB at: ${mongoose.connection.host}`);
  } catch (error) {
    console.warn(`[Database] Standard MongoDB connection failed (${error.message}). Initializing embedded in-memory MongoDB database...`);
    try {
      mongoServer = await MongoMemoryServer.create();
      const mongoUri = mongoServer.getUri();
      await mongoose.connect(mongoUri);
      console.log(`[Database] Connected to embedded MongoDB Memory Server at: ${mongoUri}`);
    } catch (memError) {
      console.error('[Database] Critical error initializing in-memory MongoDB:', memError.message);
    }
  }
};
