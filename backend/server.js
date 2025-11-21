import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import taskListRoutes from "./routes/taskListRoutes.js";

const app = express();
dotenv.config();

//middleware
app.use(cors());
app.use(express.json());

//routes
app.use("/api/tasks", taskListRoutes);

try {
  mongoose.connect(process.env.MONGO_URI);
  console.log("MongoDB connected");
} catch (error) {
  console.log("Error connecting to DB",error)
}



//server
app.listen(5000, () => console.log("Server running on port localhost 5000"));
