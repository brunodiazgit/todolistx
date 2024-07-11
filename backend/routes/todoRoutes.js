/* eslint-disable no-undef */
const express = require("express");
const router = express.Router();
const TodoController = require("../controllers/todoController");


router.get("/prueba", TodoController.prueba);
router.post("/create", TodoController.createTask);
router.get("/tasks", TodoController.getTasks);
router.delete("/task/:id", TodoController.deleteOne);
router.delete("/tasks/", TodoController.deleteAll);
router.put("/task/:id", TodoController.editTask);

module.exports = router;
