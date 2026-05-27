// IMPORT MODULES
import { addFavorite } from "./favorites.js";
import { fetchBooks } from "./fetchBooks.js";



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

})
async function loadBooks() {

  try {

    const books = await fetchBooks();

    console.log("Books from API:", books);

  } catch (error) {

    console.error("Error fetching books:", error);

  }

}

loadBooks();