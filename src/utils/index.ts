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
