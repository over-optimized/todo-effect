import * as Effect from "effect/Effect";
import { useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import * as TodoEffects from "./todoEffects";
import { Todo } from "./todoTypes";

type Filter = "all" | "active" | "completed";

const App = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [input, setInput] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState<Filter>("all");

  // Load todos from localStorage on mount
  useEffect(() => {
    Effect.runPromise(TodoEffects.loadTodos()).then(setTodos);
  }, []);

  // Save todos to localStorage whenever they change
  useEffect(() => {
    Effect.runPromise(TodoEffects.saveTodos(todos));
  }, [todos]);

  const handleAdd = () => {
    Effect.runPromise(TodoEffects.addTodoAsync(todos, input)).then(
      (newTodos) => {
        setTodos(newTodos);
        setInput("");
        setError(null);
      },
      (err) => setError(err)
    );
  };

  const handleToggle = (id: string) => {
    Effect.runPromise(TodoEffects.toggleTodoAsync(todos, id)).then(setTodos);
  };

  const handleRemove = (id: string) => {
    Effect.runPromise(TodoEffects.removeTodoAsync(todos, id)).then(setTodos);
  };

  const handleClearCompleted = () => {
    Effect.runPromise(TodoEffects.clearCompletedAsync(todos)).then(setTodos);
  };

  const filteredTodos =
    filter === "all"
      ? todos
      : filter === "active"
      ? todos.filter((t) => !t.completed)
      : todos.filter((t) => t.completed);

  return (
    <div className="max-w-md mx-auto mt-10 font-sans bg-white shadow-lg rounded-lg p-6">
      <h1 className="text-2xl font-bold mb-6 text-center text-blue-700">
        Todo List (Effect)
      </h1>
      <div className="flex gap-2 mb-2">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Add a todo"
          className="flex-1 px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <button
          onClick={handleAdd}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          Add
        </button>
      </div>
      {error && <div className="text-red-600 mb-2 text-sm">{error}</div>}
      <div className="flex gap-2 mb-4 items-center">
        <button
          onClick={() => setFilter("all")}
          className={`px-3 py-1 rounded ${
            filter === "all"
              ? "bg-blue-600 text-white"
              : "bg-gray-200 text-gray-700"
          }`}
        >
          All
        </button>
        <button
          onClick={() => setFilter("active")}
          className={`px-3 py-1 rounded ${
            filter === "active"
              ? "bg-blue-600 text-white"
              : "bg-gray-200 text-gray-700"
          }`}
        >
          Active
        </button>
        <button
          onClick={() => setFilter("completed")}
          className={`px-3 py-1 rounded ${
            filter === "completed"
              ? "bg-blue-600 text-white"
              : "bg-gray-200 text-gray-700"
          }`}
        >
          Completed
        </button>
        <button
          onClick={handleClearCompleted}
          className="ml-auto px-3 py-1 rounded bg-red-500 text-white hover:bg-red-600 disabled:bg-gray-300 disabled:text-gray-500 transition"
          disabled={!todos.some((t) => t.completed)}
        >
          Clear Completed
        </button>
      </div>
      <ul className="mt-2 p-0 list-none divide-y divide-gray-200">
        {filteredTodos.map((todo) => (
          <li key={todo.id} className="flex items-center gap-2 py-2 group">
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => handleToggle(todo.id)}
              className="accent-blue-600 w-4 h-4"
            />
            <span
              className={`flex-1 ${
                todo.completed ? "line-through text-gray-400" : "text-gray-800"
              }`}
            >
              {todo.text}
            </span>
            <button
              onClick={() => handleRemove(todo.id)}
              className="ml-auto px-2 py-1 rounded bg-gray-200 text-gray-700 hover:bg-red-500 hover:text-white transition"
            >
              Remove
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

const root = ReactDOM.createRoot(document.getElementById("root")!);
root.render(<App />);
