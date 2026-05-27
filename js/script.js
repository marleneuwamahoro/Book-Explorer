// IMPORT MODULES
import { addFavorite } from "./favorites.js";
import { fetchBooks } from "./fetchBooks.js";


// ==========================
// DOM ELEMENTS
// ==========================

const btn = document.getElementById("menu-btn");
const menu = document.getElementById("menu");
const booksContainer = document.getElementById("books-container");

const searchInput = document.getElementById("search-input");
const searchBtn = document.getElementById("search-btn");
// ==========================
// MOBILE MENU
// ==========================

btn.addEventListener("click", () => {
  menu.classList.toggle("hidden");
});


// ==========================
// LOAD BOOKS FROM API
// ==========================

async function loadBooks() {
async function loadBooks(query = "javascript") {

  try {

    const books = await fetchBooks(query);
    renderBooks(books);

  } catch (error) {

    console.error("Error fetching books:", error);

  }
}
}
//search
searchBtn.addEventListener("click", () => {

  const query = searchInput.value.trim();

  if (query === "") {
    loadBooks("javascript");
    return;
  }

  loadBooks(query);

});

searchInput.addEventListener("keypress", (e) => {

  if (e.key === "Enter") {

    searchBtn.click();

  }

});


// ==========================
// RENDER BOOKS TO DOM
// ==========================

function renderBooks(books) {

  booksContainer.innerHTML = "";

  books.slice(0, 12).forEach((book) => {

    const title = book.title || "No Title";
    const author = book.author_name?.[0] || "Unknown Author";

    const card = document.createElement("div");

    card.className =
      "bg-white p-4 rounded-lg shadow hover:shadow-lg transition hover:scale-105";

    card.innerHTML = `
      <h3 class="book-title text-lg font-bold mb-2">${title}</h3>
      <p class="text-gray-600 text-sm">${author}</p>

      <button class="favorite-btn mt-3 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
        Add to Favorites
      </button>
    `;

    booksContainer.appendChild(card);

  });
}


// ==========================
// FAVORITES (EVENT DELEGATION)
// ==========================

booksContainer.addEventListener("click", (e) => {

  if (e.target.classList.contains("favorite-btn")) {

    const card = e.target.parentElement;

    const title = card.querySelector(".book-title").textContent;

    addFavorite({ title });

  }

});


// START APP
loadBooks();