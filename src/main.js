import './style.css';
import { fetchBooks } from './api/openLibrary.js';
import { getFavorites, saveFavorites } from './utils/storage.js';
import { createSearchBar } from './components/SearchBar/SearchBar.js';
import { createHeader } from './components/Header/Header.js';
import { createMainText } from './components/MainTextBlock/MainTextBlock.js';
import { createFooter } from './components/Footer/Footer.js';
import { createBookList } from './components/BookList/BookList.js';
import { createFavoritesText } from './components/FavoritesText/FavoritesText.js';
import { createFavoriteBookCard } from './components/FavoriteBookCard/FavoriteBookCard.js';
import { createAuthorFilter, updateAuthorOptions } from './components/AuthorFilter/AuthorFilter.js';

let currentBooks = [];
let favorites = getFavorites();
let selectedAuthor = 'all';
let authorFilterSelect = null;

const headerContainer = document.getElementById('headerContainer');
const mainTextContainer = document.getElementById('mainTextBlockContainer');
const searchContainer = document.getElementById('searchContainer');
const resultsContainer = document.getElementById('resultsContainer');
const favoritesContainer = document.getElementById('favoritesContainer');
const footerContainer = document.getElementById('footerContainer');

const initTheme = () => {
  const savedTheme = localStorage.getItem('app-theme');
  if (savedTheme) {
    document.body.setAttribute('data-theme', savedTheme);
  } else {
    document.body.setAttribute('data-theme', 'light');
  }
};

const renderFavorites = () => {
  favoritesContainer.innerHTML = '';
  
  const header = createFavoritesText(favorites.length);
  favoritesContainer.appendChild(header);

  if (favorites.length === 0) {
    const emptyMsg = document.createElement('p');
    emptyMsg.style.textAlign = 'center';
    emptyMsg.style.fontFamily = 'var(--font-source)';
    emptyMsg.style.color = 'var(--text)';
    emptyMsg.style.marginTop = '20px';
    emptyMsg.textContent = 'No favorites yet.';
    favoritesContainer.appendChild(emptyMsg);

    return;
  }

  const list = document.createElement('div');
  list.style.display = 'flex';
  list.style.flexDirection = 'column';

  favorites.forEach(book => {
    const card = createFavoriteBookCard(book, handleToggleFavorite);
    list.appendChild(card);
  });
  
  favoritesContainer.appendChild(list);
};

const renderResults = (books) => {
  resultsContainer.innerHTML = '';

  const booksToRender = selectedAuthor === 'all'
    ? books
    : books.filter(book => book.author_name && book.author_name.includes(selectedAuthor));

  if (booksToRender.length === 0) {
    resultsContainer.classList.add('loadingState');
    resultsContainer.innerHTML = '<p>No results.</p>';
    return;
  }

  resultsContainer.classList.remove('loadingState');
  const listElement = createBookList(booksToRender, favorites, handleToggleFavorite);
  resultsContainer.appendChild(listElement);
};

const handleSearch = async (query) => {
  resultsContainer.classList.add('loadingState');
  resultsContainer.innerHTML = '<p>Loading...</p>';

  selectedAuthor = 'all';
  if (authorFilterSelect) {
    authorFilterSelect.value = 'all';
  }

  try {
    const books = await fetchBooks(query);
    currentBooks = books;
    
    if (authorFilterSelect) {
      updateAuthorOptions(authorFilterSelect, currentBooks);
    }

    renderResults(currentBooks);
  } catch (error) {
    resultsContainer.classList.add('loadingState');
    resultsContainer.innerHTML = '<p>Network error. Try later again.</p>';
  }
};

const handleToggleFavorite = (book) => {
  const index = favorites.findIndex(fav => fav.key === book.key);

  if (index !== -1) {
    favorites.splice(index, 1);
  } else {
    favorites.push(book);
  }

  saveFavorites(favorites);

  if (currentBooks.length > 0) {
    renderResults(currentBooks);
  }
  renderFavorites();
};

const init = () => {
  initTheme();

  headerContainer.replaceWith(createHeader());
  mainTextContainer.appendChild(createMainText());
  
  authorFilterSelect = createAuthorFilter((author) => {
    selectedAuthor = author;
    renderResults(currentBooks);
  });

  searchContainer.appendChild(createSearchBar(handleSearch));
  searchContainer.appendChild(authorFilterSelect);

  footerContainer.replaceWith(createFooter());
  renderFavorites();

  handleSearch('fiction');
};

init();