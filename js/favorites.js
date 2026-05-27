// favorites.js

let favorites = JSON.parse(localStorage.getItem("favorites")) || [];


// ADD FAVORITE
export function addFavorite(book) {

  favorites.push(book);

  localStorage.setItem("favorites", JSON.stringify(favorites));

  console.log("Added:", book);
}


// REMOVE FAVORITE
export function removeFavorite(bookTitle) {

  favorites = favorites.filter(
    (book) => book.title !== bookTitle
  );

  localStorage.setItem("favorites", JSON.stringify(favorites));

  console.log("Removed:", bookTitle);
}


// GET FAVORITES
export function getFavorites() {
  return favorites;
}