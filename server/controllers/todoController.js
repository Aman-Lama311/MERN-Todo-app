import { Todo } from "../models/Todo.js";

export const createTodo = async (req, res) => {
  try {
    const { title, description } = req.body;
    if (!title || !description) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }
    const todo = await Todo.create({ title, description });
    return res.status(201).json({
      success: true,
      message: "Todo created successfully",
      todo,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getTodos = async (req, res) => {
  try {
    const todos = await Todo.find();
    console.log(todos);
    return res.status(200).json({
      success: true,
      todos,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const deleteTodo = async (req, res) => {
  try {
    const todoId = req.params.todoId;
    await Todo.findByIdAndDelete(todoId);
    return res.status(200).json({
      success: true,
      message: "Todo deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const updateTodo = async (req, res) => {
  try {
    const todoId = req.params.todoId;
    const { title, description } = req.body;
    await Todo.findByIdAndUpdate(todoId, { title, description }, { new: true });
    return res.status(200).json({
      success: true,
      message: "Todo updated successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
