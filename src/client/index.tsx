import * as Effect from "effect/Effect";
import { useState } from "react";
import ReactDOM from "react-dom/client";
import * as TodoEffects from "./todoEffects";
import { Todo } from "./todoTypes";

const App = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [input, setInput] = useState("");
  const [error, setError] = useState<string | null>(null);

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
      <ul style={{ marginTop: 24, padding: 0, listStyle: "none" }}>
        {todos.map((todo) => (
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
