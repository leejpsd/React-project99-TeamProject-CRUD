import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const __getTodos = createAsyncThunk(
  "board/getTodos",
  async (payload, thunkAPI) => {
    try {
      const data = await axios.get("http://localhost:3001/board");
      return thunkAPI.fulfillWithValue(data.data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const __postTodos = createAsyncThunk(
  "board/postTodos",
  async (payload, thunkAPI) => {
    try {
      const postData = await axios.post("http://localhost:3001/board", payload);

      return thunkAPI.fulfillWithValue(postData.data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const __deleteTodos = createAsyncThunk(
  "board/deleteTodos",
  async (payload, thunkAPI) => {
    try {
      await axios.delete(`http://localhost:3001/board/${payload}`);
      return thunkAPI.fulfillWithValue(payload);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const __editTodos = createAsyncThunk(
  "board/editTodos",
  async (payload, thunkAPI) => {
    try {
      const editeData = await axios.patch(
        `http://localhost:3001/board/${payload.id}`,
        {
          title: `${payload.title}`,
          info: `${payload.info}`,
        }
      );
      return thunkAPI.fulfillWithValue(editeData.data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const boardSlice = createSlice({
  name: "board",
  initialState: {
    board: [],
    isLoading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(__getTodos.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(__getTodos.fulfilled, (state, action) => {
      state.isLoading = false;
      state.board = action.payload;
    });
    builder.addCase(__getTodos.rejected, (state, action) => {
      state.isLoading = false;
    });

    // posttodos
    builder.addCase(__postTodos.fulfilled, (state, action) => {
      state.board.push(action.payload);
    });

    // deletetodos
    builder.addCase(__deleteTodos.fulfilled, (state, action) => {
      state.board = state.board.filter((board) => board.id !== action.payload);
    });

    // updatetodos
    builder.addCase(__editTodos.fulfilled, (state, action) => {
      state.board = state.board.map((board) => {
        if (board.id === action.payload.id) {
          return {
            ...board,
            title: action.payload.title,
            info: action.payload.info,
          };
        } else {
          return board;
        }
      });
    });
  },
});

export const {} = boardSlice.actions;
export default boardSlice.reducer;
