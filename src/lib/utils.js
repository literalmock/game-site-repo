export function cn(...inputs) {
  return inputs
    .flat(Infinity)
    .filter(Boolean)
    .map((value) => String(value).trim())
    .filter((value) => value.length > 0)
    .join(" ")
}
