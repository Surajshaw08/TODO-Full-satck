const mongoose = require('mongoose');
const Todo = require('../Model/todo');

// Create a new todo
exports.createTodo = async (req, res) => {
  const { title, description } = req.body;

  if (!title || !description) {
    return res.status(400).json({ message: 'Title and description are required' });
  }

  try {
    const todo = new Todo({
      userId: req.user._id,
      title,
      description
    });

    await todo.save();
    res.status(201).json(todo);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to create todo' });
  }
};

// Get all todos for current user with optional pagination
exports.getTodos = async (req, res) => {
  const { page = 1, limit = 10 } = req.query;

  try {
    const todos = await Todo.find({ userId: req.user._id })
      .skip((page - 1) * limit)
      .limit(Number(limit))
      .sort({ createdAt: -1 });

    res.status(200).json(todos);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to fetch todos' });
  }
};

// Update a todo
exports.updateTodo = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: 'Invalid todo ID' });
  }

  try {
    const todo = await Todo.findOneAndUpdate(
      { _id: id, userId: req.user._id },
      req.body,
      { new: true }
    );

    if (!todo) return res.status(404).json({ message: 'Todo not found' });

    res.status(200).json(todo);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to update todo' });
  }
};

// Delete a todo
exports.deleteTodo = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: 'Invalid todo ID' });
  }

  try {
    const todo = await Todo.findOneAndDelete({
      _id: id,
      userId: req.user._id
    });

    if (!todo) return res.status(404).json({ message: 'Todo not found' });

    res.status(200).json({ message: 'Todo deleted' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to delete todo' });
  }
};
