import { arrayRange, generateRandomDataArray } from "..";

test("creates array from 1 to 5 with a step of 1 without step param", () => {
  expect(arrayRange(1, 5)).toStrictEqual([1, 2, 3, 4, 5]);
});
test("creates array from 1 to 5 with a step of 1", () => {
  expect(arrayRange(1, 5, 1)).toStrictEqual([1, 2, 3, 4, 5]);
});
test("creates array from 1 to 5 with a step of 2", () => {
  expect(arrayRange(1, 5, 2)).toStrictEqual([1, 3, 5]);
});
test("creates array from 1 to 5 with a step of 2", () => {
  expect(arrayRange(1, 6, 2)).toStrictEqual([1, 3, 5]);
});

test("generate empty array", () => {
  const result = generateRandomDataArray(1, 0);
  expect(result).toStrictEqual([]);
});
test("generate array of length 3", () => {
  const result = generateRandomDataArray("string", 3);
  expect(result).toHaveLength(3);
});
test("generate array of length 13", () => {
  const result = generateRandomDataArray("string", 13);
  expect(result).toHaveLength(13);
});
test("generate array of length 0", () => {
  const result = generateRandomDataArray("string", 0);
  expect(result).toHaveLength(0);
});
test("generate array of length 0 for negative count", () => {
  const result = generateRandomDataArray("string", -3);
  expect(result).toHaveLength(0);
});

test("generate array containing strings", () => {
  const prototype = "1";
  const result = generateRandomDataArray(prototype, 3);
  expect(result.every((item) => typeof item === typeof prototype)).toBe(true);
});
test("generate array containing numbers", () => {
  const prototype = 1;
  const result = generateRandomDataArray(prototype, 3);
  expect(result.every((item) => typeof item === typeof prototype)).toBe(true);
});
test("generate array containing booleans", () => {
  const prototype = true;
  const result = generateRandomDataArray(prototype, 3);
  expect(result.every((item) => typeof item === typeof prototype)).toBe(true);
});
test("generate array containing arrays", () => {
  const prototype = [1, 2, 3];
  const result = generateRandomDataArray(prototype, 3);
  expect(result.every((item) => typeof item === typeof prototype)).toBe(true);
});
test("generate array containing objects", () => {
  const prototype = { id: 1, name: "Title" };
  const result = generateRandomDataArray(prototype, 3);
  expect(result.every((item) => typeof item === typeof prototype)).toBe(true);
});
