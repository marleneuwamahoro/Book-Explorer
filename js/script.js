import { fetchBooks } from "./fetchBooks.js";
import { addFavorite, getFavorites } from "./favorites.js";

const menuBtn = document.getElementById("menu-btn");
const mobileMenu = document.getElementById("mobile-menu");
const booksContainer = document.getElementById("books-container");
const message = document.getElementById("message");
const searchInput = document.getElementById("search-input");
const searchBtn = document.getElementById("search-btn");
const scrollTopBtn = document.getElementById("scroll-top");

// MOBILE MENU
menuBtn.addEventListener("click", () => {
  mobileMenu.classList.toggle("hidden");
});

// FAVORITES MEMORY
let savedFavorites = getFavorites();

// LOAD BOOKS
async function loadBooks(query = "javascript") {
  try {
    message.innerHTML = `
      <div class="flex justify-center items-center py-10">
        <div class="animate-spin rounded-full h-14 w-14 border-4 border-blue-500 border-t-transparent"></div>
      </div>
    `;

    const books = await fetchBooks(query);

    if (books.length === 0) {
      booksContainer.innerHTML = "";
      message.innerHTML = `
        <p class="text-red-400 text-lg">
          No books found ❌
        </p>
      `;
      return;
    }

    renderBooks(books);
    message.innerHTML = "";
  } catch (error) {
    console.error(error);

    message.innerHTML = `
      <p class="text-red-400">
        Error loading books ⚠️
      </p>
    `;
  }
}

// RENDER BOOKS
function renderBooks(books) {
  booksContainer.innerHTML = "";

  books.slice(0, 12).forEach((book) => {
    const title = book.title ?? "No Title";
    const author = book.author_name?.[0] ?? "Unknown Author";
    const coverId = book.cover_i;

    const image = coverId
      ? `https://covers.openlibrary.org/b/id/${coverId}-M.jpg`
      : "https://placehold.co/300x400?text=No+Cover";

    // CHECK IF ALREADY FAVORITE
    const isFavorite = savedFavorites.some(
      (fav) => fav.title === title
    );

    const buttonText = isFavorite
      ? "Added ❤️"
      : "Add to Favorites";

    const buttonClass = isFavorite
      ? "bg-green-500"
      : "bg-blue-500";

    const card = document.createElement("div");

    card.className =
      "book-card bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:scale-105 transition-all duration-300";

    card.innerHTML = `
      <img
        src="${image}"
        alt="${title}"
        class="w-full h-72 object-cover"
      />

      <div class="p-4">
        <h3 class="text-lg font-bold mb-2">
          ${title}
        </h3>

        <p class="text-gray-400 mb-4">
          ${author}
        </p>

        <button
          class="favorite-btn w-full py-2 rounded-lg ${buttonClass}"
          ${isFavorite ? "disabled" : ""}
        >
          ${buttonText}
        </button>
      </div>
    `;

    booksContainer.appendChild(card);
  });
}

// FAVORITES CLICK
booksContainer.addEventListener("click", (e) => {
  if (e.target.classList.contains("favorite-btn")) {
    const card = e.target.closest(".book-card");

    const book = {
      title: card.querySelector("h3").textContent,
      author: card.querySelector("p").textContent,
      image: card.querySelector("img").src,
    };

    addFavorite(book);

    // UPDATE LOCAL MEMORY
    savedFavorites = getFavorites();

    // UPDATE UI
    e.target.textContent = "Added ❤️";
    e.target.disabled = true;
    e.target.classList.remove("bg-blue-500");
    e.target.classList.add("bg-green-500");
  }
});

// SEARCH
searchBtn.addEventListener("click", () => {
  const query = searchInput.value.trim();

  if (!query) {
    message.innerHTML = `
      <p class="text-yellow-400">
        Please enter a search term ⚠️
      </p>
    `;
    return;
  }

  loadBooks(query);
});

// ENTER KEY SEARCH
searchInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    searchBtn.click();
  }
});

// SCROLL BUTTON
window.addEventListener("scroll", () => {
  if (window.scrollY > 300) {
    scrollTopBtn.classList.remove("hidden");
  } else {
    scrollTopBtn.classList.add("hidden");
  }
});

// SCROLL TOP
scrollTopBtn.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});

// START APP
loadBooks();