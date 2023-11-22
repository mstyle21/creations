export type ApiPaginatedResponse<T> = {
  items: T[];
  count: number;
  pages: number;
};
export type CategoryDetails = {
  id: number;
  name: string;
  status: "active" | "inactive";
  products: ProductDetails[];
  packages: [];
};
export type ProductDetails = {
  id: number;
  name: string;
  width: number;
  height: number;
  depth: number;
  stock: number;
  price: number;
  status: string;
  categories: CategoryDetails[];
  images: ProductImage[];
};
export type GeneralModalProps<T> = {
  show: boolean;
  closeModal: (refresh?: boolean) => void;
  itemToEdit: T | null;
};
export type ProductImage = {
  id: string;
  filename: string;
  order: number;
  productId?: number;
  file?: File;
};
export type ProductImageReducerAction =
  | {
      type: "add" | "delete";
      payload: ProductImage;
    }
  | {
      type: "set" | "add";
      payload: ProductImage[];
    }
  | { type: "reset" }
  | {
      type: "edit";
      payload: ProductImage & { newOrder: number };
    };
