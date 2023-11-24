import { ProductContextAction, ProductContextState } from "../types";

export const initialState: ProductContextState = {
  categories: [],
  products: [],
  categoryFilter: [],
  orderBy: "name",
  page: 1,
  perPage: 10,
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
    case "setCategoryFilter": {
      const newCategoryFilter =
        state.categoryFilter.findIndex((item) => item === action.payload) !== -1
          ? state.categoryFilter.filter((item) => item !== action.payload)
          : [...state.categoryFilter.slice(), action.payload];

      return {
        ...state,
        categoryFilter: newCategoryFilter,
      };
    }
    case "setOrderBy":
      return { ...state, orderBy: action.payload };
    case "setPage":
      return { ...state, page: action.payload };
    case "setPerPage":
      return { ...state, perPage: action.payload };
    case "setPages":
      return { ...state, pages: action.payload };
    case "setProductCount":
      return { ...state, productCount: action.payload };
    default:
      throw new Error("Unknown action type in product context reducer");
  }
};
