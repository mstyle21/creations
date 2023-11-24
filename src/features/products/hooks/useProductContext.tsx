import { useContext } from "react";
import { ProductContext } from "../context/ProductContextProvider";

export function useProductContext() {
  const context = useContext(ProductContext);
  if (context === undefined) {
    throw new Error("useProductContext must be used within ProductContextProvider");
  }
  const [state, dispatch] = context;

  return { state, dispatch };
}
