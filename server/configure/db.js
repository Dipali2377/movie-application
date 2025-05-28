import mongoose from "mongoose";

const MONGOURL = process.env.MONGOURL;

const connectDB = async (req, res) => {
  try {
    await mongoose.connect(
      MONGOURL || "mongodb+srv://dipalim680:movie@cluster0.armi0vl.mongodb.net/"
    );
    console.log("Connected to db successfully");
  } catch (error) {
    console.log("Failed to connect to DB", error);
  }
};

export default connectDB;
