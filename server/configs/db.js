import mongoose from "mongoose";

const connectDB = async () => {
  console.log("process.env.MONGODB_URI:", process.env.MONGODB_URI);
  try {
    mongoose.connection.on("connected", () =>
      console.log("Database connected")
    );
    await mongoose.connect(`${process.env.MONGODB_URI}/QuickShow`);
  } catch (error) {
    console.log(error.message);
  }
};

export default connectDB;
