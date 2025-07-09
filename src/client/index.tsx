import * as Effect from "effect/Effect";
import { useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
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
    Effect.runPromise(TodoEffects.addTodo(todos, input)).then(
      (newTodos) => {
        setTodos(newTodos);
        setInput("");
        setError(null);
      },
      (err) => setError(err)
    );
  };

  const handleToggle = (id: string) => {
    Effect.runPromise(TodoEffects.toggleTodo(todos, id)).then(setTodos);
  };

  const handleRemove = (id: string) => {
    Effect.runPromise(TodoEffects.removeTodo(todos, id)).then(setTodos);
  };

  const handleClearCompleted = () => {
    Effect.runPromise(TodoEffects.clearCompleted(todos)).then(setTodos);
  };

  const filteredTodos =
    filter === "all"
      ? todos
      : filter === "active"
      ? todos.filter((t) => !t.completed)
      : todos.filter((t) => t.completed);

  return (
    <div
      style={{ maxWidth: 400, margin: "2rem auto", fontFamily: "sans-serif" }}
    >
      <h1>Todo List (Effect)</h1>
      <div style={{ display: "flex", gap: 8 }}>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Add a todo"
          style={{ flex: 1 }}
        />
        <button onClick={handleAdd}>Add</button>
      </div>
      {error && <div style={{ color: "red", marginTop: 8 }}>{error}</div>}
      <div style={{ marginTop: 16, marginBottom: 8, display: "flex", gap: 8 }}>
        <button
          onClick={() => setFilter("all")}
          style={{ fontWeight: filter === "all" ? "bold" : undefined }}
        >
          All
        </button>
        <button
          onClick={() => setFilter("active")}
          style={{ fontWeight: filter === "active" ? "bold" : undefined }}
        >
          Active
        </button>
        <button
          onClick={() => setFilter("completed")}
          style={{ fontWeight: filter === "completed" ? "bold" : undefined }}
        >
          Completed
        </button>
        <button
          onClick={handleClearCompleted}
          style={{ marginLeft: "auto" }}
          disabled={!todos.some((t) => t.completed)}
        >
          Clear Completed
        </button>
      </div>
      <ul style={{ marginTop: 8, padding: 0, listStyle: "none" }}>
        {filteredTodos.map((todo) => (
          <li
            key={todo.id}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              marginBottom: 8,
            }}
          >
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => handleToggle(todo.id)}
            />
            <span
              style={{
                textDecoration: todo.completed ? "line-through" : undefined,
              }}
            >
              {todo.text}
            </span>
            <button
              onClick={() => handleRemove(todo.id)}
              style={{ marginLeft: "auto" }}
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
