import { MAX_UPLOAD_IMAGES } from "../features/admin-products/hooks/useManageProduct";
import { ProductImage, ProductImageReducerAction } from "../types";

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
    const copyState = [...state].sort((a, b) => a.order - b.order);
    return [
      ...copyState.slice(0, indexToDelete),
      ...copyState.slice(indexToDelete + 1).map((item) => ({ ...item, order: item.order - 1 })),
    ];
  }

  return state;
};

export const productImagesReducer = (state: ProductImage[], action: ProductImageReducerAction) => {
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
