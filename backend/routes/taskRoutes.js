import express from "express";

import {
  createTask,
  readTask,
  updateTask,
  deleteTask,
} from "../controllers/taskController.js";

const router = express.Router();

router.post("/", createTask);
router.get("/", readTask);
router.put("/:id", updateTask);
router.delete("/:id", deleteTask);

export default router;
