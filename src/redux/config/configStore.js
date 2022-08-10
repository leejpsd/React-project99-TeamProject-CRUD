import { configureStore } from "@reduxjs/toolkit";
import comments from "../modules/comments"
import todos from "../modules/todos";

const store = configureStore({
  reducer: { todos: todos, comments: comments },
});

export default store;
