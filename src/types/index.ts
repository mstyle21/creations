export type ApiPaginatedResponse<T> = {
  items: T[];
  count: number;
  pages: number;
};
export type CustomQueryConfig = {
  staleTime?: number;
  enabled?: boolean;
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
  packages: PackageDetails[];
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
  production: number;
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
  stock: number;
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

export type ProductFilters = {
  page?: number;
  perPage?: number;
  orderBy?: string;
  categories?: string[];
  availability?: string;
  type?: string;
  status?: string;
};

export type ErrorResponse = {
  error: string | { msg: string }[];
};

export const TOKEN_VALID = "valid";
export const TOKEN_EXPIRED = "expired";
export const TOKEN_EXPIRE_SOON = "expire-soon";
export type TTokenStatus = "valid" | "expired" | "expire-soon";

export type OrderItem = {
  type: "product" | "package";
  id: number;
  name: string;
  quantity: number;
  image: string | null;
};
export type orderItemsReducerAction = {
  type: "add" | "edit" | "delete";
  payload: OrderItem;
};
