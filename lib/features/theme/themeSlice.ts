import { createAction, createReducer } from "@reduxjs/toolkit";

interface Test {
  darkActive: boolean;
}

export const toggleTheme = createAction<Test>("theme/toggle");

export const themeReducer = createReducer(
  [{ darkActive: false }],
  (builder) => {
    builder.addCase(toggleTheme, (state: any) => {
      const todo = state[0];
      return [{ darkActive: !todo.darkActive }];
    });
  }
);

export default themeReducer;
