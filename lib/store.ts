import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./features/api/apiSlice";
import portfolioReducer from "./features/portfolio/portfolioSlice";
import themeReducer from "./features/theme/themeSlice";
import viewReducer from "./features/view/viewSlice";
import currencyReducer from "./features/currency/currencySlice";
import coinsListReducer from "./features/coinsList/coinsListSlice";

export const makeStore = () => {
  return configureStore({
    reducer: {
      [apiSlice.reducerPath]: apiSlice.reducer,
      portfolio: portfolioReducer,
      theme: themeReducer,
      view: viewReducer,
      currency: currencyReducer,
      coinsList: coinsListReducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        immutableCheck: false,
        serializableCheck: false,
      }).concat(apiSlice.middleware),
  });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
