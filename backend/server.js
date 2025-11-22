import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import taskRoutes from "./routes/taskRoutes.js";

const app = express();
dotenv.config();

//middleware
app.use(cors());
app.use(express.json());

//routes
app.use("/api/tasks", taskRoutes);

async function connectDB() {
  try {
    mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected");
  } catch (error) {
    console.error("Error connecting to DB", error.message);
    process.exit(1);
  }
}
connectDB();

//server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port localhost ${PORT}`));
