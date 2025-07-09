import { Effect } from "effect";

const main = Effect.sync(() => {
  console.log("Hello from todo-effect!");
});

Effect.runSync(main);
