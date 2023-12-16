import noImage from "../assets/no-image.jpg";
import { MATERIALS_PRICES_PER_ITEM } from "../config";
export const DEFAULT_IMAGE = noImage;

export const COLORS = [
  "#4dc9f6",
  "#f67019",
  "#f53794",
  "#537bc4",
  "#acc236",
  "#166a8f",
  "#00a950",
  "#58595b",
  "#8549ba",
  "#FF7F50",
  "#6A5ACD",
];
export function stockColor(stock: number) {
  const STOCK_REQUIREMENT = 40;

  return stock < STOCK_REQUIREMENT * 0.5 ? "red" : stock > STOCK_REQUIREMENT * 1.5 ? "green" : "orange";
}

export const PER_PAGE_OPTIONS: number[] = [15, 30, 60, 90];
export const SORT_BY_OPTIONS: Record<string, string> = {
  recent: "Cele mai noi",
  name: "Denumire",
  priceAsc: "Pret crescator",
  priceDesc: "Pret descrescator",
  // popularity: "Popularitate",
};

/**
 * Generates an array of numbers between start and end incremented by step
 * Step default value is 1
 * @param start
 * @param end
 * @param step
 * @returns
 */
export function arrayRange(start: number, end: number, step: number = 1): number[] {
  const array = [];

  for (let i = start; i <= end; i += step) {
    array.push(i);
  }

  return array;
}

/**
 * Generate a random hash, default length: 5
 * @param length
 * @returns string
 */
export function randomHash(length: number = 5): string {
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const charactersLength = characters.length;
  let hash = "";

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * charactersLength);
    hash += characters.charAt(randomIndex);
  }

  return hash;
}

/**
 * Debugging purposes
 * @param expireTime
 * @returns string
 */
export function displayRemainingTokenTime(expireTime: number): string {
  const now = Date.now() / 1000;
  //save difference in seconds
  const secondsDiff = Math.floor(expireTime - now);
  //save difference in minutes
  const minutesDiff = Math.floor(secondsDiff / 60);
  //save difference in hours
  const hoursDiff = Math.floor(minutesDiff / 60);

  return `${hoursDiff}h : ${minutesDiff - hoursDiff * 60}min : ${secondsDiff - minutesDiff * 60}sec`;
}

export function capitalize(string: string): string {
  return string.slice(0, 1).toUpperCase() + string.slice(1);
}

export function previewImage(file: File) {
  return new Promise<string | null>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      if (e.target && e.target.result) {
        resolve(e.target.result as string);
      }
    };
    reader.onerror = () => {
      reject(null);
    };
    reader.readAsDataURL(file);
  });
}

export function generateRandomDataArray<T>(prototype: T, count: number = 10): T[] {
  const length = Math.max(0, count);

  return length > 0 ? Array.from(Array(length), () => generateRandomData(prototype)) : [];
}

export function generateRandomData<T>(prototype: T): T {
  switch (typeof prototype) {
    default:
      return prototype;
    case "string":
      return `${prototype} ${randomHash()}` as T;
    case "number":
      return (prototype + Math.round(Math.random() * 100) + 1) as T;
    case "boolean":
      return (Math.random() - 0.5 > 0 ? true : false) as T;
    case "object": {
      if (prototype) {
        const rndObj: Record<string, T> = {};

        Object.entries(prototype).forEach((item) => {
          rndObj[item[0]] = generateRandomData(item[1]);
        });

        return rndObj as T;
      }

      return prototype;
    }
  }
}

export function calculateApproximateCostPrice(materialWeight: number): string {
  return (
    materialWeight * MATERIALS_PRICES_PER_ITEM.plaster +
    MATERIALS_PRICES_PER_ITEM.bubbleWrap +
    MATERIALS_PRICES_PER_ITEM.scotch
  ).toFixed(2);
}
