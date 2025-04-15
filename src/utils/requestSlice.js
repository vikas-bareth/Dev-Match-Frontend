import { createSlice } from "@reduxjs/toolkit";

const requests = createSlice({
  name: "requests",
  initialState: null,
  reducers: {
    addRequests: (state, action) => {
      return action.payload;
    },
  },
});

export default requests.reducer;
export const { addRequests } = requests.actions;
