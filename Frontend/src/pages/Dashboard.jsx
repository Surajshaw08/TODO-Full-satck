// src/pages/Dashboard.jsx
import { useEffect, useState } from "react";
import axios from "../utils/axiosInstance";
import TodoItem from "../components/TodoItem";
import TodoForm from "../components/TodoForm";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const [todos, setTodos] = useState([]);
  const [plan, setPlan] = useState("Free");
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        setLoading(true);
        // Check if token exists in localStorage
        const token = localStorage.getItem("token");
        
        if (token) {
          setIsAuthenticated(true);
          const res = await axios.get("/todos");
          if (res.data && res.data.todos) {
            setTodos(res.data.todos);
            setPlan(res.data.plan || "Free");
          }
        } else {
          // User is not authenticated, but we still show the dashboard
          // with empty todos and free plan
          setIsAuthenticated(false);
          setTodos([]);
          setPlan("Free");
        }
      } catch (error) {
        console.error("Error fetching todos:", error);
        toast.error("Failed to load todos");
      } finally {
        setLoading(false);
      }
    };

    fetchTodos();
  }, []);

  const addTodo = async (text) => {
    if (!isAuthenticated) {
      toast.info("Please login to add todos");
      navigate("/login");
      return;
    }
    
    if (!text.trim()) {
      toast.warn("Todo text cannot be empty");
      return;
    }
    
    if (plan === "Free" && todos.length >= 5) {
      toast.warn("Free plan limit reached. Upgrade to add more todos.");
      return;
    }
    
    try {
      const res = await axios.post("/todos", { text });
      setTodos([...todos, res.data.todo]);
      toast.success("Todo added successfully");
    } catch (error) {
      console.error("Error adding todo:", error);
      toast.error("Failed to add todo");
    }
  };

  const deleteTodo = async (id) => {
    if (!isAuthenticated) {
      toast.info("Please login to manage todos");
      navigate("/login");
      return;
    }
    
    try {
      await axios.delete(`/todos/${id}`);
      setTodos(todos.filter((todo) => todo._id !== id));
      toast.success("Todo deleted successfully");
    } catch (error) {
      console.error("Error deleting todo:", error);
      toast.error("Failed to delete todo");
    }
  };

  if (loading) {
    return (
      <div className="max-w-lg mx-auto mt-8 text-center">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="max-w-lg mx-auto mt-8">
      <h2 className="text-2xl font-bold mb-4">Todo Dashboard</h2>
      
      {!isAuthenticated && (
        <div className="bg-blue-100 p-4 rounded mb-4">
          <p className="text-blue-800">
            Welcome to the Todo App! <a href="/login" className="underline font-bold">Login</a> or <a href="/signup" className="underline font-bold">Sign up</a> to start managing your todos.
          </p>
        </div>
      )}
      
      {isAuthenticated && (
        <p className="mb-4">Current Plan: <span className="font-semibold">{plan}</span></p>
      )}
      
      <TodoForm onAdd={addTodo} />
      
      {isAuthenticated ? (
        <div className="space-y-3 mt-4">
          {todos.length === 0 ? (
            <p className="text-center text-gray-500 my-4">No todos yet. Add one above!</p>
          ) : (
            todos.map((todo) => (
              <TodoItem key={todo._id} todo={todo} onDelete={deleteTodo} />
            ))
          )}
        </div>
      ) : (
        <div className="mt-6 space-y-3">
          <div className="border p-3 rounded bg-gray-50">
            <p className="font-medium">Example Todo 1</p>
            <p className="text-sm text-gray-600">This is a sample todo. Login to create your own!</p>
          </div>
          <div className="border p-3 rounded bg-gray-50">
            <p className="font-medium">Example Todo 2</p>
            <p className="text-sm text-gray-600">This is another sample todo.</p>
          </div>
        </div>
      )}
      
      {isAuthenticated && plan === "Free" && (
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600 mb-2">
            {5 - todos.length} todos remaining on free plan
          </p>
          <button
            onClick={() => navigate("/subscription")}
            className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded"
          >
            Upgrade to Premium
          </button>
        </div>
      )}
    </div>
  );
}

export default Dashboard;
