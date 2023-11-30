export const localStorage = {
  setItem(key: string, value: string) {
    localStorage.setItem(key, value);
  },

  getItem(key: string): string {
    return localStorage.getItem(key);
  },

  removeItem(key: string) {
    localStorage.removeItem(key);
  },
};
