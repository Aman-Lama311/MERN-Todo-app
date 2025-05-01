import express from "express";
import {
  createTodo,
  deleteTodo,
  getTodos,
  updateTodo,
} from "../controllers/todoController.js";
import isAuthenticated from "../middleware/isAuthenticated.js";

const router = express.Router();

router.route("/").post(isAuthenticated, createTodo).get(getTodos);
router
  .route("/:todoId")
  .delete(isAuthenticated, deleteTodo)
  .put(isAuthenticated, updateTodo);

export default router;
