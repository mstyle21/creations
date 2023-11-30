import { Dispatch, createContext, useMemo, useReducer } from "react";
import { initialState, productContextReducer } from "../reducers/productFilterReducer";
import { ProductContextState, ProductContextAction } from "../../../types";

export const ProductContext = createContext<[ProductContextState, Dispatch<ProductContextAction>]>([
  initialState,
  () => {},
]);

type ProductContextProviderProps = {
  children: React.ReactNode;
};

const ProductContextProvider = ({ children }: ProductContextProviderProps) => {
  const [state, dispatch] = useReducer<React.Reducer<ProductContextState, ProductContextAction>>(
    productContextReducer,
    initialState
  );

  const value = useMemo<[ProductContextState, Dispatch<ProductContextAction>]>(() => [state, dispatch], [state]);

  return <ProductContext.Provider value={value}>{children}</ProductContext.Provider>;
};

export default ProductContextProvider;
