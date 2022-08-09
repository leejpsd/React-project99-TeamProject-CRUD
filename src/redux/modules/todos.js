import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { notInitialized } from 'react-redux/es/utils/useSyncExternalStore';

export const __getTodos = createAsyncThunk(
  "todos/getTodos",
  async (payload, thunkAPI) => {
    try {
      const data = await axios.get("http://localhost:3001/todos");
      return thunkAPI.fulfillWithValue(data.data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const __postTodos = createAsyncThunk(
  "todos/postTodos",
  async (inputData, thunkAPI) => {
    try {
      const data = await axios.post("http://localhost:3001/todos", inputData);
    return thunkAPI.fulfillWithValue(data.data);
  } catch (error) {
  return thunkAPI.rejectWithValue(error);
}
  }
);

export const __deleteTodos = createAsyncThunk(
  "todos/deleteTodos",
  async (id, thunkAPI) => {
    try {
      await axios.delete(`http://localhost:3001/todos/${id}`);
      return thunkAPI.fulfillWithValue(id);
    } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
    }
  );

export const __editTodos = createAsyncThunk(
  "todos/editTodos",
  async (payload, thunkAPI) => {
    try {
      const data = await axios.patch(`http://localhost:3001/todos/${payload.id}`,{
        'title':`${payload.title}`,
        'body':`${payload.body}`
      })
      return thunkAPI.fulfillWithValue(data.data);
    } catch (error) {
    return thunkAPI.rejectWithValue(error);
  };
  }
);

const initialState = {
  todos: [],
  isLoading: false,
  error: null,
};


export const todosSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    serchTodos: (state, action) => {
      console.log(action.payload)
      state.todos = state.todos.filter((todo)=>todo.title === action.payload)
    }
  },
  extraReducers: { 
  [__getTodos.pending]: (state) => {
    state.isLoading = true; 
  },
  [__getTodos.fulfilled]: (state, action) => {
    state.isLoading = false; 
    state.todos = action.payload; 
  },
  [__getTodos.rejected]: (state, action) => {
    state.isLoading = false; 
    state.error = action.payload; 
  },
  [__deleteTodos.fulfilled]: (state, action) => {
    state.todos = state.todos.filter((list) => list.id !== action.payload)
  },
  [__postTodos.fulfilled]: (state, action) => {
    state.todos.push(action.payload)
  },
  [__editTodos.fulfilled]: (state, action) => {
    // state.todos = state.todos.map((list) => {
    //     if (list.id === action.payload.id) {
    //       return { ...list, 'title':action.payload.title,'body':action.payload.body};
    //     } else {
    //       return list;
    //     }
    //   })
      state.todos = state.todos.map((list) => list.id === action.payload.id 
      ? { ...list, 'title':action.payload.title,'body':action.payload.body} 
      : list)
  }
},
}
);

export const {serchTodos} = todosSlice.actions;
export default todosSlice.reducer; 