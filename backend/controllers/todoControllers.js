const { default: mongoose } = require("mongoose");
const Todos = require("../models/todos");

const allTodos = async (req, res) => {
  const user_id = req.user._id;
  const response = await Todos.find({ user_id }).sort({ createdAt: -1 });
  res.status(200).json(response);
};

const addTodo = async (req, res) => {
  const { name, complete } = req.body;
  if (!name) return res.status(401).json({ error: "No plan added " });

  try {
    const user_id = req.user._id;
    const exists = await Todos.findOne({ name });
    if (exists) return res.status(401).json({ error: "Todo already added" });
    const todo = await Todos.create({ name, complete, user_id });
    res.status(200).json(todo);
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
};

const deleteTodo = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).json({ mssg: "Invalid todo item" });

  const response = await Todos.findByIdAndDelete(id);

  if (!response) return res.status(401).json({ mssg: "no such workout" });
  res.status(200).json(response);
};

const updateTodo = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).json({ mssg: "Invalid todo item" });

  const response = await Todos.findByIdAndUpdate(id, { ...req.body });

  if (!response) return res.status(401).json({ mssg: "no such workout" });
  res.status(404).json(response);
};
module.exports = { allTodos, addTodo, deleteTodo, updateTodo };
