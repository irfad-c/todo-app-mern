import express from "express";
import Task from "../models/Task.js";

const router = express.Router();

//Create
router.post("/", async (req, res) => {
  const { task } = req.body;
  try {
    const newTask = await Task.create({ task });
    res.json(newTask);
  } catch (error) {
    res.status(500).json({ Error: error.message });
  }
});

//Read
router.get("/", async (req, res) => {
  try {
    const tasks = await Task.find();
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ Error: error.message });
  }
});

//Update
router.put("/:id", async (req, res) => {
  const { task } = req.body;
  try {
    const tasks = await Task.findByIdAndUpdate(
      req.params.id,
      { task },
      { new: true }
    );
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ Error: error.message });
  }
});

//Delete
router.delete("/:id", async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);
    res.json({ message: "Task deleted" });
  } catch (error) {
    res.status(500).json({ Error: error.message });
  }
});

export default router;
