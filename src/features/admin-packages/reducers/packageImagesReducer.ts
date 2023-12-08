import { ImageReducerAction, PackageImage } from "../../../types";
import { MAX_PACKAGE_IMAGES } from "../hooks/useManagePackage";

const reorderImages = (state: PackageImage[], payloadImage: PackageImage & { newOrder: number }) => {
  let newOrder = payloadImage.newOrder;
  if (isNaN(newOrder)) {
    return state;
  }
  const maxOrder = Math.min(MAX_PACKAGE_IMAGES, state.length);
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

const deleteImage = (state: PackageImage[], payloadImage: PackageImage) => {
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

export const packageImagesReducer = (state: PackageImage[], action: ImageReducerAction<PackageImage>) => {
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
