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
});
