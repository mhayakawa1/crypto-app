import { createAction, createReducer } from "@reduxjs/toolkit";

export const toggleView = createAction<boolean>("view/toggle");

export const viewReducer = createReducer([{ mobileView: false }], (builder) => {
  builder.addCase(toggleView, (state: any, action: any) => {
    const mobileViewState = action.payload;
    return [{ mobileView: mobileViewState }];
  });
});

export default viewReducer;
