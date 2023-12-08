export type ApiPaginatedResponse<T> = {
  items: T[];
  count: number;
  pages: number;
};
export type GeneralModalProps<T> = {
  show: boolean;
  closeModal: (refresh?: boolean) => void;
  itemToEdit: T | null;
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
  oldPrice: number;
  materialWeight: number;
  status: string;
  slug: string;
  categories: CategoryDetails[];
  images: ProductImage[];
};
export type GenericCategory = {
  id: number;
  name: string;
};
export type GenericImage = {
  id: string;
  filename: string;
  order: number;
  file?: File;
};
export type ProductImage = GenericImage & {
  productId?: number;
};
export type ImageReducerAction<T> =
  | {
      type: "add" | "delete";
      payload: T;
    }
  | {
      type: "set" | "add";
      payload: T[];
    }
  | { type: "reset" }
  | {
      type: "edit";
      payload: T & { newOrder: number };
    };

export type PackageDetails = {
  id: number;
  name: string;
  stock: number;
  price: number;
  oldPrice: number;
  status: string;
  slug: string;
  category: CategoryDetails;
  products: PackageProductDetails[];
  images: PackageImage[];
};
export type PackageImage = GenericImage & {
  packageId?: number;
};
export type PackageProductDetails = {
  id: number;
  quantity: number;
  product: ProductDetails;
};
export type PackageItem = {
  productId: number;
  name: string;
  quantity: number;
  image: string | null;
};
export type PackageProductReducerAction =
  | {
      type: "add" | "edit" | "delete";
      payload: PackageItem;
    }
  | {
      type: "set";
      payload: PackageItem[];
    }
  | { type: "reset" };
