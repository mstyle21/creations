import { ProductContextState, ProductContextAction } from "../../../types";

export const initialState: ProductContextState = {
  categories: [],
  products: [],
  pages: 0,
  productCount: 0,
};

export const productContextReducer: React.Reducer<ProductContextState, ProductContextAction> = (
  state: ProductContextState,
  action: ProductContextAction
) => {
  switch (action.type) {
    case "setCategoryList":
      return { ...state, categories: action.payload };
    case "setProductList":
      return { ...state, products: action.payload };
    case "setPages":
      return { ...state, pages: action.payload };
    case "setProductCount":
      return { ...state, productCount: action.payload };
    default:
      throw new Error("Unknown action type in product context reducer");
  }
};
