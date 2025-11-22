import Task from "../models/Task.js";

//Create
export async function createTask(req, res) {
  const { task } = req.body;
  if (!task) {
    return res.status(400).json({ Error: "Task is required" });
  }
  try {
    const newTask = await Task.create({task});
    return res.status(201).json(newTask);
  } catch (error) {
    return res.status(500).json({ Error: "Error creating the task" });
  }
}

//Read
export async function readTask(req, res) {
  try {
    const getTask = await Task.find();
    res.status(200).json(getTask);
  } catch (error) {
    return res.status(500).json({ Error: error.message });
  }
}

//Update
export async function updateTask(req, res) {
  const { task } = req.body;
  const { id } = req.params;
  if (!task) {
    return res.status(400).json({ Error: "Task is required" });
  }
  try {
    const updatedTask = await Task.findByIdAndUpdate(
      id,
      { task },
      { new: true }
    );
    if (!updatedTask) {
      return res.status(404).json({ Error: "Task not found" });
    }
    return res.status(200).json(updatedTask);
  } catch (error) {
    return res.status(500).json({ Error: error.message });
  }
}

//Delete
export async function deleteTask(req, res) {
  const { id } = req.params;

  try {
    const deletedTask = await Task.findByIdAndDelete(id);
    if (!deletedTask) {
      return res.status(404).json({ Error: "Task not found" });
    }
    return res.status(200).json(deletedTask);
  } catch (error) {
    return res.status(500).json({ Error: error.message });
  }
}
