const express = require('express');
const router = express.Router();
const {
  createTodo,
  getTodos,
  updateTodo,
  deleteTodo
} = require('../Controller/todoController');

const authMiddleware = require('../Middleware/authMiddleware');
const planLimiter = require('../Middleware/planLimiter');

// Protected routes - applies authMiddleware to all routes below this point
router.use(authMiddleware.auth);

// Get all todos for the authenticated user
router.get('/', getTodos);

// Create new todo (only if under the limit for free users)
router.post('/', planLimiter.planLimiter, createTodo);

// Update a todo by ID
router.put('/:id', updateTodo);

// Delete a todo by ID
router.delete('/:id', deleteTodo);

module.exports = router;
