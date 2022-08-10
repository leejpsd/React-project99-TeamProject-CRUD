import { configureStore } from "@reduxjs/toolkit";
import todos from "../modules/todos";
import coment from "../modules/coment";

const store = configureStore({
  reducer: { todos, coment },
});

export default store;
