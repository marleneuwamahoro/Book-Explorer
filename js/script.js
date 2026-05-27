import { addFavorite } from "./favorites.js";
import { fetchBooks } from "./fetchBooks.js";

async function loadBooks() {

  const books = await fetchBooks();

  console.log(books);
}

loadBooks();

  const btn = document.getElementById("menu-btn");
  const menu = document.getElementById("menu");

  btn.addEventListener("click", () => {
    menu.classList.toggle("hidden");
  });
const favoriteButtons = document.querySelectorAll(".favorite-btn");
favoriteButtons.forEach((button) => {
  button.addEventListener("click", () => {

    const card = button.parentElement;

    const title = card.querySelector(".book-title").textContent;

    const book = {
      title: title
    };

    addFavorite(book);
  });
});