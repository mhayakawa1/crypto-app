import { createSlice } from "@reduxjs/toolkit";

const initialState = [[]];

const coinDataSlice = createSlice({
  name: "data",
  initialState,
  reducers: {},
});

export default coinDataSlice.reducer;
