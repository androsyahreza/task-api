const express = require("express");
const router = express.Router();
const taskController = require("../controllers/task.controller");

router.post("/tasks", taskController.addTask);
router.get("/tasks", taskController.viewTask);
router.get("/tasks/:id", taskController.viewTaskById);
router.patch("/tasks/:id", taskController.patchTask);
router.delete("/tasks/:id", taskController.deleteTask);

module.exports = router;