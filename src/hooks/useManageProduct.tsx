import { useEffect, useReducer, useState } from "react";
import { ProductDetails, ProductImage, ProductImageReducerAction } from "../interfaces";

export const MAX_UPLOAD_IMAGES = 5;

const reorderImages = (state: ProductImage[], payloadImage: ProductImage & { newOrder: number }) => {
  let newOrder = payloadImage.newOrder;
  if (isNaN(newOrder)) {
    return state;
  }
  const maxOrder = Math.min(MAX_UPLOAD_IMAGES, state.length);
  newOrder = newOrder < 1 || newOrder > maxOrder ? maxOrder : newOrder;
  const oldOrder = payloadImage.order;

  if (newOrder !== oldOrder) {
    return state.map((item) => {
      if (item.id === payloadImage.id) {
        return { ...item, order: newOrder };
      } else {
        if (newOrder < oldOrder && item.order < oldOrder && item.order >= newOrder) {
          return { ...item, order: item.order + 1 };
        }
        if (newOrder > oldOrder && item.order > oldOrder && item.order <= newOrder) {
          return { ...item, order: item.order - 1 };
        }
        return item;
      }
    });
  }

  return state;
};

const deleteImage = (state: ProductImage[], payloadImage: ProductImage) => {
  const indexToDelete = state.findIndex((item) => item.id === payloadImage.id);

  if (indexToDelete !== -1) {
    return [
      ...state.slice(0, indexToDelete),
      ...state.slice(indexToDelete + 1).map((item) => ({ ...item, order: item.order - 1 })),
    ];
  }

  return state;
};

const productImagesReducer = (state: ProductImage[], action: ProductImageReducerAction) => {
  switch (action.type) {
    case "add":
      if (Array.isArray(action.payload)) {
        return [...state, ...action.payload];
      }
      return [...state, action.payload];
    case "edit":
      return reorderImages(state, action.payload);
    case "delete":
      return deleteImage(state, action.payload);
    case "set":
      return [...state, ...action.payload];
    case "reset":
      return [];
    default:
      return state;
  }
};

export const useManageProduct = (itemToEdit: ProductDetails | null) => {
  const [name, setName] = useState("");
  const [width, setWidth] = useState<number | "">("");
  const [height, setHeight] = useState<number | "">("");
  const [depth, setDepth] = useState<number | "">("");
  const [stock, setStock] = useState<number | "">("");
  const [price, setPrice] = useState<number | "">("");
  const [active, setActive] = useState(true);
  const [categories, setCategories] = useState<number[]>([]);
  const [images, dispatchImages] = useReducer(productImagesReducer, []);

  useEffect(() => {
    setName(itemToEdit ? itemToEdit.name : "");
    setWidth(itemToEdit ? itemToEdit.width : "");
    setHeight(itemToEdit ? itemToEdit.height : "");
    setDepth(itemToEdit ? itemToEdit.depth : "");
    setStock(itemToEdit ? itemToEdit.stock : "");
    setPrice(itemToEdit ? itemToEdit.price : "");
    setActive(itemToEdit ? itemToEdit.status === "active" : true);
    setCategories(itemToEdit ? itemToEdit.categories.map((item) => item.id) : []);
    dispatchImages({ type: "set", payload: itemToEdit ? itemToEdit.images : [] });
  }, [itemToEdit]);

  const resetValues = () => {
    setName("");
    setWidth("");
    setHeight("");
    setDepth("");
    setStock("");
    setPrice("");
    setActive(true);
    setCategories([]);
    dispatchImages({ type: "reset" });
  };

  return {
    name,
    width,
    height,
    depth,
    stock,
    price,
    active,
    categories,
    images,
    setName,
    setWidth,
    setHeight,
    setDepth,
    setStock,
    setPrice,
    setActive,
    setCategories,
    dispatchImages,
    resetValues,
  };
};
