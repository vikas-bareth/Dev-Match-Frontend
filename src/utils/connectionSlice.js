import { createSlice } from "@reduxjs/toolkit";

export const connectionSlice = createSlice({
  name: "connections",
  initialState: null,
  reducers: {
    addConnections: (state, action) => {
      return action.payload;
    },
  },
});

export default connectionSlice.reducer;
export const { addConnections } = connectionSlice.actions;
