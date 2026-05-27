// fetchBooks.js

export async function fetchBooks(searchTerm = "programming") {
      const response = await fetch(`https://openlibrary.org/search.json?q=${searchTerm}`);
        const data = await response.json();
          return data.docs;
}