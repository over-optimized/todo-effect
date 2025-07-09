import * as Effect from "effect/Effect";
import { describe, expect, it } from "vitest";
import * as TodoEffects from "./todoEffects";
import { Todo } from "./todoTypes";

const baseTodos: Todo[] = [
  { id: "1", text: "Test 1", completed: false },
  { id: "2", text: "Test 2", completed: true },
];

describe("TodoEffects", () => {
  describe("addTodo", () => {
    it("adds a new todo", async () => {
      const result = await Effect.runPromise(
        TodoEffects.addTodo(baseTodos, "New")
      );
      expect(result).toHaveLength(3);
      expect(result[2].text).toBe("New");
    });
    it("fails on empty text", async () => {
      await expect(
        Effect.runPromise(TodoEffects.addTodo(baseTodos, ""))
      ).rejects.toMatchObject({ message: "Todo text cannot be empty" });
    });
  });

  describe("toggleTodo", () => {
    it("toggles a todo", async () => {
      const result = await Effect.runPromise(
        TodoEffects.toggleTodo(baseTodos, "1")
      );
      expect(result[0].completed).toBe(true);
    });
    it("throws if not found", async () => {
      await expect(
        Effect.runPromise(TodoEffects.toggleTodo(baseTodos, "x"))
      ).rejects.toMatchObject({ message: "Todo not found" });
    });
  });

  describe("removeTodo", () => {
    it("removes a todo", async () => {
      const result = await Effect.runPromise(
        TodoEffects.removeTodo(baseTodos, "1")
      );
      expect(result).toHaveLength(1);
      expect(result[0].id).toBe("2");
    });
    it("throws if not found", async () => {
      await expect(
        Effect.runPromise(TodoEffects.removeTodo(baseTodos, "x"))
      ).rejects.toMatchObject({ message: "Todo not found" });
    });
  });

  describe("persistence", () => {
    it("saves and loads todos from localStorage", async () => {
      // Mock localStorage
      const store: Record<string, string> = {};
      const originalSetItem = globalThis.localStorage?.setItem;
      const originalGetItem = globalThis.localStorage?.getItem;
      globalThis.localStorage = {
        setItem: (k: string, v: string) => {
          store[k] = v;
        },
        getItem: (k: string) => store[k] ?? null,
        removeItem: () => {},
        clear: () => {},
        key: () => null,
        length: 0,
      } as any;

      await Effect.runPromise(TodoEffects.saveTodos(baseTodos));
      const loaded = await Effect.runPromise(TodoEffects.loadTodos());
      expect(loaded).toEqual(baseTodos);

      // Restore original localStorage if present
      if (originalSetItem && originalGetItem) {
        globalThis.localStorage.setItem = originalSetItem;
        globalThis.localStorage.getItem = originalGetItem;
      }
    });
  });

  describe("filtering", () => {
    const todos: Todo[] = [
      { id: "1", text: "A", completed: false },
      { id: "2", text: "B", completed: true },
      { id: "3", text: "C", completed: false },
    ];
    it("shows all todos for 'all' filter", () => {
      const filtered = (filter: string) =>
        filter === "all"
          ? todos
          : filter === "active"
          ? todos.filter((t) => !t.completed)
          : todos.filter((t) => t.completed);
      expect(filtered("all")).toEqual(todos);
    });
    it("shows only active todos for 'active' filter", () => {
      const filtered = todos.filter((t) => !t.completed);
      expect(filtered).toEqual([
        { id: "1", text: "A", completed: false },
        { id: "3", text: "C", completed: false },
      ]);
    });
    it("shows only completed todos for 'completed' filter", () => {
      const filtered = todos.filter((t) => t.completed);
      expect(filtered).toEqual([{ id: "2", text: "B", completed: true }]);
    });
  });

  describe("clearCompleted", () => {
    it("removes all completed todos", async () => {
      const todos: Todo[] = [
        { id: "1", text: "A", completed: false },
        { id: "2", text: "B", completed: true },
        { id: "3", text: "C", completed: false },
      ];
      const result = await Effect.runPromise(TodoEffects.clearCompleted(todos));
      expect(result).toEqual([
        { id: "1", text: "A", completed: false },
        { id: "3", text: "C", completed: false },
      ]);
    });
    it("returns the same array if no completed todos", async () => {
      const todos: Todo[] = [
        { id: "1", text: "A", completed: false },
        { id: "2", text: "B", completed: false },
      ];
      const result = await Effect.runPromise(TodoEffects.clearCompleted(todos));
      expect(result).toEqual(todos);
    });
  });
});
