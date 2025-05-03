// src/components/TodoItem.jsx
function TodoItem({ todo, onDelete }) {
    return (
      <div className="bg-white shadow p-3 rounded flex justify-between items-center">
        <span>{todo.text}</span>
        <button onClick={() => onDelete(todo._id)} className="text-red-600 hover:text-red-800">Delete</button>
      </div>
    );
  }
  
  export default TodoItem;
  