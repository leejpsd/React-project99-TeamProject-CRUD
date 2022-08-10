import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const __getComents = createAsyncThunk(
  "coments/getComents",
  async (payload, thunkAPI) => {
    try {
      const data = await axios.get("http://localhost:3001/coments");
      return thunkAPI.fulfillWithValue(data.data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const __postComents = createAsyncThunk(
  "coments/postComents",
  async (inputData, thunkAPI) => {
    try {
      const data = await axios.post("http://localhost:3001/coments", inputData);
      return thunkAPI.fulfillWithValue(data.data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

const initialState = {
  coments: [],
  isLoading: false,
  error: null,
};

export const comentsSlice = createSlice({
  name: "coments",
  initialState,
  reducers: {},
  extraReducers: {
    [__getComents.pending]: (state) => {
      state.isLoading = true;
    },
    [__getComents.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.coments = action.payload;
    },
    [__getComents.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    [__postComents.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.coments.push(action.payload);
    },
  },
});

export const {} = comentsSlice.actions;
export default comentsSlice.reducer;
