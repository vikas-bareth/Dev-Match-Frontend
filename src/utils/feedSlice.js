import { createSlice } from "@reduxjs/toolkit";

export const feedSlice = createSlice({
  name: "feed",
  initialState: null,
  reducers: {
    addFeed: (state, action) => {
      return action.payload;
    },
    removeUserFromFeed: (state, action) => {
      const newArr = state.filter((user) => user._id !== action.payload);
      return newArr;
    },
  },
});

export default feedSlice.reducer;
export const { addFeed, removeUserFromFeed } = feedSlice.actions;
