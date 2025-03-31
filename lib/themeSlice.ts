import { createAction, createReducer } from "@reduxjs/toolkit";

export const toggleTheme = createAction<boolean>("todos/add");

export const themeReducer = createReducer([false], (builder) => {
  builder.addCase(toggleTheme, (state: any, action: any) => {
    const todo = action.payload;
    return [...state, todo];
  });
});

export default themeReducer;
