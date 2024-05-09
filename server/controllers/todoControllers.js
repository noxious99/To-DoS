const Todo = require("../models/posts");
const mongoose = require("mongoose");

const createTodo = async (req, res) => {
  const { title, body } = req.body;

  let emptyField = []

  if(!title)
  {
    emptyField.push('title')
  }
  if(!body)
  {
    emptyField.push('body')
  }
  if(emptyField.length > 0)
  {
    return res.status(400).json({error: "please fill all the fields!!", emptyField})
  }

  try {
    const user_id =  req.user._id
    const todo = await Todo.create({ title, body, user_id });
    return res.status(200).json(todo);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

const getTodos = async (req, res) => {
  const user_id = req.user._id
  const todos = await Todo.find({user_id}).sort({ createdAt: -1 });
  res.json(todos);
};

const getTodo = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "DATA not found!!" });
  }
  try {
    const todo = await Todo.findById(id);
    if (todo === null) {
      return res.status(404).json({ error: "DATA not found!!" });
    }
    res.json(todo);
  } catch (err) {
    cd;
    // Handle other errors, such as database connection issues
    res.status(500).json({ error: "Internal server error" });
  }
};

const deleteTodo = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "DATA not found!!" })
  }
  const todo = await Todo.findOneAndDelete({ _id: id })
  if (!todo) {
    return res.status(400).json({ error: "no such data!!" })
  }
  res.status(200).json(todo)
};

const updateTodo = async (req, res) => {
  const {id} = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "DATA not found!!" })
  }
  const todo = await Todo.findOneAndUpdate({ _id: id }, {
    ...req.body
  })
  if (!todo) {
    return res.status(400).json({ error: "no such data!!" })
  }
  res.status(200).json(todo)
}

module.exports = {
  createTodo,
  getTodo,
  getTodos,
  deleteTodo,
  updateTodo
};
