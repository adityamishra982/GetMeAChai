"use server"
import mongoose from "mongoose";

const connectDB = async () => {
  try {
    //console.log(mongoose);
    //console.log(typeof mongoose.connect);
    const conn = await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
    });
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(error.message);
    //process.exit(1);
  }
};

export default connectDB;