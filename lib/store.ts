import { configureStore } from "@reduxjs/toolkit";
import allCoinsReducer from "./features/data/allCoinsData";
import compareCoinsReducer from "./features/data/compareCoinsData";

export const makeStore = () => {
  return configureStore({
    reducer: {
      allCoinsData: allCoinsReducer,
      compareCoinsData: compareCoinsReducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
      immutableCheck: false,
      serializableCheck: false,
    })
  });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
