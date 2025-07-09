import * as Effect from "effect/Effect";
import { Todo } from "./todoTypes";

export type TodoState = Todo[];

export const initialTodos: TodoState = [];

const STORAGE_KEY = "todo-effect-todos";

export const saveTodos = (todos: TodoState): Effect.Effect<void, never> =>
  Effect.sync(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
  });

export const loadTodos = (): Effect.Effect<TodoState, never> =>
  Effect.sync(() => {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    try {
      return JSON.parse(raw) as TodoState;
    } catch {
      return [];
    }
  });

export const addTodo = (
  todos: TodoState,
  text: string
): Effect.Effect<TodoState, string> =>
  text.trim()
    ? Effect.succeed([
        ...todos,
        { id: crypto.randomUUID(), text, completed: false },
      ])
    : Effect.fail("Todo text cannot be empty");

export const toggleTodo = (
  todos: TodoState,
  id: string
): Effect.Effect<TodoState, string> =>
  Effect.sync(() => {
    const idx = todos.findIndex((t) => t.id === id);
    if (idx === -1) throw "Todo not found";
    return todos.map((t, i) =>
      i === idx ? { ...t, completed: !t.completed } : t
    );
  });

export const removeTodo = (
  todos: TodoState,
  id: string
): Effect.Effect<TodoState, string> =>
  Effect.sync(() => {
    if (!todos.some((t) => t.id === id)) throw "Todo not found";
    return todos.filter((t) => t.id !== id);
  });

export const clearCompleted = (
  todos: TodoState
): Effect.Effect<TodoState, never> =>
  Effect.succeed(todos.filter((t) => !t.completed));
