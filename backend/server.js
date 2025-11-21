import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import taskListRoutes from "./routes/taskListRoutes.js"

const app = express();
dotenv.config();

//middleware
app.use(cors());
app.use(express.json());

//routes
app.use("/api/tasks",taskListRoutes);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

//server
app.listen(5000, () => console.log("Server running on port localhost 5000"));
