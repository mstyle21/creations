export type ProductDetails = {
  id: number;
  name: string;
  width: number;
  height: number;
  depth: number;
  stock: number;
  price: number;
  slug: string;
  categories: ProductCategory[];
  images: ProductImage[];
};

export type ProductCategory = {
  id: number;
  name: string;
};

export type ProductImage = {
  id: number;
  filename: string;
  order: number;
};

export type ProductContextState = {
  categories: ProductCategory[];
  products: ProductDetails[];
  categoryFilter: number[];
  orderBy: string;
  perPage: number;
  page: number;
  pages: number;
  productCount: number;
};

export type ProductContextAction =
  | {
      type: "setPage" | "setPerPage" | "setCategoryFilter" | "setPages" | "setProductCount";
      payload: number;
    }
  | {
      type: "setOrderBy";
      payload: string;
    }
  | {
      type: "setCategoryList";
      payload: ProductCategory[];
    }
  | {
      type: "setProductList";
      payload: ProductDetails[];
    };
