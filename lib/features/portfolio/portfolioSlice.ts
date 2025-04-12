import { createAction, createReducer } from "@reduxjs/toolkit";

interface Asset {
  id: number;
  coinId: string;
  initialPrice: number;
  coinAmount: number;
  change: number;
  date: string;
  apiDate: string;
}

interface UpdatedAsset {
  asset: Asset;
  index: number;
}

const initialState: any[] = [];

const setLocalStorage = (newState: any) => {
  localStorage.setItem("portfolio", JSON.stringify(newState));
};

export const addLocalStorage = createAction<any>("portfolio/localStorage");
export const addAsset = createAction<Asset>("portfolio/add");
export const editAsset = createAction<UpdatedAsset>("portfolio/edit");
export const deleteAsset = createAction<number>("portfolio/delete");

export const portfolioReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(addLocalStorage, (state: any, action: any) => {
      const portfolio = action.payload;
      setLocalStorage(portfolio);
      return portfolio;
    })
    .addCase(addAsset, (state: any, action: any) => {
      const asset = action.payload;
      const newState = [...state, asset];
      setLocalStorage(newState);
      return newState;
    })
    .addCase(editAsset, (state: any, action: any) => {
      const { asset, index } = action.payload;
      const newState = [
        ...state.slice(0, index),
        asset,
        ...state.slice(index + 1),
      ];
      setLocalStorage(newState);
      return newState;
    })
    .addCase(deleteAsset, (state: any, action: any) => {
      const id = action.payload;
      const newState = [...state.filter((element: any) => element.id !== id)];
      setLocalStorage(newState);
      return newState;
    });
});

export default portfolioReducer;
