// favorites.js

let favorites = [];
export function addFavorite(book) {
  favorites.push(book);
  console.log("Added to favorites:", book);
}
export function removeFavorite(bookTitle) {
  favorites = favorites.filter(book => book.title !== bookTitle);
  console.log("Removed:", bookTitle);
}
export function getFavorites() {
  return favorites;
}