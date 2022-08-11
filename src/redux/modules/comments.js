import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";



export const __getComments = createAsyncThunk(
  "comments/Comments",
  async (payload, thunkAPI) => {
    try {
      const data = await axios.get("https://our-todolist.herokuapp.com/Comments");
      return thunkAPI.fulfillWithValue(data.data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const __postComments = createAsyncThunk(
  "comments/postComments",
  async (commentData, thunkAPI) => {
    try {
      const data = await axios.post("https://our-todolist.herokuapp.com/Comments", commentData);
    return thunkAPI.fulfillWithValue(data.data);
  } catch (error) {
  return thunkAPI.rejectWithValue(error);
}
  }
);

export const __deleteComment = createAsyncThunk(
  "comment/deleteComment",
  async (id, thunkAPI) => {
    try {
      await axios.delete(`https://our-todolist.herokuapp.com/Comments/${id}`);
      return thunkAPI.fulfillWithValue(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);



const initialState = {
  comments: [],
  isLoading: false,
  error: null,
};


export const commentsSlice = createSlice({
  name: "comments",
  initialState,
  reducers: {},
  extraReducers: {
    [__getComments.pending]: (state) => {
      state.isLoading = true; // 네트워크 요청이 시작되면 로딩상태를 true로 변경합니다.
    },
    [__getComments.fulfilled]: (state, action) => {
      state.isLoading = false; // 네트워크 요청이 끝났으니, false로 변경합니다.
      state.comments = action.payload; // Store에 있는 todos에 서버에서 가져온 todos를 넣습니다.
    },
    [__getComments.rejected]: (state, action) => {
      state.isLoading = false; // 에러가 발생했지만, 네트워크 요청이 끝났으니, false로 변경합니다.
      state.error = action.payload; // catch 된 error 객체를 state.error에 넣습니다.
    },
    [__postComments.fulfilled]: (state, action) => {
      state.comments.push(action.payload)
    },
    [__deleteComment.fulfilled]: (state, action) => {
      state.comments = state.comments.filter((list) => list.id !== action.payload);
    },
  },
});

export const {} = commentsSlice.actions;
export default commentsSlice.reducer;
