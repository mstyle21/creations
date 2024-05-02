import { OrderItem, orderItemsReducerAction } from "../../../types";

export const orderItemsReducer = (state: OrderItem[], action: orderItemsReducerAction) => {
  switch (action.type) {
    case "add":
      return [...state, action.payload];
    case "edit":
      return state.map((item) => {
        return item.id === action.payload.id && item.type === action.payload.type ? action.payload : item;
      });
    case "delete":
      return state.filter((item) => item.id !== action.payload.id && item.type !== action.payload.type);
    default:
      return state;
  }
};
