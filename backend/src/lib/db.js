import mongoose from "mongoose";

export const connectDB = async () => {
  const url = process.env.MONGODB_URL;

  if (!url) {
    throw new Error("No url found on MongoDB. Kindly add one to env file");
  }

  try {
    if (mongoose.connection.readyState === 1) {
      console.log("MongoDB already connected");
      return mongoose.connection;
    }

    const conn = await mongoose.connect(url, {
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
      maxPoolSize: 10,
      minPoolSize: 2,
      retryWrites: true,
      retryReads: true,
    });

    console.log(`Connected to MongoDB: ${conn.connection.host}`);
    return conn;
  } catch (error) {
    console.error("Failed to connect to MongoDB:", error.message);
    process.exit(1);
  }
};
