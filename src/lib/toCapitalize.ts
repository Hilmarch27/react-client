/**
 * Returns a new string with the first letter of each word capitalized.
 * If the input string is falsy, returns undefined.
 * @example
 * toCapitalize("hello world") // "Hello World"
 */
export function toCapitalize(text?: string): string | undefined {
  if (!text) return undefined;
  return text
    .toLowerCase()
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}
