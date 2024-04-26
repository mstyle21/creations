import { PackageItem, PackageProductReducerAction } from "../../../types";

export const packageProductsReducer = (state: PackageItem[], action: PackageProductReducerAction) => {
  switch (action.type) {
    case "add":
      return [...state, action.payload];
    case "edit":
      return state.map((item) => {
        return item.productId === action.payload.productId ? action.payload : item;
      });
    case "delete":
      return state.filter((item) => item.productId !== action.payload.productId);
    case "set":
      return [...action.payload];
    case "reset":
      return [];
    default:
      return state;
  }
};
