import { configureStore } from "@reduxjs/toolkit";
import todos from "../modules/todos";
import comments from "../modules/comments";

const store = configureStore({
  reducer: { todos, comments },
});

export default store;
