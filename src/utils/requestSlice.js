import { createSlice } from "@reduxjs/toolkit";

const requests = createSlice({
  name: "requests",
  initialState: null,
  reducers: {
    addRequests: (state, action) => {
      return action.payload;
    },
    removeRequest: (state, action) => {
      const newArr = state.filter((req) => req._id !== action.payload);
      return newArr;
    },
  },
});

export default requests.reducer;
export const { addRequests, removeRequest } = requests.actions;
