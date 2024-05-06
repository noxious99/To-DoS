const Todo = require("../models/posts");
const mongoose = require("mongoose")

const createTodo = async (req, res) => {
  const { title, body } = req.body;
  try {
    const todo = await Todo.create({ title, body });
    res.json(todo);
  } catch (err) {
    res.json({ err: err.message });
  }
};

const getTodos = async (req, res) => {
  const todos = await Todo.find({}).sort({createdAt: -1});
  res.json(todos);
};

const getTodo = async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: "ToDO not found!!" });
      }
    try {
      const todo = await Todo.findById(id);
      if (todo===null) {
        return res.status(404).json({ error: "ToDo not found!!" });
      }
      res.json(todo);
    } catch (err) {cd
      // Handle other errors, such as database connection issues
      res.status(500).json({ error: "Internal server error" });
    }
};

module.exports = {
  createTodo,
  getTodo,
  getTodos,
};
