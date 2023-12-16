const WORDS: { [key: string]: { [anotherKey: string]: string } } = {
  product: {
    ro: "figurina",
  },
};
export const translate = (keyword: string) => {
  return WORDS[keyword]["ro"] ?? keyword;
};
