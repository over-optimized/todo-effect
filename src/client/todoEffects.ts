import * as Effect from "effect/Effect";
import { Todo } from "./todoTypes";

export type TodoState = Todo[];

export const initialTodos: TodoState = [];

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
